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

const cvUploade = CvUploader(document.querySelector('.cv-upload'))

/* 
{
     
    const expandHeader = expandBlock.querySelector('.expand-block__header');
    expandHeader.addEventListener('click' , e => {
      if(openBlock) openBlock.classList.toggle('expand-block--open')
      expandBlock.classList.toggle('expand-block--open');
      openBlock = expandBlock;
    })
  }) 
*/