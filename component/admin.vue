<style type="text/css">
	.loginBar{
		position: absolute;
		top:0;
		right: 0;
	}
	#btnUserName{
		border:none;
	}
</style>
<template>
	<div class="loginBar">
        <button type="button" class="btn btn-default" id="btnUserName" @click="admin">
          <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
          <span id="userName" v-model="userName">{{userName}}</span>
        </button>
    </div>
</template>
<script type="text/javascript">
	import  bus from '../assets/eventBus';
	export default{
		data(){
			return{
				userName:''
			}
		},
		mounted(){
    		var vm = this;
    		bus.$on("user",function(name){
      			vm.userName=name;
    		});
  		},
  		methods:{
  			admin(){
				bus.$emit("confirm",true);
            	bus.$emit("show",true);
			}
  		}
	}
</script>