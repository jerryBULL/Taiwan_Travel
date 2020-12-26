$(function(){
    let vue = new Vue({
        el:"#vue_app",
        data:function(){
            return{
                citys:["台北市","基隆市","新北市","連江縣","宜蘭縣","新竹市","新竹縣","桃園市","苗栗縣","台中市","彰化縣","南投縣","嘉義市","嘉義縣","雲林縣","台南市","高雄市","澎湖縣","金門縣","屏東縣","台東縣","花蓮縣"],
                category:{
                    "1":"音樂表演",
                    "2":"戲劇表演",
                    "3":"舞蹈表演",
                    "4":"親子活動",
                    "5":"獨立音樂",
                    "6":"展覽資訊",
                    "7":"講座資訊",
                    "8":"電影資訊"
                },
                travel_data:'',
                now_select:{
                    city:"全部地區",
                    category:1,
                    interval_start_time:'',
                    interval_end_time:''
                },
                is_api_run:true,
            }
        },
        mounted (){
            this.GetTravelData('',1);
        },
        computed: {
            ExhibitionData:function(){
                let v_this = this;
                let filter_travel_data = [];
                let travel_data = v_this.travel_data;
                interval_start_time = v_this.now_select.interval_start_time;
                interval_end_time = v_this.now_select.interval_end_time;
                select_exhibition_location = v_this.now_select.city;
                if(select_exhibition_location != "全部地區"){       
                    for(let key in travel_data){
                        if(v_this.travel_data[key].showInfo[0]["location"].search(select_exhibition_location) != -1){
                            if(interval_start_time && interval_end_time){
                                    start_time = travel_data[key].startDate
                                    end_time = travel_data[key].endDate
                                    if(Date.parse(interval_start_time)-28800000 <= Date.parse(start_time) && Date.parse(interval_end_time) >= Date.parse(end_time)){
                                        filter_travel_data.push(travel_data[key]);
                                    }   
                            }else{
                                filter_travel_data.push(travel_data[key]);
                            }
                        }
                    }
                    return filter_travel_data;
                }else{
                    if(interval_start_time && interval_end_time){
                        for(let key in travel_data){
                            start_time = travel_data[key].startDate
                            end_time = travel_data[key].endDate
                            if(Date.parse(interval_start_time)-28800000 <= Date.parse(start_time) && Date.parse(interval_end_time) >= Date.parse(end_time)){
                                filter_travel_data.push(travel_data[key]);
                            }
                        }
                        return filter_travel_data;
                    }
                    return travel_data;
                }
            }
        },
        methods: {
            GetTravelData: function (event,category){
                category = category ? category : event.target.value;
                let v_this = this;
                v_this.travel_data = "";
                v_this.is_api_run = true;
                let api_url = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category="+category;
                v_this.CallApi("GET",api_url,"JSON","",
                    function (res) {
                        let travel_data = [];
                        res.forEach(function(value,key) {
                            //資料中有些沒有showInfo[0]，所以需要先判斷處理不然會報錯
                            if( value.showInfo.length == 0){
                                value.showInfo.push({"location":"尚未提供","price":"免費"});
                            }
                            travel_data.push(value);
                        });
                        v_this.travel_data = travel_data;
                        v_this.is_api_run = false;
                    }
                );
            },
            CallApi:function (type,url,dataType,data,cb) {
                $.ajax({
                    type: type,
                    url: url,
                    dataType: dataType,
                    data:data,
                    success: function (response) {
                        cb(response);
                    },
                    error:function (error) {
                        console.log('error :>> ', error);
                    }
                });
            }
        }
    })
})