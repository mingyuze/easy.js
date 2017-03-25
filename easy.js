(function(window,undefined){
    var document = window.document;
    var _Easy = function(selector,context){
        return new _Easy.fn.init(selector,context);
    }

    _Easy.fn = _Easy.prototype = {
        version:'1.0',
        constructor:_Easy,
        init:function(selector,context){

        }

    }

    _Easy.fn.init.prototype = _Easy.fn;
})(window,undefined)