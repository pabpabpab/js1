

/*====================================<задание 1>============================================*/
alert(`
Дан код: 
var a = 1, b = 1, c, d;
c = ++a; alert(c);           // 2
d = b++; alert(d);           // 1
c = (2+ ++a); alert(c);      // 5
d = (2+ b++); alert(d);      // 4
alert(a);                    // 3
alert(b);                    // 3
Почему код дает такие результаты?


c = ++a; - если два плюса идут до операнда, то возвратится число увеличенное на 1, было 1, стало 2.

d = b++; - если два плюса идут после переменной, то сначала возвращается значение операнда до увеличения на 1, а потом уже делается инкримент. Было 1 и вернется 1, то есть значение до инкремента. 

c = (2+ ++a); - здесь переменная a уже была равна 2, далее делается еще инкримент и прибавляется 2, поэтому результат 5. 

d = (2+ b++); - здесь переменная b после первого инкримента стала равна 2, и сейчас переменной d вернется ее значение до нового инкримента и прибавится 2, то есть резалт равен 4. 

alert(a); - переменная a была равна 1 в самом начале, потом произошло с ней два инкримента, поэтому здесь резалт равен 3. 

alert(b); - переменная b была равна 1 в самом начале, потом также произошло с ней два инкримента, поэтому здесь резалт также равен 3.
`);
/*====================================</задание 1>============================================*/

/*====================================<задание 2>============================================*/
var aa = 2;
var x = 1 + (aa *= 2);

alert(`
Чему будет равен x в примере ниже?
var a = 2;
var x = 1 + (a *= 2);

второй операнд сложения (a *= 2) можно переписать как a = a * 2; и в переменную запишется 4.

потом произойдет сложение 1 + 4, и результат будет равен 5: да точно ${x} 
`);
/*====================================</задание 2>============================================*/

/*====================================<задание 3>============================================*/
function getNumber(maxNumber, notZero = 0) {
    if (notZero === 1)
        return parseInt(Math.random() * maxNumber) + 1;
    else
        return parseInt(Math.random() * maxNumber);
}



function A_and_B (a, b) {
    let answer = '';
    switch (true) {
        case (a >= 0 && b >= 0):
            answer = `Разность ${a} и ${b} равна ${Math.abs(a - b)}`;
            break;
        case (a < 0 && b < 0):
            answer = `Произведение ${a} и ${b} равно ${a * b}`;
            break;
        case (a >= 0 && b < 0):
        case (a < 0 && b >= 0):
            answer = `Сумма ${a} и ${b} равна ${a + b}`;
            break;
        default:
            answer = 'Этого не может быть!';
    }
    return answer;
}




alert(`
если a и b положительные, вывести их разность;
если а и b отрицательные, вывести их произведение;
если а и b разных знаков, вывести их сумму; 

${A_and_B(getNumber(10), getNumber(10))} 
${A_and_B(getNumber(10,1) * -1, getNumber(10, 1) * -1)} 
${A_and_B(getNumber(10) , getNumber(10, 1) * -1)}
`);



/*
do {
    a = +prompt('Введите целое число A:');
} while (!Number.isInteger(a))

do {
    b = +prompt('Введите целое число B:');
} while (!Number.isInteger(b))

alert (A_and_B(a, b));
*/

/*====================================</задание 3>============================================*/

/*====================================<задание 4>============================================*/

let answer = '';

