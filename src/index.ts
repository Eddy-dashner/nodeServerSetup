import cluster from "cluster";
import os from "os";
import cors from "cors";
import dotenv from "dotenv";
import express  from "express";

dotenv.config();
const app = express();
const numCPU = os.cpus().length;
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

let server: any;

export async function startServer() {
	try {
		server = app.listen(PORT, () => {
			console.log(`App listening on http://localhost:${PORT}`);
		});
		return server;
	} catch (error: any) {
		console.error("Error starting the server:", error.message);
		throw error;
	}
}

if (cluster.isPrimary && process.env.NODE_ENV === "production") {
	const workers: any = [];

	for (let i = 0; i < numCPU; i += 1) {
		const worker = cluster.fork();
		workers.push(worker);

		worker.on("exit", (code, signal) => {
			console.log(
				`Worker ${worker.process.pid} exited with code ${code} and signal ${signal}`,
			);
			const index = workers.indexOf(worker);
			if (index !== -1) {
				workers.splice(index, 1);
			}

			if (workers.length === 0) {
				process.exit(0);
			}
		});
	}
} else {
	startServer();
}

export default app;