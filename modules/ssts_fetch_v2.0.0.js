require('dotenv').config();
const https = require('https');
const {URL} = require('url');
const utilDateTime = require('./util_datetime_v1.0.0');
const utilDB = require('./util_db_v1.0.0');
const mongoose = require('mongoose');
const { copyFileSync } = require('fs');
const fetch = require('node-fetch');

const saveType = {
    ignoreDuplicate: 'ignoreDuplicate',
    updateDuplicate: 'updateDuplicate'
}
exports.saveType = saveType

exports.createData = async function (sourceDataURL, isRetrieveSymbolFromDB, collectionName, saveType, filterDuplicate1, filterDuplicate2, isLayer1Symbol, layer2Name ) {
	
	var jsonResult;

	if (isRetrieveSymbolFromDB) {
		var indexCollectionNames = ["indexSPs", "indexNasdaqs", "indexDowJones"]
		for (var index of indexCollectionNames) {
 			var companies = await utilDB.find(index, {})
 		
			var i = 0
			for (var company of companies) {
				if (i < process.env.MAX_SYMBOL) {

					console.log("symbol : ", company.symbol)
					console.log("layer2Name : ", layer2Name)

					var sourceDataURLPerSymbol = sourceDataURL.replace("[symbol]", company.symbol)
					jsonResult = await getDataAndSave( company.symbol, sourceDataURLPerSymbol , collectionName, saveType, filterDuplicate1, filterDuplicate2, isLayer1Symbol, layer2Name);	
		 
				}
				i++
			}
		}
		
	}
	else if (!isRetrieveSymbolFromDB) {
		// get data 
		jsonResult = await getDataAndSave( null, sourceDataURL , collectionName, saveType, filterDuplicate1, filterDuplicate2, isLayer1Symbol, layer2Name);
	
	}

	return jsonResult;

}
 
async function getDataAndSave(  symbol,  sourceDataURL, collectionName, paramSaveType , filterDuplicate1, filterDuplicate2, isLayer1Symbol, layer2Name ) {
	console.log("sourceDataURL : ", sourceDataURL)

	 // if not found in database, get from API sourceData and save it to DB
	 const options = new URL(sourceDataURL);

     const response = await fetch(sourceDataURL);
	 var jsonResult = await response.json();
 
	 if (jsonResult["historical"] != undefined) {
		console.log("jsonResult historical undefined")
		jsonResult = jsonResult["historical"]
		console.log("jsonResult length: " + jsonResult.length)
	}

	console.log("Get data for collectionName: " +   collectionName + ", filterDuplicate1 : " + filterDuplicate1 + " layer2Name : " + layer2Name + " count: ", jsonResult.length , paramSaveType)

	if(paramSaveType == saveType.ignoreDuplicate) {
		saveDataIgnoreDuplicate(symbol, jsonResult,  collectionName, filterDuplicate1, filterDuplicate2, isLayer1Symbol, layer2Name );
	 }
	else if(paramSaveType == saveType.updateDuplicate) {
		saveDataUpdateDuplicate(symbol, jsonResult,  collectionName, filterDuplicate1, filterDuplicate2, isLayer1Symbol, layer2Name );
	 }

	return jsonResult;
}

function checkDuplicate(symbol, jsonRecord, dbRecords, filterDuplicate1, filterDuplicate2, layer2Name) {
	var isDuplicate = false;
	var isDuplicate1 = false;
	var isDuplicate2 = false;

	for (var dbRecord of dbRecords) {

		if(dbRecord[filterDuplicate1] == symbol) {
			isDuplicate1 = true;

			if (filterDuplicate2 == null) {
				isDuplicate = true
			}
			else if (filterDuplicate2 != null){

				if(dbRecord[layer2Name] != undefined) {

					for (var data of dbRecord[layer2Name]) {
						if( data[filterDuplicate2] == jsonRecord[filterDuplicate2] ) {
							isDuplicate2 = true;
							isDuplicate = true
						} 
					}
				}
				 
			}
			
		}

	}

	return {isDuplicate: isDuplicate,  isDuplicate1: isDuplicate1 , isDuplicate2: isDuplicate2};
}

