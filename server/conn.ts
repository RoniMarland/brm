import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config({ path: 'server/.env' });

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error("A URI do MongoDB não está definida no arquivo .env");
}

// Cria um cliente do MongoDB
const client = new MongoClient(uri);


export async function connectToDatabase(databaseName: string): Promise<Db> {
    // Sempre chama client.connect(), pois ele reutiliza a conexão se já estiver conectada
    await client.connect();
    return client.db(databaseName);
}
