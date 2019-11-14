export default class CursorLogic {
  constructor() {
    this.cursor = document.querySelector('.cursor');
    this.defaultCircle = document.querySelector('.default_circle');
    this.instantMove = document.querySelector('.instant_move');
    this.bgCircle = document.querySelector('.bg_circle');
    this.x = 0;
    this.y = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.interval = null;
    this.bgCircleCorrection = 12;

    this.arrow = document.querySelector('.arrow');

    this.screenMiddle = window.innerWidth / 2;
    this.cursorCountriesDEG = 45;
    this.mousemoveTimeout = 0;
    this.mouseMoveEnd = 0;

    this.header = document.querySelector('header');
    this.sliderSection = document.querySelector('.home_page_slider');
    this.feedbackSection = document.querySelector('.feedback_section');
    this.countriesSection = document.querySelector('.countries_list');
    this.formSubmit = document.querySelector('[type=submit]');
  }

  enableListeners() {
    document.addEventListener('mousemove', e => {
      this.x = e.clientX - 3;
      this.y = e.clientY - 3;
      this.mouseMoveEnd = new Date();

      if (!this.interval) this.enableInterval();
    })

    window.addEventListener('resize', () => {
      this.screenMiddle = window.innerWidth / 2;
    })

    this.sliderSection.addEventListener('mouseenter', () => {
      this.cursor.classList.add('display_arrow')
      this.sliderHandlerEnable();
    })

    this.sliderSection.addEventListener('mouseleave', () => {
      this.cursor.classList.remove('display_arrow')
      this.sliderHandlerDisable()
    })

    // // // // // // COUNTRIES SECTION // // // // / //

    this.countriesSection.addEventListener('mouseenter', () => {
      this.cursor.classList.add('display_cursor_country');
    })

    this.countriesSection.addEventListener('mouseleave', e => {
      this.cursor.classList.remove('display_cursor_country');
    })

    this.countriesSection.querySelectorAll('.country').forEach(item => {
      item.addEventListener('mouseenter', () => {
        this.cursorCountriesDEG += 45;
        document.querySelector('.cursor_country').style.transform = `translate(-15px, -15px) rotate(${this.cursorCountriesDEG}deg)`
      })
    })

    // // // // // // // // // // // // // // // // / //

    this.formSubmit.addEventListener('mouseenter', () => {
      this.cursor.classList.remove('feedback_section_cursor');
    })

    this.formSubmit.addEventListener('mouseleave', () => {
      this.cursor.classList.add('feedback_section_cursor');
    })

    this.feedbackSection.addEventListener('mouseenter', () => {
      this.cursor.classList.add('feedback_section_cursor');
    })

    this.feedbackSection.addEventListener('mouseleave', () => {
      this.cursor.classList.remove('feedback_section_cursor');
    })
  }

  sliderHandlerEnable() {
    document.addEventListener('mousemove', this.sliderHandler.bind(this))
  }

  sliderHandlerDisable() {
    document.removeEventListener('mousemove', this.sliderHandler.bind(this))
  }

  sliderHandler(e) {
    if (e.clientX < this.screenMiddle) this.arrow.style.transform = 'translate(-100px, -100px) rotate(-90deg)';
    else this.arrow.style.transform = 'translate(-100px, -100px) rotate(90deg)';
  }

  enableInterval() {
    this.interval = setInterval(() => {
      if (new Date() - this.mouseMoveEnd > 1000) this.disableInterval();

      this.instantMove.style.left = this.x + 'px';
      this.instantMove.style.top = this.y + 'px';

      this.moveX += (this.x - this.moveX) / 10;
      this.moveY += (this.y - this.moveY) / 10;
      
      this.bgCircle.style.left = this.moveX - this.bgCircleCorrection + 'px';
      this.bgCircle.style.top = this.moveY - this.bgCircleCorrection + 'px';
    }, 10);
  }

  disableInterval() {
    clearInterval(this.interval);
    this.interval = null;
  }

  enableDefaultCursor() {
    document.body.style.cursor = 'auto';
    document.querySelectorAll('.v-application a').forEach(item => {
      item.classList.remove('hide_cursor')
    })
  }

  disableDefaultCursor() {
    document.body.style.cursor = 'none';
    document.querySelectorAll('.v-application a').forEach(item => {
      item.classList.add('hide_cursor')
    })
  }
}