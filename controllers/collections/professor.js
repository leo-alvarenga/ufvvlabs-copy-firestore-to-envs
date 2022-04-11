const { dbProd, dbDev, dbTest } = require("../../admin");

const professor = async () => {
  try {
    const ref = await dbProd.collection("Professor").get();
    const dev = dbDev.collection("Professor");
    const test = dbTest.collection("Professor");
    
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

module.exports = professor;