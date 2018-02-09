<template id="mp4">
	<div><h2 class="page-header">Video Checker</h2>
        <div>
            <div class="form-inline">
                URL: (https://www.apple.com/ipad-pro/)<br>
                <input id="url" class="form-control" placeholder="One URL Only" size="50" v-model="url">
                <button @click="btnQuest" type="button" class="btn btn-primary" id="btn_query_us">Query</button>
            </div>
            <br/>
            <div>
                <div class="row">
                    <div class="col-md-6" id="video_us_res_out" v-show="video_us_res_out">
                        <table class="table table-bordered">
                            <thead class="text-center">
                                <tr id="video_us_geo_title">
                                    <td colspan="2">US</td>
                                </tr>
                            </thead>
                            <tbody id="video_us_res" v-model="video_us_res"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import  bus from '../assets/eventBus';
    import axios from 'axios';
    export default{
        data(){
            return{
                url:'',
                video_us_res_out:false,
                video_us_res:''
            }
        },
        methods:{
            btnQuest(){
                var _video = {
                    url: document.getElementById('url'),
                    data: null,
                    res: document.getElementById('res'),
                    res_out: document.getElementById('res_out'),
                    type: ''
                };
                var qs = require('qs');
                let vm = this;
                if(this.url.length > 5){
                    _video.type = 'us';
                    bus.$emit("show",true);
                    //axios.post('/api/video',{url:url.value})
                    axios.post('/api/video',qs.stringify({ 'url': vm.url }))
                    .then(function(data){
                        bus.$emit("show",false);
                        vm.video_us_res_out=true;
                        console.log(data.data);
                        var storedData = data.data.data;
                        if(data.data && data.data.result === true){
                            console.log('aa');
                            _video.data = data.data.data;
                            document.getElementById('video_us_res').innerHTML = `<tr><td class="text-left" >${data.data.data.url}</td><td class="text-left">${data.data.data.total}</td></tr>${data.data.data.list.map(item => `<tr><td><video src="${item}" class="ext-video" controls="controls"/></td><td style="word-wrap:break-word"><a href="${item}" target="_blank">${item}</a></td></tr>`).join('')}`;
                        }
                    })
                    .catch(function(err){
                        alert('qFalse');
                    })
                }else{
                    alert('The URL length is too short!')
                }
            }
        }
    }
</script>