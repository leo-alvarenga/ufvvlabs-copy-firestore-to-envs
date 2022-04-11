const { dbProd, dbDev, dbTest } = require("../../admin");

tipoRecurso = async (request, response) => {
  const tiposRecursosRef = dbProd.collection("TipoRecursoPedagogico");
  const dev = dbDev.collection("TipoRecursoPedagogico");
  const test = dbProd.collection("TipoRecursoPedagogico");

  try {
    var allTipostRecursos = await tiposRecursosRef.get();

    let data = [];

    allTipostRecursos.forEach((doc) => {
      data.push({
        id: doc.id,
        tipos: doc.data().tipos.sort(),
      });
    });

    data.forEach((doc) => {
      const { id, ...d } = doc;

      dev.doc(id).set({ ...d });
      test.doc(id).set({ ...d });
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = tipoRecurso;