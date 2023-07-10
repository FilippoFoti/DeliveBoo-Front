<script>
import axios from 'axios';
import { state } from '../state';

export default {
  data() {
    return {
      state,
      restaurants: [],
      types: [],
      selectedType: [],
      cart: [],
      selectedRestaurant: null,
      showRestaurantDetails: false,
      selectedRestaurantDetails: null,
    }
  },
  computed: {
    cartTotal() {
      const totalAmount = this.cart.reduce((total, item) => total + parseFloat(item.price * item.count), 0);
      return totalAmount.toFixed(2);
    },
  },

  mounted() {
    this.getRestaurants();
    this.getTypes();
    this.loadCartFromLocalStorage();
  },

  methods: {
    getTypes() {
      axios.get('http://localhost:8000/api/types')
        .then(resp => {
          this.types = resp.data.results;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getRestaurants() {
      const params = {};

      if (this.selectedType.length > 0 && this.selectedType.includes("all")) {
        params.type_id = [];
      } else {
        params.type_id = this.selectedType;
      }

      axios.get('http://localhost:8000/api/restaurants', { params })
        .then(resp => {
          this.restaurants = resp.data.results;
        })
        .catch(error => {
          console.error(error);
        });
    },
    showMenu(restaurantId) {
      const restaurant = this.restaurants.find(r => r.id === restaurantId);
      if (restaurant) {
        this.selectedRestaurant = restaurant;
        this.showRestaurantDetails = false;
        this.selectedRestaurantDetails = null;
      }
    },
    showDetails(restaurant) {
      this.selectedRestaurantDetails = restaurant;
      this.showRestaurantDetails = true;
    },
    hideMenu() {
      this.selectedRestaurant = null;
      this.showRestaurantDetails = false;
      this.selectedRestaurantDetails = null;
    },
    addToCart(dishe) {
      const existingItem = this.cart.find(item => item.id === dishe.id);
      if (existingItem) {
        existingItem.count++;
      } else {
        const newItem = { ...dishe, count: 1 };
        this.cart.push(newItem);
      }
      if (this.selectedRestaurant && this.selectedRestaurant.id === dishe.restaurantId) {
        this.selectedRestaurant.dishes = this.selectedRestaurant.dishes.map(d => {
          if (d.id === dishe.id) {
            return { ...d, count: existingItem ? existingItem.count : 1 };
          }
          return d;
        });
      }
      this.saveCartToLocalStorage()
    },
    removeFromCart(dishe) {
      const index = this.cart.findIndex(cartItem => cartItem.id === dishe.id);
      if (index !== -1) {
        const currentItem = this.cart[index];

        if (currentItem.count > 1) {
          currentItem.count--;
        } else {
          this.cart.splice(index, 1);
        }

        if (this.selectedRestaurant && this.selectedRestaurant.id === dishe.restaurantId) {
          this.selectedRestaurant.dishes = this.selectedRestaurant.dishes.map(d => {
            if (d.id === dishe.id) {
              return { ...d, count: currentItem.count };
            }
            return d;
          });
        }
      }
      this.saveCartToLocalStorage()
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
  <div class="container" :class="{ 'popup-open': selectedRestaurant || showRestaurantDetails }">
    <label>Tipi di ristoranti</label>
    <div class="d-flex gap-3">
      <div class="form-check" v-for="typeItem in types" :key="typeItem.id">
        <input type="checkbox" :id="'type_' + typeItem.id" :value="typeItem.id" v-model="selectedType"
          @change="getRestaurants" class="form-check-input" />
        <label :for="'type_' + typeItem.id" class="form-check-label">
          {{ typeItem.name }}
        </label>
      </div>
    </div>

    <h1>Lista ristoranti</h1>
    <div class="row row-cols-4">
      <div class="col mb-3" v-for="restaurant in restaurants" :key="restaurant.id">
        <div class="card">
          <h3>{{ restaurant.name }}</h3>
          <button @click="showMenu(restaurant.id)" class="btn btn-primary mb-2">Mostra menu</button>
          <button @click="showDetails(restaurant)" class="btn btn-primary">Dettagli</button>
        </div>
      </div>
    </div>

    <div v-if="selectedRestaurant">
      <div class="popup">
        <div class="popup-content p-5">
          <h2>{{ selectedRestaurant.name }} - Menu</h2>
          <ul class="px-0">
            <li v-for="dishe in selectedRestaurant.dishes" :key="dishe.id" class="list-unstyled">
              <div class="dishe-item">
                <div class="dishe-image">
                  <img class="mw-100" :src="state.imagePath(dishe.image)" alt="Dishe Image">
                </div>
                <div class="dishe-details">
                  <h4>{{ dishe.name }}</h4>
                  <p>{{ dishe.description }}</p>
                  <p>{{ dishe.price }}</p>
                  <div v-if="dishe.count > 0">
                    <button @click="removeFromCart(dishe)" class="btn btn-primary">-</button>
                    <span class="mx-2">{{ dishe.count }}</span>
                  </div>
                  <button @click="addToCart(dishe)" class="btn btn-primary">Aggiungi al carrello</button>
                </div>
              </div>
            </li>
          </ul>
          <button @click="hideMenu" class="btn btn-primary close-button">X</button>
        </div>
      </div>
    </div>



    <div v-if="showRestaurantDetails && selectedRestaurantDetails">
      <div class="popup">
        <div class="popup-content p-5">
          <h2>{{ selectedRestaurantDetails.name }} - Dettagli</h2>
          <img class="mw-100" :src="state.imagePath(selectedRestaurantDetails.image)" alt="Restaurant Image">
          <p>Indirizzo: {{ selectedRestaurantDetails.address }}</p>
          <p>Telefono: {{ selectedRestaurantDetails.phone }}</p>
          <p>P. Iva: {{ selectedRestaurantDetails.vat_number }}</p>
          <button @click="hideMenu" class="btn btn-primary close-button">X</button>
        </div>
      </div>
    </div>


    <div v-if="cart.length > 0">
      <h2>Carrello</h2>
      <ul class="p-0 d-flex gap-5">
        <li v-for="item in cart" :key="item.id" class="list-unstyled mb-2">
          <div>
            <h4>{{ item.name }}</h4>
            <p>€ {{ item.price }}</p>
            <div>
              <button @click="removeFromCart(item)" class="btn btn-primary">-</button>
              <span class="mx-2">{{ item.count }}</span>
              <button @click="addToCart(item)" class="btn btn-primary">+</button>
            </div>
          </div>
        </li>
      </ul>
      <div>
        <button @click="clearCart" class="btn btn-primary mb-2">Svuota</button>
      </div>
      <h3 v-if="cart.length > 0">Totale: € {{ cartTotal }}</h3>
    </div>


  </div>
</template>


<style lang="scss" scoped>
@use "../styles/general.scss" as *;

.container {
  padding-top: 80px;
}

.popup {
  position: fixed;
  background-color: lightblue;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  height: auto;
  max-height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-content {
  position: relative;
  border-radius: 5px;
  width: 500px;
  height: 400px;
  overflow-y: auto;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
