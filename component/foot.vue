<template id="foot">
    <div>
        <h2 class="page-header">FootNotes Checker</h2>
        <div class="row">
            <div class="col-md-3">
                <p>URL Import(.txt only)</p>
                <input class="form-control" type="file" id="fileInput">
                <span class="input-group-btn">
                    <input @click="btnImport" type="button" class="btn btn-primary" value="Import" id="btnImport"/>
                </span>
            </div>
            <div class="col-md-4">
                <p>URL Input (eg:https://www.apple.com/cn/iphone-8/)</p>
                <textarea rows="5" id="urls" class="form-control" v-model="urls"></textarea>
                <button @click="btnQuest" id="btnQuest" class="btn btn-primary">Query</button>
                <button @click="btnClear" id="btnClear" class="btn btn-primary">Clear</button>
                <button @click="btnExport" id="btnExport" class="btn btn-primary">Export</button>
            </div>
        </div>
        <div>
            <table class="table table-striped table-bordered" v-if="table" v-for="item in tableData">
                <tbody>
                    <tr>
                        <td>Sort</td>
                        <td>FootNote</td>
                        <td>Copy</td>
                    </tr>
                    <tr>
                        <td colspan="3">{{tableData.url}}</td>
                    </tr>
                    <tr v-for="idx in item.data.data">
                        <td>{{idx.mark}}</td>
                        <td>{{idx.footnote}}</td>
                        <td>{{idx.copy}}</td>
                    </tr>
                    <tr>
                        <td :rowspan="item.data.irrelevance.length+1">Un-sorted</td>
                    </tr>
                    <tr v-for="idx in item.data.irrelevance">
                        <td colspan="2" >{{idx}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script type="text/javascript">
    var storedData;
    var qs = require('qs');
    import  bus from '../assets/eventBus';
    export default{
        data(){
            return{
                table:false,
                tableData:[],
                urls:''
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
                this.urls='';
            },
            btnQuest(){
                if(this.urls.length > 5){
                    var vm = this;
                    // bus.$emit("show",true);
                    let urls_trim = this.urls.replace(/(^\s*)|(\s*$)/g, "");
                    console.log(urls_trim);
                    axios.post('/api/footnote',qs.stringify({ 'urls': urls_trim }))
                    .then(function(data){
                        console.log(data);
                        vm.table = true;
                        vm.tableData = data.data;
                    })
                    .catch(function(err){
                        console.log('axios false');
                    })
                }else{
                  alert('this length is too short')
                }
            },
            btnExport(){
                if(this.urls.length > 0){
                    console.log(storedData);
                    var arr = [];
                    storedData.foreach((value,n)=>{
                        arr.push({
                        url : value.url,
                        data:value.data,
                        irrelevance:value.irrelevance
                        });
                    })
                    vm.$http.post(`/api/export`,{
                        data:JSON.stringify(storedData),
                        title:'FootNotes Report',
                        file:'footnotes'
                    },(data)=>{
                        //$.fileDownload(`/api/files/${data}`);
                    })
                }
            }
        }
    }
</script>