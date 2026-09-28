# 🛡️ Firewall Sem Ilusão — Guia Técnico Completo de NGFW

> **Plataforma Educacional Interativa de Next-Generation Firewalls (NGFW)**  
> *Do silício ao tráfego criptografado: domine a arquitetura de hardware, inspeção profunda de pacotes (DPI), decifração TLS 1.3 e Zero Trust sem mitos de marketing.*

---

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL_3D-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Installable-5A0FC8?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com)

---

## 🎯 Sobre o Projeto e Objetivos

O **Firewall Sem Ilusão** é uma plataforma web educacional concebida para estudantes de redes de computadores, analistas de segurança da informação, administradores de sistemas e engenheiros de infraestrutura.

O objetivo central é **demistificar o funcionamento real de firewalls de próxima geração (NGFW)**, indo além das telas de configuração gráfica e dos datasheets comerciais. A plataforma aborda a física dos pacotes, a arquitetura interna de hardware dos appliances, a sobrecarga de processamento causada por decifração TLS 1.3 e as armadilhas comuns em projetos de cibersegurança corporativa.

### 📚 Autoria e Idealização

* **Obra Técnica Original:** Baseado no livro *Firewall Sem Ilusão: Guia Prático de NGFW* (2026) de autoria de **Mariana BS**, Engenheira de Cibersegurança na *Be Safe*.
* **Idealização, Engenharia e Desenvolvimento da Plataforma:** Criado e implementado por **Francisco Hamilton**, Analista de Tecnologia da Informação do **IFSertãoPE** (*Instituto Federal do Sertão Pernambucano*).

---

## 🚀 Principais Módulos da Plataforma

### 1. 📖 Trilha Técnica Estruturada (15 Capítulos)
Conteúdo integral e prático cobrindo desde fundamentos de camada 3/4 até políticas avançadas de Zero Trust:
- **Parte I — Fundamentos & Ilusões Iniciais:** Evolução do firewall de pacotes ao NGFW, inspeção de estado e falácias de marketing.
- **Parte II — O Coração do NGFW:** Arquitetura de hardware (CPUs x86, ASICs dedicados, NPUs/SPUs, FPGAs) e a física do silício.
- **Parte III — Tráfego Criptografado & TLS 1.3:** Inspeção profunda (DPI), Certificate Pinning, Perfect Forward Secrecy (PFS) e sizing real.
- **Parte IV — Operação & Resiliência:** Alta disponibilidade (Active/Passive e Active/Active), VPNs IPsec/SSL, NAT avançado e roteamento BGP/OSPF.
- **Parte V — Hardening & Defesa:** Mitigação de bypass de inspeção, segmentação Zero Trust e automação de políticas.

### 2. 🎮 Simulador 3D Isométrico de Hardware (WebGL / Three.js)
- Visualização tridimensional interativa de um appliance NGFW montado em rack.
- Inspeção anatômica dos componentes: placa-mãe, soquetes duplos de CPU, módulos RAM ECC, coolers redundantes, fontes hot-swap e portas de rede (1G, 10G SFP+, 40G QSFP+).
- Animação de tráfego em tempo real com partículas diferenciando pacotes aceitos, bloqueados e inspecionados via DPI.

### 3. 🧮 Calculadora Interativa de Throughput (Regra do Divisor)
- Simulação do impacto real de inspeção profunda vs. números de datasheet comercial.
- Cálculo da penalidade de processamento em pacotes pequenos (64 bytes) vs. jumbo frames (1500 bytes).
- Modelagem de latência e consumo de CPU sob decifração TLS 1.3 em larga escala.

### 4. 🏆 Avaliação e Gamificação
- **Quizzes por Capítulo:** 15 baterias com gabarito comentado para fixação imediata.
- **Prova Final Unificada:** Exame completo de 15 questões balanceadas com emissão de nota e diagnóstico de competências.
- **Desafio Cyber (Incident Response):** Tomada de decisão sob ataque volumétrico DDoS e vazamento de chaves privadas.

### 5. 🏢 Catálogo Comparativo de Fabricantes
Análise técnica aprofundada dos 6 maiores fabricantes do mercado global:
- **Palo Alto Networks** (PAN-OS / Single-Pass Architecture)
- **Fortinet** (FortiGate / FortiOS & ASICs proprietários CP9/NP7)
- **Cisco** (Secure Firewall / Firepower Threat Defense)
- **Check Point** (Quantum Security Gateway / Gaia OS)
- **Sophos** (XGS Series / Dual-Engine Xstream Architecture)
- **Barracuda** (CloudGen Firewall)

### 6. 📱 PWA — Instalação no Celular (Mobile App)
- Suporte total a **Progressive Web App (PWA)** com manifesto web e ícones adaptativos.
- Permite que professores e alunos instalem a aplicação na tela de início do celular ou tablet (Android e iOS).
- Funcionamento otimizado com cache local via Workbox Service Worker para navegação com baixa conectividade.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
| :--- | :--- |
| **React 19** | Biblioteca de interface reativa moderna com hooks |
| **TypeScript** | Tipagem estática rigorosa para robustez e manutenção |
| **Vite 8** | Bundler e ferramenta de build ultrarrápida |
| **Tailwind CSS v4** | Framework de estilização utilitária de alta performance |
| **Three.js** | Renderização gráfica 3D acelerada por hardware via WebGL |
| **Lucide Icons** | Biblioteca de ícones vetoriais modernos |
| **Vite PWA Plugin** | Geração automática de Service Worker e manifesto para instalação |

---

## 💻 Como Rodar o Projeto Localmente

### Pré-requisitos
* Node.js versão 18 ou superior
* Gerenciador de pacotes npm (ou pnpm/yarn)

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   cd SEU-REPOSITORIO
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação no navegador em `http://localhost:3000`.

4. **Gerar a versão de produção:**
   ```bash
   npm run build
   ```
   Os arquivos finais otimizados serão gerados na pasta `dist/`.

---

## 🌐 Publicação / Deploy

O projeto é 100% estático no frontend e compatível com as principais plataformas gratuitas:
* **Vercel:** Configuração inclusa via `vercel.json` com roteamento SPA automático.
* **Netlify:** Suporte com arquivo `public/_redirects` pré-configurado.
* **Cloudflare Pages / GitHub Pages:** Compatível diretamente com a pasta de saída `dist`.

---

## 📄 Licença e Uso Acadêmico

Desenvolvido para fins **educacionais, de pesquisa e capacitação técnica**.  
Sinta-se à vontade para utilizar este material em salas de aula, laboratórios acadêmicos e treinamentos de cibersegurança.

---

<p align="center">
  <b>Instituto Federal do Sertão Pernambucano (IFSertãoPE)</b><br>
  <i>Inovação, Educação Pública e Cibersegurança Levadas a Sério.</i>
</p>
