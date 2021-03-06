/**
 * Created by zhengsl on 2017/3/28.
 */
define(function () {
    function openFullScreen() {
        var el = document.documentElement;
        var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;//定义不同浏览器的全屏API
        //执行全屏
        if (typeof rfs != "undefined" && rfs) {
            rfs.call(el);
        }
        else if (typeof window.ActiveXObject != "undefined") {
            var wScript = new ActiveXObject("WScript.Shell");
            if (wScript != null) {
                wScript.SendKeys("{F11}");
            }
        }
    }

    function closeFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }

    return {
        mapScreen: function (map) {
            map.setExtent(window.extent);
        },
        fullScreen: function (map) {
            if (document.fullscreenElement ||
                document.msFullscreenElement ||
                document.mozFullScreenElement ||
                document.webkitFullscreenElement || false) {
                closeFullScreen();
            }
            else
                openFullScreen();
        },
        zoomIn: function (map) {
            var maxZoom = map.getMaxZoom(), zoom = map.getZoom();
            if (zoom < maxZoom) {
                map.setZoom(zoom + 1);
            }
        },
        zoomOut: function (map) {
            var minZoom = map.getMinZoom(), zoom = map.getZoom();
            if (zoom > minZoom) {
                map.setZoom(zoom - 1);
            }
        },
        measureLength: function (map) {
            require(['api/gMeasureM'], function (gMeasureM) {
                gMeasureM.distance(map);
            });
        },
        measureArea: function (map) {
            require(['api/gMeasureM'], function (gMeasureM) {
                gMeasureM.area(map);
            });
        },
        iQueryTool: function (map) {
            require(['api/gIQueryM'], function (gIQueryM) {
                gIQueryM.start(map);
            });
        },
        swipeMap: function (map) {
            parent.pubSub.publish('showSecondFrame', {src: 'mapw/map.html?mapType=swipe', label: '图层拉框对比'})
        },
        cmpMap: function (map) {
            parent.pubSub.publish('showSecondFrame', {src: 'mapw/map.html?mapType=cmp', label: '图层双窗口对比'})
        },
        clear: function (map) {
            map.setMapCursor('default');
            map.graphics.clear();
            map.infoWindow.hide();
            require(['api/gIQueryM'], function (gIQueryM) {
                gIQueryM.close(map);
            });
            if (window.resultView)
                window.resultView.visible = false;//查询结果面板
            //清空热力图
            var heatMapLayer = map.getLayer('heatMapLayer') || null;
            if (heatMapLayer != null)
                heatMapLayer.setData([]);
        }
    };
});