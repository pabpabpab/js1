'use strict';


//======================================<корзина>==============================================

const cart = {
    currency: '$',

    goods: [],
    address: '',
    comment: '',

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





    //посчитать кол-во товаров
    getGoodsQuantity() {
        return this.goods.length;
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





    //итоговая стоимость корзины
    getTotalPrice() {
        let goodsQuantity = this.getGoodsQuantity();
        let totalPrice = 0;
        for (let i = 0; i < goodsQuantity; i++) {
            totalPrice += this.goods[i].price * this.goods[i].quantity;
        }

        return totalPrice;
    },





    getMyCart() {
        const myCart = document.querySelector('#cart');

        if (myCart) {
            return myCart;
        }
        else {
            const myCart = document.createElement('div');
            myCart.className = 'container shoppingCart';
            myCart.id = 'cart';
            return myCart;
        }
    },



    //заполнение ячейки подробностей товара: фото, цвет, размер
    drawProductDetails(id, elem) {
        let index = this.getGoodIndexById(id);
        let html = `<a href="#" class="shoppingCart__productImg__link">
                        <img src="${this.goods[index].imgUrl}" data-show-photo-good-id="${this.goods[index].id}" data-show-photo-index="0" class="shoppingCart__productImg">
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
        let html = `<input type="number" value="${this.goods[index].quantity}" data-quantity-input-id="${id}" min="1" max="999" required class="shoppingCart__item__quantity_input">`;

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

        let html = `<a href="#" data-delete-id="${id}" class="drop_cart_closer top0"></a>`;

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
        //myCartItem.id = 'good-' + this.goods[index].id;
        myCartItem.dataset.goodId = this.goods[index].id;


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
    drawBody(myCart = this.getMyCart()) {
        this.deleteCartBody();

        const myCartBody = document.createElement('div');
        myCartBody.id = 'shoppingCartBody';

        let goodsQuantity = this.getGoodsQuantity();
        for (let i = 0; i < goodsQuantity; i++) {
            this.drawItem(i, myCartBody); //путем рисования строк товаров (один товар - одна строка)
        }

        myCart.appendChild(myCartBody); //добавить тело корзины в корзину
    },
    
    deleteCartBody() {
        let cartBody = document.querySelector('#shoppingCartBody');
        if (cartBody) cartBody.remove();
    },




    //строка заголовков корзины
    drawHeader(myCart = this.getMyCart()) {
        this.deleteCartHeader();

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
    
    deleteCartHeader() {
        let cartHeader = document.querySelector('.shoppingCart__header');
        if (cartHeader) cartHeader.remove();
    },




    //футер корзины где только grandTotalPrice
    drawFooter(myCart = this.getMyCart()) {
        this.deleteCartFooter();


        let totalPrice = this.getTotalPrice();


        if (totalPrice > 0) {
            const html = `<div id="shoppingCartFooter" class="container shoppingCart_grandTotal">
                    <a href="#" data-next-step="1" class="nextStep__link">Next</a>
                    <div class="shoppingCart_grandTotal_grandTotal">GRAND TOTAL<span id=grandTotal class="shoppingCart_grandTotal_grandTotal_value">${this.currency}${totalPrice}</span></div>                    
                    </div>`;
            myCart.insertAdjacentHTML('beforeEnd', html);
        } else if (this.getGoodsQuantity() === 0) {
            const html = `<div id="shoppingCartFooter" class="shoppingCart_grandTotal shoppingCart_grandTotal_empty">
                    the cart is empty
                    </div>`;
            myCart.insertAdjacentHTML('beforeEnd', html);
        }
    },
    
    deleteCartFooter() {
        let cartFooter = document.querySelector('#shoppingCartFooter');
        if (cartFooter) cartFooter.remove();
    },


    

    //нарисовать сводку корзины
    drawCartBrief(myCart = this.getMyCart()) {
        this.deleteCartBrief();

        //проверка состояния корзины, свернута или раскрыта, и вид стрелки для ссылки-сводки как результат
        const arrow = (this.isCartExtended()) ? '&#9658;' : '&#9660;';


        const goodsQuantity = this.getGoodsQuantity();
        const cartBriefText = (goodsQuantity > 0)
            ? `${arrow} &nbsp; In the cart ${goodsQuantity} goods with a total price of ${this.currency}${this.getTotalPrice()}`
            : `${arrow} &nbsp; the cart is empty`;

        const html = `<div class="cartBrief">
        <a href="#" data-show-extended-cart="1" class="cartBrief__link">${cartBriefText}</a>
        </div>`;

        myCart.insertAdjacentHTML('afterBegin', html);
    },
    
    deleteCartBrief() {
        let cartBrief = document.querySelector('.cartBrief');
        if (cartBrief) cartBrief.remove();
    },

    isCartExtended() {
        return document.querySelector('.shoppingCart__header');
    },








    //нарисовать всю корзину (хедер, тело, футер, brief)
    draw() {
        this.deleteCart();

        const myCart = this.getMyCart();

        this.drawHeader(myCart); //хедер
        this.drawBody(myCart); //тело
        this.drawFooter(myCart); //футер

        document.querySelector('body').prepend(myCart); //добавить корзину на страницу

        this.drawCartBrief(myCart);//ссылка-сводка корзины
    },

    deleteCart() {
        let cart = document.querySelector('#cart');
        if (cart) cart.remove();
    },





    //обработчик события - редактировать кол-во товара (и потом пересчитать subTotalPrice товара и grandTotalPrice корзины, и перерисовать эти значения)
    editGoodQuantity(event) {
        //data-quantity-input-id="id"
        let id = +event.target.dataset.quantityInputId;
        if (!(id > 0)) return;

        //записать товару в массив новое quantity и перерисовать его новый subTotal
        let index = this.getGoodIndexById(id);
        this.goods[index].quantity = +document.querySelector('[data-quantity-input-id="' + id + '"]').value;
        this.drawSubTotal(id, null);

        //перерисовать totalPrice
        document.querySelector('#grandTotal').textContent = this.currency + this.getTotalPrice();

        //перерисовать cartBrief
        this.drawCartBrief();
    },





    //обработчик события - удалить товар из корзины
    deleteGood(event) {
        //data-delete-id="id"
        let id = +event.target.dataset.deleteId;
        if (!(id > 0)) return;


        let index = this.getGoodIndexById(id);
        if (index >= 0) {
            this.goods.splice(index, 1);
            document.querySelector('[data-good-id="' + id + '"]').remove();
        }

        this.drawCartBrief();
        this.drawFooter();
    },


    //кнопки Далее - свернуть один блок, развернуть другой
    nextStep(step) {
        switch (step) {
            case 1:
                this.deleteCartHeader();
                this.deleteCartBody();
                this.deleteCartFooter();
                this.drawCartBrief();
                this.drawAddress();
                this.drawCommentBrief();
                break;
            case 2:
                this.deleteCartHeader();
                this.deleteCartBody();
                this.deleteCartFooter();
                this.drawCartBrief();


                this.drawAddressBrief();
                this.drawComment();
                break;
            case 3:
                this.drawAddressBrief();
                this.drawCommentBrief();
                this.draw();
                break;
        }
    },







    //нарисовать развернутый блок Адрес
    drawAddress(myCart = this.getMyCart()) {
        this.deleteAddress();

        const html = `<div id="address" class="container address">     
        ${this.getAddressBriefLink('&#9658;')}   
        <textarea class="addressTextArea"></textarea>
        <a href="#" data-next-step="2" class="nextStep__link">Next</a>
        </div>`;

        myCart.insertAdjacentHTML('afterEnd', html);

        const textArea = document.querySelector('.addressTextArea');
        textArea.value = this.address;
    },

    //нарисовать свернутый блок Адрес
    drawAddressBrief(myCart = this.getMyCart()) {
        this.deleteAddress();
        const html = `<div id="address" class="container address_minimized">
                                  ${this.getAddressBriefLink('&#9660;')}
                                  </div>`;
        myCart.insertAdjacentHTML('afterEnd', html);
    },
    //html-код ссылки-сворачивателя
    getAddressBriefLink(arrow) {
        return `<a href="#" data-show-extended-address="1" class="addressBrief__link">${this.getAddressBriefText(arrow)}</a>`;
    },
    //текст ссылки-сворачивателя
    getAddressBriefText(arrow) {
        const addressLength = this.address.length;
        return (addressLength > 20)
            ? `${arrow} &nbsp; Address is filled (${addressLength} characters)`
            : `${arrow} &nbsp; Address is not filled (${addressLength} characters now)`;
    },
    //удалить блок Адрес на случай перерисовки
    deleteAddress() {
        let address = document.querySelector('#address');
        if (address) address.remove();
    },
    //проверка - блок Адрес развернут или нет
    isAddressExtended() {
        return document.querySelector('.addressTextArea');
    },
    //обработчик события keyup - сохранение написанного в textarea в свойство объекта и перерисовка содержимого ссылки-сворачивателя
    saveAddressText() {
        const textArea = document.querySelector('.addressTextArea');
        this.address = textArea.value;

        const myBriefLink = document.querySelector('.addressBrief__link');
        myBriefLink.innerHTML = this.getAddressBriefText('&#9658;');
    },
    //получить ссылку на блок Адрес
    getMyAddress() {
        const myAddress = document.querySelector('#address');

        if (myAddress) {
            return myAddress;
        }
        else {
            const myAddress = document.createElement('div');
            myAddress.className = 'container addressBrief_minimized';
            myAddress.id = 'address';
            return myAddress;
        }
    },




    //нарисовать развернутый блок Комментарий
    drawComment(myAddress = this.getMyAddress()) {
        this.deleteComment();

        const html = `<div id="comment" class="container comment">     
        ${this.getCommentBriefLink('&#9658;')}   
        <textarea class="commentTextArea"></textarea>
        <a href="#" data-next-step="3" class="nextStep__link">Next</a>
        </div>`;

        myAddress.insertAdjacentHTML('afterEnd', html);

        const textArea = document.querySelector('.commentTextArea');
        textArea.value = this.comment;
    },

    //нарисовать свернутый блок Комментарий
    drawCommentBrief(myAddress = this.getMyAddress()) {
        this.deleteComment();
        const html = `<div id="comment" class="container comment_minimized">
                                  ${this.getCommentBriefLink('&#9660;')}
                                  </div>`;
        myAddress.insertAdjacentHTML('afterEnd', html);
    },
    //html-код ссылки-сворачивателя
    getCommentBriefLink(arrow) {
        return `<a href="#" data-show-extended-comment="1" class="commentBrief__link">${this.getCommentBriefText(arrow)}</a>`;
    },
    //текст ссылки-сворачивателя
    getCommentBriefText(arrow) {
        const commentLength = this.comment.length;
        return (commentLength > 10)
            ? `${arrow} &nbsp; Comment is filled (${commentLength} characters)`
            : `${arrow} &nbsp; Comment is not filled (${commentLength} characters now)`;
    },
    //удалить блок Комментарий на случай перерисовки
    deleteComment() {
        let comment = document.querySelector('#comment');
        if (comment) comment.remove();
    },
    //проверка - блок свернут или развернут
    isCommentExtended() {
        return document.querySelector('.commentTextArea');
    },
    //обработчик события keyup - сохранение написанного в textarea в свойство объекта и перерисовка содержимого ссылки-сворачивателя
    saveCommentText() {
        const textArea = document.querySelector('.commentTextArea');
        this.comment = textArea.value;

        const myBriefLink = document.querySelector('.commentBrief__link');
        myBriefLink.innerHTML = this.getCommentBriefText('&#9658;');
    },


};


cart.draw();//нарисовать корзину
cart.drawAddressBrief();//блок адреса доставки
cart.drawCommentBrief();//блок комментарий
//======================================</корзина>==============================================





//======================================<каталог>===============================================

const catalog = {
    currency: '$',

    goods: [
        {
            id: 4,
            name: 'flower people t-shirt',
            imgUrl: 'http://thealohashirt.net/wp-content/uploads/2014/02/pali-hawaiian-style-shirt-001-full.jpg',
            bigImgUrl: [
                'http://thealohashirt.net/wp-content/uploads/2014/02/pali-hawaiian-style-shirt-001-full.jpg',
                'https://gloimg.rglcdn.com/rosegal/pdm-product-pic/Clothing/2018/06/07/source-img/20180607195055_43844.jpg',
                'https://i.pinimg.com/originals/de/67/08/de670842803f7f18feba837120c027e8.jpg',
                'https://i.etsystatic.com/11242558/r/il/522282/899934871/il_794xN.899934871_cxya.jpg'
            ],
            color: 'Pink',
            size: 'XS',
            price: 80,
            quantity: 1,
            shipping: 'free',
        },
        {
            id: 5,
            name: 'spring people t-shirt',
            imgUrl: 'https://gloimg.rglcdn.com/rosegal/pdm-product-pic/Clothing/2017/05/13/source-img/20170513123051_20759.jpg',
            bigImgUrl: [
                'https://gloimg.rglcdn.com/rosegal/pdm-product-pic/Clothing/2017/05/13/source-img/20170513123051_20759.jpg',
                'https://i.pinimg.com/736x/bd/3d/a0/bd3da04bdec1293dabb38fb9b3801347.jpg',
                'https://i.pinimg.com/originals/8f/88/fb/8f88fbc26ade367ab886fdcc09459513.jpg',
                'https://gloimg.gamcdn.com/G/pdm-product-pic/Clothing/2017/03/09/source-img/20170309144250_49950.jpg'
            ],
            color: 'Green',
            size: 'L',
            price: 50,
            quantity: 1,
            shipping: 'free',
        },
        {
            id: 6,
            name: 'blue sky people t-shirt',
            imgUrl: 'https://gloimg.gamcdn.com/G/pdm-product-pic/Clothing/2017/03/09/source-img/20170309145654_89716.jpg',
            bigImgUrl: [
                'https://gloimg.gamcdn.com/G/pdm-product-pic/Clothing/2017/03/09/source-img/20170309145654_89716.jpg',
                'https://www.jcrew.com/s7-img-facade/E7957_MF6234?$pdp_enlarge$',
                'https://images-na.ssl-images-amazon.com/images/I/61Jxt0iaNiL._UL1200_.jpg',
                'https://i.pinimg.com/originals/5c/e6/3b/5ce63b3749841e3acd346c0d87bc1800.jpg',
                'https://sc02.alicdn.com/kf/HLB1qOPWUHrpK1RjSZTEq6AWAVXaP/Men-s-Short-Sleeve-Pocket-Floral-Print.jpg'
            ],
            color: 'Darkblue',
            size: 'S',
            price: 70,
            quantity: 1,
            shipping: 'free',
        },
        {
            id: 1,
            name: 'mango people t-shirt',
            imgUrl: 'https://gloimg.rglcdn.com/rosegal/pdm-product-pic/Clothing/2017/05/13/source-img/20170513123033_67850.jpg',
            bigImgUrl: [
                'https://gloimg.rglcdn.com/rosegal/pdm-product-pic/Clothing/2017/05/13/source-img/20170513123033_67850.jpg',
                'https://i.pinimg.com/736x/e6/82/9b/e6829b055299f94ba3346577d24177cd.jpg',
                'https://gloimg.gamcdn.com/G/pdm-product-pic/Clothing/2017/03/15/source-img/20170315115856_39644.jpg',
                'https://gloimg.gamcdn.com/G/pdm-product-pic/Clothing/2017/04/12/source-img/20170412153829_36101.jpg'
            ],
            color: 'Red',
            size: 'Xl',
            price: 100,
            quantity: 1,
            shipping: 'free',
        },
        {
            id: 2,
            name: 'hawaiian people t-shirt',
            imgUrl: 'https://gloimg.drlcdn.com/L/pdm-product-pic/Clothing/2018/03/03/source-img/20180303103210_99769.jpg',
            bigImgUrl: [
                'https://gloimg.drlcdn.com/L/pdm-product-pic/Clothing/2018/03/03/source-img/20180303103210_99769.jpg',
                'https://cdn.shopify.com/s/files/1/2284/4267/products/H9s4rKDRaay62bUpxMpAHArGjHYCJh-front_1200x1200.png?v=1527385352',
                'https://m.media-amazon.com/images/I/A1Bz+SpGWVL._CLa%7C2140,2000%7C91dFRKgpr+L.png%7C0,0,2140,2000+666.0,470.0,805.0,965.0.png',
                'https://i.ebayimg.com/00/s/MTUwMFgxMzQ4/z/1UkAAOSwZjJU42n2/$_57.JPG?set_id=880000500F',
                'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/de0cfdb94597782ae63b8e7d117ed23b/56745343-75be-4083-96ee-e1f8f50efad1.jpg',
                'https://i.pinimg.com/736x/7e/44/07/7e44078981b1b469d4654fdb655f0cbb.jpg'
            ],
            color: 'Yellow',
            size: 'M',
            price: 130,
            quantity: 1,
            shipping: 'free',
        },
        {
            id: 3,
            name: 'caribbean people t-shirt',
            imgUrl: 'https://gloimg.gamcdn.com/G/pdm-product-pic/Clothing/2017/03/09/source-img/20170309144955_21883.jpg',
            bigImgUrl: [
                'https://gloimg.gamcdn.com/G/pdm-product-pic/Clothing/2017/03/09/source-img/20170309144955_21883.jpg',
                'https://gloimg.samcdn.com/S/pdm-product-pic/Clothing/2017/03/09/source-img/20170309143206_32533.jpg',
                'https://ae01.alicdn.com/kf/HTB1pxeyQHvpK1RjSZFqq6AXUVXau/XS-7XL-3d.jpg_q50.jpg',
                'https://sc01.alicdn.com/kf/He8397c480f754fe6b6b141b58f7d8a73N/Custom-t-shirt-printing-hawaii-no-minimum.jpg',
                'https://cdn.shopify.com/s/files/1/0013/6377/1428/products/kyal-331-blue_2048x.jpg?v=1536678879'
            ],
            color: 'Blue',
            size: 'S',
            price: 90,
            quantity: 1,
            shipping: 'free',
        }
    ],



    //формирование каталога в цикле по массиву товаров каталога
    draw() {
        let myCatalog = document.createElement('div');
        myCatalog.className = 'container catalog__wrapper';
        myCatalog.id = 'catalog';

        this.goods = this.goods.concat(cart.goods);//добавить в каталог еще и товары из корзины


        let html = '';
        let catalogLength = this.getGoodsQuantity();
        for (let i = 0; i < catalogLength; i++) {
            html += `<div class="catalog__good">
                <a href="#" class="catalog__productImgLink">
                    <img src="${this.goods[i].imgUrl}" data-show-photo-good-id="${this.goods[i].id}" data-show-photo-index="0" class="catalog__productImg">
                </a>
                <div class="catalog__productDetails">
                    <a href="#" class="catalog__productName">${this.goods[i].name}</a>
                    <p class="catalog__productColor">Color: <span class="catalog__productColor__value">${this.goods[i].color}</span></p>
                    <p class="catalog__productSize">Size: <span class="catalog__productSize__value">${this.goods[i].size}</span></p>
                    <p class="catalog__productPrice">${this.currency}${this.goods[i].price}</p>
                    
                    <a href="#" data-buy-good-id="${this.goods[i].id}" class="catalog__productBuy">Купить</a>
                </div>
            </div>`;
        }

        myCatalog.insertAdjacentHTML('afterBegin', html);
        document.querySelector('body').appendChild(myCatalog);
    },



    //кол-во товаров каталога
    getGoodsQuantity() {
        return this.goods.length;
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




    //обработчик события - добавить товар в корзину (и рендер корзины заново с итоговой суммой)
    addGood(event) {
        //data-buy-good-id="id"
        let id = +event.target.dataset.buyGoodId;
        if (!(id > 0)) return;

        let index = this.getGoodIndexById(id);
        if (index < 0) return;

        if (!this.alreadyInCart(id))  {
            cart.goods.push(this.goods[index]);

            cart.drawHeader(); //футер
            cart.drawBody(); //тело
            cart.drawFooter(); //футер
            cart.drawCartBrief(); //ссылка на корзину скол-вом товара и суммой

            this.showMessage('good_is_added');
        } else {
            this.showMessage('already_in_cart');
        }
    },



    //проверка - товар уже в корзине или нет
    alreadyInCart(id) {
        const index = +cart.getGoodIndexById(id);
        return index >= 0;
    },



    //вывод сообщений на 1 секунду
    showMessage(messageCode) {
        let message = null;
        let messageClass;
        switch (true) {
            case (messageCode === 'already_in_cart'):
                message = 'Товар уже в корзине';
                messageClass = 'warningMessage';
                break;
            case (messageCode === 'good_is_added'):
                message = 'Товар добавлен в корзину';
                messageClass = 'successMessage';
                break;
        }
        if (message === null) return;

        const html = `<div class="messageWrapper">
                        <div class="${messageClass}">${message}</div>
                      </div>`;
        document.querySelector('body').insertAdjacentHTML('beforeEnd', html);

        setTimeout(this.closeMessage, 700);
    },



    //закрытие сообщения
    closeMessage() {
        document.querySelector('.messageWrapper').remove();
    },



    //галерея фоток товара
    showGoodPhoto(event) {
        const goodId = +event.target.dataset.showPhotoGoodId;
        const goodIndex = this.getGoodIndexById(goodId);
        const photoIndex = +event.target.dataset.showPhotoIndex;
        if ((goodIndex < 0) || (photoIndex < 0)) return;

        //закрыть прежний контейнер с фоткой
        this.closeBigPhotoWrapper();

        //определить индекс следующего фото в массиве фоток товара
        const nextPhotoIndex = this.nextPhotoIndex(goodId, photoIndex);

        //формирование кнопок - следущее и предыдущее фото
        let arrowNext = '', arrowPrevious = '';
        if (nextPhotoIndex >= 0) arrowNext = `<div data-show-photo-good-id="${goodId}" data-show-photo-index="${nextPhotoIndex}" class="nextPhoto">&gt;</div>`;
        if (photoIndex > 0) arrowPrevious = `<div data-show-photo-good-id="${goodId}" data-show-photo-index="${photoIndex - 1}" class="previousPhoto">&lt;</div>`;

        //формирование и вывод контейнера с фоткой
        const html = `<div class="underBigPhotoWrapper">one moment please...</div>
                      <div class="bigPhotoWrapper">
                        <img src="${this.goods[goodIndex].bigImgUrl[photoIndex]}" data-show-photo-good-id="${goodId}" data-show-photo-index="${nextPhotoIndex}" class="bigPhoto">
                        <span class="closeBigPhotoWrapper"></span>
                        ${arrowNext}${arrowPrevious}
                      </div>`;

        document.querySelector('body').insertAdjacentHTML('beforeEnd', html);
    },



    //определение индекса следующего фото в массиве фоток товара
    nextPhotoIndex(id, photoIndex) {
        const goodIndex = this.getGoodIndexById(id);
        if (typeof this.goods[goodIndex].bigImgUrl[photoIndex + 1] === 'undefined')
            return -1;
        else
            return photoIndex + 1;
    },



    //закрыть (удалить) контейнер с фото
    closeBigPhotoWrapper() {
        const photoWrapper = document.querySelector('.bigPhotoWrapper');
        if (photoWrapper) photoWrapper.remove();
        const underPhotoWrapper = document.querySelector('.underBigPhotoWrapper');
        if (underPhotoWrapper) underPhotoWrapper.remove();
    },


};

catalog.draw();
//======================================</каталог>===============================================





//===================================<обработка событий>=========================================

const events = {

    //ловить события на всем документе
    listener() {
        let elem = document.querySelector('html'); //на всем документе

        elem.addEventListener('click', event => {
            event.preventDefault();
            this.clickHandler(event);
        });


        elem.addEventListener('keyup', event => {
            event.preventDefault();
            this.keyupHandler(event);
        });
    },






    //обработка события keyup на документе
    keyupHandler(event) {
        switch (true) {
            //изменение кол-ва товара
            case (+event.target.dataset.quantityInputId > 0):
                cart.editGoodQuantity(event);
                break;
            //ввод адреса
            case (event.target.className === "addressTextArea"):
                cart.saveAddressText();
                break;
            //ввод комментария
            case (event.target.className === "commentTextArea"):
                cart.saveCommentText();
                break;
        }
    },



    //обработка события click на документе
    clickHandler(event) {
        switch (true) {

            //удаление товара из корзины
            case (+event.target.dataset.deleteId > 0):
                cart.deleteGood(event);
                break;
            //кнопка Далее в блоках
            case (+event.target.dataset.nextStep > 0):
                cart.nextStep(+event.target.dataset.nextStep);
                break;
            //ссылка-сворачиватель корзины
            case (+event.target.dataset.showExtendedCart === 1):
                if (cart.isCartExtended()) { //в зависимости от состояния корзины, свернута-развернута, выполнить противоположное
                    cart.deleteCartHeader();
                    cart.deleteCartBody();
                    cart.deleteCartFooter();
                    cart.drawCartBrief();
                } else {
                    cart.draw();
                }
                break;
            //ссылка-сворачиватель блока Адрес
            case (+event.target.dataset.showExtendedAddress === 1):
                if (cart.isAddressExtended()) { //в зависимости от состояния блока, свернут-развернут, выполнить противоположное
                    cart.drawAddressBrief();
                } else {
                    cart.drawAddress();
                }
                break;
            //ссылка-сворачиватель блока Комментарий
            case (+event.target.dataset.showExtendedComment === 1):
                if (cart.isCommentExtended()) { //в зависимости от состояния блока, свернут-развернут, выполнить противоположное
                    cart.drawCommentBrief();
                } else {
                    cart.drawComment();
                }
                break;



            //по кнопке Купить добавить товар в корзину
            case (+event.target.dataset.buyGoodId > 0): //data-buy-good-id="id" (data-аттрибут кнопки Купить)
                catalog.addGood(event);
                break;
            //открыть просмотр фоток товара
            case (+event.target.dataset.showPhotoGoodId > 0): //data-show-photo-good-id="id" (data-аттрибут ссылки маленькой фотки товара)
                catalog.showGoodPhoto(event);
                break;
            //закрыть просмотр фоток товара
            case (event.target.className === 'bigPhotoWrapper'):
            case (event.target.className === 'underBigPhotoWrapper'):
            case (event.target.className === 'closeBigPhotoWrapper'):
                catalog.closeBigPhotoWrapper();
                break;
        }
    },



};


events.listener();
//===================================</обработка событий>=========================================




