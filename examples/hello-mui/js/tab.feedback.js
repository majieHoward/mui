mui.init();
mui('.mui-scroll-wrapper').scroll({
    bounce: true,
    indicators: true
});
mui('.mui-scroll').on('tap','.mui-control-item:not(.mui-active)',function(){
    
}); 
var takeAPictureElement=document.getElementById("takeAPictureElement");
var showAPictureElement=document.getElementById("showAPictureElement");
var imageShowDeleteItem=document.getElementById("imageShowDeleteItem");
var imageShowEditItem=document.getElementById("imageShowEditItem");
/**拍照或者选择图片**/
document.querySelector('input').addEventListener('change', function () {
    var that = this;
    lrz(that.files[0], {
        width: 800
    }).then(function (rst) {
        window.parent.photocontrolPager(rst.base64);
        //return rst;
    });
});
var subPageProcessing=function(){
	window.parent.showSelfMuiActionBack("block");
	window.parent.controlDisplayHeaderAndNav("tabIframeMainNav","none");
};
/**展示输入框**/
/**
<div id="menu-wrapper" class="menu-wrapper hidden">
	<div id="sayDescribe" name="sayDescribe" class="menu">
		<textarea id="textarea" rows="5" placeholder="说点啥..."></textarea>
		<p><span id="text-count">20</span>/20</p>  
	</div>
</div>
**/
var menuWrapper = document.getElementById("menu-wrapper");
var menu = document.getElementById("sayDescribe");
/**
展开menu-wrapper时,menuWrapperClassList的值为(menu-wrapper fade-in-down animated mui-active)
关闭menu-wrapper时,menuWrapperClassList的值为(menu-wrapper fade-out-up animated hidden)
**/
var menuWrapperClassList = menuWrapper.classList;
var backdrop = document.getElementById("menu-backdrop");
var showSayDescribe=document.getElementById("showSayDescribe");
var controlDescribeElement=function(headId,displayValue,iframeName,topVlaue,contentTopValue){
	window.parent.controlDisplayHeaderAndNav(headId,displayValue);
	window.parent.evaluateIframeTopValue(iframeName,topVlaue);
	document.getElementById("tab-feedback-content").style.paddingTop=contentTopValue+"px";
}
//下沉菜单中的点击事件
var busying = false;
var toggleOfDescribe=function() {
	if (busying) {
		return;
	}
	busying = true;
	if (menuWrapperClassList.contains('mui-active')) {
		/**收起输入框**/
		document.body.classList.remove('menu-open');
		menuWrapper.className = 'menu-wrapper fade-out-up animated';
		menu.className = 'menu bounce-out-up animated';
		setTimeout(function() {
			/**opacity 从 0.0 （完全透明）到 1.0（完全不透明）**/
			backdrop.style.opacity = 0;
			document.getElementById("textareaOfDescribe").focus();
			controlDescribeElement("tabIframeMainHeader","block","contact",45,0);
			menuWrapper.classList.add('hidden');
		}, 1);
	} else {
		/**展开输入框**/
		document.body.classList.add('menu-open');
		menuWrapper.className = 'menu-wrapper fade-in-down animated mui-active';
		menu.className = 'menu bounce-in-down animated';
		/**opacity 从 0.0 （完全透明）到 1.0（完全不透明）**/
		backdrop.style.opacity = 0.5;
		
		controlDescribeElement("tabIframeMainHeader","none","contact",0,45);
 		document.getElementById("textareaOfDescribe").blur();
	}
	setTimeout(function() {
		busying = false;
	}, 1);
}

