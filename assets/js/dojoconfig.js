/**
 * Created by zhengsl on 2017/4/18.
 */
/*函数注册到dojo中，以便程序能够通过require方法进行按需调用*/
window.dojoConfig = {
    packages: [
        {
            name: "common",
            location: getRelUrl() + "/assets/js",
            main: "common"
        },
        {
            name: "gRegisterPubM",
            location: getRelUrl() + "/assets/api",
            main: "gRegisterPubM"
        },
        {
            name: "jquery",
            location: getRelUrl() + "/assets/js",
            main: "jquery.min"
        },
        {
            name: "vue",
            location: getRelUrl() + "/assets/js",
            main: "vue"
        },
        {
            name: "server",
            location: getRelUrl() + "/assets/js",
            main: "server"
        },
        {
            name: "vMapView",
            location: getRelUrl() + "/assets/mapcomponents",
            main: "vMapView"
        },
        {
            name: "vBaseMap",
            location: getRelUrl() + "/assets/mapcomponents",
            main: "vBaseMap"
        },
        {
            name: "vToolsBar",
            location: getRelUrl() + "/assets/mapcomponents",
            main: "vToolsBar"
        },
        {
            name: "vLayerManager",
            location: getRelUrl() + "/assets/mapcomponents",
            main: "vLayerManager"
        },
        {
            name: "vResultView",
            location: getRelUrl() + "/assets/mapcomponents",
            main: "vResultView"
        },
        {
            name: "vQuickSearchView",
            location: getRelUrl() + "/assets/mapcomponents",
            main: "vQuickSearchView"
        },
        {
            name: "vLegendView",
            location: getRelUrl() + "/assets/mapcomponents",
            main: "vLegendView"
        },
        {
            name: "vSwipeMapView",
            location: getRelUrl() + "/assets/mapcomponents",
            main: "vSwipeMapView"
        },
        {
            name: "vCmpMapView",
            location: getRelUrl() + "/assets/mapcomponents",
            main: "vCmpMapView"
        },
        {
            name: "vRightPanelView",
            location: getRelUrl() + "/assets/components",
            main: "vRightPanelView"
        },
        {
            name: "gTokenM",
            location: getRelUrl() + "/assets/api",
            main: "gTokenM"
        },
        {
            name: "gLayerM",
            location: getRelUrl() + "/assets/api",
            main: "gLayerM"
        },
        {
            name: "gToolsM",
            location: getRelUrl() + "/assets/api",
            main: "gToolsM"
        },
        {
            name: "gMeasureM",
            location: getRelUrl() + "/assets/api",
            main: "gMeasureM"
        },
        {
            name: "MeasureTools",
            location: getRelUrl() + "/assets/api",
            main: "MeasureTools"
        },
        {
            name: "gIQueryM",
            location: getRelUrl() + "/assets/api",
            main: "gIQueryM"
        },
        {
            name: "gPopupM",
            location: getRelUrl() + "/assets/api",
            main: "gPopupM"
        },
        {
            name: "gSymbolM",
            location: getRelUrl() + "/assets/api",
            main: "gSymbolM"
        },
        {
            name: "gWKTToGeometry",
            location: getRelUrl() + "/assets/api",
            main: "gWKTToGeometry"
        },
        {
            name: "laypage",
            location: getRelUrl() + "/assets/js/laypage",
            main: "laypage"
        }
    ]
};

/*URL地址过滤*/
function getRelUrl() {
    var relUrl = '';
    var url = document.location.toString();
    if (url.indexOf('?') != -1) {
        relUrl = url.split('?')[0];
    } else {
        relUrl = url;
    }
    var pos = relUrl.lastIndexOf('mapw/');
    relUrl = relUrl.substr(0, pos);
    return relUrl.replace();
}
