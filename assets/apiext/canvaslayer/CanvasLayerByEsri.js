/* global h337 */
define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-style",
    "esri/layers/layer",
    "esri/geometry/Point",
    "zrender/zrender"
], function (declare,
             dom,
             domC,
             domStyle,
             Layer,
             Point,
             zrender) {
    return declare('CanvasLayer', [Layer], {
        name: "CanvasLayer",
        constructor: function () {
            this._storage = [];
            this._eventHandler = [];
            this._initLayer();
        },
        _initLayer: function () {
            this.loaded = !0;
            this.onLoad(this);
        },
        _setMap: function (map, c) {
            this.inherited(arguments);
            this._map = map;
            this._div = domC.create("div");
            this._div.id = this.id + '_layer';
            domStyle.set(this._div, {
                position: "absolute",
                left: "0",
                top: '0',
                transform: 'translate3d(0,0,-1px)',
                width: this._map.width + 'px',
                height: this._map.height + 'px',
                overflow: 'visible',
                opacity: this.opacity
            });
            if (this._map) {
                this._eventHandler.push(dojo.connect(this._map, 'onResize', this, this._resizeHandler));
                this._eventHandler.push(dojo.connect(this._map, 'onZoomStart', this, this._zoomStartHandler));
                this._eventHandler.push(dojo.connect(this._map, 'onZoomEnd', this, this._zoomEndHandler));
                this._eventHandler.push(dojo.connect(this._map, 'onPan', this, this._panHandler));
                this._eventHandler.push(dojo.connect(this._map, 'onPanEnd', this, this._panEndHandler));
            }

            this.evaluateSuspension();
            if (this.suspended && !this._map.loaded) {
                var m = dojo.connect(this._map, "onLoad", this, function () {
                    dojo.disconnect(m);
                    m = null;
                    this.evaluateSuspension();
                });
            }
            //ZRender 使用Zrender进行canvas动画操作
            this._zr = zrender.init(this._div);
            return this._div;
        },
        _unsetMap: function () {
            for (var i = 0, len = this._eventHandler.length; i < len; i++) {
                dojo.disconnect(this._eventHandler[i]);
            }
            this._eventHandler = [];
            domC.destroy(this._div);
            this._map = this._div = null;
            this.inherited(arguments);
        },
        _zoomStartHandler: function () {
            domStyle.set(this._div, {
                display: 'none'
            });
        },
        _zoomEndHandler: function () {
            domStyle.set(this._div, {
                top: 0,
                left: 0,
                display: 'block',
                transform: 'translate3d(0,0,-1px)'
            });
            this._geoCoord2Pixel(this._points);//坐标转换并存储
            this._drawGraphic();
        },
        _panHandler: function (extent, delta) {
            var rect = this._map.__visibleRect,
                x = rect.x + delta.x,
                y = rect.y + delta.y;

            this._panDx = x;
            this._panDy = y;
            domStyle.set(this._div, {
                transform: 'translate3d(' + x + 'px, ' + y + 'px,-1px)'
            });
        },
        _panEndHandler: function () {
            var rect = this._map.__visibleRect,
                x = rect.x,
                y = rect.y;
            this._panDx = x;
            this._panDy = y;
            domStyle.set(this._div, {
                transform: 'translate3d(' + x + 'px, ' + y + 'px,-1px)'
            });
        },
        _resizeHandler: function () {
            domStyle.set(this._div, {
                left: "0",
                top: '0',
                transform: 'translate3d(0,0,-1px)',
                width: this._map.width + 'px',
                height: this._map.height + 'px'
            });
            this._drawGraphic();
        },
        setData: function () {
            var _this = this;
            this._points = points = [[57235.644737956158, 42551.117602235208], [65744.661755990179, 47308.335450004241]];
            this._geoCoord2Pixel(points);//坐标转换并存储
            this._drawGraphic();

        },
        _drawGraphic: function () {
            var _this = this;
            require(['zrender/graphic/shape/Polyline'], function (PolylineShape) {
                _this._zr.clear();
                var polyline = new PolylineShape({
                    style: {
                        lineDash: [5, 5],
                        stroke: "rgba(220, 20, 60, 0.8)",
                        lineWidth: 3
                    },
                    shape: {
                        points: _this._storage,
                        smooth: 0.5
                    }
                });
                _this._zr.add(polyline);
                polyline.on('mouseover', function () {
                    _this._zr.addHover(this, {
                        stroke: 'yellow',
                        lineWidth: 10,
                        opacity: 1
                    });
                    _this._zr.refresh();
                });
                polyline.on('mouseout', function () {
                    _this._zr.removeHover(this);
                });
                polyline.animate('style', true)
                    .when(1000, {
                        lineDashOffset: 20
                    })
                    .start();
            });
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

        }
    });
});