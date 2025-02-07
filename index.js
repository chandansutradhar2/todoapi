import { createServer } from 'http'; // Load HTTP package

let port=3000;

let todos = []; // In-memory storage for todos

createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.method === 'GET' && req.url === '/getAllTodos') {
        // Return all todos
        res.writeHead(200);
        res.end(JSON.stringify({ todos }));
    } else if (req.method === 'POST' && req.url === '/addTodo') {
        // Collect request data
        let body = '';
        setTimeout(()=>{
            req.on('data', chunk => {
                console.log(chunk);    
                body += chunk.toString();
            });
        },15000);
        req.on('end', () => {
            try {
                const { todo } = JSON.parse(body);
                if (todo) {
                    todos.push(todo);
                    res.writeHead(201);
                    res.end(JSON.stringify({ message: 'Todo added successfully', todos }));
                } else {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: 'Invalid todo format' }));
                }
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid JSON format' }));
            }
        });
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
}).listen(port, () => {
    console.log('Server running on port '+ port);
});
