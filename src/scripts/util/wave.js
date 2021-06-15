import { renderAK , clearAK} from '../util/alaska.js'


export const drawWave = () => {

  let iterator = 120
  const canvas = document.querySelector('.wave-top');
  const context = canvas.getContext('2d');
  const radius = 1000

  window.requestAnimationFrame(() => drawFrame(iterator))

  const drawFrame = (iterator) => {
    

    const width = (Math.floor(window.innerWidth / 1000) + 1) * 1000
    canvas.width = context.width = width
    const height = canvas.height = context.height = 420
    const numLoops = (width) / 1000 + 2
    let changeSmallX;
    let moveCenter;

    const mod60 = iterator % 60
    const mod30 = iterator % 30
    if (iterator === 0) {
      changeSmallX = radius
      moveCenter = 0
    } else if (iterator > 0 && iterator < 30) {
      changeSmallX = 2 * radius * (Math.sin(((Math.PI * (60 - (mod30 * 2))) / 180) / 2))
      moveCenter = ((radius / 2) - (changeSmallX / 2))
    } else if (iterator === 30) {
      changeSmallX = 0
      moveCenter = radius / 2
    } else if (iterator > 30 && iterator < 60) {
      changeSmallX = 2 * radius * (Math.sin(((Math.PI * mod30 * 2) / 180) / 2))
      moveCenter = radius - ((radius / 2) - (changeSmallX / 2))
    } else if (iterator === 60) {
      changeSmallX = radius
      moveCenter = radius
    } else if (iterator > 60 && iterator < 90) {
      changeSmallX = 2 * radius * (Math.sin(((Math.PI * (60 - (mod30 * 2))) / 180) / 2))
      moveCenter = ((radius / 2) - (changeSmallX / 2)) + radius
    } else if (iterator === 90) {
      changeSmallX = 0
      moveCenter = radius * 1.5
    } else if (iterator > 90 && iterator < 120) {
      changeSmallX = 2 * radius * (Math.sin(((Math.PI * mod30 * 2) / 180) / 2))
      moveCenter = radius * 2 - ((radius / 2) - (changeSmallX / 2))
    }

    const changeY = Math.sqrt((radius ** 2) - ((radius / 2) ** 2)) * 2

    context.clearRect(0, 0, width, height)
    for (let i = 0; i < numLoops; i++) {

      if (i === 0) {

        if (iterator > 59) {

          context.beginPath()
          context.arc((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, changeY - 580, radius, Math.PI * 240 / 180, Math.PI * 300 / 180, false)
          context.lineTo(radius * 2 - (moveCenter - 1), (changeY / 2) - 580)
          context.lineTo(radius * 2 - (moveCenter - 1), height)
          context.lineTo(0, height)
          context.fillStyle = 'blue'
          context.fill()

        } else {

          context.beginPath()
          context.arc((radius / 2) - moveCenter, -580, radius, (Math.PI * 60) / 180, (Math.PI * (120 - mod60)) / 180, false)
          context.lineTo(0, height)
          context.lineTo(radius * 2 - (moveCenter - 1), height)
          context.lineTo(radius * 2 - (moveCenter - 1), (changeY / 2) - 580)
          context.moveTo((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, (changeY / 2) - 580)
          context.arc((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, changeY - 580, radius, Math.PI * 240 / 180, Math.PI * 300 / 180, false)
          context.fillStyle = 'blue'
          context.fill()
        }

      } else if (i === numLoops - 1) {

        context.beginPath()
        context.arc((radius / 2) + (radius * i * 2) - moveCenter, -580, radius, (Math.PI * 60) / 180, (Math.PI * 120) / 180, false)
        context.lineTo(radius * 2 * i - moveCenter, height)
        context.lineTo(radius * (2 + (i * 2)) - moveCenter, height)
        context.lineTo(radius * (2 + (i * 2)) - moveCenter, (changeY / 2) - 580)
        context.moveTo((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, (changeY / 2) - 580)
        context.arc((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, changeY - 580, radius, Math.PI * 240 / 180, Math.PI * 300 / 180, false)
        context.fillStyle = 'blue'
        context.fill()
      } else {

        context.beginPath()
        context.arc((radius / 2) + (radius * i * 2) - moveCenter, -580, radius, (Math.PI * 60) / 180, (Math.PI * 120) / 180, false)
        context.lineTo(0 + radius * 2 * i - moveCenter, height)
        context.lineTo(radius * (2 + (i * 2)) - moveCenter, height)
        context.lineTo(radius * (2 + (i * 2)) - moveCenter, (changeY / 2) - 580)
        context.moveTo((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, (changeY / 2) - 580)
        context.arc((radius * ((2 * i) + 1)) + (radius / 2) - moveCenter, changeY - 580, radius, Math.PI * 240 / 180, Math.PI * 300 / 180, false)
        context.fillStyle = 'blue'
        context.fill()
      }
    }

    iterator = iterator === 0 ? 119.5 : iterator - 0.5
    window.requestAnimationFrame(() => drawFrame(iterator))
  }
}

export const removeWave = () => {
  const canvas = document.querySelector('.wave-top');
  canvas.id = "hidden-wave"
}

export const raiseWave = (amt, direction) => {
  
  const waveTop = document.querySelector('.wave-top')
  const waveBottom = document.querySelector('.wave-bottom')
  

  if (amt >= window.innerHeight - 1) { 
    if (direction === 'down') {
      renderAK()
    } else if (direction === 'up') {
      clearAK();
    }
    window.requestAnimationFrame(() => lowerWave(amt, direction) )
  } else {
    if(direction === 'up') {
      const scrollDown = document.querySelector('.scroll-down')
      scrollDown.style.bottom = `${amt - window.innerHeight}px`
    }
    amt += Math.sqrt(window.innerHeight - amt)
    waveTop.style.bottom = `${amt}px`
    waveBottom.style.height = `${amt + 1}px`
    window.requestAnimationFrame(() => raiseWave(amt, direction))
  }
}

export const lowerWave = (amt, direction) => {
  
  const waveTop = document.querySelector('.wave-top')
  const waveBottom = document.querySelector('.wave-bottom')
  


  if (amt > 0) {

    if (direction === 'down') {
      const scrollDown = document.querySelector('.scroll-down')
      scrollDown.style.bottom = `${-(window.innerHeight - amt)}px`
    }
    
    amt -= Math.sqrt(window.innerHeight - amt)
    waveTop.style.bottom = `${amt}px`
    waveBottom.style.height = `${amt}px`
    window.requestAnimationFrame(() => lowerWave(amt, direction))
  } else if (amt < 800 && amt > -300) {
    if (direction === 'down') {
      amt -= Math.sqrt(600)
      waveTop.style.bottom = `${amt}px`
      waveBottom.style.height = `${0}px`
      window.requestAnimationFrame(() => lowerWave(amt, direction))
    } else {
      slowDown(amt)
    }
  } else {

  }
}

const slowDown = (height) => {

  const waveTop = document.querySelector('.wave-top')
  const waveBottom = document.querySelector('.wave-bottom')

  if (height > 0) {
    height /= 3
    waveBottom.style.height = `${height}px`
    waveTop.style.bottom = `${height}px`
    window.requestAnimationFrame(() => slowDown(height))
  } else {
    waveBottom.style.height = '0px'
    waveTop.style.bottom = `${0}px`
  }
}

// export const drawWave = () => {

//   let adjust1 = 0;

//   window.requestAnimationFrame(() => drawFrame(adjust1))

//   const drawFrame = (adjust1) => {
//     const canvas = document.getElementById('canvas');
//     const context = canvas.getContext('2d');
//     context.clearRect(0, 0, canvas.width, canvas.height)

//     const start = { x: 0 - adjust1, y: 200 }

//     let curve1 = { x1: 50 - adjust1, y1: 200, x2: 75 - adjust1, y2: 0, xF: 100 - adjust1, yF: 100 }
//     let curve2 = { x1: 125 - adjust1, y1: 200, x2: 175 - adjust1, y2: 0, xF: 200 - adjust1, yF: 100 }
//     let curve3 = { x1: 225 - adjust1, y1: 200, x2: 275 - adjust1, y2: 0, xF: 300 - adjust1, yF: 100 }
//     let curve4 = { x1: 325 - adjust1, y1: 200, x2: 375 - adjust1, y2: 0, xF: 400 - adjust1, yF: 100 }
//     let curve5 = { x1: 425 - adjust1, y1: 200, x2: 475 - adjust1, y2: 0, xF: 500 - adjust1, yF: 100 }
//     let curve6 = { x1: 525 - adjust1, y1: 200, x2: 575 - adjust1, y2: 0, xF: 600 - adjust1, yF: 100 }
//     let curve7 = { x1: 625 - adjust1, y1: 200, x2: 675 - adjust1, y2: 0, xF: 700 - adjust1, yF: 100 }
//     let curve8 = { x1: 725 - adjust1, y1: 200, x2: 775 - adjust1, y2: 0, xF: 800 - adjust1, yF: 100 }
//     let curve9 = { x1: 825 - adjust1, y1: 200, x2: 875 - adjust1, y2: 0, xF: 900 - adjust1, yF: 100 }
//     let curve10 = { x1: 925 - adjust1, y1: 200, x2: 975 - adjust1, y2: 0, xF: 1000 - adjust1, yF: 100 }
    
//     context.beginPath();
//     context.moveTo(start.x, start.y)
//     context.lineTo(start.x, 100)
//     context.bezierCurveTo(curve1.x1, curve1.y1, curve1.x2, curve1.y2, curve1.xF, curve1.yF);
//     context.bezierCurveTo(curve2.x1, curve2.y1, curve2.x2, curve2.y2, curve2.xF, curve2.yF);
//     context.bezierCurveTo(curve3.x1, curve3.y1, curve3.x2, curve3.y2, curve3.xF, curve3.yF);
//     context.bezierCurveTo(curve4.x1, curve4.y1, curve4.x2, curve4.y2, curve4.xF, curve4.yF);
//     context.bezierCurveTo(curve5.x1, curve5.y1, curve5.x2, curve5.y2, curve5.xF, curve5.yF);
//     context.bezierCurveTo(curve6.x1, curve6.y1, curve6.x2, curve6.y2, curve6.xF, curve6.yF);
//     context.bezierCurveTo(curve7.x1, curve7.y1, curve7.x2, curve7.y2, curve7.xF, curve7.yF);
//     context.bezierCurveTo(curve8.x1, curve8.y1, curve8.x2, curve8.y2, curve8.xF, curve8.yF);
//     context.bezierCurveTo(curve9.x1, curve9.y1, curve9.x2, curve9.y2, curve9.xF, curve9.yF);
//     context.bezierCurveTo(curve10.x1, curve10.y1, curve10.x2, curve10.y2, curve10.xF, curve10.yF);
//     context.lineTo(curve10.xF, 200)
//     context.closePath()
//     context.fillStyle = 'darkBlue';
//     context.fill();

//     adjust1 = (adjust1 + 1 ) % 500

//     window.requestAnimationFrame(() => drawFrame(adjust1))
//   }

// }
// export const drawWave = () => {

//   let adjust1 = 0;

//   // window.requestAnimationFrame(() => drawFrame(adjust1))

//   // const drawFrame = (adjust1) => {
//     const canvas = document.getElementById('canvas');
//     const context = canvas.getContext('2d');

//     // context.clearRect(0, 0, canvas.width, canvas.height)

//     context.beginPath();
//     context.arc(100, 100, 50, ((Math.PI * 60) / 180), ((Math.PI * 120) / 180), true);
//     context.fill();

//     // context.beginPath();
//     // context.arc(100, 75, 50, 0, 2 * Math.PI);
//     // context.stroke();

//     debugger
//     console.log(context.arc(100, 100, 50, ((Math.PI * 60) / 180), ((Math.PI * 120) / 180), true))

//     // window.requestAnimationFrame(() => drawFrame(adjust1))
//   // }

// }




// export const drawWave = () => {

//   var c = document.getElementById('canvas'),
//     ctx = c.getContext('2d'),
//     cw = c.width = window.innerWidth,
//     ch = c.height = window.innerHeight,
//     points = [],
//     tick = 0,
//     opt = {
//       count: 5,
//       range: {
//         x: 20,
//         y: 80
//       },
//       duration: {
//         min: 20,
//         max: 40
//       },
//       thickness: 1,
//       strokeColor: '#444',
//       level: .35,
//       curved: true
//     },
//     rand = function (min, max) {
//       return Math.floor((Math.random() * (max - min + 1)) + min);
//     },
//     ease = function (t, b, c, d) {
//       if ((t /= d / 2) < 1) return c / 2 * t * t + b;
//       return -c / 2 * ((--t) * (t - 2) - 1) + b;
//     };
  
//   ctx.lineJoin = 'round';
//   ctx.lineWidth = opt.thickness;
//   ctx.strokeStyle = opt.strokeColor;
  
//   var Point = function (config) {
//     this.anchorX = config.x;
//     this.anchorY = config.y;
//     this.x = config.x;
//     this.y = config.y;
//     this.setTarget();
//   };
  
//   Point.prototype.setTarget = function () {
//     this.initialX = this.x;
//     this.initialY = this.y;
//     this.targetX = this.anchorX + rand(0, opt.range.x * 2) - opt.range.x;
//     this.targetY = this.anchorY + rand(0, opt.range.y * 2) - opt.range.y;
//     this.tick = 0;
//     this.duration = rand(opt.duration.min, opt.duration.max);
//   }
  
//   Point.prototype.update = function () {
//     var dx = this.targetX - this.x;
//     var dy = this.targetY - this.y;
//     var dist = Math.sqrt(dx * dx + dy * dy);
  
//     if (Math.abs(dist) <= 0) {
//       this.setTarget();
//     } else {
//       var t = this.tick;
//       var b = this.initialY;
//       var c = this.targetY - this.initialY;
//       var d = this.duration;
//       this.y = ease(t, b, c, d);
  
//       b = this.initialX;
//       c = this.targetX - this.initialX;
//       d = this.duration;
//       this.x = ease(t, b, c, d);
  
//       this.tick++;
//     }
//   };
  
//   Point.prototype.render = function () {
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
//     ctx.fillStyle = '#000';
//     ctx.fill();
//   };
  
//   var updatePoints = function () {
//     var i = points.length;
//     while (i--) {
//       points[i].update();
//     }
//   };
  
  
//   var renderShape = function () {
//     ctx.beginPath();
//     var pointCount = points.length;
//     ctx.moveTo(points[0].x, points[0].y);
//     var i;
//     for (i = 0; i < pointCount - 1; i++) {
//       var c = (points[i].x + points[i + 1].x) / 2;
//       var d = (points[i].y + points[i + 1].y) / 2;
//       ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
//     }
//     ctx.lineTo(-opt.range.x - opt.thickness, ch + opt.thickness);
//     ctx.lineTo(cw + opt.range.x + opt.thickness, ch + opt.thickness);
//     ctx.closePath();
//     ctx.fillStyle = 'hsl(' + (tick / 2) + ', 80%, 60%)';
//     ctx.fill();
//     ctx.stroke();
//   };
  
//   var clear = function () {
//     ctx.clearRect(0, 0, cw, ch);
//   };
  
//   var loop = function () {
//     window.requestAnimFrame(loop, c);
//     tick++;
//     clear();
//     updatePoints();
//     renderShape();
//     //renderPoints();
//   };
  
//   var i = opt.count + 2;
//   var spacing = (cw + (opt.range.x * 2)) / (opt.count - 1);
//   while (i--) {
//     points.push(new Point({
//       x: (spacing * (i - 1)) - opt.range.x,
//       y: ch - (ch * opt.level)
//     }));
//   }
  
//   window.requestAnimFrame = function () {
//     return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
//       window.setTimeout(a, 1E3 / 60)
//     }
//   }();
  
//   loop();
// }
