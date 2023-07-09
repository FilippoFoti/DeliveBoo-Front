<script>
import axios from 'axios';

export default {
  data() {
    return {
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
      const totalPrice = this.cart.reduce((total, item) => total + parseFloat(item.price), 0);
      return totalPrice.toFixed(2);
    },
  },
  mounted() {
    this.getRestaurants();
    this.getTypes();
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
      this.cart.push(dishe);
    },
    removeFromCart(dishe) {
      const index = this.cart.indexOf(dishe);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
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
          <button @click="showMenu(restaurant.id)" class="btn btn-primary">Mostra menu</button>
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
                  <img class="mw-100" :src="dishe.image" alt="Dishe Image">
                </div>
                <div class="dishe-details">
                  <h4>{{ dishe.name }}</h4>
                  <p>{{ dishe.description }}</p>
                  <p>{{ dishe.price }}</p>
                  <button @click="addToCart(dishe)" class="btn btn-primary">+</button>
                  <button @click="removeFromCart(dishe)" class="btn btn-primary">-</button>
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
          <img class="mw-100" :src="selectedRestaurantDetails.image" alt="Restaurant Image">
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
            <button @click="removeFromCart(item)" class="btn btn-primary">Rimuovi</button>
          </div>
        </li>
      </ul>
      <h3 v-if="cart.length > 0">Totale: € {{ cartTotal }}</h3>
    </div>

  </div>
</template>


<style lang="scss">
@use "../styles/general.scss" as *;

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
