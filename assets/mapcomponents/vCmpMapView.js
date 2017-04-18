/**
 * Created by zhengsl on 2017/4/12.
 */
define(['vue', 'server', 'gTokenM', 'vMapView', 'vLayerManager'], function (Vue, Server, gTokenM) {
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
                    layerL: null,
                    layerR: null,
                    layerViewL: null,
                    layerViewR: null,
                    visibleL: false,
                    visibleR: false
                },
                mounted: function () {
                    var _this = this;
                    _this.mouseEvent();
                    //获取图层数据
                    Server.getAjax({url: window.OneMap.services.findByName('swipeLayerServiceKey').serviceUrl}).done(function (res) {
                        _this.layerL = res.data.left.layers;
                        _this.layerR = res.data.right.layers;
                    });
                },
                template: '<div class="map v-cmpMapView"><v-mapview  class="map-left" :id="idL" :spatialReference="spatialReference"  :extent="extent" @initComplete="initCompleteL"></v-mapview>' +
                '<v-mapview class="map-right" :id="idR" :spatialReference="spatialReference"  :extent="extent" @initComplete="initCompleteR"></v-mapview>' +
                '<div class="swipeCircle" id="MMouse"></div>' +
                '<ul class="esri-widget v-baseMap my-top-left" ><li :class="{layerActive:visibleL}" @click="showLeftLayer" style="margin-left: 0" ><a><span class="icon layerView"></span>图层</a></li></ul>' +
                '<ul class="esri-widget v-baseMap my-top-right"><li :class="{layerActive:visibleR}" @click="showRightLayer"><a><span class="icon layerView"></span>图层</a></li></ul></div>',
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
                    },
                    showLeftLayer: function () {
                        if (this.layerViewL != null) {
                            this.layerViewL.visible = !this.layerViewL.visible;
                            this.visibleL = !this.visibleL;
                            return false;
                        }
                        this.visibleL = true;
                        this.layerViewL = this.initLayerTree(this.mapL, this.layerL, 'my-top-left');
                    },
                    showRightLayer: function () {
                        if (this.layerViewR != null) {
                            this.layerViewR.visible = !this.layerViewR.visible;
                            this.visibleR = !this.visibleR;
                            return false;
                        }
                        this.visibleR = true;
                        this.layerViewR = this.initLayerTree(this.mapR, this.layerR, 'my-top-right');
                    },
                    initLayerTree: function (map, layer, className) {
                        domConstruct.create('div').id('layerManagerW').addToBody();
                        return new Vue({
                            el: '#layerManagerW',
                            data: {
                                map: map,
                                layerList: layer,
                                visible: true,
                                className: className
                            },
                            template: '<v-layermanager v-show="visible" class="v-layerView" :map="map" :class="className" :layerList="layerList"></v-layermanager>'
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