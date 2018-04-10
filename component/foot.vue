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
            <table border="1" cellspacing="0" v-if="table">
              <tr>
                <td>Sort</td>
                <td>FootNote</td>
                <td>Copy</td>
              </tr>
              <tr>
                <td v-model="http" colspan="3">{{http}}</td>
              </tr>
              <tr v-for="item in tableData">
                <td>{{item.mark}}</td>
                <td>{{item.footnote}}</td>
                <td>{{item.copy}}</td>
              </tr>
              <tr v-model="unsorted">
                <td v-bind:rowspan="unsortedLength">Un-sorted</td>
              </tr>
              <tr v-for="item in unsorted">
                <td colspan="2" >{{item}}</td>
              </tr>
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
                urls:'',
                http:'',
                unsorted:[],
                unsortedLength:''
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
                        vm.tableData = data.data[0].data.data;
                        vm.http = data.data[0].url;
                        vm.unsorted = data.data[0].data.irrelevance;
                        vm.unsortedLength = data.data[0].data.irrelevance.length+1;
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