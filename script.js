//dados iniciais
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '',
}
let warning = ''
let vez = ''
let playing = false

reset()
//eventos
document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach((item)=> {
    item.addEventListener('click', (e)=> {
        let loc = e.target.getAttribute("data-item")

        if(playing && square[loc] === '') {
            square[loc] = vez
            renderSquare()
            togglePlayer()
        }
        
    })
})
//funções

function reset() {
    //limpar texto
    warning = ''

    //definir a vez
    let random = Math.floor(Math.random() * 2)
      vez = random === 0 ? 'x' : 'o'
    //resetar os quadros
    for(let i in square) {
        square[i] = ''
    }

    //renderizar tudo
    renderSquare()
    renderInfo()
    playing = true
}

function renderSquare() {
    for(let i in square) {
        let dataitem = document.querySelector(`div[data-item=${i}]`)
        if(square[i] !== '') {
            dataitem.innerHTML = square[i]
        }else {
            dataitem.innerHTML = ''
        }
    }

    checkGame()
}
function renderInfo() {
    document.querySelector('.vez').innerHTML = vez
    document.querySelector('.resultado').innerHTML = warning
}
function togglePlayer() {
    vez = vez === "x" ? "o" : "x"
    renderInfo()
}

function checkGame( ) {
    if(checkWinnerFor('O')) {
        warning = 'vencedor: O'
        playing = false
    }else if(checkWinnerFor('x')) {
        warning = 'vencedor: X'
        playing = false
    }else if(isFull()) {
        warning = 'Empate! Fim de jogo!!!'
    }

}
function checkWinnerFor(option) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];
    for(let i in pos) {
        let ApArray = pos[i].split(',')
        let Array = ApArray.every(e=> square[e] === option)
        if(Array) return true
    }
}
function isFull() {
    for(let i in square) {
        if(square[i] == '') {
            return false
        }
    }
    return true
}