import { Chapter } from '../data/bookData';
import { CHAPTER_SPECIFIC_CHECKLISTS } from '../data/chapterChecklistsData';

export function openChapterPdfPrint(chapter: Chapter) {
  const chapterData = CHAPTER_SPECIFIC_CHECKLISTS[chapter.id] || {
    chapterId: chapter.id,
    chapterNumber: chapter.number,
    title: chapter.title,
    keyDefinitions: chapter.sections.map(s => ({
      term: s.title,
      definition: s.content[0] || 'Conceito abordado no capítulo.'
    })),
    checklistItems: [
      { category: "Verificação Técnica", item: "Validar aderência às recomendações descritas no capítulo." },
      { category: "Auditoria", item: "Conferir parametrização e documentação de suporte." }
    ]
  };

  // Collect all callouts from chapter
  const allCallouts: { type: string; title: string; text: string }[] = [];
  if (chapter.generalCallouts) {
    allCallouts.push(...chapter.generalCallouts);
  }
  chapter.sections.forEach(s => {
    if (s.callouts) {
      allCallouts.push(...s.callouts);
    }
  });

  // Collect tables if present
  const allTables = chapter.sections.filter(s => s.table && s.table.headers.length > 0);

  const printWindow = window.open('', '_blank', 'width=900,height=1000');
  if (!printWindow) {
    alert("Por favor, permita pop-ups no navegador para gerar o PDF do capítulo.");
    return;
  }

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Resumo Técnico & Checklist - Cap. ${chapter.number}: ${chapter.title}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 16mm;
    }
    *, *:before, *:after {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #111827;
      background: #ffffff;
      line-height: 1.45;
      font-size: 11pt;
      margin: 0;
      padding: 0;
    }
    .header-bar {
      border-bottom: 2px solid #b91c1c;
      padding-bottom: 12px;
      margin-bottom: 18px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .brand-title {
      font-size: 8.5pt;
      font-weight: 800;
      color: #b91c1c;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 4px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    h1 {
      font-size: 16pt;
      font-weight: 900;
      color: #0f172a;
      margin: 0 0 4px 0;
      line-height: 1.2;
    }
    .subtitle {
      font-size: 10pt;
      color: #475569;
      margin: 0;
    }
    .meta-box {
      text-align: right;
      font-size: 8pt;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      line-height: 1.35;
    }
    .punchline-box {
      background-color: #fef2f2;
      border-left: 4px solid #dc2626;
      padding: 10px 14px;
      margin-bottom: 18px;
      font-size: 10pt;
      font-style: italic;
      color: #991b1b;
      border-radius: 0 6px 6px 0;
      page-break-inside: avoid;
    }
    .section-title {
      font-size: 11pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #0f172a;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 4px;
      margin-top: 18px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .section-title span.badge {
      background: #b91c1c;
      color: white;
      font-size: 8pt;
      padding: 1px 6px;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    /* Grid de Definições Chave */
    .defs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 16px;
    }
    .def-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 10px 12px;
      page-break-inside: avoid;
    }
    .def-term {
      font-size: 9.5pt;
      font-weight: 800;
      color: #b91c1c;
      margin-bottom: 4px;
      text-transform: uppercase;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .def-text {
      font-size: 9pt;
      color: #334155;
      margin: 0;
      line-height: 1.35;
    }
    /* Checklist Box */
    .checklist-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      font-size: 9pt;
      page-break-inside: avoid;
    }
    .checklist-table th {
      background: #0f172a;
      color: #ffffff;
      text-align: left;
      padding: 6px 10px;
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .checklist-table td {
      border-bottom: 1px solid #e2e8f0;
      padding: 7px 10px;
      vertical-align: middle;
    }
    .checklist-table tr:nth-child(even) td {
      background: #f8fafc;
    }
    .check-box {
      width: 14px;
      height: 14px;
      border: 1.5px solid #64748b;
      border-radius: 3px;
      display: inline-block;
      margin-right: 6px;
      vertical-align: middle;
    }
    .category-tag {
      font-size: 7.5pt;
      font-weight: bold;
      background: #e2e8f0;
      color: #334155;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    /* Callouts */
    .callouts-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 16px;
    }
    .callout {
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 8.5pt;
      page-break-inside: avoid;
    }
    .callout.ATENCAO {
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-left: 3px solid #dc2626;
      color: #991b1b;
    }
    .callout.BOAS_PRATICAS {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-left: 3px solid #16a34a;
      color: #166534;
    }
    .callout-title {
      font-weight: 800;
      text-transform: uppercase;
      font-size: 8pt;
      margin-bottom: 2px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    /* Tables */
    .custom-table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0 16px 0;
      font-size: 8.5pt;
      page-break-inside: avoid;
    }
    .custom-table th {
      background: #1e293b;
      color: #ffffff;
      padding: 5px 8px;
      text-align: left;
      font-size: 7.5pt;
      text-transform: uppercase;
    }
    .custom-table td {
      border: 1px solid #e2e8f0;
      padding: 5px 8px;
    }
    .custom-table tr:nth-child(even) td {
      background: #f8fafc;
    }
    /* Footer */
    .doc-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 10px;
      margin-top: 24px;
      font-size: 7.5pt;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      page-break-inside: avoid;
    }
    .btn-print-bar {
      position: sticky;
      top: 0;
      background: #0f172a;
      color: white;
      padding: 10px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 10pt;
    }
    .btn-print {
      background: #dc2626;
      color: white;
      border: none;
      padding: 6px 16px;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      font-size: 9.5pt;
    }
    .btn-print:hover {
      background: #b91c1c;
    }
    @media print {
      .btn-print-bar {
        display: none !important;
      }
    }
  </style>
</head>
<body>

  <!-- Floating Print Prompt Bar (Hidden in Print) -->
  <div class="btn-print-bar">
    <div>
      <strong>📄 Resumo de Engenharia Gerado:</strong> Cap. ${chapter.number} — ${chapter.title}
    </div>
    <div style="display: flex; gap: 8px; align-items: center;">
      <span style="font-size: 8.5pt; color: #94a3b8;">Dica: Selecione "Salvar como PDF" na tela de impressão</span>
      <button class="btn-print" onclick="window.print()">🖨️ Imprimir / Salvar em PDF</button>
    </div>
  </div>

  <!-- Header -->
  <header class="header-bar">
    <div>
      <div class="brand-title">Firewall Sem Ilusão · Guia Técnico Oficial NGFW</div>
      <h1>Capítulo ${chapter.number}: ${chapter.title}</h1>
      <p class="subtitle">${chapter.subtitle}</p>
    </div>
    <div class="meta-box">
      <div><strong>Edição:</strong> 2026</div>
      <div><strong>Páginas:</strong> ${chapter.pages}</div>
      <div><strong>Emissão:</strong> ${currentDate}</div>
    </div>
  </header>

  <!-- Punchline -->
  ${chapter.punchline ? `
  <div class="punchline-box">
    "${chapter.punchline}"
  </div>
  ` : ''}

  <!-- Definições Chave -->
  <div class="section-title">
    <span class="badge">01</span>
    <span>Definições-Chave & Conceitos Críticos</span>
  </div>

  <div class="defs-grid">
    ${chapterData.keyDefinitions.map(def => `
      <div class="def-card">
        <div class="def-term">${def.term}</div>
        <p class="def-text">${def.definition}</p>
      </div>
    `).join('')}
  </div>

  <!-- Checklist Técnico de Implementação e Auditoria -->
  <div class="section-title">
    <span class="badge">02</span>
    <span>Checklist Técnico de Implementação & Auditoria</span>
  </div>

  <table class="checklist-table">
    <thead>
      <tr>
        <th style="width: 25px;">Status</th>
        <th style="width: 140px;">Categoria</th>
        <th>Item de Verificação Técnica / Auditoria</th>
      </tr>
    </thead>
    <tbody>
      ${chapterData.checklistItems.map(item => `
        <tr>
          <td style="text-align: center;"><span class="check-box"></span></td>
          <td><span class="category-tag">${item.category}</span></td>
          <td>${item.item}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <!-- Avisos e Boas Práticas (Callouts) -->
  ${allCallouts.length > 0 ? `
  <div class="section-title">
    <span class="badge">03</span>
    <span>Avisos de Segurança & Boas Práticas</span>
  </div>

  <div class="callouts-container">
    ${allCallouts.map(callout => `
      <div class="callout ${callout.type}">
        <div class="callout-title">${callout.type === 'ATENCAO' ? '⚠️ ATENÇÃO' : '✅ BOAS PRÁTICAS'}: ${callout.title}</div>
        <div>${callout.text}</div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  <!-- Tabelas Técnicas se houver -->
  ${allTables.length > 0 ? `
  <div class="section-title">
    <span class="badge">04</span>
    <span>Tabela de Parâmetros Técnicos</span>
  </div>

  ${allTables.map(t => `
    <table class="custom-table">
      <thead>
        <tr>
          ${t.table!.headers.map(h => `<th>${h}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${t.table!.rows.map(row => `
          <tr>
            ${row.map(cell => `<td>${cell}</td>`).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `).join('')}
  ` : ''}

  <!-- Footer -->
  <footer class="doc-footer">
    <div>
      <strong>Conteúdo Teórico:</strong> Mariana BS (Cybersecurity Engineer) · 
      <strong>Desenvolvimento:</strong> Francisco Hamilton (Analista de TI · IFSertãoPE)
    </div>
    <div>
      Documento Técnico · Plataforma Firewall Sem Ilusão (2026)
    </div>
  </footer>

  <script>
    // Auto trigger print dialogue after rendering
    window.addEventListener('load', () => {
      setTimeout(() => {
        window.print();
      }, 350);
    });
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
