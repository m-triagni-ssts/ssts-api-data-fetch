exports.formatDateToString = function (date, formatDate) {
  let day = ("0" + date.getDate()).slice(-2);
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let monthTrigramName = "" ;
  if (formatDate.includes("MMM")) {
    monthTrigramName = getMonthTrigramName(date.getMonth());
  }

  let monthName = "" ;
  if (formatDate.includes("MMMM")) {
    monthName = getMonthName(date.getMonth());
  }

  let dayTrigramName = "" ;
  if (formatDate.includes("ddd")) {
    dayTrigramName = getDayTrigramName(date.getDate());
  }

  let dayName = "" ;
  if (formatDate.includes("dddd")) {
    dayName = getDayName(date.getDate());
  }

  var stringDate = formatDate ;
  stringDate = stringDate.replace("dddd", dayName);
  stringDate = stringDate.replace("ddd", dayTrigramName);
  stringDate = stringDate.replace("dd", day);
  stringDate = stringDate.replace("MMMM", monthName);
  stringDate = stringDate.replace("MMM", monthTrigramName);
  stringDate = stringDate.replace("MM", month);
  stringDate = stringDate.replace("yyyy", year);
  stringDate = stringDate.replace("yy", ("0" + year).slice(-2));
  stringDate = stringDate.replace("hh", hours);
  stringDate = stringDate.replace("mm", minutes);
  stringDate = stringDate.replace("ss", seconds);

  return stringDate;
}

exports.getMonthTrigramName = function (monthNumber) {
  return getMonthName(monthNumber).substr(0,3);
}

exports.getMonthName = function (monthNumber) {
  switch (monthNumber) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "Mei";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    }
}

exports.getDayName = function (dayNumber) {
  switch (dayNumber) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    }
}

exports.getDayTrigramName = function (dayNumber) {
  return getDayName(dayNumber).substr(0,3);
}

exports.getCurrentDate = function() {
  let date_ob = new Date();
  return date_ob;
}

exports.addMonth = function(date, addMonth) {
  var newDate = new Date(date.setMonth(date.getMonth()+addMonth));
  return newDate;
}