const express = require('express');
const path = require('path'); // Для роботи з шляхами файлів
const app = express();
const port = 3000;

// Налаштування статики (якщо використовуватиметься папка public для статичних файлів)
app.use(express.static(path.join(__dirname, 'public')));

// Для обробки тіла POST запитів
app.use(express.json());

let votes = {}; // Об'єкт для зберігання варіантів голосування
let currentId = 1; // ID для кожного нового варіанта

// Обробник головної сторінки (роздає index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Шлях до файлу index.html
});

// Додавання нового варіанта
app.post('/api/add-option', (req, res) => {
    const {text} = req.body;
    if (!text) return res.status(400).json({message: 'Текст не може бути порожнім'});

    const id = currentId++;
    votes[id] = {text, votes: 0};

    res.json({message: `Варіант '${text}' додано з ID ${id}`});
});

// Отримання результатів голосування
app.get('/api/results', (req, res) => {
    res.json(votes);
});

// Голосування
app.post('/api/vote', (req, res) => {
    const {voteId} = req.body;

    if (!(voteId in votes)) {
        return res.status(400).json({message: 'Такого варіанту немає'});
    }

    votes[voteId].votes += 1;
    res.json({message: `Голос зарахований за варіант ${votes[voteId].text}`});
});

app.listen(port, () => {
    console.log(`Сервер запущено на http://localhost:${port}`);
});
