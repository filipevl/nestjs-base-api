import { execSync } from 'child_process';
// import fs from 'fs';

// Nome do domínio para o qual você deseja gerar o certificado
const domain = 'localhost';

// Caminho para salvar os arquivos de certificado e chave privada
const certPath = './ssl/server.crt';
const keyPath = './ssl/server.key';

// Comando para gerar o certificado autoassinado usando o openssl
const command = `openssl req -newkey rsa:2048 -nodes -subj '/CN=${domain}' -x509 -days 365 -keyout ${keyPath} -out ${certPath}`;

// Executa o comando openssl para gerar o certificado e a chave privada
execSync(command);

console.log('Certificado e chave privada gerados com sucesso!');
