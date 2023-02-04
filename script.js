const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576


const collisionsMap = []
for (let i = 0; i < collisions.length; i+=70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}


const offset = {
    x: -350,
    y: -750
}

class Boundary {
    static width = 48
    static height = 48
    constructor(position) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []

collisionsMap.forEach ((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
            }}))
        }
       
    })
})

const map = new Image()
map.src = './img/fishTown.png'
const playerImage = new Image()
playerImage.src = './img/playerDown.png'

class Sprite {
    constructor({position, velocity, image}) {
        this.position = position
        this.image = image
    }

    draw () {
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}

const test = new Boundary({position:{x: offset.x, y:offset.y}})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: map
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}
let lastKey = '';

const getCursorPosition = (canvas, event) => {
    const x = event.offsetX
    const y = event.offsetY
    console.log(x, y)
  }

  canvas.addEventListener('mousedown', (e) => {
    getCursorPosition(canvas, e)
  })

function animate() {
    requestAnimationFrame(animate)
    background.draw()
 
    boundaries.forEach(boundary => {
        boundary.draw()
    })

    ctx.drawImage(playerImage, 
        0,
        0,
        playerImage.width/4,
        playerImage.height,
        canvas.width / 2 - (playerImage.width /4) / 2,
        canvas.height /2 - playerImage.height / 2,
        playerImage.width/4,
        playerImage.height
        )
    
    
    if (keys.w.pressed && lastKey === 'w') background.position.y += 10
    else if (keys.a.pressed && lastKey === 'a') background.position.x += 10
    else if (keys.s.pressed && lastKey === 's') background.position.y -= 10
    else if (keys.d.pressed && lastKey === 'd') background.position.x -= 10


    
}
animate()

addEventListener('keydown', ({key}) => {

    switch (key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
        break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
        break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
        break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
        break

    }
})

addEventListener('keyup', ({key}) => {
    
    switch (key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break

    }
})