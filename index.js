import { createServer } from 'http'; //load http package

createServer((req,res)=>{ // initiliaze http server 
    res.writeHead(200, {'Content-Type':'text/plain'}); //set content head
    res.end('Server responses here') //send downstream response
}).listen(3000); //listen on port 3000 

