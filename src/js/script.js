import '../css/style.scss'
import ExpandBlock from './expandBlock';
import CvUploader from './cvUploader'
import Glide from '@glidejs/glide'

new Glide('.glide',{
  perView: 5,
  type: 'carousel',
  autoplay: 3000,
}).mount()

const nav = document.querySelector('nav');

if(nav) {
  const navLinks = nav.querySelectorAll('ul a');
  navLinks.forEach(link => {
    if(window.location.href.includes(link.getAttribute('href'))) link.classList.add('current-page')
  })
}

let openBlock = false;
const expnadBlocks = document.querySelectorAll('.expand-block');
if(expnadBlocks) {
  expnadBlocks.forEach(expandBlockElement => {
    const expandBlock = ExpandBlock(expandBlockElement, {
      onOpen: (block) => {
        if(openBlock && openBlock != expandBlock) openBlock.close();
        openBlock = expandBlock;
      },
    });
  })
}

const cvWarppers = document.querySelectorAll('.cv-upload');
if(cvWarppers)  cvWarppers.forEach(cvWarpper => CvUploader(cvWarpper));

const applicationPopup = document.getElementById('aplication-popup');
const applicationBtns = document.querySelectorAll('.show-application-form');
if(applicationBtns) {
  applicationBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      document.body.classList.add('show-popup')
    })
  })
}

if(applicationPopup) {
  applicationPopup.addEventListener('click', e => {
    e.preventDefault();
    document.body.classList.remove('show-popup')
  })
  applicationPopup.querySelector('.glow-box').addEventListener('click', e => {
    e.stopPropagation();
  })
  applicationPopup.querySelector('.close-popup').addEventListener('click', e => {
    e.preventDefault();
    document.body.classList.remove('show-popup')
  })
}


const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    for (var value of formData.values()) {
      console.log(value);
    }
  })
})

window.addEventListener('load', e => {
  document.body.classList.remove('preload');
})