//app.js
const AV = require('./libs/av-weapp-min.js')
App({
	onLaunch: function() {
		//调用API从本地缓存中获取数据
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)
		// bind leancloud
		AV.init({
			appId: '1KQ32oO43Y8Bk8f3smsO8drp-gzGzoHsz',
			appKey: 'sREtK6AxYhOAgQ3jFinuxaX2',
		});
	},
	getUserInfo: function(cb) {
		var that = this
		if (this.globalData.userInfo) {
			typeof cb == "function" && cb(this.globalData.userInfo)
		} else {
			//调用登录接口
			wx.login({
				success: function() {
					wx.getUserInfo({
						success: function(res) {
							that.globalData.userInfo = res.userInfo
							// console.log(666)
							typeof cb == "function" && cb(that.globalData.userInfo)
						}
					})
				}
			})
		}
	},
	globalData: {
		userInfo: null
	}
})
