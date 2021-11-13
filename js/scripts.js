function addSaveDiv(counter){
  const displayNumber = counter + 1;
  let divName = "<div class='col-md-1' id='saveColor" + counter +"'>" + displayNumber + ".</div>";
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




//UI logice
$(document).ready(function(){
  let counter = 0;
  let currentColorID= colorID(counter);
  let oldColorID = colorID(counter);
  let colorArray = [];

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
    for(let i = 0; i < counter; i++){
      let divName = addSaveDiv(i);
    $("#colorSaveRow").append(divName);
    }
    
    event.preventDefault();
  });
});