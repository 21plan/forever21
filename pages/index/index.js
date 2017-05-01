//index.js
const AV = require('../../libs/av-weapp-min.js')
var app = getApp()
Page({
	data: {
		motto: 'Hello World',
		userInfo: {}
	},
	//事件处理函数
	bindViewTap: function() {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	onLoad: function() {
		console.log('onLoad')
		this.saveUser()

	},
	saveUser() {
		var that = this
		//调用应用实例的方法获取全局数据
		app.getUserInfo(function(userInfo) {
			//update data
			that.setData({
				userInfo: userInfo
			})
			wx.setStorage({
				key: "userInfo",
				data: userInfo
			})
			let nickName = that.data.userInfo.nickName
			let avatarUrl = that.data.userInfo.avatarUrl
			let gender = that.data.userInfo.gender
			AV.Query.doCloudQuery('insert into _User(username, password , avatarUrl, gender) values("' + nickName + '","123", "' + avatarUrl + '",' + gender + ')').then(function(data) {
				// data 中的 results 是本次查询返回的结果，AV.Object 实例列表
				var results = data.results;
			}, function(error) {
				//查询失败，查看 error
				console.log(error);
			});

		})
	}
})
