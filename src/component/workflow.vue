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
                            <input type="checkbox" v-model='checked' @click='checkedAll' v-bind:id='checked_all'>All
                            <div v-for='checkb in checkboxData'>
                                <input type="checkbox" name="checker" v-model='checkboxModel' v-bind:id='checkb.id' v-bind:value='checkb.value'>{{checkb.value}}
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
            <div class="panel panel-default meta_res" v-show="meta_res">
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
            <div class="panel panel-default font_res" v-show="font_res">
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

        <div class="panel panel-default link_res" v-show="link_res">
        <h5 class="panel-title">
            <button class="btn btn-info btn-large btn-block"><a data-toggle="collapse" data-parent="#accordion"
                                                                href="#collapseThree"> &#10144 Link Result </a></button>
        </h5>
        <div id="collapseThree" class="panel-collapse collapse">
        <table class="table table-striped table-bordered" style="margin:10px 0px">
            <tbody id="res_Container_linkerr">
            </tbody>
        </table>

        <table class="table table-striped table-bordered" id="corTable" style="margin:10px 0px">
            <tbody id="res_Container_link">
            </tbody>
        </table>

        <div class="panel-group">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" href="#collapse_head">
                            Check Header link
                        </a>
                    </h4>
                </div>
                <div id="collapse_head" class="panel-collapse collapse">
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
                        <a data-toggle="collapse" href="#collapse_foot">
                            Check Footer link
                        </a>
                    </h4>
                </div>
                <div id="collapse_foot" class="panel-collapse collapse">
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





<div class="panel panel-default vpath_res" v-show="vpath_res">
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
<div class="panel panel-default view_res" v-show="view_res">
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
<div class="panel panel-default foot_res" v-show="foot_res">
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

