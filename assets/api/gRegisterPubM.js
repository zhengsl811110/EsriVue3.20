/**
 * Created by zhengsl on 2017/3/24.
 */
define(function () {
    function initWidgets() {
        pubSub.subscribe('mapView', function () {
            require(['vue', 'server', 'gTokenM', 'vMapView'], function (Vue, Server, gTokenM) {
                //add mapW node
                domConstruct.create('div').id('mapW').addToBody();
                //render map node
                Server.getAjax({url: window.OneMap.modules.findByName('mapView').serviceUrl}).done(function (res) {
                    gTokenM.setTokens(res.data.token);
                    new Vue({
                        el: '#mapW',
                        data: {
                            id: 'map',
                            spatialReference: res.data.spatialReference,
                            baseMap: res.data.baseMap,
                            extent: res.data.defaultMapExtent
                        },
                        template: '<v-mapview :id="id" :spatialReference="spatialReference"  :extent="extent" @initComplete="initComplete"></v-mapview>',
                        methods: {
                            initComplete: function (map) {
                                pubSub.publish('baseMapBarsView', {map: map, config: this.baseMap});

                                //window.OneMap.modules.forEach(function (m) {
                                //    pubSub.publish(m.name + 'View', {map: map});
                                //});
                                pubSub.publish('toolsBarView', {map: map});
                                pubSub.publish('quickSearchView', {map: map});
                                map.on('load', function () {
                                    //window.OneMap.modules.forEach(function (m) {
                                    //    pubSub.publish(m.name + 'View', {map: map});
                                    //});
                                    //pubSub.publish('toolsBarView', {map: map});
                                    //pubSub.publish('quickSearchView', {map: map});
                                    pubSub.publish('map.onLoad', {map: map});
                                });
                            }
                        }
                    });
                });
            });
        });
        pubSub.subscribe('mapView3D', function () {
            require(['vue', 'server', 'gTokenM', 'vMapView'], function (Vue, Server, gTokenM) {
                //add mapW node
                domConstruct.create('div').id('mapW').addToBody();
                //render map node
                Server.getAjax({url: window.OneMap.modules.findByName('mapView3D').serviceUrl}).done(function (res) {
                    gTokenM.setTokens(res.data.token);
                    new Vue({
                        el: '#mapW',
                        data: {
                            id: 'map',
                            spatialReference: res.data.spatialReference,
                            baseMap: res.data.baseMap,
                            extent: res.data.defaultMapExtent
                        },
                        template: '<v-mapview :id="id" :spatialReference="spatialReference"  :extent="extent" @initComplete="initComplete"></v-mapview>',
                        methods: {
                            initComplete: function (map) {
                                pubSub.publish('baseMapBarsView', {map: map, config: this.baseMap});

                                //window.OneMap.modules.forEach(function (m) {
                                //    pubSub.publish(m.name + 'View', {map: map});
                                //});
                                pubSub.publish('toolsBarView', {map: map});
                                pubSub.publish('quickSearchView', {map: map});
                                map.on('load', function () {
                                    //window.OneMap.modules.forEach(function (m) {
                                    //    pubSub.publish(m.name + 'View', {map: map});
                                    //});
                                    //pubSub.publish('toolsBarView', {map: map});
                                    //pubSub.publish('quickSearchView', {map: map});
                                    pubSub.publish('map.onLoad', {map: map});
                                });
                            }
                        }
                    });
                });
            });
        });
        pubSub.subscribe('swipeMapView', function () {
            require(['vSwipeMapView'], function (vSwipeMapView) {
                vSwipeMapView.init();
            });
        });
        pubSub.subscribe('cmpMapView', function () {
            require(['vCmpMapView'], function (vCmpMapView) {
                vCmpMapView.init();
            });
        });
        pubSub.subscribe('baseMapBarsView', function (args) {
            var map = args.map, config = args.config || [];
            require(['vue', 'vBaseMap'], function (Vue) {
                //add mapW node
                domConstruct.create('div').id('baseMapW').addToBody();
                //render map node
                var baseMapW = new Vue({
                    el: '#baseMapW',
                    data: {
                        map: map,
                        baseMapList: config
                    },
                    mounted: function () {
                        if (window.OneMap.modules.findByName('mapLayer') instanceof Object) {
                            this.baseMapList.push({
                                id: 'layerView',
                                name: 'layerView',
                                label: '图层',
                                icon: 'esri-icon-layers'
                            });
                        }
                    },
                    template: '<v-basemap :map="map" class="my-top-right" :baseMapList="baseMapList"></v-basemap>'
                });
                //view.ui.add(baseMapW.$el, "top-right");
            });
        });
        pubSub.subscribe('toolsBarView', function (args) {
            var map = args.map, config = args.config || null;
            require(['vue', 'server', 'vToolsBar'], function (Vue, Server) {
                //add mapW node
                domConstruct.create('div').id('toolsBarW').addToBody();
                Server.getAjax({url: window.OneMap.modules.findByName('toolsBar').serviceUrl}).done(function (res) {
                    //render map node
                    var toolsBarW = new Vue({
                        el: '#toolsBarW',
                        data: {
                            map: map,
                            toolsBarList: res.data.toolBar || []
                        },
                        template: '<v-toolsbar :map="map" class="my-top-left" :toolsBarList="toolsBarList"></v-toolsbar>'
                    });
                    //view.ui.add(toolsBarW.$el, "top-left");
                });
            });
        });
        pubSub.subscribe('layerMangerView', function (args) {
            var map = args.map, config = args.config || null;
            if (window.layerManagerW != null) {
                window.layerManagerW.visible = !window.layerManagerW.visible;
                return false;
            }
            require(['vue', 'server', 'vLayerManager'], function (Vue, Server) {
                domConstruct.create('div').id('layerManagerW').addToBody();
                Server.getAjax({url: window.OneMap.modules.findByName('mapLayer').serviceUrl}).done(function (res) {
                    //render map node
                    window.layerManagerW = layerManagerW = new Vue({
                        el: '#layerManagerW',
                        data: {
                            map: map,
                            layerList: res.data.mapLayers || [],
                            visible: true
                        },
                        template: '<v-layermanager v-show="visible" class="my-top-right v-layerView" :map="map" :layerList="layerList"></v-layermanager>'
                    });
                    //view.ui.add(layerManagerW.$el, "top-right");
                });
            });
        });
        pubSub.subscribe('legendView', function (args) {
            //var url = args.url;
            //if (window.legendView != null) {
            //    window.legendView.url = url;
            //    return false;
            //}
            //require(['vue', 'vLegendView'], function (Vue) {
            //    domConstruct.create('div').id('legendView').addToBody();
            //    window.legendView = new Vue({
            //        el: '#legendView',
            //        data: {
            //            url: url,
            //            visible: false
            //        },
            //        template: '<v-legendview class="my-left-bottom"  :url="url"></v-quicksearchview>'
            //    });
            //});
        });
        pubSub.subscribe('quickSearchView', function (args) {
            var map = args.map;
            require(['vue', 'server', 'vQuickSearchView'], function (Vue, Server) {
                domConstruct.create('div').id('quickSearchW').addToBody();
                Server.getAjax({url: window.OneMap.modules.findByName('quickSearch').serviceUrl}).done(function (res) {
                    new Vue({
                        el: '#quickSearchW',
                        data: {
                            map: map,
                            list: res.data || []
                        },
                        template: '<v-quicksearchview class="my-top-left" :map="map" :list="list"></v-quicksearchview>'
                    });
                    //view.ui.add(layerManagerW.$el, "top-right");
                });
            });
        });
        pubSub.subscribe('resultView', function (args) {
            var map = args.map,
                res = args.res || [],
                page = args.page || false,
                quickSearchStatus = window.OneMap.modules.findByName("quickSearch") != null;
            if (!window.resultView) {
                domConstruct.create('div').id('resultView').addToBody();
                require(['vue', 'vResultView'], function (Vue) {
                    window.resultView = new Vue({
                        el: '#resultView',
                        data: {
                            map: map,
                            allList: res,
                            visible: true,
                            quickSearchStatus: quickSearchStatus//是否有快速查询模块
                        },
                        template: '<v-resultview v-show="visible" @close="close"  class="my-top-left" :map="map" :allList="allList" :quickSearchStatus="quickSearchStatus"></v-resultview>',
                        methods: {
                            close: function () {
                                this.visible = false;
                                pubSub.publish("map.clear", {map: map});
                            }
                        }
                    });
                });
            }
            else {
                window.resultView.allList = res;
                if (window.resultView.visible == false)window.resultView.visible = true;
            }
        });
        pubSub.subscribe('rightPanelView', function (args) {
            var map = args.map,
                e = args.e,
                layer = args.layer || {};
            var x = (e.clientX - 14) + 'px', y = (e.clientY + 4) + 'px';
            if (!window.rightPanelView) {
                domConstruct.create('div').id('rightPanelView').addToBody();
                require(['vue', 'vRightPanelView'], function (Vue) {
                    window.rightPanelView = new Vue({
                        el: '#rightPanelView',
                        data: {
                            map: map,
                            layer: layer,
                            x: x,
                            y: y,
                            visible: true
                        },
                        template: '<v-rightpanelview  v-show="visible" @close="close" :map="map" :layer="layer" :x="x" :y="y"></v-rightpanelview>',
                        methods: {
                            close: function () {
                                this.visible = false;
                            }
                        }
                    });
                });
            }
            else {
                window.rightPanelView.layer = layer;
                window.rightPanelView.x = x;
                window.rightPanelView.y = y;
                window.rightPanelView.visible = true;
            }
        });
        return this;
    }

    function initMapApi() {
        pubSub.subscribe('layerM.baseMapLayerM', function (args) {
            var map = args.map, layer = args.layer;
            require(['gLayerM'], function (layerM) {
                layerM.addBaseMap(map, layer);
            });
        });
        pubSub.subscribe('layerM.add', function (args) {
            var map = args.map, layer = args.layer;
            require(['gLayerM'], function (layerM) {
                layerM.addLayer(map, layer);
            });
        });
        pubSub.subscribe('layerM.close', function (args) {
            var map = args.map, layer = args.layer;
            require(['gLayerM'], function (layerM) {
                layerM.closeLayer(map, layer.id);
            });
        });
        pubSub.subscribe('toolsEvent', function (args) {
            var map = args.map, tool = args.tool;
            require(['gToolsM'], function (toolsM) {
                toolsM[tool.toolKey].call(this, map)
            });
        });

        return this;
    }

    function initJsApi() {
        pubSub.subscribe('popup.showInfoPopup', function (args) {
            var map = args.map, mapPoint = args.centerPt, res = args.res, pan = args.pan || false;
            require(['gPopupM'], function (gPopupM) {
                gPopupM.showInfoPopup({
                    map: map,
                    centerPt: mapPoint,
                    res: res,
                    pan: pan
                });
            });
        });
        pubSub.subscribe('draw.markerList', function (args) {
            var map = args.map,
                res = args.res,
                marker = args.marker || false,
                name = args.name || null,
                extent = args.extent || false,
                popup = args.popup || false;
            var pts = [];
            require(['esri/graphic', 'gWKTToGeometry', 'gSymbolM'], function (Graphic, gWKTToGeometry, gSymbolM) {
                res.forEach(function (item, index) {
                    gWKTToGeometry.parse({
                        wkt: item.shape,
                        spatialReference: map.spatialReference
                    }).done(function (geometry) {
                        var pt = geometry.getExtent().getCenter();
                        pts.push(pt);
                        if (marker == true) {
                            gSymbolM.getMarkerSymbol({name: name, w: 22.5, h: 52.5, y: -2}).done(function (symbol) {
                                //创建Graphic 并且添加到地图上
                                var graphic = new Graphic(pt, symbol, {
                                    id: item.key,
                                    attr: item,
                                    centerPt: pt,
                                    marker: true,
                                    popup: popup
                                });
                                map.graphics.add(graphic);
                            });
                        }
                        else {
                            gSymbolM.getMarkerSymbol({name: index + 1}).done(function (symbol) {
                                //创建Graphic 并且添加到地图上
                                var graphic = new Graphic(pt, symbol, {
                                    id: item.key,
                                    attr: item,
                                    centerPt: pt,
                                    marker: true,
                                    popup: popup
                                });
                                map.graphics.add(graphic);
                            });
                        }
                    });
                    if (extent && index == res.length - 1) {
                        require(['esri/graphicsUtils'], function (GraphicsUtils) {
                            setTimeout(function () {
                                var extent = GraphicsUtils.graphicsExtent(map.graphics.graphics).expand(2);
                                map.setExtent(extent);
                            }, 200);
                        });
                    }
                    if (popup && index == res.length - 1) {
                        pubSub.publish('popup.showInfoPopup', {
                            map: map,
                            res: res[0],
                            centerPt: pts[0]
                        });
                    }
                });
            });
        });
        pubSub.subscribe('draw.polygonList', function (args) {
            var map = args.map,
                res = args.res,
                extent = args.extent || false,
                popup = args.popup || false;
            var pts = [];
            require(['esri/graphic', 'gWKTToGeometry', 'gSymbolM'], function (Graphic, gWKTToGeometry, gSymbolM) {
                res.forEach(function (item, index) {
                    gWKTToGeometry.parse({
                        wkt: item.shape,
                        spatialReference: map.spatialReference
                    }).done(function (geometry) {
                        var pt = geometry.getExtent().getCenter();
                        pts.push(pt);
                        gSymbolM.getDefaultSymbol(geometry).done(function (symbol) {
                            //创建Graphic 并且添加到地图上
                            var graphic = new Graphic(geometry, symbol, {
                                id: item.key,
                                attr: item,
                                centerPt: pt,
                                marker: false
                            });
                            map.graphics.add(graphic);
                        });
                    });
                    if (extent && index == res.length - 1) {
                        require(['esri/graphicsUtils'], function (GraphicsUtils) {
                            setTimeout(function () {
                                var extent = GraphicsUtils.graphicsExtent(map.graphics.graphics).expand(2);
                                map.setExtent(extent);
                            }, 200);
                        });
                    }
                    if (popup && index == res.length - 1) {
                        pubSub.publish('popup.showInfoPopup', {
                            map: map,
                            res: res[0],
                            centerPt: pts[0]
                        });
                    }
                });
            });
        });
        pubSub.subscribe('map.clear', function (args) {
            var map = args.map;
            require(['gToolsM'], function (gToolsM) {
                gToolsM.clear(map);
            });
        });
        pubSub.subscribe('map.onLoad', function (args) {
            var map = args.map;
            map.graphics.on('click', function (evt) {
                var attributes = evt.graphic.attributes;
                if (attributes.popup == true) {
                    pubSub.publish('popup.showInfoPopup', {
                        map: map,
                        centerPt: attributes.centerPt,
                        res: attributes.attr
                    });
                }
            });
        });
        return this;
    }

    return {
        initWidgets: initWidgets,
        initMapApi: initMapApi,
        initJsApi: initJsApi
    };
});