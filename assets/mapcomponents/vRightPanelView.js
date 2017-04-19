/**
 * Created by zhengsl on 2017/4/13.
 */
define(['vue'], function (Vue) {
    Vue.component('v-rightpanelview', {
        props: {
            map: Object,
            layer: Object,
            x: String,
            y: String
        },
        data: function () {
            var opacity = this.map.getLayer(this.layer.id).opacity;
            return {
                val: opacity * 10
            }
        },
        watch: {
            layer: function () {
                this.val = this.map.getLayer(this.layer.id).opacity * 10;
            }
        },
        template: '<ul class="esri-widget v-rightPanelView" :style="{left:x,top:y}" @mouseleave="mouseLeave">' +
        '<li><a @click="top">置顶</a></li><li class="divider"></li>' +
        '<li><a @click="pre">上移</a></li>' +
        '<li><a @click="next">下移</a></li>' +
        '<li><a @click="bottom">置底</a></li><li class="divider"></li>' +
        '<li>透明度</li>' +
        '<li><input type="range" min="0" max="10" step="1"  v-model="val" :value="val"  @change="opacity" ></li></ul>',
        methods: {
            mouseLeave: function () {
                this.$emit("close");
            },
            top: function () {
                var layerConfig = this.layerTool();
                this.map.reorderLayer(layerConfig.layer, layerConfig.maxIndex);
            },
            pre: function () {
                var layerConfig = this.layerTool();
                if (layerConfig.curIndex === layerConfig.maxIndex)
                    return false;
                else {
                    this.map.reorderLayer(layerConfig.layer, layerConfig.curIndex + 1);
                }
            },
            next: function () {
                var layerConfig = this.layerTool();
                if (layerConfig.curIndex === 1)
                    return false;
                else
                    this.map.reorderLayer(layerConfig.layer, layerConfig.curIndex - 1);
            },
            bottom: function () {
                var layerConfig = this.layerTool();
                this.map.reorderLayer(layerConfig.layer, layerConfig.minIndex);
            },
            opacity: function () {
                var layer = this.map.getLayer(this.layer.id);
                layer.setOpacity(this.val / 10);
            },
            layerTool: function () {
                var id = this.layer.id, layer = this.map.getLayer(id);
                var layerIds = this.map.layerIds,
                    curIndex = 0;
                layerIds.forEach(function (item, index) {
                    if (id === item) {
                        curIndex = index;
                        return false;
                    }
                });
                return {maxIndex: layerIds.length, minIndex: 1, layer: layer, curIndex: curIndex};
            }
        }
    });
});