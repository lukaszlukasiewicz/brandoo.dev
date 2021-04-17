const inputs = new Set();

const FileInput = (id,remove) => {
  const fileInputwrapper = document.createElement('div');
  const fileInput = document.createElement('input');
  fileInput.type = "file";
  fileInput.name = `plik[${id}]`
  const fileName = document.createElement('div');
  fileInput.addEventListener('change', e => {
    fileName.innerText = fileInput.value.replace(/^.*[\\\/]/, '');
  })

  const fileItem = document.createElement('div');
  const removeItem = document.createElement('a');
  fileItem.classList.add('file-input');
  removeItem.innerText = 'Usuń';
  removeItem.href = "#"
  removeItem.addEventListener('click', e => {
    e.preventDefault();
    remove(fileInputwrapper);
  })

  fileItem.append(
    fileName,
    removeItem
  )
  fileInputwrapper.append(
    fileInput,
    fileItem
  )
  fileInput.click();
  return fileInputwrapper;
}

const CvUploader = (container) => {

  const add = () => {
    const fileInput = FileInput(inputs.size, remove);
    inputs.add(fileInput);
    render();
  }

  const remove = input => {
    inputs.delete(input);
    render();
  }

  const reset = () => {
    inputs.clear();
    render();
  }

  const addButton = document.createElement('button');
  addButton.innerText="Załącz CV";
  addButton.addEventListener('click', e => {
    e.preventDefault();
    add();
  })
  

  const render = () => {
    const fragment = document.createDocumentFragment();
    inputs.forEach(input => fragment.appendChild(input));
    fragment.appendChild(addButton);
    container.innerHTML = ""; 
    container.appendChild(fragment);
  }

  render();
  return {
    add, remove, reset
  }
}


export default CvUploader;