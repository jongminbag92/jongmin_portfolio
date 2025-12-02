$(document).on('click', 'a[href= "#"]', function(e){
    e.preventDefault();
})

$(function() {
	$('.animate').scrolla({
		mobile: true, //모바일버전시 활성화
		once: false //스크롤시 딱 한번만 하고싶을땐 true
	});    
}); 


// fixHeader
$(window).on('scroll resize', function(){
	var scrollPos = 0
	scrollPos = $(document).scrollTop();
	console.log(scrollPos)
	fixHeader();

	function fixHeader(){
		if(scrollPos > 80){
			$('header').addClass('on');
			$('header .headLogo').addClass('on');
		}
		else{
			$('header').removeClass('on');
			$('header .headLogo').removeClass('on');
		}
	}
})



// gnb
$(function(){
	$('.menuOpen').on('click', function(){
		$(this).toggleClass('active'); // menuOpen에 active 토글
		$('.gnb').toggleClass('on'); // gnb 열고 닫기
		
		// 로고 이미지 변경: 1번째/2번째 이미지 토글
		$('.headLogo img:nth-child(1)').removeClass('hide').addClass('show');
		$('.headLogo img:nth-child(2)').removeClass('show').addClass('hide');
	});

	// 스크롤 이벤트
	$(window).on('scroll', function() {
		if ($(this).scrollTop() > 0) { 
			// 스크롤을 내렸을 때
			$('.headLogo img:nth-child(1)').addClass('hide').removeClass('show');
			$('.headLogo img:nth-child(2)').addClass('show').removeClass('hide');
		} else {
			// 스크롤이 맨 위에 있을 때
			$('.headLogo img:nth-child(1)').removeClass('hide').addClass('show');
			$('.headLogo img:nth-child(2)').removeClass('show').addClass('hide');
		}
	});
});






// visual 슬라이드
$(function () {
	const circleLength = 2 * Math.PI * 54;

	$('.visual .slide').on('init reInit afterChange', function (event, slick, currentSlide) {
	  // 모든 원형 바 애니메이션 클래스 제거
	$('.progress').removeClass('animate').css('stroke-dashoffset', circleLength);

	// 현재 슬라이드에서 .progress에만 애니메이션 부여
	$('.slick-current .progress').addClass('animate');
	
	// 카운터 업데이트
	const currentIndex = (currentSlide || 0) + 1;
	const totalSlides = slick.slideCount;

	$('.slick-current .current').text(currentIndex.toString().padStart(2, '0'));
	$('.slick-current .total').text(totalSlides.toString().padStart(2, '0'));
});

	$('.visual .slide').slick({
		arrows: false,
		dots: false,
		autoplay: true,
		autoplaySpeed: 4000,
		fade: true,
		pauseOnHover: false,
		pauseOnFocus: false,
		pauseOnDotsHover: false
	});
});




// 스크롤시 text 슬라이드
document.addEventListener("DOMContentLoaded", (event) => {
gsap.registerPlugin(ScrollTrigger)

const isMobile = window.matchMedia("(max-width: 1025px)").matches;
const scrollDistance = isMobile ? window.innerWidth * 0.8 : window.innerWidth * 1.5;


	$(function(){
		gsap.timeline({
			scrollTrigger:{
				trigger:'.scrollTxt',
				start:'top 90%',
				end:'bottom 20%',
				scrub: 1,
				//markers:true
			}
		})
		.to(".scrollTxt", { x: "-scrollDistance", duration: 20, ease: "none" }, 0.2);
		
	});
});



// 마우스 커스텀포인터
document.addEventListener('DOMContentLoaded', () => {
	const customCursor = document.querySelector('.custom-cursor');
	const textElem = document.querySelector('.text');
	const imgElem = document.querySelector('.custom-cursor .img img');
	
	const cursorTargets = document.querySelectorAll('.cursor-target');
	
	let mouseX = 0, mouseY = 0;
	let currentX = 0, currentY = 0;
	let isActive = false;
	let originalImgSrc = imgElem.src; 

	// 마우스 좌표 추적 (li 안에서만)
	cursorTargets.forEach(item => {
	item.addEventListener('mouseenter', () => {
		const newText = item.getAttribute('data-text');
		const newImg = item.getAttribute('data-img');

		if (newText) textElem.textContent = newText;
		if (newImg) imgElem.src = newImg;
		if (item.classList.contains('bottomBtn')) {
			customCursor.classList.add('bottomBtn-active');
		} else {
		customCursor.classList.remove('bottomBtn-active');
		}

		customCursor.style.opacity = '1';
		customCursor.style.display = 'block';
		customCursor.style.transform = `scale(1)`;
		isActive = true;
	});

	item.addEventListener('mouseleave', () => {
		
		customCursor.style.opacity = '0';
		customCursor.style.transform = `scale(0.5)`;
		isActive = false;

		imgElem.src = originalImgSrc;
		textElem.textContent = '';
		
	});

	item.addEventListener('mousemove', (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});
	});

	// 부드러운 움직임
	function animate() {
	if (isActive) {
		currentX += (mouseX - currentX) * 0.15;
		currentY += (mouseY - currentY) * 0.15;

		customCursor.style.left = `${currentX}px`;
		customCursor.style.top = `${currentY}px`;
		customCursor.style.transform = `scale(1)`;
	}
	requestAnimationFrame(animate);
	}
	animate();
});



// 상단으로 부드럽게 이동
$(function() {
	$('.goTop').on('click', function (e) {
	  e.preventDefault(); // 링크 기본동작 방지
	$('html, body').stop().animate({ scrollTop: 0 }, 600);
	});
});


// li 버튼 토클
$(function(){
    $('.top ul li').on('click', function(){
		$(this).toggleClass('on');
    });
});


