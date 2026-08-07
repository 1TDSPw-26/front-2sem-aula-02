import express,{Request, Response} from 'express';

const app = express();

const PORT = 3000;
const DB_URL = "http://localhost:3001/alunos";

interface Aluno {
    id: number;
    nome: string;
    idade: number;
    curso: string;
}

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.use(express.static('public'));

app.get("/api/alunos", async (req: Request, res: Response) => {
    try {
        const response = await fetch(DB_URL);
        if (!response.ok) {
            throw new Error(`Erro ao buscar alunos: ${response.statusText}`);
        }
        const alunos = (await response.json()) as Aluno[];
        res.json(alunos);
    }
    catch (error) {
        console.error("Erro ao buscar alunos:", error);
        res.status(500).json({ error: "Erro ao buscar alunos" });
    }
});