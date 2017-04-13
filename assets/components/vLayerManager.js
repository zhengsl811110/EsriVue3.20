/**
 * Created by zhengsl on 2017/3/23.
 */
require(['vue'], function (Vue) {
    var list = [];//全局变量,处理图层相关问题
    window.iList = iList = [];
    Vue.component('tree-item', {
        props: {
            map: Object,
            tree: Object
        },
        data: function () {
            return {
                open: false,
                expand: false,
                check: false
            }
        },
        template: "<li ><div @click='toggle' v-if='isFolder'>" +
        "<span class='layerIcon l-unExpand' :class='{active:expand}'></span><span class='layerIcon l-group'></span><span>{{tree.name}}</span></div>" +
        "<div @contextmenu.prevent='showMenus($event,tree)' v-else>" +
        "<span class='layerIcon l-unCheck' :class='{active:check}' @click='checkToggle(tree)'></span><span class='layerIcon l-layer' :class='{active:tree.imgSrc}'></span><span>{{tree.name}}</span></div>" +
        "<ul v-show='open' v-if='isFolder'>" +
        "<tree-item v-for='t in tree.children' :key='t.id' :map='map' :tree='t'></tree-item>" +
        "</ul></li>",
        computed: {
            isFolder: function () {
                return this.tree.children &&
                    this.tree.children.length
            }
        },
        methods: {
            toggle: function () {
                if (this.isFolder) {
                    this.open = !this.open;
                    this.expand = !this.expand;
                }
            },
            checkToggle: function (tree) {
                if (this.check) {
                    pubSub.publish('layerM.close', {map: this.map, layer: tree});
                    list.remove(tree.id);
                    if (tree.imgSrc)
                        iList.remove(tree.id);
                }
                else {
                    pubSub.publish('layerM.add', {map: this.map, layer: tree});
                    list.push(tree.id);
                    if (tree.imgSrc)
                        iList.push(tree.id);
                    pubSub.publish('legendView', {url: tree.legendSrc})
                }
                this.check = !this.check;
            },
            showMenus: function (e, tree) {
                if (this.check) {
                    pubSub.publish('rightPanelView', {map: this.map, e: e, layer: tree})
                }
            }
        }
    });
    Vue.component('v-layermanager', {
        props: {
            map: Object,
            layerList: {
                type: Array,
                default: []
            }
        },
        data: function () {
            return {
                maxHeight: '300px'
            }
        },
        template: '<div class="esri-widget v-layerManager"><header>图层管理器<span class="icon layerClose" @click="closeAll" title="关闭全部图层"></span></header>' +
        '<section :style="{maxHeight:maxHeight}"><ul><tree-item v-for="t in layerList" :key="t.id" :map="map" :tree="t"></tree-item></ul></section></div>',
        mounted: function () {
            var _this = this;
            _this.maxHeight = $(window).height() - 150 + 'px';
            $(window).resize(function () {
                _this.maxHeight = $(window).height() - 150 + 'px';
            });
        },
        methods: {
            closeAll: function () {
                var _this = this;
                list.forEach(function (layerId) {
                    pubSub.publish('layerM.close', {map: _this.map, layer: {id: layerId}});
                });
                $(".v-layerManager .l-unCheck.active").removeClass('active');
            }
        }
    });
});