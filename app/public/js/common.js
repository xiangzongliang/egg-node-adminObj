var iantoo = {
	getCookie:function () {
		var docCookie = document.cookie,
			csrfList = docCookie.split(';'),
			csrfToken = '';

		for(var l=0;l<csrfList.length;l++){
			var cListItem = csrfList[l],
				csrfKey = cListItem.split('=');
			if(csrfKey[0] == 'csrfToken'){
				csrfToken = csrfKey[1]
			}
		}


		return csrfToken;
	},
	getBid:function (name) {
		var qs = location.search.substr(1), // 获取url中"?"符后的字串
			args = {}, // 保存参数数据的对象
			items = qs.length ? qs.split("&") : [], // 取得每一个参数项,
			item = null,
			len = items.length;

		for(var i = 0; i < len; i++) {
			item = items[i].split("=");
			var name = decodeURIComponent(item[0]),
				value = decodeURIComponent(item[1]);
			if(name) {
				args[name] = value;
			}
		}
		return args;
	}
}