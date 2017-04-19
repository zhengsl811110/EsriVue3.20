/**
 * Created by zhengsl on 2017/3/22.
 */
define(['vue'], function (Vue) {
    Vue.component('v-basemap', {
        props: {
            map: Object,
            baseMapList: Array
        },
        data: function () {
            return {
                defaultVisibleId: 'baseMap',
                layerViewVisible: ''
            }
        },
        template: '<div class="esri-widget v-baseMap"><ul><li v-for="baseMap in baseMapList" :class="{active:baseMap.id==defaultVisibleId,layerActive:baseMap.name==layerViewVisible}" @click="changeBaseMap(baseMap)"  @contextmenu.prevent="showMenus($event,baseMap)"><a><span class="icon" :class="baseMap.name"></span>{{baseMap.label}}</a></li></ul></div>',
        mounted: function () {
            var _this = this;
            this.baseMapList.forEach(function (baseMap) {
                if (baseMap.defaultVisible == 1) {
                    _this.defaultVisibleId = baseMap.id;
                    //init layerW
                    pubSub.publish('layerM.baseMapLayerM', {map: _this.map, layer: baseMap});
                }
                return false;
            });
        },
        methods: {
            showMenus: function (e, baseMap) {
                if (this.defaultVisibleId == baseMap.id) {
                    pubSub.publish('rightPanelView', {map: this.map, e: e, layer: baseMap})
                }
            },
            changeBaseMap: function (baseMap) {
                if (baseMap.name === 'layerView') {
                    //图层面板控制
                    if (this.layerViewVisible === 'layerView')
                        this.layerViewVisible = '';
                    else
                        this.layerViewVisible = 'layerView';

                    pubSub.publish('layerMangerView', {map: this.map});
                    return false;
                }
                if (this.defaultVisibleId == baseMap.id)return false;
                this.defaultVisibleId = baseMap.id;

                //关闭其他底图，显示当前底图
                var map = this.map;
                this.baseMapList.forEach(function (baseMapObj) {
                    if (baseMapObj.name != 'layerView' || baseMapObj.id != baseMap.id) {
                        var layer = map.getLayer(baseMapObj.id) || null;
                        if (layer != null) {
                            layer.setVisibility(false);
                        }
                    }
                });
                pubSub.publish('layerM.baseMapLayerM', {map: this.map, layer: baseMap});
            }
        }
    });
});