<script>
import axios from 'axios';
import { state } from '../state';
import { store } from '../store';
export default {
    name: "restaurant_menu",
    data() {
        return {
            store,
            // cart: [],
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
            const totalAmount = this.store.cart.reduce(
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
                this.selectedRestaurant.dishes = this.selectedRestaurant.dishes.map((d) => {
                    if (d.id === dishe.id) {
                        return { ...d, count: existingItem ? existingItem.count : 1 };
                    }
                    return d;
                });
            }

            this.saveCartToLocalStorage();
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
            this.store.cart = [];
            this.saveCartToLocalStorage();
        },
        loadCartFromLocalStorage() {
            const cartData = localStorage.getItem("cart");
            if (cartData) {
                this.store.cart = JSON.parse(cartData);
            }
        },
        saveCartToLocalStorage() {
            localStorage.setItem("cart", JSON.stringify(this.store.cart));
        },
        isSameRestaurantInCart(selectedRestaurantId) {
            return this.store.cart.every((item) => item.restaurant_id === this.selectedRestaurantId);
        },


        // SHORT DESCRIPTION
        shortDescription(description, maxLength) {
            if (description.length > maxLength) {
                return description.substring(0, maxLength) + '...';
            }
            return description;
        },
        toggleDescription(dishe) {
            if (!dishe.showFullDescription) {
                dishe.originalDescription = dishe.description;
                dishe.description = dishe.description + (dishe.hiddenDescription || '');
            } else {
                dishe.description = dishe.originalDescription;
            }
            dishe.showFullDescription = !dishe.showFullDescription;
        }
    }

}
</script>

<template>
    <div class="container mb-5">
        <div v-for="restaurant in restaurants" :key="restaurant.id">
            <h1 class="text-center mb-4" id="ristorante" v-if="restaurant.id === selectedRestaurantId">Menu: {{
                restaurant.name }}</h1>
            <div class="messaggio" v-if="!isSameRestaurantInCart(restaurant.id) && restaurant.id === selectedRestaurantId">
                <div class="text-center p-3 my-4">
                    <p class="m-0">Hai gia dei prodotti nel carrello, non puoi ordinare da più ristoranti.</p>
                </div>
            </div>
            <div class="row row-cols-sm-2 row-cols-md-3 row row-cols-lg-4" v-if="restaurant.id === selectedRestaurantId">
                <div class="col mb-4" v-for="dishe in restaurant.dishes" :key="dishe.id">
                    <div class="card h-100 shadow mb-2">
                        <figure class="m-0">
                            <img :src="state.imagePath(dishe.image)" class="card-image-top" alt="...">
                        </figure>
                        <div class="card-body text-center">
                            <h5 class="card-title fw-bold text-start">{{ dishe.name }}</h5>
                            <p class="m-0 text-start descrizione">
                                <span v-if="!dishe.showFullDescription">
                                    {{ shortDescription(dishe.description, 100) }}
                                    <a href="#" @click="toggleDescription(dishe)">Mostra di più</a>
                                </span>
                                <span v-else>
                                    {{ dishe.description }}
                                    <a href="#" @click="toggleDescription(dishe)">Mostra meno</a>
                                </span>
                            </p>

                            <p class="my-2 text-start"><span class="fw-bold">Prezzo: </span>{{ dishe.price }} €</p>

                            <button @click="addToCart(dishe)" class="btn fw-bold my-2"
                                :disabled="!isSameRestaurantInCart(dishe.selectedRestaurantId) || dishe.visibility === 0">
                                Aggiungi al carrello
                            </button>
                            <span v-if="dishe.visibility === 0" class="unavailable-text d-block p-1">
                                Spiacenti, prodotto non disponibile
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- <div v-if="cart.length > 0" class="cart-container" id="cart">
            <h2>Carrello</h2>
            <div class="p-0">
                <h3 v-if="cart.length > 0">Totale: € {{ cartTotal }}</h3>
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
        </div> -->
</template>

<style lang="scss" scoped>
@use "../styles/general.scss" as *;

.unavailable-text {
    color: red;
}

.messaggio {
    border-radius: 5px;
    background-color: #F2C802;
}

#ristorante {
    padding-top: 110px;
    font-size: 2.5rem;
    color: #03071E;
    font-weight: bold;

}

.descrizione::-webkit-scrollbar {
    background-color: transparent;
    border-radius: 10px;
    width: 8px;
}

.descrizione::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
}

.descrizione::-webkit-scrollbar-thumb {
    background-color: #F2C802;
    border-radius: 10px;

    &:hover {
        background-color: #FAA307;
    }
}

.descrizione {
    overflow-y: scroll;
    height: 100px;
}

.card {

    figure {
        width: 100%;
        height: 200px;

        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: 10px;
        }
    }
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

// RESPONSIVE LG---------------------------------------------------------------------------------

@media screen and (max-width: 1199px) {
    .card {

        figure {
            display: flex;
            align-items: center;
            justify-content: flex-end;

            img {
                height: 80%;
                width: 100%;
            }
        }

        h5 {
            font-size: 1rem;
        }

        p {
            font-size: 0.9rem;
        }
    }

    .btn {
        padding: 4px 8px;
    }
}

// RESPONSIVE TABLET---------------------------------------------------------------------------------


// RESPONSIVE CELL ---------------------------------------------------------------------------------
</style>