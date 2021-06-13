//音乐盒歌曲列表的定义
var	playlist = [
{title:"等爱",artist:"JSore",mp3:"http://music.163.com/song/media/outer/url?id=1307170652.mp3",cover:"https://ws1.sinaimg.cn/large/a15b4afegy1fqbcerhdtrj20fk0bot8q.jpg",},
{title:"缺氧",artist:"安苏羽",mp3:"http://music.163.com/song/media/outer/url?id=521602388.mp3",cover:"http://p2.music.126.net/mJg8wJbIoM8d8xQ72eR2qw==/109951163073289601.jpg?param=130y130",},
{title:"爱的故事上集",artist:"孙耀威",mp3:"http://music.163.com/song/media/outer/url?id=28914470.mp3",cover:"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4089890845,2770821015&fm=58&bpow=1000&bpoh=1000",},
{title:"记事本",artist:"唱得撕心裂肺的少女",mp3:"http://yked.gitee.io/background_music/记事本.mp3",cover:"http://p19.qhimg.com/bdr/__85/t018270806126281c0c.jpg",},
{title:"insomnia",artist:"Craig David",mp3:"http://music.163.com/song/media/outer/url?id=16959121.mp3",cover:"http://p2.music.126.net/oCg-6dT4BdvMXgVs-AKZHQ==/647612348767734.jpg?param=130y130",},
{title:"打上花火",artist:"米津玄师",mp3:"http://yked.gitee.io/background_music/打上花火(鬼语).mp3",cover:"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2913862957,2853337406&fm=58&bpow=426&bpoh=600",},
{title:"未闻花名",artist:"Silent Siren",mp3:"http://yked.gitee.io/background_music/未闻花名.mp3",cover:"https://ss0.bdstatic.com/6Ox1bjeh1BF3odCf/it/u=2736277510,4179940038&fm=96&app=25&f=JPEG?w=121&h=75&s=B922B41B7F4259514052B4C2030030B9",},
{title:"我喜欢你",artist:"加藤いづみ",mp3:"http://yked.gitee.io/background_music/我喜欢你(鬼语).mp3",cover:"https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=18f52b37506034a829e2bf87f3282e69/0b7b02087bf40ad1e30965d55b2c11dfa9ecce13.jpg",},
];
var isRotate = true;
var autoplay = true;

