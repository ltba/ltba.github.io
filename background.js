/*
*使用前先引用jQ
*作者: 聆听·彼岸
*Blog: https://yked.gitee.io
*Created time: 2019.4.4
*赐尔一条jQ: <script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
*总共有:
*simple()
*particle()
*star()
*particle2
*/

if (typeof jQuery == 'undefined'){
    alert("请先引用jQ再使用background.js");
}

function init(){//创建一个背景专用div标签
    if($(".background").html() == "undefined" || $(".background").html() == undefined){
        var div = $("<div/>");
        div.addClass("background");
        div.css({
            "width":"100%",
            "height":"100%",
            "position":"fixed",
            "top":"0",
            "left":"0",
            "height":"100%",
            "z-index":"-999"
        });
        $("body").append(div);
    }else{
        $(".background").css({
            "width":"100%",
            "height":"100%",
            "position":"fixed",
            "top":"0",
            "left":"0",
            "height":"100%",
            "z-index":"-999"
        });
    }
}
function cas(){//创建一个canvas标签,id为cas,class为cas
    if ($(".background #cas").html() == "undefined" || $(".background #cas").html() == undefined){
    var cas = $("<canvas/>");
    cas.addClass("cas");
    cas.attr({
        "id":"cas"
    });
    cas.css({
        "height":"100%",
        "width":"100%"
    });
    $(".background").html(cas);
    }else{
        console.log("检测到该网站自带canvas标签！");
    }
}
function simple(){//使用随机图片作背景
    init();
    //$.getScript("/randomimg.js",function(){$(".background").css({"background-size":"cover","background-image":randomimg()})});
    $(".background").css({//https://api.dujin.org/pic/,https://acg.toubiec.cn/random,https://wloli.com/wj/api/acg.php,https://api.ixiaowai.cn/api/api.php
        "background-image":"url("+randomimg()+")",
        "background-size":"cover"
    });
}
function particle(){//使用粒子作背景
    init();
    cas();
    $(".background").css({"background-color":"#000000"});
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    var can = document.getElementById("cas");
    var cxt = can.getContext("2d");
    can.width = 1920;
    can.height = 950;
    cxt.lineWidth = 0.3;
    //初始链接线条显示位置
    var mousePosition = {
        x: 30 * can.width / 100,
        y: 30 * can.height / 100
    }
    //圆形粒子对象参数
    var dots = {
        n: 500,//圆形粒子个数
        distance: 50,//圆形粒子之间的距离
        d_radius: 100,//粒子距离鼠标点的距离
        array: []//保存n个圆形粒子对象
    }
    //创建随即颜色值
    function colorValue(min) {
        return Math.floor(Math.random() * 255 + min);
    }
    function createColorStyle(r, g, b) {
        return "rgba(" + r + "," + g + "," + b + ", 1)";
    }
    //混合两个圆形粒子的颜色
    function mixConnect(c1, r1, c2, r2) {//圆的颜色 半径
        return (c1 * r1 + c2 * r2) / (r1 + r2);
    };
    //生成线条的颜色
    function lineColor(dot1, dot2) {//获取具体的圆的颜色再计算
        var color1 = dot1.color,
            color2 = dot2.color;
        var r = mixConnect(color1.r, dot1.radius, color2.r, dot2.radius);
        var g = mixConnect(color1.g, dot1.radius, color2.g, dot2.radius);
        var b = mixConnect(color1.b, dot1.radius, color2.b, dot2.radius);
        return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
    }
    //生成圆形粒子的颜色对象
    function Color(min) {
        min = min || 0;
        this.r = colorValue(min);
        this.g = colorValue(min);
        this.b = colorValue(min);
        this.style = createColorStyle(this.r, this.g, this.b);
    }
    //创建圆形粒子对象
    function Dot() {
        //圆形粒子随机圆心坐标点
        this.x = Math.random() * can.width;
        this.y = Math.random() * can.height;
        //x y 方向运动的速度值
        this.vx = -0.5 + Math.random();
        this.vy = -0.5 + Math.random();

        this.radius = Math.random() * 5;
        //this.color = "#ff3333";
        this.color = new Color();
    }
    //绘制出圆形粒子
    Dot.prototype.draw = function () {
        cxt.beginPath();
        cxt.fillStyle = this.color.style;
        cxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        cxt.fill();
    }
    //添加圆形粒子
    function createCircle() {
        for (var i = 0; i < dots.n; i++) {
            dots.array.push(new Dot());
        }
    }
    //绘制出圆形粒子
    function drawDots() {
        for (var i = 0; i < dots.n; i++) {
            var dot = dots.array[i];
            dot.draw();
        }
    }

    //drawDots();
    //移动
    function moveDots() {
        for (var i = 0; i < dots.n; i++) {
            var dot = dots.array[i];
            //当圆形粒子对象碰壁的时候就反弹回来
            if (dot.y < 0 || dot.y > can.height) {
                dot.vx = dot.vx;
                dot.vy = -dot.vy;
            } else if (dot.x < 0 || dot.x > can.width) {
                dot.vx = -dot.vx;
                dot.vy = dot.vy;
            }
            //给圆形粒子圆心坐标加上速度值移动圆形粒子
            dot.x += dot.vx;
            dot.y += dot.vy;
        }
    }
    //链接粒子对象
    function connectDots() {
        for (var i = 0; i < dots.n; i++) {
            for (var j = 0; j < dots.n; j++) {
                iDot = dots.array[i];
                jDot = dots.array[j];
                if ((iDot.x - jDot.x) < dots.distance && (iDot.y - jDot.y) < dots.distance && (iDot.x - jDot.x) > -dots.distance && (iDot.y - jDot.y) > -dots.distance) {
                    if ((iDot.x - mousePosition.x) < dots.d_radius && (iDot.y - mousePosition.y) < dots.d_radius && (iDot.x - mousePosition.x) > -dots.d_radius && (iDot.y - mousePosition.y) > -dots.d_radius) {
                        cxt.beginPath();
                        //cxt.strokeStyle = "yellow";
                        cxt.strokeStyle = lineColor(iDot, jDot);
                        cxt.moveTo(iDot.x, iDot.y);
                        cxt.lineTo(jDot.x, jDot.y);
                        cxt.closePath();
                        cxt.stroke();
                    }

                }
            }
        }
    }
    createCircle();
    //让圆形粒子不断的移动
    function animateDots() {
        cxt.clearRect(0, 0, can.width, can.height);
        moveDots();
        connectDots()
        drawDots();
        requestAnimFrame(animateDots);
    }
    animateDots();

    can.onmousemove = function (ev) {
        var ev = ev || window.event;
        mousePosition.x = ev.pageX;
        mousePosition.y = ev.pageY;
    }
    can.onmouseout = function () {
        mousePosition.x = can.width / 2;
        mousePosition.y = can.height / 2;
    }
}

