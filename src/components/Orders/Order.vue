<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-card>
        <div slot="header">
          <i class="fa fa-align-justify"></i>
          <strong></strong>
          <small></small>
        </div>

        <b-row>
          <b-col lg="12">
            <c-table
              :table-data="items"
              striped
              caption="<i class='fa fa-align-justify'></i> Past Orders"
            ></c-table>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>
import { shuffleArray } from "@/shared/utils";
import cTable from "./Table";
import orderService from '../../services/order.service'
import messageHandler from "../../handler/messageHandler";

export default {
  name: "navs",
  components: { cTable },
  data: () => {
    return {
      isActive: false,
      items: [],
      itemsArray: [],
      fields: []
    };
  },
  mounted() {
    this.initFn();
  },
  computed:{
    user(){
      return this.$store.getters.getUser
    }
  },
  methods: {
    initFn() {
      this.$store.dispatch("setLoading", true)
      let obj = {
        "pharmacyId": this.user.id
      }
      orderService
        .getDeliveredOrder(obj)
        .then(res => {
          if (res.data.status == 200) {
            console.log("success");
            this.$store.dispatch("setLoading", false)
            console.log(res);
            this.items = shuffleArray(res.data.details);
            this.itemsArray = shuffleArray(res.data.details);
            console.log(this.itemsArray);
          } else {
            this.$store.dispatch("setLoading", false)
            messageHandler.errorMessage("Failed", res.data.message);
          }
        })
        .catch(error => {
          this.$store.dispatch("setLoading", false)
          console.log(error);
          messageHandler.networkError();
        });
    }
  }
};
</script>

