// ==UserScript==
// @name         VK By Teaspwn
// @namespace    https://github.com/teaspwn/vk-old-ui-2016-2020
// @version      1.7
// @description  VK By Teaspwn
// @author       Teaspwn
// @match        *://*.vk.com/*
// @match        *://*.vk.ru/*
// @updateURL    https://github.com/teaspwn/VKByTeaspwn/raw/main/VKByTeaspwn.user.js
// @downloadURL  https://github.com/teaspwn/VKByTeaspwn/raw/main/VKByTeaspwn.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vk.com
// @license MIT
// ==/UserScript==
/**
 * Options.
 */
const teaOptions = {
    RemoveReactions: true,      // Скрыть реакции и показывать старое меню тех кто поставил лайк
    AltMenuButtons: true,      // Альтернативные кнопки в меню
    MenuName: true,           // Показывать имя аккаунта в шапке сайта
    MyMusicLink: true           // Показывать первым мою музыку вместо главной страницы
}
/**
 * Localization strings.
 */
 const teai18n = {
    en: {
        switchAccount: "Switch account"
    },
    ru: {
        switchAccount: "Другие аккаунты"
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
return (teai18n[hl] && teai18n[hl][string]) ?? "ERROR";
}
/**
 * Mutationobserver.
 */
var KPP = {
    _list: [],
    _actions: [],
    _police: new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (addedNode) {
                if (addedNode.nodeType === 1) {
                    KPP._list.forEach(function (selector, index) {
                        if (addedNode.matches(selector)) {
                            if (!addedNode.KPPPassed) {
                                KPP._actions[index](addedNode);
                                addedNode.KPPPassed = true;
                            }
                        } else {
                            var elements = addedNode.querySelectorAll(selector);
                            elements.forEach(function (element) {
                                if (!element.KPPPassed) {
                                    KPP._actions[index](element);
                                    element.KPPPassed = true;
                                }
                            });
                        }
                    });
                }
            });
        });
    }),
    head: function (callback) {
        if (!document.head) {
            var observer = new MutationObserver(function (mutations, observer) {
                KPP._addedTag(observer, mutations, 'HEAD', callback, true);
            });
            observer.observe(document.documentElement, { childList: true });
        } else callback();
    },
    body: function (callback) {
        if (!document.body) {
            var observer = new MutationObserver(function (mutations, observer) {
                KPP._addedTag(observer, mutations, 'BODY', callback, true);
            });
            observer.observe(document.documentElement, { childList: true });
        } else callback();
    },
    add: function (selector, callback) {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function (element) {
            callback(element);
        });

        KPP._list.push(selector);
        KPP._actions.push(callback);
        KPP._police.observe(document.documentElement, { childList: true, subtree: true });
    },
    remove: function (selector) {
        var index = KPP._list.indexOf(selector);
        if (index !== -1) {
            KPP._list.splice(index, 1);
            KPP._actions.splice(index, 1);
            if (KPP._list.length < 1) {
                KPP._police.disconnect();
                return true;
            }
        }
        return false;
    },
    stop: function (full) {
        KPP._police.disconnect();
        if (full) {
            KPP._list = [];
            KPP._actions = [];
        }
    }
};
window.onload = function () {
    initial();
};
function initial() {
    AltCss();
    if (teaOptions.AltMenuButtons) {topmenu();}
    if (teaOptions.MenuName) {TopName();}
    if (teaOptions.MyMusicLink) {MyMusicA();}
    console.log('VK By Teaspwn Загружен');
    }