<div class="panel panel-default copy_res" v-show="copy_res">
        <h5 class="panel-title">
            <button class="btn btn-info btn-large btn-block"><a data-toggle="collapse" data-parent="#accordion"
                                                                href="#collapseSeven"> &#10144 Copy Result </a></button>
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
import  bus from '../assets/eventBus';
import axios from 'axios';
    function common(event) {
        $(".copy_equ").toggle();
    }
        function version(event){
        if($(".watch-version").css("display")=="none"){
            $(".watch-version").show();
            $(".watch-band").hide();
            $(".watch-dial").hide();
        }else{
            $(".watch-version").hide();
        }
    }
    function band(event){
        if($(".watch-band").css("display")=="none"){
            $(".watch-band").show();
            $(".watch-version").hide();
            $(".watch-dial").hide();
        }else{
            $(".watch-band").hide();
        }
    }
    function dial(event){
        if($(".watch-dial").css("display")=="none"){
            $(".watch-dial").show();
            $(".watch-band").hide();
            $(".watch-version").hide();
        }else{
            $(".watch-dial").hide();
        }
    }
        function samewithUS(url,geo,urlUS){
        let flag=false;


        let arrUrl = url.split("//");
        let start = arrUrl[1].indexOf("/");
        let relUrl = arrUrl[1].substring(start);

        let arrUrlus = urlUS.split("//");
        let startus = arrUrlus[1].indexOf("/");
        let relUrlus = arrUrlus[1].substring(startus);


        console.log(relUrl.substring(3));
        console.log(relUrlus);

        if (geo=="HKEN") {
           if(relUrl.substring(6)==relUrlus.substring()){
               return flag=true;
           }else{
               return flag=false;
           }

        }else{
            if(relUrl.substring(3)==relUrlus){
                return flag=true;

            }else{
                return flag=false;
            }
        }
       return flag;

    }
    function FormateURL(url) {

        var myURL = parseURL(url);

        return "https://www.apple.com" + myURL.path;

    };
    function parseURL(url) {
        var a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,

            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
    };
    function isContainstar(str1) {
        let flag = false;
        if (str1) {
            if (str1.length === 0) return flag;
            if (str1.indexOf('*') >= 0) {
                flag = true;
            }
        }
        return flag;
    }
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
              function ctitle(geo) {
              let s = "";
              switch (geo){
                  case "CN":s="中国";break;
                  case "HKTC":s="香港";break;
                  case "HKEN":s="HK";break;
                  case "TW":s="台灣";break;
                  case "MO":s="澳門";break;
                  default:s ="";
              }
                return s;
              }

    function islocalized(url,geo){
        let flag=false;

        if (geo=="HKTC") {
            if (url.indexOf("hk") !== -1 &&url.indexOf("/hk/en/") == -1){
                flag=true;
            }

        }else if(geo=="HKEN"){
            if (url.indexOf("/hk/en/") !== -1){
                flag=true;
            }
        }else if(url.indexOf(geo.toLowerCase()) !== -1){
            flag=true;
        }
        return flag;
    }
  export default{
    data(){
        return{
            url:'',
            checked_all:'all',
            checkboxData:[{
                id:'meta',
                value:'Meta Checker'
            },{
                id:'font',
                value:'Font Checker'
            },{
                id:'link',
                value:'Link Checker'
            },{
                id:'vpath',
                value:'V-Path Checker'
            },{
                id:'viewport',
                value:'Viewport Checker'
            },{
                id:'footnote',
                value:'Footnote Checker'
            },{
                id:'copy',
                value:'Copy Checker'
            }],
            checkboxModel:[],
            checked:false,
            meta_res:false,
            font_res:false,
            link_res:false,
            vpath_res:false,
            view_res:false,
            foot_res:false,
            copy_res:false
        }
    },
        methods:{
            checkedAll(){
                var _this = this;
                if(this.checked){
                    _this.checkboxModel = [];
                }else{
                    _this.checkboxModel = [];
                    for(var item in _this.checkboxData){
                    //_this.checkboxData.forEach(function([item]){
                        //_this.checkboxModel.push([item].value);
                        _this.checkboxModel.push(_this.checkboxData[item].value)
                    };
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
                this.url='';
            },
            btnQuest(){
                let vm = this;
                var qs = require('qs');
                var storedData;
                var option;
                if(this.url.length > 5){
                    bus.$emit("show",true);
                    let strMeta = ``, strFont = ``, strVpath = ``, strViewport = ``, strFootnote = ``,strCopylive = ``, strCopybranch = ``, strCopyequ = ``;
                    let strwatchstyle = ``, strwatchband = ``, strwatchface = ``;
                    let strLinkerr = ``, strLink = ``, strheadererr = ``, strheader = ``, strfootererr = ``, strfooter = ``;

                    var chk_val = {};
                    let input = document.body.querySelectorAll("input[type='checkbox']");
                    for(var i = 0;i < input.length;i++){
                        if(input[i].checked==true){
                            chk_val[input[i].id]='true';
                        }else{
                            chk_val[input[i].id]='false';
                        }
                    };
                    option = JSON.stringify(chk_val);
                    console.log(option);
                    axios.post('api/workflow',qs.stringify({ 'url': vm.url, 'option' : option }))
                    .then(function(data){
                        console.log(data.data);
                        bus.$emit("show",false);
                        
                        if(data.data.result === true){
                            if (data.data.data.meta) {
                                vm.meta_res=true;
                                let checkdata = '';
                                checkdata = data.data.data.meta;
                                storedData = checkdata;
                                for(let item in checkdata){
                                // checkdata.forEach(([item], index) => {
                                    strMeta += ``;
                                    let cdi = checkdata[item];
                                    if (cdi.desc != "Bad Link") {
                                        let geoname = ctitle(cdi.geo);
                                        let ptitle = cdi.title;
                                        let flag = "";
                                        if (cdi.geo == "US") {
                                            flag = 1;
                                        } else {
                                            flag = ptitle.indexOf(geoname);
                                        }
                                        strMeta += `<tr><td valign="middle" bgcolor="#f9f9f9" class="f1">URL: </td><td bgcolor="#f9f9f9" class="headline" bgcolor="#175b96" colspan="2"><a href="${cdi.url}" target="_blank"> ${cdi.url}</a></td></tr>`;
                                        strMeta += `<tr><th></th><th style="text-align:center">Geo</th><th style="text-align:center">US</th></tr>`;
                                        strMeta += `<tr><td>Title:</td><td ${flag > 0 ? "" : "class='red'"}><div>${cdi.title ? cdi.title : "null"}</div></td><td><div>${cdi.titleUS ? cdi.titleUS : ""}</div></td></tr>`;


                                        strMeta += `<tr><td>Description:</td><td${cdi.desc ? ((cdi.desc.length > 150 || cdi.desc.length < 100) ? " class='red'" : "") : ""}>${cdi.desc ? cdi.desc : "null"}(${cdi.desc ? cdi.desc.length : "0"})</td>`;
                                        strMeta += `<td>${cdi.descUS ? cdi.descUS : "null"}</td></tr>`;

                                        strMeta += `<tr><td>OG Title:</td><td>${cdi.ogTitle ? cdi.ogTitle : "null"}</td>`;
                                        strMeta += `<td>${cdi.ogTitleUS ? cdi.ogTitleUS : "null"}</td></tr>`;


                                        strMeta += `<tr><td>OG URL:</td><td><a ${cdi.ogUrl ? ( ((cdi.ogUrl.indexOf('https') == -1) || (islocalized(cdi.ogUrl, cdi.geo) == false)) ? "class='red'" : "") : ""}href="${cdi.ogUrl ? cdi.ogUrl : ""}" target="_blank">${cdi.ogUrl ? cdi.ogUrl : "null"}</a></td>`;
                                        strMeta += `<td><a  href="${cdi.ogUrlUS}" target="_blank">${cdi.ogUrlUS}</a></td></tr>`;


                                        strMeta += `<tr><td>OG Description:</td><td${cdi.ogDesc ? ((cdi.ogDesc.length > 150 || cdi.ogDesc.length < 100) ? " class='red'" : "") : ""}>${cdi.ogDesc ? cdi.ogDesc : "null"}(${cdi.ogDesc ? cdi.ogDesc.length : "0"})</td>`;
                                        strMeta += `<td>${cdi.ogDescUS ? cdi.ogDescUS : ""}</td></tr>`


                                        strMeta += `<tr><td>OG Image:</td><td><img src="${cdi.oglab ? cdi.oglab : "null"}" alt="oglab" style="width:60px;height:60px"><br>
                                        <a ${cdi.oglab ? ( (cdi.oglab.indexOf('https') == -1) ? "class='red'" : "") : ""} href="${cdi.oglab ? cdi.oglab : ""}" target="_blank">${cdi.oglab ? cdi.oglab : ""}</a> </td>`;
                                        strMeta += `<td><img src="${cdi.ogImageUS ? cdi.ogImageUS : "null"}" alt="ogImageUS" style="width:60px;height:60px"><br><a  href="${cdi.ogImageUS ? cdi.ogImageUS : ""}" target="_blank">${cdi.ogImageUS ? cdi.ogImageUS : "null"}</a></td></tr>`;


                                        strMeta += `<tr><td>OG Image Current Server:</td><td><img src="${cdi.ogImage.url ? cdi.ogImage.url : 'null'}" alt="ogImage" style="width:60px;height:60px"><br>
                                        Width:${cdi.ogImage.size ? cdi.ogImage.size.width : ''}.Hight:${cdi.ogImage.size ? cdi.ogImage.size.height : ''} <br>
                                        <a ${cdi.ogImage.url ? ( (cdi.ogImage.url.indexOf('https') == -1) ? "class='red'" : "") : ""}  href="${cdi.ogImage.url ? cdi.ogImage.url : ''}" target="_blank">${cdi.ogImage.url ? cdi.ogImage.url : ''}</a></td><td><img src="${cdi.ogImageUScur ? cdi.ogImageUScur : ''}" alt="ogImageUScUR" style="width:60px;height:60px"><br><a href="${cdi.ogImageUScur ? cdi.ogImageUScur : ""}" target="_blank">${cdi.ogImageUScur ? cdi.ogImageUScur : ""}</a></td></tr>`;

                                        if (cdi.geo == "CN") {
                                            strMeta += `<tr><td>WeChat Image:</td><td><img src="${cdi.wechat.url ? cdi.wechat.url : "null"}" alt="wachatImage" style="width:60px;height:60px"><br>
                                            Width:${cdi.wechat.size ? cdi.wechat.size.width : "null"}.Hight:${cdi.wechat.size ? cdi.wechat.size.height : "null"} <br>
                                            <a href="${cdi.wechat.url ? cdi.wechat.url : ""}" target="_blank">${cdi.wechat.url ? cdi.wechat.url : ""}</a> </td><td>N/A</td></tr>`;
                                        }
                                    }
                                }
                            } else {
                                vm.meta_res=false
                            }//meta
                            if (data.data.data.font) {
                                vm.font_res=true;
                                let checkdata = "";
                                checkdata = data.data.data.font;
                                storedData = checkdata;
                                console.log(checkdata);
                                for(let m in checkdata){
                                    let cdi = checkdata[m];
                                    strFont += `<tr><td>URL:</td><td><a href="${cdi.url}" target="_blank">${cdi.url}</a></td></tr>`;
                                        for(let n in cdi.data){
                                            strFont += `<tr><td>${n}</td><td>`;
                                            console.log('zxc');
                                            if (cdi.data[n].length > 0) {
                                                console.log('cvb');
                                                for (let x in cdi.data[n]) {
                                                    strFont += `${cdi.data[n][x].word}[${cdi.data[n][x].code}], `;
                                                    console.log('eqr');
                                                };
                                                strFont += `</td></tr>`;
                                            } else {
                                                strFont += `No Font Missing`;
                                            }
                                    };
                                }
                            } else {
                                vm.font_res=false
                            }//font
                            if (data.data.data.link) {
                                vm.link_res=true;
                                let checkdata = "";
                                checkdata = data.data.data.link;
                                storedData = checkdata;
                                strLinkerr += `<tr><td width="250px">URL</td><td width="80px">Status</td><td>Error Message</td><td>Anchor Text</td><td>Resolved To</td><td>HTTP Code</td></tr>`;
                                strLink += `<tr><td width="250px">URL</td><td width="80px">Status</td><td>Anchor Text</td><td>Resolved To</td><td>HTTP Code</td></tr>`;
                                strheadererr+=`<tr><td width="250px">URL</td><td width="80px">Status</td><td>Error Message</td><td>Anchor Text</td><td>Resolved To</td><td>HTTP Code</td></tr>`;
                                strheader+=`<tr><td width="250px">URL</td><td width="80px">Status</td><td>Anchor Text</td><td>Resolved To</td><td>HTTP Code</td></tr>`;
                                strfootererr+=`<tr><td width="250px">URL</td><td width="80px">Status</td><td>Error Message</td><td>Anchor Text</td><td>Resolved To</td><td>HTTP Code</td></tr>`;
                                strfooter+=`<tr><td width="250px">URL</tdv><td width="80px">Status</td><td>Anchor Text</td><td>Resolved To</td><td>HTTP Code</td></tr>`;
                                for(let n in checkdata[0]){
                                    let value = checkdata[0][n];
                                    if (value.status === "failed") {

                                        strheadererr += `<tr><td> <a href="${value.href}" target="_blank">${value.href}</a></td><td ${(value.status === "failed" ) ? " class='red'" : ""}>${value.status}</td>
                                                <td ${(value.status === "failed" ) ? " class='red'" : ""}>${value.message}</td><td>${value.text}</td><td>${value.toWWW}</td><td class="red" >${value.statusCode}</td></tr>`;
                                        document.getElementById('res_Containerheadererr').innerHTML = strheadererr;

                                    } else {
                                        strheader += `<tr><td> <a href="${value.href}" target="_blank">${value.href}</a></td><td >${value.status}</td><td>${value.text}</td><td>${value.toWWW}</td>
                                               <td>${value.statusCode}</td></tr>`;
                                        document.getElementById('res_Containerheader').innerHTML = strheader;
                                    }
                                };
                                for(let n in checkdata[1]){
                                    let value = checkdata[1][n];

                                    if (value.status === "failed") {

                                        strLinkerr += `<tr><td> <a href="${value.href}" target="_blank">${value.href}</a></td><td ${(value.status === "failed" ) ? " class='red'" : ""}>${value.status}</td>
                                                <td ${(value.status === "failed" ) ? " class='red'" : ""}>${value.message}</td><td>${value.text}</td><td>${value.toWWW}</td><td class="red" >${value.statusCode}</td></tr>`;
                                        document.getElementById('res_Container_linkerr').innerHTML = strLinkerr;

                                    } else {
                                        strLink += `<tr><td> <a href="${value.href}" target="_blank">${value.href}</a></td><td >${value.status}</td><td>${value.text}</td><td>${value.toWWW}</td>
                                               <td>${value.statusCode}</td></tr>`;
                                        document.getElementById('res_Container_link').innerHTML = strLink;
                                    }
                                };
                                for(let n in checkdata[2]){
                                    let value = checkdata[2][n];

                                    if (value.status === "failed") {

                                        strfootererr += `<tr><td> <a href="${value.href}" target="_blank">${value.href}</a></td><td ${(value.status === "failed" ) ? " class='red'" : ""}>${value.status}</td>
                                                <td ${(value.status === "failed" ) ? " class='red'" : ""}>${value.message}</td><td>${value.text}</td><td>${value.toWWW}</td><td class="red" >${value.statusCode}</td></tr>`;
                                        document.getElementById('res_Containerfootererr').innerHTML = strfootererr;

                                    } else {
                                        strfooter += `<tr><td> <a href="${value.href}" target="_blank">${value.href}</a></td><td >${value.status}</td><td>${value.text}</td><td>${value.toWWW}</td>
                                               <td>${value.statusCode}</td></tr>`;
                                        document.getElementById('res_Containerfooter').innerHTML = strfooter;
                                    }
                                };
                            } else {
                                vm.link_res=false
                            }//link
                            if (data.data.data.vPath) {
                                vm.vpath_res=true;
                                let checkdata = "";
                                checkdata = data.data.data.vPath;
                                storedData = checkdata;
                                for(let m in checkdata){
                                    let value = checkdata[m];
                                    strVpath += `<tr><td colspan="2"><a href="${m}" target="_blank">${m}</a></td></tr>`;
                                    for (var i = 0; i < value.length; i++) {
                                        strVpath += `<tr><td ${value[i].flag == true ? "" : "class='red'"}>${html_encode(value[i].origin)}</td><td ${value[i].flag == true ? "" : "class='red'"}>${html_encode(value[i].us)}</td></tr>`;
                                    }
                                }
                            } else {
                                vm.vpath_res=false;
                            }//vpath
                            if (data.data.data.viewport) {
                                vm.view_res=true;
                                let checkdata = "";
                                checkdata = data.data.data.viewport;
                                storedData = checkdata;
                                strViewport += `<tr><th style="text-align:center">URL</th><th style="text-align:center">ViewPort</th><th style="text-align:center">Result</th></tr>`;
                                //checkdata.forEach((item, index) => {
                                for(let m in checkdata){
                                    let item = checkdata[m];
                                    strViewport += `<tr><td><a href="${item.url}" target="_blank">${item.url}</a></td><td>${item.viewport}</td><td ${(item.flag == false ) ? " class='red'" : ""}>${item.flag}</td></tr>`;
                                }
                            } else {
                                vm.view_res=false;
                            }//viewport
                            if (data.data.data.footnote) {
                                vm.foot_res=true;
                                let checkdata = "";
                                checkdata = data.data.data.footnote;
                                storedData = checkdata;
                                strFootnote += `<tr><th style="text-align:center">Sort</th><th style="text-align:center" width="40%">FootNote</th><th style="text-align:center" width="40%">☞Copy</th></tr>`;
                                for(let n in checkdata){
                                //$.each(checkdata, function (n, value) {
                                    let footnotes = checkdata[n].data.data;
                                    strFootnote += `<tr><td colspan="3"><a href="${checkdata[n].url}" target="_blank">${checkdata[n].url}</td>`;
                                    let arrlen = footnotes.length;
                                    strFootnote += ``;
                                    for (let i = 0; i < arrlen; i++) {
                                        strFootnote += `<tr><td></td><td ${footnotes[i].copy == "" ? "class='red'" : ""} >${footnotes[i].mark} ${isContainstar(footnotes[i].mark) ? " " : "."} ${footnotes[i].footnote}</td>
                                        <td ${footnotes[i].footnote == "" ? "class='red'" : ""}>${footnotes[i].copy}</td></tr>`;
                                    };
                                    strFootnote += `<tr><td>Un-sorted</td><td colspan="2">`;
                                    let irrlen = checkdata[n].data.irrelevance.length;
                                    let irr = checkdata[n].data.irrelevance;
                                    for (let j = 0; j < irrlen; j++) {
                                        strFootnote += `&#9829 ${irr[j]}<br>`;
                                    };
                                    strFootnote += `</td></tr>`;
                                }
                            } else {
                                vm.foot_res=false;
                            }//footnote
                            if (data.data.data.copy) {
                                vm.copy_res=true;
                                let checkdata = "";
                                checkdata = data.data.data.copy;
                                storedData = checkdata;
                                let watchurl = checkdata[0];
                                let maxlength=(checkdata[2].length>checkdata[3].length?checkdata[2].length:checkdata[3].length);
                                if (watchurl.indexOf("/interactive-gallery") === -1) {
                                    strCopylive += `<tr><td width="50%">&diams;&#9785;&diams; Production &diams;&#9785;&diams;</td><td width="50%">&diams;&#9785;&diams; Branch &diams;&#9785;&diams;</td></tr>`;
                                    strCopylive += `<tr><td><a href="${FormateURL(checkdata[0])}" target="_blank">${FormateURL(checkdata[0])}</a></td><td><a href="${checkdata[0]}" target="_blank">${checkdata[0]}</a></td></tr>`;
                                    if(checkdata[2].length==0 && checkdata[3].length==0){
                                            strCopylive += `<tr><td class='red' style="border-right:1px solid #ddd">No added content</td><td class='red'>No added content</td></tr>`;

                                        }
                                        if(checkdata[2].length==0 &&checkdata[3].length!=0){
                                            strCopylive += `<tr><td class='red' style="border-right:1px solid #ddd">No added content</td><td class='red'>${checkdata[3][0]?checkdata[3][0]:""}</td></tr>`;
                                            for (var x = 1; x < maxlength; x++) {
                                                strCopylive += `<tr><td></td><td class='red'>${checkdata[3][x]?checkdata[3][x]:""}</td></tr>`;
                                            }
                                        }
                                        if(checkdata[2].length!=0 &&checkdata[3].length==0){
                                            strCopylive += `<tr><td class='red' style="border-right:1px solid #ddd">${checkdata[2][0]?checkdata[i][2][0]:""}</td><td class='red'>No added content</td></tr>`;
                                            for (var x = 1; x < maxlength; x++) {
                                                strCopylive += `<tr><td class='red' style="border-right:1px solid #ddd">${checkdata[2][x]?checkdata[2][x]:""}</td><td></td></tr>`;
                                            }
                                        }
                                        if(checkdata[3].length!=0 &&checkdata[2].length!=0){
                                            for (var x = 0; x < maxlength; x++) {
                                                strCopylive += `<tr><td class='red' style="border-right:1px solid #ddd">${checkdata[2][x]?checkdata[2][x]:""}</td><td class='red'>${checkdata[3][x]?checkdata[3][x]:""}</td></tr>`;
                                            }
                                        }

                                    // Below table is Equivalent table;
                                    strCopyequ += `<tr onclick="common(event)"><td>&diams;&#9786;&diams; Equivalent &diams;&#9786;&diams;</td></tr>`;
                                    strCopyequ += `<tr class="copy_equ"><td><a href="${checkdata[0]}" target="_blank">${checkdata[0]}</a><br>
                                        <a href="${FormateURL(checkdata[0])}" target="_blank">${FormateURL(checkdata[0])}</a></td></tr>`;
                                    for (var x = 0; x < checkdata[1].length; x++) {
                                        strCopyequ += `<tr class="copy_equ"><td>${checkdata[1][x]}</td></tr>`;
                                    }
                                } else {
                                    strwatchstyle += `<tr><td colspan="5" bgcolor="#175b96" class="f1"><a href="${checkdata[0]}" target="_blank">${checkdata[0]}</a></td></tr>`;
                                    strwatchstyle += `<tr><td style="font-weight: bold;width:15%" >ID</td><td style="font-weight: bold;width:13%" >Item</td><td style="font-weight: bold;width:24%" >Geo</td><td style="font-weight: bold;width:24%" >WWW</td><td style="font-weight: bold;width:24%" >US</td></tr>`;
                                    strwatchstyle += `<tr><td colspan="5" bgcolor="#1e90ff" class="f1" onclick="version(event)">表款</td></tr>`;
                                    for (var y = 0; y < checkdata[1].length; y++) {
                                        strwatchstyle += `<tr class="watch-version"><td>${checkdata[1][y][0]}</td><td>aria-label:</td><td ${checkdata[1][y][2]['aria-label']==checkdata[1][y][1]['aria-label'] ? "" : "class='red'"}>${checkdata[1][y][2]['aria-label']}</td><td>${checkdata[1][y][1]['aria-label']}</td><td>${checkdata[1][y][3]['aria-label']}</td></tr>`;
                                        strwatchstyle += `<tr class="watch-version"><td></td><td>data-band-name:</td><td ${checkdata[1][y][2]['data-band-name']==checkdata[1][y][1]['data-band-name'] ? "" : "class='red'"}>${checkdata[1][y][2]['data-band-name']}</td><td>${checkdata[1][y][1]['data-band-name']}</td><td>${checkdata[1][y][3]['data-band-name']}</td></tr>`;
                                        strwatchstyle += `<tr class="watch-version"><td></td><td>data-casing-name:</td><td ${checkdata[1][y][2]['data-casing-name']==checkdata[1][y][1]['data-casing-name'] ? "" : "class='red'"}>${checkdata[1][y][2]['data-casing-name']}</td><td>${checkdata[1][y][1]['data-casing-name']}</td><td>${checkdata[1][y][3]['data-casing-name']}</td></tr>`;
                                        strwatchstyle += `<tr class="watch-version"><td></td><td>data-size:</td><td ${checkdata[1][y][2]['data-size']==checkdata[1][y][1]['data-size'] ? "" : "class='red'"}>${checkdata[1][y][2]['data-size']}</td><td>${checkdata[1][y][1]['data-size']}</td><td>${checkdata[1][y][3]['data-size']}</td></tr>`;
                                        strwatchstyle += `<tr class="watch-version"><td></td><td>data-sku-model:</td><td ${checkdata[1][y][2]['data-sku-model']==checkdata[1][y][1]['data-sku-model'] ? "" : "class='red'"}>${checkdata[1][y][2]['data-sku-model']}</td><td>${checkdata[1][y][1]['data-sku-model']}</td><td>${checkdata[1][y][3]['data-sku-model']}</td></tr>`;

                                    };

                                    strwatchband += `<tr><td colspan="5" bgcolor="#1e90ff" class="f1" onclick="band(event)">表带</td></tr>`;
                                    for (var z = 0; z < checkdata[2].length; z++) {
                                        strwatchband += `<tr class="watch-band"><td>${checkdata[2][z][0]}</td><td>aria-label:</td><td ${checkdata[2][z][2]['aria-label']==checkdata[2][z][1]['aria-label'] ? "" : "class='red'"}>${checkdata[2][z][2]['aria-label']}</td><td>${checkdata[2][z][1]['aria-label']}</td><td>${checkdata[2][z][3]['aria-label']}</td></tr>`;
                                        strwatchband += `<tr class="watch-band"><td></td><td>data-background:</td><td ${checkdata[2][z][2]['data-background']==checkdata[2][z][1]['data-background'] ? "" : "class='red'"} >${checkdata[2][z][2]['data-background']}</td><td >${checkdata[2][z][1]['data-background']}</td><td>${checkdata[2][z][3]['data-background']}</td></tr>`;
                                        strwatchband += `<tr class="watch-band"><td></td><td>data-band-available:</td><td ${checkdata[2][z][2]['data-band-available']==checkdata[2][z][1]['data-band-available'] ? "" : "class='red'"}>${checkdata[2][z][2]['data-band-available']}</td><td>${checkdata[2][z][1]['data-band-available']}</td><td>${checkdata[2][z][3]['data-band-available']}</td></tr>`;
                                        strwatchband += `<tr class="watch-band"><td></td><td>data-band-unavailable-copy:</td><td  ${checkdata[2][z][2]['data-band-unavailable-copy']==checkdata[2][z][1]['data-band-unavailable-copy'] ? "" : "class='red'"}>${checkdata[2][z][2]['data-band-unavailable-copy']}</td><td>${checkdata[2][z][1]['data-band-unavailable-copy']}</td><td>${checkdata[2][z][3]['data-band-unavailable-copy']}</td></tr>`;
                                        strwatchband += `<tr class="watch-band"><td></td><td>data-buy:</td><td ${checkdata[2][z][2]['data-buy']==checkdata[2][z][1]['data-buy'] ? "" : "class='red'"}>${checkdata[2][z][2]['data-buy']}</td><td>${checkdata[2][z][1]['data-buy']}</td><td>${checkdata[2][z][3]['data-buy']}</td></tr>`;
                                        strwatchband += `<tr class="watch-band"><td></td><td>data-hidden:</td><td ${checkdata[2][z][2]['data-hidden']==checkdata[2][z][1]['data-hidden'] ? "" : "class='red'"}>${checkdata[2][z][2]['data-hidden']}</td><td>${checkdata[2][z][1]['data-hidden']}</td><td>${checkdata[2][z][3]['data-hidden']}</td></tr>`;
                                        strwatchband += `<tr class="watch-band"><td></td><td>data-size:</td><td ${checkdata[2][z][2]['data-size']==checkdata[2][z][1]['data-size'] ? "" : "class='red'"}>${checkdata[2][z][2]['data-size']}</td><td>${checkdata[2][z][1]['data-size']}</td><td>${checkdata[2][z][3]['data-size']}</td></tr>`;

                                    };
                                    strwatchface += `<tr><td colspan="5" bgcolor="#1e90ff" class="f1" onclick="dial(event)">表盘</td></tr>`;
                                    for (var w = 0; w < checkdata[3].length; w++) {
                                        strwatchface += `<tr class="watch-dial"><td>${checkdata[3][w][0]}</td><td>aria-label:</td><td ${checkdata[3][w][2]['aria-label']==checkdata[3][w][1]['aria-label'] ? "" : "class='red'"}>${checkdata[3][w][2]['aria-label']}</td><td>${checkdata[3][w][1]['aria-label']}</td><td>${checkdata[3][w][3]['aria-label']}</td></tr>`;
                                        strwatchface += `<tr class="watch-dial"><td></td><td>data-animation:</td><td ${checkdata[3][w][2]['data-animation']==checkdata[3][w][1]['data-animation'] ? "" : "class='red'"}>${checkdata[3][w][2]['data-animation']}</td><td>${checkdata[3][w][1]['data-animation']}</td><td>${checkdata[3][w][3]['data-animation']}</td></tr>`;
                                        strwatchface += `<tr class="watch-dial"><td></td><td>data-animation-locale:</td><td ${checkdata[3][w][2]['data-animation-locale']==checkdata[3][w][1]['data-animation-locale'] ? "" : "class='red'"}>${checkdata[3][w][2]['data-animation-locale']}</td><td>${checkdata[3][w][1]['data-animation-locale']}</td><td>${checkdata[3][w][3]['data-animation-locale']}</td></tr>`;

                                    }
                                }
                            }else{
                                vm.copy_res=false;
                            }//copy

                        }
                        document.getElementById('res_Container_meta').innerHTML = strMeta;
                        document.getElementById('res_Container_font').innerHTML = strFont;
                        document.getElementById('res_Container_linkerr').innerHTML = strLinkerr;
                        document.getElementById('res_Container_link').innerHTML = strLink;
                        document.getElementById('res_Container_vpath').innerHTML = strVpath;
                        document.getElementById('res_Container_viewport').innerHTML = strViewport;
                        document.getElementById('res_Container_footnote').innerHTML = strFootnote;
                        document.getElementById('res_Container_copylive').innerHTML = strCopylive;
                        document.getElementById('res_Container_copyequ').innerHTML = strCopyequ;
                        document.getElementById('resConwatchStyle').innerHTML = strwatchstyle;
                        document.getElementById('resConwatchBand').innerHTML = strwatchband;
                        document.getElementById('resConwatchFace').innerHTML = strwatchface;
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
                    vm.$http.post(`/api/export`,{
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
<style>

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