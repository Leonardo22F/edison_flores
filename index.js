import express from "express";
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hola Edison desde Node.js con Docker y CI!" });
});

app.get("/sum", (req, res) => {
  const a = parseFloat(req.query.a) || 0;
  const b = parseFloat(req.query.b) || 0;
  res.json({ result: a + b });
});

// Solo inicia servidor si no está en entorno de test
if (process.env.NODE_ENV !== "test") {
  const server = app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
  });

  // Esto evita que Windows cierre el proceso apenas inicia
  process.stdin.resume();

  // Cierra correctamente con Ctrl+C
  process.on("SIGINT", () => {
    console.log("\nServidor detenido manualmente.");
    server.close(() => process.exit(0));
  });
}

export default app;
