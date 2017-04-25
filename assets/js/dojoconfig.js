/**
 * Created by zhengsl on 2017/4/18.
 */
/*函数注册到dojo中，以便程序能够通过require方法进行按需调用*/
window.dojoConfig = {
    parseOnLoad: false,
    async: true,
    tlmSiblingOfDojo: false,
    packages: [
        {
            name: "jquery",
            location: getRelUrl() + "/js",
            main: 'jquery'
        },
        {
            name: "js",
            location: getRelUrl() + "/js"
        },
        {
            name: "api",
            location: getRelUrl() + "/api"
        },
        {
            name: "apiext",
            location: getRelUrl() + "/apiext"
        },
        {
            name: "plugins",
            location: getRelUrl() + "/plugins"
        },
        {
            name: "components",
            location: getRelUrl() + "/components"
        },
        {
            name: "mapcomponents",
            location: getRelUrl() + "/mapcomponents"
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
    var pos = relUrl.lastIndexOf('mapw/');
    relUrl = relUrl.substr(0, pos);
    return relUrl.replace() + 'assets';
}
