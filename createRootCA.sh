#!/usr/bin/env bash
openssl genrsa -des3 -out ./ssl/rootCA.key 2048
openssl req -x509 -new -nodes -key ./ssl/rootCA.key -sha256 -days 7300 -out ./ssl/rootCA.pem