import express, { Request, Response } from "express";

const app = express();

const PORT = 3000;

const DB_URL =  "http://localhost:3001/alunos";

interface Aluno {
    id: string;
    nome: string;
    nota1: number;
    nota2: number;
}

//permitir que o express receba o tipo .json
app.use(express.json());

//disponibizar aquivo para a pasta public
app.use(express.static("public"));

//Rota para consultar os alunos
app.get("/api/alunos", async (_req: Request, res: Response) => {
    try {
        const response = await fetch(DB_URL);
        if (!response.ok) {

            throw new Error("Não foi possível consultar os alunos.");
        }

        const alunos: Aluno[] = (await response.json()) as Aluno[];

        res.json(alunos);

        
    } catch (erro) {
        console.error(erro);

        res.status(500).json({ error: "Erro ao consultar os alunos." });
        
    }
});


//Criando um listen na porta disponibilizada:3000
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

