<style type="text/css">
  .red{
    color: red;
  }
  .ext-thumb {
    height: 60px;
    width: 60px
  }
</style>
<template id="meta">
	<div>
		<h2 class="page-header">Meta Checker</h2>
        <div class="row">
            <div class="col-md-3">
                <p>URL Import(.txt only)</p>
                <input class="form-control" type="file" id="fileInput">
                <span class="input-group-btn">
                    <input @click="btnImport" type="button" class="btn btn-primary" value="Import">
                </span>
            </div>
            <div class="col-md-4">
                <p>URL Input (eg:https://www.apple.com/cn/iphone)</p>
                <textarea rows="5" class="form-control" v-model="urls"></textarea>
                <button @click="btnQuest" class="btn btn-primary">Query</button>
                <button @click="btnClear" class="btn btn-primary">Clear</button>
                <button @click="btnExport" class="btn btn-primary">Export</button>
            </div>
        </div>
        <div>
            <table class="table table-striped table-bordered" v-if="table" v-for="(item,idx) in tableData">
              <tbody>
                <tr>
                  <td>URL:</td>
                  <td colspan="2"><a :href="item.url">{{item.url}}</a></td>
                </tr>
                <tr>
                  <td></td>
                  <td>Geo</td>
                  <td>US</td>
                </tr>
                <tr>
                  <td>Title:</td>
                  <td :class="{'red':ctitle(idx)}">{{item.title}}</td>
                  <td>{{item.titleUS}}</td>
                </tr>
                <tr>
                  <td>Description:</td>
                  <td :class="{'red':(item.desc.length>150 || item.desc.length<100)}">{{item.desc}}</td>
                  <td>{{item.descUS}}</td>
                </tr>
                <tr>
                  <td>OG Title:</td>
                  <td>{{item.ogTitle}}</td>
                  <td>{{item.ogTitleUS}}</td>
                </tr>
                <tr>
                  <td>OG URL:</td>
                  <td ><a :href="item.ogUrl" :class="{'red':(samewithUS(idx) || islocalized(idx) || item.ogUrl.indexOf('https')==-1)}">{{item.ogUrl}}</a></td>
                  <td><a :href='item.ogUrlUS'>{{item.ogUrlUS}}</a></td>
                </tr>
                <tr>
                  <td>OG Description:</td>
                  <td>{{item.ogDesc}}</td>
                  <td>{{item.ogDescUS}}</td>
                </tr>
                <tr>
                  <td>OG Image:</td>
                  <td><img class="ext-thumb" :src="item.oglab"><br><a :href="item.oglab">{{item.oglab}}</a></td>
                  <td><img class="ext-thumb" :src="item.ogImageUS"><br><a :href="item.ogImageUS">{{item.ogImageUS}}</a></td>
                </tr>
                <tr>
                  <td>OG Image Current Server:</td>
                  <td><img class="ext-thumb" :src="item.ogImage.url">
                    <br>width:{{item.ogImage.size.width}}
                    <br>height:{{item.ogImage.size.height}}
                    <br><a :href="item.ogImage.url" :class="{'red':item.ogImage.url.indexOf('https')==-1}">{{item.ogImage.url}}</a></td>
                  <td><img class="ext-thumb" :src="item.ogImageUScur">
                    <br><a :href="item.ogImageUScur">{{item.ogImageUScur}}</a></td>
                </tr>
                <tr>
                  <td>WeChat Image:</td>
                  <td><img class="ext-thumb" :src="item.wechat.url">
                    <br>width:{{item.wechat.size.width}}
                    <br>height:{{item.wechat.size.height}}
                    <a :href="item.wechat.url">{{item.wechat.url}}</a></td>
                  <td>N/A</td>
                </tr>
              </tbody>
            </table>
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
              this.urls = ''
            },
            btnQuest(){
              //this.tableData = store;
              if(this.urls.length > 5){
                    var vm = this;
                    // bus.$emit("show",true);
                    let urls_trim = this.urls.replace(/(^\s*)|(\s*$)/g, "");
                    console.log(urls_trim);
                    axios.post('/api/trans',qs.stringify({ 'urls': urls_trim }))
                    .then(function(data){
                        console.log(data);
                        vm.table = true;
                        vm.tableData = data.data;
                    })
                    .catch(function(err){
                        console.log('axios false');
                    })
                }else{
                  alert('this length is too short')
                }
            },
            ctitle(idx) {
              let s = "";
              switch (this.tableData[idx].geo){
                  case "CN":s="中国";break;
                  case "HKTC":s="香港";break;
                  case "HKEN":s="HK";break;
                  case "TW":s="台灣";break;
                  case "MO":s="澳門";break;
                  default:s ="";
              }
              let geoname = s;
              let ptitle = this.tableData[idx].title;
              if(ptitle.indexOf(geoname)>0){
                return false;
              }else{
                return true;
              }
            },
            samewithUS(idx){
              let flag = false;
              if(this.tableData[idx].ogUrlUS){
                let arrUrl = this.tableData[idx].url.split('//');
                let start = arrUrl[1].indexOf("/");
                let relUrl = arrUrl[1].substring(start);
                let arrUrlus = this.tableData[idx].ogUrlUS.split("//");
                let startus = arrUrlus[1].indexOf("/");
                let relUrlus = arrUrlus[1].substring(startus);
                if(this.tableData[idx].geo == 'HKEN'){
                  if(relUrl.substring(6)==relUrlus.substring()){
                    flag = false;
                  }else{
                    flag = true;
                  }
                }else{
                  if(relUrl.substring(3)==relUrlus){
                    flag = false;
                  }else{
                    flag = true;
                  }
                }
              }
              return flag;
            },
            islocalized(idx){
              let flag = false;
              if (this.tableData[idx].geo=="HKTC") {
                if (this.tableData[idx].url.indexOf("hk") !== -1 && this.tableData[idx].url.indexOf("/hk/en/") == -1){
                  flag=false;
                }
              }else if(this.tableData[idx].geo=="HKEN"){
                if (this.tableData[idx].url.indexOf("/hk/en/") !== -1){
                  flag=false;
                }
              }else if(this.tableData[idx].url.indexOf(this.tableData[idx].geo.toLowerCase()) !== -1){
                flag=false;
              }
              return flag;
            },
            btnExport(){
                alert('btnExport');
                let urls = document.getElementById('urls');
                if(urls.value.length > 0){
                    console.log(storedData);
                    axios.post(`/api/export`,{
                        data:JSON.stringify(storedData),
                        title:'Meta Report',
                        file:'meta'
                    },(data)=>{
                        //$.fileDownload(`/api/files/${data}`);
                    })
                }
            }
        },
      }
</script>
<style scoped>
     .headline > a {
        color:white;

    }
    .f1{
        color: white;
    }
</style>