const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 8080;

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- CONFIGURAÇÃO PARA SERVIR O FRONTEND ---
// Garanta que a pasta 'frontend' esteja no mesmo nível ou um nível acima conforme seu código
app.use(express.static(path.join(__dirname, 'public'))); // Mude para 'frontend' se a pasta tiver esse nome

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- CONEXÃO COM O BANCO ---
const dbPath = path.resolve(__dirname, 'hospital.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error("Erro ao abrir banco:", err.message);
    else console.log("Banco SQLite Clinica Ranika conectado!");
});

// Criar tabela
db.run(`CREATE TABLE IF NOT EXISTS sinais_vitais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    paciente_id TEXT,
    media_bpm REAL,
    media_temp REAL,
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// --- ROTA POST (Para o Node-RED enviar dados) ---
app.post('/api/sinais', (req, res) => {
    // Ajustado para aceitar tanto 'leito' quanto 'paciente_id'
    const { leito, paciente_id, bpm, media_bpm, temp, media_temp } = req.body;
    
    const p_id = leito || paciente_id || "Não identificado";
    const p_bpm = bpm || media_bpm || 0;
    const p_temp = temp || media_temp || 0;

    const sql = `INSERT INTO sinais_vitais (paciente_id, media_bpm, media_temp) VALUES (?, ?, ?)`;
    
    db.run(sql, [p_id, p_bpm, p_temp], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Leitura registrada!", id: this.lastID });
    });
});

// --- ROTA GET (Para o Frontend ler os dados) ---
app.get('/api/sinais', (req, res) => {
    db.all("SELECT * FROM sinais_vitais ORDER BY data_registro DESC LIMIT 20", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`API da Clínica Ranika rodando na porta ${PORT}`);
});