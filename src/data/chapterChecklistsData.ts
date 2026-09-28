export interface ChapterChecklist {
  chapterId: string;
  chapterNumber: number | string;
  title: string;
  keyDefinitions: { term: string; definition: string }[];
  checklistItems: { category: string; item: string }[];
}

export const CHAPTER_SPECIFIC_CHECKLISTS: Record<string, ChapterChecklist> = {
  "cap-1": {
    chapterId: "cap-1",
    chapterNumber: 1,
    title: "Do Parafuso ao Tráfego: Hardware, ASIC e Throughput",
    keyDefinitions: [
      {
        term: "Regra do Divisor",
        definition: "Dividir o throughput anunciado em datasheet por 3 a 5 para tráfego com DPI/IPS e por 5 a 10 para tráfego com inspeção TLS massiva."
      },
      {
        term: "PPS (Pacotes Por Segundo)",
        definition: "A métrica real de estresse da CPU do firewall. Pacotes pequenos de 64 bytes geram 18x mais interrupções por segundo que pacotes de 1500 bytes."
      },
      {
        term: "ASIC / NPU / SPU",
        definition: "Processadores dedicados de silício que descarregam o processamento de pacotes (offload) do plano de dados da CPU principal."
      },
      {
        term: "Diversidade Elétrica",
        definition: "Fontes de alimentação redundantes que devem obrigatoriamente estar ligadas em circuitos elétricos, nobreaks e geradores independentes."
      }
    ],
    checklistItems: [
      { category: "Hardware & Físico", item: "Validar se as duas fontes de alimentação estão conectadas em nobreaks e fases elétricas distintas." },
      { category: "Hardware & Físico", item: "Verificar se as ventoinhas (fans) e o fluxo de ar estão desobstruídos e com sensores em faixa normal." },
      { category: "Dimensionamento", item: "Calcular a capacidade real aplicando a Regra do Divisor (÷ 3 a 5 padrão; ÷ 5 a 10 com TLS)." },
      { category: "Dimensionamento", item: "Estimar o throughput considerando a predominância de pacotes de 64 bytes da rede corporativa." },
      { category: "Dimensionamento", item: "Garantir headroom mínimo de 30% a 50% de capacidade para absorver o crescimento de 3 anos." },
      { category: "Memória & CPU", item: "Confirmar que a memória RAM suporta a tabela máxima de sessões simultâneas projetadas sem swap." }
    ]
  },
  "cap-2": {
    chapterId: "cap-2",
    chapterNumber: 2,
    title: "O Que é um Firewall Moderno (L4 vs L7)",
    keyDefinitions: [
      {
        term: "Stateful Inspection (L4)",
        definition: "Filtragem que rastreia o estado da conexão TCP/UDP (SYN, ESTABLISHED, FIN) validando portas e endereços IP sem inspecionar o payload."
      },
      {
        term: "NGFW / L7 Deep Packet Inspection",
        definition: "Inspeção profunda que remonta o fluxo da camada de aplicação e identifica a função real do software independentemente da porta utilizada."
      },
      {
        term: "Tabela de Estados (State Table)",
        definition: "Estrutura de memória que mantém os metadados de cada sessão ativa. Se saturada, o firewall descarta novas conexões."
      }
    ],
    checklistItems: [
      { category: "Inspeção", item: "Substituir regras puramente L4 (baseadas em portas) por políticas orientadas a aplicações L7 homologadas." },
      { category: "Tabela de Sessões", item: "Monitorar o uso percentual da tabela de estados em horários de pico (manter abaixo de 70%)." },
      { category: "Timeout de Conexão", item: "Ajustar timeouts de sessões TCP inativas para evitar esgotamento de memória por conexões órfãs." },
      { category: "SYN Flood Protection", item: "Ativar mecanismos de SYN Cookie ou SYN Proxy nas interfaces voltadas para a Internet." },
      { category: "Protocol Anomaly", item: "Habilitar detecção de anomalias em cabeçalhos TCP/IP para descartar pacotes malformados antes do roteamento." }
    ]
  },
  "cap-3": {
    chapterId: "cap-3",
    chapterNumber: 3,
    title: "Arquitetura Interna: Plano de Dados vs. Plano de Controle",
    keyDefinitions: [
      {
        term: "Control Plane",
        definition: "Plano responsável pelo gerenciamento, roteamento dinâmico (OSPF/BGP), logs, autenticação e comunicação com o administrador."
      },
      {
        term: "Data Plane",
        definition: "Plano responsável pelo encaminhamento, inspeção e aplicação de regras nos pacotes em tempo real. Deve operar isolado do Control Plane."
      },
      {
        term: "Fast Path / Slow Path",
        definition: "Fast path é o encaminhamento acelerado por hardware para pacotes de sessões já aprovadas; Slow path processa o primeiro pacote na CPU."
      }
    ],
    checklistItems: [
      { category: "Isolamento de Planos", item: "Garantir que picos de tráfego no Data Plane não congelem o acesso administrativo ao Control Plane." },
      { category: "Interface de Gestão", item: "Utilizar interface de gerenciamento física dedicada (Out-of-Band) isolada do tráfego de produção." },
      { category: "Offload de Hardware", item: "Verificar se o offload de criptografia e inspeção de fluxo em ASIC está devidamente habilitado." },
      { category: "Monitoramento de CPU", item: "Separar os gráficos de telemetria entre CPU de Gerenciamento e núcleos do Processador de Pacotes." }
    ]
  },
  "cap-4": {
    chapterId: "cap-4",
    chapterNumber: 4,
    title: "O Ponto Cego: Decifração SSL/TLS",
    keyDefinitions: [
      {
        term: "Forward Proxy (Inbound vs Outbound)",
        definition: "Técnica onde o firewall intercepta a saída dos usuários, gera certificados dinâmicos assinados por uma CA corporativa e decifra o tráfego."
      },
      {
        term: "TLS 1.3 & Encrypted SNI (ESNI/ECH)",
        definition: "Protocolos modernos que criptografam a negociação inicial, impedindo a leitura do domínio acessado sem decifração ativa."
      },
      {
        term: "Lista de Exceção de TLS",
        definition: "Categorias que devem ser excluídas da decifração por exigências legais ou de compliance (Bancos, Saúde, Governamentais)."
      }
    ],
    checklistItems: [
      { category: "Certificados & PKI", item: "Distribuir a Autoridade Certificadora (CA) raiz do firewall em 100% dos endpoints via GPO ou MDM." },
      { category: "Exceções Legais", item: "Criar política de bypass de decifração para categorias confidenciais (Serviços Bancários e Saúde/LGPD)." },
      { category: "Certificate Pinning", item: "Mapear aplicações que utilizam Certificate Pinning (ex: WhatsApp, Dropbox, bancos) e cadastrar exceções." },
      { category: "Carga de CPU", item: "Aferir o impacto de CPU antes de expandir a decifração (aumento típico de 3x a 5x no consumo de recursos)." },
      { category: "Inspeção de Revogação", item: "Ativar verificação rigorosa de CRL/OCSP para bloquear certificados externos revogados ou expirados." }
    ]
  },
  "cap-5": {
    chapterId: "cap-5",
    chapterNumber: 5,
    title: "Matriz de Regras e Menor Privilégio",
    keyDefinitions: [
      {
        term: "Ordem Top-Down (First Match)",
        definition: "As regras são avaliadas de cima para baixo. O primeiro match encerra a avaliação. Regras específicas devem sempre preceder regras gerais."
      },
      {
        term: "Princípio do Menor Privilégio",
        definition: "Conceder exclusivamente os acessos necessários para a função de negócio pelo menor tempo e menor escopo possíveis."
      },
      {
        term: "Deny All Default",
        definition: "A última regra implícita da tabela que descarta silenciosamente qualquer pacote que não tenha sido explicitamente autorizado."
      }
    ],
    checklistItems: [
      { category: "Higiene de Regras", item: "Identificar e eliminar imediatamente qualquer regra com ação ALLOW contendo 'ANY ANY ANY'." },
      { category: "Ordem de Avaliação", item: "Posicionar regras de maior frequência e restrição no topo da tabela para reduzir ciclos de CPU." },
      { category: "Documentação", item: "Exigir campo de justificativa técnica, número de chamado de mudança e proprietário em cada regra." },
      { category: "Regras Órfãs", item: "Executar relatório de 'Hit Count Zero' para identificar e desativar regras sem uso nos últimos 90 dias." },
      { category: "Regra Final", item: "Confirmar que a regra final 'Deny All' está com logging ativo para registrar tentativas não autorizadas." }
    ]
  },
  "cap-6": {
    chapterId: "cap-6",
    chapterNumber: 6,
    title: "App-ID, User-ID e Content-ID",
    keyDefinitions: [
      {
        term: "App-ID",
        definition: "Identificação da aplicação real através de análise heurística e assinaturas de payload, independente da porta TCP/UDP."
      },
      {
        term: "User-ID",
        definition: "Vinculação do endereço IP efêmero da estação à identidade de usuário e grupos do Active Directory/LDAP em tempo real."
      },
      {
        term: "Content-ID",
        definition: "Mecanismo único de varredura contra malwares, vírus conhecidos, vulnerabilidades (IPS) e vazamento de dados sensíveis (DLP)."
      }
    ],
    checklistItems: [
      { category: "Integração AD", item: "Configurar agentes de leitura de Security Event Logs nos Controladores de Domínio (AD) com baixa latência." },
      { category: "Políticas por Grupo", item: "Estruturar regras de firewall utilizando grupos de segurança do AD em vez de endereços IPs individuais." },
      { category: "Sub-funções App-ID", item: "Distinguir e restringir subfunções de aplicações (ex: permitir Microsoft Teams chat, mas bloquear file transfer)." },
      { category: "Fallback de Identidade", item: "Definir política de quarentena ou captive portal para tráfegos provenientes de IPs sem User-ID identificado." }
    ]
  },
  "cap-7": {
    chapterId: "cap-7",
    chapterNumber: 7,
    title: "Zero Trust e o Firewall como PEP",
    keyDefinitions: [
      {
        term: "PEP (Policy Enforcement Point)",
        definition: "O ponto em linha na rede (Firewall) que executa a decisão de bloquear ou liberar o fluxo com base em validações contínuas."
      },
      {
        term: "PDP (Policy Decision Point)",
        definition: "O cérebro central de governança e identidade que avalia postura de segurança, MFA e autoriza o acesso do usuário."
      },
      {
        term: "Microssegmentação",
        definition: "Isolamento lateral que impede a comunicação direta entre servidores da mesma VLAN sem passar pela inspeção de um PEP."
      }
    ],
    checklistItems: [
      { category: "Arquitetura Zero Trust", item: "Configurar o firewall estritamente como PEP, consultando o PDP (IdP/IAM) em tempo real." },
      { category: "Movimento Lateral", item: "Segmentar servidores internos em zonas distintas para que o tráfego leste-oeste passe por inspeção de firewall." },
      { category: "Validação Contínua", item: "Revogar sessões ativas imediatamente quando um endpoint tem sua pontuação de risco elevada no EDR." },
      { category: "Acesso Condicional", item: "Integrar verificação de conformidade do dispositivo (certificado de máquina ou agente de postura)." }
    ]
  },
  "cap-8": {
    chapterId: "cap-8",
    chapterNumber: 8,
    title: "Zonas de Segurança, DMZ e NAT",
    keyDefinitions: [
      {
        term: "Zone-Based Firewall",
        definition: "Arquitetura onde políticas são aplicadas entre interfaces agrupadas por zonas de confiança (ex: WAN -> DMZ, LAN -> DMZ)."
      },
      {
        term: "Isolamento de DMZ",
        definition: "Princípio segundo o qual a DMZ recebe tráfego da Internet e da LAN, mas NUNCA pode iniciar conexões novas para a rede interna."
      },
      {
        term: "DNAT / Port Forwarding",
        definition: "Tradução de endereço de destino para publicar servidores internos para a Internet através de IPs públicos dedicados."
      }
    ],
    checklistItems: [
      { category: "Zoneamento", item: "Validar se cada interface física ou subinterface VLAN está vinculada à sua respectiva zona de segurança." },
      { category: "Fluxo DMZ -> LAN", item: "Garantir bloqueio estrito na direção DMZ para LAN interna (apenas permitir respostas de sessões estabelecidas)." },
      { category: "Políticas de NAT", item: "Auditar regras de DNAT para garantir que apenas as portas de serviço necessárias estejam expostas." },
      { category: "Pool de Source NAT", item: "Dimensionar a quantidade de IPs no pool de NAT de saída para evitar saturação de portas efêmeras (port exhaustion)." }
    ]
  },
  "cap-9": {
    chapterId: "cap-9",
    chapterNumber: 9,
    title: "Métricas Reais de Throughput e Dimensionamento",
    keyDefinitions: [
      {
        term: "Throughput de Threat Prevention",
        definition: "A métrica mais honesta do datasheet. Representa o firewall operando com Firewall L7, IPS, Antivírus e Controle de Aplicação ativos."
      },
      {
        term: "CPS (Conexões Por Segundo)",
        definition: "Capacidade do appliance de abrir novas sessões por segundo. Crucial para ambientes com muitos usuários e consultas DNS frequentes."
      },
      {
        term: "Headroom de Crescimento",
        definition: "Margem de segurança de 30% a 50% adicionada sobre o tráfego de pico para assegurar vida útil de 3 anos ao hardware."
      }
    ],
    checklistItems: [
      { category: "Medição de Tráfego", item: "Coletar o volume de tráfego de pico real da rede utilizando ferramentas de monitoramento SNMP/NetFlow." },
      { category: "Cálculo de Sizing", item: "Aplicar a fórmula: Throughput Necessário = Tráfego de Pico × (1 + Crescimento%) ÷ Fator de Redução." },
      { category: "CPS & Sessões", item: "Cruzar o pico de novas conexões por segundo com a capacidade nominal de CPS de Threat Prevention." },
      { category: "Análise de Fila", item: "Verificar se não ocorrem descartes de pacotes nas filas de entrada das interfaces (interface drops/overruns)." }
    ]
  },
  "cap-10": {
    chapterId: "cap-10",
    chapterNumber: 10,
    title: "Roteamento Avançado e Armadilhas de Rede",
    keyDefinitions: [
      {
        term: "Roteamento Assimétrico",
        definition: "Quando o pacote de ida passa por um caminho e o pacote de volta retorna por outro. Causa descarte em firewalls stateful."
      },
      {
        term: "BGP / OSPF em NGFW",
        definition: "Protocolos de roteamento dinâmico executados no Control Plane para redistribuição de rotas e convergência de links redundantes."
      },
      {
        term: "TCP RST em Assimetria",
        definition: "Pacote de reset gerado pelo firewall quando recebe um pacote TCP sem ter registrado o handshake de três vias (SYN/ACK)."
      }
    ],
    checklistItems: [
      { category: "Simetria de Fluxo", item: "Mapear a topologia para assegurar que ida e volta de pacotes trafeguem pelo mesmo appliance ou cluster sincronizado." },
      { category: "Roteamento Dinâmico", item: "Ajustar timers de OSPF/BGP para garantir convergência de rotas antes do esgotamento de sessões TCP." },
      { category: "Anti-Spoofing (uRPF)", item: "Habilitar Unicast Reverse Path Forwarding (uRPF) nas interfaces de entrada para descartar IPs forjados." },
      { category: "Rotas Estáticas", item: "Auditar rotas estáticas para evitar loops de roteamento entre o firewall e roteadores internos de core." }
    ]
  },
  "cap-11": {
    chapterId: "cap-11",
    chapterNumber: 11,
    title: "Alta Disponibilidade (HA) e Resiliência",
    keyDefinitions: [
      {
        term: "HA Ativo/Passivo",
        definition: "Um nó processa 100% do tráfego enquanto o nó secundário mantém as sessões sincronizadas aguardando falha do primário."
      },
      {
        term: "HA Ativo/Ativo",
        definition: "Ambos os nós processam tráfego simultaneamente. Requer cuidados extremos com roteamento para evitar assimetria entre os nós."
      },
      {
        term: "Heartbeat & State Sync Link",
        definition: "Conexão física direta e dedicada entre os firewalls para verificar a vivacidade e replicar a tabela de conexões em tempo real."
      },
      {
        term: "Split-Brain",
        definition: "Cenário catastrófico em que o link de sincronização falha e ambos os nós assumem o papel de Ativo com os mesmos IPs."
      }
    ],
    checklistItems: [
      { category: "Links de HA", item: "Configurar links físicos diretos e redundantes para o Heartbeat (Controle) e Sincronização de Estados." },
      { category: "Prevenção Split-Brain", item: "Habilitar monitoramento de gateway externo (link monitor) para arbitrar a posse do cluster em caso de perda de heartbeat." },
      { category: "Teste de Failover", item: "Executar teste prático de failover em janela agendada com tráfego real e medir tempo de transição (< 1 segundo)." },
      { category: "Versão de Firmware", item: "Assegurar rigorosamente que ambos os appliances possuem exatamente a mesma versão de sistema e licenças ativas." }
    ]
  },
  "cap-12": {
    chapterId: "cap-12",
    chapterNumber: 12,
    title: "NGFW em Nuvem (AWS, Azure, GCP)",
    keyDefinitions: [
      {
        term: "Virtual Appliance (vFW)",
        definition: "Imagem virtualizada do NGFW rodando em instâncias de nuvem para inspecionar tráfego entre VPCs/VNETs e tráfego norte-sul."
      },
      {
        term: "Gateway Load Balancer (GWLB)",
        definition: "Serviço gerenciado de nuvem que distribui tráfego através de túneis GENEVE para um pool de appliances virtuais com alta resiliência."
      },
      {
        term: "Transit Gateway / Hub-and-Spoke",
        definition: "Topologia centralizada onde todas as VPCs de aplicação conectam-se a uma VPC de inspeção para controle centralizado."
      }
    ],
    checklistItems: [
      { category: "Arquitetura Nuvem", item: "Implementar topologia Hub-and-Spoke centralizando a inspeção através de GWLB ou Transit Gateway." },
      { category: "Autoscaling", item: "Configurar gatilhos de escalabilidade automática de appliances virtuais baseados no consumo de CPU e tráfego de rede." },
      { category: "Tabelas de Rotas", item: "Configurar rotas 0.0.0.0/0 nas subnets de aplicação apontando para as interfaces de inspeção do firewall." },
      { category: "Custos de Transferência", item: "Monitorar o custo de egress e tráfego inter-VPC gerado pelo redirecionamento para o cluster de firewalls." }
    ]
  },
  "cap-13": {
    chapterId: "cap-13",
    chapterNumber: 13,
    title: "Hardening e Gestão Operacional",
    keyDefinitions: [
      {
        term: "Hardening de Firewall",
        definition: "Processo de fechar serviços desnecessários, desativar protocolos legados (HTTP, Telnet) e reforçar o controle de acesso do appliance."
      },
      {
        term: "NTP Sincronizado",
        definition: "Protocolo de hora de rede com servidores atômicos confiáveis. Imprescindível para ordenação forense e correlação no SIEM."
      },
      {
        term: "RBAC (Role-Based Access Control)",
        definition: "Controle de privilégios onde operadores possuem permissão apenas para as ações específicas de sua função na equipe."
      }
    ],
    checklistItems: [
      { category: "Acesso Administrativo", item: "Exigir autenticação multifator (MFA) obrigatória para todos os administradores do firewall." },
      { category: "Protocolos Inseguros", item: "Desabilitar imediatamente acessos via Telnet, HTTP desprovido de SSL e versões obsoletas de SNMP (v1/v2)." },
      { category: "Sincronização de Hora", item: "Configurar pelo menos 3 servidores NTP de estrato confiável (ex: ntp.br) e validar sincronia de relógio." },
      { category: "Envio de Logs", item: "Garantir exportação em tempo real via Syslog/TLS para o SIEM corporativo com retenção conforme normas (LGPD/PCI)." },
      { category: "Gestão de Senhas", item: "Alterar a senha padrão de fábrica de admin imediatamente e aplicar política de complexidade de 16+ caracteres." }
    ]
  },
  "cap-14": {
    chapterId: "cap-14",
    chapterNumber: 14,
    title: "Troubleshooting e Resposta a Incidentes",
    keyDefinitions: [
      {
        term: "Packet Capture (PCAP)",
        definition: "Captura de pacotes nos estágios de ingresso, inspeção e egresso do firewall para confirmar se o pacote entrou ou foi descartado."
      },
      {
        term: "Log de Descarte (Drop Log)",
        definition: "Registro detalhado com timestamp, IP de origem, destino, porta e o motivo exato do descarte (regra de política, IPS, spoofing)."
      },
      {
        term: "Session Diagnostic",
        definition: "Comando CLI para inspecionar flags da sessão em memória, tradução NAT aplicada e timers de expiração."
      }
    ],
    checklistItems: [
      { category: "Diagnóstico Rápido", item: "Validar se o pacote está chegando na interface física através de contador de pacotes (RX counters)." },
      { category: "Verificação de Sessão", item: "Consultar a tabela de conexões ativas para verificar se a sessão foi criada e qual regra autorizou o fluxo." },
      { category: "Captura de Pacotes", item: "Executar packet capture com filtros restritos de IP/porta para isolar o problema sem sobrecarregar a CPU." },
      { category: "Backup e Rollback", item: "Gerar backup automatizado da configuração antes de qualquer alteração de regras ou atualização de firmware." },
      { category: "Teste de Restauração", item: "Executar teste semestral de restauração de backup em equipamento de laboratório para validar integridade dos arquivos." }
    ]
  },
  "cap-15": {
    chapterId: "cap-15",
    chapterNumber: 15,
    title: "Carreira em Firewall: Perfis e Governança",
    keyDefinitions: [
      {
        term: "Níveis de Senioridade",
        definition: "Júnior (operação/tickets), Pleno (implementação/troubleshooting), Sênior (arquitetura/resiliência) e Especialista (estratégia/GRC)."
      },
      {
        term: "Certificações Técnicas",
        definition: "Credenciais de mercado (PCNSE, CCNP Security, NSE, CISSP) que validam competências teóricas e práticas de engenharia."
      },
      {
        term: "Governança de Firewall",
        definition: "Processo de gestão de mudanças, revisão periódica de regras e conformidade regulatória (LGPD, PCI-DSS, ISO 27001)."
      }
    ],
    checklistItems: [
      { category: "Governança", item: "Instituir comitê de aprovação de mudanças (CAB) para qualquer alteração na matriz de regras do firewall." },
      { category: "Auditoria Contínua", item: "Agendar ciclo semestral de auditoria para remoção de regras legadas e acessos temporários expirados." },
      { category: "Capacitação Contínua", item: "Manter matriz de habilidades da equipe técnica atualizada com certificações vigentes dos fabricantes em uso." },
      { category: "Runbooks Atualizados", item: "Documentar procedimentos operacionais padrão (SOP) para atendimento a incidentes críticos e failovers." }
    ]
  }
};
