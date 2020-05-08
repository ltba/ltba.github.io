(function() {
e=document.body.innerText.replace(/\s+/g,"").split("。");
for(let n=0;n<e.length;n++){
    if(!e[n]){e.splice(n,1);--n;}
}
for(var i=0;i<e.length;i++){
    let a=document.createElement('AUDIO');
    a.src='https://ai.baidu.com/aidemo?type=tns&spd=4&pit=5&vol=5&per=4&tex='+encodeURIComponent(e[i])+'&dt=1';
    a.onended = function(){
        if(i<e.length){e[i].play();i++;}else{i=0}
        };
    e[i]=a;
}
i=0;e[i].play();i++;
}());
