<div align="center">

**[🇧🇷 Português](#portugues) · [🇬🇧 English](#english)**

<a id="portugues"></a>

# 🌿 RastroVerde

### Da evidência de campo ao relatório ambiental.

Uma plataforma para organizar registros, identificar lacunas e apoiar a elaboração de relatórios ambientais rastreáveis.

**AmazôniaHack 4.0 · Desafio 1 · GovTech socioambiental**

[![Explorar solução](https://img.shields.io/badge/EXPLORAR-SOLU%C3%87%C3%83O_NAVEG%C3%81VEL-1B5E3A?style=for-the-badge)](https://amazoniahack-rastroverde.vercel.app/)
[![Assistir ao pitch](https://img.shields.io/badge/ASSISTIR-V%C3%8DDEO_PITCH-B91C1C?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/xsZVNQkDeMw)

[Sobre](#sobre) · [Recursos](#recursos) · [Demonstração](#demonstracao) · [Tecnologias](#tecnologias) · [Execução local](#execucao-local) · [Equipe](#equipe)

</div>

---

<a id="sobre"></a>

## 🌱 O que é o RastroVerde?

O **RastroVerde** conecta as evidências coletadas durante uma fiscalização às informações apresentadas no relatório ambiental. A proposta é reunir registros dispersos, facilitar sua consulta e mostrar o que sustenta cada afirmação, além de apontar inconsistências e informações que ainda precisam ser coletadas.

O projeto foi desenvolvido para o **Desafio 1 do AmazôniaHack 4.0**, com foco no apoio a agentes de campo e equipes de fiscalização ambiental, incluindo secretarias municipais de meio ambiente.

> **A pergunta que orienta o projeto:** qual evidência sustenta esta informação?

### O problema

Uma fiscalização pode reunir fotografias, áudios, anotações, documentos e coordenadas em diferentes lugares. Quando esses registros perdem seu contexto, fica mais difícil reconstruir os fatos, conferir divergências e elaborar um relatório consistente.

### A proposta

| Organizar | Conferir | Documentar |
| :--- | :--- | :--- |
| Reunir evidências e vinculá-las à fiscalização. | Destacar divergências e informações ausentes. | Apoiar a construção de uma minuta com referências às fontes. |

O objetivo é reduzir a dispersão de informações e facilitar a revisão técnica. Esses benefícios representam a proposta do projeto, sem métricas de impacto aferidas nesta documentação.

<a id="recursos"></a>

## 🧭 Do campo à minuta

**01 · Registrar** → **02 · Organizar** → **03 · Conferir** → **04 · Complementar** → **05 · Revisar**

| Etapa | Como aparece no projeto |
| :--- | :--- |
| 📍 **Fiscalizações** | Listagem, cadastro e detalhes de cada fiscalização, com contexto da ocorrência. |
| 📂 **Central de evidências** | Organização de registros, arquivos e informações vinculados à fiscalização. |
| 🔗 **Conexões entre evidências** | Uma visão das relações entre os registros do caso. |
| 🗺️ **Mapa de evidências** | Representação visual da distribuição dos registros em um grid demonstrativo. |
| 🔎 **Verificação de consistência** | Apresentação de divergências e pontos que precisam de conferência. |
| 📋 **Checklist de lacunas** | Indicação de informações pendentes para complementar a documentação. |
| 📝 **Minuta de relatório** | Seções estruturadas, referências às evidências, impressão e exportação em JSON. |
| 💬 **Assistente** | Interface de conversa com integração ao agente de IA no backend. |
| 🕓 **Histórico** | Consulta às atividades registradas no sistema. |

Os recursos acima estão representados no código. Parte do fluxo utiliza dados e análises preparados para demonstração; a presença de uma tela não equivale à validação do recurso em operação real.

<a id="demonstracao"></a>

## ▶️ Conheça o projeto

| Acesso | Link |
| :--- | :--- |
| 🌐 **Solução navegável** | [Abrir o RastroVerde](https://amazoniahack-rastroverde.vercel.app/) |
| 🎬 **Vídeo pitch** | [Assistir à apresentação no YouTube](https://youtu.be/xsZVNQkDeMw) |
| 💻 **Código-fonte** | [Explorar o repositório](https://github.com/SouBeatrizKaroline/AmazoniaHack_RastroVerde) |

### Roteiro sugerido

1. Acesse a solução e escolha **Explorar caso de demonstração**.
2. Conheça o caso **APA Setor Norte · RV-DEMO-001**.
3. Consulte as evidências e observe os vínculos entre registros.
4. Explore a verificação de consistência e o checklist de lacunas.
5. Abra a minuta e confira como as informações se relacionam com suas fontes.

A interface também inclui um tour guiado e opções de idioma em português e inglês.

> **Sobre a demonstração:** o caso RV-DEMO-001 utiliza dados sintéticos. Nomes, coordenadas e documentos do cenário demonstrativo não devem ser interpretados como registros de uma fiscalização real.

## 🔬 Escopo e estágio atual

O RastroVerde é um **protótipo demonstrativo de hackathon**, com interface web, acesso a dados via PocketBase e integração de assistente prevista no backend.

| Item | Situação no repositório |
| :--- | :--- |
| Interface e navegação | Páginas de fiscalização, evidências, mapa, checklist, relatório e assistente. |
| Persistência | Camada de acesso ao PocketBase e migrações de coleções e dados de demonstração. |
| Relatório e consistência | Uso de conteúdo demonstrativo em `draftReportFixtures.ts`; não representa uma análise automática validada para qualquer arquivo. |
| Mapa | Grid georreferenciado simulado para demonstração. |
| Assistente de IA | Endpoint que utiliza o agente `rastroverde-assistant`; depende da configuração e disponibilidade do serviço. |
| Exportação | JSON e impressão pelo navegador, com opção de salvar em PDF quando disponível. |
| Integrações governamentais e geoespaciais | Apresentadas como possibilidade futura, sem integração operacional confirmada. |
| Testes automatizados | Os scripts atuais de teste apenas informam que não há testes no projeto. |

### Integridade das informações

A ferramenta apoia o trabalho técnico do agente ambiental. A revisão humana continua necessária: uma minuta não constitui um parecer final, uma lacuna deve permanecer explícita e uma divergência precisa ser investigada.

A proposta de rastreabilidade não representa certificação de autenticidade, conformidade legal ou garantia de resultado jurídico.

<a id="tecnologias"></a>

## 🛠️ Tecnologias

| Camada | Tecnologias |
| :--- | :--- |
| Interface | React 19, TypeScript e React Router |
| Componentes e estilo | Tailwind CSS, shadcn/ui, Radix UI e Lucide |
| Formulários | React Hook Form e Zod |
| Gráficos | Recharts |
| Dados e autenticação | PocketBase |
| Assistente | Integração com Skip AI no backend |
| Desenvolvimento | Vite 8, Oxlint e Oxfmt |
| Hospedagem da interface | Vercel |

### Como o projeto se organiza

```text
Interface React
    │
    ├── Páginas e componentes
    ├── Serviços de acesso a dados ──► PocketBase
    ├── Conteúdo demonstrativo
    └── Assistente ──► Endpoint no backend ──► Agente de IA
```

<details>
<summary><strong>📁 Ver estrutura de pastas</strong></summary>

```text
.
├── public/                     # Arquivos estáticos
├── src/
│   ├── components/             # Componentes da interface
│   ├── hooks/                  # Hooks compartilhados
│   ├── lib/
│   │   ├── pocketbase/          # Cliente e esquema de dados
│   │   ├── auth.tsx            # Contexto de autenticação
│   │   ├── i18n.tsx            # Textos em português e inglês
│   │   └── skipAi.ts           # Integração com o serviço de IA
│   ├── pages/                  # Telas da aplicação
│   └── services/               # Acesso a dados e conteúdo demonstrativo
├── pocketbase/
│   ├── hooks/                  # Endpoint do assistente
│   └── migrations/             # Coleções e dados de demonstração
├── package.json               # Dependências e comandos
└── vite.config.ts             # Configuração de desenvolvimento e build
```

</details>

<a id="execucao-local"></a>

## 💻 Executar localmente

### Pré-requisitos

- Node.js compatível com Vite 8. Recomenda-se Node.js **22.12 ou superior na linha 22**.
- npm.
- Uma instância de backend compatível e configurada para os recursos de dados, autenticação e IA.

### 1. Obtenha o código e instale as dependências

```bash
git clone https://github.com/SouBeatrizKaroline/AmazoniaHack_RastroVerde.git
cd AmazoniaHack_RastroVerde
npm install
```

### 2. Configure o backend

Crie um arquivo `.env.local` e defina `VITE_POCKETBASE_URL` com a URL da sua instância.

Para um backend local disponível na porta 8090, por exemplo:

```dotenv
VITE_POCKETBASE_URL=http://127.0.0.1:8090
```

A pasta `pocketbase/migrations` contém as definições e dados demonstrativos. O assistente utiliza a extensão `$ai` do ambiente Skip; uma instalação padrão do PocketBase, isoladamente, não fornece essa integração.

Variáveis com prefixo `VITE_` são incorporadas à interface. Use essa variável apenas para a URL pública do backend e mantenha credenciais privadas no servidor.

### 3. Inicie a interface

```bash
npm run dev
```

A configuração atual utiliza [http://localhost:8080](http://localhost:8080). Confira o endereço informado no terminal caso a porta esteja ocupada.

> Executar a interface não configura automaticamente o banco nem o assistente. As telas dependentes desses serviços exigem um backend disponível.

<details>
<summary><strong>⚙️ Ver comandos de desenvolvimento</strong></summary>

| Comando | Finalidade |
| :--- | :--- |
| `npm start` ou `npm run dev` | Iniciar o servidor de desenvolvimento. |
| `npm run build` | Gerar a versão de produção em `dist/`. |
| `npm run build:dev` | Gerar a versão de desenvolvimento em `dev-dist/`. |
| `npm run preview` | Visualizar o build localmente. |
| `npm run lint` | Analisar o código com Oxlint. |
| `npm run lint:fix` | Aplicar as correções automáticas disponíveis. |
| `npm run format` | Formatar arquivos com Oxfmt. |
| `npm run format:check` | Conferir a formatação. |

Os comandos `npm test` e `npm run test:watch` ainda não executam uma suíte de testes.

</details>

## 🤝 Contribuições

Sugestões e correções podem ser registradas nas [issues](https://github.com/SouBeatrizKaroline/AmazoniaHack_RastroVerde/issues). Ao propor uma alteração, descreva o problema, o comportamento esperado e como a mudança foi verificada.

Prioridades possíveis para evolução incluem testes automatizados, validação com equipes de campo e ampliação das integrações. São possibilidades de continuidade, sem compromisso de entrega definido.

<a id="equipe"></a>

## 👥 Equipe

Conforme os créditos apresentados na página **Sobre** da aplicação:

- Ana Karolina Cordeiro da Silva
- Beatriz Karoline Cordeiro da Silva
- Léo Matias Araújo
- Sonia Janara S. Barros

## 📚 Referências do projeto

Esta documentação foi elaborada a partir do próprio repositório:

- [Apresentação e proposta](src/pages/Index.tsx)
- [Contexto e equipe](src/pages/About.tsx)
- [Conteúdo demonstrativo das análises e minutas](src/services/draftReportFixtures.ts)
- [Camada de dados](src/services/dataService.ts)
- [Integração do assistente](pocketbase/hooks/rastroverde_ask.js)
- [Dependências e scripts](package.json)
- [Requisitos de ambiente do Vite](https://vite.dev/guide/)

**Licença:** o repositório não contém um arquivo `LICENSE` nesta revisão. As condições de reutilização precisam ser definidas pelos responsáveis.

---

<div align="center">

**🌿 RastroVerde**

Evidências organizadas. Lacunas visíveis. Relatórios com contexto.

[Explorar a solução](https://amazoniahack-rastroverde.vercel.app/) · [Assistir ao pitch](https://youtu.be/xsZVNQkDeMw)

</div>

---

<a id="english"></a>

<div align="center">

**[🇧🇷 Português](#portugues) · [🇬🇧 English](#english)**

# 🌿 RastroVerde

### From field evidence to environmental reports.

A platform to organize records, identify missing information, and support traceable environmental reporting.

**AmazôniaHack 4.0 · Challenge 1 · Environmental GovTech**

[![Explore the solution](https://img.shields.io/badge/EXPLORE-LIVE_DEMO-1B5E3A?style=for-the-badge)](https://amazoniahack-rastroverde.vercel.app/)
[![Watch the pitch](https://img.shields.io/badge/WATCH-VIDEO_PITCH-B91C1C?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/xsZVNQkDeMw)

[About](#about-en) · [Features](#features-en) · [Demo](#demo-en) · [Technology](#technology-en) · [Local setup](#setup-en) · [Team](#team-en)

</div>

---

<a id="about-en"></a>

## 🌱 What is RastroVerde?

**RastroVerde** connects evidence collected during environmental inspections to the information presented in a report. It brings scattered records together, makes them easier to consult, and shows the sources behind each statement while highlighting inconsistencies and information that still needs to be collected.

The project was developed for **Challenge 1 of AmazôniaHack 4.0**, focusing on support for field officers and environmental inspection teams, including municipal environmental departments.

> **The question behind the project:** what evidence supports this information?

### The problem

An inspection may produce photographs, audio recordings, notes, documents, and coordinates stored in different places. When those records lose their context, reconstructing events, checking discrepancies, and preparing a consistent report become harder.

### The approach

| Organize | Check | Document |
| :--- | :--- | :--- |
| Gather evidence and link it to an inspection. | Highlight discrepancies and missing information. | Support report drafts with references to their sources. |

The goal is to reduce information fragmentation and make technical review easier. These benefits describe the project's intended value; this documentation does not report measured impact.

<a id="features-en"></a>

## 🧭 From the field to a draft

**01 · Record** → **02 · Organize** → **03 · Check** → **04 · Complete** → **05 · Review**

| Step | How it appears in the project |
| :--- | :--- |
| 📍 **Inspections** | Inspection lists, registration, and detail pages with case context. |
| 📂 **Evidence center** | Organization of records, files, and information linked to an inspection. |
| 🔗 **Evidence connections** | A view of relationships between case records. |
| 🗺️ **Evidence map** | Visual representation of records on a demonstration grid. |
| 🔎 **Consistency checks** | Presentation of discrepancies and items requiring review. |
| 📋 **Missing information checklist** | Identification of pending information needed to complete documentation. |
| 📝 **Report draft** | Structured sections, evidence references, printing, and JSON export. |
| 💬 **Assistant** | Chat interface connected to an AI agent in the backend. |
| 🕓 **History** | Access to activities recorded in the system. |

These features are represented in the code. Parts of the workflow use prepared demonstration data and analyses; the existence of a screen does not establish that the feature has been validated in real operations.

<a id="demo-en"></a>

## ▶️ Explore the project

| Access | Link |
| :--- | :--- |
| 🌐 **Navigable solution** | [Open RastroVerde](https://amazoniahack-rastroverde.vercel.app/) |
| 🎬 **Video pitch** | [Watch the presentation on YouTube](https://youtu.be/xsZVNQkDeMw) |
| 💻 **Source code** | [Explore the repository](https://github.com/SouBeatrizKaroline/AmazoniaHack_RastroVerde) |

### Suggested walkthrough

1. Open the solution and select the option to explore the demonstration case.
2. Get to know **APA Setor Norte · RV-DEMO-001**.
3. Browse the evidence and observe the connections between records.
4. Explore the consistency checks and missing information checklist.
5. Open the draft and review how its statements relate to their sources.

The interface also includes a guided tour and Portuguese and English language options.

> **About the demo:** RV-DEMO-001 uses synthetic data. Names, coordinates, and documents in this demonstration must not be interpreted as records from a real inspection.

## 🔬 Scope and current stage

RastroVerde is a **hackathon demonstration prototype**, with a web interface, PocketBase data access, and backend code for an assistant integration.

| Item | Repository status |
| :--- | :--- |
| Interface and navigation | Pages for inspections, evidence, maps, checklists, reports, and the assistant. |
| Persistence | PocketBase data access layer and migrations for collections and demonstration data. |
| Reports and consistency | Demonstration content in `draftReportFixtures.ts`; this is not a validated automatic analysis of arbitrary files. |
| Map | Simulated georeferenced grid for demonstration. |
| AI assistant | Endpoint using the `rastroverde-assistant` agent; depends on service configuration and availability. |
| Export | JSON and browser printing, including save-to-PDF when available. |
| Government and geospatial integrations | Presented as future possibilities, without confirmed operational integrations. |
| Automated tests | Current test scripts only display a message stating that the project has no tests. |

### Information integrity

The tool supports the environmental officer's technical work. Human review remains necessary: a draft is not a final assessment, missing information must remain explicit, and discrepancies require investigation.

The proposed traceability does not constitute authenticity certification, legal compliance certification, or a guarantee of legal outcomes.

<a id="technology-en"></a>

## 🛠️ Technology

| Layer | Technologies |
| :--- | :--- |
| Interface | React 19, TypeScript, and React Router |
| Components and styling | Tailwind CSS, shadcn/ui, Radix UI, and Lucide |
| Forms | React Hook Form and Zod |
| Charts | Recharts |
| Data and authentication | PocketBase |
| Assistant | Backend integration with Skip AI |
| Development | Vite 8, Oxlint, and Oxfmt |
| Frontend hosting | Vercel |

### Project architecture

```text
React interface
    │
    ├── Pages and components
    ├── Data services ──► PocketBase
    ├── Demonstration content
    └── Assistant ──► Backend endpoint ──► AI agent
```

<details>
<summary><strong>📁 View folder structure</strong></summary>

```text
.
├── public/                     # Static files
├── src/
│   ├── components/             # Interface components
│   ├── hooks/                  # Shared hooks
│   ├── lib/
│   │   ├── pocketbase/          # Client and data schema
│   │   ├── auth.tsx            # Authentication context
│   │   ├── i18n.tsx            # Portuguese and English content
│   │   └── skipAi.ts           # AI service integration
│   ├── pages/                  # Application screens
│   └── services/               # Data access and demonstration content
├── pocketbase/
│   ├── hooks/                  # Assistant endpoint
│   └── migrations/             # Collections and demonstration data
├── package.json               # Dependencies and commands
└── vite.config.ts             # Development and build configuration
```

</details>

<a id="setup-en"></a>

## 💻 Run locally

### Prerequisites

- A Node.js version compatible with Vite 8. **Node.js 22.12 or later within the 22 release line** is recommended.
- npm.
- A compatible backend instance configured for data, authentication, and AI features.

### 1. Get the code and install dependencies

```bash
git clone https://github.com/SouBeatrizKaroline/AmazoniaHack_RastroVerde.git
cd AmazoniaHack_RastroVerde
npm install
```

### 2. Configure the backend

Create a `.env.local` file and set `VITE_POCKETBASE_URL` to your instance's URL.

For example, for a local backend available on port 8090:

```dotenv
VITE_POCKETBASE_URL=http://127.0.0.1:8090
```

The `pocketbase/migrations` folder contains definitions and demonstration data. The assistant uses the Skip environment's `$ai` extension; a standard PocketBase installation alone does not provide that integration.

Variables prefixed with `VITE_` are bundled into the frontend. Use this variable only for the public backend URL and keep private credentials on the server.

### 3. Start the interface

```bash
npm run dev
```

The current configuration uses [http://localhost:8080](http://localhost:8080). Check the terminal output for the actual address if the port is already in use.

> Starting the frontend does not automatically configure the database or assistant. Screens relying on those services require an available backend.

<details>
<summary><strong>⚙️ View development commands</strong></summary>

| Command | Purpose |
| :--- | :--- |
| `npm start` or `npm run dev` | Start the development server. |
| `npm run build` | Generate the production build in `dist/`. |
| `npm run build:dev` | Generate the development build in `dev-dist/`. |
| `npm run preview` | Preview the build locally. |
| `npm run lint` | Analyze the code with Oxlint. |
| `npm run lint:fix` | Apply available automatic fixes. |
| `npm run format` | Format files with Oxfmt. |
| `npm run format:check` | Check formatting. |

The `npm test` and `npm run test:watch` commands do not yet run a test suite.

</details>

## 🤝 Contributing

Suggestions and corrections can be submitted through [issues](https://github.com/SouBeatrizKaroline/AmazoniaHack_RastroVerde/issues). When proposing a change, describe the problem, the expected behavior, and how the change was verified.

Possible areas for further development include automated tests, validation with field teams, and additional integrations. These are opportunities for future work, without a defined delivery commitment.

<a id="team-en"></a>

## 👥 Team

As credited on the application's **About** page:

- Ana Karolina Cordeiro da Silva
- Beatriz Karoline Cordeiro da Silva
- Léo Matias Araújo
- Sonia Janara S. Barros

## 📚 Project references

This documentation is based on the repository itself:

- [Presentation and proposal](src/pages/Index.tsx)
- [Context and team](src/pages/About.tsx)
- [Demonstration analysis and draft content](src/services/draftReportFixtures.ts)
- [Data access layer](src/services/dataService.ts)
- [Assistant integration](pocketbase/hooks/rastroverde_ask.js)
- [Dependencies and scripts](package.json)
- [Vite environment requirements](https://vite.dev/guide/)

**License:** this repository does not contain a `LICENSE` file as of this revision. Reuse terms need to be defined by the project owners.

---

<div align="center">

**🌿 RastroVerde**

Organized evidence. Visible gaps. Reports with context.

[Explore the solution](https://amazoniahack-rastroverde.vercel.app/) · [Watch the pitch](https://youtu.be/xsZVNQkDeMw)

[↑ Português](#portugues) · [↑ English](#english)

</div>

