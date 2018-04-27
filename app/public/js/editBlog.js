layui.use(['element','jquery','layer','form','laydate'], function(element,$,layer,form,laydate){
	var element = layui.element,
		layer = layui.layer,
		form = layui.form,
		$ = window.$,
		laydate = layui.laydate,


		testEditor = editormd("test-editormd", {
			width: "100%",
			height: window.$(window).height() - 130,
			path : '../public/libs/lib/',
			//theme : "dark",
			//previewTheme : "dark",
			//editorTheme : "pastel-on-dark",
			markdown : '',  //  默认插入的mk信息
			codeFold : true,
			//syncScrolling : false,
			saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
			searchReplace : true,
			//watch : false,                // 关闭实时预览
			htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
			//toolbar  : false,             //关闭工具栏
			toolbarIcons : function() {
				return [
					"undo", "redo", "|",
					"bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|",
					"h1", "h2", "h3", "h4", "h5", "h6", "|",
					"list-ul", "list-ol", "hr", "|",
					"link", "reference-link", "imageUpdata", "code", "preformatted-text", "code-block", "table", "datetime", "emoji", "html-entities", "|",
					"undo", "redo", "|",
					"bold", "del", "italic", "quote", "uppercase", "lowercase", "|",
					"h1", "h2", "h3", "h4", "h5", "h6", "|",
					"list-ul", "list-ol", "hr", "|",
					"goto-line", "watch", "preview", "fullscreen", "clear", "search", "|",
					"help", "info","|","pagebreak", "AddPoster"
				]
			},
			//previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
			emoji : true,
			taskList : true,
			tocm            : true,         // Using [TOCM]
			//tex : true,                   // 开启科学公式TeX语言支持，默认关闭
			//flowChart : true,             // 开启流程图支持，默认关闭
			//sequenceDiagram : true,       // 开启时序/序列图支持，默认关闭,
			//dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
			//dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
			//dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
			//dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
			//dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
			imageUpload : true,
			imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
			toolbarIconsClass: {
				/*
				 自定义图标的链接  http://fontawesome.io/
				 */
				imageUpdata: "fa-picture-o",  // 指定一个FontAawsome的图标类
				AddPoster: "fa-file-powerpoint-o"
			},
			toolbarIconTexts: { //如果没有图标,指定文字
				// AddPoster : "海报"
			},
			lang: {//自定义按钮的提示文字
				toolbar: {
					AddPoster: "添加文章海报"
				}
			},
			//		自定义工具栏事件处理
			toolbarHandlers: {
				// 点击图片按钮启动图片上传功能
				imageUpdata: function (e) {
					page.uploadingImage('addImage');
				},
				AddPoster: function (e) {
					page.uploadingImage('addPoster')
				}
			}

		}),
		classList = [], //文章分类所选择的的数组
		posterUrl = '', //文章海报的url



		page = {

			init:function () {
				laydate.render({
					elem: '#addDate', //指定元素
					format:'yyyy-MM-dd HH:mm:ss'
				});
				var getBid = iantoo.getBid().bid
				$.ajax({
					url:'/queryBlog',
					type:'POST',
					headers: {
						'x-csrf-token':iantoo.getCookie()
					},
					data:{
						'bid' : getBid
					},
					dataType:'json',
					success:function (data) {
						var blogcontent = data.msg;
						if(data.status == true){
							posterUrl = blogcontent.blogPoster
							classList = JSON.parse(blogcontent.blogLable);
							setTimeout(function () {
								testEditor.insertValue(blogcontent.markDown);
							},1000)
							$('.blogTitle').val(blogcontent.title)
							$('.blogAddDate').val(page.dateVS(blogcontent.date))
						}
					}
				})




				return this;
			},

			dateVS:function (timeStamp) {
					var date = new Date();
					date.setTime(timeStamp * 1000);
					var y = date.getFullYear();
					var m = date.getMonth() + 1;
					m = m < 10 ? ('0' + m) : m;
					var d = date.getDate();
					d = d < 10 ? ('0' + d) : d;
					var h = date.getHours();
					h = h < 10 ? ('0' + h) : h;
					var minute = date.getMinutes();
					var second = date.getSeconds();
					minute = minute < 10 ? ('0' + minute) : minute;
					second = second < 10 ? ('0' + second) : second;
					return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
			},

			listenFun:function () {

				//点击选择分类
				$('.editClass').click(function () {
					page.editClassPopup()
				})


				//点击发布文章
				$('.blogPush').click(function () {
					page.saveBlog('push')
				})

				//点击发布到草稿箱
				$('.blogSaveDraft').click(function () {
					page.saveBlog('saveDraft')
				})





			},


			//选择分类
			editClassPopup:function () {
				layer.open({
					type: 1,
					id:'editClassPop',
					title:'选择分类',
					area: ['600px', '400px'],
					btnAlign: 'c',
					content: $('.classPopup').html(),
					success: function(layero, index){
						var selectBlogLabelInput = $('#editClassPop input');
						console.log(classList);
						for(sl in classList){
							for(si in selectBlogLabelInput){
								if(selectBlogLabelInput[si].name == classList[sl]){
									selectBlogLabelInput[si].setAttribute('checked',true)
								}
							}
						}

						form.render('checkbox');
						form.on('checkbox(popClasscheckbox)', function(data){
							if(data.elem.checked == true){
								classList.push(data.elem.name);
							}else{
								for(cls in classList){
									if(classList[cls] == data.elem.name){
										classList.splice(cls, 1);
									}
								}
							}
							//console.log(data.elem); //得到checkbox原始DOM对象
							//console.log(data.elem.checked); //开关是否开启，true或者false
							//console.log(data.value); //开关value值，也可以通过data.elem.value得到
							//console.log(data.othis); //得到美化后的DOM对象
						});

					},
					yes: function(index, layero){
						layer.close(index); //如果设定了yes回调，需进行手工关闭
					}
				});
			},





			//七牛的上传
			uploadingImage:function (opction) {
				var popHtml = '<a id="container"><input type="file" placeholder="选择图片" class="layui-input" id="selectPosterImage"/></a><hr class="layui-bg-gray">'
				popHtml+='<div class="layui-progress  layui-progress-big" lay-showPercent="yes" lay-filter="imageUpload"><div class="layui-progress-bar layui-bg-red" lay-percent="0%"></div></div>'

				layer.open({
					id: 'blogPoster',
					content: popHtml,
					title: '选择博客海报',
					btn: ['开始上传', '取消'],
					area: ['550px', '300px'],
					shadeClose: true,
					success: function () {

					},
					yes: function (index, layero) {
						page.PostImage({
							type:opction,
							index:index
						});
					}
				})
			},





			//上传图片
			PostImage:function (opction) {
				var url = '';
				if(opction.type == 'addPoster'){
					url = '/getPosterToken';
				}else if(opction.type == 'addImage'){
					url = '/getImageToken';
				}



				//获取token
				$.ajax({
					url:url,
					type:'POST',
					headers: {
						'x-csrf-token':iantoo.getCookie()
					},
					success:function (token) {
						var inputFile = document.getElementById('selectPosterImage');
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
								layer.close(opction.index);
								//如果上传的是海报
								if(opction.type == 'addPoster'){
									posterUrl = token.domain + res.key
								}else if(opction.type == 'addImage'){ //如果上传的是图片则插入到文档中
									testEditor.insertValue("![haha]("+ token.domain + res.key +")");
								}
								layer.msg('上传成功')
								console.log(posterUrl)
							}
						}


						var blogPosterQiniu = qiniu.upload(file, key, token.uptoken, putExtra, config);
						var subscription = blogPosterQiniu.subscribe(observer) // 开始上传
					}
				})
			},



			//发表/存为草稿--文章
			saveBlog:function (opction) {
				var postData = {
					'title':$('.blogTitle').val(),
					'blogLable':JSON.stringify(classList),
					'date':$('.blogAddDate').val(),
					'content':testEditor.getPreviewedHTML(),
					'OTCcontent':testEditor.getHTML(),
					'markDown':testEditor.getMarkdown(),
					'blogPoster':posterUrl,
					'Draft':opction =='push' ? 'n' : 'y',
					'bid':iantoo.getBid().bid
				}


				console.log(postData)
				if(postData.title == ''){
					layer.msg('文章标题不能为空')
					return;
				}else if(classList.length == 0){
					layer.msg('请选择文章的分类')
					return;
				}

				$.ajax({
					url:'/updataBlog',
					type:'POST',
					headers: {
						'x-csrf-token':iantoo.getCookie()
					},
					data:postData,
					dataType:'json',
					success:function (data) {
						layer.msg(data.msg);
						setTimeout(function () {
							window.location.href = '/blogManagement'
						},1000)
					}
				})

			}


		}



	page.init().listenFun()

});


