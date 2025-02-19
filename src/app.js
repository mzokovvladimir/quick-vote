const express = require('express');
const voteRoutes = require('./routes/voteRoutes');

const app = express();
app.use(express.json()); // для обробки JSON у запитах
app.use('/api/votes', voteRoutes); // підключаємо маршрути голосування

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
