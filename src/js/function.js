/* 处理脚本 start */
var height = $(window).height() - $(window).width() * 0.7 / 425 * 83 - 60;
$("section").css("minHeight", height);
if (getQueryString("a") == "") {
    $("#startBtn").val("开始占卜");
}

var Augur;
var AugurName;
var FooterDelay;

/*$.post(Path + "getData/getAugur.php", { host: window.location.href.split("homepage.php")[0], address: getQueryString("a") }, function(data) {
    data = eval(data);
    Augur = data[1];
    AugurName = data[0];
    var introduce = data[5];
    introduce = introduce.split("|");
    var html = "";
    for (var i = 0; i < introduce.length; i++) {
        var delay = 750 + i * 125;
        html += '<tr class="fadeIn-500-' + delay + '"><td>' + introduce[i] + '</td></tr>';
    }
    $("#introduceTable").html(html);
    var delay = 750 + i * 125;
    $("#startBtn").addClass("fadeIn-500-" + delay);
    $(".footer-p").addClass("fadeIn-500-" + delay);
    FooterDelay = delay;

    if (Augur != "") {
        $(".footer-p").html("<br>15年专注塔罗牌占卜<br><br>人工占卜可加微信：" + Augur);
    } else {
        $(".footer-p").html("<br>全球领先塔罗精准体系<br><br>15年专注塔罗牌占卜");
    }
});*/

function toQuestion() {
    var delay = 100;
    $(".scaleIn-500-0").addClass("toRightOut-350-0");
    $(".scaleIn-500-0").removeClass("scaleIn-500-0");
    $('#startBtn').val('占卜开始准备中...');
    /*setTimeout('$(".fadeIn-500-750").addClass("toRightOut-350-0");', delay);
    setTimeout('$(".fadeIn-500-750").removeClass("fadeIn-500-750");', delay);
    setTimeout('$(".fadeIn-500-875").addClass("toRightOut-350-0");', delay * 2);
    setTimeout('$(".fadeIn-500-875").removeClass("fadeIn-500-1000");', delay * 2);
    setTimeout('$(".fadeIn-500-1000").addClass("toRightOut-350-0");', delay * 3);
    setTimeout('$(".fadeIn-500-1000").removeClass("fadeIn-500-1000");', delay * 3);
    setTimeout('$(".fadeIn-500-1125").addClass("toRightOut-350-0");', delay * 4);
    setTimeout('$(".fadeIn-500-1125").removeClass("fadeIn-500-1250");', delay * 4);
    setTimeout('$(".fadeIn-500-1250").addClass("toRightOut-350-0");', delay * 5);
    setTimeout('$(".fadeIn-500-1250").removeClass("fadeIn-500-1250");', delay * 5);
    setTimeout('$("section").animate({minHeight: "+=4.5rem", marginTop: "-=5.35rem"}, 200);', delay * 6);*/
    setTimeout('$("#homepage").css("display", "none");$("#question").css("display", "");', delay * 5 + 500);
    setTimeout('$(".footer-p").removeClass("toRightOut-350-0");', delay * 5 + 500);
    setTimeout('$("#titleImg").css("display", "none");$("section").css("marginTop", "0rem");', delay * 5 + 500);
}



function setAnswer(data) {
    question = data[0];
    document.getElementById("questionP").innerHTML = "<b>问：</b>" + data[1];
    for (var i = 2; i < 6; i++) {
        document.getElementById("div" + i).style.display = "none";
    }
    for (var i = 2; i < data.length; i++) {
        document.getElementById("div" + i).style.display = "block";
        document.getElementById("div" + i).style.borderBottom = "1px solid #77422E";
        document.getElementById("input" + i).innerHTML = (i - 1) + "." + data[i];
    }
    document.getElementById("div" + (i - 1)).style.display = "block";
    document.getElementById("div" + (i - 1)).style.borderBottom = "0px";
}

var question = 0;
answer(0);

