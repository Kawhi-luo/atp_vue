<template id="meta">
	<div>
		<h2 class="page-header">Meta Checker</h2>
        <div class="row">
            <div class="col-md-4 navslid trans-side navslid-show">
                <p>
                    URL Import(.txt only)
                </p>
                <input class="form-control" type="file" id="fileInput">
                <span class="input-group-btn">
                    <input @click="btnImport" type="button" class="btn btn-primary" value="Import" id="btnImport"/>
                </span>
                <p>URL Input (eg:https://www.apple.com/cn/iphone)</p>
                <textarea rows="5" id="urls" class="form-control" v-model="urls"></textarea>
                <button @click="btnQuest" id="btnQuest" class="btn btn-primary">Query</button>
                <button @click="btnClear" id="btnClear" class="btn btn-primary">Clear</button>
            </div>
            <div class="col-md-7 showValue">
                <label>
                    <input type="radio" name="optionsRadios" id="rdHTML" value="html" checked hidden>
                </label>
                <button @click="btnExport" id="btnExport" class="btn btn-primary">Export</button>
            </div>
            <div class="col-md-7 showValue">
                <table class="table table-striped table-bordered">
                    <thead></thead>
                    <tbody id="resContainer" class="meta"></tbody>
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
        name:'app',
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
                this.urls='';
            },
            btnQuest(){
                let vm = this;
                if(vm.urls.length > 5){
                  document.getElementById('resContainer').innerHTML=``;
                    bus.$emit("show",true);
                    let urls_trim = vm.urls.replace(/(^\s*)|(\s*$)/g, "");
                    console.log(urls_trim);
                    axios.post('/api/trans',qs.stringify({ 'urls': urls_trim }))
                    .then(function(data){
                        bus.$emit("show",false);
                        if (data) {
                          console.log(data);
                            storedData = data.data;
                            let str = ``;
                            console.log(storedData);
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

                                      }else
                                      if(geo=="HKEN"){
                                          if (url.indexOf("/hk/en/") !== -1){
                                              flag=true;
                                          }
                                      }
                                      else
                                          if(url.indexOf(geo.toLowerCase()) !== -1)
                                      {
                                          flag=true;
                                      }
                                      return flag;
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

                            storedData.forEach((item, index) => {
                                if(item.desc!="Bad Link"){

                                let geoname=ctitle(item.geo);
                                let ptitle =item.title;
                                let flag="";

                                if(item.geo=="US"){
                                    flag=1;
                                }else{
                                    flag=ptitle.indexOf(geoname);
                                }


                               str+=`<tr><td bgcolor="#175b96" class="f1">URL: </td><td class ="headline" bgcolor="#175b96" colspan="2"><a href="${item.url}" target="_blank"> ${item.url}</a></td></tr>`;
                               str+=`<tr><th></th><th>Geo</th><th>US</th></tr>`;
                               str+=`<tr><td>Title:</td><td ${flag>0 ?"":"class='red'"}><div>${item.title?item.title:"null"}</div></td><td><div>${item.titleUS?item.titleUS:""}</div></td></tr>`;


                               str+=`<tr><td>Description:</td><td${item.desc? ((item.desc.length > 150 || item.desc.length < 100) ? " class='red'" : ""):""}>${item.desc?item.desc:"null"}(${item.desc?item.desc.length:"0"})</td>`;
                               str+=`<td>${item.descUS?item.descUS:"null"}</td></tr>`;

                               str+=`<tr><td>OG Title:</td><td>${item.ogTitle?item.ogTitle:"null"}</td>`;
                               str+=`<td>${item.ogTitleUS?item.ogTitleUS:"null"}</td></tr>`;

                               // 验证
                              if(item.ogUrlUS){
                                str+=`<tr><td>OG URL:</td><td><a ${item.ogUrl ?( ((item.ogUrl.indexOf('https')==-1)||(islocalized(item.ogUrl,item.geo)==false)||(samewithUS(item.ogUrl,item.geo,item.ogUrlUS)==false))?"class='red'":""):""}href="${item.ogUrl?item.ogUrl:""}" target="_blank">${item.ogUrl?item.ogUrl:"null"}</a></td>`;
                                str+=`<td><a  href="${item.ogUrlUS}" target="_blank">${item.ogUrlUS}</a></td></tr>`;
                              }else{
                                str+=`<tr><td>OG URL:</td><td><a ${item.ogUrl ?( ((item.ogUrl.indexOf('https')==-1)||(islocalized(item.ogUrl,item.geo)==false))?"class='red'":""):""}href="${item.ogUrl?item.ogUrl:""}" target="_blank">${item.ogUrl?item.ogUrl:"null"}</a></td>`;
                                str+=`<td><a  href="${"null"}" target="_blank">${'null'}</a></td></tr>`;
                              }


                               str+=`<tr><td>OG Description:</td><td${item.ogDesc ? ((item.ogDesc.length > 150 || item.ogDesc.length < 100) ? " class='red'" : ""):""}>${item.ogDesc?item.ogDesc:"null"}(${item.ogDesc ?item.ogDesc.length:"0"})</td>`;
                                    str+=`<td>${item.ogDescUS?item.ogDescUS:""}</td></tr>`



                               // 验证+1
                              str+=`<tr><td>OG Image:</td><td><img src="${item.oglab?item.oglab:"null"}" alt="oglab" style="width:60px;height:60px"><br>
                                <a ${item.oglab ?( (item.oglab.indexOf('https')==-1) ?"class='red'":""):""} href="${item.oglab?item.oglab:""}" target="_blank">${item.oglab?item.oglab:""}</a> </td>`;
                                    str+=`<td><img src="${item.ogImageUS?item.ogImageUS:"null"}" alt="ogImageUS" style="width:60px;height:60px"><br><a  href="${item.ogImageUS?item.ogImageUS:""}" target="_blank">${item.ogImageUS?item.ogImageUS:"null"}</a></td></tr>`;

                                //验证+2
                              str+=`<tr><td>OG Image Current Server:</td><td><img src="${item.ogImage.url ? item.ogImage.url : 'null'}" alt="ogImage" style="width:60px;height:60px"><br>
                                             Width:${item.ogImage.size ? item.ogImage.size.width : ''}.Hight:${item.ogImage.size ? item.ogImage.size.height : ''} <br>
                                              <a ${item.ogImage.url ?( (item.ogImage.url.indexOf('https')==-1) ?"class='red'":""):""}  href="${item.ogImage.url?item.ogImage.url:''}" target="_blank">${item.ogImage.url ? item.ogImage.url : ''}</a>
                                             </td><td><img src="${item.ogImageUScur ? item.ogImageUScur : ''}" alt="ogImageUScUR" style="width:60px;height:60px"><br><a href="${item.ogImageUScur?item.ogImageUScur:""}" target="_blank">${item.ogImageUScur?item.ogImageUScur:""}</a></td>
                                    </tr>`;

                            if (item.geo=="CN") {
                              if(item.wechat){
                                  str+=`<tr><td>WeChat Image:</td><td><img src="${item.wechat.url?item.wechat.url:"null"}" alt="wachatImage" style="width:60px;height:60px"><br>
                                  Width:${item.wechat.size?item.wechat.size.width:"null"}.Hight:${item.wechat.size?item.wechat.size.height:"null"} <br>
                                  <a href="${item.wechat.url?item.wechat.url:""}" target="_blank">${item.wechat.url?item.wechat.url:""}</a> </td><td>N/A</td></tr>`;
                              }else{
                                  str+=`<tr><td>WeChat Image:</td><td><img src="" alt="wachatImage" style="width:60px;height:60px"><br>
                                  Width:${"null"}.Hight:${"null"} <br>
                                  <a href="${""}" target="_blank">${""}</a> </td><td>N/A</td></tr>`;
                              }
                            }

                          }else if (item.desc==="Bad Link") {
                              str += `<tr><td>${item.url}</td><td>Bad Link</td></tr>`
                          }   
                        }); //foreach结束
                          document.getElementById('resContainer').innerHTML=str;
                        } else {
                            console.log("null");
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
                if(this.urls.length > 0){
                    console.log(storedData);
                    $.post(`/api/export/`, {
                        data: JSON.stringify(storedData),
                        title : 'Meta Report',
                        file : 'meta'
                    }, (data) => {
                        $.fileDownload(`/api/files/${data}`);
                    })
                }
            }
        }
    }
</script>
<style>
     .headline > a {
        color:white;

    }
    .f1{
        color: white;
    }
</style>