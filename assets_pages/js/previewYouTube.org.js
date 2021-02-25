//20.01.2017 (вв)
//скрипт предназначен для вставки превью картинки вместо видео на ленды
//!!! требует jQuery
$(function(){
	var 
		videos = $(".videoYoutube"),
		reg = /(https|http)\:\/\/(?:www\.|)youtube\.com\/embed\/([a-zA-Z0-9]+).*/i;

	//автозамена картинками
	for(var i=0; i < videos.length; i++){
		var 
			video = $(videos[i]),
			src = video.attr("src");
		video.html("<img src='//img.youtube.com/vi/" + reg.exec(src)[2] + "/0.jpg' alt=''/>");
		video.click(function(){
			var childrens = $(this).children('img');
			if(childrens.length === 1 && childrens[0].tagName === "IMG"){
				$(this).html("<iframe class='video' src='" + src + "' frameborder='0' allowfullscreen></iframe>");
			}
		});
	}
});