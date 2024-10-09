import { type Connection, createPool, type ResultSetHeader } from "mysql2/promise";

async function connectToDatabase(): Promise<Connection> {
    const connection = createPool({
        connectionLimit: 5,
        host: process.env.DB_HOST!,
        port: parseInt(process.env.DB_PORT!),
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME!
        // timezone: "Asia/Jakarta"
    });
    return connection;
}

// FOR SELECT QUERY DATABASE
export async function getQuery(arg: { query: string; type: "list" | "object"; params?: any[] }): Promise<any> {
    let connection;
    const valueParams = arg.params?.filter((item) => item !== undefined);

    try {
        connection = await connectToDatabase();
        const [rows, _field] = await connection.query(arg.query, valueParams);
        const response = rows as any;
        if (arg.type === "list") {
            return response;
        } else {
            return response[0];
        }
    } catch (error) {
        console.error("Gagal menjalankan get query:", error);
        throw new Error(`${error}`.replace(process.env.DB_NAME || "database", "database"));
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// FOR INSERT, UPDATE, DELETE QUERY DATABASE
export async function exeQuery(arg: { query: string; params?: any[] }): Promise<ResultSetHeader> {
    let connection;
    const valueParams = arg.params?.filter((item) => item !== undefined);

    try {
        connection = await connectToDatabase();
        const [rows, _field] = await connection.query(arg.query, valueParams);
        return rows as ResultSetHeader;
    } catch (error) {
        console.error("Gagal menjalankan exequery:", error);
        throw new Error(`${error}`.replace(process.env.DB_NAME || "database", "database"));
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
