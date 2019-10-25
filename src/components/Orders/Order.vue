<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      
      <b-card
        header-tag="header"
        footer-tag="footer">
        <div slot="header">
          <i class="fa fa-align-justify"></i><strong> Bootstrap Navs </strong><small>justified tabs</small>
        </div>
        <div>
          <b-nav justified tabs>
            <b-nav-item active>Current</b-nav-item>
            <b-nav-item >Past</b-nav-item>
          </b-nav>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navs'
}
</script>

