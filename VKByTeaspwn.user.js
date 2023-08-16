// ==UserScript==
// @name         VK By Teaspwn
// @namespace    https://github.com/teaspwn/vk-old-ui-2016-2020
// @version      1.0
// @description  VK By Teaspwn
// @author       Teaspwn
// @match        *://*.vk.com/*
// @match        *://*.vk.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vk.com
// @license MIT
// ==/UserScript==
/**
 * Options.
 */
const teaOptions = {
    RemoveReactions: true,      // Скрыть реакции и показывать старое меню тех кто поставил лайк
    AltMenuButtons: true,      // Альтернативные кнопки в меню
    MenuName: true            // Показывать имя аккаунта в верхнем меню
}
/**
 * Localization strings.
 */
 const teai18n = {
    en: {
        Edit: "Edit"
    },
    ru: {
        Edit: "Редактировать"
    }
};
/**
 * Get a string from the localization strings.
 *
 * @param {string} string  Name of string to get
 * @param {string} hl      Language to use.
 * @returns {string}
 */
function getString(string, hl = "en") {
    if (!string) return "ERROR";
    if (teai18n[hl]) {
        if (teai18n[hl][string]) {
            return teai18n[hl][string];
        } else if (teai18n.en[string]) {
            return teai18n.en[string];
        } else {
            return "ERROR";
        }
    } else {
        if (teai18n.en[string]) return teai18n.en[string];
        return "ERROR";
    }
}
window.onload = function () {
    initial();
};
function initial() {
    console.log('VK By Teaspwn Загружен');
    topmenu();
    if (teaOptions.RemoveReactions) {Reactioncss();}
    }
