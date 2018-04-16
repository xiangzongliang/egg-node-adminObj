layui.use(['element','jquery','layer','form','table'], function(element,$,layer,form,table){
	var element = layui.element,
		layer = layui.layer,
		form = layui.form,
		table = layui.table,




		page = {
			init:function () {
				table.render({
					elem: '#blogListTable',
					headers:{'x-csrf-token':iantoo.getCookie()},
					method:'POST',
					url: '/queryDraftsList', //数据接口
					page: true, //开启分页
					cols: [[ //表头
						{field: 'bid', title: 'ID', width:80, sort: true, fixed: 'left'},
						{field: 'title', title: '标题'},
						{field: 'date', title: '创建时间'},
						{field: 'flow', title: '浏览量',width:80},
						{field:'discuss' ,title:'评论数',width:80},
						{fixed: 'right',title: '操作', width:178, align:'center', toolbar: '#barDemo'}
					]]
				});
				page.listenFun()
			},
			listenFun:function () {
				table.on('tool(blogList)', function(obj){
					var data = obj.data;
					if(obj.event === 'del'){
						layer.confirm('确定要删除文章《' + data.title + '》吗？', function(index){
							layer.close(index);
							page.deleteBlog(data)
						});
					} else if(obj.event === 'edit'){
						window.location.href = '/editBlog?bid='+data.bid;
					}
				});
			},



			deleteBlog:function(data){
				$.ajax({
					url:'/deleteBlog',
					type:'POST',
					headers: {
						'x-csrf-token':iantoo.getCookie()
					},
					data:{'bid':data.bid},
					dataType:'json',
					success:function (data) {
						layer.msg(data.msg);
						page.init()
					}
				})
			}
		}



	page.init()

});


