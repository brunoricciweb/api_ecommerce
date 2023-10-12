const express = require('express')
const app = express()
const path = require('path')
const port = 3000
app.use(express.json());
var cookieParser = require('cookie-parser')
app.use(cookieParser());
///////////////////////////////////////////////////////////////

fakeDB = {
    bruno_web: {
        productos: [{id: 123 ,nombre: 'producto bruno', precio: 12331.85, stock:58}],
        password: '12345',
        carrito: [
           
        ]
    },
    ariel123:{
        productos: [
        	{
        		id: 124 ,nombre: 'producto de ariel', precio: 12331.85, stock:58
          }
        ],
        password: '_hola123',
        carrito: []
    },
    fatima123:{
        productos: [
        	{
        		id: 228 ,nombre: 'producto fatima123', precio: 12331.85, stock:58
          }
        ],
        password: 'clave122',
        carrito: []
    },
    magali123:{
        productos: [
        	{
        		id: 320 ,nombre: 'producto de magali123',precio: 12331.85, stock:58
          }
        ],
        password: 'miclave88',
        carrito: []
    }
}

app.get('/', (req, res) => { // devolver todos los productos
    console.log('entró a GET /')
    res.send('funciona ok!');
})

app.get('/set_cookie',function(req, res){
    var cookie_name = 'username'
    res.cookie(cookie_name , 'magali123').send('Cookie is set');
});

app.get('/read_cookie',function(req, res){
    console.log("Cookies :  ", req.cookies);
    res.send(req.cookies);
});

app.post('/login',function(req, res){
    console.log('usuario recibido:', req.body.username);

    if( fakeDB[req.body.username].password  ==  req.body.password  ){
        // autenticación correcta.
        console.log('El usuario se autenticó correctamente', req.body.username);
        
        res.cookie('username' , req.body.username );
        res.send(  'Bienvenido, {}'+req.body.username  );
    } else {
        // error de autenticación
        console.log('Error de autenticación!');
        res.send('El usuario o la contraseña son incorrectos.');
    }
});

app.post('/user',function(req, res){
    // Crear un usuario nuevo (validar que no exista) e inicializar 
    // la lista de productos vacía. 
    // Guardarlo en la fakeDB.


})

app.post('/carrito',function(req, res){
    // Agregar un producto (ej: {id: 0} ) al carrito.
    // []
    // [{},{},{}]

    //carrito : []
    
    let miCarrito = fakeDB[req.cookies.username].carrito;
    miCarrito.push(req.body.id)

    // [0]
    console.log(miCarrito);

    res.send('Se agregó el producto al carrito.');
})


function middlewareAutenticacion(req, res, next){
    console.log('Este es el middleware!');
    console.log('Usuario en la cookie:', req.cookies.username);
    if(req.cookies.username == undefined){
        res.send('No estás autenticado.')
    } else {
        next();
    }
}

// endpoint que necesita autenticación
app.get('/seguro', middlewareAutenticacion ,(req, res, next) => { // devolver todos los productos
    console.log('entró a GET /seguro')
    res.send(`Endpoint seguro. Usuario: ${req.cookies.username}`);
})

app.get('/productos',middlewareAutenticacion ,(req, res, next) => { // devolver todos los productos
    console.log('entró a GET /productos')

    let nombreUsuario = req.cookies.username;
    res.send( fakeDB[ nombreUsuario ].productos );
})


app.post('/producto',middlewareAutenticacion ,(req,res, next)=>{   // POST /producto  -> crear producto nuevo
    console.log('entró a POST /producto', req.body );

    let nombreUsuario = req.cookies.username;
    fakeDB.nombreUsuario.productos.push(req.body);
    //productos.push( req.body );
    res.send(`Producto creado en el usuario ${nombreUsuario}`);
})

app.delete('/producto/:indice',middlewareAutenticacion ,(req,res, next)=>{   // POST /producto  -> crear producto nuevo
    console.log('entró a DELETE /producto', req.body );

    let nombreUsuario = req.cookies.username;
    
    fakeDB.nombreUsuario.productos.splice(req.params.indice, 1);
    
    res.send(`Producto creado en el usuario ${nombreUsuario}`);
})

////////////////////////////////////////////`
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})