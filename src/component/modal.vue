<template>
	<div id="modal">
		<div class="modal" tabindex="-1" role="dialog" id="odConfirm" v-show="myconfirm">
    		<div class="modal-dialog" role="document">
        		<div class="modal-content">
            		<div class="modal-header">
                		<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close"><span aria-hidden="true">&times;</span>
               	 		</button>
                		<h4 class="modal-title">Modal title</h4>
           			</div>
            		<div class="modal-body">
                		<form>
                    		<div class="form-group">
                        		<label for="txtOdUser" class="control-label">User:</label>
                        		<input v-model="od_user" type="text" class="form-control" id="txtOdUser">
                    		</div>
                    		<div class="form-group">
                        		<label for="txtOdPass" class="control-label">Password:</label>
                        		<input v-model="od_pass" type="password" class="form-control" id="txtOdPass">
                    		</div>
                		</form>
            		</div>
            		<div class="modal-footer">
                		<button type="button" class="btn btn-primary" id="btnSubmit" @click="sub">Submit</button>
            		</div>
        		</div>
    		</div>
		</div>
	</div>
</template>
<script type="text/javascript">
    var qs = require('qs');
    import axios from 'axios'
    import  bus from '../assets/eventBus';
    export default{
        name:'app',
        data(){
            return{
                od_user:'',
                od_pass:'',
                myconfirm:true
            }
        },
        mounted(){
            var vm = this;
            bus.$on("confirm",function(sta){
                vm.myconfirm=sta;
            });
                // vm.$http.get('/api/init')
                // .then(function(data){
                //     console.log('data');
                //     console.log(data);
                //     console.log('data');
                //     let local_user = localStorage.getItem('od_user');
                //     let local_pass = localStorage.getItem('od_pass');
                //     if(local_user && local_pass){
                //         vm.od_user = local_user;
                //         vm.od_pass = local_pass;
                //     }

                //     if(!(vm.od_user && vm.od_pass)){
                //         vm.myconfirm=true
                //     }else{
                //         bus.$emit("user",vm.od_user);
                //         vm.myconfirm=false,
                //         bus.$emit("show",false);
                //     }
                // })
                vm.$http.get('/api/init')
                .then(function(data){
                    console.log('data');
                    console.log(data);
                    const {odUser, odPass} = data;
                    let odAuth = localStorage.getItem('odAuth');
                    if(odAuth){
                        odAuth = JSON.parse(odAuth);
                        console.log('qwe');
                        console.log(odAuth);
                        vm.od_user = odAuth.data.odUser;
                        vm.od_pass = odAuth.data.odPass;
                    }

                    if(!(vm.od_user && vm.od_pass)){
                        vm.myconfirm=true
                    }else{
                        bus.$emit("user",vm.od_user);
                        vm.myconfirm=false,
                        bus.$emit("show",false);
                    }
                })
                .catch(function(error){
                    alert("getFalse")
                })
            },
        methods:{
            sub(){
                var vm = this;
                //vm.$http.post('/api/init', {odUser:vm.od_user, odPass:vm.od_pass})
                axios.post('/api/init',qs.stringify({ 'odUser': vm.od_user,'odPass':vm.od_pass }))
                .then(function(data){
                    if(vm.od_user && vm.od_pass){
                        bus.$emit("show",false);
                        vm.myconfirm=false,
                        bus.$emit("user",vm.od_user);
                        localStorage.setItem('odAuth',JSON.stringify(data));
                         // localStorage.setItem('od_user',vm.od_user);
                         // localStorage.setItem('od_pass',vm.od_pass);
                    }
                })
                .catch(function(error){
                    alert("postFalse")
                })
            },
            close(){
                this.myconfirm=false;
                bus.$emit("show",false);
            }
        }
    }
</script>
<style type="text/css">
    #modal{
        position: absolute;
        z-index: 999;
    }
    #odConfirm{
        display: block;
    }
</style>