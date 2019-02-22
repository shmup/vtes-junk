// ==UserScript==
// @name         JOL+
// @namespace    https://github.com/shmup
// @version      1.0.0
// @description  Shows images for cards in hand
// @author       shmug
// @include	 https://deckserver.net/jol/*
// @run-at       document-idle
// @grant        GM_addStyle
// ==/UserScript==

/* jshint esversion: 6 */

/* Written for https://tampermonkey.net */

GM_addStyle("#preview { height: 375px}");
GM_addStyle("#preview img { height: 100%}");

(function(window) {
  "use strict";

  // add the preview
  document.getElementById("loaded").innerHTML += `<div id='preview' />`;
  const preview = document.getElementById("preview");

  const drawCards = () => {
    document
      .getElementById("playerHand")
      .querySelectorAll(".card-name")
      .forEach(card => {
        appendCard(cleanCard(card.innerText));
      });
  }

  const clearPreview = () => {
    preview.innerHTML = "";
  };

  const cleanCard = name => {
    return name.toLowerCase().replace(/\W/g, "");
  };

  const appendCard = name => {
    const img = document.createElement("img");
    img.src = `https://smell.flowers/rubbish/vtes/scans/${name}.jpg`;
    preview.appendChild(img);
  };

  // Select the node that will be observed for mutations
  const playerHand = document.getElementById("playerHand");

  // Callback function to execute when mutations are observed
  const callback = function(mutationsList, observer) {
    let cards;

    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        clearPreview();
        drawCards();
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for mutations
  observer.observe(playerHand, {
    attributes: true,
    childList: true,
    subtree: true
  });
})(window);
