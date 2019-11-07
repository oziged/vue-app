export default class CursorLogic {
  constructor() {
    this.cursorBlock = document.querySelector('.cursor');
    this.defaultCircle = document.querySelector('.default_circle');
    this.bgCircle = document.querySelector('.bg_circle');
    this.x = 0;
    this.y = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.interval = null;
    this.bgCircleCorrection = 12;

    this.arrow = document.querySelector('.arrow');

    this.header = document.querySelector('header');
    this.feedbackSection = document.querySelector('.feedback_section');
  }

  setup() {
    document.body.style.cursor = 'none';
    document.addEventListener('mousemove', e => {
      this.x = e.clientX - 3;
      this.y = e.clientY - 3;
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
      this.defaultCircle.style.left = this.x + 'px';
      this.defaultCircle.style.top = this.y + 'px';

      this.moveX += (this.x - this.moveX) / 10;
      this.moveY += (this.y - this.moveY) / 10;
      
      this.arrow.style.left = this.moveX  + 'px';
      this.arrow.style.top = this.moveY + 'px';
      
      this.bgCircle.style.left = this.moveX - this.bgCircleCorrection + 'px';
      this.bgCircle.style.top = this.moveY - this.bgCircleCorrection + 'px';
    }, 10);

  }

  cursorInHeader() {

  }
}