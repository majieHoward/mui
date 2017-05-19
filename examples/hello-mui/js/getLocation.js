/*
var getLocation = function(){
  alert("1");
};
navigator.geolocation.getCurrentPosition( // 该函数有如下三个参数
      function(pos){ // 如果成果则执行该回调函数
          console.log(
              '  经度：' + pos.coords.latitude +
              '  纬度：' + pos.coords.longitude +
              '  高度：' + pos.coords.altitude +
              '  精确度(经纬)：' + pos.coords.accuracy +
              '  精确度(高度)：' + pos.coords.altitudeAccuracy +
              '  速度：' + pos.coords.speed
          );
          var location = pos.coords.latitude+','+pos.coords.longitude;
          console.log(location);
          getBaiduAddress(location);
      }, function(err){ // 如果失败则执行该回调函数
          alert(err.message);
      }, { // 附带参数
          enableHighAccuracy: false, // 提高精度(耗费资源)
          timeout: 3000, // 超过timeout则调用失败的回调函数
          maximumAge: 1000 // 获取到的地理信息的有效期，超过有效期则重新获取一次位置信息
      }
  );
function getBaiduAddress(location){
  var url='http://api.map.baidu.com/geocoder/v2/';
  mui.ajax(url,{
  	data:{
      callback:'renderReverse',
      location:location,
      output:'json',
      pois:'1',
      ak:'pNtHNsrN8sNKbOFsFrWLk7g4YL5GWslX'
  	},
  	dataType:'json',//服务器返回json格式数据
  	type:'get',//HTTP请求类型
  	success:function(data){
  		//获得服务器响应
  		console.log(data);
  	}
  });
}
*/

var longitude;
var latitude;

navigator.geolocation.getCurrentPosition(function(position) {
	longitude = position.coords.longitude;
	latitude = position.coords.latitude;
});

setTimeout(function() {
	var gpsPoint = new BMap.Point(longitude, latitude);
	console.log(gpsPoint);
	BMap.Convertor.translate(gpsPoint, 0, function(point) {
		var geoc = new BMap.Geocoder();
		geoc.getLocation(point, function(rs) {
			var addComp = rs.addressComponents;
			console.log(rs);
			alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
			sessionStorage.setItem("locationAddress",rs);
			if(rs.address!=''){
				document.getElementById('selfLocationValueInner').innerHTML="";
				document.getElementById('selfLocationValueInner').innerHTML=rs.address;
			}
		});
	});
}, 3000);

/*
function getPosition(callback) {
	try {
		plus.geolocation.getCurrentPosition(function(position) {
			console.log(JSON.stringify(position));
			var codns = position.coords; //获取地理坐标信息；
			//	var geoc = new BMap.Geocoder();
			//	var pt = new BMap.Point(codns.longitude, codns.latitude);
			//	geoc.getLocation(pt, function(rs) {
			//	var addComp = rs.addressComponents;
			//	console.log(JSON.stringify(addComp));
			//	var lo =addComp.province+','+addComp.city;
			//	callback(lo);
			//	});
			var req = 'http://api.map.baidu.com/geocoder/v2/';
			var parms = {
				ak: 'pNtHNsrN8sNKbOFsFrWLk7g4YL5GWslX',
				callback: 'renderReverse',
				output: 'json',
				location: codns.latitude + ',' + codns.longitude
				//,pois:1（周边poi数组） //不建议要，周边数据太杂，不需要
			};
			mui.ajax(req, {
				data: parms,
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				success: function(data) {
					console.log(JSON.stringify(data));
					myStorage.setItem('geolocation', data);
					if(data.status == 0) {
						var lo = data.result.addressComponent.province + ',' + data.result.addressComponent.city;
						callback(lo);
					} else {
						callback(false);
					}
				},
				error: function(xhr, type, errorThrown) {
					callback(false);
				}
			});
		}, function(e) {
			console.log("获取定位位置信息失败：" + e.message);
			callback(false);
		}, {
			provider: 'baidu'
		});

	} catch(e) {
		callback(false);
		console.error(e.message);
	}
}
getPosition();*/