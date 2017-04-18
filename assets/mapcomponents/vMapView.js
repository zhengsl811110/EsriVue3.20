/**
 * Created by zhengsl on 2017/3/21.
 */
require(['vue'], function (Vue) {
    Vue.component('v-mapview', {
        props: {
            id: String,
            zoom: {
                type: Number,
                default: 6
            },
            extent: {
                type: String,
                default: '51191.40624998517,39857.17773431903,57055.35888672425,48508.91113278153'//金鸡湖中心点
            },
            spatialReference: {
                type: String,
                default: 'PROJCS["szbj54",GEOGCS["szbj54",DATUM["D_Krasovsky_1940",SPHEROID["Krasovsky_1940",6378245.0,298.3]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Gauss_Kruger"],PARAMETER["False_Easting",50805.0],PARAMETER["False_Northing",-3421129.0],PARAMETER["Central_Meridian",120.583333],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]'
            }
        },
        template: '<div :id="id" class="map"></div>',
        mounted: function () {
            var _this = this;
            require(['esri/map',
                'esri/SpatialReference',
                'esri/geometry/Extent',
                'dojo/domReady!'
            ], function (Map, SpatialReference, Extent) {
                var spatialReference = new SpatialReference(_this.spatialReference);
                var extentArr = _this.extent.split(',');
                window.extent = extent = new Extent(parseFloat(extentArr[0]), parseFloat(extentArr[1]), parseFloat(extentArr[2]), parseFloat(extentArr[3]), spatialReference);
                var map = new Map(_this.id, {
                    logo: false,
                    extent: extent,
                    slider: false,
                    showAttribution: false,
                    smartNavigation: false,
                    force3DTransforms: true
                });
                _this.$emit('initComplete', map);
            });
        }
    });
});

