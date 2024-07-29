const piple = document.getElementById('piple')
const dino1 = document.getElementById('dino1')
const dino2 = document.getElementById('dino2')
const game = document.querySelector('game')
const current_count = document.getElementById('current-count')
const record_count = document.getElementById('record-count')
let count_num = 0
let keydown = false
let isJumping = false
let play_run = false
let fast_down_prevent = false

setInterval(() => {
    if(play_run){
        count_num++
        current_count.textContent = count_num
    }
},100)

// Появление второго динозаврика
function startInterval() {
    const a = Math.floor(Math.random() * 5)
    // console.log(a)
    if (a === 1 && dino2.className !== 'dino-move') {
        dino2.classList.add('dino-move')
        setTimeout(() => {
            dino2.classList.remove('dino-move')
            setTimeout(startInterval, 300) // Запускаем следующий цикл после завершения таймаута
        }, 2000)
    }
    else {
        setTimeout(startInterval, 300) // Запускаем следующий цикл без задержки
    }
}

function play(){
    dino1.classList.add('dino-move')
    piple.classList.add('piple-run')
    piple.classList.remove('piple-idle')
    time_animation = 50
    startInterval() // Запускаем первый цикл для второго динозаврика
    play_run = true
}

setInterval(() => {
    // (time_animation === 150)?(console.log('anim150')):(console.log('anim'))
        // Получаем текущее значение backgroundPositionX и преобразуем его в число
        let currentPosition = parseInt(piple.style.backgroundPositionX || '0', 10);
        // Уменьшаем значение на 50px
        piple.style.backgroundPositionX = (currentPosition - 50) + 'px';
}, 150)


let prevent_jump

document.addEventListener('keydown', e => {
    // Прыжок
    if (e.keyCode === 87 && !keydown && !isJumping && play_run) {
        piple.classList.add('jump')
        piple.classList.add('piple-jump')
        isJumping = true
        fast_down_prevent = false
        if(fast_down_prevent === false){
            prevent_jump = setTimeout(() => {
                if(isJumping === true){
                    piple.classList.remove('jump')
                    piple.classList.remove('piple-jump')
                    isJumping = false
                }
            }, 1000)
        }
        keydown = true
    }
    
    // Быстрое приземление
    if(e.keyCode === 83 && isJumping && !keydown && play_run){
        isJumping = false
        fast_down_prevent = true
        piple.classList.remove('jump')
        piple.classList.remove('piple-jump') 
        clearTimeout(prevent_jump)
    }
})

document.addEventListener('keyup', e => {
    if (e.keyCode === 87) {
        keydown = false
    }
})



// Для соприкосновения с динозаврами и смерти
// let isAlive = setInterval(() => {
//     let piple_top = parseInt(window.getComputedStyle(piple).getPropertyValue('top'))
//     let dino1_left = parseInt(window.getComputedStyle(dino1).getPropertyValue('left'))
//     let dino2_left = parseInt(window.getComputedStyle(dino2).getPropertyValue('left'))

//     if(dino1_left < 250 && dino1_left > 200 && piple_top >= 415 || dino2_left < 250 && dino2_left > 200 && piple_top >= 415){
//         alert('game over')
//         window.location.reload()
//     }
// },10)

