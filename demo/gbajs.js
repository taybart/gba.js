function F(t) {
  this.cpu = t, this.addressingMode23Immediate = [
    // 000x0
    function(e, s, r) {
      var a = t.gprs, h = function() {
        var n = a[e];
        return (!r || r()) && (a[e] -= s), n;
      };
      return h.writesPC = e == t.PC, h;
    },
    // 000xW
    null,
    null,
    null,
    // 00Ux0
    function(e, s, r) {
      var a = t.gprs, h = function() {
        var n = a[e];
        return (!r || r()) && (a[e] += s), n;
      };
      return h.writesPC = e == t.PC, h;
    },
    // 00UxW
    null,
    null,
    null,
    // 0P0x0
    function(e, s, r) {
      var a = t.gprs, h = function() {
        return addr = a[e] - s;
      };
      return h.writesPC = !1, h;
    },
    // 0P0xW
    function(e, s, r) {
      var a = t.gprs, h = function() {
        var n = a[e] - s;
        return (!r || r()) && (a[e] = n), n;
      };
      return h.writesPC = e == t.PC, h;
    },
    null,
    null,
    // 0PUx0
    function(e, s, r) {
      var a = t.gprs, h = function() {
        return addr = a[e] + s;
      };
      return h.writesPC = !1, h;
    },
    // 0PUxW
    function(e, s, r) {
      var a = t.gprs, h = function() {
        var n = a[e] + s;
        return (!r || r()) && (a[e] = n), n;
      };
      return h.writesPC = e == t.PC, h;
    },
    null,
    null
  ], this.addressingMode23Register = [
    // I00x0
    function(e, s, r) {
      var a = t.gprs, h = function() {
        var n = a[e];
        return (!r || r()) && (a[e] -= a[s]), n;
      };
      return h.writesPC = e == t.PC, h;
    },
    // I00xW
    null,
    null,
    null,
    // I0Ux0
    function(e, s, r) {
      var a = t.gprs, h = function() {
        var n = a[e];
        return (!r || r()) && (a[e] += a[s]), n;
      };
      return h.writesPC = e == t.PC, h;
    },
    // I0UxW
    null,
    null,
    null,
    // IP0x0
    function(e, s, r) {
      var a = t.gprs, h = function() {
        return a[e] - a[s];
      };
      return h.writesPC = !1, h;
    },
    // IP0xW
    function(e, s, r) {
      var a = t.gprs, h = function() {
        var n = a[e] - a[s];
        return (!r || r()) && (a[e] = n), n;
      };
      return h.writesPC = e == t.PC, h;
    },
    null,
    null,
    // IPUx0
    function(e, s, r) {
      var a = t.gprs, h = function() {
        var n = a[e] + a[s];
        return n;
      };
      return h.writesPC = !1, h;
    },
    // IPUxW
    function(e, s, r) {
      var a = t.gprs, h = function() {
        var n = a[e] + a[s];
        return (!r || r()) && (a[e] = n), n;
      };
      return h.writesPC = e == t.PC, h;
    },
    null,
    null
  ], this.addressingMode2RegisterShifted = [
    // I00x0
    function(e, s, r) {
      var a = t.gprs, h = function() {
        var n = a[e];
        return (!r || r()) && (s(), a[e] -= t.shifterOperand), n;
      };
      return h.writesPC = e == t.PC, h;
    },
    // I00xW
    null,
    null,
    null,
    // I0Ux0
    function(e, s, r) {
      var a = t.gprs, h = function() {
        var n = a[e];
        return (!r || r()) && (s(), a[e] += t.shifterOperand), n;
      };
      return h.writesPC = e == t.PC, h;
    },
    // I0UxW
    null,
    null,
    null,
    // IP0x0
    function(e, s, r) {
      var a = t.gprs, h = function() {
        return s(), a[e] - t.shifterOperand;
      };
      return h.writesPC = !1, h;
    },
    // IP0xW
    function(e, s, r) {
      var a = t.gprs, h = function() {
        s();
        var n = a[e] - t.shifterOperand;
        return (!r || r()) && (a[e] = n), n;
      };
      return h.writesPC = e == t.PC, h;
    },
    null,
    null,
    // IPUx0
    function(e, s, r) {
      var a = t.gprs, h = function() {
        return s(), a[e] + t.shifterOperand;
      };
      return h.writesPC = !1, h;
    },
    // IPUxW
    function(e, s, r) {
      var a = t.gprs, h = function() {
        s();
        var n = a[e] + t.shifterOperand;
        return (!r || r()) && (a[e] = n), n;
      };
      return h.writePC = e == t.PC, h;
    },
    null,
    null
  ];
}
F.prototype.constructAddressingMode1ASR = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    ++s.cycles;
    var a = r[t];
    t == s.PC && (a += 4), a &= 255;
    var h = r[e];
    e == s.PC && (h += 4), a == 0 ? (s.shifterOperand = h, s.shifterCarryOut = s.cpsrC) : a < 32 ? (s.shifterOperand = h >> a, s.shifterCarryOut = h & 1 << a - 1) : r[e] >> 31 ? (s.shifterOperand = 4294967295, s.shifterCarryOut = 2147483648) : (s.shifterOperand = 0, s.shifterCarryOut = 0);
  };
};
F.prototype.constructAddressingMode1Immediate = function(t) {
  var e = this.cpu;
  return function() {
    e.shifterOperand = t, e.shifterCarryOut = e.cpsrC;
  };
};
F.prototype.constructAddressingMode1ImmediateRotate = function(t, e) {
  var s = this.cpu;
  return function() {
    s.shifterOperand = t >>> e | t << 32 - e, s.shifterCarryOut = s.shifterOperand >> 31;
  };
};
F.prototype.constructAddressingMode1LSL = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    ++s.cycles;
    var a = r[t];
    t == s.PC && (a += 4), a &= 255;
    var h = r[e];
    e == s.PC && (h += 4), a == 0 ? (s.shifterOperand = h, s.shifterCarryOut = s.cpsrC) : a < 32 ? (s.shifterOperand = h << a, s.shifterCarryOut = h & 1 << 32 - a) : a == 32 ? (s.shifterOperand = 0, s.shifterCarryOut = h & 1) : (s.shifterOperand = 0, s.shifterCarryOut = 0);
  };
};
F.prototype.constructAddressingMode1LSR = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    ++s.cycles;
    var a = r[t];
    t == s.PC && (a += 4), a &= 255;
    var h = r[e];
    e == s.PC && (h += 4), a == 0 ? (s.shifterOperand = h, s.shifterCarryOut = s.cpsrC) : a < 32 ? (s.shifterOperand = h >>> a, s.shifterCarryOut = h & 1 << a - 1) : a == 32 ? (s.shifterOperand = 0, s.shifterCarryOut = h >> 31) : (s.shifterOperand = 0, s.shifterCarryOut = 0);
  };
};
F.prototype.constructAddressingMode1ROR = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    ++s.cycles;
    var a = r[t];
    t == s.PC && (a += 4), a &= 255;
    var h = r[e];
    e == s.PC && (h += 4);
    var n = a & 31;
    a == 0 ? (s.shifterOperand = h, s.shifterCarryOut = s.cpsrC) : n ? (s.shifterOperand = r[e] >>> n | r[e] << 32 - n, s.shifterCarryOut = h & 1 << n - 1) : (s.shifterOperand = h, s.shifterCarryOut = h >> 31);
  };
};
F.prototype.constructAddressingMode23Immediate = function(t, e, s) {
  var r = (t & 983040) >> 16;
  return this.addressingMode23Immediate[(t & 27262976) >> 21](r, e, s);
};
F.prototype.constructAddressingMode23Register = function(t, e, s) {
  var r = (t & 983040) >> 16;
  return this.addressingMode23Register[(t & 27262976) >> 21](r, e, s);
};
F.prototype.constructAddressingMode2RegisterShifted = function(t, e, s) {
  var r = (t & 983040) >> 16;
  return this.addressingMode2RegisterShifted[(t & 27262976) >> 21](r, e, s);
};
F.prototype.constructAddressingMode4 = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    var a = r[e] + t;
    return a;
  };
};
F.prototype.constructAddressingMode4Writeback = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function(n) {
    var o = h[s] + t;
    return n && r && a.mmu.store32(h[s] + t - 4, h[s]), h[s] += e, o;
  };
};
F.prototype.constructADC = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      s();
      var n = (a.shifterOperand >>> 0) + !!a.cpsrC;
      h[t] = (h[e] >>> 0) + n;
    }
  };
};
F.prototype.constructADCS = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      s();
      var n = (a.shifterOperand >>> 0) + !!a.cpsrC, o = (h[e] >>> 0) + n;
      t == a.PC && a.hasSPSR() ? a.unpackCPSR(a.spsr) : (a.cpsrN = o >> 31, a.cpsrZ = !(o & 4294967295), a.cpsrC = o > 4294967295, a.cpsrV = h[e] >> 31 == n >> 31 && h[e] >> 31 != o >> 31 && n >> 31 != o >> 31), h[t] = o;
    }
  };
};
F.prototype.constructADD = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    a.mmu.waitPrefetch32(h[a.PC]), !(r && !r()) && (s(), h[t] = (h[e] >>> 0) + (a.shifterOperand >>> 0));
  };
};
F.prototype.constructADDS = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      s();
      var n = (h[e] >>> 0) + (a.shifterOperand >>> 0);
      t == a.PC && a.hasSPSR() ? a.unpackCPSR(a.spsr) : (a.cpsrN = n >> 31, a.cpsrZ = !(n & 4294967295), a.cpsrC = n > 4294967295, a.cpsrV = h[e] >> 31 == a.shifterOperand >> 31 && h[e] >> 31 != n >> 31 && a.shifterOperand >> 31 != n >> 31), h[t] = n;
    }
  };
};
F.prototype.constructAND = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    a.mmu.waitPrefetch32(h[a.PC]), !(r && !r()) && (s(), h[t] = h[e] & a.shifterOperand);
  };
};
F.prototype.constructANDS = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    a.mmu.waitPrefetch32(h[a.PC]), !(r && !r()) && (s(), h[t] = h[e] & a.shifterOperand, t == a.PC && a.hasSPSR() ? a.unpackCPSR(a.spsr) : (a.cpsrN = h[t] >> 31, a.cpsrZ = !(h[t] & 4294967295), a.cpsrC = a.shifterCarryOut));
  };
};
F.prototype.constructB = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    if (e && !e()) {
      s.mmu.waitPrefetch32(r[s.PC]);
      return;
    }
    s.mmu.waitPrefetch32(r[s.PC]), r[s.PC] += t;
  };
};
F.prototype.constructBIC = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    a.mmu.waitPrefetch32(h[a.PC]), !(r && !r()) && (s(), h[t] = h[e] & ~a.shifterOperand);
  };
};
F.prototype.constructBICS = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    a.mmu.waitPrefetch32(h[a.PC]), !(r && !r()) && (s(), h[t] = h[e] & ~a.shifterOperand, t == a.PC && a.hasSPSR() ? a.unpackCPSR(a.spsr) : (a.cpsrN = h[t] >> 31, a.cpsrZ = !(h[t] & 4294967295), a.cpsrC = a.shifterCarryOut));
  };
};
F.prototype.constructBL = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    if (e && !e()) {
      s.mmu.waitPrefetch32(r[s.PC]);
      return;
    }
    s.mmu.waitPrefetch32(r[s.PC]), r[s.LR] = r[s.PC] - 4, r[s.PC] += t;
  };
};
F.prototype.constructBX = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    if (e && !e()) {
      s.mmu.waitPrefetch32(r[s.PC]);
      return;
    }
    s.mmu.waitPrefetch32(r[s.PC]), s.switchExecMode(r[t] & 1), r[s.PC] = r[t] & 4294967294;
  };
};
F.prototype.constructCMN = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      s();
      var n = (h[e] >>> 0) + (a.shifterOperand >>> 0);
      a.cpsrN = n >> 31, a.cpsrZ = !(n & 4294967295), a.cpsrC = n > 4294967295, a.cpsrV = h[e] >> 31 == a.shifterOperand >> 31 && h[e] >> 31 != n >> 31 && a.shifterOperand >> 31 != n >> 31;
    }
  };
};
F.prototype.constructCMP = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      s();
      var n = h[e] - a.shifterOperand;
      a.cpsrN = n >> 31, a.cpsrZ = !(n & 4294967295), a.cpsrC = h[e] >>> 0 >= a.shifterOperand >>> 0, a.cpsrV = h[e] >> 31 != a.shifterOperand >> 31 && h[e] >> 31 != n >> 31;
    }
  };
};
F.prototype.constructEOR = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    a.mmu.waitPrefetch32(h[a.PC]), !(r && !r()) && (s(), h[t] = h[e] ^ a.shifterOperand);
  };
};
F.prototype.constructEORS = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    a.mmu.waitPrefetch32(h[a.PC]), !(r && !r()) && (s(), h[t] = h[e] ^ a.shifterOperand, t == a.PC && a.hasSPSR() ? a.unpackCPSR(a.spsr) : (a.cpsrN = h[t] >> 31, a.cpsrZ = !(h[t] & 4294967295), a.cpsrC = a.shifterCarryOut));
  };
};
F.prototype.constructLDM = function(t, e, s) {
  var r = this.cpu, a = r.gprs, h = r.mmu;
  return function() {
    if (h.waitPrefetch32(a[r.PC]), !(s && !s())) {
      var n = e(!1), o = 0, p, l;
      for (p = t, l = 0; p; p >>= 1, ++l)
        p & 1 && (a[l] = h.load32(n & 4294967292), n += 4, ++o);
      h.waitMulti32(n, o), ++r.cycles;
    }
  };
};
F.prototype.constructLDMS = function(t, e, s) {
  var r = this.cpu, a = r.gprs, h = r.mmu;
  return function() {
    if (h.waitPrefetch32(a[r.PC]), !(s && !s())) {
      var n = e(!1), o = 0, p = r.mode;
      r.switchMode(r.MODE_SYSTEM);
      var l, c;
      for (l = t, c = 0; l; l >>= 1, ++c)
        l & 1 && (a[c] = h.load32(n & 4294967292), n += 4, ++o);
      r.switchMode(p), h.waitMulti32(n, o), ++r.cycles;
    }
  };
};
F.prototype.constructLDR = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(s && !s())) {
      var h = e();
      a[t] = r.mmu.load32(h), r.mmu.wait32(h), ++r.cycles;
    }
  };
};
F.prototype.constructLDRB = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(s && !s())) {
      var h = e();
      a[t] = r.mmu.loadU8(h), r.mmu.wait(h), ++r.cycles;
    }
  };
};
F.prototype.constructLDRH = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(s && !s())) {
      var h = e();
      a[t] = r.mmu.loadU16(h), r.mmu.wait(h), ++r.cycles;
    }
  };
};
F.prototype.constructLDRSB = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(s && !s())) {
      var h = e();
      a[t] = r.mmu.load8(h), r.mmu.wait(h), ++r.cycles;
    }
  };
};
F.prototype.constructLDRSH = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(s && !s())) {
      var h = e();
      a[t] = r.mmu.load16(h), r.mmu.wait(h), ++r.cycles;
    }
  };
};
F.prototype.constructMLA = function(t, e, s, r, a) {
  var h = this.cpu, n = h.gprs;
  return function() {
    if (h.mmu.waitPrefetch32(n[h.PC]), !(a && !a()))
      if (++h.cycles, h.mmu.waitMul(s), n[r] & 4294901760 && n[s] & 4294901760) {
        var o = (n[r] & 4294901760) * n[s] & 4294967295, p = (n[r] & 65535) * n[s] & 4294967295;
        n[t] = o + p + n[e] & 4294967295;
      } else
        n[t] = n[r] * n[s] + n[e];
  };
};
F.prototype.constructMLAS = function(t, e, s, r, a) {
  var h = this.cpu, n = h.gprs;
  return function() {
    if (h.mmu.waitPrefetch32(n[h.PC]), !(a && !a())) {
      if (++h.cycles, h.mmu.waitMul(s), n[r] & 4294901760 && n[s] & 4294901760) {
        var o = (n[r] & 4294901760) * n[s] & 4294967295, p = (n[r] & 65535) * n[s] & 4294967295;
        n[t] = o + p + n[e] & 4294967295;
      } else
        n[t] = n[r] * n[s] + n[e];
      h.cpsrN = n[t] >> 31, h.cpsrZ = !(n[t] & 4294967295);
    }
  };
};
F.prototype.constructMOV = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    a.mmu.waitPrefetch32(h[a.PC]), !(r && !r()) && (s(), h[t] = a.shifterOperand);
  };
};
F.prototype.constructMOVS = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    a.mmu.waitPrefetch32(h[a.PC]), !(r && !r()) && (s(), h[t] = a.shifterOperand, t == a.PC && a.hasSPSR() ? a.unpackCPSR(a.spsr) : (a.cpsrN = h[t] >> 31, a.cpsrZ = !(h[t] & 4294967295), a.cpsrC = a.shifterCarryOut));
  };
};
F.prototype.constructMRS = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(s && !s()) && (e ? a[t] = r.spsr : a[t] = r.packCPSR());
  };
};
F.prototype.constructMSR = function(t, e, s, r, a) {
  var h = this.cpu, n = h.gprs, o = s & 65536, p = s & 524288;
  return function() {
    if (h.mmu.waitPrefetch32(n[h.PC]), !(a && !a())) {
      var l;
      s & 33554432 ? l = r : l = n[t];
      var c = (o ? 255 : 0) | //(x ? 0x0000FF00 : 0x00000000) | // Irrelevant on ARMv4T
      //(s ? 0x00FF0000 : 0x00000000) | // Irrelevant on ARMv4T
      (p ? 4278190080 : 0);
      e ? (c &= h.USER_MASK | h.PRIV_MASK | h.STATE_MASK, h.spsr = h.spsr & ~c | l & c) : (c & h.USER_MASK && (h.cpsrN = l >> 31, h.cpsrZ = l & 1073741824, h.cpsrC = l & 536870912, h.cpsrV = l & 268435456), h.mode != h.MODE_USER && c & h.PRIV_MASK && (h.switchMode(l & 15 | 16), h.cpsrI = l & 128, h.cpsrF = l & 64));
    }
  };
};
F.prototype.constructMUL = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r()))
      if (a.mmu.waitMul(h[e]), h[s] & 4294901760 && h[e] & 4294901760) {
        var n = (h[s] & 4294901760) * h[e] | 0, o = (h[s] & 65535) * h[e] | 0;
        h[t] = n + o;
      } else
        h[t] = h[s] * h[e];
  };
};
F.prototype.constructMULS = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      if (a.mmu.waitMul(h[e]), h[s] & 4294901760 && h[e] & 4294901760) {
        var n = (h[s] & 4294901760) * h[e] | 0, o = (h[s] & 65535) * h[e] | 0;
        h[t] = n + o;
      } else
        h[t] = h[s] * h[e];
      a.cpsrN = h[t] >> 31, a.cpsrZ = !(h[t] & 4294967295);
    }
  };
};
F.prototype.constructMVN = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    a.mmu.waitPrefetch32(h[a.PC]), !(r && !r()) && (s(), h[t] = ~a.shifterOperand);
  };
};
F.prototype.constructMVNS = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    a.mmu.waitPrefetch32(h[a.PC]), !(r && !r()) && (s(), h[t] = ~a.shifterOperand, t == a.PC && a.hasSPSR() ? a.unpackCPSR(a.spsr) : (a.cpsrN = h[t] >> 31, a.cpsrZ = !(h[t] & 4294967295), a.cpsrC = a.shifterCarryOut));
  };
};
F.prototype.constructORR = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    a.mmu.waitPrefetch32(h[a.PC]), !(r && !r()) && (s(), h[t] = h[e] | a.shifterOperand);
  };
};
F.prototype.constructORRS = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    a.mmu.waitPrefetch32(h[a.PC]), !(r && !r()) && (s(), h[t] = h[e] | a.shifterOperand, t == a.PC && a.hasSPSR() ? a.unpackCPSR(a.spsr) : (a.cpsrN = h[t] >> 31, a.cpsrZ = !(h[t] & 4294967295), a.cpsrC = a.shifterCarryOut));
  };
};
F.prototype.constructRSB = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    a.mmu.waitPrefetch32(h[a.PC]), !(r && !r()) && (s(), h[t] = a.shifterOperand - h[e]);
  };
};
F.prototype.constructRSBS = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      s();
      var n = a.shifterOperand - h[e];
      t == a.PC && a.hasSPSR() ? a.unpackCPSR(a.spsr) : (a.cpsrN = n >> 31, a.cpsrZ = !(n & 4294967295), a.cpsrC = a.shifterOperand >>> 0 >= h[e] >>> 0, a.cpsrV = a.shifterOperand >> 31 != h[e] >> 31 && a.shifterOperand >> 31 != n >> 31), h[t] = n;
    }
  };
};
F.prototype.constructRSC = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      s();
      var n = (h[e] >>> 0) + !a.cpsrC;
      h[t] = (a.shifterOperand >>> 0) - n;
    }
  };
};
F.prototype.constructRSCS = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      s();
      var n = (h[e] >>> 0) + !a.cpsrC, o = (a.shifterOperand >>> 0) - n;
      t == a.PC && a.hasSPSR() ? a.unpackCPSR(a.spsr) : (a.cpsrN = o >> 31, a.cpsrZ = !(o & 4294967295), a.cpsrC = a.shifterOperand >>> 0 >= o >>> 0, a.cpsrV = a.shifterOperand >> 31 != n >> 31 && a.shifterOperand >> 31 != o >> 31), h[t] = o;
    }
  };
};
F.prototype.constructSBC = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      s();
      var n = (a.shifterOperand >>> 0) + !a.cpsrC;
      h[t] = (h[e] >>> 0) - n;
    }
  };
};
F.prototype.constructSBCS = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      s();
      var n = (a.shifterOperand >>> 0) + !a.cpsrC, o = (h[e] >>> 0) - n;
      t == a.PC && a.hasSPSR() ? a.unpackCPSR(a.spsr) : (a.cpsrN = o >> 31, a.cpsrZ = !(o & 4294967295), a.cpsrC = h[e] >>> 0 >= o >>> 0, a.cpsrV = h[e] >> 31 != n >> 31 && h[e] >> 31 != o >> 31), h[t] = o;
    }
  };
};
F.prototype.constructSMLAL = function(t, e, s, r, a) {
  var h = this.cpu, n = 1 / 4294967296, o = h.gprs;
  return function() {
    if (h.mmu.waitPrefetch32(o[h.PC]), !(a && !a())) {
      h.cycles += 2, h.mmu.waitMul(s);
      var p = (o[r] & 4294901760) * o[s], l = (o[r] & 65535) * o[s], c = (o[e] >>> 0) + p + l;
      o[e] = c, o[t] += Math.floor(c * n);
    }
  };
};
F.prototype.constructSMLALS = function(t, e, s, r, a) {
  var h = this.cpu, n = 1 / 4294967296, o = h.gprs;
  return function() {
    if (h.mmu.waitPrefetch32(o[h.PC]), !(a && !a())) {
      h.cycles += 2, h.mmu.waitMul(s);
      var p = (o[r] & 4294901760) * o[s], l = (o[r] & 65535) * o[s], c = (o[e] >>> 0) + p + l;
      o[e] = c, o[t] += Math.floor(c * n), h.cpsrN = o[t] >> 31, h.cpsrZ = !(o[t] & 4294967295 || o[e] & 4294967295);
    }
  };
};
F.prototype.constructSMULL = function(t, e, s, r, a) {
  var h = this.cpu, n = 1 / 4294967296, o = h.gprs;
  return function() {
    if (h.mmu.waitPrefetch32(o[h.PC]), !(a && !a())) {
      ++h.cycles, h.mmu.waitMul(o[s]);
      var p = ((o[r] & 4294901760) >> 0) * (o[s] >> 0), l = ((o[r] & 65535) >> 0) * (o[s] >> 0);
      o[e] = (p & 4294967295) + (l & 4294967295) & 4294967295, o[t] = Math.floor(p * n + l * n);
    }
  };
};
F.prototype.constructSMULLS = function(t, e, s, r, a) {
  var h = this.cpu, n = 1 / 4294967296, o = h.gprs;
  return function() {
    if (h.mmu.waitPrefetch32(o[h.PC]), !(a && !a())) {
      ++h.cycles, h.mmu.waitMul(o[s]);
      var p = ((o[r] & 4294901760) >> 0) * (o[s] >> 0), l = ((o[r] & 65535) >> 0) * (o[s] >> 0);
      o[e] = (p & 4294967295) + (l & 4294967295) & 4294967295, o[t] = Math.floor(p * n + l * n), h.cpsrN = o[t] >> 31, h.cpsrZ = !(o[t] & 4294967295 || o[e] & 4294967295);
    }
  };
};
F.prototype.constructSTM = function(t, e, s) {
  var r = this.cpu, a = r.gprs, h = r.mmu;
  return function() {
    if (s && !s()) {
      h.waitPrefetch32(a[r.PC]);
      return;
    }
    h.wait32(a[r.PC]);
    var n = e(!0), o = 0, p, l;
    for (p = t, l = 0; p; p >>= 1, ++l)
      p & 1 && (h.store32(n, a[l]), n += 4, ++o);
    h.waitMulti32(n, o);
  };
};
F.prototype.constructSTMS = function(t, e, s) {
  var r = this.cpu, a = r.gprs, h = r.mmu;
  return function() {
    if (s && !s()) {
      h.waitPrefetch32(a[r.PC]);
      return;
    }
    h.wait32(a[r.PC]);
    var n = r.mode, o = e(!0), p = 0, l, c;
    for (r.switchMode(r.MODE_SYSTEM), l = t, c = 0; l; l >>= 1, ++c)
      l & 1 && (h.store32(o, a[c]), o += 4, ++p);
    r.switchMode(n), h.waitMulti32(o, p);
  };
};
F.prototype.constructSTR = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (s && !s()) {
      r.mmu.waitPrefetch32(a[r.PC]);
      return;
    }
    var h = e();
    r.mmu.store32(h, a[t]), r.mmu.wait32(h), r.mmu.wait32(a[r.PC]);
  };
};
F.prototype.constructSTRB = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (s && !s()) {
      r.mmu.waitPrefetch32(a[r.PC]);
      return;
    }
    var h = e();
    r.mmu.store8(h, a[t]), r.mmu.wait(h), r.mmu.wait32(a[r.PC]);
  };
};
F.prototype.constructSTRH = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (s && !s()) {
      r.mmu.waitPrefetch32(a[r.PC]);
      return;
    }
    var h = e();
    r.mmu.store16(h, a[t]), r.mmu.wait(h), r.mmu.wait32(a[r.PC]);
  };
};
F.prototype.constructSUB = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    a.mmu.waitPrefetch32(h[a.PC]), !(r && !r()) && (s(), h[t] = h[e] - a.shifterOperand);
  };
};
F.prototype.constructSUBS = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      s();
      var n = h[e] - a.shifterOperand;
      t == a.PC && a.hasSPSR() ? a.unpackCPSR(a.spsr) : (a.cpsrN = n >> 31, a.cpsrZ = !(n & 4294967295), a.cpsrC = h[e] >>> 0 >= a.shifterOperand >>> 0, a.cpsrV = h[e] >> 31 != a.shifterOperand >> 31 && h[e] >> 31 != n >> 31), h[t] = n;
    }
  };
};
F.prototype.constructSWI = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    if (e && !e()) {
      s.mmu.waitPrefetch32(r[s.PC]);
      return;
    }
    s.irq.swi32(t), s.mmu.waitPrefetch32(r[s.PC]);
  };
};
F.prototype.constructSWP = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      a.mmu.wait32(h[e]), a.mmu.wait32(h[e]);
      var n = a.mmu.load32(h[e]);
      a.mmu.store32(h[e], h[s]), h[t] = n, ++a.cycles;
    }
  };
};
F.prototype.constructSWPB = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      a.mmu.wait(h[e]), a.mmu.wait(h[e]);
      var n = a.mmu.load8(h[e]);
      a.mmu.store8(h[e], h[s]), h[t] = n, ++a.cycles;
    }
  };
};
F.prototype.constructTEQ = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      s();
      var n = h[e] ^ a.shifterOperand;
      a.cpsrN = n >> 31, a.cpsrZ = !(n & 4294967295), a.cpsrC = a.shifterCarryOut;
    }
  };
};
F.prototype.constructTST = function(t, e, s, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      s();
      var n = h[e] & a.shifterOperand;
      a.cpsrN = n >> 31, a.cpsrZ = !(n & 4294967295), a.cpsrC = a.shifterCarryOut;
    }
  };
};
F.prototype.constructUMLAL = function(t, e, s, r, a) {
  var h = this.cpu, n = 1 / 4294967296, o = h.gprs;
  return function() {
    if (h.mmu.waitPrefetch32(o[h.PC]), !(a && !a())) {
      h.cycles += 2, h.mmu.waitMul(s);
      var p = ((o[r] & 4294901760) >>> 0) * (o[s] >>> 0), l = (o[r] & 65535) * (o[s] >>> 0), c = (o[e] >>> 0) + p + l;
      o[e] = c, o[t] += c * n;
    }
  };
};
F.prototype.constructUMLALS = function(t, e, s, r, a) {
  var h = this.cpu, n = 1 / 4294967296, o = h.gprs;
  return function() {
    if (h.mmu.waitPrefetch32(o[h.PC]), !(a && !a())) {
      h.cycles += 2, h.mmu.waitMul(s);
      var p = ((o[r] & 4294901760) >>> 0) * (o[s] >>> 0), l = (o[r] & 65535) * (o[s] >>> 0), c = (o[e] >>> 0) + p + l;
      o[e] = c, o[t] += c * n, h.cpsrN = o[t] >> 31, h.cpsrZ = !(o[t] & 4294967295 || o[e] & 4294967295);
    }
  };
};
F.prototype.constructUMULL = function(t, e, s, r, a) {
  var h = this.cpu, n = 1 / 4294967296, o = h.gprs;
  return function() {
    if (h.mmu.waitPrefetch32(o[h.PC]), !(a && !a())) {
      ++h.cycles, h.mmu.waitMul(o[s]);
      var p = ((o[r] & 4294901760) >>> 0) * (o[s] >>> 0), l = ((o[r] & 65535) >>> 0) * (o[s] >>> 0);
      o[e] = (p & 4294967295) + (l & 4294967295) & 4294967295, o[t] = p * n + l * n >>> 0;
    }
  };
};
F.prototype.constructUMULLS = function(t, e, s, r, a) {
  var h = this.cpu, n = 1 / 4294967296, o = h.gprs;
  return function() {
    if (h.mmu.waitPrefetch32(o[h.PC]), !(a && !a())) {
      ++h.cycles, h.mmu.waitMul(o[s]);
      var p = ((o[r] & 4294901760) >>> 0) * (o[s] >>> 0), l = ((o[r] & 65535) >>> 0) * (o[s] >>> 0);
      o[e] = (p & 4294967295) + (l & 4294967295) & 4294967295, o[t] = p * n + l * n >>> 0, h.cpsrN = o[t] >> 31, h.cpsrZ = !(o[t] & 4294967295 || o[e] & 4294967295);
    }
  };
};
function x(t) {
  this.cpu = t;
}
x.prototype.constructADC = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]);
    var a = (r[e] >>> 0) + !!s.cpsrC, h = r[t], n = (h >>> 0) + a, o = h >> 31, p = n >> 31, l = a >> 31;
    s.cpsrN = p, s.cpsrZ = !(n & 4294967295), s.cpsrC = n > 4294967295, s.cpsrV = o == l && o != p && l != p, r[t] = n;
  };
};
x.prototype.constructADD1 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch(a[r.PC]);
    var h = (a[e] >>> 0) + s;
    r.cpsrN = h >> 31, r.cpsrZ = !(h & 4294967295), r.cpsrC = h > 4294967295, r.cpsrV = !(a[e] >> 31) && (a[e] >> 31 ^ h) >> 31 && h >> 31, a[t] = h;
  };
};
x.prototype.constructADD2 = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]);
    var a = (r[t] >>> 0) + e;
    s.cpsrN = a >> 31, s.cpsrZ = !(a & 4294967295), s.cpsrC = a > 4294967295, s.cpsrV = !(r[t] >> 31) && (r[t] ^ a) >> 31 && (e ^ a) >> 31, r[t] = a;
  };
};
x.prototype.constructADD3 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch(a[r.PC]);
    var h = (a[e] >>> 0) + (a[s] >>> 0);
    r.cpsrN = h >> 31, r.cpsrZ = !(h & 4294967295), r.cpsrC = h > 4294967295, r.cpsrV = !((a[e] ^ a[s]) >> 31) && (a[e] ^ h) >> 31 && (a[s] ^ h) >> 31, a[t] = h;
  };
};
x.prototype.constructADD4 = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]), r[t] += r[e];
  };
};
x.prototype.constructADD5 = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]), r[t] = (r[s.PC] & 4294967292) + e;
  };
};
x.prototype.constructADD6 = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]), r[t] = r[s.SP] + e;
  };
};
x.prototype.constructADD7 = function(t) {
  var e = this.cpu, s = e.gprs;
  return function() {
    e.mmu.waitPrefetch(s[e.PC]), s[e.SP] += t;
  };
};
x.prototype.constructAND = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]), r[t] = r[t] & r[e], s.cpsrN = r[t] >> 31, s.cpsrZ = !(r[t] & 4294967295);
  };
};
x.prototype.constructASR1 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch(a[r.PC]), s == 0 ? (r.cpsrC = a[e] >> 31, r.cpsrC ? a[t] = 4294967295 : a[t] = 0) : (r.cpsrC = a[e] & 1 << s - 1, a[t] = a[e] >> s), r.cpsrN = a[t] >> 31, r.cpsrZ = !(a[t] & 4294967295);
  };
};
x.prototype.constructASR2 = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]);
    var a = r[e] & 255;
    a && (a < 32 ? (s.cpsrC = r[t] & 1 << a - 1, r[t] >>= a) : (s.cpsrC = r[t] >> 31, s.cpsrC ? r[t] = 4294967295 : r[t] = 0)), s.cpsrN = r[t] >> 31, s.cpsrZ = !(r[t] & 4294967295);
  };
};
x.prototype.constructB1 = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]), e() && (r[s.PC] += t);
  };
};
x.prototype.constructB2 = function(t) {
  var e = this.cpu, s = e.gprs;
  return function() {
    e.mmu.waitPrefetch(s[e.PC]), s[e.PC] += t;
  };
};
x.prototype.constructBIC = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]), r[t] = r[t] & ~r[e], s.cpsrN = r[t] >> 31, s.cpsrZ = !(r[t] & 4294967295);
  };
};
x.prototype.constructBL1 = function(t) {
  var e = this.cpu, s = e.gprs;
  return function() {
    e.mmu.waitPrefetch(s[e.PC]), s[e.LR] = s[e.PC] + t;
  };
};
x.prototype.constructBL2 = function(t) {
  var e = this.cpu, s = e.gprs;
  return function() {
    e.mmu.waitPrefetch(s[e.PC]);
    var r = s[e.PC];
    s[e.PC] = s[e.LR] + (t << 1), s[e.LR] = r - 1;
  };
};
x.prototype.constructBX = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]), s.switchExecMode(r[e] & 1);
    var a = 0;
    e == 15 && (a = r[e] & 2), r[s.PC] = r[e] & 4294967294 - a;
  };
};
x.prototype.constructCMN = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]);
    var a = (r[t] >>> 0) + (r[e] >>> 0);
    s.cpsrN = a >> 31, s.cpsrZ = !(a & 4294967295), s.cpsrC = a > 4294967295, s.cpsrV = r[t] >> 31 == r[e] >> 31 && r[t] >> 31 != a >> 31 && r[e] >> 31 != a >> 31;
  };
};
x.prototype.constructCMP1 = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]);
    var a = r[t] - e;
    s.cpsrN = a >> 31, s.cpsrZ = !(a & 4294967295), s.cpsrC = r[t] >>> 0 >= e, s.cpsrV = r[t] >> 31 && (r[t] ^ a) >> 31;
  };
};
x.prototype.constructCMP2 = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]);
    var a = r[t], h = r[e], n = a - h, o = n >> 31, p = a >> 31;
    s.cpsrN = o, s.cpsrZ = !(n & 4294967295), s.cpsrC = a >>> 0 >= h >>> 0, s.cpsrV = p != h >> 31 && p != o;
  };
};
x.prototype.constructCMP3 = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]);
    var a = r[t] - r[e];
    s.cpsrN = a >> 31, s.cpsrZ = !(a & 4294967295), s.cpsrC = r[t] >>> 0 >= r[e] >>> 0, s.cpsrV = (r[t] ^ r[e]) >> 31 && (r[t] ^ a) >> 31;
  };
};
x.prototype.constructEOR = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]), r[t] = r[t] ^ r[e], s.cpsrN = r[t] >> 31, s.cpsrZ = !(r[t] & 4294967295);
  };
};
x.prototype.constructLDMIA = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]);
    var a = r[t], h = 0, n, o;
    for (n = 1, o = 0; o < 8; n <<= 1, ++o)
      e & n && (r[o] = s.mmu.load32(a), a += 4, ++h);
    s.mmu.waitMulti32(a, h), 1 << t & e || (r[t] = a);
  };
};
x.prototype.constructLDR1 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch(a[r.PC]);
    var h = a[e] + s;
    a[t] = r.mmu.load32(h), r.mmu.wait32(h), ++r.cycles;
  };
};
x.prototype.constructLDR2 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch(a[r.PC]), a[t] = r.mmu.load32(a[e] + a[s]), r.mmu.wait32(a[e] + a[s]), ++r.cycles;
  };
};
x.prototype.constructLDR3 = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]), r[t] = s.mmu.load32((r[s.PC] & 4294967292) + e), s.mmu.wait32(r[s.PC]), ++s.cycles;
  };
};
x.prototype.constructLDR4 = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]), r[t] = s.mmu.load32(r[s.SP] + e), s.mmu.wait32(r[s.SP] + e), ++s.cycles;
  };
};
x.prototype.constructLDRB1 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    var h = a[e] + s;
    r.mmu.waitPrefetch(a[r.PC]), a[t] = r.mmu.loadU8(h), r.mmu.wait(h), ++r.cycles;
  };
};
x.prototype.constructLDRB2 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch(a[r.PC]), a[t] = r.mmu.loadU8(a[e] + a[s]), r.mmu.wait(a[e] + a[s]), ++r.cycles;
  };
};
x.prototype.constructLDRH1 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    var h = a[e] + s;
    r.mmu.waitPrefetch(a[r.PC]), a[t] = r.mmu.loadU16(h), r.mmu.wait(h), ++r.cycles;
  };
};
x.prototype.constructLDRH2 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch(a[r.PC]), a[t] = r.mmu.loadU16(a[e] + a[s]), r.mmu.wait(a[e] + a[s]), ++r.cycles;
  };
};
x.prototype.constructLDRSB = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch(a[r.PC]), a[t] = r.mmu.load8(a[e] + a[s]), r.mmu.wait(a[e] + a[s]), ++r.cycles;
  };
};
x.prototype.constructLDRSH = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch(a[r.PC]), a[t] = r.mmu.load16(a[e] + a[s]), r.mmu.wait(a[e] + a[s]), ++r.cycles;
  };
};
x.prototype.constructLSL1 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch(a[r.PC]), s == 0 ? a[t] = a[e] : (r.cpsrC = a[e] & 1 << 32 - s, a[t] = a[e] << s), r.cpsrN = a[t] >> 31, r.cpsrZ = !(a[t] & 4294967295);
  };
};
x.prototype.constructLSL2 = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]);
    var a = r[e] & 255;
    a && (a < 32 ? (s.cpsrC = r[t] & 1 << 32 - a, r[t] <<= a) : (a > 32 ? s.cpsrC = 0 : s.cpsrC = r[t] & 1, r[t] = 0)), s.cpsrN = r[t] >> 31, s.cpsrZ = !(r[t] & 4294967295);
  };
};
x.prototype.constructLSR1 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch(a[r.PC]), s == 0 ? (r.cpsrC = a[e] >> 31, a[t] = 0) : (r.cpsrC = a[e] & 1 << s - 1, a[t] = a[e] >>> s), r.cpsrN = 0, r.cpsrZ = !(a[t] & 4294967295);
  };
};
x.prototype.constructLSR2 = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]);
    var a = r[e] & 255;
    a && (a < 32 ? (s.cpsrC = r[t] & 1 << a - 1, r[t] >>>= a) : (a > 32 ? s.cpsrC = 0 : s.cpsrC = r[t] >> 31, r[t] = 0)), s.cpsrN = r[t] >> 31, s.cpsrZ = !(r[t] & 4294967295);
  };
};
x.prototype.constructMOV1 = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]), r[t] = e, s.cpsrN = e >> 31, s.cpsrZ = !(e & 4294967295);
  };
};
x.prototype.constructMOV2 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch(a[r.PC]);
    var h = a[e];
    r.cpsrN = h >> 31, r.cpsrZ = !(h & 4294967295), r.cpsrC = 0, r.cpsrV = 0, a[t] = h;
  };
};
x.prototype.constructMOV3 = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]), r[t] = r[e];
  };
};
x.prototype.constructMUL = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    if (s.mmu.waitPrefetch(r[s.PC]), s.mmu.waitMul(r[e]), r[e] & 4294901760 && r[t] & 4294901760) {
      var a = (r[t] & 4294901760) * r[e] & 4294967295, h = (r[t] & 65535) * r[e] & 4294967295;
      r[t] = a + h & 4294967295;
    } else
      r[t] *= r[e];
    s.cpsrN = r[t] >> 31, s.cpsrZ = !(r[t] & 4294967295);
  };
};
x.prototype.constructMVN = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]), r[t] = ~r[e], s.cpsrN = r[t] >> 31, s.cpsrZ = !(r[t] & 4294967295);
  };
};
x.prototype.constructNEG = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]);
    var a = -r[e];
    s.cpsrN = a >> 31, s.cpsrZ = !(a & 4294967295), s.cpsrC = 0 >= a >>> 0, s.cpsrV = r[e] >> 31 && a >> 31, r[t] = a;
  };
};
x.prototype.constructORR = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]), r[t] = r[t] | r[e], s.cpsrN = r[t] >> 31, s.cpsrZ = !(r[t] & 4294967295);
  };
};
x.prototype.constructPOP = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]), ++s.cycles;
    var a = r[s.SP], h = 0, n, o;
    for (n = 1, o = 0; o < 8; n <<= 1, ++o)
      t & n && (s.mmu.waitSeq32(a), r[o] = s.mmu.load32(a), a += 4, ++h);
    e && (r[s.PC] = s.mmu.load32(a) & 4294967294, a += 4, ++h), s.mmu.waitMulti32(a, h), r[s.SP] = a;
  };
};
x.prototype.constructPUSH = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    var a = r[s.SP] - 4, h = 0;
    s.mmu.waitPrefetch(r[s.PC]), e && (s.mmu.store32(a, r[s.LR]), a -= 4, ++h);
    var n, o;
    for (n = 128, o = 7; n; n >>= 1, --o)
      if (t & n) {
        s.mmu.store32(a, r[o]), a -= 4, ++h;
        break;
      }
    for (n >>= 1, --o; n; n >>= 1, --o)
      t & n && (s.mmu.store32(a, r[o]), a -= 4, ++h);
    s.mmu.waitMulti32(a, h), r[s.SP] = a + 4;
  };
};
x.prototype.constructROR = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]);
    var a = r[e] & 255;
    if (a) {
      var h = a & 31;
      h > 0 ? (s.cpsrC = r[t] & 1 << h - 1, r[t] = r[t] >>> h | r[t] << 32 - h) : s.cpsrC = r[t] >> 31;
    }
    s.cpsrN = r[t] >> 31, s.cpsrZ = !(r[t] & 4294967295);
  };
};
x.prototype.constructSBC = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]);
    var a = (r[e] >>> 0) + !s.cpsrC, h = (r[t] >>> 0) - a;
    s.cpsrN = h >> 31, s.cpsrZ = !(h & 4294967295), s.cpsrC = r[t] >>> 0 >= h >>> 0, s.cpsrV = (r[t] ^ a) >> 31 && (r[t] ^ h) >> 31, r[t] = h;
  };
};
x.prototype.constructSTMIA = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.wait(r[s.PC]);
    var a = r[t], h = 0, n, o;
    for (n = 1, o = 0; o < 8; n <<= 1, ++o)
      if (e & n) {
        s.mmu.store32(a, r[o]), a += 4, ++h;
        break;
      }
    for (n <<= 1, ++o; o < 8; n <<= 1, ++o)
      e & n && (s.mmu.store32(a, r[o]), a += 4, ++h);
    s.mmu.waitMulti32(a, h), r[t] = a;
  };
};
x.prototype.constructSTR1 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    var h = a[e] + s;
    r.mmu.store32(h, a[t]), r.mmu.wait(a[r.PC]), r.mmu.wait32(h);
  };
};
x.prototype.constructSTR2 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.store32(a[e] + a[s], a[t]), r.mmu.wait(a[r.PC]), r.mmu.wait32(a[e] + a[s]);
  };
};
x.prototype.constructSTR3 = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.store32(r[s.SP] + e, r[t]), s.mmu.wait(r[s.PC]), s.mmu.wait32(r[s.SP] + e);
  };
};
x.prototype.constructSTRB1 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    var h = a[e] + s;
    r.mmu.store8(h, a[t]), r.mmu.wait(a[r.PC]), r.mmu.wait(h);
  };
};
x.prototype.constructSTRB2 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.store8(a[e] + a[s], a[t]), r.mmu.wait(a[r.PC]), r.mmu.wait(a[e] + a[s]);
  };
};
x.prototype.constructSTRH1 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    var h = a[e] + s;
    r.mmu.store16(h, a[t]), r.mmu.wait(a[r.PC]), r.mmu.wait(h);
  };
};
x.prototype.constructSTRH2 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.store16(a[e] + a[s], a[t]), r.mmu.wait(a[r.PC]), r.mmu.wait(a[e] + a[s]);
  };
};
x.prototype.constructSUB1 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch(a[r.PC]);
    var h = a[e] - s;
    r.cpsrN = h >> 31, r.cpsrZ = !(h & 4294967295), r.cpsrC = a[e] >>> 0 >= s, r.cpsrV = a[e] >> 31 && (a[e] ^ h) >> 31, a[t] = h;
  };
};
x.prototype.constructSUB2 = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]);
    var a = r[t] - e;
    s.cpsrN = a >> 31, s.cpsrZ = !(a & 4294967295), s.cpsrC = r[t] >>> 0 >= e, s.cpsrV = r[t] >> 31 && (r[t] ^ a) >> 31, r[t] = a;
  };
};
x.prototype.constructSUB3 = function(t, e, s) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch(a[r.PC]);
    var h = a[e] - a[s];
    r.cpsrN = h >> 31, r.cpsrZ = !(h & 4294967295), r.cpsrC = a[e] >>> 0 >= a[s] >>> 0, r.cpsrV = a[e] >> 31 != a[s] >> 31 && a[e] >> 31 != h >> 31, a[t] = h;
  };
};
x.prototype.constructSWI = function(t) {
  var e = this.cpu, s = e.gprs;
  return function() {
    e.irq.swi(t), e.mmu.waitPrefetch(s[e.PC]);
  };
};
x.prototype.constructTST = function(t, e) {
  var s = this.cpu, r = s.gprs;
  return function() {
    s.mmu.waitPrefetch(r[s.PC]);
    var a = r[t] & r[e];
    s.cpsrN = a >> 31, s.cpsrZ = !(a & 4294967295);
  };
};
function N() {
  this.SP = 13, this.LR = 14, this.PC = 15, this.MODE_ARM = 0, this.MODE_THUMB = 1, this.MODE_USER = 16, this.MODE_FIQ = 17, this.MODE_IRQ = 18, this.MODE_SUPERVISOR = 19, this.MODE_ABORT = 23, this.MODE_UNDEFINED = 27, this.MODE_SYSTEM = 31, this.BANK_NONE = 0, this.BANK_FIQ = 1, this.BANK_IRQ = 2, this.BANK_SUPERVISOR = 3, this.BANK_ABORT = 4, this.BANK_UNDEFINED = 5, this.UNALLOC_MASK = 268435200, this.USER_MASK = 4026531840, this.PRIV_MASK = 207, this.STATE_MASK = 32, this.WORD_SIZE_ARM = 4, this.WORD_SIZE_THUMB = 2, this.BASE_RESET = 0, this.BASE_UNDEF = 4, this.BASE_SWI = 8, this.BASE_PABT = 12, this.BASE_DABT = 16, this.BASE_IRQ = 24, this.BASE_FIQ = 28, this.armCompiler = new F(this), this.thumbCompiler = new x(this), this.generateConds(), this.gprs = new Int32Array(16);
}
N.prototype.resetCPU = function(t) {
  for (var e = 0; e < this.PC; ++e)
    this.gprs[e] = 0;
  this.gprs[this.PC] = t + this.WORD_SIZE_ARM, this.loadInstruction = this.loadInstructionArm, this.execMode = this.MODE_ARM, this.instructionWidth = this.WORD_SIZE_ARM, this.mode = this.MODE_SYSTEM, this.cpsrI = !1, this.cpsrF = !1, this.cpsrV = !1, this.cpsrC = !1, this.cpsrZ = !1, this.cpsrN = !1, this.bankedRegisters = [
    new Int32Array(7),
    new Int32Array(7),
    new Int32Array(2),
    new Int32Array(2),
    new Int32Array(2),
    new Int32Array(2)
  ], this.spsr = 0, this.bankedSPSRs = new Int32Array(6), this.cycles = 0, this.shifterOperand = 0, this.shifterCarryOut = 0, this.page = null, this.pageId = 0, this.pageRegion = -1, this.instruction = null, this.irq.clear();
  var s = this.gprs, r = this.mmu;
  this.step = function() {
    var a = this.instruction || (this.instruction = this.loadInstruction(s[this.PC] - this.instructionWidth));
    if (s[this.PC] += this.instructionWidth, this.conditionPassed = !0, a(), !a.writesPC)
      this.instruction != null && ((a.next == null || a.next.page.invalid) && (a.next = this.loadInstruction(s[this.PC] - this.instructionWidth)), this.instruction = a.next);
    else if (this.conditionPassed) {
      var h = s[this.PC] &= 4294967294;
      this.execMode == this.MODE_ARM ? (r.wait32(h), r.waitPrefetch32(h)) : (r.wait(h), r.waitPrefetch(h)), s[this.PC] += this.instructionWidth, a.fixedJump ? this.instruction != null && ((a.next == null || a.next.page.invalid) && (a.next = this.loadInstruction(s[this.PC] - this.instructionWidth)), this.instruction = a.next) : this.instruction = null;
    } else
      this.instruction = null;
    this.irq.updateTimers();
  };
};
N.prototype.freeze = function() {
  return {
    gprs: [
      this.gprs[0],
      this.gprs[1],
      this.gprs[2],
      this.gprs[3],
      this.gprs[4],
      this.gprs[5],
      this.gprs[6],
      this.gprs[7],
      this.gprs[8],
      this.gprs[9],
      this.gprs[10],
      this.gprs[11],
      this.gprs[12],
      this.gprs[13],
      this.gprs[14],
      this.gprs[15]
    ],
    mode: this.mode,
    cpsrI: this.cpsrI,
    cpsrF: this.cpsrF,
    cpsrV: this.cpsrV,
    cpsrC: this.cpsrC,
    cpsrZ: this.cpsrZ,
    cpsrN: this.cpsrN,
    bankedRegisters: [
      [
        this.bankedRegisters[0][0],
        this.bankedRegisters[0][1],
        this.bankedRegisters[0][2],
        this.bankedRegisters[0][3],
        this.bankedRegisters[0][4],
        this.bankedRegisters[0][5],
        this.bankedRegisters[0][6]
      ],
      [
        this.bankedRegisters[1][0],
        this.bankedRegisters[1][1],
        this.bankedRegisters[1][2],
        this.bankedRegisters[1][3],
        this.bankedRegisters[1][4],
        this.bankedRegisters[1][5],
        this.bankedRegisters[1][6]
      ],
      [
        this.bankedRegisters[2][0],
        this.bankedRegisters[2][1]
      ],
      [
        this.bankedRegisters[3][0],
        this.bankedRegisters[3][1]
      ],
      [
        this.bankedRegisters[4][0],
        this.bankedRegisters[4][1]
      ],
      [
        this.bankedRegisters[5][0],
        this.bankedRegisters[5][1]
      ]
    ],
    spsr: this.spsr,
    bankedSPSRs: [
      this.bankedSPSRs[0],
      this.bankedSPSRs[1],
      this.bankedSPSRs[2],
      this.bankedSPSRs[3],
      this.bankedSPSRs[4],
      this.bankedSPSRs[5]
    ],
    cycles: this.cycles
  };
};
N.prototype.defrost = function(t) {
  this.instruction = null, this.page = null, this.pageId = 0, this.pageRegion = -1, this.gprs[0] = t.gprs[0], this.gprs[1] = t.gprs[1], this.gprs[2] = t.gprs[2], this.gprs[3] = t.gprs[3], this.gprs[4] = t.gprs[4], this.gprs[5] = t.gprs[5], this.gprs[6] = t.gprs[6], this.gprs[7] = t.gprs[7], this.gprs[8] = t.gprs[8], this.gprs[9] = t.gprs[9], this.gprs[10] = t.gprs[10], this.gprs[11] = t.gprs[11], this.gprs[12] = t.gprs[12], this.gprs[13] = t.gprs[13], this.gprs[14] = t.gprs[14], this.gprs[15] = t.gprs[15], this.mode = t.mode, this.cpsrI = t.cpsrI, this.cpsrF = t.cpsrF, this.cpsrV = t.cpsrV, this.cpsrC = t.cpsrC, this.cpsrZ = t.cpsrZ, this.cpsrN = t.cpsrN, this.bankedRegisters[0][0] = t.bankedRegisters[0][0], this.bankedRegisters[0][1] = t.bankedRegisters[0][1], this.bankedRegisters[0][2] = t.bankedRegisters[0][2], this.bankedRegisters[0][3] = t.bankedRegisters[0][3], this.bankedRegisters[0][4] = t.bankedRegisters[0][4], this.bankedRegisters[0][5] = t.bankedRegisters[0][5], this.bankedRegisters[0][6] = t.bankedRegisters[0][6], this.bankedRegisters[1][0] = t.bankedRegisters[1][0], this.bankedRegisters[1][1] = t.bankedRegisters[1][1], this.bankedRegisters[1][2] = t.bankedRegisters[1][2], this.bankedRegisters[1][3] = t.bankedRegisters[1][3], this.bankedRegisters[1][4] = t.bankedRegisters[1][4], this.bankedRegisters[1][5] = t.bankedRegisters[1][5], this.bankedRegisters[1][6] = t.bankedRegisters[1][6], this.bankedRegisters[2][0] = t.bankedRegisters[2][0], this.bankedRegisters[2][1] = t.bankedRegisters[2][1], this.bankedRegisters[3][0] = t.bankedRegisters[3][0], this.bankedRegisters[3][1] = t.bankedRegisters[3][1], this.bankedRegisters[4][0] = t.bankedRegisters[4][0], this.bankedRegisters[4][1] = t.bankedRegisters[4][1], this.bankedRegisters[5][0] = t.bankedRegisters[5][0], this.bankedRegisters[5][1] = t.bankedRegisters[5][1], this.spsr = t.spsr, this.bankedSPSRs[0] = t.bankedSPSRs[0], this.bankedSPSRs[1] = t.bankedSPSRs[1], this.bankedSPSRs[2] = t.bankedSPSRs[2], this.bankedSPSRs[3] = t.bankedSPSRs[3], this.bankedSPSRs[4] = t.bankedSPSRs[4], this.bankedSPSRs[5] = t.bankedSPSRs[5], this.cycles = t.cycles;
};
N.prototype.fetchPage = function(t) {
  var e = t >> this.mmu.BASE_OFFSET, s = this.mmu.addressToPage(e, t & this.mmu.OFFSET_MASK);
  if (e == this.pageRegion) {
    if (s == this.pageId && !this.page.invalid)
      return;
    this.pageId = s;
  } else
    this.pageMask = this.mmu.memory[e].PAGE_MASK, this.pageRegion = e, this.pageId = s;
  this.page = this.mmu.accessPage(e, s);
};
N.prototype.loadInstructionArm = function(t) {
  var e = null;
  this.fetchPage(t);
  var s = (t & this.pageMask) >> 2;
  if (e = this.page.arm[s], e)
    return e;
  var r = this.mmu.load32(t) >>> 0;
  return e = this.compileArm(r), e.next = null, e.page = this.page, e.address = t, e.opcode = r, this.page.arm[s] = e, e;
};
N.prototype.loadInstructionThumb = function(t) {
  var e = null;
  this.fetchPage(t);
  var s = (t & this.pageMask) >> 1;
  if (e = this.page.thumb[s], e)
    return e;
  var r = this.mmu.load16(t);
  return e = this.compileThumb(r), e.next = null, e.page = this.page, e.address = t, e.opcode = r, this.page.thumb[s] = e, e;
};
N.prototype.selectBank = function(t) {
  switch (t) {
    case this.MODE_USER:
    case this.MODE_SYSTEM:
      return this.BANK_NONE;
    case this.MODE_FIQ:
      return this.BANK_FIQ;
    case this.MODE_IRQ:
      return this.BANK_IRQ;
    case this.MODE_SUPERVISOR:
      return this.BANK_SUPERVISOR;
    case this.MODE_ABORT:
      return this.BANK_ABORT;
    case this.MODE_UNDEFINED:
      return this.BANK_UNDEFINED;
    default:
      throw "Invalid user mode passed to selectBank";
  }
};
N.prototype.switchExecMode = function(t) {
  this.execMode != t && (this.execMode = t, t == this.MODE_ARM ? (this.instructionWidth = this.WORD_SIZE_ARM, this.loadInstruction = this.loadInstructionArm) : (this.instructionWidth = this.WORD_SIZE_THUMB, this.loadInstruction = this.loadInstructionThumb));
};
N.prototype.switchMode = function(t) {
  if (t != this.mode) {
    if (t != this.MODE_USER || t != this.MODE_SYSTEM) {
      var e = this.selectBank(t), s = this.selectBank(this.mode);
      if (e != s) {
        if (t == this.MODE_FIQ || this.mode == this.MODE_FIQ) {
          var r = (s == this.BANK_FIQ) + 0, a = (e == this.BANK_FIQ) + 0;
          this.bankedRegisters[r][2] = this.gprs[8], this.bankedRegisters[r][3] = this.gprs[9], this.bankedRegisters[r][4] = this.gprs[10], this.bankedRegisters[r][5] = this.gprs[11], this.bankedRegisters[r][6] = this.gprs[12], this.gprs[8] = this.bankedRegisters[a][2], this.gprs[9] = this.bankedRegisters[a][3], this.gprs[10] = this.bankedRegisters[a][4], this.gprs[11] = this.bankedRegisters[a][5], this.gprs[12] = this.bankedRegisters[a][6];
        }
        this.bankedRegisters[s][0] = this.gprs[this.SP], this.bankedRegisters[s][1] = this.gprs[this.LR], this.gprs[this.SP] = this.bankedRegisters[e][0], this.gprs[this.LR] = this.bankedRegisters[e][1], this.bankedSPSRs[s] = this.spsr, this.spsr = this.bankedSPSRs[e];
      }
    }
    this.mode = t;
  }
};
N.prototype.packCPSR = function() {
  return this.mode | !!this.execMode << 5 | !!this.cpsrF << 6 | !!this.cpsrI << 7 | !!this.cpsrN << 31 | !!this.cpsrZ << 30 | !!this.cpsrC << 29 | !!this.cpsrV << 28;
};
N.prototype.unpackCPSR = function(t) {
  this.switchMode(t & 31), this.switchExecMode(!!(t & 32)), this.cpsrF = t & 64, this.cpsrI = t & 128, this.cpsrN = t & 2147483648, this.cpsrZ = t & 1073741824, this.cpsrC = t & 536870912, this.cpsrV = t & 268435456, this.irq.testIRQ();
};
N.prototype.hasSPSR = function() {
  return this.mode != this.MODE_SYSTEM && this.mode != this.MODE_USER;
};
N.prototype.raiseIRQ = function() {
  if (!this.cpsrI) {
    var t = this.packCPSR(), e = this.instructionWidth;
    this.switchMode(this.MODE_IRQ), this.spsr = t, this.gprs[this.LR] = this.gprs[this.PC] - e + 4, this.gprs[this.PC] = this.BASE_IRQ + this.WORD_SIZE_ARM, this.instruction = null, this.switchExecMode(this.MODE_ARM), this.cpsrI = !0;
  }
};
N.prototype.raiseTrap = function() {
  var t = this.packCPSR(), e = this.instructionWidth;
  this.switchMode(this.MODE_SUPERVISOR), this.spsr = t, this.gprs[this.LR] = this.gprs[this.PC] - e, this.gprs[this.PC] = this.BASE_SWI + this.WORD_SIZE_ARM, this.instruction = null, this.switchExecMode(this.MODE_ARM), this.cpsrI = !0;
};
N.prototype.badOp = function(t) {
  var e = function() {
    throw "Illegal instruction: 0x" + t.toString(16);
  };
  return e.writesPC = !0, e.fixedJump = !1, e;
};
N.prototype.generateConds = function() {
  var t = this;
  this.conds = [
    // EQ
    function() {
      return t.conditionPassed = t.cpsrZ;
    },
    // NE
    function() {
      return t.conditionPassed = !t.cpsrZ;
    },
    // CS
    function() {
      return t.conditionPassed = t.cpsrC;
    },
    // CC
    function() {
      return t.conditionPassed = !t.cpsrC;
    },
    // MI
    function() {
      return t.conditionPassed = t.cpsrN;
    },
    // PL
    function() {
      return t.conditionPassed = !t.cpsrN;
    },
    // VS
    function() {
      return t.conditionPassed = t.cpsrV;
    },
    // VC
    function() {
      return t.conditionPassed = !t.cpsrV;
    },
    // HI
    function() {
      return t.conditionPassed = t.cpsrC && !t.cpsrZ;
    },
    // LS
    function() {
      return t.conditionPassed = !t.cpsrC || t.cpsrZ;
    },
    // GE
    function() {
      return t.conditionPassed = !t.cpsrN == !t.cpsrV;
    },
    // LT
    function() {
      return t.conditionPassed = !t.cpsrN != !t.cpsrV;
    },
    // GT
    function() {
      return t.conditionPassed = !t.cpsrZ && !t.cpsrN == !t.cpsrV;
    },
    // LE
    function() {
      return t.conditionPassed = t.cpsrZ || !t.cpsrN != !t.cpsrV;
    },
    // AL
    null,
    null
  ];
};
N.prototype.barrelShiftImmediate = function(t, e, s) {
  var r = this, a = this.gprs, h = this.badOp;
  switch (t) {
    case 0:
      e ? h = function() {
        r.shifterOperand = a[s] << e, r.shifterCarryOut = a[s] & 1 << 32 - e;
      } : h = function() {
        r.shifterOperand = a[s], r.shifterCarryOut = r.cpsrC;
      };
      break;
    case 32:
      e ? h = function() {
        r.shifterOperand = a[s] >>> e, r.shifterCarryOut = a[s] & 1 << e - 1;
      } : h = function() {
        r.shifterOperand = 0, r.shifterCarryOut = a[s] & 2147483648;
      };
      break;
    case 64:
      e ? h = function() {
        r.shifterOperand = a[s] >> e, r.shifterCarryOut = a[s] & 1 << e - 1;
      } : h = function() {
        r.shifterCarryOut = a[s] & 2147483648, r.shifterCarryOut ? r.shifterOperand = 4294967295 : r.shifterOperand = 0;
      };
      break;
    case 96:
      e ? h = function() {
        r.shifterOperand = a[s] >>> e | a[s] << 32 - e, r.shifterCarryOut = a[s] & 1 << e - 1;
      } : h = function() {
        r.shifterOperand = !!r.cpsrC << 31 | a[s] >>> 1, r.shifterCarryOut = a[s] & 1;
      };
      break;
  }
  return h;
};
N.prototype.compileArm = function(t) {
  var e = this.badOp(t), s = t & 234881024;
  this.gprs;
  var r = this.conds[(t & 4026531840) >>> 28];
  if ((t & 268435440) == 19922704) {
    var a = t & 15;
    e = this.armCompiler.constructBX(a, r), e.writesPC = !0, e.fixedJump = !1;
  } else if (!(t & 201326592) && (s == 33554432 || (t & 144) != 144)) {
    var h = t & 31457280, n = t & 1048576;
    if ((h & 25165824) == 16777216 && !n) {
      var o = t & 4194304;
      if ((t & 11595776) == 2158592) {
        var a = t & 15, p = t & 255, l = (t & 3840) >> 7;
        p = p >>> l | p << 32 - l, e = this.armCompiler.constructMSR(a, o, t, p, r), e.writesPC = !1;
      } else if ((t & 12517376) == 983040) {
        var c = (t & 61440) >> 12;
        e = this.armCompiler.constructMRS(c, o, r), e.writesPC = c == this.PC;
      }
    } else {
      var u = (t & 983040) >> 16, c = (t & 61440) >> 12, d = t & 96, a = t & 15, f = function() {
        throw "BUG: invalid barrel shifter";
      };
      if (t & 33554432) {
        var p = t & 255, C = (t & 3840) >> 7;
        C ? f = this.armCompiler.constructAddressingMode1ImmediateRotate(p, C) : f = this.armCompiler.constructAddressingMode1Immediate(p);
      } else if (t & 16) {
        var m = (t & 3840) >> 8;
        switch (d) {
          case 0:
            f = this.armCompiler.constructAddressingMode1LSL(m, a);
            break;
          case 32:
            f = this.armCompiler.constructAddressingMode1LSR(m, a);
            break;
          case 64:
            f = this.armCompiler.constructAddressingMode1ASR(m, a);
            break;
          case 96:
            f = this.armCompiler.constructAddressingMode1ROR(m, a);
            break;
        }
      } else {
        var p = (t & 3968) >> 7;
        f = this.barrelShiftImmediate(d, p, a);
      }
      switch (h) {
        case 0:
          n ? e = this.armCompiler.constructANDS(c, u, f, r) : e = this.armCompiler.constructAND(c, u, f, r);
          break;
        case 2097152:
          n ? e = this.armCompiler.constructEORS(c, u, f, r) : e = this.armCompiler.constructEOR(c, u, f, r);
          break;
        case 4194304:
          n ? e = this.armCompiler.constructSUBS(c, u, f, r) : e = this.armCompiler.constructSUB(c, u, f, r);
          break;
        case 6291456:
          n ? e = this.armCompiler.constructRSBS(c, u, f, r) : e = this.armCompiler.constructRSB(c, u, f, r);
          break;
        case 8388608:
          n ? e = this.armCompiler.constructADDS(c, u, f, r) : e = this.armCompiler.constructADD(c, u, f, r);
          break;
        case 10485760:
          n ? e = this.armCompiler.constructADCS(c, u, f, r) : e = this.armCompiler.constructADC(c, u, f, r);
          break;
        case 12582912:
          n ? e = this.armCompiler.constructSBCS(c, u, f, r) : e = this.armCompiler.constructSBC(c, u, f, r);
          break;
        case 14680064:
          n ? e = this.armCompiler.constructRSCS(c, u, f, r) : e = this.armCompiler.constructRSC(c, u, f, r);
          break;
        case 16777216:
          e = this.armCompiler.constructTST(c, u, f, r);
          break;
        case 18874368:
          e = this.armCompiler.constructTEQ(c, u, f, r);
          break;
        case 20971520:
          e = this.armCompiler.constructCMP(c, u, f, r);
          break;
        case 23068672:
          e = this.armCompiler.constructCMN(c, u, f, r);
          break;
        case 25165824:
          n ? e = this.armCompiler.constructORRS(c, u, f, r) : e = this.armCompiler.constructORR(c, u, f, r);
          break;
        case 27262976:
          n ? e = this.armCompiler.constructMOVS(c, u, f, r) : e = this.armCompiler.constructMOV(c, u, f, r);
          break;
        case 29360128:
          n ? e = this.armCompiler.constructBICS(c, u, f, r) : e = this.armCompiler.constructBIC(c, u, f, r);
          break;
        case 31457280:
          n ? e = this.armCompiler.constructMVNS(c, u, f, r) : e = this.armCompiler.constructMVN(c, u, f, r);
          break;
      }
      e.writesPC = c == this.PC;
    }
  } else if ((t & 263196656) == 16777360) {
    var a = t & 15, c = t >> 12 & 15, u = t >> 16 & 15;
    t & 4194304 ? e = this.armCompiler.constructSWPB(c, u, a, r) : e = this.armCompiler.constructSWP(c, u, a, r), e.writesPC = c == this.PC;
  } else
    switch (s) {
      case 0:
        if ((t & 16777456) == 144) {
          var c = (t & 983040) >> 16, u = (t & 61440) >> 12, m = (t & 3840) >> 8, a = t & 15;
          switch (t & 15728640) {
            case 0:
              e = this.armCompiler.constructMUL(c, m, a, r);
              break;
            case 1048576:
              e = this.armCompiler.constructMULS(c, m, a, r);
              break;
            case 2097152:
              e = this.armCompiler.constructMLA(c, u, m, a, r);
              break;
            case 3145728:
              e = this.armCompiler.constructMLAS(c, u, m, a, r);
              break;
            case 8388608:
              e = this.armCompiler.constructUMULL(c, u, m, a, r);
              break;
            case 9437184:
              e = this.armCompiler.constructUMULLS(c, u, m, a, r);
              break;
            case 10485760:
              e = this.armCompiler.constructUMLAL(c, u, m, a, r);
              break;
            case 11534336:
              e = this.armCompiler.constructUMLALS(c, u, m, a, r);
              break;
            case 12582912:
              e = this.armCompiler.constructSMULL(c, u, m, a, r);
              break;
            case 13631488:
              e = this.armCompiler.constructSMULLS(c, u, m, a, r);
              break;
            case 14680064:
              e = this.armCompiler.constructSMLAL(c, u, m, a, r);
              break;
            case 15728640:
              e = this.armCompiler.constructSMLALS(c, u, m, a, r);
              break;
          }
          e.writesPC = c == this.PC;
        } else {
          var L = t & 1048576, c = (t & 61440) >> 12, v = (t & 3840) >> 4, g = a = t & 15, w = t & 32, n = t & 64, A = t & 2097152, s = t & 4194304, _;
          if (s) {
            var p = g | v;
            _ = this.armCompiler.constructAddressingMode23Immediate(t, p, r);
          } else
            _ = this.armCompiler.constructAddressingMode23Register(t, a, r);
          _.writesPC = !!A && u == this.PC, (t & 144) == 144 && (L ? w ? n ? e = this.armCompiler.constructLDRSH(c, _, r) : e = this.armCompiler.constructLDRH(c, _, r) : n && (e = this.armCompiler.constructLDRSB(c, _, r)) : !n && w && (e = this.armCompiler.constructSTRH(c, _, r))), e.writesPC = c == this.PC || _.writesPC;
        }
        break;
      case 67108864:
      case 100663296:
        var c = (t & 61440) >> 12, L = t & 1048576, O = t & 4194304, s = t & 33554432, _ = function() {
          throw "Unimplemented memory access: 0x" + t.toString(16);
        };
        if (~t & 16777216 && (t &= 4292870143), s) {
          var a = t & 15, d = t & 96, H = (t & 3968) >> 7;
          if (d || H) {
            var f = this.barrelShiftImmediate(d, H, a);
            _ = this.armCompiler.constructAddressingMode2RegisterShifted(t, f, r);
          } else
            _ = this.armCompiler.constructAddressingMode23Register(t, a, r);
        } else {
          var y = t & 4095;
          _ = this.armCompiler.constructAddressingMode23Immediate(t, y, r);
        }
        L ? O ? e = this.armCompiler.constructLDRB(c, _, r) : e = this.armCompiler.constructLDR(c, _, r) : O ? e = this.armCompiler.constructSTRB(c, _, r) : e = this.armCompiler.constructSTR(c, _, r), e.writesPC = c == this.PC || _.writesPC;
        break;
      case 134217728:
        var L = t & 1048576, A = t & 2097152, D = t & 4194304, B = t & 8388608, K = t & 16777216, m = t & 65535, u = (t & 983040) >> 16, _, p = 0, y = 0, j = !1;
        if (B) {
          K && (p = 4);
          for (var k = 1, s = 0; s < 16; k <<= 1, ++s)
            m & k && (A && s == u && !y && (m &= ~k, p += 4, j = !0), y += 4);
        } else {
          K || (p = 4);
          for (var k = 1, s = 0; s < 16; k <<= 1, ++s)
            m & k && (A && s == u && !y && (m &= ~k, p += 4, j = !0), p -= 4, y -= 4);
        }
        A ? _ = this.armCompiler.constructAddressingMode4Writeback(p, y, u, j) : _ = this.armCompiler.constructAddressingMode4(p, u), L ? (D ? e = this.armCompiler.constructLDMS(m, _, r) : e = this.armCompiler.constructLDM(m, _, r), e.writesPC = !!(m & 32768)) : (D ? e = this.armCompiler.constructSTMS(m, _, r) : e = this.armCompiler.constructSTM(m, _, r), e.writesPC = !1);
        break;
      case 167772160:
        var p = t & 16777215;
        p & 8388608 && (p |= 4278190080), p <<= 2;
        var q = t & 16777216;
        q ? e = this.armCompiler.constructBL(p, r) : e = this.armCompiler.constructB(p, r), e.writesPC = !0, e.fixedJump = !0;
        break;
      case 201326592:
        break;
      case 234881024:
        if ((t & 251658240) == 251658240) {
          var p = t & 16777215;
          e = this.armCompiler.constructSWI(p, r), e.writesPC = !1;
        }
        break;
      default:
        throw "Bad opcode: 0x" + t.toString(16);
    }
  return e.execMode = this.MODE_ARM, e.fixedJump = e.fixedJump || !1, e;
};
N.prototype.compileThumb = function(t) {
  var e = this.badOp(t & 65535);
  if (this.gprs, (t & 64512) == 16384) {
    var s = (t & 56) >> 3, r = t & 7;
    switch (t & 960) {
      case 0:
        e = this.thumbCompiler.constructAND(r, s);
        break;
      case 64:
        e = this.thumbCompiler.constructEOR(r, s);
        break;
      case 128:
        e = this.thumbCompiler.constructLSL2(r, s);
        break;
      case 192:
        e = this.thumbCompiler.constructLSR2(r, s);
        break;
      case 256:
        e = this.thumbCompiler.constructASR2(r, s);
        break;
      case 320:
        e = this.thumbCompiler.constructADC(r, s);
        break;
      case 384:
        e = this.thumbCompiler.constructSBC(r, s);
        break;
      case 448:
        e = this.thumbCompiler.constructROR(r, s);
        break;
      case 512:
        e = this.thumbCompiler.constructTST(r, s);
        break;
      case 576:
        e = this.thumbCompiler.constructNEG(r, s);
        break;
      case 640:
        e = this.thumbCompiler.constructCMP2(r, s);
        break;
      case 704:
        e = this.thumbCompiler.constructCMN(r, s);
        break;
      case 768:
        e = this.thumbCompiler.constructORR(r, s);
        break;
      case 832:
        e = this.thumbCompiler.constructMUL(r, s);
        break;
      case 896:
        e = this.thumbCompiler.constructBIC(r, s);
        break;
      case 960:
        e = this.thumbCompiler.constructMVN(r, s);
        break;
    }
    e.writesPC = !1;
  } else if ((t & 64512) == 17408) {
    var s = (t & 120) >> 3, a = t & 7, h = t & 128, r = a | h >> 4;
    switch (t & 768) {
      case 0:
        e = this.thumbCompiler.constructADD4(r, s), e.writesPC = r == this.PC;
        break;
      case 256:
        e = this.thumbCompiler.constructCMP3(r, s), e.writesPC = !1;
        break;
      case 512:
        e = this.thumbCompiler.constructMOV3(r, s), e.writesPC = r == this.PC;
        break;
      case 768:
        e = this.thumbCompiler.constructBX(r, s), e.writesPC = !0, e.fixedJump = !1;
        break;
    }
  } else if ((t & 63488) == 6144) {
    var s = (t & 448) >> 6, a = (t & 56) >> 3, r = t & 7;
    switch (t & 1536) {
      case 0:
        e = this.thumbCompiler.constructADD3(r, a, s);
        break;
      case 512:
        e = this.thumbCompiler.constructSUB3(r, a, s);
        break;
      case 1024:
        var n = (t & 448) >> 6;
        n ? e = this.thumbCompiler.constructADD1(r, a, n) : e = this.thumbCompiler.constructMOV2(r, a, s);
        break;
      case 1536:
        var n = (t & 448) >> 6;
        e = this.thumbCompiler.constructSUB1(r, a, n);
        break;
    }
    e.writesPC = !1;
  } else if (t & 57344)
    if ((t & 57344) == 8192) {
      var n = t & 255, a = (t & 1792) >> 8;
      switch (t & 6144) {
        case 0:
          e = this.thumbCompiler.constructMOV1(a, n);
          break;
        case 2048:
          e = this.thumbCompiler.constructCMP1(a, n);
          break;
        case 4096:
          e = this.thumbCompiler.constructADD2(a, n);
          break;
        case 6144:
          e = this.thumbCompiler.constructSUB2(a, n);
          break;
      }
      e.writesPC = !1;
    } else if ((t & 63488) == 18432) {
      var r = (t & 1792) >> 8, n = (t & 255) << 2;
      e = this.thumbCompiler.constructLDR3(r, n), e.writesPC = !1;
    } else if ((t & 61440) == 20480) {
      var r = t & 7, a = (t & 56) >> 3, s = (t & 448) >> 6, o = t & 3584;
      switch (o) {
        case 0:
          e = this.thumbCompiler.constructSTR2(r, a, s);
          break;
        case 512:
          e = this.thumbCompiler.constructSTRH2(r, a, s);
          break;
        case 1024:
          e = this.thumbCompiler.constructSTRB2(r, a, s);
          break;
        case 1536:
          e = this.thumbCompiler.constructLDRSB(r, a, s);
          break;
        case 2048:
          e = this.thumbCompiler.constructLDR2(r, a, s);
          break;
        case 2560:
          e = this.thumbCompiler.constructLDRH2(r, a, s);
          break;
        case 3072:
          e = this.thumbCompiler.constructLDRB2(r, a, s);
          break;
        case 3584:
          e = this.thumbCompiler.constructLDRSH(r, a, s);
          break;
      }
      e.writesPC = !1;
    } else if ((t & 57344) == 24576) {
      var r = t & 7, a = (t & 56) >> 3, n = (t & 1984) >> 4, p = t & 4096;
      p && (n >>= 2);
      var l = t & 2048;
      l ? p ? e = this.thumbCompiler.constructLDRB1(r, a, n) : e = this.thumbCompiler.constructLDR1(r, a, n) : p ? e = this.thumbCompiler.constructSTRB1(r, a, n) : e = this.thumbCompiler.constructSTR1(r, a, n), e.writesPC = !1;
    } else if ((t & 62976) == 46080) {
      var c = !!(t & 256), u = t & 255;
      t & 2048 ? (e = this.thumbCompiler.constructPOP(u, c), e.writesPC = c, e.fixedJump = !1) : (e = this.thumbCompiler.constructPUSH(u, c), e.writesPC = !1);
    } else if (t & 32768)
      switch (t & 28672) {
        case 0:
          var r = t & 7, a = (t & 56) >> 3, n = (t & 1984) >> 5;
          t & 2048 ? e = this.thumbCompiler.constructLDRH1(r, a, n) : e = this.thumbCompiler.constructSTRH1(r, a, n), e.writesPC = !1;
          break;
        case 4096:
          var r = (t & 1792) >> 8, n = (t & 255) << 2, l = t & 2048;
          l ? e = this.thumbCompiler.constructLDR4(r, n) : e = this.thumbCompiler.constructSTR3(r, n), e.writesPC = !1;
          break;
        case 8192:
          var r = (t & 1792) >> 8, n = (t & 255) << 2;
          t & 2048 ? e = this.thumbCompiler.constructADD6(r, n) : e = this.thumbCompiler.constructADD5(r, n), e.writesPC = !1;
          break;
        case 12288:
          if (!(t & 3840)) {
            var p = t & 128, n = (t & 127) << 2;
            p && (n = -n), e = this.thumbCompiler.constructADD7(n), e.writesPC = !1;
          }
          break;
        case 16384:
          var a = (t & 1792) >> 8, u = t & 255;
          t & 2048 ? e = this.thumbCompiler.constructLDMIA(a, u) : e = this.thumbCompiler.constructSTMIA(a, u), e.writesPC = !1;
          break;
        case 20480:
          var d = (t & 3840) >> 8, n = t & 255;
          if (d == 15)
            e = this.thumbCompiler.constructSWI(n), e.writesPC = !1;
          else {
            t & 128 && (n |= 4294967040), n <<= 1;
            var f = this.conds[d];
            e = this.thumbCompiler.constructB1(n, f), e.writesPC = !0, e.fixedJump = !0;
          }
          break;
        case 24576:
        case 28672:
          var n = t & 2047, C = t & 6144;
          switch (C) {
            case 0:
              n & 1024 && (n |= 4294965248), n <<= 1, e = this.thumbCompiler.constructB2(n), e.writesPC = !0, e.fixedJump = !0;
              break;
            case 2048:
              break;
            case 4096:
              n & 1024 && (n |= 4294966272), n <<= 12, e = this.thumbCompiler.constructBL1(n), e.writesPC = !1;
              break;
            case 6144:
              e = this.thumbCompiler.constructBL2(n), e.writesPC = !0, e.fixedJump = !1;
              break;
          }
          break;
        default:
          this.WARN("Undefined instruction: 0x" + t.toString(16));
      }
    else
      throw "Bad opcode: 0x" + t.toString(16);
  else {
    var r = t & 7, s = (t & 56) >> 3, n = (t & 1984) >> 6;
    switch (t & 6144) {
      case 0:
        e = this.thumbCompiler.constructLSL1(r, s, n);
        break;
      case 2048:
        e = this.thumbCompiler.constructLSR1(r, s, n);
        break;
      case 4096:
        e = this.thumbCompiler.constructASR1(r, s, n);
        break;
    }
    e.writesPC = !1;
  }
  return e.execMode = this.MODE_THUMB, e.fixedJump = e.fixedJump || !1, e;
};
function et(t) {
  P.call(this, new ArrayBuffer(t), 0), this.writePending = !1;
}
et.prototype = Object.create(P.prototype);
et.prototype.store8 = function(t, e) {
  this.view.setInt8(t, e), this.writePending = !0;
};
et.prototype.store16 = function(t, e) {
  this.view.setInt16(t, e, !0), this.writePending = !0;
};
et.prototype.store32 = function(t, e) {
  this.view.setInt32(t, e, !0), this.writePending = !0;
};
function W(t) {
  P.call(this, new ArrayBuffer(t), 0), this.COMMAND_WIPE = 16, this.COMMAND_ERASE_SECTOR = 48, this.COMMAND_ERASE = 128, this.COMMAND_ID = 144, this.COMMAND_WRITE = 160, this.COMMAND_SWITCH_BANK = 176, this.COMMAND_TERMINATE_ID = 240, this.ID_PANASONIC = 6962, this.ID_SANYO = 4962, this.bank0 = new DataView(this.buffer, 0, 65536), t > 65536 ? (this.id = this.ID_SANYO, this.bank1 = new DataView(this.buffer, 65536)) : (this.id = this.ID_PANASONIC, this.bank1 = null), this.bank = this.bank0, this.idMode = !1, this.writePending = !1, this.first = 0, this.second = 0, this.command = 0, this.pendingCommand = 0;
}
W.prototype = Object.create(P.prototype);
W.prototype.load8 = function(t) {
  return this.idMode && t < 2 ? this.id >> (t << 3) & 255 : t < 65536 ? this.bank.getInt8(t) : 0;
};
W.prototype.load16 = function(t) {
  return this.load8(t) & 255 | this.load8(t + 1) << 8;
};
W.prototype.load32 = function(t) {
  return this.load8(t) & 255 | this.load8(t + 1) << 8 | this.load8(t + 2) << 16 | this.load8(t + 3) << 24;
};
W.prototype.loadU8 = function(t) {
  return this.load8(t) & 255;
};
W.prototype.loadU16 = function(t) {
  return this.loadU8(t) & 255 | this.loadU8(t + 1) << 8;
};
W.prototype.store8 = function(t, e) {
  switch (this.command) {
    case 0:
      if (t == 21845)
        if (this.second == 85) {
          switch (e) {
            case this.COMMAND_ERASE:
              this.pendingCommand = e;
              break;
            case this.COMMAND_ID:
              this.idMode = !0;
              break;
            case this.COMMAND_TERMINATE_ID:
              this.idMode = !1;
              break;
            default:
              this.command = e;
              break;
          }
          this.second = 0, this.first = 0;
        } else
          this.command = 0, this.first = e, this.idMode = !1;
      else t == 10922 && this.first == 170 && (this.first = 0, this.pendingCommand ? this.command = this.pendingCommand : this.second = e);
      break;
    case this.COMMAND_ERASE:
      switch (e) {
        case this.COMMAND_WIPE:
          if (t == 21845)
            for (var s = 0; s < this.view.byteLength; s += 4)
              this.view.setInt32(s, -1);
          break;
        case this.COMMAND_ERASE_SECTOR:
          if (!(t & 4095))
            for (var s = t; s < t + 4096; s += 4)
              this.bank.setInt32(s, -1);
          break;
      }
      this.pendingCommand = 0, this.command = 0;
      break;
    case this.COMMAND_WRITE:
      this.bank.setInt8(t, e), this.command = 0, this.writePending = !0;
      break;
    case this.COMMAND_SWITCH_BANK:
      this.bank1 && t == 0 && (e == 1 ? this.bank = this.bank1 : this.bank = this.bank0), this.command = 0;
      break;
  }
};
W.prototype.store16 = function(t, e) {
  throw new Error("Unaligned save to flash!");
};
W.prototype.store32 = function(t, e) {
  throw new Error("Unaligned save to flash!");
};
W.prototype.replaceData = function(t) {
  var e = this.view === this.bank1;
  P.prototype.replaceData.call(this, t, 0), this.bank0 = new DataView(this.buffer, 0, 65536), t.byteLength > 65536 ? this.bank1 = new DataView(this.buffer, 65536) : this.bank1 = null, this.bank = e ? this.bank1 : this.bank0;
};
function V(t, e) {
  P.call(this, new ArrayBuffer(t), 0), this.writeAddress = 0, this.readBitsRemaining = 0, this.readAddress = 0, this.command = 0, this.commandBitsRemaining = 0, this.realSize = 0, this.addressBits = 0, this.writePending = !1, this.dma = e.core.irq.dma[3], this.COMMAND_NULL = 0, this.COMMAND_PENDING = 1, this.COMMAND_WRITE = 2, this.COMMAND_READ_PENDING = 3, this.COMMAND_READ = 4;
}
V.prototype = Object.create(P.prototype);
V.prototype.load8 = function(t) {
  throw new Error("Unsupported 8-bit access!");
};
V.prototype.load16 = function(t) {
  return this.loadU16(t);
};
V.prototype.loadU8 = function(t) {
  throw new Error("Unsupported 8-bit access!");
};
V.prototype.loadU16 = function(t) {
  if (this.command != this.COMMAND_READ || !this.dma.enable)
    return 1;
  if (--this.readBitsRemaining, this.readBitsRemaining < 64) {
    var e = 63 - this.readBitsRemaining, s = this.view.getUint8(this.readAddress + e >> 3, !1) >> 7 - (e & 7);
    return this.readBitsRemaining || (this.command = this.COMMAND_NULL), s & 1;
  }
  return 0;
};
V.prototype.load32 = function(t) {
  throw new Error("Unsupported 32-bit access!");
};
V.prototype.store8 = function(t, e) {
  throw new Error("Unsupported 8-bit access!");
};
V.prototype.store16 = function(t, e) {
  switch (this.command) {
    case this.COMMAND_NULL:
    default:
      this.command = e & 1;
      break;
    case this.COMMAND_PENDING:
      if (this.command <<= 1, this.command |= e & 1, this.command == this.COMMAND_WRITE) {
        if (!this.realSize) {
          var s = this.dma.count - 67;
          this.realSize = 8 << s, this.addressBits = s;
        }
        this.commandBitsRemaining = this.addressBits + 64 + 1, this.writeAddress = 0;
      } else {
        if (!this.realSize) {
          var s = this.dma.count - 3;
          this.realSize = 8 << s, this.addressBits = s;
        }
        this.commandBitsRemaining = this.addressBits + 1, this.readAddress = 0;
      }
      break;
    case this.COMMAND_WRITE:
      if (--this.commandBitsRemaining > 64)
        this.writeAddress <<= 1, this.writeAddress |= (e & 1) << 6;
      else if (this.commandBitsRemaining <= 0)
        this.command = this.COMMAND_NULL, this.writePending = !0;
      else {
        var r = this.view.getUint8(this.writeAddress >> 3);
        r &= ~(1 << 7 - (this.writeAddress & 7)), r |= (e & 1) << 7 - (this.writeAddress & 7), this.view.setUint8(this.writeAddress >> 3, r), ++this.writeAddress;
      }
      break;
    case this.COMMAND_READ_PENDING:
      --this.commandBitsRemaining > 0 ? (this.readAddress <<= 1, e & 1 && (this.readAddress |= 64)) : (this.readBitsRemaining = 68, this.command = this.COMMAND_READ);
      break;
  }
};
V.prototype.store32 = function(t, e) {
  throw new Error("Unsupported 32-bit access!");
};
V.prototype.replaceData = function(t) {
  P.prototype.replaceData.call(this, t, 0);
};
function ot(t, e, s) {
  typeof s > "u" && (s = !0), typeof e > "u" && (e = 8);
  var r = (t >>> 0).toString(16).toUpperCase();
  return e -= r.length, e < 0 ? r : (s ? "0x" : "") + new Array(e + 1).join("0") + r;
}
const I = {
  TAG_INT: 1,
  TAG_STRING: 2,
  TAG_STRUCT: 3,
  TAG_BLOB: 4,
  TAG_BOOLEAN: 5,
  TYPE: "application/octet-stream",
  pointer: function() {
    this.index = 0, this.top = 0, this.stack = [];
  },
  pack: function(t) {
    var e = new DataView(new ArrayBuffer(4));
    return e.setUint32(0, t, !0), e.buffer;
  },
  pack8: function(t) {
    var e = new DataView(new ArrayBuffer(1));
    return e.setUint8(0, t, !0), e.buffer;
  },
  prefix: function(t) {
    return new Blob([I.pack(t.size || t.length || t.byteLength), t], { type: I.TYPE });
  },
  serialize: function(t) {
    var e = [], s = 4;
    for (i in t)
      if (t.hasOwnProperty(i)) {
        var r, a = I.prefix(i), h;
        switch (typeof t[i]) {
          case "number":
            r = I.TAG_INT, h = I.pack(t[i]);
            break;
          case "string":
            r = I.TAG_STRING, h = I.prefix(t[i]);
            break;
          case "object":
            t[i].type == I.TYPE ? (r = I.TAG_BLOB, h = t[i]) : (r = I.TAG_STRUCT, h = I.serialize(t[i]));
            break;
          case "boolean":
            r = I.TAG_BOOLEAN, h = I.pack8(t[i]);
            break;
          default:
            console.log(t[i]);
            break;
        }
        s += 1 + a.size + (h.size || h.byteLength || h.length), e.push(I.pack8(r)), e.push(a), e.push(h);
      }
    return e.unshift(I.pack(s)), new Blob(e);
  },
  deserialize: function(t, e) {
    var s = new FileReader();
    s.onload = function(r) {
      e(I.deserealizeStream(new DataView(r.target.result), new I.pointer()));
    }, s.readAsArrayBuffer(t);
  },
  deserealizeStream: function(t, e) {
    e.push();
    for (var s = {}, r = t.getUint32(e.advance(4), !0); e.mark() < r; ) {
      var a = t.getUint8(e.advance(1)), h = e.readString(t), n;
      switch (a) {
        case I.TAG_INT:
          n = t.getUint32(e.advance(4), !0);
          break;
        case I.TAG_STRING:
          n = e.readString(t);
          break;
        case I.TAG_STRUCT:
          n = I.deserealizeStream(t, e);
          break;
        case I.TAG_BLOB:
          var o = t.getUint32(e.advance(4), !0);
          n = t.buffer.slice(e.advance(o), e.advance(0));
          break;
        case I.TAG_BOOLEAN:
          n = !!t.getUint8(e.advance(1));
          break;
      }
      s[h] = n;
    }
    if (e.mark() > r)
      throw "Size of serialized data exceeded";
    return e.pop(), s;
  },
  serializePNG: function(t, e, s) {
    for (var r = document.createElement("canvas"), a = r.getContext("2d"), h = e.getContext("2d").getImageData(0, 0, e.width, e.height), n = 0, o = 0; o < e.height; ++o)
      for (var p = 0; p < e.width; ++p)
        h.data[(p + o * e.width) * 4 + 3] || ++n;
    for (var l = n * 3 + (e.width * e.height - n), c = 1; l * c * c < t.size; ++c) ;
    var u = l * c * c - t.size, d = Math.ceil(u / (e.width * c));
    r.setAttribute("width", e.width * c), r.setAttribute("height", e.height * c + d);
    var f = new FileReader();
    return f.onload = function(C) {
      for (var m = new Uint8Array(C.target.result), v = 0, g = 0, w = a.createImageData(r.width, r.height + d), O = 0; O < r.height; ++O)
        for (var H = 0; H < r.width; ++H) {
          var L = O / c | 0, A = H / c | 0;
          if (L > e.height || !h.data[(A + L * e.width) * 4 + 3])
            w.data[g++] = m[v++], w.data[g++] = m[v++], w.data[g++] = m[v++], w.data[g++] = 0;
          else {
            var D = m[v++];
            w.data[g++] = h.data[(A + L * e.width) * 4 + 0] | D & 7, w.data[g++] = h.data[(A + L * e.width) * 4 + 1] | D >> 3 & 7, w.data[g++] = h.data[(A + L * e.width) * 4 + 2] | D >> 6 & 7, w.data[g++] = h.data[(A + L * e.width) * 4 + 3];
          }
        }
      a.putImageData(w, 0, 0), s(r.toDataURL("image/png"));
    }, f.readAsArrayBuffer(t), r;
  },
  deserializePNG: function(t, e) {
    var s = new FileReader();
    s.onload = function(p) {
      var a = document.createElement("img");
      a.setAttribute("src", p.target.result);
      var h = document.createElement("canvas");
      h.setAttribute("height", a.height), h.setAttribute("width", a.width);
      var n = h.getContext("2d");
      n.drawImage(a, 0, 0);
      for (var o = n.getImageData(0, 0, h.width, h.height), p = [], l = 0; l < h.height; ++l)
        for (var c = 0; c < h.width; ++c)
          if (!o.data[(c + l * h.width) * 4 + 3])
            p.push(o.data[(c + l * h.width) * 4 + 0]), p.push(o.data[(c + l * h.width) * 4 + 1]), p.push(o.data[(c + l * h.width) * 4 + 2]);
          else {
            var u = 0;
            u |= o.data[(c + l * h.width) * 4 + 0] & 7, u |= (o.data[(c + l * h.width) * 4 + 1] & 7) << 3, u |= (o.data[(c + l * h.width) * 4 + 2] & 7) << 6, p.push(u);
          }
      newBlob = new Blob(p.map(function(d) {
        var f = new Uint8Array(1);
        return f[0] = d, f;
      }), { type: I.TYPE }), I.deserialize(newBlob, e);
    }, s.readAsDataURL(t);
  }
};
I.pointer.prototype.advance = function(t) {
  var e = this.index;
  return this.index += t, e;
};
I.pointer.prototype.mark = function() {
  return this.index - this.top;
};
I.pointer.prototype.push = function() {
  this.stack.push(this.top), this.top = this.index;
};
I.pointer.prototype.pop = function() {
  this.top = this.stack.pop();
};
I.pointer.prototype.readString = function(t) {
  for (var e = t.getUint32(this.advance(4), !0), s = [], r = 0; r < e; ++r)
    s.push(String.fromCharCode(t.getUint8(this.advance(1))));
  return s.join("");
};
function P(t, e) {
  this.buffer = t, this.view = new DataView(this.buffer, typeof e == "number" ? e : 0), this.mask = t.byteLength - 1, this.resetMask();
}
P.prototype.resetMask = function() {
  this.mask8 = this.mask & 4294967295, this.mask16 = this.mask & 4294967294, this.mask32 = this.mask & 4294967292;
};
P.prototype.load8 = function(t) {
  return this.view.getInt8(t & this.mask8);
};
P.prototype.load16 = function(t) {
  return this.view.getInt16(t & this.mask, !0);
};
P.prototype.loadU8 = function(t) {
  return this.view.getUint8(t & this.mask8);
};
P.prototype.loadU16 = function(t) {
  return this.view.getUint16(t & this.mask, !0);
};
P.prototype.load32 = function(t) {
  var e = (t & 3) << 3, s = this.view.getInt32(t & this.mask32, !0);
  return s >>> e | s << 32 - e;
};
P.prototype.store8 = function(t, e) {
  this.view.setInt8(t & this.mask8, e);
};
P.prototype.store16 = function(t, e) {
  this.view.setInt16(t & this.mask16, e, !0);
};
P.prototype.store32 = function(t, e) {
  this.view.setInt32(t & this.mask32, e, !0);
};
P.prototype.invalidatePage = function(t) {
};
P.prototype.replaceData = function(t, e) {
  this.buffer = t, this.view = new DataView(this.buffer, typeof e == "number" ? e : 0), this.icache && (this.icache = new Array(this.icache.length));
};
function it(t, e) {
  P.call(this, new ArrayBuffer(t)), this.ICACHE_PAGE_BITS = e, this.PAGE_MASK = (2 << this.ICACHE_PAGE_BITS) - 1, this.icache = new Array(t >> this.ICACHE_PAGE_BITS + 1);
}
it.prototype = Object.create(P.prototype);
it.prototype.invalidatePage = function(t) {
  var e = this.icache[(t & this.mask) >> this.ICACHE_PAGE_BITS];
  e && (e.invalid = !0);
};
function st(t, e) {
  P.call(this, t, e), this.ICACHE_PAGE_BITS = 10, this.PAGE_MASK = (2 << this.ICACHE_PAGE_BITS) - 1, this.icache = new Array(t.byteLength >> this.ICACHE_PAGE_BITS + 1), this.mask = 33554431, this.resetMask();
}
st.prototype = Object.create(P.prototype);
st.prototype.store8 = function(t, e) {
};
st.prototype.store16 = function(t, e) {
  t < 202 && t >= 196 && (this.gpio || (this.gpio = this.mmu.allocGPIO(this)), this.gpio.store16(t, e));
};
st.prototype.store32 = function(t, e) {
  t < 202 && t >= 196 && (this.gpio || (this.gpio = this.mmu.allocGPIO(this)), this.gpio.store32(t, e));
};
function Q(t, e) {
  P.call(this, t, e), this.ICACHE_PAGE_BITS = 16, this.PAGE_MASK = (2 << this.ICACHE_PAGE_BITS) - 1, this.icache = new Array(1);
}
Q.prototype = Object.create(P.prototype);
Q.prototype.load8 = function(t) {
  return t >= this.buffer.byteLength ? -1 : this.view.getInt8(t);
};
Q.prototype.load16 = function(t) {
  return t >= this.buffer.byteLength ? -1 : this.view.getInt16(t, !0);
};
Q.prototype.loadU8 = function(t) {
  return t >= this.buffer.byteLength ? -1 : this.view.getUint8(t);
};
Q.prototype.loadU16 = function(t) {
  return t >= this.buffer.byteLength ? -1 : this.view.getUint16(t, !0);
};
Q.prototype.load32 = function(t) {
  return t >= this.buffer.byteLength ? -1 : this.view.getInt32(t, !0);
};
Q.prototype.store8 = function(t, e) {
};
Q.prototype.store16 = function(t, e) {
};
Q.prototype.store32 = function(t, e) {
};
function Y(t, e) {
  this.cpu = e, this.mmu = t;
}
Y.prototype.load8 = function(t) {
  return this.mmu.load8(this.cpu.gprs[this.cpu.PC] - this.cpu.instructionWidth + (t & 3));
};
Y.prototype.load16 = function(t) {
  return this.mmu.load16(this.cpu.gprs[this.cpu.PC] - this.cpu.instructionWidth + (t & 2));
};
Y.prototype.loadU8 = function(t) {
  return this.mmu.loadU8(this.cpu.gprs[this.cpu.PC] - this.cpu.instructionWidth + (t & 3));
};
Y.prototype.loadU16 = function(t) {
  return this.mmu.loadU16(this.cpu.gprs[this.cpu.PC] - this.cpu.instructionWidth + (t & 2));
};
Y.prototype.load32 = function(t) {
  if (this.cpu.execMode == this.cpu.MODE_ARM)
    return this.mmu.load32(this.cpu.gprs[this.cpu.gprs.PC] - this.cpu.instructionWidth);
  var e = this.mmu.loadU16(this.cpu.gprs[this.cpu.PC] - this.cpu.instructionWidth);
  return e | e << 16;
};
Y.prototype.store8 = function(t, e) {
};
Y.prototype.store16 = function(t, e) {
};
Y.prototype.store32 = function(t, e) {
};
Y.prototype.invalidatePage = function(t) {
};
function b() {
  this.REGION_BIOS = 0, this.REGION_WORKING_RAM = 2, this.REGION_WORKING_IRAM = 3, this.REGION_IO = 4, this.REGION_PALETTE_RAM = 5, this.REGION_VRAM = 6, this.REGION_OAM = 7, this.REGION_CART0 = 8, this.REGION_CART1 = 10, this.REGION_CART2 = 12, this.REGION_CART_SRAM = 14, this.BASE_BIOS = 0, this.BASE_WORKING_RAM = 33554432, this.BASE_WORKING_IRAM = 50331648, this.BASE_IO = 67108864, this.BASE_PALETTE_RAM = 83886080, this.BASE_VRAM = 100663296, this.BASE_OAM = 117440512, this.BASE_CART0 = 134217728, this.BASE_CART1 = 167772160, this.BASE_CART2 = 201326592, this.BASE_CART_SRAM = 234881024, this.BASE_MASK = 251658240, this.BASE_OFFSET = 24, this.OFFSET_MASK = 16777215, this.SIZE_BIOS = 16384, this.SIZE_WORKING_RAM = 262144, this.SIZE_WORKING_IRAM = 32768, this.SIZE_IO = 1024, this.SIZE_PALETTE_RAM = 1024, this.SIZE_VRAM = 98304, this.SIZE_OAM = 1024, this.SIZE_CART0 = 33554432, this.SIZE_CART1 = 33554432, this.SIZE_CART2 = 33554432, this.SIZE_CART_SRAM = 32768, this.SIZE_CART_FLASH512 = 65536, this.SIZE_CART_FLASH1M = 131072, this.SIZE_CART_EEPROM = 8192, this.DMA_TIMING_NOW = 0, this.DMA_TIMING_VBLANK = 1, this.DMA_TIMING_HBLANK = 2, this.DMA_TIMING_CUSTOM = 3, this.DMA_INCREMENT = 0, this.DMA_DECREMENT = 1, this.DMA_FIXED = 2, this.DMA_INCREMENT_RELOAD = 3, this.DMA_OFFSET = [1, -1, 0, 1], this.WAITSTATES = [0, 0, 2, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4], this.WAITSTATES_32 = [0, 0, 5, 0, 0, 1, 0, 1, 7, 7, 9, 9, 13, 13, 8], this.WAITSTATES_SEQ = [0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 4, 4, 8, 8, 4], this.WAITSTATES_SEQ_32 = [0, 0, 5, 0, 0, 1, 0, 1, 5, 5, 9, 9, 17, 17, 8], this.NULLWAIT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (var t = 15; t < 256; ++t)
    this.WAITSTATES[t] = 0, this.WAITSTATES_32[t] = 0, this.WAITSTATES_SEQ[t] = 0, this.WAITSTATES_SEQ_32[t] = 0, this.NULLWAIT[t] = 0;
  this.ROM_WS = [4, 3, 2, 8], this.ROM_WS_SEQ = [
    [2, 1],
    [4, 1],
    [8, 1]
  ], this.ICACHE_PAGE_BITS = 8, this.PAGE_MASK = (2 << this.ICACHE_PAGE_BITS) - 1, this.bios = null;
}
b.prototype.mmap = function(t, e) {
  this.memory[t] = e;
};
b.prototype.clear = function() {
  this.badMemory = new Y(this, this.cpu), this.memory = [
    this.bios,
    this.badMemory,
    // Unused
    new it(this.SIZE_WORKING_RAM, 9),
    new it(this.SIZE_WORKING_IRAM, 7),
    null,
    // This is owned by GameBoyAdvanceIO
    null,
    // This is owned by GameBoyAdvancePalette
    null,
    // This is owned by GameBoyAdvanceVRAM
    null,
    // This is owned by GameBoyAdvanceOAM
    this.badMemory,
    this.badMemory,
    this.badMemory,
    this.badMemory,
    this.badMemory,
    this.badMemory,
    this.badMemory,
    this.badMemory
    // Unused
  ];
  for (var t = 16; t < 256; ++t)
    this.memory[t] = this.badMemory;
  this.waitstates = this.WAITSTATES.slice(0), this.waitstatesSeq = this.WAITSTATES_SEQ.slice(0), this.waitstates32 = this.WAITSTATES_32.slice(0), this.waitstatesSeq32 = this.WAITSTATES_SEQ_32.slice(0), this.waitstatesPrefetch = this.WAITSTATES_SEQ.slice(0), this.waitstatesPrefetch32 = this.WAITSTATES_SEQ_32.slice(0), this.cart = null, this.save = null, this.DMA_REGISTER = [
    this.core.io.DMA0CNT_HI >> 1,
    this.core.io.DMA1CNT_HI >> 1,
    this.core.io.DMA2CNT_HI >> 1,
    this.core.io.DMA3CNT_HI >> 1
  ];
};
b.prototype.freeze = function() {
  return {
    ram: I.prefix(this.memory[this.REGION_WORKING_RAM].buffer),
    iram: I.prefix(this.memory[this.REGION_WORKING_IRAM].buffer)
  };
};
b.prototype.defrost = function(t) {
  this.memory[this.REGION_WORKING_RAM].replaceData(t.ram), this.memory[this.REGION_WORKING_IRAM].replaceData(t.iram);
};
b.prototype.loadBios = function(t, e) {
  this.bios = new Q(t), this.bios.real = !!e;
};
b.prototype.loadRom = function(t, e) {
  var s = {
    title: null,
    code: null,
    maker: null,
    memory: t,
    saveType: null
  }, r = new st(t);
  if (r.view.getUint8(178) != 150)
    return null;
  if (r.mmu = this, this.memory[this.REGION_CART0] = r, this.memory[this.REGION_CART1] = r, this.memory[this.REGION_CART2] = r, t.byteLength > 16777216) {
    var a = new st(t, 16777216);
    this.memory[this.REGION_CART0 + 1] = a, this.memory[this.REGION_CART1 + 1] = a, this.memory[this.REGION_CART2 + 1] = a;
  }
  if (e) {
    for (var h = "", n = 0; n < 12; ++n) {
      var o = r.loadU8(n + 160);
      if (!o)
        break;
      h += String.fromCharCode(o);
    }
    s.title = h;
    for (var p = "", n = 0; n < 4; ++n) {
      var o = r.loadU8(n + 172);
      if (!o)
        break;
      p += String.fromCharCode(o);
    }
    s.code = p;
    for (var l = "", n = 0; n < 2; ++n) {
      var o = r.loadU8(n + 176);
      if (!o)
        break;
      l += String.fromCharCode(o);
    }
    s.maker = l;
    for (var c = "", u, d = !1, n = 228; n < t.byteLength && !d; ++n)
      switch (u = String.fromCharCode(r.loadU8(n)), c += u, c) {
        case "F":
        case "FL":
        case "FLA":
        case "FLAS":
        case "FLASH":
        case "FLASH_":
        case "FLASH5":
        case "FLASH51":
        case "FLASH512":
        case "FLASH512_":
        case "FLASH1":
        case "FLASH1M":
        case "FLASH1M_":
        case "S":
        case "SR":
        case "SRA":
        case "SRAM":
        case "SRAM_":
        case "E":
        case "EE":
        case "EEP":
        case "EEPR":
        case "EEPRO":
        case "EEPROM":
        case "EEPROM_":
          break;
        case "FLASH_V":
        case "FLASH512_V":
        case "FLASH1M_V":
        case "SRAM_V":
        case "EEPROM_V":
          d = !0;
          break;
        default:
          c = u;
          break;
      }
    if (d)
      switch (s.saveType = c, c) {
        case "FLASH_V":
        case "FLASH512_V":
          this.save = this.memory[this.REGION_CART_SRAM] = new W(this.SIZE_CART_FLASH512);
          break;
        case "FLASH1M_V":
          this.save = this.memory[this.REGION_CART_SRAM] = new W(this.SIZE_CART_FLASH1M);
          break;
        case "SRAM_V":
          this.save = this.memory[this.REGION_CART_SRAM] = new et(this.SIZE_CART_SRAM);
          break;
        case "EEPROM_V":
          this.save = this.memory[this.REGION_CART2 + 1] = new V(this.SIZE_CART_EEPROM, this);
          break;
      }
    this.save || (this.save = this.memory[this.REGION_CART_SRAM] = new et(this.SIZE_CART_SRAM));
  }
  return this.cart = s, s;
};
b.prototype.loadSavedata = function(t) {
  this.save.replaceData(t);
};
b.prototype.load8 = function(t) {
  return this.memory[t >>> this.BASE_OFFSET].load8(t & 16777215);
};
b.prototype.load16 = function(t) {
  return this.memory[t >>> this.BASE_OFFSET].load16(t & 16777215);
};
b.prototype.load32 = function(t) {
  return this.memory[t >>> this.BASE_OFFSET].load32(t & 16777215);
};
b.prototype.loadU8 = function(t) {
  return this.memory[t >>> this.BASE_OFFSET].loadU8(t & 16777215);
};
b.prototype.loadU16 = function(t) {
  return this.memory[t >>> this.BASE_OFFSET].loadU16(t & 16777215);
};
b.prototype.store8 = function(t, e) {
  var s = t & 16777215, r = this.memory[t >>> this.BASE_OFFSET];
  r.store8(s, e), r.invalidatePage(s);
};
b.prototype.store16 = function(t, e) {
  var s = t & 16777214, r = this.memory[t >>> this.BASE_OFFSET];
  r.store16(s, e), r.invalidatePage(s);
};
b.prototype.store32 = function(t, e) {
  var s = t & 16777212, r = this.memory[t >>> this.BASE_OFFSET];
  r.store32(s, e), r.invalidatePage(s), r.invalidatePage(s + 2);
};
b.prototype.waitPrefetch = function(t) {
  this.cpu.cycles += 1 + this.waitstatesPrefetch[t >>> this.BASE_OFFSET];
};
b.prototype.waitPrefetch32 = function(t) {
  this.cpu.cycles += 1 + this.waitstatesPrefetch32[t >>> this.BASE_OFFSET];
};
b.prototype.wait = function(t) {
  this.cpu.cycles += 1 + this.waitstates[t >>> this.BASE_OFFSET];
};
b.prototype.wait32 = function(t) {
  this.cpu.cycles += 1 + this.waitstates32[t >>> this.BASE_OFFSET];
};
b.prototype.waitSeq = function(t) {
  this.cpu.cycles += 1 + this.waitstatesSeq[t >>> this.BASE_OFFSET];
};
b.prototype.waitSeq32 = function(t) {
  this.cpu.cycles += 1 + this.waitstatesSeq32[t >>> this.BASE_OFFSET];
};
b.prototype.waitMul = function(t) {
  t & !0 || !(t & 4294967040) ? this.cpu.cycles += 1 : t & !0 || !(t & 4294901760) ? this.cpu.cycles += 2 : t & !0 || !(t & 4278190080) ? this.cpu.cycles += 3 : this.cpu.cycles += 4;
};
b.prototype.waitMulti32 = function(t, e) {
  this.cpu.cycles += 1 + this.waitstates32[t >>> this.BASE_OFFSET], this.cpu.cycles += (1 + this.waitstatesSeq32[t >>> this.BASE_OFFSET]) * (e - 1);
};
b.prototype.addressToPage = function(t, e) {
  return e >> this.memory[t].ICACHE_PAGE_BITS;
};
b.prototype.accessPage = function(t, e) {
  var s = this.memory[t], r = s.icache[e];
  return (!r || r.invalid) && (r = {
    thumb: new Array(1 << s.ICACHE_PAGE_BITS),
    arm: new Array(1 << s.ICACHE_PAGE_BITS - 1),
    invalid: !1
  }, s.icache[e] = r), r;
};
b.prototype.scheduleDma = function(t, e) {
  switch (e.timing) {
    case this.DMA_TIMING_NOW:
      this.serviceDma(t, e);
      break;
    case this.DMA_TIMING_HBLANK:
      break;
    case this.DMA_TIMING_VBLANK:
      break;
    case this.DMA_TIMING_CUSTOM:
      switch (t) {
        case 0:
          this.core.WARN("Discarding invalid DMA0 scheduling");
          break;
        case 1:
        case 2:
          this.cpu.irq.audio.scheduleFIFODma(t, e);
          break;
        case 3:
          this.cpu.irq.video.scheduleVCaptureDma(dma, e);
          break;
      }
  }
};
b.prototype.runHblankDmas = function() {
  for (var t, e = 0; e < this.cpu.irq.dma.length; ++e)
    t = this.cpu.irq.dma[e], t.enable && t.timing == this.DMA_TIMING_HBLANK && this.serviceDma(e, t);
};
b.prototype.runVblankDmas = function() {
  for (var t, e = 0; e < this.cpu.irq.dma.length; ++e)
    t = this.cpu.irq.dma[e], t.enable && t.timing == this.DMA_TIMING_VBLANK && this.serviceDma(e, t);
};
b.prototype.serviceDma = function(t, e) {
  if (e.enable) {
    var s = e.width, r = this.DMA_OFFSET[e.srcControl] * s, a = this.DMA_OFFSET[e.dstControl] * s, h = e.nextCount, n = e.nextSource & this.OFFSET_MASK, o = e.nextDest & this.OFFSET_MASK, p = e.nextSource >>> this.BASE_OFFSET, l = e.nextDest >>> this.BASE_OFFSET, c = this.memory[p], u = this.memory[l], d = null, f = null, C = 4294967295, m = 4294967295, v;
    if (u.ICACHE_PAGE_BITS)
      for (var g = o + h * s >> u.ICACHE_PAGE_BITS, w = o >> u.ICACHE_PAGE_BITS; w <= g; ++w)
        u.invalidatePage(w << u.ICACHE_PAGE_BITS);
    if ((l == this.REGION_WORKING_RAM || l == this.REGION_WORKING_IRAM) && (f = u.view, m = u.mask), (p == this.REGION_WORKING_RAM || p == this.REGION_WORKING_IRAM || p == this.REGION_CART0 || p == this.REGION_CART1) && (d = c.view, C = c.mask), c && u)
      if (d && f)
        if (s == 4)
          for (n &= 4294967292, o &= 4294967292; h--; )
            v = d.getInt32(n & C), f.setInt32(o & m, v), n += r, o += a;
        else
          for (; h--; )
            v = d.getUint16(n & C), f.setUint16(o & m, v), n += r, o += a;
      else if (d)
        if (s == 4)
          for (n &= 4294967292, o &= 4294967292; h--; )
            v = d.getInt32(n & C, !0), u.store32(o, v), n += r, o += a;
        else
          for (; h--; )
            v = d.getUint16(n & C, !0), u.store16(o, v), n += r, o += a;
      else if (s == 4)
        for (n &= 4294967292, o &= 4294967292; h--; )
          v = c.load32(n), u.store32(o, v), n += r, o += a;
      else
        for (; h--; )
          v = c.loadU16(n), u.store16(o, v), n += r, o += a;
    else
      this.core.WARN("Invalid DMA");
    if (e.doIrq && (e.nextIRQ = this.cpu.cycles + 2, e.nextIRQ += s == 4 ? this.waitstates32[p] + this.waitstates32[l] : this.waitstates[p] + this.waitstates[l], e.nextIRQ += (e.count - 1) * (s == 4 ? this.waitstatesSeq32[p] + this.waitstatesSeq32[l] : this.waitstatesSeq[p] + this.waitstatesSeq[l])), e.nextSource = n | p << this.BASE_OFFSET, e.nextDest = o | l << this.BASE_OFFSET, e.nextCount = h, e.repeat)
      e.nextCount = e.count, e.dstControl == this.DMA_INCREMENT_RELOAD && (e.nextDest = e.dest), this.scheduleDma(t, e);
    else {
      e.enable = !1;
      var O = this.memory[this.REGION_IO];
      O.registers[this.DMA_REGISTER[t]] &= 32736;
    }
  }
};
b.prototype.adjustTimings = function(t) {
  var e = t & 3, s = (t & 12) >> 2, r = (t & 16) >> 4, a = (t & 96) >> 5, h = (t & 128) >> 7, n = (t & 768) >> 8, o = (t & 1024) >> 10, p = t & 16384;
  this.waitstates[this.REGION_CART_SRAM] = this.ROM_WS[e], this.waitstatesSeq[this.REGION_CART_SRAM] = this.ROM_WS[e], this.waitstates32[this.REGION_CART_SRAM] = this.ROM_WS[e], this.waitstatesSeq32[this.REGION_CART_SRAM] = this.ROM_WS[e], this.waitstates[this.REGION_CART0] = this.waitstates[this.REGION_CART0 + 1] = this.ROM_WS[s], this.waitstates[this.REGION_CART1] = this.waitstates[this.REGION_CART1 + 1] = this.ROM_WS[a], this.waitstates[this.REGION_CART2] = this.waitstates[this.REGION_CART2 + 1] = this.ROM_WS[n], this.waitstatesSeq[this.REGION_CART0] = this.waitstatesSeq[this.REGION_CART0 + 1] = this.ROM_WS_SEQ[0][r], this.waitstatesSeq[this.REGION_CART1] = this.waitstatesSeq[this.REGION_CART1 + 1] = this.ROM_WS_SEQ[1][h], this.waitstatesSeq[this.REGION_CART2] = this.waitstatesSeq[this.REGION_CART2 + 1] = this.ROM_WS_SEQ[2][o], this.waitstates32[this.REGION_CART0] = this.waitstates32[this.REGION_CART0 + 1] = this.waitstates[this.REGION_CART0] + 1 + this.waitstatesSeq[this.REGION_CART0], this.waitstates32[this.REGION_CART1] = this.waitstates32[this.REGION_CART1 + 1] = this.waitstates[this.REGION_CART1] + 1 + this.waitstatesSeq[this.REGION_CART1], this.waitstates32[this.REGION_CART2] = this.waitstates32[this.REGION_CART2 + 1] = this.waitstates[this.REGION_CART2] + 1 + this.waitstatesSeq[this.REGION_CART2], this.waitstatesSeq32[this.REGION_CART0] = this.waitstatesSeq32[this.REGION_CART0 + 1] = 2 * this.waitstatesSeq[this.REGION_CART0] + 1, this.waitstatesSeq32[this.REGION_CART1] = this.waitstatesSeq32[this.REGION_CART1 + 1] = 2 * this.waitstatesSeq[this.REGION_CART1] + 1, this.waitstatesSeq32[this.REGION_CART2] = this.waitstatesSeq32[this.REGION_CART2 + 1] = 2 * this.waitstatesSeq[this.REGION_CART2] + 1, p ? (this.waitstatesPrefetch[this.REGION_CART0] = this.waitstatesPrefetch[this.REGION_CART0 + 1] = 0, this.waitstatesPrefetch[this.REGION_CART1] = this.waitstatesPrefetch[this.REGION_CART1 + 1] = 0, this.waitstatesPrefetch[this.REGION_CART2] = this.waitstatesPrefetch[this.REGION_CART2 + 1] = 0, this.waitstatesPrefetch32[this.REGION_CART0] = this.waitstatesPrefetch32[this.REGION_CART0 + 1] = 0, this.waitstatesPrefetch32[this.REGION_CART1] = this.waitstatesPrefetch32[this.REGION_CART1 + 1] = 0, this.waitstatesPrefetch32[this.REGION_CART2] = this.waitstatesPrefetch32[this.REGION_CART2 + 1] = 0) : (this.waitstatesPrefetch[this.REGION_CART0] = this.waitstatesPrefetch[this.REGION_CART0 + 1] = this.waitstatesSeq[this.REGION_CART0], this.waitstatesPrefetch[this.REGION_CART1] = this.waitstatesPrefetch[this.REGION_CART1 + 1] = this.waitstatesSeq[this.REGION_CART1], this.waitstatesPrefetch[this.REGION_CART2] = this.waitstatesPrefetch[this.REGION_CART2 + 1] = this.waitstatesSeq[this.REGION_CART2], this.waitstatesPrefetch32[this.REGION_CART0] = this.waitstatesPrefetch32[this.REGION_CART0 + 1] = this.waitstatesSeq32[this.REGION_CART0], this.waitstatesPrefetch32[this.REGION_CART1] = this.waitstatesPrefetch32[this.REGION_CART1 + 1] = this.waitstatesSeq32[this.REGION_CART1], this.waitstatesPrefetch32[this.REGION_CART2] = this.waitstatesPrefetch32[this.REGION_CART2 + 1] = this.waitstatesSeq32[this.REGION_CART2]);
};
b.prototype.saveNeedsFlush = function() {
  return this.save.writePending;
};
b.prototype.flushSave = function() {
  this.save.writePending = !1;
};
b.prototype.allocGPIO = function(t) {
  return new GameBoyAdvanceGPIO(this.core, t);
};
function T() {
  this.FREQUENCY = 16777216, this.cpu = null, this.enable = !1, this.IRQ_VBLANK = 0, this.IRQ_HBLANK = 1, this.IRQ_VCOUNTER = 2, this.IRQ_TIMER0 = 3, this.IRQ_TIMER1 = 4, this.IRQ_TIMER2 = 5, this.IRQ_TIMER3 = 6, this.IRQ_SIO = 7, this.IRQ_DMA0 = 8, this.IRQ_DMA1 = 9, this.IRQ_DMA2 = 10, this.IRQ_DMA3 = 11, this.IRQ_KEYPAD = 12, this.IRQ_GAMEPAK = 13, this.MASK_VBLANK = 1, this.MASK_HBLANK = 2, this.MASK_VCOUNTER = 4, this.MASK_TIMER0 = 8, this.MASK_TIMER1 = 16, this.MASK_TIMER2 = 32, this.MASK_TIMER3 = 64, this.MASK_SIO = 128, this.MASK_DMA0 = 256, this.MASK_DMA1 = 512, this.MASK_DMA2 = 1024, this.MASK_DMA3 = 2048, this.MASK_KEYPAD = 4096, this.MASK_GAMEPAK = 8192;
}
T.prototype.clear = function() {
  this.enable = !1, this.enabledIRQs = 0, this.interruptFlags = 0, this.dma = new Array();
  for (var t = 0; t < 4; ++t)
    this.dma.push({
      source: 0,
      dest: 0,
      count: 0,
      nextSource: 0,
      nextDest: 0,
      nextCount: 0,
      srcControl: 0,
      dstControl: 0,
      repeat: !1,
      width: 0,
      drq: !1,
      timing: 0,
      doIrq: !1,
      enable: !1,
      nextIRQ: 0
    });
  this.timersEnabled = 0, this.timers = new Array();
  for (var t = 0; t < 4; ++t)
    this.timers.push({
      reload: 0,
      oldReload: 0,
      prescaleBits: 0,
      countUp: !1,
      doIrq: !1,
      enable: !1,
      lastEvent: 0,
      nextEvent: 0,
      overflowInterval: 1
    });
  this.nextEvent = 0, this.springIRQ = !1, this.resetSP();
};
T.prototype.freeze = function() {
  return {
    enable: this.enable,
    enabledIRQs: this.enabledIRQs,
    interruptFlags: this.interruptFlags,
    dma: this.dma,
    timers: this.timers,
    nextEvent: this.nextEvent,
    springIRQ: this.springIRQ
  };
};
T.prototype.defrost = function(t) {
  this.enable = t.enable, this.enabledIRQs = t.enabledIRQs, this.interruptFlags = t.interruptFlags, this.dma = t.dma, this.timers = t.timers, this.timersEnabled = 0, this.timers[0].enable && ++this.timersEnabled, this.timers[1].enable && ++this.timersEnabled, this.timers[2].enable && ++this.timersEnabled, this.timers[3].enable && ++this.timersEnabled, this.nextEvent = t.nextEvent, this.springIRQ = t.springIRQ;
};
T.prototype.updateTimers = function() {
  if (!(this.nextEvent > this.cpu.cycles)) {
    if (this.springIRQ && (this.cpu.raiseIRQ(), this.springIRQ = !1), this.video.updateTimers(this.cpu), this.audio.updateTimers(), this.timersEnabled) {
      var t = this.timers[0];
      t.enable && this.cpu.cycles >= t.nextEvent && (t.lastEvent = t.nextEvent, t.nextEvent += t.overflowInterval, this.io.registers[this.io.TM0CNT_LO >> 1] = t.reload, t.oldReload = t.reload, t.doIrq && this.raiseIRQ(this.IRQ_TIMER0), this.audio.enabled && (this.audio.enableChannelA && !this.audio.soundTimerA && this.audio.dmaA >= 0 && this.audio.sampleFifoA(), this.audio.enableChannelB && !this.audio.soundTimerB && this.audio.dmaB >= 0 && this.audio.sampleFifoB()), t = this.timers[1], t.countUp && ++this.io.registers[this.io.TM1CNT_LO >> 1] == 65536 && (t.nextEvent = this.cpu.cycles)), t = this.timers[1], t.enable && this.cpu.cycles >= t.nextEvent && (t.lastEvent = t.nextEvent, t.nextEvent += t.overflowInterval, (!t.countUp || this.io.registers[this.io.TM1CNT_LO >> 1] == 65536) && (this.io.registers[this.io.TM1CNT_LO >> 1] = t.reload), t.oldReload = t.reload, t.doIrq && this.raiseIRQ(this.IRQ_TIMER1), t.countUp && (t.nextEvent = 0), this.audio.enabled && (this.audio.enableChannelA && this.audio.soundTimerA && this.audio.dmaA >= 0 && this.audio.sampleFifoA(), this.audio.enableChannelB && this.audio.soundTimerB && this.audio.dmaB >= 0 && this.audio.sampleFifoB()), t = this.timers[2], t.countUp && ++this.io.registers[this.io.TM2CNT_LO >> 1] == 65536 && (t.nextEvent = this.cpu.cycles)), t = this.timers[2], t.enable && this.cpu.cycles >= t.nextEvent && (t.lastEvent = t.nextEvent, t.nextEvent += t.overflowInterval, (!t.countUp || this.io.registers[this.io.TM2CNT_LO >> 1] == 65536) && (this.io.registers[this.io.TM2CNT_LO >> 1] = t.reload), t.oldReload = t.reload, t.doIrq && this.raiseIRQ(this.IRQ_TIMER2), t.countUp && (t.nextEvent = 0), t = this.timers[3], t.countUp && ++this.io.registers[this.io.TM3CNT_LO >> 1] == 65536 && (t.nextEvent = this.cpu.cycles)), t = this.timers[3], t.enable && this.cpu.cycles >= t.nextEvent && (t.lastEvent = t.nextEvent, t.nextEvent += t.overflowInterval, (!t.countUp || this.io.registers[this.io.TM3CNT_LO >> 1] == 65536) && (this.io.registers[this.io.TM3CNT_LO >> 1] = t.reload), t.oldReload = t.reload, t.doIrq && this.raiseIRQ(this.IRQ_TIMER3), t.countUp && (t.nextEvent = 0));
    }
    var e = this.dma[0];
    e.enable && e.doIrq && e.nextIRQ && this.cpu.cycles >= e.nextIRQ && (e.nextIRQ = 0, this.raiseIRQ(this.IRQ_DMA0)), e = this.dma[1], e.enable && e.doIrq && e.nextIRQ && this.cpu.cycles >= e.nextIRQ && (e.nextIRQ = 0, this.raiseIRQ(this.IRQ_DMA1)), e = this.dma[2], e.enable && e.doIrq && e.nextIRQ && this.cpu.cycles >= e.nextIRQ && (e.nextIRQ = 0, this.raiseIRQ(this.IRQ_DMA2)), e = this.dma[3], e.enable && e.doIrq && e.nextIRQ && this.cpu.cycles >= e.nextIRQ && (e.nextIRQ = 0, this.raiseIRQ(this.IRQ_DMA3)), this.pollNextEvent();
  }
};
T.prototype.resetSP = function() {
  this.cpu.switchMode(this.cpu.MODE_SUPERVISOR), this.cpu.gprs[this.cpu.SP] = 50364384, this.cpu.switchMode(this.cpu.MODE_IRQ), this.cpu.gprs[this.cpu.SP] = 50364320, this.cpu.switchMode(this.cpu.MODE_SYSTEM), this.cpu.gprs[this.cpu.SP] = 50364160;
};
T.prototype.swi32 = function(t) {
  this.swi(t >> 16);
};
T.prototype.swi = function(t) {
  if (this.core.mmu.bios.real) {
    this.cpu.raiseTrap();
    return;
  }
  switch (t) {
    case 0:
      for (var e = this.core.mmu.memory[this.core.mmu.REGION_WORKING_IRAM], s = e.loadU8(32762), A = 32256; A < 32768; A += 4)
        e.store32(A, 0);
      this.resetSP(), s ? this.cpu.gprs[this.cpu.LR] = 33554432 : this.cpu.gprs[this.cpu.LR] = 134217728, this.cpu.switchExecMode(this.cpu.MODE_ARM), this.cpu.instruction.writesPC = !0, this.cpu.gprs[this.cpu.PC] = this.cpu.gprs[this.cpu.LR];
      break;
    case 1:
      var r = this.cpu.gprs[0];
      if (r & 1 && (this.core.mmu.memory[this.core.mmu.REGION_WORKING_RAM] = new it(this.core.mmu.SIZE_WORKING_RAM, 9)), r & 2)
        for (var A = 0; A < this.core.mmu.SIZE_WORKING_IRAM - 512; A += 4)
          this.core.mmu.memory[this.core.mmu.REGION_WORKING_IRAM].store32(A, 0);
      r & 28 && this.video.renderPath.clearSubsets(this.core.mmu, r), r & 224 && this.core.STUB("Unimplemented RegisterRamReset");
      break;
    case 2:
      this.halt();
      break;
    case 5:
      this.cpu.gprs[0] = 1, this.cpu.gprs[1] = 1;
    case 4:
      if (this.enable || this.io.store16(this.io.IME, 1), !this.cpu.gprs[0] && this.interruptFlags & this.cpu.gprs[1])
        return;
      this.dismissIRQs(4294967295), this.cpu.raiseTrap();
      break;
    case 6:
      var a = (this.cpu.gprs[0] | 0) / (this.cpu.gprs[1] | 0), h = (this.cpu.gprs[0] | 0) % (this.cpu.gprs[1] | 0);
      this.cpu.gprs[0] = a | 0, this.cpu.gprs[1] = h | 0, this.cpu.gprs[3] = Math.abs(a | 0);
      break;
    case 7:
      var a = (this.cpu.gprs[1] | 0) / (this.cpu.gprs[0] | 0), h = (this.cpu.gprs[1] | 0) % (this.cpu.gprs[0] | 0);
      this.cpu.gprs[0] = a | 0, this.cpu.gprs[1] = h | 0, this.cpu.gprs[3] = Math.abs(a | 0);
      break;
    case 8:
      var n = Math.sqrt(this.cpu.gprs[0]);
      this.cpu.gprs[0] = n | 0;
      break;
    case 10:
      var o = this.cpu.gprs[0] / 16384, p = this.cpu.gprs[1] / 16384;
      this.cpu.gprs[0] = Math.atan2(p, o) / (2 * Math.PI) * 65536;
      break;
    case 11:
      var u = this.cpu.gprs[0], d = this.cpu.gprs[1], f = this.cpu.gprs[2], C = f & 1048575, m = f & 16777216, l = f & 67108864 ? 4 : 2;
      if (m)
        if (l == 4) {
          u &= 4294967292, d &= 4294967292;
          for (var c = this.cpu.mmu.load32(u), A = 0; A < C; ++A)
            this.cpu.mmu.store32(d + (A << 2), c);
        } else {
          u &= 4294967294, d &= 4294967294;
          for (var c = this.cpu.mmu.load16(u), A = 0; A < C; ++A)
            this.cpu.mmu.store16(d + (A << 1), c);
        }
      else if (l == 4) {
        u &= 4294967292, d &= 4294967292;
        for (var A = 0; A < C; ++A) {
          var c = this.cpu.mmu.load32(u + (A << 2));
          this.cpu.mmu.store32(d + (A << 2), c);
        }
      } else {
        u &= 4294967294, d &= 4294967294;
        for (var A = 0; A < C; ++A) {
          var c = this.cpu.mmu.load16(u + (A << 1));
          this.cpu.mmu.store16(d + (A << 1), c);
        }
      }
      return;
    case 12:
      var u = this.cpu.gprs[0] & 4294967292, d = this.cpu.gprs[1] & 4294967292, f = this.cpu.gprs[2], C = f & 1048575;
      C = C + 7 >> 3 << 3;
      var m = f & 16777216;
      if (m)
        for (var c = this.cpu.mmu.load32(u), A = 0; A < C; ++A)
          this.cpu.mmu.store32(d + (A << 2), c);
      else
        for (var A = 0; A < C; ++A) {
          var c = this.cpu.mmu.load32(u + (A << 2));
          this.cpu.mmu.store32(d + (A << 2), c);
        }
      return;
    case 14:
      for (var A = this.cpu.gprs[2], v, g, w, O, D, B, K, _ = this.cpu.gprs[0], y = this.cpu.gprs[1], k, q, z, J, H, L; A--; )
        v = this.core.mmu.load32(_) / 256, g = this.core.mmu.load32(_ + 4) / 256, w = this.core.mmu.load16(_ + 8), O = this.core.mmu.load16(_ + 10), D = this.core.mmu.load16(_ + 12) / 256, B = this.core.mmu.load16(_ + 14) / 256, K = (this.core.mmu.loadU16(_ + 16) >> 8) / 128 * Math.PI, _ += 20, k = J = Math.cos(K), q = z = Math.sin(K), k *= D, q *= -D, z *= B, J *= B, H = v - (k * w + q * O), L = g - (z * w + J * O), this.core.mmu.store16(y, k * 256 | 0), this.core.mmu.store16(y + 2, q * 256 | 0), this.core.mmu.store16(y + 4, z * 256 | 0), this.core.mmu.store16(y + 6, J * 256 | 0), this.core.mmu.store32(y + 8, H * 256 | 0), this.core.mmu.store32(y + 12, L * 256 | 0), y += 16;
      break;
    case 15:
      for (var A = this.cpu.gprs[2], D, B, K, _ = this.cpu.gprs[0], y = this.cpu.gprs[1], j = this.cpu.gprs[3], k, q, z, J; A--; )
        D = this.core.mmu.load16(_) / 256, B = this.core.mmu.load16(_ + 2) / 256, K = (this.core.mmu.loadU16(_ + 4) >> 8) / 128 * Math.PI, _ += 6, k = J = Math.cos(K), q = z = Math.sin(K), k *= D, q *= -D, z *= B, J *= B, this.core.mmu.store16(y, k * 256 | 0), this.core.mmu.store16(y + j, q * 256 | 0), this.core.mmu.store16(y + j * 2, z * 256 | 0), this.core.mmu.store16(y + j * 3, J * 256 | 0), y += j * 4;
      break;
    case 17:
      this.lz77(this.cpu.gprs[0], this.cpu.gprs[1], 1);
      break;
    case 18:
      this.lz77(this.cpu.gprs[0], this.cpu.gprs[1], 2);
      break;
    case 19:
      this.huffman(this.cpu.gprs[0], this.cpu.gprs[1]);
      break;
    case 20:
      this.rl(this.cpu.gprs[0], this.cpu.gprs[1], 1);
      break;
    case 21:
      this.rl(this.cpu.gprs[0], this.cpu.gprs[1], 2);
      break;
    case 31:
      var nt = this.cpu.mmu.load32(this.cpu.gprs[0] + 4);
      this.cpu.gprs[0] = nt / Math.pow(2, (180 - this.cpu.gprs[1] - this.cpu.gprs[2] / 256) / 12) >>> 0;
      break;
    default:
      throw "Unimplemented software interrupt: 0x" + t.toString(16);
  }
};
T.prototype.masterEnable = function(t) {
  this.enable = t, this.enable && this.enabledIRQs & this.interruptFlags && this.cpu.raiseIRQ();
};
T.prototype.setInterruptsEnabled = function(t) {
  this.enabledIRQs = t, this.enabledIRQs & this.MASK_SIO && this.core.STUB("Serial I/O interrupts not implemented"), this.enabledIRQs & this.MASK_KEYPAD && this.core.STUB("Keypad interrupts not implemented"), this.enable && this.enabledIRQs & this.interruptFlags && this.cpu.raiseIRQ();
};
T.prototype.pollNextEvent = function() {
  var t = this.video.nextEvent, e;
  if (this.audio.enabled && (e = this.audio.nextEvent, (!t || e < t) && (t = e)), this.timersEnabled) {
    var s = this.timers[0];
    e = s.nextEvent, s.enable && e && (!t || e < t) && (t = e), s = this.timers[1], e = s.nextEvent, s.enable && e && (!t || e < t) && (t = e), s = this.timers[2], e = s.nextEvent, s.enable && e && (!t || e < t) && (t = e), s = this.timers[3], e = s.nextEvent, s.enable && e && (!t || e < t) && (t = e);
  }
  var r = this.dma[0];
  e = r.nextIRQ, r.enable && r.doIrq && e && (!t || e < t) && (t = e), r = this.dma[1], e = r.nextIRQ, r.enable && r.doIrq && e && (!t || e < t) && (t = e), r = this.dma[2], e = r.nextIRQ, r.enable && r.doIrq && e && (!t || e < t) && (t = e), r = this.dma[3], e = r.nextIRQ, r.enable && r.doIrq && e && (!t || e < t) && (t = e), this.core.ASSERT(t >= this.cpu.cycles, "Next event is before present"), this.nextEvent = t;
};
T.prototype.waitForIRQ = function() {
  var t, e = this.testIRQ() || this.video.hblankIRQ || this.video.vblankIRQ || this.video.vcounterIRQ;
  if (this.timersEnabled && (t = this.timers[0], e = e || t.doIrq, t = this.timers[1], e = e || t.doIrq, t = this.timers[2], e = e || t.doIrq, t = this.timers[3], e = e || t.doIrq), !e)
    return !1;
  for (; ; )
    if (this.pollNextEvent(), this.nextEvent) {
      if (this.cpu.cycles = this.nextEvent, this.updateTimers(), this.interruptFlags)
        return !0;
    } else
      return !1;
};
T.prototype.testIRQ = function() {
  return this.enable && this.enabledIRQs & this.interruptFlags ? (this.springIRQ = !0, this.nextEvent = this.cpu.cycles, !0) : !1;
};
T.prototype.raiseIRQ = function(t) {
  this.interruptFlags |= 1 << t, this.io.registers[this.io.IF >> 1] = this.interruptFlags, this.enable && this.enabledIRQs & 1 << t && this.cpu.raiseIRQ();
};
T.prototype.dismissIRQs = function(t) {
  this.interruptFlags &= ~t, this.io.registers[this.io.IF >> 1] = this.interruptFlags;
};
T.prototype.dmaSetSourceAddress = function(t, e) {
  this.dma[t].source = e & 4294967294;
};
T.prototype.dmaSetDestAddress = function(t, e) {
  this.dma[t].dest = e & 4294967294;
};
T.prototype.dmaSetWordCount = function(t, e) {
  this.dma[t].count = e || (t == 3 ? 65536 : 16384);
};
T.prototype.dmaWriteControl = function(t, e) {
  var s = this.dma[t], r = s.enable;
  s.dstControl = (e & 96) >> 5, s.srcControl = (e & 384) >> 7, s.repeat = !!(e & 512), s.width = e & 1024 ? 4 : 2, s.drq = !!(e & 2048), s.timing = (e & 12288) >> 12, s.doIrq = !!(e & 16384), s.enable = !!(e & 32768), s.nextIRQ = 0, s.drq && this.core.WARN("DRQ not implemented"), !r && s.enable && (s.nextSource = s.source, s.nextDest = s.dest, s.nextCount = s.count, this.cpu.mmu.scheduleDma(t, s));
};
T.prototype.timerSetReload = function(t, e) {
  this.timers[t].reload = e & 65535;
};
T.prototype.timerWriteControl = function(t, e) {
  var s = this.timers[t], r = s.prescaleBits;
  switch (e & 3) {
    case 0:
      s.prescaleBits = 0;
      break;
    case 1:
      s.prescaleBits = 6;
      break;
    case 2:
      s.prescaleBits = 8;
      break;
    case 3:
      s.prescaleBits = 10;
      break;
  }
  s.countUp = !!(e & 4), s.doIrq = !!(e & 64), s.overflowInterval = 65536 - s.reload << s.prescaleBits;
  var a = s.enable;
  s.enable = !!((e & 128) >> 7 << t), !a && s.enable ? (s.countUp ? s.nextEvent = 0 : (s.lastEvent = this.cpu.cycles, s.nextEvent = this.cpu.cycles + s.overflowInterval), this.io.registers[this.io.TM0CNT_LO + (t << 2) >> 1] = s.reload, s.oldReload = s.reload, ++this.timersEnabled) : a && !s.enable ? (s.countUp || (this.io.registers[this.io.TM0CNT_LO + (t << 2) >> 1] = s.oldReload + (this.cpu.cycles - s.lastEvent) >> r), --this.timersEnabled) : s.prescaleBits != r && !s.countUp && (s.nextEvent = s.lastEvent + s.overflowInterval), this.pollNextEvent();
};
T.prototype.timerRead = function(t) {
  var e = this.timers[t];
  return e.enable && !e.countUp ? e.oldReload + (this.cpu.cycles - e.lastEvent) >> e.prescaleBits : this.io.registers[this.io.TM0CNT_LO + (t << 2) >> 1];
};
T.prototype.halt = function() {
  if (!this.enable)
    throw "Requested HALT when interrupts were disabled!";
  if (!this.waitForIRQ())
    throw "Waiting on interrupt forever.";
};
T.prototype.lz77 = function(t, e, s) {
  for (var r = (this.cpu.mmu.load32(t) & 4294967040) >> 8, a, h = t + 4, n = e, o = 0, p, l, c, u = 0, d; r > 0; )
    if (o) {
      if (a & 128)
        for (p = this.cpu.mmu.loadU8(h) | this.cpu.mmu.loadU8(h + 1) << 8, h += 2, l = n - ((p & 15) << 8 | (p & 65280) >> 8) - 1, c = ((p & 240) >> 4) + 3; c-- && r; )
          d = this.cpu.mmu.loadU8(l++), s == 2 ? (u >>= 8, u |= d << 8, n & 1 && this.cpu.mmu.store16(n - 1, u)) : this.cpu.mmu.store8(n, d), --r, ++n;
      else
        d = this.cpu.mmu.loadU8(h++), s == 2 ? (u >>= 8, u |= d << 8, n & 1 && this.cpu.mmu.store16(n - 1, u)) : this.cpu.mmu.store8(n, d), --r, ++n;
      a <<= 1, --o;
    } else
      a = this.cpu.mmu.loadU8(h++), o = 8;
};
T.prototype.huffman = function(t, e) {
  t = t & 4294967292;
  var s = this.cpu.mmu.load32(t), r = s >> 8, a = s & 15;
  if (32 % a)
    throw "Unimplemented unaligned Huffman";
  var h = 4 - r & 3;
  r &= 4294967292;
  var n = [], o = (this.cpu.mmu.loadU8(t + 4) << 1) + 1, p, l = t + 5 + o, c = e & 4294967292, u;
  for (u = 0; u < o; ++u)
    n.push(this.cpu.mmu.loadU8(t + 5 + u));
  var d, f = 0, C, m, v = 0;
  for (d = n[0]; r > 0; ) {
    var g = this.cpu.mmu.load32(l);
    for (l += 4, C = 32; C > 0; --C, g <<= 1) {
      if (typeof d == "number") {
        var w = (f - 1 | 1) + ((d & 63) << 1) + 2;
        d = {
          l: w,
          r: w + 1,
          lTerm: d & 128,
          rTerm: d & 64
        }, n[f] = d;
      }
      if (g & 2147483648)
        if (d.rTerm)
          m = n[d.r];
        else {
          f = d.r, d = n[d.r];
          continue;
        }
      else if (d.lTerm)
        m = n[d.l];
      else {
        f = d.l, d = n[f];
        continue;
      }
      p |= (m & (1 << a) - 1) << v, v += a, f = 0, d = n[0], v == 32 && (v = 0, this.cpu.mmu.store32(c, p), c += 4, r -= 4, p = 0);
    }
  }
  h && this.cpu.mmu.store32(c, p);
};
T.prototype.rl = function(t, e, s) {
  t = t & 4294967292;
  for (var r = (this.cpu.mmu.load32(t) & 4294967040) >> 8, a = 4 - r & 3, h, n, o = t + 4, p = e, l = 0; r > 0; )
    if (h = this.cpu.mmu.loadU8(o++), h & 128)
      for (h &= 127, h += 3, n = this.cpu.mmu.loadU8(o++); h-- && r; )
        --r, s == 2 ? (l >>= 8, l |= n << 8, p & 1 && this.cpu.mmu.store16(p - 1, l)) : this.cpu.mmu.store8(p, n), ++p;
    else
      for (h++; h-- && r; )
        --r, n = this.cpu.mmu.loadU8(o++), s == 2 ? (l >>= 8, l |= n << 8, p & 1 && this.cpu.mmu.store16(p - 1, l)) : this.cpu.mmu.store8(p, n), ++p;
  for (; a--; )
    this.cpu.mmu.store8(p++, 0);
};
function U() {
  this.DISPCNT = 0, this.GREENSWP = 2, this.DISPSTAT = 4, this.VCOUNT = 6, this.BG0CNT = 8, this.BG1CNT = 10, this.BG2CNT = 12, this.BG3CNT = 14, this.BG0HOFS = 16, this.BG0VOFS = 18, this.BG1HOFS = 20, this.BG1VOFS = 22, this.BG2HOFS = 24, this.BG2VOFS = 26, this.BG3HOFS = 28, this.BG3VOFS = 30, this.BG2PA = 32, this.BG2PB = 34, this.BG2PC = 36, this.BG2PD = 38, this.BG2X_LO = 40, this.BG2X_HI = 42, this.BG2Y_LO = 44, this.BG2Y_HI = 46, this.BG3PA = 48, this.BG3PB = 50, this.BG3PC = 52, this.BG3PD = 54, this.BG3X_LO = 56, this.BG3X_HI = 58, this.BG3Y_LO = 60, this.BG3Y_HI = 62, this.WIN0H = 64, this.WIN1H = 66, this.WIN0V = 68, this.WIN1V = 70, this.WININ = 72, this.WINOUT = 74, this.MOSAIC = 76, this.BLDCNT = 80, this.BLDALPHA = 82, this.BLDY = 84, this.SOUND1CNT_LO = 96, this.SOUND1CNT_HI = 98, this.SOUND1CNT_X = 100, this.SOUND2CNT_LO = 104, this.SOUND2CNT_HI = 108, this.SOUND3CNT_LO = 112, this.SOUND3CNT_HI = 114, this.SOUND3CNT_X = 116, this.SOUND4CNT_LO = 120, this.SOUND4CNT_HI = 124, this.SOUNDCNT_LO = 128, this.SOUNDCNT_HI = 130, this.SOUNDCNT_X = 132, this.SOUNDBIAS = 136, this.WAVE_RAM0_LO = 144, this.WAVE_RAM0_HI = 146, this.WAVE_RAM1_LO = 148, this.WAVE_RAM1_HI = 150, this.WAVE_RAM2_LO = 152, this.WAVE_RAM2_HI = 154, this.WAVE_RAM3_LO = 156, this.WAVE_RAM3_HI = 158, this.FIFO_A_LO = 160, this.FIFO_A_HI = 162, this.FIFO_B_LO = 164, this.FIFO_B_HI = 166, this.DMA0SAD_LO = 176, this.DMA0SAD_HI = 178, this.DMA0DAD_LO = 180, this.DMA0DAD_HI = 182, this.DMA0CNT_LO = 184, this.DMA0CNT_HI = 186, this.DMA1SAD_LO = 188, this.DMA1SAD_HI = 190, this.DMA1DAD_LO = 192, this.DMA1DAD_HI = 194, this.DMA1CNT_LO = 196, this.DMA1CNT_HI = 198, this.DMA2SAD_LO = 200, this.DMA2SAD_HI = 202, this.DMA2DAD_LO = 204, this.DMA2DAD_HI = 206, this.DMA2CNT_LO = 208, this.DMA2CNT_HI = 210, this.DMA3SAD_LO = 212, this.DMA3SAD_HI = 214, this.DMA3DAD_LO = 216, this.DMA3DAD_HI = 218, this.DMA3CNT_LO = 220, this.DMA3CNT_HI = 222, this.TM0CNT_LO = 256, this.TM0CNT_HI = 258, this.TM1CNT_LO = 260, this.TM1CNT_HI = 262, this.TM2CNT_LO = 264, this.TM2CNT_HI = 266, this.TM3CNT_LO = 268, this.TM3CNT_HI = 270, this.SIODATA32_LO = 288, this.SIOMULTI0 = 288, this.SIODATA32_HI = 290, this.SIOMULTI1 = 290, this.SIOMULTI2 = 292, this.SIOMULTI3 = 294, this.SIOCNT = 296, this.SIOMLT_SEND = 298, this.SIODATA8 = 298, this.RCNT = 308, this.JOYCNT = 320, this.JOY_RECV = 336, this.JOY_TRANS = 340, this.JOYSTAT = 344, this.KEYINPUT = 304, this.KEYCNT = 306, this.IE = 512, this.IF = 514, this.WAITCNT = 516, this.IME = 520, this.POSTFLG = 768, this.HALTCNT = 769, this.DEFAULT_DISPCNT = 128, this.DEFAULT_SOUNDBIAS = 512, this.DEFAULT_BGPA = 1, this.DEFAULT_BGPD = 1, this.DEFAULT_RCNT = 32768;
}
U.prototype.clear = function() {
  this.registers = new Uint16Array(this.cpu.mmu.SIZE_IO), this.registers[this.DISPCNT >> 1] = this.DEFAULT_DISPCNT, this.registers[this.SOUNDBIAS >> 1] = this.DEFAULT_SOUNDBIAS, this.registers[this.BG2PA >> 1] = this.DEFAULT_BGPA, this.registers[this.BG2PD >> 1] = this.DEFAULT_BGPD, this.registers[this.BG3PA >> 1] = this.DEFAULT_BGPA, this.registers[this.BG3PD >> 1] = this.DEFAULT_BGPD, this.registers[this.RCNT >> 1] = this.DEFAULT_RCNT;
};
U.prototype.freeze = function() {
  return {
    registers: I.prefix(this.registers.buffer)
  };
};
U.prototype.defrost = function(t) {
  this.registers = new Uint16Array(t.registers);
  for (var e = 0; e <= this.BLDY; e += 2)
    this.store16(this.registers[e >> 1]);
};
U.prototype.load8 = function(t) {
  throw "Unimplmeneted unaligned I/O access";
};
U.prototype.load16 = function(t) {
  return this.loadU16(t) << 16 >> 16;
};
U.prototype.load32 = function(t) {
  switch (t &= 4294967292, t) {
    case this.DMA0CNT_LO:
    case this.DMA1CNT_LO:
    case this.DMA2CNT_LO:
    case this.DMA3CNT_LO:
      return this.loadU16(t | 2) << 16;
    case this.IME:
      return this.loadU16(t) & 65535;
    case this.JOY_RECV:
    case this.JOY_TRANS:
      return this.core.STUB("Unimplemented JOY register read: 0x" + t.toString(16)), 0;
  }
  return this.loadU16(t) | this.loadU16(t | 2) << 16;
};
U.prototype.loadU8 = function(t) {
  var e = t & 1, s = this.loadU16(t & 65534);
  return s >>> (e << 3) & 255;
};
U.prototype.loadU16 = function(t) {
  switch (t) {
    case this.DISPCNT:
    case this.BG0CNT:
    case this.BG1CNT:
    case this.BG2CNT:
    case this.BG3CNT:
    case this.WININ:
    case this.WINOUT:
    case this.SOUND1CNT_LO:
    case this.SOUND3CNT_LO:
    case this.SOUNDCNT_LO:
    case this.SOUNDCNT_HI:
    case this.SOUNDBIAS:
    case this.BLDCNT:
    case this.BLDALPHA:
    case this.TM0CNT_HI:
    case this.TM1CNT_HI:
    case this.TM2CNT_HI:
    case this.TM3CNT_HI:
    case this.DMA0CNT_HI:
    case this.DMA1CNT_HI:
    case this.DMA2CNT_HI:
    case this.DMA3CNT_HI:
    case this.RCNT:
    case this.WAITCNT:
    case this.IE:
    case this.IF:
    case this.IME:
    case this.POSTFLG:
      break;
    case this.DISPSTAT:
      return this.registers[t >> 1] | this.video.readDisplayStat();
    case this.VCOUNT:
      return this.video.vcount;
    case this.SOUND1CNT_HI:
    case this.SOUND2CNT_LO:
      return this.registers[t >> 1] & 65472;
    case this.SOUND1CNT_X:
    case this.SOUND2CNT_HI:
    case this.SOUND3CNT_X:
      return this.registers[t >> 1] & 16384;
    case this.SOUND3CNT_HI:
      return this.registers[t >> 1] & 57344;
    case this.SOUND4CNT_LO:
      return this.registers[t >> 1] & 65280;
    case this.SOUND4CNT_HI:
      return this.registers[t >> 1] & 16639;
    case this.SOUNDCNT_X:
      return this.core.STUB("Unimplemented sound register read: SOUNDCNT_X"), this.registers[t >> 1] | 0;
    case this.TM0CNT_LO:
      return this.cpu.irq.timerRead(0);
    case this.TM1CNT_LO:
      return this.cpu.irq.timerRead(1);
    case this.TM2CNT_LO:
      return this.cpu.irq.timerRead(2);
    case this.TM3CNT_LO:
      return this.cpu.irq.timerRead(3);
    case this.SIOCNT:
      return this.sio.readSIOCNT();
    case this.KEYINPUT:
      return this.keypad.pollGamepads(), this.keypad.currentDown;
    case this.KEYCNT:
      return this.core.STUB("Unimplemented I/O register read: KEYCNT"), 0;
    case this.BG0HOFS:
    case this.BG0VOFS:
    case this.BG1HOFS:
    case this.BG1VOFS:
    case this.BG2HOFS:
    case this.BG2VOFS:
    case this.BG3HOFS:
    case this.BG3VOFS:
    case this.BG2PA:
    case this.BG2PB:
    case this.BG2PC:
    case this.BG2PD:
    case this.BG3PA:
    case this.BG3PB:
    case this.BG3PC:
    case this.BG3PD:
    case this.BG2X_LO:
    case this.BG2X_HI:
    case this.BG2Y_LO:
    case this.BG2Y_HI:
    case this.BG3X_LO:
    case this.BG3X_HI:
    case this.BG3Y_LO:
    case this.BG3Y_HI:
    case this.WIN0H:
    case this.WIN1H:
    case this.WIN0V:
    case this.WIN1V:
    case this.BLDY:
    case this.DMA0SAD_LO:
    case this.DMA0SAD_HI:
    case this.DMA0DAD_LO:
    case this.DMA0DAD_HI:
    case this.DMA0CNT_LO:
    case this.DMA1SAD_LO:
    case this.DMA1SAD_HI:
    case this.DMA1DAD_LO:
    case this.DMA1DAD_HI:
    case this.DMA1CNT_LO:
    case this.DMA2SAD_LO:
    case this.DMA2SAD_HI:
    case this.DMA2DAD_LO:
    case this.DMA2DAD_HI:
    case this.DMA2CNT_LO:
    case this.DMA3SAD_LO:
    case this.DMA3SAD_HI:
    case this.DMA3DAD_LO:
    case this.DMA3DAD_HI:
    case this.DMA3CNT_LO:
    case this.FIFO_A_LO:
    case this.FIFO_A_HI:
    case this.FIFO_B_LO:
    case this.FIFO_B_HI:
      return this.core.WARN("Read for write-only register: 0x" + t.toString(16)), this.core.mmu.badMemory.loadU16(0);
    case this.MOSAIC:
      return this.core.WARN("Read for write-only register: 0x" + t.toString(16)), 0;
    case this.SIOMULTI0:
    case this.SIOMULTI1:
    case this.SIOMULTI2:
    case this.SIOMULTI3:
      return this.sio.read(t - this.SIOMULTI0 >> 1);
    case this.SIODATA8:
      return this.core.STUB("Unimplemented SIO register read: 0x" + t.toString(16)), 0;
    case this.JOYCNT:
    case this.JOYSTAT:
      return this.core.STUB("Unimplemented JOY register read: 0x" + t.toString(16)), 0;
    default:
      return this.core.WARN("Bad I/O register read: 0x" + t.toString(16)), this.core.mmu.badMemory.loadU16(0);
  }
  return this.registers[t >> 1];
};
U.prototype.store8 = function(t, e) {
  switch (t) {
    case this.WININ:
      this.value & 63;
      break;
    case this.WININ | 1:
      this.value & 63;
      break;
    case this.WINOUT:
      this.value & 63;
      break;
    case this.WINOUT | 1:
      this.value & 63;
      break;
    case this.SOUND1CNT_LO:
    case this.SOUND1CNT_LO | 1:
    case this.SOUND1CNT_HI:
    case this.SOUND1CNT_HI | 1:
    case this.SOUND1CNT_X:
    case this.SOUND1CNT_X | 1:
    case this.SOUND2CNT_LO:
    case this.SOUND2CNT_LO | 1:
    case this.SOUND2CNT_HI:
    case this.SOUND2CNT_HI | 1:
    case this.SOUND3CNT_LO:
    case this.SOUND3CNT_LO | 1:
    case this.SOUND3CNT_HI:
    case this.SOUND3CNT_HI | 1:
    case this.SOUND3CNT_X:
    case this.SOUND3CNT_X | 1:
    case this.SOUND4CNT_LO:
    case this.SOUND4CNT_LO | 1:
    case this.SOUND4CNT_HI:
    case this.SOUND4CNT_HI | 1:
    case this.SOUNDCNT_LO:
    case this.SOUNDCNT_LO | 1:
    case this.SOUNDCNT_X:
    case this.IF:
    case this.IME:
      break;
    case this.SOUNDBIAS | 1:
      this.STUB_REG("sound", t);
      break;
    case this.HALTCNT:
      e &= 128, e ? this.core.STUB("Stop") : this.core.irq.halt();
      return;
    default:
      this.STUB_REG("8-bit I/O", t);
      break;
  }
  t & 1 ? (e <<= 8, e |= this.registers[t >> 1] & 255) : (e &= 255, e |= this.registers[t >> 1] & 65280), this.store16(t & 268435454, e);
};
U.prototype.store16 = function(t, e) {
  switch (t) {
    case this.DISPCNT:
      this.video.renderPath.writeDisplayControl(e);
      break;
    case this.DISPSTAT:
      e &= this.video.DISPSTAT_MASK, this.video.writeDisplayStat(e);
      break;
    case this.BG0CNT:
      this.video.renderPath.writeBackgroundControl(0, e);
      break;
    case this.BG1CNT:
      this.video.renderPath.writeBackgroundControl(1, e);
      break;
    case this.BG2CNT:
      this.video.renderPath.writeBackgroundControl(2, e);
      break;
    case this.BG3CNT:
      this.video.renderPath.writeBackgroundControl(3, e);
      break;
    case this.BG0HOFS:
      this.video.renderPath.writeBackgroundHOffset(0, e);
      break;
    case this.BG0VOFS:
      this.video.renderPath.writeBackgroundVOffset(0, e);
      break;
    case this.BG1HOFS:
      this.video.renderPath.writeBackgroundHOffset(1, e);
      break;
    case this.BG1VOFS:
      this.video.renderPath.writeBackgroundVOffset(1, e);
      break;
    case this.BG2HOFS:
      this.video.renderPath.writeBackgroundHOffset(2, e);
      break;
    case this.BG2VOFS:
      this.video.renderPath.writeBackgroundVOffset(2, e);
      break;
    case this.BG3HOFS:
      this.video.renderPath.writeBackgroundHOffset(3, e);
      break;
    case this.BG3VOFS:
      this.video.renderPath.writeBackgroundVOffset(3, e);
      break;
    case this.BG2X_LO:
      this.video.renderPath.writeBackgroundRefX(2, this.registers[t >> 1 | 1] << 16 | e);
      break;
    case this.BG2X_HI:
      this.video.renderPath.writeBackgroundRefX(2, this.registers[t >> 1 ^ 1] | e << 16);
      break;
    case this.BG2Y_LO:
      this.video.renderPath.writeBackgroundRefY(2, this.registers[t >> 1 | 1] << 16 | e);
      break;
    case this.BG2Y_HI:
      this.video.renderPath.writeBackgroundRefY(2, this.registers[t >> 1 ^ 1] | e << 16);
      break;
    case this.BG2PA:
      this.video.renderPath.writeBackgroundParamA(2, e);
      break;
    case this.BG2PB:
      this.video.renderPath.writeBackgroundParamB(2, e);
      break;
    case this.BG2PC:
      this.video.renderPath.writeBackgroundParamC(2, e);
      break;
    case this.BG2PD:
      this.video.renderPath.writeBackgroundParamD(2, e);
      break;
    case this.BG3X_LO:
      this.video.renderPath.writeBackgroundRefX(3, this.registers[t >> 1 | 1] << 16 | e);
      break;
    case this.BG3X_HI:
      this.video.renderPath.writeBackgroundRefX(3, this.registers[t >> 1 ^ 1] | e << 16);
      break;
    case this.BG3Y_LO:
      this.video.renderPath.writeBackgroundRefY(3, this.registers[t >> 1 | 1] << 16 | e);
      break;
    case this.BG3Y_HI:
      this.video.renderPath.writeBackgroundRefY(3, this.registers[t >> 1 ^ 1] | e << 16);
      break;
    case this.BG3PA:
      this.video.renderPath.writeBackgroundParamA(3, e);
      break;
    case this.BG3PB:
      this.video.renderPath.writeBackgroundParamB(3, e);
      break;
    case this.BG3PC:
      this.video.renderPath.writeBackgroundParamC(3, e);
      break;
    case this.BG3PD:
      this.video.renderPath.writeBackgroundParamD(3, e);
      break;
    case this.WIN0H:
      this.video.renderPath.writeWin0H(e);
      break;
    case this.WIN1H:
      this.video.renderPath.writeWin1H(e);
      break;
    case this.WIN0V:
      this.video.renderPath.writeWin0V(e);
      break;
    case this.WIN1V:
      this.video.renderPath.writeWin1V(e);
      break;
    case this.WININ:
      e &= 16191, this.video.renderPath.writeWinIn(e);
      break;
    case this.WINOUT:
      e &= 16191, this.video.renderPath.writeWinOut(e);
      break;
    case this.BLDCNT:
      e &= 32767, this.video.renderPath.writeBlendControl(e);
      break;
    case this.BLDALPHA:
      e &= 7967, this.video.renderPath.writeBlendAlpha(e);
      break;
    case this.BLDY:
      e &= 31, this.video.renderPath.writeBlendY(e);
      break;
    case this.MOSAIC:
      this.video.renderPath.writeMosaic(e);
      break;
    case this.SOUND1CNT_LO:
      e &= 127, this.audio.writeSquareChannelSweep(0, e);
      break;
    case this.SOUND1CNT_HI:
      this.audio.writeSquareChannelDLE(0, e);
      break;
    case this.SOUND1CNT_X:
      e &= 51199, this.audio.writeSquareChannelFC(0, e), e &= -32769;
      break;
    case this.SOUND2CNT_LO:
      this.audio.writeSquareChannelDLE(1, e);
      break;
    case this.SOUND2CNT_HI:
      e &= 51199, this.audio.writeSquareChannelFC(1, e), e &= -32769;
      break;
    case this.SOUND3CNT_LO:
      e &= 224, this.audio.writeChannel3Lo(e);
      break;
    case this.SOUND3CNT_HI:
      e &= 57599, this.audio.writeChannel3Hi(e);
      break;
    case this.SOUND3CNT_X:
      e &= 51199, this.audio.writeChannel3X(e), e &= -32769;
      break;
    case this.SOUND4CNT_LO:
      e &= 65343, this.audio.writeChannel4LE(e);
      break;
    case this.SOUND4CNT_HI:
      e &= 49407, this.audio.writeChannel4FC(e), e &= -32769;
      break;
    case this.SOUNDCNT_LO:
      e &= 65399, this.audio.writeSoundControlLo(e);
      break;
    case this.SOUNDCNT_HI:
      e &= 65295, this.audio.writeSoundControlHi(e);
      break;
    case this.SOUNDCNT_X:
      e &= 128, this.audio.writeEnable(e);
      break;
    case this.WAVE_RAM0_LO:
    case this.WAVE_RAM0_HI:
    case this.WAVE_RAM1_LO:
    case this.WAVE_RAM1_HI:
    case this.WAVE_RAM2_LO:
    case this.WAVE_RAM2_HI:
    case this.WAVE_RAM3_LO:
    case this.WAVE_RAM3_HI:
      this.audio.writeWaveData(t - this.WAVE_RAM0_LO, e, 2);
      break;
    case this.DMA0SAD_LO:
    case this.DMA0DAD_LO:
    case this.DMA1SAD_LO:
    case this.DMA1DAD_LO:
    case this.DMA2SAD_LO:
    case this.DMA2DAD_LO:
    case this.DMA3SAD_LO:
    case this.DMA3DAD_LO:
      this.store32(t, this.registers[(t >> 1) + 1] << 16 | e);
      return;
    case this.DMA0SAD_HI:
    case this.DMA0DAD_HI:
    case this.DMA1SAD_HI:
    case this.DMA1DAD_HI:
    case this.DMA2SAD_HI:
    case this.DMA2DAD_HI:
    case this.DMA3SAD_HI:
    case this.DMA3DAD_HI:
      this.store32(t - 2, this.registers[(t >> 1) - 1] | e << 16);
      return;
    case this.DMA0CNT_LO:
      this.cpu.irq.dmaSetWordCount(0, e);
      break;
    case this.DMA0CNT_HI:
      this.registers[t >> 1] = e & 65504, this.cpu.irq.dmaWriteControl(0, e);
      return;
    case this.DMA1CNT_LO:
      this.cpu.irq.dmaSetWordCount(1, e);
      break;
    case this.DMA1CNT_HI:
      this.registers[t >> 1] = e & 65504, this.cpu.irq.dmaWriteControl(1, e);
      return;
    case this.DMA2CNT_LO:
      this.cpu.irq.dmaSetWordCount(2, e);
      break;
    case this.DMA2CNT_HI:
      this.registers[t >> 1] = e & 65504, this.cpu.irq.dmaWriteControl(2, e);
      return;
    case this.DMA3CNT_LO:
      this.cpu.irq.dmaSetWordCount(3, e);
      break;
    case this.DMA3CNT_HI:
      this.registers[t >> 1] = e & 65504, this.cpu.irq.dmaWriteControl(3, e);
      return;
    case this.TM0CNT_LO:
      this.cpu.irq.timerSetReload(0, e);
      return;
    case this.TM1CNT_LO:
      this.cpu.irq.timerSetReload(1, e);
      return;
    case this.TM2CNT_LO:
      this.cpu.irq.timerSetReload(2, e);
      return;
    case this.TM3CNT_LO:
      this.cpu.irq.timerSetReload(3, e);
      return;
    case this.TM0CNT_HI:
      e &= 199, this.cpu.irq.timerWriteControl(0, e);
      break;
    case this.TM1CNT_HI:
      e &= 199, this.cpu.irq.timerWriteControl(1, e);
      break;
    case this.TM2CNT_HI:
      e &= 199, this.cpu.irq.timerWriteControl(2, e);
      break;
    case this.TM3CNT_HI:
      e &= 199, this.cpu.irq.timerWriteControl(3, e);
      break;
    case this.SIOMULTI0:
    case this.SIOMULTI1:
    case this.SIOMULTI2:
    case this.SIOMULTI3:
    case this.SIODATA8:
      this.STUB_REG("SIO", t);
      break;
    case this.RCNT:
      this.sio.setMode(e >> 12 & 12 | this.registers[this.SIOCNT >> 1] >> 12 & 3), this.sio.writeRCNT(e);
      break;
    case this.SIOCNT:
      this.sio.setMode(e >> 12 & 3 | this.registers[this.RCNT >> 1] >> 12 & 12), this.sio.writeSIOCNT(e);
      return;
    case this.JOYCNT:
    case this.JOYSTAT:
      this.STUB_REG("JOY", t);
      break;
    case this.IE:
      e &= 16383, this.cpu.irq.setInterruptsEnabled(e);
      break;
    case this.IF:
      this.cpu.irq.dismissIRQs(e);
      return;
    case this.WAITCNT:
      e &= 57343, this.cpu.mmu.adjustTimings(e);
      break;
    case this.IME:
      e &= 1, this.cpu.irq.masterEnable(e);
      break;
    default:
      this.STUB_REG("I/O", t);
  }
  this.registers[t >> 1] = e;
};
U.prototype.store32 = function(t, e) {
  switch (t) {
    case this.BG2X_LO:
      e &= 268435455, this.video.renderPath.writeBackgroundRefX(2, e);
      break;
    case this.BG2Y_LO:
      e &= 268435455, this.video.renderPath.writeBackgroundRefY(2, e);
      break;
    case this.BG3X_LO:
      e &= 268435455, this.video.renderPath.writeBackgroundRefX(3, e);
      break;
    case this.BG3Y_LO:
      e &= 268435455, this.video.renderPath.writeBackgroundRefY(3, e);
      break;
    case this.DMA0SAD_LO:
      this.cpu.irq.dmaSetSourceAddress(0, e);
      break;
    case this.DMA0DAD_LO:
      this.cpu.irq.dmaSetDestAddress(0, e);
      break;
    case this.DMA1SAD_LO:
      this.cpu.irq.dmaSetSourceAddress(1, e);
      break;
    case this.DMA1DAD_LO:
      this.cpu.irq.dmaSetDestAddress(1, e);
      break;
    case this.DMA2SAD_LO:
      this.cpu.irq.dmaSetSourceAddress(2, e);
      break;
    case this.DMA2DAD_LO:
      this.cpu.irq.dmaSetDestAddress(2, e);
      break;
    case this.DMA3SAD_LO:
      this.cpu.irq.dmaSetSourceAddress(3, e);
      break;
    case this.DMA3DAD_LO:
      this.cpu.irq.dmaSetDestAddress(3, e);
      break;
    case this.FIFO_A_LO:
      this.audio.appendToFifoA(e);
      return;
    case this.FIFO_B_LO:
      this.audio.appendToFifoB(e);
      return;
    case this.IME:
      this.store16(t, e & 65535);
      return;
    case this.JOY_RECV:
    case this.JOY_TRANS:
      this.STUB_REG("JOY", t);
      return;
    default:
      this.store16(t, e & 65535), this.store16(t | 2, e >>> 16);
      return;
  }
  this.registers[t >> 1] = e & 65535, this.registers[(t >> 1) + 1] = e >>> 16;
};
U.prototype.invalidatePage = function(t) {
};
U.prototype.STUB_REG = function(t, e) {
  this.core.STUB("Unimplemented " + t + " register write: " + e.toString(16));
};
function E() {
  if (globalThis.AudioContext = globalThis.AudioContext || globalThis.webkitAudioContext, globalThis.AudioContext) {
    var t = this;
    this.context = new AudioContext(), this.bufferSize = 0, this.bufferSize = 4096, this.maxSamples = this.bufferSize << 2, this.buffers = [new Float32Array(this.maxSamples), new Float32Array(this.maxSamples)], this.sampleMask = this.maxSamples - 1, this.context.createScriptProcessor ? this.jsAudio = this.context.createScriptProcessor(this.bufferSize) : this.jsAudio = this.context.createJavaScriptNode(this.bufferSize), this.jsAudio.onaudioprocess = function(e) {
      t.audioProcess(e);
    };
  } else
    this.context = null;
  this.masterEnable = !0, this.masterVolume = 1, this.SOUND_MAX = 1024, this.FIFO_MAX = 512, this.PSG_MAX = 128;
}
E.prototype.clear = function() {
  if (this.fifoA = [], this.fifoB = [], this.fifoASample = 0, this.fifoBSample = 0, this.enabled = !1, this.context)
    try {
      this.jsAudio.disconnect(this.context.destination);
    } catch {
    }
  this.enableChannel3 = !1, this.enableChannel4 = !1, this.enableChannelA = !1, this.enableChannelB = !1, this.enableRightChannelA = !1, this.enableLeftChannelA = !1, this.enableRightChannelB = !1, this.enableLeftChannelB = !1, this.playingChannel3 = !1, this.playingChannel4 = !1, this.volumeLeft = 0, this.volumeRight = 0, this.ratioChannelA = 1, this.ratioChannelB = 1, this.enabledLeft = 0, this.enabledRight = 0, this.dmaA = -1, this.dmaB = -1, this.soundTimerA = 0, this.soundTimerB = 0, this.soundRatio = 1, this.soundBias = 512, this.squareChannels = new Array();
  for (var t = 0; t < 2; ++t)
    this.squareChannels[t] = {
      enabled: !1,
      playing: !1,
      sample: 0,
      duty: 0.5,
      increment: 0,
      step: 0,
      initialVolume: 0,
      volume: 0,
      frequency: 0,
      interval: 0,
      sweepSteps: 0,
      sweepIncrement: 0,
      sweepInterval: 0,
      doSweep: !1,
      raise: 0,
      lower: 0,
      nextStep: 0,
      timed: !1,
      length: 0,
      end: 0
    };
  this.waveData = new Uint8Array(32), this.channel3Dimension = 0, this.channel3Bank = 0, this.channel3Volume = 0, this.channel3Interval = 0, this.channel3Next = 0, this.channel3Length = 0, this.channel3Timed = !1, this.channel3End = 0, this.channel3Pointer = 0, this.channel3Sample = 0, this.cpuFrequency = this.core.irq.FREQUENCY, this.channel4 = {
    sample: 0,
    lfsr: 0,
    width: 15,
    interval: this.cpuFrequency / 524288,
    increment: 0,
    step: 0,
    initialVolume: 0,
    volume: 0,
    nextStep: 0,
    timed: !1,
    length: 0,
    end: 0
  }, this.nextEvent = 0, this.nextSample = 0, this.outputPointer = 0, this.samplePointer = 0, this.backup = 0, this.totalSamples = 0, this.sampleRate = 32768, this.sampleInterval = this.cpuFrequency / this.sampleRate, this.resampleRatio = 1, this.context && (this.resampleRatio = this.sampleRate / this.context.sampleRate), this.writeSquareChannelFC(0, 0), this.writeSquareChannelFC(1, 0), this.writeChannel4FC(0);
};
E.prototype.freeze = function() {
  return {
    nextSample: this.nextSample
  };
};
E.prototype.defrost = function(t) {
  this.nextSample = t.nextSample;
};
E.prototype.pause = function(t) {
  if (this.context)
    if (t)
      try {
        this.jsAudio.disconnect(this.context.destination);
      } catch {
      }
    else this.enabled && this.jsAudio.connect(this.context.destination);
};
E.prototype.updateTimers = function() {
  var t = this.cpu.cycles;
  if (!(!this.enabled || t < this.nextEvent && t < this.nextSample)) {
    if (t >= this.nextEvent) {
      var e = this.squareChannels[0];
      if (this.nextEvent = 1 / 0, e.playing && this.updateSquareChannel(e, t), e = this.squareChannels[1], e.playing && this.updateSquareChannel(e, t), this.enableChannel3 && this.playingChannel3) {
        if (t >= this.channel3Next) {
          if (this.channel3Write) {
            var s = this.waveData[this.channel3Pointer >> 1];
            this.channel3Sample = ((s >> ((this.channel3Pointer & 1) << 2) & 15) - 8) / 8, this.channel3Pointer = this.channel3Pointer + 1, this.channel3Dimension && this.channel3Pointer >= 64 ? this.channel3Pointer -= 64 : !this.channel3Bank && this.channel3Pointer >= 32 ? this.channel3Pointer -= 32 : this.channel3Pointer >= 64 && (this.channel3Pointer -= 32);
          }
          this.channel3Next += this.channel3Interval, this.channel3Interval && this.nextEvent > this.channel3Next && (this.nextEvent = this.channel3Next);
        }
        this.channel3Timed && t >= this.channel3End && (this.playingChannel3 = !1);
      }
      if (this.enableChannel4 && this.playingChannel4)
        if (this.channel4.timed && t >= this.channel4.end)
          this.playingChannel4 = !1;
        else {
          if (t >= this.channel4.next) {
            this.channel4.lfsr >>= 1;
            var s = this.channel4.lfsr & 1;
            this.channel4.lfsr |= (this.channel4.lfsr >> 1 & 1 ^ s) << this.channel4.width - 1, this.channel4.next += this.channel4.interval, this.channel4.sample = (s - 0.5) * 2 * this.channel4.volume;
          }
          this.updateEnvelope(this.channel4, t), this.nextEvent > this.channel4.next && (this.nextEvent = this.channel4.next), this.channel4.timed && this.nextEvent > this.channel4.end && (this.nextEvent = this.channel4.end);
        }
    }
    t >= this.nextSample && (this.sample(), this.nextSample += this.sampleInterval), this.nextEvent = Math.ceil(this.nextEvent), (this.nextEvent < t || this.nextSample < t) && this.updateTimers();
  }
};
E.prototype.writeEnable = function(t) {
  if (this.enabled = !!t, this.nextEvent = this.cpu.cycles, this.nextSample = this.nextEvent, this.updateTimers(), this.core.irq.pollNextEvent(), this.context)
    if (t)
      this.jsAudio.connect(this.context.destination);
    else
      try {
        this.jsAudio.disconnect(this.context.destination);
      } catch {
      }
};
E.prototype.writeSoundControlLo = function(t) {
  this.masterVolumeLeft = t & 7, this.masterVolumeRight = t >> 4 & 7, this.enabledLeft = t >> 8 & 15, this.enabledRight = t >> 12 & 15, this.setSquareChannelEnabled(this.squareChannels[0], (this.enabledLeft | this.enabledRight) & 1), this.setSquareChannelEnabled(this.squareChannels[1], (this.enabledLeft | this.enabledRight) & 2), this.enableChannel3 = (this.enabledLeft | this.enabledRight) & 4, this.setChannel4Enabled((this.enabledLeft | this.enabledRight) & 8), this.updateTimers(), this.core.irq.pollNextEvent();
};
E.prototype.writeSoundControlHi = function(t) {
  switch (t & 3) {
    case 0:
      this.soundRatio = 0.25;
      break;
    case 1:
      this.soundRatio = 0.5;
      break;
    case 2:
      this.soundRatio = 1;
      break;
  }
  this.ratioChannelA = (((t & 4) >> 2) + 1) * 0.5, this.ratioChannelB = (((t & 8) >> 3) + 1) * 0.5, this.enableRightChannelA = t & 256, this.enableLeftChannelA = t & 512, this.enableChannelA = t & 768, this.soundTimerA = t & 1024, t & 2048 && (this.fifoA = []), this.enableRightChannelB = t & 4096, this.enableLeftChannelB = t & 8192, this.enableChannelB = t & 12288, this.soundTimerB = t & 16384, t & 32768 && (this.fifoB = []);
};
E.prototype.resetSquareChannel = function(t) {
  t.step && (t.nextStep = this.cpu.cycles + t.step), t.enabled && !t.playing && (t.raise = this.cpu.cycles, t.lower = t.raise + t.duty * t.interval, t.end = this.cpu.cycles + t.length, this.nextEvent = this.cpu.cycles), t.playing = t.enabled, this.updateTimers(), this.core.irq.pollNextEvent();
};
E.prototype.setSquareChannelEnabled = function(t, e) {
  !(t.enabled && t.playing) && e ? (t.enabled = !!e, this.updateTimers(), this.core.irq.pollNextEvent()) : t.enabled = !!e;
};
E.prototype.writeSquareChannelSweep = function(t, e) {
  var s = this.squareChannels[t];
  s.sweepSteps = e & 7, s.sweepIncrement = e & 8 ? -1 : 1, s.sweepInterval = (e >> 4 & 7) * this.cpuFrequency / 128, s.doSweep = !!s.sweepInterval, s.nextSweep = this.cpu.cycles + s.sweepInterval, this.resetSquareChannel(s);
};
E.prototype.writeSquareChannelDLE = function(t, e) {
  var s = this.squareChannels[t], r = e >> 6 & 3;
  switch (r) {
    case 0:
      s.duty = 0.125;
      break;
    case 1:
      s.duty = 0.25;
      break;
    case 2:
      s.duty = 0.5;
      break;
    case 3:
      s.duty = 0.75;
      break;
  }
  this.writeChannelLE(s, e), this.resetSquareChannel(s);
};
E.prototype.writeSquareChannelFC = function(t, e) {
  var s = this.squareChannels[t], r = e & 2047;
  s.frequency = r, s.interval = this.cpuFrequency * (2048 - r) / 131072, s.timed = !!(e & 16384), e & 32768 && (this.resetSquareChannel(s), s.volume = s.initialVolume);
};
E.prototype.updateSquareChannel = function(t, e) {
  if (t.timed && e >= t.end) {
    t.playing = !1;
    return;
  }
  if (t.doSweep && e >= t.nextSweep) {
    if (t.frequency += t.sweepIncrement * (t.frequency >> t.sweepSteps), t.frequency < 0)
      t.frequency = 0;
    else if (t.frequency > 2047) {
      t.frequency = 2047, t.playing = !1;
      return;
    }
    t.interval = this.cpuFrequency * (2048 - t.frequency) / 131072, t.nextSweep += t.sweepInterval;
  }
  e >= t.raise ? (t.sample = t.volume, t.lower = t.raise + t.duty * t.interval, t.raise += t.interval) : e >= t.lower && (t.sample = -t.volume, t.lower += t.interval), this.updateEnvelope(t, e), this.nextEvent > t.raise && (this.nextEvent = t.raise), this.nextEvent > t.lower && (this.nextEvent = t.lower), t.timed && this.nextEvent > t.end && (this.nextEvent = t.end), t.doSweep && this.nextEvent > t.nextSweep && (this.nextEvent = t.nextSweep);
};
E.prototype.writeChannel3Lo = function(t) {
  this.channel3Dimension = t & 32, this.channel3Bank = t & 64;
  var e = t & 128;
  !this.channel3Write && e ? (this.channel3Write = e, this.resetChannel3()) : this.channel3Write = e;
};
E.prototype.writeChannel3Hi = function(t) {
  this.channel3Length = this.cpuFrequency * (256 - (t & 255)) / 256;
  var e = t >> 13 & 7;
  switch (e) {
    case 0:
      this.channel3Volume = 0;
      break;
    case 1:
      this.channel3Volume = 1;
      break;
    case 2:
      this.channel3Volume = 0.5;
      break;
    case 3:
      this.channel3Volume = 0.25;
      break;
    default:
      this.channel3Volume = 0.75;
  }
};
E.prototype.writeChannel3X = function(t) {
  this.channel3Interval = this.cpuFrequency * (2048 - (t & 2047)) / 2097152, this.channel3Timed = !!(t & 16384), this.channel3Write && this.resetChannel3();
};
E.prototype.resetChannel3 = function() {
  this.channel3Next = this.cpu.cycles, this.nextEvent = this.channel3Next, this.channel3End = this.cpu.cycles + this.channel3Length, this.playingChannel3 = this.channel3Write, this.updateTimers(), this.core.irq.pollNextEvent();
};
E.prototype.writeWaveData = function(t, e, s) {
  this.channel3Bank || (t += 16), s == 2 && (this.waveData[t] = e & 255, e >>= 8, ++t), this.waveData[t] = e & 255;
};
E.prototype.setChannel4Enabled = function(t) {
  !this.enableChannel4 && t ? (this.channel4.next = this.cpu.cycles, this.channel4.end = this.cpu.cycles + this.channel4.length, this.enableChannel4 = !0, this.playingChannel4 = !0, this.nextEvent = this.cpu.cycles, this.updateEnvelope(this.channel4), this.updateTimers(), this.core.irq.pollNextEvent()) : this.enableChannel4 = t;
};
E.prototype.writeChannel4LE = function(t) {
  this.writeChannelLE(this.channel4, t), this.resetChannel4();
};
E.prototype.writeChannel4FC = function(t) {
  this.channel4.timed = !!(t & 16384);
  var e = t & 7;
  e || (e = 0.5);
  var s = t >> 4 & 15, r = this.cpuFrequency * (e * (2 << s)) / 524288;
  r != this.channel4.interval && (this.channel4.interval = r, this.resetChannel4());
  var a = t & 8 ? 7 : 15;
  a != this.channel4.width && (this.channel4.width = a, this.resetChannel4()), t & 32768 && this.resetChannel4();
};
E.prototype.resetChannel4 = function() {
  this.channel4.width == 15 ? this.channel4.lfsr = 16384 : this.channel4.lfsr = 64, this.channel4.volume = this.channel4.initialVolume, this.channel4.step && (this.channel4.nextStep = this.cpu.cycles + this.channel4.step), this.channel4.end = this.cpu.cycles + this.channel4.length, this.channel4.next = this.cpu.cycles, this.nextEvent = this.channel4.next, this.playingChannel4 = this.enableChannel4, this.updateTimers(), this.core.irq.pollNextEvent();
};
E.prototype.writeChannelLE = function(t, e) {
  t.length = this.cpuFrequency * ((64 - (e & 63)) / 256), e & 2048 ? t.increment = 1 / 16 : t.increment = -1 / 16, t.initialVolume = (e >> 12 & 15) / 16, t.step = this.cpuFrequency * ((e >> 8 & 7) / 64);
};
E.prototype.updateEnvelope = function(t, e) {
  t.step && (e >= t.nextStep && (t.volume += t.increment, t.volume > 1 ? t.volume = 1 : t.volume < 0 && (t.volume = 0), t.nextStep += t.step), this.nextEvent > t.nextStep && (this.nextEvent = t.nextStep));
};
E.prototype.appendToFifoA = function(t) {
  var e;
  this.fifoA.length > 28 && (this.fifoA = this.fifoA.slice(-28));
  for (var s = 0; s < 4; ++s)
    e = (t & 255) << 24, t >>= 8, this.fifoA.push(e / 2147483648);
};
E.prototype.appendToFifoB = function(t) {
  var e;
  this.fifoB.length > 28 && (this.fifoB = this.fifoB.slice(-28));
  for (var s = 0; s < 4; ++s)
    e = (t & 255) << 24, t >>= 8, this.fifoB.push(e / 2147483648);
};
E.prototype.sampleFifoA = function() {
  if (this.fifoA.length <= 16) {
    var t = this.core.irq.dma[this.dmaA];
    t.nextCount = 4, this.core.mmu.serviceDma(this.dmaA, t);
  }
  this.fifoASample = this.fifoA.shift();
};
E.prototype.sampleFifoB = function() {
  if (this.fifoB.length <= 16) {
    var t = this.core.irq.dma[this.dmaB];
    t.nextCount = 4, this.core.mmu.serviceDma(this.dmaB, t);
  }
  this.fifoBSample = this.fifoB.shift();
};
E.prototype.scheduleFIFODma = function(t, e) {
  switch (e.dest) {
    case this.cpu.mmu.BASE_IO | this.cpu.irq.io.FIFO_A_LO:
      e.dstControl = 2, this.dmaA = t;
      break;
    case this.cpu.mmu.BASE_IO | this.cpu.irq.io.FIFO_B_LO:
      e.dstControl = 2, this.dmaB = t;
      break;
    default:
      this.core.WARN("Tried to schedule FIFO DMA for non-FIFO destination");
      break;
  }
};
E.prototype.sample = function() {
  var t = 0, e = 0, s, r;
  r = this.squareChannels[0], r.playing && (s = r.sample * this.soundRatio * this.PSG_MAX, this.enabledLeft & 1 && (t += s), this.enabledRight & 1 && (e += s)), r = this.squareChannels[1], r.playing && (s = r.sample * this.soundRatio * this.PSG_MAX, this.enabledLeft & 2 && (t += s), this.enabledRight & 2 && (e += s)), this.playingChannel3 && (s = this.channel3Sample * this.soundRatio * this.channel3Volume * this.PSG_MAX, this.enabledLeft & 4 && (t += s), this.enabledRight & 4 && (e += s)), this.playingChannel4 && (s = this.channel4.sample * this.soundRatio * this.PSG_MAX, this.enabledLeft & 8 && (t += s), this.enabledRight & 8 && (e += s)), this.enableChannelA && (s = this.fifoASample * this.FIFO_MAX * this.ratioChannelA, this.enableLeftChannelA && (t += s), this.enableRightChannelA && (e += s)), this.enableChannelB && (s = this.fifoBSample * this.FIFO_MAX * this.ratioChannelB, this.enableLeftChannelB && (t += s), this.enableRightChannelB && (e += s));
  var a = this.samplePointer;
  t *= this.masterVolume / this.SOUND_MAX, t = Math.max(Math.min(t, 1), -1), e *= this.masterVolume / this.SOUND_MAX, e = Math.max(Math.min(e, 1), -1), this.buffers && (this.buffers[0][a] = t, this.buffers[1][a] = e), this.samplePointer = a + 1 & this.sampleMask;
};
E.prototype.audioProcess = function(t) {
  var e = t.outputBuffer.getChannelData(0), s = t.outputBuffer.getChannelData(1);
  if (this.masterEnable) {
    var r, a = this.outputPointer;
    for (r = 0; r < this.bufferSize; ++r, a += this.resampleRatio) {
      if (a >= this.maxSamples && (a -= this.maxSamples), (a | 0) == this.samplePointer) {
        ++this.backup;
        break;
      }
      e[r] = this.buffers[0][a | 0], s[r] = this.buffers[1][a | 0];
    }
    for (; r < this.bufferSize; ++r)
      e[r] = 0, s[r] = 0;
    this.outputPointer = a, ++this.totalSamples;
  } else
    for (r = 0; r < this.bufferSize; ++r)
      e[r] = 0, s[r] = 0;
};
function G(t) {
  this.buffer = new Uint16Array(t >> 1);
}
G.prototype.load8 = function(t) {
  return this.loadU8(t) << 24 >> 24;
};
G.prototype.load16 = function(t) {
  return this.loadU16(t) << 16 >> 16;
};
G.prototype.loadU8 = function(t) {
  var e = t >> 1;
  return t & 1 ? (this.buffer[e] & 65280) >>> 8 : this.buffer[e] & 255;
};
G.prototype.loadU16 = function(t) {
  return this.buffer[t >> 1];
};
G.prototype.load32 = function(t) {
  return this.buffer[t >> 1 & -2] | this.buffer[t >> 1 | 1] << 16;
};
G.prototype.store8 = function(t, e) {
  this.store16(t, e << 8 | e);
};
G.prototype.store16 = function(t, e) {
  this.buffer[t >> 1] = e;
};
G.prototype.store32 = function(t, e) {
  var s = t >> 1;
  this.store16(t, this.buffer[s] = e & 65535), this.store16(t + 2, this.buffer[s + 1] = e >>> 16);
};
G.prototype.insert = function(t, e) {
  this.buffer.set(e, t);
};
G.prototype.invalidatePage = function(t) {
};
function ht(t) {
  G.call(this, t), this.vram = this.buffer;
}
ht.prototype = Object.create(G.prototype);
function rt(t) {
  G.call(this, t), this.oam = this.buffer, this.objs = new Array(128);
  for (var e = 0; e < 128; ++e)
    this.objs[e] = new at(this, e);
  this.scalerot = new Array(32);
  for (var e = 0; e < 32; ++e)
    this.scalerot[e] = {
      a: 1,
      b: 0,
      c: 0,
      d: 1
    };
}
rt.prototype = Object.create(G.prototype);
rt.prototype.overwrite = function(t) {
  for (var e = 0; e < this.buffer.byteLength >> 1; ++e)
    this.store16(e << 1, t[e]);
};
rt.prototype.store16 = function(t, e) {
  var s = (t & 1016) >> 3, r = this.objs[s], a = this.scalerot[s >> 2];
  switch (r.priority, r.disable, r.y, t & 6) {
    case 0:
      r.y = e & 255;
      var h = r.scalerot;
      r.scalerot = e & 256, r.scalerot ? (r.scalerotOam = this.scalerot[r.scalerotParam], r.doublesize = !!(e & 512), r.disable = 0, r.hflip = 0, r.vflip = 0) : (r.doublesize = !1, r.disable = e & 512, h && (r.hflip = r.scalerotParam & 8, r.vflip = r.scalerotParam & 16)), r.mode = (e & 3072) >> 6, r.mosaic = e & 4096, r.multipalette = e & 8192, r.shape = (e & 49152) >> 14, r.recalcSize();
      break;
    case 2:
      r.x = e & 511, r.scalerot ? (r.scalerotParam = (e & 15872) >> 9, r.scalerotOam = this.scalerot[r.scalerotParam], r.hflip = 0, r.vflip = 0, r.drawScanline = r.drawScanlineAffine) : (r.hflip = e & 4096, r.vflip = e & 8192, r.drawScanline = r.drawScanlineNormal), r.size = (e & 49152) >> 14, r.recalcSize();
      break;
    case 4:
      r.tileBase = e & 1023, r.priority = (e & 3072) >> 10, r.palette = (e & 61440) >> 8;
      break;
    case 6:
      switch (s & 3) {
        case 0:
          a.a = (e << 16) / 16777216;
          break;
        case 1:
          a.b = (e << 16) / 16777216;
          break;
        case 2:
          a.c = (e << 16) / 16777216;
          break;
        case 3:
          a.d = (e << 16) / 16777216;
          break;
      }
      break;
  }
  G.prototype.store16.call(this, t, e);
};
function M() {
  this.colors = [new Array(256), new Array(256)], this.adjustedColors = [new Array(256), new Array(256)], this.passthroughColors = [
    this.colors[0],
    // BG0
    this.colors[0],
    // BG1
    this.colors[0],
    // BG2
    this.colors[0],
    // BG3
    this.colors[1],
    // OBJ
    this.colors[0]
    // Backdrop
  ], this.blendY = 1;
}
M.prototype.overwrite = function(t) {
  for (var e = 0; e < 512; ++e)
    this.store16(e << 1, t[e]);
};
M.prototype.loadU8 = function(t) {
  return this.loadU16(t) >> 8 * (t & 1) & 255;
};
M.prototype.loadU16 = function(t) {
  return this.colors[(t & 512) >> 9][(t & 511) >> 1];
};
M.prototype.load16 = function(t) {
  return this.loadU16(t) << 16 >> 16;
};
M.prototype.load32 = function(t) {
  return this.loadU16(t) | this.loadU16(t + 2) << 16;
};
M.prototype.store16 = function(t, e) {
  var s = (t & 512) >> 9, r = (t & 511) >> 1;
  this.colors[s][r] = e, this.adjustedColors[s][r] = this.adjustColor(e);
};
M.prototype.store32 = function(t, e) {
  this.store16(t, e & 65535), this.store16(t + 2, e >> 16);
};
M.prototype.invalidatePage = function(t) {
};
M.prototype.convert16To32 = function(t, e) {
  var s = (t & 31) << 3, r = (t & 992) >> 2, a = (t & 31744) >> 7;
  e[0] = s, e[1] = r, e[2] = a;
};
M.prototype.mix = function(t, e, s, r) {
  var a = e & 31, h = (e & 992) >> 5, n = (e & 31744) >> 10, o = r & 31, p = (r & 992) >> 5, l = (r & 31744) >> 10, c = Math.min(t * a + s * o, 31), u = Math.min(t * h + s * p, 31), d = Math.min(t * n + s * l, 31);
  return c | u << 5 | d << 10;
};
M.prototype.makeDarkPalettes = function(t) {
  this.adjustColor != this.adjustColorDark && (this.adjustColor = this.adjustColorDark, this.resetPalettes()), this.resetPaletteLayers(t);
};
M.prototype.makeBrightPalettes = function(t) {
  this.adjustColor != this.adjustColorBright && (this.adjustColor = this.adjustColorBright, this.resetPalettes()), this.resetPaletteLayers(t);
};
M.prototype.makeNormalPalettes = function() {
  this.passthroughColors[0] = this.colors[0], this.passthroughColors[1] = this.colors[0], this.passthroughColors[2] = this.colors[0], this.passthroughColors[3] = this.colors[0], this.passthroughColors[4] = this.colors[1], this.passthroughColors[5] = this.colors[0];
};
M.prototype.makeSpecialPalette = function(t) {
  this.passthroughColors[t] = this.adjustedColors[t == 4 ? 1 : 0];
};
M.prototype.makeNormalPalette = function(t) {
  this.passthroughColors[t] = this.colors[t == 4 ? 1 : 0];
};
M.prototype.resetPaletteLayers = function(t) {
  t & 1 ? this.passthroughColors[0] = this.adjustedColors[0] : this.passthroughColors[0] = this.colors[0], t & 2 ? this.passthroughColors[1] = this.adjustedColors[0] : this.passthroughColors[1] = this.colors[0], t & 4 ? this.passthroughColors[2] = this.adjustedColors[0] : this.passthroughColors[2] = this.colors[0], t & 8 ? this.passthroughColors[3] = this.adjustedColors[0] : this.passthroughColors[3] = this.colors[0], t & 16 ? this.passthroughColors[4] = this.adjustedColors[1] : this.passthroughColors[4] = this.colors[1], t & 32 ? this.passthroughColors[5] = this.adjustedColors[0] : this.passthroughColors[5] = this.colors[0];
};
M.prototype.resetPalettes = function() {
  var t, e = this.adjustedColors[0], s = this.colors[0];
  for (t = 0; t < 256; ++t)
    e[t] = this.adjustColor(s[t]);
  for (e = this.adjustedColors[1], s = this.colors[1], t = 0; t < 256; ++t)
    e[t] = this.adjustColor(s[t]);
};
M.prototype.accessColor = function(t, e) {
  return this.passthroughColors[t][e];
};
M.prototype.adjustColorDark = function(t) {
  var e = t & 31, s = (t & 992) >> 5, r = (t & 31744) >> 10;
  return e = e - e * this.blendY, s = s - s * this.blendY, r = r - r * this.blendY, e | s << 5 | r << 10;
};
M.prototype.adjustColorBright = function(t) {
  var e = t & 31, s = (t & 992) >> 5, r = (t & 31744) >> 10;
  return e = e + (31 - e) * this.blendY, s = s + (31 - s) * this.blendY, r = r + (31 - r) * this.blendY, e | s << 5 | r << 10;
};
M.prototype.adjustColor = M.prototype.adjustColorBright;
M.prototype.setBlendY = function(t) {
  this.blendY != t && (this.blendY = t, this.resetPalettes());
};
function at(t, e) {
  this.TILE_OFFSET = 65536, this.oam = t, this.index = e, this.x = 0, this.y = 0, this.scalerot = 0, this.doublesize = !1, this.disable = 1, this.mode = 0, this.mosaic = !1, this.multipalette = !1, this.shape = 0, this.scalerotParam = 0, this.hflip = 0, this.vflip = 0, this.tileBase = 0, this.priority = 0, this.palette = 0, this.drawScanline = this.drawScanlineNormal, this.pushPixel = S.pushPixel, this.cachedWidth = 8, this.cachedHeight = 8;
}
at.prototype.drawScanlineNormal = function(t, e, s, r, a) {
  var h = this.oam.video, n, o, p, l = this.mode | h.target2[h.LAYER_OBJ] | this.priority << 1;
  this.mode == 16 && (l |= h.TARGET1_MASK), h.blendMode == 1 && h.alphaEnabled && (l |= h.target1[h.LAYER_OBJ]);
  var c = this.cachedWidth;
  this.x < h.HORIZONTAL_PIXELS ? (this.x < r ? (o = r - this.x, p = r) : (o = 0, p = this.x), a < this.cachedWidth + this.x && (c = a - this.x)) : (o = r + 512 - this.x, p = r, a < this.cachedWidth - o && (c = a));
  var u, d;
  this.vflip ? d = this.cachedHeight - e + s - 1 : d = e - s;
  var f = d & 7, C, m, v = this.multipalette ? 1 : 0;
  h.objCharacterMapping ? m = (d & 504) * this.cachedWidth >> 6 : m = (d & 504) << 2 - v, this.mosaic && (C = h.objMosaicX - 1 - (h.objMosaicX + p - 1) % h.objMosaicX, p += C, o += C), this.hflip ? u = this.cachedWidth - o - 1 : u = o;
  var g = h.accessTile(this.TILE_OFFSET + (n & 4) * v, this.tileBase + (m << v) + ((u & 504) >> 3 - v), f << v);
  for (n = o; n < c; ++n)
    C = this.mosaic ? p % h.objMosaicX : 0, this.hflip ? u = this.cachedWidth - (n - C) - 1 : u = n - C, v ? (!(n & 3) || this.mosaic && !C) && (g = h.accessTile(this.TILE_OFFSET + (u & 4), this.tileBase + (m << 1) + ((u & 504) >> 2), f << 1)) : (!(n & 7) || this.mosaic && !C) && (g = h.accessTile(this.TILE_OFFSET, this.tileBase + m + (u >> 3), f)), this.pushPixel(h.LAYER_OBJ, this, h, g, u & 7, p, t, l, !1), p++;
};
at.prototype.drawScanlineAffine = function(t, e, s, r, a) {
  var h = this.oam.video, n, o, p, l = this.mode | h.target2[h.LAYER_OBJ] | this.priority << 1;
  this.mode == 16 && (l |= h.TARGET1_MASK), h.blendMode == 1 && h.alphaEnabled && (l |= h.target1[h.LAYER_OBJ]);
  var c, u, d = e - s, f, C = this.multipalette ? 1 : 0, m = this.cachedWidth << this.doublesize, v = this.cachedHeight << this.doublesize, g = m;
  for (g > h.HORIZONTAL_PIXELS && (m = h.HORIZONTAL_PIXELS), this.x < h.HORIZONTAL_PIXELS ? (this.x < r ? (o = r - this.x, p = r) : (o = 0, p = this.x), a < g + this.x && (g = a - this.x)) : (o = r + 512 - this.x, p = r, a < g - o && (g = a)), n = o; n < g; ++n) {
    if (c = this.scalerotOam.a * (n - (m >> 1)) + this.scalerotOam.b * (d - (v >> 1)) + (this.cachedWidth >> 1), u = this.scalerotOam.c * (n - (m >> 1)) + this.scalerotOam.d * (d - (v >> 1)) + (this.cachedHeight >> 1), this.mosaic && (c -= n % h.objMosaicX * this.scalerotOam.a + e % h.objMosaicY * this.scalerotOam.b, u -= n % h.objMosaicX * this.scalerotOam.c + e % h.objMosaicY * this.scalerotOam.d), c < 0 || c >= this.cachedWidth || u < 0 || u >= this.cachedHeight) {
      p++;
      continue;
    }
    h.objCharacterMapping ? f = (u & 504) * this.cachedWidth >> 6 : f = (u & 504) << 2 - C, tileRow = h.accessTile(this.TILE_OFFSET + (c & 4) * C, this.tileBase + (f << C) + ((c & 504) >> 3 - C), (u & 7) << C), this.pushPixel(h.LAYER_OBJ, this, h, tileRow, c & 7, p, t, l, !1), p++;
  }
};
at.prototype.recalcSize = function() {
  switch (this.shape) {
    case 0:
      this.cachedHeight = this.cachedWidth = 8 << this.size;
      break;
    case 1:
      switch (this.size) {
        case 0:
          this.cachedHeight = 8, this.cachedWidth = 16;
          break;
        case 1:
          this.cachedHeight = 8, this.cachedWidth = 32;
          break;
        case 2:
          this.cachedHeight = 16, this.cachedWidth = 32;
          break;
        case 3:
          this.cachedHeight = 32, this.cachedWidth = 64;
          break;
      }
      break;
    case 2:
      switch (this.size) {
        case 0:
          this.cachedHeight = 16, this.cachedWidth = 8;
          break;
        case 1:
          this.cachedHeight = 32, this.cachedWidth = 8;
          break;
        case 2:
          this.cachedHeight = 32, this.cachedWidth = 16;
          break;
        case 3:
          this.cachedHeight = 64, this.cachedWidth = 32;
          break;
      }
      break;
  }
};
function $(t, e) {
  this.video = t, this.bg = !1, this.index = t.LAYER_OBJ, this.priority = e, this.enabled = !1, this.objwin = 0;
}
$.prototype.drawScanline = function(t, e, s, r) {
  var a = this.video.vcount, h, n, o;
  if (!(s >= r)) {
    for (var p = this.video.oam.objs, l = 0; l < p.length; ++l)
      if (o = p[l], !o.disable && (o.mode & this.video.OBJWIN_MASK) == this.objwin && !(!(o.mode & this.video.OBJWIN_MASK) && this.priority != o.priority)) {
        o.y < this.video.VERTICAL_PIXELS ? h = o.y : h = o.y - 256;
        var c;
        o.scalerot ? c = o.cachedHeight << o.doublesize : c = o.cachedHeight, o.mosaic ? n = a - a % this.video.objMosaicY : n = a, h <= a && h + c > a && o.drawScanline(t, n, h, s, r);
      }
  }
};
$.prototype.objComparator = function(t, e) {
  return t.index - e.index;
};
function S() {
  this.LAYER_BG0 = 0, this.LAYER_BG1 = 1, this.LAYER_BG2 = 2, this.LAYER_BG3 = 3, this.LAYER_OBJ = 4, this.LAYER_BACKDROP = 5, this.HORIZONTAL_PIXELS = 240, this.VERTICAL_PIXELS = 160, this.LAYER_MASK = 6, this.BACKGROUND_MASK = 1, this.TARGET2_MASK = 8, this.TARGET1_MASK = 16, this.OBJWIN_MASK = 32, this.WRITTEN_MASK = 128, this.PRIORITY_MASK = this.LAYER_MASK | this.BACKGROUND_MASK, this.drawBackdrop = new function(t) {
    this.bg = !0, this.priority = -1, this.index = t.LAYER_BACKDROP, this.enabled = !0, this.drawScanline = function(e, s, r, a) {
      for (var h = r; h < a; ++h)
        e.stencil[h] & t.WRITTEN_MASK ? e.stencil[h] & t.TARGET1_MASK && (e.color[h] = t.palette.mix(t.blendB, t.palette.accessColor(this.index, 0), t.blendA, e.color[h]), e.stencil[h] = t.WRITTEN_MASK) : (e.color[h] = t.palette.accessColor(this.index, 0), e.stencil[h] = t.WRITTEN_MASK);
    };
  }(this);
}
S.prototype.clear = function(t) {
  this.palette = new M(), this.vram = new ht(t.SIZE_VRAM), this.oam = new rt(t.SIZE_OAM), this.oam.video = this, this.objLayers = [
    new $(this, 0),
    new $(this, 1),
    new $(this, 2),
    new $(this, 3)
  ], this.objwinLayer = new $(this, 4), this.objwinLayer.objwin = this.OBJWIN_MASK, this.backgroundMode = 0, this.displayFrameSelect = 0, this.hblankIntervalFree = 0, this.objCharacterMapping = 0, this.forcedBlank = 1, this.win0 = 0, this.win1 = 0, this.objwin = 0, this.vcount = -1, this.win0Left = 0, this.win0Right = 240, this.win1Left = 0, this.win1Right = 240, this.win0Top = 0, this.win0Bottom = 160, this.win1Top = 0, this.win1Bottom = 160, this.windows = new Array();
  for (var e = 0; e < 4; ++e)
    this.windows.push({
      enabled: [!1, !1, !1, !1, !1, !0],
      special: 0
    });
  this.target1 = new Array(5), this.target2 = new Array(5), this.blendMode = 0, this.blendA = 0, this.blendB = 0, this.blendY = 0, this.bgMosaicX = 1, this.bgMosaicY = 1, this.objMosaicX = 1, this.objMosaicY = 1, this.lastHblank = 0, this.nextHblank = this.HDRAW_LENGTH, this.nextEvent = this.nextHblank, this.nextHblankIRQ = 0, this.nextVblankIRQ = 0, this.nextVcounterIRQ = 0, this.bg = new Array();
  for (var e = 0; e < 4; ++e)
    this.bg.push({
      bg: !0,
      index: e,
      enabled: !1,
      video: this,
      vram: this.vram,
      priority: 0,
      charBase: 0,
      mosaic: !1,
      multipalette: !1,
      screenBase: 0,
      overflow: 0,
      size: 0,
      x: 0,
      y: 0,
      refx: 0,
      refy: 0,
      dx: 1,
      dmx: 0,
      dy: 0,
      dmy: 1,
      sx: 0,
      sy: 0,
      pushPixel: S.pushPixel,
      drawScanline: this.drawScanlineBGMode0
    });
  this.bgModes = [
    this.drawScanlineBGMode0,
    this.drawScanlineBGMode2,
    // Modes 1 and 2 are identical for layers 2 and 3
    this.drawScanlineBGMode2,
    this.drawScanlineBGMode3,
    this.drawScanlineBGMode4,
    this.drawScanlineBGMode5
  ], this.drawLayers = [
    this.bg[0],
    this.bg[1],
    this.bg[2],
    this.bg[3],
    this.objLayers[0],
    this.objLayers[1],
    this.objLayers[2],
    this.objLayers[3],
    this.objwinLayer,
    this.drawBackdrop
  ], objwinActive = !1, this.alphaEnabled = !1, this.scanline = {
    color: new Uint16Array(this.HORIZONTAL_PIXELS),
    // Stencil format:
    // Bits 0-1: Layer
    // Bit 2: Is background
    // Bit 3: Is Target 2
    // Bit 4: Is Target 1
    // Bit 5: Is OBJ Window
    // Bit 6: Reserved
    // Bit 7: Has been written
    stencil: new Uint8Array(this.HORIZONTAL_PIXELS)
  }, this.sharedColor = [0, 0, 0], this.sharedMap = {
    tile: 0,
    hflip: !1,
    vflip: !1,
    palette: 0
  };
};
S.prototype.clearSubsets = function(t, e) {
  e & 4 && this.palette.overwrite(new Uint16Array(t.SIZE_PALETTE >> 1)), e & 8 && this.vram.insert(0, new Uint16Array(t.SIZE_VRAM >> 1)), e & 16 && (this.oam.overwrite(new Uint16Array(t.SIZE_OAM >> 1)), this.oam.video = this);
};
S.prototype.freeze = function() {
};
S.prototype.defrost = function(t) {
};
S.prototype.setBacking = function(t) {
  this.pixelData = t;
  for (var e = 0; e < this.HORIZONTAL_PIXELS * this.VERTICAL_PIXELS * 4; )
    this.pixelData.data[e++] = 255, this.pixelData.data[e++] = 255, this.pixelData.data[e++] = 255, this.pixelData.data[e++] = 255;
};
S.prototype.writeDisplayControl = function(t) {
  this.backgroundMode = t & 7, this.displayFrameSelect = t & 16, this.hblankIntervalFree = t & 32, this.objCharacterMapping = t & 64, this.forcedBlank = t & 128, this.bg[0].enabled = t & 256, this.bg[1].enabled = t & 512, this.bg[2].enabled = t & 1024, this.bg[3].enabled = t & 2048, this.objLayers[0].enabled = t & 4096, this.objLayers[1].enabled = t & 4096, this.objLayers[2].enabled = t & 4096, this.objLayers[3].enabled = t & 4096, this.win0 = t & 8192, this.win1 = t & 16384, this.objwin = t & 32768, this.objwinLayer.enabled = t & 4096 && t & 32768, this.bg[2].multipalette &= -2, this.bg[3].multipalette &= -2, this.backgroundMode > 0 && (this.bg[2].multipalette |= 1), this.backgroundMode == 2 && (this.bg[3].multipalette |= 1), this.resetLayers();
};
S.prototype.writeBackgroundControl = function(t, e) {
  var s = this.bg[t];
  s.priority = e & 3, s.charBase = (e & 12) << 12, s.mosaic = e & 64, s.multipalette &= -129, (t < 2 || this.backgroundMode == 0) && (s.multipalette |= e & 128), s.screenBase = (e & 7936) << 3, s.overflow = e & 8192, s.size = (e & 49152) >> 14, this.drawLayers.sort(this.layerComparator);
};
S.prototype.writeBackgroundHOffset = function(t, e) {
  this.bg[t].x = e & 511;
};
S.prototype.writeBackgroundVOffset = function(t, e) {
  this.bg[t].y = e & 511;
};
S.prototype.writeBackgroundRefX = function(t, e) {
  this.bg[t].refx = (e << 4) / 4096, this.bg[t].sx = this.bg[t].refx;
};
S.prototype.writeBackgroundRefY = function(t, e) {
  this.bg[t].refy = (e << 4) / 4096, this.bg[t].sy = this.bg[t].refy;
};
S.prototype.writeBackgroundParamA = function(t, e) {
  this.bg[t].dx = (e << 16) / 16777216;
};
S.prototype.writeBackgroundParamB = function(t, e) {
  this.bg[t].dmx = (e << 16) / 16777216;
};
S.prototype.writeBackgroundParamC = function(t, e) {
  this.bg[t].dy = (e << 16) / 16777216;
};
S.prototype.writeBackgroundParamD = function(t, e) {
  this.bg[t].dmy = (e << 16) / 16777216;
};
S.prototype.writeWin0H = function(t) {
  this.win0Left = (t & 65280) >> 8, this.win0Right = Math.min(this.HORIZONTAL_PIXELS, t & 255), this.win0Left > this.win0Right && (this.win0Right = this.HORIZONTAL_PIXELS);
};
S.prototype.writeWin1H = function(t) {
  this.win1Left = (t & 65280) >> 8, this.win1Right = Math.min(this.HORIZONTAL_PIXELS, t & 255), this.win1Left > this.win1Right && (this.win1Right = this.HORIZONTAL_PIXELS);
};
S.prototype.writeWin0V = function(t) {
  this.win0Top = (t & 65280) >> 8, this.win0Bottom = Math.min(this.VERTICAL_PIXELS, t & 255), this.win0Top > this.win0Bottom && (this.win0Bottom = this.VERTICAL_PIXELS);
};
S.prototype.writeWin1V = function(t) {
  this.win1Top = (t & 65280) >> 8, this.win1Bottom = Math.min(this.VERTICAL_PIXELS, t & 255), this.win1Top > this.win1Bottom && (this.win1Bottom = this.VERTICAL_PIXELS);
};
S.prototype.writeWindow = function(t, e) {
  var s = this.windows[t];
  s.enabled[0] = e & 1, s.enabled[1] = e & 2, s.enabled[2] = e & 4, s.enabled[3] = e & 8, s.enabled[4] = e & 16, s.special = e & 32;
};
S.prototype.writeWinIn = function(t) {
  this.writeWindow(0, t), this.writeWindow(1, t >> 8);
};
S.prototype.writeWinOut = function(t) {
  this.writeWindow(2, t), this.writeWindow(3, t >> 8);
};
S.prototype.writeBlendControl = function(t) {
  switch (this.target1[0] = !!(t & 1) * this.TARGET1_MASK, this.target1[1] = !!(t & 2) * this.TARGET1_MASK, this.target1[2] = !!(t & 4) * this.TARGET1_MASK, this.target1[3] = !!(t & 8) * this.TARGET1_MASK, this.target1[4] = !!(t & 16) * this.TARGET1_MASK, this.target1[5] = !!(t & 32) * this.TARGET1_MASK, this.target2[0] = !!(t & 256) * this.TARGET2_MASK, this.target2[1] = !!(t & 512) * this.TARGET2_MASK, this.target2[2] = !!(t & 1024) * this.TARGET2_MASK, this.target2[3] = !!(t & 2048) * this.TARGET2_MASK, this.target2[4] = !!(t & 4096) * this.TARGET2_MASK, this.target2[5] = !!(t & 8192) * this.TARGET2_MASK, this.blendMode = (t & 192) >> 6, this.blendMode) {
    case 1:
    case 0:
      this.palette.makeNormalPalettes();
      break;
    case 2:
      this.palette.makeBrightPalettes(t & 63);
      break;
    case 3:
      this.palette.makeDarkPalettes(t & 63);
      break;
  }
};
S.prototype.setBlendEnabled = function(t, e, s) {
  if (this.alphaEnabled = e && s == 1, e)
    switch (s) {
      case 1:
      case 0:
        this.palette.makeNormalPalette(t);
        break;
      case 2:
      case 3:
        this.palette.makeSpecialPalette(t);
        break;
    }
  else
    this.palette.makeNormalPalette(t);
};
S.prototype.writeBlendAlpha = function(t) {
  this.blendA = (t & 31) / 16, this.blendA > 1 && (this.blendA = 1), this.blendB = ((t & 7936) >> 8) / 16, this.blendB > 1 && (this.blendB = 1);
};
S.prototype.writeBlendY = function(t) {
  this.blendY = t, this.palette.setBlendY(t >= 16 ? 1 : t / 16);
};
S.prototype.writeMosaic = function(t) {
  this.bgMosaicX = (t & 15) + 1, this.bgMosaicY = (t >> 4 & 15) + 1, this.objMosaicX = (t >> 8 & 15) + 1, this.objMosaicY = (t >> 12 & 15) + 1;
};
S.prototype.resetLayers = function() {
  this.backgroundMode > 1 && (this.bg[0].enabled = !1, this.bg[1].enabled = !1), this.bg[2].enabled && (this.bg[2].drawScanline = this.bgModes[this.backgroundMode]), this.backgroundMode == 0 || this.backgroundMode == 2 ? this.bg[3].enabled && (this.bg[3].drawScanline = this.bgModes[this.backgroundMode]) : this.bg[3].enabled = !1, this.drawLayers.sort(this.layerComparator);
};
S.prototype.layerComparator = function(t, e) {
  var s = e.priority - t.priority;
  return s || (t.bg && !e.bg ? -1 : !t.bg && e.bg ? 1 : e.index - t.index);
};
S.prototype.accessMapMode0 = function(t, e, s, r, a) {
  var h = t + (s >> 2 & 62) + r;
  e & 1 && (h += (s & 256) << 3);
  var n = this.vram.loadU16(h);
  a.tile = n & 1023, a.hflip = n & 1024, a.vflip = n & 2048, a.palette = (n & 61440) >> 8;
};
S.prototype.accessMapMode1 = function(t, e, s, r, a) {
  var h = t + (s >> 3) + r;
  a.tile = this.vram.loadU8(h);
};
S.prototype.accessTile = function(t, e, s) {
  var r = t + (e << 5);
  return r |= s << 2, this.vram.load32(r);
};
S.pushPixel = function(t, e, s, r, a, h, n, o, p) {
  var l;
  if (!p)
    if (this.multipalette ? l = r >> (a << 3) & 255 : l = r >> (a << 2) & 15, l)
      this.multipalette || (l |= e.palette);
    else return;
  var c = s.WRITTEN_MASK, u = n.stencil[h], d = s.blendMode;
  if (s.objwinActive)
    if (u & s.OBJWIN_MASK)
      if (s.windows[3].enabled[t])
        s.setBlendEnabled(t, s.windows[3].special && s.target1[t], d), s.windows[3].special && s.alphaEnabled && (o |= s.target1[t]), c |= s.OBJWIN_MASK;
      else
        return;
    else if (s.windows[2].enabled[t])
      s.setBlendEnabled(t, s.windows[2].special && s.target1[t], d), s.windows[2].special && s.alphaEnabled && (o |= s.target1[t]);
    else
      return;
  o & s.TARGET1_MASK && u & s.TARGET2_MASK && s.setBlendEnabled(t, !0, 1);
  var f = p ? r : s.palette.accessColor(t, l);
  o & s.TARGET1_MASK && s.setBlendEnabled(t, !!d, d);
  var C = (o & s.PRIORITY_MASK) < (u & s.PRIORITY_MASK);
  if ((o & s.PRIORITY_MASK) == (u & s.PRIORITY_MASK) && (C = o & s.BACKGROUND_MASK), !(u & s.WRITTEN_MASK))
    c |= o;
  else if (C)
    o & s.TARGET1_MASK && u & s.TARGET2_MASK && (f = s.palette.mix(s.blendA, f, s.blendB, n.color[h])), c |= o & ~s.TARGET1_MASK;
  else if ((o & s.PRIORITY_MASK) > (u & s.PRIORITY_MASK))
    if (c = u & ~(s.TARGET1_MASK | s.TARGET2_MASK), o & s.TARGET2_MASK && u & s.TARGET1_MASK)
      f = s.palette.mix(s.blendB, f, s.blendA, n.color[h]);
    else
      return;
  else
    return;
  if (o & s.OBJWIN_MASK) {
    n.stencil[h] |= s.OBJWIN_MASK;
    return;
  }
  n.color[h] = f, n.stencil[h] = c;
};
S.prototype.identity = function(t) {
  return t;
};
S.prototype.drawScanlineBlank = function(t) {
  for (var e = 0; e < this.HORIZONTAL_PIXELS; ++e)
    t.color[e] = 65535, t.stencil[e] = 0;
};
S.prototype.prepareScanline = function(t) {
  for (var e = 0; e < this.HORIZONTAL_PIXELS; ++e)
    t.stencil[e] = this.target2[this.LAYER_BACKDROP];
};
S.prototype.drawScanlineBGMode0 = function(t, e, s, r) {
  var a = this.video, h, n = a.vcount, o = s, p = e.x, l = e.y, c, u, d = n + l;
  this.mosaic && (d -= n % a.bgMosaicY);
  var f = d & 7, C, m = e.screenBase, v = e.charBase, g = e.size, w = e.index, O = a.sharedMap, H = e.multipalette ? 1 : 0, L = a.target2[w] | e.priority << 1 | a.BACKGROUND_MASK;
  a.blendMode == 1 && a.alphaEnabled && (L |= a.target1[w]);
  var A = d << 3 & 1984;
  g == 2 ? A += d << 3 & 2048 : g == 3 && (A += d << 4 & 4096);
  var D;
  g & 1 ? D = 511 : D = 255, a.accessMapMode0(m, g, s + p & D, A, O);
  var B = a.accessTile(v, O.tile << H, (O.vflip ? 7 - f : f) << H);
  for (h = s; h < r; ++h) {
    if (c = h + p & D, C = this.mosaic ? o % a.bgMosaicX : 0, c -= C, u = c & 7, H) {
      if ((!u || this.mosaic && !C) && a.accessMapMode0(m, g, c, A, O), (!(u & 3) || this.mosaic && !C) && (B = a.accessTile(v + (!!(c & 4) == !O.hflip ? 4 : 0), O.tile << 1, (O.vflip ? 7 - f : f) << 1), !B && !(u & 3))) {
        h += 3, o += 4;
        continue;
      }
    } else if ((!u || this.mosaic && !C) && (a.accessMapMode0(m, g, c, A, O), B = a.accessTile(v, O.tile, O.vflip ? 7 - f : f), !B && !u)) {
      h += 7, o += 8;
      continue;
    }
    O.hflip && (u = 7 - u), e.pushPixel(w, O, a, B, u, o, t, L, !1), o++;
  }
};
S.prototype.drawScanlineBGMode2 = function(t, e, s, r) {
  var a = this.video, h, n = a.vcount, o = s, p, l, c = e.screenBase, u = e.charBase, d = e.size, f = 128 << d, C = e.index, m = a.sharedMap, v, g = a.target2[C] | e.priority << 1 | a.BACKGROUND_MASK;
  a.blendMode == 1 && a.alphaEnabled && (g |= a.target1[C]);
  var w;
  for (h = s; h < r; ++h) {
    if (p = e.dx * h + e.sx, l = e.dy * h + e.sy, this.mosaic && (p -= h % a.bgMosaicX * e.dx + n % a.bgMosaicY * e.dmx, l -= h % a.bgMosaicX * e.dy + n % a.bgMosaicY * e.dmy), e.overflow)
      p &= f - 1, p < 0 && (p += f), l &= f - 1, l < 0 && (l += f);
    else if (p < 0 || l < 0 || p >= f || l >= f) {
      o++;
      continue;
    }
    w = (l << 1 & 2032) << d, a.accessMapMode1(c, d, p, w, m), v = this.vram.loadU8(u + (m.tile << 6) + ((l & 7) << 3) + (p & 7)), e.pushPixel(C, m, a, v, 0, o, t, g, !1), o++;
  }
};
S.prototype.drawScanlineBGMode3 = function(t, e, s, r) {
  var a = this.video, h, n = a.vcount, o = s, p, l, c = e.index, u = a.sharedMap, d, f = a.target2[c] | e.priority << 1 | a.BACKGROUND_MASK;
  for (a.blendMode == 1 && a.alphaEnabled && (f |= a.target1[c]), h = s; h < r; ++h) {
    if (p = e.dx * h + e.sx, l = e.dy * h + e.sy, this.mosaic && (p -= h % a.bgMosaicX * e.dx + n % a.bgMosaicY * e.dmx, l -= h % a.bgMosaicX * e.dy + n % a.bgMosaicY * e.dmy), p < 0 || l < 0 || p >= a.HORIZONTAL_PIXELS || l >= a.VERTICAL_PIXELS) {
      o++;
      continue;
    }
    d = this.vram.loadU16(l * a.HORIZONTAL_PIXELS + p << 1), e.pushPixel(c, u, a, d, 0, o, t, f, !0), o++;
  }
};
S.prototype.drawScanlineBGMode4 = function(t, e, s, r) {
  var a = this.video, h, n = a.vcount, o = s, p, l, c = 0;
  a.displayFrameSelect && (c += 40960), e.size;
  var u = e.index, d = a.sharedMap, f, C = a.target2[u] | e.priority << 1 | a.BACKGROUND_MASK;
  for (a.blendMode == 1 && a.alphaEnabled && (C |= a.target1[u]), h = s; h < r; ++h) {
    if (p = e.dx * h + e.sx, l = 0 | e.dy * h + e.sy, this.mosaic && (p -= h % a.bgMosaicX * e.dx + n % a.bgMosaicY * e.dmx, l -= h % a.bgMosaicX * e.dy + n % a.bgMosaicY * e.dmy), p < 0 || l < 0 || p >= a.HORIZONTAL_PIXELS || l >= a.VERTICAL_PIXELS) {
      o++;
      continue;
    }
    f = this.vram.loadU8(c + l * a.HORIZONTAL_PIXELS + p), e.pushPixel(u, d, a, f, 0, o, t, C, !1), o++;
  }
};
S.prototype.drawScanlineBGMode5 = function(t, e, s, r) {
  var a = this.video, h, n = a.vcount, o = s, p, l, c = 0;
  a.displayFrameSelect && (c += 40960);
  var u = e.index, d = a.sharedMap, f, C = a.target2[u] | e.priority << 1 | a.BACKGROUND_MASK;
  for (a.blendMode == 1 && a.alphaEnabled && (C |= a.target1[u]), h = s; h < r; ++h) {
    if (p = e.dx * h + e.sx, l = e.dy * h + e.sy, this.mosaic && (p -= h % a.bgMosaicX * e.dx + n % a.bgMosaicY * e.dmx, l -= h % a.bgMosaicX * e.dy + n % a.bgMosaicY * e.dmy), p < 0 || l < 0 || p >= 160 || l >= 128) {
      o++;
      continue;
    }
    f = this.vram.loadU16(c + (l * 160 + p) << 1), e.pushPixel(u, d, a, f, 0, o, t, C, !0), o++;
  }
};
S.prototype.drawScanline = function(t) {
  var e = this.scanline;
  if (this.forcedBlank) {
    this.drawScanlineBlank(e);
    return;
  }
  this.prepareScanline(e);
  var s, r, a, h, n;
  this.vcount = t;
  for (var o = 0; o < this.drawLayers.length; ++o)
    s = this.drawLayers[o], s.enabled && (this.objwinActive = !1, this.win0 || this.win1 || this.objwin ? (r = 0, a = this.HORIZONTAL_PIXELS, h = 0, n = this.HORIZONTAL_PIXELS, this.win0 && t >= this.win0Top && t < this.win0Bottom && (this.windows[0].enabled[s.index] && (this.setBlendEnabled(s.index, this.windows[0].special && this.target1[s.index], this.blendMode), s.drawScanline(e, s, this.win0Left, this.win0Right)), r = Math.max(r, this.win0Left), a = Math.min(a, this.win0Left), h = Math.max(h, this.win0Right), n = Math.min(n, this.win0Right)), this.win1 && t >= this.win1Top && t < this.win1Bottom && (this.windows[1].enabled[s.index] && (this.setBlendEnabled(s.index, this.windows[1].special && this.target1[s.index], this.blendMode), !this.windows[0].enabled[s.index] && (this.win1Left < r || this.win1Right < h) ? (s.drawScanline(e, s, this.win1Left, r), s.drawScanline(e, s, n, this.win1Right)) : s.drawScanline(e, s, this.win1Left, this.win1Right)), r = Math.max(r, this.win1Left), a = Math.min(a, this.win1Left), h = Math.max(h, this.win1Right), n = Math.min(n, this.win1Right)), (this.windows[2].enabled[s.index] || this.objwin && this.windows[3].enabled[s.index]) && (this.objwinActive = this.objwin, this.setBlendEnabled(s.index, this.windows[2].special && this.target1[s.index], this.blendMode), a > h ? s.drawScanline(e, s, 0, this.HORIZONTAL_PIXELS) : (a && s.drawScanline(e, s, 0, a), h < this.HORIZONTAL_PIXELS && s.drawScanline(e, s, h, this.HORIZONTAL_PIXELS), n < r && s.drawScanline(e, s, n, r))), this.setBlendEnabled(this.LAYER_BACKDROP, this.target1[this.LAYER_BACKDROP] && this.windows[2].special, this.blendMode)) : (this.setBlendEnabled(s.index, this.target1[s.index], this.blendMode), s.drawScanline(e, s, 0, this.HORIZONTAL_PIXELS)), s.bg && (s.sx += s.dmx, s.sy += s.dmy));
  this.finishScanline(e);
};
S.prototype.finishScanline = function(t) {
  for (var e, s = this.palette.accessColor(this.LAYER_BACKDROP, 0), r = this.vcount * this.HORIZONTAL_PIXELS * 4, a = this.target2[this.LAYER_BACKDROP], h = 0; h < this.HORIZONTAL_PIXELS; ++h)
    t.stencil[h] & this.WRITTEN_MASK ? (e = t.color[h], a && t.stencil[h] & this.TARGET1_MASK && (e = this.palette.mix(this.blendA, e, this.blendB, s)), this.palette.convert16To32(e, this.sharedColor)) : this.palette.convert16To32(s, this.sharedColor), this.pixelData.data[r++] = this.sharedColor[0], this.pixelData.data[r++] = this.sharedColor[1], this.pixelData.data[r++] = this.sharedColor[2], r++;
};
S.prototype.startDraw = function() {
};
S.prototype.finishDraw = function(t) {
  this.bg[2].sx = this.bg[2].refx, this.bg[2].sy = this.bg[2].refy, this.bg[3].sx = this.bg[3].refx, this.bg[3].sy = this.bg[3].refy, t.finishDraw(this.pixelData);
};
function Z() {
  this.renderPath = new S(), this.CYCLES_PER_PIXEL = 4, this.HORIZONTAL_PIXELS = 240, this.HBLANK_PIXELS = 68, this.HDRAW_LENGTH = 1006, this.HBLANK_LENGTH = 226, this.HORIZONTAL_LENGTH = 1232, this.VERTICAL_PIXELS = 160, this.VBLANK_PIXELS = 68, this.VERTICAL_TOTAL_PIXELS = 228, this.TOTAL_LENGTH = 280896, this.drawCallback = function() {
  }, this.vblankCallback = function() {
  };
}
Z.prototype.clear = function() {
  this.renderPath.clear(this.cpu.mmu), this.DISPSTAT_MASK = 65336, this.inHblank = !1, this.inVblank = !1, this.vcounter = 0, this.vblankIRQ = 0, this.hblankIRQ = 0, this.vcounterIRQ = 0, this.vcountSetting = 0, this.vcount = -1, this.lastHblank = 0, this.nextHblank = this.HDRAW_LENGTH, this.nextEvent = this.nextHblank, this.nextHblankIRQ = 0, this.nextVblankIRQ = 0, this.nextVcounterIRQ = 0;
};
Z.prototype.freeze = function() {
  return {
    inHblank: this.inHblank,
    inVblank: this.inVblank,
    vcounter: this.vcounter,
    vblankIRQ: this.vblankIRQ,
    hblankIRQ: this.hblankIRQ,
    vcounterIRQ: this.vcounterIRQ,
    vcountSetting: this.vcountSetting,
    vcount: this.vcount,
    lastHblank: this.lastHblank,
    nextHblank: this.nextHblank,
    nextEvent: this.nextEvent,
    nextHblankIRQ: this.nextHblankIRQ,
    nextVblankIRQ: this.nextVblankIRQ,
    nextVcounterIRQ: this.nextVcounterIRQ,
    renderPath: this.renderPath.freeze(this.core.encodeBase64)
  };
};
Z.prototype.defrost = function(t) {
  this.inHblank = t.inHblank, this.inVblank = t.inVblank, this.vcounter = t.vcounter, this.vblankIRQ = t.vblankIRQ, this.hblankIRQ = t.hblankIRQ, this.vcounterIRQ = t.vcounterIRQ, this.vcountSetting = t.vcountSetting, this.vcount = t.vcount, this.lastHblank = t.lastHblank, this.nextHblank = t.nextHblank, this.nextEvent = t.nextEvent, this.nextHblankIRQ = t.nextHblankIRQ, this.nextVblankIRQ = t.nextVblankIRQ, this.nextVcounterIRQ = t.nextVcounterIRQ, this.renderPath.defrost(t.renderPath, this.core.decodeBase64);
};
Z.prototype.setBacking = function(t) {
  var e = t.createImageData(this.HORIZONTAL_PIXELS, this.VERTICAL_PIXELS);
  this.context = t;
  for (var s = 0; s < this.HORIZONTAL_PIXELS * this.VERTICAL_PIXELS * 4; )
    e.data[s++] = 255, e.data[s++] = 255, e.data[s++] = 255, e.data[s++] = 255;
  this.renderPath.setBacking(e);
};
Z.prototype.updateTimers = function(t) {
  var e = t.cycles;
  if (this.nextEvent <= e)
    if (this.inHblank) {
      switch (this.inHblank = !1, this.nextEvent = this.nextHblank, ++this.vcount, this.vcount) {
        case this.VERTICAL_PIXELS:
          this.inVblank = !0, this.renderPath.finishDraw(this), this.nextVblankIRQ = this.nextEvent + this.TOTAL_LENGTH, this.cpu.mmu.runVblankDmas(), this.vblankIRQ && this.cpu.irq.raiseIRQ(this.cpu.irq.IRQ_VBLANK), this.vblankCallback();
          break;
        case this.VERTICAL_TOTAL_PIXELS - 1:
          this.inVblank = !1;
          break;
        case this.VERTICAL_TOTAL_PIXELS:
          this.vcount = 0, this.renderPath.startDraw();
          break;
      }
      this.vcounter = this.vcount == this.vcountSetting, this.vcounter && this.vcounterIRQ && (this.cpu.irq.raiseIRQ(this.cpu.irq.IRQ_VCOUNTER), this.nextVcounterIRQ += this.TOTAL_LENGTH), this.vcount < this.VERTICAL_PIXELS && this.renderPath.drawScanline(this.vcount);
    } else
      this.inHblank = !0, this.lastHblank = this.nextHblank, this.nextEvent = this.lastHblank + this.HBLANK_LENGTH, this.nextHblank = this.nextEvent + this.HDRAW_LENGTH, this.nextHblankIRQ = this.nextHblank, this.vcount < this.VERTICAL_PIXELS && this.cpu.mmu.runHblankDmas(), this.hblankIRQ && this.cpu.irq.raiseIRQ(this.cpu.irq.IRQ_HBLANK);
};
Z.prototype.writeDisplayStat = function(t) {
  this.vblankIRQ = t & 8, this.hblankIRQ = t & 16, this.vcounterIRQ = t & 32, this.vcountSetting = (t & 65280) >> 8, this.vcounterIRQ && (this.nextVcounterIRQ = this.nextHblank + this.HBLANK_LENGTH + (this.vcountSetting - this.vcount) * this.HORIZONTAL_LENGTH, this.nextVcounterIRQ < this.nextEvent && (this.nextVcounterIRQ += this.TOTAL_LENGTH));
};
Z.prototype.readDisplayStat = function() {
  return this.inVblank | this.inHblank << 1 | this.vcounter << 2;
};
Z.prototype.finishDraw = function(t) {
  this.context.putImageData(t, 0, 0), this.drawCallback();
};
function X() {
  this.KEYCODE_LEFT = 37, this.KEYCODE_UP = 38, this.KEYCODE_RIGHT = 39, this.KEYCODE_DOWN = 40, this.KEYCODE_START = 13, this.KEYCODE_SELECT = 220, this.KEYCODE_A = 90, this.KEYCODE_B = 88, this.KEYCODE_L = 65, this.KEYCODE_R = 83, this.GAMEPAD_LEFT = 14, this.GAMEPAD_UP = 12, this.GAMEPAD_RIGHT = 15, this.GAMEPAD_DOWN = 13, this.GAMEPAD_START = 9, this.GAMEPAD_SELECT = 8, this.GAMEPAD_A = 1, this.GAMEPAD_B = 0, this.GAMEPAD_L = 4, this.GAMEPAD_R = 5, this.GAMEPAD_THRESHOLD = 0.2, this.A = 0, this.B = 1, this.SELECT = 2, this.START = 3, this.RIGHT = 4, this.LEFT = 5, this.UP = 6, this.DOWN = 7, this.R = 8, this.L = 9, this.currentDown = 1023, this.eatInput = !1, this.gamepads = [];
}
X.prototype.keyboardHandler = function(t) {
  var e = 0;
  switch (t.keyCode) {
    case this.KEYCODE_START:
      e = this.START;
      break;
    case this.KEYCODE_SELECT:
      e = this.SELECT;
      break;
    case this.KEYCODE_A:
      e = this.A;
      break;
    case this.KEYCODE_B:
      e = this.B;
      break;
    case this.KEYCODE_L:
      e = this.L;
      break;
    case this.KEYCODE_R:
      e = this.R;
      break;
    case this.KEYCODE_UP:
      e = this.UP;
      break;
    case this.KEYCODE_RIGHT:
      e = this.RIGHT;
      break;
    case this.KEYCODE_DOWN:
      e = this.DOWN;
      break;
    case this.KEYCODE_LEFT:
      e = this.LEFT;
      break;
    default:
      return;
  }
  e = 1 << e, t.type == "keydown" ? this.currentDown &= ~e : this.currentDown |= e, this.eatInput && t.preventDefault();
};
X.prototype.gamepadHandler = function(t) {
  var e = 0;
  t.buttons[this.GAMEPAD_LEFT] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.LEFT), t.buttons[this.GAMEPAD_UP] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.UP), t.buttons[this.GAMEPAD_RIGHT] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.RIGHT), t.buttons[this.GAMEPAD_DOWN] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.DOWN), t.buttons[this.GAMEPAD_START] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.START), t.buttons[this.GAMEPAD_SELECT] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.SELECT), t.buttons[this.GAMEPAD_A] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.A), t.buttons[this.GAMEPAD_B] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.B), t.buttons[this.GAMEPAD_L] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.L), t.buttons[this.GAMEPAD_R] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.R), this.currentDown = ~e & 1023;
};
X.prototype.gamepadConnectHandler = function(t) {
  this.gamepads.push(t);
};
X.prototype.gamepadDisconnectHandler = function(t) {
  this.gamepads = self.gamepads.filter(function(e) {
    return e != t;
  });
};
X.prototype.pollGamepads = function() {
  var t = [];
  navigator.webkitGetGamepads ? t = navigator.webkitGetGamepads() : navigator.getGamepads && (t = navigator.getGamepads()), t.length && (this.gamepads = []);
  for (var e = 0; e < t.length; ++e)
    t[e] && this.gamepads.push(t[e]);
  this.gamepads.length > 0 && this.gamepadHandler(this.gamepads[0]);
};
X.prototype.press = function(t) {
  this.currentDown &= ~(1 << t);
};
X.prototype.release = function(t) {
  this.currentDown |= 1 << t;
};
X.prototype.registerHandlers = function() {
  typeof globalThis < "u" && globalThis.addEventListener && (globalThis.addEventListener("keydown", this.keyboardHandler.bind(this), !0), globalThis.addEventListener("keyup", this.keyboardHandler.bind(this), !0), globalThis.addEventListener("gamepadconnected", this.gamepadConnectHandler.bind(this), !0), globalThis.addEventListener("mozgamepadconnected", this.gamepadConnectHandler.bind(this), !0), globalThis.addEventListener("webkitgamepadconnected", this.gamepadConnectHandler.bind(this), !0), globalThis.addEventListener("gamepaddisconnected", this.gamepadDisconnectHandler.bind(this), !0), globalThis.addEventListener("mozgamepaddisconnected", this.gamepadDisconnectHandler.bind(this), !0), globalThis.addEventListener("webkitgamepaddisconnected", this.gamepadDisconnectHandler.bind(this), !0));
};
function tt() {
  this.SIO_NORMAL_8 = 0, this.SIO_NORMAL_32 = 1, this.SIO_MULTI = 2, this.SIO_UART = 3, this.SIO_GPIO = 8, this.SIO_JOYBUS = 12, this.BAUD = [9600, 38400, 57600, 115200];
}
tt.prototype.clear = function() {
  this.mode = this.SIO_GPIO, this.sd = !1, this.irq = !1, this.multiplayer = {
    baud: 0,
    si: 0,
    id: 0,
    error: 0,
    busy: 0,
    states: [65535, 65535, 65535, 65535]
  }, this.linkLayer = null;
};
tt.prototype.setMode = function(t) {
  t & 8 ? t &= 12 : t &= 3, this.mode = t, this.core.INFO("Setting SIO mode to " + ot(t, 1));
};
tt.prototype.writeRCNT = function(t) {
  this.mode == this.SIO_GPIO && this.core.STUB("General purpose serial not supported");
};
tt.prototype.writeSIOCNT = function(t) {
  switch (this.mode) {
    case this.SIO_NORMAL_8:
      this.core.STUB("8-bit transfer unsupported");
      break;
    case this.SIO_NORMAL_32:
      this.core.STUB("32-bit transfer unsupported");
      break;
    case this.SIO_MULTI:
      this.multiplayer.baud = t & 3, this.linkLayer && this.linkLayer.setBaud(this.BAUD[this.multiplayer.baud]), this.multiplayer.si || (this.multiplayer.busy = t & 128, this.linkLayer && this.multiplayer.busy && this.linkLayer.startMultiplayerTransfer()), this.irq = t & 16384;
      break;
    case this.SIO_UART:
      this.core.STUB("UART unsupported");
      break;
    case this.SIO_GPIO:
      break;
    case this.SIO_JOYBUS:
      this.core.STUB("JOY BUS unsupported");
      break;
  }
};
tt.prototype.readSIOCNT = function() {
  var t = this.mode << 12 & 65535;
  switch (this.mode) {
    case this.SIO_NORMAL_8:
      this.core.STUB("8-bit transfer unsupported");
      break;
    case this.SIO_NORMAL_32:
      this.core.STUB("32-bit transfer unsupported");
      break;
    case this.SIO_MULTI:
      t |= this.multiplayer.baud, t |= this.multiplayer.si, t |= !!this.sd << 3, t |= this.multiplayer.id << 4, t |= this.multiplayer.error, t |= this.multiplayer.busy, t |= !!this.multiplayer.irq << 14;
      break;
    case this.SIO_UART:
      this.core.STUB("UART unsupported");
      break;
    case this.SIO_GPIO:
      break;
    case this.SIO_JOYBUS:
      this.core.STUB("JOY BUS unsupported");
      break;
  }
  return t;
};
tt.prototype.read = function(t) {
  switch (this.mode) {
    case this.SIO_NORMAL_32:
      this.core.STUB("32-bit transfer unsupported");
      break;
    case this.SIO_MULTI:
      return this.multiplayer.states[t];
    case this.SIO_UART:
      this.core.STUB("UART unsupported");
      break;
    default:
      this.core.WARN("Reading from transfer register in unsupported mode");
      break;
  }
  return 0;
};
function R(t) {
  t = t || {}, this.LOG_ERROR = 1, this.LOG_WARN = 2, this.LOG_STUB = 4, this.LOG_INFO = 8, this.LOG_DEBUG = 16, this.SYS_ID = "com.endrift.gbajs", this.logLevel = this.LOG_ERROR | this.LOG_WARN, this.rom = null, this.cpu = new N(), this.mmu = new b(), this.irq = new T(), this.io = new U(), this.audio = new E(), this.video = new Z(), this.keypad = new X(), this.sio = new tt(), this.cpu.mmu = this.mmu, this.cpu.irq = this.irq, this.mmu.cpu = this.cpu, this.mmu.core = this, this.irq.cpu = this.cpu, this.irq.io = this.io, this.irq.audio = this.audio, this.irq.video = this.video, this.irq.core = this, this.io.cpu = this.cpu, this.io.audio = this.audio, this.io.video = this.video, this.io.keypad = this.keypad, this.io.sio = this.sio, this.io.core = this, this.audio.cpu = this.cpu, this.audio.core = this, this.video.cpu = this.cpu, this.video.core = this, this.keypad.core = this, this.sio.core = this, t.bindInput !== !1 && this.keypad.registerHandlers(), this.doStep = this.waitFrame, this.paused = !1, this.seenFrame = !1, this.seenSave = !1, this.lastVblank = 0, this.queue = null, this.reportFPS = null, this.throttle = t.throttle || 16;
  var e = this;
  this.queueFrame = function(s) {
    e.queue = setTimeout(s, e.throttle);
  }, this.video.vblankCallback = function() {
    e.seenFrame = !0;
  };
}
R.prototype.setCanvas = function(t) {
  var e = this;
  if (t.offsetWidth != 240 || t.offsetHeight != 160) {
    this.indirectCanvas = document.createElement("canvas"), this.indirectCanvas.setAttribute("height", "160"), this.indirectCanvas.setAttribute("width", "240"), this.targetCanvas = t, this.setCanvasDirect(this.indirectCanvas);
    var s = t.getContext("2d");
    this.video.drawCallback = function() {
      s.drawImage(e.indirectCanvas, 0, 0, t.offsetWidth, t.offsetHeight);
    };
  } else {
    this.setCanvasDirect(t);
    var e = this;
  }
};
R.prototype.setCanvasDirect = function(t) {
  this.context = t.getContext("2d"), this.video.setBacking(this.context);
};
R.prototype.setBios = function(t, e) {
  this.mmu.loadBios(t, e);
};
R.prototype.setRom = function(t) {
  return this.reset(), this.rom = this.mmu.loadRom(t, !0), this.rom ? (this.retrieveSavedata(), !0) : !1;
};
R.prototype.hasRom = function() {
  return !!this.rom;
};
R.prototype.loadRomFromFile = function(t, e) {
  var s = new FileReader(), r = this;
  s.onload = function(a) {
    var h = r.setRom(a.target.result);
    e && e(h);
  }, s.readAsArrayBuffer(t);
};
R.prototype.reset = function() {
  this.audio.pause(!0), this.mmu.clear(), this.io.clear(), this.audio.clear(), this.video.clear(), this.sio.clear(), this.mmu.mmap(this.mmu.REGION_IO, this.io), this.mmu.mmap(this.mmu.REGION_PALETTE_RAM, this.video.renderPath.palette), this.mmu.mmap(this.mmu.REGION_VRAM, this.video.renderPath.vram), this.mmu.mmap(this.mmu.REGION_OAM, this.video.renderPath.oam), this.cpu.resetCPU(0);
};
R.prototype.step = function() {
  for (; this.doStep(); )
    this.cpu.step();
};
R.prototype.waitFrame = function() {
  var t = this.seenFrame;
  return this.seenFrame = !1, !t;
};
R.prototype.pause = function() {
  this.paused = !0, this.audio.pause(!0), this.queue && (clearTimeout(this.queue), this.queue = null);
};
R.prototype.advanceFrame = function() {
  this.step(), this.seenSave ? this.mmu.saveNeedsFlush() ? this.mmu.flushSave() : (this.storeSavedata(), this.seenSave = !1) : this.mmu.saveNeedsFlush() && (this.seenSave = !0, this.mmu.flushSave());
};
R.prototype.runStable = function() {
  if (!this.interval) {
    var t = this, e = 0, s = 0, r, a = Date.now();
    this.paused = !1, this.audio.pause(!1), this.reportFPS ? r = function() {
      try {
        if (e += Date.now() - a, t.paused)
          return;
        t.queueFrame(r), a = Date.now(), t.advanceFrame(), ++s, s == 60 && (t.reportFPS(s * 1e3 / e), s = 0, e = 0);
      } catch (h) {
        throw t.ERROR(h), h.stack && t.logStackTrace(h.stack.split(`
`)), h;
      }
    } : r = function() {
      try {
        if (t.paused)
          return;
        t.queueFrame(r), t.advanceFrame();
      } catch (h) {
        throw t.ERROR(h), h.stack && t.logStackTrace(h.stack.split(`
`)), h;
      }
    }, this.queueFrame(r);
  }
};
R.prototype.setSavedata = function(t) {
  this.mmu.loadSavedata(t);
};
R.prototype.loadSavedataFromFile = function(t) {
  var e = new FileReader(), s = this;
  e.onload = function(r) {
    s.setSavedata(r.target.result);
  }, e.readAsArrayBuffer(t);
};
R.prototype.decodeSavedata = function(t) {
  this.setSavedata(this.decodeBase64(t));
};
R.prototype.decodeBase64 = function(t) {
  var e = t.length * 3 / 4;
  t[t.length - 2] == "=" ? e -= 2 : t[t.length - 1] == "=" && (e -= 1);
  for (var s = new ArrayBuffer(e), r = new Uint8Array(s), a = t.match(/..../g), h = 0; h + 2 < e; h += 3) {
    var n = atob(a.shift());
    r[h] = n.charCodeAt(0), r[h + 1] = n.charCodeAt(1), r[h + 2] = n.charCodeAt(2);
  }
  if (h < e) {
    var n = atob(a.shift());
    r[h++] = n.charCodeAt(0), n.length > 1 && (r[h++] = n.charCodeAt(1));
  }
  return s;
};
R.prototype.encodeBase64 = function(t) {
  for (var e = [], s, r = [], a, h = 0; h < t.byteLength; ++h)
    for (s = t.getUint8(h, !0), r.push(String.fromCharCode(s)); r.length >= 3; )
      a = r.splice(0, 3), e.push(btoa(a.join("")));
  return r.length && e.push(btoa(r.join(""))), e.join("");
};
R.prototype.downloadSavedata = function() {
  var t = this.mmu.save;
  if (!t)
    return this.WARN("No save data available"), null;
  if (globalThis.URL) {
    var e = globalThis.URL.createObjectURL(new Blob([t.buffer], { type: "application/octet-stream" }));
    globalThis.open(e);
  } else {
    var s = this.encodeBase64(t.view);
    globalThis.open("data:application/octet-stream;base64," + s, this.rom.code + ".sav");
  }
};
R.prototype.storeSavedata = function() {
  var t = this.mmu.save;
  try {
    var e = globalThis.localStorage;
    e[this.SYS_ID + "." + this.mmu.cart.code] = this.encodeBase64(t.view);
  } catch (s) {
    this.WARN("Could not store savedata! " + s);
  }
};
R.prototype.retrieveSavedata = function() {
  try {
    var t = globalThis.localStorage, e = t[this.SYS_ID + "." + this.mmu.cart.code];
    if (e)
      return this.decodeSavedata(e), !0;
  } catch (s) {
    this.WARN("Could not retrieve savedata! " + s);
  }
  return !1;
};
R.prototype.freeze = function() {
  return {
    cpu: this.cpu.freeze(),
    mmu: this.mmu.freeze(),
    irq: this.irq.freeze(),
    io: this.io.freeze(),
    audio: this.audio.freeze(),
    video: this.video.freeze()
  };
};
R.prototype.defrost = function(t) {
  this.cpu.defrost(t.cpu), this.mmu.defrost(t.mmu), this.audio.defrost(t.audio), this.video.defrost(t.video), this.irq.defrost(t.irq), this.io.defrost(t.io);
};
R.prototype.log = function(t, e) {
};
R.prototype.setLogger = function(t) {
  this.log = t;
};
R.prototype.logStackTrace = function(t) {
  var e = t.length - 32;
  this.ERROR("Stack trace follows:"), e > 0 && this.log(-1, "> (Too many frames)");
  for (var s = Math.max(e, 0); s < t.length; ++s)
    this.log(-1, "> " + t[s]);
};
R.prototype.ERROR = function(t) {
  this.logLevel & this.LOG_ERROR && this.log(this.LOG_ERROR, t);
};
R.prototype.WARN = function(t) {
  this.logLevel & this.LOG_WARN && this.log(this.LOG_WARN, t);
};
R.prototype.STUB = function(t) {
  this.logLevel & this.LOG_STUB && this.log(this.LOG_STUB, t);
};
R.prototype.INFO = function(t) {
  this.logLevel & this.LOG_INFO && this.log(this.LOG_INFO, t);
};
R.prototype.DEBUG = function(t) {
  this.logLevel & this.LOG_DEBUG && this.log(this.LOG_DEBUG, t);
};
R.prototype.ASSERT_UNREACHED = function(t) {
  throw new Error("Should be unreached: " + t);
};
R.prototype.ASSERT = function(t, e) {
  if (!t)
    throw new Error("Assertion failed: " + e);
};
R.prototype.A = 0;
R.prototype.B = 1;
R.prototype.SELECT = 2;
R.prototype.START = 3;
R.prototype.RIGHT = 4;
R.prototype.LEFT = 5;
R.prototype.UP = 6;
R.prototype.DOWN = 7;
R.prototype.R = 8;
R.prototype.L = 9;
R.prototype.press = function(t) {
  this.keypad.press(t);
};
R.prototype.release = function(t) {
  this.keypad.release(t);
};
export {
  R as GameBoyAdvance,
  R as default
};
//# sourceMappingURL=gbajs.js.map
