#  Desafio para Desenvolvedor Full-Stack P&D (Back-end)  

---     

## Criação da API de cadastro de dispositivos

**Descrição:** A Empresa XYZ deseja desenvolver um sistema para cadastro de seus dispositivos IoT, dessa forma, você como desenvolvedor back-end deverá desenvolver as API's necessárias.

``` 
Requisitos técnicos:

Mínimo
- Linguagem: Javascript (Node.js)
- Framework: Express.js ou NestJS
- Database: A critério do candidato
- Git: Fazer o fork do repositório (de forma pública) e realizar um commit para cada desafio.

Diferenciais
- Documentação e comentários no código.

```

---
### As seguintes funcionalidades deverão ser desenvolvidas:

1. **Rota de Cadastro de dispositivo IoT**:
   
```json
Request URI: "/registrar";
Verbo: POST
Body: Json
{
  "name": "nome do dispositivo",
  "mac": "mac do dispositivo",
  "email": "email do dono do dispositivo",
  "timestamp": "Horário do cadastro em Epoch/Unix"
}

Response: 201
{
  "deviceId": "id do dispositivo (gerado no back-end)",
  "mac": "mac do dispositivo"
}

```

**Observação**: Tratar possíveis erros (exemplo: Mac já existente).

---
2. **Listar todos os dispositivos cadastrados**: Todos os dispositivos são retornados em uma lista de objetos
```json
Request URI: "/listar"
Verbo: GET

Response: 200
[
  {
    "deviceId": "id do dispositivo 1 (gerado no back-end)",
    "name": "nome do dispositivo 1",
    "mac": "mac do dispositivo 1",
    "email": "email do dono do dispositivo 1",
    "timestamp": "Horário do cadastro em Epoch/Unix do dispositivo 1"
  },
  {
    "deviceId": "id do dispositivo 2 (gerado no back-end)",
    "name": "nome do dispositivo 2",
    "mac": "mac do dispositivo 2",
    "email": "email do dono do dispositivo 2",
    "timestamp": "Horário do cadastro em Epoch/Unix do dispositivo 2"
  },
  ...

]
```
---
3. **Listar dispositivo pelo "deviceId"**: O usuário irá informar o id do dispositivo que ele deseja consultar na URI
```json
Request URI: "/listar/deviceId" //e.g. -> /listar/1
Verbo: GET

Response: 200
{
  "deviceId": "id do dispositivo 1 (gerado no back-end)",
  "name": "nome do dispositivo 1",
  "mac": "mac do dispositivo 1",
  "email": "email do dono do dispositivo 1",
  "timestamp": "Horário do cadastro em Epoch/Unix do dispositivo 1"
}
```
---

### Preparação do Material Desenvolvido

4. Criar uma Dockerfile para a aplicação desenvolvida.  
5. Descrever as instruções para executar a aplicação preferencialmente no README.md.
6. Disponibilizar a aplicação em seu Github informando a url para acesso.  
   
---

🍀 Boa sorte! 🍀

## Como Rodar o Projeto

### Pré-requisitos

- Docker (opcional, se você for rodar via container).
- Node.js (se for rodar localmente).
- Prisma (comando npx prisma).

### Rodando localmente

- clone este repositório: https://github.com/Natayamashita/padotec.full-stack.git
- Após clonado, acesse ele via VsCode ou qualquer IDE de sua preferencia.
- No terminal:
   ```bash
   cd iot-devices-api
- Instale as dependencias com:
    ```bash
    npm i
- Gere o banco de dados
    ```bash
    npx prisma migrate dev npx prisma generate
- Rode a aplicação
     ```bash
     npm run start:dev
- A aplicação esta rodando em localhost:3000

### Rodando via docker
- Se certifique de estar no mesmo local da pasta backend, em que contem o dockerfile e o dockerignore juntamente.
- Crie a imagem docker rodando o seguinte comando:
  ```bash
  docker build -t iot-devices-api .
- Caso Windows, se certifique de estar com o docker desktop aberto em seu computador.
- Inicie a imagem que você acabou de criar:
  ```bash
  docker run -p 3000:3000 iot-devices-api
- A aplicação estara rodando em http://localhost:3000

