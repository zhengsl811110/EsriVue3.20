/**
 * Created by zhengsl on 2017/3/21.
 */
/*观察者模式处理函数*/
window.pubSub = pubSub = {};
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
