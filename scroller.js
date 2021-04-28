import changeFrame from './change_frame';

let createObservers = () => {
  
  let callback = (entries, observer) => {

    let data = document.querySelector('.data')
    let dataClasses = data.className.split(" ")
    console.log(dataClasses)

    entries.forEach(entry => {
      const frameNum = entry.target.className.split("-")[1]
      const frameClass = `data-${frameNum}`
      let frameId = `frame-${frameNum}`
      if (entry.isIntersecting) {
        console.log(frameNum)
        entry.target.style.backgroundColor = 'red'
        data.classList.add(frameClass)
      } else {
        if (dataClasses.includes(frameClass)) {
            data.classList.remove(frameClass)
        }
        entry.target.style.backgroundColor = 'green'
      }
      
      // Each entry describes an intersection change for one observed
      // target element:
      //   entry.boundingClientRect
      //   entry.intersectionRatio
      //   entry.intersectionRect
      //   entry.isIntersecting
      //   entry.rootBounds
      //   entry.target
      //   entry.time
    });
    

    if(dataClasses.length > 2) {
      changeFrame(dataClasses);
    }
  };

  let observer = new IntersectionObserver(callback, {threshold: 0.51});
  
  for (let i = 0; i < 5; i++) {
    let target = document.querySelector(`.scroll-${i}`);
    observer.observe(target);
  }

}

window.addEventListener("load", (e) => {
  createObservers();
}, false);