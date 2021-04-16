import '../css/style.scss'
import ExpandBlock from './expandBlock';
import CvUploader from './cvUploader'
import Glide from '@glidejs/glide'

const glide = document.querySelector('.glide');
if (glide) new Glide(glide,{
  perView: 5,
  type: 'carousel',
  autoplay: 3000,
  breakpoints : {
    400: {
      perView: 1
    },
    600: {
      perView: 2
    }
  }
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
  const form = applicationPopup.querySelector('form');
  if(form) form.dataset.form = "job-popup";
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

window.addEventListener('load', e => {
  document.body.classList.remove('preload');
})

const mailerUrl = 'https://test.brandoo.dev/mailer/';
const mailForms = document.querySelectorAll('.mailForm');
mailForms.forEach(mailForm => {
  mailForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(mailForm);
    mailForm.classList.add('mailForm--disabled');
    const request = new XMLHttpRequest();
    request.addEventListener('load', e => {
      if(request.response.success === true) {
        console.log(request.response);
        mailForm.reset();
      } else {
        console.error(request.response);
        //Error request succeded but mail was not sent
      }
      mailForm.classList.remove('mailForm--disabled');
    })
    request.addEventListener('error', e => {
      //Error request failes
      console.error("Request failed");
      mailForm.classList.remove('mailForm--disabled');
    })
    request.open('POST',mailerUrl);
    request.responseType = 'json';
    request.send(formData);
  })

})