const { dbProd, dbDev, dbTest } = require("../../admin");

const estudante = async () => {
  try {
    const ref = await dbProd.collection("Estudante").get();
    const dev = dbDev.collection("Estudante");
    const test = dbTest.collection("Estudante");
    
    let data = [];

    ref.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
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

module.exports = estudante;