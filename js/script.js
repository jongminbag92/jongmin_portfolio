gsap.registerPlugin(ScrollTrigger, TextPlugin, MotionPathPlugin, ScrollToPlugin);

let workScrollTween = null;

document.addEventListener("DOMContentLoaded", () => {
  preventAnchorBounce();
  header_menu();
  mainTextBox();
  tag();
  infiniteMarquee();
  initWorkHorizontalScroll();
  setupHoverVideos();
  footerMarquee();
  popup();
  topBtn();
  clonCoding();
});

window.addEventListener('load', () => {
  attachImageCursor();
});

function preventAnchorBounce() {
    $(document).on('click', 'a[href="#"]', function (e) {
        e.preventDefault();
    });
}

function header_menu() {
let menuOpen = document.querySelector(".gnb .menuOpen");   
let menuBox = document.querySelector(".gnb .menuBox");
let menuLinks = document.querySelectorAll(".gnb .menuBox li a");
    
menuOpen.addEventListener("click",() => { 
        menuBox.classList.toggle("on");
})
menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            menuBox.classList.remove("on");
        });
    });
}

function mainTextBox() {  
gsap.utils.toArray(".mainTextBox .title span").forEach((selector) => {// 대상을 'selector'에 저장하고 forEach로 함수를 작성을해야 각각 타임라인이 적용된다 -> 아니면 한번에 애니메이션이 들어가 버림      
    gsap.timeline({
        scrollTrigger: {
            trigger: selector,
            start: '100% 100%', 
            end: '100% 100%', // SVG애니 타이밍과 거의 동일 하지만 종료 지점(scroller-end) 을 100%로 옮겨서 시작과 동시에 끝이 빠르게 진행되도록 해준다
            scrub: 1,
            //markers: true,
        }
    })
    // gsap.fromTo() 메서드는 시작 점과 끝나는 점을 지정하는 애니메이션 -> gsap.fromTo("타겟", {시작 속성: 시작 속성값, ....},{끝나는 속성: 끝나는 속성값, ....});
    // fromTo 참고 url -> https://greensock.com/docs/v3/GSAP/gsap.fromTo()
    .fromTo(selector,{'overflow': 'hidden', y:'150'}, { y:'0',ease: 'none',duration: 5},0)
}); 
}

// strength-tag
function tag() {
    gsap.set(".tag", {
        opacity: 0,
        y: 30,
        scale: 0.1
    });

    gsap.to(".tag", {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "expo.out",
        stagger: 0.25,
        scrollTrigger: {
            trigger: ".strength-section",
            start: "50% 75%",      
        }
    });
}

// marquee
function infiniteMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;

  // 이미 복제된 상태면 또 복제되지 않도록 방지
  if (!track.dataset.cloned) {
    track.innerHTML += track.innerHTML;
    track.dataset.cloned = "true";
  }
}

function initWorkHorizontalScroll() {

    const sections = gsap.utils.toArray(".work-slide");

    // 메인 가로 스크롤
    const horizontalScroll = gsap.to(sections, {
        id: "horScroll",
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".work-list",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            end: () => "+=" + window.innerWidth * (sections.length - 1),
        }
    });
}

function setupHoverVideos() {
  const wraps = document.querySelectorAll('.video-wrap');

  wraps.forEach(wrap => {
    const video = wrap.querySelector('.hover-video');
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    wrap.addEventListener('mouseenter', () => {
      video.currentTime = 0;
      video.play().catch(err => console.log("play error", err));
    });

    wrap.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}

window.addEventListener("load", setupHoverVideos);



function attachImageCursor() {
  document.querySelectorAll('.work-img').forEach(box => {
    if (box.dataset.cursorInit) return; // 중복 방지
    box.dataset.cursorInit = '1';

    const cursor = document.createElement('div');
    cursor.className = 'img-cursor';
    cursor.textContent = 'MORE VIEW';
    box.appendChild(cursor);

    box.addEventListener('mouseenter', () => {
      box.classList.add('cursor-visible');
    });

    box.addEventListener('mousemove', (e) => {
      const r = box.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      cursor.style.left = x + 'px';
      cursor.style.top  = y + 'px';
    });

    box.addEventListener('mouseleave', () => {
      box.classList.remove('cursor-visible');
    });

    box.addEventListener('mousedown', () => cursor.classList.add('is-down'));
    box.addEventListener('mouseup',   () => cursor.classList.remove('is-down'));
  });
}

function clonCoding() {
  
// [ 스크립트 7 - con3 의 listBox 카드 날라오는 스크롤트리거 애니메이션 ]   
gsap.utils.toArray(".clone-coding .listBox li").forEach((selector, t) => { 
    // create 참고 ->https://greensock.com/docs/v3/Plugins/ScrollTrigger/static.create()
    ScrollTrigger.create({
        trigger: selector,
        start: "start 100%",
        onEnter: ()=>{ // onEnter - 스크롤 위치가 "시작"을 지나 앞으로 이동할 때 (시작 지점을 지나 스크롤 내릴때 진행되고 올릴땐 진행되지 않음)
            gsap.set(selector, { // https://greensock.com/docs/v3/GSAP/gsap.set()
                rotationX: "-65deg",
                z: "-500px",
                opacity: 0
            }),
            gsap.to(selector, {
                rotationX: "0",
                z: "0",
                opacity: 1,
                delay: t % 3 * .05
            })
        },
        //markers: true,
    })
}); 
}

function footerMarquee() {
   const el = document.querySelector('.footer-intro .marquee__inner');
    if (!el) return;
    el.innerHTML += el.innerHTML; // 한 번 더 이어붙이기(총 2배)
}


function popup() {
  const emailLink = document.querySelector(".footer__email");
  const popup = document.getElementById("copyPopup");
  const email = "jongminbag92@gmail.com";

  emailLink.addEventListener("click", (e) => {
    e.preventDefault();

    // 클립보드에 이메일 복사
    navigator.clipboard.writeText(email).then(() => {
      // 팝업 표시
      popup.classList.add("show");

      // 1.5초 후 팝업 숨김
      setTimeout(() => {
        popup.classList.remove("show");
      }, 1500);
    });
  });
}

function topBtn() {
  const topBtn = document.getElementById("topBtn");

// 스크롤 시 버튼 노출 여부 설정
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

// 버튼 클릭 시 맨 위로 스크롤
topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
}


