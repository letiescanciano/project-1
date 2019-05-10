function randomSelector(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function getLevel(levelNum, mode) {
  // console.log(levelNum)
  //console.log(levels.filter(level => level.num === levelNum)[0])
  if (mode === 0)
    return levels.filter(level => level.num === levelNum)[0]
  else if (mode === 1)
    return ih.filter(level => level.num === levelNum)[0]
}


let speed = {
  x: 1,
  y: 1
}
let ballsNumber = 2

const musicGenres = [{
    filePath: '/rock/rock',
    instrument: 'rock.png',
    background: '/rock/bg-rock.jpg',
    frames: 6
  },
  {
    filePath: '/classic/classic',
    instrument: 'classic.png',
    background: '/classic/bg-classic.jpg',
    frames: 3
  },
  {
    filePath: '/gospel/gospel',
    instrument: 'gospel.png',
    background: '/gospel/bg-gospel.jpg',
    frames: 3
  },
  {
    filePath: '/jazz/jazz',
    instrument: 'jazz.png',
    background: '/jazz/bg-jazz.jpg',
    frames: 4
  },
  {
    filePath: '/soul/soul',
    instrument: 'soul.png',
    background: '/soul/bg-soul.jpg',
    frames: 6
  }
]
const levels = [{
    num: 1,
    ballsNumber: ballsNumber,
    speed: {
      x: speed.x,
      y: speed.y
    },
    musicGenre: randomSelector(musicGenres)
  },
  {
    num: 2,
    ballsNumber: ballsNumber++,
    speed: {
      x: speed.x * 1.5,
      y: speed.y * 1.5
    },
    musicGenre: randomSelector(musicGenres)
  },
  {
    num: 3,
    ballsNumber: ballsNumber++,
    speed: {
      x: speed.x * 2,
      y: speed.y * 2
    },
    musicGenre: randomSelector(musicGenres)
  },
  {
    num: 4,
    ballsNumber: 5,
    speed: {
      x: speed.x * 2,
      y: speed.y * 2
    },
    musicGenre: randomSelector(musicGenres)
  },
  {
    num: 5,
    ballsNumber: ballsNumber++,
    speed: {
      x: speed.x * 2,
      y: speed.y * 2
    },
    musicGenre: randomSelector(musicGenres)
  },
  {
    num: 6,
    ballsNumber: ballsNumber++,
    speed: {
      x: speed.x * 2,
      y: speed.y * 2
    },
    musicGenre: randomSelector(musicGenres)
  },
  {
    num: 7,
    ballsNumber: ballsNumber++,
    speed: {
      x: speed.x * 2,
      y: speed.y * 2
    },
    musicGenre: randomSelector(musicGenres)
  },

]

const settings = {
  instrument: 'web.png',
  background: '/ih/ih-bg.jpg',
  frames: 6
}
const ih = [{
    num: 1,
    speed: {
      x: speed.x,
      y: speed.y
    },
    balls: [
      'img/ih/bootstrap.png',
      'img/ih/html.png',
      'img/ih/css3.png',
      'img/ih/js.png'
    ],
    ballsNumber: 4,
    background: '/ih/ih-bg.jpg'
  },
  {
    num: 2,
    speed: {
      x: speed.x * 1.5,
      y: speed.y * 1.5
    },
    balls: [
      'img/ih/express.png',
      'img/ih/mongodb.png',
      'img/ih/nodejs.png',
      'img/ih/handlebars.png'
    ],
    ballsNumber: 4,
    background: '/ih/ih-bg.jpg'
  },
  {
    num: 3,
    speed: {
      x: speed.x * 2.5,
      y: speed.y * 2.5
    },
    balls: [
      'img/ih/express.png',
      'img/ih/mongodb.png',
      'img/ih/nodejs.png',
      'img/ih/react.png',
      'img/ih/passport.png',
    ],
    ballsNumber: 5,
    background: '/ih/ih-bg.jpg'
  },

]