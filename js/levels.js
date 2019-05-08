function randomSelector(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function getLevel(levelNum) {
  // console.log(levelNum)
  return levels.filter(level => level.num === levelNum)[0]
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
      y: speed.x
    },
    musicGenre: randomSelector(musicGenres)
  },
  {
    num: 2,
    ballsNumber: ballsNumber++,
    speed: {
      x: speed.x * 1.5,
      y: speed.x * 1.5
    },
    musicGenre: randomSelector(musicGenres)
  },
  {
    num: 3,
    ballsNumber: ballsNumber++,
    speed: {
      x: speed.x * 2,
      y: speed.x * 2
    },
    musicGenre: randomSelector(musicGenres)
  },
  {
    num: 4,
    ballsNumber: 5,
    speed: {
      x: speed.x * 2,
      y: speed.x * 2
    },
    musicGenre: randomSelector(musicGenres)
  },
  {
    num: 5,
    ballsNumber: ballsNumber++,
    speed: {
      x: speed.x * 2,
      y: speed.x * 2
    },
    musicGenre: randomSelector(musicGenres)
  },
  {
    num: 6,
    ballsNumber: ballsNumber++,
    speed: {
      x: speed.x * 2,
      y: speed.x * 2
    },
    musicGenre: randomSelector(musicGenres)
  },
  {
    num: 7,
    ballsNumber: ballsNumber++,
    speed: {
      x: speed.x * 2,
      y: speed.x * 2
    },
    musicGenre: randomSelector(musicGenres)
  },

]