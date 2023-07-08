<script>
import axios from 'axios';

export default {
  data() {
    return {
      restaurants: [],
      types: [],
      selectedType: [],
      selectedRestaurant: null,
    }
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
      }
    },
    hideMenu() {
      this.selectedRestaurant = null;
    },
  },
};
</script>

<template>
  <div class="container" :class="{ 'popup-open': selectedRestaurant }">
    <label>Tipi di ristoranti</label>
    <div class="form-check" v-for="typeItem in types" :key="typeItem.id">
      <input type="checkbox" :id="'type_' + typeItem.id" :value="typeItem.id" v-model="selectedType"
        @change="getRestaurants" class="form-check-input" />
      <label :for="'type_' + typeItem.id" class="form-check-label">
        {{ typeItem.name }}
      </label>
    </div>

    <h1>Lista ristoranti</h1>
    <div class="row row-cols-4">
      <div class="col" v-for="restaurant in restaurants" :key="restaurant.id">
        <div class="card">
          <h3>{{ restaurant.name }}</h3>
          <button @click="showMenu(restaurant.id)" class="btn btn-primary">Mostra menu</button>
        </div>
      </div>
    </div>

    <div v-if="selectedRestaurant">
      <div class="popup">
        <div class="popup-content p-5">
          <h2>{{ selectedRestaurant.name }} - Menu</h2>
          <ul class="px-0">
            <li v-for="dish in selectedRestaurant.dishes" :key="dish.id" class="list-unstyled">
              <div class="dish-item">
                <!-- <div class="dish-image">
                  <img class="w-20" :src="dish.image" alt="Dish Image">
                </div> -->
                <div class="dish-details">
                  <h4>{{ dish.name }}</h4>
                  <p>{{ dish.description }}</p>
                  <p>{{ dish.price }}</p>
                </div>
              </div>
            </li>
          </ul>
          <button @click="hideMenu" class="btn btn-primary close-button">X</button>
        </div>
      </div>
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

  // width: 500px;
  // height: 100px;
  /* Aggiungi una larghezza massima opzionale per limitare la larghezza del popup */
  height: auto;
  max-height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  /* Aggiungi un indice di profondità per posizionare il popup sopra gli altri elementi */
}

.popup-content {
  position: relative;
  /* Aggiungi questa proprietà per consentire il posizionamento relativo al contenitore */
  border-radius: 5px;
  width: 500px;
  height: 400px;
  overflow-y: auto;
}

.close-button {
  position: absolute;
  /* Posizionamento assoluto all'interno del contenitore */
  top: 10px;
  /* Distanza dal bordo superiore */
  right: 10px;
  /* Distanza dal bordo destro */
}
</style>
