import express,{Request, Response} from 'express';

const app = express();

const PORT = 3000;

const DB_URL = 'http://localhost:3001/alunos';

interface Aluno {
  id: string;
  nome: string;
  nota1: number;
  nota2: number;
}

//permitir que o express receba o tipo json
app.use(express.json());

//disponibilizando arquivos da pasta public
app.use(express.static("public"));

//rota para listar todos os alunos
app.get('/api/alunos', async (req:Request, res:Response) => {
    try {
        const response = await fetch(DB_URL);
        
        if (!response.ok) {
            throw new Error('Erro ao buscar os alunos');
        }

        const alunos: Aluno[] = (await response.json()) as Aluno[];
        
        res.json(alunos);
    } catch (error) {    
        console.error(error);

        res.status(500).json({ error: 'Erro ao buscar os alunos!' });
    
    }
});

//criando um listen na porta disponiblizando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:3001/alunos ${PORT}`);

});
