export const removeSplash = () => {
  const splashContainer = document.querySelector(".splash-container")
  splashContainer.style.display = "none" 
}

export const renderSplash = () => {
  const splashContainer = document.querySelector(".splash-container")
  splashContainer.style.display = "flex" 
}