if (teaOptions.RemoveReactions) {
window.addEventListener('scroll', function () {
    KPP.add('.PostButtonReactions', function (reactions) {
        var count = reactions.dataset.reactionCounts;
        if (count && !(reactions.dataset.reactionButtonTextIsCounter)) {
            count = JSON.parse(count);
            if (!Array.isArray(count)) {
                count = Object.values(count)
            }
            var likes = count.reduce(function (previous, current) {
                return previous + current
            })
            reactions.getElementsByClassName('PostButtonReactions__title')[0].textContent = likes;
        }
        reactions.dataset.reactionButtonTextIsCounter = '1';

        var target = reactions.dataset.reactionTargetObject;
        if (target) {
            reactions.setAttribute('onmouseover', 'Likes.showLikes(this,\'' + target + '\')')
        }
    });
});
}
function Reactioncss() {
const reactcss = document.createElement('style');
reactcss.innerHTML = `
      .ReactionsMenuPopper,.fans_fanph_reaction,li#likes_tab_reactions_0, li#likes_tab_reactions_1, li#likes_tab_reactions_2, li#likes_tab_reactions_3, li#likes_tab_reactions_4, li#likes_tab_reactions_5,.ui_tab.ui_tab_group {
        display: none !important;
        }
    `;
reactcss.classList = 'RemoveReactions';
document.head.appendChild(reactcss);
}
// Меню и Имя возле иконки
function topmenu() {
    try {
    var parentlnk = document.querySelector('div#top_profile_menu')
    var Profilelnk = document.querySelector('li#l_pr a')
    var setlnk = document.querySelector('a#top_settings_link');
    var suplnk = document.querySelector('a#top_support_link');
    var loglnk = document.querySelector('a#top_logout_link');
    var name = document.querySelector('img.TopNavBtn__profileImg');
    var VKID = document.querySelector("#react_rootEcosystemAccountMenuEntry")
    var MyProfileSpan = document.querySelector("#l_pr > a > span > span")

    if (name) {
        var namealt = name.alt
    }
    const language = langConfig.locale.split("-")[0] ?? "en";
    var s = document.querySelector('a#top_profile_link');
    var q = document.createElement('div');
    var Myprofilebutton = document.createElement('a');
    var EditButton = document.createElement('a');
    var VKIDButton = document.createElement('a');
Myprofilebutton.classList.add("top_profile_mrow");
EditButton.classList.add("top_profile_mrow");
VKIDButton.classList.add("top_profile_mrow");
Myprofilebutton.setAttribute("id", "top_myprofile_link");
EditButton.setAttribute("id", "top_edit_link");
VKIDButton.setAttribute("id", "top_vkid_link");
EditButton.href = ("/edit");
VKIDButton.href = ("https://id.vk.com/account/#/main");
q.classList.add("top_profile_name");
    q.innerHTML = `` + namealt + ``;
    if (Profilelnk) {
        Myprofilebutton.href = Profilelnk.href
    }
Myprofilebutton.innerHTML += `<div class="menu_item_icon"><svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M5.84 15.63a6.97 6.97 0 0 0 8.32 0 8.2 8.2 0 0 0-8.32 0zM4.7 14.57a7 7 0 1 1 10.6 0 9.7 9.7 0 0 0-10.6 0zM10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zm-1.5 7a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm1.5-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fill="currentColor" fill-rule="evenodd"></path></svg></div> <span>${MyProfileSpan.textContent}</span>`;
EditButton.innerHTML += `<div class="menu_item_icon"><svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M16.583 9.293a1.001 1.001 0 0 1 1.416 0l.708.708a1.001 1.001 0 0 1 0 1.416l-.708.708-2.124-2.124.708-.708Zm-1.689 1.688 2.124 2.124-4.338 4.338a4.005 4.005 0 0 1-1.565.968l-1.72.573a.3.3 0 0 1-.38-.38l.574-1.72a4.005 4.005 0 0 1 .967-1.565l4.338-4.338Z" fill="currentColor" fill-rule="evenodd"></path> <path fill="currentColor" fill-rule="evenodd" d="M10 2.5C8.636 2.5 7.557 3.602 7.557 5S8.637 7.5 10 7.5c1.398 0 2.557-1.136 2.557-2.5S11.397 2.5 10 2.5ZM6.057 5c0-2.192 1.717-4 3.943-4 2.192 0 4.057 1.774 4.057 4S12.192 9 10 9C7.774 9 6.057 7.192 6.057 5Zm-.274 7.833c-1.04.54-1.63 1.283-1.76 2.194-.05.347-.024.758.12 1.044.066.131.15.227.262.295.112.068.294.134.595.134h2A.75.75 0 0 1 7 18H5c-.528 0-.99-.118-1.375-.353a2.194 2.194 0 0 1-.823-.903c-.332-.664-.337-1.418-.264-1.93.216-1.514 1.209-2.615 2.554-3.312 1.03-.534 2.292-.85 3.67-.967a14.735 14.735 0 0 1 1.243-.051l1.25.046c.468 0 .791.362.75.806-.042.445-.337.734-.75.704l-1.25-.056c-.43 0-.846.02-1.244.057-1.174.112-2.191.384-2.978.792Z" clip-rule="evenodd"></path> </svg></div> <span>${getString("Edit", language)}</span>`;
VKIDButton.innerHTML += `<div class="menu_item_icon"><svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M10.154 2.508a1.25 1.25 0 0 0-.308 0c-.099.013-.203.043-.589.166L4.592 4.158c-.21.067-.33.106-.42.141a.533.533 0 0 0-.081.038.25.25 0 0 0-.073.099.535.535 0 0 0-.01.09A7.253 7.253 0 0 0 4 4.967v5.69c0 1.857.993 3.354 2.262 4.513 1.27 1.159 2.74 1.908 3.506 2.25.09.04.126.056.154.067a.236.236 0 0 0 .156 0c.028-.011.065-.027.154-.067.766-.342 2.237-1.091 3.506-2.25C15.008 14.012 16 12.515 16 10.658v-5.69c0-.22 0-.347-.007-.443a.525.525 0 0 0-.011-.09.249.249 0 0 0-.072-.098.53.53 0 0 0-.082-.038 7.249 7.249 0 0 0-.42-.14l-4.665-1.485c-.386-.123-.49-.153-.59-.166Zm5.757 1.83-.002-.001Zm.07.096v.002Zm-11.962 0v.002Zm.07-.096.002-.001ZM9.662 1.02a2.75 2.75 0 0 1 .676 0c.269.033.526.118.86.224l4.665 1.485.08.025c.316.1.653.206.917.422.229.188.406.431.516.706.126.317.125.67.124 1.002v5.774c0 2.44-1.314 4.309-2.75 5.62-1.438 1.313-3.072 2.14-3.906 2.512-.152.069-.318.147-.55.186-.177.03-.411.03-.587 0-.233-.04-.399-.117-.551-.186-.833-.372-2.468-1.199-3.905-2.511-1.437-1.312-2.751-3.181-2.751-5.62V4.883c-.001-.332-.002-.685.124-1.002a1.75 1.75 0 0 1 .516-.706c.264-.216.6-.322.917-.422l.08-.025 4.665-1.485c.335-.106.591-.19.86-.224ZM13.76 7.2a.75.75 0 0 1 .04 1.06l-4.179 4.5a.75.75 0 0 1-1.1 0l-2.32-2.5A.75.75 0 1 1 7.3 9.24l1.771 1.908 3.63-3.908a.75.75 0 0 1 1.06-.04Z" fill="currentColor" fill-rule="evenodd"></path></svg></div> <span>VK ID</span>`;
    if (namealt != null) {
        if (teaOptions.MenuName) {s.insertBefore(q, s.firstChild)}
        if (teaOptions.AltMenuButtons) {
        VKID.style.display = 'none';
        setlnk.insertAdjacentElement('beforeBegin', Myprofilebutton);
        parentlnk.insertBefore(EditButton, setlnk)
        parentlnk.insertBefore(VKIDButton, setlnk)
        }
    }
    }catch(e){
    }
}
const customcss = document.createElement('style');
customcss.innerHTML = `
      .top_profile_name {
    padding-right: 10px;
    display: inline-block;
    vertical-align: top;
    font-weight: 500;
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: auto;
}
    `;
