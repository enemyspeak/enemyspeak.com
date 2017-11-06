$(".background-selector a").each(function(index){
	var currentIndex = ++index;
	var currentImage = $(this).data("index", currentIndex).data("image");
		$("#background-container").append($(document.createElement("div")).css("backgroundImage", "url(" + currentImage + ")").attr("id", ("image" + currentIndex)).addClass("overlay background"));
});

var currentSelection = 0;

$(".background-selector a").mouseenter(function(){
	var newSelection = $(this).data("index");
	if (newSelection > 0 && newSelection !== currentSelection) {
		currentSelection = newSelection;
		$(".overlay.background").stop(true);
		$(".overlay.screen-container").fadeTo(300, 0.9);
		$("#image" + newSelection).fadeTo(0,0).appendTo("#background-container").fadeTo(400,1);
	}
});

$(".reset").mouseenter(function(){
	if (currentSelection > 0) {
		currentSelection = 0;
		$(".overlay.background").stop(true, true).fadeTo(300,0);
		$(".overlay.screen-container").fadeTo(300,1);
	}
});