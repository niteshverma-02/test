# Sanjh

A clickable mobile app prototype that combines hotel booking with dating, so you can find a stay, meet people going to the same place on the same dates, and plan the trip together.

It is plain HTML, CSS and JavaScript. There is no build step and no backend.

## Run it

Open `app.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
# then open http://localhost:8080/app.html
```

- **Desktop:** shows a feature list, the app inside a phone frame, and notes for each screen. Use the ← → keys to move between screens.
- **Phone (under 600px wide):** the app runs full-screen.

`index.html` is an earlier four-screen showcase. The full prototype is `app.html`.

## What's inside

46 screens across onboarding, hotel search and booking, trips, dating (swipe, match, chat, plan a trip together), local helpers (pay to unlock), premium, safety and settings.

| File | Contents |
|------|----------|
| `app.html` | Page shell |
| `app.css` | Styles, light and dark themes |
| `data.js` | Icons, sample hotels, people and helpers |
| `app.js` | Screens, navigation and interactions |

All data is sample data, and payments, OTP and calls are simulated. The login screen is a client-side demo gate, not real security.

Photos are from [Unsplash](https://unsplash.com) and are used under the Unsplash License.
