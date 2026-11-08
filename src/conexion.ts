import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

// Desactivar restricciones estancas de certificados SSL para evitar el bloqueo TLS
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME || 'food_store';

if (!uri) {
  throw new Error(' Error: No se encontró la variable MONGO_URI en el archivo .env');
}

// Instanciamos el cliente forzando opciones de TLS compatibles en el driver de MongoDB
const client = new MongoClient(uri, {
  tls: true,
  tlsAllowInvalidCertificates: true,
  tlsAllowInvalidHostnames: true
});

let dbConnection: any = null;

export async function conectarDB() {
  if (dbConnection) {
    return dbConnection;
  }

  try {
    await client.connect();
    console.log(' ¡Conexión exitosa a MongoDB Atlas!');
    dbConnection = client.db(dbName);
    return dbConnection;
  } catch (error) {
    console.error(' Error al intentar conectar con MongoDB Atlas:', error);
    throw error;
  }
}

export async function cerrarConexion() {
  await client.close();
  console.log(' Conexión cerrada correctamente.');
}