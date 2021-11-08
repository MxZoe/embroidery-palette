function addDiv(id){
  $(".row").append("<div class='col-sm-1' id='" + id + "'>test</div>");
}
$(document).ready(function(){
  let colors = [];
  $("#saveButton").click(function(event){
    let currentColor = $("#colorPick").val();
    colors.push(currentColor);
    id = "color" + colors.length
    addDiv(id)
    $(id).css("background-color", currentColor);
    event.preventDefault();
  });
});