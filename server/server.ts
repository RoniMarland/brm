import express from 'express';
// import cors from 'cors';
import { connectToDatabase } from './conn.ts';

const app = express();
// app.use(cors());

const PORT = process.env.PORT || 5000;

// Função auxiliar para buscar dados de uma coleção específica
async function fetchCollectionData(collectionName: string, res: express.Response) {
    try {
        const db = await connectToDatabase('mainData');
        console.log(`Conexão com MongoDB estabelecida: ${db.databaseName}`, collectionName);

        const data = await db.collection(collectionName).find({}).toArray();
        res.json(data); // Retorna todos os documentos da coleção especificada
    } catch (e) {
        res.status(500).json({ error: `Erro ao buscar dados de ${collectionName}`, details: e });
    };
};

// Endpoints para acessar diferentes coleções
app.get('/api-clubs', (req, res) => fetchCollectionData('clubs', res));
app.get('/api-firstNames', (req, res) => fetchCollectionData('maleNames', res));
app.get('/api-lastNames', (req, res) => fetchCollectionData('lastNames', res));

app.listen(PORT, () => console.log(`Server API running on port ${PORT}`));
