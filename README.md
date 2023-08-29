# Trading Position Size Calculator
It's a simple tool for trading. It calculates the optimal position size based on your risk, entry, and stop levels. Do your own research; no financial advice, blablabla.

## What it Does
- Adds a handy position size calculator bar to the websites of Bybit and Binance trading platforms.
- **Input**: Trading Account Size, Risk %, Entry, Stop-Loss, Take Profit.
- **Output**: Real-time calculations for **Position Size**, Risk, Reward, and Risk:Reward ratio.
- Colors change based on the type of position (long or short).
- It also calculates the Position Size at the Current Market Price; you can find it in brackets.

## How to Set Up
1. Install the Tampermonkey userscript manager Chrome extension in your browser [here](https://www.tampermonkey.net/).
2. Open [this script URL](https://github.com/0xpeti/position-size-calculator/raw/main/position-size-calculator.user.js). Tampermonkey will recognize it as a script and prompt you to install.
3. Navigate to your desired exchange, and the calculator should appear at the top of the page.
4. Enter your balance, percent risk, entry, stop, and TP values to get real-time calculations.
5. You can also set your base currency in the script (`BASE_CURRENCY`); it's set to USD by default.

## How to Use It
- Open a trading pair on your exchange.
- You will see the calculator bar at the top.
- Enter your trading account size and the percentage you are willing to risk (probably the most important decision in trading).
- Enter your planned entry and stop-loss, as well as your Take Profit level (this one is optional).
- You will see the following data automatically calculated:
  - **Position Size**: This is what the calculator is for—managing your risk! If you use this size for your entry and stop-loss, you'll lose exactly the amount you specified as an acceptable risk.
  - **Position Size at Market**: In brackets, if you opened a position at the current market price. Use with caution! Only works on Bybit and Binance.
  - **Risk and Reward**: In your base currency, set to USD by default.
  - **R:R (Risk to Reward ratio)**.

## Can I Add Other Exchanges?
- Currently, it's mostly tested with Bybit and Binance, but it works with basically any website. It sits on top and calculates based on input. The current market price feature is exchange-specific. Simply add a `@match` URL in the script header or even better, in the Tampermonkey settings, so it doesn't get overwritten with every update.

## What Happens with Cookies
- The calculator saves your last entered values in a cookie for each trading pair (URL).
- When you navigate back to the page (trading pair), your last values will auto-populate.

## Updates?
Fuck yeah.

If you want to get updates, set updates to automatic for this script in Tampermonkey settings. Otherwise you can manually check and update. Simply copypasting the new version works just fine. Just pay attention to the version number.