async function saveDataIgnoreDuplicate ( symbol, jsonRecords,  collectionName, filterDuplicate1, filterDuplicate2 , isLayer1Symbol, layer2Name) { 

	//find data in db
	var dbRecords = await utilDB.find( collectionName, null) 

	//find duplicate data
	var arrNewJSONRecord = []
	var isDuplicate1 = false

	if ( jsonRecords == null || jsonRecords.length == undefined) {
		console.log ('json undefined or null')
	}
	else {
		console.log ('jsonRecords.length : ' + jsonRecords.length)

		for (var jsonRecord of jsonRecords) {

			if (symbol == null) {
				symbol = jsonRecord.symbol
			}

			var duplicateResult = checkDuplicate(symbol, jsonRecord, dbRecords, filterDuplicate1, filterDuplicate2, layer2Name)
			
			if (!duplicateResult.isDuplicate) { 
				 arrNewJSONRecord.push(jsonRecord) 
			}
	
			isDuplicate1 = duplicateResult.isDuplicate1;
			  
		}
	 
		//save non duplicate into db
		if (arrNewJSONRecord.length > 0) {
	 
			if (isLayer1Symbol == true){
	
				if (isDuplicate1) { 
	
					var result = await utilDB.updateMany( collectionName,  { symbol: symbol } , arrNewJSONRecord, layer2Name ) 
	
				}
				else {

					//console.log("insertOne symbol: " + symbol)
	
					arrJSONRecord = {
						"symbol": symbol
					}
					arrJSONRecord[layer2Name] = arrNewJSONRecord
					var result = await utilDB.insertOne( collectionName, arrJSONRecord) 
				}
	
				
	
			}
	
			else {
				var result = await utilDB.insertMany( collectionName, arrNewJSONRecord) 
	
			}
	
			console.log("Create data into " + collectionName + " layer2Name " + layer2Name + " count: ", arrNewJSONRecord.length )
		}
	}


}
exports.saveDataIgnoreDuplicate = saveDataIgnoreDuplicate

async function saveDataUpdateDuplicate ( symbol, jsonRecords,  collectionName, filterDuplicate1, filterDuplicate2 , isLayer1Symbol, layer2Name) { 

	//find data in db
	var dbRecords = await utilDB.find( collectionName, null) 

	//find duplicate data
	var arrNewJSONRecord = []
	var arrUpdateJSONRecord = [] 
	for (var jsonRecord of jsonRecords) {

		if (symbol == null) {
			symbol = jsonRecord.symbol
		}

		var duplicateResult = checkDuplicate( symbol, jsonRecord, dbRecords, filterDuplicate1, filterDuplicate2, layer2Name)
		 
		if (!duplicateResult.isDuplicate) {
			arrNewJSONRecord.push(jsonRecord)
		}
		else if (duplicateResult.isDuplicate) {
 			var updateOneOperation = {
				updateOne:
				{
					"filter": { "_id" : dbRecords._id },
					"update": { $set : jsonRecord },
				}
			}
			arrUpdateJSONRecord.push(updateOneOperation)
		}
	}

	//save duplicate into db
	if (arrUpdateJSONRecord.length > 0) {
		var result = await utilDB.bulkWrite( collectionName, arrUpdateJSONRecord) 
		console.log("Update data into " + collectionName + ", filterDuplicate1 : " + filterDuplicate1 + ", layer2Name : " + layer2Name + " count: ", arrUpdateJSONRecord.length )
	}

	//save non duplicate into db
	if (arrNewJSONRecord.length > 0) {
		var result = await utilDB.insertMany( collectionName, arrNewJSONRecord) 
		console.log("Create data into " + collectionName + ", filterDuplicate1 : " + filterDuplicate1 + " layer2Name : " + layer2Name + " count: ", arrNewJSONRecord.length )
	}

}
exports.saveDataUpdateDuplicate = saveDataUpdateDuplicate
 