# What it does
- Adds a handy position size calculator bar to the website of Bybit and Binance trading platforms.
- Input: Trading Account Size, Risk %, Entry, Stop-Loss, Take Profit.
- Output: real-time calculations for Position Size, Position Size at current Market Price, Risk, Reward, and Risk:Reward ratio.
- Colors change based on the type of position (long or short).

# How to Set Up
1. Install Tampermonkey or a similar userscript manager in your browser.
2. Add this script to Tampermonkey and save.
3. Navigate to the desired exchange, and the calculator should appear at the top of the page.
4. Enter your balance, percent risk, entry, stop, and TP values to get real-time calculations.
5. You can also set your base currency in the script (BASE_CURRENCY), it is set to USD by defaulr.

# How to Add Other Exchanges
- Currently set up for Bybit and Binance, but can be adapted for other exchanges. Simply add a @match URL in the script header to match the exchange you want.

# What Happens with Cookies:
- The calculator saves your last entered values in a cookie.
- When you navigate back to the page (trading pair), your last values will auto-populate. 
