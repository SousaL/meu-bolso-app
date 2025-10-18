const mongoose = require('mongoose');
const config = require("../../src/config/config");

const setupTestDB = () => {
    //Criar uma conexao com o mongoose
    // Antes de todos os testes
    beforeAll(async() => {
        await mongoose.connect(config.mongoose.url)
    });
    //Deletar todos os documentos
    // Antes de CADA teste
    beforeEach(async () => {
        await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()))
    });
    // Desconectar o mongoose
    // Depois de todos os testes
    afterAll(async() => {
        await mongoose.disconnect();
    });
}


module.exports = setupTestDB;