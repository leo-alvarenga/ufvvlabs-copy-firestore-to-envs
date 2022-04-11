const { dbProd, dbDev, dbTest } = require("../../admin");

recursoPegagogico = async () => {
  const recursoRef = dbProd.collection("RecursoPedagogico");
  const dev = dbDev.collection("RecursoPedagogico");
  const test = dbTest.collection("RecursoPedagogico");

  try {
    const recursos = await recursoRef.get();

    let data = [];

    recursos.forEach((doc) => {
      data.push({
        id: doc.id,
        areaConhecimento: doc.data().areaConhecimento,
        descricao: doc.data().descricao,
        link: doc.data().link,
        pratica: doc.data().pratca,
        tipoRecurso: doc.data().tipoRecurso,
        titulo: doc.data().titulo,
      });
    });

    data.forEach((recurso) => {
      const { id, ...rec } = recurso;

      if (!rec.pratica)
        rec.pratica = "";

      dev.doc(id).set({ ...rec });
      test.doc(id).set({ ...rec });
    });

    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

module.exports = recursoPegagogico;