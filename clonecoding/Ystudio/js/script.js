// a의 기본속성 (click시 위로 튕김현상 제거)
$(document).on('click', 'a[href= "#"]', function(e){
    e.preventDefault();
})



$(function(){
    $('.visual .slide').slick({
        arrow: true,
        dots: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: false,
        pauseOnFocus: false
    }); //visual slide에 슬릭이 붙어라
});


$(function(){
    Splitting();
});


$(function() {
	$('.animate').scrolla({
		mobile: true, //모바일버전시 활성화
		once: false //스크롤시 딱 한번만 하고싶을땐 true
	});    
});



//fixHeader
var scrollTop = 0;
//console.log(scrollTop);
scrollTop = $(document).scrollTop();
fixHeader();

$(window).on('scroll resize', function() {
    scrollTop = $(document).scrollTop();
    fixHeader();
})

function fixHeader() {
    if(scrollTop > 150) {
        $('header').addClass('on');
    }
    else {
        $('header').removeClass('on');
    }
}

// gnbMenu
$(function(){
   $('.menuOpen').on('click', function(){
    $('.gnb').addClass('on');
   });
   $('.close').on('click', function(){
    $('.gnb').removeClass('on');
   })
});


// top버튼 상단으로 부드럽게 이동
$(function(){
    $('.goTop').on('click', function(){
     const top = $('body').offset().top;
        // offset()함수는 원하는 선택자의 위치값을 .top .left...형식으로 반환
    $('html, body').animate({scrollTop : (top)},800);
    })
});