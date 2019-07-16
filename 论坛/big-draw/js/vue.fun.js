$(function () {    
    //Vue封装同步GET
    Vue.prototype.Get = function (url, param) {
        var resultData = null;
        $.ajax({
            url:url,
            methods: "GET",
            data: param,
            //async: false,
            success: function (result) {
                resultData = result
            }
        });
        return resultData;
    }
    //Vue封装同步POST
    Vue.prototype.Post = function (url, param) {
        var resultData = null;
        $.ajax({
            url: url,
            methods: "POST",
            data: param,
            //async: false,
            success: function (result) {
                resultData = result
            }
        });
        return resultData;
    }
    //Vue获取同城
    Vue.prototype.GetCity = function (cityCode, param) {
        var city = null;
        $.ajax({
            url: '/enter/getcity-' + cityCode,
            methods: "GET",
            data: param,
            async: false,
            success: function (result) {
                if (result.code == 1) {
                    console.log("city", result.data);
                    city = result.data;
                }
            }
        });
        return city;
    }
    //链接调转
    Vue.prototype.ToHref = function (url) {
        if (!Vue.prototype.IsNullOrSpace(url)) {
            location.href = url;
        }                
    }
    //String判断空值
    Vue.prototype.IsNullOrSpace = function (str) {
        if (str == '' || str == null || str.toString().indexOf('null') > -1) {
            return true;
        } else {
            return false;
        }
    }
    //微信预览图片集合
    Vue.prototype.wxShowAllImg=function (imgs,attr,url) {
        var thisVue = this;
        var imglist = new Array();
        if (imgs.length > 0) {
            for (var i = 0; i < imgs.length; i++) {
                if (Vue.prototype.IsNullOrSpace(attr)) {
                    imglist.push(imgs[i]);
                } else {
                    imglist.push(imgs[i][attr]);
                }
            }                     
            wx.previewImage({
                current: url,
                urls: imglist
            });
        }                   
    }
    //数组是否包含元素
    Vue.prototype.ArrayHaving = function (array, item, attr) {
        for (var i = 0; i < array.length; i++) {
            if (Vue.prototype.IsNullOrSpace(attr)) {
                if (array[i] == item)
                    return true;
            } else {
                if (array[i][attr] == item)
                    return true;
            }                   
        }
        return false;
    }
    //裁剪图片
    Vue.prototype.CutImg = function (imgurl, oldhost, newhost, cutSize) {
        if (imgurl!=undefined) {
            if (imgurl.toString().indexOf(oldhost) > -1 && imgurl.toString().indexOf('!') == -1) {
                return imgurl.replace(oldhost, newhost) + "!" + cutSize;
            } else {
                if (imgurl.toString().indexOf(newhost) > -1 && imgurl.toString().indexOf('!') == -1) {
                    return imgurl + "!" + cutSize;
                } else if (imgurl.toString().indexOf('!') > -1) {
                    return imgurl.toString().split("!")[0] + "!" + cutSize;
                } else {
                    return imgurl;
                }
            }
        }      
    }
})