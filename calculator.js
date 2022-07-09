const numKey = document.querySelectorAll('.num')
let textbox = document.querySelector('.textbox')
const mathKey = document.querySelectorAll('.math')
const equalsKey = document.querySelector('#equals').addEventListener('click', doMath)
const clearKey = document.querySelector('#clear').addEventListener('click', clear)
const delKey = document.querySelector('#backspace').addEventListener('click', backspace)

let display = []
let firstValue = ''
let operator
let restart = false

numKey.forEach((num) => {
    num.addEventListener('click', numPress)
})

mathKey.forEach((key) => {
    key.addEventListener('click', startMath)
})

function clear() {
    display = []
    operator = ''
    firstValue = ''
    textbox.textContent = '0'
}

function backspace() {
    if(textbox.textContent != '0') {
        display.pop()
        textbox.textContent = display.join('')
    }
}

function numPress(e) {
    if(restart === true) {
        firstValue = ''
        restart = false
        display.push(e.target.textContent)
        textbox.textContent = display.join('')
    } else if(textbox.textContent != '0') {
        display.push(e.target.textContent)
        textbox.textContent = display.join('')
    } else {
        display.pop()
        display.push(e.target.textContent)
        textbox.textContent = display.join('')
    }

    console.log(firstValue)
    console.log(display)

}

function startMath(e) {
    if(firstValue === '') {
        firstValue = Number(display.join(''))
        operator = e.target.id
        display = []
    } else {
        doMath()
        operator = e.target.id
    }
}

function operate(operator,a,b) {
    switch(operator) {
        case 'add':
            return a + b
        case 'subtract':
            return a - b
        case 'multiply':
            return a * b
        case 'divide':
            return a / b
    }
}

function doMath() {
    if(operator != '') {
        let answer = operate(operator, firstValue, Number(display.join('')))
        display = Array.from(String(answer))
        textbox.textContent = display.join('')
        firstValue = Number(display.join(''))
        display = []
        operator = ''
        restart = true
    }

}