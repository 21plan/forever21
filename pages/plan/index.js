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
		disabled: true
	},
	onLoad() {
		console.log(666)
	},
	bindDateChange: function(e) {
		this.setData({
			date: e.detail.value
		})
	},
	save() {
		console.log(666)
	}
})