customcss.classList = 'VKByTeaspwnCSS';
document.head.appendChild(customcss);
var KPP
KPP = {
    _list: [],
    _actions: [],
    _addedTag: function (observer, mutations, tag, callback, once) {
        for (var i = 0, l = mutations.length; i < l; i++) {
            for (var j = 0, m = mutations[i].addedNodes.length; j < m; j++) {
                if (mutations[i].addedNodes[j].tagName === tag) {
                    callback();
                    if (once) observer.disconnect();
                }
            }
        }
    },
    _police: new MutationObserver(function (mutations) {
        for (var i = 0, l = mutations.length; i < l; i++) {
            for (var j = 0, m = mutations[i].addedNodes.length; j < m; j++) {
                if (mutations[i].addedNodes[j].nodeType === 1) {
                    for (var k = KPP._list.length; k--;) {
                        if (mutations[i].addedNodes[j].matches(KPP._list[k])) { // Обрабатывает только существующие элементы до DOMContentLoaded
                            if (!mutations[i].addedNodes[j].KPPPassed) {
                                KPP._actions[k](mutations[i].addedNodes[j]);
                                mutations[i].addedNodes[j].KPPPassed = true;
                            }
                        } else {
                            var n = mutations[i].addedNodes[j].querySelectorAll(KPP._list[k]);
                            for (var o = 0, p = n.length; o < p; o++) {
                                if (!n[o].KPPPassed) {
                                    KPP._actions[k](n[o]);
                                    n[o].KPPPassed = true;
                                }
                            }
                        }
                        //if (n.length > 0) break
                    }
                }
            }
        }
    }),
    head: function (callback) {
        if (!document.head) {
            var observer = new MutationObserver(function (mutations, observer) {
                KPP._addedTag(observer, mutations, 'HEAD', callback, true)
            });
            observer.observe(document.documentElement, { childList: true });
        } else callback();
    },
    body: function (callback) {
        if (!document.body) {
            var observer = new MutationObserver(function (mutations, observer) {
                KPP._addedTag(observer, mutations, 'BODY', callback, true)
            });
            observer.observe(document.documentElement, { childList: true });
        } else callback();
    },
    add: function (selector, callback) {
        var q = document.querySelectorAll(selector);
        if (q.length > 0) {
            for (var i = q.length; i--;) {
                callback(q[i]);
            }
        }
        KPP._list.push(selector);
        KPP._actions.push(callback);
        KPP._police.observe(document.documentElement, { childList: true, subtree: true })
    },
    remove: function (selector) {
        var s = KPP._list.indexOf(selector);
        if (s !== -1) {
            KPP._list.splice(s, 1);
            KPP._actions.splice(s, 1);
            if (KPP._list.length < 1){
                KPP._police.disconnect();
            return true
            }
        }
        return false
    },
    stop: function (full) {
        KPP._police.disconnect();
        if (full) {
            KPP._list = [];
            KPP._actions = [];
        }
    }
};