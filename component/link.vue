<template id="link">
	<div>
		<h2 class="page-header">Link Checker</h2>
        <div id="trans" class="row">
            <div class="col-md-4 navslid trans-side navslid-show">
                <div style="display:none;">
                    <p>URL Import(.txt only)</p>
                    <div class="input-group">
                        <input class="form-control" type="file" id="fileInput">
                        <span class="input-group-btn">
                            <input @click="btnImport" type="button" class="btn btn-primary" value="Import" id="import_Txt"/>
                        </span>
                    </div>
                </div>
                <p>URL Input (One URL only)</p>
                <p>(eg:https://www.apple.com/cn/iphone)</p>
                <p>
                    <input type="text" class="form-control" id="url" name="url" placeholder="Please input URL" v-model="url">
                </p>
                <div>
                    <button @click="btnQuest" id="btn_Quest" class="btn btn-primary">Query</button>
                    <button @click="btnClear" id="btn_Clear" class="btn btn-primary">Clear</button>
                </div>
            </div>
            <div class="col-md-7">
                Show:
                <input @click="failure" id="radioerr" name="criteria" type="radio" value="failure" >Failures
                <input @click="all" id="radioall" name="criteria" type="radio" value="all">all
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
    var storedData;
    export default{
        data(){
            return{
                url:''
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
                alert('btnClear');
                this.url='';
            },
            btnQuest(){
                alert('btnQuest');
                let url = document.getElementById('url');
                if(url.value.length > 5){
                    document.getElementById('resContainer').innerHTML='';
                    document.getElementById('resContainererr').innerHTML='';
                    const url = document.getElementById('url').value;
                    document.getElementById('bg_loading').style.display="block";
                    //var url_trim = url.value.replace(/(^\s*)|(\s*$)/g, "");
                    axios.post('/api/link',{url:url})
                    .then(function(Jsondata){
                        document.getElementById('bg_loading').style.display="none";  
                        storedData = Jsondata.data;
                        console.log(storedData);
                        if(Jsondata && Jsondata.result === true){
                            let str1 = ``;
                            let strerr = ``;
                            let linkdata = Jsondata.data;

                            strerr+=`<tr><td>URL</td><td>Status</td><td>Error Message</td><td>Anchor Text</td></tr>`;
                            str1+=`<tr><td>URL</td><td>Status</td><td>Anchor Text</td></tr>`;
                            linkdata.forEach((value,n)=>{
                                if(value.status === "failed"){
                                    strerr += `<tr><td> <a href="${value.href}" target="_blank">${value.href}</a></td><td ${(value.status === "failed" ) ? " class='red'" : ""}>${value.status}</td>
                                    <td ${(value.status === "failed" ) ? " class='red'" : ""}>${value.message}</td><td>${value.text}</td></tr>`;
                                    document.getElementById('resContainer').innerHTML=strerr;
                                }else{
                                    str1 += `<tr><td> <a href="${value.href}" target="_blank">${value.href}</a></td><td >${value.status}</td><td>${value.text}</td>
                                   </tr>`;
                                   document.getElementById('resContainer').innerHTML=str1;
                                }
                            })
                        }else{
                            console.log(Jsondata);
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
                    axios.post(`/api/export`,{
                        data:JSON.stringify(storedData),
                        title:'Link Report',
                        file:'link'
                    },(data)=>{
                        //$.fileDownload(`/api/files/${data}`);
                    })
                }
            }
        }
    }
</script>