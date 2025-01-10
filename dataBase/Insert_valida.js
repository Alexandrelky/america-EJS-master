const Database = require('./Database');

class recebe_dadosCad {
    constructor() {
        this.db = new Database() }

    insertData(nome, email, endereco, senha) {
        const sql = `INSERT INTO usuarios (nom_usuario, ema_usuario, end_usuario, sen_usuario) 
                     VALUES (?, ?, ?, ?)`;
        const values = [nome, email, endereco, senha];

        this.db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Erro ao inserir dados: ' + err);
                return;
            }
            console.log('Dados inseridos com sucesso!');
        });
    }
    validateUser(email, senha, callback) {
        const sql = `SELECT * FROM usuarios WHERE ema_usuario = ? AND sen_usuario = ?`;
        const values = [email, senha];

        this.db.query(sql, values, (err, results) => {
            if (err) {
                console.error('Erro ao validar usuário: ' + err);
                callback(err, null);
                return;
            }
            if (results.length > 0) {
                // Usuário encontrado
                callback(null, true);
            } else {
                // Usuário não encontrado
                callback(null, false);
            }
        });
    }

}




module.exports = recebe_dadosCad;
