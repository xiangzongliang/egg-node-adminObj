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
						"link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "emoji", "html-entities", "pagebreak", "|",
						"undo", "redo", "|",
						"bold", "del", "italic", "quote", "uppercase", "lowercase", "|",
						"h1", "h2", "h3", "h4", "h5", "h6", "|",
						"list-ul", "list-ol", "hr", "|",
						"goto-line", "watch", "preview", "fullscreen", "clear", "search", "|",
						"help", "info"
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



			//发表文章


		}



		page.init().listenFun()

});


