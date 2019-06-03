window.onload = function () {
    var wrap = document.getElementById('wrap');
    // data = [{ 'href': 'www.baidu.com', 'text': '1', 'src': 'https://img.d2c.cn//2019/05/16/1143144a765c495adaa38efdb5c84099fb225e.jpg!300' },
    // { 'href': 'www.baidu.com', 'text': '2', 'src': 'images/2.png' },
    // { 'href': 'www.baidu.com', 'text': '3', 'src': 'images/3.png' },
    // { 'href': 'www.baidu.com', 'text': '4', 'src': 'images/4.png' },
    // { 'href': 'www.baidu.com', 'text': '5', 'src': 'images/5.png' },
    // { 'href': 'www.baidu.com', 'text': '6', 'src': 'images/6.png' },
    // { 'href': 'www.baidu.com', 'text': '7', 'src': 'images/7.png' },
    // { 'href': 'www.baidu.com', 'text': '8', 'src': 'images/8.png' },
    // { 'href': 'www.baidu.com', 'text': '9', 'src': 'images/9.png' },
    // { 'href': 'www.baidu.com', 'text': '10', 'src': 'images/10.png' },
    // { 'href': 'www.baidu.com', 'text': '11', 'src': 'images/11.png' },
    // { 'href': 'www.baidu.com', 'text': '12', 'src': 'images/12.png' },
    // { 'href': 'www.baidu.com', 'text': '13', 'src': 'images/13.png' },
    // { 'href': 'www.baidu.com', 'text': '14', 'src': 'images/14.png' },
    // { 'href': 'www.baidu.com', 'text': '15', 'src': 'images/15.png' },
    // { 'href': 'www.baidu.com', 'text': '16', 'src': 'images/16.png' },
    // { 'href': 'www.baidu.com', 'text': '17', 'src': 'images/17.png' },
    // { 'href': 'www.baidu.com', 'text': '18', 'src': 'images/18.png' }];

    $.ajax({
        url: "https://api.apiopen.top/musicBroadcasting",
        type: 'GET',
        dataType: "json",
        data: {},
        success: function (data) {
            for(x in data.result[0].channellist) {
                data.result[0].channellist[x].src = data.result[0].channellist[x].thumb;
                data.result[0].channellist[x].href = "www.baidu.com";
                data.result[0].channellist[x].text = data.result[0].channellist[x].name;
            }
            console.log(data.result[0].channellist);
            var pageData = {pageNumber: 1, pageSize: 10,totalPage: 2, dataDescription: ""};
            var waterfall = new waterfallFlowLayout({
                container: "#wrap",
                data: data.result[0].channellist,
                isScroll: true,
                pageData: pageData
            });
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
            Object.defineProperty(pageData, "dataDescription", {
                get:function() {
                    return dataDescription;
                },
                set:function(value) {
                    dataDescription = value;
                }
            });
            pageData.pageNumber = 1;
            console.log(waterfall);
        }
    });
}

