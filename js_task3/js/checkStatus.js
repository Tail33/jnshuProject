    /**
     * 需求
     * 1.按顺序给用户查看身份,按【查看1号身份】后，显示1号的身份，按钮显示【隐藏并传递给2号玩家】，重复此步骤
     * 2.到最后一位玩家查看身份时，按钮显示【法官查看】
     */


    var App = function (arys, checkBtn) {
        this.arys = arys; //保存所有身份
        this.n = arys.length; //人数
        this.i_crt = 1; //当前传递的身份在数组的位置
        this.status = true; //判断是查看身份还是传递身份
        this.checkBtn = checkBtn; //按钮
        this.index = document.getElementById("index");
        this.identity = document.getElementById("identity");
    };

    App.prototype = {
        //渲染查看身份的页面
        checkRenderPage: function () {
            //修改按钮文本
            this.checkBtn.value = "查看" + this.i_crt + "号身份";

            //修改页面信息
            this.index.innerHTML = this.i_crt;
            this.identity.innerHTML = "";
            this.status = false;
        },
        //传递身份页面
        deliRenderPage: function () {
            //修改页面信息
            this.identity.innerHTML = this.arys[this.i_crt - 1];

            if (this.i_crt === this.n) { //传递到最后一位玩家时
                //修改按钮文本
                this.checkBtn.value = "法官查看";
                this.checkBtn.onclick = function () {
                    window.location.href = "judge.html";
                }
                return false;
            }

            //改变当前身份的位置
            this.i_crt += 1;
            //修改按钮文本
            this.checkBtn.value = "隐藏并传递给" + this.i_crt + "号";

            this.status = true;

        }
    };

    window.onload = function () {


        if (!sessionStorage.arys) {
            alert("数据错误,返回主页");
            window.location.href = "index.html";
            return false;
        }
        var arys = sessionStorage.arys.split(","), //获取sessionStorage.arys的值,转为字符串
            checkBtn = document.getElementById("checkBtn");

        //创建app实例
        var app = new App(arys, checkBtn);
        console.log(arys);
        //首次进页面后渲染页面,进入一号的【查看身份】
        app.checkRenderPage();

        //绑定按钮事件
        checkBtn.onclick = function () {


            if (app.status) { //判断当前是查看身份，还是传递身份
                //渲染查看身份的页面
                app.checkRenderPage();
            } else { //传递身份页面
                app.deliRenderPage();
            }
        };
    }