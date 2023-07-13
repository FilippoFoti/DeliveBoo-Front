<script>
import axios from "axios";
import braintree from "braintree-web";
export default {
  data() {
    return {
      clientToken: [],
      cartArray: [],
      hostedFieldsInstance: false,
      name: "",
      surname: "",
      email: "",
      phone: "",
      address: ""
    };
  },

  mounted() {
    this.itemsForPay();
    axios.get("http://localhost:8000/api/generate/token").then((resp) => {
      this.clientToken = resp.data.token;
      console.log(this.clientToken);
    }).then(
      () => {
        braintree.client.create({
          authorization: this.clientToken
        }).then(clientInstance => {
          let options = {
            client: clientInstance,
            styles: {
              input: {
                "font-size": "14px",
                "font-family": "Open Sans"
              }
            },
            fields: {
              number: {
                selector: "#credit-card-number",
                placeholder: "4XXX XXXX XXXX XXXX"
              },
              cvv: {
                selector: "#cvv",
                placeholder: "123"
              },
              expirationDate: {
                selector: "#expiration-date",
                placeholder: "XX/XX"
              }
            }
          }
          return braintree.hostedFields.create(options)
        }).then(hostedFieldsInstance => { this.hostedFieldsInstance = hostedFieldsInstance })
          .catch(err => {
            console.log(err)
          });
      },
    )
  },
  methods: {
    getArray() {
      return JSON.parse(localStorage.getItem("cart")) || [];
    },
    itemsForPay() {
      this.cartArray = this.getArray();
    },
    sendPayment() {
      if (this.hostedFieldsInstance) {
        this.hostedFieldsInstance.tokenize().then(payload => {
          axios.post('http://127.0.0.1:8000/api/make/payment'), {
            cart: this.cartArray,
            token: payload.nonce,
            customer_name: this.name,
            customer_surname: this.surname,
            email: this.email,
            phone: this.phone,
            address: this.address
          }
        }).then(resp => {
          localStorage.clear()
          this.$router.push("/")
        }).cath(err => {
          console.log(err);
        })
      }
    },
    calculateTotal() {
      let total = 0;
      for (const item of this.cartArray) {
        total += item.count * item.price;
      }
      return parseFloat(total.toFixed(2));
    }
  }
};
</script>

<template>
  <div class="container">
    <h3 class="cart">Il tuo carrello</h3>
    <ul>
      <li v-for="item in cartArray" :key="item.id">
        {{ item.name }} x {{ item.count }} - {{ item.count * item.price }} €
      </li>
    </ul>
    <h5>Totale: {{ calculateTotal() }} €</h5>
    <form>
      <h3>Inserisci i tuoi dati</h3>
      <div class="mb-3">
        <label class="form-label">Nome</label>
        <input type="text" class="form-control" v-model="name">
      </div>
      <div class="mb-3">
        <label class="form-label">Cognome</label>
        <input type="text" class="form-control" v-model="surname">
      </div>
      <div class="mb-3">
        <label class="form-label">E-mail</label>
        <input type="email" class="form-control" v-model="email">
      </div>
      <div class="mb-3">
        <label class="form-label">Telefono cellulare</label>
        <input type="text" class="form-control" v-model="phone">
      </div>
      <div class="mb-3">
        <label class="form-label">Indirizzo</label>
        <input type="text" class="form-control" v-model="address">
      </div>


      <label class="form-label">Numero della carta</label>
      <div id="credit-card-number" class="form-control"></div>
      <label class="form-label mt-3">Data di scadenza</label>
      <div id="expiration-date" class="form-control"></div>
      <label class="form-label mt-3">CVV</label>
      <div id="cvv" class="form-control mb-3"></div>
      <button type="submit" class="btn btn-primary my-3" @click="sendPayment()">Paga Ora</button>
    </form>
  </div>
</template>
<style scoped lang="scss">
@use "../styles/general.scss" as *;

.cart {
  padding-top: 100px;
}

#credit-card-number,
#expiration-date,
#cvv {
  height: 38px;
}
</style>