function answer(select) {
    $.post(Path + "getData/getQuestion.php", { question: question, select: select }, function(data) {
        var dataArr = eval(data);
        if (dataArr[0] != -1) {
            var delay = 50;

            if (question != 0) {
                $("#questionP").removeClass("toRightIn-350-300");
                $("#questionP").addClass("fadeOut-200-0");
            }
            for (var i = 2; i < 6; i++) {
                $("#input" + i).removeClass("fadeIn-200-0");
                if ($("#div" + i).css("display") == "block") {
                    setTimeout('$("#input' + i + '").addClass("fadeOut-200-0");', delay * (i - 1));
                } else {
                    setTimeout('$("#input' + i + '").addClass("start");', delay * (i - 1));
                }
            }

            setTimeout('setAnswer(' + data + ');', delay * (i - 1));
            i++;
            setTimeout('$("#questionP").removeClass("fadeOut-200-0");', delay * (i - 1));
            setTimeout('$("#questionP").addClass("fadeIn-200-0");', delay * (i - 1));
            i++;

            for (var j = 2; j < 6; j++) {
                setTimeout('$("#input' + j + '").removeClass("fadeOut-200-0");', delay * (j + i - 1));
                setTimeout('$("#input' + j + '").addClass("fadeIn-200-0");', delay * (j + i - 1));
            }
        } else {
            $("#q_choice").animate({ opacity: 0 }, 250);
            $("#q_information").animate({ opacity: 0 }, 0);
            document.getElementById("q_information").style.display = "block";
            setTimeout('$("#q_information").animate({opacity:1},250);', 250);
            setTimeout('document.getElementById("q_choice").style.display="none";', 250);
            setTimeout('document.getElementById("introduce").innerHTML="<tr><td>根据你的回答结果<br>星运志为您选择的牌阵是</td></tr>";', 250);
            setTimeout('document.getElementById("q_card").innerHTML="<p>' + dataArr[2] + '</p>";', 250);
            SetCookie("type", dataArr[1]);
        }
    });
}

function toShuffle() {
    $("#smallBtn_input").val("洗牌中...");
    $("#turn-loading").css('display', 'flex');
    $.post(Path + "getData/getOldResult.php", { date: getCookie("date" + getCookie("type")) }, function(data) {
        if (data) {
            alert("你今天已经对这种类型的问题进行了一次占卜，我们将为您直接跳到上次的占卜结果页面，占卜第二次就不准了哟！");

            var delay = 150;
            setTimeout('$(".title_h1").addClass("toRightOut-350-0");', delay * 0);
            setTimeout('$(".title_h1").removeClass("toRightIn-350-0");', delay * 0);
            setTimeout('$("#introduce").addClass("toRightOut-350-0");', delay * 1);
            setTimeout('$("#q_card").addClass("toRightOut-350-0");', delay * 2);
            setTimeout('$(".introduce_table").addClass("toRightOut-350-0");', delay * 3);
            setTimeout('$("#q_age").addClass("toRightOut-350-0");', delay * 4);
            setTimeout('$(".smallBtn_input").addClass("toRightOut-350-0");', delay * 5);
            setTimeout('$(".title_h1").removeClass("toRightOut-350-0");', delay * 5 + 150);
            setTimeout('$("#question").css("display", "none");$("#result").css("display", "");resultInit();', delay * 5 + 300);
        } else {
            if (document.getElementById("questionTxt").value == "") {
                alert("请填入你想要占卜的问题~");
            } else if (document.getElementById("backgroundTxt").value == "") {
                alert("请填入你问题的相关背景~");
            } else {
                var obj = document.getElementById("age");
                SetCookie("age", obj.options[obj.selectedIndex].text);
                SetCookie("question", document.getElementById("questionTxt").value);
                SetCookie("background", document.getElementById("backgroundTxt").value);

                var delay = 150;
                setTimeout('$(".title_h1").addClass("toRightOut-350-0");', delay * 0);
                setTimeout('$(".title_h1").removeClass("toRightIn-350-0");', delay * 0);
                setTimeout('$("#introduce").addClass("toRightOut-350-0");', delay * 1);
                setTimeout('$("#q_card").addClass("toRightOut-350-0");', delay * 2);
                setTimeout('$(".introduce_table").addClass("toRightOut-350-0");', delay * 3);
                setTimeout('$("#q_age").addClass("toRightOut-350-0");', delay * 4);
                setTimeout('$(".smallBtn_input").addClass("toRightOut-350-0");', delay * 5);
                setTimeout('$("#question").css("display", "none");$("#shuffle").css("display", "");toTurn();', delay * 5 + 300);
            }
        }
    });
}



