'use strict';


//ЗАДАНИЕ 1 ИДЕТ ПОСЛЕ ЗАДАНИЯ 2, а то корзина дергается при удалении товаров

//======================================<задание 2>==============================================

let cart = {
    currency: '$',

    goods: [
        {
            id: 1,
            name: 'mango people t-shirt',
            imgUrl: 'https://nd34.ru/p/shoppingCart_product_1.png',
            color: 'Red',
            size: 'Xl',
            price: 100,
            quantity: 2,
            shipping: 'free',
        },
        {
            id: 2,
            name: 'hawaiian people t-shirt',
            imgUrl: 'https://nd34.ru/p/shoppingCart_product_2.png',
            color: 'Yellow',
            size: 'M',
            price: 130,
            quantity: 1,
            shipping: 'free',
        },
        {
            id: 3,
            name: 'caribbean people t-shirt',
            imgUrl: 'https://nd34.ru/p/shoppingCart_product_3.png',
            color: 'Blue',
            size: 'S',
            price: 90,
            quantity: 2,
            shipping: 'free',
        }
    ],

    //здесь: класс css хедера корзины, текст заголовка колонки корзины
    headerData: [
        ['shoppingCart__item__productDetails shoppingCartTile','Product Details'],
        ['shoppingCart__item__unitPrice shoppingCartTile','unite Price'],
        ['shoppingCart__item__quantity shoppingCartTile','Quantity'],
        ['shoppingCart__item__shipping shoppingCartTile','shipping'],
        ['shoppingCart__item__subtotal shoppingCartTile','Subtotal'],
        ['shoppingCart__item__action shoppingCartTile','ACTION'],
    ],


   //здесь: класс css, часть id тэга, название функции рисования или свойства, пояснение: свойство или функция
   itemData: [
       ['shoppingCart__item__productDetails', 'productDetails', 'drawProductDetails', 'function'],
       ['shoppingCart__item__unitPrice', 'unitPrice', 'drawPrice', 'function'],
       ['shoppingCart__item__quantity', 'quantity', 'drawQuantityInput', 'function'],
       ['shoppingCart__item__shipping', 'shipping', 'shipping', 'property'],
       ['shoppingCart__item__subtotal', 'subtotal', 'drawSubTotal', 'function'],
       ['shoppingCart__item__action', 'action', 'drawActions', 'function'],
   ],


    //заполнение ячейки подробностей товара: фото, цвет, размер
    drawProductDetails(id, elem) {
        let index = this.getGoodIndexById(id);
        let html = `<a href="#" class="shoppingCart__productImg__link">
                        <img src="${this.goods[index].imgUrl}" class="shoppingCart__productImg">
                    </a>
                    <div class="shoppingCart__productParametersBox">
                        <a href="#" class="shoppingCart__productName">${this.goods[index].name}</a>
                        <p class="shoppingCart__productColor">Color: <span class="shoppingCart__productColor__value">${this.goods[index].color}</span></p>
                        <p class="shoppingCart__productSize">Size: <span class="shoppingCart__productSize__value">${this.goods[index].size}</span></p>
                    </div>
        `;

        if (elem === null) {
            let tagId = '#productDetails-' + id;
            let myTag = document.querySelector(tagId);
            myTag.insertAdjacentHTML('afterBegin', html);
        } else {
            elem.insertAdjacentHTML('afterBegin', html);
        }
    },


    //заполнение ячейки кол-во товара с input'ом
    drawQuantityInput(id, elem) {
        let index = this.getGoodIndexById(id);
        let html = `<input type="number" value="${this.goods[index].quantity}" id="quantityInput-${id}" min="1" max="999" required class="shoppingCart__item__quantity_input">`;

        if (elem === null) {
            let tagId = '#quantity-' + id;
            let myTag = document.querySelector(tagId);
            myTag.insertAdjacentHTML('afterBegin', html);
        } else {
            elem.insertAdjacentHTML('afterBegin', html);
        }
    },


    //заполнение ячейки где кнопка удалить товар
    drawActions(id, elem) {

         let html = `<a href="#" id="delete-${id}" class="drop_cart_closer top0"></a>`;

         if (elem === null) {
            let tagId = '#action-' + id;
            let myTag = document.querySelector(tagId);
            myTag.insertAdjacentHTML('afterBegin', html);
        } else {
            elem.insertAdjacentHTML('afterBegin', html);
        }
    },




    //нарисовать итоговую стоимость одного товара subTotalPrice (цена товара на кол-во) с валютой
    drawSubTotal(id, elem) {
        let index = this.getGoodIndexById(id);
        let subtotal;
        if (index >= 0) {
            subtotal = this.goods[index].quantity * this.goods[index].price;
        } else {
            return index;
        }

        if (elem === null) {
            let tagId = '#subtotal-' + id;
            let myTag = document.querySelector(tagId);
            myTag.textContent = this.currency + subtotal;
        } else {
            elem.textContent = this.currency + subtotal;
        }
    },




    //нарисовать цену товара с валютой
    drawPrice(id, elem) {
        let index = this.getGoodIndexById(id);
        let price;
        if (index >= 0) {
            price = this.goods[index].price;
        } else {
            return index;
        }

        if (elem === null) {
            let tagId = '#unitPrice-' + id;
            let myTag = document.querySelector(tagId);
            myTag.textContent = this.currency + price;
        } else {
            elem.textContent = this.currency + price;
        }
    },




    //рисование строки товара в корзине
    drawItem(index, myCartBody) {
        const myCartItem = document.createElement('div');
        myCartItem.className = 'shoppingCart__item';
        myCartItem.id = 'good-' + this.goods[index].id;

        let column, property;
        for (let i = 0; i < this.itemData.length; i++) { //перебор колонок строки (данные из массива itemData)
            column = document.createElement('div');
            column.id = this.itemData[i][1] + '-' + this.goods[index].id;//сделать id тэга-колонки с добавлением id товара
            column.className = this.itemData[i][0]; //взять класс из массива
            property = this.itemData[i][2]; //с помощью какой функциеи или свойства появятся данные в колонке (ячейке)
            if (this.itemData[i][3] === 'property') {
                column.textContent = this.goods[index][property]; //просто считать свойство объекта и присвоить ячейке
            } else {
                this[property](this.goods[index].id, column); //или вызвать функцию которая заполнит ячейку (column - ссылка на ячейку)
            }

            myCartItem.appendChild(column); // добавить в строку созданную ячейку
        }


        myCartBody.appendChild(myCartItem); //добавить в тело корзины строку товара
    },




    //нарисовать тело корзины (тело корзины это только товары, без хедера и футера корзины)
    drawBody(myCart) {
        const myCartBody = document.createElement('div');
        myCartBody.id = 'shoppingCartBody';

        let goodsQuantity = this.getGoodsQuantity();
        for (let i = 0; i < goodsQuantity; i++) {
            this.drawItem(i, myCartBody); //путем рисования строк товаров (один товар - одна строка)
        }

        myCart.appendChild(myCartBody); //добавить тело корзины в корзину
    },




    //строка заголовков корзины
    drawHeader(myCart) {

        const myCartHeader = document.createElement('div');
        myCartHeader.className = 'shoppingCart__header';

        let column;
        this.headerData.forEach(function (item) { //взять данные хедера из массива headerData
            column = document.createElement('div');
            column.className = item[0];
            column.textContent = item[1];
            myCartHeader.appendChild(column);
        });

        myCart.appendChild(myCartHeader); //добавить хедер корзины в корзину
    },



    //футер корзины где только grandTotalPrice
    drawFooter(myCart) {
        let html = `<div id="footer" class="shoppingCart_grandTotal">
                    <p class="shoppingCart_grandTotal_grandTotal">GRAND TOTAL<span id=grandTotal class="shoppingCart_grandTotal_grandTotal_value">${this.currency}${this.getTotalPrice()}</span></p>
                    </div>`;
        myCart.insertAdjacentHTML('beforeEnd', html);
    },



    //нарисовать всю корзину (хедер, тело, футер)
    draw() {
        let myCart = document.createElement('div');
        myCart.className = 'container shoppingCart';

        this.drawHeader(myCart); //хедер
        this.drawBody(myCart); //тело
        this.drawFooter(myCart); //футер

        document.querySelector('body').appendChild(myCart); //добавить корзину на страницу
    },




    //итоговая стоимость корзины
    getTotalPrice() {
        let goodsQuantity = this.getGoodsQuantity();
        let totalPrice = 0;
        for (let i = 0; i < goodsQuantity; i++) {
            totalPrice += this.goods[i].price * this.goods[i].quantity;
        }

        return totalPrice;
    },




    //получить индекс товара в массиве по его id
    getGoodIndexById(id) {
        let goodsQuantity = this.getGoodsQuantity();
        let index = -1;
        for (let i = 0; i < goodsQuantity; i++) {
            if (id === this.goods[i].id) {
                index = i;
                break;
            }
        }
        return index;
    },


    //посчитать кол-во товаров
    getGoodsQuantity() {
        return this.goods.length;
    },



    //редактировать кол-во товара (и потом пересчитать subTotalPrice товаров и grandTotalPrice корзины, и перерисовать эти значения)
    //это обработчик события, и в нем не работает this (контекст поменялся), и как исправить прочитал, но не понял (поэтому this поменял на cart)
    editGoodQuantity() {

        let goodsQuantity = cart.goods.length;
        let newQuantity, id;
        for (let i = 0; i < goodsQuantity; i++) {
            id = cart.goods[i].id;
            newQuantity = +document.querySelector('#quantityInput-' + id).value;
            cart.goods[i].quantity = newQuantity;
            cart.drawSubTotal(id, null);
        }

        document.querySelector('#grandTotal').textContent = cart.currency + cart.getTotalPrice();
    },





    //удалить товар из корзины
    deleteGood() {
        //здесь this - это контекст кнопки Удалить по которой клик, this.id это id элемента вида "delete-2", взять id товара из этой строки
        let id = parseInt(this.id.split('-')[1]);

        let index = cart.getGoodIndexById(id);
        if (index >= 0) {
            cart.goods.splice(index, 1);
            document.querySelector('#good-' + id).remove();
        }

        let totalPrice = cart.getTotalPrice();
        if (totalPrice > 0) {
            document.querySelector('#grandTotal').textContent = cart.currency + totalPrice;
        } else if (cart.getGoodsQuantity() === 0) {
            let elem = document.querySelector('#footer');
            elem.innerHTML = '';
            elem.className = 'shoppingCart_grandTotal shoppingCart_grandTotal_empty';
            elem.textContent = 'the cart is empty :)';
        }
    },





    //обработка событий: изменение кол-ва товаров, удаление товаров
    listener() {
        let goodsQuantity = this.getGoodsQuantity();
        let id, elem;
        for (let i = 0; i < goodsQuantity; i++) {
            id = this.goods[i].id;//id товара

            //изменение кол-ва товара
            elem = document.querySelector('#quantityInput-' + id);
            elem.addEventListener('keyup', this.editGoodQuantity);

            //удаление товара
            elem = document.querySelector('#delete-' + id);
            elem.addEventListener('click',  this.deleteGood);
        }
    },



};




