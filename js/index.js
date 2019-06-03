window.onload = function () {
    var wrap = document.getElementById('wrap');
    $.ajax({
        url: "https://api.apiopen.top/musicBroadcasting",
        type: 'GET',
        dataType: "json",
        data: {},
        success: function (data) {
            // 数据格式:[{src:xxx, href:xxx, text:xxx},{src:xxx, href:xxx, text:xxx}]
            for(x in data.result[0].channellist) {
                data.result[0].channellist[x].src = data.result[0].channellist[x].thumb;
                data.result[0].channellist[x].href = "www.baidu.com";
                data.result[0].channellist[x].text = data.result[0].channellist[x].name;
            }
            // 加载多页
            var pageData = {pageNumber: 1, pageSize: 10,totalPage: 3, dataDescription: ""};
            // 组件使用
            var waterfall = new waterfallFlowLayout({
                container: "#wrap",
                data: data.result[0].channellist,
                isScroll: true,
                pageData: pageData
            });
            // 监听页码改变
            Object.defineProperty(pageData, "pageNumber", {
                get:function() {
                    return pageNumber;
                },
                set:function(value) {
                    pageNumber = value;
                    for(x in data.result[1].channellist) {
                        data.result[1].channellist[x].src = data.result[1].channellist[x].avatar;
                        data.result[1].channellist[x].href = "www.baidu.com";
                        data.result[1].channellist[x].text = data.result[1].channellist[x].name;
                    }
                    waterfall.data = data.result[0].channellist.concat( data.result[1].channellist);
                    setTimeout(function () {
                        waterfall.wraplist(document.getElementById('wrap'), data.result[1].channellist);
                    }, 3000);
                }
            });
            // 提示信息处理(这里没做处理仅监听,处理部分写在组件里了)
            Object.defineProperty(pageData, "dataDescription", {
                get:function() {
                    return dataDescription;
                },
                set:function(value) {
                    dataDescription = value;
                }
            });
            // 加载多页的初始值
            pageData.pageNumber = 1;
        }
    });
}

