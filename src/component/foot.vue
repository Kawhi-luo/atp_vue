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
            <table class="table table-striped table-bordered">
                <thead></thead><tbody id="resContainer"></tbody>
            </table>
        </div>
    </div>
</template>
<script type="text/javascript">
    var qs = require('qs');
    import  bus from '../assets/eventBus';
    import axios from 'axios';
    function isContainstar(str1) {
        let flag = false;
        if (str1) {
            if (str1.length === 0) return flag;
           if(str1.indexOf('*') >= 0){
               flag=true;
           }
        }
        return flag;
    }
    export default{
        data(){
            return{
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
                this.urls='';
            },
            btnQuest(){
                let vm = this;
                var storedData;
                if(vm.urls.length > 5){
                    document.getElementById('resContainer').innerHTML=``;
                    bus.$emit("show",true);
                    let urls_trim = urls.value.replace(/(^\s*)|(\s*$)/g, "");
                    
                    axios.post('/api/footnote',qs.stringify({ 'urls': urls_trim }))
                    .then(function(data){
                        console.log(data);
                        bus.$emit("show",false);

                        if (data) {
                            let str1 = ``;
                            let str = ``;
                            storedData = data.data;
                            console.log(storedData);

                            str += `<tr><th>Sort</th><th width="48%">FootNote</th><th width="48%">☞Copy</th></tr>`;
                            console.log('aaaaa');
                            for(let i = 0;i<storedData.length;i++){
                                let footnotes = storedData[i]['data']['data'];
                                console.log(footnotes);
                                str += `<tr><td colspan="3"><a href="${storedData[i].url}" target="_blank">${storedData[i].url}</td>`;
                                let arrlen =footnotes.length;
                                str+=``;
                                for(let i = 0; i < arrlen; i++){
                                    str +=`<tr><td></td><td ${footnotes[i].copy=="" ?"class='red'":""} >${footnotes[i].mark} ${isContainstar(footnotes[i].mark) ?" ":"."} ${footnotes[i].footnote}</td>
                                    <td ${footnotes[i].footnote=="" ?"class='red'":""}>${footnotes[i].copy}</td></tr>`;
                                }
                                str+=`<tr><td>Un-sorted</td><td colspan="2">`;

                                let irrlen=storedData[i].data.irrelevance.length;
                                let irr=storedData[i].data.irrelevance;
                                for (let j = 0; j < irrlen; j++) {
                                    str+=`&#9829 ${irr[j]}<br>`;
                                }
                                str+=`</td></tr>`;
                                document.getElementById('resContainer').innerHTML=str;
                            }
                        }else {
                            console.log("null");
                        }
                    })
                    .catch(function(err){
                        alert('qFalse');
                    })
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