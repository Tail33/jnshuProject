

//获取随机数字[s,e];
function ranNumber(s, e) {
    e += 1;
    var num = Math.floor(Math.random() * (e - s) + s);
    return num;
}

//获取随机颜色
function ranColor() {
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += ranNumber(0, 15).toString(16);
    }
    return color;
}


//点击开始闪，随机获得三个方块，给三个方块随机三个颜色

function init() {
    var start = document.getElementById('start'),
        over = document.getElementById('over'),
        t,//间歇调用返回的id标记
        quads = box.getElementsByClassName('quadrate');//九个方块的集合
      

    //给按钮“开始闪”绑定click事件
    start.onclick = function () {
        var box = document.getElementById('box'),
            ary = [],//储存三个不同的随机数
            num;//存放一个随机数

        if (t) {
            over.click();
        }

        t = setInterval(function () {
            
            ary.forEach(function (item, index, array) {
                quads[item].style.backgroundColor = 'orange';
            });
            ary = [];
            while(ary.length<3){
               num=ranNumber(0,8);
               if(ary.indexOf(num)>=0){
                    continue;
               }
               ary.push(num);
            }
            ary.forEach(function (item) {
                quads[item].style.backgroundColor = ranColor();
            })

        }, 1000);

    }

    over.onclick = function () {

        clearInterval(t);
        Array.prototype.forEach.call(quads, function (item, index, array) {
            quads[index].style.backgroundColor = 'orange';
        })
    }

    start.onmousemove = function () {

        this.style.backgroundColor = 'orange';
        this.style.color = '#fff';

    };
    over.onmousemove = function () {
        this.style.backgroundColor = 'orange';
        this.style.color = '#fff';
    };
    start.onmouseout = function () {
        this.style.backgroundColor = '#fff';
        this.style.color = 'orange';
    };
    over.onmouseout = function () {
        this.style.backgroundColor = '#fff';
        this.style.color = 'orange';
    };
}

init();