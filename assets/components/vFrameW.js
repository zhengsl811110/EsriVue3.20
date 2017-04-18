/**
 * Created by zhengsl on 2017/4/18.
 */
define(['vue'], function (Vue) {
    Vue.component('v-framew', {
        props: {
            src: String,
            label: String
        },
        template: '<div class="second-container"><header><span class="frame-close" @click="close"><img src="assets/imgs/left.png"/></span><span>{{label}}</span></header><iframe class="second-frame" :src="src" width="100%" frameborder="0"></iframe></div>',
        methods: {
            close: function () {
                document.body.removeChild(this.$el);
            }
        }
    });
});