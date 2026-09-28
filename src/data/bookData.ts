export interface ChapterTable {
  headers: string[];
  rows: string[][];
}

export interface Callout {
  type: 'ATENCAO' | 'BOAS_PRATICAS';
  title: string;
  text: string;
}

export interface ChapterSection {
  title: string;
  content: string[]; // short paragraphs, bullet points
  codeSnippet?: string;
  table?: ChapterTable;
  callouts?: Callout[];
}

export interface Chapter {
  id: string; // 'cap-1', 'cap-2', ... 'apendice-a'
  number: number | string;
  title: string;
  subtitle: string;
  pages: string;
  punchline?: string;
  sections: ChapterSection[];
  generalCallouts?: Callout[];
}

export const BOOK_METADATA = {
  title: "Firewall Sem Ilusão",
  subtitle: "Guia Técnico Completo de NGFW — Do parafuso ao tráfego criptografado",
  author: "Mariana BS",
  role: "Cybersecurity Engineer",
  publisher: "Be Safe",
  year: "2026",
  finalQuote: {
    quote: "Firewall não falha sozinho. Sempre tem um humano ajudando.",
    author: "Mariana BS",
    role: "Cybersecurity Engineer | Be Safe | 2026"
  }
};

export const CHAPTERS: Chapter[] = [
  {
    id: "cap-1",
    number: 1,
    title: "Do Parafuso ao Tráfego",
    subtitle: "Hardware, throughput real, ASIC, NPU, memória",
    pages: "Págs. 3–6",
    punchline: "Se você confia no datasheet, o problema não é o firewall.",
    generalCallouts: [
      {
        type: "BOAS_PRATICAS",
        title: "BOAS PRÁTICAS: Diversidade Elétrica",
        text: "Nunca conecte as duas fontes no mesmo nobreak ou quadro elétrico. Redundância de fonte sem diversidade elétrica é cosmética."
      }
    ],
    sections: [
      {
        title: "Introdução",
        content: [
          "Antes de configurar qualquer regra, você precisa entender o que está debaixo do capô. Ignorar o hardware é o mesmo que tentar calibrar um motor sem saber quantos cilindros ele tem.",
          "Funciona até o momento em que não funciona, e esse momento costuma ser um domingo de madrugada."
        ]
      },
      {
        title: "1.1 Componentes Físicos de um NGFW",
        content: [
          "**1.1.1 CPU:** Responsável pelo plano de controle: gerenciamento, orquestração de políticas, processamento de protocolos de roteamento e tarefas que exigem lógica complexa. Em appliances de entrada, ela também cuida do plano de dados, o que é um problema.",
          "Em equipamentos modernos, a CPU principal é de arquitetura x86 ou ARM de alto desempenho. O que importa não é o número de núcleos no papel, mas como o SO do fabricante distribui as tarefas. Um NGFW mal otimizado pode ter 32 núcleos e saturar com 500 Mbps de tráfego inspecionado."
        ],
        callouts: [
          {
            type: "ATENCAO",
            title: "ATENÇÃO: Overhead de Interrupções em CPU",
            text: "CPUs de propósito geral processam pacotes com overhead significativo de interrupções de sistema. Sem offload para ASIC ou NPU, o throughput real despenca com features ativas."
          }
        ]
      },
      {
        title: "1.1.2 ASIC & 1.1.3 NPU",
        content: [
          "**1.1.2 ASIC (Application-Specific Integrated Circuit):** Pode existir ou não. Desenvolvido especificamente para o fabricante, processa determinadas operações em hardware com latência em microssegundos sem consumir ciclos da CPU.",
          "• Funções tipicamente offloadadas para ASIC: lookup de tabela de sessão, forwarding de pacotes L2/L3, aceleração de IPsec e SSL/TLS, inspeção de padrão em fluxo e gerenciamento de filas de QoS.",
          "• O problema do ASIC: é específico de fabricante e não atualizável por software. Se uma nova técnica de ataque não foi contemplada no design do chip, ela não será acelerada e pode nem ser inspecionada corretamente.",
          "**1.1.3 NPU (Network Processing Unit):** Processador programável especializado em operações de rede. Diferente do ASIC fixo, o NPU pode ser atualizado via firmware para suportar novos protocolos ou otimizações. É o meio-termo entre a rigidez do ASIC e a lentidão da CPU de propósito geral.",
          "• Em arquiteturas modernas, NPU e ASIC coexistem: o ASIC cuida do caminho quente (fast path) para tráfego já classificado, e o NPU gerencia sessões novas, exceções e tráfego que precisa de inspeção mais profunda."
        ]
      },
      {
        title: "1.1.4 Memória e Tabela de Estado",
        content: [
          "A tabela de sessão (state table ou session table) é o coração do firewall stateful. Cada conexão ativa ocupa um registro nessa tabela. A memória disponível para ela determina quantas sessões simultâneas o equipamento suporta."
        ],
        table: {
          headers: ["Componente", "Função"],
          rows: [
            ["Session Table", "Armazena o estado de todas as conexões ativas (TCP established, UDP pseudo-state, etc.)"],
            ["Connection Rate", "Quantas novas sessões por segundo o sistema consegue criar (CPS — Connections Per Second)"],
            ["RAM do Sistema", "Memória para o SO, políticas, logs em buffer e processos de controle"],
            ["Flash/SSD", "Armazenamento de configuração, firmware, logs locais e pacotes de atualização"]
          ]
        },
        callouts: [
          {
            type: "ATENCAO",
            title: "ATENÇÃO: Esgotamento da Tabela de Sessão (DoS)",
            text: "Tabela de estado cheia é um dos vetores de DoS mais eficientes contra firewall. Um atacante não precisa explorar falha de código — basta gerar sessões suficientes para lotar a tabela e derrubar conexões legítimas."
          }
        ]
      },
      {
        title: "1.1.5 Interfaces de Rede, Backplane e Alimentação",
        content: [
          "Interfaces físicas e suas aplicações típicas no ambiente de segurança:"
        ],
        table: {
          headers: ["Tipo", "Uso Típico"],
          rows: [
            ["RJ45 1G", "Cobre — para segmentos de acesso, gerenciamento out-of-band ou conexões legadas"],
            ["SFP 1G", "Fibra ou cobre via transceiver intercambiável. Flexível para diferentes meios físicos"],
            ["SFP+ 10G", "Alta velocidade para uplinks, segmentos de servidor ou interconexão de appliances"],
            ["QSFP 40G", "Para data centers de alto desempenho ou backbones corporativos"],
            ["QSFP28 100G+", "Para ambientes de altíssima demanda. Raramente justificado fora de grandes DCs"]
          ]
        }
      },
      {
        title: "1.1.6 Backplane e 1.1.7 Fonte de Alimentação Redundante",
        content: [
          "**1.1.6 Backplane:** O backplane é o barramento interno que interliga os componentes do chassis. Em appliances de módulo expansível, o backplane determina quanto tráfego pode transitar internamente entre módulos sem se tornar um gargalo.",
          "Backplane saturado é um problema real em deployments onde múltiplos módulos de alta throughput estão instalados. O número bonito do datasheet é de um módulo isolado. Com todos os módulos ativos e tráfego cruzado, a história é diferente.",
          "**1.1.7 Fonte de Alimentação Redundante:** Fontes redundantes em configuração 1+1 ou N+1 são requisito mínimo para ambiente de produção. A fonte em standby assume instantaneamente em caso de falha sem interrupção de serviço."
        ]
      },
      {
        title: "1.2 Throughput Real vs. Throughput de Marketing",
        content: [
          "Este é o tema que mais causa mal-entendido em projetos de segurança. O número estampado na caixa, no datasheet e no pitch do vendedor é medido em condições ideais que não existem em produção.",
          "O throughput de marketing é medido com: **pacotes UDP de 1518 bytes** (tamanho máximo de frame Ethernet), sem inspeção de conteúdo, sem features ativadas, com regras mínimas e em temperatura de laboratório controlada.",
          "Na sua rede real, o tráfego é: uma mistura de tamanhos de pacote (muitos pequenos, para aplicações interativas), tráfego TCP com retransmissões, tráfego HTTPS que exige inspeção TLS, aplicações que o firewall precisa classificar, usuários que precisam ser identificados e ameaças que precisam ser detectadas."
        ],
        table: {
          headers: ["Métrica", "O que realmente mede"],
          rows: [
            ["Firewall Throughput", "Throughput bruto L3/L4 sem inspeção de conteúdo"],
            ["NGFW Throughput", "Com App-ID e User-ID ativos, sem TLS inspection"],
            ["Threat Prevention Throughput", "Com IPS, anti-malware e App/User ativos"],
            ["TLS Inspection Throughput", "Com decriptografia e reinspeção de tráfego HTTPS"],
            ["IPsec VPN Throughput", "Para tráfego de túnel site-to-site ou client-to-site"]
          ]
        },
        callouts: [
          {
            type: "ATENCAO",
            title: "ATENÇÃO: Regra Prática de Dimensionamento Realista",
            text: "Regra prática: divida o throughput de marketing por 3 a 5 para obter estimativa realista com features de segurança ativas. Em ambientes com alto volume de TLS, divida por 5 a 10."
          }
        ]
      },
      {
        title: "1.3 PPS (Packets Per Second) e 1.4 Latência",
        content: [
          "**1.3 PPS — Packets Per Second:** Mede quantos pacotes o firewall processa por segundo, independente do tamanho. A relação com throughput depende do tamanho médio dos pacotes.",
          "• Exemplo crítico: 10 Gbps com pacotes de 64 bytes exige **14,8 milhões de PPS**. O mesmo 10 Gbps com pacotes de 1500 bytes exige apenas **833 mil PPS**.",
          "• Ambientes de jogos online, VoIP e aplicações interativas geram predominantemente pacotes pequenos — o limite de PPS pode ser atingido muito antes do limite de throughput em bits.",
          "**1.4 Latência:** É o tempo adicional que o equipamento insere no caminho do pacote. Para a maioria das aplicações corporativas, microssegundos de latência adicional são irrelevantes.",
          "• Exceções reais: aplicações de trading de alta frequência, sistemas de automação industrial com requisitos de tempo real, VoIP e videoconferência (sensíveis a jitter, não apenas a latência), e protocolos industriais como PROFINET ou EtherNet/IP.",
          "• Varia de menos de 100 microssegundos em appliances de alto desempenho com tráfego simples, até dezenas de milissegundos quando TLS inspection e sandboxing estão ativos em hold-mode."
        ]
      },
      {
        title: "1.5 Impacto Real das Features no Throughput",
        content: [
          "Impacto percentual cumulativo que cada feature ativa exerce sobre o desempenho do equipamento:"
        ],
        table: {
          headers: ["Feature", "Impacto no Throughput"],
          rows: [
            ["Stateful Inspection básico", "Referência — impacto mínimo"],
            ["App-ID / DPI", "Redução típica de 20% a 40% do throughput baseline"],
            ["User-ID", "Overhead de lookup em diretório; impacto menor em throughput, maior em latência de novos fluxos"],
            ["IPS/IDS", "Redução de 30% a 60% dependendo do conjunto de assinaturas ativas"],
            ["Antivírus em stream", "Redução de 20% a 40% adicional sobre o IPS"],
            ["TLS Inspection", "Redução de 50% a 80% do throughput. O maior impacto de todos."],
            ["Sandboxing inline", "Pode adicionar segundos de latência em modo blocking (hold-mode)"]
          ]
        },
        callouts: [
          {
            type: "ATENCAO",
            title: "ATENÇÃO: O Perigo da Sobrecarga sem Dimensionamento",
            text: "Ativar todas as features sem dimensionar corretamente é a forma mais cara de criar um novo gargalo de rede. O firewall novo será o problema em vez da solução."
          }
        ]
      }
    ]
  },
  {
    id: "cap-2",
    number: 2,
    title: "Fundamentos de Redes sem Fantasia",
    subtitle: "TCP/IP, stateful, NAT, sessões, falhas reais",
    pages: "Págs. 7–9",
    punchline: "Você não precisa virar especialista em redes para operar firewall. Precisa entender o suficiente para não criar problemas que não existiam antes da sua intervenção.",
    sections: [
      {
        title: "2.1 TCP/IP na Prática",
        content: [
          "**2.1.1 O Modelo de Camadas na Vida Real:** O modelo OSI tem 7 camadas. Na prática, o que importa para firewall é: **L2** (Ethernet, MAC), **L3** (IP, roteamento), **L4** (TCP/UDP/ICMP, portas) e **L7** (aplicação, conteúdo).",
          "O NGFW opera em todas essas camadas simultaneamente. É exatamente isso que o diferencia de um filtro de pacotes simples que só enxerga L3/L4.",
          "**2.1.2 TCP Three-Way Handshake e por Que Importa:** O handshake TCP (SYN → SYN-ACK → ACK) estabelece conexões confiáveis. Para o firewall stateful, ele marca o início de uma sessão rastreada até seu encerramento (FIN/RST) ou timeout."
        ],
        codeSnippet: `Cliente                     Firewall                     Servidor
   |---SYN-------------------->|---SYN-------------------->|  # Sessão criada na tabela de estado
   |<--SYN-ACK-----------------|<--SYN-ACK-----------------|  # Estado: SYN_SENT -> ESTABLISHED
   |---ACK-------------------->|---ACK-------------------->|  # Sessão ESTABLISHED
   |                           |                           |
   |   [dados]                 |   [dados]                 |  # Inspeção de conteúdo em fluxo
   |                           |                           |
   |---FIN-------------------->|---FIN-------------------->|  # Início de encerramento
   |<--FIN-ACK-----------------|<--FIN-ACK-----------------|  # Estado: FIN_WAIT
   |---ACK-------------------->|---ACK-------------------->|  # Sessão removida da tabela`
      },
      {
        title: "2.1.3 UDP e o Pseudo-Estado",
        content: [
          "UDP é sem conexão por natureza. O firewall não tem um handshake para identificar início e fim.",
          "Para rastrear UDP, o firewall mantém um **pseudo-estado** baseado na 4-tupla: **IP de origem, IP de destino, porta de origem e porta de destino**.",
          "Se nenhum pacote for visto nessa tupla por X segundos (timeout configurável), a entrada é removida da tabela. Timeout muito curto quebra aplicações UDP longas. Timeout muito longo desperdiça entradas na tabela."
        ]
      },
      {
        title: "2.2 Stateful Inspection",
        content: [
          "Stateful inspection é a capacidade de rastrear o estado de conexões e tomar decisões de política com base nesse estado, não apenas nas características do pacote individual.",
          "Um firewall stateless aplica regras pacote a pacote. Se a regra diz 'permite TCP porta 80 de qualquer origem', todos os pacotes correspondentes são permitidos, incluindo respostas forjadas.",
          "O firewall stateful valida que o pacote de retorno corresponde a uma sessão estabelecida legitimamente."
        ],
        table: {
          headers: ["Estado", "Descrição"],
          rows: [
            ["NEW", "Primeiro pacote de uma conexão (SYN para TCP)"],
            ["ESTABLISHED", "Conexão estabelecida; pacotes subsequentes reconhecidos"],
            ["RELATED", "Conexão relacionada a uma já estabelecida (ex.: canal de dados do FTP, erro ICMP)"],
            ["INVALID", "Pacotes que não correspondem a nenhuma sessão conhecida"]
          ]
        }
      },
      {
        title: "2.3 NAT — Network Address Translation",
        content: [
          "NAT traduz endereços IP (e portas, no caso de PAT/NAPT) entre zonas. Tipos principais:",
          "• **Source NAT (SNAT / Masquerade):** traduz o IP de origem. Usado para saída de redes privadas para a internet.",
          "• **Destination NAT (DNAT):** traduz o IP de destino. Usado para publicar serviços internos com IP público.",
          "• **PAT / NAPT:** traduz IP e porta simultaneamente, permitindo que múltiplos hosts compartilhem um único IP público.",
          "• **NAT 1-para-1 (Static NAT):** mapeamento fixo entre IP privado e público. Usado tipicamente para servidores."
        ],
        callouts: [
          {
            type: "ATENCAO",
            title: "ATENÇÃO: NAT Não É Segurança",
            text: "NAT não é segurança. NAT é tradução de endereço. O fato de um serviço não ter IP público direto não o protege se o DNAT estiver mal configurado ou se existir um caminho alternativo."
          }
        ]
      },
      {
        title: "2.4 Problemas Reais na Operação",
        content: [
          "**2.4.1 Tabela de Estado Cheia:**",
          "• Sintomas: conexões novas recusadas ou descartadas silenciosamente; usuários não conseguem abrir novas sessões; serviços existentes funcionam enquanto novas conexões falham.",
          "• Causas comuns: ataque de SYN flood, aplicação com vazamento de conexões (não fecha sessões corretamente), timeout de sessão muito longo e crescimento orgânico não previsto no dimensionamento.",
          "• Diagnóstico: verifique a ocupação da tabela de sessões em tempo real, correlacione com a taxa de novas conexões por segundo e identifique os maiores consumidores de sessões.",
          "**2.4.2 SYN Flood:**",
          "• Ataque clássico de DoS onde o atacante envia volumes massivos de pacotes SYN sem completar o handshake, lotando a tabela de half-open connections.",
          "• Mitigação: SYN cookies no firewall (o firewall responde ao cliente e só cria estado completo após receber o ACK), rate limiting de SYN por origem, validação de origem com challenge e bloqueio geográfico quando aplicável.",
          "**2.4.3 Timeout Mal Configurado:**",
          "• Timeouts muito agressivos: conexões legítimas de aplicações que ficam ociosas por longos períodos (banco de dados, aplicações legadas, conexões keep-alive) são encerradas pelo firewall. A aplicação envia dados pela sessão 'morta' e recebe RST ou simplesmente silêncio.",
          "• Timeouts muito permissivos: sessões zumbi consomem espaço na tabela indefinidamente."
        ],
        table: {
          headers: ["Tipo de Sessão", "Timeout Recomendado"],
          rows: [
            ["TCP Established", "1800 a 3600 segundos (comum). Ajuste para aplicações com sessões longas."],
            ["TCP Half-Open", "10 a 30 segundos. Mais curto previne SYN flood; mais longo aceita redes com alta latência."],
            ["UDP", "30 a 300 segundos dependendo da aplicação. DNS: 30 s. Streaming: 300 s ou mais."],
            ["ICMP", "10 a 30 segundos."]
          ]
        }
      }
    ]
  },
  {
    id: "cap-3",
    number: 3,
    title: "O que Define um NGFW em 2026",
    subtitle: "DPI, IPS, App Awareness, TLS, Sandboxing",
    pages: "Págs. 10–12",
    punchline: "Sem inspeção TLS, não é NGFW. É firewall com roupagem nova. Firewall sem inspeção TLS hoje é só um roteador caro com autoestima.",
    sections: [
      {
        title: "3.1 Diferença Real entre Firewall Tradicional e NGFW",
        content: [
          "O termo NGFW surgiu há mais de uma década e foi imediatamente sequestrado pelo marketing. Hoje, qualquer firewall com interface gráfica decente e um IPS de geração anterior se autointitula NGFW.",
          "Comparativo de evolução geracional:"
        ],
        table: {
          headers: ["Geração", "Característica"],
          rows: [
            ["Filtro de pacotes", "Avalia campos de cabeçalho IP/TCP/UDP. Sem estado. Rápido, sem visibilidade de conteúdo."],
            ["Stateful Firewall", "Rastreia estado de conexões. Decisões baseadas em fluxo, não em pacote individual."],
            ["Firewall com IPS parafusado", "Stateful + IPS externo ou integrado superficialmente. Gestão separada, política desconexa."],
            ["NGFW real", "Inspeção integrada de L2 a L7, App-ID, User-ID, IPS nativo, TLS inspection, sandboxing e threat intel em tempo real."]
          ]
        }
      },
      {
        title: "3.2 Features Obrigatórias de um NGFW em 2026",
        content: [
          "**3.2.1 DPI — Deep Packet Inspection:**",
          "• DPI vai além dos cabeçalhos. Inspeciona o conteúdo do payload para identificar aplicações, detectar anomalias e identificar conteúdo malicioso. É o fundamento de todas as outras capacidades do NGFW.",
          "• Sem DPI, o firewall só vê que um pacote saiu da porta 443 para um IP externo. Com DPI, ele vê que é uma sessão TLS que encapsula tráfego do serviço de armazenamento em nuvem, originada pelo usuário 'joao.silva', com arquivo de 50 MB sendo enviado para fora da empresa.",
          "**3.2.2 IPS/IDS — Intrusion Prevention System:**",
          "• IPS analisa o conteúdo do tráfego em busca de padrões conhecidos de ataques, exploits e comportamentos anômalos. IDS detecta e alerta. IPS detecta, alerta e bloqueia.",
          "• Em 2026, IPS sem atualização automática de assinaturas em tempo real é praticamente inútil. O gap entre a publicação de um exploit e seu uso em ataques in-the-wild caiu de semanas para horas. Assinaturas com semanas de atraso não protegem."
        ],
        callouts: [
          {
            type: "ATENCAO",
            title: "ATENÇÃO: O Erro do IPS em 'Detect Only'",
            text: "IPS rodando em modo 'detect only' em toda a política não é IPS. É um gerador caro de logs que não defende nada. Defina quais categorias ficam em blocking e monitore os falsos positivos ativamente."
          }
        ]
      },
      {
        title: "3.2.3 Application Awareness e 3.2.4 User Awareness",
        content: [
          "**3.2.3 Application Awareness — App-ID:** Capacidade de identificar aplicações independente de porta, protocolo de transporte ou criptografia. Uma aplicação moderna pode usar qualquer porta, tunelamento sobre HTTP/HTTPS, ou mudar dinamicamente de porta.",
          "• App-ID classifica o tráfego pela assinatura da aplicação, comportamento de protocolo e padrões de comunicação, não pelo número da porta. Permite políticas como 'permite videoconferência corporativa mas bloqueia aplicativo de mensagens pessoal' mesmo que ambos usem HTTPS na porta 443.",
          "**3.2.4 User Awareness — User-ID:** Vincula endereços IP a identidades de usuário para políticas baseadas em quem está gerando o tráfego, não apenas de onde vem o IP. Integra com Active Directory, LDAP, RADIUS e soluções de SSO.",
          "• Métodos de mapeamento IP-usuário: leitura de logs de autenticação do controlador de domínio, agente instalado nos endpoints, captive portal para dispositivos não gerenciados, integração com VPN e XML API para sistemas customizados."
        ]
      },
      {
        title: "3.2.5 SSL/TLS Inspection e 3.2.6 Sandboxing",
        content: [
          "**3.2.5 SSL/TLS Inspection:** Inspeção de tráfego criptografado. O firewall age como proxy man-in-the-middle controlado: decripta o tráfego TLS, inspeciona o conteúdo e re-encripta para o destino.",
          "• Em 2026, mais de 95% do tráfego web é HTTPS. Malware moderno usa TLS para comando e controle. Exfiltração ocorre via canais criptografados. Firewall sem TLS inspection é cego para a maioria das ameaças atuais.",
          "**3.2.6 Sandboxing:** Execução de arquivos suspeitos em ambiente isolado (sandbox) para análise comportamental. Detecta malware zero-day que não possui assinatura conhecida.",
          "• Modos de operação: inline blocking (hold-mode — o arquivo é retido até a conclusão da análise, adicionando latência) ou out-of-band (arquivo entregue e analisado assincronamente, com retroação de bloqueio se malicioso). Hold-mode oferece proteção superior, mas adiciona latência de segundos a dezenas de segundos para arquivos grandes. Não é adequado para todos os tipos de tráfego."
        ]
      },
      {
        title: "3.2.7 Threat Intelligence e 3.2.8 Anti-malware Integrado",
        content: [
          "**3.2.7 Integração com Threat Intelligence:** Consumo automático de feeds de indicadores de comprometimento (IoC): IPs maliciosos, domínios suspeitos, hashes de malware, URLs de phishing. Atualização contínua em tempo real.",
          "• Categorias de feeds: reputação de IP, reputação de domínio (DNS), URLs de phishing e malware, C2 (command and control) de botnets e indicadores de ameaças APT.",
          "**3.2.8 Anti-malware Integrado:** Análise de arquivos em trânsito por assinatura (hash e pattern matching) e heurística. Complementa o sandboxing para ameaças conhecidas com processamento de baixa latência.",
          "• Protocolos tipicamente inspecionados: HTTP/HTTPS (download de arquivos), SMTP/S (anexos de e-mail), FTP, SMB (para segmentação lateral) e outros protocolos de transferência de arquivo."
        ],
        callouts: [
          {
            type: "BOAS_PRATICAS",
            title: "BOAS PRÁTICAS: Qualidade de Threat Intel",
            text: "Feeds de threat intel desatualizados ou de baixa qualidade geram mais falsos positivos do que detecções reais. Avalie a qualidade do feed, não apenas a quantidade de indicadores."
          }
        ]
      }
    ]
  },
  {
    id: "cap-4",
    number: 4,
    title: "Inspeção de Tráfego",
    subtitle: "L3/L4/L7, DPI, TLS inspection, impacto e limites",
    pages: "Págs. 13–14",
    punchline: "A maior parte do ataque hoje vem criptografada. Não inspecionar TLS é uma opção consciente pela ignorância.",
    sections: [
      {
        title: "4.1 Camadas de Inspeção",
        content: [
          "Inspeção de tráfego é o processo central pelo qual o NGFW entende o que está passando por ele. Sem inspeção adequada, todas as outras features são decoração.",
          "• **4.1.1 L3 — Camada de Rede:** Inspeção de cabeçalhos IP: endereço de origem, endereço de destino, TTL, protocolo, flags. Permite filtros básicos de roteamento e políticas de endereçamento. Não revela nada sobre o conteúdo.",
          "• **4.1.2 L4 — Camada de Transporte:** Inspeção de cabeçalhos TCP/UDP: portas de origem e destino, flags TCP (SYN, ACK, FIN, RST, PSH, URG), número de sequência. Permite identificação de serviços por porta e validação de estados de conexão. Limitação crítica: porta não define aplicação. HTTP pode rodar em qualquer porta. Malware usa porta 443. Aplicações corporativas usam portas dinâmicas. Regras baseadas apenas em porta são trivialmente contornadas.",
          "• **4.1.3 L7 — Camada de Aplicação:** Inspeção do conteúdo da carga útil do pacote. Identifica aplicações, protocolos de aplicação, conteúdo de arquivos, comportamento de usuário e padrões de ameaça. É aqui que o NGFW justifica seu nome e seu preço. Processamento L7 é computacionalmente intensivo. É o principal responsável pela redução de throughput com features ativas."
        ]
      },
      {
        title: "4.2 DPI em Profundidade",
        content: [
          "O DPI funciona por uma combinação de mecanismos:",
          "1. Reconhecimento de protocolo pela estrutura do cabeçalho de aplicação (HTTP tem um formato específico);",
          "2. Identificação de assinatura no payload (sequências de bytes características de cada aplicação);",
          "3. Análise comportamental do fluxo (padrão de tamanho de pacotes, temporização, direcionalidade);",
          "4. Correlação com fluxos relacionados.",
          "Aplicações modernas dificultam o DPI intencionalmente: usam HTTPS para encriptação, mudam portas dinamicamente, usam compressão customizada e implementam ofuscação de protocolo. Por isso a TLS inspection é indispensável."
        ]
      },
      {
        title: "4.3 TLS Inspection em Detalhe",
        content: [
          "**4.3.1 Como Funciona:**",
          "O firewall age como proxy TLS intermediário. Para conexões de saída (outbound), o firewall estabelece uma sessão TLS com o servidor externo (usando o certificado real do servidor), decripta o conteúdo, inspeciona e re-encripta para o cliente usando um certificado assinado pela CA interna."
        ],
        codeSnippet: `Cliente --> [TLS com cert. CA interna] --> NGFW --> [TLS com cert. real do servidor] --> Servidor
                  ^-- Firewall assina                    ^-- Firewall valida
                      com a CA interna                       o certificado real
                      em que o cliente confia`,
        callouts: [
          {
            type: "ATENCAO",
            title: "ATENÇÃO: Aspectos Regulatórios e Privacidade em TLS Inspection",
            text: "TLS inspection em serviços de saúde, jurídico ou financeiro pode violar legislações de privacidade (LGPD, HIPAA, etc.). Documente as exceções e o embasamento legal. Não presuma que inspecionar tudo é sempre correto."
          }
        ]
      },
      {
        title: "4.3.2 Impacto no Desempenho e 4.3.3 Limitações/Exceções",
        content: [
          "**4.3.2 Impacto no Desempenho:** TLS inspection é a feature com maior impacto em throughput.",
          "• A operação de decriptografia e re-encriptação envolve: estabelecimento de duas sessões TLS em vez de uma, operações de criptografia assimétrica e simétrica para cada fluxo, e aumento do volume de dados processado pelo DPI e pelo IPS.",
          "• TLS 1.3 com Perfect Forward Secrecy complica ainda mais: cada sessão usa chaves efêmeras que não podem ser interceptadas passivamente, exigindo que o firewall seja um proxy ativo — sem possibilidade de modo passivo (TAP).",
          "**4.3.3 Limitações e Exceções:** Nem todo tráfego deve ser inspecionado via TLS. Exceções necessárias:",
          "• Serviços bancários e financeiros (pode quebrar certificate pinning);",
          "• Portais de saúde (regulação de privacidade de dados médicos);",
          "• Domínios com pinning de certificado (apps móveis, alguns SaaS);",
          "• Sistemas legados sem suporte a CA customizada.",
          "**4.3.4 A Verdade sobre Tráfego Criptografado:** Segundo dados de telemetria de 2025, mais de 70% do malware moderno usa canais criptografados para comunicação de C2 e exfiltração. Um NGFW que não inspeciona TLS é efetivamente cego para a maioria das ameaças modernas."
        ]
      }
    ]
  },
  {
    id: "cap-5",
    number: 5,
    title: "Controle de Aplicações",
    subtitle: "Assinaturas, comportamento, Shadow IT",
    pages: "Págs. 15–16",
    punchline: "Porta não define aplicação há anos. Política por porta é arqueologia de redes.",
    sections: [
      {
        title: "Introdução & 5.1 Como Aplicações são Identificadas",
        content: [
          "Controle de aplicações é a capacidade de criar políticas baseadas na aplicação real, independente de porta, protocolo de transporte ou criptografia. É um dos pilares que diferenciam o NGFW do firewall tradicional.",
          "**5.1.1 Assinaturas de Aplicação:** Banco de dados de padrões conhecidos de cada aplicação: sequências de bytes no payload, estrutura de mensagens e comportamento de handshake de protocolo de aplicação. Eficaz para aplicações com protocolo proprietário ou bem documentado. Limitação: requer atualização constante. Aplicações mudam, versões novas podem ter protocolo diferente e aplicações obscuras ou customizadas podem não ter assinatura.",
          "**5.1.2 Classificação Comportamental:** Identifica aplicações pelo comportamento do fluxo: padrão de tamanho de pacotes, temporização, razão de dados enviados vs. recebidos, número de conexões simultâneas, uso de DNS e outros indicadores. Útil para aplicações que não têm assinatura conhecida ou que evoluíram para evadir detecção. Mais propenso a falsos positivos do que assinaturas.",
          "**5.1.3 Heurística e Machine Learning:** Modelos treinados para classificar aplicações com base em features do fluxo de tráfego. Em 2026, é componente padrão em NGFWs de tier enterprise. Melhora continuamente com telemetria global do fabricante."
        ]
      },
      {
        title: "5.2 Shadow IT",
        content: [
          "Shadow IT é o uso de aplicações e serviços de TI não aprovados pela organização: armazenamento pessoal em nuvem, aplicativos de mensagens, ferramentas de IA sem contrato corporativo, proxies anonimizadores e dezenas de outros serviços que usuários instalam por necessidade ou comodidade.",
          "O risco real: dados corporativos em sistemas sem controles adequados, violação de compliance (LGPD, SOX, PCI), malware distribuído por canais não monitorados e exfiltração de dados acidental ou intencional."
        ],
        callouts: [
          {
            type: "BOAS_PRATICAS",
            title: "BOAS PRÁTICAS: Abordagem Pragmática com Shadow IT",
            text: "Antes de bloquear Shadow IT agressivamente, entenda por que os usuários estão usando aquelas ferramentas. Frequentemente indica lacunas nas ferramentas corporativas aprovadas. Bloquear sem oferecer alternativa cria Shadow IT mais sofisticado."
          }
        ]
      },
      {
        title: "5.3 Exemplos de Política de Aplicação",
        content: [
          "Recomendações práticas de políticas por categoria de aplicação no NGFW:"
        ],
        table: {
          headers: ["Categoria", "Política Recomendada"],
          rows: [
            ["Redes sociais (uso geral)", "Permitido apenas em horário de almoço para usuários de negócio. Bloqueado para servidores."],
            ["Armazenamento em nuvem", "Apenas versão corporativa aprovada. Bloquear versões pessoais."],
            ["Ferramentas de acesso remoto", "Apenas solução corporativa aprovada. Bloquear soluções pessoais não aprovadas."],
            ["Proxies anonimizadores", "Bloqueio total. Indicador de tentativa de evasão de controles."],
            ["P2P / torrent", "Bloqueio total na rede corporativa."],
            ["Ferramentas de IA generativa", "Política específica: permitido com restrição de categoria de dado transmitido."]
          ]
        }
      }
    ]
  },
  {
    id: "cap-6",
    number: 6,
    title: "Controle por Identidade",
    subtitle: "Diretórios, Identity Awareness, políticas por usuário",
    pages: "Págs. 17–18",
    punchline: "IP é descartável. Identidade não. Política por IP é a cenoura que qualquer atacante com DHCP consegue mover.",
    sections: [
      {
        title: "6.1 Por que IP Não é Suficiente",
        content: [
          "Controle por identidade é a capacidade de vincular o tráfego de rede a identidades de usuário e grupo, em vez de apenas a endereços IP. É o fundamento para políticas de segurança que fazem sentido no mundo real.",
          "Em ambientes corporativos modernos:",
          "• DHCP distribui IPs dinamicamente;",
          "• VDI e desktop como serviço mudam IPs frequentemente;",
          "• Notebooks em home office usam VPN com IPs de pool;",
          "• Dispositivos compartilhados (laboratório, sala de reunião) têm múltiplos usuários no mesmo IP em momentos diferentes.",
          "Política baseada em IP em ambiente assim é não determinística. Você não sabe quem gerou o tráfego, apenas de qual IP veio. Um log de incidente com apenas IP de origem tem valor limitado sem correlação de identidade."
        ]
      },
      {
        title: "6.2 Métodos de Mapeamento IP-Usuário",
        content: [
          "Métodos utilizados para associar o endereço IP transitório à identidade persistente:"
        ],
        table: {
          headers: ["Método", "Como Funciona"],
          rows: [
            ["Leitura de eventos do DC", "Mais comum. O agente monitora eventos de logon no controlador de domínio (Event IDs 4768, 4769, 4624) e mapeia o IP ao usuário autenticado."],
            ["Agente no endpoint", "Instalado no cliente, reporta ao firewall qual usuário está logado. Mais preciso, maior cobertura."],
            ["Captive portal", "Para dispositivos não gerenciados. O usuário autentica no portal do firewall para liberar acesso."],
            ["Integração VPN", "Quando o usuário conecta via VPN, a identidade é passada diretamente ao firewall."],
            ["RADIUS Accounting", "Para ambientes com NAC ou wireless corporativo, o RADIUS envia o mapeamento usuário-IP."],
            ["XML API / Syslog", "Para sistemas customizados ou legados que não se integram diretamente."]
          ]
        }
      },
      {
        title: "6.3 Integração com Diretório e 6.4 Políticas Baseadas em Usuário",
        content: [
          "**6.3 Integração com Diretório Corporativo:**",
          "A integração com Active Directory, LDAP ou serviços equivalentes permite que o firewall: resolva grupos de segurança do diretório, aplique políticas por grupo e não por usuário individual, receba atualizações de membros de grupo em tempo real e use atributos customizados do diretório como base para política.",
          "• Exemplo prático: criar política 'Grupo: Financeiro pode acessar aplicação ERP de qualquer origem' sem listar IPs. Quando o usuário entra ou sai do grupo no AD, a política ajusta automaticamente.",
          "**6.4 Políticas Baseadas em Usuário:**",
          "Com User-ID, o log de auditoria inclui o nome do usuário, não apenas o IP. Investigar incidentes torna-se possível. Você pode responder 'quem fez isso', e não apenas 'qual IP fez isso'."
        ],
        callouts: [
          {
            type: "ATENCAO",
            title: "ATENÇÃO: Limitações do User-ID e Tráfego Não Mapeado",
            text: "User-ID depende de autenticação de domínio confiável. Dispositivos pessoais, guests e dispositivos IoT não autenticados no domínio não são mapeados. Trate tráfego sem identidade conhecida como grupo de menor privilégio."
          }
        ]
      }
    ]
  },
  {
    id: "cap-7",
    number: 7,
    title: "Arquiteturas Reais",
    subtitle: "Perímetro, data center, cloud, híbrido, Zero Trust",
    pages: "Págs. 19–20",
    punchline: "Arquitetura de firewall não é sobre o equipamento. É sobre onde ele fica, o que ele separa e como o tráfego flui. Escolha errada de arquitetura faz o melhor NGFW do mundo ser ineficaz.",
    sections: [
      {
        title: "7.1 Arquitetura de Perímetro",
        content: [
          "O modelo clássico: firewall na borda da rede, separando a rede interna da internet. Todo tráfego externo passa pelo firewall. Tráfego interno flui livremente.",
          "Problema crítico: assume que tudo dentro do perímetro é confiável. Em 2026, com phishing sofisticado, dispositivos pessoais, supply chain attacks e insider threats, essa premissa está fundamentalmente errada.",
          "Ainda relevante para: controle de acesso à internet, publicação de serviços, VPN de acesso remoto e proteção de borda básica. Não suficiente como única camada."
        ]
      },
      {
        title: "7.2 Segmentação Interna",
        content: [
          "Firewalls internos (ou microssegmentação) separam zonas dentro da rede: DMZ, servidores de aplicação, banco de dados, OT/SCADA, RH, financeiro, desenvolvimento. Limita o movimento lateral de um atacante que já comprometeu um segmento."
        ],
        table: {
          headers: ["Zona", "Propósito"],
          rows: [
            ["DMZ", "Servidores publicamente acessíveis, isolados da rede interna"],
            ["Servidores de Aplicação", "Sistemas de negócio, separados do acesso de usuário final"],
            ["Banco de Dados", "Acesso restrito apenas aos servidores de aplicação autorizados"],
            ["OT / SCADA", "Redes de automação industrial — acesso extremamente restrito"],
            ["Desenvolvimento", "Isolado de produção para prevenir acidentes e exfiltração"],
            ["Gerenciamento", "Rede de management out-of-band, acesso restrito a administradores"]
          ]
        }
      },
      {
        title: "7.3 Data Center e 7.4 Cloud",
        content: [
          "**7.3 Arquitetura de Data Center:** Em data centers, o firewall protege: tráfego norte-sul (entrando e saindo do DC) e tráfego leste-oeste (entre servidores dentro do DC).",
          "• O tráfego leste-oeste é frequentemente maior em volume do que o norte-sul. Firewalls virtuais ou serviços de firewall em fabric de rede permitem inspeção de tráfego leste-oeste sem que o tráfego precise sair do servidor físico. Alternativas: microssegmentação baseada em host (agentes nos servidores) e network policy em overlay SDN.",
          "**7.4 Arquitetura Cloud:** Em cloud pública (IaaS), o firewall pode ser: appliance virtual do mesmo fabricante do on-prem (melhor para consistência de política), solução nativa do provedor cloud (melhor integração com serviços do provedor) ou SASE/FWaaS para tráfego de saída de workloads.",
          "• Ambientes multi-cloud adicionam complexidade: cada provedor tem modelo de rede diferente, integração de identidade varia e a gestão centralizada de política é um desafio real."
        ]
      },
      {
        title: "7.5 Modelos de Topologia e 7.6 Zero Trust Architecture",
        content: [
          "**7.5.1 Hub and Spoke:** Filiais (spokes) conectam-se à sede (hub) via VPN. Todo tráfego de filial para internet ou outros recursos passa pelo hub central onde está o NGFW de inspeção. Simples de gerenciar, mas cria gargalo em caso de problemas no hub.",
          "**7.5.2 Distributed / Mesh:** Cada filial tem NGFW local com inspeção completa. Tráfego de internet sai localmente sem hair-pinning para o hub. Mais resiliente, porém mais complexo de gerenciar de forma consistente.",
          "**7.5.3 SASE (Secure Access Service Edge):** Modelo 2026: funções de rede e segurança na nuvem. Usuários se conectam ao ponto de presença (PoP) mais próximo, que aplica política e roteia para o destino. Elimina o hair-pinning para inspeção. Componentes típicos: SD-WAN, FWaaS, CASB, ZTNA, SWG.",
          "**7.6 Zero Trust Architecture:** Zero Trust não é um produto, é um modelo: nunca confiar, sempre verificar. Sem zonas 'confiáveis' por padrão. Todo acesso requer autenticação, autorização contínua e o mínimo de privilégio necessário. O NGFW no modelo Zero Trust: aplica microssegmentação entre recursos, valida identidade e postura do dispositivo antes de autorizar acesso e inspeciona todo o tráfego, incluindo o lateral (leste-oeste)."
        ],
        callouts: [
          {
            type: "ATENCAO",
            title: "ATENÇÃO: A Ilusão do Zero Trust Comprado",
            text: "'Implementamos Zero Trust' dito em 30 dias provavelmente significa que instalaram um produto com 'Zero Trust' no nome. ZTA real é uma jornada arquitetural de anos, não uma compra de produto."
          }
        ]
      }
    ]
  },
  {
    id: "cap-8",
    number: 8,
    title: "Alta Disponibilidade",
    subtitle: "Active-passive, active-active, failover, sincronização",
    pages: "Págs. 21–22",
    punchline: "HA mal feito derruba mais do que ajuda. Um par de firewalls mal configurados é dois pontos de falha com sincronização.",
    sections: [
      {
        title: "8.1 Active-Passive vs. 8.2 Active-Active",
        content: [
          "HA (High Availability) é o conjunto de mecanismos que garantem que o firewall continue operacional mesmo com falha de componente ou equipamento. HA mal feito é a causa de mais interrupções do que a ausência dele.",
          "**8.1 Active-Passive:** Um firewall ativo processa todo o tráfego. O segundo está em standby, recebendo sincronização de estado. Em caso de falha do ativo, o passivo assume em segundos.",
          "• Vantagens: simplicidade, previsibilidade de comportamento e debugging mais simples.",
          "• Desvantagens: capacidade do standby não é utilizada em operação normal e o failover adiciona breve interrupção.",
          "**8.2 Active-Active:** Ambos os firewalls processam tráfego simultaneamente, distribuindo a carga. Requer mecanismo de distribuição: ECMP, load balancer externo ou hashing de fluxo.",
          "• Vantagens: utilização de capacidade dos dois equipamentos e throughput agregado.",
          "• Desvantagens: complexidade significativamente maior, debugging de problemas assimétricos é desafiador e sincronização de estado é mais crítica."
        ],
        callouts: [
          {
            type: "ATENCAO",
            title: "ATENÇÃO: Tráfego Assimétrico em Active-Active",
            text: "Active-active com tráfego assimétrico (pacotes de ida e volta em firewalls diferentes) pode causar problemas de estado e descarte de pacotes. Garanta simetria de fluxo ou use sincronização de estado em tempo real."
          }
        ]
      },
      {
        title: "8.3 Sincronização de Sessão",
        content: [
          "Para que o failover seja transparente, o standby precisa conhecer todas as sessões ativas do primário. Isso é feito por sincronização de estado via link dedicado (HA link ou heartbeat link).",
          "• **O que é sincronizado:** tabela de sessões TCP/UDP, configuração de NAT, tabelas de roteamento dinâmico e configuração de política.",
          "• **O que geralmente não é sincronizado:** sessões de VPN SSL em negociação e alguns estados de proxy."
        ],
        callouts: [
          {
            type: "BOAS_PRATICAS",
            title: "BOAS PRÁTICAS: Link de Sync Dedicado e Risco de Split-Brain",
            text: "Use um link dedicado e redundante para sincronização de HA. Não compartilhe com tráfego de produção. Falha no link de sync pode causar split-brain: ambos os nodes acreditam ser primários."
          }
        ]
      },
      {
        title: "8.4 Failover e Tempo de Recuperação",
        content: [
          "Conceitos fundamentais para medição e projeto de disponibilidade:"
        ],
        table: {
          headers: ["Conceito", "Descrição"],
          rows: [
            ["Detection Time", "Tempo para detectar falha do primário (heartbeat timeout). Típico: 1 a 5 segundos."],
            ["Preemption", "Se o primário se recupera, ele reassume automaticamente? Cuidado: pode causar um segundo failover."],
            ["Session Sync Time", "Quanto tempo leva para sincronização completa após failover. Sessões não sincronizadas são descartadas."],
            ["RTO", "Recovery Time Objective — tempo máximo de interrupção tolerado. Defina e teste periodicamente."]
          ]
        }
      }
    ]
  },
  {
    id: "cap-9",
    number: 9,
    title: "Desempenho e Dimensionamento",
    subtitle: "Throughput real, impacto de features, crescimento",
    pages: "Págs. 23–24",
    punchline: "Dimensionamento incorreto é a segunda maior fonte de problemas em projetos de NGFW (a primeira são as pessoas). Subdimensionar cria gargalo. Superdimensionar desperdiça orçamento. E o segundo erro é muito mais aceitável do que o primeiro.",
    sections: [
      {
        title: "9.1 Metodologia de Dimensionamento",
        content: [
          "Passos essenciais para dimensionar corretamente um firewall:",
          "1. **Levante o tráfego atual:** throughput médio e de pico por interface, número de sessões simultâneas em horário de pico e taxa de novas sessões por segundo.",
          "2. **Identifique as features que serão ativas:** App-ID, User-ID, IPS, antivírus, TLS inspection, sandboxing. Cada uma adiciona overhead.",
          "3. **Aplique fatores de redução de throughput** para cada feature ativa. Não some os fatores linearmente — o impacto é cumulativo e não linear.",
          "4. **Adicione margem de crescimento.** Projete para 3 anos. Adicione 30% a 50% sobre o dimensionamento atual.",
          "5. **Valide com PoC.** Teste em ambiente representativo antes de assinar o contrato."
        ]
      },
      {
        title: "9.2 Métricas Críticas para Dimensionamento",
        content: [
          "Métricas indispensáveis que devem ser avaliadas antes de qualquer compra:"
        ],
        table: {
          headers: ["Métrica", "Por que Importa"],
          rows: [
            ["Throughput com TLS Inspection", "Sua métrica mais importante se você vai inspecionar HTTPS. Geralmente 20% a 50% do NGFW throughput nominal."],
            ["Concurrent Sessions", "Número de sessões simultâneas suportadas. Cada sessão ocupa entrada na state table."],
            ["New Sessions Per Second (CPS)", "Quantas novas conexões por segundo. Ambientes web-heavy têm CPS alto."],
            ["CPS com TLS Handshake", "TLS handshake é caro computacionalmente. Ambientes com muitas conexões HTTPS curtas podem saturar CPS antes do throughput em bits."],
            ["IPsec VPN Throughput", "Se você tem muitas filiais ou usuários remotos, esta métrica define a capacidade de VPN."],
            ["IPS Throughput", "Com conjunto completo de assinaturas ativo. Diferente do NGFW throughput básico."]
          ]
        }
      },
      {
        title: "9.3 Erros Clássicos de Dimensionamento",
        content: [
          "• Usar o throughput de firewall simples como referência para compra de NGFW com todas as features.",
          "• Não considerar crescimento: dimensionar para o tráfego atual e esquecer que a empresa cresce.",
          "• Ignorar o impacto da TLS inspection: o item com maior redução de throughput, frequentemente omitido do sizing.",
          "• Não testar em PoC com tráfego real representativo antes da decisão de compra.",
          "• Comprar por preço sem considerar custo de licenciamento de features por 3 a 5 anos."
        ]
      }
    ]
  },
  {
    id: "cap-10",
    number: 10,
    title: "Erros Clássicos",
    subtitle: "ANY ANY ANY, sem TLS, subdimensionamento, sem log",
    pages: "Págs. 25–26",
    punchline: "O ataque não invade o firewall. Ele passa por ele.",
    sections: [
      {
        title: "10.1 ANY ANY ANY — O Pedido Formal para Ser Invadido",
        content: [
          "Regra que permite qualquer origem, qualquer destino, qualquer serviço. Existe em ambientes reais, colocada para 'resolver um problema urgente' e nunca removida. Em auditoria, essa regra é o equivalente a deixar a porta da empresa aberta com um cartaz de boas-vindas.",
          "**ANY ANY ANY é basicamente um pedido formal para ser invadido.**",
          "• Como acontece: time de suporte coloca regra permissiva para investigar problema, o problema é resolvido, a regra permanece. Ou pior: é colocada como regra padrão 'para não ter problemas' e jamais revisada.",
          "• Solução: revisão periódica obrigatória de regras, remoção de regras permissivas temporárias, e processo formal de change management."
        ]
      },
      {
        title: "10.2 Ausência de Inspeção TLS e 10.3 Falta de Segmentação",
        content: [
          "**10.2 Ausência de Inspeção TLS:** Em 2026, operar NGFW sem TLS inspection é equivalente a ter um alarme de segurança desligado 95% do tempo. A maioria dos ataques modernos usa criptografia. Malware, phishing, exfiltração e comunicação de C2 ocorrem majoritariamente sobre HTTPS.",
          "• Justificativas ouvidas: 'vai impactar a performance' (solucione com dimensionamento adequado), 'vai quebrar aplicações' (solucione com lista de exceções bem gerenciada), 'usuários vão reclamar' (comunique e eduque). Nenhuma justificativa é técnica. Todas são gerenciais.",
          "**10.3 Falta de Segmentação:** Rede plana: todos os dispositivos no mesmo segmento de rede, sem separação entre usuários, servidores, OT, impressoras e câmeras IP. Quando um dispositivo é comprometido (e isso acontece), o atacante tem acesso irrestrito a tudo.",
          "• Rede sem segmentação é o sonho de qualquer atacante: movimento lateral ilimitado, acesso a todos os recursos e tempo livre para mapear o ambiente antes de agir."
        ]
      },
      {
        title: "10.4 Firewall Subdimensionado",
        content: [
          "Firewall subdimensionado com features ativas vira o gargalo da rede.",
          "• Sintomas: lentidão generalizada sem causa óbvia, timeouts em aplicações que 'sempre funcionaram', drops de pacotes em horário de pico e degradação progressiva com crescimento do ambiente.",
          "• O pior cenário: o time desativa features de segurança para 'recuperar performance'. O firewall volta a ser rápido. E completamente inútil."
        ]
      },
      {
        title: "10.5 Logging Desativado ou Ignorado e 10.6 Política sem Revisão",
        content: [
          "**10.5 Logging Desativado ou Ignorado:** Logging desativado por 'economia de espaço', 'performance' ou simplesmente negligência. Ou ativo, mas nunca consultado. Ambos são igualmente problemáticos.",
          "**Se você não loga, você não sabe. E se você não sabe, já perdeu.**",
          "• Sem logs: investigação de incidente é impossível, auditoria de compliance falha, análise de comportamento de tráfego não existe e detecção de anomalias é impossível. Logs geram custo de armazenamento. Incidentes sem investigação geram custo muito maior.",
          "**10.6 Política sem Revisão:** Políticas de firewall crescem com o tempo e raramente encolhem. Cada change adiciona regras. Regras antigas não são removidas porque 'ninguém sabe se ainda são necessárias'. Em ambientes com anos de operação, é comum encontrar centenas de regras sem documentação, sem owner e sem data de revisão."
        ],
        callouts: [
          {
            type: "BOAS_PRATICAS",
            title: "BOAS PRÁTICAS: Ciclo de Vida de Regras",
            text: "Implante data de expiração em regras temporárias. Defina ciclo de revisão semestral ou anual de todo o ruleset. Regra sem owner documentado é candidata a remoção."
          }
        ]
      }
    ]
  },
  {
    id: "cap-11",
    number: 11,
    title: "Logs e Visibilidade",
    subtitle: "Tipos, correlação, SIEM, sem log = sem investigação",
    pages: "Págs. 27–28",
    punchline: "Visibilidade é a capacidade de ver o que está acontecendo na rede. Sem visibilidade, você está operando no escuro. E operar segurança no escuro é só outra forma de não ter segurança.",
    sections: [
      {
        title: "11.1 Tipos de Log de Firewall",
        content: [
          "Categorias de logs essenciais geradas pelo NGFW:"
        ],
        table: {
          headers: ["Tipo", "Conteúdo"],
          rows: [
            ["Traffic Log", "Registro de cada sessão permitida ou negada: origem, destino, aplicação, bytes, duração. O mais volumoso."],
            ["Threat Log", "Registro de eventos de segurança detectados: exploits, malware, URLs maliciosas, anomalias."],
            ["URL Filtering Log", "Registro de categorias de URL acessadas e ações tomadas."],
            ["Authentication Log", "Registro de eventos de autenticação: User-ID, captive portal, VPN."],
            ["System Log", "Eventos do sistema: failover, atualizações, erros de configuração, problemas de conectividade."],
            ["Audit Log", "Registro de ações administrativas: login de admin, mudanças de configuração, commits."],
            ["Decryption Log", "Registro de sessões TLS inspecionadas: quais foram decriptadas, quais foram excluídas e por quê."]
          ]
        }
      },
      {
        title: "11.2 O que Logar",
        content: [
          "Em teoria, log de tudo. Na prática, storage tem custo e volume de log de tráfego em redes corporativas é massivo.",
          "Estratégia pragmática:",
          "• Log completo de eventos de segurança (threat, URL, auth, decryption) — sem exceção;",
          "• Log seletivo de tráfego — regras permissivas críticas e regras de negação;",
          "• Log de auditoria completo de ações administrativas;",
          "• Retenção mínima de 12 meses para compliance, 90 dias em storage quente para investigação ágil."
        ]
      },
      {
        title: "11.3 Integração com SIEM",
        content: [
          "SIEM (Security Information and Event Management) centraliza logs de múltiplas fontes e permite correlação de eventos.",
          "• Sem SIEM, investigar um incidente que envolve firewall, Active Directory, endpoint e serviço de e-mail requer consultar cada sistema separadamente e correlacionar manualmente.",
          "• Com SIEM: consulta centralizada, regras de correlação automática, alertas baseados em comportamento e timeline de incidente construída automaticamente.",
          "• Exportação de logs do NGFW para SIEM: Syslog (UDP/TCP), CEF (Common Event Format), LEEF, ou API direta dependendo do produto. Garanta que o volume de logs não sature o SIEM — filtre eventos de baixa relevância na origem."
        ]
      },
      {
        title: "11.4 Dashboards e Relatórios",
        content: [
          "• Dashboards operacionais para o time de segurança: top aplicações por volume, top usuários por tráfego, top destinos externos, eventos de ameaça recentes, sessões negadas e sessões suspeitas.",
          "• Relatórios gerenciais para liderança: sumário de eventos de segurança, tendências de tráfego, status de compliance e incidentes do período."
        ],
        callouts: [
          {
            type: "BOAS_PRATICAS",
            title: "BOAS PRÁTICAS: Utilidade de Relatórios",
            text: "Relatório que ninguém lê não tem valor. Construa dashboards e relatórios com o consumidor em mente, não com tudo que o produto consegue gerar."
          }
        ]
      }
    ]
  },
  {
    id: "cap-12",
    number: 12,
    title: "NGFW em Cloud",
    subtitle: "Diferença on-prem, FWaaS, problemas comuns",
    pages: "Págs. 29–30",
    punchline: "Cloud mudou fundamentalmente onde o tráfego flui e onde a política de segurança precisa ser aplicada. NGFW on-prem protegendo apenas o perímetro físico é insuficiente quando seus workloads e usuários estão distribuídos globalmente.",
    sections: [
      {
        title: "12.1 Diferenças Fundamentais do On-Prem",
        content: [
          "Comparação dos principais fatores entre infraestrutura física e ambientes de nuvem:"
        ],
        table: {
          headers: ["Diferença", "Impacto"],
          rows: [
            ["Elasticidade", "Workloads em cloud escalam dinamicamente. O firewall precisa acompanhar sem intervenção manual."],
            ["Modelo de responsabilidade", "Em IaaS, a rede virtual é sua responsabilidade. Em SaaS, o provider cuida de tudo. Saiba o que é seu."],
            ["Latência de inspeção", "Tráfego enviado ao firewall on-prem para inspeção e retornado gera hair-pinning com latência inaceitável."],
            ["Endereçamento dinâmico", "IPs de instâncias cloud mudam. Política baseada em IP estático não funciona — use tags e grupos dinâmicos."],
            ["Logging nativo", "Providers cloud têm logging nativo (VPC Flow Logs, NSG Flow Logs). Integre com seu SIEM além do log do NGFW."]
          ]
        }
      },
      {
        title: "12.2 Modelos de Firewall em Cloud",
        content: [
          "**12.2.1 NGFW Virtual (Appliance Virtual):** A mesma solução do on-prem, em formato de máquina virtual ou instância cloud. Vantagem: consistência de política e gestão centralizada com o ambiente on-prem. Desvantagem: precisa ser instanciado, escalado e gerenciado manualmente ou via automação. Custo por hora de instância + licenciamento.",
          "**12.2.2 Firewall Nativo do Provedor Cloud:** Serviços gerenciados de firewall do provedor: totalmente gerenciados, escalam automaticamente e integram nativamente com recursos do provider. Desvantagem: funcionalidades limitadas comparadas a NGFW dedicado, policy model diferente do on-prem e lock-in ao provider.",
          "**12.2.3 FWaaS — Firewall as a Service:** Modelo SASE: o firewall é um serviço consumido via PoP distribuído globalmente. Usuários e workloads se conectam ao PoP mais próximo para inspeção antes de acessar recursos. Elimina o hair-pinning, escala automaticamente e unifica política para usuários remotos, filiais e cloud."
        ]
      },
      {
        title: "12.3 Problemas Comuns em Deployments Cloud",
        content: [
          "• Tráfego leste-oeste entre workloads cloud sem inspeção — segmentos de cloud tratados como zona confiável.",
          "• Políticas permissivas em security groups do provider complementadas por NGFW, mas sobrepostas incorretamente.",
          "• Logging desconectado: logs do NGFW virtual e logs nativos do provider não são correlacionados.",
          "• Licenciamento não planejado para escala: custo de NGFW virtual escala com instâncias, pode surpreender.",
          "• Ausência de inspeção de tráfego de saída (egress): exfiltração de dados não detectada."
        ]
      }
    ]
  },
  {
    id: "cap-13",
    number: 13,
    title: "NGFW e Zero Trust",
    subtitle: "Papel, limites, integração com identidade",
    pages: "Pág. 31",
    punchline: "Zero Trust virou buzzword. Isso não significa que o conceito é inválido — significa que você precisa separar a substância do marketing.",
    sections: [
      {
        title: "13.1 O Papel Real do NGFW em ZTA",
        content: [
          "Em uma arquitetura Zero Trust, o NGFW contribui com:",
          "• Microssegmentação da rede (separação granular de recursos);",
          "• Inspeção de tráfego lateral (leste-oeste);",
          "• Integração com identity provider para validação contínua de identidade;",
          "• Aplicação de política baseada em contexto (identidade + postura do dispositivo + localização + aplicação);",
          "• Logging de todo o tráfego para análise e auditoria."
        ]
      },
      {
        title: "13.2 O que o NGFW não Resolve Sozinho em ZTA",
        content: [
          "NGFW não é o Policy Decision Point (PDP) de uma arquitetura Zero Trust completa. Ele é o Policy Enforcement Point (PEP).",
          "A decisão de autorizar acesso precisa considerar: postura do dispositivo (endpoint detection and response, compliance de patch), nível de risco da identidade (MFA, anomalia de comportamento), contexto da sessão (localização, horário, sensibilidade do recurso) e esses dados vêm de outros componentes do ecossistema, não do firewall."
        ]
      },
      {
        title: "13.3 NGFW + ZTNA — Complementaridade",
        content: [
          "ZTNA (Zero Trust Network Access) substitui VPN tradicional com acesso baseado em identidade e contexto, provisionado por aplicação, não por rede inteira. O NGFW inspeciona o tráfego após autorização.",
          "A combinação ideal: o ZTNA controla quem acessa o quê, e o NGFW garante que o conteúdo do acesso autorizado é legítimo e seguro."
        ],
        callouts: [
          {
            type: "ATENCAO",
            title: "ATENÇÃO: A Falsa Sensação de Segurança do ZTNA sem DPI",
            text: "ZTNA sem inspeção de tráfego no destino é controle de acesso sem inspeção de conteúdo. Um usuário legítimo com credencial comprometida que acessa um recurso autorizado e transfere malware não é detectado apenas pelo ZTNA."
          }
        ]
      }
    ]
  },
  {
    id: "cap-14",
    number: 14,
    title: "Operação Real",
    subtitle: "Gestão de regras, change management, troubleshooting",
    pages: "Págs. 32–33",
    punchline: "80% dos problemas de firewall são humanos. Os outros 20% também.",
    generalCallouts: [
      {
        type: "BOAS_PRATICAS",
        title: "BOAS PRÁTICAS: Ordenação Estrita de Regras",
        text: "Ordene regras do mais específico para o mais genérico. O firewall aplica regras na ordem — uma regra genérica no topo pode shadow uma regra específica abaixo dela."
      }
    ],
    sections: [
      {
        title: "14.1 Gestão de Regras",
        content: [
          "**14.1.1 Estrutura de Ruleset Saudável:**",
          "1. Regras de negação explícita no topo para tráfego claramente malicioso (IoC conhecidos, ranges de IP suspeitos).",
          "2. Regras de gerenciamento e monitoramento.",
          "3. Regras de negócio específicas, do mais restrito ao mais permissivo.",
          "4. Regra de negação padrão (deny all) ao final, com logging ativo.",
          "**14.1.2 Documentação de Regras:**",
          "Cada regra deve ter: descrição clara do propósito, nome do solicitante ou time responsável (owner), data de criação, data de última revisão, número do ticket ou change que a criou e, para regras temporárias, data de expiração.",
          "Regra sem documentação é regra candidata a remoção. Se ninguém sabe por que existe, ninguém sabe se ainda é necessária."
        ]
      },
      {
        title: "14.2 Change Management",
        content: [
          "Mudanças em firewall de produção sem processo formal são causa documentada de incidentes.",
          "O processo mínimo de Change Management:",
          "• Solicitação formal com justificativa técnica e de negócio;",
          "• Revisão por segundo par (four-eyes principle);",
          "• Janela de manutenção definida;",
          "• Plano de rollback documentado;",
          "• Teste e validação pós-mudança;",
          "• Registro no sistema de change management."
        ],
        callouts: [
          {
            type: "ATENCAO",
            title: "ATENÇÃO: A Falsa 'Regrinha Rápida'",
            text: "'Vou só adicionar uma regrinha rápida' dito sem change management formal é o prólogo de pelo menos 40% dos incidentes de disponibilidade em ambiente de firewall."
          }
        ]
      },
      {
        title: "14.3 Troubleshooting",
        content: [
          "**14.3.1 Metodologia de Diagnóstico (Passo a Passo):**",
          "1. **Confirme o problema:** reproduza o sintoma e documente o comportamento exato.",
          "2. **Isole a camada:** é problema de conectividade L3, de política de firewall, de aplicação ou de DNS?",
          "3. **Verifique os logs:** tráfego está chegando ao firewall? Está sendo negado? Por qual regra?",
          "4. **Teste com mais permissão:** adicione regra temporária mais permissiva para isolar se é firewall ou outra coisa.",
          "5. **Capture tráfego:** se necessário, use captura de pacotes no firewall para ver o que exatamente está transitando.",
          "6. **Documente e reverta:** após resolver, documente a causa raiz e remova qualquer regra temporária de diagnóstico."
        ]
      },
      {
        title: "14.3.2 Ferramentas de Diagnóstico Comuns",
        content: [
          "Ferramentas de diagnóstico e o momento exato de utilização na rotina operacional:"
        ],
        table: {
          headers: ["Ferramenta", "Quando Usar"],
          rows: [
            ["Policy Lookup / Rule Test", "Simula um fluxo e mostra qual regra seria aplicada. Indispensável antes de mudar política."],
            ["Session Table Query", "Verifica se uma sessão específica está na tabela de estado e seu status."],
            ["Packet Capture", "Captura pacotes em interface específica. Essencial para problemas de conectividade complexos."],
            ["Log Viewer com Filtro", "Filtra logs por IP, usuário, aplicação, ação. O primeiro lugar a olhar em qualquer diagnóstico."],
            ["Traceroute / Path Analysis", "Identifica onde no caminho de rede o problema ocorre."],
            ["CPU / Memory Monitor", "Para problemas de desempenho — identifica se o firewall está saturado."]
          ]
        }
      }
    ]
  },
  {
    id: "cap-15",
    number: 15,
    title: "Carreira em Firewall",
    subtitle: "Níveis, salários 2026, MSS, consultoria, arquitetura",
    pages: "Págs. 34–35",
    punchline: "Profissional de firewall é uma das especializações mais demandadas em segurança da informação. E uma das menos bem compreendidas pelo mercado, inclusive pelos próprios profissionais.",
    sections: [
      {
        title: "15.1 Níveis de Senioridade e Salários 2026",
        content: [
          "Detalhamento dos requisitos, certificações e remunerações de mercado estimadas para 2026 no Brasil e internacionalmente:"
        ]
      },
      {
        title: "15.1.1 Júnior — Network Security Analyst",
        content: [
          "• **Perfil:** Implementa políticas definidas por outros, executa mudanças simples sob supervisão, monitora alertas e escalona quando necessário.",
          "• **Conhecimento esperado:** Fundamentos de rede (TCP/IP, roteamento, VLANs), conceitos básicos de firewall stateful, operação da interface do produto em uso, interpretação de logs básicos e execução de procedures documentados."
        ],
        table: {
          headers: ["Item", "Referência"],
          rows: [
            ["Salário estimado Brasil 2026", "R$ 4.000 a R$ 7.000 mensais CLT. Variação por região e empresa."],
            ["Tempo típico no nível", "1 a 2 anos com desenvolvimento ativo"],
            ["Certificações úteis", "CompTIA Security+, CompTIA Network+, certificação básica do fabricante em uso"]
          ]
        }
      },
      {
        title: "15.1.2 Pleno — Network Security Engineer",
        content: [
          "• **Perfil:** Projeta e implementa políticas com autonomia, resolve problemas complexos de forma independente, realiza troubleshooting avançado e participa de projetos de mudança.",
          "• **Conhecimento esperado:** NGFW features em profundidade (TLS inspection, IPS tuning, App-ID, User-ID), roteamento dinâmico (BGP, OSPF), VPN (IPsec, SSL), HA e failover, integração com diretórios e SIEM."
        ],
        table: {
          headers: ["Item", "Referência"],
          rows: [
            ["Salário estimado Brasil 2026", "R$ 8.000 a R$ 14.000 mensais CLT. Remoto pode variar mais."],
            ["Tempo típico no nível", "2 a 4 anos"],
            ["Certificações úteis", "PCNSE, CCNP Security, NSE4-7 (dependendo do fabricante em uso)"]
          ]
        }
      },
      {
        title: "15.1.3 Sênior — Senior Network Security Engineer",
        content: [
          "• **Perfil:** Define arquitetura de segurança de rede, lidera projetos complexos, mentora a equipe, participa de decisões de produto e tecnologia, responde por incidentes críticos.",
          "• **Conhecimento esperado:** Arquitetura de segurança (Zero Trust, SASE, SD-WAN), cloud security (multi-cloud), automação e infraestrutura como código (Terraform, Ansible), threat hunting, e visão de negócio para traduzir requisitos em arquitetura técnica."
        ],
        table: {
          headers: ["Item", "Referência"],
          rows: [
            ["Salário estimado Brasil 2026", "R$ 15.000 a R$ 25.000 mensais CLT. Remoto internacional: USD 80k-130k/ano."],
            ["Tempo típico no nível", "4 a 8 anos de experiência relevante"],
            ["Certificações úteis", "CCIE Security, CISSP, certificações de fabricante nível expert"]
          ]
        }
      },
      {
        title: "15.1.4 Especialista / Arquiteto de Segurança",
        content: [
          "• **Perfil:** Define estratégia de segurança de rede em nível organizacional, avalia e seleciona tecnologias, representa a área tecnicamente em auditorias e projetos regulatórios, produz documentação de arquitetura e padrões.",
          "• **Conhecimento esperado:** Tudo dos níveis anteriores mais visão de GRC (Governance, Risk and Compliance), conhecimento de regulações (LGPD, PCI-DSS, ISO 27001), liderança técnica e capacidade de comunicação executiva."
        ],
        table: {
          headers: ["Item", "Referência"],
          rows: [
            ["Salário estimado Brasil 2026", "R$ 25.000 a R$ 45.000 mensais CLT ou PJ. Internacional: USD 130k-200k/ano."],
            ["Perfis de atuação", "Head de segurança, Principal Engineer, Security Architect, CISO em empresas médias"]
          ]
        }
      },
      {
        title: "15.2 Frentes de Atuação",
        content: [
          "**15.2.1 MSSP — Managed Security Service Provider:** Gestão de segurança como serviço para múltiplos clientes. Vantagem: exposição a grande variedade de ambientes e problemas. Desvantagem: pressão de SLA constante, rotatividade alta, salários médios menores que mercado financeiro ou big tech.",
          "**15.2.2 Consultoria:** Projetos de implementação, assessment e arquitetura. Exposição a múltiplos clientes e tecnologias, alta demanda por viagem (variável), remuneração geralmente superior a CLT para perfis sênior.",
          "**15.2.3 Produto / Fabricante:** Trabalhar no fabricante como SE (Sales Engineer), Technical Support, ou Product Engineering. Acesso profundo a uma tecnologia específica, suporte a clientes complexos e exposição a produto antes de lançamento.",
          "**15.2.4 In-house — Empresa Final:** Operação interna de segurança da empresa. Menor variedade de tecnologias, maior profundidade no ambiente específico, maior estabilidade e frequentemente melhores benefícios em empresas grandes."
        ]
      }
    ]
  }
];

