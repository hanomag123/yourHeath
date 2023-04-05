document.addEventListener("DOMContentLoaded", () => {

    const xl = matchMedia('(max-width: 1024px)');

  class Menu {
    constructor(menuElement, buttonElement) {
      this.header = document.querySelector('header');
      this.menu = typeof menuElement === "string" ? document.querySelector(menuElement) : menuElement;
      this.button = typeof buttonElement === "string" ? document.querySelector(buttonElement) : buttonElement;
      this.overlay = document.createElement('div');
      this.overlay.hidden = true;
      this._init();
    };

    _init() {
      document.body.appendChild(this.overlay);
      this.overlay.classList.add('overlay');

      this.overlay.addEventListener('click', this.toggleMenu.bind(this));
      this.button.addEventListener('click', this.toggleMenu.bind(this));
    };

    toggleMenu() {
      this.menu.classList.toggle('menu--open');
      this.button.classList.toggle('menu-button--active');
      this.overlay.hidden = !this.overlay.hidden;

      if (this.isMenuOpen()) {
        this.header.classList.add('header--menu');
        this.disableScroll();
      } else {
        this.enableScroll();
        if (this.header.classList.contains('header--menu')) {
          this.menu.addEventListener('transitionend', this.bindFunc);
        };
      };
    };

    bindFunc = () => {
      this.hideaftertransition();
    };

    hideaftertransition() {
      if (this.header.classList.contains('header--menu') && !this.isMenuOpen()) {
        this.header.classList.remove('header--menu');
      };
      this.menu.removeEventListener('transitionend', this.bindFunc);

    };
    closeMenu() {
      this.menu.classList.remove('header__nav--active');
      this.button.classList.remove('header__menu-button--active');
      this.overlay.hidden = true;
      this.enableScroll();
    };

    isMenuOpen() {
      return this.menu.classList.contains('menu--open');
    };

    disableScroll() {
      document.documentElement.classList.add('no-scroll');
    };

    enableScroll() {
      document.documentElement.classList.remove('no-scroll');
    };
  };

  const menu = document.querySelector('.menu');
  const menuButton = document.querySelector('.menu-button');

  if (menu && menuButton) {
    new Menu(menu, menuButton);
  };


  const header = document.querySelector('header');

  let handler;

  function scrollAdd() {
    /* ... */
    handler = throttle(function (event) {
      scrollHeader();
    }, 500);
    document.addEventListener('scroll', handler, false);
  };

  function scrollRemove() {
    /* ... */
    document.removeEventListener('scroll', handler, false);
  };

  scrollAdd();


  function disableScroll() {
    // Get the current page scroll position;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollTop;
    document.documentElement.style.setProperty('scroll-behavior', 'auto');

    // if any scroll is attempted, set this to the previous value;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  };

  function enableScroll() {
    document.documentElement.style.setProperty('scroll-behavior', null);
    window.onscroll = function () { };
  };



  var prevScrollpos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  function scrollHeader() {
    var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScrollPos < 0) {
      currentScrollPos = 0;
      prevScrollpos = 0;
    };
    if (prevScrollpos < 0) {
      prevScrollpos = 0;
      currentScrollPos = 0;
    };
    const num = xl.matches ? 50 : 100;
    if (currentScrollPos > num) {
      header.classList.add('header--active');
    } else {
      header.classList.remove('header--active');
    };
    if (prevScrollpos >= currentScrollPos) {
      header.classList.remove('out');
    } else {
      header.classList.add('out');
    };
    prevScrollpos = currentScrollPos;
  };

  function throttle(func, ms) {
    let isThrottled = false,
      savedArgs,
      savedThis;

    function wrapper() {

      if (isThrottled) { // (2);
        savedArgs = arguments;
        savedThis = this;
        return
      };

      func.apply(this, arguments); // (1);

      isThrottled = true;

      setTimeout(function () {
        isThrottled = false; // (3);
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        };
      }, ms);
    };

    return wrapper;
  };

  const swiper = new Swiper('.main-swiper', {
      effect: "creative",
      speed: 400,
      creativeEffect: {
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      },
      navigation: {
        nextEl: '.main-swiper .next',
        prevEl: '.main-swiper .prev',
      },
  });

  const swiper2 = new Swiper('.ourComand-swiper', {
    slidesPerView: 'auto',
    speed: 400,
    navigation: {
      nextEl: '.ourComand .next',
      prevEl: '.ourComand .prev',
    },
    pagination: {
      el: ".ourComand-swiper .swiper-pagination",
      clickable: true,
    },
});


const swiper3 = new Swiper('.comments-swiper', {
  slidesPerView: 1,
  spaceBetween: 10,
  speed: 400,
  navigation: {
    nextEl: '.comments .next',
    prevEl: '.comments .prev',
  },
    // Responsive breakpoints;
    breakpoints: {
      // when window width is >= 320px;
      501: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
    },
    pagination: {
      el: ".comments-swiper .swiper-pagination",
      clickable: true,
    },
});

let swiper4 = null;

if (xl.matches) {
  swiper4 = new Swiper('.services-swiper', {
    loop: true,
    slidesPerView: 'auto',
    height: 'auto',
    spaceBetween: 10,
    breakpoints: {
      // when window width is >= 320px;
      501: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
    },
    pagination: {
      el: ".services-swiper .swiper-pagination",
      clickable: true,
    },
  });
};

xl.addEventListener('change', () => {
  if (xl.matches) {
    swiper4 = new Swiper('.services-swiper', {
      loop: true,
      slidesPerView: 'auto',
      height: 'auto',
      spaceBetween: 10,
      breakpoints: {
        // when window width is >= 320px;
        501: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
      },
      pagination: {
        el: ".services-swiper .swiper-pagination",
        clickable: true,
      },
    });
  } else {
    swiper4.destroy(true, true);
  };
});

const swiper5 = new Swiper('.about-swiper', {
  spaceBetween: 10,
  speed: 400,
  navigation: {
    nextEl: '.about-swiper .next',
    prevEl: '.about-swiper .prev',
  },
  pagination: {
    el: ".about-swiper .swiper-pagination",
    clickable: true,
  },
});

const swiper6 = new Swiper('.example-swiper', {
  spaceBetween: 10,
  speed: 400,
  navigation: {
    nextEl: '.example .next',
    prevEl: '.example .prev',
  },
  pagination: {
    el: ".example-swiper .swiper-pagination",
    clickable: true,
  },
});


const filterButtons = document.querySelectorAll('[data-fbtn]');
const filterNames = document.querySelectorAll('[data-fname]');
if (filterButtons.length && filterNames.length) {
  filterButtons.forEach(el => {
    el.addEventListener('click', function () {
      filterButtons.forEach(el => {
        el.classList.remove('filter-item--active');
      });
      this.classList.add('filter-item--active');
      filterNames.forEach(el => {
        if (this.dataset.fbtn === 'all') {
          el.hidden= false;
          return
        };
        const textField = this.dataset.fbtn;
        if (!textField) {
          return
        };
        const text = el.dataset.fname.split(/ |, |,/);
        if (text.length > 0) {
          text.some(filtername => filtername === textField) ? el.hidden = false : el.hidden = true;
        };
      });
    });
  });
};


function modalHandler() {
  const modal = document.querySelector(`${this.dataset?.modal}`) || this;
  if (modal.classList.contains('regModal') && modal.hidden) {
    disableScroll();
  } else {
    enableScroll();
  };
  if (modal) {
    if (modal.hidden) {
      modal.hidden = !modal.hidden;
      modal.style.setProperty('pointer-events', 'auto');
      setTimeout(() => {
        modal.style.opacity = 1;
      }, 10);
    } else {
      modal.style.opacity = 0;
      modal.style.setProperty('pointer-events', null);
      const numb = Number(getComputedStyle(modal).transitionDuration.match(/(\d+\.\d+)|(\d+)/g)[0]);
      if (numb > 0) {
        modal.addEventListener('transitionend', hideaftertransition);
      } else {
        modal.hidden = true;
      };
    };
  };
};

const regModal = document.querySelectorAll('.regModal');

if (regModal) {
  regModal.forEach(el => {
    el.addEventListener('click', function () {
      if (event.target.classList.contains('regModal')) {
        modalHandler.apply(this);
      };
    });
    const closeButton = el.querySelector('.close-button');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        modalHandler.apply(el);
      });
    };
  });
};

