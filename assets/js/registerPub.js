/**
 * Created by zhengsl on 2017/3/24.
 */
define(function () {
    function initWidgets() {
        pubSub.subscribe('mapView', function () {
            var mapView = window.OneMap.modules.findByName('mapView');
            if (mapView == null) {
                alert('请配置mapView模块');
                return false;
            }
            require(['js/vue', 'js/server', 'api/gTokenM', 'mapcomponents/vMapView'], function (Vue, Server, gTokenM) {
                //add mapW node
                domConstruct.create('div').id('mapW').addToBody();
                //render map node
                Server.getAjax({url: mapView.serviceUrl}).done(function (res) {
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
                                window.OneMap.map = map;
                                //根据配置文件进行模块化加载
                                pubSub.publish('baseMapBarsView', {map: map, config: this.baseMap});//地图显示依赖baseMapBars，不做权限控制
                                var widgets = ['toolsBar', 'quickSearch', 'copyRight'];
                                widgets.forEach(function (w) {
                                    var module = window.OneMap.modules.findByName(w);
                                    if (module != null)
                                        pubSub.publish(w + 'View', {map: map, config: module});
                                });
                                map.on('load', function () {
                                    pubSub.publish('map.onLoad', {map: map});
                                });
                            }
                        }
                    });
                });
            });
        });//2D地图视图
        pubSub.subscribe('mapView3D', function () {
            require(['js/vue', 'js/server', 'js/gTokenM', 'mapcomponents/vMapView'], function (Vue, Server, gTokenM) {
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
                                window.OneMap.map = map;
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
        });//3D地图视图
        pubSub.subscribe('swipeMapView', function () {
            require(['mapcomponents/vSwipeMapView'], function (vSwipeMapView) {
                vSwipeMapView.init();
            });
        });//拉框对比
        pubSub.subscribe('cmpMapView', function () {
            require(['mapcomponents/vCmpMapView'], function (vCmpMapView) {
                vCmpMapView.init();
            });
        });//双窗口对比
        pubSub.subscribe('baseMapBarsView', function (args) {
            var map = args.map, config = args.config || [];
            require(['js/vue', 'mapcomponents/vBaseMap'], function (Vue) {
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
        });//地图baseMap
        pubSub.subscribe('toolsBarView', function (args) {
            var map = args.map, config = args.config || null;
            require(['js/vue', 'js/server', 'mapcomponents/vToolsBar'], function (Vue, Server) {
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
        });//地图工具条
        pubSub.subscribe('layerMangerView', function (args) {
            var map = args.map, config = args.config || null;
            if (window.layerManagerW != null) {
                window.layerManagerW.visible = !window.layerManagerW.visible;
                return false;
            }
            require(['js/vue', 'js/server', 'mapcomponents/vLayerManager'], function (Vue, Server) {
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
                });
            });
        });//图层管理起
        pubSub.subscribe('legendView', function (args) {
            var map = args.map,
                url = args.url;
            if (window.legendView != null) {
                window.legendView.url = url;
                return false;
            }
            require(['js/vue', 'mapcomponents/vLegendView'], function (Vue) {
                domConstruct.create('div').id('legendView').addToBody();
                window.legendView = new Vue({
                    el: '#legendView',
                    data: {
                        url: url,
                        visible: false
                    },
                    template: '<v-legendview class="my-left-bottom"  :url="url"></v-quicksearchview>'
                });
            });
        });//图列
        pubSub.subscribe('quickSearchView', function (args) {
            var map = args.map;
            require(['js/vue', 'js/server', 'mapcomponents/vQuickSearchView'], function (Vue, Server) {
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
        });//快速查询
        pubSub.subscribe('resultView', function (args) {
            var map = args.map,
                res = args.res || [],
                page = args.page || false,
                quickSearchStatus = window.OneMap.modules.findByName("quickSearch") != null;
            if (!window.resultView) {
                domConstruct.create('div').id('resultView').addToBody();
                require(['js/vue', 'mapcomponents/vResultView'], function (Vue) {
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
        });//查询结构浮动窗
        pubSub.subscribe('rightPanelView', function (args) {
            var map = args.map,
                e = args.e,
                layer = args.layer || {};
            var x = (e.clientX - 14) + 'px', y = (e.clientY + 4) + 'px';
            if (!window.rightPanelView) {
                domConstruct.create('div').id('rightPanelView').addToBody();
                require(['js/vue', 'mapcomponents/vRightPanelView'], function (Vue) {
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
        });//右击弹出框
        pubSub.subscribe('copyRightView', function (args) {
            var map = args.map, config = args.config || null;
            require(['js/vue', 'mapcomponents/vCopyRightView'], function (Vue, Server) {
                //add mapW node
                domConstruct.create('div').id('copyRightW').addToBody();
                new Vue({
                    el: '#copyRightW',
                    data: {
                        label: config.config
                    },
                    template: '<v-copyright class="my-right-bottom" :label="label"></v-copyright>'
                });
            });
        });
        return this;
    }

    function initMapApi() {
        //地图操作模块处理
        pubSub.subscribe('layerM.baseMapLayerM', function (args) {
            var map = args.map, layer = args.layer;
            require(['api/gLayerM'], function (layerM) {
                layerM.addBaseMap(map, layer);
            });
        });//基础地图切换（互斥）
        pubSub.subscribe('layerM.add', function (args) {
            var map = args.map, layer = args.layer;
            require(['api/gLayerM'], function (layerM) {
                layerM.addLayer(map, layer);
            });
        });//图层管理器（添加）
        pubSub.subscribe('layerM.close', function (args) {
            var map = args.map, layer = args.layer;
            require(['api/gLayerM'], function (layerM) {
                layerM.closeLayer(map, layer.id);
            });
        });//图层管理器（关闭）
        pubSub.subscribe('toolsEvent', function (args) {
            var map = args.map, tool = args.tool;
            require(['api/gToolsM'], function (toolsM) {
                toolsM[tool.toolKey].call(this, map)
            });
        });//地图工具条
        pubSub.subscribe('map.onLoad', function (args) {
            var map = args.map;
            map.graphics.on('click', function (evt) {
                var attributes = evt.graphic.attributes;
                if (attributes && attributes.popup == true) {
                    pubSub.publish('popup.showInfoPopup', {
                        map: map,
                        centerPt: attributes.centerPt,
                        res: attributes.attr
                    });
                }
            });
        });//地图初始化
        pubSub.subscribe('map.clear', function (args) {
            var map = args.map;
            require(['api/gToolsM'], function (gToolsM) {
                gToolsM.clear(map);
            });
        });//地图情况
        pubSub.subscribe('popup.showInfoPopup', function (args) {
            var map = args.map, mapPoint = args.centerPt, res = args.res, pan = args.pan || false;
            require(['api/gPopupM'], function (gPopupM) {
                gPopupM.showInfoPopup({
                    map: map,
                    centerPt: mapPoint,
                    res: res,
                    pan: pan
                });
            });
        });//弹出气泡
        pubSub.subscribe('draw.markerList', function (args) {
            var map = args.map,
                res = args.res,
                marker = args.marker || false,
                name = args.name || null,
                extent = args.extent || false,
                popup = args.popup || false;
            var pts = [];
            require(['esri/graphic', 'apiext/WKTToGeometry', 'api/gSymbolM'], function (Graphic, WKTToGeometry, gSymbolM) {
                res.forEach(function (item, index) {
                    WKTToGeometry.parse({
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
        });//绘制小气泡列表
        pubSub.subscribe('draw.polygonList', function (args) {
            var map = args.map,
                res = args.res,
                extent = args.extent || false,
                popup = args.popup || false;
            var pts = [];
            require(['esri/graphic', 'apiext/WKTToGeometry', 'api/gSymbolM'], function (Graphic, WKTToGeometry, gSymbolM) {
                res.forEach(function (item, index) {
                    WKTToGeometry.parse({
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
        });//汇总面状列表
        return this;
    }

    function initJsApi() {
        //专题部分
        pubSub.subscribe('map.heatMapLayer', function (args) {
            require(['apiext/heatmap/HeatmapLayer', 'api/gGeometryM', 'js/server', 'apiext/heatmap/heatMap'], function (HeatMapLayer, gGeometryM, Server) {
                var map = window.OneMap.map;
                var heatMapLayer = map.getLayer('heatMapLayer') || null;
                if (heatMapLayer == null) {
                    domConstruct.create('div').id('heatMapLayer').addToBody();
                    heatMapLayer = new HeatMapLayer({map: map, opacity: 0.8, config: {radius: 12}}, 'heatMapLayer');
                    map.addLayer(heatMapLayer);
                    //移除Dom节点
                    document.body.removeChild(document.getElementById('heatMapLayer'));
                }
                else
                    heatMapLayer.setData([]);
                //插入输入执行Render
                Server.getAjax({
                    url: window.OneMap.services.findByName('buildingDealingHeatMapServiceKey').serviceUrl,
                    data: {sTime: '2016-01-01', eTime: '2016-03-01'}
                }).done(function (res) {
                    var data = [], size = res.data.length;
                    res.data.forEach(function (d, index) {
                        gGeometryM.fromWkt(map, d.shape).done(function (geometry) {
                            //for (var i = 0; i < parseInt(d.name); i++) {
                            data.push(
                                {
                                    attributes: {},
                                    geometry: geometry
                                });
                            //}
                            if (index + 1 === size)
                                heatMapLayer.setData(data);
                        });
                    });
                });
            });
        });//生成热点图
        pubSub.subscribe('map.clusterMapLayer', function (args) {
            require(['apiext/clustermap/ClusterMapLayer', 'js/server', 'api/gGeometryM'], function (ClusterMapLayer, Server, gGeometryM) {
                var map = window.OneMap.map;
                Server.getAjax({
                    url: window.OneMap.services.findByName('buildingDealingHeatMapServiceKey').serviceUrl,
                    data: {sTime: '2016-01-01', eTime: '2016-03-01'}
                }).done(function (res) {
                    var data = [], size = res.data.length;
                    res.data.forEach(function (d, index) {
                        gGeometryM.fromWkt(map, d.shape).done(function (geometry) {
                            data.push({
                                popupInfo: d,
                                attributes: {count: parseInt(d.name)},
                                x: geometry.x,
                                y: geometry.y
                            });
                            if (index + 1 === size)
                                ClusterMapLayer.addClusters(map, data);
                        });
                    });
                });
            });
        });//生成聚合图
        pubSub.subscribe('map.canvasLayer', function (args) {
            require(['apiext/CanvasLayerByZRender'], function (CanvasLayerByZRender) {
                var map = window.OneMap.map;
                var canvasLayer = new CanvasLayerByZRender(map, {id: 'canvasLayer'});
                canvasLayer.setData();
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