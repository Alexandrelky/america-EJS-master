
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const recebe_dadosCad = require('./dataBase/Insert_valida');
const { title } = require('process');
const { connection_func } = require('./dataBase/db');
const session = require('express-session'); //bagulho do nome do usuario na tela apos logado


const connection = connection_func();
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '..')));
app.use(express.static('public'))
app.use(session({
    secret: 'sua_chave_secreta',
    resave: false,
    saveUninitialized: false
}));




app.set('view engine' , 'ejs')






//A partir daqui Rotas 
app.get('/', (req, res) => {
    const user = req.session?.user || null;
    // Primeira consulta: Buscar usuários
    connection.query('SELECT * FROM usuarios', (err, usuarios) => {
        if (err) {
            console.error("Erro ao buscar usuários: ", err);
            res.status(500).send("Erro ao buscar dados de usuários.");
            return;
        }
        // Segunda consulta: Buscar produtos
        connection.query('SELECT * FROM produtos', (err, produtos) => {
            if (err) {
                console.error("Erro ao buscar produtos: ", err);
                res.status(500).send("Erro ao buscar dados de produtos.");
                return;
            }
            // const user = req.session.user || null;
            // const user = req.session.user || null;
        const user = req.session.user || null;
         res.render('index', { usuarios, produtos, user });
        });
    });
});






// app.get('/login', (req, res) =>{
//     res.render('components/login')
// }) 

app.get('/cadastro', (req, res)=>{
    res.render('components/cadastro')
})

app.use(bodyParser.urlencoded({ extended: true }));

const recebe_dados = new recebe_dadosCad();

app.post('/submit', (req, res) => {
    const { nome, email, endereco, senha } = req.body;

    recebe_dados.insertData(nome, email, endereco, senha);

    res.render('components/login')
});




app.get('/login', (req, res) => {
    res.render('components/login');
});

// app.post('/login', (req, res) => {
//     const { email, senha } = req.body;

//     recebe_dados.validateUser(email, senha, (err, isValid) => {
//         if (err) {
//         res.status(500).json({ error: 'Erro interno do servidor' });
//         return;
//     }
//         // if (isValid) {
//         //     res.render('components/login'); 
//         // } else {
//         // res.status(401).json({ error: 'Email ou senha incorretos' });
            
//         // }
//     });
// });
app.post('/valida', (req, res) => {
    const { email, password } = req.body;

    // Valida o login
    recebe_dados.validateUser(email, password, (err, user) => {
        
        console.log(email, password)
        console.log(user)

        if (err) {
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        if (user) { // se login for válido, retorna:
            req.session.user = { id: user.id, nome: user.nome }; // Salva o ID e o nome do usuário na sessão
            console.log(user.nome)
            res.redirect('/');
        } else {
            res.redirect('/login');
            console.log('Login falhou.');
        }
    });
});


app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login'); 
    });
});


app.get('/logged.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'logged.html'));
});


app.get('/compra/:id', (req, res) => {
    const produtoId = req.params.id;
    const sql = 'SELECT * FROM produtos WHERE id_produtos = ?';

    connection.query(sql, [produtoId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar produto:', err);
            res.status(500).send('Erro no servidor');
        } else if (results.length === 0) {
            res.status(404).send('Produto não encontrado');
        } else {
            const produto = results[0];
             res.render('components/compra', { produto });
            }
        
    });
    // const user = req.session.user || null;
    // res.render('index', {  user });
});


app.post('/carrinho', (req, res) => {
    const { id_produto, quantidade } = req.body;

    const sql = 'UPDATE produtos SET qtd_produtos = qtd_produtos - ? WHERE id_produtos = ?';
    connection.query(sql, [quantidade, id_produto], (err) => {
        if (err) {
            console.error('Erro ao finalizar a compra:', err);
            return res.status(500).send('Erro no servidor');
        }
        // Recarregar os dados do produto para exibir na tela
        const getProductSql = 'SELECT * FROM produtos WHERE id_produtos = ?';
        connection.query(getProductSql, [id_produto], (err, results) => {
            if (err || results.length === 0) {
                console.error('Erro ao buscar produto atualizado:', err);
                return res.status(500).send('Erro ao buscar dados do produto.');
            }

            res.render('components/compraTeste', { produto: results[0] });
        });
    });
});




app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});



//app.use('/products', productRouter);
