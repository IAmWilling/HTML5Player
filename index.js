//进行初始化操作
var playbtn = document.querySelector(".play-btn");
var video = document.getElementById("video");
var prbar = document.querySelector(".vodeo-bar");
var playingtime = document.querySelector(".playingtime");
var alltime = document.querySelector(".alltime");
var speedbtn = document.querySelector(".sel-speed");
var selul = document.querySelector(".speed-list");
var path = document.querySelector(".c-path");
var volume = document.querySelector(".c-volume");
var cbarvol = document.querySelector(".c-vbar");
var danmu = document.querySelector(".danmu");
var danmupath = document.querySelector(".danmu-path");
var videopath = document.querySelector(".video-path");

let bar = document.querySelector(".progress-bar").getBoundingClientRect();
let sFlag = false;
function getplaytime(t){ //获取当前秒数转换为分钟
  let miner = 0;
  if(Math.floor(t) < 60)
  {
    if(t < 10)
    {
      return `00:0${Math.floor(t)}`;
    }else {
      return `00:${Math.floor(t)}`;
    }
  }else if(Math.floor(t)>=60 && Math.floor(t) < 3600){
    let mini = Math.floor(Math.floor(t) / 60);
    let secd = Math.floor(Math.floor(t) % 60);
    if(mini < 10){
      if(secd < 10) {
        return `0${mini}:0${secd}`;
      }
      return `0${mini}:${secd}`;
    }else {
      if(secd < 10) {
        return `${mini}:0${secd}`;
      }
      return `${mini}:${secd}`;
    }
  }
}
function playerOrPause() { //播放按钮
  if(video.paused) {
    video.play();
    playbtn.className = "play-btn pausebtn";
  }else {
    video.pause();
    playbtn.className = "play-btn playbtn";
  }
}
video.addEventListener("click",function(){
  if(video.paused) {
    video.play();
    playbtn.className = "play-btn pausebtn";
  }else {
    video.pause();
    playbtn.className = "play-btn playbtn";
  }
},false);
playbtn.onclick = function(){
  playerOrPause();
}
video.addEventListener("timeupdate",function(){ //这个是监听文件的时间变化 改变进度条
  let nowtime = video.currentTime / video.duration;
  prbar.style.width = nowtime * 100 + "%";
  videopath.style.left = (bar.right - bar.left) *  nowtime  + "px"; //计算拖拽小球坐标
  playingtime.innerHTML = getplaytime(video.currentTime);
  alltime.innerHTML = getplaytime(video.duration);
  if(video.currentTime===video.duration){
    video.pause();
    playbtn.className = "play-btn playbtn";
    video.currentTime = 0;
  }
},false);
video.addEventListener("loadedmetadata",function(){
  playingtime.innerHTML = getplaytime(video.currentTime);
  alltime.innerHTML = getplaytime(video.duration);
},false);
speedbtn.onclick = function(e){
  if( selul.style.display == "block") {
    selul.style.display = "none";
  }else {
    selul.style.display = "block";
  }
} 
// videoer.defaultPlaybackRate = 1.0;
selul.addEventListener("click",function(e){ //这个是播放倍速频率的变化
  e = e || window.event;
  switch(e.target.innerText) {
    case "2.0X":
    speedbtn.innerHTML = "2.0X";
    video.playbackRate = 2.0;
    break;
    case "1.5X":
    speedbtn.innerHTML = "1.5X";
    video.playbackRate = 1.5;
    break;
    case "1.0X":
    speedbtn.innerHTML = "1.0X";
    video.playbackRate = 1.0;
    break;
    case "0.75X":
    speedbtn.innerHTML = "0.75X";
    video.playbackRate = 0.75;
    break;
    case "0.5X":
    speedbtn.innerHTML = "0.5X";
    video.playbackRate = 0.5;
    break;
  }
  selul.style.display = "none";
},false);
path.addEventListener("mousedown",function(){
  sFlag = true;
},false);
volume.addEventListener("mousemove",function(e){ // 声音拖拽变化的实现 这个是进行拖拽的时候
  let rect = volume.getBoundingClientRect();
  e = e || window.event;
  if(sFlag){
   if(e.clientY < 229 || e.clientY > 331) {
      sFlag = false;
     return;
   }
   if(1- Math.abs(e.clientY - (rect.top + 5))*0.01 < 0){
      sFlag = false;
      return;
    }
    path.style.left = e.clientY - (rect.top + 5) + "px";
    cbarvol.style.width =  (e.clientY - (rect.top + 5) )+ "px";
    video.volume =1- Math.abs(e.clientY - (rect.top + 5))*0.01;//调整声音
  }
},false);
volume.addEventListener("mousedown",function(e){ // 这个是点击一次的时候 声音调整
  let rect = volume.getBoundingClientRect();
  e = e || window.event;

   if(e.clientY < 229 || e.clientY > 331) {
      sFlag = false;
     return;
   }
   if(1- Math.abs(e.clientY - (rect.top + 5))*0.01 < 0){
      sFlag = false;
      return;
    }
    path.style.left = e.clientY - (rect.top + 5) + "px";
    cbarvol.style.width =  (e.clientY - (rect.top + 5) )+ "px";
    video.volume =1- Math.abs(e.clientY - (rect.top + 5))*0.01;//调整声音
},false);
path.addEventListener("mouseup",function(e){
  sFlag = false;
},false);
document.querySelector(".shengyin").addEventListener("click",function(){ //开关声音控件
  if( volume.style.display == "block") {
    volume.style.display = "none";
  }else {
    volume.style.display = "block";
  }
},false);
function   aaa(element){ //全屏

         if(element.requestFullscreen){

                   element.requestFullscreen();

         }else if(element.mozRequestFullScreen){

                   element.mozRequestFullscreen();

         }else if(element.webkitRequestFullscreen){

                   element.webkitRequestFullscreen();

         }else if(element.msRequestFullscreen){
                  element.msRequestFullscreen();
         }
}
function   bbb(){

          if(document.exitFullscreen){
                document.exitFullscreen();
          }else if(document.mozExitFullscreen){

               document.mozExcitFullscreen();

           }else if(document.webkitExitFullscreen){

               document.webkitExitFullscreen();

          }

}

