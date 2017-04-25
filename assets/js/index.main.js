/**
 * Created by zhengsl on 2017/4/13.
 */

define(function () {
    function init() {
        pubSub.subscribe('showSecondFrame', function (args) {
            var src = args.src || null, label = args.label || null;
            require(['js/vue', 'components/vFrameW'], function (Vue) {
                domConstruct.create('div').id('vFrameW').addToBody();
                new Vue(
                    {
                        el: '#vFrameW',
                        data: {
                            src: src,
                            label: label
                        },
                        template: '<v-framew :src="src" :label="label"></v-framew>'
                    }
                );
            });
        });
    }

    function initJsApi() {

    }

    return {
        init: init,
        initJsApi: initJsApi
    }
});