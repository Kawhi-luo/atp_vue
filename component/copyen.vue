<template id="copyen">
	<div>
        <h2 class="page-header">Copy Checker (HKEN)</h2>
        <div class="row">

            <div class="col-md-4">
                <p>URL Input(eg:https://www.apple.com/hk/en/iphone)</p>

                <input type="text" class="form-control" id="url" name="url" v-model="url" placeholder="Please input URL" >
                VS
                <input type="text" class="form-control" id="url1" name="url1" v-model="url1" placeholder="Please input URL">
            </div>
            </br>

            <button id="btnQuest" class="btn btn-primary" @click="btnQuest">Query</button>
            <button id="btnClear" class="btn btn-primary" @click="btnClear">Clear</button>
           <!-- <button id="btnExport" class="btn btn-primary">Export</button>-->

        </div>
        <br>
        <div>
            <table width="100%" class="table table-striped table-bordered" id="diff" v-show="diff">
                <tr>
                    <td valign="top" width="25%">
                        <table class="table">
                            <thead>
                            </thead>
                            <tbody id="resContainer">
                            </tbody>
                        </table>
                    </td>
                    <td valign="top" width="25%">
                        <table class="table">
                            <thead>
                            </thead>
                            <tbody id="resContainerbranch">
                            </tbody>
                        </table>
                    </td>

                </tr>

            </table>
        </div>
    </div>
</template>
<script type="text/javascript">
    var qs = require('qs');
    var storedData;
    import  bus from '../assets/eventBus';
    import axios from 'axios';
    export default{
        data(){
            return{
                url:'',
                url1:'',
                diff:false
            }
        },
        methods:{
            btnClear(){
                this.url='';
                this.url1='';
            },
            btnQuest(){
                let vm = this;
                if(this.url.length > 5){
                    document.getElementById('resContainer').innerHTML=``;
                    bus.$emit("show",true);
                    let str = ``, str1 = ``;
                    let url1 = "";
                    let url2 = "";
                    let urlArr = [];
                    if (vm.url) {
                        urlArr.push(vm.url);
                        url1 = vm.url;
                    }
                    if (vm.url1) {
                        urlArr.push(vm.url1);
                        url1 = vm.url1;
                    }
                    console.log(urlArr);

                    // let url_arr = urlArr.toString();
                    // console.log(url_arr);
                    //Unexpected token h in JSON at position 0;

                    // let url_json = JSON.stringify(urlArr);
                    // console.log(url_json);
                    // console.log('laillalsdfahsfasghfkj')
                    // console.log(qs.stringify(urlArr));
                    // console.log(qs.stringify(url_arr));
                    // console.log(qs.stringify(url_json));
                    //The "path" argument must be of type string;

                    //vm.$http.post('/api/copyhken',{urls:url_trim})
                    // $.post('/api/copycustom', {url: JSON.stringify(urlArr)}, function (data) {
                    // // axios.post('/api/copycustom',qs.stringify({ 'url': urlArr }))
                    // // .then(function(data){
                    //     bus.$emit("show",false);
                    //     let storedData = data.data;
                    //     console.log(storedData);
                    //     console.log(storedData[0].length);
                    //     console.log(storedData[1].length);
                    //     if (storedData) {
                    //         vm.diff=true;

                    //         str += `<tr><td>&diams;&#9785;&diams; URL 1 &diams;&#9785;&diams;</td></tr>`;
                    //         str += `<tr><td><a href="${url1}" target="_blank">${url1}</a></td></tr>`;

                    //         if (storedData[0].length==0 ) {
                    //             str += `<tr><td class='red'>No added content</td></tr>`;
                    //         } else {
                    //             for (var x = 0; x < storedData[0].length; x++) {
                    //                 str += `<tr><td class='red'>${storedData[0][x]}</td></tr>`;
                    //             }
                    //         }
                    //         document.getElementById('resContainer').innerHTML=str;

                    //         str1 += `<tr><td>&diams;&#9785;&diams; URL 2  &diams;&#9785;&diams;</td></tr>`;
                    //         str1 += `<tr><td><a href="${url2}" target="_blank">${url2}</a></td></tr>`;
                    //         if (storedData[1].length==0) {
                    //             str1 += `<tr><td class='red'>No added content</td></tr>`;
                    //         } else {

                    //             for (var y = 0; y < storedData[1].length; y++) {
                    //                 str1 += `<tr><td class='red'>${storedData[1][y]}</td></tr>`;
                    //             }
                    //         }

                    //         document.getElementById('resContainerbranch').innerHTML=str1;

                    //     }
                    // })
                    // .catch(function(err){
                    //     alert('qFalse');
                    // })
                    $.post('/api/copycustom', {url: JSON.stringify(urlArr)}, function (data) {
                    // axios.post('/api/copycustom',qs.stringify({ 'url': urlArr }))
                    // .then(function(data){
                        bus.$emit("show",false);
                        let storedData = data;
                        console.log(storedData);
                        console.log(storedData[0].length);
                        console.log(storedData[1].length);
                        if (storedData) {
                            vm.diff=true;

                            str += `<tr><td>&diams;&#9785;&diams; URL 1 &diams;&#9785;&diams;</td></tr>`;
                            str += `<tr><td><a href="${url1}" target="_blank">${url1}</a></td></tr>`;

                            if (storedData[0].length==0 ) {
                                str += `<tr><td class='red'>No added content</td></tr>`;
                            } else {
                                for (var x = 0; x < storedData[0].length; x++) {
                                    str += `<tr><td class='red'>${storedData[0][x]}</td></tr>`;
                                }
                            }
                            document.getElementById('resContainer').innerHTML=str;

                            str1 += `<tr><td>&diams;&#9785;&diams; URL 2  &diams;&#9785;&diams;</td></tr>`;
                            str1 += `<tr><td><a href="${url2}" target="_blank">${url2}</a></td></tr>`;
                            if (storedData[1].length==0) {
                                str1 += `<tr><td class='red'>No added content</td></tr>`;
                            } else {

                                for (var y = 0; y < storedData[1].length; y++) {
                                    str1 += `<tr><td class='red'>${storedData[1][y]}</td></tr>`;
                                }
                            }

                            document.getElementById('resContainerbranch').innerHTML=str1;

                        }
                    })
                } else {
                    console.log("null");
                }
            },
            btnExport(){
                if(this.url.length > 0){
                    $.post(`/api/export`,{
                        data:JSON.stringify(storedData),
                        title:'Copy Report',
                        file:'copy'
                    },(data)=>{
                        $.fileDownload(`/api/files/${data}`);
                    })
                }
            }
        }
    }
</script>
<style>
    .f1 {
        color: white;
    }

    .f1 > a {
        color: white;
    }

    #diff {
        word-wrap: break-word;
        word-break: break-all
    }
</style>