export interface ChecklistItem {
  id: string;
  category: string;
  text: string;
}

export interface Appendix {
  id: string;
  letter: string;
  title: string;
  pages: string;
  itemsByCategory?: { category: string; items: string[] }[];
  sections?: { title: string; content: string[] }[];
}

export const APPENDICES: Appendix[] = [
  {
    id: "apendice-a",
    letter: "A",
    title: "Checklist de Implementação",
    pages: "Págs. 36–37",
    itemsByCategory: [
      {
        category: "PRÉ-IMPLEMENTAÇÃO",
        items: [
          "Levantamento de tráfego atual realizado (throughput médio e de pico, sessões simultâneas, CPS)",
          "Features de segurança que serão ativadas definidas e documentadas",
          "Dimensionamento validado considerando todas as features ativas e margem de crescimento",
          "Arquitetura de rede documentada: zonas, interfaces, roteamento, NAT",
          "Endereçamento IP de todas as zonas mapeado",
          "Requisitos de integração identificados: AD/LDAP, SIEM, RADIUS, PKI para TLS inspection",
          "CA interna para TLS inspection criada e distribuída via GPO/MDM",
          "Janela de manutenção agendada e comunicada",
          "Plano de rollback documentado",
          "Equipe de suporte do fabricante acionada para stand-by (se implementação crítica)"
        ]
      },
      {
        category: "IMPLEMENTAÇÃO",
        items: [
          "Configuração inicial de interfaces e endereçamento validada",
          "Roteamento estático ou dinâmico configurado e testado",
          "Zonas de segurança criadas e alinhadas com a arquitetura definida",
          "Política baseline implementada (deny all default com logging ativo)",
          "Regras de negócio implementadas da mais restrita para a mais permissiva",
          "NAT configurado e testado (Source NAT para saída, DNAT para publicação de serviços)",
          "Alta disponibilidade configurada e failover testado com tráfego real",
          "TLS inspection configurada com lista de exceções validada",
          "IPS configurado por zona — categorias de alto risco em blocking, demais em alert",
          "App-ID e User-ID integrados e validados com sample de usuários",
          "Logging configurado: exportação para SIEM, retenção definida",
          "Gestão out-of-band configurada (interface de gerenciamento dedicada)",
          "Acesso administrativo restrito por IP e por MFA",
          "Senhas padrão alteradas, contas desnecessárias removidas",
          "Atualizações de firmware e assinaturas aplicadas"
        ]
      },
      {
        category: "PÓS-IMPLEMENTAÇÃO",
        items: [
          "Teste de conectividade de todas as aplicações críticas realizado",
          "Teste de failover de HA realizado e documentado",
          "Logs chegando ao SIEM e correlacionados corretamente",
          "Dashboards operacionais configurados",
          "Runbook de operação documentado e revisado pelo time",
          "Processo de change management definido e comunicado",
          "Ciclo de revisão de regras agendado (semestral ou anual)",
          "Contatos de suporte do fabricante atualizados na base de conhecimento"
        ]
      }
    ]
  },
  {
    id: "apendice-b",
    letter: "B",
    title: "Checklist de Auditoria",
    pages: "Págs. 38–39",
    itemsByCategory: [
      {
        category: "POLÍTICA E REGRAS",
        items: [
          "Existe regra de negação padrão (deny all) ao final do ruleset?",
          "A regra de negação padrão possui logging ativo?",
          "Existem regras ANY ANY ANY ou equivalentemente permissivas? Se sim, estão justificadas?",
          "Todas as regras possuem descrição, owner e data de criação documentados?",
          "Regras temporárias possuem data de expiração?",
          "O ruleset foi revisado nos últimos 12 meses?",
          "Regras de acesso administrativo estão restritas a IPs de gerenciamento definidos?",
          "Tráfego de zona não confiável para zona confiável é explicitamente controlado?",
          "Serviços desnecessários não estão expostos em regras de publicação (DNAT)?"
        ]
      },
      {
        category: "FEATURES DE SEGURANÇA",
        items: [
          "TLS inspection está ativa para tráfego de saída à internet?",
          "A lista de exceções de TLS inspection está documentada e justificada?",
          "IPS está configurado em modo blocking para categorias de alto risco?",
          "Assinaturas de IPS estão atualizadas (verificar data da última atualização)?",
          "Anti-malware está ativo para protocolos de transferência de arquivo (HTTP, SMTP, FTP)?",
          "Threat intelligence feeds estão sendo consumidos e atualizados?",
          "App-ID está sendo usado nas políticas em vez de apenas portas e protocolos?",
          "User-ID está integrado com o diretório corporativo?"
        ]
      },
      {
        category: "LOGGING E VISIBILIDADE",
        items: [
          "Logging está ativo em todas as regras relevantes?",
          "Logs estão sendo exportados para SIEM externo?",
          "Retenção de logs atende aos requisitos regulatórios e de compliance?",
          "Logs de auditoria administrativa estão ativados e protegidos?",
          "Alertas de eventos críticos estão configurados e testados?",
          "Alguém revisa os logs regularmente? Existe processo documentado?"
        ]
      },
      {
        category: "HARDENING E ACESSO ADMINISTRATIVO",
        items: [
          "Senhas padrão foram alteradas em todas as contas?",
          "Contas administrativas desnecessárias foram removidas?",
          "Acesso administrativo requer MFA?",
          "Acesso administrativo é restrito à interface de gerenciamento dedicada?",
          "Acesso SSH ou HTTPS está restrito a IPs de origem definidos?",
          "Firmware e sistema operacional estão atualizados?",
          "NTP está configurado e sincronizado (timestamps de log corretos)?",
          "SNMP está usando versão 3 com autenticação? Strings de comunidade v1/v2 foram removidas?"
        ]
      }
    ]
  },
  {
    id: "apendice-c",
    letter: "C",
    title: "Boas Práticas de Hardening",
    pages: "Págs. 40–41",
    sections: [
      {
        title: "C.1 Acesso Administrativo",
        content: [
          "• Use interface de gerenciamento dedicada e fisicamente separada do tráfego de produção.",
          "• Restrinja acesso SSH e HTTPS de administração a ranges de IP de gerenciamento específicos.",
          "• Implante MFA para todos os acessos administrativos.",
          "• Crie perfis de acesso com menor privilégio: leitura, operação e administração completa.",
          "• Audite todos os logins administrativos e mudanças de configuração.",
          "• Defina timeout de sessão administrativa (15 a 30 minutos de inatividade)."
        ]
      },
      {
        title: "C.2 Serviços do Sistema",
        content: [
          "• Desative protocolos de gerenciamento não utilizados: SNMP v1/v2, Telnet, HTTP (use HTTPS).",
          "• Se SNMP for necessário, use versão 3 com autenticação e privacidade.",
          "• Desative ping (ICMP echo) em interfaces externas, se não for operacionalmente necessário.",
          "• Configure NTP com múltiplos servidores para sincronização de horário confiável.",
          "• Desative serviços de descoberta automática não necessários (LLDP, CDP em interfaces externas)."
        ]
      },
      {
        title: "C.3 Política Padrão Segura",
        content: [
          "• Deny all como política padrão ao final do ruleset, com logging ativo.",
          "• Explicit permit: somente o que é necessário deve ser explicitamente permitido.",
          "• Princípio do menor privilégio: política mais restrita compatível com o requisito de negócio.",
          "• Revise regularmente regras permissivas para verificar se ainda são necessárias."
        ]
      },
      {
        title: "C.4 Manutenção",
        content: [
          "• Mantenha firmware e assinaturas atualizados. Defina janela de manutenção mensal para atualizações.",
          "• Teste atualizações em ambiente de homologação antes de produção, quando possível.",
          "• Mantenha backup de configuração cifrado e armazenado fora do equipamento.",
          "• Teste restauração de backup periodicamente — backup não testado não é backup.",
          "• Documente toda mudança no sistema de change management antes de implementar."
        ]
      },
      {
        title: "C.5 Monitoramento Contínuo",
        content: [
          "• Configure alertas para: tentativas de login administrativo falhas, mudanças de configuração, failover de HA, queda de interface e saturação de CPU/memória.",
          "• Revise periodicamente top regras por volume para identificar anomalias.",
          "• Correlacione logs do firewall com outros sistemas no SIEM.",
          "• Realize exercícios regulares de resposta a incidente incluindo o firewall no escopo."
        ]
      }
    ]
  }
];
