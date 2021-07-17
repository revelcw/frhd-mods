// ==UserScript==
// @name         FRHD Save-Load
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Adds a save and load button to the editor
// @author       revelcw
// @match        https://www.freeriderhd.com
// @include /^https?:\/\/(www\.)?freeriderhd\.com
// @icon         https://www.google.com/s2/favicons?domain=freeriderhd.com
// @grant        none
// ==/UserScript==

let url;
setInterval(() => {
  if (
    window.location.href !== url &&
    window.location.href.startsWith('https://www.freeriderhd.com/create')
  ) {
    main();
  }
  url = window.location.href;
}, 1000);

function saveData() {
  let code = GameManager.game.currentScene.track.getCode();
  localStorage.setItem('savedCode', code);
}
function loadData() {
  GameManager.game.currentScene.importCode = localStorage.getItem('savedCode');
}
const main = async () => {
  let timer = setInterval(() => {
    if (
      document.querySelector('#game-container > div > div.topMenu.unselectable')
    ) {
      clearInterval(timer);
      let menuBar = document.querySelector(
        '#game-container > div > div.topMenu.unselectable'
      );
      let publishButton = document.querySelector(
        '#game-container > div > div.topMenu.unselectable > div:nth-child(4)'
      );
      var save = document.createElement('div');
      save.className = 'topMenu-button topMenu-button_offline';
      save.title = 'Save your track to local storage';
      save.onclick = saveData;
      save.innerHTML = '<a class="text">Save</a>';
      var load = document.createElement('div');
      load.className = 'topMenu-button topMenu-button_offline';
      load.title = 'Load your track from local storage';
      load.onclick = loadData;
      load.innerHTML = '<a class="text">Load</a>';
      menuBar.insertBefore(save, publishButton);
      menuBar.insertBefore(load, publishButton);
    }
  });
};
