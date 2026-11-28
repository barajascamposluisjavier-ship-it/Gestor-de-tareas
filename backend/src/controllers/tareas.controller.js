const tareasService = require("../services/tareas.service");

async function getTareas(req, res) {
  try {
    const resultados = await tareasService.obtenerTareas();
    res.status(200).json({
      success: true,
      tareas: resultados,
    });
  } catch (error) {
    console.error("Error al buscar las tareas", error);
    res.status(500).json({
      success: false,
      mensaje: "No se pudieron obtener las tareas",
    });
  }
}

async function getTareaPorId(req, res) {
  try {
    const { id } = req.params;
    const tarea = await tareasService.obtenerTareaPorId(id);

    if (!tarea) {
      return res.status(404).json({
        success: false,
        mensaje: "Tarea no encontrada",
      });
    }

    res.json({
      success: true,
      tarea: tarea,
    });
  } catch (error) {
    console.error("Error al intentar encontrar la tarea", error);
    res.status(500).json({
      success: false,
      mensaje: "No se pudo encontrar la tarea",
    });
  }
}

async function postTarea(req, res) {
  try {
    const { user_id, title, description, category, limit_date } = req.body;
    

    if (!user_id || !title) {
      return res.status(400).json({
        success: false,
        mensaje: "Faltan datos obligatorios user_id y title",
      });
    }

    const tarea = await tareasService.crearTarea(req.body);
    res.status(201).json({
      success: true,
      mensaje: 'Se guardo la tarea correctamente',
      tarea: tarea
    });

  } catch (error) {
    console.error('Error al crear la tarea', error);
    res.status(500).json({
      success: false,
      mensaje: 'No se pudo crear la tarea'
    });
  }
}

module.exports = { getTareas, getTareaPorId, postTarea };
