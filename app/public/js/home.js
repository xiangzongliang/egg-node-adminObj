layui.use(['element','jquery','layer'], function(element,$){
	var element = layui.element,
		layer = layui.layer,



		page = {
			init:function () {
				return this;
			},

			listenFun:function () {
				$('.editAlikInfo').click(function () {
					page.editAlikey()
				});

				$('.editQiniuInfo').click(function () {
					page.editQiniuInfo()
				});


				$('.editSlogan').click(function () {
					page.editSlogan()
				});

				$('.editPassword').click(function () {
					page.editPassword()
				});

			},





			//修改阿里云的信息配置
			editAlikey:function () {
				var aliyunKeyid = $('.aliyunKeyid').val(),
					aliyunKeysec = $('.aliyunKeysec').val(),
					postData = {
						aliyunKeyid:aliyunKeyid,
						aliyunKeysec:aliyunKeysec
					}

				if(aliyunKeyid && aliyunKeysec){
					layer.confirm('确定要修改阿里云的KEY信息', function(index){
						$.ajax({
							url:'/editAliyunKey',
							type:'POST',
							headers: {
								'x-csrf-token':iantoo.getCookie()
							},
							data:postData,
							dataType:'json',
							success:function (data) {
								layer.msg(data.msg);
							}
						})
						layer.close(index);
					});

				}else{
					layer.msg('阿里云配置信息不完整')
				}
			},



			//修改七牛云信息
			editQiniuInfo:function () {
				var postData = {
					qiniuAK:$('.qiniuAK').val(),
					qiniuSK:$('.qiniuSK').val()
				}

				if(postData.qiniuAK && postData.qiniuSK){
					layer.confirm('确定要修改七牛云的信息', function(index){
						$.ajax({
							url:'/editQiniuyun',
							type:'POST',
							headers: {
								'x-csrf-token':iantoo.getCookie()
							},
							data:postData,
							dataType:'json',
							success:function (data) {
								layer.msg(data.msg);
							}
						})
						layer.close(index);
					});
				}else{
					layer.msg('请输入完整的七牛云信息')
				}
			},
			
			
			
			//修改标语
			editSlogan:function () {
				var sloganVal = {
					slogan:$('.slogan').val()
				}
				if(sloganVal.slogan){
					layer.confirm('确定要修改标语吗？', function(index){
						$.ajax({
							url:'/editslogan',
							type:'POST',
							headers: {
								'x-csrf-token':iantoo.getCookie()
							},
							data:sloganVal,
							dataType:'json',
							success:function (data) {
								layer.msg(data.msg);
							}
						})
						layer.close(index);
					});
				}else{
					layer.msg('slogan不能为空')
				}
			},
			
			
			//修改密码
			editPassword:function () {
				var postData = {
					password:$('.password').val()
				};
				if(postData.password && postData.password.length>4){
					layer.confirm('确定要修改密码吗？', function(index){
						$.ajax({
							url:'/editsPassword',
							type:'POST',
							headers: {
								'x-csrf-token':iantoo.getCookie()
							},
							data:postData,
							dataType:'json',
							success:function (data) {
								layer.msg(data.msg);
							}
						})
						layer.close(index);
					});
				}else{
					layer.msg('新密码不能少于四位！')
				}
			}
		};

	page.listenFun()
});


