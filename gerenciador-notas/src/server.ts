import express, { type Request, type Response } from "express";

const app = express();

const PORT = 3000;

const DB_URL = "http://localhost:3001/alunos";

interface Aluno{
    id: string;
    nome: string;
    nota1: number;
    nota2: number;
}

app.use(express.json())

app.use(express.static("public"))

app.get("/api/alunos", async (_req:Request,res:Response) => {
    try {
        const response = await fetch(DB_URL);

        if(!response.ok){
            throw new Error("Não foi possível consultar os alunos");
        }

        const alunos = (await response.json()) as Aluno[];

    } catch (error) {
        console.log(error);

        res.status(500).json({error:"Não foi possível consultar os alunos"});
    }
});

app.listen(PORT, () => {
    console.log("Server is up and running on http://localhost:${PORT}")
})