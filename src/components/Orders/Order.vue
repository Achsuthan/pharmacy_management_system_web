<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-card >
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
              caption="<i class='fa fa-align-justify'></i> Past Order"
            ></c-table>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>

import { shuffleArray } from '@/shared/utils'
import cTable from './Table'

const someData = () => shuffleArray([
  {username: 'Samppa Nori', registered: '2012/01/01', role: 'Member', status: 'Delivered'},
  {username: 'Estavan Lykos', registered: '2012/02/01', role: 'Staff', status: 'Not Delivered'},
])
export default {
  name: "navs",
  components: {cTable},
  data: () => {
    return {
      isActive: false,
      items: someData,
      itemsArray: someData(),
      fields: [
        {key: 'username', label: 'User', sortable: true},
        {key: 'registered'},
        {key: 'role'},
        {key: 'status', sortable: true}
      ],
    }
  }
};
</script>

