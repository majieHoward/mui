mui.init();
mui('.mui-scroll-wrapper').scroll({
    bounce: true,
    indicators: true
});
mui('.mui-scroll').on('tap','.mui-control-item:not(.mui-active)',function(){
    
});
var imgSource;
var evaluateImgSource=function(imgSource){
    this.imgSource=imgSource;
}

var obtainImgSource=function(){
    return this.imgSource;
}
var loadPhotoControlImg=function(imgSoucre){
    evaluateImgSource(imgSoucre);
    var img = new Image(),
    div = document.createElement('div');
    div.appendChild(img);
    img.id="processedPicture";
    img.name="processedPicture";
    img.onload = function () {
        document.querySelector('#upload-container').appendChild(div);
    };     
    img.src = imgSoucre;
    
    //document.getElementById("processedPicture").src=imgSoucre;
}
var subPageProcessing=function(){

};
/**未完成图片改造**/
var gotobackFeedback=document.getElementById("gotobackFeedback");

gotobackFeedback.addEventListener('tap',function(){
    document.getElementById("upload-container").innerHTML="";
    window.parent.switchToFeedback();
});

/**完成了图片的改造**/
var completeFeedback=document.getElementById("completeFeedback");
completeFeedback.addEventListener('tap',function(){
    document.getElementById("upload-container").innerHTML="";
    window.parent.switchToFeedback(obtainImgSource());
});