function toTurn() {
    var cardNum;
    var t = 2000;
    var delay = 200;
    var pos = -100;

    switch (getCookie("type")) {
        case "0":
            cardNum = 3;
            break;
        case "1":
            cardNum = 4;
            break;
        case "2":
            cardNum = 6;
            break;
        case "3":
            cardNum = 5;
            break;
        case "4":
            cardNum = 3;
            break;
        case "5":
            cardNum = 5;
            break;
        case "6":
            cardNum = 3;
            break;
        case "7":
            cardNum = 3;
            break;
        case "8":
            cardNum = 5;
            break;
        case "9":
            cardNum = 5;
            break;
        case "10":
            cardNum = 5;
            break;
        case "11":
            cardNum = 3;
            break;
        case "12":
            cardNum = 4;
            break;
    }
    var space = 200 / (cardNum - 1);

    for (var i = 1; i <= cardNum; i++) {
        $(".xp" + i).delay(t).animate({
            marginTop: "15rem",
            marginLeft: pos / 15 + "rem",
        }, delay);
        t += delay;
        pos += space;
    }

    var myDate = new Date();
    var dateStr = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();

    $.post(Path + "getData/getOldResult.php", { date: getCookie('date' + getCookie('type')) }, function(data) {
        if (data) {
            setTimeout('$("#shuffle").css("display", "none");$(".footer-p").css("display", "none");$("#myInfo").css("display", "none");$("#turn").css("display", "");trunInit();', t + delay);
        } else {
            $.post(Path + "getData/getResult.php", { type: getCookie("type"), playTime: dateStr, age: getCookie("age"), question: getCookie("question"), background: getCookie("background"), augur: Augur }, function(data) {
                //SetCookie("date" + getCookie("type"), dateStr);
                SetCookie("result" + getCookie("type"), data);
                $(".title_h1").removeClass("toRightOut-350-0");
                setTimeout('$("#shuffle").css("display", "none");$(".footer-p").css("display", "none");$("#myInfo").css("display", "none");$("#turn").css("display", "");trunInit();', t + delay);
            });
        }
    });
}



var flag = 1;
var objBuffer;
var cardNum;

function trunInit() {
    $.post(Path + "getData/getPosition.php", { type: getCookie("type") }, function(data) {
        data = eval(data);
        cardNum = data[0][0];
        var h = data[0][1];
        h = h.substr(0, h.length - 3);
        $("section").css("height", (parseInt(h) + 3) + "rem");
        $(".footer-p").css("margin-top", (h - 12) + "rem");
        for (var i = 1; i < 7; i++) {
            document.getElementById("t_cardList").getElementsByTagName("div")[i - 1].style.cssText = data[i][0];
            document.getElementById("t_cardList").getElementsByTagName("p")[i - 1].innerHTML = data[i][1];
        }
        document.getElementById("t_cardList").style.display = "block";
        $("#turn-loading").css('display', 'none');
    });
}

