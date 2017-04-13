/**
 * Created by zhengsl on 2017/3/21.
 */
/*函数注册到dojo中，以便程序能够通过require方法进行按需调用*/
window.dojoConfig = {
    packages: [
        {
            name: "gRegisterPubM",
            location: getRelUrl() + "/assets/api",
            main: "gRegisterPubM"
        },
        {
            name: "jquery",
            location: getRelUrl() + "/assets/js",
            main: "jquery.min"
        },
        {
            name: "vue",
            location: getRelUrl() + "/assets/js",
            main: "vue"
        },
        {
            name: "server",
            location: getRelUrl() + "/assets/js",
            main: "server"
        },
        {
            name: "vMapView",
            location: getRelUrl() + "/assets/components",
            main: "vMapView"
        },
        {
            name: "vBaseMap",
            location: getRelUrl() + "/assets/components",
            main: "vBaseMap"
        },
        {
            name: "vToolsBar",
            location: getRelUrl() + "/assets/components",
            main: "vToolsBar"
        },
        {
            name: "vLayerManager",
            location: getRelUrl() + "/assets/components",
            main: "vLayerManager"
        },
        {
            name: "vResultView",
            location: getRelUrl() + "/assets/components",
            main: "vResultView"
        },
        {
            name: "vQuickSearchView",
            location: getRelUrl() + "/assets/components",
            main: "vQuickSearchView"
        },
        {
            name: "vLegendView",
            location: getRelUrl() + "/assets/components",
            main: "vLegendView"
        },
        {
            name: "vSwipeMapView",
            location: getRelUrl() + "/assets/components",
            main: "vSwipeMapView"
        },
        {
            name: "vCmpMapView",
            location: getRelUrl() + "/assets/components",
            main: "vCmpMapView"
        },
        {
            name: "gTokenM",
            location: getRelUrl() + "/assets/api",
            main: "gTokenM"
        },
        {
            name: "gLayerM",
            location: getRelUrl() + "/assets/api",
            main: "gLayerM"
        },
        {
            name: "gToolsM",
            location: getRelUrl() + "/assets/api",
            main: "gToolsM"
        },
        {
            name: "gMeasureM",
            location: getRelUrl() + "/assets/api",
            main: "gMeasureM"
        },
        {
            name: "MeasureTools",
            location: getRelUrl() + "/assets/api",
            main: "MeasureTools"
        },
        {
            name: "gIQueryM",
            location: getRelUrl() + "/assets/api",
            main: "gIQueryM"
        },
        {
            name: "gPopupM",
            location: getRelUrl() + "/assets/api",
            main: "gPopupM"
        },
        {
            name: "gSymbolM",
            location: getRelUrl() + "/assets/api",
            main: "gSymbolM"
        },
        {
            name: "gWKTToGeometry",
            location: getRelUrl() + "/assets/api",
            main: "gWKTToGeometry"
        },
        {
            name: "laypage",
            location: getRelUrl() + "/assets/js/laypage",
            main: "laypage"
        }
    ]
};
/*URL地址过滤*/
function getRelUrl() {
    var relUrl = '';
    var url = document.location.toString();
    if (url.indexOf('?') != -1) {
        relUrl = url.split('?')[0];
    } else {
        relUrl = url;
    }
    var pos = relUrl.lastIndexOf('pages/');
    relUrl = relUrl.substr(0, pos);
    return relUrl.replace();
}
/*观察者模式处理函数*/
var pubSub = {};
(function (q) {
    var topics = {}, // 回调函数存放的数组
        subUid = -1;
    // 发布方法
    q.publish = function (topic, args) {

        if (!topics[topic]) {
            return false;
        }

        setTimeout(function () {
            var subscribers = topics[topic],
                len = subscribers ? subscribers.length : 0;

            while (len--) {
                //subscribers[len].func(topic, args);
                subscribers[len].func(args);
            }
            return true;
        }, 0);
    };
    //订阅方法
    q.subscribe = function (topic, func) {

        if (!topics[topic]) {
            topics[topic] = [];
        }

        var token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };
    //退订方法
    q.unsubscribe = function (token) {
        for (var m in topics) {
            if (topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return false;
    };
} (pubSub));
/**初始化属性配置**/
window.OneMap= {
    modules: null,
    services: null,
    hostIp: '192.168.42.75'
};
/*自定义方法，动态创建Dom添加到body中*/
function createDom(){
    this.element=null;
}
createDom.prototype= {
    create: function (domType) {
        this.element = document.createElement(domType);
        return this;
    },
    id: function (id) {
        this.element.id=id;
        return this;
    },
    css: function (className) {
        this.element.className=className;
        return this;
    },
    style: function (name,value) {
        this.element.style[name]=value;
        return this;
    },
    addToBody: function () {
        document.body.appendChild(this.element);
    }
};
window.domConstruct=new createDom();
/*Array原型扩展*/
Array.prototype.remove= function (id) {
    if (this.length > 0)
        this.splice(this.indexOf(id), 1);
};
Array.prototype.clear= function () {
    this.length = 0;
};
Array.prototype.findByName= function (name) {
    var object=null;
    this.forEach(function (item) {
        if (item.name == name){
            object = item;
            return false;
        }
    });
    return object;
};
Array.prototype.filterByPageIndex= function (page) {
    var array = [];
    for (var i = 10 * (page - 1), len = this.length; i < len; i++) {
        if (len <= page * 10)
            array.push(this[i]);
        else if (i < page * 10) {
            array.push(this[i]);
        }
    }
    return array;
};
/*String原型扩展*/
String.prototype.clear= function () {
    return this.replace(/[\r\n]/g, "");
};
