import '../css/style.scss'
import ExpandBlock from './expandBlock';
import CvUploader from './cvUploader'
import Glide from '@glidejs/glide'
import PopUp, {defaultPopup} from './popup';
import phone from '../images/phone.svg';
import mail from '../images/mail.svg';
import CookieInfo from './CookieInfo';


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
      onOpen: () => {
        if(openBlock && openBlock != expandBlock) openBlock.close();
        openBlock = expandBlock;
      },
    });
  })
}

const thankyouEl = document.querySelector('.thankyou');
thankyouEl.remove();
thankyouEl.style.display = "grid";

const applicationForm = document.querySelector('form[data-form="job"]');
if(applicationForm) {
  const applicationBtns = document.querySelectorAll('.show-application-form');
  applicationBtns.forEach(btn => {
    const clonedForm = applicationForm.cloneNode(true);
    const cvWrapper = clonedForm.querySelector('.cv-upload');
    if(cvWrapper) var cvUploader = CvUploader(cvWrapper)
    const popupContent = defaultPopup(clonedForm, {
      contentStyles : {
        maxWidth : '40em',
      }
    });
    const jobPopUp = new PopUp(popupContent);
    const positionInput = clonedForm.querySelector('[name="position"]');
    if(positionInput) positionInput.value = btn.dataset.position;
    prepereMailForm(clonedForm, {onSuccess:()=>{
      jobPopUp.hide();
      cvUploader.reset();
    }});
    btn.addEventListener('click', e => {
      jobPopUp.show() 
    });
  })
}

const cvWarppers = document.querySelectorAll('.cv-upload');
if(cvWarppers)  cvWarppers.forEach(cvWrapper => CvUploader(cvWrapper));

window.addEventListener('load', e => {
  document.body.classList.remove('preload');
})

const mailerUrl = 'https://test.brandoo.dev/mailer/';
const mailForms = document.querySelectorAll('.mailForm');
mailForms.forEach(mailForm => prepereMailForm(mailForm))

function prepereMailForm(mailForm, options = {}) {
  const popupContent = defaultPopup(`<div class="align-center"><h2 style="margin-top:0;">Wystąpił błąd</h2><p>Spróbuj ponownie poźniej lub skontaktuj się z nami:<br/><br/>
    <a class="phone" href="tel:+48 531 993 900"><img src="${phone}" style="width: 1.5em; vertical-align: middle; margin-top: -.5em;"> +48 531 993 900</a><br/>
    <a class="mail" href="mailto:info@brandoo.pl"><img src="${mail}" style="width: 1.5em; vertical-align: middle; margin-top: -.5em;"> info@brandoo.pl</a>  
  </p></div>`);
  const errorPopUp = new PopUp(popupContent);
  const {onSuccess, onError} = options;
  const successPopup = new PopUp(thankyouEl.cloneNode(true), {
    contentWrapper : false,
    hideClose : true
  });
  
  const fields = mailForm.querySelectorAll('input:not([type="checkbox"]),textarea, .checkbox');
  const validationwrappers = [];
  fields.forEach(field => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('validationwrapper');
    field.parentNode.insertBefore(wrapper,field);
    wrapper.append(field);
    const notValidMsg = document.createElement('span');
    notValidMsg.classList.add('validation-msg');
    notValidMsg.innerText = field.dataset.validationMessage ||  "Czy napewno te dane są prawidłowe?"
    wrapper.notValidMsg = notValidMsg;
    validationwrappers.push(wrapper);
  })
  mailForm.addEventListener('submit', e => {
    e.preventDefault();
    mailForm.classList.add('mailForm--disabled');
    let notValid = false;
    validationwrappers.forEach(wrapper => {
      const field = wrapper.querySelector('input, textarea');
      if(!field) return false;
      const valid = field.checkValidity();
      if(!valid) {
        wrapper.classList.add('not-valid');
        wrapper.prepend(wrapper.notValidMsg);
        notValid = true;
      } else {
        wrapper.classList.remove('not-valid');
        wrapper.notValidMsg.remove();
      }
    })
    if(notValid) return false;
    grecaptcha.ready( () => {
      grecaptcha.execute('6LeR8a0aAAAAAEG-TNi162LEUWUNtHoSUi5fbVPY', {action: 'submit'}).then(function(token) {
        const formData = new FormData(mailForm);
        formData.append("token",token);
        formData.append("form", mailForm.dataset.form);
        const request = new XMLHttpRequest();
        request.addEventListener('load', e => {
          if(request.response.success === true) {
            if(typeof onSuccess == 'function') onSuccess();
            successPopup.show();
            mailForm.reset();
            const mouseoverelement = mailForm.closest('.mouseover');
            if (mouseoverelement) {
              const rollOff = mouseoverelement.querySelector('.rolloff')
              if(rollOff) rollOff.style.height = 0;
              mouseoverelement.classList.remove('mouseover');
            }
          } else {
            console.error(request.response);
            //Error request succeded but mail was not sent
            if(typeof onError == 'function') onError();
            errorPopUp.show();
          }
          mailForm.classList.remove('mailForm--disabled');
        })
        request.addEventListener('error', e => {
          //Error request failes
          console.error("Request failed");
          if(typeof onError == 'function') onError();
          errorPopUp.show();
          mailForm.classList.remove('mailForm--disabled');
        })
        request.open('POST',mailerUrl);
        request.responseType = 'json';
        request.send(formData);
      });
    });
  })
}


const submenus = document.querySelectorAll('.has_submenu');
if(submenus) submenus.forEach(menu => {
  const links = menu.querySelectorAll('a')
  links.forEach(link => {
    link.addEventListener('click', e => {
      const isOpen = [...menu.classList].includes('show_submenu');
      if(!isOpen) e.preventDefault();
      menu.classList.toggle('show_submenu',!isOpen);
    })
  })

  document.addEventListener('click', e => {
    if(!menu.contains(e.target)) menu.classList.remove('show_submenu')
  },true);
})

// Fix chrome loosing hover when mouse is over input suggestions 
const brief = document.querySelector('.brief-request');
if(brief) {
  const breifSubmitBtn = brief.querySelector('form button');
  const rollOff = brief.querySelector('.rolloff'); 
  breifSubmitBtn.addEventListener('click',e => {
    if(!brief.classList.contains('mouseover')) {
      e.preventDefault();
      brief.classList.add('mouseover');
      rollOff.style.height = `${rollOff.scrollHeight}px`;
      setTimeout( () => {
        rollOff.style.height = "auto";
      },330)
    }
  })
}

document.body.addEventListener('focusin', e => {
  setTimeout(() => {
    e.target.scrollIntoView()
  },500)  
})

CookieInfo();