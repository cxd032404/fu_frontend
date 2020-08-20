getWxConfig() {
           let self = this;
           let fullUrl = encodeURIComponent(location.href.split("#")[0]);
           self.url = self.$HOST + '/common/wechat_js';
           self.$axios.get(self.url, {
               params: {
                   apis: ['onMenuShareAppMessage', 'onMenuShareTimeline'],
                   fullUrl: fullUrl
               }
           }).then((res) => {
               console.log(res);
               // console.log(self.baseInfo);
               goodsId: self.goodsId
               let data = JSON.parse(res.data.data);
               wx.config({
                   debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                   appId: data.appId, // 必填，公众号的唯一标识
                   timestamp: data.timestamp, // 必填，生成签名的时间戳
                   nonceStr: data.nonceStr, // 必填，生成签名的随机串
                   signature: data.signature, // 必填，签名
                   jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表
               });
           })
           wx.ready(function() {
               wx.onMenuShareAppMessage({
                   title: self.shareData.name, // 分享标题
                   desc: self.shareData.descrip,
                   link: self.shareData.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                   imgUrl: self.shareData.imgUrl, // 分享图标
                   success: function() {
                       self.$toast.success('分享成功');
                   }
               })
               wx.onMenuShareTimeline({
                   title: self.shareData.name, // 分享标题
                   link: self.shareData.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                   imgUrl: self.shareData.imgUrl, // 分享图标
                   success: function() {
                       self.$toast.success('分享成功');
                   }
               })
           })
       }