var maxSayDescribelen = 140;
var textareaOfDescribe=document.getElementById("textareaOfDescribe");
var showSayDescribeValue=document.getElementById("showSayDescribeValue");
var completeSayInput=document.getElementById("completeSayInput");
var synchronousSaydata=function(){
	//同步数据
	if(textareaOfDescribe.value.length==0){
		showSayDescribeValue.value="";
	}else{
		showSayDescribeValue.value=textareaOfDescribe.value;
	}
	//toggleOfDescribe();

}
function checkLength() {    
	   
	if (textareaOfDescribe.value.length > maxSayDescribelen){    
		textareaOfDescribe.value = textareaOfDescribe.value.substring(0,maxSayDescribelen);  
	}
	var curr = maxSayDescribelen - textareaOfDescribe.value.length;    
	document.getElementById("countFontNumber").innerHTML = curr.toString();    
	synchronousSaydata();
}    


/****/
textareaOfDescribe.addEventListener("keyup",checkLength);
backdrop.addEventListener('tap', toggleOfDescribe);
showSayDescribe.addEventListener('tap', toggleOfDescribe);
mui('.self-sayinput-header').on('tap', 'a', function(e) {
	toggleOfDescribe();
});

//选择快捷输入
mui('.mui-popover').on('tap','li',function(e){
  showSayDescribeValue.value = showSayDescribeValue.value + this.children[0].innerHTML;
  textareaOfDescribe.value=showSayDescribeValue.value;
  mui('.mui-popover').popover('toggle')
}) 

var selfSeeContent=document.getElementById("selfSeeContent");
/**
mui-table-view-cell self-locked-say
mui-table-view-cell self-locked-say-active
**/
var selfSeeContentClassList = selfSeeContent.classList;

var controlSelfSeeContent=function(){
	if (selfSeeContentClassList.contains('self-locked-say-active')) {
		/**当前为激活状态改为非激活状态**/
		
		selfSeeContent.className="mui-table-view-cell self-locked-say";
		
	} else if(selfSeeContentClassList.contains('self-locked-say')) {
		
		/**当前为非激活状态改为激活状态**/
		selfSeeContent.className="mui-table-view-cell self-locked-say-active";
	}
}

selfSeeContent.addEventListener('tap', controlSelfSeeContent);

var loadPhotoControlImg=function(imgSoucre){
    var img = new Image(),
    div = document.createElement('div');
    div.appendChild(img);
    img.onload = function () {
        document.querySelector('#upload-container').appendChild(div);
    };     
    img.src = imgSoucre;
}
/**
 * 通过随机数模拟业务进度，真实业务中需根据实际进度修改
 * @param {Object} container
 * @param {Object} progress
 */
function simulateLoading(container, progress) {
	if (typeof container === 'number') {
		progress = container;
		container = 'body';
	}
	setTimeout(function() {
		progress += Math.random() * 20;
		mui(container).progressbar().setProgress(progress);
		if (progress < 100) {
			simulateLoading(container, progress);
		} else {
			//mui(container).progressbar().hide();
		}
	}, Math.random() * 200 + 200);
}

var publishMessage=document.getElementById("publishMessage");

var publishItemMessage=function(){
	/**可以只发图片或者只发文字**/
	var container = mui("#publishMessageBar");
	//因为本页面既有顶部准确进度的进度条，也有顶部无限循环的进度条，因此这里需要强制定义progress: undefined覆盖；
				//一般使用时，mui(container).progress()构造方法中不传入参数，就表示无限循环；
	container.progressbar({
		progress: undefined
	}).show();
	//超时后隐藏
	setTimeout(function() {
		mui('#publishMessageBar').progressbar().hide();
	}, 5000);
}

publishMessage.addEventListener('tap',publishItemMessage);

var swithToShowImage=function(imgSource){
	document.getElementById("showImageEntity").src=imgSource;
	takeAPictureElement.style.display="none";
	showAPictureElement.style.display="block";
}

/**删除当前图片重新拍摄或者选择图片**/
imageShowDeleteItem.addEventListener('tap',function(){
	takeAPictureElement.style.display="block";
	showAPictureElement.style.display="none";
});
var imageShowEditItem=document.getElementById("imageShowEditItem");
/**重新编辑当前图片**/
imageShowEditItem.addEventListener('tap',function(){
    /**重新调用photoControl.html页面**/

});
