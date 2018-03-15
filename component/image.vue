<template id="image">
	<div>
		<h2 class="page-header">Image Checker</h2>
        <div>
            <div class="form-inline">URL: (https://www.apple.com/ipad-pro/)<br>
                <input type="text" id="url" class="form-control" placeholder="For US URL Only" size="50" v-model="url">
                <button @click="btn_query_us" type="button" class="btn btn-primary" id="btn_query_us">US Image</button>
                <div class="btn-group">
                    <button @click="btn_query_gc" type="button" class="btn btn-primary" id="btn_query_gc">GC Compare</button>
                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="caret"></span>
                        <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a @click="btn_query_cn" href="javascript:void(0)" id="btn_query_cn">CN</a></li>
                        <li><a @click="btn_query_hktc" href="javascript:void(0)" id="btn_query_hktc">HK</a></li>
                        <li><a @click="btn_query_hken" href="javascript:void(0)" id="btn_query_hken">HKEN</a></li>
                        <li><a @click="btn_query_mo" href="javascript:void(0)" id="btn_query_mo">MO</a></li>
                        <li><a @click="btn_query_tw" href="javascript:void(0)" id="btn_query_tw">TW</a></li>
                    </ul>
                </div>
                <button type="button" class="btn btn-primary" id="btn_image_export" @click="btn_image_export">Export</button>
                <button type="button" class="btn btn-primary" id="btn_image_download" @click="btn_image_download">Download</button>
            </div>
            <br/>
            <div>
                <div class="row">
                    <div class="col-md-6" id="image_us_res_out" v-show="image_us_res_out">
                        <table class="table table-bordered">
                            <thead class="text-center">
                                <tr id="image_us_geo_title">
                                    <td colspan="2">US</td>
                                </tr>
                            </thead>
                            <tbody id="image_us_res"></tbody>
                        </table>
                    </div>
                    <div class="col-md-12" id="image_gc_res_out" v-show="image_gc_res_out">
                        <table class="table table-bordered">
                            <thead class="text-center">
                                <tr id="image_gc_geo_title">
                                    <td>Name</td>
                                    <td id="image_td_us_title" v-show="image_td_us_title">US</td>
                                    <td id="image_td_cn_title" v-show="image_td_cn_title">CN</td>
                                    <td id="image_td_hktc_title" v-show="image_td_hktc_title">HK</td>
                                    <td id="image_td_hken_title" v-show="image_td_hken_title">HKEN</td>
                                    <td id="image_td_tw_title" v-show="image_td_tw_title">TW</td>
                                    <td id="image_td_mo_title" v-show="image_td_mo_title">MO</td>
                                </tr>
                            </thead>
                            <tbody id="image_gc_res"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    var _image = {
        url: document.getElementById('url'),
        data: null,
        res: document.getElementById('res'),
        res_out: document.getElementById('res_out'),
        type: ''
    };
    var storedData;
    var qs = require('qs');
    import  bus from '../assets/eventBus';
    import axios from 'axios';
    export default{
        data(){
            return{
                url:'',
                image_us_res_out:false,
                image_gc_res_out:false,
                image_td_us_title:false,
                image_td_cn_title:false,
                image_td_hktc_title:false,
                image_td_hken_title:false,
                image_td_tw_title:false,
                image_td_mo_title:false
            }
        },
        methods:{
            btn_query_us(){
                let vm = this;
                if(this.url.length > 5){
                    _image.type = 'us';
                    _image.res = '';
                    bus.$emit("show",true);
                    axios.post('/api/image/getUSImage',qs.stringify({ 'url': vm.url }))
                    .then(function(data){
                        bus.$emit("show",false);
                        vm.image_us_res_out = true;
                        vm.image_gc_res_out = false;
                        console.log(_image.type);
                        console.log(data);
                        if (data.data && data.data.result === true){
                            _image.data = data.data.data
                            document.getElementById('image_us_res').innerHTML = `<tr><td class="text-left" >${data.data.data.url}</td><td class="text-left">${data.data.data.total}</td></tr>${data.data.data.list.map(item => `<tr><td><img src="${item}" alt="ImageUrl" style="width:60px;height:60px"></td><td style="word-wrap:break-word"><a href="${item}" target="_blank">${item}</a></td></tr>`).join('')}`
                        }else{
                            console.log(data.data);
                        }
                    })
                    .catch(function(err){
                        alert('qFalse');
                    })
                } else {
                    console.log("short");
                }
            },
            btn_query_gc(){
                alert('gc');
                this.$options.methods.get_compare_data('gc');
                this.image_td_us_title=true;
                this.image_td_cn_title=true;
                this.image_td_hktc_title=true;
                this.image_td_hken_title=true;
                this.image_td_tw_title=true;
                this.image_td_mo_title=true;
            },
            btn_query_cn(){
                alert('cn');
                this.$options.methods.get_compare_data('cn');
                this.image_td_us_title=true;
                this.image_td_cn_title=true;
                this.image_td_hktc_title=false;
                this.image_td_hken_title=false;
                this.image_td_tw_title=false;
                this.image_td_mo_title=false;
            },
            btn_query_hktc(){
                alert('hktc');
                this.$options.methods.get_compare_data('hktc');
                this.image_td_us_title=true;
                this.image_td_cn_title=false;
                this.image_td_hktc_title=true;
                this.image_td_hken_title=false;
                this.image_td_tw_title=false;
                this.image_td_mo_title=false;
            },
            btn_query_hken(){
                alert('hken');
                this.$options.methods.get_compare_data('hken');
                this.image_td_us_title=true;
                this.image_td_cn_title=false;
                this.image_td_hktc_title=false;
                this.image_td_hken_title=true;
                this.image_td_tw_title=false;
                this.image_td_mo_title=false;
            },
            btn_query_mo(){
                alert('mo');
                this.$options.methods.get_compare_data('mo');
                this.image_td_us_title=true;
                this.image_td_cn_title=false;
                this.image_td_hktc_title=false;
                this.image_td_hken_title=false;
                this.image_td_tw_title=false;
                this.image_td_mo_title=true;
            },
            btn_query_tw(){
                alert('tw');
                this.$options.methods.get_compare_data('tw');
                this.image_td_us_title=true;
                this.image_td_cn_title=false;
                this.image_td_hktc_title=false;
                this.image_td_hken_title=false;
                this.image_td_tw_title=true;
                this.image_td_mo_title=false;
            },
            get_compare_data(geo) {
                    console.log(this);
                    if (document.getElementById('url').value.length > 5) {
                        _image.res='';
                        bus.$emit("show",true);
                        axios.post(`/api/image/compare/${geo}`,qs.stringify({ 'url': document.getElementById('url').value }))
                        .then(function (data) {
                            console.log(data);
                            bus.$emit("show",false);
                            document.getElementById('image_gc_res_out').style.display="block";
                            document.getElementById('image_us_res_out').style.display="none";
                            if (data.data && data.data.result === true) {
                                _image.data = data.data.data;
                                console.log(data.data);
                                let arr = ['US'];
                                if (geo === 'gc') {
                                    _image.type = 'gc';
                                    arr = ['US', 'CN', 'HKTC', 'HKEN', 'TW', 'MO'];
                                } else {
                                    _image.type = geo;
                                    arr.push(geo.toUpperCase());
                                }
                                let str = "";
                                data.data.data.map(item => {
                                    str += `<tr><td rowspan="2">${item.name}</td>`;
                                    arr.map(geo => {
                                        str += `<td><img style="width:60px;height:60px;" src="${item[geo] || ''}" alt="${item[geo] || ''}" /></td>`;
                                    });
                                    str += `</tr><tr>`;
                                    arr.map(geo => {
                                        str += `<td><a href="${item[geo] || ''}" target="_blank">${item[geo] || ''}</a></td>`;
                                    });
                                    str += `</tr>`;
                                });
                                document.getElementById('image_gc_res').innerHTML=str;
                            }
                        })
                        .catch(function(err){
                            alert('qFalse');
                        })
                    } else {
                        alert('The URL length is too short!');
                    }
                },
            btn_image_export(){
                var arr = [];
                if (_image.type === 'us') {
                    arr.push({
                            url: _image.data['url'],
                            geo: _image.data['geo'],
                            total: _image.data['total'],
                            list: _image.data['list']
                        })
                }else{
                   arr=_image.data;
                }
                $.post(`/api/export/`, {
                    data: JSON.stringify(arr),
                    title : 'image Report',
                    file : 'image'
                }, (data) => {
                    $.fileDownload(`/api/files/${data}`);
                })
            },
            btn_image_download(){
                bus.$emit("show",true);
                if (_image.type === 'us') {
                    $.post(`/api/image/download`, {
                            data: JSON.stringify(_image.data)
                        },
                        (data) => {
                            bus.$emit("show",false);
                            $.fileDownload(`/api/files/tmp/${data}`);
                        })
                }
            }
        }
    }
</script>