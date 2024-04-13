//設定cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    if (exdays != null && exdays > 0) { 
	    var expires = "expires="+d.toUTCString();
	   	document.cookie = cname + "=" + cvalue + ";" + expires;
    } else {  
        document.cookie = cname + "=" + cvalue ;  
    }  
}
	
//取得cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}
	
//刪除cookie
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
	
//將實體化的html轉換為符號
function html_decode(string, quote_style) {
  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined') quote_style = 2;
  string = string.toString()
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quote_style === 0)  noquotes = true;
  if (typeof quote_style !== 'number') { 
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      if (OPTS[quote_style[i]] === 0) noquotes = true;
      else if (OPTS[quote_style[i]]) optTemp = optTemp | OPTS[quote_style[i]];
    }
    quote_style = optTemp;
  }
  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) string = string.replace(/&#0*39;/g, "'");
  if (!noquotes)  string = string.replace(/&quot;/g, '"');
  string = string.replace(/&amp;/g, '&');
  return string;
}

//JS版的nl2br()
function nl2br(str, is_xhtml) {
	  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; 
	  return (str + '')
	    .replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

//購物車
function cart(id,mode,count){
	id = id || 0;
    mode = mode || 1;
    count = count || 1;
	$.ajax({
		type:"POST",
		url:"quote/cart.php",
		dataType:"text",
		data:{"id" : id,
				"mode" : mode,
				"count" : count},
		success:
			function(msg){
				if(id == 0){
					if(msg == 0) $(".cart_sum").html("0");
					else $(".cart_sum").html(msg);				
				}else{
					if(mode == 1) alert("已加入購物車。");
					cart();
				}
			}
	});
};

//語系設定
/*
var lang = "";
$(function(){
	lang = getCookie("lang");
	if(lang == "") lang = "tw";
	lang_set(lang);
});
function lang_set(ver){
	lang = ver;
	setCookie("lang",ver,1);
	//語系資訊更換
	for(var i in lang_data){
		$("#lang_"+i).html(lang_data[i][ver]);
		$(".lang_"+i).html(lang_data[i][ver]);
	}
	$("body").removeClass("lang_tw");
	$("body").removeClass("lang_en");
	$("body").addClass("lang_"+ver);
	$(".m_lang").removeClass("active");
	$(".m_lang_"+ver).addClass("active");
	$(".lang_info_3").attr("href","tel:"+lang_data[3][ver]);
	$(".lang_info_5").attr("href","mailto:"+lang_data[5][ver]);
	page_lang(ver);
};
*/

//表單欄位驗證
//type 1:input   2:mail  3:radio  4:checkbox  5:textarea  6:select	7:checkpw
var id_name = "";
function check(id,type,error,form){
	var emailform = /^([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	type = type || 1;
	error = error || "此欄位為必填";
	form = form || "";
	errorHead = "";
	switch(type){
		case 1:
			if($("input[name='"+id+"']").val() == ""){
				$("#"+id+"_span").html(errorHead + error);
				$("#"+id+"_form").addClass(form);
				id_name = id;
			}else $("#"+id+"_span").html("");
			break;
		case 2:
			if(!emailform.test($("input[name='"+id+"']").val())){
				$("#"+id+"_span").html(errorHead + error);
				$("#"+id+"_form").addClass(form);
				id_name = id;
			}else $("#"+id+"_span").html("");
			break;
		case 3:
			if($("input[name='"+id+"']:checked").val() == null){
				$("#"+id+"_span").html(errorHead + error);
				$("#"+id+"_form").addClass(form);
				id_name = id;
			}else $("#"+id+"_span").html("");
			break;
		case 4:
			if($("input[name='"+id+"[]']:checked").val() == null){
				$("#"+id+"_span").html(errorHead + error);
				$("#"+id+"_form").addClass(form);
				id_name = id;
			}else $("#"+id+"_span").html("");
			break;
		case 5:
			if($("textarea[name='"+id+"']").val() == ""){
				$("#"+id+"_span").html(errorHead + error);
				$("#"+id+"_form").addClass(form);
				id_name = id;
			}else $("#"+id+"_span").html("");
			break;
		case 6:
			if($("select[name='"+id+"']").val() == "N"){
				$("#"+id+"_span").html(errorHead + error);
				$("#"+id+"_form").addClass(form);
				id_name = id;
			}else $("#"+id+"_span").html("");
			break;
		case 7:
			if($("input[name='"+id+"']").val() == "" || $("input[name='"+id+"']").val() != $("input[name='newpw']").val()){
				$("#"+id+"_span").html(errorHead + error);
				$("#"+id+"_form").addClass(form);
				id_name = id;
			}else $("#"+id+"_span").html("");
			break;
	}
}