export interface ChallengeQuestion {
  id: number;
  question: string;
  options: {
    letter: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  justification: string;
}

export interface ChallengePhase {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  chaptersRange: string;
  theme: string;
  badge: string;
  minScoreToUnlockNext: number; // 80% -> 4 of 5
  questions: ChallengeQuestion[];
}

export const GAMIFIED_PHASES: ChallengePhase[] = [
  // FASE 1: Guardião do Hardware & Redes (Capítulos 1 a 3)
  {
    id: 1,
    slug: 'guardiao-hardware-redes',
    title: "Fase 1: Guardião do Hardware & Redes",
    subtitle: "Domine a engenharia interna de silício, tabela de estados e a essência do NGFW.",
    chaptersRange: "Capítulos 1 a 3",
    theme: "CPU, ASIC, NPU, Stateful, Handshake TCP e Definição de NGFW",
    badge: "Hardware & Core Specialist",
    minScoreToUnlockNext: 80,
    questions: [
      {
        id: 101,
        question: "Por que um ASIC (Application-Specific Integrated Circuit) oferece latência quase zero no processamento de pacotes?",
        options: [
          { letter: 'A', text: "Porque as funções de comutação e inspeção de cabeçalho são gravadas diretamente no silício físico, sem dependência de interrupções de software do sistema operacional." },
          { letter: 'B', text: "Porque o ASIC roda uma versão compactada do Windows Server dentro de cada porta física." },
          { letter: 'C', text: "Porque ele descarta 90% dos pacotes antes de ler o endereço IP." },
          { letter: 'D', text: "Porque ele armazena todos os pacotes em um servidor remoto na nuvem antes de liberá-los." }
        ],
        correctOption: 'A',
        justification: "Conforme o Capítulo 1: O ASIC executa as instruções em hardware puro gravado no silício, processando taxas de pacotes na velocidade do cabo (wire speed) sem onerar os ciclos da CPU principal."
      },
      {
        id: 102,
        question: "Qual é a vantagem competitiva do NPU (Network Processing Unit) em relação ao ASIC fixo?",
        options: [
          { letter: 'A', text: "O NPU não consome nenhuma energia elétrica." },
          { letter: 'B', text: "O NPU é programável e atualizável por firmware, combinando alta velocidade com flexibilidade para suportar novos protocolos." },
          { letter: 'C', text: "O NPU substitui todos os cabos de rede por rádio amador." },
          { letter: 'D', text: "O NPU desativa automaticamente o firewall caso a temperatura caia abaixo de zero." }
        ],
        correctOption: 'B',
        justification: "Conforme o item 1.1.3: O NPU oferece o equilíbrio ideal: é muito mais veloz que a CPU para redes e, diferentemente do ASIC estático, pode receber melhorias e novos algoritmos via atualização de firmware."
      },
      {
        id: 103,
        question: "O que acontece na tabela de estado do firewall se um host tentar enviar um pacote com flag TCP ACK sem ter realizado previamente o SYN e SYN-ACK?",
        options: [
          { letter: 'A', text: "O firewall aceita imediatamente e prioriza o tráfego como tráfego VIP." },
          { letter: 'B', text: "O pacote é identificado como fora de estado ('out of state') ou inválido e descartado pelo mecanismo de stateful inspection." },
          { letter: 'C', text: "O firewall responde com um arquivo PDF de agradecimento." },
          { letter: 'D', text: "O firewall desliga a interface de rede do destinatário." }
        ],
        correctOption: 'B',
        justification: "Conforme o Capítulo 2: Em inspeção stateful, o firewall valida a máquina de estados TCP. Pacotes isolados sem handshake prévio na Session Table são marcados como INVÁLIDOS/OUT-OF-STATE e bloqueados."
      },
      {
        id: 104,
        question: "Como o mecanismo de SYN Cookies protege a tabela de sessão do firewall durante um ataque de SYN Flood?",
        options: [
          { letter: 'A', text: "Ele aloca imediatamente 100 megabytes de RAM para cada pacote recebido." },
          { letter: 'B', text: "Ele codifica as informações da conexão no número de sequência (Sequence Number) do SYN-ACK sem reservar memória de sessão até que o ACK legítimo do cliente retorne." },
          { letter: 'C', text: "Ele responde bloqueando todas as portas do firewall por 24 horas." },
          { letter: 'D', text: "Ele encaminha os pacotes diretamente para o e-mail do administrador." }
        ],
        correctOption: 'B',
        justification: "Conforme o item 2.3: O SYN Cookie calcula um hash criptográfico inserido no Sequence Number do SYN-ACK. Isso evita o esgotamento da memória da Session Table diante de milhares de requisições SYN forjadas."
      },
      {
        id: 105,
        question: "Qual elemento é fundamental para que um firewall seja verdadeiramente classificado como NGFW (Next-Generation Firewall)?",
        options: [
          { letter: 'A', text: "Ter uma cor vermelha no chassi metálico." },
          { letter: 'B', text: "Capacidade integrada de Deep Packet Inspection (DPI) para identificar aplicações (App-ID) e usuários (User-ID) no payload, além de IPS em linha." },
          { letter: 'C', text: "Filtrar exclusivamente cabeçalhos de Camada 3 e Camada 4 sem inspecionar o conteúdo." },
          { letter: 'D', text: "Operar apenas sem fio (Wi-Fi)." }
        ],
        correctOption: 'B',
        justification: "Conforme o Capítulo 3: O NGFW transcende o firewall tradicional de portas/IPs ao desmontar a carga útil (L7) para classificar aplicações reais, usuários corporativos e ameaças em tempo de execução."
      }
    ]
  },
  // FASE 2: Mestre da Inspeção e Identidade (Capítulos 4 a 6)
  {
    id: 2,
    slug: 'mestre-inspecao-identidade',
    title: "Fase 2: Mestre da Inspeção e Identidade",
    subtitle: "Quebre o túnel cifrado, desmascare o Shadow IT e controle políticas por identidade humana.",
    chaptersRange: "Capítulos 4 a 6",
    theme: "DPI, TLS Inspection, App-ID, User-ID e Shadow IT",
    badge: "Deep Inspection & Identity Architect",
    minScoreToUnlockNext: 80,
    questions: [
      {
        id: 201,
        question: "Em uma arquitetura corporativa, o que é indispensável para implantar inspeção TLS Outbound (Forward Proxy) sem que os navegadores exibam alertas de segurança?",
        options: [
          { letter: 'A', text: "Instalar o certificado da Autoridade Certificadora (CA) raiz interna do NGFW no repositório de certificados confiáveis de todas as estações gerenciadas." },
          { letter: 'B', text: "Desativar a checagem de certificados em todos os navegadores da empresa." },
          { letter: 'C', text: "Comprar um certificado SSL comercial e distribuir a chave privada em sites públicos." },
          { letter: 'D', text: "Exigir que todos os funcionários acessem a web apenas via HTTP puro não criptografado." }
        ],
        correctOption: 'A',
        justification: "Conforme o Capítulo 4: Para o firewall interceptar a conexão e emitir um novo certificado 'on the fly' para o site de destino, as máquinas clientes precisam confiar previamente na CA intermediária/raiz instalada no firewall."
      },
      {
        id: 202,
        question: "Quais categorias de tráfego a autora Mariana BS recomenda TERMINANTEMENTE colocar em lista de bypass (isenção) de inspeção TLS?",
        options: [
          { letter: 'A', text: "Tráfego de torrents e jogos online." },
          { letter: 'B', text: "Serviços bancários/financeiros, saúde/dados médicos e aplicações com certificate pinning que quebram com interceptação." },
          { letter: 'C', text: "Aplicações de streaming de vídeo recreativo dos diretores." },
          { letter: 'D', text: "Qualquer site que utilize protocolo HTTPS." }
        ],
        correctOption: 'B',
        justification: "Conforme o item 4.3: Dados financeiros e de saúde possuem exigências legais e de privacidade (LGPD/GDPR), além de sistemas com Certificate Pinning estrito que travam com inspeção Man-in-the-Middle."
      },
      {
        id: 203,
        question: "Por que uma regra que simplesmente bloqueia a porta 80 e libera a porta 443 é totalmente ineficaz contra o Shadow IT?",
        options: [
          { letter: 'A', text: "Porque ferramentas de IA não corporativas, discos virtuais pessoais e mensageiros usam túneis HTTPS na porta 443 para trafegar livremente se não houver App-ID e TLS inspection." },
          { letter: 'B', text: "Porque a porta 443 só aceita conexões de computadores da Microsoft." },
          { letter: 'C', text: "Porque a porta 80 é mais rápida que a porta 443." },
          { letter: 'D', text: "Porque o protocolo TLS impede o envio de arquivos pela internet." }
        ],
        correctOption: 'A',
        justification: "Conforme o Capítulo 5: O Shadow IT mascara aplicações não homologadas em conexões HTTPS na porta 443. Sem App-ID para distinguir o tráfego e sem inspeção profunda, o firewall de portas é cego."
      },
      {
        id: 204,
        question: "Como o User-ID aprimora a segurança e a resposta a incidentes em relação ao log tradicional baseado apenas em endereço IP?",
        options: [
          { letter: 'A', text: "Ele permite saber instantaneamente qual usuário (ex: 'maria.silva' do grupo 'Financeiro') gerou o evento, mesmo em redes dinâmicas com DHCP e Wi-Fi onde os IPs trocam constantemente." },
          { letter: 'B', text: "Ele envia uma mensagem SMS cobrando taxa do usuário a cada clique." },
          { letter: 'C', text: "Ele impede que usuários utilizem teclados mecânicos." },
          { letter: 'D', text: "Ele substitui o sistema operacional Windows pelo Linux em todas as máquinas da rede." }
        ],
        correctOption: 'A',
        justification: "Conforme o Capítulo 6: Investigar incidentes rastreando apenas IPs em redes dinâmicas é ineficiente. O User-ID amarra o evento de segurança à identidade corporativa no Active Directory."
      },
      {
        id: 205,
        question: "O que é 'Certificate Pinning' e qual é o seu impacto na inspeção profunda de pacotes TLS?",
        options: [
          { letter: 'A', text: "É uma técnica onde o aplicativo móvel ou desktop só aceita a chave pública/certificado exato embutido no código fonte, rejeitando o certificado gerado pelo firewall e falhando a conexão." },
          { letter: 'B', text: "É a prática de imprimir o certificado SSL em papel e fixá-lo com tachinha no rack." },
          { letter: 'C', text: "É a criptografia exclusiva de cabos de par trançado Cat6." },
          { letter: 'D', text: "É a exclusão de todas as chaves privadas do servidor." }
        ],
        correctOption: 'A',
        justification: "Conforme o item 4.4: O Certificate Pinning foi criado para evitar ataques Man-in-the-Middle. Como o NGFW atua como um MITM legítimo, aplicações com pinning falham imediatamente se inspecionadas."
      }
    ]
  },
  // FASE 3: Arquiteto de Redes & Alta Disponibilidade (Capítulos 7 a 9)
  {
    id: 3,
    slug: 'arquiteto-redes-ha',
    title: "Fase 3: Arquiteto de Redes & Alta Disponibilidade",
    subtitle: "Projete topologias resilientes, clusters de HA sem roteamento assimétrico e dimensione o hardware sem ilusão.",
    chaptersRange: "Capítulos 7 a 9",
    theme: "Perímetro, Data Center, Cloud, Active-Passive/Active-Active, Sizing e Throughput Real",
    badge: "Network Architecture & HA Master",
    minScoreToUnlockNext: 80,
    questions: [
      {
        id: 301,
        question: "Em uma arquitetura de firewall corporativo com DMZ, qual fluxo de rede deve ser TERMINANTEMENTE BLOQUEADO por padrão?",
        options: [
          { letter: 'A', text: "Tráfego originado espontaneamente de servidores da DMZ em direção às redes internas (LAN de estações ou servidores de dados confidenciais)." },
          { letter: 'B', text: "Tráfego vindo da internet para servidores web públicos na DMZ." },
          { letter: 'C', text: "Tráfego interno de administradores acessando servidores da DMZ para manutenção via SSH seguro." },
          { letter: 'D', text: "Tráfego de sincronização de relógio NTP para a DMZ." }
        ],
        correctOption: 'A',
        justification: "Conforme o Capítulo 7: Regra de ouro da DMZ: servidores na DMZ nunca devem ter permissão de iniciar conexões espontâneas para a rede interna; caso comprometidos por invasores, o isolamento protege a organização."
      },
      {
        id: 302,
        question: "Em um cluster de Alta Disponibilidade (HA) em modo Ativo/Passivo, para que serve o canal dedicado de 'Heartbeat e State Synchronization'?",
        options: [
          { letter: 'A', text: "Apenas para tocar um alarme sonoro caso a eletricidade falhe." },
          { letter: 'B', text: "Para monitorar a saúde do nó parceiro e replicar em tempo real as sessões ativas da Session Table, garantindo que o nó secundário assuma instantaneamente sem derrubar chamadas e downloads." },
          { letter: 'C', text: "Para baixar filmes em alta velocidade no horário de almoço." },
          { letter: 'D', text: "Para economizar cabos de rede conectando os nós via Bluetooth." }
        ],
        correctOption: 'B',
        justification: "Conforme o Capítulo 8: A sincronização contínua de estado (State Sync) garante failover imperceptível (hitless failover). Sem isso, todas as conexões TCP ativas caem na transição para o nó secundário."
      },
      {
        id: 303,
        question: "Qual é a causa principal do descarte de pacotes por 'roteamento assimétrico' em arquiteturas com múltiplos firewalls ou nós Ativo/Ativo?",
        options: [
          { letter: 'A', text: "O pacote de ida (SYN) passa pelo Firewall 1 (que cria o estado), mas a rota de retorno faz o pacote (SYN-ACK ou ACK) voltar pelo Firewall 2, que não conhece a sessão e a descarta como inválida." },
          { letter: 'B', text: "Os cabos de rede possuem comprimentos diferentes em centímetros." },
          { letter: 'C', text: "O sistema operacional do firewall não aceita números ímpares de IP." },
          { letter: 'D', text: "Os roteadores da empresa não suportam o protocolo ARP." }
        ],
        correctOption: 'A',
        justification: "Conforme o item 8.2: Firewalls stateful necessitam de simetria de fluxo. Se o pacote de volta chegar em um equipamento que não registrou o pacote de ida, ele é descartado como violação de estado."
      },
      {
        id: 304,
        question: "Por que o teste de datasheet de fabricantes que aponta 'Throughput de 40 Gbps' é classificado no livro como ilusão?",
        options: [
          { letter: 'A', text: "Porque os fabricantes utilizam pacotes UDP de tamanho máximo (1518 bytes), sem camada de aplicação, sem IPS, sem inspeção TLS e sem regras de bloqueio." },
          { letter: 'B', text: "Porque os fabricantes testam os equipamentos com o firewall desligado da tomada." },
          { letter: 'C', text: "Porque a medição é feita em megabytes em vez de gigabits." },
          { letter: 'D', text: "Porque 40 Gbps é uma velocidade proibida pelas leis da física quântica." }
        ],
        correctOption: 'A',
        justification: "Conforme o Capítulo 9: 'Datasheet é ficção científica controlada pelo marketing.' O teste padrão usa tráfego sintético limpo com pacotes de 1518 bytes UDP sem nenhuma funcionalidade avançada habilitada."
      },
      {
        id: 305,
        question: "Ao calcular o dimensionamento de um firewall para suportar uma empresa em crescimento pelos próximos 3 anos, o que se deve aplicar sobre a estimativa de tráfego atual?",
        options: [
          { letter: 'A', text: "Manter o valor atual sem nenhuma folga para economizar orçamento." },
          { letter: 'B', text: "Projetar a taxa de crescimento anual de banda (ex: 20% a 30% ao ano) e dimensionar o hardware para operar em pico com no máximo 60% a 70% de utilização de CPU/sessões." },
          { letter: 'C', text: "Reduzir a capacidade pela metade porque as pessoas usam menos internet a cada ano." },
          { letter: 'D', text: "Comprar equipamentos usados de 20 anos atrás." }
        ],
        correctOption: 'B',
        justification: "Conforme o item 9.4: Um projeto profissional de dimensionamento prevê headroom (margem de segurança) para que o firewall nunca ultrapasse 70% de carga média no 3º ano de operação."
      }
    ]
  },
  // FASE 4: Especialista em Zero Trust & Operações (Capítulos 10 a 15)
  {
    id: 4,
    slug: 'especialista-zero-trust-operacoes',
    title: "Fase 4: Especialista em Zero Trust & Operações",
    subtitle: "Elimine falhas capitais de configuração, estruture SIEM corporativo, opere em Zero Trust e domine a carreira.",
    chaptersRange: "Capítulos 10 a 15",
    theme: "Erros Clássicos (ANY ANY ANY), Logs, SIEM, ZTA, Hardening e Troubleshooting",
    badge: "Cyber Defender & Zero Trust Leader",
    minScoreToUnlockNext: 80,
    questions: [
      {
        id: 401,
        question: "Além da famosa regra 'ANY ANY ANY', qual é outro erro clássico citado no Capítulo 10 que causa incidentes de segurança graves?",
        options: [
          { letter: 'A', text: "Trocar o cabo de força do firewall durante o final de semana." },
          { letter: 'B', text: "Exposição desnecessária de portas de gerenciamento (SSH, HTTPS/WebUI) na interface WAN voltada diretamente para a internet pública sem restrição por IP de origem ou VPN." },
          { letter: 'C', text: "Usar senhas com mais de 20 caracteres complexos no console administrativo." },
          { letter: 'D', text: "Habilitar autenticação em dois fatores (MFA) para a equipe de TI." }
        ],
        correctOption: 'B',
        justification: "Conforme o Capítulo 10: Deixar a interface de administração web aberta para o mundo é um convite para exploração de vulnerabilidades de dia zero (0-day) e ataques de força bruta automatizados."
      },
      {
        id: 402,
        question: "Por que a sincronização rigorosa via protocolo NTP em todos os firewalls e servidores é crucial para o SIEM e a perícia forense?",
        options: [
          { letter: 'A', text: "Sem timestamps idênticos, torna-se impossível correlacionar com exatidão a sequência cronológica de eventos e passos de um ataque entre diferentes ativos de rede." },
          { letter: 'B', text: "Porque o firewall se recusa a ligar se o relógio atrasar 1 segundo." },
          { letter: 'C', text: "Para evitar que o horário de verão altere as cores da tela do administrador." },
          { letter: 'D', text: "Porque o NTP acelera fisicamente o tráfego da internet." }
        ],
        correctOption: 'A',
        justification: "Conforme o Capítulo 11: Em análise de incidentes, o SIEM precisa cruzar os logs do firewall com estações e servidores. Discrepâncias de minutos nos relógios invalidam a linha do tempo forense."
      },
      {
        id: 403,
        question: "No modelo Zero Trust Architecture (ZTA - NIST SP 800-207), qual é a relação de trabalho entre o PDP e o NGFW?",
        options: [
          { letter: 'A', text: "O NGFW atua como o Policy Enforcement Point (PEP), interceptando o fluxo de dados e executando a decisão de permitir ou bloquear que foi calculada pelo Policy Decision Point (PDP)." },
          { letter: 'B', text: "O PDP é apenas o cabo físico e o NGFW faz todas as decisões sozinho sem consultar contexto de endpoint ou identidade." },
          { letter: 'C', text: "O PDP e o NGFW são soluções mutuamente exclusivas que nunca podem operar juntas." },
          { letter: 'D', text: "O NGFW desliga a criptografia para que o PDP não precise trabalhar." }
        ],
        correctOption: 'A',
        justification: "Conforme o Capítulo 13: Em Zero Trust há separação estrita: o PDP analisa a postura do dispositivo e risco da identidade, enquanto o firewall (PEP) aplica a política nas fronteiras da rede."
      },
      {
        id: 404,
        question: "De acordo com o Apêndice C e as boas práticas de Hardening, qual é a postura correta para protocolos de gerenciamento do firewall?",
        options: [
          { letter: 'A', text: "Utilizar Telnet e HTTP sem criptografia para facilitar o acesso de qualquer computador." },
          { letter: 'B', text: "Desabilitar protocolos em texto claro (Telnet, HTTP, SNMPv1/v2c), forçar SSHv2/HTTPS com TLS moderno, isolar a gerência em VLAN/rede out-of-band e exigir MFA." },
          { letter: 'C', text: "Compartilhar a mesma senha 'admin123' entre todos os membros da empresa." },
          { letter: 'D', text: "Nunca realizar backup das configurações do firewall para evitar vazamento de dados." }
        ],
        correctOption: 'B',
        justification: "Conforme o Apêndice C (Hardening): O acesso administrativo deve ser blindado contra interceptação e acessível apenas por redes de gerência isoladas com autenticação forte e cifrada."
      },
      {
        id: 405,
        question: "Qual postura profissional a autora Mariana BS enfatiza como fundamental para o sucesso e longevidade na carreira de Cibersegurança?",
        options: [
          { letter: 'A', text: "Acreditar piamente em promessas de inteligência artificial mágica que dispensam conhecimento técnico de protocolos." },
          { letter: 'B', text: "Pensar como engenheiro analítico: testar na prática, questionar afirmações de marketing, compreender cada pacote no cabo e tratar a segurança com rigor de processo contínuo." },
          { letter: 'C', text: "Focar apenas em obter certificados de papel sem nunca operar uma linha de comando real." },
          { letter: 'D', text: "Evitar documentar mudanças para se tornar insubstituível na empresa." }
        ],
        correctOption: 'B',
        justification: "Conforme o Capítulo 15: O profissional de elite em segurança não se ilude com slogans. Ele domina o pacote, compreende a topologia, valida o risco e opera com disciplina e senso crítico inegociável."
      }
    ]
  }
];
