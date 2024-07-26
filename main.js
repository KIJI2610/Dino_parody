const piple = document.getElementById('piple')
const dino1 = document.getElementById('dino1')
const dino2 = document.getElementById('dino2')
const game = document.querySelector('game')
let keydown = false
let isJumping = false


// Появление второго динозаврика
function startInterval() {
    const a = Math.floor(Math.random() * 5);
    console.log(a);
    if (a === 1) {
        dino2.classList.add('dino-move');
        setTimeout(() => {
            dino2.classList.remove('dino-move');
            setTimeout(startInterval, 300); // Запускаем следующий цикл после завершения таймаута
        }, 2000);
    } else {
        setTimeout(startInterval, 300); // Запускаем следующий цикл без задержки
    }
}

startInterval(); // Запускаем первый цикл


document.addEventListener('keydown', e => {
    // Прыжок
    if (e.keyCode === 87 && !keydown && !isJumping) {
        jump()
        keydown = true
        isJumping = true
    }
    // Быстрое приземление
    if(e.keyCode === 83 && isJumping && !keydown){
        piple.classList.remove('jump')
        isJumping = false
    }
})

document.addEventListener('keyup', e => {
    if (e.keyCode === 87) {
        keydown = false
    }
})

// Функция для прыжка
function jump() {
    piple.classList.add('jump')
    setTimeout(() => {
        if(isJumping && !keydown){
            piple.classList.remove('jump')
            isJumping = false
        }
    }, 1000)
}

let isAlive = setInterval(() => {
    let piple_top = parseInt(window.getComputedStyle(piple).getPropertyValue('top'))
    let dino1_left = parseInt(window.getComputedStyle(dino1).getPropertyValue('left'))
    let dino2_left = parseInt(window.getComputedStyle(dino2).getPropertyValue('left'))

    if(dino1_left < 250 && dino1_left > 200 && piple_top >= 400 || dino2_left < 250 && dino2_left > 200 && piple_top >= 400){
        alert('game over')
        window.location.reload()
    }
},10)
