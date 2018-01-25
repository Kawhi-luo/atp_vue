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
    var storedData;
    import  bus from '../assets/eventBus';
    export default{
        name:'app',
        data(){
            return{
                urls:""
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
                let urls = document.getElementById('urls');
                if(urls.value.length > 5){
                    document.getElementById('resContainer').innerHTML='';
                    document.getElementById('bg_loading').style.display="block";
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
                    const urls = document.getElementById('urls').value;

                    axios.post('api/font/url',{urls:urls,option:_option})
                    .then(function(Json_data){
                        document.getElementById('bg_loading').style.display="none";
                        if(Json_data.result === true){
                            let str1 = ``;
                            let arrdata = Json_data.data;
                            storedData = Json_data.data;
                            console.log(storedData);
                            arrdata.foreach((value,m)=>{
                                str1 += `<tr><td>URL:</td><td><a href="${value.url}" target="_blank">${value.url}</a></td></tr>`;
                                value.data.foreach((valueinter,n) => {
                                    str1 += `<tr><td>${n}</td><td>`;
                                    var x;
                                    console.log(valueinter.length);
                                    if(valueinter.length>0){
                                    for (x in valueinter){

                                        str1 += `${valueinter[x].word}[${valueinter[x].code}], `;
                                    };
                                    str1+=`</td></tr>`;
                                    }else{
                                        str1 +=`No Font Missing`;
                                    }
                                })
                                document.getElementById('resContainer').innerHTML=str1;
                            })
                        }
                    })
                    .catch(function(err){
                        alert('aFalse');
                    })

                } else {
                    console.log("The URL length is too short!");
                }
            },
            btnExport(){
                if(this.urls.length > 0){
                    console.log(storedData);
                    axios.post(`/api/export`,{
                        data:JSON.stringify(storedData),
                        title:'Font Report',
                        file:'font'
                    },(data)=>{
                        //$.fileDownload(`/api/files/${data}`);
                    })
                }
            }
        }
    }
</script>