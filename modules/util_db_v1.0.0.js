require('dotenv').config();
const {MongoClient} = require('mongodb');

exports.connect = async function (dbURL) {
    //const conn = mongoose.createConnection(dbURL);
    //return conn;

    console.log('connecting start')

    const client = new MongoClient(dbURL);

    await client.connect();

    return client

    /*
    mongoose.connect(dbURL, function (err, database) { 
        if (err) {
            console.log(`Server failed to connect to database :` + err);
            throw err
        } 
     }) 
     var db = mongoose.connection;
     
    return db
    */
}

exports.find = async function ( collectionName, findKey) {
    const client = new MongoClient(process.env.DB_URL);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
  
        // Make the appropriate DB calls
        const result = await client.db(process.env.DB_NAME).collection(collectionName).find(findKey);
  
        returnResult = await result.toArray();
 
         return returnResult;

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

exports.insertOne = async function ( collectionName, jsonDocument) {
    const client = new MongoClient(process.env.DB_URL);
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        console.log("insertOne")

        // Make the appropriate DB calls
        const result = await client.db(process.env.DB_NAME).collection(collectionName).insertOne(jsonDocument);
   
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

exports.insertMany = async function ( collectionName, jsonDocuments) {
    const client = new MongoClient(process.env.DB_URL);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
  
        console.log("insertMany")

        // Make the appropriate DB calls
        const result = await client.db(process.env.DB_NAME).collection(collectionName).insertMany(jsonDocuments);
   
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

exports.updateMany = async function ( collectionName, key, jsonDocuments, layerName){
    const client = new MongoClient(process.env.DB_URL);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
  
        console.log("updateMany")

        // Make the appropriate DB calls
        var updatedDoc = {}
        updatedDoc[layerName] = jsonDocuments
        const result = await client.db(process.env.DB_NAME).collection(collectionName)
            .updateMany( key , { $set: updatedDoc} );
   
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

exports.bulkWrite = async function ( collectionName, jsonOperations) {
    const client = new MongoClient(process.env.DB_URL);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
  
        console.log("bulkWrite")

        // Make the appropriate DB calls
        const result = await client.db(process.env.DB_NAME).collection(collectionName).bulkWrite(jsonOperations);
   
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}