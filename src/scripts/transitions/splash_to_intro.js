import 

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

  setTimeout(enableScroll, 4000)

  raiseWave()

  lowerWave()

}