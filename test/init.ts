import dotenv from "dotenv";

export function initConfig(): void {
    dotenv.config({ path: "./.env.development" });
}
