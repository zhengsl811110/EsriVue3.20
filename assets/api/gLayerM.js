/**
 * Created by zhengsl on 2017/3/23.
 */
define(function () {

    function addBaseMap(map, layer) {
        var mapLayer = map.getLayer(layer.id) || null;
        if (mapLayer == null) {
            addLayerToMap(map, layer, 0);
        }
        else {
            mapLayer.setVisibility(true);
        }
    }

    function addLayer(map, layer) {
        var mapLayer = map.getLayer(layer.id) || null;
        if (mapLayer == null) {
            addLayerToMap(map,layer,null);
        }
        else {
            mapLayer.setVisibility(true);
        }
    }

    function closeLayer(map, id) {
        var mapLayer = map.getLayer(id) || null;
        if (mapLayer != null) {
            mapLayer.setVisibility(false);
        }
    }

    function addLayerToMap(map,layer,layerIndex) {
        switch (layer.layerType) {
            case 'tile':
                addTileLayer(map,layer,layerIndex);
                break;
            case 'dynamic':
                addDynamicLayer(map,layer,layerIndex);
                break;
            case 'iis':
                addIISLayer(map,layer,layerIndex);
                break;
        }
    }

    function addTileLayer(map,layer,layerIndex) {
        require(['esri/layers/ArcGISTiledMapServiceLayer', 'gTokenM'], function (ArcGISTiledMapServiceLayer, gTokenM) {
            gTokenM.getToken(layer.tokenName).then(function (tokenStr) {
                var token = '';
                if (tokenStr != null) {//have token
                    token = '?token=' + tokenStr.clear();
                }
                if (layer.serviceUrl.indexOf('@IP') > -1 && window.OneMap.hostIp)
                    layer.serviceUrl = layer.serviceUrl.replace('@IP', window.OneMap.hostIp);
                var tileLayer = new ArcGISTiledMapServiceLayer(layer.serviceUrl + token, {
                    id: layer.id,
                    //token: layer.tokenName,
                    opacity: parseFloat(layer.opacity) || 1
                });
                if (layerIndex == null)
                    map.addLayer(tileLayer);
                else
                    map.addLayer(tileLayer, layerIndex);
            });
        });
    }

    function  addDynamicLayer(map,layer,layerIndex) {
        require(['esri/layers/ArcGISDynamicMapServiceLayer', 'gTokenM'], function (ArcGISDynamicMapServiceLayer, gTokenM) {
            gTokenM.getToken(layer.tokenName).then(function (tokenStr) {
                var token = '';
                if (tokenStr != null) {//have token
                    token = '?token=' + tokenStr.clear();
                }
                var subLayers = [], layerDefs = [];
                layer.visibleLayers.split(',').forEach(function (subLayerId) {
                    if (layer.filter != '')
                        layerDefs.push(layer.filter);
                    subLayers.push(subLayerId);
                });
                if (layer.serviceUrl.indexOf('@IP') > -1 && window.OneMap.hostIp)
                    layer.serviceUrl = layer.serviceUrl.replace('@IP', window.OneMap.hostIp);
                var dynamicLayer = new ArcGISDynamicMapServiceLayer(layer.serviceUrl + token, {
                    id: layer.id,
                    opacity: parseFloat(layer.opacity) || 1
                });
                dynamicLayer.setVisibleLayers(subLayers);
                if (layerDefs.length > 0)
                    dynamicLayer.setLayerDefinitions(layerDefs);
                if (layerIndex == null)
                    map.addLayer(dynamicLayer);
                else
                    map.addLayer(dynamicLayer, layerIndex);
            });
        });
    }

    function addIISLayer(map,layer,layerIndex){

    }

    return {
        addBaseMap: addBaseMap,
        addLayer: addLayer,
        closeLayer: closeLayer
    };
});