if (teaOptions.RemoveReactions) {
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
            reactions.setAttribute('onmouseover', 'Likes.showLikes(this,\'' + target + '\')');
            reactions.removeAttribute("onmouseenter");
            reactions.removeAttribute("onkeydown");
            //console.log('reactions');
        }
    });
}
// Меню и Имя возле иконки
function TopName() {
    var name = document.querySelector('img.TopNavBtn__profileImg');
        if (name) {
        var namealt = name.alt
    }
var profilelink = document.querySelector('a#top_profile_link');
var profilenamediv = document.createElement('div');
profilenamediv.classList.add("top_profile_name2");
profilenamediv.innerHTML = namealt;
if (namealt != null) {profilelink.insertBefore(profilenamediv, profilelink.firstChild)}
}
function topmenu() {
    const language = langConfig.locale.split("-")[0] ?? "en";
    var parentlnk = document.querySelector('div#top_profile_menu')
    var Profilelnk = document.querySelector('li#l_pr a')
    var setlnk = document.querySelector('a#top_settings_link');
    var suplnk = document.querySelector('a#top_support_link');
    var loglnk = document.querySelector('a#top_logout_link');
    var VKID = document.querySelector("#react_rootEcosystemAccountMenuEntry")
    var AccountSwticherDiv = document.querySelector("#react_rootEcosystemMultiAccountsEntry");
    var MyProfileSpan = document.querySelector("#l_pr > a > span > span");
    var MenuButtonTop = document.querySelector("#top_profile_link");
    var VKNextMenuA = document.querySelector("#top_profile_menu > a.NKkdPOArTPmbp0Lz");
    var AccountAvatar = document.querySelector("#react_rootEcosystemAccountMenuEntry [class^=EcosystemAccountMenuUser_avatar] > div > img")
    var AccountName = document.querySelector("#react_rootEcosystemAccountMenuEntry [class^=EcosystemAccountMenuUser_name]")

    var Myprofilebutton = document.createElement('a');
    var EditButton = document.createElement('a');
    var VKIDButton = document.createElement('a');
    var AccountSwitcherButton = document.createElement('a');
Myprofilebutton.classList.add("top_profile_mrow");
EditButton.classList.add("top_profile_mrow");
VKIDButton.classList.add("top_profile_mrow");
AccountSwitcherButton.classList.add("top_profile_mrow");
Myprofilebutton.setAttribute("id", "top_myprofile_link");
EditButton.setAttribute("id", "top_edit_link");
VKIDButton.setAttribute("id", "top_vkid_link");
AccountSwitcherButton.setAttribute("id", "top_accswitch_link");
AccountSwitcherButton.addEventListener ("click", showSwitcher , false);
EditButton.href = ("/edit");
VKIDButton.href = ("https://id.vk.com/account/#/main");
    if (Profilelnk) {
        Myprofilebutton.href = Profilelnk.href
    }
if (VKID != null||AccountAvatar != null||AccountName != null) {VKID.style.display = 'none';Myprofilebutton.innerHTML += `<img class="menu_item_img" src="${AccountAvatar.src}"> <span class="menu_item_name">${AccountName.textContent}</span>`;} else {console.error("Error loading new profile button."); Myprofilebutton.innerHTML += `<div class="menu_item_icon"><svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M5.84 15.63a6.97 6.97 0 0 0 8.32 0 8.2 8.2 0 0 0-8.32 0zM4.7 14.57a7 7 0 1 1 10.6 0 9.7 9.7 0 0 0-10.6 0zM10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zm-1.5 7a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm1.5-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fill="currentColor" fill-rule="evenodd"></path></svg></div> <span>${lang.stories_live_ended_open_user}</span>`;}
EditButton.innerHTML += `<div class="menu_item_icon"><svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M16.583 9.293a1.001 1.001 0 0 1 1.416 0l.708.708a1.001 1.001 0 0 1 0 1.416l-.708.708-2.124-2.124.708-.708Zm-1.689 1.688 2.124 2.124-4.338 4.338a4.005 4.005 0 0 1-1.565.968l-1.72.573a.3.3 0 0 1-.38-.38l.574-1.72a4.005 4.005 0 0 1 .967-1.565l4.338-4.338Z" fill="currentColor" fill-rule="evenodd"></path> <path fill="currentColor" fill-rule="evenodd" d="M10 2.5C8.636 2.5 7.557 3.602 7.557 5S8.637 7.5 10 7.5c1.398 0 2.557-1.136 2.557-2.5S11.397 2.5 10 2.5ZM6.057 5c0-2.192 1.717-4 3.943-4 2.192 0 4.057 1.774 4.057 4S12.192 9 10 9C7.774 9 6.057 7.192 6.057 5Zm-.274 7.833c-1.04.54-1.63 1.283-1.76 2.194-.05.347-.024.758.12 1.044.066.131.15.227.262.295.112.068.294.134.595.134h2A.75.75 0 0 1 7 18H5c-.528 0-.99-.118-1.375-.353a2.194 2.194 0 0 1-.823-.903c-.332-.664-.337-1.418-.264-1.93.216-1.514 1.209-2.615 2.554-3.312 1.03-.534 2.292-.85 3.67-.967a14.735 14.735 0 0 1 1.243-.051l1.25.046c.468 0 .791.362.75.806-.042.445-.337.734-.75.704l-1.25-.056c-.43 0-.846.02-1.244.057-1.174.112-2.191.384-2.978.792Z" clip-rule="evenodd"></path> </svg></div> <span>${lang.global_edit}</span>`;
VKIDButton.innerHTML += `<div class="menu_item_icon"><svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M10.154 2.508a1.25 1.25 0 0 0-.308 0c-.099.013-.203.043-.589.166L4.592 4.158c-.21.067-.33.106-.42.141a.533.533 0 0 0-.081.038.25.25 0 0 0-.073.099.535.535 0 0 0-.01.09A7.253 7.253 0 0 0 4 4.967v5.69c0 1.857.993 3.354 2.262 4.513 1.27 1.159 2.74 1.908 3.506 2.25.09.04.126.056.154.067a.236.236 0 0 0 .156 0c.028-.011.065-.027.154-.067.766-.342 2.237-1.091 3.506-2.25C15.008 14.012 16 12.515 16 10.658v-5.69c0-.22 0-.347-.007-.443a.525.525 0 0 0-.011-.09.249.249 0 0 0-.072-.098.53.53 0 0 0-.082-.038 7.249 7.249 0 0 0-.42-.14l-4.665-1.485c-.386-.123-.49-.153-.59-.166Zm5.757 1.83-.002-.001Zm.07.096v.002Zm-11.962 0v.002Zm.07-.096.002-.001ZM9.662 1.02a2.75 2.75 0 0 1 .676 0c.269.033.526.118.86.224l4.665 1.485.08.025c.316.1.653.206.917.422.229.188.406.431.516.706.126.317.125.67.124 1.002v5.774c0 2.44-1.314 4.309-2.75 5.62-1.438 1.313-3.072 2.14-3.906 2.512-.152.069-.318.147-.55.186-.177.03-.411.03-.587 0-.233-.04-.399-.117-.551-.186-.833-.372-2.468-1.199-3.905-2.511-1.437-1.312-2.751-3.181-2.751-5.62V4.883c-.001-.332-.002-.685.124-1.002a1.75 1.75 0 0 1 .516-.706c.264-.216.6-.322.917-.422l.08-.025 4.665-1.485c.335-.106.591-.19.86-.224ZM13.76 7.2a.75.75 0 0 1 .04 1.06l-4.179 4.5a.75.75 0 0 1-1.1 0l-2.32-2.5A.75.75 0 1 1 7.3 9.24l1.771 1.908 3.63-3.908a.75.75 0 0 1 1.06-.04Z" fill="currentColor" fill-rule="evenodd"></path></svg></div> <span>VK ID</span>`;
AccountSwitcherButton.innerHTML += `<div class="menu_item_icon"><svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><g clip-rule="evenodd" fill-rule="evenodd"><path d="M6.25 3.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-1.5 3a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm-2.06 5.07c.96-.55 2.22-.82 3.56-.82s2.6.27 3.56.82c.98.56 1.69 1.47 1.69 2.68 0 .7-.28 1.3-.78 1.71-.48.39-1.1.54-1.72.54H3.5c-.61 0-1.24-.15-1.72-.54-.5-.4-.78-1-.78-1.71 0-1.21.71-2.12 1.69-2.68zm.75 1.3c-.65.37-.94.84-.94 1.38 0 .3.1.44.22.54.14.11.4.21.78.21H9c.39 0 .64-.1.78-.21.12-.1.22-.25.22-.54 0-.54-.29-1-.94-1.38-.66-.39-1.65-.62-2.81-.62s-2.15.23-2.81.62zM13.75 3.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-1.5 3a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"></path></g><path d="M13.75 12.25c-.23 0-.45.01-.68.03a.75.75 0 1 1-.14-1.49c.27-.03.54-.04.82-.04 1.34 0 2.6.27 3.56.82.98.56 1.69 1.47 1.69 2.68 0 .7-.28 1.3-.78 1.71-.48.39-1.1.54-1.72.54h-3a.75.75 0 0 1 0-1.5h3c.39 0 .64-.1.78-.21.12-.1.22-.25.22-.54 0-.54-.29-1-.94-1.38a5.77 5.77 0 0 0-2.81-.62z"></path></g></svg></div> <span>${getString("switchAccount", language)}</span> <span class="menu_item_arrow"><svg fill="none" height="16" viewBox="0 0 12 16" width="16" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M4.22 3.47a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06-1.06L7.69 8 4.22 4.53a.75.75 0 0 1 0-1.06z" fill="currentColor" fill-rule="evenodd"></path></svg></span>`;
        if (parentlnk) {
        setlnk.insertAdjacentElement('beforeBegin', Myprofilebutton);
        parentlnk.insertBefore(EditButton, setlnk)
        parentlnk.insertBefore(VKIDButton, setlnk)
        parentlnk.insertBefore(AccountSwitcherButton, AccountSwticherDiv)
        if (VKNextMenuA != null) {parentlnk.insertBefore(VKNextMenuA, setlnk);}
        }

}
 function showSwitcher(event) {
var Menu = document.getElementById("top_profile_menu");
var AccountSwticherDiv = document.getElementById("react_rootEcosystemMultiAccountsEntry");
var AccountSwticherButton = document.getElementById("top_accswitch_link");
  if (!AccountSwticherDiv.classList.contains('active')) {
    AccountSwticherDiv.classList.add("active");
    AccountSwticherButton.classList.add("active");
  } else {
    AccountSwticherDiv.classList.remove("active");
    AccountSwticherButton.classList.remove("active");
  }
}
// Кнопка музыки в левом меню
function MyMusicA() {
var leftaudiobutton = document.querySelector("#l_aud > a")
if(leftaudiobutton) {
leftaudiobutton.setAttribute('href', `/audios`+ vk.id +`?section=all`);
}
}
function AltCss() {
    if (teaOptions.MenuName) document.head.insertAdjacentHTML("beforeend", `
    <style id="VKByTeaspwnCSS">
    .top_profile_name2 {
    padding-right: 10px;
    display: inline-block;
    vertical-align: top;
    font-weight: 500;
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: auto;
}
    </style>
    `);
    if (teaOptions.AltMenuButtons) document.head.insertAdjacentHTML("beforeend", `
    <style id="AltAccountMenu">
#react_rootEcosystemMultiAccountsEntry {
    opacity: 0;
    height: 0;
    overflow: hidden;
    -webkit-transition: opacity 100ms linear,top 100ms linear,bottom 100ms linear,visibility 100ms linear;
    transition: opacity 100ms linear,top 100ms linear,bottom 100ms linear,visibility 100ms linear;
}
#react_rootEcosystemMultiAccountsEntry.active {opacity: 1;height: auto;}
.menu_item_arrow {
    display: flex;
    align-items: center;
    margin-left: auto;
    pointer-events: none;
    color: var(--vkui--color_icon_secondary);
}
#top_accswitch_link.active .menu_item_arrow {transform: rotate(90deg);}
#top_profile_menu #top_myprofile_link .menu_item_img {
    width: 20px;
    height:20px;
    margin-right: 8px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: 50%;
}
#top_profile_menu #top_myprofile_link .menu_item_name {overflow:hidden;text-overflow: ellipsis; max-width:240px}
[class^="EcosystemMultiAccounts_wrapper_"] .vkuiFootnote {display:none;}
#top_profile_menu.top_profile_menu_new {padding-top: 5px;padding-bottom: 5px;}
    </style>
    `);
   if (teaOptions.RemoveReactions) document.head.insertAdjacentHTML("beforeend", `
    <style id="RemoveReactions">
      .ReactionsMenuPopper,.fans_fanph_reaction,li#likes_tab_reactions_0, li#likes_tab_reactions_1, li#likes_tab_reactions_2, li#likes_tab_reactions_3, li#likes_tab_reactions_4, li#likes_tab_reactions_5,.ui_tab.ui_tab_group,.like_tt_owners .AvatarRich__badge {
        display: none !important;
        }
    </style>
    `);
   if (teaOptions.MyMusicLink) document.head.insertAdjacentHTML("beforeend", `
    <style id="MusicFix">
     ._audio_section_tab__my {order: -1;}
     #audio_layer_tt ._audio_section_tab__my {order: 0;}
    </style>
    `);
    };
