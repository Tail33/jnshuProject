window.onload = function () {
    console.log(sessionStorage.arys);
    var arys = sessionStorage.arys.split(","),
        box_wrap = document.querySelector(".box-wrap");
    var str = "";

    arys.forEach(function (item, index) {
        var i=index+1;
        str += '<div class="box-wrap"><div class="m-statusBox"><p class="">' + item + '</p><span class="">' + i + '号</span></div></div>'
    });
    box_wrap.innerHTML+=str;
};