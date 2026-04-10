# 🐶 Dog Explorer App

A small frontend app built with **HTML**, **CSS**, and **async JavaScript** using the Dog API.

## 📌 Assignment Goals
This project demonstrates:
- `fetch()`
- `async/await`
- `try/catch` error handling
- loading states
- DOM manipulation
- working with multiple API endpoints

## ✨ Features
- View a list of dog breeds
- Click a breed to see detailed information
- Get a random dog fact
- View dog groups and related breed IDs
- Display friendly loading and error messages

## 🛠️ Technologies Used
- `HTML5`
- `CSS3`
- `JavaScript (ES6+)`
- [Dog API](https://dogapi.dog/api/v2)

## 📂 File Structure
```bash
Dog Explorer/
├── index.html
├── style.css
├── index.js
└── README.md
```

## ▶️ How to Run
1. Open the project folder.
2. Start a local server:

```bash
cd /home/donasher_47/APIs
python3 -m http.server 8000
```

3. Open in your browser:

```text
http://127.0.0.1:8000/index.html
```

## 🔗 GitHub Repository
[View the repository](https://github.com/theblackkingshow/Dog-APIs.git)

## ✅ Requirements Covered
- Uses `fetch()`
- Uses `async/await`
- Includes multiple async functions:
  - `fetchBreeds()`
  - `fetchBreedById(id)`
  - `fetchDogFact()`
  - `fetchGroups()`
- Uses `try/catch` for each API flow
- Dynamically updates the DOM
- Avoids hardcoded API data

## 👩‍💻 Author
Submitted as an async JavaScript assignment project.
