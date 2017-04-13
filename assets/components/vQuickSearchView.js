/**
 * Created by zhengsl on 2017/4/7.
 */
require(['vue','server'], function (Vue,Server) {
    Vue.component('v-quicksearchview', {
        props: {
            map: Object,
            list: Array
        },
        data: function () {
            return {
                rotating: false,
                name: this.list[0].name,
                val: this.list[0].defaultValue,
                url: this.list[0].url
            }
        },
        template: '<div class="esri-widget v-quickSearchView">' +
        '<select v-model="name" @change="change"><option v-for="item in list" :value="item.name">{{item.name}}</option></select>' +
        '<input  v-model="val" :value="val" @keyup.enter="search"><button @click="search">搜索</button><span class="loading" v-if="rotating"></span></div>',
        methods: {
            change: function () {
                var obj = this.list.findByName(this.name);
                this.val = obj.defaultValue;
                this.url = obj.url;
            },
            search: function () {
                var _this = this;
                this.rotating = true;
                Server.getAjax({url: this.url, data: {key: this.val}}).done(function (res) {
                    _this.rotating = false;
                    pubSub.publish('map.clear', {
                        map: _this.map
                    });
                    pubSub.publish('resultView', {
                        map: _this.map,
                        res: res.data,
                        page: true
                    });
                });
            }
        }
    });
});