import React from 'react';
import { TechTooltip } from './TechTooltip';
import { GLOSSARY_TERMS, GlossaryTerm } from '../data/glossaryData';

interface HighlightProps {
  text: string;
  onOpenGlossary?: (termId: string) => void;
  highlightedTermsSet?: Set<string>; // to limit repetitions per section if desired
}

// Build regex pattern from terms
// Sort terms by length descending so longer phrases match first (e.g. "TLS 1.3" before "TLS")
const ALL_PATTERNS: { patternStr: string; termId: string; caseSensitive: boolean }[] = [];

GLOSSARY_TERMS.forEach(term => {
  // Add shortCode
  const isShortAcronym = term.shortCode.length <= 4 && term.shortCode === term.shortCode.toUpperCase();
  ALL_PATTERNS.push({
    patternStr: term.shortCode.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    termId: term.id,
    caseSensitive: isShortAcronym
  });

  // Add aliases
  term.aliases.forEach(alias => {
    if (alias !== term.shortCode && alias.length >= 3) {
      const aliasIsShort = alias.length <= 4 && alias === alias.toUpperCase();
      ALL_PATTERNS.push({
        patternStr: alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        termId: term.id,
        caseSensitive: aliasIsShort
      });
    }
  });
});

// Sort by length descending
ALL_PATTERNS.sort((a, b) => b.patternStr.length - a.patternStr.length);

// Build master regex with word boundaries
// For short acronyms, we ensure exact word boundary \b
const MASTER_REGEX_PARTS = ALL_PATTERNS.map(p => `(\\b${p.patternStr}\\b)`);
const MASTER_REGEX = new RegExp(MASTER_REGEX_PARTS.join('|'), 'g');

// Lookup map from matched text to termId
const MATCH_LOOKUP = new Map<string, { termId: string; caseSensitive: boolean }>();
ALL_PATTERNS.forEach(p => {
  const clean = p.patternStr.replace(/\\/g, '');
  MATCH_LOOKUP.set(clean.toLowerCase(), { termId: p.termId, caseSensitive: p.caseSensitive });
  MATCH_LOOKUP.set(clean, { termId: p.termId, caseSensitive: p.caseSensitive });
});

export const highlightTextWithGlossary = (
  text: string, 
  onOpenGlossary?: (termId: string) => void,
  keyPrefix = 'hl'
): React.ReactNode[] => {
  if (!text) return [text];

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  
  // Use regex exec to find occurrences
  const regex = new RegExp(MASTER_REGEX);
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const matchedText = match[0];
    const matchIndex = match.index;

    // Append preceding plain text
    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }

    // Check validity and case sensitivity
    const lookup = MATCH_LOOKUP.get(matchedText) || MATCH_LOOKUP.get(matchedText.toLowerCase());

    if (lookup) {
      // If case-sensitive (e.g. "HA", "NAT"), verify match
      const isValid = !lookup.caseSensitive || matchedText === matchedText.toUpperCase();

      if (isValid) {
        nodes.push(
          <TechTooltip
            key={`${keyPrefix}-${matchIndex}-${matchedText}`}
            termKey={lookup.termId}
            onOpenGlossary={onOpenGlossary}
          >
            {matchedText}
          </TechTooltip>
        );
      } else {
        nodes.push(matchedText);
      }
    } else {
      nodes.push(matchedText);
    }

    lastIndex = matchIndex + matchedText.length;
  }

  // Append remaining text
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
};
