var iantoo = {
	getCookie:function () {
		var docCookie = document.cookie,
			csrfToken = docCookie.split('=');
		return csrfToken[1];
	}
}