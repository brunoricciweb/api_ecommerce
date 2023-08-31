const { log } = require('console');
const express = require('express')
const app = express()
const path = require('path')
const port = 3000
app.use(express.json());
//var cookieParser = require('cookie-parser')
/////////////////////////////////////////////

let productos = []


app.get('/productos', (req, res) => { // devolver todos los productos
    console.log('entró a GET /productos')
    // mandarle la variable con todos los productos.
    res.send( productos );
})

app.get('/producto', (req, res) => {  // devolver SOLO el producto especificado (por query).
    console.log('entró a GET /producto')
    console.log('query: ', req.query);
    res.send( productos[ req.query.indice ] ); 
})

app.get('/producto/:indice', (req, res) => {  // devolver SOLO el producto especificado (por parámetro).
    console.log('entró a GET /producto/:indice')
    console.log('params: ', req.params); 
    res.send( productos[ req.params.indice ] ); 
})

// ELIMINAR PRODUCTOS MEDIANTE "GET", por parámetro
app.get('/producto/eliminar/:indice', (req, res) => {  
    console.log('entró a GET /producto/eliminar/:indice')
    console.log('params: ', req.params); 
    productos.splice( req.params.indice  , 1);
    res.send( 'se eliminó el producto (por parámetro)' ); 
})



app.post('/producto',(req,res)=>{   // POST /producto  -> crear producto nuevo
    console.log('entró a POST /producto', req.body );
    productos.push( req.body );
    res.send();
})

app.delete('/producto',(req,res)=>{   // DELETE /producto  -> eliminar producto
    console.log('entró a DELETE /producto', req.body );
    // eliminar un elemento del array
    productos.splice( req.body.indice  , 1);
    res.send('se eliminó el elemento');
})



/////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})