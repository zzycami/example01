// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ""
  },
  onLoad: function (option) {
    this.setData({url: option.url});
  }
})