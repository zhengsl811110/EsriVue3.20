/**
 * Created by zhengsl on 2017/4/13.
 */
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'assets',
    paths: {
        jquery: 'js/jquery.min',
        server: 'js/server',
        pace: 'plugins/pace/pace.min',
        main: "js/index.main",
        common: 'js/common',
        vue: 'js/vue',
        vFrameW: 'components/vFrameW'
    }
});

requirejs(['jquery', 'main', 'server', 'pace', 'common'],
    function ($, Main, Server, Pace) {
        window.$ = $;
        Pace.start({
            document: true
        });
        Main.init();
        Server.getAjax({
            url: 'http://192.168.42.75/jsDataCenter/m.ashx?x=login&appid=qzcyy',
            data: {xUserName: 'zhengsl', xPassword: '123@abcd'}
        }).done(function (res) {
            sessionStorage.setItem('map.mainConfig', JSON.stringify(res.data));
            var mapType = getParamValue('mapType');
            if (mapType == null) {
                $('#main').attr('src', 'mapw/map.html');
            }
            else {
                $('#main').attr('src', 'mapw/map.html?mapType=' + mapType);
            }
        });
    });