/*function addDiv(id){
  const divName = "<div class='col-sm-1' id='" + id + "'></div>"
  $(".row").append(divName);
}

function displayChosenColor(id, hexValue){
  const newId = "#" + id;
  $(newId).html(hexValue);
}
*/
function colorID(counter){
  return "#displayColor" + counter;
}

function hexID(counter){
  return "#displayHex" + counter;
}


$(document).ready(function(){
  let idCounter = 0;
  let displayColorId = colorID(idCounter);
  let displayHexId = hexID(idCounter);
  $("#colorPick").on("input", function(){
    let currentColor = $("#colorPick").val();
    $(displayColorId).css("background-color", currentColor);
  });
  $("#saveButton").click(function(event){
    let currentColor = $("#colorPick").val();
    $(displayColorId).show();
    $(displayHexId).html(currentColor);
    $(displayColorId).css("background-color", currentColor);
    idCounter++;
    displayColorId = colorID(idCounter);
    displayHexId = hexID(idCounter);

    event.preventDefault();
  });
});