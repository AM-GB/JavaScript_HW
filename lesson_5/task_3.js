'use strict';

const Basket = {
    containerElement: null,
    pEl: null,


    init() {
        this.containerElement = document.getElementById('basket');
        this.pEl = document.createElement('p');
        this.containerElement.appendChild(this.pEl)
    },

    goods: [
        {
            id_product: 123,
            product_name: "Ноутбук",
            firm: 'asus',
            price: 1000,
            currency: '$',
            quantity: 1
        },
        {
            id_product: 425,
            product_name: "Ноутбук",
            firm: 'HP',
            price: 1500,
            currency: '$',
            quantity: 2
        },
    ],

    countBasketPrice() {
        let sum = 0;
        for (let key in this.goods) {
            sum += this.goods[key].price * this.goods[key].quantity;
        }
        return sum
    },

    countQuantity() {
        let q = 0;
        for (let key in this.goods) {
            q += this.goods[key].quantity;
        }
        return q;
    },

    displayingInformBasket() {
        this.init();
        const sum = this.countBasketPrice();
        const q = this.countQuantity();
        
        if (this.goods.length > 0) {
            this.pEl.innerHTML = 
                `В корзине: ${q} товаров на сумму ${sum} ${this.goods[0].currency}`;
        }
        else this.pEl.innerHTML = `Корзина пуста`;
            
    }
};

Basket.displayingInformBasket();