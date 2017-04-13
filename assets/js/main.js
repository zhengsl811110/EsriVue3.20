/**
 * Created by zhengsl on 2017/3/21.
 */
window.onload= function () {
    require([
        'gRegisterPubM',
        'jquery',
        'server'
    ], function (gRegisterPub, $, Server) {
        window.$ = $;
        gRegisterPub.initWidgets().initMapApi().initJsApi();
        //初始化登入查询
        Server.getAjax({
            url: 'http://192.168.42.75/jsDataCenter/m.ashx?x=login&appid=qzcyy',
            data: {xUserName: 'zhengsl', xPassword: '123@abcd'}
        }).done(function (res) {
            window.OneMap.modules = res.data.modules;
            window.OneMap.services = res.data.services;
            pubSub.publish('mapView');
        });
    });
};