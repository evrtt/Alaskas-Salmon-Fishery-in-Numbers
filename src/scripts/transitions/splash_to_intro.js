import { raiseWave } from '../util/wave.js'

const disableScroll = () => {


  
  const scrollPosY = window.pageYOffset || document.documentElement.scrollTop;
  const scrollPosX = window.pageXOffset || document.documentElement.scrollLeft;

  return window.onscroll = () => {
    window.scrollTo(scrollPosX, scrollPosY)
  }

}

const enableScroll = () => {
  return window.onscroll = () => {
  }
}


export const splashToIntro = () => {

  disableScroll()

  setTimeout(enableScroll, 500)

  let amt = 0;
  raiseWave(amt, 'down', 15)
}