const buttonsModal = document.querySelectorAll('[data-modal]');

function hideaftertransition() {
  this.hidden = true;
  this.removeEventListener('transitionend', hideaftertransition);
};

if (buttonsModal.length) {
  buttonsModal.forEach(el => el.addEventListener('click', modalHandler));
};

function addMask() {
  [].forEach.call(document.querySelectorAll('input[type="tel"]'), function (input) {
    let keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      let pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      let matrix = "+7 (___) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i);
      };
      let reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      this.parentElement.classList.remove('error');
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    };

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);

  });

};
addMask();


const separators = document.querySelectorAll('.separator');
if (separators.length) {
  separators.forEach(el => {
    const prevImg = el.previousElementSibling;
    const nextImg = el.nextElementSibling;
    if (!nextImg || !prevImg) {
      return
    };
    if (prevImg.localName !== 'img' || nextImg.localName !== 'img') {
      return
    };
    let mc = new Hammer(el);

    mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 0 }) );
    
    let lastPosX = 0;
    let currentDeltaX = null;
    let clip = null;
    let clipNext = null;
    
    mc.on("panmove", function (ev) {
      const parentRect = ev.target.parentElement.getBoundingClientRect();
      const separatorRect = ev.target.getBoundingClientRect();
      const half = parentRect.width / 2;

      
      currentDeltaX = lastPosX + (ev.deltaX / 1);
      

      if (currentDeltaX > half - separatorRect.width) {
          currentDeltaX = half - separatorRect.width;
      };

      if (Math.abs(currentDeltaX) > half && currentDeltaX < 0) {
        currentDeltaX = half * -1;
      };
      clip = half - currentDeltaX - (separatorRect.width / 2);
      clipNext = half + currentDeltaX + (separatorRect.width / 2);

    prevImg.style.setProperty('clip-path', `inset(0 ${clip}px 0 0)`);
    nextImg.style.setProperty('clip-path', `inset(0 0 0 ${clipNext}px)`);
    ev.target.style.setProperty('transform', `translate3d(${currentDeltaX}px, 0, 0)`);

    });
    mc.on("panend", function(e) {
      lastPosX = currentDeltaX;
    });

    window.addEventListener('resize', () => {
      lastPosX = 0;
      currentDeltaX = null;
      clip = null;
      clipNext = null;
      prevImg.style.setProperty('clip-path', null);
      nextImg.style.setProperty('clip-path', null);
      el.style.setProperty('transform', null);
    });
    
  });
};

