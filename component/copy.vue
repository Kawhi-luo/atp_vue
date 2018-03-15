<template id="copy">
	<div>
		<h2 class="page-header">Copy Checker</h2>
		<div class="row">
			<div class="col-md-3">
				<p>URL Import (.txt only)</p>
				<input class="form-control" type="file" id="fileInput">
				<span class="input-group-btn">
					<input @click="btnImport" type="button" class="btn btn-primary" value="Import" id="btnImport"/>
				</span>
			</div>
			<div class="col-md-4">
				<p>URL Input(eg:https://www.apple.com/cn/iphone)</p>
				<textarea v-model="urls" rows="5" id="urls" class="form-control"></textarea>
				<button @click="btnQuest" id="btnQuest" class="btn btn-primary">Query</button>
				<button @click="btnClear" id="btnClear" class="btn btn-primary">Clear</button>
				<button @click="btnExport" id="btnExport" class="btn btn-primary">Export</button>
			</div>
		</div>
		<div>
			<table class="table table-striped table-bordered" id="diff" v-show="diff">
				<tr>
            <td valign="top">
                <table class="table" >

                    <thead>
                    </thead>
                    <tbody id="resContainer">
                    </tbody>
                </table>
            </td>
        </tr>
			</table>
		</div>
		<div class="panel-group" id="accordion" v-show="accordion">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h4 class="panel-title">
						<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Click Me to See Equivalent.</a>
					</h4>
				</div>
				<div id="collapseOne" class="panel-collapse collapse">
					<div class="panel-body">
						<table class="table">
							<thead></thead>
							<tbody id="resContainerequ"></tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div id="watchgallery" v-show="watchgallery">
			<table class="table table-striped table-bordered">
				<tbody id="resConwatchStyle"></tbody>
				<tbody id="resConwatchBand"></tbody>
				<tbody id="resConwatchFace"></tbody>
			</table>
		</div>
	</div>
</template>
<script type="text/javascript">
    var storedData;
    var qs = require('qs');
    import  bus from '../assets/eventBus';
    import axios from 'axios';
    function FormateURL(url) {

        var myURL = parseURL(url);

        return "https://www.apple.com" + myURL.relative;

    };
    function FormateUSURL(url) {

        var myURL = parseURL(url);
        var uspath = myURL.path.substring(7,);
        console.log(uspath);
        return myURL.protocol + "://" + myURL.host + "/" + uspath;

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
	export default{
        data(){
            return{
                urls:'',
                accordion:false,
                diff:false,
                watchgallery:false,
                resContainerequ:'',
                resContainer:'',
                resContainerbranch:'',
                resContainerus:'',
                resConwatchFace:'',
                resConwatchBand:'',
                resConwatchStyle:'',
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
                if(this.urls.length > 5){
                    document.getElementById('resContainer').innerHTML=``;
                    bus.$emit("show",true);
                    let str = ``;
                    let str1 = ``;
            		let strwatchstyle = ``, strwatchband = ``, strwatchface = ``;
                    let maxlength = ``;
                    var urls_trim = vm.urls.replace(/(^\s*)|(\s*$)/g, "");
                    axios.post('/api/copy',qs.stringify({ 'urls': urls_trim }))
                    .then(function(data){
                        bus.$emit("show",false);
                    	console.log(data);
                        if (data.data) {
                            vm.accordion=true;
                            vm.diff=true;
                            vm.watchgallery=false;
                            storedData = data.data;
                            str1 += `<th><td>&diams;&#9786;&diams; Equivalent &diams;&#9786;&diams;</td></th>`;
                            for (var i = 0; i < storedData.length; i++) {
                                if (storedData[i][0].indexOf("/interactive-gallery") === -1) {
                                    str += `<tr><td width="50%">&diams;&#9785;&diams; Production &diams;&#9785;&diams;</td><td width="50%">&diams;&#9785;&diams; Branch &diams;&#9785;&diams;</td></tr>`;
                                    str += `<tr><td><a href="${FormateURL(storedData[i][0])}" target="_blank">${FormateURL(storedData[i][0])}</a></td><td><a href="${storedData[i][0]}" target="_blank">${storedData[i][0]}</a></td></tr>`;
                                    maxlength=(storedData[i][2].length>storedData[i][3].length?storedData[i][2].length:storedData[i][3].length);
                                    if(storedData[i][2].length==0 && storedData[i][3].length==0){
                                        str += `<tr><td class='red' style="border-right:1px solid #ddd">No added content</td><td class='red'>No added content</td></tr>`;
                                    }
                                    if(storedData[i][2].length==0 &&storedData[i][3].length!=0){
                                        str += `<tr><td class='red' style="border-right:1px solid #ddd">No added content</td><td class='red'>${storedData[i][3][0]?storedData[i][3][0]:""}</td></tr>`;
                                        for (var x = 1; x < maxlength; x++) {
                                            str += `<tr><td></td><td class='red'>${storedData[i][3][x]?storedData[i][3][x]:""}</td></tr>`;
                                        }
                                    }
                                    if(storedData[i][2].length!=0 &&storedData[i][3].length==0){
                                        str += `<tr><td class='red' style="border-right:1px solid #ddd">${storedData[i][2][0]?storedData[i][2][0]:""}</td><td class='red'>No added content</td></tr>`;
                                        for (var x = 1; x < maxlength; x++) {
                                            str += `<tr><td class='red' style="border-right:1px solid #ddd">${storedData[i][2][x]?storedData[i][2][x]:""}</td><td></td></tr>`;
                                        }
                                    }
                                    if(storedData[i][3].length!=0 &&storedData[i][2].length!=0){
                                        for (var x = 0; x < maxlength; x++) {
                                            str += `<tr><td class='red' style="border-right:1px solid #ddd">${storedData[i][2][x]?storedData[i][2][x]:""}</td><td class='red'>${storedData[i][3][x]?storedData[i][3][x]:""}</td></tr>`;
                                        }
                                    }
                                    str1 += `<tr><td><a href="${storedData[i][0]}" target="_blank">${storedData[i][0]}</a><br>
                                    <a href="${FormateURL(storedData[i][0])}" target="_blank">${FormateURL(storedData[i][0])}</a></td></tr>`;
                                    for (var x = 0; x < storedData[i][1].length; x++) {
                                        str1 += `<tr><td>${storedData[i][1][x]}</td></tr>`;
                                    }
                                    document.getElementById('resContainer').innerHTML=str;
                                    document.getElementById('resContainerequ').innerHTML=str1;
                                } else {
                                    vm.accordion=false;
                                    vm.diff=false;
                                    vm.watchgallery=true;
                                    strwatchstyle += `<tr><td colspan="5" bgcolor="#175b96" class="f1"><a href="${storedData[i][0]}" target="_blank">${storedData[i][0]}</a></td></tr>`;
                                    strwatchstyle += `<tr><td colspan="5"><table class="table table-striped table-bordered""><tr><td style="font-weight: bold;width:15%" >ID</td><td style="font-weight: bold;width:13%" >Item</td><td style="font-weight: bold;width:24%" >Geo</td><td style="font-weight: bold;width:24%" >WWW</td><td style="font-weight: bold;width:24%" >US</td></tr></table></td></tr>`;


                                    strwatchstyle += `<tr data-toggle="collapse" data-parent="#accordion" href="#version"><td colspan="5" bgcolor="#1e90ff" class="f1">表款</td></tr>`;

                                    strwatchstyle += `<tr id="version" class="panel-collapse collapse"><td colspan="5"><table class="table table-striped table-bordered">`;
                                    for (var y = 0; y < storedData[i][1].length; y++) {
                                        strwatchstyle += `<tr><td style="width:15%">${storedData[i][1][y][0]}</td><td style="width:13%">aria-label:</td><td style="width:24%" ${storedData[i][1][y][2]['aria-label']==storedData[i][1][y][1]['aria-label'] ? "" : "class='red'"}>${storedData[i][1][y][2]['aria-label']}</td><td style="width:24%">${storedData[i][1][y][1]['aria-label']}</td><td>${storedData[i][1][y][3]['aria-label']}</td></tr>`;
                                        strwatchstyle += `<tr><td></td><td>data-band-name:</td><td ${storedData[i][1][y][2]['data-band-name']==storedData[i][1][y][1]['data-band-name'] ? "" : "class='red'"}>${storedData[i][1][y][2]['data-band-name']}</td><td>${storedData[i][1][y][1]['data-band-name']}</td><td>${storedData[i][1][y][3]['data-band-name']}</td></tr>`;
                                        strwatchstyle += `<tr><td></td><td>data-casing-name:</td><td ${storedData[i][1][y][2]['data-casing-name']==storedData[i][1][y][1]['data-casing-name'] ? "" : "class='red'"}>${storedData[i][1][y][2]['data-casing-name']}</td><td>${storedData[i][1][y][1]['data-casing-name']}</td><td>${storedData[i][1][y][3]['data-casing-name']}</td></tr>`;
                                        strwatchstyle += `<tr><td></td><td>data-size:</td><td ${storedData[i][1][y][2]['data-size']==storedData[i][1][y][1]['data-size'] ? "" : "class='red'"}>${storedData[i][1][y][2]['data-size']}</td><td>${storedData[i][1][y][1]['data-size']}</td><td>${storedData[i][1][y][3]['data-size']}</td></tr>`;
                                        strwatchstyle += `<tr><td></td><td>data-sku-model:</td><td ${storedData[i][1][y][2]['data-sku-model']==storedData[i][1][y][1]['data-sku-model'] ? "" : "class='red'"}>${storedData[i][1][y][2]['data-sku-model']}</td><td>${storedData[i][1][y][1]['data-sku-model']}</td><td>${storedData[i][1][y][3]['data-sku-model']}</td></tr>`;
                                    };
                                    strwatchstyle += `</table></td></tr>`;

                                    strwatchband += `<tr data-toggle="collapse" data-parent="#accordion" href="#band"><td colspan="5" bgcolor="#1e90ff" class="f1">表带</td></tr>`;

                                    strwatchband += `<tr id="band" class="panel-collapse collapse"><td colspan="5"><table class="table table-striped table-bordered">`;
                                    for (var z = 0; z < storedData[i][2].length; z++) {
                                        strwatchband += `<tr><td style="width:15%">${storedData[i][2][z][0]}</td><td style="width:13%">aria-label:</td><td style="width:24%" ${storedData[i][2][z][2]['aria-label']==storedData[i][2][z][1]['aria-label'] ? "" : "class='red'"}>${storedData[i][2][z][2]['aria-label']}</td><td style="width:24%">${storedData[i][2][z][1]['aria-label']}</td><td>${storedData[i][2][z][3]['aria-label']}</td></tr>`;
                                        strwatchband += `<tr><td></td><td>data-background:</td><td ${storedData[i][2][z][2]['data-background']==storedData[i][2][z][1]['data-background'] ? "" : "class='red'"} >${storedData[i][2][z][2]['data-background']}</td><td >${storedData[i][2][z][1]['data-background']}</td><td>${storedData[i][2][z][3]['data-background']}</td></tr>`;
                                        strwatchband += `<tr><td></td><td>data-band-available:</td><td ${storedData[i][2][z][2]['data-band-available']==storedData[i][2][z][1]['data-band-available'] ? "" : "class='red'"}>${storedData[i][2][z][2]['data-band-available']}</td><td>${storedData[i][2][z][1]['data-band-available']}</td><td>${storedData[i][2][z][3]['data-band-available']}</td></tr>`;
                                        strwatchband += `<tr><td></td><td>data-band-unavailable-copy:</td><td  ${storedData[i][2][z][2]['data-band-unavailable-copy']==storedData[i][2][z][1]['data-band-unavailable-copy'] ? "" : "class='red'"}>${storedData[i][2][z][2]['data-band-unavailable-copy']}</td><td>${storedData[i][2][z][1]['data-band-unavailable-copy']}</td><td>${storedData[i][2][z][3]['data-band-unavailable-copy']}</td></tr>`;
                                        strwatchband += `<tr><td></td><td>data-buy:</td><td ${storedData[i][2][z][2]['data-buy']==storedData[i][2][z][1]['data-buy'] ? "" : "class='red'"}>${storedData[i][2][z][2]['data-buy']}</td><td>${storedData[i][2][z][1]['data-buy']}</td><td>${storedData[i][2][z][3]['data-buy']}</td></tr>`;
                                        strwatchband += `<tr><td></td><td>data-hidden:</td><td ${storedData[i][2][z][2]['data-hidden']==storedData[i][2][z][1]['data-hidden'] ? "" : "class='red'"}>${storedData[i][2][z][2]['data-hidden']}</td><td>${storedData[i][2][z][1]['data-hidden']}</td><td>${storedData[i][2][z][3]['data-hidden']}</td></tr>`;
                                        strwatchband += `<tr><td></td><td>data-size:</td><td ${storedData[i][2][z][2]['data-size']==storedData[i][2][z][1]['data-size'] ? "" : "class='red'"}>${storedData[i][2][z][2]['data-size']}</td><td>${storedData[i][2][z][1]['data-size']}</td><td>${storedData[i][2][z][3]['data-size']}</td></tr>`;
                                    };
                                    strwatchband += `</table></td></tr>`;

                                    strwatchface += `<tr><td colspan="5" bgcolor="#1e90ff" class="f1" data-toggle="collapse" data-parent="#accordion" href="#dial">表盘</td></tr>`;
                                    strwatchface += `<tr id="dial" class="panel-collapse collapse"><td colspan="5"><table class="table table-striped table-bordered">`;
                                    for (var w = 0; w < storedData[i][3].length; w++) {
                                        strwatchface += `<tr><td style="width:15%">${storedData[i][3][w][0]}</td><td style="width:13%">aria-label:</td><td style="width:24%" ${storedData[i][3][w][2]['aria-label']==storedData[i][3][w][1]['aria-label'] ? "" : "class='red'"}>${storedData[i][3][w][2]['aria-label']}</td><td style="width:24%">${storedData[i][3][w][1]['aria-label']}</td><td>${storedData[i][3][w][3]['aria-label']}</td></tr>`;
                                        strwatchface += `<tr><td></td><td>data-animation:</td><td ${storedData[i][3][w][2]['data-animation']==storedData[i][3][w][1]['data-animation'] ? "" : "class='red'"}>${storedData[i][3][w][2]['data-animation']}</td><td>${storedData[i][3][w][1]['data-animation']}</td><td>${storedData[i][3][w][3]['data-animation']}</td></tr>`;
                                        strwatchface += `<tr><td></td><td>data-animation-locale:</td><td ${storedData[i][3][w][2]['data-animation-locale']==storedData[i][3][w][1]['data-animation-locale'] ? "" : "class='red'"}>${storedData[i][3][w][2]['data-animation-locale']}</td><td>${storedData[i][3][w][1]['data-animation-locale']}</td><td>${storedData[i][3][w][3]['data-animation-locale']}</td></tr>`;
                                    };
                                    strwatchface += `</table></td></tr>`;
                                    document.getElementById('resConwatchStyle').innerHTML=strwatchstyle;
                                    document.getElementById('resConwatchBand').innerHTML=strwatchband;
                                    document.getElementById('resConwatchFace').innerHTML=strwatchface;
                                }
                            }
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
                if(this.urls.length > 0){
            		console.log(storedData);
            		let arr = [];
            		for (let i = 0; i < storedData.length; i++) {
                		arr.push(storedData[i][0]);
            		}
            		console.log(arr);
                    $.post(`/api/copyExport/`, {
                    //vm.$http.post(`/api/copyExport`,{
                        url: JSON.stringify(arr),
                    	title: 'Copy Report',
                    	file: 'copy'
                    },(data)=>{
                        $.fileDownload(`/api/files/${data}`);
                    })
                }
            }
        }
    };
</script>
<style>
    .f1 {
        color: white;
    }
    .f1 > a {
        color: white;
    }
    .watch-version,.watch-band,.watch-dial{
        display: none;
    }
    .table{
        margin-bottom: 0;
    }
</style>