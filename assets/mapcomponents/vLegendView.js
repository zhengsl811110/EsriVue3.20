/**
 * Created by zhengsl on 2017/4/7.
 */
define(['vue'], function (Vue) {
    Vue.component('v-legendview', {
        props: {
            url: String
        },
        template: '<div class="esri-widget v-legendView"><footer></footer><img :src="url"></div>'
    });
});