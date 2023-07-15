<script>
import axios from 'axios';
import { state } from '../state';
import { store } from '../store'

export default {
    name: 'Cart',
    data() {
        return {
            store,
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
            const totalAmount = this.store.cart.reduce(
                (total, item) => total + parseFloat(item.price * item.count),
                0
            );
            return totalAmount.toFixed(2);
        },
    },
    methods: {
        addToCart(dishe) {
            const existingItem = this.store.cart.find((item) => item.id === dishe.id);
            if (existingItem) {
                existingItem.count++;
            } else {
                const newItem = { ...dishe, count: 1 };
                this.store.cart.push(newItem);
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
            const index = this.store.cart.findIndex((cartItem) => cartItem.id === dishe.id);
            if (index !== -1) {
                const currentItem = this.store.cart[index];

                if (currentItem.count > 1) {
                    currentItem.count--;
                } else {
                    this.store.cart.splice(index, 1);
                }
            }
            this.saveCartToLocalStorage();
        },
        clearCart() {
            this.store.cart = [];
            this.saveCartToLocalStorage();
        },
        loadCartFromLocalStorage() {
            const cartData = localStorage.getItem('cart');
            if (cartData) {
                this.store.cart = JSON.parse(cartData);
            }
        },
        saveCartToLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.store.cart));
        },
    },
};
</script>


<template>
    <div class="offcanvas offcanvas-end p-4" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header text-center p-4">
            <h2 class="offcanvas-title fw-bold text-center" id="offcanvasExampleLabel">Il tuo carrello</h2>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body px-4 py-0">
            <div class="container p-0">
                <div v-for=" item  in  store.cart " :key="item.id" class="list-unstyled">
                    <div class="row d-flex">
                        <div class="col-8">
                            <h3 class="m-0">{{ item.name }}</h3>
                            <p class="m-0">Prezzo: <span class="fw-bold">{{ item.price }}€</span></p>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-center">
                            <button @click="removeFromCart(item)" class="btn btn-less fw-bold">
                                -
                            </button>
                            <span class="mx-2 fw-bold">{{ item.count }}</span>
                            <button @click="addToCart(item)" class="btn btn-add fw-bold">
                                +
                            </button>
                        </div>
                    </div>
                    <hr class="my-3">
                </div>
            </div>
        </div>
        <div class="total-price px-4 py-3 text-end">
            <h3 class="m-0">Totale: {{ cartTotal }}€</h3>
        </div>
        <div class="pay d-flex align-items-center justify-content-center gap-2 p-4 pt-0">
            <button @click="clearCart" class="btn fw-bold">Svuota</button>
            <router-link to="/payment" class="btn fw-bold"> Procedi al pagamento </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../styles/general.scss" as *;

.offcanvas-header {
    border: 1px dashed #F2C802;
    border-bottom: 0;
    border-radius: 5px 5px 0 0;

    .btn-close {
        background-color: #F2C802;
        border-radius: 15px;

        &:hover {
            background-color: #FAA307;
        }
    }
}

.offcanvas-body::-webkit-scrollbar {
    background-color: transparent;
    border-radius: 10px;
    width: 8px;
}

.offcanvas-body::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
}

.offcanvas-body::-webkit-scrollbar-thumb {
    background-color: #F2C802;
    border-radius: 10px;

    &:hover {
        background-color: #FAA307;
    }
}

.offcanvas-body {
    border: 1px dashed #F2C802;
    border-top: 0;
    border-bottom: 0;
    // border-radius: 0 0 5px 5px;
    overflow-y: scroll;

    h3,
    p {
        word-wrap: break-word;
    }

    h3 {
        font-size: 1.3rem;
    }

    .btn-less {
        // padding: 2px 12px 3px;
        // background-color: #F2C802;
        // border: 1px solid #FAA307;
        // border-radius: 10px;
        // color: #03071E;
        --bs-btn-font-size: 0.8rem !important;
        padding: 5px 12px !important;
    }

    .btn-add {
        // padding: 2px 10px 3px;
        // background-color: #F2C802;
        // border: 1px solid #FAA307;
        // border-radius: 10px;
        // color: #03071E;
        --bs-btn-font-size: 0.8rem !important;
        padding: 5px 10px !important;
    }

    hr {
        border: 1px dashed #F2C802;
    }
}

.total-price {
    border: 1px dashed #F2C802;
    border-top: 0;
    border-bottom: 0;
    // border-radius: 0 0 5px 5px;
}

.pay {
    border: 1px dashed #F2C802;
    border-top: 0;
    border-radius: 0 0 5px 5px;
}

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