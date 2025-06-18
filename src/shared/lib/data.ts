import type { Department, Report } from "@/modules/chat/types"

export const departments: Department[] = [
  {
    id: "dept-raportowanie",
    name: "Relatórios - Geral",
    description: "Relatórios e análises gerais para toda a organização",
    agents: [
      {
        id: "agent-raportowanie-general",
        name: "Assistente de Relatórios",
        description: "Ajuda na criação e análise de relatórios gerais",
        conversations: [
          {
            id: "conv-raport-1",
            title: "Relatório Mensal",
            messages: [
              {
                id: "msg-1",
                content: "Preciso preparar um relatório mensal para a diretoria. Quais dados devo incluir?",
                sender: "user",
                timestamp: "2025-03-20T10:30:00Z",
              },
              {
                id: "msg-2",
                content: "No relatório mensal para a diretoria, você deve incluir os seguintes elementos: resultados financeiros, indicadores-chave de desempenho (KPI), progresso na implementação de projetos estratégicos e análise de mercado.",
                sender: "ai",
                timestamp: "2025-03-20T10:30:15Z",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dept-kontroling",
    name: "Controle/Relatórios Cíclicos",
    description: "Relatórios cíclicos enviados pelo controle",
    agents: [
      {
        id: "agent-kontroling",
        name: "Agente Financeiro",
        description: "Ajuda na preparação e análise de relatórios de controle",
        conversations: [
          {
            id: "conv-kontroling-1",
            title: "Relatório Semanal de Vendas",
            messages: [
              {
                id: "msg-3",
                content: "Como está nosso relatório semanal de vendas da última semana?",
                sender: "user",
                timestamp: "2025-03-22T14:15:00Z",
              },
              {
                id: "msg-4",
                content: "O relatório semanal de vendas da última semana mostra um aumento de 5% em comparação com a semana anterior. Os produtos da categoria A tiveram vendas particularmente boas.",
                sender: "ai",
                timestamp: "2025-03-22T14:15:30Z",
              },
              {
                id: "msg-5",
                content: "Você pode me mostrar o gráfico de vendas do último mês?",
                sender: "user",
                timestamp: "2025-03-22T14:16:00Z",
              },
              {
                id: "msg-6",
                content: "Claro, aqui está o gráfico de vendas do último mês:",
                sender: "ai",
                timestamp: "2025-03-22T14:17:00Z",
                chart: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dept-administracja",
    name: "Administração/TI",
    description: "Gerenciamento de recursos de TI e administrativos",
    agents: [
      {
        id: "agent-administracja",
        name: "Assistente Administrativo",
        description: "Ajuda em questões administrativas e de TI",
        conversations: [
          {
            id: "conv-admin-1",
            title: "Base de Equipamentos dos Funcionários",
            messages: [
              {
                id: "msg-7",
                content: "Preciso verificar quais equipamentos estão atribuídos a João Silva.",
                sender: "user",
                timestamp: "2025-03-15T11:20:00Z",
              },
              {
                id: "msg-8",
                content: "João Silva tem os seguintes equipamentos atribuídos: laptop Dell XPS 15, telefone iPhone 13, fones de ouvido Jabra, uniforme de trabalho (2 conjuntos).",
                sender: "ai",
                timestamp: "2025-03-15T11:21:00Z",
              },
            ],
          },
          {
            id: "conv-admin-2",
            title: "Disponibilidade de Salas de Reunião",
            messages: [
              {
                id: "msg-9",
                content: "A sala de reunião nº 3 está disponível na próxima terça-feira às 14:00?",
                sender: "user",
                timestamp: "2025-03-18T09:45:00Z",
              },
              {
                id: "msg-10",
                content: "Sim, a sala de reunião nº 3 está disponível na próxima terça-feira às 14:00. Você gostaria de reservá-la?",
                sender: "ai",
                timestamp: "2025-03-18T09:46:00Z",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dept-produkcja",
    name: "Produção",
    description: "Gerenciamento de processos produtivos",
    agents: [
      {
        id: "agent-produkcja-manager",
        name: "Gerente de Produção",
        description: "Ajuda no gerenciamento da produção e análise de eficiência",
        conversations: [
          {
            id: "conv-prod-1",
            title: "Relatório de Perdas de Produção",
            messages: [
              {
                id: "msg-11",
                content: "Preciso do relatório de perdas de produção do último mês por equipe.",
                sender: "user",
                timestamp: "2025-03-25T13:10:00Z",
              },
              {
                id: "msg-12",
                content: "Preparei o relatório de perdas de produção do último mês. A equipe A teve o menor nível de perdas (2,3%), enquanto a equipe C teve o maior (4,7%).",
                sender: "ai",
                timestamp: "2025-03-25T13:11:00Z",
              },
              {
                id: "msg-13",
                content: "Você pode me mostrar o relatório detalhado?",
                sender: "user",
                timestamp: "2025-03-25T13:12:00Z",
              },
              {
                id: "msg-14",
                content: "Claro, aqui está o relatório detalhado de perdas de produção:",
                sender: "ai",
                timestamp: "2025-03-25T13:13:00Z",
                report: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dept-planowanie",
    name: "Planejamento de Produção",
    description: "Planejamento e programação da produção",
    agents: [
      {
        id: "agent-planowanie",
        name: "Planejador de Produção",
        description: "Ajuda no planejamento e otimização da produção",
        conversations: [
          {
            id: "conv-plan-1",
            title: "MIN MAX PF",
            messages: [
              {
                id: "msg-15",
                content: "Preciso do relatório MIN MAX atual para produtos acabados.",
                sender: "user",
                timestamp: "2025-03-10T15:30:00Z",
              },
              {
                id: "msg-16",
                content: "Preparei o relatório MIN MAX atual para produtos acabados. Temos 5 produtos abaixo do nível mínimo de estoque que requerem produção imediata.",
                sender: "ai",
                timestamp: "2025-03-10T15:31:00Z",
              },
            ],
          },
          {
            id: "conv-plan-2",
            title: "OEE das Máquinas",
            messages: [
              {
                id: "msg-17",
                content: "Qual é o indicador OEE atual para a linha de produção nº 2?",
                sender: "user",
                timestamp: "2025-03-12T11:20:00Z",
              },
              {
                id: "msg-18",
                content: "O indicador OEE atual para a linha de produção nº 2 é de 78,3%. Isso representa um aumento de 2,1 pontos percentuais em comparação com o mês anterior.",
                sender: "ai",
                timestamp: "2025-03-12T11:21:00Z",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dept-infrastruktura",
    name: "Infraestrutura",
    description: "Gerenciamento da infraestrutura da fábrica",
    agents: [
      {
        id: "agent-infrastruktura",
        name: "Especialista em Infraestrutura",
        description: "Ajuda no gerenciamento da infraestrutura e manutenção",
        conversations: [
          {
            id: "conv-infra-1",
            title: "Cronograma de inspeções",
            messages: [
              {
                id: "msg-19",
                content: "Quando está programada a próxima inspeção da linha de produção nº 3?",
                sender: "user",
                timestamp: "2025-03-05T10:00:00Z",
              },
              {
                id: "msg-20",
                content:
                  "A próxima inspeção da linha de produção nº 3 está programada para 15 de abril de 2025. Será uma inspeção trimestral que durará aproximadamente 8 horas.",
                sender: "ai",
                timestamp: "2025-03-05T10:01:00Z",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dept-kadry",
    name: "RH e Folha de Pagamento",
    description: "Gestão de recursos humanos e folha de pagamento",
    agents: [
      {
        id: "agent-kadry",
        name: "Especialista em RH",
        description: "Ajuda em questões de RH e folha de pagamento",
        conversations: [
          {
            id: "conv-hr-1",
            title: "Escala de produção",
            messages: [
              {
                id: "msg-21",
                content: "Preciso da escala de produção para abril para a equipe B.",
                sender: "user",
                timestamp: "2025-03-28T09:15:00Z",
              },
              {
                id: "msg-22",
                content:
                  "Preparei a escala de produção para abril para a equipe B. A equipe trabalha em um sistema de 4 turnos, de acordo com o cronograma de turnos.",
                sender: "ai",
                timestamp: "2025-03-28T09:16:00Z",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dept-zakupy",
    name: "Compras",
    description: "Gestão de compras e fornecedores",
    agents: [
      {
        id: "agent-zakupy",
        name: "Especialista em Compras",
        description: "Ajuda na gestão de compras e relacionamento com fornecedores",
        conversations: [
          {
            id: "conv-zakupy-1",
            title: "Avaliação de fornecedores",
            messages: [
              {
                id: "msg-23",
                content: "Preciso do relatório de avaliação de fornecedores do último trimestre.",
                sender: "user",
                timestamp: "2025-03-14T13:45:00Z",
              },
              {
                id: "msg-24",
                content:
                  "Preparei o relatório de avaliação de fornecedores do último trimestre. O fornecedor XYZ foi o mais bem avaliado (92 pontos), e o fornecedor ABC o pior (68 pontos).",
                sender: "ai",
                timestamp: "2025-03-14T13:46:00Z",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dept-jakosc",
    name: "Qualidade",
    description: "Controle e garantia de qualidade",
    agents: [
      {
        id: "agent-jakosc",
        name: "Especialista em Qualidade",
        description: "Ajuda na gestão de qualidade e reclamações",
        conversations: [
          {
            id: "conv-jakosc-1",
            title: "Reclamações de clientes",
            messages: [
              {
                id: "msg-25",
                content: "Quantas reclamações de clientes recebemos este mês?",
                sender: "user",
                timestamp: "2025-03-19T10:30:00Z",
              },
              {
                id: "msg-26",
                content:
                  "Este mês recebemos 12 reclamações de clientes. Isso representa uma redução de 25% em comparação com o mês anterior.",
                sender: "ai",
                timestamp: "2025-03-19T10:31:00Z",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dept-sprzedaz",
    name: "Vendas",
    description: "Gestão de vendas e relacionamento com clientes",
    agents: [
      {
        id: "agent-sprzedaz",
        name: "Gerente de Vendas",
        description: "Ajuda na gestão de vendas e análise de mercado",
        conversations: [
          {
            id: "conv-sprzedaz-1",
            title: "Desempenho mensal",
            messages: [
              {
                id: "msg-27",
                content: "Qual é o desempenho acumulado do plano de vendas este mês?",
                sender: "user",
                timestamp: "2025-03-26T14:00:00Z",
              },
              {
                id: "msg-28",
                content:
                  "O desempenho acumulado do plano de vendas este mês é de 87,5%. A melhor performance foi da equipe KAM responsável pela rede Alfa (112% do plano).",
                sender: "ai",
                timestamp: "2025-03-26T14:01:00Z",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dept-ksiegowosc",
    name: "Contabilidade",
    description: "Gestão financeira e contábil",
    agents: [
      {
        id: "agent-ksiegowosc",
        name: "Contador Chefe",
        description: "Ajuda em questões contábeis e financeiras",
        conversations: [
          {
            id: "conv-ksieg-1",
            title: "Demonstração de resultados",
            messages: [
              {
                id: "msg-29",
                content: "Preciso da demonstração de resultados do primeiro trimestre de 2025.",
                sender: "user",
                timestamp: "2025-04-02T09:30:00Z",
              },
              {
                id: "msg-30",
                content:
                  "Preparei a demonstração de resultados do primeiro trimestre de 2025. O resultado financeiro líquido é de 2,3 milhões de reais, representando um crescimento de 15% em comparação com o mesmo período do ano anterior.",
                sender: "ai",
                timestamp: "2025-04-02T09:31:00Z",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dept-zarzad",
    name: "Diretoria",
    description: "Suporte à diretoria e gestão executiva",
    agents: [
      {
        id: "agent-zarzad",
        name: "Assistente da Diretoria",
        description: "Ajuda na preparação de análises e relatórios para a diretoria",
        conversations: [
          {
            id: "conv-zarzad-1",
            title: "Orçamento anual",
            messages: [
              {
                id: "msg-31",
                content: "Preciso da comparação do desempenho orçamentário com o plano do primeiro trimestre.",
                sender: "user",
                timestamp: "2025-04-05T11:00:00Z",
              },
              {
                id: "msg-32",
                content:
                  "Preparei a comparação do desempenho orçamentário com o plano do primeiro trimestre. As receitas estão em 103% do plano, os custos em 98% do plano, resultando em um desempenho financeiro de 115% do plano.",
                sender: "ai",
                timestamp: "2025-04-05T11:01:00Z",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dept-marketing",
    name: "Marketing",
    description: "Gestão de marketing e promoção",
    agents: [
      {
        id: "agent-marketing",
        name: "Especialista em Marketing",
        description: "Ajuda na gestão de campanhas de marketing",
        conversations: [
          {
            id: "conv-marketing-1",
            title: "Análise de campanha",
            messages: [
              {
                id: "msg-33",
                content: "Quais são os resultados da última campanha publicitária no Facebook?",
                sender: "user",
                timestamp: "2025-03-17T13:15:00Z",
              },
              {
                id: "msg-34",
                content:
                  "A última campanha publicitária no Facebook alcançou 120.000 usuários, com CTR de 2,8% e taxa de conversão de 3,2%. O ROI da campanha foi de 215%.",
                sender: "ai",
                timestamp: "2025-03-17T13:16:00Z",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dept-logistica",
    name: "Logística/armazém",
    description: "Gestão de logística e armazém",
    agents: [
      {
        id: "agent-logistica",
        name: "Gerente de logística",
        description: "Ajuda na gestão de logística e armazém",
        conversations: [
          {
            id: "conv-logistica-1",
            title: "Ocupação das docas",
            messages: [
              {
                id: "msg-35",
                content: "Qual é a ocupação das docas de carregamento para amanhã?",
                sender: "user",
                timestamp: "2025-03-21T15:45:00Z",
              },
              {
                id: "msg-36",
                content:
                  "A ocupação das docas de carregamento para amanhã é de 85%. A maior ocupação está entre 10:00-14:00, onde todas as docas estão ocupadas. Os horários disponíveis são 8:00-9:00 e 15:00-17:00.",
                sender: "ai",
                timestamp: "2025-03-21T15:46:00Z",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dept-desenvolvimento",
    name: "Desenvolvimento organizacional",
    description: "Desenvolvimento e aprimoramento organizacional",
    agents: [
      {
        id: "agent-desenvolvimento",
        name: "Especialista em desenvolvimento",
        description: "Ajuda no desenvolvimento organizacional e processos",
        conversations: [
          {
            id: "conv-desenvolvimento-1",
            title: "Instruções técnicas",
            messages: [
              {
                id: "msg-37",
                content: "Preciso das instruções para troca de peças na máquina de embalagem XYZ.",
                sender: "user",
                timestamp: "2025-03-24T09:00:00Z",
              },
              {
                id: "msg-38",
                content:
                  "Preparei as instruções para troca de peças na máquina de embalagem XYZ. O procedimento consiste em 8 etapas e requer as seguintes ferramentas: chave allen 5mm, chave de fenda cruzada, chave plana 10mm.",
                sender: "ai",
                timestamp: "2025-03-24T09:01:00Z",
              },
            ],
          },
        ],
      },
    ],
  },
]

export const reports: Report[] = [
  {
    id: "report-1",
    title: "Relatório de perdas de produção - Março 2025",
    date: "2025-03-31",
    author: "Gerente de produção",
    category: "Produção",
    department: "Produção",
    type: "table",
    description: "Relatório detalhado de perdas de produção por equipes",
  },
  {
    id: "report-2",
    title: "Análise de vendas Q1 2025",
    date: "2025-04-05",
    author: "Gerente de vendas",
    category: "Vendas",
    department: "Vendas",
    type: "chart",
    description: "Análise dos resultados de vendas do primeiro trimestre de 2025",
  },
  {
    id: "report-3",
    title: "Cronograma de manutenção de máquinas - Q2 2025",
    date: "2025-03-25",
    author: "Especialista em infraestrutura",
    category: "Manutenção",
    department: "Infraestrutura",
    type: "maintenance",
    description: "Cronograma de manutenção de máquinas para o segundo trimestre de 2025",
  },
  {
    id: "report-4",
    title: "Relatório MIN MAX de produtos acabados",
    date: "2025-04-01",
    author: "Planejador de produção",
    category: "Planejamento",
    department: "Planejamento de produção",
    type: "table",
    description: "Situação atual do estoque de produtos acabados em relação aos níveis MIN MAX",
  },
  {
    id: "report-5",
    title: "Indicadores OEE - Março 2025",
    date: "2025-04-02",
    author: "Planejador de produção",
    category: "Eficiência",
    department: "Planejamento de produção",
    type: "chart",
    description: "Indicadores OEE para todas as linhas de produção em março de 2025",
  },
  {
    id: "report-6",
    title: "Avaliação de fornecedores - Q1 2025",
    date: "2025-04-03",
    author: "Especialista em compras",
    category: "Compras",
    department: "Compras",
    type: "table",
    description: "Avaliação trimestral de fornecedores do primeiro trimestre de 2025",
  },
  {
    id: "report-7",
    title: "Análise de reclamações - Março 2025",
    date: "2025-04-01",
    author: "Especialista em qualidade",
    category: "Qualidade",
    department: "Qualidade",
    type: "chart",
    description: "Análise de reclamações de clientes em março de 2025",
  },
  {
    id: "report-8",
    title: "Demonstração de resultados - Q1 2025",
    date: "2025-04-10",
    author: "Contador chefe",
    category: "Finanças",
    department: "Contabilidade",
    type: "document",
    description: "Demonstração de resultados do primeiro trimestre de 2025",
  },
  {
    id: "report-9",
    title: "Execução orçamentária - Q1 2025",
    date: "2025-04-12",
    author: "Assistente de diretoria",
    category: "Orçamento",
    department: "Diretoria",
    type: "chart",
    description: "Comparação da execução orçamentária com o plano do primeiro trimestre de 2025",
  },
  {
    id: "report-10",
    title: "Resultados da campanha de marketing - Março 2025",
    date: "2025-04-05",
    author: "Especialista em marketing",
    category: "Marketing",
    department: "Marketing",
    type: "chart",
    description: "Resultados da campanha de marketing no Facebook em março de 2025",
  },
  {
    id: "report-11",
    title: "Ocupação das docas de carregamento - Abril 2025",
    date: "2025-03-31",
    author: "Gerente de logística",
    category: "Logística",
    department: "Logística/armazém",
    type: "table",
    description: "Cronograma de ocupação das docas de carregamento para abril de 2025",
  },
  {
    id: "report-12",
    title: "Base de equipamentos dos funcionários",
    date: "2025-04-01",
    author: "Assistente administrativo",
    category: "Administração",
    department: "Administração/IT",
    type: "table",
    description: "Base atual de equipamentos dos funcionários (telefones, computadores, uniformes)",
  },
  {
    id: "report-13",
    title: "Escala de produção - Abril 2025",
    date: "2025-03-28",
    author: "Especialista RH",
    category: "RH",
    department: "RH e folha de pagamento",
    type: "document",
    description: "Escala de produção para todas as equipes em abril de 2025",
  },
  {
    id: "report-14",
    title: "Instruções técnicas - Máquina de embalagem XYZ",
    date: "2025-03-24",
    author: "Especialista em desenvolvimento",
    category: "Desenvolvimento",
    department: "Desenvolvimento organizacional",
    type: "document",
    description: "Instruções técnicas para a máquina de embalagem XYZ",
  },
  {
    id: "report-15",
    title: "Relatório semanal de vendas - Semana 13/2025",
    date: "2025-03-30",
    author: "Agente financeiro",
    category: "Controlling",
    department: "Controlling/relatórios cíclicos",
    type: "chart",
    description: "Relatório semanal de vendas da semana 13 de 2025",
  },
]
