/**
 * Created by zhengsl on 2017/4/7.
 */
require(['vue','laypage'], function (Vue,laypage) {
    Vue.component('v-listitem', {
        props: {
            item: Object,
            markerIndex: Number
        },
        template: "<div class='list-group-item'　@click='position(item)'><div class='row'><div class='list-header'><span class='marker-Icon' :class='marker$(markerIndex)'></span><span class='title'>{{item.name}}</span></div></div><div class='row' v-for='(val,key) in item.showlist'>" +
        "<template v-if='valid$(key)'><span class='col-xs-4'>{{key}}：</span><span class='col-xs-8'>{{val}}</span></template>" +
        "<template v-else><span class='col-xs-4'>{{splitKey$(key)}}：</span><span class='col-xs-8'>{{val}} {{splitVal$(key)}}</span></template>" +
        "</div></div>",
        methods: {
            valid$: function (key) {
                return key.indexOf('$') == -1;
            },
            splitKey$: function (key) {
                return key.split('$')[0]
            },
            splitVal$: function (key) {
                return key.split('$')[1]
            },
            marker$: function (index) {
                return 'marker' + (index + 1).toString();
            },
            position: function (item) {
                this.$emit('position', item);
            }
        }
    });
    Vue.component('v-resultview', {
        props: {
            map: Object,
            allList: Array,
            quickSearchStatus: Boolean
        },
        data: function () {
            return {
                maxHeight: '300px',
                footerVisible: Math.ceil(this.allList.length / 10) > 1,
                list: this.allList.filterByPageIndex(1)
            }
        },
        watch: {
            allList: function () {
                this.list = this.allList.filterByPageIndex(1);
                this.footerVisible = Math.ceil(this.allList.length / 10) > 1;
                this.layPage();
            }
        },
        mounted: function () {
            var _this = this;
            _this.maxHeight = $(window).height() - 150 + 'px';
            $(window).resize(function () {
                _this.maxHeight = $(window).height() - 150 + 'px';
            });
            _this.layPage();
        },
        template: '<div class="esri-widget v-resultView" :class="{underQuickSearch:quickSearchStatus}">' +
        '<header class="header"><span class="icon close" @click="closeView"></span><ul><li>搜索结果<span class="list-count">({{allList.length}})</span></li></ul></header><div class="list-group" :style="{maxHeight:maxHeight}"><template v-for="(item,index) in list"><v-listitem :markerIndex="index"  :item="item" @position="position"></v-listitem></template></div>' +
        '<footer id="footerPage" v-show="footerVisible"></footer></div>',
        methods: {
            position: function (item) {
                var _this=this;
                this.map.graphics.graphics.forEach(function (g) {
                    if (g.attributes.popup === true && g.attributes.attr.id === item.id) {
                        pubSub.publish('popup.showInfoPopup', {
                            map: _this.map,
                            centerPt: g.attributes.centerPt,
                            res: g.attributes.attr,
                            pan: true
                        });
                        return false;
                    }
                });
            },
            closeView: function () {
                this.$emit('close');
            },
            layPage: function () {
                var _this = this;
                _this.showList(_this.allList.filterByPageIndex(1));
                if (_this.footerVisible == true) {
                    laypage({
                        cont: 'footerPage',
                        pages: Math.ceil(_this.allList.length / 10),
                        curr: 1, //当前页
                        first: false,
                        last: false,
                        jump: function (obj, first) { //触发分页后的回调
                            if (!first) {
                                _this.map.graphics.clear();
                                _this.showList(_this.allList.filterByPageIndex(obj.curr));
                            }
                        }
                    });
                }
            },
            showList: function (res) {
                this.list = res;
                pubSub.publish('draw.polygonList', {
                    map: this.map,
                    res: res
                });
                pubSub.publish('draw.markerList', {
                    map: this.map,
                    res: res,
                    popup: true,
                    extent: true
                });
            }
        }
    });
});