layui.use(['element','jquery','layer','form','table'], function(element,$,layer,form,table){
	var element = layui.element,
		layer = layui.layer,
		form = layui.form,
		table = layui.table,




		page = {
			init:function () {
				table.render({
					elem: '#classListTable',
					headers:{'x-csrf-token':iantoo.getCookie()},
					method:'POST',
					url: '/classFTN', //数据接口
					//page: true, //开启分页
					cols: [[ //表头
						{field: 'nid', title: 'ID', width:80, sort: true, fixed: 'left'},
						{field:'sort',title:'排序',sort: true},
						{field: 'Cname', title: '中文标签'},
						{field: 'Ename', title: '英文标签'},
						{field: 'display', title: '显示'},
						{field: 'parentEn', title: '父及'},
						{field: 'openNewPage', title: '新页面打开'},
						{field: 'openNewWindow', title: '新窗口打开'},
						{fixed: 'right',title: '操作', width:178, align:'center', toolbar: '#barDemo'}
					]]
				});

				page.listenFun()
			},
			listenFun:function () {
				//监听工具条
				table.on('tool(classList)', function(obj){
					var data = obj.data;
					if(obj.event === 'del'){
						layer.confirm('真的删除行么', function(index){
							obj.del();
							layer.close(index);
						});
					} else if(obj.event === 'edit'){
						page.classPopup(data)
					}
				});



				//点击添加按钮
				$('.addclass').click(function () {
					page.classPopup()
				})
			},
			
			
			
			
			classPopup:function (opction) {
				var title;
				if(opction){  //编辑
					title = '编辑分类'
				}else{  //新增
					title = '新增分类'
				}

				layer.open({
					type:1,
					id:'classPopup',
					title:title,
					content: $('.classPopup'),
					area:['450px','600px'],
					btn:['保存','取消'],
					btnAlign:'c',
					success:function () {
						var classPopup = $('#classPopup')
						console.log(opction);
						if(opction){
							classPopup.find('.Cname').val(opction.Cname)
							classPopup.find('.Ename').val(opction.Ename)
							classPopup.find('.sort').val(opction.sort)
							classPopup.find(".parentName option[value='"+opction.parentEn+"']").attr("selected","selected");

							opction.display == 'y' ? classPopup.find('.showAndHiden').attr("checked",true):classPopup.find('.showAndHiden').attr("checked",false)
							opction.openNewPage == 'y' ? classPopup.find('.openNewPage').attr("checked",true) : classPopup.find('.openNewPage').attr("checked",false);
							opction.openNewWindow == 'y' ? classPopup.find('.openNewWindow').attr("checked",true) : classPopup.find('.openNewWindow').attr("checked",false);
							form.render();
						}

					},
					yes:function () {
						
					}

				});
			}





		}



	page.init()

});


