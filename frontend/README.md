## Desafio para Desenvolvedor Full-Stack P&D (Front-end)  

---

## Criação de Aplicação Para Mostrar Logs de Acesso
  
* A empresa FGH precisa de um sistema para visualizar os acessos dos usuários a um local. Esse local possui um sistema de controle de acesso que contém leitores de cartões RFID, e destravamento por aplicativo.  
  
* Você deve construir uma aplicação, no **Framework React**, para mostrar os logs de acesso a equipe de segurança.


### Instruções
1. Você deve consumir dados de exemplo do arquivo `data.json`, realizando um _fetch_ nos dados como se estivesse acessando uma API.

2. Renderizar a informação dos logs na tela com os **seguintes requisitos**:

   * A exibição dos logs deverá ser decrescente, ordenando pelo `logId`.
   * O administrador poderá escolher ver os logs por `Dispositivo de Segurança` ou por `Usuários`.
   * Caso a visualização escolhida seja por:
     * **Usuário**: deve ser possível filtrar por:
       *  `nome do usuário`.
       *  `userId`.
     * **Dispositivo de Segurança**: deve ser possível filtrar por:
       *  `mac`.
       *  `lockId`.
   * Sinta-se a vontade para:
     * Criar a aplicação da melhor forma que encontrar, desde que atenda os requisitos solicitados.
     * Incrementar os dados do `data.json` com maior variação de metodos e horarios, desde que sigam o mesmo formato.
3. Não é permitido alterar os dados do arquivo `data.json`.

### Preparação do Material Desenvolvido

* A aplicação deve ser entregue com um Dockerfile com as instruções de como executa-lo no README.md


### Os seguintes campos devem ser utilizados na aplicação:

| Parâmetro             | Descrição                                                                                            |
| :-------------------- | :--------------------------------------------------------------------------------------------------- |
| **lockId**            | Identificador do dispositivo de segurança, que permite, ou não, o destravamento da porta.            |
| **mac**               | Endereço MAC (Ex: AA:BB:CC:DD:EE:FF) do dispositivo de segurança, sendo único para cada dispositivo. |
| **payload.logId**     | Número do log gerado.                                                                                |
| **payload.timestamp** | Horario do evento.                                                                                   |
| **payload.type**      | Tipo do evento. Onde: `1` = abertura, `2` = travamento.                                              |
| **payload.method**    | Método de acesso. Onde: `3` = Cartão RFID, `4` = aplicativo.                                         |
| **payload.isLocked**  | Estado atual do dispositivo de segurança, sendo: `true` = Trancado, `false` = Destrancado.           |
| **payload.userId**    | Identificador do usuário.                                                                            |
| **payload.userName**  | nome do usuário.                                                                                     |
---

### Exemplo de log por Dispositivo de Segurança
```
userId                               | Log                                                            | Data
13b2b0c8-c911-435e-b53d-1093aa774da1 | Jõao da Silva abriu essa porta as 7:57AM por Cartão de Acesso  | 02/10/2021 7:57AM BRT
```
### Exemplo de log por Usuário
```
lockId                               | Log                                                            | Data
13b2b0c8-c911-435e-b53d-1093aa774da1 | Jõao da Silva abriu essa porta as 7:57AM por Cartão de Acesso  | 02/10/2021 7:57AM BRT
```

**Observação**: Os logs acima são apenas exemplos de implementação. Você pode incrementar e/ou alterar o formato de exibição.

🍀 Boa sorte! 🍀

## User Access Interface Documentation

### Sistema de Visualização de Logs

## Descrição

Sistema para visualização e filtragem de logs de acesso a dispositivos de segurança. Permite visualizar registros de eventos como abertura e travamento de portas, com diferentes métodos de acesso (cartão RFID ou aplicativo).

## Funcionalidades

- Visualização de logs em ordem decrescente por ID
- Filtragem por tipo de visualização:

- **Dispositivo de Segurança**: filtro por MAC e ID do dispositivo
- **Usuário**: filtro por nome e ID do usuário



- Exibição de status de dispositivo (trancado/destrancado)
- Indicação de método de acesso (cartão RFID/aplicativo)


## Tecnologias

- React
- TypeScript
- Tailwind CSS
- Componentes UI personalizados


## Como Executar

### Requisitos

- Node.js instalado

### Passos

1. Clone o repositório:

```plaintext
git clone https://github.com/seu-usuario/sistema-logs.git
cd sistema-logs
```

### Sistema de Visualização de Logs

## Descrição

Sistema para visualização e filtragem de logs de acesso a dispositivos de segurança. Permite visualizar registros de eventos como abertura e travamento de portas, com diferentes métodos de acesso (cartão RFID ou aplicativo).

## Funcionalidades

- Visualização de logs em ordem decrescente por ID
- Filtragem por tipo de visualização:

- **Dispositivo de Segurança**: filtro por MAC e ID do dispositivo
- **Usuário**: filtro por nome e ID do usuário



- Exibição de status de dispositivo (trancado/destrancado)
- Indicação de método de acesso (cartão RFID/aplicativo)


## Tecnologias

- React
- TypeScript
- Tailwind CSS
- Componentes UI personalizados


## Como Executar

### Requisitos

- Node.js instalado


### Passos

1. Clone o repositório:

```plaintext
git clone https://github.com/seu-usuario/sistema-logs.git
cd sistema-logs
```


2. Instale as dependências:

```plaintext
npm install
```


3. Execute o projeto:

```plaintext
npm run dev
```


4. Acesse no navegador:

```plaintext
http://localhost:3000
```



## Estrutura do Projeto

- `App.tsx`: Componente principal com lógica de filtragem
- `components/log-table.tsx`: Tabela de exibição dos logs
- `public/data.json`: Arquivo com dados de exemplo