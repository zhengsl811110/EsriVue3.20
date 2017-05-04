/* global h337 */
define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-style",
    "esri/geometry/Point",
    "zrender/zrender"
], function (declare, dom, domC, domStyle, Point, zrender) {
    return declare('CanvasLayer', null, {
        name: "CanvasLayer",
        constructor: function (map, opt) {
            this._map = map;
            this._opt = opt;
            this._minZoom = opt.minZoom || map.getMinZoom();
            this._maxZoom = opt.maxZoom || map.getMaxZoom();
            this._geometry = [];
            this._eventHandler = [];
            this._initLayer();
        },
        _initLayer: function () {
            var _this = this;
            if (!this._opt.id) {
                console.log('please give layer id');
                return false;
            }
            var layerId = this._opt.id || '' + '_layer';
            if (this._map.getExtLayer(layerId)) {
                console.log('please change the layer id');
                return false;
            }
            this._div = domC.create("div");
            this._div.id = layerId;
            domStyle.set(this._div, {
                position: "absolute",
                left: "0px",
                top: '0px',
                width: this._map.width + 'px',
                height: this._map.height + 'px',
                display: _this._isInZoom() ? 'block' : 'none',
                overflow: 'visible',
                opacity: this.opacity
            });
            if (this._map) {
                this._eventHandler.push(dojo.connect(this._map, 'onResize', this, this._resizeHandler));
                this._eventHandler.push(dojo.connect(this._map, 'onZoomStart', this, this._zoomStartHandler));
                this._eventHandler.push(dojo.connect(this._map, 'onZoomEnd', this, this._zoomEndHandler));
                this._eventHandler.push(dojo.connect(this._map, 'onPan', this, this._panHandler));
                this._eventHandler.push(dojo.connect(this._map, 'onPanStart', this, this._panStartHandler));
                this._eventHandler.push(dojo.connect(this._map, 'onPanEnd', this, this._panEndHandler));
            }
            this._map.__container.appendChild(this._div);
            //ZRender 使用Zrender进行canvas动画操作
            this._zr = zrender.init(this._div);
            this._map.extLayer.push({
                id: this._div.id,
                layer: this
            });
        },
        clean: function () {
            for (var i = 0, len = this._eventHandler.length; i < len; i++) {
                dojo.disconnect(this._eventHandler[i]);
            }
            this._eventHandler = [];
            this._geometry = [];
            domC.destroy(this._div);
            this._map = this._div = null;
        },
        _zoomStartHandler: function () {
            domStyle.set(this._div, {
                display: 'none'
            });
        },
        _zoomEndHandler: function () {
            this._refresh();
        },
        _panHandler: function (extent, delta) {
            domStyle.set(this._div, {
                top: (this.dy + delta.y) + 'px',
                left: (this.dx + delta.x) + 'px'
            });
        },
        _panStartHandler: function (extent, delta) {
            this.dx = domStyle.get(this._div, 'left');
            this.dy = domStyle.get(this._div, 'top');
        },
        _panEndHandler: function () {
            this._refresh();
        },
        _resizeHandler: function () {
            this._refresh();
        },
        add: function (geo) {
            var _this = this;
            if (Array.isArray(geo)) {
                geo.forEach(function (g) {
                    _this._zr.add(g);
                    _this._geometry.push(g);
                });
            }
            else if (Object.isObject(geo)) {
                _this._zr.add(geo);
                _this._geometry.push(g);
            }
        },
        clear: function () {
            this._geometry = [];
            this._zr.clear();
        },
        _drawGraphic: function () {
            this._zr.refresh();
            //var _this = this;
            //require(['zrender/graphic/Image'], function (ImageShape) {
            //    _this._zr.clear();
            //    _this._storage.forEach(function (p) {
            //        var image = new ImageShape({
            //            style: {
            //                image: '../assets/imgs/23.png',
            //                x: p[0] - 9,
            //                y: p[1] - 9,
            //                width: 18,
            //                height: 18
            //            },
            //            highlightStyle: {
            //                image: '../assets/imgs/27.png'
            //            },
            //            hoverable: true
            //        });
            //        _this._zr.add(image);
            //        image.on('mouseover', function (e) {
            //            _this._zr.addHover(this, {
            //                image: '../assets/imgs/27.png'
            //            });
            //            _this._zr.refresh(e);
            //        });
            //        image.on('mouseout', function () {
            //            _this._zr.removeHover(this);
            //        });
            //    });
            //});
            //require(['zrender/graphic/shape/Polyline'], function (PolylineShape) {
            //    _this._zr.clear();
            //    var polyline = new PolylineShape({
            //        style: {
            //            lineDash: [5, 5],
            //            stroke: "rgba(220, 20, 60, 0.8)",
            //            lineWidth: 3
            //        },
            //        shape: {
            //            points: _this._storage,
            //            smooth: 0.5
            //        }
            //    });
            //    _this._zr.add(polyline);
            //    polyline.on('mouseover', function () {
            //        _this._zr.addHover(this, {
            //            stroke: 'yellow',
            //            lineWidth: 10,
            //            opacity: 1
            //        });
            //        _this._zr.refresh();
            //    });
            //    polyline.on('mouseout', function () {
            //        _this._zr.removeHover(this);
            //    });
            //    polyline.animate('style', true)
            //        .when(1000, {
            //            lineDashOffset: 20
            //        })
            //        .start();
            //});
        },
        _geoCoord2Pixel: function (points) {
            var _this = this;
            this._storage = [];
            points.forEach(function (p) {
                var point = new Point(p[0], p[1], _this._map.spatialReference);
                var pos = _this._map.toScreen(point);
                _this._storage.push([pos.x, pos.y]);
            });
        },
        _refresh: function () {
            if (!this._isInZoom())return false;
            var _this = this;
            //this._geoCoord2Pixel(this._points);//坐标转换并存储
            //this._drawGraphic();
            //刷新内容
            this._geometry.forEach(function (g) {
                var sp = _this._map.toScreen(g.op);
                g.setStyle({
                    x: sp.x - g.style.width / 2,
                    y: sp.y - g.style.height / 2
                });
            });

            domStyle.set(this._div, {
                top: 0,
                left: 0,
                display: 'block'
            });
            //this._zr.refresh();
        },
        _isInZoom: function () {
            var zoom = this._map.getZoom();
            if (zoom >= this._minZoom && zoom <= this._maxZoom) {
                return true;
            }
            return false;
        }
    });
});