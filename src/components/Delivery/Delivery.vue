<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-card header-tag="header" footer-tag="footer">
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
              caption="<i class='fa fa-align-justify'></i> Deliver Medicines"
            ></c-table>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>
import cTable from "./Table";

export default {
  name: "navs",
  components: {cTable},
 data: () => {
    return {
      isActive: false,
      fields: []
    };
  },
  mounted() {
    this.initFn();
  },
  computed:{
    user(){
      return this.$store.getters.getUser
    },
    items(){
      return this.$store.getters.getPrescription
    },
    itemsArray(){
      return this.$store.getters.getPrescription
    }
  },
  methods: {
    initFn() {
      let obj = {
        "pharmacyId": this.user.id
      }
      this.$store.dispatch("getPrescriptionForDeliver",obj)
    }
  }
};
</script>

