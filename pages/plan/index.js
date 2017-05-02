const AV = require('../../libs/av-weapp-min.js')
const date = new Date()
let year = date.getFullYear()
let month = date.getMonth() > 9 ? date.getMonth() + 1 : date.getMonth() + 1
let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
let cur_date = year + '-' + '0' + month + '-' + day
Page({
	data: {
		cur_date: cur_date,
		date: cur_date,
		coin: 10,
		inputvalue: '',
		disabled: false,
		nickName: ''
	},
	onLoad() {
		console.log(666)
	},
	bindKeyInput: function(e) {
		this.setData({
			inputvalue: e.detail.value
		})
	},
	bindDateChange: function(e) {
		this.setData({
			date: e.detail.value
		})
	},
	save() {
		let title = this.data.inputvalue
		let start = this.data.date
		let nickName = ''
		if (title) {
			wx.getStorage({
				key: 'userInfo',
				success: function(res) {
					nickName = res.data.nickName
					if (nickName) {
						AV.Query.doCloudQuery('insert into plan(title, start, neckname) values("' + title + '", "' + start + '","' + nickName + '")').then(function(data) {
							// data 中的 results 是本次查询返回的结果，AV.Object 实例列表
							var results = data.results;
							if (results.length > 0) {
								wx.showToast({
									title: '创建成功',
									icon: 'success',
									duration: 1000
								})
							} else {
								wx.showToast({
									title: '创建失败',
									icon: 'clear',
									duration: 1000
								})
							}
						}, function(error) {
							console.log(error);
						});
					}
				}
			})
		} else {
			wx.showToast({
				title: '题目不能为空',
				icon: 'clear',
				duration: 1000
			})
		}



	}
})
