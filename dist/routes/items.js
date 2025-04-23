"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const dbPath = path_1.default.join(__dirname, '../data/database.json');
// Fungsi untuk menulis ulang data ke file JSON
const writeDatabase = (data) => {
    fs_1.default.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
};
// GET semua buku
router.get('/', (req, res) => {
    const data = JSON.parse(fs_1.default.readFileSync(dbPath, 'utf-8'));
    res.json({ data });
});
// GET buku berdasarkan id
router.get('/:id', (req, res) => {
    const data = JSON.parse(fs_1.default.readFileSync(dbPath, 'utf-8'));
    const book = data.find((b) => b.id === parseInt(req.params.id));
    if (book) {
        res.json({ data: book });
    }
    else {
        res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
});
// POST buku baru
router.post('/', (req, res) => {
    const data = JSON.parse(fs_1.default.readFileSync(dbPath, 'utf-8'));
    const newBook = Object.assign({ id: Date.now() }, req.body);
    data.push(newBook);
    writeDatabase(data);
    res.status(201).json({ message: 'Buku berhasil ditambahkan', data: newBook });
});
// PUT - Update buku berdasarkan id
router.put('/:id', (req, res) => {
    const data = JSON.parse(fs_1.default.readFileSync(dbPath, 'utf-8'));
    const { id } = req.params;
    const updatedBook = req.body;
    const bookIndex = data.findIndex((b) => b.id === parseInt(id));
    if (bookIndex === -1)
        return res.status(404).json({ message: 'Buku tidak ditemukan' });
    data[bookIndex] = Object.assign(Object.assign({}, data[bookIndex]), updatedBook);
    writeDatabase(data);
    res.json({ message: 'Buku berhasil diperbarui', data: data[bookIndex] });
});
// DELETE - Hapus buku berdasarkan id
router.delete('/:id', (req, res) => {
    const data = JSON.parse(fs_1.default.readFileSync(dbPath, 'utf-8'));
    const { id } = req.params;
    const bookIndex = data.findIndex((b) => b.id === parseInt(id));
    if (bookIndex === -1)
        return res.status(404).json({ message: 'Buku tidak ditemukan' });
    const deletedBook = data.splice(bookIndex, 1)[0];
    writeDatabase(data);
    res.json({ message: 'Buku berhasil dihapus', data: deletedBook });
});
exports.default = router;
