/* Scroll elephant engine: shared by guide/index.html (?ele=c|f) and guide/elephants/ (options page).
   Geometry follows the user's reference drawing; see the anatomy rules on the options page. */
(function () {
'use strict';
var NS = 'http://www.w3.org/2000/svg';
var PAPER = '#FBFBF6', INK = '#141414';

/* ---------- geometry (units: reference drawing, 1254 px square) ---------- */
/* legs are stretched: everything below y=720 moves down, up to +110 */
function warpY(y) { if (y <= 720) return y; var t = Math.min(1, (y - 720) / 170); return y + 46 * t * t * (3 - 2 * t); }
function warp(d) { return d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, function (m, x, y) { return x + ',' + (+warpY(+y).toFixed(1)); }); }

var VB = { x: 14, y: 20, w: 1236, h: 1026 };
var ATT = [900, 690], TW = 85;   /* second trunk: groin point, tube width */

/* centre lines: [path, detail level, part] ; level 0 always, 1 >= 110 px wide, 2 >= 230 px wide */
var RAW = [
  ['M40,110 C30,82 62,70 72,108 C70,72 108,52 124,98 C120,48 182,26 196,104 C214,82 250,110 222,146', 0, 'edge'],
  ['M222,146 C210,168 180,178 150,184 C120,190 112,232 134,256 C152,276 186,282 214,276', 0, 'edge'],
  ['M150,184 C128,188 108,188 92,184', 1, 'in'],
  ['M40,110 C34,180 38,260 52,312 C70,372 132,400 240,400', 0, 'edge'],
  ['M214,276 C246,226 300,172 380,140 C440,112 520,98 590,124 C630,140 660,170 700,214', 0, 'edge'],
  ['M700,214 C820,205 960,180 1070,192 C1150,200 1205,270 1208,390 C1211,500 1196,590 1196,680 C1198,770 1212,860 1215,950', 0, 'edge'],
  ['M1215,950 C1222,972 1200,978 1170,978 C1130,980 1090,978 1062,972 C1040,966 1038,945 1045,935', 0, 'edge'],
  ['M945,685 C990,720 1030,760 1045,812 C1050,850 1044,900 1045,935', 0, 'in'],
  ['M968,548 C964,600 958,646 946,684', 0, 'in'],
  ['M936,596 C939,616 941,636 941,656', 1, 'in'],
  ['M1003,748 C1006,820 1006,880 1004,915 C1010,935 1000,950 975,952 C945,955 915,952 895,948 C884,925 886,910 890,900', 0, 'edge'],
  ['M600,630 C660,668 740,690 820,692 C870,693 910,690 945,685', 0, 'edge'],
  ['M598,545 C600,575 602,605 604,632', 0, 'in'],
  ['M604,632 C640,700 652,800 655,880 C662,905 660,935 640,942 C600,948 560,948 525,942 C505,936 506,912 515,895 C522,800 520,720 506,650', 0, 'edge'],
  ['M402,538 C388,610 372,700 360,780 C352,830 328,860 310,878 C294,896 296,926 326,934 C368,942 416,942 446,934 C460,916 458,888 450,866', 0, 'edge'],
  ['M450,866 C448,790 468,700 506,650', 0, 'in'],
  ['M432,252 C400,320 376,400 368,480 C366,512 384,534 420,530 C480,522 548,486 600,452 C640,428 668,404 676,368 C688,300 684,220 650,168', 0, 'ear'],
  ['M410,216 C436,196 470,184 510,194', 0, 'in'],
  ['M546,376 C552,400 556,424 558,446', 1, 'in'],
  ['M280,222 C296,230 306,244 310,258', 0, 'in'],
  ['M262,356 C276,372 294,376 308,362', 0, 'in'],
  ['M302,350 C308,356 312,364 314,372', 2, 'in'],
  ['M240,400 C232,424 222,448 214,470 C254,478 304,472 358,462', 0, 'edge'],
  ['M50,256 C60,260 70,262 80,262', 2, 'in'],
  ['M100,300 C110,296 120,290 130,284', 1, 'in'],
  ['M124,330 C132,320 142,310 150,300', 1, 'in'],
  ['M160,342 C166,330 172,318 176,306', 2, 'in'],
  ['M1204,430 C1186,470 1172,520 1172,580 C1172,630 1178,662 1190,688', 0, 'in'],
  ['M1190,688 C1168,698 1166,742 1186,764 C1208,758 1224,728 1212,692 C1206,686 1198,684 1190,688', 0, 'tuft'],
  ['M1188,712 C1186,730 1188,744 1194,758', 2, 'in'],
  ['M1206,708 C1212,724 1212,740 1208,754', 2, 'in'],
  /* leg wrinkles */
  ['M372,750 C386,758 400,760 414,754', 1, 'in'], ['M368,772 C382,780 400,782 416,776', 1, 'in'], ['M370,794 C382,800 394,802 406,798', 2, 'in'],
  ['M548,812 C562,820 576,822 590,816', 1, 'in'], ['M550,832 C564,840 578,842 592,836', 2, 'in'],
  ['M1072,826 C1088,834 1104,836 1118,830', 1, 'in'], ['M1074,846 C1090,854 1106,856 1120,850', 1, 'in'], ['M1078,866 C1092,872 1104,874 1116,870', 2, 'in']
];
var NAILS_RAW = [
  'M322,934 C324,914 338,908 346,932', 'M362,936 C364,915 380,909 386,935', 'M402,936 C404,916 420,910 428,934',
  'M528,942 C530,922 546,916 554,942', 'M566,944 C568,924 584,918 592,944',
  'M900,948 C902,930 916,924 924,948', 'M936,950 C938,932 952,926 960,950',
  'M1066,974 C1068,954 1084,948 1092,974', 'M1104,977 C1106,957 1122,951 1130,977', 'M1142,977 C1144,958 1158,952 1166,976'
];
var FILL_RAW = {
  main: 'M40,110 C30,82 62,70 72,108 C70,72 108,52 124,98 C120,48 182,26 196,104 C214,82 250,110 222,146 C210,168 180,178 150,184 C120,190 112,232 134,256 C152,276 186,282 214,276 C246,226 300,172 380,140 C440,112 520,98 590,124 C630,140 660,170 700,214 C820,205 960,180 1070,192 C1150,200 1205,270 1208,390 C1211,500 1196,590 1196,680 L1045,812 L945,685 C910,690 870,693 820,692 C740,690 660,668 600,630 L506,650 L402,538 L368,480 L358,462 C304,472 254,478 214,470 C222,448 232,424 240,400 C132,400 70,372 52,312 C38,260 34,180 40,110 Z',
  nearFront: 'M402,538 C388,610 372,700 360,780 C352,830 328,860 310,878 C294,896 296,926 326,934 C368,942 416,942 446,934 C460,916 458,888 450,866 C448,790 468,700 506,650 L520,560 L420,500 Z',
  farFront: 'M604,632 C640,700 652,800 655,880 C662,905 660,935 640,942 C600,948 560,948 525,942 C505,936 506,912 515,895 C522,800 520,720 506,650 L520,580 L600,580 Z',
  farHind: 'M945,685 L1003,748 C1006,820 1006,880 1004,915 C1010,935 1000,950 975,952 C945,955 915,952 895,948 C884,925 886,910 890,900 L880,690 L880,640 L960,640 Z',
  nearHind: 'M945,685 C990,720 1030,760 1045,812 C1050,850 1044,900 1045,935 C1038,945 1040,966 1062,972 C1090,978 1130,980 1170,978 C1200,978 1222,972 1215,950 C1212,860 1198,770 1196,680 L1150,600 L960,620 Z',
  ear: 'M432,252 C400,320 376,400 368,480 C366,512 384,534 420,530 C480,522 548,486 600,452 C640,428 668,404 676,368 C688,300 684,220 650,168 C600,172 550,186 510,194 C470,184 436,196 410,216 L432,252 Z',
  tuft: 'M1190,688 C1168,698 1166,742 1186,764 C1208,758 1224,728 1212,692 C1206,686 1198,684 1190,688 Z',
  mouth: 'M240,400 C232,424 222,448 214,470 C254,478 304,472 358,462 C330,440 300,420 268,404 C258,400 248,400 240,400 Z'
};
var LINES = RAW.map(function (r) { return [warp(r[0]), r[1], r[2]]; });
var NAILS = NAILS_RAW.map(warp);
var FILL = {}; Object.keys(FILL_RAW).forEach(function (k) { FILL[k] = warp(FILL_RAW[k]); });
var BODY_FILLS = ['farFront', 'farHind', 'main', 'nearHind', 'nearFront'];
var EYE = [272, 292, 15, 19];

/* ---------- small maths ---------- */
function rng(seed) { return function () { seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function hash(i, seed) { var x = Math.imul((i | 0) ^ (seed | 0), 0x45d9f3b); x ^= x >>> 16; x = Math.imul(x, 0x45d9f3b); x ^= x >>> 16; return (x >>> 0) / 4294967295 * 2 - 1; }
function noise(seed, len) { return function (s) { var x = s / len + 1000, i = Math.floor(x), f = x - i, u = (1 - Math.cos(f * Math.PI)) / 2, a = hash(i, seed), b = hash(i + 1, seed); return a + (b - a) * u; }; }
function f1(v) { return Math.round(v * 10) / 10; }

var meas = null, cache = {};
function sample(d, h) {
  var key = d + '@' + h.toFixed(2); if (cache[key]) return cache[key];
  if (!meas) { var sv = document.createElementNS(NS, 'svg'); sv.setAttribute('width', '0'); sv.setAttribute('height', '0'); sv.style.cssText = 'position:absolute;left:-10px;top:-10px'; meas = document.createElementNS(NS, 'path'); sv.appendChild(meas); document.body.appendChild(sv); }
  meas.setAttribute('d', d);
  var L = meas.getTotalLength(), n = Math.max(2, Math.ceil(L / h)), pts = new Float64Array((n + 1) * 2);
  for (var i = 0; i <= n; i++) { var p = meas.getPointAtLength(L * i / n); pts[2 * i] = p.x; pts[2 * i + 1] = p.y; }
  return (cache[key] = { L: L, n: n, pts: pts, hh: L / n });
}
function at(S, s) {
  var p = S.pts, n = S.n, dx, dy, m, i;
  if (s <= 0) { dx = p[0] - p[2]; dy = p[1] - p[3]; m = Math.hypot(dx, dy) || 1; return [p[0] - dx / m * s, p[1] - dy / m * s]; }
  if (s >= S.L) { i = 2 * n; dx = p[i] - p[i - 2]; dy = p[i + 1] - p[i - 1]; m = Math.hypot(dx, dy) || 1; return [p[i] + dx / m * (s - S.L), p[i + 1] + dy / m * (s - S.L)]; }
  var x = s / S.hh; i = Math.min(n - 1, Math.floor(x)); var f = x - i;
  return [p[2 * i] + (p[2 * i + 2] - p[2 * i]) * f, p[2 * i + 1] + (p[2 * i + 3] - p[2 * i + 1]) * f];
}
function tan(S, s) { var a = at(S, s - S.hh), b = at(S, s + S.hh), dx = b[0] - a[0], dy = b[1] - a[1], m = Math.hypot(dx, dy) || 1; return [dx / m, dy / m]; }

/* one inked stroke as a filled outline with round ends */
function stroke1(S, s0, s1, P, nz, off, press, tx, ty, out) {
  var len = s1 - s0, n = Math.max(3, Math.ceil(len / P.step)), Lp = [], Rp = [], c0, t0, h0, c1, t1, h1;
  for (var i = 0; i <= n; i++) {
    var t = i / n, s = s0 + len * t, p = at(S, s), tg = tan(S, s), nx = -tg[1], ny = tg[0];
    var o = nz(s) * P.wob + off, cx = p[0] + nx * o + tx, cy = p[1] + ny * o + ty;
    var w = P.w / 2 * press * (P.taper + (1 - P.taper) * Math.pow(Math.sin(Math.PI * t), 0.5));
    if (P.nib) w *= 0.45 + 0.75 * Math.abs(Math.sin(Math.atan2(tg[1], tg[0]) - P.nib));
    Lp.push(cx + nx * w, cy + ny * w); Rp.push(cx - nx * w, cy - ny * w);
    if (i === 0) { c0 = [cx, cy]; t0 = tg; h0 = w; } if (i === n) { c1 = [cx, cy]; t1 = tg; h1 = w; }
  }
  var d = 'M' + f1(Lp[0]) + ',' + f1(Lp[1]), k, a, ca, sa;
  for (i = 1; i <= n; i++) d += 'L' + f1(Lp[2 * i]) + ',' + f1(Lp[2 * i + 1]);
  for (k = 1; k < 5; k++) { a = k / 5 * Math.PI; ca = Math.cos(a); sa = Math.sin(a); d += 'L' + f1(c1[0] - t1[1] * h1 * ca + t1[0] * h1 * sa) + ',' + f1(c1[1] + t1[0] * h1 * ca + t1[1] * h1 * sa); }
  for (i = n; i >= 0; i--) d += 'L' + f1(Rp[2 * i]) + ',' + f1(Rp[2 * i + 1]);
  for (k = 1; k < 5; k++) { a = k / 5 * Math.PI; ca = Math.cos(a); sa = Math.sin(a); d += 'L' + f1(c0[0] + t0[1] * h0 * ca - t0[0] * h0 * sa) + ',' + f1(c0[1] - t0[0] * h0 * ca - t0[1] * h0 * sa); }
  out.push(d + 'Z');
}
/* a hand-drawn line along path d */
function inkPath(d, P, rnd, out) {
  var S = sample(d, P.step * 0.5);
  for (var p = 0; p < P.passes; p++) {
    var nz = noise((rnd() * 1e9) | 0, P.wobLen), tx = (rnd() - 0.5) * 2 * P.jit, ty = (rnd() - 0.5) * 2 * P.jit;
    if (P.seg && S.L > P.seg[0] * 1.3) {
      var s = -P.over * rnd(), guard = 0;
      while (guard++ < 400) {
        var e = s + P.seg[0] + rnd() * (P.seg[1] - P.seg[0]);
        if (e > S.L - P.seg[0] * 0.6) e = S.L + P.over * rnd();
        stroke1(S, s, e, P, nz, (rnd() - 0.5) * P.jit, 0.8 + rnd() * 0.3, tx, ty, out);
        if (e >= S.L) break;
        s = e - P.over * (0.3 + rnd() * 1.2);
      }
    } else stroke1(S, -P.over * rnd(), S.L + P.over * rnd(), P, nz, 0, 1, tx, ty, out);
  }
}
/* line params given in px for a 420 px drawing, converted to units */
function lineP(L, scale, size) {
  var k = 0.6 + 0.4 * Math.min(1, size / 420), u = 1 / scale;
  return { w: L.w * k * u, passes: L.passes || 1, seg: L.seg ? [L.seg[0] * k * u, L.seg[1] * k * u] : null, wob: (L.wob || 0) * k * u, wobLen: (L.wobLen || 30) * k * u, jit: (L.jit || 0) * k * u, over: (L.over || 0) * k * u, taper: L.taper == null ? 0.5 : L.taper, nib: L.nib || 0, step: 2 * u };
}
function ell(cx, cy, rx, ry) { return 'M' + f1(cx - rx) + ',' + cy + 'a' + f1(rx) + ',' + f1(ry) + ' 0 1,0 ' + f1(2 * rx) + ',0a' + f1(rx) + ',' + f1(ry) + ' 0 1,0 ' + f1(-2 * rx) + ',0Z'; }
function inkAll(ctx, L, filter, rnd) {
  var P = lineP(L, ctx.s, ctx.size), out = [];
  LINES.forEach(function (l) { if (l[1] <= ctx.lvl && (!filter || filter(l))) inkPath(l[0], P, rnd, out); });
  return { d: out.join(''), P: P };
}
function inkList(ctx, list, L, rnd) { var P = lineP(L, ctx.s, ctx.size), out = []; list.forEach(function (d) { inkPath(d, P, rnd, out); }); return out.join(''); }
function eye(ctx, color, hi) {
  var k = Math.max(1, 1.9 / (EYE[2] * ctx.s));
  var m = '<path d="' + ell(EYE[0], EYE[1], EYE[2] * k, EYE[3] * k) + '" fill="' + color + '"/>';
  if (hi && ctx.lvl >= 1) m += '<circle cx="' + (EYE[0] - 5 * k) + '" cy="' + (EYE[1] - 7 * k) + '" r="' + f1(4.5 * k) + '" fill="' + hi + '"/>';
  return m;
}
function fills(keys, attrs) { return keys.map(function (k) { return '<path d="' + FILL[k] + '" ' + attrs + '/>'; }).join(''); }

/* ---------- the second trunk, local coords: origin at the groin, y down ---------- */
function trunkGeo(ctx) {
  var W = ctx.W, h = W / 2, L = ctx.Lu, tt = L - 1.6 * W;
  function outline(y0) {
    return 'M' + f1(-h) + ',' + f1(y0) + ' C' + f1(-h - 0.05 * W) + ',' + f1(tt * 0.35) + ' ' + f1(-h + 0.05 * W) + ',' + f1(tt * 0.7) + ' ' + f1(-h) + ',' + f1(tt) +
      ' C' + f1(-h) + ',' + f1(L - W) + ' ' + f1(-1.5 * h) + ',' + f1(L - 0.55 * W) + ' ' + f1(-1.62 * h) + ',' + f1(L - 0.25 * W) +
      ' C' + f1(-1.68 * h) + ',' + f1(L - 0.05 * W) + ' ' + f1(-1.2 * h) + ',' + f1(L) + ' ' + f1(-0.6 * h) + ',' + f1(L - 0.02 * W) +
      ' C' + f1(-0.2 * h) + ',' + f1(L - 0.05 * W) + ' ' + f1(0.1 * h) + ',' + f1(L - 0.15 * W) + ' ' + f1(0.3 * h) + ',' + f1(L - 0.1 * W) +
      ' C' + f1(0.7 * h) + ',' + f1(L) + ' ' + f1(1.15 * h) + ',' + f1(L - 0.05 * W) + ' ' + f1(1.15 * h) + ',' + f1(L - 0.4 * W) +
      ' C' + f1(1.15 * h) + ',' + f1(L - 0.8 * W) + ' ' + f1(h) + ',' + f1(L - 1.2 * W) + ' ' + f1(h) + ',' + f1(tt) +
      ' C' + f1(h - 0.05 * W) + ',' + f1(tt * 0.7) + ' ' + f1(h + 0.05 * W) + ',' + f1(tt * 0.35) + ' ' + f1(h) + ',' + f1(y0);
  }
  var r = rng(77), wr = [], gap = Math.max(2.3 * W, 60 / ctx.s), sp = Math.max(0.2 * W, 3.6 / ctx.s);
  for (var y = W * 1.4 + r() * gap * 0.3; y < tt - W * 0.5; y += gap * (0.85 + r() * 0.3)) {
    var cnt = ctx.lvl >= 1 ? 3 : 2;
    for (var j = 0; j < cnt; j++) {
      var yy = y + j * sp, a = -0.12 * W + (r() - 0.5) * 0.08 * W, b = 0.4 * W + (r() - 0.5) * 0.1 * W;
      wr.push('M' + f1(a) + ',' + f1(yy) + ' Q' + f1((a + b) / 2) + ',' + f1(yy + 0.16 * W) + ' ' + f1(b) + ',' + f1(yy - 0.02 * W));
    }
  }
  var lip = 'M' + f1(-0.75 * h) + ',' + f1(L - 0.22 * W) + ' Q' + f1(-0.2 * h) + ',' + f1(L - 0.34 * W) + ' ' + f1(0.28 * h) + ',' + f1(L - 0.14 * W);
  return { ink: outline(-0.02 * W), fill: outline(0.03 * W) + ' Z', halo: outline(0.06 * W), wrinkles: wr, lip: lip };
}
function haloPath(d, ctx, extraPx) { return '<path d="' + d + '" fill="none" stroke="' + PAPER + '" stroke-width="' + f1(extraPx / ctx.s) + '" stroke-linejoin="round" stroke-linecap="butt"/>'; }

/* ---------- the six takes ---------- */
var TAKES = [
  {
    key: 'ink', name: 'A. Ink, like your drawing',
    idea: 'Every line laid down twice in short overlapping strokes, exactly the hand of your sketch. <b>Slider:</b> a pink scrunchie pulled over the trunk.',
    body: function (c, r) {
      var L = { w: 2.1, passes: 2, seg: [16, 50], wob: 1.0, wobLen: 14, jit: 1.5, over: 4.5, taper: 0.28 };
      var ink = inkAll(c, L, null, r), nails = c.lvl >= 1 ? inkList(c, NAILS, L, r) : '';
      return '<g fill="none" stroke="' + PAPER + '" stroke-width="' + f1(ink.P.w + 6 / c.s) + '" stroke-linejoin="round">' + fills(BODY_FILLS.concat(['ear', 'tuft']), '') + '</g>' +
        fills(BODY_FILLS.concat(['ear', 'tuft']), 'fill="' + PAPER + '"') + '<path d="' + ink.d + nails + '" fill="' + INK + '"/>' + eye(c, INK, PAPER);
    },
    trunk: function (c, r, g) {
      var L = { w: 2.1, passes: 2, seg: [16, 50], wob: 1.0, wobLen: 14, jit: 1.5, over: 4.5, taper: 0.28 };
      return haloPath(g.halo, c, 8) + '<path d="' + g.fill + '" fill="' + PAPER + '"/><path d="' + inkList(c, [g.ink].concat(g.wrinkles, c.lvl >= 1 ? [g.lip] : []), L, r) + '" fill="' + INK + '"/>';
    },
    slider: function (c, r, sw, sh) {
      var w = sw / 2, h = sh / 2, d = 'M' + f1(-w * 0.82) + ',' + f1(-h) + ' C' + f1(-w * 0.3) + ',' + f1(-h * 1.12) + ' ' + f1(w * 0.3) + ',' + f1(-h * 0.88) + ' ' + f1(w * 0.82) + ',' + f1(-h) +
        ' C' + f1(w * 1.08) + ',' + f1(-h * 0.5) + ' ' + f1(w * 1.08) + ',' + f1(h * 0.5) + ' ' + f1(w * 0.82) + ',' + f1(h) + ' C' + f1(w * 0.3) + ',' + f1(h * 1.12) + ' ' + f1(-w * 0.3) + ',' + f1(h * 0.88) + ' ' + f1(-w * 0.82) + ',' + f1(h) +
        ' C' + f1(-w * 1.08) + ',' + f1(h * 0.5) + ' ' + f1(-w * 1.08) + ',' + f1(-h * 0.5) + ' ' + f1(-w * 0.82) + ',' + f1(-h) + 'Z';
      var rib = []; for (var i = -2; i <= 2; i++) { var x = i * w * 0.34; rib.push('M' + f1(x) + ',' + f1(-h * 0.78) + ' C' + f1(x + w * 0.08) + ',' + f1(-h * 0.2) + ' ' + f1(x - w * 0.08) + ',' + f1(h * 0.2) + ' ' + f1(x) + ',' + f1(h * 0.78)); }
      var L = { w: 2, passes: 2, seg: [18, 40], wob: 0.5, wobLen: 10, jit: 0.6, over: 2, taper: 0.35 };
      return '<path d="' + d + '" fill="#FF9CC8"/><path d="M' + f1(-w * 0.5) + ',' + f1(-h * 0.55) + ' C' + f1(-w * 0.2) + ',' + f1(-h * 0.7) + ' ' + f1(w * 0.1) + ',' + f1(-h * 0.62) + ' ' + f1(w * 0.3) + ',' + f1(-h * 0.66) + '" fill="none" stroke="#fff" stroke-width="' + f1(2.4 / c.s) + '" stroke-linecap="round" opacity=".8"/>' +
        '<path d="' + inkList(c, [d].concat(c.lvl >= 1 ? rib : rib.slice(1, 4)), L, r) + '" fill="' + INK + '"/>';
    }
  },
  {
    key: 'line', name: 'B. Clean line, grown up',
    idea: 'The site elephant you liked, grown taller: one calm marker line, pink ear, blush. <b>Slider:</b> a mouse climbing the trunk as you scroll. Elephants are famously scared of them.',
    body: function (c, r) {
      var L = { w: 2.7, wob: 0.25, wobLen: 40, taper: 0.55 };
      var ink = inkAll(c, L, null, r), nails = c.lvl >= 1 ? inkList(c, NAILS, L, r) : '';
      return '<g fill="none" stroke="' + PAPER + '" stroke-width="' + f1(ink.P.w + 6 / c.s) + '" stroke-linejoin="round">' + fills(BODY_FILLS.concat(['ear', 'tuft']), '') + '</g>' +
        fills(BODY_FILLS.concat(['tuft']), 'fill="' + PAPER + '"') + fills(['ear'], 'fill="#FFD3E6"') + fills(['mouth'], 'fill="#FF9CC8"') +
        '<ellipse cx="330" cy="330" rx="26" ry="15" fill="#FF9CC8" opacity=".55"/>' +
        '<path d="' + ink.d + nails + '" fill="' + INK + '"/>' + eye(c, INK, PAPER);
    },
    trunk: function (c, r, g) {
      var L = { w: 2.7, wob: 0.25, wobLen: 40, taper: 0.55 };
      return haloPath(g.halo, c, 8) + '<path d="' + g.fill + '" fill="' + PAPER + '"/><path d="' + inkList(c, [g.ink].concat(g.wrinkles, c.lvl >= 1 ? [g.lip] : []), L, r) + '" fill="' + INK + '"/>';
    },
    sliderAspect: 1.3, sliderK: 3, sliderMin: 30,
    slider: function (c, r, sw, sh) {
      var w = sw / 2, h = sh / 2, L = { w: 2.3, wob: 0.2, taper: 0.55 };
      var body = ell(0, h * 0.12, w * 0.62, h * 0.62), head = ell(0, -h * 0.5, w * 0.42, h * 0.36);
      var earL = ell(-w * 0.42, -h * 0.78, w * 0.26, w * 0.26), earR = ell(w * 0.42, -h * 0.78, w * 0.26, w * 0.26);
      var tail = 'M' + f1(w * 0.1) + ',' + f1(h * 0.72) + ' C' + f1(w * 0.6) + ',' + f1(h * 0.95) + ' ' + f1(w * 1.05) + ',' + f1(h * 0.7) + ' ' + f1(w * 0.95) + ',' + f1(h * 0.35) + ' C' + f1(w * 0.88) + ',' + f1(h * 0.1) + ' ' + f1(w * 0.7) + ',' + f1(h * 0.05) + ' ' + f1(w * 0.62) + ',' + f1(h * 0.12);
      var pawL = 'M' + f1(-w * 0.62) + ',' + f1(-h * 0.05) + ' C' + f1(-w * 0.5) + ',' + f1(h * 0.02) + ' ' + f1(-w * 0.3) + ',' + f1(h * 0.02) + ' ' + f1(-w * 0.18) + ',' + f1(-h * 0.04);
      var pawR = 'M' + f1(w * 0.62) + ',' + f1(-h * 0.05) + ' C' + f1(w * 0.5) + ',' + f1(h * 0.02) + ' ' + f1(w * 0.3) + ',' + f1(h * 0.02) + ' ' + f1(w * 0.18) + ',' + f1(-h * 0.04);
      var lines = inkList(c, [body, head, earL, earR, tail].concat(c.lvl >= 1 ? [pawL, pawR] : []), L, r);
      return '<path d="' + body + '" fill="#C9CCD2"/><path d="' + earL + earR + '" fill="#C9CCD2"/>' +
        '<path d="' + ell(-w * 0.42, -h * 0.78, w * 0.14, w * 0.14) + ell(w * 0.42, -h * 0.78, w * 0.14, w * 0.14) + '" fill="#FF9CC8"/>' +
        '<path d="' + head + '" fill="#C9CCD2"/><path d="' + lines + '" fill="' + INK + '"/>' +
        '<path d="' + ell(-w * 0.17, -h * 0.55, Math.max(w * 0.07, 1 / c.s), Math.max(w * 0.08, 1.1 / c.s)) + ell(w * 0.17, -h * 0.55, Math.max(w * 0.07, 1 / c.s), Math.max(w * 0.08, 1.1 / c.s)) + '" fill="' + INK + '"/>' +
        '<path d="' + ell(0, -h * 0.84, Math.max(w * 0.1, 1.3 / c.s), Math.max(w * 0.08, 1.1 / c.s)) + '" fill="#FF6FAE"/>';
    }
  },
  {
    key: 'riso', name: 'C. Riso print',
    idea: 'Two-ink risograph: a hot pink elephant, blue line printed slightly off register, halftone dots in the shadows. <b>Slider:</b> a peanut.',
    defs: function (c, id) {
      var t = f1(9 / c.s);
      return '<pattern id="' + id + 'dots" width="' + t + '" height="' + t + '" patternUnits="userSpaceOnUse" patternTransform="rotate(20)"><circle cx="' + f1(t / 2) + '" cy="' + f1(t / 2) + '" r="' + f1(t * 0.28) + '" fill="#2353C9"/></pattern>';
    },
    body: function (c, r, id) {
      var L = { w: 2.4, wob: 0.6, wobLen: 22, taper: 0.5 }, ink = inkAll(c, L, null, r), nails = c.lvl >= 1 ? inkList(c, NAILS, L, r) : '';
      var o = f1(2.2 / c.s);
      return '<g fill="none" stroke="' + PAPER + '" stroke-width="' + f1(ink.P.w + 6 / c.s) + '" stroke-linejoin="round">' + fills(BODY_FILLS.concat(['ear', 'tuft']), '') + '</g>' +
        '<g style="mix-blend-mode:multiply">' + fills(['farFront', 'farHind'], 'fill="#FF6CB4"') + fills(['farFront', 'farHind'], 'fill="url(#' + id + 'dots)" opacity=".75"') + fills(['main', 'nearHind', 'nearFront', 'tuft'], 'fill="#FF6CB4"') + fills(['ear'], 'fill="#FFE14D"') + fills(['mouth'], 'fill="#2353C9" opacity=".35"') + '</g>' +
        '<g transform="translate(' + o + ' ' + o + ')" style="mix-blend-mode:multiply"><path d="' + ink.d + nails + '" fill="#2353C9"/>' + eye(c, '#2353C9', null) + '</g>';
    },
    trunk: function (c, r, g, id) {
      var L = { w: 2.4, wob: 0.6, wobLen: 22, taper: 0.5 }, o = f1(2.2 / c.s), h = c.W / 2;
      return haloPath(g.halo, c, 8) + '<path d="' + g.fill + '" fill="' + PAPER + '"/><g style="mix-blend-mode:multiply"><path d="' + g.fill + '" fill="#FF6CB4"/>' +
        '<clipPath id="' + id + 'tc"><path d="' + g.fill + '"/></clipPath><rect x="' + f1(h * 0.25) + '" y="0" width="' + f1(h) + '" height="' + f1(c.Lu) + '" fill="url(#' + id + 'dots)" opacity=".75" clip-path="url(#' + id + 'tc)"/></g>' +
        '<path transform="translate(' + o + ' ' + o + ')" style="mix-blend-mode:multiply" d="' + inkList(c, [g.ink].concat(g.wrinkles, c.lvl >= 1 ? [g.lip] : []), L, r) + '" fill="#2353C9"/>';
    },
    sliderAspect: 1.55, sliderK: 2.3,
    slider: function (c, r, sw, sh, id) {
      var w = sw / 2, h = sh / 2, o = f1(1.8 / c.s), L = { w: 2.2, wob: 0.5, wobLen: 14, taper: 0.5 };
      var d = 'M0,' + f1(-h) + ' C' + f1(w * 0.95) + ',' + f1(-h) + ' ' + f1(w * 1.02) + ',' + f1(-h * 0.25) + ' ' + f1(w * 0.62) + ',' + f1(-h * 0.02) +
        ' C' + f1(w * 1.05) + ',' + f1(h * 0.25) + ' ' + f1(w * 0.95) + ',' + f1(h) + ' 0,' + f1(h) + ' C' + f1(-w * 0.95) + ',' + f1(h) + ' ' + f1(-w * 1.05) + ',' + f1(h * 0.25) + ' ' + f1(-w * 0.62) + ',' + f1(-h * 0.02) +
        ' C' + f1(-w * 1.02) + ',' + f1(-h * 0.25) + ' ' + f1(-w * 0.95) + ',' + f1(-h) + ' 0,' + f1(-h) + 'Z';
      var tex = []; for (var i = -2; i <= 2; i++) tex.push('M' + f1(-w * 0.5) + ',' + f1(i * h * 0.34) + ' L' + f1(w * 0.5) + ',' + f1(i * h * 0.34 + h * 0.12));
      return '<g style="mix-blend-mode:multiply"><path d="' + d + '" fill="#F2C14E"/><path d="' + d + '" fill="url(#' + id + 'dots)" opacity=".35"/></g>' +
        '<path transform="translate(' + o + ' ' + o + ')" style="mix-blend-mode:multiply" d="' + inkList(c, [d].concat(c.lvl >= 1 ? tex : []), L, r) + '" fill="#2353C9"/>';
    }
  },
  {
    key: 'paper', name: 'D. Paper cut-out',
    idea: 'Torn grey paper pieces glued on the page, pencil for the face and wrinkles, a soft shadow under each piece. The second trunk is a long paper strip. <b>Slider:</b> a paper clip.',
    defs: function (c, id) {
      return '<filter id="' + id + 'tear" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="' + (0.09 * c.s).toFixed(4) + '" numOctaves="3" seed="4" result="t"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="t" scale="' + f1(3.2 / c.s) + '" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="' + (0.32 * c.s).toFixed(4) + '" numOctaves="2" seed="11" result="g"/>' +
        '<feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .1 -.03" result="ga"/>' +
        '<feComposite in="ga" in2="d" operator="in" result="tex"/>' +
        '<feMerge result="m"><feMergeNode in="d"/><feMergeNode in="tex"/></feMerge>' +
        '<feDropShadow dx="' + f1(1.4 / c.s) + '" dy="' + f1(2.2 / c.s) + '" stdDeviation="' + f1(1.4 / c.s) + '" flood-color="#2A2A22" flood-opacity=".32"/></filter>';
    },
    body: function (c, r, id) {
      var L = { w: 1.5, wob: 0.5, wobLen: 18, taper: 0.4, passes: 1 };
      var det = inkAll(c, L, function (l) { return l[2] === 'in'; }, r);
      var fl = 'filter="url(#' + id + 'tear)"', edge = 'stroke="#fff" stroke-width="' + f1(2.4 / c.s) + '" stroke-linejoin="round"';
      function piece(k, col) { return '<path d="' + FILL[k] + '" fill="' + col + '" ' + edge + ' ' + fl + '/>'; }
      var nails = c.lvl >= 1 ? NAILS.map(function (d) { return '<path d="' + d + 'Z" fill="#F4F1E8" ' + fl + '/>'; }).join('') : '';
      return piece('farFront', '#9DA3AB') + piece('farHind', '#9DA3AB') + piece('main', '#BCC2C9') + piece('nearHind', '#BCC2C9') + piece('nearFront', '#BCC2C9') +
        piece('ear', '#F2B8CF') + piece('tuft', '#8E949C') + nails +
        '<path d="' + det.d + '" fill="#3A3A36" opacity=".85"/>' + eye(c, '#2A2A26', '#fff');
    },
    trunk: function (c, r, g, id) {
      var L = { w: 1.5, wob: 0.5, wobLen: 18, taper: 0.4 };
      return '<path d="' + g.fill + '" fill="#BCC2C9" stroke="#fff" stroke-width="' + f1(2.4 / c.s) + '" filter="url(#' + id + 'tear)"/>' +
        '<path d="' + inkList(c, g.wrinkles.concat(c.lvl >= 1 ? [g.lip] : []), L, r) + '" fill="#3A3A36" opacity=".85"/>';
    },
    sliderAspect: 2.1,
    slider: function (c, r, sw, sh) {
      var w = sw / 2 * 0.62, h = sh / 2, sw1 = f1(Math.max(2.6 / c.s, w * 0.16));
      var d = 'M' + f1(-w * 0.45) + ',' + f1(h * 0.55) + ' L' + f1(-w * 0.45) + ',' + f1(-h * 0.6) + ' A' + f1(w * 0.45) + ',' + f1(w * 0.45) + ' 0 0 1 ' + f1(w * 0.45) + ',' + f1(-h * 0.6) +
        ' L' + f1(w * 0.45) + ',' + f1(h * 0.75) + ' A' + f1(w * 0.72) + ',' + f1(w * 0.72) + ' 0 0 1 ' + f1(-w) + ',' + f1(h * 0.75) + ' L' + f1(-w) + ',' + f1(-h * 0.72) +
        ' A' + f1(w) + ',' + f1(w) + ' 0 0 1 ' + f1(w) + ',' + f1(-h * 0.72) + ' L' + f1(w) + ',' + f1(h * 0.35);
      return '<path d="' + d + '" fill="none" stroke="#2A2A26" stroke-opacity=".28" stroke-width="' + sw1 + '" stroke-linecap="round" stroke-linejoin="round" transform="translate(' + f1(1.5 / c.s) + ' ' + f1(2.5 / c.s) + ')"/>' +
        '<path d="' + d + '" fill="none" stroke="#7E858E" stroke-width="' + sw1 + '" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="' + d + '" fill="none" stroke="#E8ECF0" stroke-width="' + f1(sw1 * 0.35) + '" stroke-linecap="round" stroke-linejoin="round" transform="translate(' + f1(-sw1 * 0.18) + ' ' + f1(-sw1 * 0.18) + ')"/>';
    }
  },
  {
    key: 'tattoo', name: 'E. Old-school tattoo flash',
    idea: 'Thick even outline, flat colours, white highlights and sparkles, like a sheet on a tattoo parlour wall. <b>Slider:</b> a heart with a banner.',
    body: function (c, r) {
      var w = f1(Math.max(2.8, 5.2 * (0.6 + 0.4 * Math.min(1, c.size / 420))) / c.s), wi = f1(Math.max(1.8, 3.2 * (0.6 + 0.4 * Math.min(1, c.size / 420))) / c.s);
      var main = LINES.filter(function (l) { return l[1] <= c.lvl && l[2] !== 'in'; }).map(function (l) { return l[0]; }).join(' ');
      var inner = LINES.filter(function (l) { return l[1] <= c.lvl && l[2] === 'in'; }).map(function (l) { return l[0]; }).join(' ');
      var hi = 'M300,170 C330,150 360,138 392,130 M440,118 C470,110 500,106 528,108 M70,150 C66,190 66,230 72,262 M720,236 C780,230 830,226 880,222 M1150,280 C1160,300 1166,320 1170,340';
      var star = function (x, y, s) { return 'M' + x + ',' + (y - s) + ' C' + (x + s * 0.15) + ',' + (y - s * 0.15) + ' ' + (x + s * 0.15) + ',' + (y - s * 0.15) + ' ' + (x + s) + ',' + y + ' C' + (x + s * 0.15) + ',' + (y + s * 0.15) + ' ' + (x + s * 0.15) + ',' + (y + s * 0.15) + ' ' + x + ',' + (y + s) + ' C' + (x - s * 0.15) + ',' + (y + s * 0.15) + ' ' + (x - s * 0.15) + ',' + (y + s * 0.15) + ' ' + (x - s) + ',' + y + ' C' + (x - s * 0.15) + ',' + (y - s * 0.15) + ' ' + (x - s * 0.15) + ',' + (y - s * 0.15) + ' ' + x + ',' + (y - s) + 'Z'; };
      var stars = c.lvl >= 1 ? '<path d="' + star(300, 60, 46) + star(360, 118, 24) + star(1060, 110, 34) + '" fill="#FFE14D" stroke="' + INK + '" stroke-width="' + wi + '" stroke-linejoin="round"/>' : '';
      var nails = c.lvl >= 1 ? '<path d="' + NAILS.map(function (d) { return d + 'Z'; }).join(' ') + '" fill="#FFF3D6" stroke="' + INK + '" stroke-width="' + wi + '"/>' : '';
      return stars + '<g fill="none" stroke="' + PAPER + '" stroke-width="' + f1(+w + 7 / c.s) + '" stroke-linejoin="round">' + fills(BODY_FILLS.concat(['ear', 'tuft']), '') + '</g>' +
        fills(['farFront', 'farHind'], 'fill="#93A6B2"') + fills(['main', 'nearHind', 'nearFront'], 'fill="#B7C6CF"') + fills(['ear'], 'fill="#F48FB1"') + fills(['tuft'], 'fill="#D7263D"') + fills(['mouth'], 'fill="#D7263D"') +
        (c.lvl >= 1 ? '<path d="' + hi + '" fill="none" stroke="#fff" stroke-width="' + wi + '" stroke-linecap="round"/>' : '') +
        '<path d="' + main + '" fill="none" stroke="' + INK + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="' + inner + '" fill="none" stroke="' + INK + '" stroke-width="' + wi + '" stroke-linecap="round" stroke-linejoin="round"/>' + nails + eye(c, INK, '#fff');
    },
    trunk: function (c, r, g) {
      var w = f1(Math.max(2.8, 5.2 * (0.6 + 0.4 * Math.min(1, c.size / 420))) / c.s), wi = f1(Math.max(1.8, 3.2 * (0.6 + 0.4 * Math.min(1, c.size / 420))) / c.s), h = c.W / 2;
      return haloPath(g.halo, c, 9) + '<path d="' + g.fill + '" fill="#B7C6CF"/>' +
        (c.lvl >= 1 ? '<path d="M' + f1(-h * 0.45) + ',' + f1(c.W) + ' L' + f1(-h * 0.45) + ',' + f1(c.Lu - 2.2 * c.W) + '" stroke="#fff" stroke-width="' + wi + '" stroke-linecap="round" stroke-dasharray="' + f1(c.W * 1.6) + ' ' + f1(c.W * 3) + '"/>' : '') +
        '<path d="' + g.ink + '" fill="none" stroke="' + INK + '" stroke-width="' + w + '" stroke-linejoin="round" stroke-linecap="round"/>' +
        '<path d="' + g.wrinkles.join(' ') + (c.lvl >= 1 ? ' ' + g.lip : '') + '" fill="none" stroke="' + INK + '" stroke-width="' + wi + '" stroke-linecap="round"/>';
    },
    sliderAspect: 0.95, sliderK: 2.6, sliderMin: 28,
    slider: function (c, r, sw, sh) {
      var w = sw / 2, h = sh / 2, k = 0.6 + 0.4 * Math.min(1, c.size / 420), lw = f1(Math.max(2.2, 4 * k) / c.s);
      var heart = 'M0,' + f1(h * 0.95) + ' C' + f1(-w * 0.55) + ',' + f1(h * 0.5) + ' ' + f1(-w * 1.02) + ',' + f1(h * 0.05) + ' ' + f1(-w * 0.95) + ',' + f1(-h * 0.42) +
        ' C' + f1(-w * 0.88) + ',' + f1(-h * 0.95) + ' ' + f1(-w * 0.2) + ',' + f1(-h * 1.0) + ' 0,' + f1(-h * 0.5) + ' C' + f1(w * 0.2) + ',' + f1(-h * 1.0) + ' ' + f1(w * 0.88) + ',' + f1(-h * 0.95) + ' ' + f1(w * 0.95) + ',' + f1(-h * 0.42) +
        ' C' + f1(w * 1.02) + ',' + f1(h * 0.05) + ' ' + f1(w * 0.55) + ',' + f1(h * 0.5) + ' 0,' + f1(h * 0.95) + 'Z';
      var m = '<path d="' + heart + '" fill="#D7263D" stroke="' + INK + '" stroke-width="' + lw + '" stroke-linejoin="round"/>' +
        '<path d="M' + f1(-w * 0.62) + ',' + f1(-h * 0.5) + ' C' + f1(-w * 0.55) + ',' + f1(-h * 0.7) + ' ' + f1(-w * 0.35) + ',' + f1(-h * 0.74) + ' ' + f1(-w * 0.22) + ',' + f1(-h * 0.62) + '" fill="none" stroke="#fff" stroke-width="' + lw + '" stroke-linecap="round"/>';
      if (c.lvl >= 2) {
        var bw = w * 1.55, by = h * 0.08, bh = h * 0.42;
        var band = 'M' + f1(-bw) + ',' + f1(by - bh / 2) + ' C' + f1(-bw * 0.4) + ',' + f1(by - bh * 0.9) + ' ' + f1(bw * 0.4) + ',' + f1(by - bh * 0.1) + ' ' + f1(bw) + ',' + f1(by - bh / 2) +
          ' L' + f1(bw) + ',' + f1(by + bh / 2) + ' C' + f1(bw * 0.4) + ',' + f1(by + bh * 0.9) + ' ' + f1(-bw * 0.4) + ',' + f1(by + bh * 0.1) + ' ' + f1(-bw) + ',' + f1(by + bh / 2) + 'Z';
        var tailL = 'M' + f1(-bw) + ',' + f1(by - bh * 0.3) + ' L' + f1(-bw * 1.28) + ',' + f1(by - bh * 0.1) + ' L' + f1(-bw * 1.16) + ',' + f1(by + bh * 0.35) + ' L' + f1(-bw * 1.32) + ',' + f1(by + bh * 0.8) + ' L' + f1(-bw) + ',' + f1(by + bh * 0.5) + 'Z';
        var tailR = 'M' + f1(bw) + ',' + f1(by - bh * 0.5) + ' L' + f1(bw * 1.3) + ',' + f1(by - bh * 0.75) + ' L' + f1(bw * 1.17) + ',' + f1(by - bh * 0.25) + ' L' + f1(bw * 1.3) + ',' + f1(by + bh * 0.25) + ' L' + f1(bw) + ',' + f1(by + bh * 0.3) + 'Z';
        m += '<path d="' + tailL + tailR + '" fill="#E9D8B4" stroke="' + INK + '" stroke-width="' + lw + '" stroke-linejoin="round"/><path d="' + band + '" fill="#FFF3D6" stroke="' + INK + '" stroke-width="' + lw + '" stroke-linejoin="round"/>' +
          '<text x="0" y="' + f1(by + bh * 0.22) + '" text-anchor="middle" font-family="Pangolin" font-size="' + f1(bh * 0.62) + '" fill="' + INK + '">ЛИСТАЙ</text>';
      }
      return m;
    }
  },
  {
    key: 'lino', name: 'F. Linocut stamp',
    idea: 'Solid black, carved white lines, a speckled print texture and one pink ear. Reads strongest at tiny sizes. <b>Slider:</b> a fat yellow ring.',
    defs: function (c, id) {
      return '<filter id="' + id + 'lino" x="-4%" y="-4%" width="108%" height="108%"><feTurbulence type="fractalNoise" baseFrequency="' + (0.3 * c.s).toFixed(4) + '" numOctaves="2" seed="3" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -30 24" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in" result="s"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="' + (0.08 * c.s).toFixed(4) + '" numOctaves="2" seed="8" result="t"/><feDisplacementMap in="s" in2="t" scale="' + f1(1.6 / c.s) + '" xChannelSelector="R" yChannelSelector="G"/></filter>';
    },
    body: function (c, r, id) {
      var L = { w: 2.2, wob: 0.4, wobLen: 20, taper: 0.25, passes: 1 };
      var carve = inkAll(c, L, function (l) { return l[2] === 'in'; }, r);
      var earLine = inkAll(c, L, function (l) { return l[2] === 'ear'; }, r);
      var nails = c.lvl >= 1 ? '<path d="' + NAILS.map(function (d) { return d + 'Z'; }).join(' ') + '" fill="' + PAPER + '"/>' : '';
      var ek = Math.max(1, 2.6 / (EYE[2] * c.s));
      return '<g fill="none" stroke="' + PAPER + '" stroke-width="' + f1(7 / c.s) + '" stroke-linejoin="round">' + fills(BODY_FILLS.concat(['ear', 'tuft']), '') + '</g>' +
        '<g filter="url(#' + id + 'lino)">' + fills(BODY_FILLS.concat(['tuft']), 'fill="' + INK + '"') + fills(['ear'], 'fill="#FF7AB6"') + fills(['mouth'], 'fill="#FF7AB6"') +
        '<path d="' + carve.d + earLine.d + '" fill="' + PAPER + '"/>' + nails + '</g>' +
        '<path d="' + ell(EYE[0], EYE[1], EYE[2] * ek * 1.2, EYE[3] * ek * 1.15) + '" fill="' + PAPER + '"/><path d="' + ell(EYE[0] - 3 * ek, EYE[1] + 3 * ek, EYE[2] * ek * 0.7, EYE[3] * ek * 0.72) + '" fill="' + INK + '"/>';
    },
    trunk: function (c, r, g, id) {
      var L = { w: 2.2, wob: 0.4, wobLen: 20, taper: 0.25 };
      return haloPath(g.halo, c, 8) + '<g filter="url(#' + id + 'lino)"><path d="' + g.fill + '" fill="' + INK + '"/><path d="' + inkList(c, g.wrinkles.concat(c.lvl >= 1 ? [g.lip] : []), L, r) + '" fill="' + PAPER + '"/></g>';
    },
    sliderAspect: 0.8,
    slider: function (c, r, sw, sh, id) {
      var w = sw / 2, h = sh / 2, lw = f1(Math.max(2, 3.2 * (0.6 + 0.4 * Math.min(1, c.size / 420))) / c.s);
      var ring = 'M' + f1(-w) + ',' + f1(-h * 0.55) + ' C' + f1(-w) + ',' + f1(-h * 1.05) + ' ' + f1(w) + ',' + f1(-h * 1.05) + ' ' + f1(w) + ',' + f1(-h * 0.55) + ' L' + f1(w) + ',' + f1(h * 0.55) +
        ' C' + f1(w) + ',' + f1(h * 1.05) + ' ' + f1(-w) + ',' + f1(h * 1.05) + ' ' + f1(-w) + ',' + f1(h * 0.55) + 'Z';
      var groove = 'M' + f1(-w) + ',' + f1(-h * 0.1) + ' C' + f1(-w * 0.4) + ',' + f1(h * 0.2) + ' ' + f1(w * 0.4) + ',' + f1(h * 0.2) + ' ' + f1(w) + ',' + f1(-h * 0.1);
      return '<g filter="url(#' + id + 'lino)"><path d="' + ring + '" fill="#FFE14D" stroke="' + INK + '" stroke-width="' + lw + '"/>' +
        '<path d="' + groove + '" fill="none" stroke="' + INK + '" stroke-width="' + lw + '" stroke-linecap="round"/>' +
        '<path d="M' + f1(-w * 0.55) + ',' + f1(-h * 0.55) + ' C' + f1(-w * 0.3) + ',' + f1(-h * 0.75) + ' ' + f1(w * 0.1) + ',' + f1(-h * 0.75) + ' ' + f1(w * 0.3) + ',' + f1(-h * 0.68) + '" fill="none" stroke="#fff" stroke-width="' + lw + '" stroke-linecap="round"/></g>';
    }
  }
];


var uidE = 0;
function byKey(k) { for (var i = 0; i < TAKES.length; i++) if (TAKES[i].key === k) return TAKES[i]; return null; }
/* drawing context for one size: size = elephant width in px, trunkPx = hanging trunk length in px */
function ctxFor(take, size, trunkPx) {
  var s = size / VB.w, c = { s: s, size: size, lvl: size >= 230 ? 2 : size >= 110 ? 1 : 0, W: Math.max(TW, 7.5 / s) };
  c.Lu = trunkPx / s; c.id = 'e' + (uidE++) + '_';
  c.sw = Math.max((take.sliderK || 2.1) * c.W, (take.sliderMin || 26) / s); c.sh = c.sw * (take.sliderAspect || 1);
  return c;
}
function parts(take, c) {
  var r = rng(1234 + Math.round(c.size)), g = trunkGeo(c);
  return { defs: take.defs ? take.defs(c, c.id) : '', body: take.body(c, r, c.id), trunk: take.trunk(c, r, g, c.id), slider: take.slider(c, r, c.sw, c.sh, c.id) };
}
window.Elephant = { VB: VB, ATT: ATT, TW: TW, TAKES: TAKES, LINES: LINES, byKey: byKey, ctxFor: ctxFor, parts: parts, trunkGeo: trunkGeo, rng: rng, f1: f1 };
})();
