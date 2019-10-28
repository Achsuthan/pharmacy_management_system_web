<template>
    <AppHeader fixed>
      <!-- <SidebarToggler class="d-lg-none" display="md" mobile /> -->
      <b-link class="navbar-brand" to="/home">
        PMS
      </b-link>
        Pharmacy Name
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/home">Home</b-nav-item>
        <b-nav-item class="px-3" to="/orders" exact>Medicine Orders</b-nav-item>
        <b-nav-item class="px-3" to="/deliver">Deliver Medicine</b-nav-item>
      </b-navbar-nav>
    </AppHeader>
</template>
<script>
import { Header as AppHeader } from '@coreui/vue'

export default {
  name: 'DefaultHeader',
  components: {
    
    AppHeader
  }
}
</script>
