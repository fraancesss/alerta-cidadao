# 🏙️ Alerta Cidadão

**Uma cidade melhor começa com um alerta!**

O Alerta Cidadão é uma aplicação Web desenvolvida para aproximar a população da administração pública, facilitando a comunicação de problemas encontrados nos espaços urbanos.

Por meio da plataforma, os cidadãos podem registrar ocorrências, como buracos nas ruas, iluminação pública defeituosa, acúmulo de lixo e mato alto. Os responsáveis podem acessar um painel administrativo para visualizar, analisar e atualizar o andamento das solicitações.

---

## 📌 Funcionalidades

### 👤 Modo Cidadão (User)

O modo cidadão é destinado às pessoas que desejam informar problemas encontrados na cidade.

É possível:

- Criar uma conta utilizando nome, e-mail e senha.
- Fazer login e logout.
- Registrar novos problemas urbanos.
- Selecionar a categoria do problema.
- Informar a prioridade sugerida.
- Adicionar uma descrição detalhada.
- Informar a localização do problema.
- Consultar os alertas registrados pela própria conta.
- Acompanhar o andamento das solicitações.

### 🛡️ Modo Administrador (Admin)

O modo administrador é destinado aos responsáveis pelo recebimento e gerenciamento dos alertas.

É possível:

- Acessar o painel administrativo.
- Visualizar os alertas registrados pelos cidadãos.
- Consultar informações de cada ocorrência.
- Verificar categoria, prioridade, descrição e localização.
- Identificar quem registrou o problema.
- Atualizar o status das solicitações.

**Status disponíveis:**

| Status | Significado |
|---|---|
| Novo | Alerta recém-registrado |
| Em análise | Ocorrência sendo verificada |
| Em andamento | Problema em processo de resolução |
| Concluído | Problema resolvido |
| Não procedente | Alerta não confirmado ou inválido |

---

## 🔑 Como acessar os dois modos

### 1. Acesso como cidadão (User)

1. Abra o site.
2. Clique em **Criar conta**.
3. Informe seu nome completo.
4. Digite seu e-mail.
5. Crie uma senha com pelo menos 6 caracteres.
6. Clique em **Criar conta**.
7. Após o cadastro, você poderá acessar a área de cidadão.

Depois de entrar, utilize a opção de registrar problema para criar um alerta e consulte a página **Meus alertas** para acompanhar suas solicitações.

### 2. Acesso como administrador (Admin)

Para testar o painel administrativo, utilize a conta de demonstração:

| Campo | Credencial |
|---|---|
| Nome | ADM |
| E-mail | ADM@gmail.com |
| Senha | ADM123 |
| Tipo de acesso | Administrador |

**Como entrar:**

1. Abra a página de login.
2. Digite o e-mail `ADM@gmail.com`.
3. Digite a senha `ADM123`.
4. Clique em **Entrar**.
5. Acesse o painel administrativo pelo menu ou pelo endereço `/admin`.

O administrador poderá visualizar os alertas enviados pelos cidadãos e atualizar o andamento de cada ocorrência.

> **Importante:** para o acesso administrativo funcionar, a conta precisa estar cadastrada no Firebase Authentication e possuir o campo `role` definido como `admin` no documento correspondente da coleção `users` do Firestore. Se a conta ainda não existir, ela deverá ser criada e configurada antes do acesso.

---

## 🧰 Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| React | Construção das interfaces |
| JavaScript | Lógica da aplicação |
| Vite | Execução e desenvolvimento |
| CSS | Estilização das páginas |
| React Router DOM | Navegação entre páginas |
| Lucide React | Ícones |
| Firebase Authentication | Cadastro e login |
| Cloud Firestore | Armazenamento de usuários e alertas |
| Firebase Storage | Serviço previsto para armazenamento de arquivos |
| Git e GitHub | Versionamento do código |
| Vercel | Hospedagem da aplicação |

---

## 📂 Estrutura do projeto

