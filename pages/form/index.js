//index.js
const AV = require('../../libs/av-weapp-min.js')
var app = getApp()
Page({
	data: {
		motto: 'Hello World',
		nickName: '',
		avatarUrl: '',
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
	bindFormSubmit(e) {
		let textarea = e.detail.value.textarea
		let imgurl = this.data.tempFilePath

		if (textarea) {
			var that = this
			wx.getStorage({
				key: 'userInfo',
				success: function(res) {
					let nickName = res.data.nickName
					let avatarUrl = res.data.avatarUrl
					// console.log(nickName)
					if (nickName && imgurl) {
						AV.Query.doCloudQuery('insert into dayState(nickName , avatarUrl, textarea, imgurl) values("' + nickName + '", "' + avatarUrl + '", "' + textarea + '","' + imgurl + '")').then(function(data) {
							// data 中的 results 是本次查询返回的结果，AV.Object 实例列表
							var results = data.results;
							wx.navigateTo({
								url: '/pages/index/index'
							})
						}, function(error) {
							//查询失败，查看 error
							console.log(error);
						});

					} else {
						wx.showToast({
							title: 'error',
							icon: 'warn',
							duration: 2000
						})
					}

				}
			})


		} else {
			wx.showToast({
				title: '输入文字',
				icon: 'warn',
				duration: 2000
			})
		}

	}

})
