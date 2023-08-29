# Trading Position Calculator
It is a simple tool for trading. It calculates the optimal position size based on your risk, entry and stop levels. Do your own research, no financial advise, blablabla.

## What it does
- Adds a handy position size calculator bar to the website of Bybit and Binance trading platforms.
- Input: Trading Account Size, Risk %, Entry, Stop-Loss, Take Profit.
- Output: real-time calculations for **Position Size**, Risk, Reward, and Risk:Reward ratio.
- Colors change based on the type of position (long or short).
- It's also able to calculate the Position Size at Current Market Price, you can find it in brackets.

## How to Set Up
1. Install the Tampermonkey userscript manager Chrome extension in your browser https://www.tampermonkey.net/
2. Open this page, Tampermonkey will recognize it as a script and will ask you if you want to install it.
https://github.com/0xpeti/position-size-calculator/raw/main/position-size-calculator.user.js
3. Navigate to the desired exchange, and the calculator should appear at the top of the page.
4. Enter your balance, percent risk, entry, stop, and TP values to get real-time calculations.
5. You can also set your base currency in the script (BASE_CURRENCY), it is set to USD by defaulr.

## How to use it
- Open a trading pair on your exchange.
- You will see the calculator bar on the top.
- Enter your trading account size and the percentage you are willing to risk (probably the most important decision when trading).
- Enter your planned entry and stop-loss as well as your Take Profit level (this one is optional)
- You will see the following data automatically calculated:
  - Position Size: This is what the calculator is for, managing your risk! If you use this size for your entry and stop loss, you will lose exactly the amount you specified as acceptable risk when you get stopped out.
  - In brackets, you will see Position Size if you Market opened a position at the current market price. Use with caution!. It only works for Bybit and Binance.
  - Your Risk when your SL, and your Reward when your TP hit. These values are in your base currency, set to USD by default.
  - And the R:R (Risk to Reward ratio).

## Can I Add Other Exchanges
- Currently it is set up for Bybit and Binance, but can be adapted for other exchanges. Simply add a @match URL in the script header to match the exchange you want, or even better in Tampermonkey settings, so that it doesn't get overwritten with every update. 

## What Happens with Cookies:
- The calculator saves your last entered values in a cookie for each trading pair (URL).
- When you navigate back to the page (trading pair), your last values will auto-populate. 

## Updates?
Fuck yeah.
