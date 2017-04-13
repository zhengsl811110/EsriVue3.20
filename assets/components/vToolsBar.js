/**
 * Created by zhengsl on 2017/3/27.
 */
require(['vue'], function (Vue) {
    Vue.component('v-toolsbar', {
        props: {
            map: Object,
            toolsBarList: Array
        },
        data: function () {
            return {
                show: true,
                active: false
            }
        },
        template: '<div class="esri-widget v-toolsBar"><span class="icon expand" :class="{active:active}" @click="expand"></span>' +
        '<template v-for="toolBar in toolsBarList"><ul v-if="!active"><li v-for="tool in toolBar.children" @click="toolEvent(tool)"><span class="icon" :class="tool.icon || tool.toolKey" :title="tool.name"></span></li></ul></template>' +
        '</div>',
        mounted: function () {

        },
        methods: {
            expand: function () {
                this.active = !this.active;
            },
            toolEvent: function (tool) {
                pubSub.publish('toolsEvent', {map: this.map, tool: tool});
            }
        }
    });
});