AOS.init({
	easing: 'ease-out-back',
});
/*页面滚动导航背景颜色变换*/
function scrollFunction() {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        $(".page-herder").addClass('filled');
    } else {
        $(".page-herder").removeClass('filled');
    }
}
$(function() {
	var lg=$("#language").data("lg");
	 localStorage.setItem("language",lg); 
    window.onscroll = function() {
        scrollFunction()
    };
    scrollFunction();
    //点击事件
    $(".overlay a").on('click',
        function() {
            $('.burger').removeClass('change');
        });
    $('.burger').on('click', function() {
            $(this).toggleClass('change');
            $("#overlay").toggleClass('window');
            $("body").toggleClass('modal-open');
        });
    $('.overlay-content a').on('click',
        function() {
            $("#overlay").toggleClass('window');
            $("body").toggleClass('modal-open');
    });
    $("#nav").on("click mouseover","li",function(){
        $("#nav .active").removeClass("active")
        $(this).addClass("active")
    });
    //底部图标切换
    $(".footer-msg").on("click mouseover","li",function(){
        $(".footer-msg .cur").removeClass("cur")
        $(this).addClass("cur")
    });
	
	/*var data={
		"success": true,
		"rows": [{
			"id": 10,
			"title": "11ddf",
			"lang": 0,
			"pic": "http://127.0.0.1/20191017125748.gif",
            "desc":"国家发改委召开",
			"content": "<p>asdfasdfffffffffffffffffff</p >",
			"sort": 11,
			"isDel": 1,
			"createTime": 1571287469361,
			"createTimeStr": "2019-10-17 04:44:29",
			"updateTime": 1571287469361,
			"updateTimeStr": "2019-10-17 04:44:29"
		},{
			"id": 10,
			"title": "11ddf",
			"lang": 0,
			"pic": "http://127.0.0.1/20191017125748.gif",
            "desc":"国家发改委召开",
			"content": "<p>asdfasdfffffffffffffffffff</p >",
			"sort": 11,
			"isDel": 1,
			"createTime": 1571287469361,
			"createTimeStr": "2019-10-17 04:44:29",
			"updateTime": 1571287469361,
			"updateTimeStr": "2019-10-17 04:44:29"
		}],
		"data": null,
		"message": null,
		"total": 12
	}*/
	$.ajax({
        type : "GET",
        contentType: "application/json;charset=UTF-8",
        url : "https://pdschain.org/getdata/queryAll?lang="+lg,
        success : function(data) {
            if(data.success){
                if(data.rows.length>0){
                    $('#news').show()
                    var dataList=data.rows;
                    if(dataList[0]){
                        var htmlStr0='<a href="detail.html?id='+dataList[0].id+'&lg='+lg+'" target="_blank" style="display:block"><div class="news-img">'
            			    +'<img src="'+dataList[0].pic+'"/>'
            			     +'</div>'
            			    +'<div class="news-desc">'
            			    +'<p>'+dataList[0].desc+'</p>'
            			    +'</div></a>'
                        $(".news-lists .li0").html(htmlStr0)
                    }else{
                        $(".news-lists .li0").css({'margin':"0px auto 0px"})
                    }
                    if(dataList[1]){
                        var htmlStr1='<a href="detail.html?id='+dataList[1].id+'&lg='+lg+'" target="_blank" style="display:block"><div class="news-img">'
            			    +'<img src="'+dataList[1].pic+'"/>'
            			     +'</div>'
            			    +'<div class="news-desc">'
            			    +'<p>'+dataList[1].desc+'</p>'
            			    +'</div></a>'
                        $(".news-lists .li1").html(htmlStr1)
                    }else{
                        $(".news-lists .li1").css({'margin':"0px auto 0px"})
                    }
                    if(dataList[2]){
                        var htmlStr2='<a href="detail.html?id='+dataList[2].id+'&lg='+lg+'" target="_blank" style="display:block"><div class="news-img">'
            			    +'<img src="'+dataList[2].pic+'"/>'
            			     +'</div>'
            			    +'<div class="news-desc">'
            			    +'<p>'+dataList[2].desc+'</p>'
            			    +'</div></a>'
                        $(".news-lists .li2").html(htmlStr2)
                    }else{
                        $(".news-lists .li2").css({'margin':"0px auto 0px"})
                    }
                    if(dataList[3]){
                        var htmlStr3='<a href="detail.html?id='+dataList[3].id+'&lg='+lg+'" target="_blank" style="display:block"><div class="news-img">'
            			    +'<img src="'+dataList[3].pic+'"/>'
            			     +'</div>'
            			    +'<div class="news-desc">'
            			    +'<p>'+dataList[3].desc+'</p>'
            			    +'</div></a>'
                        $(".news-lists .li3").html(htmlStr3)
                    }else{
                        $(".news-lists .li3").css({'margin':"0px auto 0px"})
                    }
                }else{
                    $('#news').hide();
                }
            
            }else{
                $('#news').hide();
            }
            AOS.refresh();
        }
    });
});
window.onresize=function () {
	AOS.refresh();
};
window.onbeforeunload = function(){
    document.documentElement.scrollTop = 0;  //ie下
    document.body.scrollTop = 0;  //非ie
}
