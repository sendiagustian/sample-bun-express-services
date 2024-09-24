import { web } from "./app/configs/web";

const base = process.env.BASE_URL || "http://127.0.0.1";
const port = process.env.PORT || 3000;

// Start the server
web.listen(port, async () => {
    console.log(`Server is running on ${base}:${port}/api/docs`);
});
