<template id="path">
	<div>
		<h2 class="page-header">V-Path Checker</h2>
        <div class="row">
            <div class="col-md-3">
                <p>URL Import(.txt only)</p>
                <input class="form-control" type="file" id="fileInput">
                <span class="input-group-btn">
                    <input @click="btnImport" type="button" class="btn btn-primary" value="Import" id="btnImport"/>
                </span>
            </div>
            <div class="col-md-4">
                <p>URL Input (eg:https://webedit.apple.com/cn/apple-watch-series-3/)</p>
                <textarea rows="5" id="urls" class="form-control" v-model="urls"></textarea>
                <button @click="btnQuest" id="btnQuest" class="btn btn-primary">Query</button>
                <button @click="btnClear" id="btnClear" class="btn btn-primary">Clear</button>
                <button @click="btnExport" id="btnExport" class="btn btn-primary">Export</button>
            </div>
        </div>
        <br>
        <div>
            <table class="table table-striped table-bordered">
                <thead></thead>
                <tbody id="resContainer"></tbody>
            </table>
        </div>
    </div>
</template>
<script type="text/javascript">
    var storedData;
    function html_encode(str1) {
        let s = "";
        if (str1) {
            if (str1.length === 0) return "";
            s = str1
                .replace(/&/g, "&gt;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/ /g, "&nbsp;")
                .replace(/\'/g, "&#39;")
                .replace(/\"/g, "&quot;")
                .replace(/\n/g, "<br>")
                .replace(/ /g, "")
                .replace(/\t/g, "");
        }
        return s;
    }
    export default{
        data(){
            return{
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
                alert('btnClear');
                this.urls='';
            },
            btnQuest(){
                alert('btnQuest');
                let urls = document.getElementById('urls');
                if(urls.value.length > 5){
                    document.getElementById('resContainer').innerHTML='';
                    document.getElementById('bg_loading').style.display="block";
                    var urls_trim = urls.value.replace(/(^\s*)|(\s*$)/g, "");
                    axios.post('/api/vpath/url',{urls:urls_trim})
                    .then(function(res){
                        document.getElementById('bg_loading').style.display="none";
                        if (data) {
                            let str1 = ``;
                            storedData = data.data;
                            console.log(storedData);
                            str += `<tr><th>Geo-Vpath</th><th>US-Vpath</th></tr>`;
                            data.forEach((value, n) => {
                                str += `<tr><td colspan="2"><a href="${n}" target="_blank">${n}</td></tr>`;
                                for(var i=0;i<value.length;i++){
                                    str+=`<tr><td ${value[i].flag==true ? "" : "class='red'"}>${html_encode(value[i].origin)}</td><td ${value[i].flag==true ? "" : "class='red'"}>${html_encode(value[i].us)}</td></tr>`;
                            }
                                document.getElementById('resContainer').innerHTML=str;
                            })
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