//index.js
const AV = require('../../libs/av-weapp-min.js')
var app = getApp()
Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		tempFilePath: ''
	},
	onLoad: function() {
		console.log('onLoad')
		// this.getUser()
	},
	getUser() {
		wx.getStorage({
		  key: 'userInfo',
		  success: function(res) {
		      console.log(res.data)
		  }
		})
	},
	uploadPic() {
		var that = this
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: function(res) {
				var tempFilePath = res.tempFilePaths[0];
				new AV.File('file-name', {
					blob: {
						uri: tempFilePath,
					},
				}).save().then(
					file => {
						that.setData({
							tempFilePath: file.url()
						})
					}


				).catch(console.error);
			}
		})
	},
	save() {
	// 	wx.getStorage({
	// 	  key: 'userInfo',
	// 	  success: function(res) {
	// 				let nickName = res.data.nickName
	// 				let avatarUrl = res.data.avatarUrl
	// 	  }
	// 	})
	// 	let nickName = that.data.userInfo.nickName
	// 	let avatarUrl = that.data.userInfo.avatarUrl
	// 	let gender = that.data.userInfo.gender
	// 	AV.Query.doCloudQuery('insert into _User(username, password , avatarUrl, gender) values("' + nickName + '","123", "' + avatarUrl + '",' + gender + ')').then(function(data) {
	// 		// data 中的 results 是本次查询返回的结果，AV.Object 实例列表
	// 		var results = data.results;
	// 	}, function(error) {
	// 		//查询失败，查看 error
	// 		console.log(error);
	// 	});
	}

})
