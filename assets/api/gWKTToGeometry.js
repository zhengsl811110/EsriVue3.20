/**
 * Created by zhengsl on 2017/4/6.
 */
define(function () {

    var WKTUtil= function (options) {
        this.initialize();
    };
    WKTUtil.prototype= {
        initialize: function (options) {
            this.regExes = {
                'typeStr': /^\s*(\w+)\s*\s∗(.∗)\s∗\s*$/,
                'spaces': /\s+/,
                'parenComma': /\)\s*,\s*\(/,
                'doubleParenComma': /\)\s*\)\s*,\s*\(\s*\(/,  // can't use {2} here
                'trimParen': /^\s*?(.∗?)?\s*$/
            };
            for (var i in options) {
                this[i] = options[i];
            }
        },
        read: function (wkt) {
            var features, type, str, wkts = [];
            wkt = wkt.replace(/[\n\r]/g, ' ');
            var matches = wkt.split('(');
            if (matches) {
                type = matches[0].toLowerCase().replace(' ', '');
                if (type.indexOf('polygon') > -1) {
                    if (matches.length == 3) {
                        str = matches[2].replace('))', '');
                        wkts.push(str);
                    }
                    else {
                        //孔洞或者多面情况
                        for (var a = 2; a < matches.length; a++) {
                            str = matches[a].replace(/\),/g, "");
                            if (str) {
                                wkts.push(str);
                            }
                        }
                    }
                }
                else {
                    if (type == 'multilinestring') {
                        for (var a = 2; a < matches.length - 1; a++) {
                            str = matches[a].replace('),', '');
                            wkts.push(str);
                        }
                        wkts.push(matches[matches.length - 1].replace('))', ''));
                    }
                    else {
                        str = matches[1].replace(')', '');
                        wkts.push(str);
                    }
                }
                if (this.parse[type]) {
                    features = this.parse[type].apply(this, [wkts.join('@')]);
                }
            }
            return features;
        },
        trim: function (str) {
            return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        },
        parse:{
            point: function (str) {
                var coords = this.trim(str).split(this.regExes.spaces);
                return coords;
            },
            multipoint: function (str) {
                var point, points = this.trim(str).split(','), components = [];
                for (var i = 0, len = points.length; i < len; ++i) {
                    point = points.replace(this.regExes.trimParen, '$1');
                    components.push(this.parse.point.apply(this, [point]).geometry);
                }
                return components;
            },
            linestring: function (str) {
                var points=this.trim(str).split(','),components=[];
                for(var i= 0,len=points.length;i<len;++i){
                    components.push(this.parse.point.apply(this, [points[i]]));
                }
                return components;
            },
            multilinestring: function (str) {
                var lines = this.trim(str).split('@'),components=[];
                for (var i = 0, len = lines.length; i < len; ++i) {
                    components.push(this.parse.linestring.apply(this, [lines[i]]));
                }
                return components;
            },
            polygon: function (wkt) {
                var _this=this, ring, linestring, strs = wkt.split('@'), components = [];
                strs.forEach(function (str) {
                    var rings = _this.trim(str).split(_this.regExes.parenComma);
                    for (var i = 0, len = rings.length; i < len; ++i) {
                        ring = rings[i].replace(_this.regExes.trimParen, '$1');
                        linestring = _this.parse.linestring.apply(_this, [ring]);
                        components.push(linestring);
                    }
                });
                return components;
            },
            multipolygon: function (wkt) {
                var strs = wkt.split('@'), components = [];
                for (var i = 0, len = strs.length; i < len; ++i) {
                    components.push(this.parse.linestring.apply(this, [strs[i]]));
                }
                return components;
            }
        }
    };

    var WKTToGeometry= function () {};
    WKTToGeometry.prototype= {
        point: function (options) {
            var defer = $.Deferred();
            require([
                'esri/geometry/Point',
                'dojo/domReady!'
            ], function (Point) {
                var wktUtil = new WKTUtil();
                var pt = wktUtil.read(options.wkt);
                var json = {
                    x: pt[0],
                    y: pt[1],
                    spatialReference: options.spatialReference
                };

                var point = new Point(json);
                defer.resolve(point);
            });
            return defer;
        },
        polyLine: function (options) {
            var defer = $.Deferred();
            require([
                'esri/geometry/Polyline',
                'dojo/domReady!'
            ], function (Polyline) {
                var wktUtil = new WKTUtil();
                var points = wktUtil.read(options.wkt);
                var json = {
                    paths: [points],
                    spatialReference: options.spatialReference
                };
                var polyLine = new Polyline(json);
                defer.resolve(polyLine);
            });
            return defer;
        },
        multiPolyLine: function (options) {
            var defer = $.Deferred();
            require([
                'esri/geometry/Polyline',
                'dojo/domReady!'
            ], function (Polyline) {
                var wktUtil = new WKTUtil();
                var polyLines = wktUtil.read(options.wkt);
                var polyLine = new Polyline(options.spatialReference);
                $(polyLines).each(function (index, item) {
                    polyLine.addPath(item);
                });
                defer.resolve(polyLine);
            });
            return defer;
        },
        polygon: function (options) {
            var defer = $.Deferred();
            require([
                'esri/geometry/Point',
                'esri/geometry/Polygon',
                'dojo/domReady!'
            ], function (Point, Polygon) {
                var wktUtil = new WKTUtil();
                var points = wktUtil.read(options.wkt);
                var json = {
                    rings: points,
                    spatialReference: options.spatialReference
                };
                var polygon = new Polygon(json);
                defer.resolve(polygon);
            });
            return defer;
        },
        multiPolygon: function (options) {
            var defer = $.Deferred();
            require([
                'esri/geometry/Point',
                'esri/geometry/Polygon',
                'dojo/domReady!'
            ], function (Point, Polygon) {
                var wktUtil = new WKTUtil();
                var polygons = wktUtil.read(options.wkt);
                var polygon = new Polygon(options.spatialReference);
                $(polygons).each(function (index, item) {
                    polygon.addRing(item);
                });
                defer.resolve(polygon);
            });
            return defer;
        }
    };

    return {
        parse: function (options) {
            var wkt = options.wkt;
            var type = wkt.split('(')[0].toLowerCase();
            var wktToGeometry = new WKTToGeometry();
            switch (type.replace(' ' , '')) {
                case 'point':
                case 'multipoint':
                    return wktToGeometry.point(options);
                    break;
                case 'linestring':
                    return wktToGeometry.polyLine(options);
                    break;
                case 'multilinestring':
                    return wktToGeometry.multiPolyLine(options);
                    break;
                case 'polygon':
                    return wktToGeometry.polygon(options);
                    break;
                case 'multipolygon':
                    return wktToGeometry.multiPolygon(options);
                    break;
            }
        }
    };
});