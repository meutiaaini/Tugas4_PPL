"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const items_1 = __importDefault(require("./routes/items"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
// Tambahkan root route
app.get('/', (req, res) => {
    res.send('API Buku berjalan! Silakan akses /books');
});
// Pakai router
app.use('/books', items_1.default);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
