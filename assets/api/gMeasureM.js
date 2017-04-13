/**
 * Created by zhengsl on 2017/4/5.
 */
define(function () {
    var measureMent=null;
    function measure(map,type) {
        require(['MeasureTools', 'dojo/dom'], function (MeasureTools) {
            if (measureMent == null) {
                measureMent = new MeasureTools({
                    map: map
                });
            }
            map.setMapCursor('crosshair');
            if (type == 'distance')
                measureMent._startMeasureDistance();
            else
                measureMent._startMeasureArea();
        });
    }

    return {
        distance: function (map) {
            measure(map,'distance');
        },
        area: function (map) {
            measure(map,'area');
        }
    };
});