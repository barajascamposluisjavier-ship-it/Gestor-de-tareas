const tareasService = require('../services/tareas.service');

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

module.exports = { getTareas };
