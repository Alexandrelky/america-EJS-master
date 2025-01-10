
const Database = require('./Database');
const { insert_product, insert_user } = require('./db'); // Importando as funções

// Instancia a classe e conecta ao banco
const dbInstance = new Database();
dbInstance.connect(); // Conecta ao banco de dados
const connection = dbInstance.getConnection(); // Obtém a conexão ativa

function insertNewProduct(val_produtos, nom_produtos, qtd_produtos, img_produto, tipo_produto) {
    insert_product(connection, val_produtos, nom_produtos, qtd_produtos, img_produto, tipo_produto);
}

function insert_NewUser(nom_usuario, ema_usuario, end_usuario, sen_usuario) {
    insert_user(connection, nom_usuario, ema_usuario, end_usuario, sen_usuario);
}


// Insere novos produtos
// insertNewProduct(279.90, 'regata NBA Boston', 100, "https://images.tcdn.com.br/img/img_prod/1044362/camisa_nba_boston_celtics_nike_association_edition_swingman_jersey_jayson_tatum_0_2091_1_89c9a7a910481d19081cc5851fff2929.jpg", "basquete");

// insertNewProduct( 279.99, 'regata NBA Charlotte', 100, "https://images.tcdn.com.br/img/img_prod/1044362/camisa_nba_charlotte_hornets_jordan_icon_edition_2021_lamelo_ball_2_973_1_c2bfb02f200bf0a07ba1ccb2847c12e7.png", "basquete")

//  insertNewProduct(279.90, 'regata NBA Boston', 100, "https://images.tcdn.com.br/img/img_prod/1044362/camisa_nba_boston_celtics_nike_association_edition_swingman_jersey_jayson_tatum_0_2091_1_89c9a7a910481d19081cc5851fff2929.jpg", "basquete");



insertNewProduct(299.99, 'Camisa Red Bull Bragantino', 100, "https://www.futebolreligiao.com.br/image/cache/catalog/Bragantino/Camisa%20Red%20Bull%20Bragantino%202020%202021%20IV%20Fourth%20jogador-900x900.jpg", "futebol");































 

// Dps de criar, insere um produto
        // insert_product(con, 617.49, 'regata NBA Charlotte', 100);
        // insert_product(con, 617.49, 'regata NBA Boston', 100);
        // insert_product(con, 617.49, 'regata NBA Brooklyn', 100);
        // insert_product(con, 617.49, 'regata NBA Spurs', 100);
        // insert_product(con, 149.90, 'camisa Corinthians', 100);
        // insert_product(con, 149.90, 'camisa São Paulo', 100);
        // insert_product(con, 149.90, 'camisa Vasco', 100);
        // insert_product(con, 149.90, 'camisa Red Bull', 100);



//insert_NewUser("alexandre","xande@gmail.com","Ouro Preto", 123)

//         //const { connection_func, insert_product, insert_user} = require('./db');  // Importando a função de conexão e inserção de produto

// const Database = require('./Database');

// //const connection = connection_func();  

// // produtos (val_produtos, nom_produtos, qtd_produtos, img_produto, tipo_produto)

// function insertNewProduct( val_produtos, nom_produtos, qtd_produtos, img_produto, tipo_produto) 
// {
//     insert_product(connection, val_produtos, nom_produtos, qtd_produtos, img_produto, tipo_produto);
// }

// function insert_NewUser(nom_usuario, ema_usuario, end_usuario, sen_usuario) {
//     insert_user(connection,nom_usuario, ema_usuario, end_usuario, sen_usuario);
// }

