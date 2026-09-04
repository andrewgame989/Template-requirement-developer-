const fs = require('fs');
const D = require('docx');
const {Document, Packer, Paragraph, TextRun, HeaderFooter, Header, Footer,
       AlignmentType, PageNumber, BorderStyle, TableOfContents, PageBreak,
       LevelFormat, convertInchesToTwip} = D;
const {P, NAVY} = require('./lib.js');

const body = [].concat(
  require('./part1.js'),
  require('./part2.js'),
  require('./part3.js'),
);

// sisipkan daftar isi setelah cover (blok cover berakhir pada PageBreak pertama)
const brk = body.findIndex(x => x instanceof Paragraph &&
  JSON.stringify(x).includes('PageBreak'));

const toc = [
  new Paragraph({
    children: [new TextRun({text: "DAFTAR ISI", bold: true, size: 26, color: "FFFFFF"})],
    shading: {type: D.ShadingType.CLEAR, fill: NAVY, color: "auto"},
    spacing: {before: 200, after: 200}, indent: {left: 80, right: 80},
  }),
  new Paragraph({
    children: [new TextRun({
      text: "Klik kanan pada daftar isi di bawah lalu pilih \"Update Field\" untuk memperbarui nomor halaman.",
      italics: true, size: 16, color: "808080"})],
    spacing: {after: 160},
  }),
  new TableOfContents("Daftar Isi", {hyperlink: true, headingStyleRange: "1-3"}),
  new Paragraph({children: [new PageBreak()]}),
];
body.splice(brk + 1, 0, ...toc);

const doc = new Document({
  creator: "PT. Mitra Transaksi Indonesia",
  title: "Template Technical Engineering Document (TED)",
  description: "Template TED — dokumen serah terima teknis ke Internal Developer & Application Support",
  styles: {
    default: {
      document: {run: {font: "Calibri", size: 20, color: "000000"}},
      heading1: {run: {font: "Calibri", size: 26, bold: true}},
      heading2: {run: {font: "Calibri", size: 22, bold: true, color: NAVY}},
      heading3: {run: {font: "Calibri", size: 19, bold: true, color: "2E5496"}},
    },
  },
  numbering: {
    config: [{
      reference: "bul",
      levels: [{level: 0, format: LevelFormat.BULLET, text: "•",
                alignment: AlignmentType.LEFT,
                style: {paragraph: {indent: {left: 340, hanging: 200}}}}],
    }],
  },
  sections: [{
    properties: {
      page: {
        margin: {top: 1134, bottom: 1134, left: 1000, right: 1000,
                 header: 567, footer: 567},
      },
    },
    headers: {
      default: new Header({children: [
        new Paragraph({
          children: [
            new TextRun({text: "Technical Engineering Document (TED)", size: 15, color: "7F7F7F"}),
            new TextRun({text: "\t", size: 15}),
            new TextRun({text: "PT. Mitra Transaksi Indonesia", size: 15, color: "7F7F7F"}),
          ],
          tabStops: [{type: D.TabStopType.RIGHT, position: 9900}],
          border: {bottom: {style: BorderStyle.SINGLE, size: 4, color: "BFBFBF"}},
          spacing: {after: 120},
        }),
      ]}),
    },
    footers: {
      default: new Footer({children: [
        new Paragraph({
          children: [
            new TextRun({text: "Document Classification: Internal / Confidential — sesuaikan dengan isi dokumen",
                         size: 14, color: "A6A6A6"}),
            new TextRun({text: "\t", size: 14}),
            new TextRun({children: ["Hal. ", PageNumber.CURRENT, " dari ", PageNumber.TOTAL_PAGES],
                         size: 14, color: "7F7F7F"}),
          ],
          tabStops: [{type: D.TabStopType.RIGHT, position: 9900}],
          border: {top: {style: BorderStyle.SINGLE, size: 4, color: "BFBFBF"}},
          spacing: {before: 120},
        }),
      ]}),
    },
    children: body,
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("Template-TED-v2.docx", buf);
  console.log("OK -", (buf.length / 1024).toFixed(0), "KB,", body.length, "blocks");
});
