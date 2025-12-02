$(function(){
	$('.animate').scrolla({
		moblie: true,
		once: false
	})
});

$(function(){
	Splitting();  //대문자로쓴다!!!
});


$(window).on('scroll resize', function(){
	var scrollPos = 0
	scrollPos = $(document).scrollTop();
	fixHeader();

	function fixHeader(){
		if(scrollPos > 80) {
			
		}
	}
})