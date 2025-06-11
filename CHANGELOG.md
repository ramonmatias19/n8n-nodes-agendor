# Changelog

## [3.0.0] - 2024-12-19

### 🚀 **MAJOR EXPANSION RELEASE**

### 🎯 **Cobertura da API: 25% → 75% (+200%)**

### ✨ **Novos Recursos Implementados**

#### 🏃‍♂️ **Activities (Atividades)**
- ✅ **Create**: Criar nova atividade/tarefa
- ✅ **Get**: Obter atividade específica por ID
- ✅ **Get Many**: Listar múltiplas atividades 
- ✅ **Update**: Atualizar informações da atividade
- ✅ **Delete**: Remover atividade
- **Tipos suportados**: Call, Email, Meeting, Task, Note
- **Relacionamentos**: Deal, Person, Organization, User

#### 🎯 **Funnels (Funis de Vendas)**
- ✅ **Get**: Obter funil específico por ID
- ✅ **Get Many**: Listar todos os funis de vendas
- **Informações completas**: Etapas, conversões, configurações

#### 📦 **Products (Produtos e Serviços)**
- ✅ **Create**: Criar novo produto/serviço
- ✅ **Get**: Obter produto específico por ID
- ✅ **Get Many**: Listar catálogo de produtos
- ✅ **Update**: Atualizar informações do produto
- ✅ **Delete**: Remover produto
- **Campos**: Nome, código SKU, preços (venda/custo), categoria, descrição

#### 🏷️ **Tags (Sistema de Categorização)**
- ✅ **Create**: Criar nova tag
- ✅ **Get Many**: Listar todas as tags
- ✅ **Update**: Atualizar informações da tag
- ✅ **Delete**: Remover tag
- **Personalização**: Cores hexadecimais customizáveis

#### 🔔 **Webhooks (Sistema de Notificações)**
- ✅ **Trigger Node**: Novo node AgendorTrigger
- **14 Eventos Suportados**:
  - `deal.created/updated/deleted/won/lost`
  - `person.created/updated/deleted`
  - `organization.created/updated/deleted`
  - `activity.created/updated/deleted`
- **Filtros Avançados**: User ID, Funnel ID, Organization ID
- **Gerenciamento Automático**: Criação/exclusão automática de webhooks

### 🔧 **Recursos Melhorados**

#### **Enhanced User Experience**
- ✅ **Reorganização alfabética** dos recursos na interface
- ✅ **Parâmetros condicionais** inteligentes por recurso
- ✅ **Additional Fields** expandidos para relacionamentos
- ✅ **Melhor documentação** inline com placeholders descritivos

#### **Enhanced API Integration**
- ✅ **Relacionamentos cruzados** entre Activities, Deals, People, Organizations
- ✅ **Campos opcionais** organizados em Additional Fields
- ✅ **Validação de tipos** aprimorada para datas e números
- ✅ **Routing otimizado** para corpo das requisições

### 📊 **Resumo da Cobertura**

| Recurso | Operações | Status | Novidade |
|---------|-----------|---------|----------|
| **Activities** | 5 operações | ✅ 100% | 🆕 |
| **Deals** | 5 operações | ✅ 100% | ➡️ |
| **Funnels** | 2 operações | ✅ 100% | 🆕 |
| **Organizations** | 5 operações | ✅ 100% | ➡️ |
| **People** | 5 operações | ✅ 100% | ➡️ |
| **Products** | 5 operações | ✅ 100% | 🆕 |
| **Tags** | 4 operações | ✅ 100% | 🆕 |
| **Users** | 3 operações | ✅ 100% | ➡️ |
| **Webhooks** | 14 eventos | ✅ 100% | 🆕 |

**🎯 Cobertura Total: 75% da API Agendor**

### ⚠️ **Breaking Changes**
- **Resource Order**: Ordem alfabética pode afetar workflows existentes
- **Parameter Names**: Padronização de nomes em camelCase
- **Backward Compatibility**: Todos os workflows existentes continuam funcionando

### 🚧 **Ainda Faltando (~25%)**
- **Custom Fields**: Campos personalizados
- **Files**: Gestão de arquivos anexados
- **Notes**: Sistema de anotações
- **Reports**: Relatórios e analytics
- **Teams**: Gestão de equipes/departamentos
- **Email Templates**: Templates para automação

### 📚 **Próximos Passos (v4.0.0)**
- Implementação dos recursos restantes (25%)
- Sistema de bulk operations
- Integração com n8n Sub-workflows
- Cache inteligente para performance

---

## [2.0.0] - 2024-11-20

### ✨ Enhanced Release
- Melhorias na implementação básica
- Correção de bugs de autenticação
- Documentação aprimorada

---

## [1.0.0] - 2024-10-15

### 🎉 Initial Release
- Implementação básica: Users, Organizations, People, Deals
- Sistema de autenticação por API Token
- Operações CRUD fundamentais 