// const mysql = require('mysql2');

// class Database {
//     constructor() {
//         this.connection = mysql.createConnection({
//             host: 'localhost',
//             user: 'root',
//             password: 'root',
//             database: 'america'
//         });
//     }

//     connect() {
//         console.log("Conectando ao banco de dados...");
//         this.connection.connect((err) => {
//             if (err) {
//                 console.error('Erro ao conectar ao banco de dados: ' + err.stack);
//                 return;
//             }
//             console.log('Conexão bem-sucedida com o ID: ' + this.connection.threadId);
//         });
//     }


//     query(sql, values, callback) {
//         this.connection.query(sql, values, callback);
//     } 
//     // personalizei o query para ficar mais legivel e saber que o 
// }
// module.exports = Database;



const mysql = require('mysql2');

function connection_func() {
    console.log("Conectando...");
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'america'
    });
    connection.connect(function (err) {
        if (err) {
            console.error('Erro ao conectar ao banco de dados: ' + err.stack);
            return;
        }
        console.log('Conexão bem-sucedida com o ID: ' + connection.threadId);
       create_tables(connection); // Chama a função para criar a tabela
    });
    return connection
}
function create_tables(con) {
    console.log("Criando tabelas...");
    const sql_create_table_usuarios = `
        CREATE TABLE IF NOT EXISTS usuarios (
            id_usuario INT NOT NULL AUTO_INCREMENT,
            nom_usuario VARCHAR(50) NOT NULL,
            ema_usuario VARCHAR(55) NOT NULL,
            end_usuario VARCHAR(100) NOT NULL,
            sen_usuario CHAR(15) NOT NULL,
            PRIMARY KEY (id_usuario)
        )
    `;

    const sql_create_table_pedido = `
        CREATE TABLE IF NOT EXISTS pedido (
            id_pedido INT NOT NULL AUTO_INCREMENT,
            vto_pedido DECIMAL(10,2) NOT NULL,
            dat_pedido DATE,
            PRIMARY KEY (id_pedido)
        )
    `;

    const sql_create_table_pagamento = `
        CREATE TABLE IF NOT EXISTS pagamento (
            id_pagamento INT NOT NULL AUTO_INCREMENT,
            val_pagamento DECIMAL(10,2) NOT NULL,
            tip_pagamento VARCHAR(111),
            dat_pagamento DATE,
            PRIMARY KEY (id_pagamento)
        )
    `;
    const sql_create_table_produtos = `
        CREATE TABLE IF NOT EXISTS produtos (
            id_produtos INT NOT NULL AUTO_INCREMENT,
            val_produtos DECIMAL(10,2) NOT NULL,
            nom_produtos VARCHAR(1000) NOT NULL,
            qtd_produtos INT,
            img_produto VARCHAR(255),
            tipo_produto VARCHAR(50),
            PRIMARY KEY (id_produtos)
        )
    `;

    // Aq envia as consultas SQL pra o banco de dados
    con.query(sql_create_table_usuarios, function (err, result) {
        if (err) throw err;
        console.log("Tabela usuarios criada com sucesso!");
    });

    con.query(sql_create_table_pedido, function (err, result) {
        if (err) throw err;
        console.log("Tabela pedido criada com sucesso!");
    });

    con.query(sql_create_table_pagamento, function (err, result) {
        if (err) throw err;
        console.log("Tabela pagamento criada com sucesso!");
    });

    // con.query(sql_create_table_itens_pedido, function (err, result) {
    //     if (err) throw err;
    //     console.log("Tabela itens_pedido criada com sucesso!");
    // });

    con.query(sql_create_table_produtos, function (err, result) {
        if (err) throw err;
        console.log("Tabela produtos criada com sucesso!");
        
        // Dps de criar, insere um produto
        // insert_product(con, 617.49, 'regata NBA Charlotte', 100);
        // insert_product(con, 617.49, 'regata NBA Boston', 100);
        // insert_product(con, 617.49, 'regata NBA Brooklyn', 100);
        // insert_product(con, 617.49, 'regata NBA Spurs', 100);
        // insert_product(con, 149.90, 'camisa Corinthians', 100);
        // insert_product(con, 149.90, 'camisa São Paulo', 100);
        // insert_product(con, 149.90, 'camisa Vasco', 100);
        // insert_product(con, 149.90, 'camisa Red Bull', 100);
    });
}
function insert_user(nome, email, endereco, senha) {
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

function insert_product(connection, val_produtos, nom_produtos, qtd_produtos, img_produto, tipo_produto) {
    console.log("Adicionando produto...");
    const sql_insert_product = `
        INSERT INTO produtos (val_produtos, nom_produtos, qtd_produtos, img_produto, tipo_produto) 
        VALUES (?, ?, ?, ?, ?)
    `;
    connection.query(sql_insert_product, [val_produtos, nom_produtos, qtd_produtos, img_produto, tipo_produto], function (err, result) {
        if (err) throw err;
        console.log("Produto adicionado com sucesso!");
    });
}






 //connection_func();


module.exports = {
    connection_func,
    insert_user,
    insert_product
}
