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
function addSaveDiv(counter, countdown){
  let divName = "<div class='col-md-1' id='saveColor" + counter +"'>" + countdown + ".</div>";
  return divName;
}
//function to create a div with class "row" and a dynamic id
function addRow(counter){
  let divName = "<div class='row' id='saveRow" + counter + "'></div>";
  return divName;
}
//function to create a div to display the current colors
function addDiv(counter){
  const displayNumber = counter + 1;
  let divName = "<div class='col-md-3' id='displayColor" + counter +"'>" + displayNumber + ".</div>";
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

//business logic
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


//UI logice
$(document).ready(function(){
  let counter = 0;
  let currentColorID= colorID(counter);
  let oldColorID = colorID(counter);
  let colorArray = [];
  let rowTracker = 0;
  let savedDisplay = false;

  //display the current color of the colorpicker to div
  $("#colorPick").on("input", function(){
    let currentColor = $("#colorPick").val();
    $(currentColorID).css("background-color", currentColor);
  });
  //save the color of the color picker to the next div
  $("#saveButton").click(function(event){
    if(counter <=11){
      let currentColor = $("#colorPick").val();
      colorArray.push(currentColor);
      $(currentColorID).css("background-color", currentColor);
      oldColorID = currentColorID;
      counter++;  
      currentColorID = colorID(counter);
      $("#hexList").append("<li>" + currentColor + "</li>")
      
    } else{
      let currentColor = $("#colorPick").val();
      let divName = addDiv(counter);
      $(oldColorID).after(divName);
      oldColorID = currentColorID;
      colorArray.push(currentColor);
      $(currentColorID).css("background-color", currentColor);
      counter++;
      currentColorID = colorID(counter);
      $("#hexList").append("<li>" + currentColor + "</li>")
    };
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
        let newDiv = addSaveDiv(i, countdown);
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
  });
}); 