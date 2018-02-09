<template>
  <div id="app">
    <div id="nav-top">
      <h4 id="title"> QA Test Platform</h4> 
      <ul id="nav">
        <li><router-link to="/home">Overview</router-link></li>
        <li><router-link to="/meta">Meta Checker</router-link></li>
        <li><router-link to="/font">Font Checker</router-link></li>
        <li><router-link to="/link">Link Checker</router-link></li>
        <li><router-link to="/path">V-path</router-link></li>
        <li><router-link to="/view">Viewport</router-link></li>
        <li><router-link to="/foot">Footnotes</router-link></li>
        <li @mouseenter="copy_show" @mouseleave="copy_hide"><a>Copy Tool</a>
          <ul id="copy_tool" v-show="copy_tool">
            <li><router-link to="/copy">Copy Checker</router-link></li>
            <li><router-link to="/copyen">Custom Check</router-link></li>
          </ul>
        </li>
        <li><router-link to="/aow">AOW Checker</router-link></li>
        <li><router-link to="/workflow">Workflow</router-link></li>
        <li><router-link to="/set">Setting</router-link></li>
        <li @mouseenter="gp_show" @mouseleave="gp_hide"><a>GP Tool</a>
          <ul id="gp_tool" v-show="gp_tool">
            <li><router-link to="/image">Image Checker</router-link></li>
            <li><router-link to="/mp4">Mp4 Checker</router-link></li>
          </ul>
        </li>
        <admin></admin>
      </ul>
    </div>
    <modal></modal>
    <div id="main">
      <router-view></router-view>
    </div>
    <div id="bg_loading" v-show="loading"></div>
  </div>
</template>
<script type="text/javascript">
import modal from './component/modal.vue';
import admin from './component/admin.vue';
import bus from './assets/eventBus';
export default{
  data(){
    return{
      loading:true,
      copy_tool:false,
      gp_tool:false
    }
  },
  methods:{
    gp_show(){
      this.gp_tool=true
    },
    gp_hide(){
      this.gp_tool=false
    },
    copy_show(){
      this.copy_tool=true
    },
    copy_hide(){
      this.copy_tool=false
    }
  },
  mounted(){
    var vm = this;
    bus.$on("show",function(sta){
      vm.loading=sta;
    });
  },
  components:{
    modal,admin
  }
}
</script>
<style>
  body{
    margin: 0
  }
  .red {
    color: red;
  }
  #title{
    width:100%;
    display: block;
  }
  #nav{
    width:100%;
    list-style-type: none;
    background: #000;
    padding: 0
  }
  #nav>li{
    text-align: center;
    float: left;
    height:40px;
    color: #9d9d9d;
    font-size: 14px;
    position: relative;
  }
  #nav>li>a{
    display:inline-block;
    margin:10px 18px;
    text-decoration: none;
    color: #9d9d9d;
  }
  #nav li a:hover{
    color: #fff;
  }
  #nav li:hover{
    color: #fff;
  }
  #nav>li>ul>li>a{
    color: #9d9d9d;
  }
  #nav>li>ul{
    list-style-type: none;
    padding-left: 0;
    position: absolute;
    text-align: center;
    width: 120px;
  }
  #nav>li>ul>li{
    height: 30px;
    background: #080808;
    line-height: 30px;
    color: #9d9d9d;
  }
  #copy_tool{
    left:-12px;
    top:38px;
  }
  #gp_tool{
    top:38px;
  }
  #main{
    padding-left: 20px;
  }
  .loginBar{
    padding-top: 5px;
    text-align:right;
  }
  #bg_loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 998;
}
</style>