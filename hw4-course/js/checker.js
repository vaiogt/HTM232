window.fbAsyncInit = function() {
	FB.init({
		appId : '229034627174596',
		status : true,
		cookie : true
	});
};

var startButton = $('.hw4-start-button'), results = $('.hw4-result');

// 垃圾社團列表
var junkGroups = [];

// 用 Ajax 自 http://spamgroup.tonyq.org/groups/jsonp 取得垃圾社團列表
// 用 jsonp 自 http://antispam.tonyq.org/groups/jsonp/?jsonp=parser 取得列表，但有注意事項
// Server 端要吃一個參數支援 jsonp
$.ajax("http://spamgroup.tonyq.org/groups/jsonp", {
	dataType : "jsonp",
	jsonp : "jsonp", // server 端參數名稱
	success : function(data) {
		data.forEach(function(record) {
			junkGroups.push(record.GID);
		});
		startButton.removeAttr("disabled").removeClass("disabled");
	}
});
// 完成後執行：
// function(data){
//   data.forEach(function(record){
//     junkGroups.push(record.GID);
//   });
//   startButton.removeAttr('disabled').removeClass('disabled');
// }

// 1. 讓使用者登入此 Facebook App (FB.login)
// 2. 以 FB.api 拿到使用者的 group 列表
// 3. 比對每個使用者的 group 是否有在 junkGroups 中出現
//
startButton.click(function() {
	results.empty();
	// 清除裡面的內容
	$('.hw4-complete').remove();
	// 移除「掃描完成」

	// Facebook login
	// https://developers.facebook.com/docs/reference/javascript/FB.login/
	FB.login(function(response){
		// console.log(response);
		// 實際上需要有if判斷是否有登入
		// https://developers.facebook.com/docs/reference/javascript/FB.api/
		FB.api("/me/groups", function(resp){
			// console.log(resp);
			var groups = resp.data;
			groups.forEach(function(group){
				if (junkGroups.indexOf(group.id) != -1) {
					results.append("<tr><th>" + group.id + "</th><td>" + group.name + "</td>");
				};
			});
			
			results.after("<div class='hw4-complete alert alert-info'>掃描完成！！</div>");
		});
	}, {scope: "user_groups"});
	// 拿到使用者 group 列表的 response 之後：
	// function(resp){
	//   var groups = resp.data;
	//   groups.forEach(function(group){
	//     console.log(group);
	//     if( junkGroups.indexOf(group.id) !== -1 ){
	//       results.append('<tr><th>' + group.id + '</th><td>' + group.name + '</td>');
	//     }
	//   });

	//   results.after('<div class="hw4-complete alert alert-info">掃描完成</div>');
	// }

}); 