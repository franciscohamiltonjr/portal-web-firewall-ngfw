export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    letter: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  justification: string;
}

export interface ChapterQuiz {
  chapterNumber: number;
  chapterTitle: string;
  questions: QuizQuestion[];
}

export const CHAPTER_QUIZZES: Record<number, ChapterQuiz> = {
  // CAPÍTULO 1
  1: {
    chapterNumber: 1,
    chapterTitle: "Do Parafuso ao Tráfego",
    questions: [
      {
        id: 1,
        question: "De acordo com o Capítulo 1, qual é a principal responsabilidade da CPU em um NGFW moderno?",
        options: [
          { letter: 'A', text: "Acelerar em hardware o forwarding de pacotes L2/L3 e o lookup da tabela de sessão sem consumir ciclos." },
          { letter: 'B', text: "Plano de controle: gerenciamento, orquestração de políticas, protocolos de roteamento e tarefas que exigem lógica complexa." },
          { letter: 'C', text: "Armazenar exclusivamente pacotes de firmware e logs locais em buffer de alta velocidade." },
          { letter: 'D', text: "Substituir integralmente a necessidade de transceivers ópticos e circuitos ASIC em appliances modulares." }
        ],
        correctOption: 'B',
        justification: "No item 1.1.1, a autora afirma textualmente: 'A CPU de um NGFW é responsável pelo plano de controle: gerenciamento, orquestração de políticas, processamento de protocolos de roteamento e tarefas que exigem lógica complexa.'"
      },
      {
        id: 2,
        question: "O que o texto destaca como uma característica e limitação crítica do chip ASIC (Application-Specific Integrated Circuit)?",
        options: [
          { letter: 'A', text: "É um processador genérico atualizável via software toda semana para novas ameaças." },
          { letter: 'B', text: "Processa pacotes com alto overhead de interrupções de sistema e latência em milissegundos." },
          { letter: 'C', text: "É específico de fabricante e não atualizável por software; se uma nova técnica de ataque não foi contemplada no design do chip, ela não será acelerada." },
          { letter: 'D', text: "Serve apenas como barramento interno de backplane para conectar módulos redundantes de alimentação." }
        ],
        correctOption: 'C',
        justification: "No item 1.1.2: 'O problema: ASIC é específico de fabricante e não atualizável por software. Se uma nova técnica de ataque não foi contemplada no design do chip, ela não será acelerada e pode nem ser inspecionada corretamente.'"
      },
      {
        id: 3,
        question: "Como o NPU (Network Processing Unit) se diferencia do ASIC fixo no Capítulo 1?",
        options: [
          { letter: 'A', text: "O NPU é um processador programável que pode ser atualizado via firmware para suportar novos protocolos ou otimizações." },
          { letter: 'B', text: "O NPU é uma CPU x86 de propósito geral com latência em minutos." },
          { letter: 'C', text: "O NPU não pode coexistir com o ASIC em arquiteturas modernas." },
          { letter: 'D', text: "O NPU cuida exclusivamente de fontes redundantes em modo 1+1." }
        ],
        correctOption: 'A',
        justification: "No item 1.1.3: 'Diferente do ASIC fixo, o NPU pode ser atualizado via firmware para suportar novos protocolos ou otimizações. É o meio-termo entre a rigidez do ASIC e a lentidão da CPU de propósito geral.'"
      },
      {
        id: 4,
        question: "Por que a 'Tabela de Estado cheia' é apontada no alerta de ATENÇÃO como um dos vetores de DoS mais eficientes contra firewall?",
        options: [
          { letter: 'A', text: "Porque queima o chip ASIC por superaquecimento elétrico." },
          { letter: 'B', text: "Porque exige a substituição física das interfaces ópticas QSFP28." },
          { letter: 'C', text: "Porque um atacante não precisa explorar falha de código — basta gerar sessões suficientes para lotar a tabela e derrubar conexões legítimas." },
          { letter: 'D', text: "Porque apaga automaticamente os arquivos de configuração do SSD/Flash." }
        ],
        correctOption: 'C',
        justification: "Na caixa ATENÇÃO do item 1.1.4: 'Tabela de estado cheia é um dos vetores de DoS mais eficientes contra firewall. Um atacante não precisa explorar falha de código — basta gerar sessões suficientes para lotar a tabela e derrubar conexões legítimas.'"
      },
      {
        id: 5,
        question: "Qual é a recomendação categórica de BOAS PRÁTICAS sobre Fontes de Alimentação Redundantes?",
        options: [
          { letter: 'A', text: "Conectar sempre ambas as fontes no mesmo nobreak de alta capacidade para garantir balanceamento." },
          { letter: 'B', text: "Nunca conecte as duas fontes no mesmo nobreak ou quadro elétrico. Redundância de fonte sem diversidade elétrica é cosmética." },
          { letter: 'C', text: "Usar fontes redundantes apenas se o firewall operar com cabos de cobre RJ45 1G." },
          { letter: 'D', text: "Desligar a fonte secundária para economizar energia do chassis durante o horário comercial." }
        ],
        correctOption: 'B',
        justification: "Na caixa BOAS PRÁTICAS da página 5: 'Nunca conecte as duas fontes no mesmo nobreak ou quadro elétrico. Redundância de fonte sem diversidade elétrica é cosmética.'"
      },
      {
        id: 6,
        question: "Em que condições irreais de laboratório o 'throughput de marketing' estampado no datasheet é medido?",
        options: [
          { letter: 'A', text: "Com pacotes TCP de 64 bytes com TLS 1.3 e hold-mode de sandboxing ativos." },
          { letter: 'B', text: "Com pacotes UDP de 1518 bytes, sem inspeção de conteúdo, sem features ativadas, regras mínimas e temperatura controlada." },
          { letter: 'C', text: "Com tráfego de VoIP e streaming sob ataque ativo de negação de serviço." },
          { letter: 'D', text: "Com 100% de tráfego HTTPS decriptado e re-encriptado com dupla sessão." }
        ],
        correctOption: 'B',
        justification: "No item 1.2: 'O throughput de marketing é medido com: pacotes UDP de 1518 bytes (tamanho máximo de frame Ethernet), sem inspeção de conteúdo, sem features ativadas, com regras mínimas e em temperatura de laboratório controlada.'"
      },
      {
        id: 7,
        question: "De acordo com a regra prática de dimensionamento apresentada no Capítulo 1, por quanto se deve dividir o throughput de marketing?",
        options: [
          { letter: 'A', text: "Dividir por 1,2 a 1,5 em qualquer cenário de rede." },
          { letter: 'B', text: "Multiplicar por 2 para compensar o avanço dos novos processadores." },
          { letter: 'C', text: "Dividir por 3 a 5 para estimativa realista com features ativas, e por 5 a 10 em ambientes com alto volume de TLS." },
          { letter: 'D', text: "Dividir por 20 se houver cabos ópticos SFP+ conectados ao backplane." }
        ],
        correctOption: 'C',
        justification: "Na caixa ATENÇÃO do item 1.2: 'Regra prática: divida o throughput de marketing por 3 a 5 para obter estimativa realista com features de segurança ativas. Em ambientes com alto volume de TLS, divida por 5 a 10.'"
      },
      {
        id: 8,
        question: "Qual feature de segurança causa a maior redução de throughput (50% a 80%), de acordo com a tabela do item 1.5?",
        options: [
          { letter: 'A', text: "Stateful Inspection básico." },
          { letter: 'B', text: "TLS Inspection." },
          { letter: 'C', text: "User-ID." },
          { letter: 'D', text: "App-ID / DPI isolado." }
        ],
        correctOption: 'B',
        justification: "No item 1.5, a tabela detalha expressamente: 'TLS Inspection: Redução de 50% a 80% do throughput. O maior impacto de todos.'"
      }
    ]
  },

  // CAPÍTULO 2
  2: {
    chapterNumber: 2,
    chapterTitle: "Fundamentos de Redes sem Fantasia",
    questions: [
      {
        id: 1,
        question: "Quais são as camadas que realmente importam para a operação de um NGFW na prática, segundo o Capítulo 2?",
        options: [
          { letter: 'A', text: "Apenas L1 e L2, pois o processamento físico garante o transporte de bits." },
          { letter: 'B', text: "L2 (Ethernet, MAC), L3 (IP, roteamento), L4 (TCP/UDP/ICMP, portas) e L7 (aplicação, conteúdo)." },
          { letter: 'C', text: "Apenas L5 e L6, eliminando as camadas de rede e transporte." },
          { letter: 'D', text: "Exclusivamente L3 e L4, idêntico a um filtro de pacotes simples." }
        ],
        correctOption: 'B',
        justification: "No item 2.1.1: 'Na prática, o que importa para firewall é: L2 (Ethernet, MAC), L3 (IP, roteamento), L4 (TCP/UDP/ICMP, portas) e L7 (aplicação, conteúdo). NGFW opera em todas essas camadas simultaneamente.'"
      },
      {
        id: 2,
        question: "Como o firewall stateful rastreia o protocolo UDP, visto que o UDP não possui handshake?",
        options: [
          { letter: 'A', text: "Ele rejeita todo tráfego UDP por ser impossível manter controle de estado." },
          { letter: 'B', text: "Ele obriga o cliente UDP a responder um SYN-ACK antes de criar a sessão." },
          { letter: 'C', text: "Mantém um pseudo-estado baseado na tupla: IP de origem, IP de destino, porta de origem e porta de destino." },
          { letter: 'D', text: "Converte os pacotes UDP em frames Ethernet L2 sem registrar na tabela de sessões." }
        ],
        correctOption: 'C',
        justification: "No item 2.1.3: 'Para rastrear UDP, o firewall mantém um pseudo-estado baseado na tupla: IP de origem, IP de destino, porta de origem e porta de destino.'"
      },
      {
        id: 3,
        question: "Na tabela de estados de Stateful Inspection (item 2.2), qual é a definição do estado 'RELATED'?",
        options: [
          { letter: 'A', text: "Primeiro pacote de uma conexão (SYN para TCP)." },
          { letter: 'B', text: "Conexão relacionada a uma já estabelecida (ex.: canal de dados do FTP, erro ICMP)." },
          { letter: 'C', text: "Pacotes descartados por não corresponderem a nenhuma sessão." },
          { letter: 'D', text: "Sessão encerrada por FIN/RST aguardando timeout." }
        ],
        correctOption: 'B',
        justification: "Na tabela do item 2.2: 'RELATED: Conexão relacionada a uma já estabelecida (ex.: canal de dados do FTP, erro ICMP).'"
      },
      {
        id: 4,
        question: "Qual é o alerta enfático do Capítulo 2 sobre a tecnologia NAT (Network Address Translation)?",
        options: [
          { letter: 'A', text: "NAT substitui a necessidade de inspeção L7 e antivírus." },
          { letter: 'B', text: "NAT é segurança nativa porque esconde a rede privada da internet." },
          { letter: 'C', text: "NAT não é segurança. NAT é tradução de endereço. O fato de um serviço não ter IP público direto não o protege se o DNAT estiver mal configurado ou se existir caminho alternativo." },
          { letter: 'D', text: "NAT deve ser evitado porque impede o funcionamento de rotas estáticas." }
        ],
        correctOption: 'C',
        justification: "Na caixa ATENÇÃO do item 2.3: 'NAT não é segurança. NAT é tradução de endereço. O fato de um serviço não ter IP público direto não o protege se o DNAT estiver mal configurado ou se existir um caminho alternativo.'"
      },
      {
        id: 5,
        question: "Quais são os sintomas de uma 'Tabela de Estado Cheia' relatados no item 2.4.1?",
        options: [
          { letter: 'A', text: "Conexões novas recusadas ou descartadas silenciosamente; usuários não abrem novas sessões, enquanto serviços existentes continuam funcionando." },
          { letter: 'B', text: "O firewall reinicia fisicamente e apaga todas as senhas de administrador." },
          { letter: 'C', text: "Todas as interfaces físicas SFP+ alteram sua velocidade para 10 Mbps automaticamente." },
          { letter: 'D', text: "Apenas pacotes de ICMP ping passam a ser respondidos com sucesso." }
        ],
        correctOption: 'A',
        justification: "No item 2.4.1: 'Sintomas: conexões novas recusadas ou descartadas silenciosamente; usuários não conseguem abrir novas sessões; serviços existentes funcionam enquanto novas conexões falham.'"
      },
      {
        id: 6,
        question: "Como o mecanismo de SYN cookies mitiga um ataque de SYN Flood segundo o item 2.4.2?",
        options: [
          { letter: 'A', text: "Ele desliga a interface WAN até que o atacante pare de enviar pacotes." },
          { letter: 'B', text: "O firewall responde ao cliente e só cria estado completo após receber o ACK." },
          { letter: 'C', text: "Ele armazena todas as conexões incompletas na memória flash permanente." },
          { letter: 'D', text: "Ele converte os pacotes TCP em tráfego UDP sem confirmação." }
        ],
        correctOption: 'B',
        justification: "No item 2.4.2: 'Mitigação: SYN cookies no firewall (o firewall responde ao cliente e só cria estado completo após receber o ACK), rate limiting de SYN por origem...'"
      },
      {
        id: 7,
        question: "O que acontece na operação quando timeouts de sessão são configurados de forma muito agressiva (muito curtos)?",
        options: [
          { letter: 'A', text: "Sessões zumbi consomem espaço na tabela indefinidamente." },
          { letter: 'B', text: "Conexões legítimas de aplicações que ficam ociosas por longos períodos (banco de dados, aplicações legadas) são encerradas; a aplicação envia dados pela sessão 'morta' e recebe RST ou silêncio." },
          { letter: 'C', text: "A CPU é forçada a executar decriptografia TLS 1.3 de imediato." },
          { letter: 'D', text: "O tráfego de DNS passa a exigir 3600 segundos de retenção mínima." }
        ],
        correctOption: 'B',
        justification: "No item 2.4.3: 'Timeouts muito agressivos: conexões legítimas de aplicações que ficam ociosas por longos períodos (banco de dados, aplicações legadas, conexões keep-alive) são encerradas pelo firewall. A aplicação envia dados pela sessão 'morta' e recebe RST ou simplesmente silêncio.'"
      },
      {
        id: 8,
        question: "Qual é o valor de timeout recomendado no item 2.4.3 para sessões 'TCP Established' e 'DNS'?",
        options: [
          { letter: 'A', text: "TCP Established: 10 a 30s; DNS: 3600s." },
          { letter: 'B', text: "TCP Established: 1800 a 3600 segundos; DNS: 30 segundos." },
          { letter: 'C', text: "TCP Established: 5 segundos; DNS: 300 segundos." },
          { letter: 'D', text: "TCP Established: ilimitado; DNS: 0 segundos." }
        ],
        correctOption: 'B',
        justification: "Na tabela do item 2.4.3: 'TCP Established: 1800 a 3600 segundos (comum)... UDP: 30 a 300 segundos dependendo da aplicação. DNS: 30 s.'"
      }
    ]
  },

  // CAPÍTULO 3
  3: {
    chapterNumber: 3,
    chapterTitle: "O que Define um NGFW em 2026",
    questions: [
      {
        id: 1,
        question: "Qual é a frase de abertura marcante da autora sobre a exigência de NGFW em 2026?",
        options: [
          { letter: 'A', text: "Firewall com interface gráfica bonita já atende todos os requisitos modernos." },
          { letter: 'B', text: "Sem inspeção TLS, não é NGFW. É firewall com roupagem nova." },
          { letter: 'C', text: "Qualquer filtro de pacotes L3/L4 com IPv6 deve ser considerado NGFW." },
          { letter: 'D', text: "O sandboxing out-of-band substitui completamente o uso de assinaturas de IPS." }
        ],
        correctOption: 'B',
        justification: "Na abertura do Capítulo 3: 'Sem inspeção TLS, não é NGFW. É firewall com roupagem nova.'"
      },
      {
        id: 2,
        question: "O que caracteriza um 'NGFW real' em comparação a um 'Firewall com IPS parafusado' (item 3.1)?",
        options: [
          { letter: 'A', text: "O NGFW real possui gestão separada e política desconexa para o IPS." },
          { letter: 'B', text: "Inspeção integrada de L2 a L7, App-ID, User-ID, IPS nativo, TLS inspection, sandboxing e threat intel em tempo real." },
          { letter: 'C', text: "O NGFW real apenas analisa cabeçalhos sem manter estado das conexões." },
          { letter: 'D', text: "O NGFW real opera exclusivamente em modo TAP passivo sem interferir no tráfego." }
        ],
        correctOption: 'B',
        justification: "Na tabela do item 3.1: 'NGFW real: Inspeção integrada de L2 a L7, App-ID, User-ID, IPS nativo, TLS inspection, sandboxing e threat intel em tempo real.'"
      },
      {
        id: 3,
        question: "Como o DPI (Deep Packet Inspection) muda a visibilidade do firewall sobre o tráfego da porta 443 (item 3.2.1)?",
        options: [
          { letter: 'A', text: "Sem DPI ele bloqueia toda a porta 443; com DPI ele abre a porta sem registros." },
          { letter: 'B', text: "Sem DPI, vê apenas que o pacote saiu da porta 443 para um IP externo; com DPI, vê uma sessão TLS de armazenamento em nuvem de 'joao.silva' enviando arquivo de 50 MB para fora." },
          { letter: 'C', text: "Com DPI, ele dispensa o uso de certificados de CA interna nos endpoints." },
          { letter: 'D', text: "O DPI atua apenas nos cabeçalhos L2 Ethernet sem examinar a carga útil do pacote." }
        ],
        correctOption: 'B',
        justification: "No item 3.2.1: 'Sem DPI, o firewall só vê que um pacote saiu da porta 443 para um IP externo. Com DPI, ele vê que é uma sessão TLS que encapsula tráfego do serviço de armazenamento em nuvem, originada pelo usuário 'joao.silva', com arquivo de 50 MB sendo enviado para fora da empresa.'"
      },
      {
        id: 4,
        question: "Por que a autora alerta que 'IPS rodando em modo detect only em toda a política não é IPS'?",
        options: [
          { letter: 'A', text: "Porque em modo detect only ele queima ciclos de CPU sem gerar registros de auditoria." },
          { letter: 'B', text: "Porque é apenas um gerador caro de logs que não defende nada; deve-se definir quais categorias ficam em blocking e monitorar falsos positivos." },
          { letter: 'C', text: "Porque o modo detect only desliga a interface física do firewall." },
          { letter: 'D', text: "Porque provedores de nuvem não suportam o envio de alertas por Syslog." }
        ],
        correctOption: 'B',
        justification: "Na caixa ATENÇÃO do item 3.2.2: 'IPS rodando em modo 'detect only' em toda a política não é IPS. É um gerador caro de logs que não defende nada. Defina quais categorias ficam em blocking e monitore os falsos positivos ativamente.'"
      },
      {
        id: 5,
        question: "O que o recurso App-ID permite realizar na prática, segundo o item 3.2.3?",
        options: [
          { letter: 'A', text: "Identificar portas TCP exclusivamente pelo arquivo /etc/services." },
          { letter: 'B', text: "Classificar tráfego pela assinatura da aplicação e padrões de comunicação, permitindo p.ex. videoconferência corporativa e bloqueando comunicador pessoal mesmo ambos usando HTTPS 443." },
          { letter: 'C', text: "Restringir o acesso a redes sociais apenas para usuários com permissão de administrador de domínio." },
          { letter: 'D', text: "Substituir a criptografia TLS por pacotes HTTP sem autenticação." }
        ],
        correctOption: 'B',
        justification: "No item 3.2.3: 'App-ID classifica o tráfego pela assinatura da aplicação, comportamento de protocolo e padrões de comunicação, não pelo número da porta. Isso permite políticas como 'permite videoconferência corporativa mas bloqueia aplicativo de mensagens pessoal' mesmo que ambos usem HTTPS na porta 443.'"
      },
      {
        id: 6,
        question: "Qual é a frase contundente da autora no item 3.2.5 sobre a negligência de inspeção TLS?",
        options: [
          { letter: 'A', text: "Firewall sem inspeção TLS hoje é só um roteador caro com autoestima." },
          { letter: 'B', text: "TLS inspection é opcional se você possuir um bom antivírus no endpoint." },
          { letter: 'C', text: "Inspecionar TLS não faz sentido porque 95% da web ainda utiliza tráfego aberto." },
          { letter: 'D', text: "Criptografia impede 100% dos ataques sem necessidade de regras de firewall." }
        ],
        correctOption: 'A',
        justification: "No item 3.2.5: 'Firewall sem inspeção TLS hoje é só um roteador caro com autoestima.'"
      },
      {
        id: 7,
        question: "Qual é a desvantagem do modo de sandboxing inline (hold-mode) descrita no item 3.2.6?",
        options: [
          { letter: 'A', text: "Não detecta malwares zero-day desconhecidos." },
          { letter: 'B', text: "O arquivo é liberado sem análise comportamental." },
          { letter: 'C', text: "O arquivo é retido até a conclusão da análise, adicionando latência de segundos a dezenas de segundos para arquivos grandes." },
          { letter: 'D', text: "Exige que o arquivo seja convertido para texto puro antes do envio." }
        ],
        correctOption: 'C',
        justification: "No item 3.2.6: 'Hold-mode oferece proteção superior, mas adiciona latência de segundos a dezenas de segundos para arquivos grandes. Não é adequado para todos os tipos de tráfego.'"
      },
      {
        id: 8,
        question: "Qual recomendação de BOAS PRÁTICAS a autora faz sobre feeds de Threat Intelligence (item 3.2.7)?",
        options: [
          { letter: 'A', text: "Contratar o máximo de feeds possíveis, focando exclusivamente na quantidade de IoCs." },
          { letter: 'B', text: "Feeds desatualizados ou de baixa qualidade geram mais falsos positivos do que detecções reais. Avalie a qualidade do feed, não apenas a quantidade." },
          { letter: 'C', text: "Atualizar os feeds de ameaças manualmente apenas uma vez a cada semestre." },
          { letter: 'D', text: "Usar feeds de Threat Intelligence apenas para tráfego ICMP." }
        ],
        correctOption: 'B',
        justification: "Na caixa BOAS PRÁTICAS do item 3.2.7: 'Feeds de threat intel desatualizados ou de baixa qualidade geram mais falsos positivos do que detecções reais. Avalie a qualidade do feed, não apenas a quantidade de indicadores.'"
      }
    ]
  },

  // CAPÍTULO 4
  4: {
    chapterNumber: 4,
    chapterTitle: "Inspeção de Tráfego",
    questions: [
      {
        id: 1,
        question: "Por que regras baseadas apenas em portas (L4) são consideradas trivialmente contornadas (item 4.1.2)?",
        options: [
          { letter: 'A', text: "Porque switches de rede bloqueiam portas TCP abaixo de 1024." },
          { letter: 'B', text: "Porque porta não define aplicação: HTTP pode rodar em qualquer porta, malware usa a 443 e aplicações corporativas usam portas dinâmicas." },
          { letter: 'C', text: "Porque o modelo OSI aboliu o protocolo TCP nas redes corporativas." },
          { letter: 'D', text: "Porque a camada L4 não possui campos de endereço de destino no cabeçalho." }
        ],
        correctOption: 'B',
        justification: "No item 4.1.2: 'Limitação crítica: porta não define aplicação. HTTP pode rodar em qualquer porta. Malware usa porta 443. Aplicações corporativas usam portas dinâmicas. Regras baseadas apenas em porta são trivialmente contornadas.'"
      },
      {
        id: 2,
        question: "Como o firewall opera na inspeção TLS para conexões de saída (outbound) de acordo com o item 4.3.1?",
        options: [
          { letter: 'A', text: "Atua como proxy passivo TAP sem intervir nas chaves de criptografia." },
          { letter: 'B', text: "Envia a senha do usuário em texto claro para o servidor de destino." },
          { letter: 'C', text: "Age como proxy intermediário: fecha sessão com o servidor usando o cert real, decripta, inspeciona e re-encripta para o cliente usando cert da CA interna." },
          { letter: 'D', text: "Desliga a criptografia do navegador do cliente de forma definitiva." }
        ],
        correctOption: 'C',
        justification: "No item 4.3.1: 'O firewall age como proxy TLS intermediário. Para conexões de saída (outbound), o firewall estabelece uma sessão TLS com o servidor externo (usando o certificado real do servidor), decripta o conteúdo, inspeciona e re-encripta para o cliente usando um certificado assinado pela CA interna.'"
      },
      {
        id: 3,
        question: "Como os dispositivos dos usuários passam a confiar nos certificados apresentados pelo firewall na inspeção TLS?",
        options: [
          { letter: 'A', text: "Os usuários devem clicar em 'Avançar de qualquer forma' a cada site visitado." },
          { letter: 'B', text: "A CA interna do firewall precisa estar na lista de CAs confiadas do dispositivo (via GPO no Windows, MDM ou manual)." },
          { letter: 'C', text: "O firewall falsifica assinaturas de CAs públicas da raiz mundial." },
          { letter: 'D', text: "Dispositivos Windows aceitam qualquer certificado gerado na porta 443 nativamente." }
        ],
        correctOption: 'B',
        justification: "No item 4.3.1: 'Para que o cliente confie no certificado apresentado pelo firewall, a CA interna precisa estar na lista de CAs confiadas do dispositivo. Isso é feito via GPO em ambientes Windows, MDM para dispositivos móveis e configuração manual para dispositivos não gerenciados.'"
      },
      {
        id: 4,
        question: "Por que o protocolo TLS 1.3 com Perfect Forward Secrecy (PFS) impossibilita a inspeção passiva (modo TAP)?",
        options: [
          { letter: 'A', text: "Porque cada sessão usa chaves efêmeras que não podem ser interceptadas passivamente, exigindo que o firewall seja um proxy ativo." },
          { letter: 'B', text: "Porque o TLS 1.3 removeu a criptografia dos pacotes HTTP." },
          { letter: 'C', text: "Porque switches gerenciáveis não suportam espelhamento de portas em TLS 1.3." },
          { letter: 'D', text: "Porque o PFS exige a presença de um servidor RADIUS em cada pacote." }
        ],
        correctOption: 'A',
        justification: "No item 4.3.2: 'TLS 1.3 com Perfect Forward Secrecy complica ainda mais: cada sessão usa chaves efêmeras que não podem ser interceptadas passivamente, exigindo que o firewall seja um proxy ativo — sem possibilidade de modo passivo (TAP).'"
      },
      {
        id: 5,
        question: "Quais são as exceções necessárias citadas no item 4.3.3 que NÃO devem ser inspecionadas via TLS?",
        options: [
          { letter: 'A', text: "Torrents P2P e sites de jogos online." },
          { letter: 'B', text: "Serviços bancários/financeiros, portais de saúde, domínios com certificate pinning e sistemas legados sem suporte a CA customizada." },
          { letter: 'C', text: "Webmails pessoais e redes sociais de funcionários." },
          { letter: 'D', text: "Tráfego de download de executáveis .exe da internet." }
        ],
        correctOption: 'B',
        justification: "No item 4.3.3: 'Exceções necessárias: serviços bancários e financeiros (pode quebrar certificate pinning), portais de saúde (regulação de privacidade de dados médicos), domínios com pinning de certificado (apps móveis, alguns SaaS) e sistemas legados sem suporte a CA customizada.'"
      },
      {
        id: 6,
        question: "Qual é o alerta regulatório expresso no Capítulo 4 sobre a inspeção TLS em serviços sensíveis?",
        options: [
          { letter: 'A', text: "Inspecionar serviços bancários gera multa obrigatória imediata da ICANN." },
          { letter: 'B', text: "TLS inspection em serviços de saúde, jurídico ou financeiro pode violar legislações de privacidade (LGPD, HIPAA). Documente exceções e embasamento legal; não presuma que inspecionar tudo é sempre correto." },
          { letter: 'C', text: "A LGPD proíbe qualquer firewall de operar em empresas brasileiras." },
          { letter: 'D', text: "Departamentos jurídicos devem ter todas as suas senhas gravadas no Traffic Log." }
        ],
        correctOption: 'B',
        justification: "Na caixa ATENÇÃO do item 4.3.3: 'TLS inspection em serviços de saúde, jurídico ou financeiro pode violar legislações de privacidade (LGPD, HIPAA, etc.). Documente as exceções e o embasamento legal. Não presuma que inspecionar tudo é sempre correto.'"
      },
      {
        id: 7,
        question: "Segundo dados de telemetria de 2025 citados no item 4.3.4, qual porcentagem do malware moderno usa canais criptografados?",
        options: [
          { letter: 'A', text: "Menos de 10%." },
          { letter: 'B', text: "Apenas 25%." },
          { letter: 'C', text: "Mais de 70%." },
          { letter: 'D', text: "Exatamente 50%." }
        ],
        correctOption: 'C',
        justification: "No item 4.3.4: 'Segundo dados de telemetria de 2025, mais de 70% do malware moderno usa canais criptografados para comunicação de C2 e exfiltração.'"
      },
      {
        id: 8,
        question: "Qual é a frase de fechamento da autora no Capítulo 4 sobre o tráfego criptografado?",
        options: [
          { letter: 'A', text: "A maior parte do ataque hoje vem criptografada. Não inspecionar TLS é uma opção consciente pela ignorância." },
          { letter: 'B', text: "O tráfego criptografado sempre será resolvido pelo roteador de borda." },
          { letter: 'C', text: "Quem tem certificação básica de redes não precisa inspecionar HTTPS." },
          { letter: 'D', text: "Basta bloquear o tráfego UDP para se proteger de malwares modernos." }
        ],
        correctOption: 'A',
        justification: "No fechamento do item 4.3.4: 'A maior parte do ataque hoje vem criptografada. Não inspecionar TLS é uma opção consciente pela ignorância.'"
      }
    ]
  },

  // CAPÍTULO 5
  5: {
    chapterNumber: 5,
    chapterTitle: "Controle de Aplicações",
    questions: [
      {
        id: 1,
        question: "Qual frase de impacto define a visão da autora no início do Capítulo 5?",
        options: [
          { letter: 'A', text: "Porta define aplicação com absoluta precisão matemática." },
          { letter: 'B', text: "Porta não define aplicação há anos. Política por porta é arqueologia de redes." },
          { letter: 'C', text: "Bloquear portas 80 e 443 é a solução definitiva de segurança." },
          { letter: 'D', text: "Aplicações de Shadow IT não trazem nenhum risco ao compliance corporativo." }
        ],
        correctOption: 'B',
        justification: "Na abertura do Capítulo 5: 'Porta não define aplicação há anos. Política por porta é arqueologia de redes.'"
      },
      {
        id: 2,
        question: "Como funcionam as 'Assinaturas de Aplicação' e qual sua principal limitação (item 5.1.1)?",
        options: [
          { letter: 'A', text: "São imutáveis e dispensam atualizações após a instalação da licença." },
          { letter: 'B', text: "Identificam padrões em bytes, mensagens e handshakes; sua limitação é exigir atualização constante, pois aplicações e versões mudam, e apps obscuros podem não ter assinatura." },
          { letter: 'C', text: "Funcionam apenas para pacotes ICMP não criptografados." },
          { letter: 'D', text: "São criadas exclusivamente por inteligência artificial em tempo de boot." }
        ],
        correctOption: 'B',
        justification: "No item 5.1.1: 'Banco de dados de padrões conhecidos de cada aplicação... Limitação: requer atualização constante. Aplicações mudam, versões novas podem ter protocolo diferente e aplicações obscuras ou customizadas podem não ter assinatura.'"
      },
      {
        id: 3,
        question: "O que caracteriza a 'Classificação Comportamental' de aplicações (item 5.1.2)?",
        options: [
          { letter: 'A', text: "Identifica a aplicação pelo nome do arquivo baixado pelo usuário." },
          { letter: 'B', text: "Analisa tamanho de pacotes, temporização, razão enviados vs. recebidos, conexões simultâneas e DNS; é útil para apps sem assinatura, mas mais propensa a falsos positivos." },
          { letter: 'C', text: "Depende de certificados assinados pelo Active Directory para cada pacote." },
          { letter: 'D', text: "Executa todos os pacotes em máquinas virtuais de sandbox antes do roteamento." }
        ],
        correctOption: 'B',
        justification: "No item 5.1.2: 'Identifica aplicações pelo comportamento do fluxo: padrão de tamanho de pacotes, temporização, razão de dados enviados vs. recebidos, número de conexões simultâneas, uso de DNS... Mais propenso a falsos positivos do que assinaturas.'"
      },
      {
        id: 4,
        question: "O que é Shadow IT segundo o Capítulo 5?",
        options: [
          { letter: 'A', text: "O time de segurança que opera firewalls em turnos noturnos." },
          { letter: 'B', text: "O uso de aplicações e serviços de TI não aprovados pela organização (armazenamento pessoal, comunicadores, IA sem contrato, proxies)." },
          { letter: 'C', text: "Um recurso de alta disponibilidade que espelha as regras em segundo plano." },
          { letter: 'D', text: "Servidores instalados em datacenters sem redundância de fonte elétrica." }
        ],
        correctOption: 'B',
        justification: "No item 5.2: 'Shadow IT é o uso de aplicações e serviços de TI não aprovados pela organização: armazenamento pessoal em nuvem, aplicativos de mensagens, ferramentas de IA sem contrato corporativo, proxies anonimizadores e dezenas de outros serviços...'"
      },
      {
        id: 5,
        question: "Quais são os riscos do Shadow IT apontados pela autora no item 5.2?",
        options: [
          { letter: 'A', text: "Redução da temperatura dos appliances na sala de servidores." },
          { letter: 'B', text: "Dados corporativos em sistemas sem controles adequados, violação de compliance (LGPD, SOX, PCI), malware em canais não monitorados e exfiltração de dados." },
          { letter: 'C', text: "Aumento desnecessário da largura de banda para atualizações de firmware." },
          { letter: 'D', text: "Incompatibilidade imediata com placas de rede RJ45 1G legadas." }
        ],
        correctOption: 'B',
        justification: "No item 5.2: 'O risco: dados corporativos em sistemas sem controles adequados, violação de compliance (LGPD, SOX, PCI), malware distribuído por canais não monitorados e exfiltração de dados acidental ou intencional.'"
      },
      {
        id: 6,
        question: "Qual conselho de BOAS PRÁTICAS a autora fornece sobre como lidar com o Shadow IT?",
        options: [
          { letter: 'A', text: "Bloquear tudo sem aviso para forçar a demissão de usuários infratores." },
          { letter: 'B', text: "Antes de bloquear agressivamente, entenda por que usam aquelas ferramentas; frequentemente indica lacunas nas ferramentas corporativas. Bloquear sem alternativa cria Shadow IT mais sofisticado." },
          { letter: 'C', text: "Permitir qualquer aplicativo para evitar atritos com os diretores de negócio." },
          { letter: 'D', text: "Criar regras ANY ANY ANY específicas para cada aplicativo de mensagens." }
        ],
        correctOption: 'B',
        justification: "Na caixa BOAS PRÁTICAS do item 5.2: 'Antes de bloquear Shadow IT agressivamente, entenda por que os usuários estão usando aquelas ferramentas. Frequentemente indica lacunas nas ferramentas corporativas aprovadas. Bloquear sem oferecer alternativa cria Shadow IT mais sofisticado.'"
      },
      {
        id: 7,
        question: "Na tabela de exemplos de política de aplicação (item 5.3), qual é a recomendação para 'Proxies anonimizadores'?",
        options: [
          { letter: 'A', text: "Permitido apenas durante o horário de almoço." },
          { letter: 'B', text: "Bloqueio total. Indicador de tentativa de evasão de controles." },
          { letter: 'C', text: "Permitido apenas para a equipe de recursos humanos." },
          { letter: 'D', text: "Permitido caso o usuário instale a CA interna no navegador." }
        ],
        correctOption: 'B',
        justification: "Na tabela do item 5.3: 'Proxies anonimizadores: Bloqueio total. Indicador de tentativa de evasão de controles.'"
      },
      {
        id: 8,
        question: "Qual política de aplicação é recomendada no item 5.3 para 'Ferramentas de IA generativa'?",
        options: [
          { letter: 'A', text: "Bloqueio total e irrevogável em todas as redes." },
          { letter: 'B', text: "Liberação sem restrições em qualquer porta ou protocolo." },
          { letter: 'C', text: "Política específica: permitido com restrição de categoria de dado transmitido." },
          { letter: 'D', text: "Permitido apenas se conectado via cabo serial de console out-of-band." }
        ],
        correctOption: 'C',
        justification: "Na tabela do item 5.3: 'Ferramentas de IA generativa: Política específica: permitido com restrição de categoria de dado transmitido.'"
      }
    ]
  },

  // CAPÍTULO 6
  6: {
    chapterNumber: 6,
    chapterTitle: "Controle por Identidade",
    questions: [
      {
        id: 1,
        question: "Qual é a frase de abertura do Capítulo 6 sobre a volatilidade do IP?",
        options: [
          { letter: 'A', text: "O endereço IP estático é a credencial mais segura e permanente da rede." },
          { letter: 'B', text: "IP é descartável. Identidade não. Política por IP é a cenoura que qualquer atacante com DHCP consegue mover." },
          { letter: 'C', text: "Controladores de domínio não devem se comunicar com appliances de firewall." },
          { letter: 'D', text: "Usuários remotos nunca mudam de IP em sessões corporativas." }
        ],
        correctOption: 'B',
        justification: "Na abertura do Capítulo 6: 'IP é descartável. Identidade não. Política por IP é a cenoura que qualquer atacante com DHCP consegue mover.'"
      },
      {
        id: 2,
        question: "Por que políticas de firewall baseadas puramente em IP tornam-se não determinísticas em ambientes corporativos modernos (item 6.1)?",
        options: [
          { letter: 'A', text: "Porque provedores de internet bloquearam o protocolo ARP." },
          { letter: 'B', text: "Devido a DHCP dinâmico, VDI/desktop as a service, pools de VPN e dispositivos compartilhados com múltiplos usuários no mesmo IP em momentos distintos." },
          { letter: 'C', text: "Porque placas de rede modernas não utilizam mais endereços MAC." },
          { letter: 'D', text: "Porque o firewall stateful não consegue registrar portas TCP no log." }
        ],
        correctOption: 'B',
        justification: "No item 6.1: 'DHCP distribui IPs dinamicamente; VDI e desktop como serviço mudam IPs frequentemente; notebooks em home office usam VPN com IPs de pool; dispositivos compartilhados... têm múltiplos usuários no mesmo IP em momentos diferentes.'"
      },
      {
        id: 3,
        question: "Qual é o método mais comum de mapeamento IP-Usuário descrito no item 6.2?",
        options: [
          { letter: 'A', text: "Digitação manual do IP e nome do usuário na CLI do firewall toda manhã." },
          { letter: 'B', text: "Leitura de eventos do DC: o agente monitora eventos de logon no controlador de domínio (Event IDs 4768, 4769, 4624) e mapeia o IP ao usuário autenticado." },
          { letter: 'C', text: "Monitoramento exclusivo de pacotes ICMP ping enviados pelo usuário." },
          { letter: 'D', text: "Consultas DNS reversas a cada pacote transmitido." }
        ],
        correctOption: 'B',
        justification: "Na tabela do item 6.2: 'Leitura de eventos do DC: Mais comum. O agente monitora eventos de logon no controlador de domínio (Event IDs 4768, 4769, 4624) e mapeia o IP ao usuário autenticado.'"
      },
      {
        id: 4,
        question: "Qual método de mapeamento IP-Usuário oferece maior precisão e cobertura segundo o item 6.2?",
        options: [
          { letter: 'A', text: "Captive portal para servidores de banco de dados." },
          { letter: 'B', text: "Agente no endpoint: instalado no cliente, reporta ao firewall qual usuário está logado." },
          { letter: 'C', text: "Inspeção de cabeçalhos TTL na camada L3." },
          { letter: 'D', text: "RADIUS Accounting compartilhado em redes cabeadas sem autenticação." }
        ],
        correctOption: 'B',
        justification: "Na tabela do item 6.2: 'Agente no endpoint: Instalado no cliente, reporta ao firewall qual usuário está logado. Mais preciso, maior cobertura.'"
      },
      {
        id: 5,
        question: "Qual método de mapeamento é recomendado especificamente para 'dispositivos não gerenciados'?",
        options: [
          { letter: 'A', text: "GPO do Active Directory." },
          { letter: 'B', text: "Captive portal: o usuário autentica no portal do firewall para liberar acesso." },
          { letter: 'C', text: "Instalação forçada de software kernel nos celulares pessoais." },
          { letter: 'D', text: "Atribuição de IP público estático a cada visitante." }
        ],
        correctOption: 'B',
        justification: "Na tabela do item 6.2: 'Captive portal: Para dispositivos não gerenciados. O usuário autentica no portal do firewall para liberar acesso.'"
      },
      {
        id: 6,
        question: "Qual é a grande vantagem prática de integrar o firewall com o diretório corporativo (Active Directory/LDAP), como exemplificado no item 6.3?",
        options: [
          { letter: 'A', text: "Criar regras baseadas em grupos de segurança (ex: Grupo Financeiro acessa ERP); quando um usuário entra ou sai do grupo no AD, a política ajusta automaticamente sem listar IPs." },
          { letter: 'B', text: "Permitir que o firewall assuma o papel de controlador primário de domínio da floresta." },
          { letter: 'C', text: "Eliminar a necessidade de senhas para todos os usuários da empresa." },
          { letter: 'D', text: "Aumentar a velocidade física dos cabos Ethernet da rede local." }
        ],
        correctOption: 'A',
        justification: "No item 6.3: 'Exemplo prático: criar política 'Grupo: Financeiro pode acessar aplicação ERP de qualquer origem' sem listar IPs. Quando o usuário entra ou sai do grupo no AD, a política ajusta automaticamente.'"
      },
      {
        id: 7,
        question: "O que o recurso User-ID muda fundamentalmente nas investigações de segurança (item 6.4)?",
        options: [
          { letter: 'A', text: "Impede que qualquer usuário cometa erros operacionais." },
          { letter: 'B', text: "O log de auditoria inclui o nome do usuário e não apenas o IP, tornando possível responder 'quem fez isso' e não apenas 'qual IP fez isso'." },
          { letter: 'C', text: "Bloqueia automaticamente o acesso à internet de usuários não gerenciais." },
          { letter: 'D', text: "Remove os registros de data e hora para compactar os logs de tráfego." }
        ],
        correctOption: 'B',
        justification: "No item 6.4: 'Com User-ID, o log de auditoria inclui o nome do usuário, não apenas o IP. Investigar incidentes torna-se possível. Você pode responder 'quem fez isso', e não apenas 'qual IP fez isso'.'"
      },
      {
        id: 8,
        question: "Como o alerta de ATENÇÃO do Capítulo 6 instrui a tratar dispositivos que não se autenticam no domínio (IoT, guests, BYOD)?",
        options: [
          { letter: 'A', text: "Conceder acesso de administrador para evitar chamados ao suporte." },
          { letter: 'B', text: "Tratar tráfego sem identidade conhecida como grupo de menor privilégio." },
          { letter: 'C', text: "Desativar o firewall para esses dispositivos." },
          { letter: 'D', text: "Mapeá-los compulsoriamente como usuários do grupo Financeiro." }
        ],
        correctOption: 'B',
        justification: "Na caixa ATENÇÃO do item 6.4: 'User-ID depende de autenticação de domínio confiável. Dispositivos pessoais, guests e dispositivos IoT não autenticados no domínio não são mapeados. Trate tráfego sem identidade conhecida como grupo de menor privilégio.'"
      }
    ]
  },

  // CAPÍTULO 7
  7: {
    chapterNumber: 7,
    chapterTitle: "Arquiteturas Reais",
    questions: [
      {
        id: 1,
        question: "Qual é o problema crítico da clássica 'Arquitetura de Perímetro' apontado no item 7.1?",
        options: [
          { letter: 'A', text: "Não permitir a conexão de cabos de fibra óptica na borda." },
          { letter: 'B', text: "Assumir que tudo dentro do perímetro é confiável, premissa fundamentalmente errada em 2026 com phishing, BYOD, supply chain e insider threats." },
          { letter: 'C', text: "Impedir o funcionamento de VPNs de acesso remoto para filiais." },
          { letter: 'D', text: "Exigir a compra de roteadores de outras marcas para a rede externa." }
        ],
        correctOption: 'B',
        justification: "No item 7.1: 'Problema crítico: assume que tudo dentro do perímetro é confiável. Em 2026, com phishing sofisticado, dispositivos pessoais, supply chain attacks e insider threats, essa premissa está fundamentalmente errada.'"
      },
      {
        id: 2,
        question: "Qual é o propósito da zona de 'Banco de Dados' na tabela de segmentação interna do item 7.2?",
        options: [
          { letter: 'A', text: "Acesso público direto de qualquer usuário via internet." },
          { letter: 'B', text: "Acesso restrito apenas aos servidores de aplicação autorizados." },
          { letter: 'C', text: "Hospedar computadores de visitantes e dispositivos de desenvolvimento." },
          { letter: 'D', text: "Permitir conexões administrativas sem criptografia para agilizar backups." }
        ],
        correctOption: 'B',
        justification: "Na tabela do item 7.2: 'Banco de Dados: Acesso restrito apenas aos servidores de aplicação autorizados.'"
      },
      {
        id: 3,
        question: "Em arquitetura de Data Center (item 7.3), como se caracterizam os tráfegos Norte-Sul e Leste-Oeste?",
        options: [
          { letter: 'A', text: "Tráfego Norte-Sul é entre servidores internos; Leste-Oeste é a saída para a internet." },
          { letter: 'B', text: "Norte-Sul é entrando/saindo do DC; Leste-Oeste é entre servidores dentro do DC, sendo frequentemente muito maior em volume do que o Norte-Sul." },
          { letter: 'C', text: "Tráfego Leste-Oeste nunca deve ser inspecionado por firewalls." },
          { letter: 'D', text: "Tráfego Norte-Sul só existe em ambientes de nuvem pública multicloud." }
        ],
        correctOption: 'B',
        justification: "No item 7.3: 'Em data centers, o firewall protege: tráfego norte-sul (entrando e saindo do DC) e tráfego leste-oeste (entre servidores dentro do DC). O tráfego leste-oeste é frequentemente maior em volume do que o norte-sul.'"
      },
      {
        id: 4,
        question: "Qual é o principal problema da topologia 'Hub and Spoke' descrito no item 7.5.1?",
        options: [
          { letter: 'A', text: "Não permitir a criação de túneis VPN com as filiais." },
          { letter: 'B', text: "Todo tráfego de filial para internet passa pelo hub central, criando gargalo em caso de problemas no hub." },
          { letter: 'C', text: "Exigir um appliance de firewall físico diferente em cada usuário de home office." },
          { letter: 'D', text: "Impossibilidade de aplicar políticas centralizadas de segurança." }
        ],
        correctOption: 'B',
        justification: "No item 7.5.1: 'Todo tráfego de filial para internet ou outros recursos passa pelo hub central onde está o NGFW de inspeção. Simples de gerenciar, mas cria gargalo em caso de problemas no hub.'"
      },
      {
        id: 5,
        question: "O que caracteriza a topologia 'Distributed / Mesh' segundo o item 7.5.2?",
        options: [
          { letter: 'A', text: "Ausência total de firewalls em filiais, confiando nos roteadores dos provedores." },
          { letter: 'B', text: "Cada filial tem NGFW local com inspeção completa; o tráfego de internet sai localmente sem hair-pinning para o hub, sendo mais resiliente, porém mais complexo de gerenciar." },
          { letter: 'C', text: "Uso obrigatório de satélites dedicados para tráfego bancário." },
          { letter: 'D', text: "Eliminação de todas as zonas de rede interna nas filiais." }
        ],
        correctOption: 'B',
        justification: "No item 7.5.2: 'Cada filial tem NGFW local com inspeção completa. Tráfego de internet sai localmente sem hair-pinning para o hub. Mais resiliente, porém mais complexo de gerenciar de forma consistente.'"
      },
      {
        id: 6,
        question: "Quais são os componentes típicos citados para a arquitetura SASE no item 7.5.3?",
        options: [
          { letter: 'A', text: "Cabos coaxiais, hubs passivos, modems discados e bridges." },
          { letter: 'B', text: "SD-WAN, FWaaS, CASB, ZTNA, SWG." },
          { letter: 'C', text: "Apenas antivírus de endpoint e servidor de e-mail local." },
          { letter: 'D', text: "Roteadores estáticos sem suporte a criptografia." }
        ],
        correctOption: 'B',
        justification: "No item 7.5.3: 'Componentes típicos: SD-WAN, FWaaS, CASB, ZTNA, SWG.'"
      },
      {
        id: 7,
        question: "Como o NGFW atua dentro de uma arquitetura Zero Trust (item 7.6)?",
        options: [
          { letter: 'A', text: "Elimina a necessidade de autenticar usuários na rede." },
          { letter: 'B', text: "Aplica microssegmentação, valida identidade e postura do dispositivo antes de autorizar acesso e inspeciona todo o tráfego, incluindo o lateral (leste-oeste)." },
          { letter: 'C', text: "Desativa a inspeção L7 para dar velocidade irrestrita aos servidores de produção." },
          { letter: 'D', text: "Substitui todas as regras manuais por regras temporárias ANY ANY ANY." }
        ],
        correctOption: 'B',
        justification: "No item 7.6: 'O NGFW no modelo Zero Trust: aplica microssegmentação entre recursos, valida identidade e postura do dispositivo antes de autorizar acesso e inspeciona todo o tráfego, incluindo o lateral (leste-oeste).'"
      },
      {
        id: 8,
        question: "O que a autora adverte na caixa de ATENÇÃO sobre promessas de 'Zero Trust em 30 dias'?",
        options: [
          { letter: 'A', text: "É perfeitamente viável se contratada uma consultoria especializada em nuvem." },
          { letter: 'B', text: "'Implementamos Zero Trust' dito em 30 dias provavelmente significa que instalaram um produto com 'Zero Trust' no nome. ZTA real é uma jornada arquitetural de anos, não uma compra de produto." },
          { letter: 'C', text: "Zero Trust só pode ser adquirido se o cliente assinar o pacote anual de hardware." },
          { letter: 'D', text: "Qualquer empresa com Active Directory já possui Zero Trust completo implementado." }
        ],
        correctOption: 'B',
        justification: "Na caixa ATENÇÃO do item 7.6: ''Implementamos Zero Trust' dito em 30 dias provavelmente significa que instalaram um produto com 'Zero Trust' no nome. ZTA real é uma jornada arquitetural de anos, não uma compra de produto.'"
      }
    ]
  },

  // CAPÍTULO 8
  8: {
    chapterNumber: 8,
    chapterTitle: "Alta Disponibilidade",
    questions: [
      {
        id: 1,
        question: "Qual é a frase contundente da autora que abre o Capítulo 8 sobre Alta Disponibilidade?",
        options: [
          { letter: 'A', text: "Dois firewalls sempre garantem 100% de disponibilidade em qualquer ambiente." },
          { letter: 'B', text: "HA mal feito derruba mais do que ajuda. Um par de firewalls mal configurados é dois pontos de falha com sincronização." },
          { letter: 'C', text: "Ambientes de produção dispensam redundância caso possuam nobreaks triplos." },
          { letter: 'D', text: "O modo Active-Active nunca apresenta tráfego assimétrico na prática." }
        ],
        correctOption: 'B',
        justification: "Na abertura do Capítulo 8: 'HA mal feito derruba mais do que ajuda. Um par de firewalls mal configurados é dois pontos de falha com sincronização.'"
      },
      {
        id: 2,
        question: "Quais são as principais características do modo Active-Passive (item 8.1)?",
        options: [
          { letter: 'A', text: "Ambos os firewalls processam 50% do tráfego corporativo simultaneamente." },
          { letter: 'B', text: "Um firewall processa todo o tráfego; o segundo fica em standby sincronizando estado; tem simplicidade e previsibilidade, mas capacidade do standby fica ociosa." },
          { letter: 'C', text: "Elimina a necessidade de cabos de sincronização de estado dedicados." },
          { letter: 'D', text: "O standby não assume o tráfego se houver queda da unidade principal." }
        ],
        correctOption: 'B',
        justification: "No item 8.1: 'Um firewall ativo processa todo o tráfego. O segundo está em standby, recebendo sincronização de estado... Vantagens: simplicidade, previsibilidade... Desvantagens: capacidade do standby não é utilizada...'"
      },
      {
        id: 3,
        question: "Qual é a grande complicação operacional do modo Active-Active destacada no item 8.2 e no alerta de ATENÇÃO?",
        options: [
          { letter: 'A', text: "Impossibilidade de configurar endereços IP nas interfaces físicas." },
          { letter: 'B', text: "Tráfego assimétrico (pacotes de ida e volta em firewalls diferentes) pode causar problemas de estado e descarte de pacotes; exige garantir simetria ou sincronização em tempo real." },
          { letter: 'C', text: "Não permitir a utilização do throughput agregado de ambos os appliances." },
          { letter: 'D', text: "Obrigação de usar exclusivamente links de internet discados." }
        ],
        correctOption: 'B',
        justification: "Na caixa ATENÇÃO do item 8.2: 'Active-active com tráfego assimétrico (pacotes de ida e volta em firewalls diferentes) pode causar problemas de estado e descarte de pacotes. Garanta simetria de fluxo ou use sincronização de estado em tempo real.'"
      },
      {
        id: 4,
        question: "O que tipicamente NÃO é sincronizado entre os firewalls pelo link de HA (item 8.3)?",
        options: [
          { letter: 'A', text: "Tabela de sessões TCP/UDP." },
          { letter: 'B', text: "Configuração de NAT e tabelas de roteamento dinâmico." },
          { letter: 'C', text: "Sessões de VPN SSL em negociação e alguns estados de proxy." },
          { letter: 'D', text: "Políticas e regras de segurança configuradas." }
        ],
        correctOption: 'C',
        justification: "No item 8.3: 'O que geralmente não é sincronizado: sessões de VPN SSL em negociação e alguns estados de proxy.'"
      },
      {
        id: 5,
        question: "Qual recomendação crítica de BOAS PRÁTICAS é dada para o link de sincronização de HA no item 8.3?",
        options: [
          { letter: 'A', text: "Compartilhar a mesma VLAN de produção para economizar portas do switch." },
          { letter: 'B', text: "Use um link dedicado e redundante para sincronização de HA; não compartilhe com tráfego de produção, pois falha no link pode causar split-brain (ambos acreditam ser primários)." },
          { letter: 'C', text: "Conectar o link de sincronização via túnel de VPN na internet pública." },
          { letter: 'D', text: "Desativar o heartbeat para evitar consumo de banda entre os equipamentos." }
        ],
        correctOption: 'B',
        justification: "Na caixa BOAS PRÁTICAS do item 8.3: 'Use um link dedicado e redundante para sincronização de HA. Não compartilhe com tráfego de produção. Falha no link de sync pode causar split-brain: ambos os nodes acreditam ser primários.'"
      },
      {
        id: 6,
        question: "O que é 'Preemption' e qual risco ela traz para o ambiente segundo a tabela do item 8.4?",
        options: [
          { letter: 'A', text: "É a exclusão automática de regras sem owner; não traz nenhum impacto à rede." },
          { letter: 'B', text: "Se o primário se recupera, ele reassume automaticamente; cuidado, pois pode causar um segundo failover." },
          { letter: 'C', text: "É a aceleração de pacotes criptografados por hardware ASIC." },
          { letter: 'D', text: "É o tempo máximo tolerado de parada antes da contratação de um novo appliance." }
        ],
        correctOption: 'B',
        justification: "Na tabela do item 8.4: 'Preemption: Se o primário se recupera, ele reassume automaticamente? Cuidado: pode causar um segundo failover.'"
      },
      {
        id: 7,
        question: "Qual é o tempo típico de 'Detection Time' (heartbeat timeout) para detecção de falha do nó primário (item 8.4)?",
        options: [
          { letter: 'A', text: "10 a 15 minutos." },
          { letter: 'B', text: "1 a 5 segundos." },
          { letter: 'C', text: "Menos de 1 microssegundo." },
          { letter: 'D', text: "Exatamente 24 horas." }
        ],
        correctOption: 'B',
        justification: "Na tabela do item 8.4: 'Detection Time: Tempo para detectar falha do primário (heartbeat timeout). Típico: 1 a 5 segundos.'"
      },
      {
        id: 8,
        question: "O que significa o conceito RTO no dimensionamento de Alta Disponibilidade (item 8.4)?",
        options: [
          { letter: 'A', text: "Recovery Time Objective — tempo máximo de interrupção tolerado; defina e teste periodicamente." },
          { letter: 'B', text: "Routing Table Optimization — número máximo de rotas OSPF suportadas pelo kernel." },
          { letter: 'C', text: "Remote Terminal Operator — credencial usada pelo suporte externo do fabricante." },
          { letter: 'D', text: "Redundant Throughput Output — volume total em Gbps das interfaces de cluster." }
        ],
        correctOption: 'A',
        justification: "Na tabela do item 8.4: 'RTO: Recovery Time Objective — tempo máximo de interrupção tolerado. Defina e teste periodicamente.'"
      }
    ]
  },

  // CAPÍTULO 9
  9: {
    chapterNumber: 9,
    chapterTitle: "Desempenho e Dimensionamento",
    questions: [
      {
        id: 1,
        question: "Qual é a segunda maior fonte de problemas em projetos de NGFW segundo o Capítulo 9?",
        options: [
          { letter: 'A', text: "Cabos de rede rompidos por roedores." },
          { letter: 'B', text: "Dimensionamento incorreto (a primeira são as pessoas)." },
          { letter: 'C', text: "Falta de certificação dos analistas juniores." },
          { letter: 'D', text: "Incompatibilidade de tomadas elétricas no rack." }
        ],
        correctOption: 'B',
        justification: "Na abertura do Capítulo 9: 'Dimensionamento incorreto é a segunda maior fonte de problemas em projetos de NGFW (a primeira são as pessoas). Subdimensionar cria gargalo. Superdimensionar desperdiça orçamento.'"
      },
      {
        id: 2,
        question: "Qual margem de crescimento deve ser projetada para 3 anos na metodologia de dimensionamento (item 9.1)?",
        options: [
          { letter: 'A', text: "5% a 10%." },
          { letter: 'B', text: "30% a 50% sobre o dimensionamento atual." },
          { letter: 'C', text: "Pelo menos 300% para qualquer tamanho de empresa." },
          { letter: 'D', text: "Nenhuma margem, pois nuvens públicas dispensam previsões." }
        ],
        correctOption: 'B',
        justification: "No item 9.1, passo 4: 'Adicione margem de crescimento. Projete para 3 anos. Adicione 30% a 50% sobre o dimensionamento atual.'"
      },
      {
        id: 3,
        question: "Por que os fatores de redução de throughput de features ativas NÃO devem ser somados linearmente (item 9.1)?",
        options: [
          { letter: 'A', text: "Porque o impacto de desempenho é cumulativo e não linear." },
          { letter: 'B', text: "Porque somar linearmente ultrapassaria 100% no primeiro cálculo." },
          { letter: 'C', text: "Porque as CPUs modernas dobram sua frequência quando sobrecarregadas." },
          { letter: 'D', text: "Porque fabricantes de firewall proíbem cálculos matemáticos nos contratos." }
        ],
        correctOption: 'A',
        justification: "No item 9.1, passo 3: 'Aplique fatores de redução de throughput para cada feature ativa. Não some os fatores linearmente — o impacto é cumulativo e não linear.'"
      },
      {
        id: 4,
        question: "Por que 'Throughput com TLS Inspection' é descrita como a métrica mais importante para dimensionamento (item 9.2)?",
        options: [
          { letter: 'A', text: "Porque ela indica a capacidade total das placas de rede quando o cabo está desconectado." },
          { letter: 'B', text: "Porque se você vai inspecionar HTTPS, ela representa a capacidade real, sendo geralmente de apenas 20% a 50% do NGFW throughput nominal." },
          { letter: 'C', text: "Porque elimina o processamento de regras de negação explícita." },
          { letter: 'D', text: "Porque garante que nenhuma conexão use portas dinâmicas." }
        ],
        correctOption: 'B',
        justification: "Na tabela do item 9.2: 'Throughput com TLS Inspection: Sua métrica mais importante se você vai inspecionar HTTPS. Geralmente 20% a 50% do NGFW throughput nominal.'"
      },
      {
        id: 5,
        question: "O que o item 9.2 destaca sobre a métrica 'CPS com TLS Handshake'?",
        options: [
          { letter: 'A', text: "O TLS handshake não consome ciclos de processador." },
          { letter: 'B', text: "O TLS handshake é caro computacionalmente; ambientes com muitas conexões HTTPS curtas podem saturar CPS antes do throughput em bits." },
          { letter: 'C', text: "Conexões curtas reduzem automaticamente a taxa de ocupação da memória RAM." },
          { letter: 'D', text: "Ela só tem relevância se a empresa utilizar switches sem gerenciamento." }
        ],
        correctOption: 'B',
        justification: "Na tabela do item 9.2: 'CPS com TLS Handshake: TLS handshake é caro computacionalmente. Ambientes com muitas conexões HTTPS curtas podem saturar CPS antes do throughput em bits.'"
      },
      {
        id: 6,
        question: "Qual passo final da metodologia de dimensionamento é considerado indispensável antes de assinar o contrato (item 9.1)?",
        options: [
          { letter: 'A', text: "Consultar a pontuação de benchmarks genéricos em sites de fóruns." },
          { letter: 'B', text: "Valide com PoC. Teste em ambiente representativo antes de assinar o contrato." },
          { letter: 'C', text: "Pedir que o vendedor garanta os números do datasheet verbalmente." },
          { letter: 'D', text: "Comprar duas unidades extras sem ligá-las ao rack de homologação." }
        ],
        correctOption: 'B',
        justification: "No item 9.1, passo 5: 'Valide com PoC. Teste em ambiente representativo antes de assinar o contrato.'"
      },
      {
        id: 7,
        question: "Qual dos seguintes itens é apontado como um 'Erro Clássico de Dimensionamento' no item 9.3?",
        options: [
          { letter: 'A', text: "Usar o throughput de firewall simples como referência para compra de NGFW com todas as features." },
          { letter: 'B', text: "Planejar a compra considerando 3 anos de crescimento de tráfego." },
          { letter: 'C', text: "Avaliar o impacto de descriptografia TLS antes do deployment." },
          { letter: 'D', text: "Validar o comportamento do appliance com testes de PoC." }
        ],
        correctOption: 'A',
        justification: "No item 9.3: 'Erros Clássicos de Dimensionamento: • Usar o throughput de firewall simples como referência para compra de NGFW com todas as features.'"
      },
      {
        id: 8,
        question: "Qual erro financeiro comum de aquisição é advertido no fechamento do item 9.3?",
        options: [
          { letter: 'A', text: "Gastar dinheiro comprando nobreaks redundantes com diversidade elétrica." },
          { letter: 'B', text: "Comprar por preço sem considerar custo de licenciamento de features por 3 a 5 anos." },
          { letter: 'C', text: "Pagar antecipadamente salários de engenheiros sêniores de rede." },
          { letter: 'D', text: "Contratar links dedicados de fibra com transceivers SFP+ originais." }
        ],
        correctOption: 'B',
        justification: "No item 9.3: '• Comprar por preço sem considerar custo de licenciamento de features por 3 a 5 anos.'"
      }
    ]
  },

  // CAPÍTULO 10
  10: {
    chapterNumber: 10,
    chapterTitle: "Erros Clássicos",
    questions: [
      {
        id: 1,
        question: "Qual é a frase de abertura do Capítulo 10 sobre como ocorrem os ataques?",
        options: [
          { letter: 'A', text: "O ataque derruba as portas físicas do datacenter." },
          { letter: 'B', text: "O ataque não invade o firewall. Ele passa por ele." },
          { letter: 'C', text: "Firewalls com IPS bloqueiam 100% dos ataques mesmo com regras permissivas." },
          { letter: 'D', text: "Os invasores sempre exploram falhas de microcódigo nos chips ASIC." }
        ],
        correctOption: 'B',
        justification: "Na abertura do Capítulo 10: 'O ataque não invade o firewall. Ele passa por ele.'"
      },
      {
        id: 2,
        question: "Como a autora define textualmente a regra 'ANY ANY ANY' no item 10.1?",
        options: [
          { letter: 'A', text: "Uma boa prática para ambientes de desenvolvimento ágil." },
          { letter: 'B', text: "ANY ANY ANY é basicamente um pedido formal para ser invadido." },
          { letter: 'C', text: "Uma regra de balanceamento dinâmico entre clusters de HA." },
          { letter: 'D', text: "Um comando de diagnóstico que desliga o kernel sem risco." }
        ],
        correctOption: 'B',
        justification: "No item 10.1: 'ANY ANY ANY é basicamente um pedido formal para ser invadido.'"
      },
      {
        id: 3,
        question: "Como uma regra ANY ANY ANY costuma surgir em ambientes de produção reais (item 10.1)?",
        options: [
          { letter: 'A', text: "O fabricante envia a regra automaticamente via atualização de firmware." },
          { letter: 'B', text: "Time de suporte coloca regra permissiva para investigar problema, o problema é resolvido, a regra permanece. Ou colocada como padrão 'para não ter problemas' e jamais revisada." },
          { letter: 'C', text: "Ela é gerada pelo controlador de domínio quando o cabo de rede é desconectado." },
          { letter: 'D', text: "Por falha na memória RAM do sistema durante quedas de energia." }
        ],
        correctOption: 'B',
        justification: "No item 10.1: 'Como acontece: time de suporte coloca regra permissiva para investigar problema, o problema é resolvido, a regra permanece. Ou pior: é colocada como regra padrão 'para não ter problemas' e jamais revisada.'"
      },
      {
        id: 4,
        question: "A que a autora compara a operação de um NGFW sem TLS inspection em 2026 (item 10.2)?",
        options: [
          { letter: 'A', text: "A um cofre bancário com duas portas de titânio." },
          { letter: 'B', text: "Equivalente a ter um alarme de segurança desligado 95% do tempo." },
          { letter: 'C', text: "A um switch gerenciável de alta performance." },
          { letter: 'D', text: "A um servidor de arquivos sem disco de backup." }
        ],
        correctOption: 'B',
        justification: "No item 10.2: 'Em 2026, operar NGFW sem TLS inspection é equivalente a ter um alarme de segurança desligado 95% do tempo.'"
      },
      {
        id: 5,
        question: "O que a autora diz sobre as justificativas comuns para não inspecionar TLS ('vai impactar performance', 'vai quebrar apps', 'usuários vão reclamar')?",
        options: [
          { letter: 'A', text: "São argumentos técnicos irrefutáveis que devem ser aceitos." },
          { letter: 'B', text: "Nenhuma justificativa é técnica. Todas são gerenciais." },
          { letter: 'C', text: "São motivos válidos previstos na legislação da LGPD." },
          { letter: 'D', text: "Indicam que a empresa deve abandonar completamente o uso de firewalls." }
        ],
        correctOption: 'B',
        justification: "No item 10.2: 'Nenhuma justificativa é técnica. Todas são gerenciais.'"
      },
      {
        id: 6,
        question: "Por que a 'Falta de Segmentação' (rede plana) é descrita como o sonho de qualquer atacante (item 10.3)?",
        options: [
          { letter: 'A', text: "Porque impede o uso de antivírus nos servidores." },
          { letter: 'B', text: "Permite movimento lateral ilimitado, acesso a todos os recursos e tempo livre para mapear o ambiente antes de agir quando um dispositivo é comprometido." },
          { letter: 'C', text: "Porque desconecta os servidores de DNS corporativos." },
          { letter: 'D', text: "Porque converte o tráfego TCP em broadcast contínuo." }
        ],
        correctOption: 'B',
        justification: "No item 10.3: 'Rede sem segmentação é o sonho de qualquer atacante. Movimento lateral ilimitado, acesso a todos os recursos e tempo livre para mapear o ambiente antes de agir.'"
      },
      {
        id: 7,
        question: "Qual é o 'pior cenário' quando um firewall fica subdimensionado com features ativas (item 10.4)?",
        options: [
          { letter: 'A', text: "O equipamento queimar a fonte de alimentação em standby." },
          { letter: 'B', text: "O time desativa features de segurança para 'recuperar performance'. O firewall volta a ser rápido. E completamente inútil." },
          { letter: 'C', text: "A empresa ser obrigada a migrar para cabos de cobre legados." },
          { letter: 'D', text: "O tempo de failover de HA subir de 1 para 3 segundos." }
        ],
        correctOption: 'B',
        justification: "No item 10.4: 'O pior cenário: o time desativa features de segurança para 'recuperar performance'. O firewall volta a ser rápido. E completamente inútil.'"
      },
      {
        id: 8,
        question: "Qual recomendação de BOAS PRÁTICAS é dada para combater 'Políticas sem Revisão' no item 10.6?",
        options: [
          { letter: 'A', text: "Manter todas as regras permanentemente ativas para não quebrar sistemas antigos." },
          { letter: 'B', text: "Implante data de expiração em regras temporárias. Defina ciclo de revisão semestral ou anual de todo o ruleset. Regra sem owner documentado é candidata a remoção." },
          { letter: 'C', text: "Permitir que qualquer funcionário crie regras sem aprovação de superiores." },
          { letter: 'D', text: "Exportar as regras para planilhas sem data de revisão definida." }
        ],
        correctOption: 'B',
        justification: "Na caixa BOAS PRÁTICAS do item 10.6: 'Implante data de expiração em regras temporárias. Defina ciclo de revisão semestral ou anual de todo o ruleset. Regra sem owner documentado é candidata a remoção.'"
      }
    ]
  },

  // CAPÍTULO 11
  11: {
    chapterNumber: 11,
    chapterTitle: "Logs e Visibilidade",
    questions: [
      {
        id: 1,
        question: "Qual é a frase central da autora sobre a importância do registro de logs no Capítulo 11?",
        options: [
          { letter: 'A', text: "Logs consomem muito disco, portanto desligá-los melhora a segurança." },
          { letter: 'B', text: "Se você não loga, você não sabe. E se você não sabe, já perdeu." },
          { letter: 'C', text: "Logs devem ser apagados diariamente para evitar vazamento de memória." },
          { letter: 'D', text: "Apenas eventos de login de administradores precisam ser registrados." }
        ],
        correctOption: 'B',
        justification: "Na abertura do Capítulo 11: 'Se você não loga, você não sabe. E se você não sabe, já perdeu.'"
      },
      {
        id: 2,
        question: "Qual é o tipo de log mais volumoso gerado por um firewall (item 11.1)?",
        options: [
          { letter: 'A', text: "Audit Log." },
          { letter: 'B', text: "System Log." },
          { letter: 'C', text: "Traffic Log (registro de cada sessão permitida ou negada: origem, destino, aplicação, bytes, duração)." },
          { letter: 'D', text: "Decryption Log." }
        ],
        correctOption: 'C',
        justification: "Na tabela do item 11.1: 'Traffic Log: Registro de cada sessão permitida ou negada: origem, destino, aplicação, bytes, duração. O mais volumoso.'"
      },
      {
        id: 3,
        question: "O que é registrado especificamente no 'Decryption Log' (item 11.1)?",
        options: [
          { letter: 'A', text: "As senhas bancárias em texto puro dos clientes." },
          { letter: 'B', text: "Registro de sessões TLS inspecionadas: quais foram decriptadas, quais foram excluídas e por quê." },
          { letter: 'C', text: "Apenas falhas físicas nas portas ópticas de fibra." },
          { letter: 'D', text: "Lista de usuários que esqueceram suas credenciais de VPN." }
        ],
        correctOption: 'B',
        justification: "Na tabela do item 11.1: 'Decryption Log: Registro de sessões TLS inspecionadas: quais foram decriptadas, quais foram excluídas e por quê.'"
      },
      {
        id: 4,
        question: "Qual é a estratégia pragmática de retenção e armazenamento recomendada no item 11.2?",
        options: [
          { letter: 'A', text: "Guardar logs por 7 dias em pendrive local." },
          { letter: 'B', text: "Retenção mínima de 12 meses para compliance e 90 dias em storage quente para investigação ágil." },
          { letter: 'C', text: "Retenção ilimitada na memória flash do próprio appliance de firewall." },
          { letter: 'D', text: "Apagar logs a cada 24 horas para evitar saturação do disco rígido." }
        ],
        correctOption: 'B',
        justification: "No item 11.2: '...e retenção mínima de 12 meses para compliance, 90 dias em storage quente para investigação ágil.'"
      },
      {
        id: 5,
        question: "De quais eventos a autora prescreve 'log completo sem exceção' no item 11.2?",
        options: [
          { letter: 'A', text: "Apenas de pacotes broadcast NetBIOS." },
          { letter: 'B', text: "Eventos de segurança (threat, URL, auth, decryption)." },
          { letter: 'C', text: "Apenas tráfego de streaming de vídeo de funcionários." },
          { letter: 'D', text: "Nenhum evento, registrando apenas o uso de CPU a cada hora." }
        ],
        correctOption: 'B',
        justification: "No item 11.2: 'Estratégia pragmática: log completo de eventos de segurança (threat, URL, auth, decryption) — sem exceção...'"
      },
      {
        id: 6,
        question: "Qual é o papel do SIEM (Security Information and Event Management) na integração com o NGFW (item 11.3)?",
        options: [
          { letter: 'A', text: "Substituir as portas físicas de entrada do firewall." },
          { letter: 'B', text: "Centralizar logs de múltiplas fontes, permitir correlação automática de eventos, alertas baseados em comportamento e construção automática de timeline do incidente." },
          { letter: 'C', text: "Bloquear automaticamente conexões de rede sem usar regras de segurança." },
          { letter: 'D', text: "Instalar atualizações de BIOS nos switches de distribuição." }
        ],
        correctOption: 'B',
        justification: "No item 11.3: 'Com SIEM: consulta centralizada, regras de correlação automática, alertas baseados em comportamento e timeline de incidente construída automaticamente.'"
      },
      {
        id: 7,
        question: "Como evitar que o volume massivo de logs sature o SIEM (item 11.3)?",
        options: [
          { letter: 'A', text: "Desligar o SIEM durante a noite." },
          { letter: 'B', text: "Filtrar eventos de baixa relevância na origem (no NGFW)." },
          { letter: 'C', text: "Exportar logs apenas usando impressão em papel." },
          { letter: 'D', text: "Substituir cabos de fibra por cabos de par trançado de categoria 5." }
        ],
        correctOption: 'B',
        justification: "No fechamento do item 11.3: 'Garanta que o volume de logs não sature o SIEM — filtre eventos de baixa relevância na origem.'"
      },
      {
        id: 8,
        question: "Qual é a recomendação de BOAS PRÁTICAS para a construção de dashboards e relatórios (item 11.4)?",
        options: [
          { letter: 'A', text: "Gerar relatórios de 500 páginas contendo cada linha da tabela de sessões." },
          { letter: 'B', text: "Relatório que ninguém lê não tem valor. Construa dashboards e relatórios com o consumidor em mente, não com tudo que o produto consegue gerar." },
          { letter: 'C', text: "Enviar todos os logs brutos para a caixa de e-mail do diretor de TI." },
          { letter: 'D', text: "Usar dashboards apenas após a confirmação de vazamento de dados." }
        ],
        correctOption: 'B',
        justification: "Na caixa BOAS PRÁTICAS do item 11.4: 'Relatório que ninguém lê não tem valor. Construa dashboards e relatórios com o consumidor em mente, não com tudo que o produto consegue gerar.'"
      }
    ]
  },

  // CAPÍTULO 12
  12: {
    chapterNumber: 12,
    chapterTitle: "NGFW em Cloud",
    questions: [
      {
        id: 1,
        question: "Por que manter um NGFW on-premise protegendo apenas o perímetro físico é insuficiente na era da nuvem (Capítulo 12)?",
        options: [
          { letter: 'A', text: "Porque appliances físicos queimam se conectados a provedores de nuvem." },
          { letter: 'B', text: "Porque os workloads e usuários da empresa estão distribuídos globalmente." },
          { letter: 'C', text: "Porque os provedores de internet não aceitam tráfego vindo de roteadores locais." },
          { letter: 'D', text: "Porque o modelo TCP/IP foi desativado em ambientes virtuais." }
        ],
        correctOption: 'B',
        justification: "Na abertura do Capítulo 12: 'Cloud mudou fundamentalmente onde o tráfego flui e onde a política de segurança precisa ser aplicada. NGFW on-prem protegendo apenas o perímetro físico é insuficiente quando seus workloads e usuários estão distribuídos globalmente.'"
      },
      {
        id: 2,
        question: "O que acontece ao enviar o tráfego de nuvem de volta ao firewall on-premise para inspeção (item 12.1)?",
        options: [
          { letter: 'A', text: "Melhora instantaneamente a velocidade de acesso aos servidores." },
          { letter: 'B', text: "Gera hair-pinning com latência inaceitável." },
          { letter: 'C', text: "Elimina custos de transferência de dados entre provedores." },
          { letter: 'D', text: "Permite escalabilidade infinita sem uso de CPU." }
        ],
        correctOption: 'B',
        justification: "Na tabela do item 12.1: 'Latência de inspeção: Tráfego enviado ao firewall on-prem para inspeção e retornado gera hair-pinning com latência inaceitável.'"
      },
      {
        id: 3,
        question: "Por que políticas baseadas em IPs estáticos não funcionam em instâncias de nuvem e qual é a solução (item 12.1)?",
        options: [
          { letter: 'A', text: "Porque clouds não usam IPv4; a solução é usar cabos seriais virtuais." },
          { letter: 'B', text: "IPs de instâncias cloud mudam dinamicamente; a solução é usar tags e grupos dinâmicos." },
          { letter: 'C', text: "Porque máquinas virtuais não possuem placas de rede; a solução é NAT 1-para-1." },
          { letter: 'D', text: "A solução é reiniciar as instâncias virtuais toda vez que o IP for alterado." }
        ],
        correctOption: 'B',
        justification: "Na tabela do item 12.1: 'Endereçamento dinâmico: IPs de instâncias cloud mudam. Política baseada em IP estático não funciona — use tags e grupos dinâmicos.'"
      },
      {
        id: 4,
        question: "Qual é a principal vantagem de utilizar um NGFW Virtual (Virtual Appliance) do mesmo fabricante do on-prem (item 12.2.1)?",
        options: [
          { letter: 'A', text: "Gratuidade vitalícia da licença sem cobrança por hora." },
          { letter: 'B', text: "Consistência de política e gestão centralizada com o ambiente on-premise." },
          { letter: 'C', text: "Eliminação total da necessidade de gerenciar atualizações de sistema operacional." },
          { letter: 'D', text: "Substituição completa dos grupos de segurança da nuvem sem intervenção manual." }
        ],
        correctOption: 'B',
        justification: "No item 12.2.1: 'Vantagem: consistência de política e gestão centralizada com o ambiente on-prem.'"
      },
      {
        id: 5,
        question: "Quais são as desvantagens dos Firewalls Nativos dos Provedores Cloud citadas no item 12.2.2?",
        options: [
          { letter: 'A', text: "Exigem a instalação física de placas de rede nos servidores dos clientes." },
          { letter: 'B', text: "Funcionalidades limitadas comparadas a NGFW dedicado, policy model diferente do on-prem e lock-in ao provider." },
          { letter: 'C', text: "Não conseguem se conectar a instâncias virtuais do mesmo provedor." },
          { letter: 'D', text: "Incompatibilidade total com regras de protocolo TCP." }
        ],
        correctOption: 'B',
        justification: "No item 12.2.2: 'Desvantagem: funcionalidades limitadas comparadas a NGFW dedicado, policy model diferente do on-prem e lock-in ao provider.'"
      },
      {
        id: 6,
        question: "Como o modelo FWaaS (Firewall as a Service / SASE) opera para proteger usuários e workloads (item 12.2.3)?",
        options: [
          { letter: 'A', text: "Instala um roteador físico na residência de cada colaborador remoto." },
          { letter: 'B', text: "O firewall é consumido via PoP distribuído globalmente; usuários e workloads conectam-se ao PoP mais próximo para inspeção antes de acessar recursos, eliminando hair-pinning." },
          { letter: 'C', text: "Desativa as regras de inspeção para quem acessa via celular." },
          { letter: 'D', text: "Converte todo o tráfego da empresa em pacotes ICMP não inspecionados." }
        ],
        correctOption: 'B',
        justification: "No item 12.2.3: 'Usuários e workloads se conectam ao PoP mais próximo para inspeção antes de acessar recursos. Elimina o hair-pinning, escala automaticamente e unifica política para usuários remotos, filiais e cloud.'"
      },
      {
        id: 7,
        question: "Qual é um dos problemas comuns em deployments cloud apontado no item 12.3 relacionado ao tráfego entre workloads?",
        options: [
          { letter: 'A', text: "Bloqueio automático de conexões de banco de dados pelos hipervisores." },
          { letter: 'B', text: "Tráfego leste-oeste entre workloads cloud sem inspeção — segmentos de cloud tratados como zona confiável." },
          { letter: 'C', text: "Impossibilidade de gerar relatórios de consumo elétrico das VMs." },
          { letter: 'D', text: "Uso obrigatório de transceivers QSFP28 para máquinas virtuais." }
        ],
        correctOption: 'B',
        justification: "No item 12.3: '• Tráfego leste-oeste entre workloads cloud sem inspeção — segmentos de cloud tratados como zona confiável.'"
      },
      {
        id: 8,
        question: "O que a ausência de inspeção de tráfego de saída (egress) pode causar em ambientes de nuvem (item 12.3)?",
        options: [
          { letter: 'A', text: "Queda imediata das conexões de console SSH." },
          { letter: 'B', text: "Exfiltração de dados corporativos não detectada." },
          { letter: 'C', text: "Redução do limite de armazenamento dos buckets de arquivos." },
          { letter: 'D', text: "Aumento não autorizado da quantidade de memória das instâncias." }
        ],
        correctOption: 'B',
        justification: "No item 12.3: '• Ausência de inspeção de tráfego de saída (egress): exfiltração de dados não detectada.'"
      }
    ]
  },

  // CAPÍTULO 13
  13: {
    chapterNumber: 13,
    chapterTitle: "NGFW e Zero Trust",
    questions: [
      {
        id: 1,
        question: "Qual é o posicionamento da autora sobre o termo Zero Trust na introdução do Capítulo 13?",
        options: [
          { letter: 'A', text: "É uma farsa que não deve ser estudada por profissionais de rede." },
          { letter: 'B', text: "Zero Trust virou buzzword. Isso não significa que o conceito é inválido — significa que você precisa separar a substância do marketing." },
          { letter: 'C', text: "É uma funcionalidade que já vem ativada de fábrica em todos os roteadores residenciais." },
          { letter: 'D', text: "Zero Trust substitui completamente a necessidade de qualquer firewall físico ou virtual." }
        ],
        correctOption: 'B',
        justification: "Na abertura do Capítulo 13: 'Zero Trust virou buzzword. Isso não significa que o conceito é inválido — significa que você precisa separar a substância do marketing.'"
      },
      {
        id: 2,
        question: "Com o que o NGFW contribui em uma arquitetura Zero Trust (item 13.1)?",
        options: [
          { letter: 'A', text: "Apenas com fornecimento de cabos de rede redundantes." },
          { letter: 'B', text: "Microssegmentação da rede, inspeção de tráfego lateral (leste-oeste), integração com IdP para validação contínua, aplicação de política baseada em contexto e logging de todo o tráfego." },
          { letter: 'C', text: "Substituição completa do sistema operacional dos servidores de arquivos." },
          { letter: 'D', text: "Eliminação da necessidade de credenciais e senhas nos endpoints." }
        ],
        correctOption: 'B',
        justification: "No item 13.1: '...o NGFW contribui com: microssegmentação da rede (separação granular de recursos), inspeção de tráfego lateral (leste-oeste), integração com identity provider para validação contínua de identidade, aplicação de política baseada em contexto... e logging de todo o tráfego...'"
      },
      {
        id: 3,
        question: "Na divisão de papéis de uma arquitetura Zero Trust, o que o NGFW é e o que ele NÃO é (item 13.2)?",
        options: [
          { letter: 'A', text: "Ele é o Policy Decision Point (PDP) e não o PEP." },
          { letter: 'B', text: "Ele não é o Policy Decision Point (PDP); ele é o Policy Enforcement Point (PEP)." },
          { letter: 'C', text: "Ele é apenas um servidor DNS autoritativo." },
          { letter: 'D', text: "Ele decide sozinho a postura de conformidade de antivírus dos endpoints." }
        ],
        correctOption: 'B',
        justification: "No item 13.2: 'NGFW não é o Policy Decision Point (PDP) de uma arquitetura Zero Trust completa. Ele é o Policy Enforcement Point (PEP).'"
      },
      {
        id: 4,
        question: "Por que a decisão de autorizar acesso em Zero Trust não pode vir unicamente do firewall (item 13.2)?",
        options: [
          { letter: 'A', text: "Porque firewalls não possuem interfaces de rede suficientes." },
          { letter: 'B', text: "Porque precisa considerar postura do dispositivo (EDR, patches), risco de identidade (MFA, anomalias) e contexto da sessão, dados que vêm de outros componentes do ecossistema." },
          { letter: 'C', text: "Porque firewalls não conseguem ler arquivos de configuração em disco." },
          { letter: 'D', text: "Porque a legislação proíbe o firewall de inspecionar a camada de rede." }
        ],
        correctOption: 'B',
        justification: "No item 13.2: 'A decisão de autorizar acesso precisa considerar: postura do dispositivo... nível de risco da identidade... contexto da sessão... e esses dados vêm de outros componentes do ecossistema, não do firewall.'"
      },
      {
        id: 5,
        question: "Como o ZTNA (Zero Trust Network Access) substitui a VPN tradicional (item 13.3)?",
        options: [
          { letter: 'A', text: "Concede acesso baseado em identidade e contexto provisionado por aplicação, não pela rede inteira." },
          { letter: 'B', text: "Libera acesso irrestrito a todas as sub-redes da empresa sem senha." },
          { letter: 'C', text: "Exige que o usuário se conecte exclusivamente por linha telefônica discada." },
          { letter: 'D', text: "Elimina a necessidade de controle de permissões no Active Directory." }
        ],
        correctOption: 'A',
        justification: "No item 13.3: 'ZTNA (Zero Trust Network Access) substitui VPN tradicional com acesso baseado em identidade e contexto, provisionado por aplicação, não por rede inteira.'"
      },
      {
        id: 6,
        question: "Qual é a complementaridade entre NGFW e ZTNA definida pela autora no item 13.3?",
        options: [
          { letter: 'A', text: "ZTNA substitui o NGFW, tornando desnecessária a inspeção de tráfego." },
          { letter: 'B', text: "O ZTNA controla quem acessa o quê, e o NGFW garante que o conteúdo do acesso autorizado é legítimo e seguro." },
          { letter: 'C', text: "O NGFW atua apenas no login e o ZTNA analisa o fluxo de pacotes L7." },
          { letter: 'D', text: "Eles realizam exatamente a mesma função sem nenhuma diferença técnica." }
        ],
        correctOption: 'B',
        justification: "No item 13.3: 'A combinação: ZTNA controla quem acessa o quê, e o NGFW garante que o conteúdo do acesso autorizado é legítimo e seguro.'"
      },
      {
        id: 7,
        question: "Qual é o perigo de operar 'ZTNA sem inspeção de tráfego no destino' segundo o alerta de ATENÇÃO?",
        options: [
          { letter: 'A', text: "Aumentar a fatura de luz dos servidores de nuvem." },
          { letter: 'B', text: "É controle de acesso sem inspeção de conteúdo: um usuário legítimo com credencial comprometida acessando recurso autorizado para transferir malware não é detectado apenas pelo ZTNA." },
          { letter: 'C', text: "Causar travamento no sistema de arquivos do endpoint." },
          { letter: 'D', text: "Desconectar as interfaces físicas RJ45 1G legadas." }
        ],
        correctOption: 'B',
        justification: "Na caixa ATENÇÃO do item 13.3: 'ZTNA sem inspeção de tráfego no destino é controle de acesso sem inspeção de conteúdo. Um usuário legítimo com credencial comprometida que acessa um recurso autorizado e transfere malware não é detectado apenas pelo ZTNA.'"
      },
      {
        id: 8,
        question: "Qual premissa é abolida por padrão no modelo Zero Trust (item 13.1 e 7.6)?",
        options: [
          { letter: 'A', text: "A existência de zonas 'confiáveis' por padrão na rede." },
          { letter: 'B', text: "O uso de criptografia nos túneis de comunicação." },
          { letter: 'C', text: "A necessidade de gerar logs de auditoria administrativa." },
          { letter: 'D', text: "A verificação de patches e antivírus nos computadores." }
        ],
        correctOption: 'A',
        justification: "No item 7.6 e 13.1: 'Sem zonas 'confiáveis' por padrão. Todo acesso requer autenticação, autorização contínua e o mínimo de privilégio necessário.'"
      }
    ]
  },

  // CAPÍTULO 14
  14: {
    chapterNumber: 14,
    chapterTitle: "Operação Real",
    questions: [
      {
        id: 1,
        question: "Qual é a constatação pragmática da autora que abre o Capítulo 14?",
        options: [
          { letter: 'A', text: "Falhas de firewall são provocadas exclusivamente por bugs no microcódigo do chip." },
          { letter: 'B', text: "80% dos problemas de firewall são humanos. Os outros 20% também." },
          { letter: 'C', text: "A teoria cobre 100% dos cenários encontrados em produção diária." },
          { letter: 'D', text: "Regras de firewall nunca causam paradas de sistemas corporativos." }
        ],
        correctOption: 'B',
        justification: "Na abertura do Capítulo 14: '80% dos problemas de firewall são humanos. Os outros 20% também.'"
      },
      {
        id: 2,
        question: "Qual é a estrutura correta de um 'Ruleset Saudável' descrita no item 14.1.1?",
        options: [
          { letter: 'A', text: "Regra permissiva no topo, regras de bloqueio no meio e deny all sem log no final." },
          { letter: 'B', text: "Negação explícita no topo (IoCs conhecidos), regras de gerência/monitoramento, regras de negócio do mais restrito ao permissivo, e regra de negação padrão (deny all) ao final com log ativo." },
          { letter: 'C', text: "Regras ordenadas aleatoriamente conforme a data de abertura do chamado." },
          { letter: 'D', text: "Regra ANY ANY ANY no topo seguida de regras específicas de aplicação." }
        ],
        correctOption: 'B',
        justification: "No item 14.1.1: 'Regras de negação explícita no topo para tráfego claramente malicioso (IoC conhecidos, ranges de IP suspeitos). Regras de gerenciamento e monitoramento. Regras de negócio específicas, do mais restrito ao mais permissivo. Regra de negação padrão (deny all) ao final, com logging ativo.'"
      },
      {
        id: 3,
        question: "Por que as regras devem ser ordenadas da mais específica para a mais genérica (BOAS PRÁTICAS 14.1.1)?",
        options: [
          { letter: 'A', text: "Para evitar que o disco flash fique cheio." },
          { letter: 'B', text: "O firewall aplica regras na ordem — uma regra genérica no topo pode shadow uma regra específica abaixo dela." },
          { letter: 'C', text: "Para acelerar a inicialização do cluster de HA durante o failover." },
          { letter: 'D', text: "Porque os padrões do protocolo TCP exigem ordenação alfabética." }
        ],
        correctOption: 'B',
        justification: "Na caixa BOAS PRÁTICAS do item 14.1.1: 'Ordene regras do mais específico para o mais genérico. O firewall aplica regras na ordem — uma regra genérica no topo pode shadow uma regra específica abaixo dela.'"
      },
      {
        id: 4,
        question: "O que toda regra de firewall deve conter em sua documentação (item 14.1.2)?",
        options: [
          { letter: 'A', text: "Apenas o nome do fornecedor do hardware e o número de série da fonte." },
          { letter: 'B', text: "Descrição clara do propósito, nome do solicitante/owner, data de criação, data de última revisão, número do ticket/change e, para temporárias, data de expiração." },
          { letter: 'C', text: "A senha em texto puro do administrador que a criou." },
          { letter: 'D', text: "O código-fonte em linguagem C do driver de rede." }
        ],
        correctOption: 'B',
        justification: "No item 14.1.2: 'Cada regra deve ter: descrição clara do propósito, nome do solicitante ou time responsável (owner), data de criação, data de última revisão, número do ticket ou change que a criou e, para regras temporárias, data de expiração.'"
      },
      {
        id: 5,
        question: "O que a frase informal 'Vou só adicionar uma regrinha rápida' sem change management formal representa (ATENÇÃO 14.2)?",
        options: [
          { letter: 'A', text: "Um procedimento padrão recomendado para agilizar o suporte." },
          { letter: 'B', text: "O prólogo de pelo menos 40% dos incidentes de disponibilidade em ambiente de firewall." },
          { letter: 'C', text: "A melhor maneira de manter o throughput nominal do datasheet." },
          { letter: 'D', text: "Uma exigência de conformidade da certificação CompTIA Network+." }
        ],
        correctOption: 'B',
        justification: "Na caixa ATENÇÃO do item 14.2: ''Vou só adicionar uma regrinha rápida' dito sem change management formal é o prólogo de pelo menos 40% dos incidentes de disponibilidade em ambiente de firewall.'"
      },
      {
        id: 6,
        question: "Quais são os passos da metodologia de diagnóstico e troubleshooting apresentada no item 14.3.1?",
        options: [
          { letter: 'A', text: "Reiniciar o equipamento imediatamente e apagar as configurações de rede." },
          { letter: 'B', text: "Confirmar o problema; isolar a camada (L3, política, aplicação ou DNS); verificar logs; testar com permissão controlada; capturar tráfego; documentar e reverter regras de teste." },
          { letter: 'C', text: "Criar uma regra ANY ANY ANY permanente e encerrar o ticket sem documentação." },
          { letter: 'D', text: "Trocar as placas de rede do firewall e acionar a garantia do fabricante." }
        ],
        correctOption: 'B',
        justification: "Nos itens 6 a 11 do passo a passo 14.3.1: Confirme o problema -> Isole a camada -> Verifique os logs -> Teste com mais permissão -> Capture tráfego -> Documente e reverta."
      },
      {
        id: 7,
        question: "Quando se deve utilizar a ferramenta 'Policy Lookup / Rule Test' segundo a tabela 14.3.2?",
        options: [
          { letter: 'A', text: "Para medir a temperatura interna do processador x86." },
          { letter: 'B', text: "Simula um fluxo e mostra qual regra seria aplicada. Indispensável antes de mudar política." },
          { letter: 'C', text: "Para formatar o SSD local do firewall em caso de invasão." },
          { letter: 'D', text: "Para conectar transceivers QSFP28 sem desligar a energia." }
        ],
        correctOption: 'B',
        justification: "Na tabela do item 14.3.2: 'Policy Lookup / Rule Test: Simula um fluxo e mostra qual regra seria aplicada. Indispensável antes de mudar política.'"
      },
      {
        id: 8,
        question: "Qual é o primeiro lugar a olhar em qualquer diagnóstico segundo a tabela do item 14.3.2?",
        options: [
          { letter: 'A', text: "CPU / Memory Monitor." },
          { letter: 'B', text: "Traceroute / Path Analysis." },
          { letter: 'C', text: "Log Viewer com Filtro (filtra por IP, usuário, aplicação, ação)." },
          { letter: 'D', text: "Painel traseiro de ventoinhas do equipamento." }
        ],
        correctOption: 'C',
        justification: "Na tabela do item 14.3.2: 'Log Viewer com Filtro: Filtra logs por IP, usuário, aplicação, ação. O primeiro lugar a olhar em qualquer diagnóstico.'"
      }
    ]
  },

  // CAPÍTULO 15
  15: {
    chapterNumber: 15,
    chapterTitle: "Carreira em Firewall",
    questions: [
      {
        id: 1,
        question: "Qual é a faixa salarial estimada no Brasil em 2026 para o nível Júnior (Network Security Analyst) segundo o item 15.1.1?",
        options: [
          { letter: 'A', text: "R$ 1.500 a R$ 2.500 mensais." },
          { letter: 'B', text: "R$ 4.000 a R$ 7.000 mensais CLT." },
          { letter: 'C', text: "R$ 15.000 a R$ 25.000 mensais." },
          { letter: 'D', text: "USD 80k por ano." }
        ],
        correctOption: 'B',
        justification: "Na tabela do item 15.1.1: 'Salário estimado Brasil 2026: R$ 4.000 a R$ 7.000 mensais CLT. Variação por região e empresa.'"
      },
      {
        id: 2,
        question: "Quais conhecimentos são esperados de um profissional Pleno (Network Security Engineer) segundo o item 15.1.2?",
        options: [
          { letter: 'A', text: "Apenas atendimento de chamados de troca de mouse e teclado." },
          { letter: 'B', text: "NGFW features em profundidade (TLS inspection, IPS tuning, App-ID, User-ID), roteamento dinâmico (BGP, OSPF), VPN (IPsec, SSL), HA e failover, integração com diretórios e SIEM." },
          { letter: 'C', text: "Governança executiva de conselho e auditoria SOX exclusivamente." },
          { letter: 'D', text: "Montagem física de cabos coaxiais e configuração de modems discados." }
        ],
        correctOption: 'B',
        justification: "No item 15.1.2: 'Conhecimento esperado: NGFW features em profundidade (TLS inspection, IPS tuning, App-ID, User-ID), roteamento dinâmico (BGP, OSPF), VPN (IPsec, SSL), HA e failover, integração com diretórios e SIEM.'"
      },
      {
        id: 3,
        question: "Quais certificações são citadas como úteis para o nível Pleno no item 15.1.2?",
        options: [
          { letter: 'A', text: "ITIL Foundation apenas." },
          { letter: 'B', text: "PCNSE, CCNP Security, NSE4-7 (dependendo do fabricante em uso)." },
          { letter: 'C', text: "CCIE Security e CISSP obrigatoriamente." },
          { letter: 'D', text: "Nenhuma certificação é recomendada para o nível pleno." }
        ],
        correctOption: 'B',
        justification: "Na tabela do item 15.1.2: 'Certificações úteis: PCNSE, CCNP Security, NSE4-7 (dependendo do fabricante em uso).'"
      },
      {
        id: 4,
        question: "Qual é a estimativa salarial para um Sênior (Senior Network Security Engineer) no Brasil e no mercado remoto internacional (item 15.1.3)?",
        options: [
          { letter: 'A', text: "Brasil: R$ 8.000 a R$ 14.000; Internacional: USD 20k/ano." },
          { letter: 'B', text: "Brasil: R$ 15.000 a R$ 25.000 mensais CLT; Remoto internacional: USD 80k-130k/ano." },
          { letter: 'C', text: "Brasil: R$ 50.000 fixo; Internacional: voluntário." },
          { letter: 'D', text: "Brasil: R$ 4.000 a R$ 7.000; Internacional: não há vagas." }
        ],
        correctOption: 'B',
        justification: "Na tabela do item 15.1.3: 'Salário estimado Brasil 2026: R$ 15.000 a R$ 25.000 mensais CLT. Remoto internacional: USD 80k-130k/ano.'"
      },
      {
        id: 5,
        question: "O que distingue o nível Especialista / Arquiteto de Segurança dos níveis anteriores (item 15.1.4)?",
        options: [
          { letter: 'A', text: "Ele cuida exclusivamente da crimpagem de cabos de rede em racks." },
          { letter: 'B', text: "Tudo dos níveis anteriores mais visão de GRC (Governance, Risk and Compliance), regulação (LGPD, PCI-DSS, ISO 27001), liderança técnica e comunicação executiva." },
          { letter: 'C', text: "Ele deixa de ter acesso a qualquer sistema de segurança da empresa." },
          { letter: 'D', text: "Trabalha apenas monitorando alertas em regime de escala 12x36." }
        ],
        correctOption: 'B',
        justification: "No item 15.1.4: 'Conhecimento esperado: tudo dos níveis anteriores mais visão de GRC (Governance, Risk and Compliance), conhecimento de regulações (LGPD, PCI-DSS, ISO 27001), liderança técnica e capacidade de comunicação executiva.'"
      },
      {
        id: 6,
        question: "Quais são as vantagens e desvantagens de atuar em um MSSP (Managed Security Service Provider) segundo o item 15.2.1?",
        options: [
          { letter: 'A', text: "Vantagem: sem prazos nem SLAs; Desvantagem: trabalhar apenas com uma tecnologia simples." },
          { letter: 'B', text: "Vantagem: exposição a grande variedade de ambientes e problemas; Desvantagem: pressão de SLA constante, rotatividade alta e salários médios menores que mercado financeiro ou big tech." },
          { letter: 'C', text: "Vantagem: estabilidade vitalícia garantida; Desvantagem: viagens internacionais diárias." },
          { letter: 'D', text: "Não há desvantagens documentadas em MSSPs." }
        ],
        correctOption: 'B',
        justification: "No item 15.2.1: 'Vantagem: exposição a grande variedade de ambientes e problemas. Desvantagem: pressão de SLA constante, rotatividade alta, salários médios menores que mercado financeiro ou big tech.'"
      },
      {
        id: 7,
        question: "O que caracteriza a atuação de Carreira em 'Produto / Fabricante' descrita no item 15.2.3?",
        options: [
          { letter: 'A', text: "Atuar em suporte a impressoras corporativas." },
          { letter: 'B', text: "Trabalhar como SE (Sales Engineer), Technical Support ou Product Engineering, com acesso profundo a uma tecnologia específica e exposição a produto antes do lançamento." },
          { letter: 'C', text: "Gerenciar apenas o inventário físico de cabos no almoxarifado." },
          { letter: 'D', text: "Ter menor especialização técnica que profissionais de empresas finais." }
        ],
        correctOption: 'B',
        justification: "No item 15.2.3: 'Trabalhar no fabricante como SE (Sales Engineer), Technical Support, ou Product Engineering. Acesso profundo a uma tecnologia específica, suporte a clientes complexos e exposição a produto antes de lançamento.'"
      },
      {
        id: 8,
        question: "Quais características definem a atuação 'In-house' em empresa final segundo o item 15.2.4?",
        options: [
          { letter: 'A', text: "Exposição a centenas de clientes novos a cada semana com viagens contínuas." },
          { letter: 'B', text: "Menor variedade de tecnologias, maior profundidade no ambiente específico, maior estabilidade e frequentemente melhores benefícios em empresas grandes." },
          { letter: 'C', text: "Rotatividade muito superior à de consultorias e MSSPs." },
          { letter: 'D', text: "Proibição expressa de aplicação de patches de segurança." }
        ],
        correctOption: 'B',
        justification: "No item 15.2.4: 'Menor variedade de tecnologias, maior profundidade no ambiente específico, maior estabilidade e frequentemente melhores benefícios em empresas grandes.'"
      }
    ]
  }
};
