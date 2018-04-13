<style type="text/css">
  .red{
    color: red;
  }
</style>
<template id="link">
	<div>
		<h2 class="page-header">Link Checker</h2>
        <div class="row">
            <div class="col-md-4 navslid trans-side navslid-show">
                <!-- <div>
                    <p>URL Import(.txt only)</p>
                    <div class="input-group">
                        <input class="form-control" type="file" id="fileInput">
                        <span class="input-group-btn">
                            <input @click="btnImport" type="button" class="btn btn-primary" value="Import">
                        </span>
                    </div>
                </div> -->
                <p>URL Input (One URL only)</p>
                <p>(eg:https://www.apple.com/cn/iphone)</p>
                <p>
                    <input type="text" class="form-control" v-model="url" name="url" placeholder="Please input URL"/>
                </p>
            </div>
            <div class="col-md-7" style="margin-top:20px">
                Show:
                <input @click="failure" name="criteria" type="radio" value="failure" >Failures
                <input @click="all" name="criteria" type="radio" value="all">all
                <br>
                <div style="margin-top:20px">
                    <button @click="btnQuest" class="btn btn-primary">Query</button>
                    <button @click="btnClear" class="btn btn-primary">Clear</button>
                    <button @click="btnExport" class="btn btn-primary">Export</button>
                </div>
            </div>
            <div class="col-md-12" v-if="table">
                <div class="alert alert-info">请滑到页面底部，点开折叠面板，检查header和footer的link状态</div>
                <table class="table table-striped table-bordered">
                    <tbody v-show="res_Containererr">
                        <tr>
                            <td width="50%">URL</td>
                            <td>Status</td>
                            <td>Error Message</td>
                            <td>Anchor Text</td>
                            <td>Resolved To</td>
                            <td>HTTP Code</td>
                        </tr>
                        <tr v-for="item in tableData_main_fail">
                            <td>{{item.href}}</td>
                            <td class="red">{{item.status}}</td>
                            <td class="red">{{item.message}}</td>
                            <td>{{item.text}}</td>
                            <td><a :href='item.toWWW'>{{item.toWWW}}</a></td>
                            <td class="red">{{item.statusCode}}</td>
                        </tr>
                    </tbody>
                </table>
                <table class="table table-striped table-bordered" v-show="res_true">
                    <tbody>
                        <tr>
                            <td width="50%">URL</td>
                            <td>Status</td>
                            <td>Anchor Text</td>
                            <td>Resolved To</td>
                            <td>HTTP Code</td>
                        </tr>
                        <tr v-for="item in tableData_main_true">
                            <td>{{item.href}}</td>
                            <td>{{item.status}}</td>
                            <td>{{item.text}}</td>
                            <td><a :href='item.toWWW'>{{item.toWWW}}</a></td>
                            <td>{{item.statusCode}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a @click="collapse_header">Check Header link</a>
                        </h4>
                    </div>
                    <div class="panel-body" v-show="res_Containerheader">
                        <table class="table table-striped table-bordered">
                            <tbody>
                                <tr>
                                    <td width="50%">URL</td>
                                    <td>Status</td>
                                    <td>Error Message</td>
                                    <td>Anchor Text</td>
                                    <td>Resolved To</td>
                                    <td>HTTP Code</td>
                                </tr>
                                <tr v-for="item in tableData_head_fail">
                                    <td>{{item.href}}</td>
                                    <td class="red">{{item.status}}</td>
                                    <td class="red">{{item.message}}</td>
                                    <td>{{item.text}}</td>
                                    <td><a :href='item.toWWW'>{{item.toWWW}}</a></td>
                                    <td class="red">{{item.statusCode}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="table table-striped table-bordered" v-show="res_true">
                            <tbody>
                                <tr>
                                    <td width="50%">URL</td>
                                    <td>Status</td>
                                    <td>Anchor Text</td>
                                    <td>Resolved To</td>
                                    <td>HTTP Code</td>
                                </tr>
                                <tr v-for="item in tableData_head_true">
                                    <td>{{item.href}}</td>
                                    <td>{{item.status}}</td>
                                    <td>{{item.text}}</td>
                                    <td><a :href='item.toWWW'>{{item.toWWW}}</a></td>
                                    <td>{{item.statusCode}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a @click="collapse_footer">Check Footer link</a>
                        </h4>
                    </div>
                    <div class="panel-body" v-show="res_Containerfooter">
                        <table class="table table-striped table-bordered">
                            <tbody>
                                <tr>
                                    <td width="50%">URL</td>
                                    <td>Status</td>
                                    <td>Error Message</td>
                                    <td>Anchor Text</td>
                                    <td>Resolved To</td>
                                    <td>HTTP Code</td>
                                </tr>
                                <tr v-for="item in tableData_foot_fail">
                                    <td>{{item.href}}</td>
                                    <td class="red">{{item.status}}</td>
                                    <td class="red">{{item.message}}</td>
                                    <td>{{item.text}}</td>
                                    <td><a :href="item.toWWW">{{item.toWWW}}</a></td>
                                    <td class="red">{{item.statusCode}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="table table-striped table-bordered" v-show="res_true">
                            <tbody>
                                <tr>
                                    <td width="50%">URL</td>
                                    <td>Status</td>
                                    <td>Anchor Text</td>
                                    <td>Resolved To</td>
                                    <td>HTTP Code</td>
                                </tr>
                                <tr v-for="item in tableData_foot_true">
                                    <td>{{item.href}}</td>
                                    <td>{{item.status}}</td>
                                    <td>{{item.text}}</td>
                                    <td><a :href='item.toWWW'>{{item.toWWW}}</a></td>
                                    <td>{{item.statusCode}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    var qs = require('qs');
    import  bus from '../assets/eventBus';
    export default{
        data(){
            return{
                tableData_main_true:[],
                tableData_main_fail:[],
                tableData_head_true:[],
                tableData_head_fail:[],
                tableData_foot_true:[],
                tableData_foot_fail:[],
                table:false,
                url:'',
                res_true:true,
                res_Containererr:true,
                res_Containerfooter:false,
                res_Containerheader:false,
            }
        },
        methods:{
            failure(){
                this.res_true = false
            },
            all(){
                this.res_true = true
            },
            collapse_footer(){
                this.res_Containerfootererr = !this.res_Containerfootererr,
                this.res_Containerfooter = !this.res_Containerfooter
            },
            collapse_header(){
                this.res_Containerheadererr = !this.res_Containerheadererr,
                this.res_Containerheader = !this.res_Containerheader
            },
            // btnImport(){
            //     let vm = this;
            //     let fileInput = document.getElementById('fileInput').files[0];
            //     let reader = new FileReader();
            //     reader.readAsText(fileInput);
            //     reader.onload = function(){
            //       vm.urls=this.result;
            //     };
            // },
            btnClear(){
                this.url=""
            },
            btnQuest(){
                if(this.url.length > 5){
                    var vm = this;
                    axios.post('/api/link',qs.stringify({ 'url': vm.url }))
                    .then(function(Jsondata){
                        console.log(Jsondata);
                        if(Jsondata.data && Jsondata.data.result === true){
                            var store = Jsondata.data.data;
                            console.log(store);
                            vm.table=true;
                            if(store[0]){
                                for(let i in store[0]){
                                    if(store[0][i].toWWW==null){
                                        store[0][i].toWWW='null'
                                    }
                                    if(store[0][i].status === "failed"){
                                        if(store[0][i].message==null){
                                            store[0][i].message='null'
                                        }
                                        vm.tableData_head_fail.push(store[0][i])
                                    }else{
                                        vm.tableData_head_true.push(store[0][i])
                                    }
                                }
                            }
                            if(store[1]){
                                for(let i in store[1]){
                                    if(store[1][i].toWWW==null){
                                        store[1][i].toWWW='null'
                                    }
                                    if(store[1][i].status === "failed"){
                                        if(store[1][i].message==null){
                                            store[1][i].message='null'
                                        }
                                        vm.tableData_main_fail.push(store[1][i]);
                                    }else{
                                        vm.tableData_main_true.push(store[1][i])
                                    }
                                }
                            }
                            if(store[2]){
                                for(let i in store[2]){
                                    if(store[2][i].toWWW==null){
                                        store[2][i].toWWW='null'
                                    }
                                    if(store[2][i].status === "failed"){
                                        if(store[2][i].message==null){
                                            store[2][i].message='null'
                                        }    
                                        vm.tableData_foot_fail.push(store[2][i]);
                                    }else{
                                        vm.tableData_foot_true.push(store[2][i])
                                    }
                                }
                            }
                        }else{
                            console.log('not exist')
                        }
                    })
                    .catch(function(err){
                        console.log('axios false')
                    })
                }else{
                    console.log('too short')
                }
            },
            btnExport(){
                alert('btnExport');
                let url = document.getElementById('url');
                if(url.value.length > 0){
                    console.log(storedData);
                    var arr = [];
                    storedData.forEach((value,n) => {
                        arr.push({
                            href : value['href'],
                            message : value['message'],
                            rawLink : value['rawLink'],
                            status:value['status'],
                            type:value['type'],
                            text:value['text']
                        })
                    });
                    axios.post(`/api/export`,{
                        data:JSON.stringify(storedData),
                        title:'Link Report',
                        file:'link'
                    },(data)=>{
                        //$.fileDownload(`/api/files/${data}`);
                    })
                }
            }
        }
    }
</script>