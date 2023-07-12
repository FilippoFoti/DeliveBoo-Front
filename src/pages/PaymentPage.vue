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
                placeholder: "cvv"
              },
              expirationDate: {
                selector: "#expiration-date",
                placeholder: "scadenza"
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
          // this.$router.push("/restaurants") per reindirizzare
        }).cath(err => {
          console.log(err);
        })
      }
    }
  }
};
</script>

<template>
  v.model
  <form>
    <div class="form-group">
      <label>Credit Card Number</label>
      <div id="credit-card-number" class="form-control"></div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-6">
          <label>Expire Date</label>
          <div id="expiration-date" class="form-control"></div>
        </div>
        <div class="col-6">
          <label>CVV</label>
          <div id="cvv" class="form-control"></div>
        </div>
      </div>
    </div>
  </form>
</template>
<style scoped lang="scss">
@use "../styles/general.scss" as *;

.form-group {
  padding-top: 300px;
}
</style>
