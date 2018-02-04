/**
 * 任务需求
 * 
 * 1.输入人数时，如果人数是符合规则的话，自动分配杀手和平民的人数显示到 m-allocation
 * 2.按“去发牌时”,如果输入的人数不正确，会弹出框提示输入不正确
 * 3.设置range和+ -按钮
 * 4.成功发牌时，传递一个乱序的数组到【发牌页面】。
 */


window.onload = function () {
    var playN = document.getElementById("palyN"), //输入框
        send = document.getElementById("send"), //发牌按钮
        minusBtn = document.getElementById("minusBtn"),
        addBtn = document.getElementById("addBtn"),
        range = document.getElementById("numRange");

    var app = new App();

    playN.oninput = function () {
        //对this.value 进行值判断
        app.validator(this.value); //如果值不符合规则，错误信息设置在app.msg

        if (app.msg) { //值不符合规则
            app.n = "";
            range.value = "0";
        } else { //符合规则
            app.n = Number(this.value); //转换为num类型
            //设置range的数值
            range.value = app.n;
        }
        //分配杀手和平民的人数,并显示在面板中
        app.allocation();
    }

    send.onclick = function () {
        if (app.msg) {
            //弹出提示信息
            alert(app.msg);
            return false;
        }
        //初始化数组，然后进行乱序,设置本地缓存
        app.initAry();
    };


    //绑定两个 + - 按钮
    minusBtn.onclick = function () {
        if (app.n == 4) {
            return false;
        }
        if (app.msg) {
            playN.value = 4;

        } else {
            playN.value = app.n - 1;
        }
        playN.oninput();




    };
    addBtn.onclick = function () {
        if (app.n == 18) {
            return false;
        }
        if (app.msg) {
            playN.value = 4;

        } else {
            playN.value = app.n + 1;
        }
        playN.oninput();
    };

    range.oninput = function () {
        playN.value = this.value;
        playN.oninput();
    }
};



var App = function () {
    this.msg = "你输入的值不能为空"; //验证错误信息
    this.n = ""; //输入的数值
    this.killers = ""; //杀手人数
    this.civilians = ""; //平民人数
};

App.prototype = {
    //验证值是否符合在整数4~18之间
    validator: function (value) {
        //判断值是否为空
        if (!value) {
            return this.msg = "你输入的值为空";
        }

        //判断值是否为整数
        if (!value.match(/^\d+$/)) { //匹配正整数
            return this.msg = "你输入的值不是整数";
        }

        //判断值是否在4~18之间
        if (value < 4 || value > 18) {
            return this.msg = "请输入4~18的值";
        }
        this.msg = "";
    },

    //分配杀手和平民的人数,并显示在面板中
    allocation: function () {
        /**
         *人数按以下规则设置
         *4-5人	 1杀手
         *6-8人 	 2杀手
         *9-11人	 3杀手
         *12-15人 4杀手
         *16-18人 5杀手
         */
        if (this.n == "") {
            this.killers = "";
            this.civilians = "";
        } else {
            if (this.n <= 5) {
                this.killers = 1
            }
            if (this.n >= 6 && this.n <= 8) {
                this.killers = 2
            }
            if (this.n >= 9 && this.n <= 11) {
                this.killers = 3
            }
            if (this.n >= 12 && this.n <= 15) {
                this.killers = 4
            }
            if (this.n >= 16 && this.n <= 18) {
                this.killers = 5
            }
            this.civilians = this.n - this.killers;
        }


        //设置玩家分配面板的数据
        this.setAllocationBlock();
    },

    //设置玩家分配面板的数据
    setAllocationBlock: function () {
        document.getElementById("killer").innerHTML = this.killers;
        document.getElementById("civilian").innerHTML = this.civilians;
    },

    //初始化数组，进行乱序,设置本地缓存
    initAry: function () {
        var ary = (new Array(this.n)).fill("平民");
        for (let i = 0; i < this.killers; i++) {
            ary[i] = "杀手";
        }
        //进行乱序
       ary=shuffle(ary);
       console.log(ary);
       sessionStorage.arys=ary.join(',');
       window.location.href="./s.html";
    }

}


//乱序方法
function shuffle(array) {
    var _array = array.concat();

    for (var i = _array.length; i--;) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = _array[i];
        _array[i] = _array[j];
        _array[j] = temp;
    }

    return _array;
}