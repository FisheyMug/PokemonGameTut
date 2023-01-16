const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const map = new Image()
map.src = './img/fishTown.png'
const playerImage = new Image()
playerImage.src = './img/playerDown.png'

map.onload = () => {
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

addEventListener('keydown', ({key}) => {
    console.log(key)
})