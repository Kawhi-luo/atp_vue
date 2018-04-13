<style type="text/css">
    .red{
        color: red
    }
</style>
<template id="path">
	<div>
		<h2 class="page-header">V-Path Checker</h2>
        <div class="row">
            <div class="col-md-3">
                <p>URL Import(.txt only)</p>
                <input class="form-control" type="file" id="fileInput">
                <span class="input-group-btn">
                    <input @click="btnImport" type="button" class="btn btn-primary" value="Import" >
                </span>
            </div>
            <div class="col-md-4">
                <p>URL Input (eg:https://webedit.apple.com/cn/apple-watch-series-3/)</p>
                <textarea rows="5" class="form-control" v-model="urls"></textarea>
                <button @click="btnQuest" class="btn btn-primary">Query</button>
                <button @click="btnClear" class="btn btn-primary">Clear</button>
                <button @click="btnExport" class="btn btn-primary">Export</button>
            </div>
        </div>
        <br>
        <div>
            <table class="table table-striped table-bordered" v-if="table" v-for="(item,key) in tableData">
                <tbody>
                    <tr>
                        <th>Geo-Vpath</th>
                        <th>US-Vpath</th>
                    </tr>
                    <tr>
                        <td colspan="2"><a :href="key">{{key}}</a></td>
                    </tr>
                    <tr v-for="idx in item">
                        <td :class="{'red':idx.flag==false}">{{idx.origin}}</td>
                        <td :class="{'red':idx.flag==false}">{{idx.us}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script type="text/javascript">
    var qs = require('qs');
    import  bus from '../assets/eventBus';
    export default{
        data(){
            return{
              tableData:{},
              table:true,
              urls:'',
            }
        },
        methods:{
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
                let urls_trim = this.urls.replace(/(^\s*)|(\s*$)/g, "");
                let arr = urls_trim.split('\n');
                let flag = false;
                for(let i in arr){
                    if(arr[i].indexOf("/hk/")==-1 &&arr[i].indexOf("/hk/en/")==-1&&arr[i].indexOf("/cn/")==-1&&arr[i].indexOf("/tw/")==-1&&
                        arr[i].indexOf("/mo/")==-1){
                        alert("Sorry,The URL "+arr[i] +" is US page,please input GC URL!");
                        flag=true;
                    }
                }
                if(!flag){
                    let vm = this;
                    axios.post('/api/vpath/url',qs.stringify({ 'urls': urls_trim }))
                    .then(function(data){
                        console.log(data);
                        vm.table = true;
                        vm.tableData = data.data.data;
                    })
                    .catch(function(err){
                        console.log('axios false');
                    })
                }
                
            },
            btnExport(){
                alert('btnExport');
                let urls = document.getElementById('urls');
                if(urls.value.length > 0){
                    axios.post(`/api/export`,{
                        data:JSON.stringify(storedData),
                        title:'vpath Report',
                        file:'vpath'
                    },(data)=>{
                        //$.fileDownload(`/api/files/${data}`);
                    })
                }
            }
        }
    }
</script>