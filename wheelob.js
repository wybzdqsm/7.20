function wheel(wins,opts,runopts){
this.init(wins,opts,runopts);
this.getwindow();
this.creatbox();
this.creatlist();
this.creatbtn();
this.lunbo();
this.clicklunbo();
}
wheel.prototype={
init(wins,opts,runopts){
    var wins = document.querySelector(wins);
    this.opts=opts;
    this.runopts=runopts;
    if (!(wins && wins.nodeType == 1)) {
        console.error("窗口元素not find");
        return;
    }
     this.wins=wins;
    opts.imgs.push(opts.imgs[0])
    opts.links.push(opts.links[0]);
    opts.imgcolor.push(opts.imgcolor[0])
   this.imglength=opts.imgs.length;
   if(this.imglength==0){
     console.error("没有传入轮播内容")
     return;
   }
  this.imgsize=opts.imgsize;
   if(!(this.imgsize instanceof Array)){
       console.error("请传入合法的尺寸")
       
   }

   if(this.imgsize.length==0)
{
   this.imgsize[0]=document.documentElement.clientWidth;
   this.imgsize[1]=400;
}
if(this.imgsize.some(function(val){
    return val=0;
})){
   for(var i=0;i<imgsize.length;i++){
       if(this.imgsize[i]==0){
           this.imgsize[i]=500;
       }
   }
   
}
this.btncolor=opts.btncolor||"green";
this.btnactive=opts.btnactive||"red";
this.btnpos=opts.btnpos||["center","20"];
this.time=0;
this.runopts=runopts||{};
if(this.runopts.time){
    this.time=runopts.time*1000;
}else{
    this.time=5000;
}

this. yxtime=0;
if(this.runopts.yxtime){
    this.yxtime=runopts.yxtime*1000;
}else{
    this.yxtime=500;
}


this. runfs="null";
if(runopts.runfs=="linear"||runopts.runfs){
    this.runfs=Tween.linear;
}else if(runopts.runfs=="in"){
    this.runfs=Tween.easein;
}else if(runopts.runfs=="out"){
    this.runfs=Tween.easeout;
}

},
getwindow(){
   this. wins.style.cssText = "width:100%;height:" + this.imgsize[1] + "px;overflow:hidden;position:relative;";
},
creatbox(){
    this. box=document.createElement("div");
this.box.style.cssText="width:"+this.imglength*100+"%;height:100%;border:1px solid red;"
this.wins.appendChild(this.box);

},
creatlist(){
    for (var i = 0; i < this.imglength; i++) {
        var list=document.createElement("div")
        list.style.cssText=`float:left;width:${100/this.imglength}%;height:100%;background:${this.opts.imgcolor[i]}`;
        this.box.appendChild(list);

        var link=document.createElement("a")
       link.href=this.opts.links[i];
        link.style.cssText = "width:" + this.imgsize[0] + "px;height:" + this.imgsize[1] + "px;display:block;margin:auto;background:url(" + this.opts.imgs[i] + ") no-repeat 0 0;"
        
        list.appendChild(link);
        this.box.appendChild(list);
        
        } 
},
creatbtn(){
    var btnbox=document.createElement("div")
btnbox.style.cssText = "width:300px;height:20px;position:absolute;left:0;right:0;margin:auto;bottom:" + this.btnpos[1] + "px;";
this.wins.appendChild(btnbox)
this.btns=[]
for(i=0;i<this.imglength-1;i++){
    if(i==0){
        this. btcolor=this.btnactive;
    }else{
        this. btcolor=this.btncolor;
    }
    var btn=document.createElement("div");
    btn.style.cssText="width:30px;height:15px;background:"+this.btcolor+";margin:0 10px;cursor:pointer;float:left;opacity:0.5"
      btnbox.appendChild(btn);
    this.btns.push(btn);
    
}




},
//btns的获取有问题  控制台报错btns未被定义
lunbo(){

     this.winw=parseInt(getComputedStyle(this.wins,null).width);   
    var num=0;
      function move(){
       num++;
       if(num>btns.length-1){
           animal(this.box,{
           "margin-left":-num*this.winw
       },this.yxtime,this.runfs,function(){
           
           this.box.style.marginLeft=0;
           
       })
       num=0;
       }
       else{
       animal(this.box,{
           "margin-left":-num*this.winw
       },this.yxtime,this.runfs)}
      for(var i=0;i<btns.length;i++){
          this.btns[i].style.background=this.btncolor;
      }
   this. btns[num].style.background=this.btnactive
      
   }
      this.wins.t=setInterval(move,this.time)



      this.wins.onmouseover=function(){
        clearInterval(this.t);
      }
      this.wins.onmouseout=function(){
        this.t=setInterval(move,this.time)
        
    }
 
  
 
},
clicklunbo(){
    for(let i=0;i<this.btns.length;i++){
        this. btns[i].onclick=function(){
           num=i;
           animal(this.box,{
           "margin-left":-num*this.winw
           },this.yxtime,this.runfs)
   
           for(var j=0;j<this.btns.length;j++){
            this.btns[j].style.background=this.btncolor;
        }
      this.btns[num].style.background=this.btnactive
     }
         
   }
  
}

}
