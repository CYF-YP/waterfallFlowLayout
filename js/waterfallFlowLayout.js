// ;防止跟其他js压缩时报错
;(function(window, document){
    // 开启严格模式
    "use strict";
    function waterfallFlowLayout(options) {
        var self = this;
        if(!options) {
            throw new Error("请传入配置参数");
        }
        self = Object.assign(self, options);
        self.container = document.querySelector(self.container) || document.querySelectorAll(self.container);
        self.waterfall(self.container, self.data);
    };

    // 原型链上提供方法
    waterfallFlowLayout.prototype = {
        
        // 瀑布流处理
        waterfall:function(wrap, data) {
            var boxes = this.wraplist(wrap, data);
            // 获取屏幕显示的列数
            // offsetWidth 水平方向 width + 左右padding + 左右border-width
            var boxWidth = boxes[0].offsetWidth + 20;
            // clientWidth 水平方向 width + 左右padding
            var windowWidth = document.documentElement.clientWidth;
            var colsNumber = Math.floor(windowWidth / boxWidth);

            // 设置容器宽度
            wrap.style.width = boxWidth * colsNumber + 'px';

            // 定义一个数组并存储每一列高度
            var everyHeight = new Array();
            for(var i = 0; i < boxes.length; i++) {
                if(i < colsNumber) {
                    everyHeight[i] = boxes[i].offsetHeight + 20;
                } else {
                    var minHeight = Math.min.apply(null, everyHeight);
                    var minIndex = this.getIndex(minHeight, everyHeight);
                    var leftValue = boxes[minIndex].offsetLeft - 10;
                    boxes[i].style.position = 'absoult';
                    boxes[i].style.top = minHeight + 'px';
                    boxes[i].style.left = leftValue + 'px';
                    everyHeight[minIndex] += boxes[i].offsetHeight + 20;
                };
            }
        },
        // 获取最小列索引
        getIndex:function(minHeight, everyHeight) {
            for(var index in everyHeight) {
                if(everyHeight[index] == minHeight) {
                    return index;
                }
            }
        },
        // 处理并显示列表
        wraplist:function(wrap, data) {
            console.log(data);
            for(var index in data) {
                var div = document.createElement('div');
                div.innerHTML = '<a href='+ data[index].href +'><img src='+ data[index].src +' alt=""><span>'+ data[index].text +'<span></a>';
                wrap.appendChild(div);
            }
            return wrap.getElementsByTagName('div');
        }
    };
    // 兼容CommonJs规范
    if(typeof module !== 'undefined' && module.exports) {
        module.exports = waterfallFlowLayout;
    };
    // 兼容AMD/CMD规范
    if(typeof define === 'function') define(function() {
        return waterfallFlowLayout;
    });
    // 注册全局变量,兼容使用script标签引入插件
    window.waterfallFlowLayout = waterfallFlowLayout;
})(window, document);