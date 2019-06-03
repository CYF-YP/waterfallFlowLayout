// ;防止跟其他js压缩时报错
; (function (window, document) {
    // 开启严格模式
    "use strict";

    function waterfallFlowLayout(options) {
        var self = this;
        if (!options) {
            throw new Error("请传入配置参数");
        }
        self = Object.assign(self, options);
        self.container = document.querySelector(self.container) || document.querySelectorAll(self.container);
        
        self.wraplist(self.container, self.data);
        
        // 滚动加载部分,loadCount== 2时全部加载完成并显示提示信息
        var loadCount = 0;
        if(self.isScroll) {
            window.onscroll = function() {
                //文档内容实际高度（包括超出视窗的溢出部分）
                var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                //滚动条滚动距离
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                //窗口可视范围高度
                var clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight,document.body.clientHeight);
                
                if(clientHeight + scrollTop >= scrollHeight){
                    // 获取下一页数据并显示
                    if(self.pageData.pageNumber < self.pageData.totalPage) {
                        self.pageData.pageNumber += 1;
                        return self.pageData;
                    }else {
                        loadCount++;
                        self.pageData.dataDescription = "已全部加载完毕";
                        if(loadCount == 2) {
                            var div = document.createElement('div');
                            div.setAttribute('id', 'descrip');
                            div.innerHTML = '<span>已全部加载完毕</span>'
                            self.container.appendChild(div);
                            document.getElementById('descrip').style.width = '100%';
                            document.getElementById('descrip').style.textAlign = 'center';
                            document.getElementById('descrip').style.background = 'inherit';
                            document.getElementById('descrip').style.position = 'absolute';
                            document.getElementById('descrip').style.top = document.getElementById('descrip').previousElementSibling.offsetTop + document.getElementById('descrip').previousElementSibling.offsetHeight + 'px';
                        }
                        return self.pageData;
                    }
                }
            };
        }
        
        // 监听浏览器窗口改变重新布局
        var reclock;
        var reclockTip;
        window.onresize = function() {
            if(reclock) {
                clearTimeout(reclock);
                clearTimeout(reclockTip);
            }
            reclock = setTimeout(function() {
                self.container.innerHTML = "";
                self.reshow(self.container, self.data);
                // 防止图片未完全加载就执行,加一个定时器
                reclockTip = setTimeout(function() {
                    if(loadCount > 1) {
                        var div = document.createElement('div');
                        div.setAttribute('id', 'descrip');
                        div.innerHTML = '<span>已全部加载完毕</span>'
                        self.container.appendChild(div);
                        document.getElementById('descrip').style.width = '100%';
                        document.getElementById('descrip').style.textAlign = 'center';
                        document.getElementById('descrip').style.background = 'inherit';
                        document.getElementById('descrip').style.position = 'absolute';
                        document.getElementById('descrip').style.top = document.getElementById('descrip').previousElementSibling.offsetTop + document.getElementById('descrip').previousElementSibling.offsetHeight + 'px';
                    }
                }, 500);
            }, 500); 
        };
    };

    // 图片
    var imgReady = (function () {
        var list = [], intervalId = null,
            // 用来执行队列
            tick = function () {
                var i = 0;
                for (; i < list.length; i++) {
                    list[i].end ? list.splice(i--, 1) : list[i]();
                };
                !list.length && stop();
            },

            // 停止所有定时器队列
            stop = function () {
                clearInterval(intervalId);
                intervalId = null;
            };

        return function (url, ready, load, error) {
            var onready, width, height, newWidth, newHeight, img = new Image();
            img.src = url;

            // 如果图片被缓存，则直接返回缓存数据
            if (img.complete) {
                ready.call(img);
                load && load.call(img);
                return;
            };
            
            width = img.width;
            height = img.height;

            // 加载错误后的事件
            img.onerror = function () {
                error && error.call(img);
                onready.end = true;
                img = img.onload = img.onerror = null;
            };

            // 图片尺寸就绪
            onready = function () {
                newWidth = img.width;
                newHeight = img.height;
                if (newWidth !== width || newHeight !== height ||
                    // 如果图片已经在其他地方加载可使用面积检测
                    newWidth * newHeight > 1024
                ) {
                    ready.call(img);
                    onready.end = true;
                };
            };
            onready();

            // 完全加载完毕的事件
            img.onload = function () {
                // onload在定时器时间差范围内可能比onready快
                // 这里进行检查并保证onready优先执行
                !onready.end && onready();

                load && load.call(img);

                // IE gif动画会循环执行onload，置空onload即可
                img = img.onload = img.onerror = null;
            };

            // 加入队列中定期执行
            if (!onready.end) {
                list.push(onready);
                // 无论何时只允许出现一个定时器，减少浏览器性能损耗
                if (intervalId === null) intervalId = setInterval(tick, 40);
            };
        };
    })();

    // 原型链上提供方法
    waterfallFlowLayout.prototype = {
        reshow: function(wrap, data) {
            this.wraplist(wrap, data);
        },
        show: function(wrap) {
            var data = [];
            document.querySelectorAll('img').forEach((item, index) => {
                data.push(document.querySelectorAll('.list-item')[index]);
                this.loaded(item, index, wrap, data);
            });
        },
        // 图片处理
        loaded: function (element, index, wrap, data) {
            element.setAttribute('src', element.getAttribute('data-src'));
            element.setAttribute('data-isloaded', '1');
            imgReady(element.getAttribute('data-src'), function () {
                element.style.height = (wrap.getElementsByTagName('div')[index].offsetWidth - 20) * (this.height / this.width) + 'px';
                waterfallFlowLayout.prototype.waterfall(wrap, data);
            });
        },

        // 处理并显示列表
        wraplist: function (wrap, data) {
            for (var index in data) {
                var div = document.createElement('div');
                div.setAttribute('class', 'list-item');
                div.innerHTML = '<a href=' + data[index].href + '><img src="" data-src=' + data[index].src + ' data-isloaded="0" alt=""><span>' + data[index].text + '</span></a>';
                wrap.appendChild(div);
            }
            this.show(wrap);
        },

        // 瀑布流处理
        waterfall: function (wrap, data) {
            var boxes = data;
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
            for (var i = 0; i < boxes.length; i++) {
                if (i < colsNumber) {
                    everyHeight[i] = boxes[i].offsetHeight + 20;
                } else {
                    var minHeight = Math.min.apply(null, everyHeight);
                    var minIndex = this.getIndex(minHeight, everyHeight);
                    // offsetLeft 父元素设置position则为元素边框外侧到父元素边框内测的距离
                    var leftValue = boxes[minIndex].offsetLeft - 10;
                    boxes[i].style.position = 'absolute';
                    boxes[i].style.top = minHeight + 'px';
                    boxes[i].style.left = leftValue + 'px';
                    everyHeight[minIndex] += boxes[i].offsetHeight + 20;
                };
            }
        },

        // 获取最小列索引
        getIndex: function (minHeight, everyHeight) {
            for (var index in everyHeight) {
                if (everyHeight[index] == minHeight) {
                    return index;
                }
            }
        }
    };

    // 兼容CommonJs规范
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = waterfallFlowLayout;
    };

    // 兼容AMD/CMD规范
    if (typeof define === 'function') define(function () {
        return waterfallFlowLayout;
    });

    // 注册全局变量,兼容使用script标签引入插件
    window.waterfallFlowLayout = waterfallFlowLayout;
})(window, document);