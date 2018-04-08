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
	}
}