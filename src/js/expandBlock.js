const openBlock = (block, onOpen = () => {}) => {
  block.contentContainer.style.height = `${block.contentContainer.scrollHeight}px`
  block.el.classList.add('expand-block--animate');
  setTimeout ( () => window.location.hash = block.el.id,block.options.animationDuration);
  onOpen();
}

const closeBlock = (block, onClose = () => {}) => {
  block.contentContainer.style.height = `0px`
  block.el.classList.remove('expand-block--animate');
  onClose();
}

const ExpandBlock = (ExpandBlockElement, options = {})  => {
  const defaults = {
    animationDuration : 500,
  }

  if(!(ExpandBlockElement instanceof HTMLElement)) return false;
  let isOpen = false;
  const contentContainer = ExpandBlockElement.querySelector('.expand-block__content')
  const expandBlock = {
    el: ExpandBlockElement,
    options : Object.create(defaults,options),
    contentContainer,
    open : () => {
      openBlock(
        expandBlock, 
        options.onOpen ? () => options.onOpen(expandBlock) : undefined
      );
      isOpen = true;
    },
    close : () => {
      closeBlock(
        expandBlock,
        options.onClose ? () => options.onClose(expandBlock) : undefined,
      );
      isOpen = false;
    } 
  }
  const expandHeader = ExpandBlockElement.querySelector('.expand-block__header');

  window.addEventListener('resize', e => {
    if(!isOpen) return false;
    console.log(contentContainer.children[0].scrollHeight);
    contentContainer.style.height = `${contentContainer.children[0].scrollHeight}px`
  })
  if(expandHeader) expandHeader.addEventListener('click' , e =>  {
    e.preventDefault();
    isOpen ? expandBlock.close() : expandBlock.open();
  })
  return expandBlock;
}

export default ExpandBlock;