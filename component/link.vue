<style type="text/css">
    table {
        table-layout: fixed;
    }
    table td {
        word-wrap: break-word;
    }
</style>
<template id="link">
	<div>
		<h2 class="page-header">Link Checker</h2>
        <div id="trans" class="row">
    <div class="col-md-4 navslid trans-side navslid-show">
        <p>URL Input (One URL only)</p>
        <p>(eg:https://www.apple.com/cn/iphone)</p>
        <p>
            <input type="text" class="form-control" id="url" name="url" v-model="url" placeholder="Please input URL"/>
        </p>
        <div>
            <button id="btn_Quest" class="btn btn-primary" @click="btnQuest">Query</button>
            <button id="btn_Clear" class="btn btn-primary" @click="btnClear">Clear</button>
        </div>
    </div>
    <div class="col-md-7">

        Show:
        <input id="radioerr" name="criteria" type="radio" value="failure" onchange ="change();" >Failures
        <input id="radioall" name="criteria" type="radio" value="all" onchange ="change();">all
        <br>
        <button id="btnExport" class="btn btn-primary" @click="btnExport">Export</button>

        <div class="alert alert-info" id="alert">请滑到页面底部，点开折叠面板，检查header和footer的link状态</div>


        <table class="table table-striped table-bordered">
            <tbody id="res_Containererr">
            </tbody>
        </table>

        <table class="table table-striped table-bordered" id="corTable">
            <tbody id="res_Container">
            </tbody>
        </table>

        <div class="panel-group" id="accordion1">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion1"
                           href="#collapseTwo">
                            Check Header link
                        </a>
                    </h4>
                </div>
                <div id="collapseTwo" class="panel-collapse collapse">
                    <div class="panel-body">
                        <table class="table table-striped table-bordered">
                            <tbody id="res_Containerheadererr">
                            </tbody>
                        </table>

                        <table class="table table-striped table-bordered" id="corTable0">
                            <tbody id="res_Containerheader">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>



        <div class="panel-group" id="accordion">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion"
                           href="#collapseOne">Check Footer link
                        </a>
                    </h4>
                </div>
                <div id="collapseOne" class="panel-collapse collapse">
                    <div class="panel-body">

                        <table class="table table-striped table-bordered">
                            <tbody id="res_Containerfootererr">
                            </tbody>
                        </table>

                        <table class="table table-striped table-bordered" id="corTable1">
                            <tbody id="res_Containerfooter">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>



    </div>
</div>
    </div>
</template>
<script type="text/javascript">
    var qs = require('qs');
    import axios from 'axios';
    import  bus from '../assets/eventBus';
    export default{
        data(){
            return{
                url:'',
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
                  vm.url=this.result;
                };
            },
            btnClear(){
                this.url='';
            },
            btnQuest(){
                var storedData;
                let vm = this;
                if(vm.url.length > 5){
                    document.getElementById('res_Containererr').innerHTML=``;
                    document.getElementById('res_Container').innerHTML=``;
                    document.getElementById('res_Containerheadererr').innerHTML=``;
                    document.getElementById('res_Containerheader').innerHTML=``;
                    document.getElementById('res_Containerfootererr').innerHTML=``;
                    document.getElementById('res_Containerfooter').innerHTML=``;
                    bus.$emit("show",true);
                    //var url_trim = url.value.replace(/(^\s*)|(\s*$)/g, "");
                    //axios.post('/api/link',{url:vm.url})
                    axios.post('/api/link',qs.stringify({ 'url': vm.url }))
                    .then(function(Jsondata){
                        bus.$emit("show",false);
                        storedData = Jsondata.data.data;
                        console.log(storedData);
                        if(Jsondata.data && Jsondata.data.result === true){
                            let str1 = ``,strerr = ``;
                            let strheader = ``,strheadererr = ``;
                            let strfooter = ``,strfootererr = ``;
                            let linkdata = Jsondata.data.data;

                            strerr+=`<tr><td>URL</td><td>Status</td><td>Error Message</td><td>Anchor Text</td><td>Resolved To</td><td>HTTP Code</td></tr>`;
                            str1+=`<tr><td>URL</td><td>Status</td><td>Anchor Text</td><td>Resolved To</td><td>HTTP Code</td></tr>`;

                            strheadererr+=`<tr><td>URL</td><td>Status</td><td>Error Message</td><td>Anchor Text</td><td>Resolved To</td><td>HTTP Code</td></tr>`;
                            strheader+=`<tr><td>URL</td><td>Status</td><td>Anchor Text</td><td>Resolved To</td><td>HTTP Code</td></tr>`;

                            strfootererr+=`<tr><td>URL</td><td>Status</td><td>Error Message</td><td>Anchor Text</td><td>Resolved To</td><td>HTTP Code</td></tr>`;
                            strfooter+=`<tr><td>URL</tdv><td>Status</td><td>Anchor Text</td><td>Resolved To</td><td>HTTP Code</td></tr>`;

                            if(linkdata[0]){
                                linkdata[0].forEach((value,n)=>{
                                    if(value){
                                        if (value.status === "failed") {
                                            strheadererr += `<tr><td> <a href="${value.href}" target="_blank">${value.href}</a></td><td class='red'>${value.status}</td>
                                                    <td class='red'>${value.message}</td><td>${value.text}</td><td>${value.toWWW}</td><td class="red" >${value.statusCode}</td></tr>`;
                                            document.getElementById('res_Containerheadererr').innerHTML=strheadererr;
                                        } else {
                                            strheader += `<tr><td> <a href="${value.href}" target="_blank">${value.href}</a></td><td >${value.status}</td><td>${value.text}</td><td>${value.toWWW}</td>
                                                   <td>${value.statusCode}</td></tr>`;
                                            document.getElementById('res_Containerheader').innerHTML=strheader;
                                        }
                                    }
                                })
                            }
                            if(linkdata[1]){
                                linkdata[1].forEach((value,n)=>{
                                    if(value){
                                        if (value.status === "failed") {
                                            strerr += `<tr><td> <a href="${value.href}" target="_blank">${value.href}</a></td><td class='red'>${value.status}</td>
                                                    <td class='red'>${value.message}</td><td>${value.text}</td><td>${value.toWWW}</td><td class="red" >${value.statusCode}</td></tr>`;
                                            document.getElementById('res_Containererr').innerHTML=strerr;
                                        } else {
                                            str1 += `<tr><td> <a href="${value.href}" target="_blank">${value.href}</a></td><td >${value.status}</td><td>${value.text}</td><td>${value.toWWW}</td>
                                                   <td>${value.statusCode}</td></tr>`;
                                            document.getElementById('res_Container').innerHTML=str1;
                                        }
                                    }
                                })
                            }
                            if(linkdata[2]){
                                linkdata[2].forEach((value,n)=>{
                                    if(value){
                                        if (value.status === "failed") {
                                            strfootererr += `<tr><td> <a href="${value.href}" target="_blank">${value.href}</a></td><td class='red'>${value.status}</td>
                                                    <td class='red'>${value.message}</td><td>${value.text}</td><td>${value.toWWW}</td><td class="red" >${value.statusCode}</td></tr>`;
                                            document.getElementById('res_Containerfootererr').innerHTML=strfootererr;

                                        } else {
                                            strfooter += `<tr><td> <a href="${value.href}" target="_blank">${value.href}</a></td><td >${value.status}</td><td>${value.text}</td><td>${value.toWWW}</td>
                                                   <td>${value.statusCode}</td></tr>`;
                                            document.getElementById('res_Containerfooter').innerHTML=strfooter;
                                        }
                                    }
                                })
                            }
                        }else{
                            console.log(Jsondata.data);
                        }
                    })
                    .catch(function(err){
                        alert('qFalse');
                    })
                } else {
                    console.log("The URL length is too short!");
                }
            },
            btnExport(){
                alert('btnExport');
                if(this.url.length > 0){
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
                    vm.$http.post(`/api/export`,{
                        data:JSON.stringify(storedData),
                        title:'Link Report',
                        file:'link'
                    },(data)=>{
                        $.fileDownload(`/api/files/${data}`);
                    })
                }
            }
        }
    }
</script>