/**
 * Created by zhengsl on 2017/3/26.
 */
define(function () {
    var tokens = [];

    return {
        getToken: function (id) {
            var defer = $.Deferred();
            var tokenList = tokens.filter(function (token) {
                return token.id == id
            });
            if (tokenList.length == 1) {
                var tokenObj = tokenList[0];
                if (tokenObj.tokenUrl.indexOf('http') > -1 || tokenObj.tokenUrl.indexOf('https') > -1) {
                    if (tokenObj.tokenUrl.indexOf('@IP') > -1 && window.OneMap.hostIp)
                        tokenObj.tokenUrl = tokenObj.tokenUrl.replace('@IP', window.OneMap.hostIp);
                    $.post(encodeURI(tokenObj.tokenUrl), function (token) {
                        tokenObj.tokenUrl = token;
                        defer.resolve(token);
                    });
                }
                else {
                    defer.resolve(tokenObj.tokenUrl);
                }
            }
            else {
                defer.resolve(null);
            }
            return defer;
        },
        setTokens: function (_tokens) {
            tokens = _tokens;
        }
    };
});