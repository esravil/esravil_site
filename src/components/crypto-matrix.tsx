'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useInterval } from '@/hooks/useInterval';
import { debounce } from '@/utils/debounce';

// Same background character set (with NBSPs preserved)
const BACKGROUND_CHARACTERS = ' *,      ./0!8#X~;$\\}%'.replaceAll(' ', '\u00A0');

/** ------- deterministic plaque content (edit to taste) ------- */
const PLAQUE = {
  date: '2020-03-16',
  hash: '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d',
  line: '“A clock before consensus.” — esravil',
};

const PLAQUE_PAYLOAD =
  `SOL1|v1|mainnet-beta|genesis=${PLAQUE.date}|hash=${PLAQUE.hash}|msg=${PLAQUE.line}`;

type Cell = { ch: string };

function randChar() {
  return BACKGROUND_CHARACTERS[
    Math.floor(Math.random() * BACKGROUND_CHARACTERS.length)
  ];
}

// Hex + ASCII rows (bytesPerLine = 16/12/8)
function toHexRows(input: string, bytesPerLine: number) {
  const bytes = new TextEncoder().encode(input);
  const lines: Array<{ offset: string; hex: string; ascii: string }> = [];
  for (let i = 0; i < bytes.length; i += bytesPerLine) {
    const slice = bytes.slice(i, i + bytesPerLine);
    const hex = Array.from(slice).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
    const ascii = Array.from(slice)
      .map(b => (b >= 32 && b <= 126 ? String.fromCharCode(b) : '.'))
      .join('');
    const offset = i.toString(16).padStart(4, '0');
    lines.push({ offset, hex, ascii });
  }
  return lines;
}

// Choose bytes/line so the plaque fits within the grid columns
function chooseBytesPerLine(availableCols: number) {
  // total line width = offset(4) + 2 spaces + hexColumn + 2 spaces + ascii(bytesPerLine)
  // hexColumn width = 3*B - 1  (two hex chars + one space per byte, minus last space)
  const options = [16, 12, 8];
  for (const B of options) {
    const hexCol = 3 * B - 1;
    const lineWidth = 4 + 2 + hexCol + 2 + B; // offset + gap + hex + gap + ascii
    if (lineWidth <= availableCols - 2) return B; // leave a tiny margin
  }
  return 8; // fallback
}

// Build lines that look like: "0000  53 4F ...   SOL1|v1..."
function buildPlaqueLines(availableCols: number): string[] {
  const B = chooseBytesPerLine(availableCols);
  const rows = toHexRows(PLAQUE_PAYLOAD, B);
  const hexColWidth = 3 * B - 1; // for padding hex column consistently
  return rows.map(({ offset, hex, ascii }) => {
    const hexPadded = hex.padEnd(hexColWidth, ' ');
    return `${offset}  ${hexPadded}  ${ascii}`;
  });
}

// Writes a line of text into the grid buffer at (col,row)
function writeLine(cells: Cell[], cols: number, col: number, row: number, text: string) {
  const totalRows = Math.floor(cells.length / cols);
  if (row < 0 || row >= totalRows) return;
  for (let i = 0; i < text.length; i++) {
    const x = col + i;
    if (x < 0 || x >= cols) break;
    cells[row * cols + x] = { ch: text[i] };
  }
}

export function Background() {
  const [render, setRender] = useState(false);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const [cells, setCells] = useState<Cell[]>([]);

  const calculateBackground = useCallback(
    debounce(() => {
      const widthPx = window.innerWidth;
      const heightPx = window.innerHeight;

      // ~1ch columns and ~1.6em rows (match your spacing)
      const chWidthPx = 8;   // ~1ch at 16px font
      const emHeightPx = 26; // ~1.6em

      const newCols = Math.ceil(widthPx / chWidthPx);
      const newRows = Math.ceil(heightPx / emHeightPx);

      // 1) fill with random noise
      const base: Cell[] = Array.from({ length: newCols * newRows }, () => ({ ch: randChar() }));

      // 2) carve a centered plaque with ASCII panel
      let plaqueLines = buildPlaqueLines(newCols);
      const plaqueHeight = plaqueLines.length;
      const plaqueWidth = plaqueLines.reduce((m, s) => Math.max(m, s.length), 0);

      const startCol = Math.max(0, Math.floor((newCols - plaqueWidth) / 2));
      const startRow = Math.max(0, Math.floor((newRows - plaqueHeight) / 2));

      for (let r = 0; r < plaqueLines.length; r++) {
        writeLine(base, newCols, startCol, startRow + r, plaqueLines[r]);
      }

      setCols(newCols);
      setRows(newRows);
      setCells(base);
    }, 150),
    []
  );

  useEffect(() => {
    setRender(true);
    calculateBackground();
    const handleResize = () => calculateBackground();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateBackground]);

  if (!render) return null;

  return (
    <div
      aria-hidden
      id="background"
      className="absolute inset-0 opacity-0 crypto-background-container"
      style={{
        animationDelay: '1s',
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1ch)`,
        gridAutoRows: '1.6em',
        fontFamily: 'monospace',
        fontSize: '16px',
        lineHeight: '1em',
        color: '#F2F2F2',
        justifyItems: 'center',
        alignItems: 'center',
      }}
    >
      {cells.map((cell, i) => (
        <Character key={i} value={cell.ch} />
      ))}
    </div>
  );
}

function Character({ value }: { value: string }) {
  const noise = useRef(Math.floor(Math.random() * 1500) + 500);
  const ref = useRef<HTMLSpanElement>(null);

  // Same subtle shimmer + hover for ALL cells (including plaque)
  useInterval(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (Math.random() < 0.01 && ref.current) {
      ref.current.animate(
        [{ color: '#F2F2F2' }, { color: '#C9C9C9' }, { color: '#F2F2F2' }],
        { duration: 1000, easing: 'linear' }
      );
    }
  }, noise.current);

  return (
    <span
      ref={ref}
      className="crypto-bg-char hover:text-black/50 hover:duration-0 duration-[0.8s] transition-[color,background-color]"
    >
      {value}
    </span>
  );
}
