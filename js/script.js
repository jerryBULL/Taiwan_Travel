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
                    city:"",
                    category:1
                }
            }
        },
        mounted (){
            this.GetTravelData(1)
        },
        computed: {

        },
        methods: {
            GetTravelData: function (category){
                let v_this = this;
                let api_url = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category="+category;
                v_this.CallApi("GET",api_url,"JSON","",
                    function (res) {
                        v_this.travel_data = res;
                    }
                );
            },
            ChangeCity:function () {
                
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