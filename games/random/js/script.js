function f(){
obj={
	"data":[],
	"code":1,
	"mag":"请求成功！"
}
while(true){
    let i = prompt("请输入奖项,为空则为结束:");
    if(i===''){break}
obj.data.push({"name":i});
}
}
//设置滚动距离
var name1 =[164,-164,0];
//设置滚动速度
var time1 = [0,500,500];
//防止重复点击
var toggle = 1;
// 滚动
var setAction=null;
//停止
var setStop=null;
//用于停止后字体大小变换
var setFontSize=null;
//用于判断点击停止后过了多久时间
var stopNowTime=1;

//开始滚动按钮
$("#action").click(function(){
    f();
	$("#palyerAction").attr("src","js/action.mp3");
	if(toggle==1){
		setAction = setInterval("action(100)",300);
		toggle=0;
		stopNowTime=1;
		$(".isYou").css("display","none");
		clearInterval(setFontSize);
	}
});

//停止按钮
$(".stopBtn").click(function(){
	if(toggle==0){
		$("#palyerAction").attr("src","js/jump.mp3");
		setTimeout(function(){
			setStop= setInterval("slowStop(5)",1000);
		},2000);
	}else{
		alert("请先拉动拉杆！");
	}
});

//缓慢停止
function slowStop(stopTime){
	//清楚滚动定时器setAction
	clearInterval(setAction);
	
	// 为滚动定时器设置新的执行时间
	if(stopNowTime<=stopTime){
		setAction = setInterval("action(100+"+stopNowTime+"*1000)",300+stopNowTime*200*3);
		stopNowTime++;
	}else{
		clearInterval(setStop);
		toggle=1;
		$("#palyerAction").attr("src","");
		$(".isYou").css("display","block");
		setFontSize = setInterval(function(){
			$(".luckyName").animate({"fontSize":"100px"},500).animate({"fontSize":"40px"},500);
		},1100);
	}
}

//加载名字赋值
function runText(el1,el2,el3){
	var data = obj.data;
	var dataLenght =data.length;
	//生成的随机数获取obj中的值
	el1.html(data[luckNum(dataLenght)].name);
	el2.html(data[luckNum(dataLenght)].name);
	el3.html(data[luckNum(dataLenght)].name);
//			以下是使用可以使用ajax加载数据
// 			$.ajax({
// 				url:"js/test.json",
// 				type:"get",
// 				dataType:"json",
// 				success:function(data){
// 					var data = data.data;
// 					var dataLenght =data.length;
// 					el1.html(data[luckNum(dataLenght)].name);
// 					el2.html(data[luckNum(dataLenght)].name);
// 					el3.html(data[luckNum(dataLenght)].name);
// 				}
// 			});
}

//生成随机数
function luckNum(max){
	var num =Math.floor(max*Math.random()/1);
	return num;
}

//滚动-三次滚动为一个周期-每次滚动跟换一次数据-不更换正在显示的数据
function action(runTime){
	var el1 =$(".name1");
	var el2 =$(".name2");
	var el3 =$(".name3");
	//用于空值
	var el4 =$(".noName")
	//第一次滚动
	$(".name1").animate({opacity:0},0).animate({top:name1[0]},runTime).animate({opacity:1},0);
	$(".name2").animate({top:name1[1]},runTime);
	$(".name3").animate({top:name1[2]},runTime,function(){
		runText(el1,el2,el4);
	});
	//第二次滚动
	$(".name1").animate({top:name1[2]},runTime);
	$(".name2").animate({opacity:0},0).animate({top:name1[0]},runTime).animate({opacity:1},0);
	$(".name3").animate({top:name1[1]},runTime,function(){
		runText(el4,el2,el3);
	});
	//第三次滚动
	$(".name1").animate({top:name1[1]},runTime);
	$(".name2").animate({top:name1[2]},runTime);
	$(".name3").animate({opacity:0},0).animate({top:name1[0]},runTime).animate({opacity:1},0,function(){
		runText(el2,el4,el3);
	});
}