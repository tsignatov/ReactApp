import { setupWorker, rest } from "msw";

const loginCredentials = {username: 'user', password: 'pass'}

const worker = setupWorker(
    rest.get('/api/product/1' , (req, res, ctx) =>{
        return res(ctx.json({
             name: "product1", price: 3.14, color: "red" 
        }))
    }),
    rest.get('/api/product/2' , (req, res, ctx) =>{
        return res(ctx.status(404 , "Product not found") , ctx.json({
            headers: { "x-message": "Product not found" }
        }))
    }),
    rest.get('/api/product/3' , (req, res, ctx) =>{
        return res(ctx.status(401) , ctx.json({
            headers: { "x-message": "You are not authorized!" }
        }))
    }),
    rest.post('/api/login' , (req, res, ctx) =>{
        let credentials = JSON.parse(req.body);
        if (loginCredentials.username === credentials.username && loginCredentials.password === credentials.password) {
            return res(ctx.status(200))
        } else {
            return res(ctx.status(401))
        }
    })
);

worker.start()