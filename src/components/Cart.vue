<script>
import axios from 'axios';
import { state } from '../state';

export default {
    name: 'Cart',
    data() {
        return {
            cart: [],
            state,
            restaurants: [],
            dishes: [],
            selectedRestaurantId: null,
        }
    },
    mounted() {
        this.loadCartFromLocalStorage();
    },
    computed: {
        cartTotal() {
            const totalAmount = this.cart.reduce(
                (total, item) => total + parseFloat(item.price * item.count),
                0
            );
            return totalAmount.toFixed(2);
        },
    },
    methods: {
        addToCart(dishe) {
            const existingItem = this.cart.find((item) => item.id === dishe.id);
            if (existingItem) {
                existingItem.count++;
            } else {
                const newItem = { ...dishe, count: 1 };
                this.cart.push(newItem);
            }
            if (
                this.selectedRestaurant &&
                this.selectedRestaurant.id === dishe.restaurantId
            ) {
                this.selectedRestaurant.dishes = this.selectedRestaurant.dishes.map(
                    (d) => {
                        if (d.id === dishe.id) {
                            return { ...d, count: existingItem ? existingItem.count : 1 };
                        }
                        return d;
                    }
                );
            }
            this.saveCartToLocalStorage();
            this.$emit('cart-item-added', item);
        },
        removeFromCart(dishe) {
            const index = this.cart.findIndex((cartItem) => cartItem.id === dishe.id);
            if (index !== -1) {
                const currentItem = this.cart[index];

                if (currentItem.count > 1) {
                    currentItem.count--;
                } else {
                    this.cart.splice(index, 1);
                }
            }
            this.saveCartToLocalStorage();
        },
        clearCart() {
            this.cart = [];
            this.saveCartToLocalStorage();
        },
        loadCartFromLocalStorage() {
            const cartData = localStorage.getItem('cart');
            if (cartData) {
                this.cart = JSON.parse(cartData);
            }
        },
        saveCartToLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
    },
};
</script>


<template>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">carrello</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="p-0">
                <h3>Totale: € {{ cartTotal }}</h3>
                <div v-for=" item  in  cart " :key="item.id" class="list-unstyled">
                    <div>
                        <h4>{{ item.name }}</h4>
                        <p>€ {{ item.price }}</p>
                        <div>
                            <button @click="removeFromCart(item)" class="btn">
                                -
                            </button>
                            <span class="mx-2">{{ item.count }}</span>
                            <button @click="addToCart(item)" class="btn">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button @click="clearCart" class="btn my-2">Svuota</button>
                <router-link to="/payment" class="btn"> Procedi al pagamento </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../styles/general.scss" as *;

.btn {
    padding: 5px 10px;
    background-color: #F2C802;
    border: 1px solid #FAA307;
    border-radius: 10px;
    color: #03071E;

    &:hover {
        background-color: #FAA307;
        transform: scale(1.1);
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
    }

}
</style>