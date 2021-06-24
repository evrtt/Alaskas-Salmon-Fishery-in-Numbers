import changeFrame from './change_frame.js';

const createObservers = () => {
  
  let counter = []
  let callback = (entries, observer) => {
    let data = document.querySelector('.data')
    let dataClasses = data.className.split(" ")
    entries.forEach(entry => {
      const frameNum = entry.target.className.split("-")[1]
      const frameClass = `data-${frameNum}`
      let frameId = `frame-${frameNum}`
    
      if (entry.isIntersecting) {
        // console.log(entry.intersectionRatio)
        // entry.target.style.backgroundColor = 'red'
        data.classList.add(frameClass)
        counter.push(frameNum)
      } else {
        if (dataClasses.includes(frameClass)) {
            data.classList.remove(frameClass)
        }
        // entry.target.style.backgroundColor = 'green'
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
    let next;
    let last;
    if(counter.length > 1) {
      next = counter[1]
      last = counter[0]
      counter = [next];
      changeFrame(next, last)
    }
  // if(dataClasses.length > 1) {
  };

  let observer = new IntersectionObserver(callback, {threshold: 0.5});
  
  for (let i = 0; i < 5; i++) {
    let target = document.querySelector(`.scroll-${i}`);
    observer.observe(target);
  }
};

export default createObservers;