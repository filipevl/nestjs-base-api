#!/usr/bin/env bash
openssl req -new -sha256 -nodes -out ./ssl/server.csr -newkey rsa:2048 -keyout ./ssl/server.key -config ./ssl/server.csr.cnf
openssl x509 -req -in ./ssl/server.csr -CA rootCA.pem -CAkey ./ssl/rootCA.key -CAcreateserial -out ./ssl/server.crt -days 825 -sha256 -extfile ./ssl/v3.ext