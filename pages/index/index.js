//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    array: [],
    currentPage: 1,
  },
  onPrevButtonClicked: function(e) {
    this.data.currentPage--;
    if(this.data.currentPage <= 0) {
      this.data.currentPage = 0;
    }
    this.loadImage();
  },
  onNextButtonClicked: function(e) {
    //this.setData({ isFirstPage: false });
    this.data.currentPage ++;
    this.loadImage();
  },
  jumpToDetail: function(e) {
    let address = e.target.dataset.address;
    wx.navigateTo({
      url: '/pages/detail/detail?url='+address,
    });
  },
  onLoad: function() {
    this.loadImage();
  },
  loadImage: function() {
    let page = this;
    let url = "http://gank.io/api/data/%E7%A6%8F%E5%88%A9/5/" + this.data.currentPage;
    let key = "" + page.data.currentPage;
    // let jsonData = wx.getStorageSync(key);
    wx.getStorage({
      key: key,
      success: function(res) {
        if(res.data) {
          let data = JSON.parse(res.data);
          page.setData({ array: data, currentPage: page.data.currentPage });
        }
      },
      fail: function() {
        wx.showToast({
          title: '加载中',
          icon: 'loading'
        });
        wx.request({
          url: url,
          success: function (data) {
            console.log(data.data.results);
            let jsonData = JSON.stringify(data.data.results);
            // wx.setStorageSync(key, jsonData);
            wx.setStorage({
              key: key,
              data: jsonData,
            });
            page.setData({ array: data.data.results, currentPage: page.data.currentPage })
            wx.hideToast();
          }
        })
      }
    })
  }
})
