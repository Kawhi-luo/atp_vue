<template id="mp4">
	<div><h2 class="page-header">Video Checker</h2>
        <div>
            <div class="form-inline">
                URL: (https://www.apple.com/ipad-pro/)<br>
                <input id="url" class="form-control" placeholder="One URL Only" size="50"/>
                <button @click="btnQuest" type="button" class="btn btn-primary" id="btn_query_us">Query</button>
            </div>
            <br/>
            <div>
                <div class="row">
                    <div class="col-md-6" id="video_us_res_out" style="display:none">
                        <table class="table table-bordered">
                            <thead class="text-center">
                                <tr id="video_us_geo_title">
                                    <td colspan="2">US</td>
                                </tr>
                            </thead>
                            <tbody id="video_us_res"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    var _video = {
        url: document.getElementById('url'),
        data: null,
        res: document.getElementById('res'),
        res_out: document.getElementById('res_out'),
        type: ''
    };
    export default{
        methods:{
            btnQuest(){
                alert('btnQuest');
                let url = document.getElementById('url');
                if(url.value.length > 5){
                    _video.type = 'us';
                    document.getElementById('bg_loading').style.display='block';

                    axios.post('/api/video',{url:url.value})
                    .then(function(data){
                        document.getElementById('bg_loading').style.display='none';
                        document.getElementById('video_us_res_out').style.display='block';
                        document.getElementById('video_us_res_out').style.display='none';
                        console.log(data);
                        if(data && data.result === true){
                            _video.data = data.data;
                            document.getElementById('video_us_res').innerHTML = `<tr><td class="text-left" >${data.data.url}</td><td class="text-left">${data.data.total}</td></tr>${data.data.list.map(item => `<tr><td><video src="${item}" class="ext-video" controls="controls"/></td><td style="word-wrap:break-word"><a href="${item}" target="_blank">${item}</a></td></tr>`).join('')}`
                        }else {
                            console.log("data");
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