import '../css/style.scss'
import ExpandBlock from './expandBlock';
import CvUploader from './cvUploader'

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

const cvWarpper = document.querySelector('.cv-upload');
if(cvWarpper) CvUploader(cvWarpper)