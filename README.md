# Renart Fullstack Internship Case Study

![Renart Global](https://media.licdn.com/dms/image/v2/D4D3DAQEZKndThXDMPA/image-scale_191_1128/B4DZcSCFYZGcAg-/0/1748354228457/renartglobal_cover?e=1752512400&v=beta&t=IwhRJQM1OqZcg-NyxgUguQNnHWtkQ3pJZj5vYtc1Zn4)
## 🛠 Tech Stack
**Frontend:** React.js, Next.js, SCSS, TailwindCSS

**Carousel:** react-slick

**Icons:** lucide

**API:** Gold-API for live gold pricing

## 💡 What This App Does
This application fetches the current gold price per ounce from Gold-API, converts it into a price per gram (USD), and calculates the individual product prices using a basic multiplier formula. It also computes a star rating for each product based on its popularityScore, and displays the products in an infinite carousel UI.

## ✨ Features
🌀 **Infinite Carousel** using react-slick

🔍 **Filtering** by price range and popularity score

⭐ **Dynamic Star Ratings** calculated from popularityScore

💰 **Real-Time Price Calculation** from live gold value

🎨 **Color Picker** integrated for product color selection

## 🚀 Getting Started
To run the project locally:

```bash
npm install
npm run dev
```

Then open your browser at http://localhost:3000.

## 🧪 Testing
This project includes unit tests for some functions such as:

- Gold Price Conversion (ounce ➝ gram)
- Final Product Price Calculation  


To run the tests:

```bash
npm test
```

You'll find the test files under the `__tests__` directory.

## 🧠 Developer Notes
I genuinely enjoyed building this use case. Initially, I considered creating a full e-commerce interface using the provided products.json, but decided to stay within the project scope and focus on showcasing core logic and frontend features.

Some of the challenges I faced:

**Filtering Logic:** Filtering by both price and popularity simultaneously was a little hard at first. But eventually i worked it out.

**Infinite Carousel Scroll Issues:** The infinite scroll on react-slick created some problems, especially with the scrollbar visually overflowing the div. I resolved this with a workaround that resets the scroll after a defined interval. It's not perfect, but it keeps the UI clean.

