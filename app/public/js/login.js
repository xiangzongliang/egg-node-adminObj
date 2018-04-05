layui.use(['element','jquery'], function(element,$){
	var element = layui.element,



		page = {
			init:function () {
				return this;
			},
			listen:function () {
				$('.login-btn').click(function () {
					$.ajax({
						url:'/login',
						type:'POST',
						headers: {
							'x-csrf-token':'pWQXfRfZI0qXHHLdCg38j81l'
						},
						data:{name:'dsdasd',psd:'123456'},
						dataType:'json',
						success:function (data) {
							console.log(data);
						}
					})
				})
			}
		}


		page.init().listen();

});


