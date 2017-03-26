(function (window, undefined) {
    var document = window.document;

    var _Easy = function (selector, context) {
        return new _Easy.fn.init(selector, context);
    }

    var _rootEasy;
    _Easy.fn = _Easy.prototype = {
        version: '1.0',
        length: 0,
        constructor: _Easy,

        eq: function (num) {
            num = num != null ? (num < 0 ? num + this.length : num) : 0;
            return this[num] ? this.merge(this[num], this.constructor(null)) : undefined;
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        end: function () {
            return this.prevObject || this.constructor(null);
        },
        get: function (num) {
            return num != null ? this[num < 0 ? num + this.length : num] : this;
        },
        merge: function (elems, context) {
            var newObj = context || this,
                i=0,
                len = elems.length;

            if (elems.length > 0) {
                for (var i = 0; i < elems.length; i++) {
                    newObj.push(elems[i]);
                }
            }
            else if (typeof elems === 'object') {
                newObj.push(elems);
            }

            _rootEasy ? newObj.prevObject = this.prevObject ? this : _rootEasy : null;
            newObj.context = this.context || document;
            return newObj;
        },
        each: function (callback, args) {
            return _Easy.each(this, callback, args);
        },

        push: Array.prototype.push,
        slice: Array.prototype.slice,
        splice: Array.prototype.splice
    }

    _Easy.fn.init = function (selector, context) {
        var elemRegex = /^(?:(\w+)|#([\w-]+)|\.([\w-]+)|(<[\w\s\S-]+><\/[\w\s\S-]+>))$/; // tag | id | class | code snippets
        var match;

        if (!selector) {
            return;
        }

        if (typeof selector === 'string') {
            match = elemRegex.exec(selector);

            if (match) {
                if (match[1]) {
                    this.merge(document.getElementsByTagName(match[1]));
                }
                else if (match[2]) {
                    this.merge(document.getElementById(match[2]));
                }
                else if (match[3]) {
                    this.merge(document.getElementsByClassName(match[3]));
                }
                else if (match[4]) {
                    var tmp = document.createElement('div');
                    tmp.innerHTML = match[4];
                    this.merge(tmp.innerHTML);
                }
            }
        }
        else if (selector.nodeType) {
            this.merge(selector);
            this.context = selector;
        }

        return this;
    }

    _Easy.fn.init.prototype = _Easy.fn;
    _rootEasy = _Easy(document);

    _Easy.each = function (obj, callback, args) {
        var res,
            i = 0,
            len = obj.length;

        if (obj instanceof Array) {
            for (; i < len; i++) {
                res = callback.call(obj[i], i, obj[i], args);

                if (res === false) {
                    break;
                }
            }
        }
        else if (typeof target === 'object') {
            for (i in obj) {
                res = callback.call(obj[i], i, obj[i], args);

                if (res === false) {
                    break;
                }
            }
        }
    }

    window.$ = _Easy;
})(window, undefined)