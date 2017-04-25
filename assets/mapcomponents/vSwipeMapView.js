/**
 * Created by zhengsl on 2017/4/12.
 */
define(['js/vue', 'js/server', 'api/gTokenM', 'mapcomponents/vMapView', 'mapcomponents/vLayerManager'], function (Vue, Server, gTokenM) {
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
                    visibleR: false,
                    width: $(window).width() + 'px'
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
                template: '<div class="map v-swipeMapView"><div class="shade"><v-mapview :style="{width:width}" class="unSelect map-left" :id="idL" :spatialReference="spatialReference"  :extent="extent" @initComplete="initCompleteL"></v-mapview></div>' +
                '<v-mapview class="unSelect map-right" :id="idR" :spatialReference="spatialReference"  :extent="extent" @initComplete="initCompleteR"></v-mapview>' +
                '<div class="swipeCircle" id="MMouse"></div>' +
                '<ul class="esri-widget v-baseMap my-top-left" ><li :class="{layerActive:visibleL}" @click="showLeftLayer" style="margin-left: 0" ><a><span class="icon layerView"></span>图层</a></li></ul>' +
                '<ul class="esri-widget v-baseMap my-top-right"><li :class="{layerActive:visibleR}" @click="showRightLayer"><a><span class="icon layerView"></span>图层</a></li></ul></div>',
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