function magicOutput (a) {

    switch (a) {
        case 0:
            answer = '0, ';
            magicOutput (a + 1);
            break;
        case 1:
            answer = answer + 1 + ', ';
            magicOutput (a + 1);
            break;
        case 2:
            answer = answer + 2 + ', ';
            magicOutput (a + 1);
            break;
        case 3:
            answer = answer + 3 + ', ';
            magicOutput (a + 1);
            break;
        case 4:
            answer = answer + 4 + ', ';
            magicOutput (a + 1);
            break;
        case 5:
            answer = answer + 5 + ', ';
            magicOutput (a + 1);
            break;
        case 6:
            answer = answer + 6 + ', ';
            magicOutput (a + 1);
            break;
        case 7:
            answer = answer + 7 + ', ';
            magicOutput (a + 1);
            break;
        case 8:
            answer = answer + 8 + ', ';
            magicOutput (a + 1);
            break;
        case 9:
            answer = answer + 9 + ', ';
            magicOutput (a + 1);
            break;
        case 10:
            answer = answer + 10 + ', ';
            magicOutput (a + 1);
            break;
        case 11:
            answer = answer + 11 + ', ';
            magicOutput (a + 1);
            break;
        case 12:
            answer = answer + 12 + ', ';
            magicOutput (a + 1);
            break;
        case 13:
            answer = answer + 13 + ', ';
            a += 1; magicOutput (a);
            break;
        case 14:
            answer = answer + 14 + ', ';
            magicOutput (a + 1);
            break;
        case 15:
            answer = answer + 15;
            break;
    }

    return answer;
}

let a = getNumber(15);

alert ('Вывод ряда чисел от A = ' + a + ' до 15: \n\n' + magicOutput(a));

/*====================================</задание 4>============================================*/

/*====================================<задание 5>============================================*/
function addition(a, b)
{
    answer = a + b;
    return answer;
}

function subtraction(a, b)
{
    answer = Math.abs(a - b);
    return answer;
}

function multiplication(a, b)
{
    answer = a * b;
    return answer;
}

function division(a, b)
{
    answer = (a / b).toFixed(1);
    return answer;
}
/*====================================</задание 5>============================================*/

/*====================================<задание 6>============================================*/
function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case 'addition':
            return addition(arg1, arg2);
        case 'subtraction':
            return subtraction(arg1, arg2);
        case 'multiplication':
            return multiplication(arg1, arg2);
        case 'division':
            return division(arg1, arg2);
        default:
            return 'Неизвестная операция';
    }
}

function getSign() {
    return Math.random() < 0.5 ? -1 : 1;
}


let arg1 = getNumber(10, 1) * getSign();
let arg2 = getNumber(10, 1) * getSign();


alert(`
Реализовать арифметические функции, а потом функцию с тремя параметрами: arg1, arg2, operation ... использующую в switch первые четыре арифметические функции.

Сгенерированы числа A = ${arg1} и B = ${arg2}: 

их сумма равна ${mathOperation(arg1, arg2, 'addition')} 
их разность равна ${mathOperation(arg1, arg2, 'subtraction')} 
их произведение равно ${mathOperation(arg1, arg2, 'multiplication')} 
их частное равно ${mathOperation(arg1, arg2, 'division')} 
`);

/*====================================</задание 6>============================================*/

/*====================================<задание 7>============================================*/
switch (true) {
    case (null == 0):
        answer = 'null не строго равен 0';
        break;
    case (null === 0):
        answer = 'null строго равен 0';
        break;
    case (null > 0):
        answer = 'null больше чем 0';
        break;
    case (null < 0):
        answer = 'null меньше чем 0';
        break;
    case (null != 0):
        answer = 'null не равно 0';
        break;
    case (null !== 0):
        answer = 'null строго не равно 0';
        break;
    default:
        answer = 'Невозможно сравнить null и 0';
}

alert(`
Значение 0 это величина, которая к тому же больше всех отрицательных значений, и у 0 есть тип - целое число. У null в свою очередь нет ни значения ни типа - пустое значение. Поэтому результат сравнения 0 и null будет неравенство, неравенство нестрогое и неравенство строгое, оба этих условия дадут результат true: ${answer}
`);
/*====================================</задание 7>============================================*/

/*====================================<задание 8>============================================*/
function power(val, pow) {
    if (pow == 1)
        return val * 1;
    else
        return val * power(val, pow - 1);
}

alert(`
рекурсивная function power(val, pow) {
    if (pow == 1)
        return val * 1;
    else
        return val * power(val, pow - 1);
}

power(2, 3) = ${power(2, 3)}
`);
/*====================================</задание 8>============================================*/



