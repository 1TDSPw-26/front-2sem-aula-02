import express, { Request, Response } from 'express';

const app = express();

const PORT = 3000;

const DB_URL = "http://localhost:3001/alunos";

interface Aluno {
    id: string;
    nome: string;
    nota1: number;
    nota2: number;
}

app.use(express.json());

app.use(express.static('public'));

app.get("/api/alunos", async (req: Request, res: Response) => {

    try {
        const response = await fetch(DB_URL);

        if (!response.ok) {
            throw new Error("Não foi possível consultar os alunos!");
        }

        const alunos = (await response.json()) as Aluno[];

        res.json(alunos);

    } catch (error) {
        console.error(error);

        res.status(500).json({ error: "Erro ao consultar os alunos!" });
    }    
});





//Craindo um listen na porta disponibilizada:3000
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);

});