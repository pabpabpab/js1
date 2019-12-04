//=====================================<задание 1>=========================================
/*
По определению простых чисел 0 и 1 не являются таковыми,
поэтому и в функции проверки на простое число isSimpleNumber()
и в основонм цикле while отсчет начинаем с 2-х.
(Любое число делится на себя и на 1, но нам надо чтоб не делилось на что-то еще.
Поэтому цикл в функции isSimpleNumber() в таких пределах)
*/

function isSimpleNumber(a) {
    for (let i = 2; i < a; i++) {
        if (a % i === 0) return false;
    }
    return true;
}

function getSimpleRange (max) {
    let i = 2, simpleRange = [];
    while (i <= max) {
        if (isSimpleNumber(i)) simpleRange.push(i);
        i++;
    }
    return simpleRange;
}

alert (getSimpleRange(100));
//=====================================</задание 1>=========================================

//======================================<задание 2>=========================================
let basket = [
    ['t-shirt', 2, 500, 'rub'],
    ['trousers', 1, 2350, 'rub'],
    ['socks', 2, 500, 'rub'],
    ['sneakers', 1, 5000, 'rub'],
    ['belt', 1, 1000, 'rub']
]


function basketOutput(basket) {
    let goodsCount = basket.length;
    let basketTxt = '';
    for (let i = 0; i < goodsCount; i++) {
        basketTxt += basket[i][0] + ': ' + basket[i][2] + ' ' + basket[i][3] + ' (' + basket[i][1] + ' things)\n' ;
    }
    return basketTxt;
}



function countBasketPrice(basket) {
    let totalPrice = 0;
    let goodsCount = basket.length;
    for (let i = 0; i < goodsCount; i++) {
        totalPrice += basket[i][1] * basket[i][2];
    }
    return totalPrice;
}

alert ('Итоговая цена корзины: \n\n' + basketOutput(basket) + '\n' + countBasketPrice(basket) + ' rub');
//======================================</задание 2>=========================================

//======================================<задание 3>==========================================
let output = ''
for (let i = 0; i <= 9; output += '' + i++) {}
alert('задание 3:\n' + output);
//======================================</задание 3>==========================================

//======================================<задание 4>==========================================
function pyramid (size)
{
    let row = '', body = '';
    for (let i = 1; i <= size; i++) {
        for (let j = 1; j <= size - (size - i); j++) {
            row += '' + 'x';
        }
        body += row + '\n';
        row = '';
    }
    return body;
}

alert(pyramid(20));
//======================================</задание 4>==========================================