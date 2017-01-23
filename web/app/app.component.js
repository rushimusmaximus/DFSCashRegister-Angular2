System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var AppComponent, SALES_TAX_RATE, Item, ITEMS, CartItem, Cart;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.cart = new Cart();
                    this.items = ITEMS;
                    this.salesTaxRate = SALES_TAX_RATE;
                }
                AppComponent.prototype.editCartItemQuantity = function (cartItem) {
                    this.selectedCartItem = cartItem;
                };
                AppComponent.prototype.closeEditCartItemQuantity = function () {
                    this.selectedCartItem = null;
                };
                AppComponent = __decorate([
                    core_1.Component({
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
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
            SALES_TAX_RATE = .072;
            Item = (function () {
                function Item(id, price) {
                    this.id = id;
                    this.price = price;
                }
                return Item;
            }());
            ITEMS = [
                new Item("Cabbage", 1.29),
                new Item("Chuckit", 7.82),
                new Item("Ammo", .20),
                new Item("DVD", 14.77),
                new Item("Pants", 34.73),
                new Item("Drill", 28.96)
            ];
            CartItem = (function () {
                function CartItem(item, quantity) {
                    this.item = item;
                    this.quantity = quantity;
                }
                CartItem.prototype.getCost = function () {
                    return (this.item.price * this.quantity); //.format()
                };
                return CartItem;
            }());
            Cart = (function () {
                function Cart() {
                    this.items = [];
                }
                Cart.prototype.isEmpty = function () {
                    return this.items.length == 0;
                };
                Cart.prototype.isNotEmpty = function () {
                    return this.items.length > 0;
                };
                Cart.prototype.empty = function () {
                    this.items = [];
                };
                Cart.prototype.incrementItem = function (item) {
                    var cartItem = this.getItemInCart(item);
                    if (cartItem != null) {
                        cartItem.quantity++;
                    }
                    else {
                        this.addItem(item, 1);
                    }
                };
                Cart.prototype.setItemQuantity = function (item, quantity) {
                    var cartItem = this.getItemInCart(item);
                    if (cartItem != null) {
                        cartItem.quantity = quantity;
                    }
                    else {
                        this.addItem(item, quantity);
                    }
                };
                Cart.prototype.removeItem = function (itemToRemove) {
                    this.items = this.items.filter(function (cartItem) {
                        return cartItem.item.id != itemToRemove.item.id;
                    });
                };
                Cart.prototype.getSubtotal = function () {
                    return this.items.reduce(function (a, b) { return a + b.getCost(); }, 0);
                };
                Cart.prototype.getTax = function () {
                    return this.getSubtotal() * SALES_TAX_RATE;
                };
                Cart.prototype.getTotal = function () {
                    return this.getSubtotal() + this.getTax();
                };
                Cart.prototype.addItem = function (item, quantity) {
                    this.items.push(new CartItem(item, quantity));
                };
                Cart.prototype.getItemInCart = function (item) {
                    var index = this.items.findIndex(function (cartItem) {
                        if (cartItem == null)
                            return false;
                        return item.id === cartItem.item.id;
                    });
                    if (index >= 0)
                        return this.items[index];
                };
                return Cart;
            }());
        }
    }
});
//# sourceMappingURL=app.component.js.map