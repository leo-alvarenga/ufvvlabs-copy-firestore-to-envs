const { dbProd, dbDev, dbTest } = require("../../admin");

tuplaAcaoObjeto = async () => {
  const recursoRef = dbProd.collection("TuplaAcaoObjeto");
  const dev = dbDev.collection("TuplaAcaoObjeto");
  const test = dbTest.collection("TuplaAcaoObjeto");

  try {
    const recursos = await recursoRef.get();

    let data = [];

    recursos.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    data.forEach((tupla) => {
      const { id, ...tup } = tupla

      dev.doc(id).set({ ...tup });
      test.doc(id).set({ ...tup });
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = tuplaAcaoObjeto;