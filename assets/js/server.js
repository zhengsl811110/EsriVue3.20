/**
 * Created by zhengsl on 2017/3/28.
 */
define(function () {
    return {
        getAjax: function (opt) {
            var defer = $.Deferred();
            if (opt.url.indexOf('@IP') > -1 && window.OneMap.hostIp)
                opt.url = opt.url.replace('@IP', window.OneMap.hostIp);
            $.getJSON(encodeURI(opt.url) + '&r=' + Math.random(), opt.data || {}, function (res) {
                //错误反馈
                if (parseInt(res.status) === 1) {
                    defer.resolve(res);
                }
                else {
                    defer.reject(res);
                }
            });
            return defer;
        },
        postAjax: function (opt) {
            var defer = $.Deferred();
            if (opt.url.indexOf('@IP') > -1 && window.OneMap.hostIp)
                opt.url = opt.url.replace('@IP', window.OneMap.hostIp);
            $.post(encodeURI(opt.url) + '&r=' + Math.random(), opt.data || {}, function (res) {
                if (res instanceof String)
                    res = JSON.parse(res);
                if (parseInt(res.status) === 1) {
                    defer.resolve(res);
                }
                else {
                    defer.reject(res.message);
                }
            });
            return defer;
        }
    };
});