
var lg=localStorage.getItem("language");
/*页面滚动导航背景颜色变换*/
function scrollFunction() {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        $(".page-herder").addClass('filled');
    } else {
        $(".page-herder").removeClass('filled');
    }
}
var id=GetRequest("id");
/*var id=GetRequest("id");
var lg=GetRequest("lg");*/
//$(".news-href").attr("href","newsList.html")
//获取链接中的参数
function GetRequest(param) {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest[param];
}
function switchLanguage(lg){
	if(lg==0){
		$(".switch-language-txt").each(function(){
			var _this=$(this);
			//console.log()
			_this.html(_this.data("ch"))
		})
		$('.index-href').attr("href","home_zh.html");
        $('.nav-intro').attr("href","home_zh.html#introduction");
        $('.nav-team').attr("href","home_zh.html#mission");
        $('.nav-news').attr("href","home_zh.html#news");
		$('.nav-sys').attr("href","home_zh.html#items");
        $('.nav-bus').attr("href","home_zh.html#percentage");
	}else if(lg==1){
		$(".switch-language-txt").each(function(){
			var _this=$(this);
			//console.log()
			_this.html(_this.data("en"))
		})
		$('.index-href').attr("href","home_en.html");
        $('.nav-intro').attr("href","home_en.html#introduction");
        $('.nav-team').attr("href","home_en.html#mission");
        $('.nav-news').attr("href","home_en.html#news");
		$('.nav-sys').attr("href","home_en.html#items");
        $('.nav-bus').attr("href","home_en.html#percentage");
	}
	
}
switchLanguage(lg);
$(function() {
	if(location.href.indexOf("detail.html")>-1){
		getDocDetail();
	}else if(location.href.indexOf("listPage.html")>-1){
		getDocList(lg);
	}
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
    $("#nav").on("click","li",function(){
        $("#nav .active").removeClass("active")
        $(this).addClass("active")
    });
	//底部图标切换
	$(".footer-msg").on("click mouseover","li",function(){
	    $(".footer-msg .cur").removeClass("cur")
	    $(this).addClass("cur")
	});
	$(".swith-lg").click(function(){
		//alert(222)
		var that=$(this)
		lg=that.data("lg");
        localStorage.setItem("language",lg); 
		//console.log(lg)
		if(lg==0){
			$(".change-language").data("lg",1)
		}else{
			$(".change-language").data("lg",0)
		}
		$(".body-warp").removeClass("fail nodata").addClass("loading")
		$("#substance").html("");
		switchLanguage(lg)
		if(location.href.indexOf("detail.html")>-1){
			getDocDetail();
		}else if(location.href.indexOf("listPage.html")>-1){
			getDocList(lg);
		}
        //replaceParamVal("lg",lg)
	});		
});
//计算列表区域的最小高度
function minH(){
	var bodyHeight=parseInt(document.body.clientHeight);
	var bodyTopHeight=parseInt($(".page-herder").height());
	var bodyBottomHeight=parseInt($("#page-footer").innerHeight());
	var minHeight=bodyHeight-bodyTopHeight-bodyBottomHeight
	//console.log(bodyHeight)
	$(".body-warp").css({'minHeight':minHeight})
}
	//获取文章列表
	function getDocList(lg){
		//alert(111)
		$.ajax({
		    type : "GET",
		    contentType: "application/json;charset=UTF-8",
		    url : "https://pdschain.org/getdata/queryAll?lang="+lg,
		    success : function(data) {
		        if(data.success){
                    $(".loading").removeClass("loading nodata fail");
		        	if(data.rows.length>0){
		        		var dataList=data.rows;
		        		var htmlStr="";
		        		for(var i=0;i<dataList.length;i++){
		        			htmlStr+='<li class="have-img">'
		        				+'<div class="wrap-img">'
		        					+'<img class="img-blur-done" src="'+dataList[i].pic+'" alt="">'
		        				+'</div>'
		        				+'<div class="single-mode">'
		        					+'<div class="content"><div>'
		        						+'<a href="detail.html?id='+dataList[i].id+'&lg='+lg+'" target="_blank">'
		        							+'<div class="title">'
		        								+'<p>'+dataList[i].title+'</p>'
		        							+'</div>'
		        							+'<div class="abstract">'
		        								+'<p style="word-wrap:break-word">'+dataList[i].desc+'</p>'
		        							+'</div>'
		        						+'</a></div>'
		        					+'</div>'
		        					+'<div class="footer-bar">'+dataList[i].createTimeStr+'</div>'
		        				+'</div>'
		        			+'</li>'
		        		}	
		        		$(".note-list").html(htmlStr);
		        		$('img').on('error', function(){
		        			$(this).unbind('error'); //防止替换图片加载失败后陷入无限循环
		        			$(this).attr('src', 'images/error.jpg');
		        		})
		        	}else{
                        $(".loading").removeClass("loading");
                        $(".fail").removeClass("fail")
                        $(".body-warp").addClass("nodata")
					}
		        }else{
                    $(".loading").removeClass("loading nodata fail");
                    $(".body-warp").addClass("fail")
				}
		    }
		});
	}
	
	//获取文章详情
	function getDocDetail(){
		$.ajax({
		    type : "GET",
		    contentType: "application/json;charset=UTF-8",
		    url : "https://pdschain.org/getdata/queryById?id="+id,
		    success : function(data) {
		        if(data.success){
                    $(".loading").removeClass("loading nodata fail");
					$(".doc—title").html(data.rows.title)
					$(".time").html('创建时间：'+data.rows.createTimeStr)
					$('.doc_text').html(data.rows.content)     		
		        }else{
                    $(".loading").removeClass("loading nodata fail");
					$(".body-warp").addClass("fail")
				}
		    }
		});
	}
	