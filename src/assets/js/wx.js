export default {

  wxShowMenu: function (that,sign='') {

    let url = window.location.href.split('#')[0]

    that.$http.post('/xxx',  //请求你们公司后台的接口 获取相关的配置

      that.$getSingQuery({

        appKey: 'xxx',

        url

      }))

      .then(res => {

        var getMsg = res.data.data;

        // console.log('微信配置----------')

        // console.log(res.data)

        wx.config({

          debug: false,  //生产环境需要关闭debug模式  测试环境下可以设置为true  可以在开发者工具中查看问题

          appId: getMsg.appid, //appId通过微信服务号后台查看

          timestamp: getMsg.timestamp, //生成签名的时间戳

          nonceStr: getMsg.noncestr, //生成签名的随机字符串

          signature: getMsg.sign, //签名

          jsApiList: [ //需要调用的JS接口列表

            'updateAppMessageShareData', //自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0） 新接口

            'updateTimelineShareData', //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0） 老接口

            'onMenuShareTimeline', //分享到朋友圈 老接口

            'onMenuShareAppMessage',//分享给盆友 老接口

            'getLocation'  //获取定位

          ]

        });

        wx.error(function (res) {

          // alert(JSON.stringify(res))

          console.log(res)

          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

        });

        wx.ready(function () {

          if(sign=='location'){ //由于 获取定位往往是页面一加载 就提示获取地理位置 所以可以直接在写在 wx.ready

            wx.getLocation({

              type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'

              success: function (res) {

                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90

                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。

                var speed = res.speed; // 速度，以米/每秒计

                var accuracy = res.accuracy; // 位置精度

                that.latitude=res.latitude;

                that.longitude=res.longitude;

                that.geocodeRegeo()//逆地理编码  调用你vue实例里的方法

                do something...

              }

            });

          }

        });

      })

      .catch(error => {

        alert(error)

        console.log(error)

      })

  }

}
