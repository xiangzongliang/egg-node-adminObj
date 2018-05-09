layui.use(['element','jquery','layer','form','table','upload'], function(element,$,layer,form,table,upload){
	var element = layui.element,
		layer = layui.layer,
		form = layui.form,
		$ = layui.jquery,
		table = layui.table,
		upload = layui.upload;






		page = {
			init:function () {
				table.render({
					elem: '#bgmusicList',
					headers:{'x-csrf-token':iantoo.getCookie()},
					method:'POST',
					url: '/bgmusicList', //数据接口
					page: true, //开启分页
					cols: [[ //表头
						{field: 'muid', title: 'ID', width:80, sort: true, fixed: 'left'},
						{field: 'songTitle', title: '歌曲名称'},
						{field: 'author', title: '作者'},
						{field: 'src', title: '链接'},
						{fixed: 'right',title: '操作', width:178, align:'center', toolbar: '#barDemo'}
					]]
				});
				return this;
			},
			listenFun:function () {
				//点击上传文件按钮
				$('.postMusicFile').click(function () {

					let popupHtml = '<input type="file" placeholder="选择上传文件" id="postFilePopupContent"/>'
					popupHtml += '<div style="margin-top: 30px" class="layui-progress" lay-showPercent="yes"  lay-filter="imageUpload"><div class="layui-progress-bar layui-bg-red" lay-percent="0%"></div></div>'


					layer.open({
						id: 'filePost',
						content: popupHtml,
						title: '上传文件',
						btn: ['开始上传', '取消'],
						area: ['550px', '300px'],
						shadeClose: true,
						success: function () {

						},
						yes: function (index, layero) {
							page.upFile(index)
						}
					})
				})
				
				

				//点击添加音乐列表按钮
				$('.addbbMusic').click(function () {
					page.popupMusic({
						type:'add',
						url:''
					})
				})

				//点击操作栏
				table.on('tool(filbgmusicList)', function(obj){
					var data = obj.data;
					if(obj.event === 'del'){
						layer.confirm('确定要删除音乐《' + data.songTitle + '》吗？', function(index){
							layer.close(index);
							$.ajax({
								url:'/delMusic',
								type:'POST',
								headers: {
									'x-csrf-token':iantoo.getCookie()
								},
								data:{'muid':data.muid},
								dataType:'json',
								success:function (data) {
									layer.msg(data.msg);
									page.init().listenFun()
								}
							})
						});
					} else if(obj.event === 'edit'){
						page.popupMusic({
							type:'edit',
							songTitle:data.songTitle,
							muid:data.muid,
							author:data.author,
							src:data.src,
						})
					}
				});
			},
			//上传文件
			upFile:function (index) {
				$.ajax({
					url:'/getmusicToken',
					type:'POST',
					headers: {
						'x-csrf-token':iantoo.getCookie()
					},
					dataType:'json',
					success:function (token) {
						var inputFile = document.getElementById('postFilePopupContent');
						var file = inputFile.files[0];
						var data = new Date();
						var key = data.getTime() + file.name; //上传之后的文件名称
						var config = {
							useCdnDomain: true, //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false
							region: qiniu.region.z0, //华东//选择上传域名区域；当为 null 或 undefined 时，自动分析上传域名区域
						};
						var putExtra = {
							fname: file.name, //文件原文件名
							params: {}, //用来放置自定义变量
							mimeType: null, //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
						};

						// 上传过程中的回调
						var observer = {
							//接收上传进度信息
							next:function(response){
								let total = response.total;
								console.log("进度：" + total.percent + "% ")
								element.progress('imageUpload', total.percent+'%');
							},
							//上传错误后触发
							error:function(err){
								console.log(err)
								layer.msg('上传失败')
							},
							//接收上传完成后的后端返回信息
							complete:function(res){
								layer.close(index);
								//如果上传的是海报
								var url = token.domain + res.key
								console.log(url)
								console.log(res);
								layer.msg('上传成功')
								page.popupMusic({
									type:'add',
									src:url,
								})
							}
						}


						var blogPosterQiniu = qiniu.upload(file, key, token.uptoken, putExtra, config);
						var subscription = blogPosterQiniu.subscribe(observer) // 开始上传
					}
				})



			},
			
			
			popupMusic:function (opction) {
				var titleName = '';
				if(opction.type == 'add'){
					titleName = '新增背景音乐'
				}else{
					titleName = '编辑背景音乐'
				}
				layer.open({
					id: 'popupMusicBox',
					content: $('.addpopupBox').html(),
					title: titleName,
					btn: ['保存', '取消'],
					area: ['550px', '300px'],
					shadeClose: true,
					success: function () {
						if(opction.type == 'add'){
							$('#popupMusicBox .musrc').val(opction.src)
						}else if(opction.type == 'edit'){
							$('#popupMusicBox .musongTitle').val(opction.songTitle)
							$('#popupMusicBox .muauthor').val(opction.author)
							$('#popupMusicBox .musrc').val(opction.src)
						}
					},
					yes: function (index, layero) {
						var songTitle = $('#popupMusicBox .musongTitle'),
							author=$('#popupMusicBox .muauthor'),
							src=$('#popupMusicBox .musrc');

						if(songTitle.val()==''){
							layer.tips('标题不能为空', songTitle);
							return;
						}else if(author.val() == ''){
							layer.tips('作者不能为空', author);
							return;
						}else if(src.val() == ''){
							layer.tips('URL不能为空', src);
							return;
						}


						if(opction.type == 'add'){
							page.addORUpdateMusicRequest('/addbgMisic',{
								songTitle:songTitle.val(),
								author:author.val(),
								src:src.val()
							},index)
						}else{
							page.addORUpdateMusicRequest('/updataMusic',{
								songTitle:songTitle.val(),
								author:author.val(),
								src:src.val(),
								muid:opction.muid
							},index)
						}
					}
				})
			},
			
			
			
			
			addORUpdateMusicRequest:function (url,postData,index) {
				$.ajax({
					url:url,
					type:'POST',
					headers: {
						'x-csrf-token':iantoo.getCookie()
					},
					data:postData,
					dataType:'json',
					success:function (data) {
						layer.msg(data.msg)
						layer.close(index);
						page.init().listenFun()
					}
				})
			},

		}



	page.init().listenFun()

});


