<style type="text/css">
  .red{
    color: red;
  }
</style>
<template id="view">
	<div>
		<h2 class="page-header">Viewport Checker</h2>
        <div class="row">
            <div class="col-md-4 navslid trans-side navslid-show">
                <p>URL Import(.txt only)</p>
                <input class="form-control" type="file" id="fileInput">
                <span class="input-group-btn">
                    <input @click="btnImport" type="button" class="btn btn-primary" value="Import">
                </span>
                <p>URL Input (eg:https://www.apple.com/cn/iphone)</p>
                <textarea rows="5" class="form-control" v-model="urls"></textarea>
                <br>
                <button @click="btnQuest" class="btn btn-primary">Query</button>
                <button @click="btnClear" class="btn btn-primary">Clear</button>
            </div>
            <div class="col-md-7 showValue">
                Show:
                <input name="criteria" type="radio" value="failure" @click="failure">Failures
                <input name="criteria" type="radio" value="all" @click="all">all
                <br>
                <button @click="btnExport" class="btn btn-primary">Export</button>
                <div v-if="table">
                    <table class="table table-striped table-bordered" v-for="item in tableData_false">
                        <tbody>
                            <tr>
                                <th>URL</th>
                                <th>ViewPort</th>
                                <th>Result</th>
                            </tr>
                            <tr>
                                <td><a :href="item.url">{{item.url}}</a></td>
                                <td>{{item.viewport}}</td>
                                <td class="red">{{item.flag}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="table table-striped table-bordered" v-for="item in tableData_true" v-show="table_true">
                        <tbody>
                            <tr>
                                <th>URL</th>
                                <th>ViewPort</th>
                                <th>Result</th>
                            </tr>
                            <tr>
                                <td><a :href="item.url">{{item.url}}</a></td>
                                <td>{{item.viewport}}</td>
                                <td>{{item.flag}}</td>
                            </tr>
                        </tbody>
                    </table>
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
              table:true,
              table_true:true,
              urls:'',
              tableData_true:[],
              tableData_false:[]
            }
        },
        methods:{
            failure(){
                this.table_true = false
            },
            all(){
                this.table_true = true
            },
            btnImport(){
                let vm = this;
                let fileInput = document.getElementById('fileInput').files[0];
                let reader = new FileReader();
                reader.readAsText(fileInput);
                reader.onload = function(){
                    vm.urls=this.result;
                };
            },
            btnClear(){
                this.urls=""
            },
            btnQuest(){
                var vm = this;
                var urls_trim = vm.urls.replace(/(^\s*)|(\s*$)/g, "");
                axios.post('/api/viewport',qs.stringify({ 'urls': urls_trim }))
                .then(function(data){
                    console.log(data.data);
                    let store = data.data;
                    for(let i in store){
                        if(store[i].flag==false){
                            vm.tableData_false.push(store[i]);
                        }else{
                            vm.tableData_true.push(store[i]);
                        }
                    }
                })
                .catch(function(err){
                })
            },
            btnExport(){
                alert('btnExport');
                let urls = document.getElementById('urls');
                if(urls.value.length > 0){
                    axios.post(`/api/export`,{
                        data:JSON.stringify(storedData),
                        title:'Viewport Report',
                        file:'viewport'
                    },(data)=>{
                        //$.fileDownload(`/api/files/${data}`);
                    })
                }
            }
        }
    }
</script>