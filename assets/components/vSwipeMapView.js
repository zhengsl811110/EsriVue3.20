/**
 * Created by zhengsl on 2017/4/12.
 */
define(['vue', 'server', 'gTokenM', 'vMapView'], function (Vue, Server, gTokenM) {
    function init() {
        //add mapW node
        domConstruct.create('div').id('mapW').addToBody();
        //render map node
        Server.getAjax({url: window.OneMap.modules.findByName('mapView').serviceUrl}).done(function (res) {
            gTokenM.setTokens(res.data.token);
            new Vue({
                el: '#mapW',
                data: {
                    idL: 'mapL',
                    idR: 'mapR',
                    spatialReference: res.data.spatialReference,
                    baseMap: res.data.baseMap,
                    extent: res.data.defaultMapExtent,
                    mapL: null,
                    mapR: null,
                    width: $(window).width() + 'px'
                },
                mounted: function () {
                    this.mouseEvent();
                },
                template: '<div class="map v-swipeMapView"><div class="shade"><v-mapview :style="{width:width}" class="unSelect map-left" :id="idL" :spatialReference="spatialReference"  :extent="extent" @initComplete="initCompleteL"></v-mapview></div>' +
                '<v-mapview class="unSelect map-right" :id="idR" :spatialReference="spatialReference"  :extent="extent" @initComplete="initCompleteR"></v-mapview>' +
                '<div class="swipeCircle" id="MMouse"></div></div>',
                methods: {
                    mouseEvent: function () {
                        var winW = $(window).width();
                        var winH = $(window).height();
                        var DivM = $("#MMouse");
                        var isMouseDown = false;
                        DivM.mousedown(function (e) {
                            isMouseDown = true;
                            DivM.css('background', 'rgba(0, 0, 0, 0.6)');
                            $(document).unbind('mousemove').bind('mousemove', function (e) {
                                if (isMouseDown) {
                                    var x = e.pageX;
                                    DivM.css('left', x - 22);
                                    $('.shade').css("width", x + 1);
                                }
                            });
                        });
                        $(document).mouseup(function () {
                            isMouseDown = false;
                            DivM.css('background', 'rgba(0, 0, 0, 0.2)');
                        });
                    },
                    initCompleteL: function (map) {
                        var _this = this;
                        pubSub.publish('layerM.baseMapLayerM', {map: map, layer: _this.baseMap[0]});
                        _this.mapL = map;
                        map.on('load', function () {
                            dojo.connect(map, "onMouseUp", function () {
                                _this.mapR.centerAndZoom(map.extent.getCenter(), map.getZoom());
                            });
                            dojo.connect(map, "onZoomEnd", function (extent, zoomFactor, anchor, level) {
                                _this.mapR.centerAndZoom(map.extent.getCenter(), level);
                            });
                        });
                    },
                    initCompleteR: function (map) {
                        var _this = this;
                        pubSub.publish('layerM.baseMapLayerM', {map: map, layer: _this.baseMap[0]});
                        _this.mapR = map;
                        map.on('load', function () {
                            dojo.connect(map, "onMouseUp", function () {
                                _this.mapL.centerAndZoom(map.extent.getCenter(), map.getZoom());
                            });
                            dojo.connect(map, "onZoomEnd", function (extent, zoomFactor, anchor, level) {
                                _this.mapL.centerAndZoom(map.extent.getCenter(), level);
                            });
                        });
                    }

                }
            });
        });
    }

    return {
        init: init
    }
});