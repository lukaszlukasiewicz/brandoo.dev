const animationDuration = 500;

const appendContent = (content,element) => {
  if(content instanceof HTMLElement || content instanceof DocumentFragment) element.append(content);
  else if(typeof content == 'string') element.innerHTML = content;
}

export const  defaultPopup = (content, options = {}) => {
  const contentfragment = document.createDocumentFragment() 
  const contentBox = document.createElement('div');
  let {contentClass,contentStyles} = options;
  if(!Array.isArray(contentBox)) contentClass = [contentClass];
  if(contentClass) {
    contentBox.classList.add(...contentClass)
  }
  Object.assign(
    contentBox.style , 
    typeof contentStyles == 'string' ? JSON.parse(contentStyles) : contentStyles
  );
  appendContent(content,contentBox);
  contentBox.classList.add('shadow-box')
  contentfragment.appendChild(contentBox)
  return contentfragment;
}

function PopUp(content, instanceOptions = {}) {

  const defaults = {
    contentWrapper : true,
  }

  const options = Object.assign(defaults,instanceOptions);
  const {contentWrapper} = options;

  const popupWrapper = document.createElement('div')
  popupWrapper.classList.add('popup__wrapper');
  if(!options.hideClose) popupWrapper.innerHTML = '<a href="#" class="popup__close" data-popup-close><img src="../images/close.svg" width="20" height="20" alt="Zamknij"></a>'

  const popupInnerWrapper = document.createElement('div')
  popupInnerWrapper.classList.add('popup__inner-wrapper');
  popupWrapper.appendChild(popupInnerWrapper);

  if(contentWrapper) {
    const popupContent = document.createElement('div')
    popupContent.classList.add('popup__content')
    appendContent(content,popupContent);
    popupInnerWrapper.append(popupContent);
  } else {
    appendContent(content,popupInnerWrapper);
  }
  
  popupInnerWrapper.addEventListener('click', e => {
    if(e.target == e.currentTarget ) hide();
  })


  const show =  () => {
    document.body.append(popupWrapper);
    document.body.classList.add('popup--visible');
    popupWrapper.classList.add('popup--animate-before');
    setTimeout(() => {
      popupWrapper.classList.add('popup--animate');
      popupWrapper.classList.remove('popup--animate-before');
    },10)
  }
  const hide =  () => {
    popupWrapper.classList.remove('popup--animate');
    popupWrapper.classList.add('popup--animate-after');
    setTimeout(() => {
      popupWrapper.remove();
      popupWrapper.classList.remove('popup--animate-after');
      document.body.classList.remove('popup--visible');
    },animationDuration)
  }

  popupWrapper.addEventListener('click', e => {
    const close = e.target.closest('[data-popup-close]');
    if(close) {
      e.preventDefault(); 
      hide();
    }
  })
  return {
    el:popupWrapper,
    show,
    hide,
  }

}

export default PopUp;