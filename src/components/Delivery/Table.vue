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
      <template slot="Status" slot-scope="data">
        <b-button size="sm" class="mr-2" @click="openQR(data.item)">{{data.item.Status}}</b-button>
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
    <b-modal title="Scan QR" hide-footer v-model="largeModal" @ok="largeModal = false">
      <p class="error">{{ error }}</p>

      <p class="decode-result">
        Last result:
        <b>{{ result }}</b>
      </p>

      <qrcode-stream @decode="onDecode" @init="onInit" />
    </b-modal>
  </b-card>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
import messageHandler from "../../handler/messageHandler";
import qrService from "../../services/qr.service";

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

  components: { QrcodeStream },
  data: () => {
    return {
      currentPage: 1,
      largeModal: false,
      result: "",
      error: "",
      selectedItem: null
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
  watch: {
    result(val) {
      console.log(val);
      let tmp = new URL(val);
      console.log(tmp.search);
      var urlParams = new URLSearchParams(tmp.search);
      let userId = urlParams.getAll("userId");
      let prescriptionId = urlParams.getAll("prescriptionId");
      let pharmacyId = urlParams.getAll("pharmacyId");
      console.log(userId);
      console.log(prescriptionId);
      console.log(pharmacyId);
      console.log(this.user.id)
      console.log(this.selectedItem.user_id)

      if (
        userId.length > 0 &&
        prescriptionId.length > 0 &&
        pharmacyId.length > 0
      ) {
        if (this.user.id == pharmacyId[0] && this.selectedItem.user_id == userId[0]) {
          console.log("Everything Ok");
          this.$store.dispatch("setLoading", true);

          let obj = {
            userId: userId[0],
            prescriptionId: prescriptionId[0],
            pharmacyId: pharmacyId[0]
          };
          qrService
            .validateQR(obj)
            .then(res => {
              if (res.data.status == 200) {
                console.log("success");
                this.$store.dispatch("setLoading", false);
                this.largeModal = false
                let obj2 = {
                  pharmacyId: this.user.id
                };
                this.$store.dispatch("getPrescriptionForDeliver", obj2);
              } else {
                this.$store.dispatch("setLoading", false);
                messageHandler.errorMessage("Failed", res.data.message);
              }
            })
            .catch(error => {
              this.$store.dispatch("setLoading", false);
              console.log(error);
              messageHandler.networkError();
            });
        } else {
          console.log("error");
          messageHandler.errorMessage("Failed", "Wrong QR");
        }
      } else {
        console.log("error2");
        messageHandler.errorMessage("Failed", "Wrong QR");
      }
    }
  },
  methods: {
    openQR(item){
      this.selectedItem = item
      this.largeModal = true
    },
    onDecode(result) {
      this.result = result;
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    },
    tmpFn() {
      alert("Test alert");
    },
    getBadge(status) {
      return status === "Active"
        ? "success"
        : status === "Inactive"
        ? "secondary"
        : status === "Pending"
        ? "warning"
        : status === "Banned"
        ? "danger"
        : "primary";
    },
    getRowCount: function() {
      return this.items.length;
    },
    rowClicked(item) {
      this.$emit("row-clicked", item);
    }
  }
};
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>
