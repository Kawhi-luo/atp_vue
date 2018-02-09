<template id="view">
	<div>
		<h2 class="page-header">Viewport Checker</h2>
        <div class="row">
            <div class="col-md-4 navslid trans-side navslid-show">
                <p>URL Import(.txt only)</p>
                <input class="form-control" type="file" id="fileInput">
                <span class="input-group-btn">
                    <input @click="btnImport" type="button" class="btn btn-primary" value="Import" id="btnImport"/>
                </span>
                <p>URL Input (eg:https://www.apple.com/cn/iphone)</p>
                <textarea rows="5" id="urls" class="form-control" v-model="urls"></textarea>
                <br>
                <button @click="btnQuest" id="btnQuest" class="btn btn-primary">Query</button>
                <button @click="btnClear" id="btnClear" class="btn btn-primary">Clear</button>
            </div>
            <div class="col-md-7 showValue">
                Show:
                <input id="radioerr" name="criteria" type="radio" value="failure" @click="failure">Failures
                <input id="radioall" name="criteria" type="radio" value="all"  @click="all">all
                <br>
                <button @click="btnExport" id="btnExport" class="btn btn-primary">Export</button>
                <table class="table table-striped table-bordered">
                    <tbody id="resContainererr"></tbody>
                </table>
                <table class="table table-striped table-bordered" id="corTable">
                    <tbody id="resContainer"></tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    var qs = require('qs');
    import  bus from '../assets/eventBus';
    import axios from 'axios';
    export default{
        data(){
            return{
                urls:''
            }
        },
        methods:{
            failure(){
                document.getElementById('corTable').style.display='none';
            },
            all(){
                document.getElementById('corTable').style.display='block';
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
                this.urls='';
            },
            btnQuest(){
                var storedData;
                let vm = this;
                if(urls.value.length > 5){
                    document.getElementById('resContainer').innerHTML=``;
                    document.getElementById('resContainererr').innerHTML=``;
                    bus.$emit("show",true);
                    var urls_trim = vm.urls.replace(/(^\s*)|(\s*$)/g, "");
                    //vm.$http.post('/api/viewport',{urls:urls_trim})
                    console.log(urls_trim);
                    axios.post('/api/viewport',qs.stringify({ 'urls': urls_trim }))
                    .then(function(data){
                        bus.$emit("show",false);
                        console.log(data);
                        if (data.data) {
                            let str = ``;
                            let strerr = ``;
                            storedData = data.data;

                            str += `<tr>
                            <th>URL</th>
                            <th>ViewPort</th>
                            <th>Result</th>
                            </tr>`;
                            strerr += `<tr>
                            <th>URL</th>
                            <th>ViewPort</th>
                            <th>Result</th>
                            </tr>`;
                            data.data.forEach((item, index) => {
                                if (item) {
                                    if (item.flag === false) {
                                        strerr += `<tr>
                                        <td><a href="${item.url}" target="_blank">${item.url}</a></td>
                                        <td>${item.viewport}</td>
                                        <td ${(item.flag == false ) ? " class='red'" : ""}>${item.flag}</td>
                                        </tr>`;
                                        document.getElementById('resContainererr').innerHTML=strerr;
                                    } else {
                                        str += `<tr>
                                        <td><a href="${item.url}" target="_blank">${item.url}</a></td>
                                        <td>${item.viewport}</td>
                                        <td ${(item.flag == false ) ? " class='red'" : ""}>${item.flag}</td>
                                        </tr>`;
                                        document.getElementById('resContainer').innerHTML=str;
                                    }
                                }
                            });
                        }else {
                            console.log("null");
                        }
                    })
                    .catch(function(err){
                        alert('qFalse');
                    })
                } else {
                    console.log("null");
                }
            },
            btnExport(){
                if(this.urls.length > 0){
                    vm.$http.post(`/api/export`,{
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