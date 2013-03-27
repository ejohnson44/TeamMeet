$(function () {
  var MouseState = {
				'UP': 0,
				'NO_HIGHLIGHT': 1,
				'HIGHLIGHT': 2
	};
	mouseState = MouseState.UP;
  	$("#calendar td")
    	.mousedown(function () {
			if ($(this).hasClass("not_highlighted")) {
				mouseState = MouseState.HIGHLIGHT;
				$(this).toggleClass("highlighted");
				$(this).toggleClass("not_highlighted");
			}
			else if ($(this).hasClass("highlighted")){
				mouseState = MouseState.NO_HIGHLIGHT;
				$(this).toggleClass("highlighted");
				$(this).toggleClass("not_highlighted");
			}
			return false; // prevent text selection
		})
		.mouseover(function () {
			if (mouseState === MouseState.HIGHLIGHT) {
				if ($(this).hasClass("not_highlighted")) {
					$(this).toggleClass("highlighted");
					$(this).toggleClass("not_highlighted");
				}
			}
			else if (mouseState == MouseState.NO_HIGHLIGHT) {
				if ($(this).hasClass("highlighted")){
					$(this).toggleClass("highlighted");
					$(this).toggleClass("not_highlighted");
				}
			}
		});
  
  $(document)
    .mouseup(function () {
      	mouseState = MouseState.UP;
    });
});