function star(){//使用星空为背景
    init();
    cas();
    //宇宙特效
    var canvas = document.getElementById('cas'),
      ctx = canvas.getContext('2d'),
      w = canvas.width = window.innerWidth,
      h = canvas.height = window.innerHeight,

      hue = 217,
      stars = [],
      count = 0,
      maxStars = 1300;//星星数量

    var canvas2 = document.createElement('canvas'),
      ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
    var half = canvas2.width / 2,
      gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#CCC');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    // End cache

    function random(min, max) {
      if (arguments.length < 2) {
        max = min;
        min = 0;
      }

      if (min > max) {
        var hold = max;
        max = min;
        min = hold;
      }

      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function maxOrbit(x, y) {
      var max = Math.max(x, y),
        diameter = Math.round(Math.sqrt(max * max + max * max));
      return diameter / 2;
      //星星移动范围，值越大范围越小，
    }

    var Star = function() {

      this.orbitRadius = random(maxOrbit(w, h));
      this.radius = random(60, this.orbitRadius) / 8; 
      //星星大小
      this.orbitX = w / 2;
      this.orbitY = h / 2;
      this.timePassed = random(0, maxStars);
      this.speed = random(this.orbitRadius) / 50000; 
      //星星移动速度
      this.alpha = random(2, 10) / 10;

      count++;
      stars[count] = this;
    }

    Star.prototype.draw = function() {
      var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
        y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
        twinkle = random(10);

      if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
      } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
      }

      ctx.globalAlpha = this.alpha;
      ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
      this.timePassed += this.speed;
    }

    for (var i = 0; i < maxStars; i++) {
      new Star();
    }

    function animation() {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.5; //尾巴
      ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
      ctx.fillRect(0, 0, w, h)

      ctx.globalCompositeOperation = 'lighter';
      for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
      };

      window.requestAnimationFrame(animation);
    }

    animation();
}

