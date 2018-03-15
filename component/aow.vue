<style type="text/css" scoped>
    .table {
        width: 75%;
    }
</style>
<template id="aow">
	<div>
		<h2 class="page-header">AOW Checker</h2>
		<div class="row">
			<div class="col-md-3">
		        <p>URL Import(.txt only)</p>

		        <input class="form-control" type="file" id="fileInput">
		        <span class="input-group-btn">
		        	<input type="button" @click="btnImport" class="btn btn-primary" value="Import" id="btnImport">
		        </span>
		    </div>
		    <div class="col-md-4">
		        <p>URL Input (eg:https://www.apple.com/cn/iphone-x/aow/)</p>
		        <textarea rows="5" id="urls" class="form-control" v-model="urls"></textarea>
		        <button @click="btnQuest" id="btnQuest" class="btn btn-primary">Query</button>
		        <button @click="btnClear" id="btnClear" class="btn btn-primary">Clear</button>
		        <button @click="btnExport" id="btnExport" class="btn btn-primary">Export</button>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowOne">1.htmlAow_test</h4>

			<div id="col_aowOne" class="panel-collapse collapse in">
			    <p>The "aow" classname should be present on the the "html" element</p>
			    <table class="table table-striped table-bordered" width="300px">
		            <thead></thead>
			            <tbody id="res_htmlaow"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowTwo">2.sfIcons_test</h4>
		    <div id="col_aowTwo" class="panel-collapse collapse in">
		        <p>Only the SF Pro Icons Web-font family should be getting loaded on the page.</p>
		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_sfIcons"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowThree">3.globalNavRemove_test</h4>
		    <div id="col_aowThree" class="panel-collapse collapse in">
		        <p>The global nav and its related elements should be removed from the page. All these below items should be
		            Removed:<br>
		            &lt;meta name="ac-gn-store-key" content="SFX9YPYY9PPXCU9KH" &gt; <br>
		            &lt;aside id="ac-gn-segmentbar"&gt;<br>
		            &lt;input type="checkbox" id="ac-gn-menustate"&gt;<br>
		            &lt;nav id="ac-globalnav"&gt;<br>
		            &lt;div id="ac-gn-curtain"&gt;<br>
		            &lt;div id="ac-gn-placeholder"&gt;<br>
		            &lt;script type="text/javascript" src="/ac/globalnav/3/en_US/scripts/ac-globalnav.built.js"&gt; &lt;/script&gt;<br>
		            &lt;link rel="stylesheet" type="text/css" href="/ac/globalnav/3/en_US/styles/ac-globalnav.built.css"
		            /&gt;<br>
		            &lt;div id="ac-gn-viewport-emitter"&gt;</p>
		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_globalNavRemove"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowFour">4.allCssLinkStartWithCnAowAdded_test</h4>
		    <div id="col_aowFour" class="panel-collapse collapse in">
		        <p>Site stylesheets in the head，if it includes like "/cn/PRODUCT_NAME/" then it should be replaced with AOW
		            versions.<br>
		            The "/aow/" should be included in path segment.</p>
		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_allCssLinkStartWithCnAowAdded"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowFive">5.footerChange_test</h4>
		    <div id="col_aowFive" class="panel-collapse collapse in">
		        <p>Footer should be revised, but not totally remove just from "&lt;footer&gt;" to "&lt;/footer&gt;".<br>
		        1.Check the &lt;footer&gt; on HTML if its id should be "wcfooter", and "aria-labelledby" value should be
		        "wcfooter-label";<br>
		        2.Check the 1st div in the &lt;footer&gt;, its "class" value should be "wcfooter-content";<br>
		        3.Check the 1st &lt;h2&gt; in the div, its "class" and "id" value should both be "wcfooter-label";<br>
		        4.Check the 1st section in the div, its class should be "wcfooter-help";<br>
		        5.Check the 2nd section in the div, its class should be "wcfooter-qr";<br>
		        6.Check the 3rd section in the div, its class should be "wcfooter-sosumi", its "aria-label" value should be
		        "Footnotes";<br>
		        7.Check the 4th section in the div, its class should be "wcfooter-mini";<br>
		        8.Check the 1st div in the 4th section, its class should be “wcfooter-mini-legal"<br>
		        </p>
		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_footerChange"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowSix">6.buyStripRemoveExist_test</h4>
		    <div id="col_aowSix" class="panel-collapse collapse in">
		        <p>Buystrip section should be removed.&lt;section class="ac-gf-buystrip" data-analytics-region="buy strip"&gt;</p>

		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_buyStripRemove"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowSeven">7.breadcrumbsNavRemove_test</h4>
		    <div id="col_aowSeven" class="panel-collapse collapse in">
		        <p>Breadcrumbs nav should be removed.&lt;nav class="ac-gf-breadcrumbs" aria-label="Breadcrumbs"
		            role="navigation"&gt;</p>
		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_breadcrumbsNavRemove"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowEight">8.originalFooterRemove_test</h4>
		    <div id="col_aowEight" class="panel-collapse collapse in">
		        <td>Directory nav should be removed: &lt;nav class="ac-gf-directory with-5-columns" aria-label="Apple Directory"
		            role="navigation"&gt;
		        </td>

		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_originalFooterRemove"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowNine">9.hreflangRemove_test</h4>
		    <div id="col_aowNine" class="panel-collapse collapse in">
		        <p>The hreflang tags in &lt;head&gt; should be removed.
		            &lt;link rel="alternate" href="https://www.apple.com/uk/macbook-air/features/" hreflang="en-GB"&gt;</p>
		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_hreflangRemove"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowTen">10.localNaveCss_test</h4>
		    <div id="col_aowTen" class="panel-collapse collapse in">
		        <p>The localnav stylesheet should include "/aow/" in its path.
		            &lt;link rel="stylesheet" type="text/css" href="/ac/localnav/4/aow/styles/ac-localnav.built.css" &gt;</p>

		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_localNaveCss"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowEleven">11.buyStripBuiltCssRemove_test</h4>
		    <div id="col_aowEleven" class="panel-collapse collapse in">
		        <p>If page includes one stylesheet link for “buystrip.built.css. &lt;link rel="stylesheet"
		            href=“/v/PRODUCT_NAME/n/built/styles/buystrip.built.css” type="text/css" &gt;</p>

		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_buyStripBuiltCssRemove"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowTwelve">12.wssFontCssRemove_test</h4>
		    <div id="col_aowTwelve" class="panel-collapse collapse in">
		        <p>If page includes one stylesheet link for "/wss/fonts?family=SF+Pro+SC", it should be removed.<br>
		            &lt;link rel="stylesheet" href="/wss/fonts?family=SF+Pro+SC&amp;weights=200,300,400,500,600,700,800,900&amp;v=1"
		            type="text/css" &gt;</p>

		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_wssFontCssRemove"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowThirteen">13.sfproCssRemove_test</h4>
		    <div id="col_aowThirteen" class="panel-collapse collapse in">
		        <p>If page includes one stylesheet link for “sfpro-cn.css”, it should be removed.<br>
		            &lt;link rel="stylesheet" href=\"/cn/global/styles/sfpro-cn.css\"
		            type="text/css" &gt;</p>

		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_sfproCssRemove"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowFourteen">14.ifIeRemove_test</h4>

		    <div id="col_aowFourteen" class="panel-collapse collapse in">
		        <p>If page includes one code block starts with “ &lt;!--[if IE] &gt;”.<br>
		            and ends with “&lt;![endif]—&gt;”, the whole code block should be removed.</p>

		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_ifIeRemove"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowFifteen">15.fontIncRemove_test</h4>
		    <div id="col_aowFifteen" class="panel-collapse collapse in">
		        <p>If page includes code line for “font.inc”, it should be removed.<br>
		            &lt;!--#include virtual=“/cn/global/includes/font.inc"--&gt;.</p>

		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_fontIncRemove"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowSixteen">16.fontCssRemove_test</h4>
		    <div id="col_aowSixteen" class="panel-collapse collapse in">
		        <p>If page includes one stylesheet link for "font.css", it should be removed:
		            &lt;link rel="stylesheet" href=“/cn/PRODUCT_NAME/styles/font.css” type="text/css" &gt;.
		        </p>

		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_fontCssRemove"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowSeventeen">17.socialShareImageDisplayOnce_test</h4>
		    <div id="col_aowSeventeen" class="panel-collapse collapse in">
		        <p>Check the 1st div in the &lt;body&gt;, it’s style should be "display:none;"<br>
		            It should only have one element "img", src should include "og_wechat.png"<br>
		            &lt;div style="display:none;"&gt;&lt;img src=“/cn/PRODUCT_NAME/aow/images/og_wechat.png” alt="" &gt;&lt;/div&gt;.
		        </p>

		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_socialShareImageDisplayOnce"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowEighteen">18.metaTagsLink_test</h4>
		    <div id="col_aowEighteen" class="panel-collapse collapse in">
		        <p>All those &lt;meta&gt; tags, if its "property" value equals to "og:url", it should include "/aow/" in its
		            "content" value.
		        </p>

		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_metaTagsLink"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowNinteen">19.allImageLinkStartWithCnAowAdded_test</h4>
		    <div id="col_aowNinteen" class="panel-collapse collapse in">
		        <p>All those &lt;img&gt; tags, if its src value includes "/cn/PRODUCT_NAME/", then it should include "/aow/" in
		            the src.<br>
		            "Correct:\n" + "&lt;img src=“/cn/iphone-8/aow/images/overview/og_wechat.png" alt=""&gt;
		        </p>

		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_allImageLinkStartWithCnAowAdded"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowTwenty">20.canonicalKeepTheSame_test</h4>
		    <div id="col_aowTwenty" class="panel-collapse collapse in">
		        <p>Check Canonical URL remain the same as normal site
		        </p>

		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_canonicalKeepTheSame"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowTwentyOne">21.aowPagelinkInAnotherPageAowAdded_test</h4>
		    <div id="col_aowTwentyOne" class="panel-collapse collapse in">
		        <p>If the link on the page are the one which in our QA scope, it should contains AOW。
		        </p>

		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_aowPagelinkInAnotherPageAowAdded"></tbody>
		        </table>
		    </div>
		</div>
		<div class="test" v-show="test">
			<h4 data-toggle="collapse" href="#col_aowTwentyTwo">22.returnStatusCode_test</h4>
		    <div id="col_aowTwentyTwo" class="panel-collapse collapse in">
		        <p>Check the return status code of all links in the page</p>
		        <table class="table table-striped table-bordered">
		            <thead></thead>
		            <tbody id="res_returnStatusCode"></tbody>
		        </table>
		    </div>
		</div>
	</div>
</template>
<script type="text/javascript">
	var storedData;
    var qs = require('qs');
    import  bus from '../assets/eventBus';
    import axios from 'axios';
    export default{
        data(){
            return{
                urls:'',
              	test:false
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
            	this.test=true;
            	if(this.urls.length > 5){
            		// document.getElementById('resContainer').innerHTML=``;
                    bus.$emit("show",true);
                    let str01 = ``, str02 = ``, str03 = ``, str04 = ``, str05 = ``;
	                let str06 = ``, str07 = ``, str08 = ``, str09 = ``, str10 = ``;
	                let str11 = ``, str12 = ``, str13 = ``, str14 = ``, str15 = ``;
	                let str16 = ``, str17 = ``, str18 = ``, str19 = ``, str20 = ``;	
	                let str21 = ``, str22 = ``, str = ``;
	                str += `<tr><td bgcolor="#5bc0de">URL</td><td bgcolor="#5bc0de">Result</td><td colspan="2" bgcolor="#5bc0de">Description</td></tr>`;
	                var urls_trim = this.urls.replace(/(^\s*)|(\s*$)/g, "");
	                console.log(urls_trim);
                    axios.post('/api/aow',qs.stringify({ 'urls': urls_trim }))
                    .then(function(data){
                    	bus.$emit("show",false);
                    	console.log(data);
                    	storedData = data.data;
                    	if(data[0]!=""){
                    		str01 += str, str02 += str, str03 += str, str04 += str, str05 += str;
	                        str06 += str, str07 += str, str08 += str, str09 += str, str10 += str;
	                        str11 += str, str12 += str, str13 += str, str14 += str, str15 += str;
	                        str16 += str, str17 += str, str18 += str, str19 += str, str20 += str;
	                        str21 += str, str22 += str;
	                  		for (var i = 0; i < storedData.length; i++) {
	                            str01 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][1]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][1]['result']}</td><td width="60%" ${storedData[i][1]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][1]['description'].join('<br>')}</td></tr>`;
	                            //$('#res_htmlaow').html(str01);
	                            document.getElementById('res_htmlaow').innerHTML=str01;
	                            str02 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][2]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][2]['result']}</td><td width="60%" ${storedData[i][2]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][2]['description'].join('<br>')}</td></tr>`
	                            //$('#res_sfIcons').html(str02);
	                            document.getElementById('res_sfIcons').innerHTML=str02;
	                            str03 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][3]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][3]['result']}</td><td width="60%" ${storedData[i][3]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][3]['description'].join('<br>')}</td></tr>`
	                            //$('#res_globalNavRemove').html(str03);
	                            document.getElementById('res_globalNavRemove').innerHTML=str03;
	                            str04 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][4]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][4]['result']}</td><td width="60%" ${storedData[i][4]['result'] == "Pass" ? "" : "class='red'"}}>${storedData[i][4]['description'].join('<br>')}</td></tr>`
	                            //$('#res_allCssLinkStartWithCnAowAdded').html(str04);
	                            document.getElementById('res_allCssLinkStartWithCnAowAdded').innerHTML=str04;
	                            str05 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][5]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][5]['result']}</td><td width="60%" ${storedData[i][5]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][5]['description'].join('<br>')}</td></tr>`
	                            //$('#res_footerChange').html(str05);
	                            document.getElementById('res_footerChange').innerHTML=str05;
	                            str06 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][6]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][6]['result']}</td><td width="60%" ${storedData[i][6]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][6]['description'].join('<br>')}</td></tr>`
	                            //$('#res_buyStripRemove').html(str06);
	                            document.getElementById('res_buyStripRemove').innerHTML=str06;
	                            str07 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][7]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][7]['result']}</td><td width="60%" ${storedData[i][7]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][7]['description'].join('<br>')}</td></tr>`
	                            //$('#res_breadcrumbsNavRemove').html(str07)
	                            document.getElementById('res_breadcrumbsNavRemove').innerHTML=str07;
	                            str08 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][8]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][8]['result']}</td><td width="60%" ${storedData[i][8]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][8]['description'].join('<br>')}</td></tr>`
	                            //$('#res_originalFooterRemove').html(str08);
	                            document.getElementById('res_originalFooterRemove').innerHTML=str08;
	                            str09 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][9]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][9]['result']}</td><td width="60%" ${storedData[i][9]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][9]['description'].join('<br>')}</td></tr>`
	                            //$('#res_hreflangRemove').html(str09);
	                            document.getElementById('res_hreflangRemove').innerHTML=str09;
	                            str10 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][10]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][10]['result']}</td><td width="60%" ${storedData[i][10]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][10]['description'].join('<br>')}</td></tr>`
	                            //$('#res_localNaveCss').html(str10);
	                            document.getElementById('res_localNaveCss').innerHTML=str10;
	                            str11 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][11]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][11]['result']}</td><td width="60%" ${storedData[i][11]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][11]['description'].join('<br>')}</td></tr>`
	                            //$('#res_buyStripBuiltCssRemove').html(str11);
	                            document.getElementById('res_buyStripBuiltCssRemove').innerHTML=str11;
	                            str12 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][12]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][12]['result']}</td><td width="60%" ${storedData[i][12]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][12]['description'].join('<br>')}</td></tr>`
	                            //$('#res_wssFontCssRemove').html(str12);
	                            document.getElementById('res_wssFontCssRemove').innerHTML=str12;
	                            str13 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][13]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][13]['result']}</td><td width="60%" ${storedData[i][13]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][13]['description'].join('<br>')}</td></tr>`
	                            //$('#res_sfproCssRemove').html(str13);
	                            document.getElementById('res_sfproCssRemove').innerHTML=str13;
	                            str14 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][14]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][14]['result']}</td><td width="60%" ${storedData[i][14]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][14]['description'].join('<br>')}</td></tr>`
	                            //$('#res_ifIeRemove').html(str14);
	                            document.getElementById('res_ifIeRemove').innerHTML=str14;
	                            str15 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][15]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][15]['result']}</td><td width="60%" ${storedData[i][15]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][15]['description'].join('<br>')}</td></tr>`
	                            //$('#res_fontIncRemove').html(str15);
	                            document.getElementById('res_fontIncRemove').innerHTML=str15;
	                            str16 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][16]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][16]['result']}</td><td width="60%" ${storedData[i][16]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][16]['description'].join('<br>')}</td></tr>`
	                            //$('#res_fontCssRemove').html(str16);
	                            document.getElementById('res_fontCssRemove').innerHTML=str16;
	                            str17 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][17]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][17]['result']}</td><td width="60%" ${storedData[i][17]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][17]['description'].join('<br>')}</td></tr>`
	                            //$('#res_socialShareImageDisplayOnce').html(str17);
	                            document.getElementById('res_socialShareImageDisplayOnce').innerHTML=str17;
	                            str18 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][18]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][18]['result']}</td><td width="60%" ${storedData[i][18]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][18]['description'].join('<br>')}</td></tr>`
	                            //$('#res_metaTagsLink').html(str18);
	                            document.getElementById('res_metaTagsLink').innerHTML=str18;
	                            str19 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][19]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][19]['result']}</td><td width="60%" ${storedData[i][19]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][19]['description'].join('<br>')}</td></tr>`
	                            //$('#res_allImageLinkStartWithCnAowAdded').html(str19);
	                            document.getElementById('res_allImageLinkStartWithCnAowAdded').innerHTML=str19;
	                            str20 += `<tr><td width="20%">${storedData[i][0]}</td><td width="20%" ${storedData[i][20]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][20]['result']}</td><td width="60%" ${storedData[i][20]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][20]['description'].join('<br>')}</td></tr>`
	                            //$('#res_canonicalKeepTheSame').html(str20);
	                            document.getElementById('res_canonicalKeepTheSame').innerHTML=str20;

	                            function com(){
	                                let str21_plus =``;
	                                for(let x in storedData[i][21]['description']){
	                                    if(storedData[i][21]['description'][x]['href']){
	                                        if(storedData[i][21]['description'][x]['href'].indexOf('http')==-1){
	                                            str21_plus += `<tr><td ${storedData[i][21]['description'][x]['href'].indexOf('Please') == -1 ? "":"class='red'"}>${storedData[i][21]['description'][x]['href']}</td><td ${storedData[i][21]['description'][x]['status'].indexOf('Pass') == -1 ? "class='red'":""}>${storedData[i][21]['description'][x]['status']}</td></tr>`
	                                        }else{
	                                            str21_plus += `<tr><td><a href="${storedData[i][21]['description'][x]['href']}">${storedData[i][21]['description'][x]['href']}</a></td><td ${storedData[i][21]['description'][x]['status'].indexOf('Pass') == -1 ? "class='red'":""}>${storedData[i][21]['description'][x]['status']}</td></tr>`
	                                        }
	                                    }else{
	                                        str21_plus += `<tr><td colspan='2'>${storedData[i][21]['description'][x]}</td></tr>`
	                                    }
	                                }
	                                return str21_plus;
	                            }
	                            str21 += `<tr>
	                                        <td width="20%" rowspan="${storedData[i][21]['description'].length+1}">${storedData[i][0]}</td>
	                                        <td width="20%" rowspan="${storedData[i][21]['description'].length+1}" ${storedData[i][21]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][21]['result']}</td>
	                                     </tr>${com()}`

	                            //$('#res_aowPagelinkInAnotherPageAowAdded').html(str21);
	                            document.getElementById('res_aowPagelinkInAnotherPageAowAdded').innerHTML=str21;
	                            function returnStatusCode_test(){
	                                let str22_plus =``;
	                                for(let x in storedData[i][22]['description']){
	                                    str22_plus += `<tr>
                                        	<td><a href='${storedData[i][22]['description'][x]['site']}'>${storedData[i][22]['description'][x]['site']}</a></td>
                                        	<td ${storedData[i][22]['description'][x]['status code'] == 200 ? "" : "class='red'"}>${storedData[i][22]['description'][x]['status code']}</td></tr>`
	                                }
	                                return str22_plus;
	                            }
	                            str22 += `<tr>
                                        <td width="20%" rowspan="${storedData[i][22]['description'].length+1}">${storedData[i][0]}</td>
                                        <td width="20%" rowspan="${storedData[i][22]['description'].length+1}" ${storedData[i][22]['result'] == "Pass" ? "" : "class='red'"}>${storedData[i][22]['result']}</td>
                                     	</tr>${returnStatusCode_test()}`
                            	//$('#res_returnStatusCode').html(str22);
                            	document.getElementById('res_returnStatusCode').innerHTML=str22;
                        	}
                    	}
                    })
            	}
            },
            btnExport(){
            	if (this.urls.length > 0) {
		            $.post(`/api/export/`, {
		                data: JSON.stringify(storedData),
		                title : 'AOW Report',
		                file : 'aow'
		            }, (data) => {
		                $.fileDownload(`/api/files/${data}`);
		            })
		        }
            }
        }
    }
</script>