// ==UserScript==
// @name         Trading Position Size Calculator
// @namespace    http://tampermonkey.net/
// @version      1.12
// @description  Add a position size calculator bar to an exchange
// @author       0xpeti
// @match        https://www.bybit.com/*
// @match        https://www.binance.com/*
// @match        https://app.drift.trade/*
// @updateURL    https://github.com/0xpeti/position-size-calculator/blob/main/position-size-calculator.user.js
// @downloadURL  https://github.com/0xpeti/position-size-calculator/blob/main/position-size-calculator.user.js
// @grant        none
// ==/UserScript==

/* 
README
What it does:
- Adds a handy position size calculator bar to the website of Bybit and Binance trading platforms.
- Input: Trading Account Size, Risk %, Entry, Stop-Loss, Take Profit.
- Output: real-time calculations for Position Size, Position Size at current Market Price, Risk, Reward, and Risk:Reward ratio.
- Colors change based on the type of position (long or short).

How to Set Up:
1. Install Tampermonkey or a similar userscript manager in your browser.
2. Add this script to Tampermonkey and save.
3. Navigate to the desired exchange, and the calculator should appear at the top of the page.
4. Enter your balance, percent risk, entry, stop, and TP values to get real-time calculations.
5. You can also set your base currency in the script (BASE_CURRENCY), it is set to USD by defaulr.

How to Add Other Exchanges:
- Currently set up for Bybit and Binance, but can be adapted for other exchanges. Simply add a @match URL in the script header to match the exchange you want.

What Happens with Cookies:
- The calculator saves your last entered values in a cookie.
- When you navigate back to the page (trading pair), your last values will auto-populate. 
*/

