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
                    mapR: null
                },
                mounted: function () {
                    this.mouseEvent();
                },
                template: '<div class="map v-cmpMapView"><v-mapview  class="map-left" :id="idL" :spatialReference="spatialReference"  :extent="extent" @initComplete="initCompleteL"></v-mapview>' +
                '<v-mapview class="map-right" :id="idR" :spatialReference="spatialReference"  :extent="extent" @initComplete="initCompleteR"></v-mapview>' +
                '<div class="swipeCircle" id="MMouse"></div></div>',
                methods: {
                    mouseEvent: function () {
                        var a = $("#mapL");
                        var boxX = a.offset().left;
                        var b = $("#mapR");
                        var boxX2 = b.offset().left;
                        a.hover(function (e) {
                            $(document).mousemove(function (e) {
                                var x = e.pageX;
                                var y = e.pageY;
                                var zX = x - boxX;
                                $('#MMouse').css('display', 'block').css('left', zX + window.innerWidth / 2 - 22).css('top', y - 22);
                            });
                            $(document).mousedown(function (e) {
                                $('#MMouse').css('background', 'rgba(255, 0, 0, 0.9)');
                            });
                            $(document).mouseup(function (e) {
                                $('#MMouse').css('background', 'rgba(255, 0, 0, 0.2)');
                            });

                        }, function () {
                            $('#MMouse').css('display', 'none');
                        });

                        b.hover(function (e) {
                            $(document).mousemove(function (e) {
                                var x = e.pageX;
                                var y = e.pageY;
                                var zX = x - boxX2;
                                $('#MMouse').css('display', 'block').css('left', zX - 22).css('top', y - 22);
                            });
                            $(document).mousedown(function (e) {
                                $('#MMouse').css('background', 'rgba(255, 0, 0, 0.9)');
                            });
                            $(document).mouseup(function (e) {
                                $('#MMouse').css('background', 'rgba(255, 0, 0, 0.2)');
                            });
                        }, function () {
                            $('#MMouse').css('display', 'none');
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