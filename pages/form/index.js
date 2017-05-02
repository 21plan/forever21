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
		// this.saveUser()
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
	}
})