```text
alerta-cidadao/
│
├── public/
│
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── NewAlert.jsx
│   │   ├── MyAlerts.jsx
│   │   └── Admin.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── firebase.js
│   └── styles.css
│
├── .env.local
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

### Principais arquivos

- `Home.jsx`: página inicial.
- `Login.jsx`: tela de autenticação.
- `Register.jsx`: cadastro de usuários.
- `NewAlert.jsx`: formulário para registrar problemas.
- `MyAlerts.jsx`: consulta dos alertas do cidadão.
- `Admin.jsx`: painel administrativo.
- `firebase.js`: conexão com o Firebase.
- `App.jsx`: organização das páginas e rotas.
- `styles.css`: estilos visuais do site.

---

## 🚀 Como executar o projeto

### Requisitos

Antes de executar, instale:

- [Node.js](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- Git (opcional, para versionamento).

### 1. Baixar o projeto

Clone o repositório ou baixe os arquivos do projeto pelo GitHub.

```bash
git clone https://github.com/fraancesss/alerta-cidadao.git
```

Entre na pasta:

```bash
cd alerta-cidadao
```

### 2. Instalar as dependências

Abra o terminal na pasta do projeto e execute:

```bash
npm install
```

### 3. Configurar o Firebase

Crie um arquivo chamado `.env.local` na raiz do projeto.

Adicione as configurações do Firebase:

```env
VITE_FIREBASE_API_KEY=SUA_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=SEU_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=SEU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=SEU_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=SEU_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=SEU_APP_ID
```

Substitua os valores pelos dados do projeto Firebase.

### 4. Iniciar a aplicação

Execute:

```bash
npm run dev
```

O Vite disponibilizará um endereço local, normalmente:

```text
http://localhost:5173/
```

Abra esse endereço no navegador para utilizar o sistema.

---

## 🔥 Organização do Firebase

O projeto utiliza o Firebase para autenticação e armazenamento de informações.

### Authentication

Responsável por:
- Cadastro de usuários.
- Login com e-mail e senha.
- Autenticação das contas.

### Firestore Database

O banco de dados possui as seguintes coleções:

**users**

Armazena informações dos usuários:
- Nome;
- E-mail;
- Função (`citizen` ou `admin`);
- Data de criação.

**alerts**

Armazena os alertas:
- Usuário responsável;
- E-mail;
- Categoria;
- Prioridade;
- Descrição;
- Localização;
- Status;
- Data de criação.

**history**

Coleção preparada para armazenar o histórico de alterações dos alertas.

---

## 🔐 Segurança

O sistema utiliza regras de segurança do Firebase para controlar o acesso aos dados.

- Cidadãos podem consultar seus próprios alertas.
- Cidadãos não podem alterar o próprio nível de acesso.
- Administradores possuem permissões para gerenciar os alertas.
- As configurações privadas do ambiente devem ficar no arquivo `.env.local`, que não deve ser enviado ao GitHub.

**Atenção:** as credenciais de demonstração deste README não devem ser utilizadas em um ambiente de produção. Altere a senha e revise as permissões antes de disponibilizar o sistema publicamente.

---

## 💡 Melhorias futuras

O projeto pode receber novas funcionalidades, como:

- Upload de fotografias das ocorrências.
- Localização automática por GPS.
- Mapa interativo com os alertas registrados.
- Filtros por categoria, prioridade e status.
- Gráficos e estatísticas no painel administrativo.
- Notificações sobre alterações no andamento dos alertas.
- Histórico detalhado de atendimento.
- Melhorias de acessibilidade.

Essas funcionalidades podem ser desenvolvidas nas próximas etapas do projeto.

---

## 🎯 Objetivo final

O Alerta Cidadão busca tornar a comunicação entre a população e os responsáveis pela administração urbana mais simples e organizada.

A proposta é dar visibilidade aos problemas da cidade, facilitar o acompanhamento das solicitações e incentivar a participação dos cidadãos na melhoria dos espaços públicos.

**Alerta Cidadão — Sua participação faz a diferença!**
