/**
 * Created by zhengsl on 2017/4/6.
 */
define(function () {
    var mapIQuery = null, iServiceUrl =window.OneMap.services.findByName('iQueryServiceKey').serviceUrl;
    return {
        start: function (map) {
            map.setMapCursor('help');
            if (window.iList && window.iList.length > 0) {
                if (mapIQuery != null)
                    mapIQuery.remove();
                if (iServiceUrl == null)return false;
                mapIQuery = map.on('click', function (e) {
                    var mapPoint = e.mapPoint, layerIds = window.iList;
                    require(['server'], function (Server) {
                        Server.getAjax({
                            url: iServiceUrl,
                            data: {x: mapPoint.x, y: mapPoint.y, layerIds: layerIds.join(',')}
                        }).done(function (res) {
                            alert(res);
                        }).fail(function (res) {
                            map.graphics.clear();
                            pubSub.publish('popup.showInfoPopup', {
                                map: map,
                                centerPt: mapPoint,
                                res: res.data[0]
                            });
                            pubSub.publish('draw.polygonList', {
                                map: map,
                                res: res.data
                            });
                            pubSub.publish('resultView', {
                                map: map,
                                res: res.data
                            });
                        });
                    });
                });
            }
            else
                alert('请先打开需要查询的图层');
        },
        close: function (map) {
            map.setMapCursor('default');
            if (mapIQuery != null)
                mapIQuery.remove();
        }
    };
});