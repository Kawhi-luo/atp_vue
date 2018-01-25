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
			<table class="table table-striped table-bordered" id="diff">
				<tr>
					<td valign="top">
						<table class="table">
							<thead></thead>
							<tbody id="resContainer"></tbody>
						</table>
					</td>
					<td valign="top">
						<table class="table">
							<thead></thead>
							<tbody id="resContainerbranch"></tbody>
						</table>
					</td>
					<td valign="top">
						<table class="table">
							<thead></thead>
							<tbody id="resContainerus"></tbody>
						</table>
					</td>
				</tr>
			</table>
		</div>
		<div class="panel-group" id="accordion">
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
		<div id="watchgallery">
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
                    let str = ``;
                    let str1 = ``;
            		let strbran = ``;
            		let strwatch = ``, strwatchUS = ``, strwatchstyle = ``, strwatchband = ``, strwatchface = ``;
            		let strhkenus = ``;

                    var urls_trim = urls.value.replace(/(^\s*)|(\s*$)/g, "");
                    axios.post('/api/copy',{urls:urls_trim})
                    .then(function(res){
                        document.getElementById('bg_loading').style.display="none";
                        console.log(urls);
                    	console.log(data);
                    	console.log('>>>>>>>>>>>>');
                        if (data) {
                            document.getElementById('accordion').style.display="block";
                            document.getElementById('diff').style.display="block";
                            document.getElementById('watchgallery').style.display="none";
                            storedData = data;
                            str1 += `<tr><td>&diams;&#9786;&diams; Equivalent &diams;&#9786;&diams;</td></tr>`;
                            for (var i = 0; i < data.length; i++) {
                            if (data[i][0].indexOf("/interactive-gallery") === -1) {

                            	str += `<tr><td>&diams;&#9785;&diams; Production &diams;&#9785;&diams;</td></tr>`;
                                str += `<tr><td><a href="${FormateURL(data[i][0])}" target="_blank">${FormateURL(data[i][0])}</a></td></tr>`;
                                if (data[i][2].length == 0) {
                                    str += `<tr><td class='red'>No added content</td></tr>`;
                                } else {
                                    for (var x = 0; x < data[i][2].length; x++) {
                                        str += `<tr><td class='red'>${data[i][2][x]}</td></tr>`;
                                    }
                            	}

                                strbran += `<tr><td>&diams;&#9785;&diams; Branch &diams;&#9785;&diams;</td></tr>`;
                                strbran += `<tr><td><a href="${data[i][0]}" target="_blank">${data[i][0]}</a></td></tr>`;

                                console.log(data[i].length);

                                if (data[i][3].length == 0) {
                                    strbran += `<tr><td class='red'>No added content</td></tr>`;
                                } else {

                                    for (var x = 0; x < data[i][3].length; x++) {
                                        strbran += `<tr><td class='red'>${data[i][3][x]}</td></tr>`;
                                    }
                                }
                                str1 += `<tr><td><a href="${data[i][0]}" target="_blank">${data[i][0]}</a><br>
                                <a href="${FormateURL(data[i][0])}" target="_blank">${FormateURL(data[i][0])}</a></td></tr>`;
                                for (var x = 0; x < data[i][1].length; x++) {
                                    str1 += `<tr><td>${data[i][1][x]}</td></tr>`;
                                }

                                document.getElementById('resContainer').innerHTML=str;
                                document.getElementById('resContainerbranch').innerHTML=strbran;
                                document.getElementById('resContainerequ').innerHTML=str1;


                            } else {
                                document.getElementById('accordion').style.display="none";
                            	document.getElementById('diff').style.display="none";
                            	document.getElementById('watchgallery').style.display="block";

                                strwatchstyle += `<tr><td colspan="5" bgcolor="#175b96" class="f1"><a href="${data[i][0]}" target="_blank">${data[i][0]}</a></td></tr>`;
                                strwatchstyle += `<tr><td style="font-weight: bold;width:15%" >ID</td><td style="font-weight: bold;width:13%" >Item</td><td style="font-weight: bold;width:24%" >Geo</td><td style="font-weight: bold;width:24%" >WWW</td><td style="font-weight: bold;width:24%" >US</td></tr>`;
                                strwatchstyle += `<tr><td colspan="5" bgcolor="#1e90ff" class="f1" onclick="version(event)">表款</td></tr>`;
                                for (var y = 0; y < data[i][1].length; y++) {
                                    strwatchstyle += `<tr class="watch-version"><td>${data[i][1][y][0]}</td><td>aria-label:</td><td ${data[i][1][y][2]['aria-label']==data[i][1][y][1]['aria-label'] ? "" : "class='red'"}>${data[i][1][y][2]['aria-label']}</td><td>${data[i][1][y][1]['aria-label']}</td><td>${data[i][1][y][3]['aria-label']}</td></tr>`;
                                    strwatchstyle += `<tr class="watch-version"><td></td><td>data-band-name:</td><td ${data[i][1][y][2]['data-band-name']==data[i][1][y][1]['data-band-name'] ? "" : "class='red'"}>${data[i][1][y][2]['data-band-name']}</td><td>${data[i][1][y][1]['data-band-name']}</td><td>${data[i][1][y][3]['data-band-name']}</td></tr>`;
                                    strwatchstyle += `<tr class="watch-version"><td></td><td>data-casing-name:</td><td ${data[i][1][y][2]['data-casing-name']==data[i][1][y][1]['data-casing-name'] ? "" : "class='red'"}>${data[i][1][y][2]['data-casing-name']}</td><td>${data[i][1][y][1]['data-casing-name']}</td><td>${data[i][1][y][3]['data-casing-name']}</td></tr>`;
                                    strwatchstyle += `<tr class="watch-version"><td></td><td>data-size:</td><td ${data[i][1][y][2]['data-size']==data[i][1][y][1]['data-size'] ? "" : "class='red'"}>${data[i][1][y][2]['data-size']}</td><td>${data[i][1][y][1]['data-size']}</td><td>${data[i][1][y][3]['data-size']}</td></tr>`;
                                    strwatchstyle += `<tr class="watch-version"><td></td><td>data-sku-model:</td><td ${data[i][1][y][2]['data-sku-model']==data[i][1][y][1]['data-sku-model'] ? "" : "class='red'"}>${data[i][1][y][2]['data-sku-model']}</td><td>${data[i][1][y][1]['data-sku-model']}</td><td>${data[i][1][y][3]['data-sku-model']}</td></tr>`;
                                };

                                strwatchband += `<tr><td colspan="5" bgcolor="#1e90ff" class="f1" onclick="band(event)">表带</td></tr>`;
                                for (var z = 0; z < data[i][2].length; z++) {
                                    strwatchband += `<tr class="watch-band"><td>${data[i][2][z][0]}</td><td>aria-label:</td><td ${data[i][2][z][2]['aria-label']==data[i][2][z][1]['aria-label'] ? "" : "class='red'"}>${data[i][2][z][2]['aria-label']}</td><td>${data[i][2][z][1]['aria-label']}</td><td>${data[i][2][z][3]['aria-label']}</td></tr>`;
                                    strwatchband += `<tr class="watch-band"><td></td><td>data-background:</td><td ${data[i][2][z][2]['data-background']==data[i][2][z][1]['data-background'] ? "" : "class='red'"} >${data[i][2][z][2]['data-background']}</td><td >${data[i][2][z][1]['data-background']}</td><td>${data[i][2][z][3]['data-background']}</td></tr>`;
                                    strwatchband += `<tr class="watch-band"><td></td><td>data-band-available:</td><td ${data[i][2][z][2]['data-band-available']==data[i][2][z][1]['data-band-available'] ? "" : "class='red'"}>${data[i][2][z][2]['data-band-available']}</td><td>${data[i][2][z][1]['data-band-available']}</td><td>${data[i][2][z][3]['data-band-available']}</td></tr>`;
                                    strwatchband += `<tr class="watch-band"><td></td><td>data-band-unavailable-copy:</td><td  ${data[i][2][z][2]['data-band-unavailable-copy']==data[i][2][z][1]['data-band-unavailable-copy'] ? "" : "class='red'"}>${data[i][2][z][2]['data-band-unavailable-copy']}</td><td>${data[i][2][z][1]['data-band-unavailable-copy']}</td><td>${data[i][2][z][3]['data-band-unavailable-copy']}</td></tr>`;
                                    strwatchband += `<tr class="watch-band"><td></td><td>data-buy:</td><td ${data[i][2][z][2]['data-buy']==data[i][2][z][1]['data-buy'] ? "" : "class='red'"}>${data[i][2][z][2]['data-buy']}</td><td>${data[i][2][z][1]['data-buy']}</td><td>${data[i][2][z][3]['data-buy']}</td></tr>`;
                                    strwatchband += `<tr class="watch-band"><td></td><td>data-hidden:</td><td ${data[i][2][z][2]['data-hidden']==data[i][2][z][1]['data-hidden'] ? "" : "class='red'"}>${data[i][2][z][2]['data-hidden']}</td><td>${data[i][2][z][1]['data-hidden']}</td><td>${data[i][2][z][3]['data-hidden']}</td></tr>`;
                                    strwatchband += `<tr class="watch-band"><td></td><td>data-size:</td><td ${data[i][2][z][2]['data-size']==data[i][2][z][1]['data-size'] ? "" : "class='red'"}>${data[i][2][z][2]['data-size']}</td><td>${data[i][2][z][1]['data-size']}</td><td>${data[i][2][z][3]['data-size']}</td></tr>`;
                                };

                                strwatchface += `<tr><td colspan="5" bgcolor="#1e90ff" class="f1" onclick="dial(event)">表盘</td></tr>`;
                                for (var w = 0; w < data[i][3].length; w++) {
                                    strwatchface += `<tr class="watch-dial"><td>${data[i][3][w][0]}</td><td>aria-label:</td><td ${data[i][3][w][2]['aria-label']==data[i][3][w][1]['aria-label'] ? "" : "class='red'"}>${data[i][3][w][2]['aria-label']}</td><td>${data[i][3][w][1]['aria-label']}</td><td>${data[i][3][w][3]['aria-label']}</td></tr>`;
                                    strwatchface += `<tr class="watch-dial"><td></td><td>data-animation:</td><td ${data[i][3][w][2]['data-animation']==data[i][3][w][1]['data-animation'] ? "" : "class='red'"}>${data[i][3][w][2]['data-animation']}</td><td>${data[i][3][w][1]['data-animation']}</td><td>${data[i][3][w][3]['data-animation']}</td></tr>`;
                                    strwatchface += `<tr class="watch-dial"><td></td><td>data-animation-locale:</td><td ${data[i][3][w][2]['data-animation-locale']==data[i][3][w][1]['data-animation-locale'] ? "" : "class='red'"}>${data[i][3][w][2]['data-animation-locale']}</td><td>${data[i][3][w][1]['data-animation-locale']}</td><td>${data[i][3][w][3]['data-animation-locale']}</td></tr>`;
                                };

                                document.getElementById('resConwatchStyle').innerHTML=strwatchstyle;
                                document.getElementById('resConwatchBand').innerHTML=strwatchband;
                                document.getElementById('resConwatchFace').innerHTML=strwatchface;

                                var watch_version = document.getElementByTagNames('watch-version');
    							var watch_band = document.getElementByTagNames('watch-band');
    							var watch_dial = document.getElementByTagNames('watch-dial');
    							function version(event){
    								if(watch_version.css("display")=="none"){
    									watch_version.css("display")=="block";
    									watch_band.css("display")=="none";
    									watch_dial.css("display")=="none";
    								}else{
    									watch_version.css("display")=="none";
    								}
    							}
    							function band(event){
    								if(watch_band.css("display")=="none"){
    									watch_band.css("display")=="block";
    									watch_version.css("display")=="none";
    									watch_dial.css("display")=="none";
    								}else{
    									watch_band.css("display")=="none";
    								}
    							}
    							function dial(event){
    								if(watch_dial.css("display")=="none"){
    									watch_dial.css("display")=="block";
    									watch_version.css("display")=="none";
    									watch_band.css("display")=="none";
    								}else{
    									watch_dial.css("display")=="none";
    								}
    							}
                            }
                        }

                    } else {}
                    document.getElementById('resContainer').innerHTML=str;
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
                let urls = document.getElementById('urls');
                if(urls.value.length > 0){
                	console.log('==============');
            		console.log(storedData);
            		let arr = [];
            		for (let i = 0; i < storedData.length; i++) {
                		arr.push(storedData[i][0]);
            		}
            		console.log(arr);
                    axios.post(`/api/copyExport`,{
                        url: JSON.stringify(arr),
                    	title: 'Copy Report',
                    	file: 'copy'
                    },(data)=>{
                        //$.fileDownload(`/api/files/${data}`);
                    })
                }
            }
        }
    };
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
    // $(".f1").click(function(){
    //     $(".watch-version").show();
    // })
</script>
<style scoped>
    .f1 {
        color: white;
    }
    .f1 > a {
        color: white;
    }
    .watch-version,.watch-band,.watch-dial{
        display: none;
    }
    #accordion,#watchgallery,#diff{
    	display: none;
    }
</style>