(function($) {
	var isShowNotification = false,
		isInitMarquee = true,
		shuffleArray = [],
		shuffleIndex, autoClearTimer, autoShowTimer, isFirstPlay = localStorage.qplayer == undefined ? true : false,
		isShuffle = localStorage.qplayer == undefined ? false : localStorage.qplayer === 'true' ? true : false;
	for (var i = 0; i < playlist.length; i++) {
		var item = playlist[i];
		$('#playlist').append('<li class="lib" style="overflow:hidden;"><strong style="margin-left: 5px;">' + item.title + '</strong><span style="float: right;" class="artist">' + item.artist + '</span></li>');
		if (item.mp3 == "") {
			$('#playlist li').eq(i).css('color', '#ddd');
		}
	}
	var currentTrack = 0,
		audio, timeout;
	var shuffle_array = localStorage.qplayer_shuffle_array;
	if (isShuffle && shuffle_array != undefined && playlist.length === (shuffleArray = JSON.parse(shuffle_array)).length) {
		currentTrack = shuffleArray[0];
		shuffleIndex = 0;
		$('#QPlayer .cover').attr('title', '点击关闭随机播放');
	} else {
		isShuffle = false;
		$('#QPlayer .cover').attr('title', '点击开启随机播放');
	}
	var totalHeight = 0;
	for (var i = 0; i < playlist.length; i++) {
		totalHeight += ($('#playlist li').eq(i).height() + 6);
	}
	if (totalHeight > 360) {
		$('#playlist').css("overflow", "auto");
		if (isShuffle) {
			var temp = 0;
			for (var j = 0; j < currentTrack; j++) {
				temp += ($('#playlist li').eq(j).height() + 6);
			}
			$('#playlist').scrollTop(temp);
		}
	}
	var play = function() {
			audio.play();
			if (isRotate) {
				$("#player .cover img").css("animation", "9.8s linear 0s normal none infinite rotate");
				$("#player .cover img").css("animation-play-state", "running");
			}
			$('.playback').addClass('playing');
			timeout = setInterval(updateProgress, 500);
			if (isExceedTag()) {
				if (isInitMarquee) {
					initMarquee();
					isInitMarquee = false;
				} else {
					$('.marquee').marquee('resume');
				}
			}
		}
	var pause = function() {
			audio.pause();
			$("#player .cover img").css("animation-play-state", "paused");
			$('.playback').removeClass('playing');
			clearInterval(timeout);
			if (isExceedTag()) {
				$('.marquee').marquee('pause');
			}
		}
	var setProgress = function(value) {
			var currentSec = parseInt(value % 60) < 10 ? '0' + parseInt(value % 60) : parseInt(value % 60),
				ratio = value / audio.duration * 100;
			$('.timer').html(parseInt(value / 60) + ':' + currentSec);
		}
	var updateProgress = function() {
			setProgress(audio.currentTime);
		}
	var switchTrack = function(i) {
			if (i < 0) {
				track = currentTrack = playlist.length - 1;
			} else if (i >= playlist.length) {
				track = currentTrack = 0;
			} else {
				track = i;
			}
			isInitMarquee = true;
			$('audio').remove();
			loadMusic(track);
			play();
		}
	var shufflePlay = function(i) {
			if (i === 1) {
				if (++shuffleIndex === shuffleArray.length) {
					shuffleIndex = 0;
				}
				currentTrack = shuffleArray[shuffleIndex];
			} else if (i === 0) {
				if (--shuffleIndex < 0) {
					shuffleIndex = shuffleArray.length - 1;
				}
				currentTrack = shuffleArray[shuffleIndex];
			}
			switchTrack(currentTrack);
		}
	var ended = function() {
			pause();
			audio.currentTime = 0;
			if (isShuffle) {
				shufflePlay(1);
			} else {
				if (currentTrack < playlist.length) switchTrack(++currentTrack);
			}
		}
	var beforeLoad = function() {
			var endVal = this.seekable && this.seekable.length ? this.seekable.end(0) : 0;
		}
	var afterLoad = function() {
			if (autoplay == true) play();
		}
	var loadMusic = function(i) {
			var item = playlist[i];
			while (item.mp3 == "") {
				showNotification('歌曲地址为空，已自动跳过');
				if (isShuffle) {
					if (++shuffleIndex === shuffleArray.length) {
						shuffleIndex = 0;
					}
					i = currentTrack = shuffleArray[shuffleIndex];
				} else {
					currentTrack = ++i;
				}
				item = playlist[i];
			}
			var newaudio = $('<audio>').html('<source src="' + item.mp3 + '"><source src="' + item.ogg + '">').appendTo('#player');
			$('.cover').html('<img src="' + item.cover + '" alt="' + item.album + '">');
			$('.musicTag').html('<strong>' + item.title + '</strong><span> - </span><span class="artist">' + item.artist + '</span>');
			$('#playlist li').removeClass('playing').eq(i).addClass('playing');
			audio = newaudio[0];
			audio.addEventListener('progress', beforeLoad, false);
			audio.addEventListener('durationchange', beforeLoad, false);
			audio.addEventListener('canplay', afterLoad, false);
			audio.addEventListener('ended', ended, false);
		}
	loadMusic(currentTrack);
	$('.playback').on('click', function() {
		if ($(this).hasClass('playing')) {
			pause();
		} else {
			play();
		}
	});
	$('.rewind').on('click', function() {
		if (isShuffle) {
			shufflePlay(0);
		} else {
			switchTrack(--currentTrack);
		}
	});
	$('.fastforward').on('click', function() {
		if (isShuffle) {
			shufflePlay(1);
		} else {
			switchTrack(++currentTrack);
		}
	});
	$('#playlist li').each(function(i) {
		$(this).on('click', function() {
			if (isShuffle) {
				for (var j = 0; j < shuffleArray.length; j++) {
					if (shuffleArray[j] === i) {
						shuffleIndex = j;
						break;
					}
				}
			} else {
				currentTrack = i;
			}
			switchTrack(i);
		});
	});
	$('#QPlayer .liebiao,#QPlayer .liebiao').on('click', function() {
		var pl = $('#playlist');
		if (pl.hasClass('go') === false) {
			pl.css({
				"max-height": "360px",
				"transition": "max-height .5s ease"
			});
			pl.css("border", "1px solid #dedede");
			pl.addClass('go');
		} else {
			pl.css({
				"max-height": "0px",
				"transition": "max-height .5s ease"
			});
			pl.css("border", "0");
			pl.removeClass('go');
		}
	});
	$("#QPlayer .ssBtn").on('click', function() {
		var mA = $("#QPlayer");
		if ($('.ssBtn .adf').hasClass('on') === false) {
			if (isFirstPlay) {
				setTimeout("showTips('#player .cover','点击封面开启(关闭)随机播放', " +
				function() {
					setTimeout("showTips('#player .ctrl .musicTag','点击拖动标题栏快进(快退)')", 1000)
				} + ");", 500);
				isFirstPlay = !isFirstPlay;
				localStorage.qplayer = 'false';
			}
			mA.css("transform", "translateX(250px)");
			$('.ssBtn .adf').addClass('on');
		} else {
			mA.css("transform", "translateX(0px)");
			$('.ssBtn .adf').removeClass('on')
		}
	});
	$("#player .cover").on('click', function() {
		isShuffle = !isShuffle;
		if (isShuffle) {
			$("#player .cover").attr("title", "点击关闭随机播放");
			showNotification('已开启随机播放');
			var temp = [];
			for (var i = 0; i < playlist.length; i++) {
				temp[i] = i;
			}
			shuffleArray = shuffle(temp);
			for (var j = 0; j < shuffleArray.length; j++) {
				if (shuffleArray[j] === currentTrack) {
					shuffleIndex = j;
					break;
				}
			}
			localStorage.qplayer_shuffle_array = JSON.stringify(shuffleArray);
		} else {
			$("#player .cover").attr("title", "点击开启随机播放");
			showNotification('已关闭随机播放');
			localStorage.removeItem('qplayer_shuffle_array');
		}
		localStorage.qplayer = isShuffle;
	});
	var startX, endX;
	$('#player .ctrl .musicTag').mousedown(function(event) {
		startX = event.screenX;
	}).mousemove(function(event) {
		if (event.which === 1) {
			endX = event.screenX;
			var seekRange = Math.round((endX - startX) / 678 * 100);
			audio.currentTime += seekRange;
			setProgress(audio.currentTime);
		}
	});
	$('#player .ctrl .musicTag').bind('touchstart', function(event) {
		startX = event.originalEvent.targetTouches[0].screenX;
	}).bind('touchmove', function(event) {
		endX = event.originalEvent.targetTouches[0].screenX;
		var seekRange = Math.round((endX - startX) / 678 * 100);
		audio.currentTime += seekRange;
		setProgress(audio.currentTime);
	});
})(jQuery);

