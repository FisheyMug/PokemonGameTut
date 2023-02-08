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
    y: -755
}

class Boundary {
    static width = 48
    static height = 48
    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        ctx.fillStyle = "rgba(255, 0, 0, 0)"
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
    constructor({position, velocity, image, frames = {max: 1}}) {
        this.position = position
        this.image = image
        this.frames = frames

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        }
        
    }

    draw () {
        ctx.drawImage(
            this.image, 
            0,
            0,
            this.image.width/this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max,
            this.image.height
        )
    }
}


const player = new Sprite({
    position: {
        x:canvas.width / 2 - (192 /4) / 2,
        y:canvas.height /2 -68 / 2
    },
    image: playerImage,
    frames: {
        max: 4
    }
})

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

//allows many movables in game without duplicating code
const movables =[background, ...boundaries];
 function rectangularCollision({rectangl1, rectangle2}) {
    return (
        rectangl1.position.x + rectangl1.width >= rectangle2.position.x &&
        rectangl1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangl1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangl1.position.y + rectangl1.height >= rectangle2.position.y
    )
 }

function animate() {
    requestAnimationFrame(animate)
    background.draw()
 
    boundaries.forEach(boundary => {
        boundary.draw()
    })

    player.draw();
    

    let moving = true;
    if (keys.w.pressed && lastKey === 'w') {
        for (let i=0; i<boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({
                rectangl1: player,
                rectangle2: {...boundary, position: {
                    x: boundary.position.x,
                    y: boundary.position.y + 3
                }}
            })) {
                moving = false;
                break
            }
        }
        if (moving)
        movables.forEach((movable) =>{
        movable.position.y +=3
        })
    } else if (keys.a.pressed && lastKey === 'a') {
        for (let i=0; i<boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({
                rectangl1: player,
                rectangle2: {...boundary, position: {
                    x: boundary.position.x +3,
                    y: boundary.position.y
                }}
            })) {
                moving = false;
                break
            }
        }
        if (moving)

        movables.forEach((movable) =>{
            movable.position.x +=3
        })
    }
    else if (keys.s.pressed && lastKey === 's') {
        for (let i=0; i<boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({
                rectangl1: player,
                rectangle2: {...boundary, position: {
                    x: boundary.position.x,
                    y: boundary.position.y - 3
                }}
            })) {
                moving = false;
                break
            }
        }
        if (moving)
        movables.forEach((movable) =>{
            movable.position.y -=3
        })
    }
    else if (keys.d.pressed && lastKey === 'd') {
        for (let i=0; i<boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({
                rectangl1: player,
                rectangle2: {...boundary, position: {
                    x: boundary.position.x -3,
                    y: boundary.position.y
                }}
            })) {
                moving = false;
                break
            }
        }
        if (moving)
        movables.forEach((movable) =>{
            movable.position.x -=3
        })
    }


    
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