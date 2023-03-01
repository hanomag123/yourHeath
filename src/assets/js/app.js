document.addEventListener("DOMContentLoaded", () => {

    const xl = matchMedia('(max-width: 1024px)')

  class Menu {
    constructor(menuElement, buttonElement) {
      this.header = document.querySelector('header')
      this.menu = typeof menuElement === "string" ? document.querySelector(menuElement) : menuElement
      this.button = typeof buttonElement === "string" ? document.querySelector(buttonElement) : buttonElement
      this.overlay = document.createElement('div')
      this.overlay.hidden = true
      this._init()
    }

    _init() {
      document.body.appendChild(this.overlay)
      this.overlay.classList.add('overlay')

      this.overlay.addEventListener('click', this.toggleMenu.bind(this))
      this.button.addEventListener('click', this.toggleMenu.bind(this))
    }

    toggleMenu() {
      this.menu.classList.toggle('menu--open')
      this.button.classList.toggle('menu-button--active')
      this.overlay.hidden = !this.overlay.hidden

      if (this.isMenuOpen()) {
        this.header.classList.add('header--active')
        this.disableScroll()
      } else {
        this.enableScroll()
        if (this.header.classList.contains('header--active')) {
          this.menu.addEventListener('transitionend', this.bindFunc)
        }
      }
    }

    bindFunc = () => {
      this.hideaftertransition()
    }

    hideaftertransition() {
      if (this.header.classList.contains('header--active') && !this.isMenuOpen()) {
        this.header.classList.remove('header--active')
      }
      this.menu.removeEventListener('transitionend', this.bindFunc)

    }
    closeMenu() {
      this.menu.classList.remove('header__nav--active')
      this.button.classList.remove('header__menu-button--active')
      this.overlay.hidden = true
      this.enableScroll()
    }

    isMenuOpen() {
      return this.menu.classList.contains('menu--open')
    }

    disableScroll() {
      // Get the current page scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      // if any scroll is attempted, set this to the previous value
      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      };
    }

    enableScroll() {
      window.onscroll = function () { };
    }
  }

  const menu = document.querySelector('.menu')
  const menuButton = document.querySelector('.menu-button')

  if (menu && menuButton) {
    new Menu(menu, menuButton)
  }


  const header = document.querySelector('header')

  let handler;

  function scrollAdd() {
    /* ... */
    handler = throttle(function (event) {
      scrollHeader();
    }, 500);
    document.addEventListener('scroll', handler, false);
  }

  function scrollRemove() {
    /* ... */
    document.removeEventListener('scroll', handler, false);
  }

  if (xl.matches) {
    scrollAdd()
    document.removeEventListener('scroll', scrollHeader)
  } else {
    document.addEventListener('scroll', scrollHeader)
    scrollRemove()
  }

  xl.addEventListener('change', () => {
    if (xl.matches) {
      document.removeEventListener('scroll', scrollHeader);
      scrollAdd()
    } else {
      document.addEventListener('scroll', scrollHeader)
      scrollRemove()
    }
  })

  function disableScroll() {
    // Get the current page scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    document.documentElement.style.setProperty('scroll-behavior', 'auto')

    // if any scroll is attempted, set this to the previous value
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  function enableScroll() {
    document.documentElement.style.setProperty('scroll-behavior', null)
    window.onscroll = function () { };
  }



  var prevScrollpos = window.pageYOffset || document.documentElement.scrollTop;
  function scrollHeader() {
    var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    const num = xl.matches ? 50 : 100
    if (currentScrollPos > num) {
      header.classList.add('header--active')
    } else {
      header.classList.remove('header--active')
    }
    if (prevScrollpos > currentScrollPos) {
      header.classList.remove('out')
    } else {
      header.classList.add('out')
    }
    prevScrollpos = currentScrollPos;
  }

  function throttle(func, ms) {
    let isThrottled = false,
      savedArgs,
      savedThis;

    function wrapper() {

      if (isThrottled) { // (2)
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      func.apply(this, arguments); // (1)

      isThrottled = true;

      setTimeout(function () {
        isThrottled = false; // (3)
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }

    return wrapper;
  }

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
  })

  const swiper2 = new Swiper('.ourComand-swiper', {
    slidesPerView: 'auto',
    speed: 400,
    navigation: {
      nextEl: '.ourComand .next',
      prevEl: '.ourComand .prev',
    },
})
})











