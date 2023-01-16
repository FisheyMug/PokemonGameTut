const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const map = new Image()
map.src = './img/fishTown.png'
const playerImage = new Image()
playerImage.src = './img/playerDown.png'

class Sprite {
    constructor({
        position,
        velocity
    }) {
        this.position = position
    }
}


function animate() {
    requestAnimationFrame(animate)
    ctx.drawImage(map, -350, -750)
    ctx.drawImage(playerImage, 
        0,
        0,
        playerImage.width/4,
        playerImage.height,
        canvas.width / 2 - (playerImage.width /4) / 2,
        canvas.height /2 - playerImage.height / 2,
        playerImage.width/4,
        playerImage.height)
}
animate()

// addEventListener('keydown', ({key}) => {
//     console.log(key)
//     switch (key) {
//         case: 'w':

//         break
//         case: 'a':

//         break
//         case: 's':

//         break
//         case: 'd':

//         break

//     }
// })