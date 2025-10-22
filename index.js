import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hola Edison desde Node.js con Docker y CI!" });
});

app.get("/sum", (req, res) => {
  const a = parseFloat(req.query.a) || 0;
  const b = parseFloat(req.query.b) || 0;
  const sum = a + b;
  res.json({ result: sum });
});

// solo iniciar el servidor si el archivo se ejecuta directamente
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () =>
    console.log(`Servidor corriendo en el puerto: ${port}`)
  );
}

export default app;
