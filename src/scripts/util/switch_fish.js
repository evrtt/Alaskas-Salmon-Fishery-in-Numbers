export const setFishButtonCallbacks = () => {
  const chinookButton = document.getElementById('chinook-button')
  chinookButton.addEventListener('mouseenter', () => switchFish('chinook'))

  const cohoButton = document.getElementById('coho-button')
  cohoButton.addEventListener('mouseenter', () => switchFish('coho'))

  const sockeyeButton = document.getElementById('sockeye-button')
  sockeyeButton.addEventListener('mouseenter', () => switchFish('sockeye'))

  const chumButton = document.getElementById('chum-button')
  chumButton.addEventListener('mouseenter', () => switchFish('chum'))

  const pinkButton = document.getElementById('pink-button')
  pinkButton.addEventListener('mouseenter', () => switchFish('pink'))
}

const switchFish = (fish) => {

  const currentFish = document.querySelector('.current-fish')
  if(currentFish.id.split('-')[0] === fish) {
    null
  } else {
    
    const currentFishButton = document.querySelector('.current-fish-button')
    const newFish = document.getElementById(`${fish}-container`)
    const newFishButton = document.getElementById(`${fish}-button`)
  
    currentFish.classList.toggle('current-fish')
    currentFish.classList.toggle('display-none')
    currentFishButton.style.backgroundColor = '#0671c9'
    currentFishButton.classList.toggle('current-fish-button')
    switch (fish) {
      case 'chinook':
        newFishButton.style.backgroundColor = "#BF9AC4"
        newFish.style.backgroundColor = "#BF9AC4"
        break;
      case 'coho':
        newFishButton.style.backgroundColor = "#A0A0A0"
        newFish.style.backgroundColor = "#A0A0A0"
        break;
      case 'sockeye':
        newFishButton.style.backgroundColor = "#E28989"
        newFish.style.backgroundColor = "#E28989"
        break;
      case 'chum':
        newFishButton.style.backgroundColor = "#9AC4A8"
        newFish.style.backgroundColor = "#9AC4A8"
        break;
      case 'pink':
        newFishButton.style.backgroundColor = "#ECCECE"
        newFish.style.backgroundColor = "#ECCECE"
        break;
      default:
        null
        break;
    }
    newFishButton.classList.toggle('current-fish-button')
    newFish.classList.toggle('current-fish')
    newFish.classList.toggle('display-none')
  }
}