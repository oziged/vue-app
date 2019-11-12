export default class CursorLogic {
  constructor() {
    this.cursorBlock = document.querySelector('.cursor');
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

    this.header = document.querySelector('header');
    this.sliderSection = document.querySelector('.home_page_slider');
    this.feedbackSection = document.querySelector('.feedback_section');
    this.countriesSection = document.querySelector('.countries_list');
    this.formSubmit = document.querySelector('[type=submit]');
  }

  setup() {
    // document.body.style.cursor = 'none';
    document.addEventListener('mousemove', e => {
      this.x = e.clientX - 3;
      this.y = e.clientY - 3;
    })

    window.addEventListener('resize', () => {
      this.screenMiddle = window.innerWidth / 2;
    })

    this.sliderSection.addEventListener('mouseenter', () => {
      this.cursorBlock.classList.add('display_arrow')
      this.sliderHandlerEnable();
    })

    this.sliderSection.addEventListener('mouseleave', () => {
      this.cursorBlock.classList.remove('display_arrow')
      this.sliderHandlerDisable()
    })

    // // // // // // COUNTRIES SECTION // // // // / //

    this.countriesSection.addEventListener('mouseenter', () => {
      this.cursorBlock.classList.add('display_cursor_country');
    })

    this.countriesSection.addEventListener('mouseleave', e => {
      this.cursorBlock.classList.remove('display_cursor_country');
    })

    this.countriesSection.querySelectorAll('.country').forEach(item => {
      item.addEventListener('mouseenter', () => {
        this.cursorCountriesDEG += 45;
        document.querySelector('.cursor_country').style.transform = `translate(-15px, -15px) rotate(${this.cursorCountriesDEG}deg)`
      })
    })

    // // // // // // // // // // // // // // // // / //

    this.header.addEventListener('mouseenter', () => {
    //  this.bgCircle.classList.add('bgreen')
    })

    this.header.addEventListener('mouseleave', () => {
    //  this.bgCircle.classList.remove('bgreen')
    })

    this.formSubmit.addEventListener('mouseenter', () => {
      this.cursorBlock.classList.remove('feedback_section_cursor');
    })

    this.formSubmit.addEventListener('mouseleave', () => {
      this.cursorBlock.classList.add('feedback_section_cursor');
    })

    this.feedbackSection.addEventListener('mouseenter', () => {
      this.cursorBlock.classList.add('feedback_section_cursor');
    })

    this.feedbackSection.addEventListener('mouseleave', () => {
      this.cursorBlock.classList.remove('feedback_section_cursor');
    })
  }

  startAnimation() {
    this.interval = setInterval(() => {
      this.instantMove.style.left = this.x + 'px';
      this.instantMove.style.top = this.y + 'px';

      this.moveX += (this.x - this.moveX) / 10;
      this.moveY += (this.y - this.moveY) / 10;
      
      // this.arrow.style.left = this.moveX  + 'px';
      // this.arrow.style.top = this.moveY + 'px';
      
      this.bgCircle.style.left = this.moveX - this.bgCircleCorrection + 'px';
      this.bgCircle.style.top = this.moveY - this.bgCircleCorrection + 'px';
    }, 10);

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
}