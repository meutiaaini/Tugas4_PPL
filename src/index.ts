import express from 'express';
import itemsRouter from './routes/items';

const app = express();
const PORT = 3000;

app.use(express.json());

// Pakai router
app.use('/books', itemsRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/books`);
});