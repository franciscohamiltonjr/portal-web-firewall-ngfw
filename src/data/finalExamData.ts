export interface ExamQuestion {
  id: number;
  chapterNumber: number;
  chapterTitle: string;
  question: string;
  options: {
    letter: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  justification: string;
}

export const FINAL_EXAM_QUESTIONS: ExamQuestion[] = [
  // Cap 1: Do Parafuso ao Tráfego
  {
    id: 1,
    chapterNumber: 1,
    chapterTitle: "Do Parafuso ao Tráfego",
    question: "Conforme o Capítulo 1, qual é a principal responsabilidade da CPU em um NGFW moderno?",
    options: [
      { letter: 'A', text: "Processar exclusivamente o encaminhamento de pacotes L2/L3 em hardware sem intervenção lógica." },
      { letter: 'B', text: "Gerenciar o plano de controle: orquestração de políticas, protocolos de roteamento e tarefas que exigem lógica complexa." },
      { letter: 'C', text: "Substituir circuitos ASIC e transceivers ópticos de alta velocidade." },
      { letter: 'D', text: "Executar unicamente o armazenamento local de logs e relatórios em buffer estático." }
    ],
    correctOption: 'B',
    justification: "No item 1.1.1: 'A CPU de um NGFW é responsável pelo plano de controle: gerenciamento, orquestração de políticas, processamento de protocolos de roteamento e tarefas que exigem lógica complexa.'"
  },
  // Cap 2: Fundamentos de Redes sem Fantasia
  {
    id: 2,
    chapterNumber: 2,
    chapterTitle: "Fundamentos de Redes sem Fantasia",
    question: "O que a autora define sobre o funcionamento do TCP Three-Way Handshake na tabela de sessões do firewall?",
    options: [
      { letter: 'A', text: "O firewall só transiciona a sessão para o estado ESTABLISHED após observar o pacote ACK final do cliente." },
      { letter: 'B', text: "O firewall considera a conexão aberta imediatamente após receber o primeiro pacote SYN." },
      { letter: 'C', text: "O handshake TCP dispensa alocação de memória na tabela de sessão se for tráfego HTTPS." },
      { letter: 'D', text: "O pacote SYN-ACK é descartado pelo firewall quando a inspeção profunda está ativada." }
    ],
    correctOption: 'A',
    justification: "No item 2.1: O firewall stateful acompanha o ciclo de vida da sessão (SYN -> SYN-ACK -> ACK). A sessão é promovida a ESTABLISHED na tabela apenas quando o ACK final do cliente é validado, prevenindo conexões fantasmas."
  },
  // Cap 3: O que Realmente Define um NGFW
  {
    id: 3,
    chapterNumber: 3,
    chapterTitle: "O que Realmente Define um NGFW",
    question: "Qual das seguintes características distingue verdadeiramente um NGFW de um firewall stateful tradicional (L4)?",
    options: [
      { letter: 'A', text: "Capacidade de filtrar pacotes estritamente por IP de origem, IP de destino e porta TCP/UDP." },
      { letter: 'B', text: "Inspeção profunda de pacotes (DPI) na camada 7, reconhecimento de aplicação (App-ID) e identificação de usuário (User-ID) independentemente da porta." },
      { letter: 'C', text: "Uso exclusivo de roteamento estático sem suporte a BGP ou OSPF." },
      { letter: 'D', text: "Execução obrigatória em máquinas virtuais na nuvem pública sem hardware dedicado." }
    ],
    correctOption: 'B',
    justification: "No Capítulo 3: Um NGFW vai além das portas e IPs da camada 4, inspecionando o payload (Camada 7) para identificar a aplicação real (App-ID), o usuário autenticado (User-ID) e aplicar assinaturas de IPS e antivírus."
  },
  // Cap 4: Inspeção TLS/SSL Sem Segredos
  {
    id: 4,
    chapterNumber: 4,
    chapterTitle: "Inspeção TLS/SSL Sem Segredos",
    question: "Por que a inspeção TLS/SSL Outbound (Forward Proxy) é considerada pela autora a funcionalidade com maior impacto de processamento no NGFW?",
    options: [
      { letter: 'A', text: "Porque ela desliga automaticamente os co-processadores ASIC e converte o firewall em switch L2." },
      { letter: 'B', text: "Porque o firewall atua como um Man-in-the-Middle legítimo, tendo que quebrar a criptografia, validar certificados externos, inspecionar o payload em texto claro e recriptografar com um certificado emitido pela CA corporativa interna." },
      { letter: 'C', text: "Porque o protocolo TLS 1.3 proíbe qualquer tipo de roteamento em redes empresariais." },
      { letter: 'D', text: "Porque a inspeção TLS só funciona se a taxa de conexão for inferior a 10 pacotes por segundo." }
    ],
    correctOption: 'B',
    justification: "No Capítulo 4: A inspeção TLS Outbound força o NGFW a criar duas sessões criptografadas por fluxo (uma com o cliente e outra com o servidor), inspecionando o tráfego aberto no meio do caminho com a CA interna corporativa instalada nas estações."
  },
  // Cap 5: Controle por Aplicação (App-ID)
  {
    id: 5,
    chapterNumber: 5,
    chapterTitle: "Controle por Aplicação (App-ID)",
    question: "Por que confiar apenas em regras de porta (ex: permitir porta 443 TCP) tornou-se uma ilusão de segurança?",
    options: [
      { letter: 'A', text: "Porque a porta 443 foi descontinuada pela IANA em 2026." },
      { letter: 'B', text: "Porque quase todas as aplicações modernas, inclusive Shadow IT, malwares e navegadores, encapsulam seu tráfego em HTTPS (porta 443), tornando o controle por porta cego ao conteúdo real." },
      { letter: 'C', text: "Porque firewalls não conseguem contabilizar pacotes transmitidos na porta 443." },
      { letter: 'D', text: "Porque o protocolo UDP substituiu integralmente o TCP na camada de transporte corporativa." }
    ],
    correctOption: 'B',
    justification: "No Capítulo 5: O conceito central de App-ID decorre do fato de que todo o tráfego converge para a porta 443. Sem inspecionar a camada de aplicação, liberar a porta 443 é liberar a passagem para qualquer tráfego, legítimo ou malicioso."
  },
  // Cap 6: Identidade no Perímetro (User-ID)
  {
    id: 6,
    chapterNumber: 6,
    chapterTitle: "Identidade no Perímetro (User-ID)",
    question: "Qual mecanismo o User-ID utiliza para correlacionar o tráfego de rede ao usuário corporativo?",
    options: [
      { letter: 'A', text: "Mapeamento dinâmico entre o endereço IP de origem e a conta de usuário/grupos através de leitura de logs do Active Directory/Kerberos, agentes ou Captive Portal." },
      { letter: 'B', text: "Inspeção física do crachá do funcionário via leitor RFID conectado ao NGFW." },
      { letter: 'C', text: "Exigência de digitação de senha do Windows a cada pacote UDP transmitido." },
      { letter: 'D', text: "Uso obrigatório de IP estático imutável configurado manualmente em cada telefone celular e notebook." }
    ],
    correctOption: 'A',
    justification: "No Capítulo 6: O User-ID consulta controladores de domínio (AD/LDAP/Kerberos), Syslog de servidores de autenticação ou agentes para mapear temporariamente 'IP X = Usuário Y do Grupo Z', permitindo políticas baseadas em funções e não em IPs."
  },
  // Cap 7: Arquiteturas de Implantação
  {
    id: 7,
    chapterNumber: 7,
    chapterTitle: "Arquiteturas de Implantação",
    question: "Na topologia de rede recomendada para Data Center e Perímetro corporativo, qual é a função primordial da DMZ (Demilitarized Zone)?",
    options: [
      { letter: 'A', text: "Hospedar computadores de uso pessoal dos funcionários sem nenhuma restrição de internet." },
      { letter: 'B', text: "Isolar servidores públicos acessíveis pela internet dos servidores internos e estações de trabalho, impedindo movimentação lateral irrestrita em caso de comprometimento." },
      { letter: 'C', text: "Armazenar cabos de rede sobressalentes e ferramentas manuais de montagem de rack." },
      { letter: 'D', text: "Substituir a necessidade de roteamento BGP entre filiais." }
    ],
    correctOption: 'B',
    justification: "No Capítulo 7: A DMZ isola os serviços públicos (web, e-mail, VPN externa) das redes internas (bancos de dados, estações corporativas). Se um servidor web na DMZ for invadido, as regras do firewall impedem que o invasor alcance diretamente a rede interna."
  },
  // Cap 8: Alta Disponibilidade (HA)
  {
    id: 8,
    chapterNumber: 8,
    chapterTitle: "Alta Disponibilidade (HA)",
    question: "Qual é o principal desafio técnico ao operar um cluster de NGFW em modo Ativo/Ativo (Active/Active) em comparação com Ativo/Passivo?",
    options: [
      { letter: 'A', text: "O modo Ativo/Passivo não suporta cabos de fibra óptica." },
      { letter: 'B', text: "O risco de roteamento assimétrico, onde o pacote de ida passa por um nó e o pacote de volta passa pelo outro nó, causando descarte de sessão se o estado não estiver perfeitamente sincronizado." },
      { letter: 'C', text: "A necessidade de desligar o firewall mestre todas as noites para sincronizar o disco." },
      { letter: 'D', text: "A impossibilidade de registrar logs de tráfego em modo ativo." }
    ],
    correctOption: 'B',
    justification: "No Capítulo 8: A autora explica que em Active/Active o roteamento assimétrico é o inimigo número um de firewalls stateful. Se a ida e a volta passam por appliances diferentes sem sincronização ultrarrápida de sessão, os pacotes são descartados como 'fora de estado'."
  },
  // Cap 9: Dimensionamento Real
  {
    id: 9,
    chapterNumber: 9,
    chapterTitle: "Dimensionamento Real: A Regra do Divisor",
    question: "Qual é a regra pragmática ensinada pela autora para estimar a capacidade real de um NGFW a partir dos números do datasheet do fabricante?",
    options: [
      { letter: 'A', text: "Multiplicar o valor do datasheet por 2, pois fabricantes são sempre excessivamente modestos." },
      { letter: 'B', text: "Dividir o throughput de marketing por 3 a 5 para NGFW completo (DPI + IPS + Antivírus), e até 5 a 10 se houver inspeção massiva de TLS/SSL com pacotes médios da vida real." },
      { letter: 'C', text: "Considerar que o throughput é exatamente idêntico para pacotes de 64 bytes e pacotes de 1518 bytes UDP." },
      { letter: 'D', text: "Somar a quantidade de núcleos de CPU ao número de portas físicas para obter a largura de banda." }
    ],
    correctOption: 'B',
    justification: "No Capítulo 9: 'Se você confia no datasheet, o problema não é o firewall.' Os números de datasheet utilizam pacotes UDP gigantes de 1518 bytes e sem recursos de segurança. Na vida real com DPI, IPS e TLS em pacotes HTTP/HTTPS médios, o throughput cai para 1/3 a 1/5 do nominal."
  },
  // Cap 10: Os Erros Clássicos que Custam Carreiras
  {
    id: 10,
    chapterNumber: 10,
    chapterTitle: "Os Erros Clássicos que Custam Carreiras",
    question: "Por que a regra 'ANY ANY ANY - ACCEPT' colocada temporariamente para testes é apontada como um dos erros mais perigosos?",
    options: [
      { letter: 'A', text: "Porque ela consome toda a memória flash do firewall em menos de 1 minuto." },
      { letter: 'B', text: "Porque regras 'temporárias' de liberação total frequentemente são esquecidas no topo da política, anulando todas as defesas posteriores e abrindo portas para invasões silenciosas." },
      { letter: 'C', text: "Porque ela impede que o administrador faça login no console de gerenciamento." },
      { letter: 'D', text: "Porque essa regra queima os fusíveis elétricos da fonte de alimentação." }
    ],
    correctOption: 'B',
    justification: "No Capítulo 10: O erro clássico da regra temporária que se torna eterna. Colocar ANY ANY ANY no topo da tabela 'apenas para testar se a culpa é do firewall' anula todas as regras de segurança e costuma permanecer em produção por meses ou anos."
  },
  // Cap 11: Logs, Auditoria e SIEM
  {
    id: 11,
    chapterNumber: 11,
    chapterTitle: "Logs, Auditoria e SIEM",
    question: "Em uma política de logging adequada para NGFW corporativo, qual prática é recomendada pelo e-book?",
    options: [
      { letter: 'A', text: "Desativar os logs de sessão para economizar CPU e nunca exportar nada via Syslog." },
      { letter: 'B', text: "Armazenar todos os logs exclusivamente na memória RAM volátil do equipamento." },
      { letter: 'C', text: "Habilitar registro detalhado no fechamento de sessão (log on session close) com envio contínuo para um SIEM/Syslog central com retenção adequada e sincronização NTP rigorosa." },
      { letter: 'D', text: "Imprimir os logs em papel térmico a cada 24 horas." }
    ],
    correctOption: 'C',
    justification: "No Capítulo 11: A autora enfatiza que logs locais lotam o disco e sobrecarregam o firewall. A boa prática é enviar logs estruturados para SIEM/Syslog externo ao final de cada sessão com relógio NTP sincronizado para perícia forense."
  },
  // Cap 12: Firewall em Nuvem e FWaaS
  {
    id: 12,
    chapterNumber: 12,
    chapterTitle: "Firewall em Nuvem e FWaaS",
    question: "Qual é a principal vantagem de adotar soluções de FWaaS (Firewall as a Service) em uma arquitetura SASE moderna?",
    options: [
      { letter: 'A', text: "Permitir que os usuários trabalhem sem nenhuma senha de rede." },
      { letter: 'B', text: "Inspecionar o tráfego dos usuários remotos e filiais diretamente no PoP de nuvem mais próximo, eliminando o gargalo de 'hair-pinning' (retorno obrigatório do tráfego até o data center da sede)." },
      { letter: 'C', text: "Substituir a internet pública por satélites de baixa órbita exclusivos." },
      { letter: 'D', text: "Garantir 100% de desconto no custo de licenças de software." }
    ],
    correctOption: 'B',
    justification: "No Capítulo 12: O tráfego não precisa mais voltar obrigatoriamente para a sede (hair-pinning ou tromboning) apenas para ser inspecionado. O FWaaS no PoP de nuvem aplica a política próxima ao usuário de borda com escalabilidade elástica."
  },
  // Cap 13: Zero Trust e o Firewall
  {
    id: 13,
    chapterNumber: 13,
    chapterTitle: "Zero Trust e o Firewall",
    question: "Dentro de uma arquitetura Zero Trust (ZTA), qual é o papel exato do NGFW?",
    options: [
      { letter: 'A', text: "O NGFW atua como o motor de decisão de identidade e autenticação biométrica em nuvem (PDP)." },
      { letter: 'B', text: "O NGFW atua como um Ponto de Aplicação de Políticas (PEP - Policy Enforcement Point), inspecionando fluxos Leste-Oeste, impondo microssegmentação e aplicando as decisões tomadas pelo PDP." },
      { letter: 'C', text: "O NGFW deixa de existir, pois o modelo Zero Trust elimina a necessidade de controle de rede." },
      { letter: 'D', text: "O NGFW assume a responsabilidade de gerenciar as folhas de pagamento corporativas." }
    ],
    correctOption: 'B',
    justification: "No Capítulo 13: O firewall não é o Zero Trust sozinho; ele atua como PEP (Policy Enforcement Point) no plano de dados, executando a microssegmentação e inspecionando cada pacote com base nas instruções e postura do PDP (Policy Decision Point)."
  },
  // Cap 14: Operação do Dia a Dia
  {
    id: 14,
    chapterNumber: 14,
    chapterTitle: "Operação do Dia a Dia: Troubleshooting e Mudanças",
    question: "Quando uma equipe de aplicação reclama: 'A aplicação parou de funcionar, a culpa é do firewall!', qual é a primeira etapa metodológica de troubleshooting antes de alterar qualquer regra?",
    options: [
      { letter: 'A', text: "Criar imediatamente uma regra ANY ANY ANY no topo da tabela para desbloquear o sistema." },
      { letter: 'B', text: "Verificar a camada física e de rede básica (L1 a L3): conectividade IP, resolução DNS, tabela de roteamento e tabela de sessões/logs de descarte no firewall para verificar se o tráfego sequer está chegando ao appliance." },
      { letter: 'C', text: "Reiniciar o firewall durante o horário de pico sem avisar os usuários." },
      { letter: 'D', text: "Formatar o disco rígido do firewall e reinstalar o sistema do zero." }
    ],
    correctOption: 'B',
    justification: "No Capítulo 14: Metodologia de troubleshooting pragmático: primeiro verificar se o pacote chega ao firewall (captura de pacotes, tabela ARP, rota, ping, SYN e logs de descarte). Em grande parte dos incidentes, o problema está em roteamento ou no próprio servidor da aplicação."
  },
  // Cap 15: Carreira em Firewall
  {
    id: 15,
    chapterNumber: 15,
    chapterTitle: "Carreira em Firewall",
    question: "O que a autora Mariana BS destaca como o diferencial que separa um mero 'apertador de botão de firewall' de um Engenheiro de Segurança de Redes sênior?",
    options: [
      { letter: 'A', text: "Memorizar a cor dos botões na interface web de um único fabricante." },
      { letter: 'B', text: "O domínio profundo dos fundamentos de protocolos (TCP/IP, TLS, BGP), visão holística de arquitetura, capacidade analítica de interpretar logs e pacotes, e postura de segurança pragmática sem ilusão de marketing." },
      { letter: 'C', text: "Sempre comprar o firewall mais caro do catálogo sem calcular requisitos de tráfego." },
      { letter: 'D', text: "Evitar qualquer tipo de automação ou uso de linha de comando (CLI)." }
    ],
    correctOption: 'B',
    justification: "No Capítulo 15: Ferramentas e interfaces mudam, mas os fundamentos de protocolos, capacidade de análise de fluxo, arquitetura de rede e entendimento de ameaças reais são o verdadeiro alicerce de uma carreira sólida e valorizada em cibersegurança."
  }
];
