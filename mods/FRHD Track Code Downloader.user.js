// ==UserScript==
// @name         FRHD Track Code Downloader
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include /^https?:\/\/(www\.)?freeriderhd\.com/t/*
// @icon         https://www.google.com/s2/favicons?domain=freeriderhd.com
// @grant        none
// ==/UserScript==

let url;
setInterval(() => {
    if (
        window.location.href !== url &&
        window.location.href.startsWith('https://www.freeriderhd.com/t/')
    ) {
        main();
    }
    url = window.location.href;
}, 1000);

const openPage = () => {
    var w = window.open("");
    w.document.write(GameManager.game.currentScene.track.getCode());
}

const main = () => {
    let timer = setInterval(() => {
        if (GameManager.game.currentScene.playerManager) {
            clearInterval(timer);
            const title = document.querySelector(
                '#about_main > div:nth-child(1) > h1'
            );
            let button = document.createElement('button');
            button.title = 'Save your track to local storage';
            button.style = "margin-left:5px;border:none;background:none;color:#1f80c3;"
            button.onclick = openPage;
            button.innerHTML = '&lt/&gt';
            //const button = `<button onclick="openPage" style="margin-left:5px;border:none;background:none;color:#1f80c3;">&lt/&gt</button>`;
            const trackUserId = window.GameManager.settings.track.u_url; //gets curent user id
            const userId = window.GameManager.settings.user.u_name;
            const text = title.textContent;
            console.log("We got here at least!",title)
            if (trackUserId === userId) {
                title.appendChild(button)
            }
        }
    });
};
