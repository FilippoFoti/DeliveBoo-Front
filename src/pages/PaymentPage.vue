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
      address: "",
      isNameValid: true,
      isSurnameValid: true,
      isEmailValid: true,
      isPhoneValid: true,
      isAddressValid: true,
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
    submitForm() {
      this.validateForm;

      if (this.validateForm()) {
        this.sendPayment();
      }
    },

    validateForm() {
      this.isNameValid = /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(this.name);
      this.isSurnameValid = /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(this.surname);
      this.isEmailValid = /\S+@\S+\.\S+/.test(this.email);
      this.isPhoneValid = /^\d{10}$/.test(this.phone);
      this.isAddressValid = this.address.trim() !== '';

      return (
        this.isNameValid &&
        this.isSurnameValid &&
        this.isEmailValid &&
        this.isPhoneValid &&
        this.isAddressValid
      );
    },

    getArray() {
      return JSON.parse(localStorage.getItem("cart") || []);
    },
    itemsForPay() {
      this.cartArray = this.getArray();
    },
    sendPayment() {
      if (this.hostedFieldsInstance) {
        this.hostedFieldsInstance.tokenize().then(payload => {
          axios.post('http://127.0.0.1:8000/api/make/payment', {
            cart: this.cartArray,
            token: payload.nonce,
            customer_name: this.name,
            customer_lastname: this.surname,
            email: this.email,
            phone: this.phone,
            address: this.address
          }).then(resp => {
            localStorage.clear();
            this.$router.push('/');
          })
        })
          .catch(err => {
            console.error(err);
          })
      }
    },
    calculateTotal() {
      let total = 0;
      for (const item of this.cartArray) {
        total += item.count * item.price;
      }
      return parseFloat(total.toFixed(2));
    },
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
        <input type="text" class="form-control" v-model="name" :class="{'is-invalid': !isNameValid}">
        <div v-if="!isNameValid" class="invalid-feedback">Inserisci un nome valido, senza numeri o caratteri speciali.</div>
      </div>
      <div class="mb-3">
        <label class="form-label">Cognome</label>
        <input type="text" class="form-control" v-model="surname" :class="{'is-invalid': !isSurnameValid}">
        <div v-if="!isSurnameValid" class="invalid-feedback">Inserisci un nome valido, senza numeri o caratteri speciali.</div>
      </div>
      <div class="mb-3">
        <label class="form-label">E-mail</label>
        <input type="email" class="form-control" v-model="email" :class="{'is-invalid': !isEmailValid}">
        <div v-if="!isEmailValid" class="invalid-feedback">Inserisci un'e-mail valida (example@domain.com).</div>
      </div>
      <div class="mb-3">
        <label class="form-label">Telefono cellulare</label>
        <input type="text" class="form-control" v-model="phone" :class="{'is-invalid': !isPhoneValid}" maxlength="10">
        <div v-if="!isPhoneValid" class="invalid-feedback">Inserisci un numero di telefono valido (10 cifre).</div>
      </div>
      <div class="mb-3">
        <label class="form-label">Indirizzo</label>
        <input type="text" class="form-control" v-model="address" :class="{'is-invalid': !isAddressValid}">
        <div v-if="!isAddressValid" class="invalid-feedback">Inserisci un indirizzo valido.</div>
      </div>


      <label class="form-label">Numero della carta</label>
      <div id="credit-card-number" class="form-control"></div>
      <label class="form-label mt-3">Data di scadenza</label>
      <div id="expiration-date" class="form-control"></div>
      <label class="form-label mt-3">CVV</label>
      <div id="cvv" class="form-control mb-3"></div>
      <button type="submit" class="btn btn-primary my-3" @click.prevent="submitForm()">Paga Ora</button>
    </form>
  </div>
</template>
<style scoped lang="scss">
@use "../styles/general.scss" as *;

.is-invalid {
  border-color: red;
}

.invalid-feedback {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
.cart {
  padding-top: 100px;
}

#credit-card-number,
#expiration-date,
#cvv {
  height: 38px;
}
</style>
