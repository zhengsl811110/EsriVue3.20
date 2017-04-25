/**
 * Created by zhengsl on 2017/4/25.
 */
define(['apiext/WKTToGeometry'], function (WKTToGeometry) {
    return {
        fromGeoneList: function (map, geoneList) {
            var defer = $.Deferred(), size = geoneList.length, geometries = [];
            geoneList.forEach(function (item) {
                WKTToGeometry.parse({
                    wkt: item.shape,
                    spatialReference: map.spatialReference
                }).done(function (geometry) {
                    geometries.push(geometry);
                    if (geometries.length === size)
                        defer.resolve(geometries);
                });
            });
            return defer;
        },
        fromWKTList: function (map, WKTList) {
            var defer = $.Deferred(), size = WKTList.length, geometries = [];
            WKTList.forEach(function (item) {
                WKTToGeometry.parse({
                    wkt: item,
                    spatialReference: map.spatialReference
                }).done(function (geometry) {
                    geometries.push(geometry);
                    if (geometries.length === size)
                        defer.resolve(geometries);
                });
            });
            return defer;
        },
        fromWkt: function (map, WKT) {
            var defer = $.Deferred();
            WKTToGeometry.parse({
                wkt: WKT,
                spatialReference: map.spatialReference
            }).done(function (geometry) {
                defer.resolve(geometry);
            });
            return defer;
        }
    }
});