document.querySelector(".fullsr").addEventListener("click",function(){ //进行全屏模式播放
  aaa(video);
},false);
var isdanmu = false;
danmu.addEventListener("click",function(){ // 开-关 弹幕按钮
  isdanmu = !isdanmu;
  if(isdanmu) {
    danmupath.style.transform = "translateX(20px)";
    danmupath.style.color = "#1F97FF";
    danmu.style.backgroundColor = "#1F97FF";
    danmupath.style.boxShadow = "-2px 2px 5px #666";
  }else {
    danmupath.style.transform = "translateX(0px)";
    danmupath.style.color = "#666";
    danmu.style.backgroundColor = "#e5e5e5";
    danmupath.style.boxShadow = "2px 2px 5px #666";
  }
},false);
let arr = []; //存放弹幕节点
setInterval(function(){ //自动创建弹幕
  if(isdanmu) {
    let p = document.createElement("p");
    p.style.position = "absolute";
    p.style.left = video.getBoundingClientRect().right - video.getBoundingClientRect().left+"px";
    p.style.top = Math.random() * video.getBoundingClientRect().bottom + "px";
    p.innerText = "狗瘸子！！狗瘸子！！！";
    p.style.display = "block";
    p.style.maxWidth = "200px";
    p.style.minWidth = "100px";
    p.style.maxHeight = "20px";
    p.style.fontSize = "16px";
    p.style.color = "#fff";
    arr.push(p);
    document.querySelector(".cotaloators").appendChild(p);
    p.style.transition = `all ${Math.random() * 20}s linear`;
    p.style.transform = "translateX(-"+ video.getBoundingClientRect().left * 3 +"px)";
    // p.style.left = video.getBoundingClientRect().left - 500 +"px";
  
  }else {
      if(arr.length==0) {
        return;
      }
      for(let i = 0;i < arr.length;i++){ //关闭后所有弹幕将某种意义上的隐藏
      arr[i].style.zIndex = "-1";
      }
  }
},800);
setInterval(function(){
  if(isdanmu) {
      for(let i = 0;i < arr.length;i++){ //等待弹幕位置小于播放器后进行删除元素操作
      if(Math.floor(arr[i].getBoundingClientRect().left) <= 170) {
        arr[i].parentNode.removeChild(arr[i])
        arr.splice(i,1);
      }
    }
  }
},100);
var cotals = document.querySelector(".cotaloators");

var pFlag = false;
videopath.addEventListener("mousedown",function(){
  pFlag = true;
  
},false);
cotals.addEventListener("mousemove",function(e){
  e = e || window.event;
  if(pFlag){
    let cha = e.clientX - bar.left- 7.5; //计算鼠标与小球距离
    videopath.style.left = cha  + "px"; //改变小球位置
    let setp = cha / (bar.right - bar.left);  //计算进度条进度以及时间进度
    prbar.style.width =setp * 100 +  "%"; //改变进度条进度
    video.currentTime = video.duration * setp; //改变视频进度
  }
},false);
cotals.addEventListener("mouseup",function(){
  pFlag = false;
},false);
cotals.addEventListener("mouseleave",function(){
  pFlag = false;
},false);
document.querySelector(".progress-bar").addEventListener("click",function(e){
  let cha = e.clientX - bar.left- 7.5; //计算鼠标与小球距离
  videopath.style.left = cha  + "px"; //改变小球位置
  let setp = cha / (bar.right - bar.left);  //计算进度条进度以及时间进度
  prbar.style.width =setp * 100 +  "%"; //改变进度条进度
  video.currentTime = video.duration * setp; //改变视频进度
},false);
