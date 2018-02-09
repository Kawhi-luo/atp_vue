<template id="font">
	<div>
		<h2 class="page-header">Font Checker</h2>
        <div id="trans" class="row">
            <div class="col-md-4 navslid trans-side navslid-show">
                <div>
                    <p>URL Import(.txt only)</p>
                    <input class="form-control" type="file" id="fileInput">
                    <span class="input-group-btn">
                        <input @click="btnImport" type="button" class="btn btn-primary" value="Import" id="btnImport"/>
                    </span>
                    <p>URL Input (eg:https://webedit.apple.com/cn/macos/feature-availability/)</p>
                    <textarea rows="5" id="urls" class="form-control" v-model="urls"></textarea>
                </div>
                <div class="dropdown">
                    <select id="typeId">
                        <option value="all" selected>ALL</option>
                        <option value="woff">WOFF</option>
                        <option value="woff2">WOFF2</option>
                    </select>
                    <select id="server">
                        <option value="all">ALL</option>
                        <option value="WWW" selected>WWW</option>
                        <option value="UAT">UAT</option>
                    </select>
                    <button @click="btnQuest" id="btn_Quest" class="btn btn-primary">Query</button>
                    <button @click="btnClear" id="btn_Clear" class="btn btn-primary">Clear</button>
                </div>
            </div>
            <div class="col-md-7">
                <button @click="btnExport" id="btnExport" class="btn btn-primary">Export</button>
                <table class="table table-striped table-bordered">
                    <thead></thead>
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
        name:'app',
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
                let vm= this;
                var storedData;
                if(vm.urls.length > 5){
                    document.getElementById('resContainer').innerHTML=``;
                    bus.$emit("show",true);
                    let queryObj = {};
                    let typeName = document.getElementById('typeId').options[document.getElementById('typeId').selectedIndex].text;
                    let serverName = document.getElementById('server').options[document.getElementById('server').selectedIndex].text;
                    //var urls_trim = urls.value.replace(/(^\s*)|(\s*$)/g, "");
                    if (typeName !== 'all') {
                        queryObj['type'] = typeName;
                    }
                    if (serverName !== 'all') {
                        queryObj['server'] = serverName;
                    }

                    let _option = JSON.stringify(queryObj);
                    let urls = vm.urls;
                    console.log(urls);
                    console.log(_option);
                    //vm.$http.post('api/font/url',{urls:urls,option:_option})
                    //axios.post('api/font/url',qs.stringify({ 'urls': urls, 'option' : _option }))
                    //.then(function(Json_data){
                    // $.post('api/font/url', {urls: urls,option:_option}, function (Json_data) {
                    //     bus.$emit("show",false);
                    //     if(Json_data.data.result === true){
                    //         let str1 = ``;
                    //         let arrdata = Json_data.data.data;
                    //         storedData = Json_data.data.data;
                    //         console.log(arrdata);

                    //         for(let m in arrdata){
                    //             str1 += `<tr><td>URL:</td><td><a href="${arrdata[m].url}" target="_blank">${arrdata[m].url}</a></td></tr>`;
                    //             for(let n in arrdata[m].data){
                    //                 str1 += `<tr><td>${arrdata[m].data[n]}</td><td>`;
                    //                 if(arrdata[m].data.length>0){
                    //                     for(let x in arrdata[m].data){
                    //                         str1 += `${arrdata[m].data[x].word}[${valueinter[x].code}]&nbsp `;
                    //                     }
                    //                     str1+=`</td></tr>`;
                    //                 }else{
                    //                     str1 +=`No Font Missing`;
                    //                 }
                    //             }
                    //         }
                    //         document.getElementById('resContainer').innerHTML=str1;
                    //     }
                    // })
                    $.post('api/font/url', {urls: urls,option:_option}, function (Json_data) {
                        bus.$emit("show",false);
                        console.log(Json_data);
                        if(Json_data.result === true){
                            let str1 = ``;
                            let arrdata = Json_data.data;
                            storedData = Json_data.data;
                            console.log(arrdata);

                            for(let m in arrdata){
                                str1 += `<tr><td>URL:</td><td><a href="${arrdata[m].url}" target="_blank">${arrdata[m].url}</a></td></tr>`;
                                for(let n in arrdata[m].data){
                                    str1 += `<tr><td>${arrdata[m].data[n]}</td><td>`;
                                    if(arrdata[m].data[n].length>0){
                                        for(let x in arrdata[m].data[n]){
                                            str1 += `${arrdata[m].data[n][x].word}[${arrdata[m].data[n][x].code}]&nbsp `;
                                        }
                                        str1+=`</td></tr>`;
                                    }else{
                                        str1 +=`No Font Missing`;
                                    }
                                }
                            }
                            document.getElementById('resContainer').innerHTML=str1;
                        }
                    })
                    // .catch(function(err){
                    //     alert('aFalse');
                    // })
                } else {
                    console.log("The URL length is too short!");
                }
            },
            btnExport(){
                if(this.urls.length > 0){
                    console.log(storedData);
                    $.post(`/api/export`,{
                        data:JSON.stringify(storedData),
                        title:'Font Report',
                        file:'font'
                    },(data)=>{
                        $.fileDownload(`/api/files/${data}`);
                    })
                }
            }
        }
    }
</script>