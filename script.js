const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576


const collisionsMap = []
for (let i = 0; i < collisions.length; i+=70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i+=70) {
    battleZonesMap.push(battleZonesData.slice(i, 70 + i))
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

const battleZones = []

battleZonesMap.forEach ((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            battleZones.push(
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

const foregroundImage = new Image()
foregroundImage.src = './img/foreground.png'

const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'


const player = new Sprite({
    position: {
        x:canvas.width / 2 - (192 /4) / 2,
        y:canvas.height /2 -68 / 2
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage,
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: map
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
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
const movables =[background, ...boundaries, foreground, ...battleZones];
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
    battleZones.forEach(battleZone => {
        battleZone.draw()
    })

    player.draw();
    
    foreground.draw()

    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i=0; i<battleZones.length; i++) {
            const battleZone = battleZones[i];
            const overlappingArea = (Math.min(player.position.x + 
                player.width, battleZone.position.x + battleZone.width) - 
                Math.max(player.position.x, battleZone.position.x)) * 
                (Math.min(player.position.y + player.height, 
                    battleZone.position.y + battleZone.height) - 
                    Math.max(player.position.y, battleZone.position.y))
            if (rectangularCollision({
                rectangl1: player,
                rectangle2: battleZone
            }) && 
            overlappingArea > player.width * player.height / 2
            && Math.random() < 0.1
            ) {
                console.log("BBB")
                break
            }
        }
    }

    let moving = true;
    player.moving = false;
    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true;
        player.image = player.sprites.up;

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
        player.moving = true;
        player.image = player.sprites.left;
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
        player.moving = true;
        player.image = player.sprites.down;
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
        player.moving = true;
        player.image = player.sprites.right;
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