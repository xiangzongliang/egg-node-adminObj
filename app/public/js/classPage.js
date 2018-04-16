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
						{field:'sort',title:'排序'},
						{field: 'Cname', title: '中文标签'},
						{field: 'Ename', title: '英文标签'},
						{field: 'parentEn', title: '父及'},
						{field: 'openNewPage', title: '新页面打开'},
						{field: 'openNewWindow', title: '新窗口打开'},
						{fixed: 'right',title: '操作', width:178, align:'center', toolbar: '#barDemo'}
					]]
				});
			},





		}



	page.init()

});


