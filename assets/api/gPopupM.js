/**
 * Created by zhengsl on 2017/4/7.
 */
define(function () {
    function getRenderHtml(res) {
        var html = ['<div class="v-popup-content list-group">'];
        for (var i in res.attribute) {
            if (i.indexOf('$') > -1) {
                var iSplit = i.split("$");
                html.push('<div class="row"><span class="col-xs-4">' + iSplit[0] + '：</span><span class="col-xs-8">' + res.attribute[i] + ' ' + iSplit[1] + '</span></div>');
            }
            else {
                html.push('<div class="row"><span class="col-xs-4">' + i + '：</span><span class="col-xs-8">' + res.attribute[i] + '</span></div>');
            }
        }
        html.push('</div>');
        if (res.querylist && res.querylist instanceof Object) {
            html.push('<div class="v-popup-footer">');
            for (var f in res.querylist) {
                if (f.indexOf('device') == -1) {
                    html.push('<a class="link" onclick="' + res.querylist[f] + '">' + f + '</a>');
                }
            }
            html.push('</div>');
        }
        return html.join('')
    }

    return {
        showInfoPopup: function (options) {
            var map = options.map, res = options.res, centerPt = options.centerPt, pan = options.pan;
            map.infoWindow.setTitle(res.name);
            //创建查询内容
            map.infoWindow.setContent(getRenderHtml(res));
            var screenPoint = map.toScreen(centerPt);
            map.infoWindow.show(screenPoint, map.getInfoWindowAnchor(screenPoint));
            if (pan == true) {
                map.centerAt(centerPt);
            }
        }
    };
});