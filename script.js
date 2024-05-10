const words1 = ['Software', 'Web', 'Graphic', 'Eclectic'];
const words2 = ['Engineer', 'Developer', 'Designer', 'Minded'];
let currentWordIndex1 = 0;
let currentWordIndex2 = 0;
let currentCharIndex1 = 0;
let currentCharIndex2 = 0;
let isTyping1 = true;
let isTyping2 = false;
const line1Element = document.getElementById('line1');
const line2Element = document.getElementById('line2');

function typeWriter() {
    const currentWord1 = words1[currentWordIndex1];
    const currentWord2 = words2[currentWordIndex2];

    if (isTyping1) {
        line1Element.textContent = currentWord1.substring(0, currentCharIndex1 + 1);

        if (currentCharIndex1 < currentWord1.length) {
            currentCharIndex1++;
            setTimeout(typeWriter, 100); // Adjust the speed here (in milliseconds)
        } else {
            isTyping1 = false;
            isTyping2 = true;
            currentWordIndex1 = (currentWordIndex1 + 1) % words1.length;
            currentCharIndex1 = 0;
            setTimeout(typeWriter, 1000); // Adjust the pause between words (in milliseconds)
        }
    } else if (isTyping2) {
        line2Element.textContent = currentWord2.substring(0, currentCharIndex2 + 1);

        if (currentCharIndex2 < currentWord2.length) {
            currentCharIndex2++;
            setTimeout(typeWriter, 100); // Adjust the speed here (in milliseconds)
        } else {
            setTimeout(eraseWord2, 1000); // Adjust the pause between words (in milliseconds)
        }
    }
}

function eraseWord2() {
    const currentWord2 = words2[currentWordIndex2];
    if (currentCharIndex2 > 0) {
        currentCharIndex2--;
        line2Element.textContent = currentWord2.substring(0, currentCharIndex2);
        setTimeout(eraseWord2, 50); // Adjust the erase speed here (in milliseconds)
    } else {
        currentWordIndex2 = (currentWordIndex2 + 1) % words2.length;
        currentCharIndex2 = 0;
        isTyping1 = true;
        isTyping2 = false;
        setTimeout(typeWriter, 500); // Adjust the pause between words (in milliseconds)
    }
}

typeWriter();



var timeout;

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

function circleChaptaKaro() {

  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

circleChaptaKaro();
circleMouseFollower();

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});
