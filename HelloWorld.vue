<template>
  <div class="hello">
    <ul>
      <li @click="select('all')">all</li>
      <li @click="select('unactive')">未激活</li>
      <li @click="select('doing')">进行中</li>
    </ul>
    <table>
      <tr v-for="item in items" v-show="currentType !== item.action">
        <td>{{item.id}}</td>
        <td>{{item.action}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentType:'all',
      items:[
        {
          id:'A2345',
          action:'未激活'
        },
        {
          id:'B638',
          action:'进行中'
        },
        {
          id:'C863',
          action:'已禁用'
        }
      ]
    }
  },
  methods:{
    select(type){
      if (type === 'all') {
        this.currentType = '全部'
      }else if (type === 'unactive') {
        this.currentType = '未激活'
      }else if (type === 'doing') {
        this.currentType = '进行中'
      }
    }
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
