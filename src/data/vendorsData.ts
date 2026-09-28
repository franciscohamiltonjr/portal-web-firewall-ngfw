export interface NgfwVendor {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  brandColor: string;
  accentBorder: string;
  bgGradient: string;
  applianceModel: string;
  imageSrc: string;
  keyHighlights: string[];
  summary: string;
  historyAndArchitecture: {
    origin: string;
    hardwareArchitecture: string;
    operatingSystem: string;
    keyFeatures: string[];
    bestFor: string;
    sizingTip: string;
  };
}

export const NGFW_VENDORS: NgfwVendor[] = [
  {
    id: 'cisco-asa',
    name: 'CISCO',
    subtitle: 'Cisco ASA & Secure Firewall (FTD)',
    badge: 'Líder Corporativo Histórico',
    brandColor: '#00bceb',
    accentBorder: 'border-sky-500/60',
    bgGradient: 'from-sky-950/40 via-slate-950 to-slate-900',
    applianceModel: 'Cisco ASA 55XX / Secure Firewall Series',
    imageSrc: '/src/assets/images/cisco_asa_ngfw_1790537059415.jpg',
    keyHighlights: [
      'Alta performance, robustez e alta confiabilidade operacional',
      'VPN AnyConnect / Cisco Secure Client escalável e madura',
      'Proteção avançada contra ameaças com motor Snort 3',
      'Padrão consolidado em data centers e redes corporativas'
    ],
    summary: 'A Cisco é a pioneira mundial em roteamento e segurança de redes. Com a linhagem PIX -> ASA -> Firepower (FTD) e a nova família Cisco Secure Firewall, consolidou a reputação de maior parque instalado em grandes empresas e órgãos governamentais.',
    historyAndArchitecture: {
      origin: 'Fundada em 1984 nos EUA, lançou a histórica linha Cisco PIX e posteriormente a série ASA (Adaptive Security Appliance), estabelecendo o padrão de VPNs IPsec/SSL no mercado corporativo.',
      hardwareArchitecture: 'Combinação de CPUs multithreading com aceleração criptográfica dedicada em hardware para terminação de VPNs massivas e processamento de rotas BGP/OSPF em alta velocidade.',
      operatingSystem: 'Cisco ASA Software clássico e Cisco Firepower Threat Defense (FTD), integrando o motor open-source Snort 3 para inspeção profunda de pacotes (DPI) e inteligência Talos.',
      keyFeatures: [
        'Cisco Talos Intelligence (um dos maiores grupos privados de inteligência de ameaças do mundo)',
        'Clustering e alta disponibilidade (HA Active/Active e Active/Standby)',
        'Cisco AnyConnect / Secure Client com postura de segurança e validação de compliance',
        'Integração nativa com switches Catalyst, roteadores e arquitetura Cisco ACI'
      ],
      bestFor: 'Grandes corporações, operadoras de telecom, data centers bancários e redes com infraestrutura prévia Cisco.',
      sizingTip: 'Ao migrar de ASA clássico para FTD (Firepower), dimensione o throughput considerando a ativação simultânea de Snort 3 DPI e decifração TLS, que demandam mais ciclos de CPU.'
    }
  },
  {
    id: 'fortigate',
    name: 'FORTIGATE',
    subtitle: 'Fortinet FortiGate & Security Fabric',
    badge: 'Líder em Custo-Benefício & ASICs',
    brandColor: '#ee3124',
    accentBorder: 'border-red-500/60',
    bgGradient: 'from-red-950/40 via-slate-950 to-slate-900',
    applianceModel: 'FortiGate Series (Desktop & Rackmount)',
    imageSrc: '/src/assets/images/fortigate_ngfw_1790537071826.jpg',
    keyHighlights: [
      'Segurança de ponta a ponta acelerada por hardware proprietário',
      'SD-WAN integrada nativamente sem custo adicional de licença',
      'Excelente relação custo x Gbps inspecionado em DPI',
      'Gerenciamento centralizado robusto via FortiManager e FortiAnalyzer'
    ],
    summary: 'Fundada por Ken Xie em 2000, a Fortinet revolucionou a indústria com o desenvolvimento de processadores de segurança customizados (ASICs SPU). Entrega taxas altíssimas de transferência de firewall e VPN com excelente custo de aquisição.',
    historyAndArchitecture: {
      origin: 'Pioneira no conceito UTM (Unified Threat Management) e líder constante no quadrante Gartner para firewalls de rede e SD-WAN corporativa.',
      hardwareArchitecture: 'Uso de circuitos integrados customizados (ASICs SPU): NP (Network Processor para offload L3/L4 e VPN IPsec) e CP (Content Processor para inspeção de conteúdo, antivírus e descriptografia SSL).',
      operatingSystem: 'FortiOS — sistema operacional unificado para toda a linha, do menor appliance desktop até chassis de telecomunicações de classe carrier.',
      keyFeatures: [
        'Secure SD-WAN integrada com seleção dinâmica de caminho e telemetria de link',
        'Fortinet Security Fabric (compartilhamento de telemetria entre firewall, switch, AP e endpoint)',
        'FortiGuard Labs gerando assinaturas automáticas de IPS, Web Filtering e Antivírus',
        'Zero Trust Network Access (ZTNA) com proxy de acesso de aplicações nativo'
      ],
      bestFor: 'PMEs, médias e grandes empresas distribuídas em filiais, varejo, escolas e ambientes que buscam SD-WAN de alta performance sem explodir o orçamento.',
      sizingTip: 'Diferencial enorme em VPN IPsec e tráfego L4 graças aos NPs. Ao habilitar inspeção profunda SSL/TLS e IPS simultâneos, verifique os números do Threat Protection Throughput no datasheet.'
    }
  },
  {
    id: 'palo-alto',
    name: 'PALO ALTO NETWORKS',
    subtitle: 'PA-Series & ML-Powered NGFW',
    badge: 'Referência Mundial em NGFW L7',
    brandColor: '#ff6900',
    accentBorder: 'border-orange-500/60',
    bgGradient: 'from-orange-950/40 via-slate-950 to-slate-900',
    applianceModel: 'Palo Alto PA-Series (PA-400 / PA-3400 / PA-5400)',
    imageSrc: '/src/assets/images/palo_alto_ngfw_1790537083599.jpg',
    keyHighlights: [
      'Criadora pioneira do conceito de Next-Generation Firewall (NGFW)',
      'Identificação de aplicações independente de porta e protocolo (App-ID)',
      'Prevenção de ameaças avançada com análise em sandbox na nuvem (WildFire)',
      'Visibilidade granular e modelo Zero Trust nativo por usuário (User-ID)'
    ],
    summary: 'Fundada em 2005 por Nir Zuk (ex-engenheiro da Check Point e Juniper), a Palo Alto Networks redefiniu a segurança cibernética ao provar que firewalls baseados apenas em portas TCP/UDP estavam obsoletos, criando o App-ID e a arquitetura Single-Pass.',
    historyAndArchitecture: {
      origin: 'Responsável pela definição original da categoria NGFW pelo Gartner em 2009. É considerada o padrão-ouro em eficácia de segurança e controle de camada 7.',
      hardwareArchitecture: 'Arquitetura SP3 (Single-Pass Parallel Processing): processa inspeção de tráfego, decifração, classificação de aplicação e checagem de vírus em uma única passada de memória, evitando latência de cascata de módulos.',
      operatingSystem: 'PAN-OS — sistema operacional com separação total em hardware entre o Control Plane (gerenciamento) e o Data Plane (processamento de pacotes).',
      keyFeatures: [
        'App-ID: identifica com precisão milhares de aplicativos mesmo se usarem portas não padrão ou criptografia',
        'User-ID: vincula o tráfego diretamente à identidade do Active Directory / Azure AD / Okta',
        'WildFire: análise automatizada de malwares desconhecidos (Zero-Day) em nuvem distribuída',
        'DNS Security & Advanced Threat Prevention com modelos de Machine Learning inline'
      ],
      bestFor: 'Empresas com requisitos rigorosos de compliance (PCI-DSS, LGPD, SOX), bancos, hospitais e redes de missão crítica.',
      sizingTip: 'A separação de Control Plane e Data Plane garante que a interface de gerenciamento nunca trave sob tráfego pesado. No dimensionamento, utilize a métrica "Threat Prevention Throughput".'
    }
  },
  {
    id: 'barracuda',
    name: 'BARRACUDA',
    subtitle: 'Barracuda CloudGen Firewall',
    badge: 'Especialista em Nuvem & Otimização WAN',
    brandColor: '#00a3e0',
    accentBorder: 'border-cyan-500/60',
    bgGradient: 'from-cyan-950/40 via-slate-950 to-slate-900',
    applianceModel: 'Barracuda CloudGen Firewall (F-Series)',
    imageSrc: '/src/assets/images/barracuda_ngfw_1790537094378.jpg',
    keyHighlights: [
      'Proteção unificada para redes locais e ambientes multi-cloud',
      'Protocolo proprietário TINA VPN para enlaces altamente resilientes',
      'Forte sinergia com Microsoft Azure, AWS e Google Cloud Platform',
      'Fácil implantação com gerenciamento centralizado em escala'
    ],
    summary: 'A Barracuda Networks, fundada em 2003, ganhou fama com appliances antispam e evoluiu após a aquisição da Phion para o CloudGen Firewall, uma solução robusta focada em interligar filiais dispersas e infraestruturas em nuvem pública.',
    historyAndArchitecture: {
      origin: 'Evolução da tecnologia austríaca Phion Netfence, com foco em resiliência de túneis VPN e compressão de tráfego WAN em links de baixa qualidade.',
      hardwareArchitecture: 'Appliances baseados em arquitetura x86 com aceleradores criptográficos e display LCD frontal característico para diagnósticos locais e status de interface.',
      operatingSystem: 'Barracuda OS — sistema operacional endurecido com forte foco em orquestração de rotas dinâmicas e qualidade de serviço (QoS).',
      keyFeatures: [
        'TINA VPN: extensão proprietária do IPsec com compressão, agregação de links e failover ultrarrápido',
        'Integração nativa com Microsoft Azure Virtual WAN e automação via API',
        'Barracuda Firewall Control Center: gerencia milhares de appliances a partir de um único console',
        'Proteção em camadas contra ransomware, botnets e exfiltração de dados'
      ],
      bestFor: 'Empresas industriais, redes de franquias, conectividade entre filiais com múltiplos links de internet e ambientes híbridos/multi-cloud.',
      sizingTip: 'Destaque absoluto em cenários onde múltiplos links de internet de baixo custo (banda larga/fibra/4G) precisam ser agregados em um único túnel confiável.'
    }
  },
  {
    id: 'sophos',
    name: 'SOPHOS',
    subtitle: 'Sophos XGS Firewall & Synchronized Security',
    badge: 'Pioneira em Segurança Sincronizada',
    brandColor: '#0066cc',
    accentBorder: 'border-blue-500/60',
    bgGradient: 'from-blue-950/40 via-slate-950 to-slate-900',
    applianceModel: 'Sophos XGS Series Firewall (Dual-Engine)',
    imageSrc: '/src/assets/images/sophos_xgs_ngfw_1790537105309.jpg',
    keyHighlights: [
      'Segurança Sincronizada (Security Heartbeat) entre Firewall e Endpoint',
      'Processadores dedicados Xstream Flow (NPU) para aceleração de tráfego',
      'Isolamento automático e instantâneo de computadores infectados',
      'Console unificado em nuvem através do Sophos Central'
    ],
    summary: 'Fundada em Oxford em 1985, a Sophos é uma potência em cibersegurança que integrou a tecnologia da alemã Astaro e Cyberoam para criar o Sophos Firewall. Seu grande diferencial é a comunicação direta entre o antivírus do computador e o firewall da borda.',
    historyAndArchitecture: {
      origin: 'Pioneira em proteção de endpoints e antivírus, unificou a segurança de rede e de estações através do conceito revolucionário de "Security Heartbeat".',
      hardwareArchitecture: 'Arquitetura Xstream Dual-Engine: combina CPU multi-core convencional para tarefas de controle e um NPU dedicado (Xstream Flow Processor) para offload de tráfego confiável e inspeção de TLS 1.3.',
      operatingSystem: 'SFOS (Sophos Firewall OS) — interface web intuitiva com diagnósticos visuais claros e relatórios incorporados no próprio appliance.',
      keyFeatures: [
        'Security Heartbeat: se um endpoint é infectado por ransomware, o firewall corta automaticamente o acesso desse computador à internet e ao restante da rede',
        'Xstream DPI Engine: inspeção de fluxo único para IPS, AV e proteção web sem proxies desnecessários',
        'Inspeção acelerada de TLS 1.3 com alta performance e sem quebrar aplicações modernas',
        'Gerenciamento 100% cloud via Sophos Central com resposta a incidentes gerenciada (MDR)'
      ],
      bestFor: 'Pequenas, médias e grandes empresas que buscam defesa coordenada contra ransomware integrando firewall com estações de trabalho e servidores.',
      sizingTip: 'A série XGS trouxe um salto de performance comparada à antiga série XG devido aos novos processadores Xstream NPU. Excelente para ambientes com alto volume de tráfego HTTPS criptografado.'
    }
  },
  {
    id: 'checkpoint',
    name: 'CHECK POINT',
    subtitle: 'Check Point Quantum & Infinity Architecture',
    badge: 'Criadora do Stateful Inspection',
    brandColor: '#e5007d',
    accentBorder: 'border-pink-500/60',
    bgGradient: 'from-pink-950/40 via-slate-950 to-slate-900',
    applianceModel: 'Check Point Quantum Series (com Maestro Hyperscale)',
    imageSrc: '/src/assets/images/checkpoint_quantum_1790537118725.jpg',
    keyHighlights: [
      'Inventora histórica do Stateful Inspection (Firewall com estado de conexão)',
      'Proteção preventiva de dia zero com SandBlast e ThreatCloud AI',
      'Arquitetura Hyperscale Maestro (permite empilhar até 52 appliances)',
      'Máxima confiabilidade e certificações militares/bancárias globais'
    ],
    summary: 'Fundada em 1993 em Israel por Gil Shwed, a Check Point patenteou o "Stateful Inspection", base de todos os firewalls modernos. É sinônimo de segurança impenetrável e estabilidade operacional para os ambientes mais exigentes do planeta.',
    historyAndArchitecture: {
      origin: 'Detentora da patente US Patent 5,606,668 (1997) para filtragem com estado. O produto histórico FireWall-1 foi o primeiro firewall comercial do mundo.',
      hardwareArchitecture: 'Linha Quantum com processadores multi-núcleo otimizados, aceleração em barramentos PCIe e tecnologia Maestro Hyperscale Orchestrator para balanceamento elástico de tráfego entre múltiplos chassis.',
      operatingSystem: 'GAiA OS — sistema operacional endurecido baseado em Linux de 64 bits com gerenciamento corporativo via SmartConsole centralizado.',
      keyFeatures: [
        'ThreatCloud AI: base global compartilhando inteligência em tempo real com mais de 3 bilhões de eventos diários',
        'SandBlast Zero-Day Protection: emulação de ameaças em CPU para detectar malwares evasivos antes de entrarem na rede',
        'Maestro Hyperscale: expansão sob demanda que permite alcançar até Terabits por segundo de throughput de firewall',
        'Controle granular de políticas de segurança em matriz unificada'
      ],
      bestFor: 'Setor financeiro, seguradoras, agências de inteligência, telecomunicações e grandes redes com gestão centralizada de alta maturidade.',
      sizingTip: 'Utilize a métrica SPU (Security Power Units) da Check Point para calcular a capacidade exata do hardware frente ao mix de pacotes real da sua empresa.'
    }
  }
];
