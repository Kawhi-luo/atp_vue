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
                <button type="button" class="btn btn-primary" id="btn_image_export">Export</button>
                <button type="button" class="btn btn-primary" id="btn_image_download">Download</button>
            </div>
            <br/>
            <div>
                <div class="row">
                    <div class="col-md-6" id="image_us_res_out" style="display:none">
                        <table class="table table-bordered">
                            <thead class="text-center">
                                <tr id="image_us_geo_title">
                                    <td colspan="2">US</td>
                                </tr>
                            </thead>
                            <tbody id="image_us_res"></tbody>
                        </table>
                    </div>
                    <div class="col-md-12" id="image_gc_res_out" style="display:none">
                        <table class="table table-bordered">
                            <thead class="text-center">
                                <tr id="image_gc_geo_title">
                                    <td>Name</td>
                                    <td id="image_td_us_title">US</td>
                                    <td id="image_td_cn_title">CN</td>
                                    <td id="image_td_hktc_title">HK</td>
                                    <td id="image_td_hken_title">HKEN</td>
                                    <td id="image_td_tw_title">TW</td>
                                    <td id="image_td_mo_title">MO</td>
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

    export default{
        data(){
            return{
                url:''
            }
        },
        methods:{
            btn_query_us(){
                alert('btnQuest');
                let url = document.getElementById('url');
                if(url.value.length > 5){
                    _image.type = 'us';
                    //_image.res.empty;
                    _image.res = '';
                    //document.getElementById('resContainer').innerHTML='';
                    document.getElementById('bg_loading').style.display="block";
                    var url_trim = url.value.replace(/(^\s*)|(\s*$)/g, "");
                    axios.post('/api/image/getUSImage',{url:url.value})
                    .then(function(res){
                        document.getElementById('bg_loading').style.display="none";
                        document.getElementById('image_us_res_out').style.display="block";
                        document.getElementById('image_gc_res_out').style.display="none";
                        console.log(_image.type);
                        console.log(data);
                        if (data && data.result === true) {
                            _image.data = data.data;
                            document.getElementById('image_us_res').innerHTML='';
                        };
                            // <tr><td class="text-left" >${data.data.url}</td><td class="text-left">${data.data.total}</td></tr>${data.data.list.map(item => `<tr><td><img src="${item}" alt="ImageUrl" class="ext-thumb"></td><td style="word-wrap:break-word"><a href="${item}" target="_blank">${item}</a></td></tr>`).join('')}';
                            // } else {
                            //     console.log(data);
                            // }
                    })
                    .catch(function(err){
                        alert('qFalse');
                    })
                } else {
                    console.log("null");
                }
            },
            btn_query_gc(){
                alert('gc');
                get_compare_data('gc');
            },
            btn_query_cn(){
                alert('cn');
                get_compare_data('cn');
            },
            btn_query_hktc(){
                alert('hktc');
                get_compare_data('hktc');
            },
            btn_query_hken(){
                alert('hken');
                get_compare_data('hken');
            },
            btn_query_mo(){
                alert('mo');
                get_compare_data('mo');
            },
            btn_query_tw(){
                alert('tw');
                get_compare_data('tw');
            },
            btnExport(){
                alert('btnExport');
                let urls = document.getElementById('urls');
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
    //     let url = document.getElementById("url");
    //     var get_compare_data = (geo) => {
    //     if (url.value.length > 5) {
    //         _image.res='';
    //         document.getElementById('bg_loading').style.display="block";
    //         axios.post(`api/image/compare/${geo}`, {url: url.value})
    //         .then(function (data) {
    //             $("#bg_loading").hide();
    //             $("#image_us_res_out").hide();
    //             $("#image_gc_res_out").show();
    //             document.getElementById('bg_loading').style.display="none";
    //             document.getElementById('image_us_res_out').style.display="none";
    //             document.getElementById('image_gc_res_out').style.display="block";

    //             if (data && data.result === true) {
    //                 _image.data = data.data;
    //                 console.log(data);

    //                 let arr = ['US'];

    //                 if (geo === 'gc') {
    //                     _image.type = 'gc';
    //                     arr = ['US', 'CN', 'HKTC', 'HKEN', 'TW', 'MO']
    //                 } else {
    //                     _image.type = geo;
    //                     arr.push(geo.toUpperCase());
    //                 }
    //                 //console.log(_image.type);
    //                 //console.log(arr);

    //                 ['US', 'CN', 'HKTC', 'HKEN', 'TW', 'MO'].forEach(item => {
    //                     document.getElementById('image_td_${item.toLowerCase()}_title').style.display="none";
    //                 });

    //                 arr.forEach(item => {
    //                     document.getElementById('image_td_${item.toLowerCase()}_title').style.display="block";
    //                 });

    //                 let str = "";

    //                 data.data.map(item => {
    //                     str += `<tr><td rowspan="2">${item.name}</td>`;

    //                     arr.map(geo => {
    //                         str += `<td><img class="ext-thumb" src="${item[geo] || ''}" alt="${item[geo] || ''}" /></td>`;
    //                     });
    //                     str += `</tr><tr>`;

    //                     arr.map(geo => {
    //                         str += `<td><a href="${item[geo] || ''}" target="_blank">${item[geo] || ''}</a></td>`;
    //                     });

    //                     str += `</tr>`;
    //                 });

    //                 document.getElementById('image_gc_res').innerHTML=str;
    //             }
    //         });
    //     } else {
    //         alert('The URL length is too short!');
    //     }
    // };
</script>