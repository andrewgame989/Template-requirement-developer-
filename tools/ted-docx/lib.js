const D = require('docx');
const {Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType,
       AlignmentType, BorderStyle, VerticalAlign, HeadingLevel, PageBreak} = D;

const W = 9900;                 // lebar konten (A4, margin 1000 dxa kiri-kanan)
const NAVY = "1F3864", GUIDE_BG = "DEEAF6", WARN_BG = "FFF2CC",
      DANGER_BG = "FBE4E4", ZEBRA = "F2F5FA", GREY = "808080";

const noBorder = {style: BorderStyle.NONE, size: 0, color: "FFFFFF"};
const thin = (c) => ({style: BorderStyle.SINGLE, size: 4, color: c || "8EA9DB"});
const allThin = (c) => ({top: thin(c), bottom: thin(c), left: thin(c), right: thin(c)});
const noBorders = {top: noBorder, bottom: noBorder, left: noBorder, right: noBorder};

function runs(text, o = {}) {
  const arr = Array.isArray(text) ? text : [text];
  return arr.map(t => typeof t === "string"
    ? new TextRun({text: t, bold: o.bold, italics: o.italics, size: o.size || 18,
                   color: o.color || "000000", font: o.font})
    : new TextRun({text: t.t, bold: t.b ?? o.bold, italics: t.i ?? o.italics,
                   size: t.size || o.size || 18, color: t.c || o.color || "000000"}));
}

function P(text, o = {}) {
  return new Paragraph({
    children: runs(text, o),
    alignment: o.align,
    spacing: {before: o.before ?? 40, after: o.after ?? 60, line: o.line},
    indent: o.indent,
    bullet: o.bullet !== undefined ? {level: o.bullet} : undefined,
    border: o.border,
  });
}

const H1 = (t) => new Paragraph({
  children: runs(t, {bold: true, size: 26, color: "FFFFFF"}),
  heading: HeadingLevel.HEADING_1,
  shading: {type: ShadingType.CLEAR, fill: NAVY, color: "auto"},
  spacing: {before: 320, after: 160}, indent: {left: 80, right: 80},
});
const H2 = (t) => new Paragraph({
  children: runs(t, {bold: true, size: 22, color: NAVY}),
  heading: HeadingLevel.HEADING_2,
  spacing: {before: 260, after: 100},
  border: {bottom: {style: BorderStyle.SINGLE, size: 6, color: "8EA9DB"}},
});
const H3 = (t) => new Paragraph({
  children: runs(t, {bold: true, size: 19, color: "2E5496"}),
  heading: HeadingLevel.HEADING_3, spacing: {before: 200, after: 80},
});

// kotak instruksi pengisian
function box(title, lines, kind) {
  const bg = kind === "warn" ? WARN_BG : kind === "danger" ? DANGER_BG : GUIDE_BG;
  const bar = kind === "warn" ? "BF8F00" : kind === "danger" ? "C00000" : "2E5496";
  const kids = [P(title, {bold: true, size: 17, color: bar, after: 60})];
  lines.forEach(l => {
    if (typeof l === "string") kids.push(P(l, {size: 17, after: 40}));
    else kids.push(P(l.t, {size: 17, after: 40, bullet: 0, bold: l.b, italics: l.i}));
  });
  return new Table({
    columnWidths: [W], width: {size: W, type: WidthType.DXA},
    borders: {top: noBorder, bottom: noBorder, right: noBorder,
              left: {style: BorderStyle.SINGLE, size: 18, color: bar},
              insideHorizontal: noBorder, insideVertical: noBorder},
    rows: [new TableRow({children: [new TableCell({
      width: {size: W, type: WidthType.DXA},
      shading: {type: ShadingType.CLEAR, fill: bg, color: "auto"},
      margins: {top: 100, bottom: 100, left: 160, right: 120},
      children: kids,
    })]})],
  });
}
const guide = (lines) => box("CARA MENGISI", lines, "guide");
const warn  = (lines) => box("PERHATIAN", lines, "warn");
const danger= (lines) => box("WAJIB — TIDAK BOLEH DILEWATI", lines, "danger");

// area isian bebas
function fill(placeholder, height) {
  const kids = [P(placeholder, {italics: true, color: GREY, size: 17})];
  for (let i = 1; i < (height || 1); i++) kids.push(P("", {size: 17}));
  return new Table({
    columnWidths: [W], width: {size: W, type: WidthType.DXA},
    borders: allThin("BFBFBF"),
    rows: [new TableRow({children: [new TableCell({
      width: {size: W, type: WidthType.DXA},
      margins: {top: 100, bottom: 100, left: 120, right: 120},
      children: kids,
    })]})],
  });
}

function widths(ratios) {
  const sum = ratios.reduce((a, b) => a + b, 0);
  const w = ratios.map(r => Math.floor(W * r / sum));
  w[w.length - 1] += W - w.reduce((a, b) => a + b, 0);
  return w;
}

// tabel utama
function T(headers, rows, ratios, o = {}) {
  const cw = widths(ratios || headers.map(() => 1));
  const fs = o.size || 16;
  const mkCell = (txt, i, opt = {}) => new TableCell({
    width: {size: opt.span ? W : cw[i], type: WidthType.DXA},
    shading: opt.fill ? {type: ShadingType.CLEAR, fill: opt.fill, color: "auto"} : undefined,
    columnSpan: opt.span,
    verticalAlign: VerticalAlign.CENTER,
    margins: {top: 60, bottom: 60, left: 80, right: 80},
    children: String(txt).split("\n").map(line =>
      P(line, {size: fs, bold: opt.bold, color: opt.color, italics: opt.italics,
               after: 20, before: 20, align: opt.align})),
  });
  const trs = [];
  if (headers && headers.length) {
    trs.push(new TableRow({
      tableHeader: true,
      children: headers.map((h, i) => mkCell(h, i,
        {fill: NAVY, bold: true, color: "FFFFFF"})),
    }));
  }
  rows.forEach((r, ri) => {
    if (r && r.__section) {                       // baris pemisah / sub-judul
      trs.push(new TableRow({children: [mkCell(r.__section, 0,
        {fill: "D6DCE5", bold: true, span: cw.length})]}));
      return;
    }
    const opt = {fill: (ri % 2 === 1 && o.zebra !== false) ? ZEBRA : undefined};
    trs.push(new TableRow({children: r.map((c, i) => mkCell(c, i, opt))}));
  });
  return new Table({
    columnWidths: cw, width: {size: W, type: WidthType.DXA},
    borders: allThin(), rows: trs,
  });
}

const SP = (n) => new Paragraph({children: [], spacing: {after: n || 120}});
const BREAK = () => new Paragraph({children: [new PageBreak()]});

module.exports = {D, W, NAVY, P, H1, H2, H3, guide, warn, danger, fill, T, SP,
                  BREAK, box, noBorders, allThin, GREY};
