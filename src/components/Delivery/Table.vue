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
      <template slot="status" slot-scope="data">
        <b-button size="sm" class="mr-2" @click="largeModal = true">{{data.item.status}}</b-button>
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
    <b-modal title="Scan QR" v-model="largeModal" @ok="largeModal = false">
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
      error: ""
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
    }
  },
  methods: {
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
