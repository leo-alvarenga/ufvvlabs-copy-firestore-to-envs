const { dbProd, dbDev, dbTest } = require("../../admin");

const praticaRealizada = async () => {
    const praticaRef = dbProd.collection("PraticaRealizada");
    const dev = dbDev.collection("PraticaRealizada");
    const test = dbTest.collection("PraticaRealizada");

    try {
        let res = [];

        let praticas = await praticaRef.get();

        praticas.forEach((doc) => {
            res.push({
                descricao: doc.data().descricao,
                titulo: doc.data().titulo,
                atividades: doc.data().atividades,
                id: doc.id,
            });
        });

        res.forEach((prat) => {
            const { id, ...p } = prat;

            if (p.titulo === undefined)
                p.titulo = "";

            dev.doc(id).set({ ...p });
            test.doc(id).set({ ...p });
        })
    } catch (error) {
        console.error(error);
    }
};

const praticaEsperada = async () => {
    const praticaRef = dbProd.collection("PraticaEsperada");
    const dev = dbDev.collection("PraticaEsperada");
    const test = dbTest.collection("PraticaEsperada");

    try {
        let res = [];

        let praticas = await praticaRef.orderBy("titulo", "asc").get();

        praticas.forEach((doc) => {
            res.push({
                descricao: doc.data().descricao,
                titulo: doc.data().titulo || "",
                atividades: doc.data().atividades,
                id: doc.id,
            });
        });

        res.forEach((prat) => {
            const { id, ...p } = prat;

            if (p.titulo === undefined)
                p.titulo = "";

            dev.doc(id).set({ ...p });
            test.doc(id).set({ ...p });
        })
    } catch (error) {
        console.error(error);
    }
};

const pratica = async () => {
    await praticaEsperada();
    await praticaRealizada();
}

module.exports = pratica;