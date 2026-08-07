import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;
const DB_URL = "http://localhost:3000/api/alunos";

// Permitir que o express receba o tipo json
app.use(express.json());

// Disponibilizando arquivos na pasta public
app.use(express.static("public"));

// Rota para consultar os alunos
app.get("/api/alunos", async (_req: Request, res: Response) => {
    try {
        const response = await fetch(DB_URL);
    } catch (error) {

    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});