// ---------- Modelo de planejamento do preparo por zonas ----------
var ZONES = [{ k: 'C', n: 'Cervical' }, { k: 'M', n: 'Médio' }, { k: 'I', n: 'Incisal' }];
function round2(x) { return Math.round(x * 100) / 100; }
// p: { en:{C,M,I}, ad:{C,M,I}, ce:{VC,VM,VI,LM,LI}, mode:'dif'|'uni', minCer }
function planRows(p) {
  var rows = [];
  ZONES.forEach(function (z) {
    ['L', 'V'].forEach(function (s) {
      var key = (z.k === 'C' ? 'V' : s) + z.k;
      var cer = p.ce[key];
      if (p.mode === 'uni' || z.k === 'C') cer = p.ce['V' + z.k];
      var en = p.en[z.k], ad = p.ad[z.k];
      var red = Math.max(0, cer - ad);
      var cerReal = red + ad;
      var rem = en - red;
      rows.push({
        zone: z.k, zoneName: z.n, site: s, siteName: s === 'L' ? 'Lobo' : 'Vale', single: (z.k === 'C' || p.mode === 'uni'),
        enamel: en, add: ad, cerWanted: cer, red: red, cer: cerReal, rem: rem,
        dentin: Math.max(0, red - en), pctLeft: en > 0 ? Math.max(0, rem) / en * 100 : 0,
        flags: {
          dentin: red > en + 1e-9,
          thin: cerReal < p.minCer - 1e-9,
          capped: cer < ad - 1e-9,
          low: rem >= 0 && en > 0 && rem / en < 0.3
        }
      });
    });
  });
  // no terço cervical lobo e vale coincidem: mantém só a linha do vale
  return rows.filter(function (r) { return !((r.zone === 'C' || p.mode === 'uni') && r.site === 'L'); });
}
function bestBur(red, burs) {
  if (red <= 1e-9) return { bur: 0, rest: 0, none: true };
  var b = null;
  burs.forEach(function (x) { if (x <= red + 1e-9 && (b === null || x > b)) b = x; });
  if (b === null) return { bur: null, rest: red, none: false };
  return { bur: b, rest: round2(red - b), none: false };
}
function parseBurs(s) {
  var out = String(s).split(/[;\s]+/).map(function (t) { return parseFloat(t.replace(',', '.')); }).filter(function (v) { return !isNaN(v) && v > 0 && v < 3; });
  out.sort(function (a, b) { return a - b; });
  return out.filter(function (v, i) { return i === 0 || v !== out[i - 1]; });
}
function summarize(rows) {
  var v = rows.filter(function (r) { return r.site === 'V'; }), l = rows.filter(function (r) { return r.site === 'L'; });
  var avg = function (a) { return a.length ? a.reduce(function (s, r) { return s + r.red; }, 0) / a.length : 0; };
  return { avgV: avg(v), avgL: avg(l) };
}
