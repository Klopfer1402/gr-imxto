// ==UserScript==
// @name         IMX.TO Direktlink on GirlsReleased
// @name:de      Direkte Bildlinks auf Girlsreleased.com
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Replaces Image URIs on GirlsReleased with direct links to the image files on imx.to or imagetwist.com
// @description:de Ersetzt die Bild-Links auf GirlsReleased mit direkten Links zu den Bilddateien auf imx.to oder imagetwist.com
// @author       Christian Schmidt
// @updateURL    https://github.com/Klopfer1402/gr-imxto/raw/main/gr-imxto.user.js
// @match        https://girlsreleased.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=girlsreleased.com
// @grant        none
// @license		 MIT
// ==/UserScript==

(function() {
    'use strict';

    const urlpart = '.imx.to/i/';
    const auswahl = document.createElement('div');
    const imxtoptn = /imx\.to/;
    const imgtwistptn = /imagetwist\.com/;
    const imgtwistbigjpg = /\.JPG/;
    auswahl.style.fontSize = '0.7em';
    auswahl.style.padding = '1em';
    auswahl.innerHTML = '<form id="imxtoauswahl"><label for="imxtoselect">imx.to image server:</label><select name="imxtoselect" id="imxtoselect" size="1"><option value="i" selected>i</option><option value="i001">i001</option><option value="i002">i002</option><option value="i003">i003</option></select>.imx.to</label> <button id="imxtoselectbtn">Select</button></form>';
    const content = document.querySelector('#set > .content');
    content.prepend(auswahl);

    const awbutton = document.getElementById("imxtoselectbtn");
    if (awbutton != null) {
        awbutton.addEventListener("click", function(e) {
            e.preventDefault();
            const aw = document.getElementById("imxtoselect").value;
            if (!aw) return;
            let servername = aw + urlpart;
            let thumblist = document.querySelectorAll('ul.setthumbs > li');
            if (thumblist.length == 0) return;
            [...thumblist].forEach(ele => {
                const a = ele.querySelector('a');
                const img = ele.querySelector('img');
                const thumbimgsrc = img.src;

                if (imxtoptn.test(thumbimgsrc)) {
                    const neubildsrc = thumbimgsrc.replace('https://imx.to/u/t/', 'https://' + servername);
                    a.href = neubildsrc;
                    let bgcolor = 'PowderBlue';
                    switch (aw) {
                        case 'i001': bgcolor = 'AliceBlue'; break;
                        case 'i002': bgcolor = 'Azure'; break;
                        case 'i003': bgcolor = 'PaleTurquoise'; break;
                        default: bgcolor = 'PowderBlue'; break;
                    }
                    ele.style.backgroundColor = bgcolor;
                }
                if (imgtwistptn.test(thumbimgsrc)) {
                    let neubildsrc = thumbimgsrc;
                    if (imgtwistbigjpg.test(img.alt)) {
                        neubildsrc = neubildsrc.replace('.jpg', '.JPG');
                    }
                    neubildsrc = neubildsrc.replace('imagetwist.com/th/', 'imagetwist.com/i/') + '/' + img.alt;

                    a.href = neubildsrc;
                    ele.style.backgroundColor = 'Lavender';
                }
            });
        });
    }
})();