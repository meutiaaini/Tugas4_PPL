import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const dbPath = path.join(__dirname, '../data/database.json');

// Fungsi untuk menulis ulang data ke file JSON
const writeDatabase = (data: any) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
};

// GET semua buku
router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  res.json({ data });
});

// GET buku berdasarkan id
router.get('/:id', (req: Request<{ id: string }>, res: Response) => {
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    const book = data.find((b: any) => b.id === parseInt(req.params.id));
    if (book) {
      res.json({ data: book });
    } else {
      res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
  });
  

// POST buku baru
router.post('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  const newBook = { id: Date.now(), ...req.body };
  data.push(newBook);
  writeDatabase(data);
  res.status(201).json({ message: 'Buku berhasil ditambahkan', data: newBook });
});

// PUT update buku berdasarkan id
router.put('/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  const bookIndex = data.findIndex((b: any) => b.id === parseInt(req.params.id));
  
  if (bookIndex !== -1) {
    data[bookIndex] = { ...data[bookIndex], ...req.body };
    writeDatabase(data);
    res.json({ message: 'Buku berhasil diupdate', data: data[bookIndex] });
  } else {
    res.status(404).json({ message: 'Buku tidak ditemukan' });
  }
});

// DELETE buku berdasarkan id
router.delete('/:id', (req, res) => {
  let data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  const newData = data.filter((b: any) => b.id !== parseInt(req.params.id));
  
  if (newData.length !== data.length) {
    writeDatabase(newData);
    res.json({ message: 'Buku berhasil dihapus' });
  } else {
    res.status(404).json({ message: 'Buku tidak ditemukan' });
  }
});
  
export default router;
