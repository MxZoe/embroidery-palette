//utility functions
//function to check if a color is in the given array and to return how many times it is
function numberInArray(hexArray, color){
  let occurances = 0;
  hexArray.forEach(function(element){
    if(element === color){
      occurances++;
    }
  });
  return occurances
}

//function to create a div for the saved colors and a number displayed in the div
function addSaveDiv(counter){
  let divName = "<div class='col-md-1' id='saveColor" + counter +"'></div>";
  return divName;
}
//function to create a div with class "row" and a dynamic id
function addRow(counter){
  let divName = "<div class='row' id='saveRow" + counter + "'></div>";
  return divName;
}
//function to create a div to display the current colors
function addDiv(counter){
  let divName = "<div class='col-md-3' id='displayColor" + counter +"'></div>";
  return divName;  
}

//function to create an id
function colorID(counter){
  return "#displayColor" + counter;
}
//function to create an id
function savedID(counter){
  return "#saveColor" + counter;
}

//business logic of Palette Object
/*
  Palettes get colors. Palettes can display colors. palettes can be saved. 
  colors can be deleted or added manually. palettes can be deleted
*/
//business logic for Color Object
/*function Color(hex, name){
  //take in a hex and turns it into a HSL value
  //has a name
  this.hex = hex;
  this.name = name
  this.hue = hue;
  this.saturation = sat;
  this.luminosity = lum;
}
 Colors get added to palettes.    
*/
//business logic
/*
add a palette
*/
//creates an array of random hex numbers with no repeating values
function randomHex(number){
  let hexArray = [];
  //let numberInArray = 0;
  for(let i = 0; i < number; i++){
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    occurances = numberInArray(hexArray, randomColor);
    //check if the newest color is already in the array
    while(occurances > 1){
      randomColor = Math.floor(Math.random()*16777215).toString(16);
      occurances = numberInArray(hexArray, randomColor);
    }
    
    hexArray.push(randomColor);
  }
  const symbolArray = hexArray.map(function(color){
      return "#" + color;
  });
  return symbolArray;
}
//don't know where this belongs
function createAndAddDiv(id, oldID){
  let divName = addDiv(id);
  $(oldID).after(divName);
}

//UI logice
$(document).ready(function(){
  let counter = 0;
  let display = $("#display-current-color");
  let currentColorID= colorID(counter);
  let oldColorID = display;
  let colorArray = [];
  let rowTracker = 0;
  let savedDisplay = false;

  $('#color-picker').spectrum({
    type: "flat",
    showInput: true,
    showAlpha: false,
    showPalette: false,
    showButtons: false
  });

  //display the current color of the colorpicker to div
  $("#color-picker").on('move.spectrum', function(e, color) { 
  let currentColor = color.toHexString(); // #ff0000
    $(display).css("background-color", currentColor);
  });

  //save the color of the color picker to the next div
  
  $("#saveButton").click(function(event){
    let currentColor = $("#color-picker").val();
    
      //create and add new div to the dom
      createAndAddDiv(counter, display)
      //saves the currentColorID to a different variable, oldColorID
      oldColorID = currentColorID;
      //adds to an array
      colorArray.push(currentColor);
      //changes the background of the div
      $(currentColorID).css("background-color", currentColor);
      //increases a counter
      counter++;
      //generates a new colorID using the counter and saves it to currentColorID
      currentColorID = colorID(counter);
      //adds the hexvalue to a list.
      $("#hexList").append("<li>" + currentColor + "</li>")
   
    event.preventDefault();
  });
  //take the saved div colors and make new divs with those colors in a new row
  $("#paletteButton").click(function(event){
    colorArray.sort();
    let newRow = addRow(rowTracker);
    let rowID = "#saveRow" + rowTracker;
    let countdown = colorArray.length;
    if(colorArray.length === 0){
      alert("You have not saved any colors!")
    } else{
      $("#savedContainer").prepend(newRow);
      for(let i = 0; i < colorArray.length; i++){
        let newDiv = addSaveDiv(i);
        let divID = savedID(i);
        let divName = colorID(i);
        let savedColor = colorArray[i];
        $(rowID).prepend(newDiv);
        $(divID).css("background-color", savedColor);
        $(divName).css("background-color", "#FFFFFF");
        countdown--;
      }
      $("#hexList").empty();
      counter = 0;
      colorArray.length = 0;
      currentColorID= colorID(counter);
      oldColorID = colorID(counter);
      rowTracker++;
      $("#savedContainer").show();
      savedDisplay = true;
    }
    event.preventDefault();
  });
  //toggle the saved colors
  $("#showSavedButton").click(function(){
    if(savedDisplay){
      $("#savedContainer").hide();
      savedDisplay = false;
    } else{
      $("#savedContainer").show();
      savedDisplay = true;
    }
  });

  $("#randomButton").click(function(event){
    colorAmount = parseInt($("#randomAmount").val());
    colorArray = randomHex(colorAmount);
    $("#paletteButton").click();
    event.preventDefault();
  })
}); 