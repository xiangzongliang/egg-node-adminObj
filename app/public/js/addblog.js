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
			markdown : '[TOC]',
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
						"link", "reference-link", "imageUpdata", "code", "preformatted-text", "code-block", "table", "datetime", "emoji", "html-entities", "pagebreak", "|",
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
					page.imageUploaing();
				},
				AddPoster: function (e) {
					page.AddPosterImg()
				}
			}

		}),
		classList = [],


		page = {

			init:function () {
				laydate.render({
					elem: '#addDate', //指定元素
					format:'yyyy-MM-dd HH:mm:ss'
				});
				return this;
			},
			listenFun:function () {

				//点击选择分类
				$('.editClass').click(function () {
					page.editClassPopup()
				})


				//点击发布文章
				$('.blogPush').click(function () {

				})

				//点击发布到草稿箱
				$('.blogSaveDraft').click(function () {

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
			
			
			
			
			// 七牛的图片上传
			imageUploaing:function () {
				
			},
			
			
			//七牛的海报上传
			AddPosterImg:function () {
				var popHtml = '<a id="container"><button class="layui-btn layui-btn-danger" id="selectPosterImage">选择海报图片</button></a><hr class="layui-bg-gray">'
				popHtml += '<blockquote class="layui-elem-quote layui-quote-nm upimageList"></blockquote>'


				var blogPosterQiniu;
				layer.open({
					id: 'blogPoster',
					content: popHtml,
					title: '选择博客海报',
					btn: ['开始上传', '取消'],
					area: ['550px', '520px'],
					shadeClose: true,
					success: function () {
						blogPosterQiniu = qiniu.upload({
							runtimes: 'html5,flash,html4',    //上传模式,依次退化
							browse_button: 'selectPosterImage',       //上传选择的点选按钮，**必需**
							uptoken_url: '/getPosterToken',            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
		//	                uptoken : token, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
							unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
							save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
							domain: 'http://oyf8tmfgb.bkt.clouddn.com/',   //bucket 域名，下载资源时用到，**必需**
							get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
							container: 'container',           //上传区域DOM ID，默认是browser_button的父元素，
							max_file_size: '100mb',           //最大文件体积限制
							flash_swf_url: './js/plupload/Moxie.swf',  //引入flash,相对路径
							max_retries: 3,                   //上传失败最大重试次数
							dragdrop: true,                   //开启可拖曳上传
							drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
							chunk_size: '4mb',                //分块上传时，每片的体积
							auto_start: false,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
							init: {
								'FilesAdded': function (up, files) {
									plupload.each(files, function (file) {
										$('#blogPoster .upimageList').append('<p>' + file.name + '</p>')
									})
									// 文件添加进队列后,处理相sssss
								},
								'BeforeUpload': function (up, file) {
									// 每个文件上传前,处理相关的事情
									layer.load(2);
								},
								'UploadProgress': function (up, file) {

									// 每个文件上传时,处理相关的事情
//	                           console.log(up, file)
//	                           var uploading = window.setInterval(function(){
//	                           	console.log(up, file)
//	                           }, 1000);
//	                           	clearInterval(iID);

								},
								'FileUploaded': function (up, file, info) {
									layer.closeAll('loading');
									// 每个文件上传成功后,处理相关的事情
									// 其中 info.response 是文件上传成功后，服务端返回的json，形式如
									// {
									//    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
									//    "key": "gogopher.jpg"
									//  }
									// 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
									var domain = up.getOption('domain');
									var res = $.parseJSON(info.response);
									var sourceLink = domain + res.key; //获取上传成功后的文的件Url
									$('#blogPoster .upimageList').append('<p>' + sourceLink + '</p>');
									blogPosterUrl = sourceLink;


								},
								'Error': function (up, err, errTip) {
									//上传出错时,处理相关的事情
									console.log(up, err, errTip)
								},
								'UploadComplete': function () {
									//队列文件处理完毕后,处理相关的事情
									layer.msg('上传成功');
								},
								'Key': function (up, file) {
									// 若想在前端对每个文件的key进行个性化处理，可以配置该函数
									// 该配置必须要在 unique_names: false , save_key: false 时才生效

									var key = "";
									// do something with key here
									return key
								}
							}
						});

					},
					yes: function (index, layero) {
						blogPosterQiniu.start();
					}
				})
			}



			//发表文章


		}



		page.init().listenFun()

});


