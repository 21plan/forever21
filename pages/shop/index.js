Page({
	data: {

	},
	onLoad() {
		console.log(666)
	},
	pay() {
		wx.scanCode({
			success: (res) => {
				console.log(res)
			}
		})
	}
})