function particle2(){//动态粒子，线条连接，白色背景
    init();
    cas();
	var canvas = document.getElementById("cas");
	var ctx = canvas.getContext("2d");
	resize();
	window.onresize = resize;

	function resize() {
		canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	}
	var RAF = (function() {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60)
		}
	})();
	var warea = {
		x: null,
		y: null,
		max: 20000
	};
	window.onmousemove = function(e) {
		e = e || window.event;
		warea.x = e.clientX;
		warea.y = e.clientY
	};
	window.onmouseout = function(e) {
		warea.x = null;
		warea.y = null
	};
	var dots = [];
	for (var i = 0; i < 300; i++) {
		var x = Math.random() * canvas.width;
		var y = Math.random() * canvas.height;
		var xa = Math.random() * 2 - 1;
		var ya = Math.random() * 2 - 1;
		dots.push({
			x: x,
			y: y,
			xa: xa,
			ya: ya,
			max: 6000
		})
	}
	setTimeout(function() {
		animate()
	}, 100);

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var ndots = [warea].concat(dots);
		dots.forEach(function(dot) {
			dot.x += dot.xa;
			dot.y += dot.ya;
			dot.xa *= (dot.x > canvas.width || dot.x < 0) ? -1 : 1;
			dot.ya *= (dot.y > canvas.height || dot.y < 0) ? -1 : 1;
			ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);
			for (var i = 0; i < ndots.length; i++) {
				var d2 = ndots[i];
				if (dot === d2 || d2.x === null || d2.y === null) continue;
				var xc = dot.x - d2.x;
				var yc = dot.y - d2.y;
				var dis = xc * xc + yc * yc;
				var ratio;
				if (dis < d2.max) {
					if (d2 === warea && dis > (d2.max / 2)) {
						dot.x -= xc * 0.03;
						dot.y -= yc * 0.03
					}
					ratio = (d2.max - dis) / d2.max;
					ctx.beginPath();
					ctx.lineWidth = ratio / 2;
					ctx.strokeStyle = 'rgba(0,0,0,' + (ratio + 0.2) + ')';
					ctx.moveTo(dot.x, dot.y);
					ctx.lineTo(d2.x, d2.y);
					ctx.stroke()
				}
			}
			ndots.splice(ndots.indexOf(dot), 1)
		});
		RAF(animate)
	}

}
function gradients(csstext){
    init();
    $(".background").css({
        "background-image":csstext//linear-gradient
    });
}
console.log("\nbackground.js\n作者: 聆听·彼岸\nBlog: https://yked.gitee.io\n");

//No函数里的是半成品，太忙可能我就不弄了
/*
function No(){
$(document).ready(function(){
    var $i = $("<p/>").text("F7可以更改背景！");
    $("body").mousemove(function(e){
        $i.css({
                "z-index":99999,   
                "top":e.pageY-20,   
                "left":e.pageX,   
                "position":"absolute",   
                "color":"#E94F06",  
                "font-family":"微软雅黑",  
                "cursor":"default",  
                "-moz-user-select": "none",  
                "-webkit-user-select": "none",  
                "-ms-user-select": "none",  
                "-khtml-user-select": "none",  
                "user-select": "none",  
            });
        $("body").append($i);
        $i.animate( {"top":e.pageY-180,"opacity":0}, 5000, function(){$i.remove();});
        $(this).unbind();
    });
});
$("body").append("<div class='background'></div>");
$(".background").css({
    "position":"absolute",
    "top":"0",
    "left":"0",
    "background-image":"url(https://acg.toubiec.cn/random)",
    "background-size":"cover",
    "z-index":"-1",
    "width":"100%",
    "height":"100%"
    });
$(document).keyup(function(event){
    if (event.keyCode == 118){
        alert("");
        var $d = $("<div>");
        $d.html("<img src='https://acg.toubiec.cn/random' width='500' height='400' /><img src='https://acg.toubiec.cn/random' width='500' height='400' />");
        $d.css({
            "position":"absolute",
            "width":"50%",
            "height":"50%",
            "":"",
            "":"",
            "":"",
            "":"",
        });
        $("body").append($d);
    }
});
}
*/