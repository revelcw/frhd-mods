// ==UserScript==
// @name         FRHD Last Played
// @version      1
// @description  Shows when a user last played
// @author       revelcw
// @match        https://*.freeriderhd.com/*
// @match        https://freeriderhd.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  let url;
  setInterval(() => {
    if (
      window.location.href !== url &&
      window.location.href.startsWith('https://www.freeriderhd.com/u/')
    ) {
      main();
    }
    url = window.location.href;
  }, 500);

  const getUserData = async (user) => {
    const resp = await fetch(`https://www.freeriderhd.com/u/${user}?ajax=true`);
    if (resp.ok) {
      return await resp.json();
    }
  };

  const getUserActivity = async (user) => {
    const userData = await getUserData(user);
    if (userData?.friends.friends_data.length > 0) {
      const friend = userData.friends.friends_data[0];
      const friendData = await getUserData(friend.u_name);
      return friendData.friends.friends_data.find(
        (friend) => friend.u_name.toLowerCase() === user.toLowerCase()
      ).activity_time_ago;
    } else {
      throw new Error('User not defined / User has no friends');
    }
  };

  const main = async () => {
    let timer = setInterval(async () => {
      if (
        document.querySelector(
          '#content > div > div.profile-header > div.profile-user-info.clearfix > div > div.profile-info > div:nth-child(2)'
        )
      ) {
        clearInterval(timer);
        const url = new URL(document.URL);
        const user = url.pathname.split('/')[2];
        const lastPlayed = await getUserActivity(user);
        if (lastPlayed) {
          const parent = document.querySelector(
            '#content > div > div.profile-header > div.profile-user-info.clearfix > div > div.profile-info'
          );
          const ref = document.querySelector(
            '#content > div > div.profile-header > div.profile-user-info.clearfix > div > div.profile-info > div:nth-child(3)'
          );
          const text = document.createElement('div');
          text.classList.add('profile-blurb');
          text.classList.add('flex-item');
          text.style = 'padding: 2px 3px 3px 0px;font-size: 12.5px;';
          text.textContent = 'Last Played ' + lastPlayed;
          parent.insertBefore(text, ref);
          console.log('Last Played: ' + lastPlayed);
        }
      }
    });
  };
})();
