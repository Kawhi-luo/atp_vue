<template id="workflow">
	<div>
		<h2 class="page-header">Workflow Checker</h2>
        <div id="trans" class="col-md-4 row">
            <div class="navslid trans-side navslid-show">
                <div>
                    <p>URL Input (eg:https://webedit.apple.com/cn/iphone/)</p>
                    <input type="text" class="form-control" id="url" name="url" placeholder="Please input URL" v-model="url">
                </div>
                <br>
                <div class="dropdown">
                    <div class="box">
                        <span>Please select which option you want to check or select All</span>
                        <div class="content">
                            <input type="checkbox" v-model='checked' @click='checkedAll'>All
                            <div v-for='checkb in checkboxData'>
                                <input type="checkbox" name="checker" v-model='checkboxModel' v-bind:value='checkb.id'>{{checkb.value}}
                            </div>
                        </div>
                    </div>
                    <button @click="btnQuest" id="btn_Quest" class="btn btn-primary">Query</button>
                    <button @click="btnClear" id="btn_Clear" class="btn btn-primary">Clear</button>
                    <button @click="btnExport" id="btn_Export" class="btn btn-primary">Export</button>
                </div>
            </div>
        </div>
        <div class="col-md-8 panel-group" id="accordion">
            <div class="panel panel-default meta_res" style="display: none">
                <h5 class="panel-title">
                    <button class="btn btn-info btn-large btn-block"><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne"> &#10144 Meta Result </a></button>
                </h5>
                <div id="collapseOne" class="panel-collapse collapse">
                    <table class="table table-striped table-bordered">
                        <thead></thead>
                        <tbody id="res_Container_meta"></tbody>
                    </table>
                </div>
            </div>
            <div class="panel panel-default font_res" style="display: none">
                <h5 class="panel-title">
                    <button class="btn btn-primary btn-large btn-block"><a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"> &#10144 Font Result </a></button>
                </h5>
                <div id="collapseTwo" class="panel-collapse collapse">
                    <table class="table table-striped table-bordered">
                        <thead></thead>
                        <tbody id="res_Container_font"></tbody>
                    </table>
                </div>
            </div>
            <div class="panel panel-default link_res" style="display: none">
                <h5 class="panel-title">
                    <button class="btn btn-info btn-large btn-block"><a data-toggle="collapse" data-parent="#accordion" href="#collapseThree"> &#10144 Link Result </a></button>
                </h5>
                <div id="collapseThree" class="panel-collapse collapse">
                    <table class="table table-striped table-bordered">
                        <thead></thead>
            <tbody id="res_Container_linkerr"></tbody>
            <tbody id="res_Container_link"></tbody>
        </table>
    </div>
</div>
<div class="panel panel-default vpath_res" style="display: none">
    <h5 class="panel-title">
        <button class="btn btn-primary btn-large btn-block"><a data-toggle="collapse" data-parent="#accordion" href="#collapseFour"> &#10144 V-Path Result </a></button>
    </h5>
    <div id="collapseFour" class="panel-collapse collapse">
        <table class="table table-striped table-bordered" id="vpath">
            <thead>
            </thead>
            <tbody id="res_Container_vpath">
            </tbody>
        </table>
    </div>
</div>
<div class="panel panel-default view_res" style="display: none">
    <h5 class="panel-title">
        <button class="btn btn-info btn-large btn-block"><a data-toggle="collapse" data-parent="#accordion" href="#collapseFive"> &#10144 ViewPort Result </a></button>
    </h5>
    <div id="collapseFive" class="panel-collapse collapse">
        <table class="table table-striped table-bordered">
            <thead>
            </thead>
            <tbody id="res_Container_viewport">
            </tbody>
        </table>
    </div>
</div>
<div class="panel panel-default foot_res" style="display: none">
    <h5 class="panel-title">
        <button class="btn btn-primary btn-large btn-block"><a data-toggle="collapse" data-parent="#accordion"
                                                               href="#collapseSix"> &#10144 Footnote Result </a>
        </button>
    </h5>
    <div id="collapseSix" class="panel-collapse collapse">
        <table class="table table-striped table-bordered">
            <thead>
            </thead>
            <tbody id="res_Container_footnote">
            </tbody>
        </table>
    </div>
</div>
<div class="panel panel-default copy_res" style="display: none">
    <h5 class="panel-title">
        <button class="btn btn-info btn-large btn-block"><a data-toggle="collapse" data-parent="#accordion" href="#collapseSeven"> &#10144 Copy Result </a></button>
    </h5>
    <div id="collapseSeven" class="panel-collapse collapse">
        <table class="table table-striped table-bordered">
            <thead></thead>
            <tr>
                <td>
                    <table width="100%">
                        <tbody id="res_Container_copylive"></tbody>
                    </table>
                </td>
                <td>
                    <table width="100%">
                        <tbody id="res_Container_copybran"></tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <table id="copyequ">
                    <tbody id="res_Container_copyequ"></tbody>
                </table>
            </tr>
        </table>
        <table>
            <tbody id="resConwatchStyle"></tbody>
        </table>
        <table>
            <tbody id="resConwatchBand"></tbody>
        </table>
        <table>
            <tbody id="resConwatchFace"></tbody>
        </table>
    </div>
</div>
</div>
</div>
</template>
<script type="text/javascript">

  export default{
    data(){
        return{
            url:'',
            checkboxData:[{
                id:'1',
                value:'Meta Checker'
            },{
                id:'2',
                value:'Font Checker'
            },{
                id:'3',
                value:'Link Checker'
            },{
                id:'4',
                value:'V-Path Checker'
            },{
                id:'5',
                value:'Viewport Checker'
            },{
                id:'6',
                value:'Footnote Checker'
            },{
                id:'7',
                value:'Copy Checker'
            }],
            checkboxModel:[],
            checked:false
        }
    },
        methods:{
            checkedAll(){
                var _this = this;
                if(this.checked){
                    _this.checkboxModel = [];
                }else{
                    _this.checkboxModel = [];
                    _this.checkboxData.forEach(function(item){
                        _this.checkboxModel.push(item.id);
                    });
                }
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
                    document.getElementById('bg_loading').style.display="block";
                    var url_trim = url.value.replace(/(^\s*)|(\s*$)/g, "");
                    axios.post('/api/vpath/url',{urls:url_trim})
                    .then(function(res){
                        document.getElementById('bg_loading').style.display="none";
                        if (data) {
                            }
                                document.getElementById('resContainer').innerHTML=str;
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
                let url = document.getElementById('url');
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
<style scoped>

    div.box span {
        color: #cc4444;
        font-style: italic;
        background-color: deepskyblue;
    }

    div.content {
        width: 250px;
        margin: 10px 0;
        padding: 20px;
        border: 2px solid #0099ff;
    }

    input[type='checkbox'] {
        margin: 5px;
    }

    input[type='button'] {
        height: 30px;
        margin: 10px;
        padding: 5px 10px;
    }

    td {
        border: 1px solid #ccc;
        height: 50px;

        font-size: 10pt;
        padding: 2px;
    }

    h5 a {
        display: inline-block;
        padding-top: 5px;
        color: #080808;
    }

    h5 span a:hover {
        color: #fff;
    }

    #vpath {
        table-layout: fixed;
    }

    #res_Container_vpath td {
        word-wrap: break-word;
    }

    table {
        width: 100%;
        table-layout: fixed;
    }

    table td {
        word-wrap: break-word;
    }
    .copy_equ{
        display: none;
    }
    .watch-version,.watch-band,.watch-dial{
        display: none;
    }
</style>