/**
 * Created by zhengsl on 2017/4/22.
 */
define(['js/vue'], function (Vue) {
    Vue.component('v-copyright', {
        props: {
            label: {
                type: String,
                default: '苏州工业园区格网信息科技有限公司'
            }
        },
        template: '<div class="esri-widget v-copyRight"><span>© {{label}}</span></div>'
    });
});