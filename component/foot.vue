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
    var storedData;
    
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
                    document.getElementById('resContainer').innerHtml='';
                    document.getElementById('bg_loading').style.display="block";
                    var urls_trim = urls.value.replace(/(^\s*)|(\s*$)/g, "");
                    axios.post('/api/footnote',{urls:urls_trim})
                    .then(function(data){
                        document.getElementById('bg_loading').style.display="none";
                        //console.log(data);
                        if (data) {
                            let str1 = ``;
                            storedData = data;
                            str += `<tr><th>Sort</th><th width="48%">FootNote</th><th width="48%">☞Copy</th></tr>`;
                            storedData.foreach((value,n)=>{
                                let footnotes = storedData[n].data.data;
                                console.log(storedData[n]);
                                str += `<tr><td colspan="3"><a href="${storedData[n].url}" target="_blank">${storedData[n].url}</td>`;
                                let arrlen =footnotes.length;
                                str+=``;
                                for(let i = 0; i < arrlen; i++){
                                    str +=`<tr><td></td><td ${footnotes[i].copy=="" ?"class='red'":""} >${footnotes[i].mark} ${isContainstar(footnotes[i].mark) ?" ":"."} ${footnotes[i].footnote}</td>
                                    <td ${footnotes[i].footnote=="" ?"class='red'":""}>${footnotes[i].copy}</td></tr>`;
                                }
                                str+=`<tr><td>Un-sorted</td><td colspan="2">`;

                                let irrlen=storedData[n].data.irrelevance.length;
                                let irr=storedData[n].data.irrelevance;
                                for (let j = 0; j < irrlen; j++) {
                                    str+=`&#9829 ${irr[j]}<br>`;
                                }
                                str+=`</td></tr>`;
                                document.getElementById('resContainer').innerHtml=str;
                            })
                        }else {
                            //console.log("null");
                        }
                    })
                    .catch(function(err){
                        alert('qFalse');
                    })
                } 
            },
            btnExport(){
                alert('btnExport');
                let urls = document.getElementById('urls');
                if(urls.value.length > 0){
                    console.log(storedData);
                    var arr = [];
                    storedData.foreach((value,n)=>{
                        arr.push({
                        url : value.url,
                        data:value.data,
                        irrelevance:value.irrelevance
                        });
                    })
                    axios.post(`/api/export`,{
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