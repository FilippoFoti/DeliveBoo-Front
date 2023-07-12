<script>
import axios from 'axios';
import { state } from '../state';
export default {
    name: "restaurant_menu",
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
        this.getRestaurants(),
            this.selectedRestaurantId = parseInt(this.$route.params.id);
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
        getRestaurants() {
            axios
                .get("http://localhost:8000/api/restaurants")
                .then((resp) => {
                    this.restaurants = resp.data.results;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
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

                if (
                    this.selectedRestaurant &&
                    this.selectedRestaurant.id === dishe.restaurantId
                ) {
                    this.selectedRestaurant.dishes = this.selectedRestaurant.dishes.map(
                        (d) => {
                            if (d.id === dishe.id) {
                                return { ...d, count: currentItem.count };
                            }
                            return d;
                        }
                    );
                }
            }
            this.saveCartToLocalStorage();
        },
        clearCart() {
            this.cart = [];
            this.saveCartToLocalStorage();
        },
        loadCartFromLocalStorage() {
            const cartData = localStorage.getItem("cart");
            if (cartData) {
                this.cart = JSON.parse(cartData);
            }
        },
        saveCartToLocalStorage() {
            localStorage.setItem("cart", JSON.stringify(this.cart));
        },
        isSameRestaurantInCart(selectedRestaurantId) {
            return this.cart.every((item) => item.restaurant_id === this.selectedRestaurantId);
        }
    }

}
</script>

<template>
    <div class="container">
        <div v-for="restaurant in restaurants" :key="restaurant.id">
            <h3 id="ristorante" v-if="restaurant.id === selectedRestaurantId">Menu: {{ restaurant.name }}</h3>
            <div class="row row-cols-4">
                <div v-if="restaurant.id === selectedRestaurantId">
                    <div v-for="dishe in restaurant.dishes" :key="dishe.id" class="col mb-5">
                        <div v-if="dishe.visibility == 1">
                            <div class="card h-100">
                                <img :src="state.imagePath(dishe.image)" class="card-img-topx" alt="...">
                                <div class="card-body">
                                    <h4>{{ dishe.name }}</h4>
                                    <p>{{ dishe.description }}</p>
                                    <p>{{ dishe.price }} €</p>
                                    <button @click="addToCart(dishe)" class="btn btn-primary my-3"
                                        :disabled="!isSameRestaurantInCart(dishe.selectedRestaurantId)">Aggiungi al
                                        carrello</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div v-if="cart.length > 0" class="cart-container" id="cart">
            <h2>Carrello</h2>
            <div class="p-0">
                <h3 v-if="cart.length > 0">Totale: € {{ cartTotal }}</h3>
                <div v-for=" item  in  cart " :key="item.id" class="list-unstyled">
                    <div>
                        <h4>{{ item.name }}</h4>
                        <p>€ {{ item.price }}</p>
                        <div>
                            <button @click="removeFromCart(item)" class="btn btn-primary">
                                -
                            </button>
                            <span class="mx-2">{{ item.count }}</span>
                            <button @click="addToCart(item)" class="btn btn-primary">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button @click="clearCart" class="btn btn-primary my-2">Svuota</button>
                <router-link to="/payment" class="btn btn-primary"> Procedi al pagamento </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../styles/general.scss" as *;

#ristorante {
    padding-top: 100px;
}

.cart-container {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100vh;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 99;

    h2 {
        margin-top: 80px;
    }
}
</style>