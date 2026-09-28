export type GlossaryCategory = 
  | 'HARDWARE' 
  | 'INSPEÇÃO' 
  | 'REDES & PROTOCOLOS' 
  | 'CRIPTOGRAFIA' 
  | 'ARQUITETURA & HA' 
  | 'DIMENSIONAMENTO' 
  | 'IDENTIDADE';

export interface GlossaryTerm {
  id: string;
  term: string;
  shortCode: string;
  aliases: string[];
  category: GlossaryCategory;
  definition: string;
  practicalTip: string;
  chapters: { id: string; number: number | string; title: string }[];
  icon?: 'cpu' | 'shield' | 'lock' | 'terminal' | 'activity' | 'layers' | 'network';
}

export const GLOSSARY_CATEGORIES: { id: GlossaryCategory | 'ALL'; label: string; color: string }[] = [
  { id: 'ALL', label: 'Todos os Termos', color: 'border-slate-700 text-slate-300' },
  { id: 'REDES & PROTOCOLOS', label: 'Redes & Protocolos (NAT, LACP...)', color: 'border-cyan-500/50 text-cyan-400' },
  { id: 'INSPEÇÃO', label: 'Inspeção & DPI (L7, App-ID...)', color: 'border-red-500/50 text-red-400' },
  { id: 'ARQUITETURA & HA', label: 'Arquitetura & HA (Cluster, DMZ...)', color: 'border-purple-500/50 text-purple-400' },
  { id: 'HARDWARE', label: 'Hardware & Silício (ASIC, NPU...)', color: 'border-amber-500/50 text-amber-400' },
  { id: 'CRIPTOGRAFIA', label: 'Criptografia & TLS 1.3', color: 'border-emerald-500/50 text-emerald-400' },
  { id: 'DIMENSIONAMENTO', label: 'Dimensionamento & Throughput', color: 'border-sky-500/50 text-sky-400' },
  { id: 'IDENTIDADE', label: 'Identidade & Zero Trust (User-ID...)', color: 'border-indigo-500/50 text-indigo-400' },
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'nat',
    term: 'NAT (Network Address Translation)',
    shortCode: 'NAT',
    aliases: ['NAT', 'SNAT', 'DNAT', 'Source NAT', 'Destination NAT', 'Network Address Translation'],
    category: 'REDES & PROTOCOLOS',
    icon: 'network',
    definition: 'Mecanismo que modifica as informações de endereço IP no cabeçalho dos pacotes em trânsito através de um dispositivo roteador ou firewall. Permite que múltiplos computadores em uma rede privada compartilhem um único endereço IP público de internet (SNAT/PAT) ou redireciona conexões externas para servidores internos (DNAT/Port Forwarding).',
    practicalTip: 'No NGFW, regras de NAT e regras de Segurança são processadas em tabelas separadas. Lembre-se: em conexões de entrada com DNAT, a regra de segurança deve avaliar o IP original ou pós-NAT dependendo do fabricante (ex.: Palo Alto usa IP de destino pré-NAT, enquanto Fortinet usa pós-NAT).',
    chapters: [
      { id: 'cap-4', number: 4, title: 'Alta Disponibilidade & Redes' },
      { id: 'cap-5', number: 5, title: 'A Anatomia da Regra Perfeita' }
    ]
  },
  {
    id: 'cgnat',
    term: 'CGNAT (Carrier-Grade NAT / NAT444)',
    shortCode: 'CGNAT',
    aliases: ['CGNAT', 'Carrier-Grade NAT', 'NAT444'],
    category: 'REDES & PROTOCOLOS',
    icon: 'network',
    definition: 'Técnica de NAT em larga escala utilizada por provedores de internet (ISPs) e operadoras para mitigar a exaustão de endereços IPv4, criando uma camada intermediária de endereçamento privado (RFC 6598 - 100.64.0.0/10) entre o cliente e a internet pública.',
    practicalTip: 'Se sua empresa estiver atrás de um link com CGNAT, túneis IPsec tradicionais podem falhar sem a ativação obrigatória de NAT-Traversal (NAT-T na porta UDP 4500).',
    chapters: [
      { id: 'cap-4', number: 4, title: 'Alta Disponibilidade & Redes' }
    ]
  },
  {
    id: 'dpi',
    term: 'DPI (Deep Packet Inspection / Inspeção Profunda)',
    shortCode: 'DPI',
    aliases: ['DPI', 'Deep Packet Inspection', 'Inspeção Profunda', 'Inspeção de Pacotes'],
    category: 'INSPEÇÃO',
    icon: 'activity',
    definition: 'Capacidade do Next-Generation Firewall de examinar o conteúdo (payload) da Camada 7 dos pacotes em busca de assinaturas de malwares, vulnerabilidades conhecidas (IPS), heurísticas e comandos de aplicação, indo muito além dos simples cabeçalhos L3/L4 (IP e porta).',
    practicalTip: 'A inspeção DPI consome de 3 a 5 vezes mais poder de processamento do que a filtragem stateful de camada 4. Sem decifração TLS, o DPI se torna praticamente cego em mais de 90% do tráfego da internet.',
    chapters: [
      { id: 'cap-1', number: 1, title: 'Do Parafuso ao Tráfego' },
      { id: 'cap-2', number: 2, title: 'Decifrando o Invisível' }
    ]
  },
  {
    id: 'lacp',
    term: 'LACP (Link Aggregation Control Protocol - IEEE 802.3ad / 802.1AX)',
    shortCode: 'LACP',
    aliases: ['LACP', 'Link Aggregation', 'Port-Channel', 'EtherChannel', 'Bonding', '802.3ad'],
    category: 'REDES & PROTOCOLOS',
    icon: 'network',
    definition: 'Protocolo de padrão aberto que combina múltiplas portas físicas de rede (ex.: 2 ou 4 portas de 10 Gbps) em um único canal lógico (Port-Channel / Trunk), provendo aumento agregado de largura de banda e tolerância automática a falhas de cabo ou porta.',
    practicalTip: 'LACP utiliza algoritmos de hash (como IP Origem/Destino e Porta L4) para distribuir os fluxos entre os membros. Isso significa que um único fluxo TCP nunca excederá a velocidade de uma porta individual do bundle.',
    chapters: [
      { id: 'cap-4', number: 4, title: 'Alta Disponibilidade & Redes' }
    ]
  },
  {
    id: 'ha',
    term: 'HA (High Availability - Alta Disponibilidade / Cluster)',
    shortCode: 'HA',
    aliases: ['HA', 'Alta Disponibilidade', 'High Availability', 'Cluster', 'Active/Passive', 'Active/Active', 'Ativo/Passivo', 'Ativo/Ativo'],
    category: 'ARQUITETURA & HA',
    icon: 'activity',
    definition: 'Arquitetura que interliga dois ou mais appliances de firewall através de links dedicados (Heartbeat e State Sync). Permite que um nó assuma imediatamente as operações caso o outro sofra falha de energia, hardware ou perda de links, sem interrupção de sessões.',
    practicalTip: 'Sempre utilize no mínimo 2 links dedicados cruzados para o Heartbeat. Se os nós perderem a comunicação entre si mas mantiverem conexão com as redes, ocorrerá o temido "Split-Brain", onde ambos tentarão rotear com os mesmos IPs virtuais, derrubando a rede.',
    chapters: [
      { id: 'cap-4', number: 4, title: 'Alta Disponibilidade & Redes' }
    ]
  },
  {
    id: 'vrrp',
    term: 'VRRP (Virtual Router Redundancy Protocol)',
    shortCode: 'VRRP',
    aliases: ['VRRP', 'Virtual Router Redundancy Protocol', 'HSRP'],
    category: 'REDES & PROTOCOLOS',
    icon: 'network',
    definition: 'Protocolo de eleição padrão que provê failover automático do gateway padrão (Default Gateway) compartilhando um endereço IP e MAC virtual entre roteadores ou firewalls redundantes.',
    practicalTip: 'Muitos firewalls modernos gerenciam IPs virtuais nativamente pelo protocolo proprietário de HA, mas o VRRP continua fundamental na integração com switches de distribuição L3.',
    chapters: [
      { id: 'cap-4', number: 4, title: 'Alta Disponibilidade & Redes' }
    ]
  },
  {
    id: 'asic',
    term: 'ASIC (Application-Specific Integrated Circuit)',
    shortCode: 'ASIC',
    aliases: ['ASIC', 'ASICs', 'Application-Specific Integrated Circuit'],
    category: 'HARDWARE',
    icon: 'cpu',
    definition: 'Circuito integrado de silício projetado sob medida para executar funções matemáticas e de rede específicas em hardware (ex.: checagem de checksum, criptografia AES, comutação de pacotes) em taxa de linha (Line Rate) com latência na casa dos nanossegundos.',
    practicalTip: 'Fabricantes como a Fortinet utilizam ASICs dedicados (SPU: Network Processors e Content Processors) para garantir que inspeção de VPN e tráfego L4 não sobrecarreguem o processador x86 principal.',
    chapters: [
      { id: 'cap-1', number: 1, title: 'Do Parafuso ao Tráfego' }
    ]
  },
  {
    id: 'npu',
    term: 'NPU (Network Processing Unit)',
    shortCode: 'NPU',
    aliases: ['NPU', 'Network Processing Unit', 'NPUs'],
    category: 'HARDWARE',
    icon: 'cpu',
    definition: 'Processador programável otimizado especificamente para telecomunicações e manipulação de pacotes de dados. Opera no Data Plane (plano de dados), assumindo roteamento L3, tags VLAN 802.1Q e encapsulamento IPsec.',
    practicalTip: 'Se o tráfego da sua empresa for direcionado a recursos que não exigem DPI complexo (ex.: backup de Storage SAN entre data centers), garanta que ele seja descarregado (offloaded) diretamente para o NPU.',
    chapters: [
      { id: 'cap-1', number: 1, title: 'Do Parafuso ao Tráfego' }
    ]
  },
  {
    id: 'cpu',
    term: 'CPU & Plano de Controle (Control Plane)',
    shortCode: 'CPU',
    aliases: ['CPU', 'Control Plane', 'Plano de Controle', 'Processador'],
    category: 'HARDWARE',
    icon: 'cpu',
    definition: 'Unidade de processamento central de propósito geral (geralmente arquitetura x86 multi-core da Intel ou AMD) responsável pelo gerenciamento do firewall, compilação de regras, protocolos dinâmicos de roteamento (BGP, OSPF) e heurística avançada.',
    practicalTip: 'Quando a CPU atinge 90%+ sustentado, novas conexões sofrem latência de handshake ou são descartadas. A separação física entre Control Plane e Data Plane evita que a interface de gestão trave sob ataques de negação de serviço.',
    chapters: [
      { id: 'cap-1', number: 1, title: 'Do Parafuso ao Tráfego' }
    ]
  },
  {
    id: 'tls 1.3',
    term: 'TLS 1.3 (Transport Layer Security)',
    shortCode: 'TLS 1.3',
    aliases: ['TLS 1.3', 'TLS1.3', 'TLS', 'SSL/TLS'],
    category: 'CRIPTOGRAFIA',
    icon: 'lock',
    definition: 'Mais moderna versão do protocolo criptográfico que protege a World Wide Web. Implementa handshake rápido de 1-RTT, elimina algoritmos obsoletos (como RSA tradicional e SHA-1) e exige Forward Secrecy com curvas elípticas (ECDHE) por padrão.',
    practicalTip: 'Com o TLS 1.3, é impossível inspecionar o tráfego de forma passiva através de taps ou espelhamento de porta (SPAN). O firewall precisa obrigatoriamente atuar como SSL Forward Proxy ativo.',
    chapters: [
      { id: 'cap-2', number: 2, title: 'Decifrando o Invisível' }
    ]
  },
  {
    id: 'forward proxy',
    term: 'SSL/TLS Forward Proxy (Decifração de Borda)',
    shortCode: 'Forward Proxy',
    aliases: ['Forward Proxy', 'SSL Forward Proxy', 'TLS Decryption', 'Decifração TLS', 'Man-in-the-Middle Controlado'],
    category: 'CRIPTOGRAFIA',
    icon: 'lock',
    definition: 'Arquitetura onde o firewall atua como proxy reverso duplo e transparente para clientes internos: intercepta a requisição HTTPS do usuário, estabelece conexão segura independente com o servidor web externo, inspeciona o payload aberto e re-criptografa os dados para o cliente usando uma autoridade certificadora (CA) interna.',
    practicalTip: 'Nunca inicie a decifração SSL sem distribuir previamente a CA raiz do firewall em todos os computadores da empresa via GPO/MDM, sob risco de quebrar navegadores com alertas de certificado inválido.',
    chapters: [
      { id: 'cap-2', number: 2, title: 'Decifrando o Invisível' }
    ]
  },
  {
    id: 'zero trust',
    term: 'Zero Trust Architecture (ZTA)',
    shortCode: 'Zero Trust',
    aliases: ['Zero Trust', 'ZTA', 'Zero Trust Architecture', 'Arquitetura Zero Trust'],
    category: 'ARQUITETURA & HA',
    icon: 'shield',
    definition: 'Modelo e filosofia de segurança fundamentados no lema "Nunca confie, sempre verifique". Assume que a rede interna corporativa já está hostil ou comprometida, exigindo verificação contínua de identidade, integridade do dispositivo e acesso com o menor privilégio possível.',
    practicalTip: 'Zero Trust não é um produto que se compra em caixa fechada; é uma arquitetura. No modelo, o firewall de borda e datacenter atua fundamentalmente como PEP (Policy Enforcement Point).',
    chapters: [
      { id: 'cap-3', number: 3, title: 'Zero Trust na Prática' },
      { id: 'cap-5', number: 5, title: 'A Anatomia da Regra Perfeita' }
    ]
  },
  {
    id: 'pep',
    term: 'PEP (Policy Enforcement Point)',
    shortCode: 'PEP',
    aliases: ['PEP', 'Policy Enforcement Point'],
    category: 'ARQUITETURA & HA',
    icon: 'shield',
    definition: 'O componente de infraestrutura onde a política de segurança é materialmente executada, inspecionada, permitida ou bloqueada (ex.: o próprio appliance de firewall, switches 802.1X ou agentes locais).',
    practicalTip: 'O PEP executa as decisões calculadas e instruídas pelo PDP (Policy Decision Point).',
    chapters: [
      { id: 'cap-3', number: 3, title: 'Zero Trust na Prática' }
    ]
  },
  {
    id: 'pdp',
    term: 'PDP (Policy Decision Point)',
    shortCode: 'PDP',
    aliases: ['PDP', 'Policy Decision Point'],
    category: 'ARQUITETURA & HA',
    icon: 'layers',
    definition: 'O cérebro decisório central de segurança (ex.: Active Directory, servidores NAC como Cisco ISE/Aruba ClearPass, ou IDPs como Okta e Azure AD) que avalia a postura, o contexto e o risco do usuário e instrui o PEP se a conexão deve ser liberada.',
    practicalTip: 'Uma falha de comunicação entre o PEP (firewall) e o PDP (IDP/NAC) pode forçar o firewall a operar em modo fallback (fail-open ou fail-close).',
    chapters: [
      { id: 'cap-3', number: 3, title: 'Zero Trust na Prática' }
    ]
  },
  {
    id: 'app-id',
    term: 'App-ID (Identificação de Aplicações de Camada 7)',
    shortCode: 'App-ID',
    aliases: ['App-ID', 'Application Identification', 'AppID', 'Identificação de Aplicação'],
    category: 'INSPEÇÃO',
    icon: 'terminal',
    definition: 'Capacidade do Next-Generation Firewall de classificar a aplicação real que trafega dentro do túnel de dados (ex.: Teams, BitTorrent, Salesforce, SSH) examinando assinaturas comportamentais, transações e protocolos, independentemente da porta TCP/UDP utilizada.',
    practicalTip: 'Regras baseadas apenas em portas (ex.: "Permitir TCP 443") deixam a porta aberta para qualquer cavalo de troia que utilize HTTPS como túnel de exfiltração. Use sempre App-ID.',
    chapters: [
      { id: 'cap-5', number: 5, title: 'A Anatomia da Regra Perfeita' }
    ]
  },
  {
    id: 'user-id',
    term: 'User-ID (Vinculação de Identidade de Usuário)',
    shortCode: 'User-ID',
    aliases: ['User-ID', 'UserID', 'Identity-Based Firewall'],
    category: 'IDENTIDADE',
    icon: 'layers',
    definition: 'Tecnologia que mapeia continuamente endereços IP transitórios da rede aos usuários e grupos correspondentes no diretório central (Active Directory, LDAP, Okta, Azure AD), permitindo escrever regras de segurança para pessoas e departamentos em vez de blocos CIDR.',
    practicalTip: 'Sem User-ID, políticas escritas para endereços IP fixos quebram sempre que um usuário recebe outro IP via DHCP ou transita entre Wi-Fi e cabo.',
    chapters: [
      { id: 'cap-3', number: 3, title: 'Zero Trust na Prática' },
      { id: 'cap-5', number: 5, title: 'A Anatomia da Regra Perfeita' }
    ]
  },
  {
    id: 'dmz',
    term: 'DMZ (Demilitarized Zone / Zona Desmilitarizada)',
    shortCode: 'DMZ',
    aliases: ['DMZ', 'Zona Desmilitarizada', 'Demilitarized Zone'],
    category: 'ARQUITETURA & HA',
    icon: 'shield',
    definition: 'Segmento de rede físico ou VLAN intermediária isolada que abriga servidores voltados para o público externo (Web, DNS, VPN, APIs). É configurada com políticas rígidas que impedem qualquer conexão iniciada da DMZ em direção à rede interna (LAN).',
    practicalTip: 'Regra de ouro: se um servidor na DMZ for comprometido por invasores, o firewall deve bloquear terminantemente qualquer tráfego que tente saltar (lateral movement) em direção aos servidores internos ou estações de trabalho.',
    chapters: [
      { id: 'cap-5', number: 5, title: 'A Anatomia da Regra Perfeita' }
    ]
  },
  {
    id: 'stateful',
    term: 'Stateful Inspection (Inspeção com Estado de Sessão)',
    shortCode: 'Stateful',
    aliases: ['Stateful Inspection', 'Inspeção Stateful', 'Tabela de Sessões', 'State Table'],
    category: 'INSPEÇÃO',
    icon: 'shield',
    definition: 'Algoritmo inventado pela Check Point em 1993 que rastreia os estados das conexões (SYN, SYN-ACK, ACK, ESTABLISHED, FIN) em uma tabela de memória RAM. Ao autorizar um fluxo de ida, o tráfego de resposta legítimo é automaticamente permitido.',
    practicalTip: 'Ao contrário de ACLs antigas (Stateless), o firewall stateful bloqueia automaticamente pacotes com flag ACK forjada que não pertençam a um handshake TCP prévio registrado na tabela de sessões.',
    chapters: [
      { id: 'cap-1', number: 1, title: 'Do Parafuso ao Tráfego' },
      { id: 'cap-5', number: 5, title: 'A Anatomia da Regra Perfeita' }
    ]
  },
  {
    id: 'regra do divisor',
    term: 'A Regra do Divisor (Dimensionamento Real)',
    shortCode: 'Regra do Divisor',
    aliases: ['Regra do Divisor', 'Divisor', 'Sizing Real'],
    category: 'DIMENSIONAMENTO',
    icon: 'layers',
    definition: 'Regra prática de engenharia proposta no livro: pegue o throughput declarado pelo fabricante no datasheet e divida por 3 a 5 para tráfego com IPS/DPI ligado, e por 5 a 10 se houver inspeção profunda em massa de TLS 1.3 com pacotes mistos.',
    practicalTip: 'Um appliance com "10 Gbps" na caixa comercial entregará entre 1 e 3.3 Gbps em um ambiente de produção corporativo com segurança máxima ligada.',
    chapters: [
      { id: 'cap-1', number: 1, title: 'Do Parafuso ao Tráfego' }
    ]
  },
  {
    id: 'imix',
    term: 'IMIX (Internet Mix Traffic)',
    shortCode: 'IMIX',
    aliases: ['IMIX', 'Internet Mix', 'Tamanhos Mistos'],
    category: 'DIMENSIONAMENTO',
    icon: 'activity',
    definition: 'Perfil estatístico padronizado de tráfego de rede composto por uma mistura realista de tamanhos de pacotes: cerca de 58% de pacotes pequenos (64 bytes - ACKs e DNS), 9% de médios (576 bytes) e 33% de grandes (1518 bytes - downloads e streams).',
    practicalTip: 'Testes de marketing anunciam throughput com 1518 bytes. Sempre exija do seu fornecedor os testes medidos no padrão IMIX.',
    chapters: [
      { id: 'cap-1', number: 1, title: 'Do Parafuso ao Tráfego' }
    ]
  },
  {
    id: 'headroom',
    term: 'Headroom (Margem de Expansão)',
    shortCode: 'Headroom',
    aliases: ['Headroom', 'Margem de Segurança', 'Margem Livre'],
    category: 'DIMENSIONAMENTO',
    icon: 'activity',
    definition: 'Reserva percentual de capacidade livre de CPU, memória RAM e vazão (geralmente mantida entre 30% e 50%) para absorver picos repentinos de tráfego e sustentar o crescimento operacional da empresa por 3 a 5 anos.',
    practicalTip: 'Um firewall que entra em operação no primeiro mês com 80% de uso de CPU colapsará antes do primeiro aniversário.',
    chapters: [
      { id: 'cap-1', number: 1, title: 'Do Parafuso ao Tráfego' }
    ]
  },
  {
    id: 'throughput',
    term: 'Throughput Real (Vazão Efetiva)',
    shortCode: 'Throughput',
    aliases: ['Throughput', 'Throughput Real', 'Vazão', 'Gbps Real'],
    category: 'DIMENSIONAMENTO',
    icon: 'activity',
    definition: 'A taxa real de bits úteis por segundo que o firewall consegue processar e encaminhar com todos os motores de segurança (App-ID, IPS, Antivírus, Web Filtering, TLS Decryption) ativados simultaneamente.',
    practicalTip: 'Nunca use métrica de "Firewall Throughput L4" para dimensionar borda moderna. Utilize sempre a métrica de "Threat Prevention / Threat Protection Throughput".',
    chapters: [
      { id: 'cap-1', number: 1, title: 'Do Parafuso ao Tráfego' }
    ]
  },
  {
    id: 'sd-wan',
    term: 'Secure SD-WAN (Software-Defined WAN)',
    shortCode: 'SD-WAN',
    aliases: ['SD-WAN', 'SDWAN', 'Software-Defined WAN'],
    category: 'REDES & PROTOCOLOS',
    icon: 'network',
    definition: 'Tecnologia que gerencia dinamicamente o roteamento de tráfego corporativo entre múltiplos links de internet (fibra, banda larga, 4G/5G, MPLS) com base em métricas de qualidade em tempo real (latência, jitter e perda de pacotes), integrando segurança de firewall nativa na ponta.',
    practicalTip: 'Firewalls modernos como o FortiGate e Barracuda trazem motores de SD-WAN embutidos, permitindo priorizar chamadas de voz (Teams, VoIP) pelo link mais estável automaticamente.',
    chapters: [
      { id: 'cap-4', number: 4, title: 'Alta Disponibilidade & Redes' }
    ]
  },
  {
    id: 'ips',
    term: 'IPS / IDS (Intrusion Prevention & Detection System)',
    shortCode: 'IPS',
    aliases: ['IPS', 'IDS', 'Intrusion Prevention System', 'Sistema de Prevenção de Intrusão'],
    category: 'INSPEÇÃO',
    icon: 'shield',
    definition: 'Sistema de segurança integrado ao NGFW que analisa fluxos de rede em busca de comportamentos maliciosos, explorações de vulnerabilidades conhecidas (CVEs), ataques de buffer overflow e scanners de rede, bloqueando a conexão em tempo real (inline).',
    practicalTip: 'Mantenha as assinaturas de IPS com atualização automática frequente. Ative perfis com ação "Drop" (descarte) para ameaças de severidade Crítica e Alta.',
    chapters: [
      { id: 'cap-1', number: 1, title: 'Do Parafuso ao Tráfego' },
      { id: 'cap-5', number: 5, title: 'A Anatomia da Regra Perfeita' }
    ]
  },
  {
    id: 'bgp',
    term: 'BGP (Border Gateway Protocol)',
    shortCode: 'BGP',
    aliases: ['BGP', 'Border Gateway Protocol', 'eBGP', 'iBGP'],
    category: 'REDES & PROTOCOLOS',
    icon: 'network',
    definition: 'Protocolo de roteamento dinâmico que move a espinha dorsal da internet mundial. Utilizado em firewalls de borda para trocar tabelas de rotas com múltiplos provedores de telecomunicações (sistemas autônomos - ASN), provendo redundância de saída multi-homed.',
    practicalTip: 'Ao rodar BGP com tabela completa (Full Routing Table) diretamente no firewall, certifique-se de que a caixa tenha memória RAM suficiente (no mínimo 16 GB a 32 GB) para armazenar centenas de milhares de rotas sem esgotar o plano de controle.',
    chapters: [
      { id: 'cap-4', number: 4, title: 'Alta Disponibilidade & Redes' }
    ]
  },
  {
    id: 'mtu',
    term: 'MTU / MSS (Maximum Transmission Unit & Segment Size)',
    shortCode: 'MTU/MSS',
    aliases: ['MTU', 'MSS', 'Maximum Transmission Unit', 'Maximum Segment Size', 'Fragmentação'],
    category: 'REDES & PROTOCOLOS',
    icon: 'network',
    definition: 'MTU (geralmente 1500 bytes na Ethernet) define o tamanho máximo de um pacote sem fragmentação. O MSS (1460 bytes) é a porção útil de dados do TCP. Em túneis VPN IPsec, cabeçalhos criptográficos adicionais reduzem o MTU útil.',
    practicalTip: 'Sintoma clássico de MTU desajustado em túneis VPN: o comando ping funciona perfeitamente, mas sites HTTPS ou downloads travam no meio da carga. Solução: habilite o MSS Clamping (ex.: MSS 1360 ou 1400) no firewall.',
    chapters: [
      { id: 'cap-4', number: 4, title: 'Alta Disponibilidade & Redes' }
    ]
  }
];

export const GLOSSARY_MAP: Record<string, GlossaryTerm> = GLOSSARY_TERMS.reduce((acc, term) => {
  acc[term.id] = term;
  acc[term.shortCode.toLowerCase()] = term;
  term.aliases.forEach(alias => {
    acc[alias.toLowerCase()] = term;
  });
  return acc;
}, {} as Record<string, GlossaryTerm>);
