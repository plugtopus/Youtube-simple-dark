'use strict';
chrome["runtime"]["onInstalled"].addListener(function(installDetails) {
    if (installDetails.reason === "install") {
        chrome["tabs"].create({
            url : "https://sites.google.com/view/promo-extensions-welcome"
        });
    }
});
chrome.runtime.setUninstallURL("https://sites.google.com/view/promo-extensions-bbye");
/** @type {boolean} */
var ison = false;
chrome["browserAction"].onClicked.addListener(function(canCreateDiscussions) {
    chrome["tabs"].query({
        active : true,
        currentWindow : true
    }, function(tabs) {
        /** @type {boolean} */
        var isyoutube = tabs[0].url.indexOf("https://www.youtube.com") === 0;
        if (isyoutube) {
            if (ison) {
                chrome["browserAction"].setTitle({
                    title : "Turn On YouTube Dark Mode"
                });
            } else {
                chrome["browserAction"].setTitle({
                    title : "Turn Off YouTube Dark Mode"
                });
            }
            chrome["tabs"].executeScript({
                code : `\n\t\t\t\tfunction toggleDarkMode(s) {\n\t\t\t\t\tif (s == true) {\n\t\t\t\t\t\tdocument.documentElement.removeAttribute("style");\n\t\t\t\t\t\tdocument.documentElement.setAttribute("style", "font-size: 10px; font-family: Roboto, Arial, sans-serif; background-color: rgb(19, 19, 19);");\n\t\t\t\t\t\tdocument.documentElement.setAttribute("dark", "true");\n\n\t\t\t\t\t\tvar masthead = document.getElementById('masthead');\n\t\t\t\t\t\tif(masthead!=null&&masthead!=undefined){\n\t\t\t\t\t\t\tmasthead.setAttribute("style", "--yt-swatch-primary:rgb(35,35,35); --yt-swatch-primary-darker:rgb(32,32,32); --yt-swatch-text:rgb(255,255,255); --yt-swatch-important-text:rgb(255,255,255); --yt-swatch-input-text:rgba(255,255,255,1); --yt-swatch-textbox-bg:rgba(19,19,19,1); --yt-swatch-logo-override:rgb(255,255,255); --yt-swatch-icon-color:rgba(136,136,136,1);");\n\t\t\t\t\t\t\tmasthead.setAttribute("dark", "");\n\t\t\t\t\t\t}\n\t\t\t\t\t} else {\n\t\t\t\t\t\tdocument.documentElement.removeAttribute("style");\n\t\t\t\t\t\tdocument.documentElement.setAttribute("style", "font-size: 10px; font-family: Roboto, Arial, sans-serif; background-color: rgb(255, 255, 255);");\n\t\t\t\t\t\tdocument.documentElement.removeAttribute("dark");\n\n\t\t\t\t\t\tvar masthead = document.getElementById('masthead');\n\t\t\t\t\t\tif(masthead!=null&&masthead!=undefined){\n\t\t\t\t\t\t\tmasthead.setAttribute("style", "--yt-swatch-primary:rgb(255,255,255); --yt-swatch-primary-darker:rgb(230,230,230); --yt-swatch-text:rgba(17,17,17,0.4); --yt-swatch-input-text:rgba(17,17,17,1); --yt-swatch-textbox-bg:rgba(255,255,255,1); --yt-swatch-icon-color:rgba(136,136,136,1)");\n\t\t\t\t\t\t\tmasthead.removeAttribute("dark");\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tforceMasthead2Dark(` +
                    !ison + `);\n\t\t\t\t}\n\n\t\t\t\tfunction forceMasthead2Dark(s){\n\t\t\t\t\tvar _mh = document.getElementById('forceMasthead2Dark');\n\t\t\t\t\tif(_mh!=null){\n\t\t\t\t\t\t_mh.remove();\n\t\t\t\t\t}\n\t\t\t\t\tvar style = document.createElement('style');\n\t\t\t\t\tstyle.setAttribute('id', 'forceMasthead2Dark');\n\t\t\t\t\tstyle.type = "text/css";\n\t\t\t\t\tif(s==true){\n\t\t\t\t\t\tvar css = "ytd-masthead#masthead{--yt-swatch-primary:rgb(35,35,35) !important;--yt-swatch-primary-darker:rgb(32,32,32) !important; --yt-swatch-text:rgb(255,255,255) !important; --yt-swatch-important-text:rgb(255,255,255) !important;--yt-swatch-input-text:rgba(255,255,255,1) !important;--yt-swatch-textbox-bg:rgba(19,19,19,1) !important;--yt-swatch-logo-override:rgb(255,255,255) !important;--yt-swatch-icon-color:rgba(136,136,136,1) !important;}";\n\t\t\t\t\t\tstyle.appendChild(document.createTextNode(css));\n\t\t\t\t\t}else{\n\t\t\t\t\t\tvar css = "ytd-masthead#masthead{--yt-swatch-primary:rgb(255,255,255) !important;--yt-swatch-primary-darker:rgb(230,230,230) !important;--yt-swatch-text:rgba(17,17,17,0.4) !important;--yt-swatch-input-text:rgba(17,17,17,1) !important;--yt-swatch-textbox-bg:rgba(255,255,255,1) !important;--yt-swatch-icon-color:rgba(136,136,136,1) !important;}";\n\t\t\t\t\t\tstyle.appendChild(document.createTextNode(css));\n\t\t\t\t\t}\n\t\t\t\t\tdocument.body.appendChild(style);\n\t\t\t\t}\n\t\t\t\ttoggleDarkMode(` +
                    !ison + `);\n\t\t\t\t`,
                allFrames : false
            });
            /** @type {boolean} */
            ison = !ison;
            /** @type {boolean} */
            localStorage["YT_DARK"] = ison;
        }
    });
});
chrome["tabs"].onUpdated.addListener(function(canCreateDiscussions, isSlidingUp, lbit) {
    if (localStorage["YT_DARK"]) {
        /** @type {*} */
        ison = JSON.parse(localStorage["YT_DARK"]);
    }
    /** @type {boolean} */
    var isyoutube = lbit.url.indexOf("https://www.youtube.com") === 0;
    if (isyoutube) {
        if (ison) {
            chrome["browserAction"].setTitle({
                title : "Turn Off YouTube Dark Mode"
            });
        } else {
            chrome["browserAction"].setTitle({
                title : "Turn On YouTube Dark Mode"
            });
        }
        chrome["tabs"].executeScript({
            code : `\n\t\t\t\tfunction toggleDarkMode(s) {\n\t\t\t\t\tif (s == true) {\n\t\t\t\t\t\tdocument.documentElement.removeAttribute("style");\n\t\t\t\t\t\tdocument.documentElement.setAttribute("style", "font-size: 10px; font-family: Roboto, Arial, sans-serif; background-color: rgb(19, 19, 19);");\n\t\t\t\t\t\tdocument.documentElement.setAttribute("dark", "true");\n\n\t\t\t\t\t\tvar masthead = document.getElementById('masthead');\n\t\t\t\t\t\tif(masthead!=null&&masthead!=undefined){\n\t\t\t\t\t\t\tmasthead.setAttribute("style", "--yt-swatch-primary:rgb(35,35,35); --yt-swatch-primary-darker:rgb(32,32,32); --yt-swatch-text:rgb(255,255,255); --yt-swatch-important-text:rgb(255,255,255); --yt-swatch-input-text:rgba(255,255,255,1); --yt-swatch-textbox-bg:rgba(19,19,19,1); --yt-swatch-logo-override:rgb(255,255,255); --yt-swatch-icon-color:rgba(136,136,136,1);");\n\t\t\t\t\t\t\tmasthead.setAttribute("dark", "");\n\t\t\t\t\t\t}\n\t\t\t\t\t} else {\n\t\t\t\t\t\tdocument.documentElement.removeAttribute("style");\n\t\t\t\t\t\tdocument.documentElement.setAttribute("style", "font-size: 10px; font-family: Roboto, Arial, sans-serif; background-color: rgb(255, 255, 255);");\n\t\t\t\t\t\tdocument.documentElement.removeAttribute("dark");\n\n\t\t\t\t\t\tvar masthead = document.getElementById('masthead');\n\t\t\t\t\t\tif(masthead!=null&&masthead!=undefined){\n\t\t\t\t\t\t\tmasthead.setAttribute("style", "--yt-swatch-primary:rgb(255,255,255); --yt-swatch-primary-darker:rgb(230,230,230); --yt-swatch-text:rgba(17,17,17,0.4); --yt-swatch-input-text:rgba(17,17,17,1); --yt-swatch-textbox-bg:rgba(255,255,255,1); --yt-swatch-icon-color:rgba(136,136,136,1)");\n\t\t\t\t\t\t\tmasthead.removeAttribute("dark");\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tforceMasthead2Dark(` +
                ison + `);\n\t\t\t\t}\n\n\t\t\t\tfunction forceMasthead2Dark(s){\n\t\t\t\t\tvar _mh = document.getElementById('forceMasthead2Dark');\n\t\t\t\t\tif(_mh!=null){\n\t\t\t\t\t\t_mh.remove();\n\t\t\t\t\t}\n\t\t\t\t\tvar style = document.createElement('style');\n\t\t\t\t\tstyle.setAttribute('id', 'forceMasthead2Dark');\n\t\t\t\t\tstyle.type = "text/css";\n\t\t\t\t\tif(s==true){\n\t\t\t\t\t\tvar css = "ytd-masthead#masthead{--yt-swatch-primary:rgb(35,35,35) !important;--yt-swatch-primary-darker:rgb(32,32,32) !important; --yt-swatch-text:rgb(255,255,255) !important; --yt-swatch-important-text:rgb(255,255,255) !important;--yt-swatch-input-text:rgba(255,255,255,1) !important;--yt-swatch-textbox-bg:rgba(19,19,19,1) !important;--yt-swatch-logo-override:rgb(255,255,255) !important;--yt-swatch-icon-color:rgba(136,136,136,1) !important;}";\n\t\t\t\t\t\tstyle.appendChild(document.createTextNode(css));\n\t\t\t\t\t}else{\n\t\t\t\t\t\tvar css = "ytd-masthead#masthead{--yt-swatch-primary:rgb(255,255,255) !important;--yt-swatch-primary-darker:rgb(230,230,230) !important;--yt-swatch-text:rgba(17,17,17,0.4) !important;--yt-swatch-input-text:rgba(17,17,17,1) !important;--yt-swatch-textbox-bg:rgba(255,255,255,1) !important;--yt-swatch-icon-color:rgba(136,136,136,1) !important;}";\n\t\t\t\t\t\tstyle.appendChild(document.createTextNode(css));\n\t\t\t\t\t}\n\t\t\t\t\tdocument.body.appendChild(style);\n\t\t\t\t}\n\t\t\t\ttoggleDarkMode(` +
                ison + `);\n\t\t\t\t`,
            allFrames : false
        });
    }
});
