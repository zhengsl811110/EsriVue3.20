/**
 * Created by zhengsl on 2017/3/27.
 */
define(['js/vue'], function (Vue) {
    Vue.component('v-toolsbar', {
        props: {
            map: Object,
            toolsBarList: Array
        },
        data: function () {
            return {
                show: true,
                active: false,
                toolKey: ''
            }
        },
        template: '<div class="esri-widget v-toolsBar"><span class="icon expand"   :class="{active:active}" @click="expand"></span>' +
        '<transition name="expand"><div v-show="!active"><template v-for="toolBar in toolsBarList"><ul><li v-for="tool in toolBar.children" @click="toolEvent(tool)"><span class="icon" :class="[tool.icon || tool.toolKey,{active:tool.toolKey==toolKey}]" :title="tool.name"></span></li></ul></template></div></transition>' +
        '</div>',
        mounted: function () {

        },
        methods: {
            expand: function () {
                this.active = !this.active;
            },
            toolEvent: function (tool) {
                this.toolKey = tool.toolKey;
                pubSub.publish('toolsEvent', {map: this.map, tool: tool});
            }
        }
    });
});