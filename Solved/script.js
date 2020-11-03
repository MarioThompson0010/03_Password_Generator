// Assignment Code

var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// generate the password
function generatePassword() {

  // lowercase object: gets put into an array
  // name: the name of the object
  // numremaining: when stringing together the password, 
  // we'll decrement this value to see if this type of character should be printed. 
  // That's why it's called num remaining.
  // ascii range
  var lowercaseObject = {
    "name": "lowercase",
    "numremaining": 0,
    "asciinum": 97,
    "range": 26
  };

  // uppercase object: gets put into an array
  var uppercaseObject = {
    "name": "uppercase",
    "numremaining": 0,
    "asciinum": 65,
    "range": 26
  };

  // numericcase object: gets put into an array
  var numericcaseObject = {
    "name": "numericcase",
    "numremaining": 0,
    "asciinum": 48,
    "range": 10
  };

  // specialcase object: gets put into an array. Thee are
  // four ranges from which a special case ascii character can be
  // obtained.  They begin at the following numbers, and go for the following lengths.
  var specialcaseObject = {
    "name": "specialcase",
    "numremaining": 0,
    "asciinum1": {
      "ascii": 33,
      "range": 15
    },

    "asciinum2": {
      "ascii": 58,
      "range": 7
    },

    "asciinum3": {
      "ascii": 91,
      "range": 6
    },

    "asciinum4": {
      "ascii": 123,
      "range": 4
    }
  };

  var theCaseArray = []; // the array that holds the 4 different types of characters

  // utilize the power of the array
  theCaseArray[0] = lowercaseObject;
  theCaseArray[1] = uppercaseObject;
  theCaseArray[2] = numericcaseObject;
  theCaseArray[3] = specialcaseObject;

  var length = 0; // length of the password.
  var originalLength = length; // use this to have throughout program
  var loopStopLength = length; // use this to see if user clicked cancel 4 times in a row. Don't loop forever.
  var thechar = '';
  var thePassword = '';

  // prompt for lengths here
  var lengthString = prompt("Enter the length of the password");

  // did the user enter correct input?
  if (!validEntry(lengthString)) {
    return "";
  }

  length = parseInt(lengthString);
  loopStopLength = length;
  originalLength = length;

  if (length < 8 || length > 128) {
    alert("Enter a number between 8 and 128. Try again.");
    return "";
  }

  // Inform the user how many characters she has left to choose from.  Also, 
  // the user may loop back around if not all characters were selected during the first loop. 
  while (length > 0) {

    for (var i = 0; i < theCaseArray.length; i++) {
      var element = theCaseArray[i];
      var numEntered = errorCheckingAgainstNumberEntered(element.name, length);
      if (numEntered < 0) {
        alert("You entered bad data. Click again");
        return "";
      }
      if (numEntered > length) {
        alert("Number entered was greater than available characters. You have no more characters available.");
        element.numremaining += length;
        length = 0;
        break;
      }
      else {
        element.numremaining += numEntered;
        length = length - numEntered;
      }

      if (length <= 0) {
        break;
      }
    }

    if (loopStopLength === length) {
      alert("You clicked Cancel 4 times in a row. Click Generate Password button again.");
      return "";
    }

    loopStopLength = length; //prepare to check for 4 cancels in a row. Don't make the user loop forever.
  }

  // now, loop through the array and generate the password according to the user's selections.
  var numberOfCharactersLength = originalLength;

  var indexIntoArray = 0; //numberOfCharactersLength % theCaseArray.length;

  // while the number of characters is greater than 0
  while (numberOfCharactersLength > 0) {

    var element = theCaseArray[indexIntoArray];
    if (element.name !== "specialcase") {

      if (element.numremaining > 0) {
        thechar = randomFunc(element.asciinum, element.range);
        thePassword += thechar;
        element.numremaining--;
        numberOfCharactersLength--;
      }
    }
    // the special case character is a special case because it has four ranges instead of one.
    else {

      if (element.numremaining > 0) {
        var numrandom = (4 * Math.random()); // 0 through 3
        numrandom = Math.floor(numrandom);
        switch (numrandom) {
          case 0:
            {
              thechar = randomFunc(element.asciinum1.ascii, element.asciinum1.range);
              thePassword += thechar;
              break;
            }
          case 1:
            {
              thechar = randomFunc(element.asciinum2.ascii, element.asciinum2.range);
              thePassword += thechar;
              break;
            }
          case 2:
            {
              thechar = randomFunc(element.asciinum3.ascii, element.asciinum3.range);
              thePassword += thechar;
              break;
            }
          case 3: {
            thechar = randomFunc(element.asciinum4.ascii, element.asciinum4.range);
            thePassword += thechar;
            break;
          }
          default: {
            break;
          }
        }

        element.numremaining--;
        numberOfCharactersLength--;
      }
    }

    indexIntoArray++;
    indexIntoArray = indexIntoArray % theCaseArray.length;
  }

  return thePassword;
}

// check if user entered a valid length
function checkIfUserEnteredValidLength(length) {
  if (length < 0) {
    alert("You entered a number that exceeded the length. Click again.");
    return false;
  }

  return true;
}

// perform error checking against number entered
function errorCheckingAgainstNumberEntered(numoftype, length) {
  var charsRemain = prompt("Enter number of " + numoftype + " characters you want:\r\nYou may choose up to " +
    length + " characters");

  if (charsRemain === null) {
    charsRemain = "0"; //interpret cancels as zeros
  }

  if (!validEntry(charsRemain)) {
    return -1;
  }

  var numberCharsRemaining = parseInt(charsRemain);

  if (!checkIfUserEnteredValidLength(numberCharsRemaining)) {
    return -1;
  }

  if (numberCharsRemaining < 0) {
    return -1;
  }

  return numberCharsRemaining;
}

// is it a valid entry?
function validEntry(entry) {
  var notnumber = /[^0-9]+/g; // is it only a number?
  var nonnumberTester = notnumber.test(entry); // test it

  if (entry === '') {
    alert("You must enter a number");
    return false;
  }

  if (nonnumberTester) {
    alert("You must enter numeric characters between 8 and 128");
    return false;
  }

  return true;
}

// returns a random ascii character
function randomFunc(lowerlimit, howmany) {
  var numrandom = (howmany * Math.random());
  numrandom = Math.floor(numrandom);
  numrandom += lowerlimit;
  var asciichar = String.fromCharCode(numrandom);
  return asciichar;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