(function () {
    'use strict';

    const BASE_CURRENCY = "USD";  // Declare the base currency here

    // Create the HTML bar
    let bar = document.createElement("div");
    bar.style = "background-color: #333333; color: white; padding: 10px; position: fixed; top: 0; width: 100%; z-index: 9999;";
    bar.innerHTML = `
    <div>
        <label>Balance: <input type="number" id="balance" style="width:75px; border: 1px solid #616161; background-color: white; color: black;"></label>
        <label>Percent: <input type="number" id="percent" style="width:40px; border: 1px solid #616161; background-color: white; color: black;"></label>
        <label>Entry: <input type="number" id="entry" style="width:75px; border: 1px solid #616161; background-color: white; color: black;"></label>
        <label>Stop: <input type="number" id="stop" style="width:75px; border: 1px solid #616161; background-color: white; color: black;"></label>
        <label>TP: <input type="number" id="tp" style="width:75px; border: 1px solid #616161; background-color: white; color: black;"></label>
        <label>| Position Size: <span id="psize" style="font-weight: bold;">0</span> (Market: <span id="psizeMarket" style="font-weight: bold;">0</span>) </label>
        <label>| Risk [${BASE_CURRENCY}]: <span id="risk">0</span></label>
        <label>| Reward [${BASE_CURRENCY}]: <span id="reward">0</span></label>
        <label>| R:R: <span id="rr">0</span></label>
    </div>
`;


    // Insert it into the body, at the top
    document.body.insertBefore(bar, document.body.firstChild);

    // Coinbase specific: to push down the page 
    if (window.location.href.includes("coinbase.com")) {
        document.body.style.marginTop = "80px";  // adjust this value as needed
    } else {
        document.body.style.marginTop = "50px";
    }

    // Add event listeners for real-time calculation
    
    let balanceElem = document.getElementById("balance");
    let pollingInterval = 500;  // Update every n millisecond
    let percentElem = document.getElementById("percent");
    let entryElem = document.getElementById("entry");
    let stopElem = document.getElementById("stop");
    let psizeElem = document.getElementById("psize");
    let tpElem = document.getElementById("tp"); // New TP element
    let riskElem = document.getElementById("risk"); // New Risk element
    let rewardElem = document.getElementById("reward"); // New Reward element
    let rrElem = document.getElementById("rr"); // New R:R element
    let psizeMarketElem = document.getElementById("psizeMarket"); // New element for pSizeMarket

    // New function to get the market price
    function getMarketPrice() {
        let marketPriceElem = document.querySelector('.short.bold.ob__market-price');
        return marketPriceElem ? parseFloat(marketPriceElem.textContent) : null;
    }


    function calculatePSize() {
        let balance = parseFloat(balanceElem.value);
        let percent = parseFloat(percentElem.value);
        let entry = parseFloat(entryElem.value);
        let stop = parseFloat(stopElem.value);

        if (isNaN(balance) || isNaN(percent) || isNaN(entry) || isNaN(stop)) {
            return;
        }

        let pSize = (balance * (percent / 100)) / Math.abs(stop - entry);
        psizeElem.innerText = pSize.toFixed(4);  // Updated to 4 decimals

        // Color coding for long and short positions
        if (stop < entry) {
            psizeElem.style.color = "#21b26c";  //  green for long position
        } else {
            psizeElem.style.color = "#ef454a";  //  red for short position
        }

        // Updated Risk calculation
        let risk = balance * (percent / 100);
        riskElem.innerText = risk.toFixed(2);
        riskElem.style.color = "#ffb400";  // make it yellow

        // Updated Reward and R:R calculations
        let tp = parseFloat(tpElem.value);
        if (!isNaN(tp)) {
            let reward = Math.abs(pSize * (tp - entry));
            let rr = (tp - entry) / (entry - stop);

            rewardElem.innerText = reward.toFixed(2);
            rrElem.innerText = rr.toFixed(2);

            rewardElem.style.color = "#ffb400";  // make it yellow
            rrElem.style.color = "#00deff";  // make it blue
        }

        // Position Size
        psizeElem.innerText = pSize.toFixed(4);  // Updated to 4 decimals
        //psizeElem.style.fontSize = "16px";  // make the font bigger
        psizeElem.style.backgroundColor = "#292929";  // background color

        // New code for pSizeMarket
        let marketPrice = getMarketPrice(); // Get the market price
        if (marketPrice !== null) { // Ensure market price is available
            let pSizeMarket = (balance * (percent / 100)) / Math.abs(stop - marketPrice);
            psizeMarketElem.innerText = pSizeMarket.toFixed(4);
            // Copy the color from psizeElem to psizeMarketElem
            psizeMarketElem.style.color = psizeElem.style.color;
        }
    }



    // Cookie handling functions
    function setCookie(name, value) {
        document.cookie = name + "=" + value + ";path=/";
    }

    function getCookie(name) {
        let cookieArr = document.cookie.split(";");
        for (let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split("=");
            if (name === cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    }

    // Load last calculation if available
    let currentURL = window.location.href;
    let savedCalc = JSON.parse(getCookie(currentURL) || "{}");
    if (savedCalc) {
        balanceElem.value = savedCalc.balance || "";
        percentElem.value = savedCalc.percent || "";
        entryElem.value = savedCalc.entry || "";
        stopElem.value = savedCalc.stop || "";
        tpElem.value = savedCalc.tp || "";
        calculatePSize();
    }


    // Save calculation when input changes
    function saveCalculation() {
        setCookie(currentURL, JSON.stringify({
            balance: balanceElem.value,
            percent: percentElem.value,
            entry: entryElem.value,
            stop: stopElem.value,
            tp: tpElem.value
        }));
    }


    balanceElem.addEventListener("input", function () {
        calculatePSize();
        saveCalculation();
    });

    percentElem.addEventListener("input", function () {
        calculatePSize();
        saveCalculation();
    });

    entryElem.addEventListener("input", function () {
        calculatePSize();
        saveCalculation();
    });

    stopElem.addEventListener("input", function () {
        calculatePSize();
        saveCalculation();
    });

    tpElem.addEventListener("input", function () {
        calculatePSize();
        saveCalculation();
    });

    // ... (Your previous code stays the same up to here)

    // New MutationObserver to observe the market price
    var marketPriceObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === "characterData") {
                calculatePSize();  // Update pSizeMarket when the market price changes
            }
        });
    });

    // Add the MutationObserver here
    var targetNode = document.body;
    var config = { attributes: true, childList: true, subtree: true };

    var callback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                let newURL = window.location.href;
                if (currentURL !== newURL) {
                    currentURL = newURL;

                    let savedCalc = JSON.parse(getCookie(currentURL) || "{}");
                    if (savedCalc) {
                        balanceElem.value = savedCalc.balance || "";
                        percentElem.value = savedCalc.percent || "";
                        entryElem.value = savedCalc.entry || "";
                        stopElem.value = savedCalc.stop || "";
                        tpElem.value = savedCalc.tp || "";
                        
                        // Call calculatePSize here to update pSizeMarket on page load
                        calculatePSize();

                        // Start observing the market price element
                        let marketPriceElem = document.querySelector('.ob__market-price');
                        if (marketPriceElem) {
                            marketPriceObserver.observe(marketPriceElem, { childList: true, subtree: true, characterData: true });
                        }
                    }
                }
            }
        }
    };

    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    setInterval(calculatePSize, pollingInterval);

    })();


