<template>
  <div class="hello">
    <ul>
      <li v-for="item in li" @click="active = item">{{item}}</li>
    </ul>
    <ul>
      <li v-for="item in ll" @click="activq = item">{{item}}</li>
    </ul>
    <table>
      <tr v-for="item in items" v-if="active == item.action && activq == item.id || active == 'all'">
        <td>{{item.id}}</td>
        <td>{{item.action}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 'all',
      activq: true,
      li: ['all', '未激活', '进行中'],
      ll: ['all', 'A234', 'B638'],
      items:[
        {
          id:'A234',
          action:'未激活'
        },
        {
          id:'B638',
          action:'进行中'
        },
        {
          id:'B638',
          action:'未激活'
        },
        {
          id:'C863',
          action:'已禁用'
        }]
    }
  },
  mounted() {
    console.log(this.li);
  }
}
</script>
<style>
  table {
    width:100%;
  }
  .title td {
    width:10%;
  }
  ul {
    list-style-type: none;
  }
</style>
