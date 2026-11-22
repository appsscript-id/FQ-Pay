/* Gambar latar tema (ikon PPOB) dibuat oleh kode ini, supaya file tetap ringkas */
(function () {
  var I = {
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M16 12h5v4h-5a2 2 0 010-4z"/>',
    rp: '<circle cx="12" cy="12" r="9"/><path d="M9 16V8h4a2 2 0 010 4H9m4 0 3 4"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    qr: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM14 20h7M20 17v3"/>',
    receipt: '<path d="M5 2v20l2-1.5 2 1.5 2-1.5 2 1.5 2-1.5 2 1.5V2zM8 7h8M8 11h8M8 15h5"/>',
    wifi: '<path d="M2 9a15 15 0 0120 0M5 13a10 10 0 0114 0M8.5 16.5a5 5 0 017 0"/><circle cx="12" cy="20" r="1"/>',
    drop: '<path d="M12 3S5 11 5 15a7 7 0 0014 0c0-4-7-12-7-12z"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>'
  };
  var PS = ['translate(14 16) rotate(-12) scale(1.5)', 'translate(112 10) rotate(10) scale(1.6)', 'translate(62 80) rotate(-6) scale(1.7)',
            'translate(150 92) scale(1.4)', 'translate(12 134) rotate(8) scale(1.6)', 'translate(114 150) rotate(-8) scale(1.3)'];
  var TH = {
    klasik:  ['#4f46e5', 'card', ['card', 'wallet', 'rp', 'bolt', 'phone', 'qr']],
    hijau:   ['#059669', 'wallet', ['wallet', 'rp', 'receipt', 'check', 'card', 'rp']],
    listrik: ['#ea580c', 'bolt', ['bolt', 'bolt', 'rp', 'receipt', 'bolt', 'phone']],
    pulsa:   ['#0284c7', 'wifi', ['phone', 'wifi', 'rp', 'wifi', 'phone', 'qr']],
    qris:    ['#e11d48', 'qr', ['qr', 'card', 'rp', 'qr', 'wallet', 'check']],
    air:     ['#0d9488', 'drop', ['drop', 'receipt', 'drop', 'rp', 'drop', 'card']],
    emas:    ['#a16207', 'rp', ['rp', 'rp', 'card', 'wallet', 'rp', 'check']],
    malam:   ['#fbbf24', 'card', ['card', 'rp', 'bolt', 'wallet', 'qr', 'phone']]
  };
  function g(n, t, sw) { return '<g transform="' + t + '" stroke-width="' + sw + '">' + I[n] + '</g>'; }
  function uri(w, h, body, col, op, sw0) {
    var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '"><g fill="none" stroke="' + col + '" stroke-opacity="' + op + '"' + (sw0 ? ' stroke-width="' + sw0 + '"' : '') + ' stroke-linecap="round" stroke-linejoin="round">' + body + '</g></svg>';
    return 'url("data:image/svg+xml,' + encodeURIComponent(s) + '")';
  }
  var FRAME = '<rect x="110" y="30" width="110" height="200" rx="18"/><path d="M150 48h30"/><circle cx="165" cy="115" r="30"/><path d="m150 115 11 11 21-24"/><path d="M130 170h70M130 188h45"/>';
    var st = document.createElement('style'); st.id = 'themeArt'; document.head.appendChild(st);
  function build(keys) {
    var css = '';
    keys.forEach(function (k) {
      var c = TH[k][0], main = TH[k][1], sl = TH[k][2];
      var p = sl.map(function (n, i) { return g(n, PS[i], 1.6); }).join('');
      var h = FRAME + g(main, 'translate(14 22) rotate(-10) scale(4.2)', 0.7) + g('card', 'translate(16 150) rotate(-14) scale(5)', 0.6) +
        g('rp', 'translate(232 140) scale(3.2)', 0.9) + g('rp', 'translate(246 186) scale(2.4)', 1.1) + g('receipt', 'translate(236 40) rotate(12) scale(2.6)', 1.1);
      css += '[data-theme="' + k + '"]{--pat:' + uri(200, 200, p, c, k === 'malam' ? 0.12 : 0.13) + ';--patw:' + uri(200, 200, p, '#ffffff', 0.16) +
        ';--hero:' + uri(320, 260, h, c, 0.2, 3) + ';--herow:' + uri(320, 260, h, '#ffffff', 0.28, 3) + '}\n';
    });
    st.appendChild(document.createTextNode(css));
  }
  var cur = document.documentElement.dataset.theme; if (!TH[cur]) cur = 'klasik';
  build([cur]);
  setTimeout(function () { build(Object.keys(TH).filter(function (k) { return k !== cur; })); }, 1500);
})();
