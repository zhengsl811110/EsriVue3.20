define("zrender/core/guid", [], function () {
    var t = 2311;
    return function () {
        return t++
    }
}), define("zrender/core/env", [], function () {
    function t(t) {
        var e = {}, r = {}, i = t.match(/Firefox\/([\d.]+)/), n = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/.+?rv:(([\d.]+))/), a = t.match(/Edge\/([\d.]+)/), o = /micromessenger/i.test(t);
        return i && (r.firefox = !0, r.version = i[1]), n && (r.ie = !0, r.version = n[1]), a && (r.edge = !0, r.version = a[1]), o && (r.weChat = !0), {
            browser: r,
            os: e,
            node: !1,
            canvasSupported: document.createElement("canvas").getContext ? !0 : !1,
            touchEventsSupported: "ontouchstart" in window && !r.ie && !r.edge,
            pointerEventsSupported: "onpointerdown" in window && (r.edge || r.ie && r.version >= 11)
        }
    }

    var e = {};
    return e = "undefined" == typeof navigator ? {
        browser: {},
        os: {},
        node: !0,
        canvasSupported: !0
    } : t(navigator.userAgent)
}), define("zrender/core/util", ["require"], function () {
    function t(e) {
        if (null == e || "object" != typeof e)return e;
        var r = e, i = B.call(e);
        if ("[object Array]" === i) {
            r = [];
            for (var n = 0, a = e.length; a > n; n++)r[n] = t(e[n])
        } else if (E[i])r = e.constructor.from(e); else if (!q[i] && !L(e) && !T(e)) {
            r = {};
            for (var o in e)e.hasOwnProperty(o) && (r[o] = t(e[o]))
        }
        return r
    }

    function e(r, i, n) {
        if (!b(i) || !b(r))return n ? t(i) : r;
        for (var a in i)if (i.hasOwnProperty(a)) {
            var o = r[a], s = i[a];
            !b(s) || !b(o) || _(s) || _(o) || T(s) || T(o) || w(s) || w(o) || L(s) || L(o) ? !n && a in r || (r[a] = t(i[a], !0)) : e(o, s, n)
        }
        return r
    }

    function r(t, r) {
        for (var i = t[0], n = 1, a = t.length; a > n; n++)i = e(i, t[n], r);
        return i
    }

    function i(t, e) {
        for (var r in e)e.hasOwnProperty(r) && (t[r] = e[r]);
        return t
    }

    function n(t, e, r) {
        for (var i in e)e.hasOwnProperty(i) && (r ? null != e[i] : null == t[i]) && (t[i] = e[i]);
        return t
    }

    function a() {
        return document.createElement("canvas")
    }

    function o() {
        return A || (A = W.createCanvas().getContext("2d")), A
    }

    function s(t, e) {
        if (t) {
            if (t.indexOf)return t.indexOf(e);
            for (var r = 0, i = t.length; i > r; r++)if (t[r] === e)return r
        }
        return -1
    }

    function h(t, e) {
        function r() {
        }

        var i = t.prototype;
        r.prototype = e.prototype, t.prototype = new r;
        for (var n in i)t.prototype[n] = i[n];
        t.prototype.constructor = t, t.superClass = e
    }

    function l(t, e, r) {
        t = "prototype" in t ? t.prototype : t, e = "prototype" in e ? e.prototype : e, n(t, e, r)
    }

    function u(t) {
        return t ? "string" == typeof t ? !1 : "number" == typeof t.length : void 0
    }

    function c(t, e, r) {
        if (t && e)if (t.forEach && t.forEach === D)t.forEach(e, r); else if (t.length === +t.length)for (var i = 0, n = t.length; n > i; i++)e.call(r, t[i], i, t); else for (var a in t)t.hasOwnProperty(a) && e.call(r, t[a], a, t)
    }

    function f(t, e, r) {
        if (t && e) {
            if (t.map && t.map === H)return t.map(e, r);
            for (var i = [], n = 0, a = t.length; a > n; n++)i.push(e.call(r, t[n], n, t));
            return i
        }
    }

    function d(t, e, r, i) {
        if (t && e) {
            if (t.reduce && t.reduce === j)return t.reduce(e, r, i);
            for (var n = 0, a = t.length; a > n; n++)r = e.call(i, r, t[n], n, t);
            return r
        }
    }

    function p(t, e, r) {
        if (t && e) {
            if (t.filter && t.filter === O)return t.filter(e, r);
            for (var i = [], n = 0, a = t.length; a > n; n++)e.call(r, t[n], n, t) && i.push(t[n]);
            return i
        }
    }

    function v(t, e, r) {
        if (t && e)for (var i = 0, n = t.length; n > i; i++)if (e.call(r, t[i], i, t))return t[i]
    }

    function g(t, e) {
        var r = F.call(arguments, 2);
        return function () {
            return t.apply(e, r.concat(F.call(arguments)))
        }
    }

    function m(t) {
        var e = F.call(arguments, 1);
        return function () {
            return t.apply(this, e.concat(F.call(arguments)))
        }
    }

    function _(t) {
        return "[object Array]" === B.call(t)
    }

    function y(t) {
        return "function" == typeof t
    }

    function x(t) {
        return "[object String]" === B.call(t)
    }

    function b(t) {
        var e = typeof t;
        return "function" === e || !!t && "object" == e
    }

    function w(t) {
        return !!q[B.call(t)]
    }

    function T(t) {
        return "object" == typeof t && "number" == typeof t.nodeType && "object" == typeof t.ownerDocument
    }

    function P(t) {
        return t !== t
    }

    function k() {
        for (var t = 0, e = arguments.length; e > t; t++)if (null != arguments[t])return arguments[t]
    }

    function z() {
        return Function.call.apply(F, arguments)
    }

    function M(t, e) {
        if (!t)throw new Error(e)
    }

    function S(t) {
        t[N] = !0
    }

    function L(t) {
        return t[N]
    }

    function C(t) {
        t && i(this, t)
    }

    function R() {
        return new C
    }

    var A, q = {
        "[object Function]": 1,
        "[object RegExp]": 1,
        "[object Date]": 1,
        "[object Error]": 1,
        "[object CanvasGradient]": 1,
        "[object CanvasPattern]": 1,
        "[object Image]": 1,
        "[object Canvas]": 1
    }, E = {
        "[object Int8Array]": 1,
        "[object Uint8Array]": 1,
        "[object Uint8ClampedArray]": 1,
        "[object Int16Array]": 1,
        "[object Uint16Array]": 1,
        "[object Int32Array]": 1,
        "[object Uint32Array]": 1,
        "[object Float32Array]": 1,
        "[object Float64Array]": 1
    }, B = Object.prototype.toString, I = Array.prototype, D = I.forEach, O = I.filter, F = I.slice, H = I.map, j = I.reduce, N = "__ec_primitive__", V = "_ec_", X = 4;
    C.prototype = {
        constructor: C, get: function (t) {
            return this[V + t]
        }, set: function (t, e) {
            return this[V + t] = e, e
        }, each: function (t, e) {
            void 0 !== e && (t = g(t, e));
            for (var r in this)this.hasOwnProperty(r) && t(this[r], r.slice(X))
        }, removeKey: function (t) {
            delete this[t]
        }
    };
    var W = {
        inherits: h,
        mixin: l,
        clone: t,
        merge: e,
        mergeAll: r,
        extend: i,
        defaults: n,
        getContext: o,
        createCanvas: a,
        indexOf: s,
        slice: z,
        find: v,
        isArrayLike: u,
        each: c,
        map: f,
        reduce: d,
        filter: p,
        bind: g,
        curry: m,
        isArray: _,
        isString: x,
        isObject: b,
        isFunction: y,
        isBuiltInObject: w,
        isDom: T,
        eqNaN: P,
        retrieve: k,
        assert: M,
        setAsPrimitive: S,
        createHashMap: R,
        noop: function () {
        }
    };
    return W
}), define("zrender/mixin/Draggable", ["require"], function () {
    function t() {
        this.on("mousedown", this._dragStart, this), this.on("mousemove", this._drag, this), this.on("mouseup", this._dragEnd, this), this.on("globalout", this._dragEnd, this)
    }

    function e(t, e) {
        return {target: t, topTarget: e && e.topTarget}
    }

    return t.prototype = {
        constructor: t, _dragStart: function (t) {
            var r = t.target;
            r && r.draggable && (this._draggingTarget = r, r.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.dispatchToElement(e(r, t), "dragstart", t.event))
        }, _drag: function (t) {
            var r = this._draggingTarget;
            if (r) {
                var i = t.offsetX, n = t.offsetY, a = i - this._x, o = n - this._y;
                this._x = i, this._y = n, r.drift(a, o, t), this.dispatchToElement(e(r, t), "drag", t.event);
                var s = this.findHover(i, n, r).target, h = this._dropTarget;
                this._dropTarget = s, r !== s && (h && s !== h && this.dispatchToElement(e(h, t), "dragleave", t.event), s && s !== h && this.dispatchToElement(e(s, t), "dragenter", t.event))
            }
        }, _dragEnd: function (t) {
            var r = this._draggingTarget;
            r && (r.dragging = !1), this.dispatchToElement(e(r, t), "dragend", t.event), this._dropTarget && this.dispatchToElement(e(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null
        }
    }, t
}), define("zrender/mixin/Eventful", ["require"], function () {
    var t = Array.prototype.slice, e = function () {
        this._$handlers = {}
    };
    return e.prototype = {
        constructor: e, one: function (t, e, r) {
            var i = this._$handlers;
            if (!e || !t)return this;
            i[t] || (i[t] = []);
            for (var n = 0; n < i[t].length; n++)if (i[t][n].h === e)return this;
            return i[t].push({h: e, one: !0, ctx: r || this}), this
        }, on: function (t, e, r) {
            var i = this._$handlers;
            if (!e || !t)return this;
            i[t] || (i[t] = []);
            for (var n = 0; n < i[t].length; n++)if (i[t][n].h === e)return this;
            return i[t].push({h: e, one: !1, ctx: r || this}), this
        }, isSilent: function (t) {
            var e = this._$handlers;
            return e[t] && e[t].length
        }, off: function (t, e) {
            var r = this._$handlers;
            if (!t)return this._$handlers = {}, this;
            if (e) {
                if (r[t]) {
                    for (var i = [], n = 0, a = r[t].length; a > n; n++)r[t][n].h != e && i.push(r[t][n]);
                    r[t] = i
                }
                r[t] && 0 === r[t].length && delete r[t]
            } else delete r[t];
            return this
        }, trigger: function (e) {
            if (this._$handlers[e]) {
                var r = arguments, i = r.length;
                i > 3 && (r = t.call(r, 1));
                for (var n = this._$handlers[e], a = n.length, o = 0; a > o;) {
                    switch (i) {
                        case 1:
                            n[o].h.call(n[o].ctx);
                            break;
                        case 2:
                            n[o].h.call(n[o].ctx, r[1]);
                            break;
                        case 3:
                            n[o].h.call(n[o].ctx, r[1], r[2]);
                            break;
                        default:
                            n[o].h.apply(n[o].ctx, r)
                    }
                    n[o].one ? (n.splice(o, 1), a--) : o++
                }
            }
            return this
        }, triggerWithContext: function (e) {
            if (this._$handlers[e]) {
                var r = arguments, i = r.length;
                i > 4 && (r = t.call(r, 1, r.length - 1));
                for (var n = r[r.length - 1], a = this._$handlers[e], o = a.length, s = 0; o > s;) {
                    switch (i) {
                        case 1:
                            a[s].h.call(n);
                            break;
                        case 2:
                            a[s].h.call(n, r[1]);
                            break;
                        case 3:
                            a[s].h.call(n, r[1], r[2]);
                            break;
                        default:
                            a[s].h.apply(n, r)
                    }
                    a[s].one ? (a.splice(s, 1), o--) : s++
                }
            }
            return this
        }
    }, e
}), define("zrender/Handler", ["require", "./core/util", "./mixin/Draggable", "./mixin/Eventful"], function (t) {
    function e(t, e, r) {
        return {
            type: t,
            event: r,
            target: e.target,
            topTarget: e.topTarget,
            cancelBubble: !1,
            offsetX: r.zrX,
            offsetY: r.zrY,
            gestureEvent: r.gestureEvent,
            pinchX: r.pinchX,
            pinchY: r.pinchY,
            pinchScale: r.pinchScale,
            wheelDelta: r.zrDelta,
            zrByTouch: r.zrByTouch
        }
    }

    function r() {
    }

    function i(t, e, r) {
        if (t[t.rectHover ? "rectContain" : "contain"](e, r)) {
            for (var i, n = t; n;) {
                if (n.clipPath && !n.clipPath.contain(e, r))return !1;
                n.silent && (i = !0), n = n.parent
            }
            return i ? s : !0
        }
        return !1
    }

    var n = t("./core/util"), a = t("./mixin/Draggable"), o = t("./mixin/Eventful"), s = "silent";
    r.prototype.dispose = function () {
    };
    var h = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"], l = function (t, e, i, s) {
        o.call(this), this.storage = t, this.painter = e, this.painterRoot = s, i = i || new r, this.proxy = i, i.handler = this, this._hovered = {}, this._lastTouchMoment, this._lastX, this._lastY, a.call(this), n.each(h, function (t) {
            i.on && i.on(t, this[t], this)
        }, this)
    };
    return l.prototype = {
        constructor: l, mousemove: function (t) {
            var e = t.zrX, r = t.zrY, i = this._hovered, n = this._hovered = this.findHover(e, r), a = n.target, o = i.target, s = this.proxy;
            s.setCursor && s.setCursor(a ? a.cursor : "default"), o && a !== o && o.__zr && this.dispatchToElement(i, "mouseout", t), this.dispatchToElement(n, "mousemove", t), a && a !== o && this.dispatchToElement(n, "mouseover", t)
        }, mouseout: function (t) {
            this.dispatchToElement(this._hovered, "mouseout", t);
            var e, r = t.toElement || t.relatedTarget;
            do r = r && r.parentNode; while (r && 9 != r.nodeType && !(e = r === this.painterRoot));
            !e && this.trigger("globalout", {event: t})
        }, resize: function () {
            this._hovered = {}
        }, dispatch: function (t, e) {
            var r = this[t];
            r && r.call(this, e)
        }, dispose: function () {
            this.proxy.dispose(), this.storage = this.proxy = this.painter = null
        }, setCursorStyle: function (t) {
            var e = this.proxy;
            e.setCursor && e.setCursor(t)
        }, dispatchToElement: function (t, r, i) {
            t = t || {};
            for (var n = "on" + r, a = e(r, t, i), o = t.target; o && (o[n] && (a.cancelBubble = o[n].call(o, a)), o.trigger(r, a), o = o.parent, !a.cancelBubble););
            a.cancelBubble || (this.trigger(r, a), this.painter && this.painter.eachOtherLayer(function (t) {
                "function" == typeof t[n] && t[n].call(t, a), t.trigger && t.trigger(r, a)
            }))
        }, findHover: function (t, e, r) {
            for (var n = this.storage.getDisplayList(), a = {}, o = n.length - 1; o >= 0; o--) {
                var h;
                if (n[o] !== r && !n[o].ignore && (h = i(n[o], t, e)) && (!a.topTarget && (a.topTarget = n[o]), h !== s)) {
                    a.target = n[o];
                    break
                }
            }
            return a
        }
    }, n.each(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function (t) {
        l.prototype[t] = function (e) {
            var r = this.findHover(e.zrX, e.zrY), i = r.target;
            if ("mousedown" === t)this._downel = i, this._upel = i; else if ("mosueup" === t)this._upel = i; else if ("click" === t && this._downel !== this._upel)return;
            this.dispatchToElement(r, t, e)
        }
    }), n.mixin(l, o), n.mixin(l, a), l
}), define("zrender/core/matrix", [], function () {
    var t = "undefined" == typeof Float32Array ? Array : Float32Array, e = {
        create: function () {
            var r = new t(6);
            return e.identity(r), r
        }, identity: function (t) {
            return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t
        }, copy: function (t, e) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t
        }, mul: function (t, e, r) {
            var i = e[0] * r[0] + e[2] * r[1], n = e[1] * r[0] + e[3] * r[1], a = e[0] * r[2] + e[2] * r[3], o = e[1] * r[2] + e[3] * r[3], s = e[0] * r[4] + e[2] * r[5] + e[4], h = e[1] * r[4] + e[3] * r[5] + e[5];
            return t[0] = i, t[1] = n, t[2] = a, t[3] = o, t[4] = s, t[5] = h, t
        }, translate: function (t, e, r) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + r[0], t[5] = e[5] + r[1], t
        }, rotate: function (t, e, r) {
            var i = e[0], n = e[2], a = e[4], o = e[1], s = e[3], h = e[5], l = Math.sin(r), u = Math.cos(r);
            return t[0] = i * u + o * l, t[1] = -i * l + o * u, t[2] = n * u + s * l, t[3] = -n * l + u * s, t[4] = u * a + l * h, t[5] = u * h - l * a, t
        }, scale: function (t, e, r) {
            var i = r[0], n = r[1];
            return t[0] = e[0] * i, t[1] = e[1] * n, t[2] = e[2] * i, t[3] = e[3] * n, t[4] = e[4] * i, t[5] = e[5] * n, t
        }, invert: function (t, e) {
            var r = e[0], i = e[2], n = e[4], a = e[1], o = e[3], s = e[5], h = r * o - a * i;
            return h ? (h = 1 / h, t[0] = o * h, t[1] = -a * h, t[2] = -i * h, t[3] = r * h, t[4] = (i * s - o * n) * h, t[5] = (a * n - r * s) * h, t) : null
        }
    };
    return e
}), define("zrender/core/vector", [], function () {
    var t = "undefined" == typeof Float32Array ? Array : Float32Array, e = {
        create: function (e, r) {
            var i = new t(2);
            return null == e && (e = 0), null == r && (r = 0), i[0] = e, i[1] = r, i
        }, copy: function (t, e) {
            return t[0] = e[0], t[1] = e[1], t
        }, clone: function (e) {
            var r = new t(2);
            return r[0] = e[0], r[1] = e[1], r
        }, set: function (t, e, r) {
            return t[0] = e, t[1] = r, t
        }, add: function (t, e, r) {
            return t[0] = e[0] + r[0], t[1] = e[1] + r[1], t
        }, scaleAndAdd: function (t, e, r, i) {
            return t[0] = e[0] + r[0] * i, t[1] = e[1] + r[1] * i, t
        }, sub: function (t, e, r) {
            return t[0] = e[0] - r[0], t[1] = e[1] - r[1], t
        }, len: function (t) {
            return Math.sqrt(this.lenSquare(t))
        }, lenSquare: function (t) {
            return t[0] * t[0] + t[1] * t[1]
        }, mul: function (t, e, r) {
            return t[0] = e[0] * r[0], t[1] = e[1] * r[1], t
        }, div: function (t, e, r) {
            return t[0] = e[0] / r[0], t[1] = e[1] / r[1], t
        }, dot: function (t, e) {
            return t[0] * e[0] + t[1] * e[1]
        }, scale: function (t, e, r) {
            return t[0] = e[0] * r, t[1] = e[1] * r, t
        }, normalize: function (t, r) {
            var i = e.len(r);
            return 0 === i ? (t[0] = 0, t[1] = 0) : (t[0] = r[0] / i, t[1] = r[1] / i), t
        }, distance: function (t, e) {
            return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]))
        }, distanceSquare: function (t, e) {
            return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1])
        }, negate: function (t, e) {
            return t[0] = -e[0], t[1] = -e[1], t
        }, lerp: function (t, e, r, i) {
            return t[0] = e[0] + i * (r[0] - e[0]), t[1] = e[1] + i * (r[1] - e[1]), t
        }, applyTransform: function (t, e, r) {
            var i = e[0], n = e[1];
            return t[0] = r[0] * i + r[2] * n + r[4], t[1] = r[1] * i + r[3] * n + r[5], t
        }, min: function (t, e, r) {
            return t[0] = Math.min(e[0], r[0]), t[1] = Math.min(e[1], r[1]), t
        }, max: function (t, e, r) {
            return t[0] = Math.max(e[0], r[0]), t[1] = Math.max(e[1], r[1]), t
        }
    };
    return e.length = e.len, e.lengthSquare = e.lenSquare, e.dist = e.distance, e.distSquare = e.distanceSquare, e
}), define("zrender/mixin/Transformable", ["require", "../core/matrix", "../core/vector"], function (t) {
    function e(t) {
        return t > a || -a > t
    }

    var r = t("../core/matrix"), i = t("../core/vector"), n = r.identity, a = 5e-5, o = function (t) {
        t = t || {}, t.position || (this.position = [0, 0]), null == t.rotation && (this.rotation = 0), t.scale || (this.scale = [1, 1]), this.origin = this.origin || null
    }, s = o.prototype;
    s.transform = null, s.needLocalTransform = function () {
        return e(this.rotation) || e(this.position[0]) || e(this.position[1]) || e(this.scale[0] - 1) || e(this.scale[1] - 1)
    }, s.updateTransform = function () {
        var t = this.parent, e = t && t.transform, i = this.needLocalTransform(), a = this.transform;
        return i || e ? (a = a || r.create(), i ? this.getLocalTransform(a) : n(a), e && (i ? r.mul(a, t.transform, a) : r.copy(a, t.transform)), this.transform = a, this.invTransform = this.invTransform || r.create(), void r.invert(this.invTransform, a)) : void(a && n(a))
    }, s.getLocalTransform = function (t) {
        return o.getLocalTransform(this, t)
    }, s.setTransform = function (t) {
        var e = this.transform, r = t.dpr || 1;
        e ? t.setTransform(r * e[0], r * e[1], r * e[2], r * e[3], r * e[4], r * e[5]) : t.setTransform(r, 0, 0, r, 0, 0)
    }, s.restoreTransform = function (t) {
        var e = t.dpr || 1;
        t.setTransform(e, 0, 0, e, 0, 0)
    };
    var h = [];
    return s.decomposeTransform = function () {
        if (this.transform) {
            var t = this.parent, i = this.transform;
            t && t.transform && (r.mul(h, t.invTransform, i), i = h);
            var n = i[0] * i[0] + i[1] * i[1], a = i[2] * i[2] + i[3] * i[3], o = this.position, s = this.scale;
            e(n - 1) && (n = Math.sqrt(n)), e(a - 1) && (a = Math.sqrt(a)), i[0] < 0 && (n = -n), i[3] < 0 && (a = -a), o[0] = i[4], o[1] = i[5], s[0] = n, s[1] = a, this.rotation = Math.atan2(-i[1] / a, i[0] / n)
        }
    }, s.getGlobalScale = function () {
        var t = this.transform;
        if (!t)return [1, 1];
        var e = Math.sqrt(t[0] * t[0] + t[1] * t[1]), r = Math.sqrt(t[2] * t[2] + t[3] * t[3]);
        return t[0] < 0 && (e = -e), t[3] < 0 && (r = -r), [e, r]
    }, s.transformCoordToLocal = function (t, e) {
        var r = [t, e], n = this.invTransform;
        return n && i.applyTransform(r, r, n), r
    }, s.transformCoordToGlobal = function (t, e) {
        var r = [t, e], n = this.transform;
        return n && i.applyTransform(r, r, n), r
    }, o.getLocalTransform = function (t, e) {
        e = e || [], n(e);
        var i = t.origin, a = t.scale || [1, 1], o = t.rotation || 0, s = t.position || [0, 0];
        return i && (e[4] -= i[0], e[5] -= i[1]), r.scale(e, e, a), o && r.rotate(e, e, o), i && (e[4] += i[0], e[5] += i[1]), e[4] += s[0], e[5] += s[1], e
    }, o
}), define("zrender/animation/easing", [], function () {
    var t = {
        linear: function (t) {
            return t
        }, quadraticIn: function (t) {
            return t * t
        }, quadraticOut: function (t) {
            return t * (2 - t)
        }, quadraticInOut: function (t) {
            return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
        }, cubicIn: function (t) {
            return t * t * t
        }, cubicOut: function (t) {
            return --t * t * t + 1
        }, cubicInOut: function (t) {
            return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
        }, quarticIn: function (t) {
            return t * t * t * t
        }, quarticOut: function (t) {
            return 1 - --t * t * t * t
        }, quarticInOut: function (t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
        }, quinticIn: function (t) {
            return t * t * t * t * t
        }, quinticOut: function (t) {
            return --t * t * t * t * t + 1
        }, quinticInOut: function (t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
        }, sinusoidalIn: function (t) {
            return 1 - Math.cos(t * Math.PI / 2)
        }, sinusoidalOut: function (t) {
            return Math.sin(t * Math.PI / 2)
        }, sinusoidalInOut: function (t) {
            return .5 * (1 - Math.cos(Math.PI * t))
        }, exponentialIn: function (t) {
            return 0 === t ? 0 : Math.pow(1024, t - 1)
        }, exponentialOut: function (t) {
            return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
        }, exponentialInOut: function (t) {
            return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (-Math.pow(2, -10 * (t - 1)) + 2)
        }, circularIn: function (t) {
            return 1 - Math.sqrt(1 - t * t)
        }, circularOut: function (t) {
            return Math.sqrt(1 - --t * t)
        }, circularInOut: function (t) {
            return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        }, elasticIn: function (t) {
            var e, r = .1, i = .4;
            return 0 === t ? 0 : 1 === t ? 1 : (!r || 1 > r ? (r = 1, e = i / 4) : e = i * Math.asin(1 / r) / (2 * Math.PI), -(r * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i)))
        }, elasticOut: function (t) {
            var e, r = .1, i = .4;
            return 0 === t ? 0 : 1 === t ? 1 : (!r || 1 > r ? (r = 1, e = i / 4) : e = i * Math.asin(1 / r) / (2 * Math.PI), r * Math.pow(2, -10 * t) * Math.sin(2 * (t - e) * Math.PI / i) + 1)
        }, elasticInOut: function (t) {
            var e, r = .1, i = .4;
            return 0 === t ? 0 : 1 === t ? 1 : (!r || 1 > r ? (r = 1, e = i / 4) : e = i * Math.asin(1 / r) / (2 * Math.PI), (t *= 2) < 1 ? -.5 * r * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i) : r * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i) * .5 + 1)
        }, backIn: function (t) {
            var e = 1.70158;
            return t * t * ((e + 1) * t - e)
        }, backOut: function (t) {
            var e = 1.70158;
            return --t * t * ((e + 1) * t + e) + 1
        }, backInOut: function (t) {
            var e = 2.5949095;
            return (t *= 2) < 1 ? .5 * t * t * ((e + 1) * t - e) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
        }, bounceIn: function (e) {
            return 1 - t.bounceOut(1 - e)
        }, bounceOut: function (t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        }, bounceInOut: function (e) {
            return .5 > e ? .5 * t.bounceIn(2 * e) : .5 * t.bounceOut(2 * e - 1) + .5
        }
    };
    return t
}), define("zrender/animation/Clip", ["require", "./easing"], function (t) {
    function e(t) {
        this._target = t.target, this._life = t.life || 1e3, this._delay = t.delay || 0, this._initialized = !1, this.loop = null == t.loop ? !1 : t.loop, this.gap = t.gap || 0, this.easing = t.easing || "Linear", this.onframe = t.onframe, this.ondestroy = t.ondestroy, this.onrestart = t.onrestart, this._pausedTime = 0, this._paused = !1
    }

    var r = t("./easing");
    return e.prototype = {
        constructor: e, step: function (t, e) {
            if (this._initialized || (this._startTime = t + this._delay, this._initialized = !0), this._paused)return void(this._pausedTime += e);
            var i = (t - this._startTime - this._pausedTime) / this._life;
            if (!(0 > i)) {
                i = Math.min(i, 1);
                var n = this.easing, a = "string" == typeof n ? r[n] : n, o = "function" == typeof a ? a(i) : i;
                return this.fire("frame", o), 1 == i ? this.loop ? (this.restart(t), "restart") : (this._needsRemove = !0, "destroy") : null
            }
        }, restart: function (t) {
            var e = (t - this._startTime - this._pausedTime) % this._life;
            this._startTime = t - e + this.gap, this._pausedTime = 0, this._needsRemove = !1
        }, fire: function (t, e) {
            t = "on" + t, this[t] && this[t](this._target, e)
        }, pause: function () {
            this._paused = !0
        }, resume: function () {
            this._paused = !1
        }
    }, e
}), define("zrender/core/LRU", ["require"], function () {
    var t = function () {
        this.head = null, this.tail = null, this._len = 0
    }, e = t.prototype;
    e.insert = function (t) {
        var e = new r(t);
        return this.insertEntry(e), e
    }, e.insertEntry = function (t) {
        this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++
    }, e.remove = function (t) {
        var e = t.prev, r = t.next;
        e ? e.next = r : this.head = r, r ? r.prev = e : this.tail = e, t.next = t.prev = null, this._len--
    }, e.len = function () {
        return this._len
    }, e.clear = function () {
        this.head = this.tail = null, this._len = 0
    };
    var r = function (t) {
        this.value = t, this.next, this.prev
    }, i = function (e) {
        this._list = new t, this._map = {}, this._maxSize = e || 10, this._lastRemovedEntry = null
    }, n = i.prototype;
    return n.put = function (t, e) {
        var i = this._list, n = this._map, a = null;
        if (null == n[t]) {
            var o = i.len(), s = this._lastRemovedEntry;
            if (o >= this._maxSize && o > 0) {
                var h = i.head;
                i.remove(h), delete n[h.key], a = h.value, this._lastRemovedEntry = h
            }
            s ? s.value = e : s = new r(e), s.key = t, i.insertEntry(s), n[t] = s
        }
        return a
    }, n.get = function (t) {
        var e = this._map[t], r = this._list;
        return null != e ? (e !== r.tail && (r.remove(e), r.insertEntry(e)), e.value) : void 0
    }, n.clear = function () {
        this._list.clear(), this._map = {}
    }, i
}), define("zrender/tool/color", ["require", "../core/LRU"], function (t) {
    function e(t) {
        return t = Math.round(t), 0 > t ? 0 : t > 255 ? 255 : t
    }

    function r(t) {
        return t = Math.round(t), 0 > t ? 0 : t > 360 ? 360 : t
    }

    function i(t) {
        return 0 > t ? 0 : t > 1 ? 1 : t
    }

    function n(t) {
        return e(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 * 255 : parseInt(t, 10))
    }

    function a(t) {
        return i(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 : parseFloat(t))
    }

    function o(t, e, r) {
        return 0 > r ? r += 1 : r > 1 && (r -= 1), 1 > 6 * r ? t + (e - t) * r * 6 : 1 > 2 * r ? e : 2 > 3 * r ? t + (e - t) * (2 / 3 - r) * 6 : t
    }

    function s(t, e, r) {
        return t + (e - t) * r
    }

    function h(t, e, r, i, n) {
        return t[0] = e, t[1] = r, t[2] = i, t[3] = n, t
    }

    function l(t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
    }

    function u(t, e) {
        P && l(P, e), P = T.put(t, P || e.slice())
    }

    function c(t, e) {
        if (t) {
            e = e || [];
            var r = T.get(t);
            if (r)return l(e, r);
            t += "";
            var i = t.replace(/ /g, "").toLowerCase();
            if (i in w)return l(e, w[i]), u(t, e), e;
            if ("#" !== i.charAt(0)) {
                var o = i.indexOf("("), s = i.indexOf(")");
                if (-1 !== o && s + 1 === i.length) {
                    var c = i.substr(0, o), d = i.substr(o + 1, s - (o + 1)).split(","), p = 1;
                    switch (c) {
                        case"rgba":
                            if (4 !== d.length)return void h(e, 0, 0, 0, 1);
                            p = a(d.pop());
                        case"rgb":
                            return 3 !== d.length ? void h(e, 0, 0, 0, 1) : (h(e, n(d[0]), n(d[1]), n(d[2]), p), u(t, e), e);
                        case"hsla":
                            return 4 !== d.length ? void h(e, 0, 0, 0, 1) : (d[3] = a(d[3]), f(d, e), u(t, e), e);
                        case"hsl":
                            return 3 !== d.length ? void h(e, 0, 0, 0, 1) : (f(d, e), u(t, e), e);
                        default:
                            return
                    }
                }
                h(e, 0, 0, 0, 1)
            } else {
                if (4 === i.length) {
                    var v = parseInt(i.substr(1), 16);
                    return v >= 0 && 4095 >= v ? (h(e, (3840 & v) >> 4 | (3840 & v) >> 8, 240 & v | (240 & v) >> 4, 15 & v | (15 & v) << 4, 1), u(t, e), e) : void h(e, 0, 0, 0, 1)
                }
                if (7 === i.length) {
                    var v = parseInt(i.substr(1), 16);
                    return v >= 0 && 16777215 >= v ? (h(e, (16711680 & v) >> 16, (65280 & v) >> 8, 255 & v, 1), u(t, e), e) : void h(e, 0, 0, 0, 1)
                }
            }
        }
    }

    function f(t, r) {
        var i = (parseFloat(t[0]) % 360 + 360) % 360 / 360, n = a(t[1]), s = a(t[2]), l = .5 >= s ? s * (n + 1) : s + n - s * n, u = 2 * s - l;
        return r = r || [], h(r, e(255 * o(u, l, i + 1 / 3)), e(255 * o(u, l, i)), e(255 * o(u, l, i - 1 / 3)), 1), 4 === t.length && (r[3] = t[3]), r
    }

    function d(t) {
        if (t) {
            var e, r, i = t[0] / 255, n = t[1] / 255, a = t[2] / 255, o = Math.min(i, n, a), s = Math.max(i, n, a), h = s - o, l = (s + o) / 2;
            if (0 === h)e = 0, r = 0; else {
                r = .5 > l ? h / (s + o) : h / (2 - s - o);
                var u = ((s - i) / 6 + h / 2) / h, c = ((s - n) / 6 + h / 2) / h, f = ((s - a) / 6 + h / 2) / h;
                i === s ? e = f - c : n === s ? e = 1 / 3 + u - f : a === s && (e = 2 / 3 + c - u), 0 > e && (e += 1), e > 1 && (e -= 1)
            }
            var d = [360 * e, r, l];
            return null != t[3] && d.push(t[3]), d
        }
    }

    function p(t, e) {
        var r = c(t);
        if (r) {
            for (var i = 0; 3 > i; i++)r[i] = 0 > e ? r[i] * (1 - e) | 0 : (255 - r[i]) * e + r[i] | 0;
            return x(r, 4 === r.length ? "rgba" : "rgb")
        }
    }

    function v(t) {
        var e = c(t);
        return e ? ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1) : void 0
    }

    function g(t, r, n) {
        if (r && r.length && t >= 0 && 1 >= t) {
            n = n || [];
            var a = t * (r.length - 1), o = Math.floor(a), h = Math.ceil(a), l = r[o], u = r[h], c = a - o;
            return n[0] = e(s(l[0], u[0], c)), n[1] = e(s(l[1], u[1], c)), n[2] = e(s(l[2], u[2], c)), n[3] = i(s(l[3], u[3], c)), n
        }
    }

    function m(t, r, n) {
        if (r && r.length && t >= 0 && 1 >= t) {
            var a = t * (r.length - 1), o = Math.floor(a), h = Math.ceil(a), l = c(r[o]), u = c(r[h]), f = a - o, d = x([e(s(l[0], u[0], f)), e(s(l[1], u[1], f)), e(s(l[2], u[2], f)), i(s(l[3], u[3], f))], "rgba");
            return n ? {color: d, leftIndex: o, rightIndex: h, value: a} : d
        }
    }

    function _(t, e, i, n) {
        return t = c(t), t ? (t = d(t), null != e && (t[0] = r(e)), null != i && (t[1] = a(i)), null != n && (t[2] = a(n)), x(f(t), "rgba")) : void 0
    }

    function y(t, e) {
        return t = c(t), t && null != e ? (t[3] = i(e), x(t, "rgba")) : void 0
    }

    function x(t, e) {
        if (t && t.length) {
            var r = t[0] + "," + t[1] + "," + t[2];
            return ("rgba" === e || "hsva" === e || "hsla" === e) && (r += "," + t[3]), e + "(" + r + ")"
        }
    }

    var b = t("../core/LRU"), w = {
        transparent: [0, 0, 0, 0],
        aliceblue: [240, 248, 255, 1],
        antiquewhite: [250, 235, 215, 1],
        aqua: [0, 255, 255, 1],
        aquamarine: [127, 255, 212, 1],
        azure: [240, 255, 255, 1],
        beige: [245, 245, 220, 1],
        bisque: [255, 228, 196, 1],
        black: [0, 0, 0, 1],
        blanchedalmond: [255, 235, 205, 1],
        blue: [0, 0, 255, 1],
        blueviolet: [138, 43, 226, 1],
        brown: [165, 42, 42, 1],
        burlywood: [222, 184, 135, 1],
        cadetblue: [95, 158, 160, 1],
        chartreuse: [127, 255, 0, 1],
        chocolate: [210, 105, 30, 1],
        coral: [255, 127, 80, 1],
        cornflowerblue: [100, 149, 237, 1],
        cornsilk: [255, 248, 220, 1],
        crimson: [220, 20, 60, 1],
        cyan: [0, 255, 255, 1],
        darkblue: [0, 0, 139, 1],
        darkcyan: [0, 139, 139, 1],
        darkgoldenrod: [184, 134, 11, 1],
        darkgray: [169, 169, 169, 1],
        darkgreen: [0, 100, 0, 1],
        darkgrey: [169, 169, 169, 1],
        darkkhaki: [189, 183, 107, 1],
        darkmagenta: [139, 0, 139, 1],
        darkolivegreen: [85, 107, 47, 1],
        darkorange: [255, 140, 0, 1],
        darkorchid: [153, 50, 204, 1],
        darkred: [139, 0, 0, 1],
        darksalmon: [233, 150, 122, 1],
        darkseagreen: [143, 188, 143, 1],
        darkslateblue: [72, 61, 139, 1],
        darkslategray: [47, 79, 79, 1],
        darkslategrey: [47, 79, 79, 1],
        darkturquoise: [0, 206, 209, 1],
        darkviolet: [148, 0, 211, 1],
        deeppink: [255, 20, 147, 1],
        deepskyblue: [0, 191, 255, 1],
        dimgray: [105, 105, 105, 1],
        dimgrey: [105, 105, 105, 1],
        dodgerblue: [30, 144, 255, 1],
        firebrick: [178, 34, 34, 1],
        floralwhite: [255, 250, 240, 1],
        forestgreen: [34, 139, 34, 1],
        fuchsia: [255, 0, 255, 1],
        gainsboro: [220, 220, 220, 1],
        ghostwhite: [248, 248, 255, 1],
        gold: [255, 215, 0, 1],
        goldenrod: [218, 165, 32, 1],
        gray: [128, 128, 128, 1],
        green: [0, 128, 0, 1],
        greenyellow: [173, 255, 47, 1],
        grey: [128, 128, 128, 1],
        honeydew: [240, 255, 240, 1],
        hotpink: [255, 105, 180, 1],
        indianred: [205, 92, 92, 1],
        indigo: [75, 0, 130, 1],
        ivory: [255, 255, 240, 1],
        khaki: [240, 230, 140, 1],
        lavender: [230, 230, 250, 1],
        lavenderblush: [255, 240, 245, 1],
        lawngreen: [124, 252, 0, 1],
        lemonchiffon: [255, 250, 205, 1],
        lightblue: [173, 216, 230, 1],
        lightcoral: [240, 128, 128, 1],
        lightcyan: [224, 255, 255, 1],
        lightgoldenrodyellow: [250, 250, 210, 1],
        lightgray: [211, 211, 211, 1],
        lightgreen: [144, 238, 144, 1],
        lightgrey: [211, 211, 211, 1],
        lightpink: [255, 182, 193, 1],
        lightsalmon: [255, 160, 122, 1],
        lightseagreen: [32, 178, 170, 1],
        lightskyblue: [135, 206, 250, 1],
        lightslategray: [119, 136, 153, 1],
        lightslategrey: [119, 136, 153, 1],
        lightsteelblue: [176, 196, 222, 1],
        lightyellow: [255, 255, 224, 1],
        lime: [0, 255, 0, 1],
        limegreen: [50, 205, 50, 1],
        linen: [250, 240, 230, 1],
        magenta: [255, 0, 255, 1],
        maroon: [128, 0, 0, 1],
        mediumaquamarine: [102, 205, 170, 1],
        mediumblue: [0, 0, 205, 1],
        mediumorchid: [186, 85, 211, 1],
        mediumpurple: [147, 112, 219, 1],
        mediumseagreen: [60, 179, 113, 1],
        mediumslateblue: [123, 104, 238, 1],
        mediumspringgreen: [0, 250, 154, 1],
        mediumturquoise: [72, 209, 204, 1],
        mediumvioletred: [199, 21, 133, 1],
        midnightblue: [25, 25, 112, 1],
        mintcream: [245, 255, 250, 1],
        mistyrose: [255, 228, 225, 1],
        moccasin: [255, 228, 181, 1],
        navajowhite: [255, 222, 173, 1],
        navy: [0, 0, 128, 1],
        oldlace: [253, 245, 230, 1],
        olive: [128, 128, 0, 1],
        olivedrab: [107, 142, 35, 1],
        orange: [255, 165, 0, 1],
        orangered: [255, 69, 0, 1],
        orchid: [218, 112, 214, 1],
        palegoldenrod: [238, 232, 170, 1],
        palegreen: [152, 251, 152, 1],
        paleturquoise: [175, 238, 238, 1],
        palevioletred: [219, 112, 147, 1],
        papayawhip: [255, 239, 213, 1],
        peachpuff: [255, 218, 185, 1],
        peru: [205, 133, 63, 1],
        pink: [255, 192, 203, 1],
        plum: [221, 160, 221, 1],
        powderblue: [176, 224, 230, 1],
        purple: [128, 0, 128, 1],
        red: [255, 0, 0, 1],
        rosybrown: [188, 143, 143, 1],
        royalblue: [65, 105, 225, 1],
        saddlebrown: [139, 69, 19, 1],
        salmon: [250, 128, 114, 1],
        sandybrown: [244, 164, 96, 1],
        seagreen: [46, 139, 87, 1],
        seashell: [255, 245, 238, 1],
        sienna: [160, 82, 45, 1],
        silver: [192, 192, 192, 1],
        skyblue: [135, 206, 235, 1],
        slateblue: [106, 90, 205, 1],
        slategray: [112, 128, 144, 1],
        slategrey: [112, 128, 144, 1],
        snow: [255, 250, 250, 1],
        springgreen: [0, 255, 127, 1],
        steelblue: [70, 130, 180, 1],
        tan: [210, 180, 140, 1],
        teal: [0, 128, 128, 1],
        thistle: [216, 191, 216, 1],
        tomato: [255, 99, 71, 1],
        turquoise: [64, 224, 208, 1],
        violet: [238, 130, 238, 1],
        wheat: [245, 222, 179, 1],
        white: [255, 255, 255, 1],
        whitesmoke: [245, 245, 245, 1],
        yellow: [255, 255, 0, 1],
        yellowgreen: [154, 205, 50, 1]
    }, T = new b(20), P = null;
    return {parse: c, lift: p, toHex: v, fastMapToColor: g, mapToColor: m, modifyHSL: _, modifyAlpha: y, stringify: x}
}), define("zrender/animation/Animator", ["require", "./Clip", "../tool/color", "../core/util"], function (t) {
    function e(t, e) {
        return t[e]
    }

    function r(t, e, r) {
        t[e] = r
    }

    function i(t, e, r) {
        return (e - t) * r + t
    }

    function n(t, e, r) {
        return r > .5 ? e : t
    }

    function a(t, e, r, n, a) {
        var o = t.length;
        if (1 == a)for (var s = 0; o > s; s++)n[s] = i(t[s], e[s], r); else for (var h = t[0].length, s = 0; o > s; s++)for (var l = 0; h > l; l++)n[s][l] = i(t[s][l], e[s][l], r)
    }

    function o(t, e, r) {
        var i = t.length, n = e.length;
        if (i !== n) {
            var a = i > n;
            if (a)t.length = n; else for (var o = i; n > o; o++)t.push(1 === r ? e[o] : m.call(e[o]))
        }
        for (var s = t[0] && t[0].length, o = 0; o < t.length; o++)if (1 === r)isNaN(t[o]) && (t[o] = e[o]); else for (var h = 0; s > h; h++)isNaN(t[o][h]) && (t[o][h] = e[o][h])
    }

    function s(t, e, r) {
        if (t === e)return !0;
        var i = t.length;
        if (i !== e.length)return !1;
        if (1 === r) {
            for (var n = 0; i > n; n++)if (t[n] !== e[n])return !1
        } else for (var a = t[0].length, n = 0; i > n; n++)for (var o = 0; a > o; o++)if (t[n][o] !== e[n][o])return !1;
        return !0
    }

    function h(t, e, r, i, n, a, o, s, h) {
        var u = t.length;
        if (1 == h)for (var c = 0; u > c; c++)s[c] = l(t[c], e[c], r[c], i[c], n, a, o); else for (var f = t[0].length, c = 0; u > c; c++)for (var d = 0; f > d; d++)s[c][d] = l(t[c][d], e[c][d], r[c][d], i[c][d], n, a, o)
    }

    function l(t, e, r, i, n, a, o) {
        var s = .5 * (r - t), h = .5 * (i - e);
        return (2 * (e - r) + s + h) * o + (-3 * (e - r) - 2 * s - h) * a + s * n + e
    }

    function u(t) {
        if (g(t)) {
            var e = t.length;
            if (g(t[0])) {
                for (var r = [], i = 0; e > i; i++)r.push(m.call(t[i]));
                return r
            }
            return m.call(t)
        }
        return t
    }

    function c(t) {
        return t[0] = Math.floor(t[0]), t[1] = Math.floor(t[1]), t[2] = Math.floor(t[2]), "rgba(" + t.join(",") + ")"
    }

    function f(t, e, r, u, f) {
        var v = t._getter, m = t._setter, _ = "spline" === e, y = u.length;
        if (y) {
            var x, b = u[0].value, w = g(b), T = !1, P = !1, k = w && g(b[0]) ? 2 : 1;
            u.sort(function (t, e) {
                return t.time - e.time
            }), x = u[y - 1].time;
            for (var z = [], M = [], S = u[0].value, L = !0, C = 0; y > C; C++) {
                z.push(u[C].time / x);
                var R = u[C].value;
                if (w && s(R, S, k) || !w && R === S || (L = !1), S = R, "string" == typeof R) {
                    var A = p.parse(R);
                    A ? (R = A, T = !0) : P = !0
                }
                M.push(R)
            }
            if (!L) {
                for (var q = M[y - 1], C = 0; y - 1 > C; C++)w ? o(M[C], q, k) : !isNaN(M[C]) || isNaN(q) || P || T || (M[C] = q);
                w && o(v(t._target, f), q, k);
                var E, B, I, D, O, F, H = 0, j = 0;
                if (T)var N = [0, 0, 0, 0];
                var V = function (t, e) {
                    var r;
                    if (0 > e)r = 0; else if (j > e) {
                        for (E = Math.min(H + 1, y - 1), r = E; r >= 0 && !(z[r] <= e); r--);
                        r = Math.min(r, y - 2)
                    } else {
                        for (r = H; y > r && !(z[r] > e); r++);
                        r = Math.min(r - 1, y - 2)
                    }
                    H = r, j = e;
                    var o = z[r + 1] - z[r];
                    if (0 !== o)if (B = (e - z[r]) / o, _)if (D = M[r], I = M[0 === r ? r : r - 1], O = M[r > y - 2 ? y - 1 : r + 1], F = M[r > y - 3 ? y - 1 : r + 2], w)h(I, D, O, F, B, B * B, B * B * B, v(t, f), k); else {
                        var s;
                        if (T)s = h(I, D, O, F, B, B * B, B * B * B, N, 1), s = c(N); else {
                            if (P)return n(D, O, B);
                            s = l(I, D, O, F, B, B * B, B * B * B)
                        }
                        m(t, f, s)
                    } else if (w)a(M[r], M[r + 1], B, v(t, f), k); else {
                        var s;
                        if (T)a(M[r], M[r + 1], B, N, 1), s = c(N); else {
                            if (P)return n(M[r], M[r + 1], B);
                            s = i(M[r], M[r + 1], B)
                        }
                        m(t, f, s)
                    }
                }, X = new d({target: t._target, life: x, loop: t._loop, delay: t._delay, onframe: V, ondestroy: r});
                return e && "spline" !== e && (X.easing = e), X
            }
        }
    }

    var d = t("./Clip"), p = t("../tool/color"), v = t("../core/util"), g = v.isArrayLike, m = Array.prototype.slice, _ = function (t, i, n, a) {
        this._tracks = {}, this._target = t, this._loop = i || !1, this._getter = n || e, this._setter = a || r, this._clipCount = 0, this._delay = 0, this._doneList = [], this._onframeList = [], this._clipList = []
    };
    return _.prototype = {
        when: function (t, e) {
            var r = this._tracks;
            for (var i in e)if (e.hasOwnProperty(i)) {
                if (!r[i]) {
                    r[i] = [];
                    var n = this._getter(this._target, i);
                    if (null == n)continue;
                    0 !== t && r[i].push({time: 0, value: u(n)})
                }
                r[i].push({time: t, value: e[i]})
            }
            return this
        }, during: function (t) {
            return this._onframeList.push(t), this
        }, pause: function () {
            for (var t = 0; t < this._clipList.length; t++)this._clipList[t].pause();
            this._paused = !0
        }, resume: function () {
            for (var t = 0; t < this._clipList.length; t++)this._clipList[t].resume();
            this._paused = !1
        }, isPaused: function () {
            return !!this._paused
        }, _doneCallback: function () {
            this._tracks = {}, this._clipList.length = 0;
            for (var t = this._doneList, e = t.length, r = 0; e > r; r++)t[r].call(this)
        }, start: function (t) {
            var e, r = this, i = 0, n = function () {
                i--, i || r._doneCallback()
            };
            for (var a in this._tracks)if (this._tracks.hasOwnProperty(a)) {
                var o = f(this, t, n, this._tracks[a], a);
                o && (this._clipList.push(o), i++, this.animation && this.animation.addClip(o), e = o)
            }
            if (e) {
                var s = e.onframe;
                e.onframe = function (t, e) {
                    s(t, e);
                    for (var i = 0; i < r._onframeList.length; i++)r._onframeList[i](t, e)
                }
            }
            return i || this._doneCallback(), this
        }, stop: function (t) {
            for (var e = this._clipList, r = this.animation, i = 0; i < e.length; i++) {
                var n = e[i];
                t && n.onframe(this._target, 1), r && r.removeClip(n)
            }
            e.length = 0
        }, delay: function (t) {
            return this._delay = t, this
        }, done: function (t) {
            return t && this._doneList.push(t), this
        }, getClips: function () {
            return this._clipList
        }
    }, _
}), define("zrender/config", [], function () {
    var t = 1;
    "undefined" != typeof window && (t = Math.max(window.devicePixelRatio || 1, 1));
    var e = {debugMode: 0, devicePixelRatio: t};
    return e
}), define("zrender/core/log", ["require", "../config"], function (t) {
    var e = t("../config");
    return function () {
        if (0 !== e.debugMode)if (1 == e.debugMode)for (var t in arguments)throw new Error(arguments[t]); else if (e.debugMode > 1)for (var t in arguments)console.log(arguments[t])
    }
}), define("zrender/mixin/Animatable", ["require", "../animation/Animator", "../core/util", "../core/log"], function (t) {
    var e = t("../animation/Animator"), r = t("../core/util"), i = r.isString, n = r.isFunction, a = r.isObject, o = t("../core/log"), s = function () {
        this.animators = []
    };
    return s.prototype = {
        constructor: s, animate: function (t, i) {
            var n, a = !1, s = this, h = this.__zr;
            if (t) {
                var l = t.split("."), u = s;
                a = "shape" === l[0];
                for (var c = 0, f = l.length; f > c; c++)u && (u = u[l[c]]);
                u && (n = u)
            } else n = s;
            if (!n)return void o('Property "' + t + '" is not existed in element ' + s.id);
            var d = s.animators, p = new e(n, i);
            return p.during(function () {
                s.dirty(a)
            }).done(function () {
                d.splice(r.indexOf(d, p), 1)
            }), d.push(p), h && h.animation.addAnimator(p), p
        }, stopAnimation: function (t) {
            for (var e = this.animators, r = e.length, i = 0; r > i; i++)e[i].stop(t);
            return e.length = 0, this
        }, animateTo: function (t, e, r, a, o) {
            function s() {
                l--, l || o && o()
            }

            i(r) ? (o = a, a = r, r = 0) : n(a) ? (o = a, a = "linear", r = 0) : n(r) ? (o = r, r = 0) : n(e) ? (o = e, e = 500) : e || (e = 500), this.stopAnimation(), this._animateToShallow("", this, t, e, r, a, o);
            var h = this.animators.slice(), l = h.length;
            l || o && o();
            for (var u = 0; u < h.length; u++)h[u].done(s).start(a)
        }, _animateToShallow: function (t, e, i, n, o) {
            var s = {}, h = 0;
            for (var l in i)if (i.hasOwnProperty(l))if (null != e[l])a(i[l]) && !r.isArrayLike(i[l]) ? this._animateToShallow(t ? t + "." + l : l, e[l], i[l], n, o) : (s[l] = i[l], h++); else if (null != i[l])if (t) {
                var u = {};
                u[t] = {}, u[t][l] = i[l], this.attr(u)
            } else this.attr(l, i[l]);
            return h > 0 && this.animate(t, !1).when(null == n ? 500 : n, s).delay(o || 0), this
        }
    }, s
}), define("zrender/Element", ["require", "./core/guid", "./mixin/Eventful", "./mixin/Transformable", "./mixin/Animatable", "./core/util"], function (t) {
    var e = t("./core/guid"), r = t("./mixin/Eventful"), i = t("./mixin/Transformable"), n = t("./mixin/Animatable"), a = t("./core/util"), o = function (t) {
        i.call(this, t), r.call(this, t), n.call(this, t), this.id = t.id || e()
    };
    return o.prototype = {
        type: "element", name: "", __zr: null, ignore: !1, clipPath: null, drift: function (t, e) {
            switch (this.draggable) {
                case"horizontal":
                    e = 0;
                    break;
                case"vertical":
                    t = 0
            }
            var r = this.transform;
            r || (r = this.transform = [1, 0, 0, 1, 0, 0]), r[4] += t, r[5] += e, this.decomposeTransform(), this.dirty(!1)
        }, beforeUpdate: function () {
        }, afterUpdate: function () {
        }, update: function () {
            this.updateTransform()
        }, traverse: function () {
        }, attrKV: function (t, e) {
            if ("position" === t || "scale" === t || "origin" === t) {
                if (e) {
                    var r = this[t];
                    r || (r = this[t] = []), r[0] = e[0], r[1] = e[1]
                }
            } else this[t] = e
        }, hide: function () {
            this.ignore = !0, this.__zr && this.__zr.refresh()
        }, show: function () {
            this.ignore = !1, this.__zr && this.__zr.refresh()
        }, attr: function (t, e) {
            if ("string" == typeof t)this.attrKV(t, e); else if (a.isObject(t))for (var r in t)t.hasOwnProperty(r) && this.attrKV(r, t[r]);
            return this.dirty(!1), this
        }, setClipPath: function (t) {
            var e = this.__zr;
            e && t.addSelfToZr(e), this.clipPath && this.clipPath !== t && this.removeClipPath(), this.clipPath = t, t.__zr = e, t.__clipTarget = this, this.dirty(!1)
        }, removeClipPath: function () {
            var t = this.clipPath;
            t && (t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__clipTarget = null, this.clipPath = null, this.dirty(!1))
        }, addSelfToZr: function (t) {
            this.__zr = t;
            var e = this.animators;
            if (e)for (var r = 0; r < e.length; r++)t.animation.addAnimator(e[r]);
            this.clipPath && this.clipPath.addSelfToZr(t)
        }, removeSelfFromZr: function (t) {
            this.__zr = null;
            var e = this.animators;
            if (e)for (var r = 0; r < e.length; r++)t.animation.removeAnimator(e[r]);
            this.clipPath && this.clipPath.removeSelfFromZr(t)
        }
    }, a.mixin(o, n), a.mixin(o, i), a.mixin(o, r), o
}), define("zrender/core/BoundingRect", ["require", "./vector", "./matrix"], function (t) {
    function e(t, e, r, i) {
        0 > r && (t += r, r = -r), 0 > i && (e += i, i = -i), this.x = t, this.y = e, this.width = r, this.height = i
    }

    var r = t("./vector"), i = t("./matrix"), n = r.applyTransform, a = Math.min, o = Math.max;
    return e.prototype = {
        constructor: e, union: function (t) {
            var e = a(t.x, this.x), r = a(t.y, this.y);
            this.width = o(t.x + t.width, this.x + this.width) - e, this.height = o(t.y + t.height, this.y + this.height) - r, this.x = e, this.y = r
        }, applyTransform: function () {
            var t = [], e = [], r = [], i = [];
            return function (s) {
                if (s) {
                    t[0] = r[0] = this.x, t[1] = i[1] = this.y, e[0] = i[0] = this.x + this.width, e[1] = r[1] = this.y + this.height, n(t, t, s), n(e, e, s), n(r, r, s), n(i, i, s), this.x = a(t[0], e[0], r[0], i[0]), this.y = a(t[1], e[1], r[1], i[1]);
                    var h = o(t[0], e[0], r[0], i[0]), l = o(t[1], e[1], r[1], i[1]);
                    this.width = h - this.x, this.height = l - this.y
                }
            }
        }(), calculateTransform: function (t) {
            var e = this, r = t.width / e.width, n = t.height / e.height, a = i.create();
            return i.translate(a, a, [-e.x, -e.y]), i.scale(a, a, [r, n]), i.translate(a, a, [t.x, t.y]), a
        }, intersect: function (t) {
            if (!t)return !1;
            t instanceof e || (t = e.create(t));
            var r = this, i = r.x, n = r.x + r.width, a = r.y, o = r.y + r.height, s = t.x, h = t.x + t.width, l = t.y, u = t.y + t.height;
            return !(s > n || i > h || l > o || a > u)
        }, contain: function (t, e) {
            var r = this;
            return t >= r.x && t <= r.x + r.width && e >= r.y && e <= r.y + r.height
        }, clone: function () {
            return new e(this.x, this.y, this.width, this.height)
        }, copy: function (t) {
            this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height
        }, plain: function () {
            return {x: this.x, y: this.y, width: this.width, height: this.height}
        }
    }, e.create = function (t) {
        return new e(t.x, t.y, t.width, t.height)
    }, e
}), define("zrender/container/Group", ["require", "../core/util", "../Element", "../core/BoundingRect"], function (t) {
    var e = t("../core/util"), r = t("../Element"), i = t("../core/BoundingRect"), n = function (t) {
        t = t || {}, r.call(this, t);
        for (var e in t)t.hasOwnProperty(e) && (this[e] = t[e]);
        this._children = [], this.__storage = null, this.__dirty = !0
    };
    return n.prototype = {
        constructor: n, isGroup: !0, type: "group", silent: !1, children: function () {
            return this._children.slice()
        }, childAt: function (t) {
            return this._children[t]
        }, childOfName: function (t) {
            for (var e = this._children, r = 0; r < e.length; r++)if (e[r].name === t)return e[r]
        }, childCount: function () {
            return this._children.length
        }, add: function (t) {
            return t && t !== this && t.parent !== this && (this._children.push(t), this._doAdd(t)), this
        }, addBefore: function (t, e) {
            if (t && t !== this && t.parent !== this && e && e.parent === this) {
                var r = this._children, i = r.indexOf(e);
                i >= 0 && (r.splice(i, 0, t), this._doAdd(t))
            }
            return this
        }, _doAdd: function (t) {
            t.parent && t.parent.remove(t), t.parent = this;
            var e = this.__storage, r = this.__zr;
            e && e !== t.__storage && (e.addToStorage(t), t instanceof n && t.addChildrenToStorage(e)), r && r.refresh()
        }, remove: function (t) {
            var r = this.__zr, i = this.__storage, a = this._children, o = e.indexOf(a, t);
            return 0 > o ? this : (a.splice(o, 1), t.parent = null, i && (i.delFromStorage(t), t instanceof n && t.delChildrenFromStorage(i)), r && r.refresh(), this)
        }, removeAll: function () {
            var t, e, r = this._children, i = this.__storage;
            for (e = 0; e < r.length; e++)t = r[e], i && (i.delFromStorage(t), t instanceof n && t.delChildrenFromStorage(i)), t.parent = null;
            return r.length = 0, this
        }, eachChild: function (t, e) {
            for (var r = this._children, i = 0; i < r.length; i++) {
                var n = r[i];
                t.call(e, n, i)
            }
            return this
        }, traverse: function (t, e) {
            for (var r = 0; r < this._children.length; r++) {
                var i = this._children[r];
                t.call(e, i), "group" === i.type && i.traverse(t, e)
            }
            return this
        }, addChildrenToStorage: function (t) {
            for (var e = 0; e < this._children.length; e++) {
                var r = this._children[e];
                t.addToStorage(r), r instanceof n && r.addChildrenToStorage(t)
            }
        }, delChildrenFromStorage: function (t) {
            for (var e = 0; e < this._children.length; e++) {
                var r = this._children[e];
                t.delFromStorage(r), r instanceof n && r.delChildrenFromStorage(t)
            }
        }, dirty: function () {
            return this.__dirty = !0, this.__zr && this.__zr.refresh(), this
        }, getBoundingRect: function (t) {
            for (var e = null, r = new i(0, 0, 0, 0), n = t || this._children, a = [], o = 0; o < n.length; o++) {
                var s = n[o];
                if (!s.ignore && !s.invisible) {
                    var h = s.getBoundingRect(), l = s.getLocalTransform(a);
                    l ? (r.copy(h), r.applyTransform(l), e = e || r.clone(), e.union(r)) : (e = e || h.clone(), e.union(h))
                }
            }
            return e || r
        }
    }, e.inherits(n, r), n
}), define("zrender/core/timsort", [], function () {
    function t(t) {
        for (var e = 0; t >= h;)e |= 1 & t, t >>= 1;
        return t + e
    }

    function e(t, e, i, n) {
        var a = e + 1;
        if (a === i)return 1;
        if (n(t[a++], t[e]) < 0) {
            for (; i > a && n(t[a], t[a - 1]) < 0;)a++;
            r(t, e, a)
        } else for (; i > a && n(t[a], t[a - 1]) >= 0;)a++;
        return a - e
    }

    function r(t, e, r) {
        for (r--; r > e;) {
            var i = t[e];
            t[e++] = t[r], t[r--] = i
        }
    }

    function i(t, e, r, i, n) {
        for (i === e && i++; r > i; i++) {
            for (var a, o = t[i], s = e, h = i; h > s;)a = s + h >>> 1, n(o, t[a]) < 0 ? h = a : s = a + 1;
            var l = i - s;
            switch (l) {
                case 3:
                    t[s + 3] = t[s + 2];
                case 2:
                    t[s + 2] = t[s + 1];
                case 1:
                    t[s + 1] = t[s];
                    break;
                default:
                    for (; l > 0;)t[s + l] = t[s + l - 1], l--
            }
            t[s] = o
        }
    }

    function n(t, e, r, i, n, a) {
        var o = 0, s = 0, h = 1;
        if (a(t, e[r + n]) > 0) {
            for (s = i - n; s > h && a(t, e[r + n + h]) > 0;)o = h, h = (h << 1) + 1, 0 >= h && (h = s);
            h > s && (h = s), o += n, h += n
        } else {
            for (s = n + 1; s > h && a(t, e[r + n - h]) <= 0;)o = h, h = (h << 1) + 1, 0 >= h && (h = s);
            h > s && (h = s);
            var l = o;
            o = n - h, h = n - l
        }
        for (o++; h > o;) {
            var u = o + (h - o >>> 1);
            a(t, e[r + u]) > 0 ? o = u + 1 : h = u
        }
        return h
    }

    function a(t, e, r, i, n, a) {
        var o = 0, s = 0, h = 1;
        if (a(t, e[r + n]) < 0) {
            for (s = n + 1; s > h && a(t, e[r + n - h]) < 0;)o = h, h = (h << 1) + 1, 0 >= h && (h = s);
            h > s && (h = s);
            var l = o;
            o = n - h, h = n - l
        } else {
            for (s = i - n; s > h && a(t, e[r + n + h]) >= 0;)o = h, h = (h << 1) + 1, 0 >= h && (h = s);
            h > s && (h = s), o += n, h += n
        }
        for (o++; h > o;) {
            var u = o + (h - o >>> 1);
            a(t, e[r + u]) < 0 ? h = u : o = u + 1
        }
        return h
    }

    function o(t, e) {
        function r(t, e) {
            f[_] = t, d[_] = e, _ += 1
        }

        function i() {
            for (; _ > 1;) {
                var t = _ - 2;
                if (t >= 1 && d[t - 1] <= d[t] + d[t + 1] || t >= 2 && d[t - 2] <= d[t] + d[t - 1])d[t - 1] < d[t + 1] && t--; else if (d[t] > d[t + 1])break;
                s(t)
            }
        }

        function o() {
            for (; _ > 1;) {
                var t = _ - 2;
                t > 0 && d[t - 1] < d[t + 1] && t--, s(t)
            }
        }

        function s(r) {
            var i = f[r], o = d[r], s = f[r + 1], l = d[r + 1];
            d[r] = o + l, r === _ - 3 && (f[r + 1] = f[r + 2], d[r + 1] = d[r + 2]), _--;
            var u = a(t[s], t, i, o, 0, e);
            i += u, o -= u, 0 !== o && (l = n(t[i + o - 1], t, s, l, l - 1, e), 0 !== l && (l >= o ? h(i, o, s, l) : c(i, o, s, l)))
        }

        function h(r, i, o, s) {
            var h = 0;
            for (h = 0; i > h; h++)y[h] = t[r + h];
            var u = 0, c = o, f = r;
            if (t[f++] = t[c++], 0 !== --s) {
                if (1 === i) {
                    for (h = 0; s > h; h++)t[f + h] = t[c + h];
                    return void(t[f + s] = y[u])
                }
                for (var d, v, g, m = p; ;) {
                    d = 0, v = 0, g = !1;
                    do if (e(t[c], y[u]) < 0) {
                        if (t[f++] = t[c++], v++, d = 0, 0 === --s) {
                            g = !0;
                            break
                        }
                    } else if (t[f++] = y[u++], d++, v = 0, 1 === --i) {
                        g = !0;
                        break
                    } while (m > (d | v));
                    if (g)break;
                    do {
                        if (d = a(t[c], y, u, i, 0, e), 0 !== d) {
                            for (h = 0; d > h; h++)t[f + h] = y[u + h];
                            if (f += d, u += d, i -= d, 1 >= i) {
                                g = !0;
                                break
                            }
                        }
                        if (t[f++] = t[c++], 0 === --s) {
                            g = !0;
                            break
                        }
                        if (v = n(y[u], t, c, s, 0, e), 0 !== v) {
                            for (h = 0; v > h; h++)t[f + h] = t[c + h];
                            if (f += v, c += v, s -= v, 0 === s) {
                                g = !0;
                                break
                            }
                        }
                        if (t[f++] = y[u++], 1 === --i) {
                            g = !0;
                            break
                        }
                        m--
                    } while (d >= l || v >= l);
                    if (g)break;
                    0 > m && (m = 0), m += 2
                }
                if (p = m, 1 > p && (p = 1), 1 === i) {
                    for (h = 0; s > h; h++)t[f + h] = t[c + h];
                    t[f + s] = y[u]
                } else {
                    if (0 === i)throw new Error;
                    for (h = 0; i > h; h++)t[f + h] = y[u + h]
                }
            } else for (h = 0; i > h; h++)t[f + h] = y[u + h]
        }

        function c(r, i, o, s) {
            var h = 0;
            for (h = 0; s > h; h++)y[h] = t[o + h];
            var u = r + i - 1, c = s - 1, f = o + s - 1, d = 0, v = 0;
            if (t[f--] = t[u--], 0 !== --i) {
                if (1 === s) {
                    for (f -= i, u -= i, v = f + 1, d = u + 1, h = i - 1; h >= 0; h--)t[v + h] = t[d + h];
                    return void(t[f] = y[c])
                }
                for (var g = p; ;) {
                    var m = 0, _ = 0, x = !1;
                    do if (e(y[c], t[u]) < 0) {
                        if (t[f--] = t[u--], m++, _ = 0, 0 === --i) {
                            x = !0;
                            break
                        }
                    } else if (t[f--] = y[c--], _++, m = 0, 1 === --s) {
                        x = !0;
                        break
                    } while (g > (m | _));
                    if (x)break;
                    do {
                        if (m = i - a(y[c], t, r, i, i - 1, e), 0 !== m) {
                            for (f -= m, u -= m, i -= m, v = f + 1, d = u + 1, h = m - 1; h >= 0; h--)t[v + h] = t[d + h];
                            if (0 === i) {
                                x = !0;
                                break
                            }
                        }
                        if (t[f--] = y[c--], 1 === --s) {
                            x = !0;
                            break
                        }
                        if (_ = s - n(t[u], y, 0, s, s - 1, e), 0 !== _) {
                            for (f -= _, c -= _, s -= _, v = f + 1, d = c + 1, h = 0; _ > h; h++)t[v + h] = y[d + h];
                            if (1 >= s) {
                                x = !0;
                                break
                            }
                        }
                        if (t[f--] = t[u--], 0 === --i) {
                            x = !0;
                            break
                        }
                        g--
                    } while (m >= l || _ >= l);
                    if (x)break;
                    0 > g && (g = 0), g += 2
                }
                if (p = g, 1 > p && (p = 1), 1 === s) {
                    for (f -= i, u -= i, v = f + 1, d = u + 1, h = i - 1; h >= 0; h--)t[v + h] = t[d + h];
                    t[f] = y[c]
                } else {
                    if (0 === s)throw new Error;
                    for (d = f - (s - 1), h = 0; s > h; h++)t[d + h] = y[h]
                }
            } else for (d = f - (s - 1), h = 0; s > h; h++)t[d + h] = y[h]
        }

        var f, d, p = l, v = 0, g = u, m = 0, _ = 0;
        v = t.length, 2 * u > v && (g = v >>> 1);
        var y = [];
        m = 120 > v ? 5 : 1542 > v ? 10 : 119151 > v ? 19 : 40, f = [], d = [], this.mergeRuns = i, this.forceMergeRuns = o, this.pushRun = r
    }

    function s(r, n, a, s) {
        a || (a = 0), s || (s = r.length);
        var l = s - a;
        if (!(2 > l)) {
            var u = 0;
            if (h > l)return u = e(r, a, s, n), void i(r, a, s, a + u, n);
            var c = new o(r, n), f = t(l);
            do {
                if (u = e(r, a, s, n), f > u) {
                    var d = l;
                    d > f && (d = f), i(r, a, a + d, a + u, n), u = d
                }
                c.pushRun(a, u), c.mergeRuns(), l -= u, a += u
            } while (0 !== l);
            c.forceMergeRuns()
        }
    }

    var h = 32, l = 7, u = 256;
    return s
}), define("zrender/Storage", ["require", "./core/util", "./core/env", "./container/Group", "./core/timsort"], function (t) {
    function e(t, e) {
        return t.zlevel === e.zlevel ? t.z === e.z ? t.z2 - e.z2 : t.z - e.z : t.zlevel - e.zlevel
    }

    var r = t("./core/util"), i = t("./core/env"), n = t("./container/Group"), a = t("./core/timsort"), o = function () {
        this._roots = [], this._displayList = [], this._displayListLen = 0
    };
    return o.prototype = {
        constructor: o, traverse: function (t, e) {
            for (var r = 0; r < this._roots.length; r++)this._roots[r].traverse(t, e)
        }, getDisplayList: function (t, e) {
            return e = e || !1, t && this.updateDisplayList(e), this._displayList
        }, updateDisplayList: function (t) {
            this._displayListLen = 0;
            for (var r = this._roots, n = this._displayList, o = 0, s = r.length; s > o; o++)this._updateAndAddDisplayable(r[o], null, t);
            n.length = this._displayListLen, i.canvasSupported && a(n, e)
        }, _updateAndAddDisplayable: function (t, e, r) {
            if (!t.ignore || r) {
                t.beforeUpdate(), t.__dirty && t.update(), t.afterUpdate();
                var i = t.clipPath;
                if (i) {
                    e = e ? e.slice() : [];
                    for (var n = i, a = t; n;)n.parent = a, n.updateTransform(), e.push(n), a = n, n = n.clipPath
                }
                if (t.isGroup) {
                    for (var o = t._children, s = 0; s < o.length; s++) {
                        var h = o[s];
                        t.__dirty && (h.__dirty = !0), this._updateAndAddDisplayable(h, e, r)
                    }
                    t.__dirty = !1
                } else t.__clipPaths = e, this._displayList[this._displayListLen++] = t
            }
        }, addRoot: function (t) {
            t.__storage !== this && (t instanceof n && t.addChildrenToStorage(this), this.addToStorage(t), this._roots.push(t))
        }, delRoot: function (t) {
            if (null == t) {
                for (var e = 0; e < this._roots.length; e++) {
                    var i = this._roots[e];
                    i instanceof n && i.delChildrenFromStorage(this)
                }
                return this._roots = [], this._displayList = [], void(this._displayListLen = 0)
            }
            if (t instanceof Array)for (var e = 0, a = t.length; a > e; e++)this.delRoot(t[e]); else {
                var o = r.indexOf(this._roots, t);
                o >= 0 && (this.delFromStorage(t), this._roots.splice(o, 1), t instanceof n && t.delChildrenFromStorage(this))
            }
        }, addToStorage: function (t) {
            return t.__storage = this, t.dirty(!1), this
        }, delFromStorage: function (t) {
            return t && (t.__storage = null), this
        }, dispose: function () {
            this._renderList = this._roots = null
        }, displayableSortFunc: e
    }, o
}), define("zrender/core/event", ["require", "../mixin/Eventful", "./env"], function (t) {
    function e(t) {
        return t.getBoundingClientRect ? t.getBoundingClientRect() : {left: 0, top: 0}
    }

    function r(t, e, r, n) {
        return r = r || {}, n || !h.canvasSupported ? i(t, e, r) : h.browser.firefox && null != e.layerX && e.layerX !== e.offsetX ? (r.zrX = e.layerX, r.zrY = e.layerY) : null != e.offsetX ? (r.zrX = e.offsetX, r.zrY = e.offsetY) : i(t, e, r), r
    }

    function i(t, r, i) {
        var n = e(t);
        i.zrX = r.clientX - n.left, i.zrY = r.clientY - n.top
    }

    function n(t, e, i) {
        if (e = e || window.event, null != e.zrX)return e;
        var n = e.type, a = n && n.indexOf("touch") >= 0;
        if (a) {
            var o = "touchend" != n ? e.targetTouches[0] : e.changedTouches[0];
            o && r(t, o, e, i)
        } else r(t, e, e, i), e.zrDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
        return e
    }

    function a(t, e, r) {
        l ? t.addEventListener(e, r) : t.attachEvent("on" + e, r)
    }

    function o(t, e, r) {
        l ? t.removeEventListener(e, r) : t.detachEvent("on" + e, r)
    }

    var s = t("../mixin/Eventful"), h = t("./env"), l = "undefined" != typeof window && !!window.addEventListener, u = l ? function (t) {
        t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0
    } : function (t) {
        t.returnValue = !1, t.cancelBubble = !0
    };
    return {clientToLocal: r, normalizeEvent: n, addEventListener: a, removeEventListener: o, stop: u, Dispatcher: s}
}), define("zrender/animation/requestAnimationFrame", ["require"], function () {
    return "undefined" != typeof window && (window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function (t) {
            setTimeout(t, 16)
        }
}), define("zrender/animation/Animation", ["require", "../core/util", "../core/event", "./requestAnimationFrame", "./Animator"], function (t) {
    var e = t("../core/util"), r = t("../core/event").Dispatcher, i = t("./requestAnimationFrame"), n = t("./Animator"), a = function (t) {
        t = t || {}, this.stage = t.stage || {}, this.onframe = t.onframe || function () {
            }, this._clips = [], this._running = !1, this._time, this._pausedTime, this._pauseStart, this._paused = !1, r.call(this)
    };
    return a.prototype = {
        constructor: a, addClip: function (t) {
            this._clips.push(t)
        }, addAnimator: function (t) {
            t.animation = this;
            for (var e = t.getClips(), r = 0; r < e.length; r++)this.addClip(e[r])
        }, removeClip: function (t) {
            var r = e.indexOf(this._clips, t);
            r >= 0 && this._clips.splice(r, 1)
        }, removeAnimator: function (t) {
            for (var e = t.getClips(), r = 0; r < e.length; r++)this.removeClip(e[r]);
            t.animation = null
        }, _update: function () {
            for (var t = (new Date).getTime() - this._pausedTime, e = t - this._time, r = this._clips, i = r.length, n = [], a = [], o = 0; i > o; o++) {
                var s = r[o], h = s.step(t, e);
                h && (n.push(h), a.push(s))
            }
            for (var o = 0; i > o;)r[o]._needsRemove ? (r[o] = r[i - 1], r.pop(), i--) : o++;
            i = n.length;
            for (var o = 0; i > o; o++)a[o].fire(n[o]);
            this._time = t, this.onframe(e), this.trigger("frame", e), this.stage.update && this.stage.update()
        }, _startLoop: function () {
            function t() {
                e._running && (i(t), !e._paused && e._update())
            }

            var e = this;
            this._running = !0, i(t)
        }, start: function () {
            this._time = (new Date).getTime(), this._pausedTime = 0, this._startLoop()
        }, stop: function () {
            this._running = !1
        }, pause: function () {
            this._paused || (this._pauseStart = (new Date).getTime(), this._paused = !0)
        }, resume: function () {
            this._paused && (this._pausedTime += (new Date).getTime() - this._pauseStart, this._paused = !1)
        }, clear: function () {
            this._clips = []
        }, animate: function (t, e) {
            e = e || {};
            var r = new n(t, e.loop, e.getter, e.setter);
            return this.addAnimator(r), r
        }
    }, e.mixin(a, r), a
}), define("zrender/core/GestureMgr", ["require", "./event"], function (t) {
    function e(t) {
        var e = t[1][0] - t[0][0], r = t[1][1] - t[0][1];
        return Math.sqrt(e * e + r * r)
    }

    function r(t) {
        return [(t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2]
    }

    var i = t("./event"), n = function () {
        this._track = []
    };
    n.prototype = {
        constructor: n, recognize: function (t, e, r) {
            return this._doTrack(t, e, r), this._recognize(t)
        }, clear: function () {
            return this._track.length = 0, this
        }, _doTrack: function (t, e, r) {
            var n = t.touches;
            if (n) {
                for (var a = {points: [], touches: [], target: e, event: t}, o = 0, s = n.length; s > o; o++) {
                    var h = n[o], l = i.clientToLocal(r, h, {});
                    a.points.push([l.zrX, l.zrY]), a.touches.push(h)
                }
                this._track.push(a)
            }
        }, _recognize: function (t) {
            for (var e in a)if (a.hasOwnProperty(e)) {
                var r = a[e](this._track, t);
                if (r)return r
            }
        }
    };
    var a = {
        pinch: function (t, i) {
            var n = t.length;
            if (n) {
                var a = (t[n - 1] || {}).points, o = (t[n - 2] || {}).points || a;
                if (o && o.length > 1 && a && a.length > 1) {
                    var s = e(a) / e(o);
                    !isFinite(s) && (s = 1), i.pinchScale = s;
                    var h = r(a);
                    return i.pinchX = h[0], i.pinchY = h[1], {type: "pinch", target: t[0].target, event: i}
                }
            }
        }
    };
    return n
}), define("zrender/dom/HandlerProxy", ["require", "../core/event", "../core/util", "../mixin/Eventful", "../core/env", "../core/GestureMgr"], function (t) {
    function e(t) {
        return "mousewheel" === t && u.browser.firefox ? "DOMMouseScroll" : t
    }

    function r(t, e, r) {
        var i = t._gestureMgr;
        "start" === r && i.clear();
        var n = i.recognize(e, t.handler.findHover(e.zrX, e.zrY, null).target, t.dom);
        if ("end" === r && i.clear(), n) {
            var a = n.type;
            e.gestureEvent = a, t.handler.dispatchToElement({target: n.target}, a, n.event)
        }
    }

    function i(t) {
        t._touching = !0, clearTimeout(t._touchTimer), t._touchTimer = setTimeout(function () {
            t._touching = !1
        }, 700)
    }

    function n(t) {
        var e = t.pointerType;
        return "pen" === e || "touch" === e
    }

    function a(t) {
        function e(t, e) {
            return function () {
                return e._touching ? void 0 : t.apply(e, arguments)
            }
        }

        h.each(m, function (e) {
            t._handlers[e] = h.bind(x[e], t)
        }), h.each(y, function (e) {
            t._handlers[e] = h.bind(x[e], t)
        }), h.each(g, function (r) {
            t._handlers[r] = e(x[r], t)
        })
    }

    function o(t) {
        function r(r, i) {
            h.each(r, function (r) {
                f(t, e(r), i._handlers[r])
            }, i)
        }

        l.call(this), this.dom = t, this._touching = !1, this._touchTimer, this._gestureMgr = new c, this._handlers = {}, a(this), u.pointerEventsSupported ? r(y, this) : (u.touchEventsSupported && r(m, this), r(g, this))
    }

    var s = t("../core/event"), h = t("../core/util"), l = t("../mixin/Eventful"), u = t("../core/env"), c = t("../core/GestureMgr"), f = s.addEventListener, d = s.removeEventListener, p = s.normalizeEvent, v = 300, g = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"], m = ["touchstart", "touchend", "touchmove"], _ = {
        pointerdown: 1,
        pointerup: 1,
        pointermove: 1,
        pointerout: 1
    }, y = h.map(g, function (t) {
        var e = t.replace("mouse", "pointer");
        return _[e] ? e : t
    }), x = {
        mousemove: function (t) {
            t = p(this.dom, t), this.trigger("mousemove", t)
        }, mouseout: function (t) {
            t = p(this.dom, t);
            var e = t.toElement || t.relatedTarget;
            if (e != this.dom)for (; e && 9 != e.nodeType;) {
                if (e === this.dom)return;
                e = e.parentNode
            }
            this.trigger("mouseout", t)
        }, touchstart: function (t) {
            t = p(this.dom, t), t.zrByTouch = !0, this._lastTouchMoment = new Date, r(this, t, "start"), x.mousemove.call(this, t), x.mousedown.call(this, t), i(this)
        }, touchmove: function (t) {
            t = p(this.dom, t), t.zrByTouch = !0, r(this, t, "change"), x.mousemove.call(this, t), i(this)
        }, touchend: function (t) {
            t = p(this.dom, t), t.zrByTouch = !0, r(this, t, "end"), x.mouseup.call(this, t), +new Date - this._lastTouchMoment < v && x.click.call(this, t), i(this)
        }, pointerdown: function (t) {
            x.mousedown.call(this, t)
        }, pointermove: function (t) {
            n(t) || x.mousemove.call(this, t)
        }, pointerup: function (t) {
            x.mouseup.call(this, t)
        }, pointerout: function (t) {
            n(t) || x.mouseout.call(this, t)
        }
    };
    h.each(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function (t) {
        x[t] = function (e) {
            e = p(this.dom, e), this.trigger(t, e)
        }
    });
    var b = o.prototype;
    return b.dispose = function () {
        for (var t = g.concat(m), r = 0; r < t.length; r++) {
            var i = t[r];
            d(this.dom, e(i), this._handlers[i])
        }
    }, b.setCursor = function (t) {
        this.dom.style.cursor = t || "default"
    }, h.mixin(o, l), o
}), define("zrender/graphic/Style", ["require"], function () {
    function t(t, e, r) {
        var i = null == e.x ? 0 : e.x, n = null == e.x2 ? 1 : e.x2, a = null == e.y ? 0 : e.y, o = null == e.y2 ? 0 : e.y2;
        e.global || (i = i * r.width + r.x, n = n * r.width + r.x, a = a * r.height + r.y, o = o * r.height + r.y);
        var s = t.createLinearGradient(i, a, n, o);
        return s
    }

    function e(t, e, r) {
        var i = r.width, n = r.height, a = Math.min(i, n), o = null == e.x ? .5 : e.x, s = null == e.y ? .5 : e.y, h = null == e.r ? .5 : e.r;
        e.global || (o = o * i + r.x, s = s * n + r.y, h *= a);
        var l = t.createRadialGradient(o, s, 0, o, s, h);
        return l
    }

    var r = [["shadowBlur", 0], ["shadowOffsetX", 0], ["shadowOffsetY", 0], ["shadowColor", "#000"], ["lineCap", "butt"], ["lineJoin", "miter"], ["miterLimit", 10]], i = function (t) {
        this.extendFrom(t)
    };
    i.prototype = {
        constructor: i,
        fill: "#000000",
        stroke: null,
        opacity: 1,
        lineDash: null,
        lineDashOffset: 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        lineWidth: 1,
        strokeNoScale: !1,
        text: null,
        textFill: "#000",
        textStroke: null,
        textPosition: "inside",
        textOffset: null,
        textBaseline: null,
        textAlign: null,
        textVerticalAlign: null,
        textDistance: 5,
        textShadowBlur: 0,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
        textTransform: !1,
        textRotation: 0,
        blend: null,
        bind: function (t, e, i) {
            for (var n = this, a = i && i.style, o = !a, s = 0; s < r.length; s++) {
                var h = r[s], l = h[0];
                (o || n[l] !== a[l]) && (t[l] = n[l] || h[1])
            }
            if ((o || n.fill !== a.fill) && (t.fillStyle = n.fill), (o || n.stroke !== a.stroke) && (t.strokeStyle = n.stroke), (o || n.opacity !== a.opacity) && (t.globalAlpha = null == n.opacity ? 1 : n.opacity), (o || n.blend !== a.blend) && (t.globalCompositeOperation = n.blend || "source-over"), this.hasStroke()) {
                var u = n.lineWidth;
                t.lineWidth = u / (this.strokeNoScale && e && e.getLineScale ? e.getLineScale() : 1)
            }
        },
        hasFill: function () {
            var t = this.fill;
            return null != t && "none" !== t
        },
        hasStroke: function () {
            var t = this.stroke;
            return null != t && "none" !== t && this.lineWidth > 0
        },
        extendFrom: function (t, e) {
            if (t) {
                var r = this;
                for (var i in t)!t.hasOwnProperty(i) || !e && r.hasOwnProperty(i) || (r[i] = t[i])
            }
        },
        set: function (t, e) {
            "string" == typeof t ? this[t] = e : this.extendFrom(t, !0)
        },
        clone: function () {
            var t = new this.constructor;
            return t.extendFrom(this, !0), t
        },
        getGradient: function (r, i, n) {
            for (var a = "radial" === i.type ? e : t, o = a(r, i, n), s = i.colorStops, h = 0; h < s.length; h++)o.addColorStop(s[h].offset, s[h].color);
            return o
        }
    };
    for (var n = i.prototype, a = 0; a < r.length; a++) {
        var o = r[a];
        o[0] in n || (n[o[0]] = o[1])
    }
    return i.getGradient = n.getGradient, i
}), define("zrender/graphic/Pattern", ["require"], function () {
    var t = function (t, e) {
        this.image = t, this.repeat = e, this.type = "pattern"
    };
    return t.prototype.getCanvasPattern = function (t) {
        return t.createPattern(this.image, this.repeat || "repeat")
    }, t
}), define("zrender/Layer", ["require", "./core/util", "./config", "./graphic/Style", "./graphic/Pattern"], function (t) {
    function e() {
        return !1
    }

    function r(t, e, r, i) {
        var n = document.createElement(e), a = r.getWidth(), o = r.getHeight(), s = n.style;
        return s.position = "absolute", s.left = 0, s.top = 0, s.width = a + "px", s.height = o + "px", n.width = a * i, n.height = o * i, n.setAttribute("data-zr-dom-id", t), n
    }

    var i = t("./core/util"), n = t("./config"), a = t("./graphic/Style"), o = t("./graphic/Pattern"), s = function (t, a, o) {
        var s;
        o = o || n.devicePixelRatio, "string" == typeof t ? s = r(t, "canvas", a, o) : i.isObject(t) && (s = t, t = s.id), this.id = t, this.dom = s;
        var h = s.style;
        h && (s.onselectstart = e, h["-webkit-user-select"] = "none", h["user-select"] = "none", h["-webkit-touch-callout"] = "none", h["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)", h.padding = 0, h.margin = 0, h["border-width"] = 0), this.domBack = null, this.ctxBack = null, this.painter = a, this.config = null, this.clearColor = 0, this.motionBlur = !1, this.lastFrameAlpha = .7, this.dpr = o
    };
    return s.prototype = {
        constructor: s, elCount: 0, __dirty: !0, initContext: function () {
            this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr
        }, createBackBuffer: function () {
            var t = this.dpr;
            this.domBack = r("back-" + this.id, "canvas", this.painter, t), this.ctxBack = this.domBack.getContext("2d"), 1 != t && this.ctxBack.scale(t, t)
        }, resize: function (t, e) {
            var r = this.dpr, i = this.dom, n = i.style, a = this.domBack;
            n.width = t + "px", n.height = e + "px", i.width = t * r, i.height = e * r, a && (a.width = t * r, a.height = e * r, 1 != r && this.ctxBack.scale(r, r))
        }, clear: function (t) {
            var e = this.dom, r = this.ctx, i = e.width, n = e.height, s = this.clearColor, h = this.motionBlur && !t, l = this.lastFrameAlpha, u = this.dpr;
            if (h && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(e, 0, 0, i / u, n / u)), r.clearRect(0, 0, i, n), s) {
                var c;
                s.colorStops ? (c = s.__canvasGradient || a.getGradient(r, s, {
                        x: 0,
                        y: 0,
                        width: i,
                        height: n
                    }), s.__canvasGradient = c) : s.image && (c = o.prototype.getCanvasPattern.call(s, r)), r.save(), r.fillStyle = c || s, r.fillRect(0, 0, i, n), r.restore()
            }
            if (h) {
                var f = this.domBack;
                r.save(), r.globalAlpha = l, r.drawImage(f, 0, 0, i, n), r.restore()
            }
        }
    }, s
}), define("zrender/contain/text", ["require", "../core/util", "../core/BoundingRect"], function (t) {
    function e(t, e) {
        var r = t + ":" + e;
        if (o[r])return o[r];
        for (var i = (t + "").split("\n"), n = 0, a = 0, l = i.length; l > a; a++)n = Math.max(f.measureText(i[a], e).width, n);
        return s > h && (s = 0, o = {}), s++, o[r] = n, n
    }

    function r(t, r, i, n) {
        var a = ((t || "") + "").split("\n").length, o = e(t, r), s = e("国", r), h = a * s, l = new u(0, 0, o, h);
        switch (l.lineHeight = s, n) {
            case"bottom":
            case"alphabetic":
                l.y -= s;
                break;
            case"middle":
                l.y -= s / 2
        }
        switch (i) {
            case"end":
            case"right":
                l.x -= l.width;
                break;
            case"center":
                l.x -= l.width / 2
        }
        return l
    }

    function i(t, e, r, i) {
        var n = e.x, a = e.y, o = e.height, s = e.width, h = r.height, l = r.lineHeight, u = o / 2 - h / 2 + l, c = "left";
        switch (t) {
            case"left":
                n -= i, a += u, c = "right";
                break;
            case"right":
                n += i + s, a += u, c = "left";
                break;
            case"top":
                n += s / 2, a -= i + h - l, c = "center";
                break;
            case"bottom":
                n += s / 2, a += o + i + l, c = "center";
                break;
            case"inside":
                n += s / 2, a += u, c = "center";
                break;
            case"insideLeft":
                n += i, a += u, c = "left";
                break;
            case"insideRight":
                n += s - i, a += u, c = "right";
                break;
            case"insideTop":
                n += s / 2, a += i + l, c = "center";
                break;
            case"insideBottom":
                n += s / 2, a += o - h - i + l, c = "center";
                break;
            case"insideTopLeft":
                n += i, a += i + l, c = "left";
                break;
            case"insideTopRight":
                n += s - i, a += i + l, c = "right";
                break;
            case"insideBottomLeft":
                n += i, a += o - h - i + l;
                break;
            case"insideBottomRight":
                n += s - i, a += o - h - i + l, c = "right"
        }
        return {x: n, y: a, textAlign: c, textBaseline: "alphabetic"}
    }

    function n(t, r, i, n, o) {
        if (!r)return "";
        o = o || {}, n = c(n, "...");
        for (var s = c(o.maxIterations, 2), h = c(o.minChar, 0), l = e("国", i), u = e("a", i), f = c(o.placeholder, ""), d = r = Math.max(0, r - 1), p = 0; h > p && d >= u; p++)d -= u;
        var v = e(n);
        v > d && (n = "", v = 0), d = r - v;
        for (var g = (t + "").split("\n"), p = 0, m = g.length; m > p; p++) {
            var _ = g[p], y = e(_, i);
            if (!(r >= y)) {
                for (var x = 0; ; x++) {
                    if (d >= y || x >= s) {
                        _ += n;
                        break
                    }
                    var b = 0 === x ? a(_, d, u, l) : y > 0 ? Math.floor(_.length * d / y) : 0;
                    _ = _.substr(0, b), y = e(_, i)
                }
                "" === _ && (_ = f), g[p] = _
            }
        }
        return g.join("\n")
    }

    function a(t, e, r, i) {
        for (var n = 0, a = 0, o = t.length; o > a && e > n; a++) {
            var s = t.charCodeAt(a);
            n += s >= 0 && 127 >= s ? r : i
        }
        return a
    }

    var o = {}, s = 0, h = 5e3, l = t("../core/util"), u = t("../core/BoundingRect"), c = l.retrieve, f = {
        getWidth: e,
        getBoundingRect: r,
        adjustTextPositionOnRect: i,
        truncateText: n,
        measureText: function (t, e) {
            var r = l.getContext();
            return r.font = e || "12px sans-serif", r.measureText(t)
        }
    };
    return f
}), define("zrender/graphic/mixin/RectText", ["require", "../../contain/text", "../../core/BoundingRect"], function (t) {
    function e(t, e) {
        return "string" == typeof t ? t.lastIndexOf("%") >= 0 ? parseFloat(t) / 100 * e : parseFloat(t) : t
    }

    var r = t("../../contain/text"), i = t("../../core/BoundingRect"), n = new i, a = function () {
    };
    return a.prototype = {
        constructor: a, drawRectText: function (t, i, a) {
            var o = this.style, s = o.text;
            if (null != s && (s += ""), s) {
                t.save();
                var h, l, u = o.textPosition, c = o.textOffset, f = o.textDistance, d = o.textAlign, p = o.textFont || o.font, v = o.textBaseline, g = o.textVerticalAlign;
                a = a || r.getBoundingRect(s, p, d, v);
                var m = this.transform;
                if (o.textTransform ? this.setTransform(t) : m && (n.copy(i), n.applyTransform(m), i = n), u instanceof Array) {
                    if (h = i.x + e(u[0], i.width), l = i.y + e(u[1], i.height), d = d || "left", v = v || "top", g) {
                        switch (g) {
                            case"middle":
                                l -= a.height / 2 - a.lineHeight / 2;
                                break;
                            case"bottom":
                                l -= a.height - a.lineHeight / 2;
                                break;
                            default:
                                l += a.lineHeight / 2
                        }
                        v = "middle"
                    }
                } else {
                    var _ = r.adjustTextPositionOnRect(u, i, a, f);
                    h = _.x, l = _.y, d = d || _.textAlign, v = v || _.textBaseline
                }
                c && (h += c[0], l += c[1]), t.textAlign = d || "left", t.textBaseline = v || "alphabetic";
                var y = o.textFill, x = o.textStroke;
                y && (t.fillStyle = y), x && (t.strokeStyle = x), t.font = p || "12px sans-serif", t.shadowBlur = o.textShadowBlur, t.shadowColor = o.textShadowColor || "transparent", t.shadowOffsetX = o.textShadowOffsetX, t.shadowOffsetY = o.textShadowOffsetY;
                var b = s.split("\n");
                o.textRotation && (m && t.translate(m[4], m[5]), t.rotate(o.textRotation), m && t.translate(-m[4], -m[5]));
                for (var w = 0; w < b.length; w++)x && t.strokeText(b[w], h, l), y && t.fillText(b[w], h, l), l += a.lineHeight;
                t.restore()
            }
        }
    }, a
}), define("zrender/graphic/Displayable", ["require", "../core/util", "./Style", "../Element", "./mixin/RectText"], function (t) {
    function e(t) {
        t = t || {}, n.call(this, t);
        for (var e in t)t.hasOwnProperty(e) && "style" !== e && (this[e] = t[e]);
        this.style = new i(t.style), this._rect = null, this.__clipPaths = []
    }

    var r = t("../core/util"), i = t("./Style"), n = t("../Element"), a = t("./mixin/RectText");
    return e.prototype = {
        constructor: e,
        type: "displayable",
        __dirty: !0,
        invisible: !1,
        z: 0,
        z2: 0,
        zlevel: 0,
        draggable: !1,
        dragging: !1,
        silent: !1,
        culling: !1,
        cursor: "pointer",
        rectHover: !1,
        progressive: -1,
        beforeBrush: function () {
        },
        afterBrush: function () {
        },
        brush: function () {
        },
        getBoundingRect: function () {
        },
        contain: function (t, e) {
            return this.rectContain(t, e)
        },
        traverse: function (t, e) {
            t.call(e, this)
        },
        rectContain: function (t, e) {
            var r = this.transformCoordToLocal(t, e), i = this.getBoundingRect();
            return i.contain(r[0], r[1])
        },
        dirty: function () {
            this.__dirty = !0, this._rect = null, this.__zr && this.__zr.refresh()
        },
        animateStyle: function (t) {
            return this.animate("style", t)
        },
        attrKV: function (t, e) {
            "style" !== t ? n.prototype.attrKV.call(this, t, e) : this.style.set(e)
        },
        setStyle: function (t, e) {
            return this.style.set(t, e), this.dirty(!1), this
        },
        useStyle: function (t) {
            return this.style = new i(t), this.dirty(!1), this
        }
    }, r.inherits(e, n), r.mixin(e, a), e
}), define("zrender/graphic/Image", ["require", "./Displayable", "../core/BoundingRect", "../core/util", "../core/LRU"], function (t) {
    function e(t) {
        r.call(this, t)
    }

    var r = t("./Displayable"), i = t("../core/BoundingRect"), n = t("../core/util"), a = t("../core/LRU"), o = new a(50);
    return e.prototype = {
        constructor: e, type: "image", brush: function (t, e) {
            var r, i = this.style, n = i.image;
            if (i.bind(t, this, e), r = "string" == typeof n ? this._image : n, !r && n) {
                var a = o.get(n);
                if (!a)return r = new Image, r.onload = function () {
                    r.onload = null;
                    for (var t = 0; t < a.pending.length; t++)a.pending[t].dirty()
                }, a = {image: r, pending: [this]}, r.src = n, o.put(n, a), void(this._image = r);
                if (r = a.image, this._image = r, !r.width || !r.height)return void a.pending.push(this)
            }
            if (r) {
                var s = i.x || 0, h = i.y || 0;
                if (!r.width || !r.height)return;
                var l = i.width, u = i.height, c = r.width / r.height;
                if (null == l && null != u ? l = u * c : null == u && null != l ? u = l / c : null == l && null == u && (l = r.width, u = r.height), this.setTransform(t), i.sWidth && i.sHeight) {
                    var f = i.sx || 0, d = i.sy || 0;
                    t.drawImage(r, f, d, i.sWidth, i.sHeight, s, h, l, u)
                } else if (i.sx && i.sy) {
                    var f = i.sx, d = i.sy, p = l - f, v = u - d;
                    t.drawImage(r, f, d, p, v, s, h, l, u)
                } else t.drawImage(r, s, h, l, u);
                this.restoreTransform(t), null != i.text && this.drawRectText(t, this.getBoundingRect())
            }
        }, getBoundingRect: function () {
            var t = this.style;
            return this._rect || (this._rect = new i(t.x || 0, t.y || 0, t.width || 0, t.height || 0)), this._rect
        }
    }, n.inherits(e, r), e
}), define("zrender/Painter", ["require", "./config", "./core/util", "./core/log", "./core/BoundingRect", "./core/timsort", "./Layer", "./animation/requestAnimationFrame", "./graphic/Image"], function (t) {
    function e(t) {
        return parseInt(t, 10)
    }

    function r(t) {
        return t ? t.__builtin__ ? !0 : "function" != typeof t.resize || "function" != typeof t.refresh ? !1 : !0 : !1
    }

    function i(t) {
        t.__unusedCount++
    }

    function n(t) {
        1 == t.__unusedCount && t.clear()
    }

    function a(t, e, r) {
        return m.copy(t.getBoundingRect()), t.transform && m.applyTransform(t.transform), _.width = e, _.height = r, !m.intersect(_)
    }

    function o(t, e) {
        if (t == e)return !1;
        if (!t || !e || t.length !== e.length)return !0;
        for (var r = 0; r < t.length; r++)if (t[r] !== e[r])return !0
    }

    function s(t, e) {
        for (var r = 0; r < t.length; r++) {
            var i = t[r];
            i.setTransform(e), e.beginPath(), i.buildPath(e, i.shape), e.clip(), i.restoreTransform(e)
        }
    }

    function h(t, e) {
        var r = document.createElement("div");
        return r.style.cssText = ["position:relative", "overflow:hidden", "width:" + t + "px", "height:" + e + "px", "padding:0", "margin:0", "border-width:0"].join(";") + ";", r
    }

    var l = t("./config"), u = t("./core/util"), c = t("./core/log"), f = t("./core/BoundingRect"), d = t("./core/timsort"), p = t("./Layer"), v = t("./animation/requestAnimationFrame"), g = 5, m = new f(0, 0, 0, 0), _ = new f(0, 0, 0, 0), y = function (t, e, r) {
        var i = !t.nodeName || "CANVAS" === t.nodeName.toUpperCase();
        this._opts = r = u.extend({}, r || {}), this.dpr = r.devicePixelRatio || l.devicePixelRatio, this._singleCanvas = i, this.root = t;
        var n = t.style;
        n && (n["-webkit-tap-highlight-color"] = "transparent", n["-webkit-user-select"] = n["user-select"] = n["-webkit-touch-callout"] = "none", t.innerHTML = ""), this.storage = e;
        var a = this._zlevelList = [], o = this._layers = {};
        if (this._layerConfig = {}, i) {
            null != r.width && (t.width = r.width), null != r.height && (t.height = r.height);
            var s = t.width, c = t.height;
            this._width = s, this._height = c;
            var f = new p(t, this, 1);
            f.initContext(), o[0] = f, a.push(0), this._domRoot = t
        } else {
            this._width = this._getSize(0), this._height = this._getSize(1);
            var d = this._domRoot = h(this._width, this._height);
            t.appendChild(d)
        }
        this._progressiveLayers = [], this._hoverlayer, this._hoverElements = []
    };
    return y.prototype = {
        constructor: y, isSingleCanvas: function () {
            return this._singleCanvas
        }, getViewportRoot: function () {
            return this._domRoot
        }, refresh: function (t) {
            var e = this.storage.getDisplayList(!0), r = this._zlevelList;
            this._paintList(e, t);
            for (var i = 0; i < r.length; i++) {
                var n = r[i], a = this._layers[n];
                !a.__builtin__ && a.refresh && a.refresh()
            }
            return this.refreshHover(), this._progressiveLayers.length && this._startProgessive(), this
        }, addHover: function (t, e) {
            if (!t.__hoverMir) {
                var r = new t.constructor({style: t.style, shape: t.shape});
                r.__from = t, t.__hoverMir = r, r.setStyle(e), this._hoverElements.push(r)
            }
        }, removeHover: function (t) {
            var e = t.__hoverMir, r = this._hoverElements, i = u.indexOf(r, e);
            i >= 0 && r.splice(i, 1), t.__hoverMir = null
        }, clearHover: function () {
            for (var t = this._hoverElements, e = 0; e < t.length; e++) {
                var r = t[e].__from;
                r && (r.__hoverMir = null)
            }
            t.length = 0
        }, refreshHover: function () {
            var t = this._hoverElements, e = t.length, r = this._hoverlayer;
            if (r && r.clear(), e) {
                d(t, this.storage.displayableSortFunc), r || (r = this._hoverlayer = this.getLayer(1e5));
                var i = {};
                r.ctx.save();
                for (var n = 0; e > n;) {
                    var a = t[n], o = a.__from;
                    o && o.__zr ? (n++, o.invisible || (a.transform = o.transform, a.invTransform = o.invTransform, a.__clipPaths = o.__clipPaths, this._doPaintEl(a, r, !0, i))) : (t.splice(n, 1), o.__hoverMir = null, e--)
                }
                r.ctx.restore()
            }
        }, _startProgessive: function () {
            function t() {
                r === e._progressiveToken && e.storage && (e._doPaintList(e.storage.getDisplayList()), e._furtherProgressive ? (e._progress++, v(t)) : e._progressiveToken = -1)
            }

            var e = this;
            if (e._furtherProgressive) {
                var r = e._progressiveToken = +new Date;
                e._progress++, v(t)
            }
        }, _clearProgressive: function () {
            this._progressiveToken = -1, this._progress = 0, u.each(this._progressiveLayers, function (t) {
                t.__dirty && t.clear()
            })
        }, _paintList: function (t, e) {
            null == e && (e = !1), this._updateLayerStatus(t), this._clearProgressive(), this.eachBuiltinLayer(i), this._doPaintList(t, e), this.eachBuiltinLayer(n)
        }, _doPaintList: function (t, e) {
            function r(t) {
                var e = a.dpr || 1;
                a.save(), a.globalAlpha = 1, a.shadowBlur = 0, i.__dirty = !0, a.setTransform(1, 0, 0, 1, 0, 0), a.drawImage(t.dom, 0, 0, f * e, d * e), a.restore()
            }

            for (var i, n, a, o, s, h, l = 0, f = this._width, d = this._height, p = this._progress, v = 0, m = t.length; m > v; v++) {
                var _ = t[v], y = this._singleCanvas ? 0 : _.zlevel, x = _.__frame;
                if (0 > x && s && (r(s), s = null), n !== y && (a && a.restore(), o = {}, n = y, i = this.getLayer(n), i.__builtin__ || c("ZLevel " + n + " has been used by unkown layer " + i.id), a = i.ctx, a.save(), i.__unusedCount = 0, (i.__dirty || e) && i.clear()), i.__dirty || e) {
                    if (x >= 0) {
                        if (!s) {
                            if (s = this._progressiveLayers[Math.min(l++, g - 1)], s.ctx.save(), s.renderScope = {}, s && s.__progress > s.__maxProgress) {
                                v = s.__nextIdxNotProg - 1;
                                continue
                            }
                            h = s.__progress, s.__dirty || (p = h), s.__progress = p + 1
                        }
                        x === p && this._doPaintEl(_, s, !0, s.renderScope)
                    } else this._doPaintEl(_, i, e, o);
                    _.__dirty = !1
                }
            }
            s && r(s), a && a.restore(), this._furtherProgressive = !1, u.each(this._progressiveLayers, function (t) {
                t.__maxProgress >= t.__progress && (this._furtherProgressive = !0)
            }, this)
        }, _doPaintEl: function (t, e, r, i) {
            var n = e.ctx, h = t.transform;
            if (!(!e.__dirty && !r || t.invisible || 0 === t.style.opacity || h && !h[0] && !h[3] || t.culling && a(t, this._width, this._height))) {
                var l = t.__clipPaths;
                (i.prevClipLayer !== e || o(l, i.prevElClipPaths)) && (i.prevElClipPaths && (i.prevClipLayer.ctx.restore(), i.prevClipLayer = i.prevElClipPaths = null, i.prevEl = null), l && (n.save(), s(l, n), i.prevClipLayer = e, i.prevElClipPaths = l)), t.beforeBrush && t.beforeBrush(n), t.brush(n, i.prevEl || null), i.prevEl = t, t.afterBrush && t.afterBrush(n)
            }
        }, getLayer: function (t) {
            if (this._singleCanvas)return this._layers[0];
            var e = this._layers[t];
            return e || (e = new p("zr_" + t, this, this.dpr), e.__builtin__ = !0, this._layerConfig[t] && u.merge(e, this._layerConfig[t], !0), this.insertLayer(t, e), e.initContext()), e
        }, insertLayer: function (t, e) {
            var i = this._layers, n = this._zlevelList, a = n.length, o = null, s = -1, h = this._domRoot;
            if (i[t])return void c("ZLevel " + t + " has been used already");
            if (!r(e))return void c("Layer of zlevel " + t + " is not valid");
            if (a > 0 && t > n[0]) {
                for (s = 0; a - 1 > s && !(n[s] < t && n[s + 1] > t); s++);
                o = i[n[s]]
            }
            if (n.splice(s + 1, 0, t), i[t] = e, !e.virtual)if (o) {
                var l = o.dom;
                l.nextSibling ? h.insertBefore(e.dom, l.nextSibling) : h.appendChild(e.dom)
            } else h.firstChild ? h.insertBefore(e.dom, h.firstChild) : h.appendChild(e.dom)
        }, eachLayer: function (t, e) {
            var r, i, n = this._zlevelList;
            for (i = 0; i < n.length; i++)r = n[i], t.call(e, this._layers[r], r)
        }, eachBuiltinLayer: function (t, e) {
            var r, i, n, a = this._zlevelList;
            for (n = 0; n < a.length; n++)i = a[n], r = this._layers[i], r.__builtin__ && t.call(e, r, i)
        }, eachOtherLayer: function (t, e) {
            var r, i, n, a = this._zlevelList;
            for (n = 0; n < a.length; n++)i = a[n], r = this._layers[i], r.__builtin__ || t.call(e, r, i)
        }, getLayers: function () {
            return this._layers
        }, _updateLayerStatus: function (t) {
            var e = this._layers, r = this._progressiveLayers, i = {}, n = {};
            this.eachBuiltinLayer(function (t, e) {
                i[e] = t.elCount, t.elCount = 0, t.__dirty = !1
            }), u.each(r, function (t, e) {
                n[e] = t.elCount, t.elCount = 0, t.__dirty = !1
            });
            for (var a, o, s = 0, h = 0, l = 0, c = t.length; c > l; l++) {
                var f = t[l], d = this._singleCanvas ? 0 : f.zlevel, v = e[d], m = f.progressive;
                if (v && (v.elCount++, v.__dirty = v.__dirty || f.__dirty), m >= 0) {
                    o !== m && (o = m, h++);
                    var _ = f.__frame = h - 1;
                    if (!a) {
                        var y = Math.min(s, g - 1);
                        a = r[y], a || (a = r[y] = new p("progressive", this, this.dpr), a.initContext()), a.__maxProgress = 0
                    }
                    a.__dirty = a.__dirty || f.__dirty, a.elCount++, a.__maxProgress = Math.max(a.__maxProgress, _), a.__maxProgress >= a.__progress && (v.__dirty = !0)
                } else f.__frame = -1, a && (a.__nextIdxNotProg = l, s++, a = null)
            }
            a && (s++, a.__nextIdxNotProg = l), this.eachBuiltinLayer(function (t, e) {
                i[e] !== t.elCount && (t.__dirty = !0)
            }), r.length = Math.min(s, g), u.each(r, function (t, e) {
                n[e] !== t.elCount && (f.__dirty = !0), t.__dirty && (t.__progress = 0)
            })
        }, clear: function () {
            return this.eachBuiltinLayer(this._clearLayer), this
        }, _clearLayer: function (t) {
            t.clear()
        }, configLayer: function (t, e) {
            if (e) {
                var r = this._layerConfig;
                r[t] ? u.merge(r[t], e, !0) : r[t] = e;
                var i = this._layers[t];
                i && u.merge(i, r[t], !0)
            }
        }, delLayer: function (t) {
            var e = this._layers, r = this._zlevelList, i = e[t];
            i && (i.dom.parentNode.removeChild(i.dom), delete e[t], r.splice(u.indexOf(r, t), 1))
        }, resize: function (t, e) {
            var r = this._domRoot;
            r.style.display = "none";
            var i = this._opts;
            if (null != t && (i.width = t), null != e && (i.height = e), t = this._getSize(0), e = this._getSize(1), r.style.display = "", this._width != t || e != this._height) {
                r.style.width = t + "px", r.style.height = e + "px";
                for (var n in this._layers)this._layers.hasOwnProperty(n) && this._layers[n].resize(t, e);
                u.each(this._progressiveLayers, function (r) {
                    r.resize(t, e)
                }), this.refresh(!0)
            }
            return this._width = t, this._height = e, this
        }, clearLayer: function (t) {
            var e = this._layers[t];
            e && e.clear()
        }, dispose: function () {
            this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null
        }, getRenderedCanvas: function (t) {
            if (t = t || {}, this._singleCanvas)return this._layers[0].dom;
            var e = new p("image", this, t.pixelRatio || this.dpr);
            e.initContext(), e.clearColor = t.backgroundColor, e.clear();
            for (var r = this.storage.getDisplayList(!0), i = {}, n = 0; n < r.length; n++) {
                var a = r[n];
                this._doPaintEl(a, e, !0, i)
            }
            return e.dom
        }, getWidth: function () {
            return this._width
        }, getHeight: function () {
            return this._height
        }, _getSize: function (t) {
            var r = this._opts, i = ["width", "height"][t], n = ["clientWidth", "clientHeight"][t], a = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
            if (null != r[i] && "auto" !== r[i])return parseFloat(r[i]);
            var s = this.root, h = document.defaultView.getComputedStyle(s);
            return (s[n] || e(h[i]) || e(s.style[i])) - (e(h[a]) || 0) - (e(h[o]) || 0) | 0
        }, pathToImage: function (e, r) {
            r = r || this.dpr;
            var i = document.createElement("canvas"), n = i.getContext("2d"), a = e.getBoundingRect(), o = e.style, s = o.shadowBlur, h = o.shadowOffsetX, l = o.shadowOffsetY, u = o.hasStroke() ? o.lineWidth : 0, c = Math.max(u / 2, -h + s), f = Math.max(u / 2, h + s), d = Math.max(u / 2, -l + s), p = Math.max(u / 2, l + s), v = a.width + c + f, g = a.height + d + p;
            i.width = v * r, i.height = g * r, n.scale(r, r), n.clearRect(0, 0, v, g), n.dpr = r;
            var m = {position: e.position, rotation: e.rotation, scale: e.scale};
            e.position = [c - a.x, d - a.y], e.rotation = 0, e.scale = [1, 1], e.updateTransform(), e && e.brush(n);
            var _ = t("./graphic/Image"), y = new _({style: {x: 0, y: 0, image: i}});
            return null != m.position && (y.position = e.position = m.position), null != m.rotation && (y.rotation = e.rotation = m.rotation), null != m.scale && (y.scale = e.scale = m.scale), y
        }
    }, y
}), define("zrender/zrender", ["require", "./core/guid", "./core/env", "./core/util", "./Handler", "./Storage", "./animation/Animation", "./dom/HandlerProxy", "./Painter"], function (t) {
    function e(t) {
        delete c[t]
    }

    var r = t("./core/guid"), i = t("./core/env"), n = t("./core/util"), a = t("./Handler"), o = t("./Storage"), s = t("./animation/Animation"), h = t("./dom/HandlerProxy"), l = !i.canvasSupported, u = {canvas: t("./Painter")}, c = {}, f = {};
    f.version = "3.4.4", f.init = function (t, e) {
        var i = new d(r(), t, e);
        return c[i.id] = i, i
    }, f.dispose = function (t) {
        if (t)t.dispose(); else {
            for (var e in c)c.hasOwnProperty(e) && c[e].dispose();
            c = {}
        }
        return f
    }, f.getInstance = function (t) {
        return c[t]
    }, f.registerPainter = function (t, e) {
        u[t] = e
    };
    var d = function (t, e, r) {
        r = r || {}, this.dom = e, this.id = t;
        var c = this, f = new o, d = r.renderer;
        if (l) {
            if (!u.vml)throw new Error("You need to require 'zrender/vml/vml' to support IE8");
            d = "vml"
        } else d && u[d] || (d = "canvas");
        var p = new u[d](e, f, r);
        this.storage = f, this.painter = p;
        var v = i.node ? null : new h(p.getViewportRoot());
        this.handler = new a(f, p, v, p.root), this.animation = new s({stage: {update: n.bind(this.flush, this)}}), this.animation.start(), this._needsRefresh;
        var g = f.delFromStorage, m = f.addToStorage;
        f.delFromStorage = function (t) {
            g.call(f, t), t && t.removeSelfFromZr(c)
        }, f.addToStorage = function (t) {
            m.call(f, t), t.addSelfToZr(c)
        }
    };
    return d.prototype = {
        constructor: d, getId: function () {
            return this.id
        }, add: function (t) {
            this.storage.addRoot(t), this._needsRefresh = !0
        }, remove: function (t) {
            this.storage.delRoot(t), this._needsRefresh = !0
        }, configLayer: function (t, e) {
            this.painter.configLayer(t, e), this._needsRefresh = !0
        }, refreshImmediately: function () {
            this._needsRefresh = !1, this.painter.refresh(), this._needsRefresh = !1
        }, refresh: function () {
            this._needsRefresh = !0
        }, flush: function () {
            this._needsRefresh && this.refreshImmediately(), this._needsRefreshHover && this.refreshHoverImmediately()
        }, addHover: function (t, e) {
            this.painter.addHover && (this.painter.addHover(t, e), this.refreshHover())
        }, removeHover: function (t) {
            this.painter.removeHover && (this.painter.removeHover(t), this.refreshHover())
        }, clearHover: function () {
            this.painter.clearHover && (this.painter.clearHover(), this.refreshHover())
        }, refreshHover: function () {
            this._needsRefreshHover = !0
        }, refreshHoverImmediately: function () {
            this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.refreshHover()
        }, resize: function (t) {
            t = t || {}, this.painter.resize(t.width, t.height), this.handler.resize()
        }, clearAnimation: function () {
            this.animation.clear()
        }, getWidth: function () {
            return this.painter.getWidth()
        }, getHeight: function () {
            return this.painter.getHeight()
        }, pathToImage: function (t, e) {
            return this.painter.pathToImage(t, e)
        }, setCursorStyle: function (t) {
            this.handler.setCursorStyle(t)
        }, findHover: function (t, e) {
            return this.handler.findHover(t, e)
        }, on: function (t, e, r) {
            this.handler.on(t, e, r)
        }, off: function (t, e) {
            this.handler.off(t, e)
        }, trigger: function (t, e) {
            this.handler.trigger(t, e)
        }, clear: function () {
            this.storage.delRoot(), this.painter.clear()
        }, dispose: function () {
            this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, e(this.id)
        }
    }, f
}), define("zrender", ["zrender/zrender"], function (t) {
    return t
}), define("zrender/graphic/Text", ["require", "./Displayable", "../core/util", "../contain/text"], function (t) {
    var e = t("./Displayable"), r = t("../core/util"), i = t("../contain/text"), n = function (t) {
        e.call(this, t)
    };
    return n.prototype = {
        constructor: n, type: "text", brush: function (t, e) {
            var r = this.style, n = r.x || 0, a = r.y || 0, o = r.text;
            if (null != o && (o += ""), r.bind(t, this, e), o) {
                this.setTransform(t);
                var s, h = r.textAlign, l = r.textFont || r.font;
                if (r.textVerticalAlign) {
                    var u = i.getBoundingRect(o, l, r.textAlign, "top");
                    switch (s = "middle", r.textVerticalAlign) {
                        case"middle":
                            a -= u.height / 2 - u.lineHeight / 2;
                            break;
                        case"bottom":
                            a -= u.height - u.lineHeight / 2;
                            break;
                        default:
                            a += u.lineHeight / 2
                    }
                } else s = r.textBaseline;
                t.font = l || "12px sans-serif", t.textAlign = h || "left", t.textAlign !== h && (t.textAlign = "left"), t.textBaseline = s || "alphabetic", t.textBaseline !== s && (t.textBaseline = "alphabetic");
                for (var c = i.measureText("国", t.font).width, f = o.split("\n"), d = 0; d < f.length; d++)r.hasStroke() && t.strokeText(f[d], n, a), r.hasFill() && t.fillText(f[d], n, a), a += c;
                this.restoreTransform(t)
            }
        }, getBoundingRect: function () {
            var t = this.style;
            if (!this._rect) {
                var e = t.textVerticalAlign, r = i.getBoundingRect(t.text + "", t.textFont || t.font, t.textAlign, e ? "top" : t.textBaseline);
                switch (e) {
                    case"middle":
                        r.y -= r.height / 2;
                        break;
                    case"bottom":
                        r.y -= r.height
                }
                if (r.x += t.x || 0, r.y += t.y || 0, t.hasStroke()) {
                    var n = t.lineWidth;
                    r.x -= n / 2, r.y -= n / 2, r.width += n, r.height += n
                }
                this._rect = r
            }
            return this._rect
        }
    }, r.inherits(n, e), n
}), define("zrender/core/curve", ["require", "./vector"], function (t) {
    function e(t) {
        return t > -x && x > t
    }

    function r(t) {
        return t > x || -x > t
    }

    function i(t, e, r, i, n) {
        var a = 1 - n;
        return a * a * (a * t + 3 * n * e) + n * n * (n * i + 3 * a * r)
    }

    function n(t, e, r, i, n) {
        var a = 1 - n;
        return 3 * (((e - t) * a + 2 * (r - e) * n) * a + (i - r) * n * n)
    }

    function a(t, r, i, n, a, o) {
        var s = n + 3 * (r - i) - t, h = 3 * (i - 2 * r + t), l = 3 * (r - t), u = t - a, c = h * h - 3 * s * l, f = h * l - 9 * s * u, d = l * l - 3 * h * u, p = 0;
        if (e(c) && e(f))if (e(h))o[0] = 0; else {
            var v = -l / h;
            v >= 0 && 1 >= v && (o[p++] = v)
        } else {
            var g = f * f - 4 * c * d;
            if (e(g)) {
                var m = f / c, v = -h / s + m, x = -m / 2;
                v >= 0 && 1 >= v && (o[p++] = v), x >= 0 && 1 >= x && (o[p++] = x)
            } else if (g > 0) {
                var b = y(g), P = c * h + 1.5 * s * (-f + b), k = c * h + 1.5 * s * (-f - b);
                P = 0 > P ? -_(-P, T) : _(P, T), k = 0 > k ? -_(-k, T) : _(k, T);
                var v = (-h - (P + k)) / (3 * s);
                v >= 0 && 1 >= v && (o[p++] = v)
            } else {
                var z = (2 * c * h - 3 * s * f) / (2 * y(c * c * c)), M = Math.acos(z) / 3, S = y(c), L = Math.cos(M), v = (-h - 2 * S * L) / (3 * s), x = (-h + S * (L + w * Math.sin(M))) / (3 * s), C = (-h + S * (L - w * Math.sin(M))) / (3 * s);
                v >= 0 && 1 >= v && (o[p++] = v), x >= 0 && 1 >= x && (o[p++] = x), C >= 0 && 1 >= C && (o[p++] = C)
            }
        }
        return p
    }

    function o(t, i, n, a, o) {
        var s = 6 * n - 12 * i + 6 * t, h = 9 * i + 3 * a - 3 * t - 9 * n, l = 3 * i - 3 * t, u = 0;
        if (e(h)) {
            if (r(s)) {
                var c = -l / s;
                c >= 0 && 1 >= c && (o[u++] = c)
            }
        } else {
            var f = s * s - 4 * h * l;
            if (e(f))o[0] = -s / (2 * h); else if (f > 0) {
                var d = y(f), c = (-s + d) / (2 * h), p = (-s - d) / (2 * h);
                c >= 0 && 1 >= c && (o[u++] = c), p >= 0 && 1 >= p && (o[u++] = p)
            }
        }
        return u
    }

    function s(t, e, r, i, n, a) {
        var o = (e - t) * n + t, s = (r - e) * n + e, h = (i - r) * n + r, l = (s - o) * n + o, u = (h - s) * n + s, c = (u - l) * n + l;
        a[0] = t, a[1] = o, a[2] = l, a[3] = c, a[4] = c, a[5] = u, a[6] = h, a[7] = i
    }

    function h(t, e, r, n, a, o, s, h, l, u, c) {
        var f, d, p, v, g, _ = .005, x = 1 / 0;
        P[0] = l, P[1] = u;
        for (var w = 0; 1 > w; w += .05)k[0] = i(t, r, a, s, w), k[1] = i(e, n, o, h, w), v = m(P, k), x > v && (f = w, x = v);
        x = 1 / 0;
        for (var T = 0; 32 > T && !(b > _); T++)d = f - _, p = f + _, k[0] = i(t, r, a, s, d), k[1] = i(e, n, o, h, d), v = m(k, P), d >= 0 && x > v ? (f = d, x = v) : (z[0] = i(t, r, a, s, p), z[1] = i(e, n, o, h, p), g = m(z, P), 1 >= p && x > g ? (f = p, x = g) : _ *= .5);
        return c && (c[0] = i(t, r, a, s, f), c[1] = i(e, n, o, h, f)), y(x)
    }

    function l(t, e, r, i) {
        var n = 1 - i;
        return n * (n * t + 2 * i * e) + i * i * r
    }

    function u(t, e, r, i) {
        return 2 * ((1 - i) * (e - t) + i * (r - e))
    }

    function c(t, i, n, a, o) {
        var s = t - 2 * i + n, h = 2 * (i - t), l = t - a, u = 0;
        if (e(s)) {
            if (r(h)) {
                var c = -l / h;
                c >= 0 && 1 >= c && (o[u++] = c)
            }
        } else {
            var f = h * h - 4 * s * l;
            if (e(f)) {
                var c = -h / (2 * s);
                c >= 0 && 1 >= c && (o[u++] = c)
            } else if (f > 0) {
                var d = y(f), c = (-h + d) / (2 * s), p = (-h - d) / (2 * s);
                c >= 0 && 1 >= c && (o[u++] = c), p >= 0 && 1 >= p && (o[u++] = p)
            }
        }
        return u
    }

    function f(t, e, r) {
        var i = t + r - 2 * e;
        return 0 === i ? .5 : (t - e) / i
    }

    function d(t, e, r, i, n) {
        var a = (e - t) * i + t, o = (r - e) * i + e, s = (o - a) * i + a;
        n[0] = t, n[1] = a, n[2] = s, n[3] = s, n[4] = o, n[5] = r
    }

    function p(t, e, r, i, n, a, o, s, h) {
        var u, c = .005, f = 1 / 0;
        P[0] = o, P[1] = s;
        for (var d = 0; 1 > d; d += .05) {
            k[0] = l(t, r, n, d), k[1] = l(e, i, a, d);
            var p = m(P, k);
            f > p && (u = d, f = p)
        }
        f = 1 / 0;
        for (var v = 0; 32 > v && !(b > c); v++) {
            var g = u - c, _ = u + c;
            k[0] = l(t, r, n, g), k[1] = l(e, i, a, g);
            var p = m(k, P);
            if (g >= 0 && f > p)u = g, f = p; else {
                z[0] = l(t, r, n, _), z[1] = l(e, i, a, _);
                var x = m(z, P);
                1 >= _ && f > x ? (u = _, f = x) : c *= .5
            }
        }
        return h && (h[0] = l(t, r, n, u), h[1] = l(e, i, a, u)), y(f)
    }

    var v = t("./vector"), g = v.create, m = v.distSquare, _ = Math.pow, y = Math.sqrt, x = 1e-8, b = 1e-4, w = y(3), T = 1 / 3, P = g(), k = g(), z = g();
    return {
        cubicAt: i,
        cubicDerivativeAt: n,
        cubicRootAt: a,
        cubicExtrema: o,
        cubicSubdivide: s,
        cubicProjectPoint: h,
        quadraticAt: l,
        quadraticDerivativeAt: u,
        quadraticRootAt: c,
        quadraticExtremum: f,
        quadraticSubdivide: d,
        quadraticProjectPoint: p
    }
}), define("zrender/core/bbox", ["require", "./vector", "./curve"], function (t) {
    var e = t("./vector"), r = t("./curve"), i = {}, n = Math.min, a = Math.max, o = Math.sin, s = Math.cos, h = e.create(), l = e.create(), u = e.create(), c = 2 * Math.PI;
    i.fromPoints = function (t, e, r) {
        if (0 !== t.length) {
            var i, o = t[0], s = o[0], h = o[0], l = o[1], u = o[1];
            for (i = 1; i < t.length; i++)o = t[i], s = n(s, o[0]), h = a(h, o[0]), l = n(l, o[1]), u = a(u, o[1]);
            e[0] = s, e[1] = l, r[0] = h, r[1] = u
        }
    }, i.fromLine = function (t, e, r, i, o, s) {
        o[0] = n(t, r), o[1] = n(e, i), s[0] = a(t, r), s[1] = a(e, i)
    };
    var f = [], d = [];
    return i.fromCubic = function (t, e, i, o, s, h, l, u, c, p) {
        var v, g = r.cubicExtrema, m = r.cubicAt, _ = g(t, i, s, l, f);
        for (c[0] = 1 / 0, c[1] = 1 / 0, p[0] = -(1 / 0), p[1] = -(1 / 0), v = 0; _ > v; v++) {
            var y = m(t, i, s, l, f[v]);
            c[0] = n(y, c[0]), p[0] = a(y, p[0])
        }
        for (_ = g(e, o, h, u, d), v = 0; _ > v; v++) {
            var x = m(e, o, h, u, d[v]);
            c[1] = n(x, c[1]), p[1] = a(x, p[1])
        }
        c[0] = n(t, c[0]), p[0] = a(t, p[0]), c[0] = n(l, c[0]), p[0] = a(l, p[0]), c[1] = n(e, c[1]), p[1] = a(e, p[1]), c[1] = n(u, c[1]), p[1] = a(u, p[1])
    }, i.fromQuadratic = function (t, e, i, o, s, h, l, u) {
        var c = r.quadraticExtremum, f = r.quadraticAt, d = a(n(c(t, i, s), 1), 0), p = a(n(c(e, o, h), 1), 0), v = f(t, i, s, d), g = f(e, o, h, p);
        l[0] = n(t, s, v), l[1] = n(e, h, g), u[0] = a(t, s, v), u[1] = a(e, h, g)
    }, i.fromArc = function (t, r, i, n, a, f, d, p, v) {
        var g = e.min, m = e.max, _ = Math.abs(a - f);
        if (1e-4 > _ % c && _ > 1e-4)return p[0] = t - i, p[1] = r - n, v[0] = t + i, void(v[1] = r + n);
        if (h[0] = s(a) * i + t, h[1] = o(a) * n + r, l[0] = s(f) * i + t, l[1] = o(f) * n + r, g(p, h, l), m(v, h, l), a %= c, 0 > a && (a += c), f %= c, 0 > f && (f += c), a > f && !d ? f += c : f > a && d && (a += c), d) {
            var y = f;
            f = a, a = y
        }
        for (var x = 0; f > x; x += Math.PI / 2)x > a && (u[0] = s(x) * i + t, u[1] = o(x) * n + r, g(p, u, p), m(v, u, v))
    }, i
}), define("zrender/core/PathProxy", ["require", "./curve", "./vector", "./bbox", "./BoundingRect", "../config"], function (t) {
    var e = t("./curve"), r = t("./vector"), i = t("./bbox"), n = t("./BoundingRect"), a = t("../config").devicePixelRatio, o = {
        M: 1,
        L: 2,
        C: 3,
        Q: 4,
        A: 5,
        Z: 6,
        R: 7
    }, s = [], h = [], l = [], u = [], c = Math.min, f = Math.max, d = Math.cos, p = Math.sin, v = Math.sqrt, g = Math.abs, m = "undefined" != typeof Float32Array, _ = function (t) {
        this._saveData = !t, this._saveData && (this.data = []), this._ctx = null
    };
    return _.prototype = {
        constructor: _,
        _xi: 0,
        _yi: 0,
        _x0: 0,
        _y0: 0,
        _ux: 0,
        _uy: 0,
        _len: 0,
        _lineDash: null,
        _dashOffset: 0,
        _dashIdx: 0,
        _dashSum: 0,
        setScale: function (t, e) {
            this._ux = g(1 / a / t) || 0, this._uy = g(1 / a / e) || 0
        },
        getContext: function () {
            return this._ctx
        },
        beginPath: function (t) {
            return this._ctx = t, t && t.beginPath(), t && (this.dpr = t.dpr), this._saveData && (this._len = 0), this._lineDash && (this._lineDash = null, this._dashOffset = 0), this
        },
        moveTo: function (t, e) {
            return this.addData(o.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this
        },
        lineTo: function (t, e) {
            var r = g(t - this._xi) > this._ux || g(e - this._yi) > this._uy || this._len < 5;
            return this.addData(o.L, t, e), this._ctx && r && (this._needsDash() ? this._dashedLineTo(t, e) : this._ctx.lineTo(t, e)), r && (this._xi = t, this._yi = e), this
        },
        bezierCurveTo: function (t, e, r, i, n, a) {
            return this.addData(o.C, t, e, r, i, n, a), this._ctx && (this._needsDash() ? this._dashedBezierTo(t, e, r, i, n, a) : this._ctx.bezierCurveTo(t, e, r, i, n, a)), this._xi = n, this._yi = a, this
        },
        quadraticCurveTo: function (t, e, r, i) {
            return this.addData(o.Q, t, e, r, i), this._ctx && (this._needsDash() ? this._dashedQuadraticTo(t, e, r, i) : this._ctx.quadraticCurveTo(t, e, r, i)), this._xi = r, this._yi = i, this
        },
        arc: function (t, e, r, i, n, a) {
            return this.addData(o.A, t, e, r, r, i, n - i, 0, a ? 0 : 1), this._ctx && this._ctx.arc(t, e, r, i, n, a), this._xi = d(n) * r + t, this._yi = p(n) * r + t, this
        },
        arcTo: function (t, e, r, i, n) {
            return this._ctx && this._ctx.arcTo(t, e, r, i, n), this
        },
        rect: function (t, e, r, i) {
            return this._ctx && this._ctx.rect(t, e, r, i), this.addData(o.R, t, e, r, i), this
        },
        closePath: function () {
            this.addData(o.Z);
            var t = this._ctx, e = this._x0, r = this._y0;
            return t && (this._needsDash() && this._dashedLineTo(e, r), t.closePath()), this._xi = e, this._yi = r, this
        },
        fill: function (t) {
            t && t.fill(), this.toStatic()
        },
        stroke: function (t) {
            t && t.stroke(), this.toStatic()
        },
        setLineDash: function (t) {
            if (t instanceof Array) {
                this._lineDash = t, this._dashIdx = 0;
                for (var e = 0, r = 0; r < t.length; r++)e += t[r];
                this._dashSum = e
            }
            return this
        },
        setLineDashOffset: function (t) {
            return this._dashOffset = t, this
        },
        len: function () {
            return this._len
        },
        setData: function (t) {
            var e = t.length;
            this.data && this.data.length == e || !m || (this.data = new Float32Array(e));
            for (var r = 0; e > r; r++)this.data[r] = t[r];
            this._len = e
        },
        appendPath: function (t) {
            t instanceof Array || (t = [t]);
            for (var e = t.length, r = 0, i = this._len, n = 0; e > n; n++)r += t[n].len();
            m && this.data instanceof Float32Array && (this.data = new Float32Array(i + r));
            for (var n = 0; e > n; n++)for (var a = t[n].data, o = 0; o < a.length; o++)this.data[i++] = a[o];
            this._len = i
        },
        addData: function (t) {
            if (this._saveData) {
                var e = this.data;
                this._len + arguments.length > e.length && (this._expandData(), e = this.data);
                for (var r = 0; r < arguments.length; r++)e[this._len++] = arguments[r];
                this._prevCmd = t
            }
        },
        _expandData: function () {
            if (!(this.data instanceof Array)) {
                for (var t = [], e = 0; e < this._len; e++)t[e] = this.data[e];
                this.data = t
            }
        },
        _needsDash: function () {
            return this._lineDash
        },
        _dashedLineTo: function (t, e) {
            var r, i, n = this._dashSum, a = this._dashOffset, o = this._lineDash, s = this._ctx, h = this._xi, l = this._yi, u = t - h, d = e - l, p = v(u * u + d * d), g = h, m = l, _ = o.length;
            for (u /= p, d /= p, 0 > a && (a = n + a), a %= n, g -= a * u, m -= a * d; u > 0 && t >= g || 0 > u && g >= t || 0 == u && (d > 0 && e >= m || 0 > d && m >= e);)i = this._dashIdx, r = o[i], g += u * r, m += d * r, this._dashIdx = (i + 1) % _, u > 0 && h > g || 0 > u && g > h || d > 0 && l > m || 0 > d && m > l || s[i % 2 ? "moveTo" : "lineTo"](u >= 0 ? c(g, t) : f(g, t), d >= 0 ? c(m, e) : f(m, e));
            u = g - t, d = m - e, this._dashOffset = -v(u * u + d * d)
        },
        _dashedBezierTo: function (t, r, i, n, a, o) {
            var s, h, l, u, c, f = this._dashSum, d = this._dashOffset, p = this._lineDash, g = this._ctx, m = this._xi, _ = this._yi, y = e.cubicAt, x = 0, b = this._dashIdx, w = p.length, T = 0;
            for (0 > d && (d = f + d), d %= f, s = 0; 1 > s; s += .1)h = y(m, t, i, a, s + .1) - y(m, t, i, a, s), l = y(_, r, n, o, s + .1) - y(_, r, n, o, s), x += v(h * h + l * l);
            for (; w > b && (T += p[b], !(T > d)); b++);
            for (s = (T - d) / x; 1 >= s;)u = y(m, t, i, a, s), c = y(_, r, n, o, s), b % 2 ? g.moveTo(u, c) : g.lineTo(u, c), s += p[b] / x, b = (b + 1) % w;
            b % 2 !== 0 && g.lineTo(a, o), h = a - u, l = o - c, this._dashOffset = -v(h * h + l * l)
        },
        _dashedQuadraticTo: function (t, e, r, i) {
            var n = r, a = i;
            r = (r + 2 * t) / 3, i = (i + 2 * e) / 3, t = (this._xi + 2 * t) / 3, e = (this._yi + 2 * e) / 3, this._dashedBezierTo(t, e, r, i, n, a)
        },
        toStatic: function () {
            var t = this.data;
            t instanceof Array && (t.length = this._len, m && (this.data = new Float32Array(t)))
        },
        getBoundingRect: function () {
            s[0] = s[1] = l[0] = l[1] = Number.MAX_VALUE, h[0] = h[1] = u[0] = u[1] = -Number.MAX_VALUE;
            for (var t = this.data, e = 0, a = 0, c = 0, f = 0, v = 0; v < t.length;) {
                var g = t[v++];
                switch (1 == v && (e = t[v], a = t[v + 1], c = e, f = a), g) {
                    case o.M:
                        c = t[v++], f = t[v++], e = c, a = f, l[0] = c, l[1] = f, u[0] = c, u[1] = f;
                        break;
                    case o.L:
                        i.fromLine(e, a, t[v], t[v + 1], l, u), e = t[v++], a = t[v++];
                        break;
                    case o.C:
                        i.fromCubic(e, a, t[v++], t[v++], t[v++], t[v++], t[v], t[v + 1], l, u), e = t[v++], a = t[v++];
                        break;
                    case o.Q:
                        i.fromQuadratic(e, a, t[v++], t[v++], t[v], t[v + 1], l, u), e = t[v++], a = t[v++];
                        break;
                    case o.A:
                        var m = t[v++], _ = t[v++], y = t[v++], x = t[v++], b = t[v++], w = t[v++] + b, T = (t[v++], 1 - t[v++]);
                        1 == v && (c = d(b) * y + m, f = p(b) * x + _), i.fromArc(m, _, y, x, b, w, T, l, u), e = d(w) * y + m, a = p(w) * x + _;
                        break;
                    case o.R:
                        c = e = t[v++], f = a = t[v++];
                        var P = t[v++], k = t[v++];
                        i.fromLine(c, f, c + P, f + k, l, u);
                        break;
                    case o.Z:
                        e = c, a = f
                }
                r.min(s, s, l), r.max(h, h, u)
            }
            return 0 === v && (s[0] = s[1] = h[0] = h[1] = 0), new n(s[0], s[1], h[0] - s[0], h[1] - s[1])
        },
        rebuildPath: function (t) {
            for (var e, r, i, n, a, s, h = this.data, l = this._ux, u = this._uy, c = this._len, f = 0; c > f;) {
                var v = h[f++];
                switch (1 == f && (i = h[f], n = h[f + 1], e = i, r = n), v) {
                    case o.M:
                        e = i = h[f++], r = n = h[f++], t.moveTo(i, n);
                        break;
                    case o.L:
                        a = h[f++], s = h[f++], (g(a - i) > l || g(s - n) > u || f === c - 1) && (t.lineTo(a, s), i = a, n = s);
                        break;
                    case o.C:
                        t.bezierCurveTo(h[f++], h[f++], h[f++], h[f++], h[f++], h[f++]), i = h[f - 2], n = h[f - 1];
                        break;
                    case o.Q:
                        t.quadraticCurveTo(h[f++], h[f++], h[f++], h[f++]), i = h[f - 2], n = h[f - 1];
                        break;
                    case o.A:
                        var m = h[f++], _ = h[f++], y = h[f++], x = h[f++], b = h[f++], w = h[f++], T = h[f++], P = h[f++], k = y > x ? y : x, z = y > x ? 1 : y / x, M = y > x ? x / y : 1, S = Math.abs(y - x) > .001, L = b + w;
                        S ? (t.translate(m, _), t.rotate(T), t.scale(z, M), t.arc(0, 0, k, b, L, 1 - P), t.scale(1 / z, 1 / M), t.rotate(-T), t.translate(-m, -_)) : t.arc(m, _, k, b, L, 1 - P), 1 == f && (e = d(b) * y + m, r = p(b) * x + _), i = d(L) * y + m, n = p(L) * x + _;
                        break;
                    case o.R:
                        e = i = h[f], r = n = h[f + 1], t.rect(h[f++], h[f++], h[f++], h[f++]);
                        break;
                    case o.Z:
                        t.closePath(), i = e, n = r
                }
            }
        }
    }, _.CMD = o, _
}), define("zrender/contain/line", [], function () {
    return {
        containStroke: function (t, e, r, i, n, a, o) {
            if (0 === n)return !1;
            var s = n, h = 0, l = t;
            if (o > e + s && o > i + s || e - s > o && i - s > o || a > t + s && a > r + s || t - s > a && r - s > a)return !1;
            if (t === r)return Math.abs(a - t) <= s / 2;
            h = (e - i) / (t - r), l = (t * i - r * e) / (t - r);
            var u = h * a - o + l, c = u * u / (h * h + 1);
            return s / 2 * s / 2 >= c
        }
    }
}), define("zrender/contain/cubic", ["require", "../core/curve"], function (t) {
    var e = t("../core/curve");
    return {
        containStroke: function (t, r, i, n, a, o, s, h, l, u, c) {
            if (0 === l)return !1;
            var f = l;
            if (c > r + f && c > n + f && c > o + f && c > h + f || r - f > c && n - f > c && o - f > c && h - f > c || u > t + f && u > i + f && u > a + f && u > s + f || t - f > u && i - f > u && a - f > u && s - f > u)return !1;
            var d = e.cubicProjectPoint(t, r, i, n, a, o, s, h, u, c, null);
            return f / 2 >= d
        }
    }
}), define("zrender/contain/quadratic", ["require", "../core/curve"], function (t) {
    var e = t("../core/curve");
    return {
        containStroke: function (t, r, i, n, a, o, s, h, l) {
            if (0 === s)return !1;
            var u = s;
            if (l > r + u && l > n + u && l > o + u || r - u > l && n - u > l && o - u > l || h > t + u && h > i + u && h > a + u || t - u > h && i - u > h && a - u > h)return !1;
            var c = e.quadraticProjectPoint(t, r, i, n, a, o, h, l, null);
            return u / 2 >= c
        }
    }
}), define("zrender/contain/util", ["require"], function () {
    var t = 2 * Math.PI;
    return {
        normalizeRadian: function (e) {
            return e %= t, 0 > e && (e += t), e
        }
    }
}), define("zrender/contain/arc", ["require", "./util"], function (t) {
    var e = t("./util").normalizeRadian, r = 2 * Math.PI;
    return {
        containStroke: function (t, i, n, a, o, s, h, l, u) {
            if (0 === h)return !1;
            var c = h;
            l -= t, u -= i;
            var f = Math.sqrt(l * l + u * u);
            if (f - c > n || n > f + c)return !1;
            if (Math.abs(a - o) % r < 1e-4)return !0;
            if (s) {
                var d = a;
                a = e(o), o = e(d)
            } else a = e(a), o = e(o);
            a > o && (o += r);
            var p = Math.atan2(u, l);
            return 0 > p && (p += r), p >= a && o >= p || p + r >= a && o >= p + r
        }
    }
}), define("zrender/contain/windingLine", [], function () {
    return function (t, e, r, i, n, a) {
        if (a > e && a > i || e > a && i > a)return 0;
        if (i === e)return 0;
        var o = e > i ? 1 : -1, s = (a - e) / (i - e);
        (1 === s || 0 === s) && (o = e > i ? .5 : -.5);
        var h = s * (r - t) + t;
        return h > n ? o : 0
    }
}), define("zrender/contain/path", ["require", "../core/PathProxy", "./line", "./cubic", "./quadratic", "./arc", "./util", "../core/curve", "./windingLine"], function (t) {
    function e(t, e) {
        return Math.abs(t - e) < m
    }

    function r() {
        var t = y[0];
        y[0] = y[1], y[1] = t
    }

    function i(t, e, i, n, a, o, s, h, l, u) {
        if (u > e && u > n && u > o && u > h || e > u && n > u && o > u && h > u)return 0;
        var c = d.cubicRootAt(e, n, o, h, u, _);
        if (0 === c)return 0;
        for (var f, p, v = 0, g = -1, m = 0; c > m; m++) {
            var x = _[m], b = 0 === x || 1 === x ? .5 : 1, w = d.cubicAt(t, i, a, s, x);
            l > w || (0 > g && (g = d.cubicExtrema(e, n, o, h, y), y[1] < y[0] && g > 1 && r(), f = d.cubicAt(e, n, o, h, y[0]), g > 1 && (p = d.cubicAt(e, n, o, h, y[1]))), v += 2 == g ? x < y[0] ? e > f ? b : -b : x < y[1] ? f > p ? b : -b : p > h ? b : -b : x < y[0] ? e > f ? b : -b : f > h ? b : -b)
        }
        return v
    }

    function n(t, e, r, i, n, a, o, s) {
        if (s > e && s > i && s > a || e > s && i > s && a > s)return 0;
        var h = d.quadraticRootAt(e, i, a, s, _);
        if (0 === h)return 0;
        var l = d.quadraticExtremum(e, i, a);
        if (l >= 0 && 1 >= l) {
            for (var u = 0, c = d.quadraticAt(e, i, a, l), f = 0; h > f; f++) {
                var p = 0 === _[f] || 1 === _[f] ? .5 : 1, v = d.quadraticAt(t, r, n, _[f]);
                o > v || (u += _[f] < l ? e > c ? p : -p : c > a ? p : -p)
            }
            return u
        }
        var p = 0 === _[0] || 1 === _[0] ? .5 : 1, v = d.quadraticAt(t, r, n, _[0]);
        return o > v ? 0 : e > a ? p : -p
    }

    function a(t, e, r, i, n, a, o, s) {
        if (s -= e, s > r || -r > s)return 0;
        var h = Math.sqrt(r * r - s * s);
        _[0] = -h, _[1] = h;
        var l = Math.abs(i - n);
        if (1e-4 > l)return 0;
        if (1e-4 > l % g) {
            i = 0, n = g;
            var u = a ? 1 : -1;
            return o >= _[0] + t && o <= _[1] + t ? u : 0
        }
        if (a) {
            var h = i;
            i = f(n), n = f(h)
        } else i = f(i), n = f(n);
        i > n && (n += g);
        for (var c = 0, d = 0; 2 > d; d++) {
            var p = _[d];
            if (p + t > o) {
                var v = Math.atan2(s, p), u = a ? 1 : -1;
                0 > v && (v = g + v), (v >= i && n >= v || v + g >= i && n >= v + g) && (v > Math.PI / 2 && v < 1.5 * Math.PI && (u = -u), c += u)
            }
        }
        return c
    }

    function o(t, r, o, h, f) {
        for (var d = 0, g = 0, m = 0, _ = 0, y = 0, x = 0; x < t.length;) {
            var b = t[x++];
            switch (b === s.M && x > 1 && (o || (d += p(g, m, _, y, h, f))), 1 == x && (g = t[x], m = t[x + 1], _ = g, y = m), b) {
                case s.M:
                    _ = t[x++], y = t[x++], g = _, m = y;
                    break;
                case s.L:
                    if (o) {
                        if (v(g, m, t[x], t[x + 1], r, h, f))return !0
                    } else d += p(g, m, t[x], t[x + 1], h, f) || 0;
                    g = t[x++], m = t[x++];
                    break;
                case s.C:
                    if (o) {
                        if (l.containStroke(g, m, t[x++], t[x++], t[x++], t[x++], t[x], t[x + 1], r, h, f))return !0
                    } else d += i(g, m, t[x++], t[x++], t[x++], t[x++], t[x], t[x + 1], h, f) || 0;
                    g = t[x++], m = t[x++];
                    break;
                case s.Q:
                    if (o) {
                        if (u.containStroke(g, m, t[x++], t[x++], t[x], t[x + 1], r, h, f))return !0
                    } else d += n(g, m, t[x++], t[x++], t[x], t[x + 1], h, f) || 0;
                    g = t[x++], m = t[x++];
                    break;
                case s.A:
                    var w = t[x++], T = t[x++], P = t[x++], k = t[x++], z = t[x++], M = t[x++], S = (t[x++], 1 - t[x++]), L = Math.cos(z) * P + w, C = Math.sin(z) * k + T;
                    x > 1 ? d += p(g, m, L, C, h, f) : (_ = L, y = C);
                    var R = (h - w) * k / P + w;
                    if (o) {
                        if (c.containStroke(w, T, k, z, z + M, S, r, R, f))return !0
                    } else d += a(w, T, k, z, z + M, S, R, f);
                    g = Math.cos(z + M) * P + w, m = Math.sin(z + M) * k + T;
                    break;
                case s.R:
                    _ = g = t[x++], y = m = t[x++];
                    var A = t[x++], q = t[x++], L = _ + A, C = y + q;
                    if (o) {
                        if (v(_, y, L, y, r, h, f) || v(L, y, L, C, r, h, f) || v(L, C, _, C, r, h, f) || v(_, C, _, y, r, h, f))return !0
                    } else d += p(L, y, L, C, h, f), d += p(_, C, _, y, h, f);
                    break;
                case s.Z:
                    if (o) {
                        if (v(g, m, _, y, r, h, f))return !0
                    } else d += p(g, m, _, y, h, f);
                    g = _, m = y
            }
        }
        return o || e(m, y) || (d += p(g, m, _, y, h, f) || 0), 0 !== d
    }

    var s = t("../core/PathProxy").CMD, h = t("./line"), l = t("./cubic"), u = t("./quadratic"), c = t("./arc"), f = t("./util").normalizeRadian, d = t("../core/curve"), p = t("./windingLine"), v = h.containStroke, g = 2 * Math.PI, m = 1e-4, _ = [-1, -1, -1], y = [-1, -1];
    return {
        contain: function (t, e, r) {
            return o(t, 0, !1, e, r)
        }, containStroke: function (t, e, r, i) {
            return o(t, e, !0, r, i)
        }
    }
}), define("zrender/graphic/Path", ["require", "./Displayable", "../core/util", "../core/PathProxy", "../contain/path", "./Pattern"], function (t) {
    function e(t) {
        r.call(this, t), this.path = null
    }

    var r = t("./Displayable"), i = t("../core/util"), n = t("../core/PathProxy"), a = t("../contain/path"), o = t("./Pattern"), s = o.prototype.getCanvasPattern, h = Math.abs, l = new n(!0);
    return e.prototype = {
        constructor: e, type: "path", __dirtyPath: !0, strokeContainThreshold: 5, brush: function (t, e) {
            var r = this.style, i = this.path || l, n = r.hasStroke(), a = r.hasFill(), o = r.fill, h = r.stroke, u = a && !!o.colorStops, c = n && !!h.colorStops, f = a && !!o.image, d = n && !!h.image;
            if (r.bind(t, this, e), this.setTransform(t), this.__dirty) {
                var p;
                u && (p = p || this.getBoundingRect(), this._fillGradient = r.getGradient(t, o, p)), c && (p = p || this.getBoundingRect(), this._strokeGradient = r.getGradient(t, h, p))
            }
            u ? t.fillStyle = this._fillGradient : f && (t.fillStyle = s.call(o, t)), c ? t.strokeStyle = this._strokeGradient : d && (t.strokeStyle = s.call(h, t));
            var v = r.lineDash, g = r.lineDashOffset, m = !!t.setLineDash, _ = this.getGlobalScale();
            i.setScale(_[0], _[1]), this.__dirtyPath || v && !m && n ? (i.beginPath(t), v && !m && (i.setLineDash(v), i.setLineDashOffset(g)), this.buildPath(i, this.shape, !1), this.path && (this.__dirtyPath = !1)) : (t.beginPath(), this.path.rebuildPath(t)), a && i.fill(t), v && m && (t.setLineDash(v), t.lineDashOffset = g), n && i.stroke(t), v && m && t.setLineDash([]), this.restoreTransform(t), null != r.text && this.drawRectText(t, this.getBoundingRect())
        }, buildPath: function () {
        }, createPathProxy: function () {
            this.path = new n
        }, getBoundingRect: function () {
            var t = this._rect, e = this.style, r = !t;
            if (r) {
                var i = this.path;
                i || (i = this.path = new n), this.__dirtyPath && (i.beginPath(), this.buildPath(i, this.shape, !1)), t = i.getBoundingRect()
            }
            if (this._rect = t, e.hasStroke()) {
                var a = this._rectWithStroke || (this._rectWithStroke = t.clone());
                if (this.__dirty || r) {
                    a.copy(t);
                    var o = e.lineWidth, s = e.strokeNoScale ? this.getLineScale() : 1;
                    e.hasFill() || (o = Math.max(o, this.strokeContainThreshold || 4)), s > 1e-10 && (a.width += o / s, a.height += o / s, a.x -= o / s / 2, a.y -= o / s / 2)
                }
                return a
            }
            return t
        }, contain: function (t, e) {
            var r = this.transformCoordToLocal(t, e), i = this.getBoundingRect(), n = this.style;
            if (t = r[0], e = r[1], i.contain(t, e)) {
                var o = this.path.data;
                if (n.hasStroke()) {
                    var s = n.lineWidth, h = n.strokeNoScale ? this.getLineScale() : 1;
                    if (h > 1e-10 && (n.hasFill() || (s = Math.max(s, this.strokeContainThreshold)), a.containStroke(o, s / h, t, e)))return !0
                }
                if (n.hasFill())return a.contain(o, t, e)
            }
            return !1
        }, dirty: function (t) {
            null == t && (t = !0), t && (this.__dirtyPath = t, this._rect = null), this.__dirty = !0, this.__zr && this.__zr.refresh(), this.__clipTarget && this.__clipTarget.dirty()
        }, animateShape: function (t) {
            return this.animate("shape", t)
        }, attrKV: function (t, e) {
            "shape" === t ? (this.setShape(e), this.__dirtyPath = !0, this._rect = null) : r.prototype.attrKV.call(this, t, e)
        }, setShape: function (t, e) {
            var r = this.shape;
            if (r) {
                if (i.isObject(t))for (var n in t)t.hasOwnProperty(n) && (r[n] = t[n]); else r[t] = e;
                this.dirty(!0);

            }
            return this
        }, getLineScale: function () {
            var t = this.transform;
            return t && h(t[0] - 1) > 1e-10 && h(t[3] - 1) > 1e-10 ? Math.sqrt(h(t[0] * t[3] - t[2] * t[1])) : 1
        }
    }, e.extend = function (t) {
        var r = function (r) {
            e.call(this, r), t.style && this.style.extendFrom(t.style, !1);
            var i = t.shape;
            if (i) {
                this.shape = this.shape || {};
                var n = this.shape;
                for (var a in i)!n.hasOwnProperty(a) && i.hasOwnProperty(a) && (n[a] = i[a])
            }
            t.init && t.init.call(this, r)
        };
        i.inherits(r, e);
        for (var n in t)"style" !== n && "shape" !== n && (r.prototype[n] = t[n]);
        return r
    }, i.inherits(e, r), e
}), define("zrender/graphic/shape/Rose", ["require", "../Path"], function (t) {
    var e = Math.sin, r = Math.cos, i = Math.PI / 180;
    return t("../Path").extend({
        type: "rose",
        shape: {cx: 0, cy: 0, r: [], k: 0, n: 1},
        style: {stroke: "#000", fill: null},
        buildPath: function (t, n) {
            var a, o, s, h = n.r, l = n.k, u = n.n, c = n.cx, f = n.cy;
            t.moveTo(c, f);
            for (var d = 0, p = h.length; p > d; d++) {
                s = h[d];
                for (var v = 0; 360 * u >= v; v++)a = s * e(l / u * v % 360 * i) * r(v * i) + c, o = s * e(l / u * v % 360 * i) * e(v * i) + f, t.lineTo(a, o)
            }
        }
    })
}), define("zrender/graphic/shape/Trochoid", ["require", "../Path"], function (t) {
    var e = Math.cos, r = Math.sin;
    return t("../Path").extend({
        type: "trochoid",
        shape: {cx: 0, cy: 0, r: 0, r0: 0, d: 0, location: "out"},
        style: {stroke: "#000", fill: null},
        buildPath: function (t, i) {
            var n, a, o, s, h = i.r, l = i.r0, u = i.d, c = i.cx, f = i.cy, d = "out" == i.location ? 1 : -1;
            if (!(i.location && l >= h)) {
                var p, v = 0, g = 1;
                n = (h + d * l) * e(0) - d * u * e(0) + c, a = (h + d * l) * r(0) - u * r(0) + f, t.moveTo(n, a);
                do v++; while (l * v % (h + d * l) !== 0);
                do p = Math.PI / 180 * g, o = (h + d * l) * e(p) - d * u * e((h / l + d) * p) + c, s = (h + d * l) * r(p) - u * r((h / l + d) * p) + f, t.lineTo(o, s), g++; while (l * v / (h + d * l) * 360 >= g)
            }
        }
    })
}), define("zrender/graphic/shape/Circle", ["require", "../Path"], function (t) {
    return t("../Path").extend({
        type: "circle", shape: {cx: 0, cy: 0, r: 0}, buildPath: function (t, e, r) {
            r && t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI, !0)
        }
    })
}), define("zrender/graphic/shape/Sector", ["require", "../../core/env", "../Path"], function (t) {
    var e = t("../../core/env"), r = t("../Path"), i = [["shadowBlur", 0], ["shadowColor", "#000"], ["shadowOffsetX", 0], ["shadowOffsetY", 0]];
    return r.extend({
        type: "sector",
        shape: {cx: 0, cy: 0, r0: 0, r: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !0},
        brush: e.browser.ie && e.browser.version >= 11 ? function () {
            var t, e = this.__clipPaths, n = this.style;
            if (e)for (var a = 0; a < e.length; a++) {
                var o = e[a] && e[a].shape;
                if (o && o.startAngle === o.endAngle) {
                    for (var s = 0; s < i.length; s++)i[s][2] = n[i[s][0]], n[i[s][0]] = i[s][1];
                    t = !0;
                    break
                }
            }
            if (r.prototype.brush.apply(this, arguments), t)for (var s = 0; s < i.length; s++)n[i[s][0]] = i[s][2]
        } : r.prototype.brush,
        buildPath: function (t, e) {
            var r = e.cx, i = e.cy, n = Math.max(e.r0 || 0, 0), a = Math.max(e.r, 0), o = e.startAngle, s = e.endAngle, h = e.clockwise, l = Math.cos(o), u = Math.sin(o);
            t.moveTo(l * n + r, u * n + i), t.lineTo(l * a + r, u * a + i), t.arc(r, i, a, o, s, !h), t.lineTo(Math.cos(s) * n + r, Math.sin(s) * n + i), 0 !== n && t.arc(r, i, n, s, o, h), t.closePath()
        }
    })
}), define("zrender/graphic/shape/Ring", ["require", "../Path"], function (t) {
    return t("../Path").extend({
        type: "ring", shape: {cx: 0, cy: 0, r: 0, r0: 0}, buildPath: function (t, e) {
            var r = e.cx, i = e.cy, n = 2 * Math.PI;
            t.moveTo(r + e.r, i), t.arc(r, i, e.r, 0, n, !1), t.moveTo(r + e.r0, i), t.arc(r, i, e.r0, 0, n, !0)
        }
    })
}), define("zrender/graphic/shape/Ellipse", ["require", "../Path"], function (t) {
    return t("../Path").extend({
        type: "ellipse", shape: {cx: 0, cy: 0, rx: 0, ry: 0}, buildPath: function (t, e) {
            var r = .5522848, i = e.cx, n = e.cy, a = e.rx, o = e.ry, s = a * r, h = o * r;
            t.moveTo(i - a, n), t.bezierCurveTo(i - a, n - h, i - s, n - o, i, n - o), t.bezierCurveTo(i + s, n - o, i + a, n - h, i + a, n), t.bezierCurveTo(i + a, n + h, i + s, n + o, i, n + o), t.bezierCurveTo(i - s, n + o, i - a, n + h, i - a, n), t.closePath()
        }
    })
}), define("zrender/graphic/helper/roundRect", ["require"], function () {
    return {
        buildPath: function (t, e) {
            var r, i, n, a, o = e.x, s = e.y, h = e.width, l = e.height, u = e.r;
            0 > h && (o += h, h = -h), 0 > l && (s += l, l = -l), "number" == typeof u ? r = i = n = a = u : u instanceof Array ? 1 === u.length ? r = i = n = a = u[0] : 2 === u.length ? (r = n = u[0], i = a = u[1]) : 3 === u.length ? (r = u[0], i = a = u[1], n = u[2]) : (r = u[0], i = u[1], n = u[2], a = u[3]) : r = i = n = a = 0;
            var c;
            r + i > h && (c = r + i, r *= h / c, i *= h / c), n + a > h && (c = n + a, n *= h / c, a *= h / c), i + n > l && (c = i + n, i *= l / c, n *= l / c), r + a > l && (c = r + a, r *= l / c, a *= l / c), t.moveTo(o + r, s), t.lineTo(o + h - i, s), 0 !== i && t.quadraticCurveTo(o + h, s, o + h, s + i), t.lineTo(o + h, s + l - n), 0 !== n && t.quadraticCurveTo(o + h, s + l, o + h - n, s + l), t.lineTo(o + a, s + l), 0 !== a && t.quadraticCurveTo(o, s + l, o, s + l - a), t.lineTo(o, s + r), 0 !== r && t.quadraticCurveTo(o, s, o + r, s)
        }
    }
}), define("zrender/graphic/shape/Rect", ["require", "../helper/roundRect", "../Path"], function (t) {
    var e = t("../helper/roundRect");
    return t("../Path").extend({
        type: "rect",
        shape: {r: 0, x: 0, y: 0, width: 0, height: 0},
        buildPath: function (t, r) {
            var i = r.x, n = r.y, a = r.width, o = r.height;
            r.r ? e.buildPath(t, r) : t.rect(i, n, a, o), t.closePath()
        }
    })
}), define("zrender/graphic/shape/Heart", ["require", "../Path"], function (t) {
    return t("../Path").extend({
        type: "heart", shape: {cx: 0, cy: 0, width: 0, height: 0}, buildPath: function (t, e) {
            var r = e.cx, i = e.cy, n = e.width, a = e.height;
            t.moveTo(r, i), t.bezierCurveTo(r + n / 2, i - 2 * a / 3, r + 2 * n, i + a / 3, r, i + a), t.bezierCurveTo(r - 2 * n, i + a / 3, r - n / 2, i - 2 * a / 3, r, i)
        }
    })
}), define("zrender/graphic/shape/Droplet", ["require", "../Path"], function (t) {
    return t("../Path").extend({
        type: "droplet",
        shape: {cx: 0, cy: 0, width: 0, height: 0},
        buildPath: function (t, e) {
            var r = e.cx, i = e.cy, n = e.width, a = e.height;
            t.moveTo(r, i + n), t.bezierCurveTo(r + n, i + n, r + 3 * n / 2, i - n / 3, r, i - a), t.bezierCurveTo(r - 3 * n / 2, i - n / 3, r - n, i + n, r, i + n), t.closePath()
        }
    })
}), define("zrender/graphic/shape/Line", ["require", "../Path"], function (t) {
    return t("../Path").extend({
        type: "line",
        shape: {x1: 0, y1: 0, x2: 0, y2: 0, percent: 1},
        style: {stroke: "#000", fill: null},
        buildPath: function (t, e) {
            var r = e.x1, i = e.y1, n = e.x2, a = e.y2, o = e.percent;
            0 !== o && (t.moveTo(r, i), 1 > o && (n = r * (1 - o) + n * o, a = i * (1 - o) + a * o), t.lineTo(n, a))
        },
        pointAt: function (t) {
            var e = this.shape;
            return [e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t]
        }
    })
}), define("zrender/graphic/shape/Star", ["require", "../Path"], function (t) {
    var e = Math.PI, r = Math.cos, i = Math.sin;
    return t("../Path").extend({
        type: "star", shape: {cx: 0, cy: 0, n: 3, r0: null, r: 0}, buildPath: function (t, n) {
            var a = n.n;
            if (a && !(2 > a)) {
                var o = n.cx, s = n.cy, h = n.r, l = n.r0;
                null == l && (l = a > 4 ? h * r(2 * e / a) / r(e / a) : h / 3);
                var u = e / a, c = -e / 2, f = o + h * r(c), d = s + h * i(c);
                c += u, t.moveTo(f, d);
                for (var p, v = 0, g = 2 * a - 1; g > v; v++)p = v % 2 === 0 ? l : h, t.lineTo(o + p * r(c), s + p * i(c)), c += u;
                t.closePath()
            }
        }
    })
}), define("zrender/graphic/shape/Isogon", ["require", "../Path"], function (t) {
    var e = Math.PI, r = Math.sin, i = Math.cos;
    return t("../Path").extend({
        type: "isogon", shape: {x: 0, y: 0, r: 0, n: 0}, buildPath: function (t, n) {
            var a = n.n;
            if (a && !(2 > a)) {
                var o = n.x, s = n.y, h = n.r, l = 2 * e / a, u = -e / 2;
                t.moveTo(o + h * i(u), s + h * r(u));
                for (var c = 0, f = a - 1; f > c; c++)u += l, t.lineTo(o + h * i(u), s + h * r(u));
                t.closePath()
            }
        }
    })
}), define("zrender/graphic/shape/BezierCurve", ["require", "../../core/curve", "../../core/vector", "../Path"], function (t) {
    function e(t, e, r) {
        var i = t.cpx2, n = t.cpy2;
        return null === i || null === n ? [(r ? l : s)(t.x1, t.cpx1, t.cpx2, t.x2, e), (r ? l : s)(t.y1, t.cpy1, t.cpy2, t.y2, e)] : [(r ? h : o)(t.x1, t.cpx1, t.x2, e), (r ? h : o)(t.y1, t.cpy1, t.y2, e)]
    }

    var r = t("../../core/curve"), i = t("../../core/vector"), n = r.quadraticSubdivide, a = r.cubicSubdivide, o = r.quadraticAt, s = r.cubicAt, h = r.quadraticDerivativeAt, l = r.cubicDerivativeAt, u = [];
    return t("../Path").extend({
        type: "bezier-curve",
        shape: {x1: 0, y1: 0, x2: 0, y2: 0, cpx1: 0, cpy1: 0, percent: 1},
        style: {stroke: "#000", fill: null},
        buildPath: function (t, e) {
            var r = e.x1, i = e.y1, o = e.x2, s = e.y2, h = e.cpx1, l = e.cpy1, c = e.cpx2, f = e.cpy2, d = e.percent;
            0 !== d && (t.moveTo(r, i), null == c || null == f ? (1 > d && (n(r, h, o, d, u), h = u[1], o = u[2], n(i, l, s, d, u), l = u[1], s = u[2]), t.quadraticCurveTo(h, l, o, s)) : (1 > d && (a(r, h, c, o, d, u), h = u[1], c = u[2], o = u[3], a(i, l, f, s, d, u), l = u[1], f = u[2], s = u[3]), t.bezierCurveTo(h, l, c, f, o, s)))
        },
        pointAt: function (t) {
            return e(this.shape, t, !1)
        },
        tangentAt: function (t) {
            var r = e(this.shape, t, !0);
            return i.normalize(r, r)
        }
    })
}), define("zrender/graphic/helper/smoothSpline", ["require", "../../core/vector"], function (t) {
    function e(t, e, r, i, n, a, o) {
        var s = .5 * (r - t), h = .5 * (i - e);
        return (2 * (e - r) + s + h) * o + (-3 * (e - r) - 2 * s - h) * a + s * n + e
    }

    var r = t("../../core/vector");
    return function (t, i) {
        for (var n = t.length, a = [], o = 0, s = 1; n > s; s++)o += r.distance(t[s - 1], t[s]);
        var h = o / 2;
        h = n > h ? n : h;
        for (var s = 0; h > s; s++) {
            var l, u, c, f = s / (h - 1) * (i ? n : n - 1), d = Math.floor(f), p = f - d, v = t[d % n];
            i ? (l = t[(d - 1 + n) % n], u = t[(d + 1) % n], c = t[(d + 2) % n]) : (l = t[0 === d ? d : d - 1], u = t[d > n - 2 ? n - 1 : d + 1], c = t[d > n - 3 ? n - 1 : d + 2]);
            var g = p * p, m = p * g;
            a.push([e(l[0], v[0], u[0], c[0], p, g, m), e(l[1], v[1], u[1], c[1], p, g, m)])
        }
        return a
    }
}), define("zrender/graphic/helper/smoothBezier", ["require", "../../core/vector"], function (t) {
    var e = t("../../core/vector"), r = e.min, i = e.max, n = e.scale, a = e.distance, o = e.add;
    return function (t, s, h, l) {
        var u, c, f, d, p = [], v = [], g = [], m = [];
        if (l) {
            f = [1 / 0, 1 / 0], d = [-(1 / 0), -(1 / 0)];
            for (var _ = 0, y = t.length; y > _; _++)r(f, f, t[_]), i(d, d, t[_]);
            r(f, f, l[0]), i(d, d, l[1])
        }
        for (var _ = 0, y = t.length; y > _; _++) {
            var x = t[_];
            if (h)u = t[_ ? _ - 1 : y - 1], c = t[(_ + 1) % y]; else {
                if (0 === _ || _ === y - 1) {
                    p.push(e.clone(t[_]));
                    continue
                }
                u = t[_ - 1], c = t[_ + 1]
            }
            e.sub(v, c, u), n(v, v, s);
            var b = a(x, u), w = a(x, c), T = b + w;
            0 !== T && (b /= T, w /= T), n(g, v, -b), n(m, v, w);
            var P = o([], x, g), k = o([], x, m);
            l && (i(P, P, f), r(P, P, d), i(k, k, f), r(k, k, d)), p.push(P), p.push(k)
        }
        return h && p.push(p.shift()), p
    }
}), define("zrender/graphic/helper/poly", ["require", "./smoothSpline", "./smoothBezier"], function (t) {
    var e = t("./smoothSpline"), r = t("./smoothBezier");
    return {
        buildPath: function (t, i, n) {
            var a = i.points, o = i.smooth;
            if (a && a.length >= 2) {
                if (o && "spline" !== o) {
                    var s = r(a, o, n, i.smoothConstraint);
                    t.moveTo(a[0][0], a[0][1]);
                    for (var h = a.length, l = 0; (n ? h : h - 1) > l; l++) {
                        var u = s[2 * l], c = s[2 * l + 1], f = a[(l + 1) % h];
                        t.bezierCurveTo(u[0], u[1], c[0], c[1], f[0], f[1])
                    }
                } else {
                    "spline" === o && (a = e(a, n)), t.moveTo(a[0][0], a[0][1]);
                    for (var l = 1, d = a.length; d > l; l++)t.lineTo(a[l][0], a[l][1])
                }
                n && t.closePath()
            }
        }
    }
}), define("zrender/graphic/shape/Polyline", ["require", "../helper/poly", "../Path"], function (t) {
    var e = t("../helper/poly");
    return t("../Path").extend({
        type: "polyline",
        shape: {points: null, smooth: !1, smoothConstraint: null},
        style: {stroke: "#000", fill: null},
        buildPath: function (t, r) {
            e.buildPath(t, r, !1)
        }
    })
}), define("zrender/graphic/shape/Polygon", ["require", "../helper/poly", "../Path"], function (t) {
    var e = t("../helper/poly");
    return t("../Path").extend({
        type: "polygon",
        shape: {points: null, smooth: !1, smoothConstraint: null},
        buildPath: function (t, r) {
            e.buildPath(t, r, !0)
        }
    })
}), define("zrender/graphic/Gradient", ["require"], function () {
    var t = function (t) {
        this.colorStops = t || []
    };
    return t.prototype = {
        constructor: t, addColorStop: function (t, e) {
            this.colorStops.push({offset: t, color: e})
        }
    }, t
}), define("zrender/vml/core", ["require", "exports", "module", "../core/env"], function (t, e, r) {
    if (!t("../core/env").canvasSupported) {
        var i, n = "urn:schemas-microsoft-com:vml", a = window, o = a.document, s = !1;
        try {
            !o.namespaces.zrvml && o.namespaces.add("zrvml", n), i = function (t) {
                return o.createElement("<zrvml:" + t + ' class="zrvml">')
            }
        } catch (h) {
            i = function (t) {
                return o.createElement("<" + t + ' xmlns="' + n + '" class="zrvml">')
            }
        }
        var l = function () {
            if (!s) {
                s = !0;
                var t = o.styleSheets;
                t.length < 31 ? o.createStyleSheet().addRule(".zrvml", "behavior:url(#default#VML)") : t[0].addRule(".zrvml", "behavior:url(#default#VML)")
            }
        };
        r.exports = {doc: o, initVML: l, createNode: i}
    }
}), define("zrender/vml/graphic", ["require", "../core/env", "../core/vector", "../core/BoundingRect", "../core/PathProxy", "../tool/color", "../contain/text", "../graphic/mixin/RectText", "../graphic/Displayable", "../graphic/Image", "../graphic/Text", "../graphic/Path", "../core/PathProxy", "../graphic/Gradient", "./core"], function (t) {
    if (!t("../core/env").canvasSupported) {
        var e = t("../core/vector"), r = t("../core/BoundingRect"), i = t("../core/PathProxy").CMD, n = t("../tool/color"), a = t("../contain/text"), o = t("../graphic/mixin/RectText"), s = t("../graphic/Displayable"), h = t("../graphic/Image"), l = t("../graphic/Text"), u = t("../graphic/Path"), c = t("../core/PathProxy"), f = t("../graphic/Gradient"), d = t("./core"), p = Math.round, v = Math.sqrt, g = Math.abs, m = Math.cos, _ = Math.sin, y = Math.max, x = e.applyTransform, b = ",", w = "progid:DXImageTransform.Microsoft", T = 21600, P = T / 2, k = 1e5, z = 1e3, M = function (t) {
            t.style.cssText = "position:absolute;left:0;top:0;width:1px;height:1px;", t.coordsize = T + "," + T, t.coordorigin = "0,0"
        }, S = function (t) {
            return String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;")
        }, L = function (t, e, r) {
            return "rgb(" + [t, e, r].join(",") + ")"
        }, C = function (t, e) {
            e && t && e.parentNode !== t && t.appendChild(e)
        }, R = function (t, e) {
            e && t && e.parentNode === t && t.removeChild(e)
        }, A = function (t, e, r) {
            return (parseFloat(t) || 0) * k + (parseFloat(e) || 0) * z + r
        }, q = function (t, e) {
            return "string" == typeof t ? t.lastIndexOf("%") >= 0 ? parseFloat(t) / 100 * e : parseFloat(t) : t
        }, E = function (t, e, r) {
            var i = n.parse(e);
            r = +r, isNaN(r) && (r = 1), i && (t.color = L(i[0], i[1], i[2]), t.opacity = r * i[3])
        }, B = function (t) {
            var e = n.parse(t);
            return [L(e[0], e[1], e[2]), e[3]]
        }, I = function (t, e, r) {
            var i = e.fill;
            if (null != i)if (i instanceof f) {
                var n, a = 0, o = [0, 0], s = 0, h = 1, l = r.getBoundingRect(), u = l.width, c = l.height;
                if ("linear" === i.type) {
                    n = "gradient";
                    var d = r.transform, p = [i.x * u, i.y * c], v = [i.x2 * u, i.y2 * c];
                    d && (x(p, p, d), x(v, v, d));
                    var g = v[0] - p[0], m = v[1] - p[1];
                    a = 180 * Math.atan2(g, m) / Math.PI, 0 > a && (a += 360), 1e-6 > a && (a = 0)
                } else {
                    n = "gradientradial";
                    var p = [i.x * u, i.y * c], d = r.transform, _ = r.scale, b = u, w = c;
                    o = [(p[0] - l.x) / b, (p[1] - l.y) / w], d && x(p, p, d), b /= _[0] * T, w /= _[1] * T;
                    var P = y(b, w);
                    s = 0 / P, h = 2 * i.r / P - s
                }
                var k = i.colorStops.slice();
                k.sort(function (t, e) {
                    return t.offset - e.offset
                });
                for (var z = k.length, M = [], S = [], L = 0; z > L; L++) {
                    var C = k[L], R = B(C.color);
                    S.push(C.offset * h + s + " " + R[0]), (0 === L || L === z - 1) && M.push(R)
                }
                if (z >= 2) {
                    var A = M[0][0], q = M[1][0], I = M[0][1] * e.opacity, D = M[1][1] * e.opacity;
                    t.type = n, t.method = "none", t.focus = "100%", t.angle = a, t.color = A, t.color2 = q, t.colors = S.join(","), t.opacity = D, t.opacity2 = I
                }
                "radial" === n && (t.focusposition = o.join(","))
            } else E(t, i, e.opacity)
        }, D = function (t, e) {
            null != e.lineDash && (t.dashstyle = e.lineDash.join(" ")), null == e.stroke || e.stroke instanceof f || E(t, e.stroke, e.opacity)
        }, O = function (t, e, r, i) {
            var n = "fill" == e, a = t.getElementsByTagName(e)[0];
            null != r[e] && "none" !== r[e] && (n || !n && r.lineWidth) ? (t[n ? "filled" : "stroked"] = "true", r[e] instanceof f && R(t, a), a || (a = d.createNode(e)), n ? I(a, r, i) : D(a, r), C(t, a)) : (t[n ? "filled" : "stroked"] = "false", R(t, a))
        }, F = [[], [], []], H = function (t, e) {
            var r, n, a, o, s, h, l = i.M, u = i.C, c = i.L, f = i.A, d = i.Q, g = [];
            for (o = 0; o < t.length;) {
                switch (a = t[o++], n = "", r = 0, a) {
                    case l:
                        n = " m ", r = 1, s = t[o++], h = t[o++], F[0][0] = s, F[0][1] = h;
                        break;
                    case c:
                        n = " l ", r = 1, s = t[o++], h = t[o++], F[0][0] = s, F[0][1] = h;
                        break;
                    case d:
                    case u:
                        n = " c ", r = 3;
                        var y, w, k = t[o++], z = t[o++], M = t[o++], S = t[o++];
                        a === d ? (y = M, w = S, M = (M + 2 * k) / 3, S = (S + 2 * z) / 3, k = (s + 2 * k) / 3, z = (h + 2 * z) / 3) : (y = t[o++], w = t[o++]), F[0][0] = k, F[0][1] = z, F[1][0] = M, F[1][1] = S, F[2][0] = y, F[2][1] = w, s = y, h = w;
                        break;
                    case f:
                        var L = 0, C = 0, R = 1, A = 1, q = 0;
                        e && (L = e[4], C = e[5], R = v(e[0] * e[0] + e[1] * e[1]), A = v(e[2] * e[2] + e[3] * e[3]), q = Math.atan2(-e[1] / A, e[0] / R));
                        var E = t[o++], B = t[o++], I = t[o++], D = t[o++], O = t[o++] + q, H = t[o++] + O + q;
                        o++;
                        var j = t[o++], N = E + m(O) * I, V = B + _(O) * D, k = E + m(H) * I, z = B + _(H) * D, X = j ? " wa " : " at ";
                        Math.abs(N - k) < 1e-4 && (Math.abs(H - O) > .01 ? j && (N += 270 / T) : Math.abs(V - B) < 1e-4 ? j && E > N || !j && N > E ? z -= 270 / T : z += 270 / T : j && B > V || !j && V > B ? k += 270 / T : k -= 270 / T), g.push(X, p(((E - I) * R + L) * T - P), b, p(((B - D) * A + C) * T - P), b, p(((E + I) * R + L) * T - P), b, p(((B + D) * A + C) * T - P), b, p((N * R + L) * T - P), b, p((V * A + C) * T - P), b, p((k * R + L) * T - P), b, p((z * A + C) * T - P)), s = k, h = z;
                        break;
                    case i.R:
                        var W = F[0], G = F[1];
                        W[0] = t[o++], W[1] = t[o++], G[0] = W[0] + t[o++], G[1] = W[1] + t[o++], e && (x(W, W, e), x(G, G, e)), W[0] = p(W[0] * T - P), G[0] = p(G[0] * T - P), W[1] = p(W[1] * T - P), G[1] = p(G[1] * T - P), g.push(" m ", W[0], b, W[1], " l ", G[0], b, W[1], " l ", G[0], b, G[1], " l ", W[0], b, G[1]);
                        break;
                    case i.Z:
                        g.push(" x ")
                }
                if (r > 0) {
                    g.push(n);
                    for (var Y = 0; r > Y; Y++) {
                        var U = F[Y];
                        e && x(U, U, e), g.push(p(U[0] * T - P), b, p(U[1] * T - P), r - 1 > Y ? b : "")
                    }
                }
            }
            return g.join("")
        };
        u.prototype.brushVML = function (t) {
            var e = this.style, r = this._vmlEl;
            r || (r = d.createNode("shape"), M(r), this._vmlEl = r), O(r, "fill", e, this), O(r, "stroke", e, this);
            var i = this.transform, n = null != i, a = r.getElementsByTagName("stroke")[0];
            if (a) {
                var o = e.lineWidth;
                if (n && !e.strokeNoScale) {
                    var s = i[0] * i[3] - i[1] * i[2];
                    o *= v(g(s))
                }
                a.weight = o + "px"
            }
            var h = this.path || (this.path = new c);
            this.__dirtyPath && (h.beginPath(), this.buildPath(h, this.shape), h.toStatic(), this.__dirtyPath = !1), r.path = H(h.data, this.transform), r.style.zIndex = A(this.zlevel, this.z, this.z2), C(t, r), null != e.text ? this.drawRectText(t, this.getBoundingRect()) : this.removeRectText(t)
        }, u.prototype.onRemove = function (t) {
            R(t, this._vmlEl), this.removeRectText(t)
        }, u.prototype.onAdd = function (t) {
            C(t, this._vmlEl), this.appendRectText(t)
        };
        var j = function (t) {
            return "object" == typeof t && t.tagName && "IMG" === t.tagName.toUpperCase()
        };
        h.prototype.brushVML = function (t) {
            var e, r, i = this.style, n = i.image;
            if (j(n)) {
                var a = n.src;
                if (a === this._imageSrc)e = this._imageWidth, r = this._imageHeight; else {
                    var o = n.runtimeStyle, s = o.width, h = o.height;
                    o.width = "auto", o.height = "auto", e = n.width, r = n.height, o.width = s, o.height = h, this._imageSrc = a, this._imageWidth = e, this._imageHeight = r
                }
                n = a
            } else n === this._imageSrc && (e = this._imageWidth, r = this._imageHeight);
            if (n) {
                var l = i.x || 0, u = i.y || 0, c = i.width, f = i.height, g = i.sWidth, m = i.sHeight, _ = i.sx || 0, T = i.sy || 0, P = g && m, k = this._vmlEl;
                k || (k = d.doc.createElement("div"), M(k), this._vmlEl = k);
                var z, S = k.style, L = !1, R = 1, q = 1;
                if (this.transform && (z = this.transform, R = v(z[0] * z[0] + z[1] * z[1]), q = v(z[2] * z[2] + z[3] * z[3]), L = z[1] || z[2]), L) {
                    var E = [l, u], B = [l + c, u], I = [l, u + f], D = [l + c, u + f];
                    x(E, E, z), x(B, B, z), x(I, I, z), x(D, D, z);
                    var O = y(E[0], B[0], I[0], D[0]), F = y(E[1], B[1], I[1], D[1]), H = [];
                    H.push("M11=", z[0] / R, b, "M12=", z[2] / q, b, "M21=", z[1] / R, b, "M22=", z[3] / q, b, "Dx=", p(l * R + z[4]), b, "Dy=", p(u * q + z[5])), S.padding = "0 " + p(O) + "px " + p(F) + "px 0", S.filter = w + ".Matrix(" + H.join("") + ", SizingMethod=clip)"
                } else z && (l = l * R + z[4], u = u * q + z[5]), S.filter = "", S.left = p(l) + "px", S.top = p(u) + "px";
                var N = this._imageEl, V = this._cropEl;
                N || (N = d.doc.createElement("div"), this._imageEl = N);
                var X = N.style;
                if (P) {
                    if (e && r)X.width = p(R * e * c / g) + "px", X.height = p(q * r * f / m) + "px"; else {
                        var W = new Image, G = this;
                        W.onload = function () {
                            W.onload = null, e = W.width, r = W.height, X.width = p(R * e * c / g) + "px", X.height = p(q * r * f / m) + "px", G._imageWidth = e, G._imageHeight = r, G._imageSrc = n
                        }, W.src = n
                    }
                    V || (V = d.doc.createElement("div"), V.style.overflow = "hidden", this._cropEl = V);
                    var Y = V.style;
                    Y.width = p((c + _ * c / g) * R), Y.height = p((f + T * f / m) * q), Y.filter = w + ".Matrix(Dx=" + -_ * c / g * R + ",Dy=" + -T * f / m * q + ")", V.parentNode || k.appendChild(V), N.parentNode != V && V.appendChild(N)
                } else X.width = p(R * c) + "px", X.height = p(q * f) + "px", k.appendChild(N), V && V.parentNode && (k.removeChild(V), this._cropEl = null);
                var U = "", Z = i.opacity;
                1 > Z && (U += ".Alpha(opacity=" + p(100 * Z) + ") "), U += w + ".AlphaImageLoader(src=" + n + ", SizingMethod=scale)", X.filter = U, k.style.zIndex = A(this.zlevel, this.z, this.z2), C(t, k), null != i.text && this.drawRectText(t, this.getBoundingRect())
            }
        }, h.prototype.onRemove = function (t) {
            R(t, this._vmlEl), this._vmlEl = null, this._cropEl = null, this._imageEl = null, this.removeRectText(t)
        }, h.prototype.onAdd = function (t) {
            C(t, this._vmlEl), this.appendRectText(t)
        };
        var N, V = "normal", X = {}, W = 0, G = 100, Y = document.createElement("div"), U = function (t) {
            var e = X[t];
            if (!e) {
                W > G && (W = 0, X = {});
                var r, i = Y.style;
                try {
                    i.font = t, r = i.fontFamily.split(",")[0]
                } catch (n) {
                }
                e = {
                    style: i.fontStyle || V,
                    variant: i.fontVariant || V,
                    weight: i.fontWeight || V,
                    size: 0 | parseFloat(i.fontSize || 12),
                    family: r || "Microsoft YaHei"
                }, X[t] = e, W++
            }
            return e
        };
        a.measureText = function (t, e) {
            var r = d.doc;
            N || (N = r.createElement("div"), N.style.cssText = "position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;", d.doc.body.appendChild(N));
            try {
                N.style.font = e
            } catch (i) {
            }
            return N.innerHTML = "", N.appendChild(r.createTextNode(t)), {width: N.offsetWidth}
        };
        for (var Z = new r, Q = function (t, e, r, i) {
            var n = this.style, o = n.text;
            if (null != o && (o += ""), o) {
                var s, h, l = n.textAlign, u = U(n.textFont), c = u.style + " " + u.variant + " " + u.weight + " " + u.size + 'px "' + u.family + '"', f = n.textBaseline, v = n.textVerticalAlign;
                r = r || a.getBoundingRect(o, c, l, f);
                var g = this.transform;
                if (g && !i && (Z.copy(e), Z.applyTransform(g), e = Z), i)s = e.x, h = e.y; else {
                    var m = n.textPosition, _ = n.textDistance;
                    if (m instanceof Array)s = e.x + q(m[0], e.width), h = e.y + q(m[1], e.height), l = l || "left", f = f || "top"; else {
                        var y = a.adjustTextPositionOnRect(m, e, r, _);
                        s = y.x, h = y.y, l = l || y.textAlign, f = f || y.textBaseline
                    }
                }
                if (v) {
                    switch (v) {
                        case"middle":
                            h -= r.height / 2;
                            break;
                        case"bottom":
                            h -= r.height
                    }
                    f = "top"
                }
                var w = u.size;
                switch (f) {
                    case"hanging":
                    case"top":
                        h += w / 1.75;
                        break;
                    case"middle":
                        break;
                    default:
                        h -= w / 2.25
                }
                switch (l) {
                    case"left":
                        break;
                    case"center":
                        s -= r.width / 2;
                        break;
                    case"right":
                        s -= r.width
                }
                var T, P, k, z = d.createNode, L = this._textVmlEl;
                L ? (k = L.firstChild, T = k.nextSibling, P = T.nextSibling) : (L = z("line"), T = z("path"), P = z("textpath"), k = z("skew"), P.style["v-text-align"] = "left", M(L), T.textpathok = !0, P.on = !0, L.from = "0 0", L.to = "1000 0.05", C(L, k), C(L, T), C(L, P), this._textVmlEl = L);
                var R = [s, h], E = L.style;
                g && i ? (x(R, R, g), k.on = !0, k.matrix = g[0].toFixed(3) + b + g[2].toFixed(3) + b + g[1].toFixed(3) + b + g[3].toFixed(3) + ",0,0", k.offset = (p(R[0]) || 0) + "," + (p(R[1]) || 0), k.origin = "0 0", E.left = "0px", E.top = "0px") : (k.on = !1, E.left = p(s) + "px", E.top = p(h) + "px"), P.string = S(o);
                try {
                    P.style.font = c
                } catch (B) {
                }
                O(L, "fill", {
                    fill: i ? n.fill : n.textFill,
                    opacity: n.opacity
                }, this), O(L, "stroke", {
                    stroke: i ? n.stroke : n.textStroke,
                    opacity: n.opacity,
                    lineDash: n.lineDash
                }, this), L.style.zIndex = A(this.zlevel, this.z, this.z2), C(t, L)
            }
        }, $ = function (t) {
            R(t, this._textVmlEl), this._textVmlEl = null
        }, K = function (t) {
            C(t, this._textVmlEl)
        }, J = [o, s, h, u, l], tt = 0; tt < J.length; tt++) {
            var et = J[tt].prototype;
            et.drawRectText = Q, et.removeRectText = $, et.appendRectText = K
        }
        l.prototype.brushVML = function (t) {
            var e = this.style;
            null != e.text ? this.drawRectText(t, {
                x: e.x || 0,
                y: e.y || 0,
                width: 0,
                height: 0
            }, this.getBoundingRect(), !0) : this.removeRectText(t)
        }, l.prototype.onRemove = function (t) {
            this.removeRectText(t)
        }, l.prototype.onAdd = function (t) {
            this.appendRectText(t)
        }
    }
}), define("zrender/vml/Painter", ["require", "../core/log", "./core"], function (t) {
    function e(t) {
        return parseInt(t, 10)
    }

    function r(t, e) {
        a.initVML(), this.root = t, this.storage = e;
        var r = document.createElement("div"), i = document.createElement("div");
        r.style.cssText = "display:inline-block;overflow:hidden;position:relative;width:300px;height:150px;", i.style.cssText = "position:absolute;left:0;top:0;", t.appendChild(r), this._vmlRoot = i, this._vmlViewport = r, this.resize();
        var n = e.delFromStorage, o = e.addToStorage;
        e.delFromStorage = function (t) {
            n.call(e, t), t && t.onRemove && t.onRemove(i)
        }, e.addToStorage = function (t) {
            t.onAdd && t.onAdd(i), o.call(e, t)
        }, this._firstPaint = !0
    }

    function i(t) {
        return function () {
            n('In IE8.0 VML mode painter not support method "' + t + '"')
        }
    }

    var n = t("../core/log"), a = t("./core");
    r.prototype = {
        constructor: r, getViewportRoot: function () {
            return this._vmlViewport
        }, refresh: function () {
            var t = this.storage.getDisplayList(!0, !0);
            this._paintList(t)
        }, _paintList: function (t) {
            for (var e = this._vmlRoot, r = 0; r < t.length; r++) {
                var i = t[r];
                i.invisible || i.ignore ? (i.__alreadyNotVisible || i.onRemove(e), i.__alreadyNotVisible = !0) : (i.__alreadyNotVisible && i.onAdd(e), i.__alreadyNotVisible = !1, i.__dirty && (i.beforeBrush && i.beforeBrush(), (i.brushVML || i.brush).call(i, e), i.afterBrush && i.afterBrush())), i.__dirty = !1
            }
            this._firstPaint && (this._vmlViewport.appendChild(e), this._firstPaint = !1)
        }, resize: function (t, e) {
            var t = null == t ? this._getWidth() : t, e = null == e ? this._getHeight() : e;
            if (this._width != t || this._height != e) {
                this._width = t, this._height = e;
                var r = this._vmlViewport.style;
                r.width = t + "px", r.height = e + "px"
            }
        }, dispose: function () {
            this.root.innerHTML = "", this._vmlRoot = this._vmlViewport = this.storage = null
        }, getWidth: function () {
            return this._width
        }, getHeight: function () {
            return this._height
        }, clear: function () {
            this._vmlViewport && this.root.removeChild(this._vmlViewport)
        }, _getWidth: function () {
            var t = this.root, r = t.currentStyle;
            return (t.clientWidth || e(r.width)) - e(r.paddingLeft) - e(r.paddingRight) | 0
        }, _getHeight: function () {
            var t = this.root, r = t.currentStyle;
            return (t.clientHeight || e(r.height)) - e(r.paddingTop) - e(r.paddingBottom) | 0
        }
    };
    for (var o = ["getLayer", "insertLayer", "eachLayer", "eachBuiltinLayer", "eachOtherLayer", "getLayers", "modLayer", "delLayer", "clearLayer", "toDataURL", "pathToImage"], s = 0; s < o.length; s++) {
        var h = o[s];
        r.prototype[h] = i(h)
    }
    return r
}), define("zrender/vml/vml", ["require", "./graphic", "../zrender", "./Painter"], function (t) {
    t("./graphic"), t("../zrender").registerPainter("vml", t("./Painter"))
});