const readMoreButtons = document.querySelectorAll('.readmore-button');
if (readMoreButtons.length) {
  readMoreButtons.forEach(el => {
    el.addEventListener('click', function () {
      this.classList.add('active');
      disableScroll();
    });
  });
};

const hiddenModals = document.querySelectorAll('.hiddenModal');

if (hiddenModals.length) {
  hiddenModals.forEach(el => {
    el.addEventListener('click', function () {
      if (event.target === this) {
        readMoreButtons.forEach(el => {
          el.classList.remove('active');
        });
        enableScroll();
      };
      if (event.target.closest('.close-button')) {
        readMoreButtons.forEach(el => {
          el.classList.remove('active');
        });
        enableScroll();
      };
    });
  });
};

const selects = document.querySelectorAll('.select-button');
const closeSelect = () => {
  if (!event.target.closest('.select-list') && !event.target.closest('.select-button')) {
    selects.forEach(el => {
      el.classList.remove('active');
    });
  };
};

if (selects.length) {
  selects.forEach(el => {
    el.addEventListener('click', function () {
      this.classList.toggle('active');
      if (this.classList.contains('active')) {
        document.addEventListener('click', closeSelect);
      };
    });
  });
};

Fancybox.bind('.fancybox-iframe', {
  toolbar  : false,
  smallBtn : true,
  defaultType: 'iframe',
  showClass: "iframe-fancybox",
  iframe : {
    preload : false
  }
});



});