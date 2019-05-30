window.onload = function() {
    var wrap = document.getElementById('wrap');
    // data = [{'href':'www.baidu.com','text':'1','src':'https://img.d2c.cn//2019/05/16/1143144a765c495adaa38efdb5c84099fb225e.jpg!300'},
    // {'href':'www.baidu.com','text':'1','src':'https://img.d2c.cn//2019/05/16/1143144a765c495adaa38efdb5c84099fb225e.jpg!300'},
    // {'href':'www.baidu.com','text':'1','src':'https://img.d2c.cn//2019/05/16/1143144a765c495adaa38efdb5c84099fb225e.jpg!300'},
    // {'href':'www.baidu.com','text':'1','src':'https://img.d2c.cn//2019/05/16/1143144a765c495adaa38efdb5c84099fb225e.jpg!300'},
    // {'href':'www.baidu.com','text':'1','src':'https://img.d2c.cn//2019/05/16/1143144a765c495adaa38efdb5c84099fb225e.jpg!300'},
    // {'href':'www.baidu.com','text':'1','src':'https://img.d2c.cn//2019/05/16/1143144a765c495adaa38efdb5c84099fb225e.jpg!300'},
    // {'href':'www.baidu.com','text':'1','src':'https://img.d2c.cn//2019/05/16/1143144a765c495adaa38efdb5c84099fb225e.jpg!300'},
    // {'href':'www.baidu.com','text':'1','src':'https://img.d2c.cn//2019/05/16/1143144a765c495adaa38efdb5c84099fb225e.jpg!300'},
    // {'href':'www.baidu.com','text':'1','src':'https://img.d2c.cn//2019/05/16/1143144a765c495adaa38efdb5c84099fb225e.jpg!300'},
    // {'href':'www.baidu.com','text':'1','src':'https://img.d2c.cn//2019/05/16/1143144a765c495adaa38efdb5c84099fb225e.jpg!300'}];
    data = [{'href':'www.baidu.com','text':'1','src':'images/1.png'},
    {'href':'www.baidu.com','text':'2','src':'images/2.png'},
    {'href':'www.baidu.com','text':'3','src':'images/3.png'},
    {'href':'www.baidu.com','text':'4','src':'images/4.png'},
    {'href':'www.baidu.com','text':'5','src':'images/5.png'},
    {'href':'www.baidu.com','text':'6','src':'images/6.png'},
    {'href':'www.baidu.com','text':'7','src':'images/7.png'},
    {'href':'www.baidu.com','text':'8','src':'images/8.png'},
    {'href':'www.baidu.com','text':'9','src':'images/9.png'},
    {'href':'www.baidu.com','text':'10','src':'images/10.png'},
    {'href':'www.baidu.com','text':'11','src':'images/11.png'},
    {'href':'www.baidu.com','text':'12','src':'images/12.png'},
    {'href':'www.baidu.com','text':'13','src':'images/13.png'},
    {'href':'www.baidu.com','text':'14','src':'images/14.png'},
    {'href':'www.baidu.com','text':'15','src':'images/15.png'},
    {'href':'www.baidu.com','text':'16','src':'images/16.png'},
    {'href':'www.baidu.com','text':'17','src':'images/17.png'},
    {'href':'www.baidu.com','text':'18','src':'images/18.png'}];
    new waterfallFlowLayout({
        container:"#wrap",
        data:data
    });
}