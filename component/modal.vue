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
    Mock.mock(
        'http://mockjs', {
            "userName" : '@name',     //模拟名称
            "age|1-100":100,          //模拟年龄(1-100)
            "color"    : "@color",    //模拟色值
            "url"      : "@url()",     //模拟url
            "content"  : "@cparagraph()" //模拟文本
        }
    );
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
                //axios.get('/api/init')
                axios.get('http://mockjs')
                .then(function(data){
                    //辣鸡
                    let local_user = localStorage.getItem('od_user');
                    let local_pass = localStorage.getItem('od_pass');
                    if(local_user && local_pass){
                        vm.od_user = local_user;
                        vm.od_pass = local_pass;
                    }
                    //问题鸡
                    // document.getElementById("bg_loading").style.display="none";
                    // const {odUser, odPass} = data;
                    // let odAuth = localStorage.getItem('odAuth');
                    // if(odAuth){
                    //     odAuth = JSON.parse(odAuth);
                    //     console.log('1111');
                    //     console.log(odAuth);
                    //     console.log('getodAuth');
                    //     vm.od_user = odAuth.odUser;
                    //     vm.od_pass = odAuth.odPass;
                    // }
                    
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
                axios.post('http://mockjs', {odUser:vm.od_user,odPass:vm.od_pass})
                //axios.post('/api/init', {odUser:vm.od_user, odPass:vm.od_pass})
                .then(function(data){
                //辣鸡
                    if(vm.od_user && vm.od_pass){
                        bus.$emit("show",false);
                        vm.myconfirm=false,
                        //document.getElementById("userName").innerText=vm.od_user;
                        bus.$emit("user",vm.od_user);
                        localStorage.setItem('od_user',vm.od_user);
                        localStorage.setItem('od_pass',vm.od_pass);
                        //localStorage.setItem('odAuth', JSON.stringify(data));
                    }
                //问题鸡
                // console.log(data);
                // console.log('data');
                //     if(data && data.odPass && data.odUser){
                //         //document.getElementById("bg_loading").style.display="none";
                //         document.getElementById("odConfirm").style.display="none";
                //         document.getElementById("userName").innerText=vm.od_user;
                //         localStorage.setItem('odAuth', JSON.stringify(data));
                //         console.log(odAuth);
                //         console.log('setodAU');
                //     }
                //     alert(data.odUser);
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
<style type="text/css" scoped>
    #modal{
        position: absolute;
        z-index: 999;
    }
    #odConfirm{
        display: block;
    }
</style>