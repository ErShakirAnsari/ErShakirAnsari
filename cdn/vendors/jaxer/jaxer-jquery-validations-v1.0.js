/*!
 *
 ************************************************
 * Required jQuery lib to work
 ************************************************
 * @version : 1.0
 * @date    : Oct 15, 2014, 6:56:11 PM
 * @author  : SKR
 */

//-----------------------------------------------
function _isLength(value, minLength, maxLength) {
   return (value.length >= minLength && value.length <= maxLength);
}
function _isValue(value, minLength, maxLength) {
   return (value >= minLength && value.length <= maxLength);
}

function checkSingleName(singleName, minLength, maxLength) {
   if(_isLength(singleName, minLength, maxLength)) {
      var pattern = new RegExp(/^[A-Za-z]$/);
      return pattern.test(singleName);
   }
   return false;
}
function checkDoubleName(fullName, minLength, maxLength) {
   if(_isLength(fullName, minLength, maxLength)) {
      var pattern = new RegExp(/^[A-Za-z ]$/);
      alert('Wrong Pettern');
      return pattern.test(fullName);
   }
   alert('Wrong Length');
   return false;
}

function checkSingleUsername(singleUsername, minLength, maxLength) {
   if(_isLength(singleUsername, minLength, maxLength)) {
      var pattern = new RegExp(/^[A-Za-z0-9_]$/);
      return pattern.test(singleUsername);
   }
   return false;
}
function checkDoubleUsername(doubleUsername, minLength, maxLength) {
   if(_isLength(doubleUsername, minLength, maxLength)) {
      var pattern = new RegExp(/^[A-Za-z0-9_ ]$/);
      return pattern.test(doubleUsername);
   }
   return false;
}

function checkEmail(email, minLength, maxLength) {
   if(_isLength(email, minLength, maxLength)) {
      var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/);
      return pattern.test(email);
   }
   return false;
}

function checkDigits(digits, minLength, maxLength) {
   if(_isValue(digits, minLength, maxLength)) {
      var pattern = new RegExp(/^[0-9]$/);
      return pattern.test(digits);
   }
   return false;
}