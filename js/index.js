var pageData, pageNumber, waterfall;
// 请求
function getData(pageNumber) {
    $.ajax({
        url: "https://api.apiopen.top/musicBroadcasting",
        type: 'GET',
        dataType: "json",
        data: {},
        success: function (data) {
            // 数据格式:[{src:xxx, href:xxx, text:xxx},{src:xxx, href:xxx, text:xxx}]
            if (pageNumber == 1) {
                for (x in data.result[0].channellist) {
                    data.result[0].channellist[x].src = data.result[0].channellist[x].thumb;
                    data.result[0].channellist[x].href = "www.baidu.com";
                    data.result[0].channellist[x].text = data.result[0].channellist[x].name;
                }
                waterfall.data = waterfall.data.concat(data.result[0].channellist);
                waterfall.wraplist(document.getElementById('wrap'), data.result[0].channellist);
            }else {
                for (x in data.result[1].channellist) {
                    data.result[1].channellist[x].src = data.result[1].channellist[x].avatar;
                    data.result[1].channellist[x].href = "www.baidu.com";
                    data.result[1].channellist[x].text = data.result[1].channellist[x].name;
                }
                waterfall.data = waterfall.data.concat(data.result[1].channellist);
                waterfall.wraplist(document.getElementById('wrap'), data.result[1].channellist);
            }
            // 组件中滚动总页数
            pageData.totalPage = 3;
        }
    });
}

// 初始化
function init() {
    // 加载多页
    pageData = { pageSize: 10, totalPage: 1, dataDescription: "" };
    // 组件使用
    waterfall = new waterfallFlowLayout({
        container: "#wrap",
        data: [],
        isScroll: true,
        pageData: pageData
    });
    // 监听页码改变
    pageNumber = 1;
    Object.defineProperty(pageData, "pageNumber", {
        get: function () {
            return pageNumber;
        },
        set: function (value) {
            pageNumber = value;
            getData(pageNumber);
        }
    });
    // 提示信息处理
    Object.defineProperty(pageData, "dataDescription", {
        get: function () {
            return dataDescription;
        },
        set: function (value) {
            dataDescription = value;
            $("#descrip>span").text("已全部加载完毕!");
        }
    });
}

window.onload = function () {
    var wrap = document.getElementById('wrap');
    init();
    getData(pageNumber);
}