cart.draw();//нарисовать корзину
cart.listener();//обработка событий
//======================================<задание 2>==============================================



//======================================<задание 1>==============================================
const chess = {
    rows: 8,
    cols: 8,
    numbers: ['1 ','2','3','4','5','6','7','8'],
    liters: ['A','B','C','D','E','F','G','H'],


    draw() {
        const myChess = document.createElement('table');
        myChess.className = 'chess';

        let trElem, tdElem, literElem, numberedElem;
        for (let i = 0; i < this.rows; i++) {
            trElem = document.createElement('tr');
            trElem.className = 'tr';

            for (let j = 0; j < this.cols; j++) {
                tdElem = document.createElement('td');
                tdElem.className = 'td' + ((j + i % 2) % 2 + 1);

                if (i === this.rows - 1) {
                    literElem = document.createElement('span');
                    literElem.className = 'liter';
                    literElem.textContent = this.liters[j];
                    tdElem.appendChild(literElem);
                }

                if (j === 0) {
                    numberedElem = document.createElement('span');
                    (i === this.rows - 1) ? numberedElem.className = 'number numberOne' : numberedElem.className = 'number';
                    numberedElem.textContent = this.numbers[this.cols - 1 - i];
                    tdElem.appendChild(numberedElem);
                }

                trElem.appendChild(tdElem);
            }

            myChess.appendChild(trElem);
        }

        document.querySelector('body').appendChild(myChess);
    },

};

chess.draw();
//======================================</задание 1>==============================================