function turnCard(obj, num) {
    if (num == flag) {
        objBuffer = obj;
        $.post(Path + "getData/getThisResult.php", { result: getCookie("result" + getCookie("type")), index: num }, function(data) {
            var output = eval(data);
            $("#t_cardList").children(":nth-child(" + (flag - 1) + ")").children("img").addClass("fp" + output[0] + "_" + output[1]);
            setTimeout('$("#t_cardList").children(":nth-child(' + (flag - 1) + ')").children("img").attr("src",Path + "images/card/' + output[0] + "_" + output[1] + '.jpg")', 500);
        });

        flag++;
        if (flag > cardNum) {
            //setTimeout("alert('点击确定，获取占卜信息，然后截屏发给占卜师来获取占卜结果吧！');","2000");
            setTimeout('$(".footer-p").css("display", "");$("#turn").css("display", "none");$("#myInfo").css("display", "");$("#result").css("display", "");$("section").css("height","");resultInit();', "1000");
        }
        for (var i = 0; i < 6; i++) {
            document.getElementById("t_cardList").getElementsByTagName("h1")[i].style.visibility = "visible";
            document.getElementById("t_cardList").getElementsByTagName("h2")[i].style.visibility = "hidden";
        }
    } else {
        setVisiable();
    }
}

function setVisiable() {
    if (flag > cardNum) {
        window.location.href = window.location.href.split("?")[0].split("#")[0] + "?state=resultInit";
    } else {
        document.getElementById("t_cardList").getElementsByTagName("h1")[flag - 1].style.visibility = "hidden";
        document.getElementById("t_cardList").getElementsByTagName("h2")[flag - 1].style.visibility = "visible";
        document.getElementById("turnTips").style.backgroundColor = "#CC0000";
        setTimeout("document.getElementById('turnTips').style.backgroundColor='#FFFFFF'", "100");
        setTimeout("document.getElementById('turnTips').style.backgroundColor='#CC0000'", "200");
        setTimeout("document.getElementById('turnTips').style.backgroundColor='#FFFFFF'", "300");
        setTimeout("document.getElementById('turnTips').style.backgroundColor='#CC0000'", "400");
        setTimeout("document.getElementById('turnTips').style.backgroundColor='#FFFFFF'", "500");
        setTimeout("document.getElementById('turnTips').style.backgroundColor='#CC0000'", "600");
        setTimeout("document.getElementById('turnTips').style.backgroundColor='#FFFFFF'", "700");
        setTimeout("document.getElementById('turnTips').style.backgroundColor='#CC0000'", "800");
        setTimeout("document.getElementById('turnTips').style.backgroundColor='#FFFFFF'", "900");
    }
}



function resultInit() {
    if (getQueryString("a") != "") {
        $("#introduceP").html("<br>恭喜你获得一次免费解牌机会<br><strong>（价值99）</strong><br>以下是你本次塔罗牌占卜的牌面");
    }
    $.post(Path + "getData/getShowResult.php", { result: getCookie("result" + getCookie("type")), type: getCookie("type") }, function(data) {
        data = eval(data);

        if (getCookie("question") == "") {
            document.getElementById("resultQuestion").innerHTML = "你没有提出疑问。";
        } else {
            document.getElementById("resultQuestion").innerHTML = data[data.length - 3];
        }
        if (getCookie("background") == "") {
            document.getElementById("resultBg").innerHTML = "<b>问题背景：</b>你没有填写问题背景。";
        } else {
            document.getElementById("resultBg").innerHTML = "<b>问题背景：</b>" + data[data.length - 2];
        }
        //document.getElementById("resultAge").innerHTML="<b>年龄：</b>"+data[data.length-4];

        document.getElementById("resultTable").innerHTML = "";
        for (var i = 0; i < data.length - 6; i++) {
            document.getElementById("resultTable").innerHTML += "<tr><th>牌位" + (i + 1) + "：</th><td>" + data[i] + "</td></tr>";
        }
        document.getElementById("resultPz").innerHTML = "<strong>牌阵：" + data[data.length - 6] + "<br>星号：" + data[data.length - 5] + "</strong>";

        if (Augur != "") {
            document.getElementById("r_wechat").style.display = "block";
            document.getElementById("r_wechat").innerHTML = "<p>" + data[data.length - 1] + "</p><p>&nbsp;</p><p>签约占卜师个人微信号：</p><p>" + "taluopai1818" + "</p>";
        }
    });
}
/* 处理脚本 end */



/* 通用函数 start */
function SetCookie(name, value) {
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}

function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return "";
}
/* 通用函数 end */
