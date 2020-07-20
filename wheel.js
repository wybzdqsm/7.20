

function wheel(wins, opts, runopts) {
    var wins = document.querySelector(wins);
    if (!(wins && wins.nodeType == 1)) {
        console.error("窗口元素not find");
        return;
    }

    opts.imgs.push(opts.imgs[0])
    opts.links.push(opts.links[0]);
    opts.imgcolor.push(opts.imgcolor[0])
    var imglength=opts.imgs.length;
   if(imglength==0){
     console.error("没有传入轮播内容")
     return;
   }
   var imgsize=opts.imgsize;
   if(!(imgsize instanceof Array)){
       console.error("请传入合法的尺寸")
       
   }

   if(imgsize.length==0)
{
   imgsize[0]=document.documentElement.clientWidth;
   imgsize[1]=400;
}
if(imgsize.some(function(val){
    return val=0;
})){
   for(var i=0;i<imgsize.length;i++){
       if(imgsize[i]==0){
           imgsize[i]=500;
       }
   }
   
}
var btncolor=opts.btncolor||"green";
var btnactive=opts.btnactive||"red";
var btnpos=opts.btnpos||["center","20"];
var time=0;
var runopts=runopts||{};
if(runopts.time){
    time=runopts.time*1000;
}else{
    time=5000;
}

var yxtime=0;
if(runopts.yxtime){
    yxtime=runopts.yxtime*1000;
}else{
    yxtime=500;
}


var runfs="null";
if(runopts.runfs=="linear"||runopts.runfs){
    runfs=Tween.linear;
}else if(runopts.runfs=="in"){
    runfs=Tween.easein;
}else if(runopts.runfs=="out"){
    runfs=Tween.easeout;
}

wins.style.cssText = "width:100%;height:" + imgsize[1] + "px;overflow:hidden;position:relative;";
var box=document.createElement("div");
box.style.cssText="width:"+imglength*100+"%;height:100%;border:1px solid red;"
wins.appendChild(box);


for (var i = 0; i < imglength; i++) {
var list=document.createElement("div")
list.style.cssText=`float:left;width:${100/imglength}%;height:100%;background:${opts.imgcolor[i]}`;
box.appendChild(list);
var link=document.createElement("a")
link.href=opts.links[i];
link.style.cssText = "width:" + imgsize[0] + "px;height:" + imgsize[1] + "px;display:block;margin:auto;background:url(" + opts.imgs[i] + ") no-repeat 0 0;"

list.appendChild(link);
box.appendChild(list);

}


var btnbox=document.createElement("div")
btnbox.style.cssText = "width:300px;height:20px;position:absolute;left:0;right:0;margin:auto;bottom:" + btnpos[1] + "px;";
wins.appendChild(btnbox)
var btns=[]
for(i=0;i<imglength-1;i++){
    if(i==0){
        var btcolor=btnactive;
    }else{
        var btcolor=btncolor;
    }
    var btn=document.createElement("div");
    btn.style.cssText="width:30px;height:15px;background:"+btcolor+";margin:0 10px;cursor:pointer;float:left;opacity:0.5"
    btnbox.appendChild(btn);
    btns.push(btn);
}


  
   var winw=parseInt(getComputedStyle(wins,null).width);   
   var num=0;

     function move(){
      num++;
      if(num>btns.length-1){
          animal(box,{
          "margin-left":-num*winw
      },yxtime,runfs,function(){
          
          box.style.marginLeft=0;
          
      })
      num=0;
      }
      else{
      animal(box,{
          "margin-left":-num*winw
      },yxtime,runfs)}
     for(var i=0;i<btns.length;i++){
         btns[i].style.background=btncolor;
     }
   btns[num].style.background=btnactive
     
  }
     var t=setInterval(move,time)

  for(let i=0;i<btns.length;i++){
      btns[i].onclick=function(){
        num=i;
        animal(box,{
        "margin-left":-num*winw
        },yxtime,runfs)

        for(var j=0;j<btns.length;j++){
         btns[j].style.background=btncolor;
     }
   btns[num].style.background=btnactive
  }
      
}


wins.onmouseover=function(){
  clearInterval(t);
}
wins.onmouseout=function(){
  t=setInterval(move,time)
}





}

