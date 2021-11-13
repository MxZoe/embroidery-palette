function addDiv(oldID, counter){
  const divName = "<div class='col-md-3' id='displayColor" + counter + "'></div>";
    $(oldID).after(divName);
}
function addSpan(targetID, counter){
  const spanName = "<span class='displayHex' id='displayHex" + counter + "'></span>";
  $(targetID).append(spanName)

}
function colorID(counter){
  return "#displayColor" + counter;
}

function hexID(counter){
  return "#displayHex" + counter;
}


$(document).ready(function(){
  let counter = 0;
  let currentColorID= colorID(counter);
  let oldColorID = colorID(counter);
  let currentHexID = hexID(counter);
  let oldHexID = hexID(counter);
  $("#colorPick").on("input", function(){
    let currentColor = $("#colorPick").val();
    $(currentColorID).css("background-color", currentColor);
  });
  $("#saveButton").click(function(event){
    if(counter <=11){
      let currentColor = $("#colorPick").val();
      $(currentHexID).html(currentColor);
      $(currentColorID).css("background-color", currentColor);
      oldColorID = currentColorID;
      oldHexID = currentHexID;
      counter++;  
      currentColorID = colorID(counter);
      currentHexID = hexID(counter);
    } else{
      let currentColor = $("#colorPick").val();
      addDiv(oldColorID, counter);
      oldColorID = currentColorID;
      oldHexID = currentHexID;
      $(currentHexID).html(currentColor);
      $(currentColorID).css("background-color", currentColor);
      counter++;
      currentColorID = colorID(counter);
      currentHexID = hexID(counter);
    };


    event.preventDefault();
  });
});