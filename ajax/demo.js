



$(document).ready(function(){
    //获取城市列表
    $.ajax({
        type: 'get',
        async: false,
        url: 'https://sapi.k780.com/?app=weather.city&appkey=31038&sign=31285703d59d2a88e60dfa39f526c0a2&format=json&jsoncallback=data',
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'data',
        success: function (data) {
            
            if (data.success != '1') {
                console.log(data.msgid + ' ' + data.msg);
                exit;
            }

            
            //获取area_2和area_3 =="城区"的数据
            var i=1,citys={};
            for(item in data.result){
                if(data.result[item].area_2==="城区"||data.result[item].area_3==="城区"){
                    citys[i++]=data.result[item];
                }
            }
           
            console.log(citys);

            //将得到的 citys 数据整理成所需要的格式
            var cityList={},//{"广东":[  ['广州',weaid],['汕尾',weaid],...,['惠州',weaid] ]}
                area_1_list=[];//area-1 的列表 ["广东","广西"]

            //遍历 citys ,添加数据到 area_1_list cityList
            var province,area_2_city,weaId;
            for(var t in citys ){
                province=citys[t].area_1;
                area_2_city=citys[t].area_2;
                weaId=citys[t].weaid;
                if(area_1_list.indexOf(province)===-1){
                    area_1_list.push(province);
                }

                if(!cityList[province]){
                    cityList[province]=[];
                }
                cityList[province].push([area_2_city,weaId]);


            }
            console.log(area_1_list);
            console.log(cityList);

            //渲染下拉框数据
            area_1_list.forEach(function(item){
                $(".area-1").html(function(index,oldcontent){
                    return oldcontent+"<option value ="+item+">"+item+"</option>";
                });
            });
            $(".area-1").change(function(){
                $(".area-2").html("");
                cityList[this.value].forEach(function(item){
                    $(".area-2").html(function(index,oldcontent){
                        return oldcontent+'<option value ='+item[0]+' weaid='+item[1]+'>'+item[0]+'</option>'
                    });
                })
            }).trigger('change');
            
            $("#aqi-demand").click(function(){
                
                var weaid=$(".area-2").find("option:selected").attr("weaid");
                $.ajax({
                    type: 'get',
                    async: false,
                    url: 'https://sapi.k780.com/?app=weather.pm25&weaid='+weaid+'&appkey=31038&sign=31285703d59d2a88e60dfa39f526c0a2&format=json&jsoncallback=data',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'data',
                    success:function(data){
                        if (data.success != '1') {
                            console.log(data.msgid + ' ' + data.msg);
                            exit;
                        }
                        console.log(data.result);
                        if(data.result.aqi=="0"){
                            $("strong").text("该城市查询不到数据");
                            return;
                        }
                        $("#aqi-demand+p").text(data.result.citynm+"的空气质量指数:"+data.result.aqi);
        
                    },
                    error:function(){ console.log('fail');}
                });
            });
           
            
        },
        error: function () {
            alert('fail');
        }
    });
});