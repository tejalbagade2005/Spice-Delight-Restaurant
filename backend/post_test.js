const http = require('http');
const data = JSON.stringify({name: "Test Item", price: 9.99, image: "img.png", date: "2026-05-16"});

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/orders',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  console.log('STATUS:', res.statusCode);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log('BODY:', chunk);
  });
});

req.on('error', (e) => {
  console.error('problem with request:', e.message);
});

req.write(data);
req.end();
