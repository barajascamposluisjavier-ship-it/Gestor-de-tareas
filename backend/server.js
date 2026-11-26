const express = require("express");
const app = express();
const { pool } = require("./src/config/db");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola el servidor funciona");
});

app.get("/db-test", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT NOW() as now");
    res.json({
      success: true,
      fecha: resultado.rows[0].now,
    });
  } catch (error) {
    console.error("Error al conectar con postgreSQL", error);

    res.status(500).json({
      success: false,
      mensaje: "No se pudo obtener los datos pedidos",
    });
  }
});

app.post("/tareas", async (req, res) => {
  const { user_id, title, description, category, limit_date } = req.body;

  if (!user_id || !title) {
    return res.status(400).json({
      success: false,
      mensaje: "Faltan datos obligatorios user_id y title",
    });
  }

  try {
    const resultado = await pool.query(
      "INSERT INTO tareas(user_id,title, description, category, limit_date) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [user_id, title, description, category, limit_date],
    );

    res.status(201).json({
      success: true,
      mensaje: "Se guardo la tarea correctamente",
      tarea: resultado.rows[0],
    });
  } catch (error) {
    console.error("Error al crear la tarea", error);
    res.status(500).json({
      success: false,
      mensaje: "no se pudo crear la tarea",
    });
  }
});

app.get("/tareas", async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM tareas ORDER BY created_at DESC",
    );
    res.status(200).json({
      success: true,
      tareas: resultado.rows,
    });
  } catch (error) {
    console.error("Error al buscar las tareas", error);
    res.status(500).json({
      success: false,
      mensaje: "No se pudieron obtener las tareas",
    });
  }
});

app.put("/tareas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, limit_date, completed } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        mensaje: "Falta el dato obiligtorio de title",
      });
    }
    const resultados = await pool.query(
      "UPDATE tareas SET title = $1, description = $2, category = $3, limit_date = $4, completed = $5 WHERE id = $6 RETURNING *",
      [title, description, category, limit_date, completed, id],
    );

    if (resultados.rows.length === 0) {
      return res.status(404).json({
        success: false,
        mensaje: "Tarea no encontrada",
      });
    }

    res.json({
      success: true,
      tarea: resultados.rows[0],
    });
  } catch (error) {
    console.error("Error al intentar modificar la tarea", error);
    res.status(500).json({
      success: false,
      mensaje: "No se pudo modificar la tarea ",
    });
  }
});

app.delete("/tareas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query(
      "DELETE FROM tareas WHERE id = $1 RETURNING *",
      [id],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        success: false,
        mensaje: "Tarea no encontrada",
      });
    }

    res.json({
      success: true,
      mensaje: "Tarea eliminada correctamente",
    });
  } catch (error) {
    console.error("Error al intentar eliminar la tarea", error);
    res.status(500).json({
      success: false,
      mensaje: "No se pudo eliminar la tarea",
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
