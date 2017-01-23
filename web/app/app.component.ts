import {Component} from 'angular2/core';
@Component({
    selector: 'cash-register',
    templateUrl: 'app/cash_register.html',
    styles: [
        'button .additem, input[type=button]',
        '.additem { margin-right: 10px; }',
        '#items-table-body td {line-height: 32px}',
        '.itemQuantity {padding-right: 10px}',
        'h3 { display: inline-block; margin-bottom: 14px }',
        '.column { width: 48%; margin-left: 20px; float: left; }'
    ]
})

export class AppComponent {
    public cart = new Cart();
    public selectedCartItem : CartItem;
    public items = ITEMS;
    public salesTaxRate = SALES_TAX_RATE;

    editCartItemQuantity(cartItem: CartItem){
        this.selectedCartItem = cartItem;
    }

    closeEditCartItemQuantity(){
        this.selectedCartItem = null;
    }
}

var SALES_TAX_RATE : number  = .072;

class Item {
    id: string;
    price: number;
    constructor(id: string, price: number){
        this.id = id;
        this.price=price;
    }
}

var ITEMS : Item[] = [
    new Item("Cabbage", 1.29),
    new Item ("Chuckit", 7.82),
    new Item("Ammo", .20),
    new Item("DVD", 14.77),
    new Item("Pants", 34.73),
    new Item("Drill", 28.96)
];

class CartItem {
    item: Item;
    quantity: number;
    constructor(item: Item, quantity: number){
        this.item = item;
        this.quantity = quantity;
    }
    getCost() : number {
        return (this.item.price * this.quantity); //.format()
    }
}

class Cart {
    items : CartItem[] = [];

    isEmpty() : boolean {
        return this.items.length == 0;
    }

    isNotEmpty() : boolean {
        return this.items.length > 0;
    }

    empty(){
        this.items = []
    }

    incrementItem(item: Item) {
        var cartItem = this.getItemInCart(item);
        if (cartItem != null){
            cartItem.quantity++
        } else {
            this.addItem(item, 1);
        }
    }

    setItemQuantity(item: Item, quantity: number){
        var cartItem = this.getItemInCart(item);
        if (cartItem != null){
            cartItem.quantity = quantity;
        } else {
            this.addItem(item, quantity);
        }
    }

    removeItem(itemToRemove: CartItem){
        this.items = this.items.filter(cartItem => {
            return cartItem.item.id != itemToRemove.item.id
        })
    }

    getSubtotal(): number {
        return this.items.reduce(function(a, b) { return a + b.getCost() }, 0);
    }

    getTax() : number {
        return this.getSubtotal() * SALES_TAX_RATE;
    }

    getTotal() : number {
        return this.getSubtotal() + this.getTax();
    }

    private addItem(item: Item, quantity: number){
        this.items.push(new CartItem(item, quantity));
    }

    private getItemInCart(item: Item) : CartItem {
        var index = this.items.findIndex(cartItem => {
            if (cartItem == null) return false;
            return item.id === cartItem.item.id
        });
        if (index >=0 ) return this.items[index]
    }
}
