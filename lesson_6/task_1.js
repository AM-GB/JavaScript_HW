const cartItem = {
    render(good) {
        return `<div class="good">
                    <div><b>Наименование</b>: ${good.product_name}</div>
                    <div><b>Цена за шт.</b>: ${good.price}</div>
                    <div><b>Количество</b>: ${good.quantity}</div>
                    <div><b>Стоимость</b>: ${good.quantity * good.price}</div>
                    <button data-good='${good.id_product}'>Добавить в корзину</button>
                </div>`;
    }
};

const cart = {
    cartListBlock: null,
    cartButtonAdd: null,
    cartButtonBasket: null,
    cartButtonCatalog: null,
    cartItem,
    goods: [
        {
            id_product: 123,
            product_name: 'Ноутбук',
            price: 45600,
            quantity: 1,
        },
        {
            id_product: 456,
            product_name: 'Мышка',
            price: 1000,
            quantity: 2,
        },
        {
            id_product: 305,
            product_name: 'Клавиатура',
            price: 2000,
            quantity: 1,
        },
    ],
    goodBasket: [],
    init() {
        this.cartListBlock = document.querySelector('.cart-list');
        this.cartButtonAdd = document.querySelector('.cart-btn');
        this.cartButtonBasket = document.querySelector('.cart-btn2');
        this.cartButtonCatalog = document.querySelector('.cart-btn3');
        this.cartButtonAdd.addEventListener('click', this.clearCart.bind(this));
        this.cartButtonBasket.addEventListener('click', this.displayBasket.bind(this));
        this.cartButtonCatalog.addEventListener('click', this.displayCart.bind(this));
        // this.cartButton.addEventListener('click', () => this.clearCart());

        this.render(this.goods);
        document.querySelector('.cart-list')
            .addEventListener('click', event => {
                this.containerClickHandler(event)});
    },
    render(goods) {
        if (goods.length) {
            this.cartListBlock.textContent = '';
            goods.forEach(good => {
                this.cartListBlock.insertAdjacentHTML('beforeend', this.cartItem.render(good));
            });
            this.cartListBlock.insertAdjacentHTML('beforeend', `В корзине ${this.goodBasket.length} позиций(а) стоимостью ${this.getCartPrice()}`);
        } else {
            this.cartListBlock.textContent = 'Корзина пуста';
        }
    },
    getCartPrice() {
        return this.goodBasket.reduce(function (price, good) {
            return price + good.price * good.quantity;
        }, 0);
    },
    clearCart() {
        this.goodBasket = [];
        this.render(this.goodBasket);
    },
    displayCart() {
        this.render(this.goods);
    },
    displayBasket() {
        this.render(this.goodBasket);
    },
    containerClickHandler(event) {
        if (event.target.tagName == 'BUTTON') {
            this.addBasketGood(event);
        }
        // this.openImage(event.target.dataset.full_image_url);
        // console.log(event.target.dataset.good);
        // console.log(event.target.tagName);
    },
    addBasketGood(event){
        for (let key in this.goodBasket){
            // console.log(key)
            if (this.goodBasket[key].id_product == event.target.dataset.good) return;
        }
        for (let key in this.goods){
            if (this.goods[key].id_product == event.target.dataset.good){
                this.goodBasket.push(this.goods[key]);
                // console.log(this.goodBasket)
            }
        }
        this.render(this.goods)
    }
};

cart.init();
