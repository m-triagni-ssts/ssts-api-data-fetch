const utilDateTime = require('./modules/util_datetime_v1.0.0');

var currentDate = utilDateTime.getCurrentDate();
console.log(utilDateTime.formatDateToString(currentDate, 'MM-dd-yyyy'))
var newDate = utilDateTime.addMonth(currentDate, -1)
console.log(utilDateTime.formatDateToString(newDate, 'MM-dd-yyyy'))