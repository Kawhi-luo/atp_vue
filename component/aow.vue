
<template id="aow">
	<div>
		<h2 class="page-header">AOW Checker</h2>
		<div class="row">
			<div class="col-md-3">
				<p>URL Import(.txt only)</p>
				<input class="form-control" type="file" id="fileInput">
				<span class="input-group-btn">
	            	<input @click="btnImport" type="button" class="btn btn-primary" value="Import">
	            </span>
			</div>
			<div class="col-md-4">
		        <p>URL Input (eg:https://www.apple.com/cn/iphone-x/aow/)</p>
		        <textarea rows="5" class="form-control" v-model="urls"></textarea>
		        <button @click="btnQuest" class="btn btn-primary">Query</button>
		        <button @click="btnClear" class="btn btn-primary">Clear</button>
		        <button @click="btnExport" class="btn btn-primary">Export</button>
		    </div>
		</div>
		<div v-show="table">
			<div>
				<h4 @click="collapse_one = !collapse_one">1.htmlAow_test</h4>
			    <p>The "aow" classname should be present on the the "html" element</p>
			    <table class="table table-striped table-bordered" v-show="collapse_one">
		            <tbody>
		            	<tr>
		            		<td bgcolor="#5bc0de">URL</td>
		            		<td bgcolor="#5bc0de">Result</td>
		            		<td bgcolor="#5bc0de">Description</td>
		            	</tr>
		            	<tr v-for="item in tableData">
		            		<td>{{item[0]}}</td>
		            		<td>{{item[1]['result']}}</td>
		            		<td>{{item[1]['description']}}</td>
		            	</tr>
		            </tbody>
		        </table>
			</div>
			<div>
				<h4 @click="collapse_two = !collapse_two">2.sfIcons_test</h4>
			    <p>Only the SF Pro Icons Web-font family should be getting loaded on the page.</p>
			    <table class="table table-striped table-bordered" v-show="collapse_two">
			        <tbody>
			        	<tr>
		            		<td bgcolor="#5bc0de">URL</td>
		            		<td bgcolor="#5bc0de">Result</td>
		            		<td bgcolor="#5bc0de">Description</td>
		            	</tr>
		            	<tr v-for="item in tableData">
		            		<td>{{item[0]}}</td>
		            		<td>{{item[2]['result']}}</td>
		            		<td>{{item[2]['description']}}</td>
		            	</tr>
			        </tbody>
			    </table>
			</div>
			<div>
				<h4 @click="collapse_three = !collapse_three">3.globalNavRemove_test</h4>
			    <p>The global nav and its related elements should be removed from the page. All these below items should beRemoved:<br>
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
			    <table class="table table-striped table-bordered" v-show="collapse_three">
			        <tbody>
			        	<tr>
		            		<td bgcolor="#5bc0de">URL</td>
		            		<td bgcolor="#5bc0de">Result</td>
		            		<td bgcolor="#5bc0de">Description</td>
		            	</tr>
		            	<tr v-for="item in tableData">
		            		<td>{{item[0]}}</td>
		            		<td>{{item[3]['result']}}</td>
		            		<td>{{item[3]['description']}}</td>
		            	</tr>
			        </tbody>
			    </table>
			</div>
			<div>
				<h4 @click="collapse_four = !collapse_four">4.allCssLinkStartWithCnAowAdded_test</h4>
				<p>Site stylesheets in the head，if it includes like "/cn/PRODUCT_NAME/" then it should be replaced with AOW versions.<br>
	            The "/aow/" should be included in path segment.</p>
	            <table class="table table-bordered table-striped" v-show="collapse_four">
	            	<tbody>
	            		<tr>
		            		<td bgcolor="#5bc0de">URL</td>
		            		<td bgcolor="#5bc0de">Result</td>
		            		<td bgcolor="#5bc0de">Description</td>
		            	</tr>
		            	<tr v-for="item in tableData">
		            		<td>{{item[0]}}</td>
		            		<td>{{item[4]['result']}}</td>
		            		<td>{{item[4]['description']}}</td>
		            	</tr>
	            	</tbody>
	            </table>
			</div>
			<div>
				<h4 @click="collapse_five = !collapse_five">5.footerChange_test</h4>
	       		<p>Footer should be revised, but not totally remove just from "&lt;footer&gt;" to "&lt;/footer&gt;".<br>
			    1.Check the &lt;footer&gt; on HTML if its id should be "wcfooter", and "aria-labelledby" value should be "wcfooter-label";<br>
			    2.Check the 1st div in the &lt;footer&gt;, its "class" value should be "wcfooter-content";<br>
			    3.Check the 1st &lt;h2&gt; in the div, its "class" and "id" value should both be "wcfooter-label";<br>
			    4.Check the 1st section in the div, its class should be "wcfooter-help";<br>
		        5.Check the 2nd section in the div, its class should be "wcfooter-qr";<br>
			    6.Check the 3rd section in the div, its class should be "wcfooter-sosumi", its "aria-label" value should be "Footnotes";<br>
			    7.Check the 4th section in the div, its class should be "wcfooter-mini";<br>
			    8.Check the 1st div in the 4th section, its class should be “wcfooter-mini-legal"<br></p>
	   			<table class="table table-striped table-bordered" v-show="collapse_five">
	            	<tbody>
	            		<tr>
			           		<td bgcolor="#5bc0de">URL</td>
			           		<td bgcolor="#5bc0de">Result</td>
			           		<td bgcolor="#5bc0de">Description</td>
			           	</tr>
		            	<tr v-for="item in tableData">
		            		<td>{{item[0]}}</td>
			            	<td>{{item[5]['result']}}</td>
			           		<td>{{item[5]['description']}}</td>
			           	</tr>
	            	</tbody>
	        	</table>
			</div>
			<div>
				<h4 @click="collapse_six = !collapse_six">6.buyStripRemoveExist_test</h4>
			    <p>Buystrip section should be removed.&lt;section class="ac-gf-buystrip" data-analytics-region="buy strip"&gt;</p>
			    <table class="table table-striped table-bordered" v-show="collapse_six">
			        <tbody>
			        	<tr>
			            	<td bgcolor="#5bc0de">URL</td>
			            	<td bgcolor="#5bc0de">Result</td>
			           		<td bgcolor="#5bc0de">Description</td>
			           	</tr>
			           	<tr v-for="item in tableData">
			           		<td>{{item[0]}}</td>
			           		<td>{{item[6]['result']}}</td>
			         		<td>{{item[6]['description']}}</td>
			           	</tr>
			        </tbody>
			    </table>
			</div>
			<div>
				<h4 @click="collapse_seven = !collapse_seven">7.breadcrumbsNavRemove_test</h4>
			    <p>Breadcrumbs nav should be removed.&lt;nav class="ac-gf-breadcrumbs" aria-label="Breadcrumbs" role="navigation"&gt;</p>
		        <table class="table table-striped table-bordered" v-show="collapse_seven">
		            <tbody>
		            	<tr>
			            	<td bgcolor="#5bc0de">URL</td>
			            	<td bgcolor="#5bc0de">Result</td>
			           		<td bgcolor="#5bc0de">Description</td>
			           	</tr>
			           	<tr v-for="item in tableData">
			           		<td>{{item[0]}}</td>
			           		<td>{{item[7]['result']}}</td>
			         		<td>{{item[7]['description']}}</td>
			           	</tr>
		            </tbody>
		        </table>
			</div>
			<div>
				<h4 @click="collapse_eight = !collapse_eight">8.originalFooterRemove_test</h4>
	        	<p>Directory nav should be removed: &lt;nav class="ac-gf-directory with-5-columns" aria-label="Apple Directory" role="navigation"&gt;</p>
		        <table class="table table-striped table-bordered" v-show="collapse_eight">
		            <tbody>
		            	<tr>
				            <td bgcolor="#5bc0de">URL</td>
				           	<td bgcolor="#5bc0de">Result</td>
				       		<td bgcolor="#5bc0de">Description</td>
				      	</tr>
				       	<tr v-for="item in tableData">
			           		<td>{{item[0]}}</td>
			           		<td>{{item[8]['result']}}</td>
			         		<td>{{item[8]['description']}}</td>
			           	</tr>
		            </tbody>
		        </table>
		    </div>
		    <div>
				<h4 @click="collapse_nine = !collapse_nine">9.hreflangRemove_test</h4>
	        	<p>The hreflang tags in &lt;head&gt; should be removed. &lt;link rel="alternate" href="https://www.apple.com/uk/macbook-air/features/" hreflang="en-GB"&gt;</p>
		        <table class="table table-striped table-bordered" v-show="collapse_nine">
		            <tbody>
		            	<tr>
				            <td bgcolor="#5bc0de">URL</td>
				           	<td bgcolor="#5bc0de">Result</td>
				       		<td bgcolor="#5bc0de">Description</td>
				      	</tr>
				       	<tr v-for="item in tableData">
			           		<td>{{item[0]}}</td>
			           		<td>{{item[9]['result']}}</td>
			         		<td>{{item[9]['description']}}</td>
			           	</tr>
		            </tbody>
		        </table>
		    </div>
		    <div>
				<h4 @click="collapse_ten = !collapse_ten">10.localNaveCss_test</h4>
		        <p>The localnav stylesheet should include "/aow/" in its path. &lt;link rel="stylesheet" type="text/css" href="/ac/localnav/4/aow/styles/ac-localnav.built.css" &gt;</p>
		        <table class="table table-striped table-bordered" v-show="collapse_ten">
		            <tbody>
		            	<tr>
				            <td bgcolor="#5bc0de">URL</td>
				           	<td bgcolor="#5bc0de">Result</td>
				       		<td bgcolor="#5bc0de">Description</td>
				      	</tr>
				       	<tr v-for="item in tableData">
			           		<td>{{item[0]}}</td>
			           		<td>{{item[10]['result']}}</td>
			         		<td>{{item[10]['description']}}</td>
			           	</tr>
		            </tbody>
		        </table>
	    	</div>
	    	<div>
				<h4 @click="collapse_ele = !collapse_ele">11.buyStripBuiltCssRemove_test</h4>
	        	<p>If page includes one stylesheet link for “buystrip.built.css. &lt;link rel="stylesheet" href=“/v/PRODUCT_NAME/n/built/styles/buystrip.built.css” type="text/css" &gt;</p>
		        <table class="table table-striped table-bordered" v-show="collapse_ele">
		            <tbody>
		            	<tr>
			            	<td bgcolor="#5bc0de">URL</td>
			            	<td bgcolor="#5bc0de">Result</td>
			           		<td bgcolor="#5bc0de">Description</td>
			           	</tr>
			           	<tr v-for="item in tableData">
			           		<td>{{item[0]}}</td>
			           		<td>{{item[11]['result']}}</td>
			           		<td>{{item[11]['description']}}</td>
			           	</tr>
		            </tbody>
		        </table>
	    	</div>
	    	<div>
				<h4 @click="collapse_twelve = !collapse_twelve">12.wssFontCssRemove_test</h4>
		        <p>If page includes one stylesheet link for "/wss/fonts?family=SF+Pro+SC", it should be removed.<br>
		        &lt;link rel="stylesheet" href="/wss/fonts?family=SF+Pro+SC&amp;weights=200,300,400,500,600,700,800,900&amp;v=1" type="text/css" &gt;</p>
		        <table class="table table-striped table-bordered" v-show="collapse_twelve">
		            <tbody>
		            	<tr>
			            	<td bgcolor="#5bc0de">URL</td>
			            	<td bgcolor="#5bc0de">Result</td>
			           		<td bgcolor="#5bc0de">Description</td>
			           	</tr>
			           	<tr v-for="item in tableData">
			          		<td>{{item[0]}}</td>
			           		<td>{{item[12]['result']}}</td>
			           		<td>{{item[12]['description']}}</td>
			           	</tr>
		            </tbody>
		        </table>
		    </div>
		    <div>
				<h4 @click="collapse_thirteen = !collapse_thirteen">13.sfproCssRemove_test</h4>
		        <p>If page includes one stylesheet link for “sfpro-cn.css”, it should be removed.<br>
		        &lt;link rel="stylesheet" href=\"/cn/global/styles/sfpro-cn.css\" type="text/css" &gt;</p>
		        <table class="table table-striped table-bordered" v-show="collapse_thirteen">
		            <tbody>
		            	<tr>
			            	<td bgcolor="#5bc0de">URL</td>
			            	<td bgcolor="#5bc0de">Result</td>
			           		<td bgcolor="#5bc0de">Description</td>
			           	</tr>
			           	<tr v-for="item in tableData">
			          		<td>{{item[0]}}</td>
			           		<td>{{item[13]['result']}}</td>
			           		<td>{{item[13]['description']}}</td>
			           	</tr>
		            </tbody>
		        </table>
		    </div>

		    <div>
				<h4 @click="collapse_fourteen = !collapse_fourteen">14.ifIeRemove_test</h4>
		        <p>If page includes one code block starts with “ &lt;!--[if IE] &gt;”.<br>
		        and ends with “&lt;![endif]—&gt;”, the whole code block should be removed.</p>
		        <table class="table table-striped table-bordered" v-show="collapse_fourteen">
		            <tbody>
		            	<tr>
			            	<td bgcolor="#5bc0de">URL</td>
			            	<td bgcolor="#5bc0de">Result</td>
			           		<td bgcolor="#5bc0de">Description</td>
			           	</tr>
			           	<tr v-for="item in tableData">
			          		<td>{{item[0]}}</td>
			           		<td>{{item[14]['result']}}</td>
			           		<td>{{item[14]['description']}}</td>
			           	</tr>
		            </tbody>
		        </table>
		    </div>

		    <div>
				<h4 @click="collapse_fifteen = !collapse_fifteen">15.fontIncRemove_test</h4>
		        <p>If page includes code line for “font.inc”, it should be removed.<br>
		            &lt;!--#include virtual=“/cn/global/includes/font.inc"--&gt;.</p>
		        <table class="table table-striped table-bordered" v-show="collapse_fifteen">
		            <tbody>
		            	<tr>
			            	<td bgcolor="#5bc0de">URL</td>
			            	<td bgcolor="#5bc0de">Result</td>
			           		<td bgcolor="#5bc0de">Description</td>
			           	</tr>
			           	<tr v-for="item in tableData">
			          		<td>{{item[0]}}</td>
			           		<td>{{item[15]['result']}}</td>
			           		<td>{{item[15]['description']}}</td>
			           	</tr>
		            </tbody>
		        </table>
		    </div>

		    <div>
				<h4 @click="collapse_sixteen = !collapse_sixteen">16.fontCssRemove_test</h4>
		        <p>If page includes one stylesheet link for "font.css", it should be removed: &lt;link rel="stylesheet" href=“/cn/PRODUCT_NAME/styles/font.css” type="text/css" &gt;.</p>
		        <table class="table table-striped table-bordered" v-show="collapse_sixteen">
		            <tbody>
		            	<tr>
			            	<td bgcolor="#5bc0de">URL</td>
			            	<td bgcolor="#5bc0de">Result</td>
			           		<td bgcolor="#5bc0de">Description</td>
			           	</tr>
			           	<tr v-for="item in tableData">
			          		<td>{{item[0]}}</td>
			           		<td>{{item[16]['result']}}</td>
			           		<td>{{item[16]['description']}}</td>
			           	</tr>
		            </tbody>
		        </table>
		    </div>

		    <div>
				<h4 @click="collapse_seventeen = !collapse_seventeen">17.socialShareImageDisplayOnce_test</h4>
		        <p>Check the 1st div in the &lt;body&gt;, it’s style should be "display:none;"<br>
		        It should only have one element "img", src should include "og_wechat.png"<br>
		        &lt;div style="display:none;"&gt;&lt;img src=“/cn/PRODUCT_NAME/aow/images/og_wechat.png” alt="" &gt;&lt;/div&gt;.</p>
		        <table class="table table-striped table-bordered" v-show="collapse_seventeen">
		            <tbody>
		            	<tr>
			            	<td bgcolor="#5bc0de">URL</td>
			            	<td bgcolor="#5bc0de">Result</td>
			           		<td bgcolor="#5bc0de">Description</td>
			           	</tr>
			           	<tr v-for="item in tableData">
			          		<td>{{item[0]}}</td>
			           		<td>{{item[17]['result']}}</td>
			           		<td>{{item[17]['description']}}</td>
			           	</tr>
		            </tbody>
		        </table>
		    </div>

	    	<div>
				<h4 @click="collapse_eighteen = !collapse_eighteen">18.metaTagsLink_test</h4>
	        	<p>All those &lt;meta&gt; tags, if its "property" value equals to "og:url", it should include "/aow/" in its "content" value.</p>
		        <table class="table table-striped table-bordered" v-show="collapse_eighteen">
	    	        <thead></thead>
	        	    <tbody>
	        	    	<tr>
			            	<td bgcolor="#5bc0de">URL</td>
			            	<td bgcolor="#5bc0de">Result</td>
			           		<td bgcolor="#5bc0de">Description</td>
			           	</tr>
			           	<tr v-for="item in tableData">
			          		<td>{{item[0]}}</td>
			           		<td>{{item[18]['result']}}</td>
			           		<td>{{item[18]['description']}}</td>
			           	</tr>
	        	    </tbody>
	        	</table>
	    	</div>

		    <div>
				<h4 @click="collapse_nineteen = !collapse_nineteen">19.allImageLinkStartWithCnAowAdded_test</h4>
		        <p>All those &lt;img&gt; tags, if its src value includes "/cn/PRODUCT_NAME/", then it should include "/aow/" in the src.<br>
		        "Correct:\n" + "&lt;img src=“/cn/iphone-8/aow/images/overview/og_wechat.png" alt=""&gt;</p>
		        <table class="table table-striped table-bordered" v-show="collapse_nineteen">
		            <tbody>
		            	<tr>
			            	<td bgcolor="#5bc0de">URL</td>
			            	<td bgcolor="#5bc0de">Result</td>
			           		<td bgcolor="#5bc0de">Description</td>
			           	</tr>
			           	<tr v-for="item in tableData">
			          		<td>{{item[0]}}</td>
			           		<td>{{item[19]['result']}}</td>
			           		<td>{{item[19]['description']}}</td>
			           	</tr>
		            </tbody>
		        </table>
		    </div>

		    <div>
				<h4 @click="collapse_twenty = !collapse_twenty">20.canonicalKeepTheSame_test</h4>
		        <p>Check Canonical URL remain the same as normal site</p>
		        <table class="table table-striped table-bordered" v-show="collapse_twenty">
		            <tbody>
		            	<tr>
			            	<td bgcolor="#5bc0de">URL</td>
			            	<td bgcolor="#5bc0de">Result</td>
			           		<td bgcolor="#5bc0de">Description</td>
			           	</tr>
			           	<tr v-for="item in tableData">
			          		<td>{{item[0]}}</td>
			           		<td>{{item[20]['result']}}</td>
			           		<td>{{item[20]['description']}}</td>
			           	</tr>
		            </tbody>
		        </table>
		    </div>

		    <div>
				<h4 @click="collapse_twenty_one = !collapse_twenty_one">21.aowPagelinkInAnotherPageAowAdded_test</h4>
		        <p>If the link on the page are the one which in our QA scope, it should contains AOW。</p>
		        <table class="table table-striped table-bordered" v-show="collapse_twenty_one">
		            <tbody v-for="item in tableData">
		            	<tr>
			            	<td bgcolor="#5bc0de">URL</td>
			            	<td bgcolor="#5bc0de">Result</td>
			           		<td bgcolor="#5bc0de" colspan="2">Description</td>
			           	</tr>
			           	<tr>
			           		<td :rowspan="item[21]['description'].length+1">{{item[0]}}</td>
			           		<td :rowspan="item[21]['description'].length+1" :class="{'red':item[21]['result']!='Pass'}">{{item[21]['result']}}</td>
			           	</tr>
			           	<tr v-for="idx in item[21]['description']" v-if="idx['href'] && idx['href'].indexOf('http')==-1">
			           		<td :class="{'red':idx['href'].indexOf('Please')!=-1}">{{idx['href']}}</td>
			           		<td :class="{'red':idx['status'].indexOf('Pass')==-1}">{{idx['status']}}</td>
			           	</tr>
			           	<tr v-for="idx in item[21]['description']" v-if="idx['href'] && idx['href'].indexOf('http')!=-1">
			           		<td><a :href="idx['href']">{{idx['href']}}</a></td>
			           		<td :class="{'red':idx['status'].indexOf('Pass')==-1}">{{idx['status']}}</td>
			           	</tr>
			           	<tr v-for="idx in item[21]['description']" v-if="!idx['href']">
			           		<td colspan="2">{{idx}}</td>
			           	</tr>
		            </tbody>
		        </table>
		    </div>

	        <div>
				<h4 @click="collapse_twenty_two = !collapse_twenty_two">22.returnStatusCode_test</h4>
		        <p>Check the return status code of all links in the page</p>
		        <table class="table table-striped table-bordered" v-show="collapse_twenty_two">
		            <tbody v-for="item in tableData">
		            	<tr>
			            	<td bgcolor="#5bc0de">URL</td>
			            	<td bgcolor="#5bc0de">Result</td>
			           		<td bgcolor="#5bc0de" colspan="2">Description</td>
			           	</tr>
			           	<tr>
			           		<td :rowspan="item[22]['description'].length+1">{{item[0]}}</td>
			           		<td :rowspan="item[22]['description'].length+1" :class="{'red':item[22]['result']!='Pass'}">{{item[22]['result']}}</td>
			           	</tr>
			           	<tr v-for="idx in item[22]['description']">
			           		<td><a :href="idx['site']">{{idx['site']}}</a></td>
			           		<td :class="{'red':idx['status code']!=200}">{{idx['status code']}}</td>
			           	</tr>
		            </tbody>
		        </table>
		    </div>
	    </div>
	</div>
</template>
<script type="text/javascript">
	var qs = require('qs');
    import  bus from '../assets/eventBus';
    export default{
        data(){
            return{
            	tableData:[],
            	table:false,
              	urls:'',
              	collapse_one:true,
              	collapse_two:true,
              	collapse_three:true,
              	collapse_four:true,
              	collapse_five:true,
              	collapse_six:true,
              	collapse_seven:true,
              	collapse_eight:true,
              	collapse_nine:true,
              	collapse_ten:true,
              	collapse_ele:true,
              	collapse_twelve:true,
              	collapse_thirteen:true,
              	collapse_fourteen:true,
              	collapse_fifteen:true,
              	collapse_sixteen:true,
              	collapse_seventeen:true,
              	collapse_eighteen:true,
              	collapse_nineteen:true,
              	collapse_twenty:true,
              	collapse_twenty_one:true,
              	collapse_twenty_two:true
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
                this.urls=""
            },
            btnQuest(){
                var vm = this;
                var urls_trim = vm.urls.replace(/(^\s*)|(\s*$)/g, "");
                axios.post('/api/aow',qs.stringify({ 'urls': urls_trim }))
                .then(function(data){
                    var store = data.data;
                    vm.table = true;
                    vm.tableData = data.data;
                })
                .catch(function(err){
                })
            },
            btnExport(){
                alert('btnExport');
                let urls = document.getElementById('urls');
                if(urls.value.length > 0){
                    axios.post(`/api/export`,{
                        data:JSON.stringify(storedData),
                        title:'Viewport Report',
                        file:'viewport'
                    },(data)=>{
                        //$.fileDownload(`/api/files/${data}`);
                    })
                }
            }
        }
    }
</script>