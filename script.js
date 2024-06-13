
const pixelBoard = document.getElementById('pixel-board')
const classColor = document.getElementsByClassName('color')
const pixel = document.getElementsByClassName('pixel')
const button = document.getElementById('clear-board')
const boardButton = document.getElementById('generate-board')
const input = document.getElementById('board-size')
const resetBtn = document.getElementById('reset-board-size')


const createBoard = (n = 5) => {
    if(n < 5) {n = 5}
    else if(n > 50){n = 50}
    pixelBoard.innerHTML = '';
    pixelBoard.style.gridTemplateColumns = `repeat(${n}, 0fr)`;
    pixelBoard.style.gridTemplateRows = `repeat(${n}, 0fr)`;
    for (let i = 0; i < n * n; i += 1) {
      const board = document.createElement('section');
      board.className = 'pixel';
      pixelBoard.appendChild(board);

    }
    handleClick()
    
  }

  const generateRandomColor = () => {
    const string = '0123456789ABCDEF';
    let hash = '#';
    for (let i = 0; i < 6; i += 1) {
      hash += string[Math.floor(Math.random() * 16)];
    }
    return hash;
};

// Função para definir as cores da paleta
const setColorPalette = () => {
    document.getElementById('color1').style.backgroundColor = 'black';
    document.getElementById('color2').style.backgroundColor = generateRandomColor();
    document.getElementById('color3').style.backgroundColor = generateRandomColor();
    document.getElementById('color4').style.backgroundColor = generateRandomColor();
};



const addClassSelected = (event) => {
  for(let i = 0; i < classColor.length; i += 1) {
    if(classColor[i].classList.contains('selected')){
      let containsSelected = classColor[i];
      containsSelected.classList.remove('selected')
    }
    
  }
  event.target.classList.add('selected')
}

const coloringPixel = (event) => {
  for(let i = 0; i < classColor.length; i += 1) {
    if(classColor[i].classList.contains('selected')){
      const color = getComputedStyle(classColor[i]).getPropertyValue('background-color');
      // const color = classColor[i].id
      /* getComputedeStyle retorna objeto com todos estilos aplicados
      após carregamento da pagina */
      event.target.style.backgroundColor = color
    }
  }

}

const clearButton = () => {
  for(let i = 0; i < pixel.length; i += 1){
    pixel[i].style.backgroundColor = 'white'
    
  }
}

const resetButton = () => {
    createBoard();
    input.value = ''
    input.focus()
  }

const handleClick = () => {
  for(let i = 0; i < classColor.length; i += 1){
    classColor[i].addEventListener('click', addClassSelected)
  }
  
  for(let i = 0; i < pixel.length; i += 1){
    pixel[i].addEventListener('click', coloringPixel)
  }

  boardButton.addEventListener('click', boardBtn)

  button.addEventListener('click', clearButton)

  resetBtn.addEventListener('click', resetButton)

}

const saveIput = () => {
  input.innerText = input.value 
}

input.addEventListener('keyup', saveIput)

const boardBtn = () => {
  if(input.value === ''){
    alert('Board inválido!')
  }
  else if(input.value <= 0){
    alert('Número deve ser maior que zero')
  }
  else createBoard(input.value)

  input.value = ''
  input.focus()
  
}
setColorPalette()
createBoard();
handleClick();


