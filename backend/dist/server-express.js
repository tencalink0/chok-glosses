import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const PORT = 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get('/api/hello', (_req, res) => {
    res.send('Test');
});
app.use(express.static(path.join(__dirname, 'public')));
app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
