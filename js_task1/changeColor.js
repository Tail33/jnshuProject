
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

/**
 * 对象构造函数
 *  el 表示传入的实例DOM对象
 */
function SpeedDial(el) {
    this.el = el;
    this.cache = [];//存放要变色的格子下标
    this.t = false;//判断是否已经在执行变色任务了
    this.gridElements = [];//存放九个格子的DOM对象数组
    this.grid_Default_BackgroundColor = "";//格子默认颜色
    this.length=""//格子的个数
    this.init();//初始化
}

SpeedDial.prototype.init = function () {//初始化
    this.gridElements = this.el.getElementsByTagName('div');
    this.grid_Default_BackgroundColor = this.gridElements[0].style.backgroundColor;
    this.length=this.gridElements.length;
}

SpeedDial.prototype.recover_defaultColor = function () {//恢复格子的默认颜色,清空cache缓存
    var self=this;
    this.cache.forEach(function (item) {
        self.gridElements[item].style.backgroundColor = self.grid_Default_BackgroundColor;
    })
    this.cache=[];
}


SpeedDial.prototype.changeColor = function () {//根据ceche数组改变九宫格的背景颜色
    var self = this;
    console.log(self.cache);
    this.cache.forEach(function (item) {
        self.gridElements[item].style.backgroundColor = ranColor();
    });
}
SpeedDial.prototype.circulationChange = function (n, time) { //每过 time 毫秒数改变n个格子背景颜色 
    if (this.t) {//已经在闪了
        return false;
    } else {//没有在闪
        this.t = true;
    }
    var self = this;

    var circulation = function () {
        self.recover_defaultColor();
        
        while (self.cache.length < n) {
            let i = ranNumber(0, self.length-1);
            if (self.cache.indexOf(i) >= 0) {
                continue;
            }
            self.cache.push(i);
        }
        self.changeColor();

        if (self.t) {
            setTimeout(circulation, time);
        } else {
            self.recover_defaultColor();
            
        }
    };
    setTimeout(circulation, time);
}

var speedDialElement = document.getElementById('m-speedDial'),
    speedDial = new SpeedDial(speedDialElement);//创建一个九宫格实例


var starBtn = document.getElementById("startBtn"),
    overBtn = document.getElementById("overBtn");

// //绑定两个按钮的点击事件
starBtn.onclick = function () {
    speedDial.circulationChange(3, 1000);
};
overBtn.onclick = function () {
    speedDial.t = false;
};


