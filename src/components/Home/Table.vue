<template>
  <b-card>
    <div slot="header" v-html="caption"></div>
    <b-table
      :dark="dark"
      :hover="hover"
      :striped="striped"
      :bordered="bordered"
      :small="small"
      :fixed="fixed"
      responsive="sm"
      :items="items"
      :fields="captions"
      :current-page="currentPage"
      :per-page="perPage"
      @row-clicked="rowClicked"
    >
      <template slot="View" slot-scope="data">
        <!-- <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge> -->

        <b-button size="sm" class="mr-2" @click="statusFn(data.item)">View</b-button>
      </template>
    </b-table>
    <nav>
      <b-pagination
        :total-rows="totalRows"
        :per-page="perPage"
        v-model="currentPage"
        prev-text="Prev"
        next-text="Next"
        hide-goto-end-buttons
      />
    </nav>
    <b-modal title="Details" size="lg" hide-footer v-model="largeModal">
      <b-row>
        <b-col lg="2">ID</b-col>
        <b-col lg="3">Tablet Name</b-col>
        <b-col lg="3">Time</b-col>
        <b-col lg="2">Duration</b-col>
        <b-col lg="2">Available</b-col>
      </b-row>

      <template v-for="(item,index) in tablets">
        <b-row :key="index">
          <b-col lg="2">{{item.id}}</b-col>
          <b-col lg="3">{{item.tablet_name}}</b-col>
          <b-col lg="3">{{item.time}}</b-col>
          <b-col lg="2">{{item.duration}}</b-col>
          <b-col lg="2">
            <input type="checkbox" v-model="item.isAvailable" />
          </b-col>
        </b-row>
      </template>
      <b-button class="mt-3" block @click="applyFn">Apply</b-button>
    </b-modal>
  </b-card>
</template>

<script>
import homeService from "../../services/home";
import messageHandler from "../../handler/messageHandler";
export default {
  name: "c-table",
  inheritAttrs: false,

  props: {
    caption: {
      type: String,
      default: "Table"
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: [Array, Function],
      default: () => []
    },
    fields: {
      type: [Array, Object],
      default: () => []
    },
    perPage: {
      type: Number,
      default: 5
    },
    dark: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      currentPage: 1,
      largeModal: false,
      selectedItem: [],
      tablets: [],
      selected: []
    };
  },
  computed: {
    items: function() {
      const items = this.tableData;
      return Array.isArray(items) ? items : items();
    },
    totalRows: function() {
      return this.getRowCount();
    },
    captions: function() {
      return this.fields;
    },
    user() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    statusFn(item) {
      console.log(item);
      this.selectedItem = item;
      if (item.View == "View") {
        this.getTablets();
        this.largeModal = true;
      }
    },
    getRowCount: function() {
      return this.items.length;
    },
    rowClicked(item) {
      this.$emit("row-clicked", item);
    },
    getTablets() {
      this.$store.dispatch("setLoading", true)
      let obj = {
        prescriptionId: this.selectedItem.id
      };
      homeService
        .getTablets(obj)
        .then(res => {
          if (res.data.status == 200) {
            console.log("success");
            this.$store.dispatch("setLoading", false)
            this.tablets = res.data.details;
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
    },
    applyFn() {
      
      
      console.log(this.tablets);
      let tArray = this.tablets.filter(function(val) {
        return val.isAvailable == true;
      });

      if (tArray.length > 0) {
        this.$store.dispatch("setLoading", true)
        let obj = {
          tablets: tArray,
          prescriptionId: this.selectedItem.id,
          pharmacyId: this.user.id,
          userId: this.selectedItem.user_id
        };
        console.log(obj);
        homeService
          .updateTablets(obj)
          .then(res => {
            if (res.data.status == 200) {
              console.log("success");
              this.$store.dispatch("setLoading", false)
              this.largeModal = false;
              this.$store.dispatch("getPrescription")
            } else {
              this.largeModal = false;
              messageHandler.errorMessage("Failed", res.data.message);
            }
          })
          .catch(error => {
            this.largeModal = false;
            this.$store.dispatch("setLoading", false)
            console.log(error);
            messageHandler.networkError();
          });
      } else {
        console.log("required")
        messageHandler.errorMessage("faild", "Atleast select one item")
      }
    }
  }
};
</script>
