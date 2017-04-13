/**
 * Created by zhengsl on 2017/4/7.
 */
define(function () {
    return {
        getDefaultSymbol: function (geometry) {
            var defer = $.Deferred();
            switch (geometry.type.toLowerCase()) {
                case 'point':
                    require(['esri/symbols/SimpleLineSymbol',
                            'esri/symbols/SimpleMarkerSymbol',
                            "esri/Color",
                            'dojo/domReady!'],
                        function (SimpleLineSymbol, SimpleMarkerSymbol, Color) {
                            var pointSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 15, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                                new Color([255, 0, 0]), 1),
                                new Color([255, 0, 0, 1]));
                            defer.resolve(pointSymbol)
                        });
                    break;
                case 'polyline':
                    require(['esri/symbols/SimpleLineSymbol',
                            'dojo/domReady!'],
                        function (SimpleLineSymbol) {
                            var polyLineSymbol = new SimpleLineSymbol({
                                color: [226, 119, 40],
                                width: 2
                            });
                            defer.resolve(polyLineSymbol)
                        });
                    break;
                case'polygon':
                    require(['esri/symbols/SimpleLineSymbol',
                        'esri/symbols/SimpleFillSymbol',
                        'esri/Color',
                        'dojo/domReady!'], function (SimpleLineSymbol, SimpleFillSymbol, Color) {
                        var symbolLineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([212, 69, 18]), 1);
                        var polygonSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_BACKWARD_DIAGONAL, symbolLineSymbol, new Color([240, 220, 133, 0.5]));
                        defer.resolve(polygonSymbol)
                    });
                    break;
            }
            return defer;
        },
        getMarkerSymbol: function (opt) {
            var defer = $.Deferred();
            var w = opt.w || 22.5, h = opt.h || 22.5, x = opt.x || 0, y = opt.y || 10;
            require(['esri/symbols/PictureMarkerSymbol', 'dojo/domReady!'],
                function (PictureMarkerSymbol) {
                    var symbol = new PictureMarkerSymbol({
                        url: 'assets/imgs/poi/' + opt.name + '.png',
                        width: w,
                        height: h,
                        xoffset: x,
                        yoffset: y,
                        type: 'esriPMS',
                        angle: 0
                    });
                    defer.resolve(symbol);
                });
            return defer;
        }
    }
});