function initMarquee() {
	$('.marquee').marquee({
		duration: 15000,
		gap: 50,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true
	});
}

function isExceedTag() {
	var isExceedTag = false;
	if ($('.musicTag strong').width() + $('.musicTag span').width() + $('.musicTag .artist').width() > $('.musicTag').width()) {
		isExceedTag = true;
	}
	return isExceedTag;
}

function shuffle(array) {
	var m = array.length,
		t, i;
	while (m) {
		i = Math.floor(Math.random() * m--);
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
}

function showNotification(info) {
	isShowNotification = true;
	if ($('.qplayer-notification').length > 0) {
		$('.qplayer-notification').remove();
		clearTimeout(autoClearTimer);
		clearTimeout(autoShowTimer);
	}
	$('body').append('<div class="qplayer-notification animation-target"><span class="qplayer-notification-icon">i</span><span class="body" style="box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 5px;"><span class="message"></span></span><a class="close" href="#" onclick="closeNotification();return false;">×</a><div style="clear: both"></div>');
	$('.qplayer-notification .message').text(info);
	var width = $('.qplayer-notification').css({
		"opacity": "0",
		"width": "auto"
	}).width() + 20;
	$('.qplayer-notification').css({
		"width": "50px",
		"opacity": "1"
	});
	autoShowTimer = setTimeout(function() {
		$('.qplayer-notification').css({
			"width": width,
			"transition": "all .7s ease"
		});
		$('.qplayer-notification .close').delay(500).show(0);
	}, 1500);
	autoClearTimer = setTimeout("if ($('.qplayer-notification').length>0) {closeNotification()}", 8000);
}

function closeNotification() {
	isShowNotification = false;
	$('.qplayer-notification').css({
		"width": "50px",
		"transition": "all .7s ease"
	});
	$('.qplayer-notification .close').delay(500).hide(0);
	setTimeout(function() {
		if (!isShowNotification) {
			$('.qplayer-notification').css("opacity", "0");
			$('.qplayer-notification-icon').css({
				"transform": "scale(0)",
				"transition": "transform .5s ease"
			});
		}
	}, 1000);
	setTimeout(function() {
		if (!isShowNotification) {
			$('.qplayer-notification').remove();
		}
	}, 1500);
	clearTimeout(autoClearTimer);
	clearTimeout(autoShowTimer);
}

function showTips(div, info, func) {
	var box_height = 100;
	$('body').append('<div class="qplayer_tips"><span class="tips_arrow"></span><span class="info" style="display:none">' + info + '</span><button class="tips_button" onclick="removeTips()">不再提示</button></div>');
	$('.qplayer_tips').css({
		"top": $(div).offset().top - box_height - 30 - 15,
		"left": $(div).offset().left - 28
	});
	$('.qplayer_tips').css({
		"height": box_height,
		"transition": "all .5s ease-in-out"
	});
	$('.qplayer_tips .info').delay(500).fadeIn();
	$('.tips_arrow').css({
		"border-width": "15px",
		"transition": "all .5s ease-in-out"
	});
	$('.tips_button').css({
		"height": "30px",
		"transition": "all .5s ease-in-out"
	});
	if (func != undefined) {
		$('.tips_button').click(func);
	}
}

function removeTips() {
	$('.qplayer_tips .info').fadeOut();
	$('.qplayer_tips').css({
		"height": "0",
		"transition": "all .5s ease-in-out"
	});
	$('.tips_arrow').css({
		"border-width": "0",
		"transition": "all .5s ease-in-out"
	});
	$('.tips_button').css({
		"opacity": "0",
		"transition": "all .2s ease-in-out"
	});
	setTimeout(function() {
		$('.qplayer_tips').remove()
	}, 500);
}