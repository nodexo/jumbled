
'use strict'

const xpipe = require('xpipe')
const http = require('http')
const http2 = require('http2')
const httpsOptions = require('localhost.daplie.com-certificates').merge({})
const endpoint = {host: '127.0.0.1', ports: {http: 8080, https: 8443}, path: xpipe.eq('/tmp/3001.sock')}

console.log('\nThe server is listening at:')

http2.createServer(httpsOptions, handleRequestHTTPS).listen({port: endpoint.ports.https, host: endpoint.host}, function () {
  console.log(` - https://localhost.daplie.com:${endpoint.ports.https}`)
});

http.createServer(handleRequestHTTP).listen({port: endpoint.ports.http, host: endpoint.host}, function () {
  console.log(` - http://${endpoint.host}:${endpoint.ports.http}`)
});

http.createServer(handleRequestIPC).listen({path: endpoint.path}, function () {
  console.log(` - IPC socket: ${endpoint.path}`)
});

function handleRequestHTTPS(req, res) {
  res.end('HTTPS')
}

function handleRequestHTTP(req, res) {
  res.end('HTTP')
}

function handleRequestIPC(req, res) {
  res.end('IPC')
}
