<script>
import axios from "axios";
import braintree from "braintree-web";
import { store } from '../store';
export default {
  data() {
    return {
      store,
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
      loading: false,
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
        this.loading = true;
        this.sendPayment().then(() => {
          this.loading = false;
        });
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
          axios.post('http://localhost:8000/api/make/payment', {
            cart: this.cartArray,
            token: payload.nonce,
            customer_name: this.name,
            customer_lastname: this.surname,
            email: this.email,
            phone: this.phone,
            address: this.address
          }).then(resp => {
            localStorage.clear();
            this.store.cart = [];
            this.$router.push({ path: '/', query: { payment_success: true } });
          });
        }).catch(err => {
          console.error(err);
        });
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
    <h1 class="text-center mb-4 fw-bold">Pagamento</h1>
    <div class="row">
      <div class="col-lg-8 col-md-12 col-sm-12 order-lg-1 order-md-2 order-sm-2">
        <div class="card p-4 shadow mb-5">
          <form class="p-4">
            <h2 class="fw-bold text-center mb-4">Inserisci i tuoi dati</h2>
            <div class="container">
              <div class="row row-cols-2">
                <div class="col">
                  <div class="mb-2">
                    <label class="form-label fw-bold">Nome</label>
                    <input type="text" class="form-control" v-model="name" :class="{ 'is-invalid': !isNameValid }">
                    <div v-if="!isNameValid" class="invalid-feedback">Inserisci un nome valido, senza numeri o caratteri
                      speciali.
                    </div>
                  </div>
                  <div class="mb-2">
                    <label class="form-label fw-bold">E-mail</label>
                    <input type="email" class="form-control" v-model="email" :class="{ 'is-invalid': !isEmailValid }">
                    <div v-if="!isEmailValid" class="invalid-feedback">Inserisci un'e-mail valida (example@domain.com).
                    </div>
                  </div>
                  <div class="mb-2">
                    <label class="form-label fw-bold">Indirizzo</label>
                    <input type="text" class="form-control" v-model="address" :class="{ 'is-invalid': !isAddressValid }">
                    <div v-if="!isAddressValid" class="invalid-feedback">Inserisci un indirizzo valido.</div>
                  </div>
                  <div class="mb-2">
                    <label class="form-label fw-bold">Data di scadenza</label>
                    <div id="expiration-date" class="form-control"></div>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-2">
                    <label class="form-label fw-bold">Cognome</label>
                    <input type="text" class="form-control" v-model="surname" :class="{ 'is-invalid': !isSurnameValid }">
                    <div v-if="!isSurnameValid" class="invalid-feedback">Inserisci un nome valido, senza numeri o
                      caratteri
                      speciali.</div>
                  </div>
                  <div class="mb-2">
                    <label class="form-label fw-bold">Telefono cellulare</label>
                    <input type="text" class="form-control" v-model="phone" :class="{ 'is-invalid': !isPhoneValid }"
                      maxlength="10">
                    <div v-if="!isPhoneValid" class="invalid-feedback">Inserisci un numero di telefono valido (10 cifre).
                    </div>
                  </div>
                  <div class="mb-2">
                    <label class="form-label fw-bold">Numero della carta</label>
                    <div id="credit-card-number" class="form-control"></div>
                  </div>
                  <div class="mb-2">
                    <label class="form-label fw-bold">CVV</label>
                    <div id="cvv" class="form-control mb-3"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-3">
              <button type="submit" class="btn fw-bold" @click.prevent="submitForm()" v-if="!loading">Paga Ora</button>
              <div class="loader" v-else></div>
            </div>
          </form>
        </div>
      </div>

      <div class="col-lg-4 col-md-12 col-sm-12 order-md-1 order-lg-2 order-md-1 order-sm-1">
        <div class="card p-4 shadow mb-5">
          <div class="card-body p-4">
            <h2 class="text-center fw-bold mb-4">Riepilogo ordine</h2>
            <ul v-for="item in cartArray" :key="item.id">
              <li>{{ item.name }}</li>
              <li class="unstyled">Quantità: <span class="fw-bold">x {{ item.count }}</span></li>
              <li class="unstyled">Prezzo: <span class="fw-bold">{{ item.count * item.price }}€</span></li>
            </ul>
            <h3 class="text-end mt-5">Prezzo totale: <span class="fw-bold tot">{{ calculateTotal() }}€</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "../styles/general.scss" as *;

.container {
  color: #03071E;
}

h1 {
  padding-top: 110px;
  color: #03071E;
}

.card {
  border: none;
  border-radius: 5px;

  form,
  .card-body {
    border: 1px dashed #F2C802;
    border-radius: 5px;

    h2 {
      font-size: 1.8rem;
      color: #03071E;
    }

    ul {
      color: #03071E;
    }

    .unstyled {
      list-style-type: none;
    }

    h3 {
      font-size: 1.3rem;
    }

    .tot {
      color: #FAA307;
    }

    input,
    #credit-card-number,
    #expiration-date,
    #cvv {
      border: none;
      border-radius: 5px;
      background-color: #F9FAFC;
      padding: 10px;
    }

    .form-control:focus {
      border: 2px solid #F2C802;
      border-color: #F2C802;
      box-shadow: none;
      color: #03071E;
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
  }
}


.is-invalid {
  border-color: red;
}

.invalid-feedback {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

#credit-card-number,
#expiration-date,
#cvv {
  height: 44px;
}

.loader {
  margin: 20px auto;
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #FAA307;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
