# 🤖 Agents JS - Template para Agentes LangChain

Este projeto é um **template inicial** para trabalho com agentes inteligentes e ferramentas (tools) usando **LangChain** e **NestJS**. Com ele, você pode facilmente ajustar e criar novas tools para que a IA consiga consumir serviços/APIs internas e externas, tomando por si só a decisão de qual a melhor ferramenta para o contexto.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Principais Componentes](#principais-componentes)
- [Configuração](#configuração)
- [Como Usar](#como-usar)
- [Criando Novas Tools](#criando-novas-tools)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

## 🎯 Visão Geral

Este template fornece uma base sólida para construir agentes inteligentes que podem:

- **Processar perguntas** em linguagem natural
- **Escolher automaticamente** as ferramentas mais adequadas para cada contexto
- **Integrar APIs externas** (como Weather API no exemplo)
- **Expandir facilmente** com novas funcionalidades
- **Documentar automaticamente** endpoints via Swagger

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── config/           # Configurações da aplicação
│   ├── modules/          # Módulos organizados por domínio
│   │   ├── agents/       # Módulo principal dos agentes
│   │   │   ├── controller/   # Controllers REST
│   │   │   └── services/     # Lógica de negócio dos agentes
│   │   └── app.module.ts     # Módulo raiz da aplicação
│   ├── tools/            # Ferramentas disponíveis para os agentes
│   │   ├── weather/          # Exemplo: ferramentas de clima
│   │   └── tool.service.ts   # Serviço centralizador de tools
└── main.ts               # Ponto de entrada da aplicação
```

### 🔍 Detalhamento das Pastas

#### `/src/app/modules/agents/`
- **`controller/`**: Endpoints REST que recebem as perguntas dos usuários
- **`services/`**: Contém a lógica do agente LangChain, configuração do LLM e processamento das respostas

#### `/src/app/tools/`
- **`tool.service.ts`**: Centralizador que registra todas as ferramentas disponíveis
- **`weather/`**: Exemplo de implementação de ferramentas para consulta de clima
- Cada pasta representa um domínio de ferramentas (weather, database, external-apis, etc.)

#### `/src/app/config/`
- Configurações específicas da aplicação (variáveis de ambiente, etc.)

## 🧩 Principais Componentes

### 1. **AgentService** (`src/app/modules/agents/services/agents.service.ts`)
- Configura o modelo LLM (GPT-4.1-mini)
- Cria o agente ReAct
- Processa perguntas e retorna respostas contextualizadas

### 2. **Tools Service** (`src/app/tools/tool.service.ts`)
- Centraliza todas as ferramentas disponíveis
- Facilita a adição de novas tools
- Fornece interface única para o agente

### 3. **Tool Implementation** (exemplo: `cityForecast.tool.service.ts`)
- Implementa ferramentas específicas
- Define schema de entrada usando Zod
- Integra APIs externas

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Weather API Configuration (exemplo)
WEATHER_API_KEY=your_weather_api_key_here
WEATHER_API_URL_BASE=your_weather_api_url_base_here

# Server Configuration
PORT=3000
```

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run start:dev

# Executar em modo de produção
npm run start:prod
```

## 🚀 Como Usar

### 1. Fazendo uma Pergunta ao Agente

```bash
POST http://localhost:3000/agents/question
Content-Type: application/json

{
  "question": "Qual é o clima atual em São Paulo?"
}
```

### 2. Acessando a Documentação

- **Swagger UI**: `http://localhost:3000/reference`
- Documentação interativa com todos os endpoints disponíveis

## 🛠️ Criando Novas Tools

### Passo 1: Criar a Tool

Crie um novo arquivo em `/src/app/tools/[dominio]/[nome].tool.service.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { tool } from '@langchain/core/tools';

@Injectable()
export class MinhaNovaToolService {
  getTool() {
    return tool(
      async ({ parametro }) => {
        // Sua lógica aqui
        // Pode chamar APIs externas, banco de dados, etc.
        return { resultado: 'dados processados' };
      },
      {
        name: 'minha_nova_tool',
        description: 'Descrição clara do que a ferramenta faz',
        schema: z.object({
          parametro: z.string().describe('Descrição do parâmetro'),
        }),
      },
    );
  }
}
```

### Passo 2: Registrar no Tools Service

Adicione sua nova tool em `/src/app/tools/tool.service.ts`:

```typescript
import { MinhaNovaToolService } from './dominio/minhaNovaTool.service';

@Injectable()
export class Tools {
  constructor(
    // ... outras tools
    private readonly minhaNovaToolService: MinhaNovaToolService,
  ) {}

  getTools() {
    return [
      // ... outras tools
      this.minhaNovaToolService.getTool(),
    ];
  }
}
```

### Passo 3: Registrar no Módulo

Adicione no módulo apropriado para injeção de dependência.

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev          # Inicia com hot-reload
npm run start:debug        # Inicia em modo debug

# Produção
npm run build              # Compila o projeto
npm run start:prod         # Executa versão compilada

# Qualidade de Código
npm run lint               # Executa ESLint
npm run format             # Formata código com Prettier

# Testes
npm run test               # Executa testes unitários
npm run test:watch         # Executa testes em modo watch
npm run test:cov           # Executa testes com coverage
npm run test:e2e           # Executa testes end-to-end
```

## 🔧 Tecnologias Utilizadas

### Core
- **[NestJS](https://nestjs.com/)**: Framework Node.js robusto e escalável
- **[LangChain](https://langchain.com/)**: Framework para aplicações com LLM
- **[TypeScript](https://www.typescriptlang.org/)**: Superset tipado do JavaScript

### LLM & AI
- **[@langchain/openai](https://www.npmjs.com/package/@langchain/openai)**: Integração com OpenAI GPT
- **[@langchain/core](https://www.npmjs.com/package/@langchain/core)**: Funcionalidades core do LangChain
- **[@langchain/community](https://www.npmjs.com/package/@langchain/community)**: Tools e integrações da comunidade


## 🎯 Próximos Passos

1. **Adicione suas próprias tools** seguindo os exemplos de weather
2. **Integre com suas APIs internas** criando tools específicas
3. **Customize o prompt** do agente conforme sua necessidade
4. **Implemente autenticação** se necessário
5. **Adicione logging** e monitoramento
6. **Configure CI/CD** para deploy automatizado


---

**Desenvolvido com ❤️ usando LangChain + NestJS**
