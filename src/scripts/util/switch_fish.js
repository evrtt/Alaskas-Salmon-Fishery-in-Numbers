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

  console.log(chinookButton, cohoButton, sockeyeButton, chumButton, pinkButton)
}

const switchFish = (fish) => {

  const currentFish = document.querySelector('.current-fish')


  console.log(fish)
  if(currentFish.id.split('-')[0] === fish) {
    null
  } else {
    
    const currentFishButton = document.querySelector('.current-fish-button')
    const newFish = document.getElementById(`${fish}-container`)
    const newFishButton = document.getElementById(`${fish}-button`)
  
    currentFish.classList.toggle('current-fish')
    currentFish.classList.toggle('display-none')
    currentFishButton.classList.toggle('current-fish-button')
    newFishButton.classList.toggle('current-fish-button')
    newFish.classList.toggle('current-fish')
    newFish.classList.toggle('display-none')
  }
}