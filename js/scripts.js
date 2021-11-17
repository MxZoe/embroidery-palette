//utility functions
function addSaveDiv(counter, countdown){

  let divName = "<div class='col-md-1' id='saveColor" + counter +"'>" + countdown + ".</div>";
  return divName;
}
function addRow(counter){
  let divName = "<div class='row' id='saveRow" + counter + "'></div>";
  return divName;
}
function addDiv(counter){
  const displayNumber = counter + 1;
  let divName = "<div class='col-md-3' id='displayColor" + counter +"'>" + displayNumber + ".</div>";
  return divName;  
}
function colorID(counter){
  return "#displayColor" + counter;
}
function savedID(counter){
  return "#saveColor" + counter;
}
//business logic
function randomHex(number){
  let hexArray = [];
  for(let i = 0; i < number; i++){
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    hexArray.push("#" + randomColor);
  }
  return hexArray;
}





//UI logice
$(document).ready(function(){
  let counter = 0;
  let currentColorID= colorID(counter);
  let oldColorID = colorID(counter);
  let colorArray = [];
  let rowTracker = 0;
  let savedDisplay = false;

  $("#colorPick").on("input", function(){
    let currentColor = $("#colorPick").val();
    $(currentColorID).css("background-color", currentColor);
  });
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
    }
    event.preventDefault();
  });
  $("#showSavedButton").click(function(){
    if(savedDisplay){
      $("#savedContainer").hide();
      savedDisplay = false;
    } else{
      $("#savedContainer").show();
      savedDisplay = true;
    }
  });

  $("#randomButton").click(function(){
    colorArray = randomHex(12);
    for(let i = 0; i < colorArray.length; i++){
      currentColorID = colorID(i);
      $(currentColorID).css("background-color", colorArray[i]);
    }
  });
}); 