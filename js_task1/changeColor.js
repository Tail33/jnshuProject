

/**
 * 九宫格对象构造函数
 *  grids 表示传入的实例DOM对象类数组，九个格子的数组
 */
var SpeedDial=function(grids, n, s) {
    this.grids = grids; //存放九个格子的DOM对象数组
    this.n = n; //要变的格子数量
    this.time = s*1000; //变化得间隔时间,将秒转为毫秒
    this.cache = []; //存放准备要变色的格子下标
    this.t = false; //判断是否已经在执行变色任务了
    this.grid_Default_BackgroundColor = grids[0].style.backgroundColor; //格子默认颜色
    this.length = grids.length; //格子的个数
};

SpeedDial.prototype = {

    //根据ceche数组改变九宫格的背景颜色
    changeColor: function () {
        var self = this;
        this.cache.forEach(function (item) {
            self.grids[item].style.backgroundColor = ranColor();
        });
    },

    //恢复格子的默认颜色,清空cache缓存
    recover_defaultColor: function () {
        var self = this;
        this.cache.forEach(function (item) {
            self.grids[item].style.backgroundColor = self.grid_Default_BackgroundColor;
        })
        this.cache = [];
    },

    //每过 time 毫秒数改变n个格子背景颜色 
    circulation: function () {
        this.recover_defaultColor();

        //随机抽取三个不同的数存入cache
        while (this.cache.length < this.n) {
            let i = ranNumber(0, this.length - 1);
            if (this.cache.indexOf(i) >= 0) {
                continue;
            }
            this.cache.push(i);
        }
        console.log(this.cache);
        //变色
        this.changeColor();
        var self = this;

        if (this.t) { //判断是否继续变色
            setTimeout(function () {
                self.circulation();
            }, self.time);
        } else {
            this.recover_defaultColor();

        }
    },

    //判断格子是否在变色中，如没有，则开始变色；
    circulationChange: function () {
        if (this.t) { //已经在闪了
            return false;
        } else { //没有在闪
            this.t = true;
        }
        this.circulation();
    }
};


window.onload = function () {

    var grids = document.querySelectorAll("#m-speedDial>div"),
        speedDial = new SpeedDial(grids, 3, 1); //创建一个九宫格实例,传入九宫格对象类数组，每次变换3个格子，每过一秒变换一次

    var starBtn = document.getElementById("startBtn"),
        overBtn = document.getElementById("overBtn");

    //绑定两个按钮的点击事件
    starBtn.onclick = function () {
        speedDial.circulationChange();//开始变色
    };
    overBtn.onclick = function () {
        speedDial.t = false;//停止变色
    };

};

//获取十六位进制随机颜色
function ranColor() {
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += ranNumber(0, 15).toString(16);
    }
    return color;
}

//获取随机整数[s,e];比如[0,8]
function ranNumber(s, e) {
    e += 1;
    var num = Math.floor(Math.random() * (e - s) + s);
    return num;
}