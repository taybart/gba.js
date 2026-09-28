function d(t) {
  this.cpu = t, this.addressingMode23Immediate = [
    // 000x0
    function(e, s, i) {
      var r = t.gprs, a = function() {
        var h = r[e];
        return (!i || i()) && (r[e] -= s), h;
      };
      return a.writesPC = e == t.PC, a;
    },
    // 000xW
    null,
    null,
    null,
    // 00Ux0
    function(e, s, i) {
      var r = t.gprs, a = function() {
        var h = r[e];
        return (!i || i()) && (r[e] += s), h;
      };
      return a.writesPC = e == t.PC, a;
    },
    // 00UxW
    null,
    null,
    null,
    // 0P0x0
    function(e, s, i) {
      var r = t.gprs, a = function() {
        return r[e] - s;
      };
      return a.writesPC = !1, a;
    },
    // 0P0xW
    function(e, s, i) {
      var r = t.gprs, a = function() {
        var h = r[e] - s;
        return (!i || i()) && (r[e] = h), h;
      };
      return a.writesPC = e == t.PC, a;
    },
    null,
    null,
    // 0PUx0
    function(e, s, i) {
      var r = t.gprs, a = function() {
        return r[e] + s;
      };
      return a.writesPC = !1, a;
    },
    // 0PUxW
    function(e, s, i) {
      var r = t.gprs, a = function() {
        var h = r[e] + s;
        return (!i || i()) && (r[e] = h), h;
      };
      return a.writesPC = e == t.PC, a;
    },
    null,
    null
  ], this.addressingMode23Register = [
    // I00x0
    function(e, s, i) {
      var r = t.gprs, a = function() {
        var h = r[e];
        return (!i || i()) && (r[e] -= r[s]), h;
      };
      return a.writesPC = e == t.PC, a;
    },
    // I00xW
    null,
    null,
    null,
    // I0Ux0
    function(e, s, i) {
      var r = t.gprs, a = function() {
        var h = r[e];
        return (!i || i()) && (r[e] += r[s]), h;
      };
      return a.writesPC = e == t.PC, a;
    },
    // I0UxW
    null,
    null,
    null,
    // IP0x0
    function(e, s, i) {
      var r = t.gprs, a = function() {
        return r[e] - r[s];
      };
      return a.writesPC = !1, a;
    },
    // IP0xW
    function(e, s, i) {
      var r = t.gprs, a = function() {
        var h = r[e] - r[s];
        return (!i || i()) && (r[e] = h), h;
      };
      return a.writesPC = e == t.PC, a;
    },
    null,
    null,
    // IPUx0
    function(e, s, i) {
      var r = t.gprs, a = function() {
        var h = r[e] + r[s];
        return h;
      };
      return a.writesPC = !1, a;
    },
    // IPUxW
    function(e, s, i) {
      var r = t.gprs, a = function() {
        var h = r[e] + r[s];
        return (!i || i()) && (r[e] = h), h;
      };
      return a.writesPC = e == t.PC, a;
    },
    null,
    null
  ], this.addressingMode2RegisterShifted = [
    // I00x0
    function(e, s, i) {
      var r = t.gprs, a = function() {
        var h = r[e];
        return (!i || i()) && (s(), r[e] -= t.shifterOperand), h;
      };
      return a.writesPC = e == t.PC, a;
    },
    // I00xW
    null,
    null,
    null,
    // I0Ux0
    function(e, s, i) {
      var r = t.gprs, a = function() {
        var h = r[e];
        return (!i || i()) && (s(), r[e] += t.shifterOperand), h;
      };
      return a.writesPC = e == t.PC, a;
    },
    // I0UxW
    null,
    null,
    null,
    // IP0x0
    function(e, s, i) {
      var r = t.gprs, a = function() {
        return s(), r[e] - t.shifterOperand;
      };
      return a.writesPC = !1, a;
    },
    // IP0xW
    function(e, s, i) {
      var r = t.gprs, a = function() {
        s();
        var h = r[e] - t.shifterOperand;
        return (!i || i()) && (r[e] = h), h;
      };
      return a.writesPC = e == t.PC, a;
    },
    null,
    null,
    // IPUx0
    function(e, s, i) {
      var r = t.gprs, a = function() {
        return s(), r[e] + t.shifterOperand;
      };
      return a.writesPC = !1, a;
    },
    // IPUxW
    function(e, s, i) {
      var r = t.gprs, a = function() {
        s();
        var h = r[e] + t.shifterOperand;
        return (!i || i()) && (r[e] = h), h;
      };
      return a.writePC = e == t.PC, a;
    },
    null,
    null
  ];
}
d.prototype.constructAddressingMode1ASR = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    ++s.cycles;
    var r = i[t];
    t == s.PC && (r += 4), r &= 255;
    var a = i[e];
    e == s.PC && (a += 4), r == 0 ? (s.shifterOperand = a, s.shifterCarryOut = s.cpsrC) : r < 32 ? (s.shifterOperand = a >> r, s.shifterCarryOut = a & 1 << r - 1) : i[e] >> 31 ? (s.shifterOperand = 4294967295, s.shifterCarryOut = 2147483648) : (s.shifterOperand = 0, s.shifterCarryOut = 0);
  };
};
d.prototype.constructAddressingMode1Immediate = function(t) {
  var e = this.cpu;
  return function() {
    e.shifterOperand = t, e.shifterCarryOut = e.cpsrC;
  };
};
d.prototype.constructAddressingMode1ImmediateRotate = function(t, e) {
  var s = this.cpu;
  return function() {
    s.shifterOperand = t >>> e | t << 32 - e, s.shifterCarryOut = s.shifterOperand >> 31;
  };
};
d.prototype.constructAddressingMode1LSL = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    ++s.cycles;
    var r = i[t];
    t == s.PC && (r += 4), r &= 255;
    var a = i[e];
    e == s.PC && (a += 4), r == 0 ? (s.shifterOperand = a, s.shifterCarryOut = s.cpsrC) : r < 32 ? (s.shifterOperand = a << r, s.shifterCarryOut = a & 1 << 32 - r) : r == 32 ? (s.shifterOperand = 0, s.shifterCarryOut = a & 1) : (s.shifterOperand = 0, s.shifterCarryOut = 0);
  };
};
d.prototype.constructAddressingMode1LSR = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    ++s.cycles;
    var r = i[t];
    t == s.PC && (r += 4), r &= 255;
    var a = i[e];
    e == s.PC && (a += 4), r == 0 ? (s.shifterOperand = a, s.shifterCarryOut = s.cpsrC) : r < 32 ? (s.shifterOperand = a >>> r, s.shifterCarryOut = a & 1 << r - 1) : r == 32 ? (s.shifterOperand = 0, s.shifterCarryOut = a >> 31) : (s.shifterOperand = 0, s.shifterCarryOut = 0);
  };
};
d.prototype.constructAddressingMode1ROR = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    ++s.cycles;
    var r = i[t];
    t == s.PC && (r += 4), r &= 255;
    var a = i[e];
    e == s.PC && (a += 4);
    var h = r & 31;
    r == 0 ? (s.shifterOperand = a, s.shifterCarryOut = s.cpsrC) : h ? (s.shifterOperand = i[e] >>> h | i[e] << 32 - h, s.shifterCarryOut = a & 1 << h - 1) : (s.shifterOperand = a, s.shifterCarryOut = a >> 31);
  };
};
d.prototype.constructAddressingMode23Immediate = function(t, e, s) {
  var i = (t & 983040) >> 16;
  return this.addressingMode23Immediate[(t & 27262976) >> 21](i, e, s);
};
d.prototype.constructAddressingMode23Register = function(t, e, s) {
  var i = (t & 983040) >> 16;
  return this.addressingMode23Register[(t & 27262976) >> 21](i, e, s);
};
d.prototype.constructAddressingMode2RegisterShifted = function(t, e, s) {
  var i = (t & 983040) >> 16;
  return this.addressingMode2RegisterShifted[(t & 27262976) >> 21](i, e, s);
};
d.prototype.constructAddressingMode4 = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    var r = i[e] + t;
    return r;
  };
};
d.prototype.constructAddressingMode4Writeback = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function(h) {
    var n = a[s] + t;
    return h && i && r.mmu.store32(a[s] + t - 4, a[s]), a[s] += e, n;
  };
};
d.prototype.constructADC = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      s();
      var h = (r.shifterOperand >>> 0) + !!r.cpsrC;
      a[t] = (a[e] >>> 0) + h;
    }
  };
};
d.prototype.constructADCS = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      s();
      var h = (r.shifterOperand >>> 0) + !!r.cpsrC, n = (a[e] >>> 0) + h;
      t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = n >> 31, r.cpsrZ = !(n & 4294967295), r.cpsrC = n > 4294967295, r.cpsrV = a[e] >> 31 == h >> 31 && a[e] >> 31 != n >> 31 && h >> 31 != n >> 31), a[t] = n;
    }
  };
};
d.prototype.constructADD = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (s(), a[t] = (a[e] >>> 0) + (r.shifterOperand >>> 0));
  };
};
d.prototype.constructADDS = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      s();
      var h = (a[e] >>> 0) + (r.shifterOperand >>> 0);
      t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = h >> 31, r.cpsrZ = !(h & 4294967295), r.cpsrC = h > 4294967295, r.cpsrV = a[e] >> 31 == r.shifterOperand >> 31 && a[e] >> 31 != h >> 31 && r.shifterOperand >> 31 != h >> 31), a[t] = h;
    }
  };
};
d.prototype.constructAND = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (s(), a[t] = a[e] & r.shifterOperand);
  };
};
d.prototype.constructANDS = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (s(), a[t] = a[e] & r.shifterOperand, t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = a[t] >> 31, r.cpsrZ = !(a[t] & 4294967295), r.cpsrC = r.shifterCarryOut));
  };
};
d.prototype.constructB = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    if (e && !e()) {
      s.mmu.waitPrefetch32(i[s.PC]);
      return;
    }
    s.mmu.waitPrefetch32(i[s.PC]), i[s.PC] += t;
  };
};
d.prototype.constructBIC = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (s(), a[t] = a[e] & ~r.shifterOperand);
  };
};
d.prototype.constructBICS = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (s(), a[t] = a[e] & ~r.shifterOperand, t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = a[t] >> 31, r.cpsrZ = !(a[t] & 4294967295), r.cpsrC = r.shifterCarryOut));
  };
};
d.prototype.constructBL = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    if (e && !e()) {
      s.mmu.waitPrefetch32(i[s.PC]);
      return;
    }
    s.mmu.waitPrefetch32(i[s.PC]), i[s.LR] = i[s.PC] - 4, i[s.PC] += t;
  };
};
d.prototype.constructBX = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    if (e && !e()) {
      s.mmu.waitPrefetch32(i[s.PC]);
      return;
    }
    s.mmu.waitPrefetch32(i[s.PC]), s.switchExecMode(i[t] & 1), i[s.PC] = i[t] & 4294967294;
  };
};
d.prototype.constructCMN = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      s();
      var h = (a[e] >>> 0) + (r.shifterOperand >>> 0);
      r.cpsrN = h >> 31, r.cpsrZ = !(h & 4294967295), r.cpsrC = h > 4294967295, r.cpsrV = a[e] >> 31 == r.shifterOperand >> 31 && a[e] >> 31 != h >> 31 && r.shifterOperand >> 31 != h >> 31;
    }
  };
};
d.prototype.constructCMP = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      s();
      var h = a[e] - r.shifterOperand;
      r.cpsrN = h >> 31, r.cpsrZ = !(h & 4294967295), r.cpsrC = a[e] >>> 0 >= r.shifterOperand >>> 0, r.cpsrV = a[e] >> 31 != r.shifterOperand >> 31 && a[e] >> 31 != h >> 31;
    }
  };
};
d.prototype.constructEOR = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (s(), a[t] = a[e] ^ r.shifterOperand);
  };
};
d.prototype.constructEORS = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (s(), a[t] = a[e] ^ r.shifterOperand, t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = a[t] >> 31, r.cpsrZ = !(a[t] & 4294967295), r.cpsrC = r.shifterCarryOut));
  };
};
d.prototype.constructLDM = function(t, e, s) {
  var i = this.cpu, r = i.gprs, a = i.mmu;
  return function() {
    if (a.waitPrefetch32(r[i.PC]), !(s && !s())) {
      var h = e(!1), n = 0, o, u;
      for (o = t, u = 0; o; o >>= 1, ++u)
        o & 1 && (r[u] = a.load32(h & 4294967292), h += 4, ++n);
      a.waitMulti32(h, n), ++i.cycles;
    }
  };
};
d.prototype.constructLDMS = function(t, e, s) {
  var i = this.cpu, r = i.gprs, a = i.mmu;
  return function() {
    if (a.waitPrefetch32(r[i.PC]), !(s && !s())) {
      var h = e(!1), n = 0, o = i.mode;
      i.switchMode(i.MODE_SYSTEM);
      var u, c;
      for (u = t, c = 0; u; u >>= 1, ++c)
        u & 1 && (r[c] = a.load32(h & 4294967292), h += 4, ++n);
      i.switchMode(o), a.waitMulti32(h, n), ++i.cycles;
    }
  };
};
d.prototype.constructLDR = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    if (i.mmu.waitPrefetch32(r[i.PC]), !(s && !s())) {
      var a = e();
      r[t] = i.mmu.load32(a), i.mmu.wait32(a), ++i.cycles;
    }
  };
};
d.prototype.constructLDRB = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    if (i.mmu.waitPrefetch32(r[i.PC]), !(s && !s())) {
      var a = e();
      r[t] = i.mmu.loadU8(a), i.mmu.wait(a), ++i.cycles;
    }
  };
};
d.prototype.constructLDRH = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    if (i.mmu.waitPrefetch32(r[i.PC]), !(s && !s())) {
      var a = e();
      r[t] = i.mmu.loadU16(a), i.mmu.wait(a), ++i.cycles;
    }
  };
};
d.prototype.constructLDRSB = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    if (i.mmu.waitPrefetch32(r[i.PC]), !(s && !s())) {
      var a = e();
      r[t] = i.mmu.load8(a), i.mmu.wait(a), ++i.cycles;
    }
  };
};
d.prototype.constructLDRSH = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    if (i.mmu.waitPrefetch32(r[i.PC]), !(s && !s())) {
      var a = e();
      r[t] = i.mmu.load16(a), i.mmu.wait(a), ++i.cycles;
    }
  };
};
d.prototype.constructMLA = function(t, e, s, i, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r()))
      if (++a.cycles, a.mmu.waitMul(s), h[i] & 4294901760 && h[s] & 4294901760) {
        var n = (h[i] & 4294901760) * h[s] & 4294967295, o = (h[i] & 65535) * h[s] & 4294967295;
        h[t] = n + o + h[e] & 4294967295;
      } else
        h[t] = h[i] * h[s] + h[e];
  };
};
d.prototype.constructMLAS = function(t, e, s, i, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      if (++a.cycles, a.mmu.waitMul(s), h[i] & 4294901760 && h[s] & 4294901760) {
        var n = (h[i] & 4294901760) * h[s] & 4294967295, o = (h[i] & 65535) * h[s] & 4294967295;
        h[t] = n + o + h[e] & 4294967295;
      } else
        h[t] = h[i] * h[s] + h[e];
      a.cpsrN = h[t] >> 31, a.cpsrZ = !(h[t] & 4294967295);
    }
  };
};
d.prototype.constructMOV = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (s(), a[t] = r.shifterOperand);
  };
};
d.prototype.constructMOVS = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (s(), a[t] = r.shifterOperand, t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = a[t] >> 31, r.cpsrZ = !(a[t] & 4294967295), r.cpsrC = r.shifterCarryOut));
  };
};
d.prototype.constructMRS = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch32(r[i.PC]), !(s && !s()) && (e ? r[t] = i.spsr : r[t] = i.packCPSR());
  };
};
d.prototype.constructMSR = function(t, e, s, i, r) {
  var a = this.cpu, h = a.gprs, n = s & 65536, o = s & 524288;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      var u;
      s & 33554432 ? u = i : u = h[t];
      var c = (n ? 255 : 0) | //(x ? 0x0000FF00 : 0x00000000) | // Irrelevant on ARMv4T
      //(s ? 0x00FF0000 : 0x00000000) | // Irrelevant on ARMv4T
      (o ? 4278190080 : 0);
      e ? (c &= a.USER_MASK | a.PRIV_MASK | a.STATE_MASK, a.spsr = a.spsr & ~c | u & c) : (c & a.USER_MASK && (a.cpsrN = u >> 31, a.cpsrZ = u & 1073741824, a.cpsrC = u & 536870912, a.cpsrV = u & 268435456), a.mode != a.MODE_USER && c & a.PRIV_MASK && (a.switchMode(u & 15 | 16), a.cpsrI = u & 128, a.cpsrF = u & 64));
    }
  };
};
d.prototype.constructMUL = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()))
      if (r.mmu.waitMul(a[e]), a[s] & 4294901760 && a[e] & 4294901760) {
        var h = (a[s] & 4294901760) * a[e] | 0, n = (a[s] & 65535) * a[e] | 0;
        a[t] = h + n;
      } else
        a[t] = a[s] * a[e];
  };
};
d.prototype.constructMULS = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      if (r.mmu.waitMul(a[e]), a[s] & 4294901760 && a[e] & 4294901760) {
        var h = (a[s] & 4294901760) * a[e] | 0, n = (a[s] & 65535) * a[e] | 0;
        a[t] = h + n;
      } else
        a[t] = a[s] * a[e];
      r.cpsrN = a[t] >> 31, r.cpsrZ = !(a[t] & 4294967295);
    }
  };
};
d.prototype.constructMVN = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (s(), a[t] = ~r.shifterOperand);
  };
};
d.prototype.constructMVNS = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (s(), a[t] = ~r.shifterOperand, t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = a[t] >> 31, r.cpsrZ = !(a[t] & 4294967295), r.cpsrC = r.shifterCarryOut));
  };
};
d.prototype.constructORR = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (s(), a[t] = a[e] | r.shifterOperand);
  };
};
d.prototype.constructORRS = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (s(), a[t] = a[e] | r.shifterOperand, t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = a[t] >> 31, r.cpsrZ = !(a[t] & 4294967295), r.cpsrC = r.shifterCarryOut));
  };
};
d.prototype.constructRSB = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (s(), a[t] = r.shifterOperand - a[e]);
  };
};
d.prototype.constructRSBS = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      s();
      var h = r.shifterOperand - a[e];
      t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = h >> 31, r.cpsrZ = !(h & 4294967295), r.cpsrC = r.shifterOperand >>> 0 >= a[e] >>> 0, r.cpsrV = r.shifterOperand >> 31 != a[e] >> 31 && r.shifterOperand >> 31 != h >> 31), a[t] = h;
    }
  };
};
d.prototype.constructRSC = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      s();
      var h = (a[e] >>> 0) + !r.cpsrC;
      a[t] = (r.shifterOperand >>> 0) - h;
    }
  };
};
d.prototype.constructRSCS = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      s();
      var h = (a[e] >>> 0) + !r.cpsrC, n = (r.shifterOperand >>> 0) - h;
      t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = n >> 31, r.cpsrZ = !(n & 4294967295), r.cpsrC = r.shifterOperand >>> 0 >= n >>> 0, r.cpsrV = r.shifterOperand >> 31 != h >> 31 && r.shifterOperand >> 31 != n >> 31), a[t] = n;
    }
  };
};
d.prototype.constructSBC = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      s();
      var h = (r.shifterOperand >>> 0) + !r.cpsrC;
      a[t] = (a[e] >>> 0) - h;
    }
  };
};
d.prototype.constructSBCS = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      s();
      var h = (r.shifterOperand >>> 0) + !r.cpsrC, n = (a[e] >>> 0) - h;
      t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = n >> 31, r.cpsrZ = !(n & 4294967295), r.cpsrC = a[e] >>> 0 >= n >>> 0, r.cpsrV = a[e] >> 31 != h >> 31 && a[e] >> 31 != n >> 31), a[t] = n;
    }
  };
};
d.prototype.constructSMLAL = function(t, e, s, i, r) {
  var a = this.cpu, h = 1 / 4294967296, n = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(n[a.PC]), !(r && !r())) {
      a.cycles += 2, a.mmu.waitMul(s);
      var o = (n[i] & 4294901760) * n[s], u = (n[i] & 65535) * n[s], c = (n[e] >>> 0) + o + u;
      n[e] = c, n[t] += Math.floor(c * h);
    }
  };
};
d.prototype.constructSMLALS = function(t, e, s, i, r) {
  var a = this.cpu, h = 1 / 4294967296, n = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(n[a.PC]), !(r && !r())) {
      a.cycles += 2, a.mmu.waitMul(s);
      var o = (n[i] & 4294901760) * n[s], u = (n[i] & 65535) * n[s], c = (n[e] >>> 0) + o + u;
      n[e] = c, n[t] += Math.floor(c * h), a.cpsrN = n[t] >> 31, a.cpsrZ = !(n[t] & 4294967295 || n[e] & 4294967295);
    }
  };
};
d.prototype.constructSMULL = function(t, e, s, i, r) {
  var a = this.cpu, h = 1 / 4294967296, n = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(n[a.PC]), !(r && !r())) {
      ++a.cycles, a.mmu.waitMul(n[s]);
      var o = ((n[i] & 4294901760) >> 0) * (n[s] >> 0), u = ((n[i] & 65535) >> 0) * (n[s] >> 0);
      n[e] = (o & 4294967295) + (u & 4294967295) & 4294967295, n[t] = Math.floor(o * h + u * h);
    }
  };
};
d.prototype.constructSMULLS = function(t, e, s, i, r) {
  var a = this.cpu, h = 1 / 4294967296, n = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(n[a.PC]), !(r && !r())) {
      ++a.cycles, a.mmu.waitMul(n[s]);
      var o = ((n[i] & 4294901760) >> 0) * (n[s] >> 0), u = ((n[i] & 65535) >> 0) * (n[s] >> 0);
      n[e] = (o & 4294967295) + (u & 4294967295) & 4294967295, n[t] = Math.floor(o * h + u * h), a.cpsrN = n[t] >> 31, a.cpsrZ = !(n[t] & 4294967295 || n[e] & 4294967295);
    }
  };
};
d.prototype.constructSTM = function(t, e, s) {
  var i = this.cpu, r = i.gprs, a = i.mmu;
  return function() {
    if (s && !s()) {
      a.waitPrefetch32(r[i.PC]);
      return;
    }
    a.wait32(r[i.PC]);
    var h = e(!0), n = 0, o, u;
    for (o = t, u = 0; o; o >>= 1, ++u)
      o & 1 && (a.store32(h, r[u]), h += 4, ++n);
    a.waitMulti32(h, n);
  };
};
d.prototype.constructSTMS = function(t, e, s) {
  var i = this.cpu, r = i.gprs, a = i.mmu;
  return function() {
    if (s && !s()) {
      a.waitPrefetch32(r[i.PC]);
      return;
    }
    a.wait32(r[i.PC]);
    var h = i.mode, n = e(!0), o = 0, u, c;
    for (i.switchMode(i.MODE_SYSTEM), u = t, c = 0; u; u >>= 1, ++c)
      u & 1 && (a.store32(n, r[c]), n += 4, ++o);
    i.switchMode(h), a.waitMulti32(n, o);
  };
};
d.prototype.constructSTR = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    if (s && !s()) {
      i.mmu.waitPrefetch32(r[i.PC]);
      return;
    }
    var a = e();
    i.mmu.store32(a, r[t]), i.mmu.wait32(a), i.mmu.wait32(r[i.PC]);
  };
};
d.prototype.constructSTRB = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    if (s && !s()) {
      i.mmu.waitPrefetch32(r[i.PC]);
      return;
    }
    var a = e();
    i.mmu.store8(a, r[t]), i.mmu.wait(a), i.mmu.wait32(r[i.PC]);
  };
};
d.prototype.constructSTRH = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    if (s && !s()) {
      i.mmu.waitPrefetch32(r[i.PC]);
      return;
    }
    var a = e();
    i.mmu.store16(a, r[t]), i.mmu.wait(a), i.mmu.wait32(r[i.PC]);
  };
};
d.prototype.constructSUB = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (s(), a[t] = a[e] - r.shifterOperand);
  };
};
d.prototype.constructSUBS = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      s();
      var h = a[e] - r.shifterOperand;
      t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = h >> 31, r.cpsrZ = !(h & 4294967295), r.cpsrC = a[e] >>> 0 >= r.shifterOperand >>> 0, r.cpsrV = a[e] >> 31 != r.shifterOperand >> 31 && a[e] >> 31 != h >> 31), a[t] = h;
    }
  };
};
d.prototype.constructSWI = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    if (e && !e()) {
      s.mmu.waitPrefetch32(i[s.PC]);
      return;
    }
    s.irq.swi32(t), s.mmu.waitPrefetch32(i[s.PC]);
  };
};
d.prototype.constructSWP = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      r.mmu.wait32(a[e]), r.mmu.wait32(a[e]);
      var h = r.mmu.load32(a[e]);
      r.mmu.store32(a[e], a[s]), a[t] = h, ++r.cycles;
    }
  };
};
d.prototype.constructSWPB = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      r.mmu.wait(a[e]), r.mmu.wait(a[e]);
      var h = r.mmu.load8(a[e]);
      r.mmu.store8(a[e], a[s]), a[t] = h, ++r.cycles;
    }
  };
};
d.prototype.constructTEQ = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      s();
      var h = a[e] ^ r.shifterOperand;
      r.cpsrN = h >> 31, r.cpsrZ = !(h & 4294967295), r.cpsrC = r.shifterCarryOut;
    }
  };
};
d.prototype.constructTST = function(t, e, s, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      s();
      var h = a[e] & r.shifterOperand;
      r.cpsrN = h >> 31, r.cpsrZ = !(h & 4294967295), r.cpsrC = r.shifterCarryOut;
    }
  };
};
d.prototype.constructUMLAL = function(t, e, s, i, r) {
  var a = this.cpu, h = 1 / 4294967296, n = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(n[a.PC]), !(r && !r())) {
      a.cycles += 2, a.mmu.waitMul(s);
      var o = ((n[i] & 4294901760) >>> 0) * (n[s] >>> 0), u = (n[i] & 65535) * (n[s] >>> 0), c = (n[e] >>> 0) + o + u;
      n[e] = c, n[t] += c * h;
    }
  };
};
d.prototype.constructUMLALS = function(t, e, s, i, r) {
  var a = this.cpu, h = 1 / 4294967296, n = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(n[a.PC]), !(r && !r())) {
      a.cycles += 2, a.mmu.waitMul(s);
      var o = ((n[i] & 4294901760) >>> 0) * (n[s] >>> 0), u = (n[i] & 65535) * (n[s] >>> 0), c = (n[e] >>> 0) + o + u;
      n[e] = c, n[t] += c * h, a.cpsrN = n[t] >> 31, a.cpsrZ = !(n[t] & 4294967295 || n[e] & 4294967295);
    }
  };
};
d.prototype.constructUMULL = function(t, e, s, i, r) {
  var a = this.cpu, h = 1 / 4294967296, n = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(n[a.PC]), !(r && !r())) {
      ++a.cycles, a.mmu.waitMul(n[s]);
      var o = ((n[i] & 4294901760) >>> 0) * (n[s] >>> 0), u = ((n[i] & 65535) >>> 0) * (n[s] >>> 0);
      n[e] = (o & 4294967295) + (u & 4294967295) & 4294967295, n[t] = o * h + u * h >>> 0;
    }
  };
};
d.prototype.constructUMULLS = function(t, e, s, i, r) {
  var a = this.cpu, h = 1 / 4294967296, n = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(n[a.PC]), !(r && !r())) {
      ++a.cycles, a.mmu.waitMul(n[s]);
      var o = ((n[i] & 4294901760) >>> 0) * (n[s] >>> 0), u = ((n[i] & 65535) >>> 0) * (n[s] >>> 0);
      n[e] = (o & 4294967295) + (u & 4294967295) & 4294967295, n[t] = o * h + u * h >>> 0, a.cpsrN = n[t] >> 31, a.cpsrZ = !(n[t] & 4294967295 || n[e] & 4294967295);
    }
  };
};
function F(t) {
  this.cpu = t;
}
F.prototype.constructADC = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]);
    var r = (i[e] >>> 0) + !!s.cpsrC, a = i[t], h = (a >>> 0) + r, n = a >> 31, o = h >> 31, u = r >> 31;
    s.cpsrN = o, s.cpsrZ = !(h & 4294967295), s.cpsrC = h > 4294967295, s.cpsrV = n == u && n != o && u != o, i[t] = h;
  };
};
F.prototype.constructADD1 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]);
    var a = (r[e] >>> 0) + s;
    i.cpsrN = a >> 31, i.cpsrZ = !(a & 4294967295), i.cpsrC = a > 4294967295, i.cpsrV = !(r[e] >> 31) && (r[e] >> 31 ^ a) >> 31 && a >> 31, r[t] = a;
  };
};
F.prototype.constructADD2 = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]);
    var r = (i[t] >>> 0) + e;
    s.cpsrN = r >> 31, s.cpsrZ = !(r & 4294967295), s.cpsrC = r > 4294967295, s.cpsrV = !(i[t] >> 31) && (i[t] ^ r) >> 31 && (e ^ r) >> 31, i[t] = r;
  };
};
F.prototype.constructADD3 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]);
    var a = (r[e] >>> 0) + (r[s] >>> 0);
    i.cpsrN = a >> 31, i.cpsrZ = !(a & 4294967295), i.cpsrC = a > 4294967295, i.cpsrV = !((r[e] ^ r[s]) >> 31) && (r[e] ^ a) >> 31 && (r[s] ^ a) >> 31, r[t] = a;
  };
};
F.prototype.constructADD4 = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]), i[t] += i[e];
  };
};
F.prototype.constructADD5 = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]), i[t] = (i[s.PC] & 4294967292) + e;
  };
};
F.prototype.constructADD6 = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]), i[t] = i[s.SP] + e;
  };
};
F.prototype.constructADD7 = function(t) {
  var e = this.cpu, s = e.gprs;
  return function() {
    e.mmu.waitPrefetch(s[e.PC]), s[e.SP] += t;
  };
};
F.prototype.constructAND = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]), i[t] = i[t] & i[e], s.cpsrN = i[t] >> 31, s.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructASR1 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]), s == 0 ? (i.cpsrC = r[e] >> 31, i.cpsrC ? r[t] = 4294967295 : r[t] = 0) : (i.cpsrC = r[e] & 1 << s - 1, r[t] = r[e] >> s), i.cpsrN = r[t] >> 31, i.cpsrZ = !(r[t] & 4294967295);
  };
};
F.prototype.constructASR2 = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]);
    var r = i[e] & 255;
    r && (r < 32 ? (s.cpsrC = i[t] & 1 << r - 1, i[t] >>= r) : (s.cpsrC = i[t] >> 31, s.cpsrC ? i[t] = 4294967295 : i[t] = 0)), s.cpsrN = i[t] >> 31, s.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructB1 = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]), e() && (i[s.PC] += t);
  };
};
F.prototype.constructB2 = function(t) {
  var e = this.cpu, s = e.gprs;
  return function() {
    e.mmu.waitPrefetch(s[e.PC]), s[e.PC] += t;
  };
};
F.prototype.constructBIC = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]), i[t] = i[t] & ~i[e], s.cpsrN = i[t] >> 31, s.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructBL1 = function(t) {
  var e = this.cpu, s = e.gprs;
  return function() {
    e.mmu.waitPrefetch(s[e.PC]), s[e.LR] = s[e.PC] + t;
  };
};
F.prototype.constructBL2 = function(t) {
  var e = this.cpu, s = e.gprs;
  return function() {
    e.mmu.waitPrefetch(s[e.PC]);
    var i = s[e.PC];
    s[e.PC] = s[e.LR] + (t << 1), s[e.LR] = i - 1;
  };
};
F.prototype.constructBX = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]), s.switchExecMode(i[e] & 1);
    var r = 0;
    e == 15 && (r = i[e] & 2), i[s.PC] = i[e] & 4294967294 - r;
  };
};
F.prototype.constructCMN = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]);
    var r = (i[t] >>> 0) + (i[e] >>> 0);
    s.cpsrN = r >> 31, s.cpsrZ = !(r & 4294967295), s.cpsrC = r > 4294967295, s.cpsrV = i[t] >> 31 == i[e] >> 31 && i[t] >> 31 != r >> 31 && i[e] >> 31 != r >> 31;
  };
};
F.prototype.constructCMP1 = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]);
    var r = i[t] - e;
    s.cpsrN = r >> 31, s.cpsrZ = !(r & 4294967295), s.cpsrC = i[t] >>> 0 >= e, s.cpsrV = i[t] >> 31 && (i[t] ^ r) >> 31;
  };
};
F.prototype.constructCMP2 = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]);
    var r = i[t], a = i[e], h = r - a, n = h >> 31, o = r >> 31;
    s.cpsrN = n, s.cpsrZ = !(h & 4294967295), s.cpsrC = r >>> 0 >= a >>> 0, s.cpsrV = o != a >> 31 && o != n;
  };
};
F.prototype.constructCMP3 = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]);
    var r = i[t] - i[e];
    s.cpsrN = r >> 31, s.cpsrZ = !(r & 4294967295), s.cpsrC = i[t] >>> 0 >= i[e] >>> 0, s.cpsrV = (i[t] ^ i[e]) >> 31 && (i[t] ^ r) >> 31;
  };
};
F.prototype.constructEOR = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]), i[t] = i[t] ^ i[e], s.cpsrN = i[t] >> 31, s.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructLDMIA = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]);
    var r = i[t], a = 0, h, n;
    for (h = 1, n = 0; n < 8; h <<= 1, ++n)
      e & h && (i[n] = s.mmu.load32(r), r += 4, ++a);
    s.mmu.waitMulti32(r, a), 1 << t & e || (i[t] = r);
  };
};
F.prototype.constructLDR1 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]);
    var a = r[e] + s;
    r[t] = i.mmu.load32(a), i.mmu.wait32(a), ++i.cycles;
  };
};
F.prototype.constructLDR2 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]), r[t] = i.mmu.load32(r[e] + r[s]), i.mmu.wait32(r[e] + r[s]), ++i.cycles;
  };
};
F.prototype.constructLDR3 = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]), i[t] = s.mmu.load32((i[s.PC] & 4294967292) + e), s.mmu.wait32(i[s.PC]), ++s.cycles;
  };
};
F.prototype.constructLDR4 = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]), i[t] = s.mmu.load32(i[s.SP] + e), s.mmu.wait32(i[s.SP] + e), ++s.cycles;
  };
};
F.prototype.constructLDRB1 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    var a = r[e] + s;
    i.mmu.waitPrefetch(r[i.PC]), r[t] = i.mmu.loadU8(a), i.mmu.wait(a), ++i.cycles;
  };
};
F.prototype.constructLDRB2 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]), r[t] = i.mmu.loadU8(r[e] + r[s]), i.mmu.wait(r[e] + r[s]), ++i.cycles;
  };
};
F.prototype.constructLDRH1 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    var a = r[e] + s;
    i.mmu.waitPrefetch(r[i.PC]), r[t] = i.mmu.loadU16(a), i.mmu.wait(a), ++i.cycles;
  };
};
F.prototype.constructLDRH2 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]), r[t] = i.mmu.loadU16(r[e] + r[s]), i.mmu.wait(r[e] + r[s]), ++i.cycles;
  };
};
F.prototype.constructLDRSB = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]), r[t] = i.mmu.load8(r[e] + r[s]), i.mmu.wait(r[e] + r[s]), ++i.cycles;
  };
};
F.prototype.constructLDRSH = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]), r[t] = i.mmu.load16(r[e] + r[s]), i.mmu.wait(r[e] + r[s]), ++i.cycles;
  };
};
F.prototype.constructLSL1 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]), s == 0 ? r[t] = r[e] : (i.cpsrC = r[e] & 1 << 32 - s, r[t] = r[e] << s), i.cpsrN = r[t] >> 31, i.cpsrZ = !(r[t] & 4294967295);
  };
};
F.prototype.constructLSL2 = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]);
    var r = i[e] & 255;
    r && (r < 32 ? (s.cpsrC = i[t] & 1 << 32 - r, i[t] <<= r) : (r > 32 ? s.cpsrC = 0 : s.cpsrC = i[t] & 1, i[t] = 0)), s.cpsrN = i[t] >> 31, s.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructLSR1 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]), s == 0 ? (i.cpsrC = r[e] >> 31, r[t] = 0) : (i.cpsrC = r[e] & 1 << s - 1, r[t] = r[e] >>> s), i.cpsrN = 0, i.cpsrZ = !(r[t] & 4294967295);
  };
};
F.prototype.constructLSR2 = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]);
    var r = i[e] & 255;
    r && (r < 32 ? (s.cpsrC = i[t] & 1 << r - 1, i[t] >>>= r) : (r > 32 ? s.cpsrC = 0 : s.cpsrC = i[t] >> 31, i[t] = 0)), s.cpsrN = i[t] >> 31, s.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructMOV1 = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]), i[t] = e, s.cpsrN = e >> 31, s.cpsrZ = !(e & 4294967295);
  };
};
F.prototype.constructMOV2 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]);
    var a = r[e];
    i.cpsrN = a >> 31, i.cpsrZ = !(a & 4294967295), i.cpsrC = 0, i.cpsrV = 0, r[t] = a;
  };
};
F.prototype.constructMOV3 = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]), i[t] = i[e];
  };
};
F.prototype.constructMUL = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    if (s.mmu.waitPrefetch(i[s.PC]), s.mmu.waitMul(i[e]), i[e] & 4294901760 && i[t] & 4294901760) {
      var r = (i[t] & 4294901760) * i[e] & 4294967295, a = (i[t] & 65535) * i[e] & 4294967295;
      i[t] = r + a & 4294967295;
    } else
      i[t] *= i[e];
    s.cpsrN = i[t] >> 31, s.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructMVN = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]), i[t] = ~i[e], s.cpsrN = i[t] >> 31, s.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructNEG = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]);
    var r = -i[e];
    s.cpsrN = r >> 31, s.cpsrZ = !(r & 4294967295), s.cpsrC = 0 >= r >>> 0, s.cpsrV = i[e] >> 31 && r >> 31, i[t] = r;
  };
};
F.prototype.constructORR = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]), i[t] = i[t] | i[e], s.cpsrN = i[t] >> 31, s.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructPOP = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]), ++s.cycles;
    var r = i[s.SP], a = 0, h, n;
    for (h = 1, n = 0; n < 8; h <<= 1, ++n)
      t & h && (s.mmu.waitSeq32(r), i[n] = s.mmu.load32(r), r += 4, ++a);
    e && (i[s.PC] = s.mmu.load32(r) & 4294967294, r += 4, ++a), s.mmu.waitMulti32(r, a), i[s.SP] = r;
  };
};
F.prototype.constructPUSH = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    var r = i[s.SP] - 4, a = 0;
    s.mmu.waitPrefetch(i[s.PC]), e && (s.mmu.store32(r, i[s.LR]), r -= 4, ++a);
    var h, n;
    for (h = 128, n = 7; h; h >>= 1, --n)
      if (t & h) {
        s.mmu.store32(r, i[n]), r -= 4, ++a;
        break;
      }
    for (h >>= 1, --n; h; h >>= 1, --n)
      t & h && (s.mmu.store32(r, i[n]), r -= 4, ++a);
    s.mmu.waitMulti32(r, a), i[s.SP] = r + 4;
  };
};
F.prototype.constructROR = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]);
    var r = i[e] & 255;
    if (r) {
      var a = r & 31;
      a > 0 ? (s.cpsrC = i[t] & 1 << a - 1, i[t] = i[t] >>> a | i[t] << 32 - a) : s.cpsrC = i[t] >> 31;
    }
    s.cpsrN = i[t] >> 31, s.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructSBC = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]);
    var r = (i[e] >>> 0) + !s.cpsrC, a = (i[t] >>> 0) - r;
    s.cpsrN = a >> 31, s.cpsrZ = !(a & 4294967295), s.cpsrC = i[t] >>> 0 >= a >>> 0, s.cpsrV = (i[t] ^ r) >> 31 && (i[t] ^ a) >> 31, i[t] = a;
  };
};
F.prototype.constructSTMIA = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.wait(i[s.PC]);
    var r = i[t], a = 0, h, n;
    for (h = 1, n = 0; n < 8; h <<= 1, ++n)
      if (e & h) {
        s.mmu.store32(r, i[n]), r += 4, ++a;
        break;
      }
    for (h <<= 1, ++n; n < 8; h <<= 1, ++n)
      e & h && (s.mmu.store32(r, i[n]), r += 4, ++a);
    s.mmu.waitMulti32(r, a), i[t] = r;
  };
};
F.prototype.constructSTR1 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    var a = r[e] + s;
    i.mmu.store32(a, r[t]), i.mmu.wait(r[i.PC]), i.mmu.wait32(a);
  };
};
F.prototype.constructSTR2 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.store32(r[e] + r[s], r[t]), i.mmu.wait(r[i.PC]), i.mmu.wait32(r[e] + r[s]);
  };
};
F.prototype.constructSTR3 = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.store32(i[s.SP] + e, i[t]), s.mmu.wait(i[s.PC]), s.mmu.wait32(i[s.SP] + e);
  };
};
F.prototype.constructSTRB1 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    var a = r[e] + s;
    i.mmu.store8(a, r[t]), i.mmu.wait(r[i.PC]), i.mmu.wait(a);
  };
};
F.prototype.constructSTRB2 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.store8(r[e] + r[s], r[t]), i.mmu.wait(r[i.PC]), i.mmu.wait(r[e] + r[s]);
  };
};
F.prototype.constructSTRH1 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    var a = r[e] + s;
    i.mmu.store16(a, r[t]), i.mmu.wait(r[i.PC]), i.mmu.wait(a);
  };
};
F.prototype.constructSTRH2 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.store16(r[e] + r[s], r[t]), i.mmu.wait(r[i.PC]), i.mmu.wait(r[e] + r[s]);
  };
};
F.prototype.constructSUB1 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]);
    var a = r[e] - s;
    i.cpsrN = a >> 31, i.cpsrZ = !(a & 4294967295), i.cpsrC = r[e] >>> 0 >= s, i.cpsrV = r[e] >> 31 && (r[e] ^ a) >> 31, r[t] = a;
  };
};
F.prototype.constructSUB2 = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]);
    var r = i[t] - e;
    s.cpsrN = r >> 31, s.cpsrZ = !(r & 4294967295), s.cpsrC = i[t] >>> 0 >= e, s.cpsrV = i[t] >> 31 && (i[t] ^ r) >> 31, i[t] = r;
  };
};
F.prototype.constructSUB3 = function(t, e, s) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]);
    var a = r[e] - r[s];
    i.cpsrN = a >> 31, i.cpsrZ = !(a & 4294967295), i.cpsrC = r[e] >>> 0 >= r[s] >>> 0, i.cpsrV = r[e] >> 31 != r[s] >> 31 && r[e] >> 31 != a >> 31, r[t] = a;
  };
};
F.prototype.constructSWI = function(t) {
  var e = this.cpu, s = e.gprs;
  return function() {
    e.irq.swi(t), e.mmu.waitPrefetch(s[e.PC]);
  };
};
F.prototype.constructTST = function(t, e) {
  var s = this.cpu, i = s.gprs;
  return function() {
    s.mmu.waitPrefetch(i[s.PC]);
    var r = i[t] & i[e];
    s.cpsrN = r >> 31, s.cpsrZ = !(r & 4294967295);
  };
};
function P() {
  this.SP = 13, this.LR = 14, this.PC = 15, this.MODE_ARM = 0, this.MODE_THUMB = 1, this.MODE_USER = 16, this.MODE_FIQ = 17, this.MODE_IRQ = 18, this.MODE_SUPERVISOR = 19, this.MODE_ABORT = 23, this.MODE_UNDEFINED = 27, this.MODE_SYSTEM = 31, this.BANK_NONE = 0, this.BANK_FIQ = 1, this.BANK_IRQ = 2, this.BANK_SUPERVISOR = 3, this.BANK_ABORT = 4, this.BANK_UNDEFINED = 5, this.UNALLOC_MASK = 268435200, this.USER_MASK = 4026531840, this.PRIV_MASK = 207, this.STATE_MASK = 32, this.WORD_SIZE_ARM = 4, this.WORD_SIZE_THUMB = 2, this.BASE_RESET = 0, this.BASE_UNDEF = 4, this.BASE_SWI = 8, this.BASE_PABT = 12, this.BASE_DABT = 16, this.BASE_IRQ = 24, this.BASE_FIQ = 28, this.armCompiler = new d(this), this.thumbCompiler = new F(this), this.generateConds(), this.gprs = new Int32Array(16);
}
P.prototype.resetCPU = function(t) {
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
  var s = this.gprs, i = this.mmu;
  this.step = function() {
    var r = this.instruction || (this.instruction = this.loadInstruction(s[this.PC] - this.instructionWidth));
    if (s[this.PC] += this.instructionWidth, this.conditionPassed = !0, r(), !r.writesPC)
      this.instruction != null && ((r.next == null || r.next.page.invalid) && (r.next = this.loadInstruction(s[this.PC] - this.instructionWidth)), this.instruction = r.next);
    else if (this.conditionPassed) {
      var a = s[this.PC] &= 4294967294;
      this.execMode == this.MODE_ARM ? (i.wait32(a), i.waitPrefetch32(a)) : (i.wait(a), i.waitPrefetch(a)), s[this.PC] += this.instructionWidth, r.fixedJump ? this.instruction != null && ((r.next == null || r.next.page.invalid) && (r.next = this.loadInstruction(s[this.PC] - this.instructionWidth)), this.instruction = r.next) : this.instruction = null;
    } else
      this.instruction = null;
    this.irq.updateTimers();
  };
};
P.prototype.freeze = function() {
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
    cycles: this.cycles,
    // ARM or Thumb: which instruction set the next fetch decodes
    execMode: this.execMode
  };
};
P.prototype.defrost = function(t) {
  this.instruction = null, this.page = null, this.pageId = 0, this.pageRegion = -1, this.gprs[0] = t.gprs[0], this.gprs[1] = t.gprs[1], this.gprs[2] = t.gprs[2], this.gprs[3] = t.gprs[3], this.gprs[4] = t.gprs[4], this.gprs[5] = t.gprs[5], this.gprs[6] = t.gprs[6], this.gprs[7] = t.gprs[7], this.gprs[8] = t.gprs[8], this.gprs[9] = t.gprs[9], this.gprs[10] = t.gprs[10], this.gprs[11] = t.gprs[11], this.gprs[12] = t.gprs[12], this.gprs[13] = t.gprs[13], this.gprs[14] = t.gprs[14], this.gprs[15] = t.gprs[15], this.mode = t.mode, this.cpsrI = t.cpsrI, this.cpsrF = t.cpsrF, this.cpsrV = t.cpsrV, this.cpsrC = t.cpsrC, this.cpsrZ = t.cpsrZ, this.cpsrN = t.cpsrN, this.bankedRegisters[0][0] = t.bankedRegisters[0][0], this.bankedRegisters[0][1] = t.bankedRegisters[0][1], this.bankedRegisters[0][2] = t.bankedRegisters[0][2], this.bankedRegisters[0][3] = t.bankedRegisters[0][3], this.bankedRegisters[0][4] = t.bankedRegisters[0][4], this.bankedRegisters[0][5] = t.bankedRegisters[0][5], this.bankedRegisters[0][6] = t.bankedRegisters[0][6], this.bankedRegisters[1][0] = t.bankedRegisters[1][0], this.bankedRegisters[1][1] = t.bankedRegisters[1][1], this.bankedRegisters[1][2] = t.bankedRegisters[1][2], this.bankedRegisters[1][3] = t.bankedRegisters[1][3], this.bankedRegisters[1][4] = t.bankedRegisters[1][4], this.bankedRegisters[1][5] = t.bankedRegisters[1][5], this.bankedRegisters[1][6] = t.bankedRegisters[1][6], this.bankedRegisters[2][0] = t.bankedRegisters[2][0], this.bankedRegisters[2][1] = t.bankedRegisters[2][1], this.bankedRegisters[3][0] = t.bankedRegisters[3][0], this.bankedRegisters[3][1] = t.bankedRegisters[3][1], this.bankedRegisters[4][0] = t.bankedRegisters[4][0], this.bankedRegisters[4][1] = t.bankedRegisters[4][1], this.bankedRegisters[5][0] = t.bankedRegisters[5][0], this.bankedRegisters[5][1] = t.bankedRegisters[5][1], this.spsr = t.spsr, this.bankedSPSRs[0] = t.bankedSPSRs[0], this.bankedSPSRs[1] = t.bankedSPSRs[1], this.bankedSPSRs[2] = t.bankedSPSRs[2], this.bankedSPSRs[3] = t.bankedSPSRs[3], this.bankedSPSRs[4] = t.bankedSPSRs[4], this.bankedSPSRs[5] = t.bankedSPSRs[5], this.cycles = t.cycles, t.execMode !== void 0 && this.switchExecMode(t.execMode);
};
P.prototype.fetchPage = function(t) {
  var e = t >> this.mmu.BASE_OFFSET, s = this.mmu.addressToPage(e, t & this.mmu.OFFSET_MASK);
  if (e == this.pageRegion) {
    if (s == this.pageId && !this.page.invalid)
      return;
    this.pageId = s;
  } else
    this.pageMask = this.mmu.memory[e].PAGE_MASK, this.pageRegion = e, this.pageId = s;
  this.page = this.mmu.accessPage(e, s);
};
P.prototype.loadInstructionArm = function(t) {
  var e = null;
  this.fetchPage(t);
  var s = (t & this.pageMask) >> 2;
  if (e = this.page.arm[s], e)
    return e;
  var i = this.mmu.load32(t) >>> 0;
  return e = this.compileArm(i), e.next = null, e.page = this.page, e.address = t, e.opcode = i, this.page.arm[s] = e, e;
};
P.prototype.loadInstructionThumb = function(t) {
  var e = null;
  this.fetchPage(t);
  var s = (t & this.pageMask) >> 1;
  if (e = this.page.thumb[s], e)
    return e;
  var i = this.mmu.load16(t);
  return e = this.compileThumb(i), e.next = null, e.page = this.page, e.address = t, e.opcode = i, this.page.thumb[s] = e, e;
};
P.prototype.selectBank = function(t) {
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
P.prototype.switchExecMode = function(t) {
  this.execMode != t && (this.execMode = t, t == this.MODE_ARM ? (this.instructionWidth = this.WORD_SIZE_ARM, this.loadInstruction = this.loadInstructionArm) : (this.instructionWidth = this.WORD_SIZE_THUMB, this.loadInstruction = this.loadInstructionThumb));
};
P.prototype.switchMode = function(t) {
  if (t != this.mode) {
    if (t != this.MODE_USER || t != this.MODE_SYSTEM) {
      var e = this.selectBank(t), s = this.selectBank(this.mode);
      if (e != s) {
        if (t == this.MODE_FIQ || this.mode == this.MODE_FIQ) {
          var i = (s == this.BANK_FIQ) + 0, r = (e == this.BANK_FIQ) + 0;
          this.bankedRegisters[i][2] = this.gprs[8], this.bankedRegisters[i][3] = this.gprs[9], this.bankedRegisters[i][4] = this.gprs[10], this.bankedRegisters[i][5] = this.gprs[11], this.bankedRegisters[i][6] = this.gprs[12], this.gprs[8] = this.bankedRegisters[r][2], this.gprs[9] = this.bankedRegisters[r][3], this.gprs[10] = this.bankedRegisters[r][4], this.gprs[11] = this.bankedRegisters[r][5], this.gprs[12] = this.bankedRegisters[r][6];
        }
        this.bankedRegisters[s][0] = this.gprs[this.SP], this.bankedRegisters[s][1] = this.gprs[this.LR], this.gprs[this.SP] = this.bankedRegisters[e][0], this.gprs[this.LR] = this.bankedRegisters[e][1], this.bankedSPSRs[s] = this.spsr, this.spsr = this.bankedSPSRs[e];
      }
    }
    this.mode = t;
  }
};
P.prototype.packCPSR = function() {
  return this.mode | !!this.execMode << 5 | !!this.cpsrF << 6 | !!this.cpsrI << 7 | !!this.cpsrN << 31 | !!this.cpsrZ << 30 | !!this.cpsrC << 29 | !!this.cpsrV << 28;
};
P.prototype.unpackCPSR = function(t) {
  this.switchMode(t & 31), this.switchExecMode(!!(t & 32)), this.cpsrF = t & 64, this.cpsrI = t & 128, this.cpsrN = t & 2147483648, this.cpsrZ = t & 1073741824, this.cpsrC = t & 536870912, this.cpsrV = t & 268435456, this.irq.testIRQ();
};
P.prototype.hasSPSR = function() {
  return this.mode != this.MODE_SYSTEM && this.mode != this.MODE_USER;
};
P.prototype.raiseIRQ = function() {
  if (!this.cpsrI) {
    var t = this.packCPSR(), e = this.instructionWidth;
    this.switchMode(this.MODE_IRQ), this.spsr = t, this.gprs[this.LR] = this.gprs[this.PC] - e + 4, this.gprs[this.PC] = this.BASE_IRQ + this.WORD_SIZE_ARM, this.instruction = null, this.switchExecMode(this.MODE_ARM), this.cpsrI = !0;
  }
};
P.prototype.raiseTrap = function() {
  var t = this.packCPSR(), e = this.instructionWidth;
  this.switchMode(this.MODE_SUPERVISOR), this.spsr = t, this.gprs[this.LR] = this.gprs[this.PC] - e, this.gprs[this.PC] = this.BASE_SWI + this.WORD_SIZE_ARM, this.instruction = null, this.switchExecMode(this.MODE_ARM), this.cpsrI = !0;
};
P.prototype.badOp = function(t) {
  var e = function() {
    throw "Illegal instruction: 0x" + t.toString(16);
  };
  return e.writesPC = !0, e.fixedJump = !1, e;
};
P.prototype.generateConds = function() {
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
P.prototype.barrelShiftImmediate = function(t, e, s) {
  var i = this, r = this.gprs, a = this.badOp;
  switch (t) {
    case 0:
      e ? a = function() {
        i.shifterOperand = r[s] << e, i.shifterCarryOut = r[s] & 1 << 32 - e;
      } : a = function() {
        i.shifterOperand = r[s], i.shifterCarryOut = i.cpsrC;
      };
      break;
    case 32:
      e ? a = function() {
        i.shifterOperand = r[s] >>> e, i.shifterCarryOut = r[s] & 1 << e - 1;
      } : a = function() {
        i.shifterOperand = 0, i.shifterCarryOut = r[s] & 2147483648;
      };
      break;
    case 64:
      e ? a = function() {
        i.shifterOperand = r[s] >> e, i.shifterCarryOut = r[s] & 1 << e - 1;
      } : a = function() {
        i.shifterCarryOut = r[s] & 2147483648, i.shifterCarryOut ? i.shifterOperand = 4294967295 : i.shifterOperand = 0;
      };
      break;
    case 96:
      e ? a = function() {
        i.shifterOperand = r[s] >>> e | r[s] << 32 - e, i.shifterCarryOut = r[s] & 1 << e - 1;
      } : a = function() {
        i.shifterOperand = !!i.cpsrC << 31 | r[s] >>> 1, i.shifterCarryOut = r[s] & 1;
      };
      break;
  }
  return a;
};
P.prototype.compileArm = function(t) {
  var e = this.badOp(t), s = t & 234881024;
  this.gprs;
  var i = this.conds[(t & 4026531840) >>> 28];
  if ((t & 268435440) == 19922704) {
    var r = t & 15;
    e = this.armCompiler.constructBX(r, i), e.writesPC = !0, e.fixedJump = !1;
  } else if (!(t & 201326592) && (s == 33554432 || (t & 144) != 144)) {
    var a = t & 31457280, h = t & 1048576;
    if ((a & 25165824) == 16777216 && !h) {
      var n = t & 4194304;
      if ((t & 11595776) == 2158592) {
        var r = t & 15, o = t & 255, u = (t & 3840) >> 7;
        o = o >>> u | o << 32 - u, e = this.armCompiler.constructMSR(r, n, t, o, i), e.writesPC = !1;
      } else if ((t & 12517376) == 983040) {
        var c = (t & 61440) >> 12;
        e = this.armCompiler.constructMRS(c, n, i), e.writesPC = c == this.PC;
      }
    } else {
      var p = (t & 983040) >> 16, c = (t & 61440) >> 12, f = t & 96, r = t & 15, l = function() {
        throw "BUG: invalid barrel shifter";
      };
      if (t & 33554432) {
        var o = t & 255, x = (t & 3840) >> 7;
        x ? l = this.armCompiler.constructAddressingMode1ImmediateRotate(o, x) : l = this.armCompiler.constructAddressingMode1Immediate(o);
      } else if (t & 16) {
        var m = (t & 3840) >> 8;
        switch (f) {
          case 0:
            l = this.armCompiler.constructAddressingMode1LSL(m, r);
            break;
          case 32:
            l = this.armCompiler.constructAddressingMode1LSR(m, r);
            break;
          case 64:
            l = this.armCompiler.constructAddressingMode1ASR(m, r);
            break;
          case 96:
            l = this.armCompiler.constructAddressingMode1ROR(m, r);
            break;
        }
      } else {
        var o = (t & 3968) >> 7;
        l = this.barrelShiftImmediate(f, o, r);
      }
      switch (a) {
        case 0:
          h ? e = this.armCompiler.constructANDS(c, p, l, i) : e = this.armCompiler.constructAND(c, p, l, i);
          break;
        case 2097152:
          h ? e = this.armCompiler.constructEORS(c, p, l, i) : e = this.armCompiler.constructEOR(c, p, l, i);
          break;
        case 4194304:
          h ? e = this.armCompiler.constructSUBS(c, p, l, i) : e = this.armCompiler.constructSUB(c, p, l, i);
          break;
        case 6291456:
          h ? e = this.armCompiler.constructRSBS(c, p, l, i) : e = this.armCompiler.constructRSB(c, p, l, i);
          break;
        case 8388608:
          h ? e = this.armCompiler.constructADDS(c, p, l, i) : e = this.armCompiler.constructADD(c, p, l, i);
          break;
        case 10485760:
          h ? e = this.armCompiler.constructADCS(c, p, l, i) : e = this.armCompiler.constructADC(c, p, l, i);
          break;
        case 12582912:
          h ? e = this.armCompiler.constructSBCS(c, p, l, i) : e = this.armCompiler.constructSBC(c, p, l, i);
          break;
        case 14680064:
          h ? e = this.armCompiler.constructRSCS(c, p, l, i) : e = this.armCompiler.constructRSC(c, p, l, i);
          break;
        case 16777216:
          e = this.armCompiler.constructTST(c, p, l, i);
          break;
        case 18874368:
          e = this.armCompiler.constructTEQ(c, p, l, i);
          break;
        case 20971520:
          e = this.armCompiler.constructCMP(c, p, l, i);
          break;
        case 23068672:
          e = this.armCompiler.constructCMN(c, p, l, i);
          break;
        case 25165824:
          h ? e = this.armCompiler.constructORRS(c, p, l, i) : e = this.armCompiler.constructORR(c, p, l, i);
          break;
        case 27262976:
          h ? e = this.armCompiler.constructMOVS(c, p, l, i) : e = this.armCompiler.constructMOV(c, p, l, i);
          break;
        case 29360128:
          h ? e = this.armCompiler.constructBICS(c, p, l, i) : e = this.armCompiler.constructBIC(c, p, l, i);
          break;
        case 31457280:
          h ? e = this.armCompiler.constructMVNS(c, p, l, i) : e = this.armCompiler.constructMVN(c, p, l, i);
          break;
      }
      e.writesPC = c == this.PC;
    }
  } else if ((t & 263196656) == 16777360) {
    var r = t & 15, c = t >> 12 & 15, p = t >> 16 & 15;
    t & 4194304 ? e = this.armCompiler.constructSWPB(c, p, r, i) : e = this.armCompiler.constructSWP(c, p, r, i), e.writesPC = c == this.PC;
  } else
    switch (s) {
      case 0:
        if ((t & 16777456) == 144) {
          var c = (t & 983040) >> 16, p = (t & 61440) >> 12, m = (t & 3840) >> 8, r = t & 15;
          switch (t & 15728640) {
            case 0:
              e = this.armCompiler.constructMUL(c, m, r, i);
              break;
            case 1048576:
              e = this.armCompiler.constructMULS(c, m, r, i);
              break;
            case 2097152:
              e = this.armCompiler.constructMLA(c, p, m, r, i);
              break;
            case 3145728:
              e = this.armCompiler.constructMLAS(c, p, m, r, i);
              break;
            case 8388608:
              e = this.armCompiler.constructUMULL(c, p, m, r, i);
              break;
            case 9437184:
              e = this.armCompiler.constructUMULLS(c, p, m, r, i);
              break;
            case 10485760:
              e = this.armCompiler.constructUMLAL(c, p, m, r, i);
              break;
            case 11534336:
              e = this.armCompiler.constructUMLALS(c, p, m, r, i);
              break;
            case 12582912:
              e = this.armCompiler.constructSMULL(c, p, m, r, i);
              break;
            case 13631488:
              e = this.armCompiler.constructSMULLS(c, p, m, r, i);
              break;
            case 14680064:
              e = this.armCompiler.constructSMLAL(c, p, m, r, i);
              break;
            case 15728640:
              e = this.armCompiler.constructSMLALS(c, p, m, r, i);
              break;
          }
          e.writesPC = c == this.PC;
        } else {
          var G = t & 1048576, c = (t & 61440) >> 12, v = (t & 3840) >> 4, E = r = t & 15, _ = t & 32, h = t & 64, C = t & 2097152, s = t & 4194304, R;
          if (s) {
            var o = E | v;
            R = this.armCompiler.constructAddressingMode23Immediate(t, o, i);
          } else
            R = this.armCompiler.constructAddressingMode23Register(t, r, i);
          R.writesPC = !!C && p == this.PC, (t & 144) == 144 && (G ? _ ? h ? e = this.armCompiler.constructLDRSH(c, R, i) : e = this.armCompiler.constructLDRH(c, R, i) : h && (e = this.armCompiler.constructLDRSB(c, R, i)) : !h && _ && (e = this.armCompiler.constructSTRH(c, R, i))), e.writesPC = c == this.PC || R.writesPC;
        }
        break;
      case 67108864:
      case 100663296:
        var c = (t & 61440) >> 12, G = t & 1048576, y = t & 4194304, s = t & 33554432, R = function() {
          throw "Unimplemented memory access: 0x" + t.toString(16);
        };
        if (~t & 16777216 && (t &= 4292870143), s) {
          var r = t & 15, f = t & 96, q = (t & 3968) >> 7;
          if (f || q) {
            var l = this.barrelShiftImmediate(f, q, r);
            R = this.armCompiler.constructAddressingMode2RegisterShifted(t, l, i);
          } else
            R = this.armCompiler.constructAddressingMode23Register(t, r, i);
        } else {
          var T = t & 4095;
          R = this.armCompiler.constructAddressingMode23Immediate(t, T, i);
        }
        G ? y ? e = this.armCompiler.constructLDRB(c, R, i) : e = this.armCompiler.constructLDR(c, R, i) : y ? e = this.armCompiler.constructSTRB(c, R, i) : e = this.armCompiler.constructSTR(c, R, i), e.writesPC = c == this.PC || R.writesPC;
        break;
      case 134217728:
        var G = t & 1048576, C = t & 2097152, N = t & 4194304, D = t & 8388608, H = t & 16777216, m = t & 65535, p = (t & 983040) >> 16, R, o = 0, T = 0, Z = !1;
        if (D) {
          H && (o = 4);
          for (var M = 1, s = 0; s < 16; M <<= 1, ++s)
            m & M && (C && s == p && !T && (m &= ~M, o += 4, Z = !0), T += 4);
        } else {
          H || (o = 4);
          for (var M = 1, s = 0; s < 16; M <<= 1, ++s)
            m & M && (C && s == p && !T && (m &= ~M, o += 4, Z = !0), o -= 4, T -= 4);
        }
        C ? R = this.armCompiler.constructAddressingMode4Writeback(o, T, p, Z) : R = this.armCompiler.constructAddressingMode4(o, p), G ? (N ? e = this.armCompiler.constructLDMS(m, R, i) : e = this.armCompiler.constructLDM(m, R, i), e.writesPC = !!(m & 32768)) : (N ? e = this.armCompiler.constructSTMS(m, R, i) : e = this.armCompiler.constructSTM(m, R, i), e.writesPC = !1);
        break;
      case 167772160:
        var o = t & 16777215;
        o & 8388608 && (o |= 4278190080), o <<= 2;
        var W = t & 16777216;
        W ? e = this.armCompiler.constructBL(o, i) : e = this.armCompiler.constructB(o, i), e.writesPC = !0, e.fixedJump = !0;
        break;
      case 201326592:
        break;
      case 234881024:
        if ((t & 251658240) == 251658240) {
          var o = t & 16777215;
          e = this.armCompiler.constructSWI(o, i), e.writesPC = !1;
        }
        break;
      default:
        throw "Bad opcode: 0x" + t.toString(16);
    }
  return e.execMode = this.MODE_ARM, e.fixedJump = e.fixedJump || !1, e;
};
P.prototype.compileThumb = function(t) {
  var e = this.badOp(t & 65535);
  if (this.gprs, (t & 64512) == 16384) {
    var s = (t & 56) >> 3, i = t & 7;
    switch (t & 960) {
      case 0:
        e = this.thumbCompiler.constructAND(i, s);
        break;
      case 64:
        e = this.thumbCompiler.constructEOR(i, s);
        break;
      case 128:
        e = this.thumbCompiler.constructLSL2(i, s);
        break;
      case 192:
        e = this.thumbCompiler.constructLSR2(i, s);
        break;
      case 256:
        e = this.thumbCompiler.constructASR2(i, s);
        break;
      case 320:
        e = this.thumbCompiler.constructADC(i, s);
        break;
      case 384:
        e = this.thumbCompiler.constructSBC(i, s);
        break;
      case 448:
        e = this.thumbCompiler.constructROR(i, s);
        break;
      case 512:
        e = this.thumbCompiler.constructTST(i, s);
        break;
      case 576:
        e = this.thumbCompiler.constructNEG(i, s);
        break;
      case 640:
        e = this.thumbCompiler.constructCMP2(i, s);
        break;
      case 704:
        e = this.thumbCompiler.constructCMN(i, s);
        break;
      case 768:
        e = this.thumbCompiler.constructORR(i, s);
        break;
      case 832:
        e = this.thumbCompiler.constructMUL(i, s);
        break;
      case 896:
        e = this.thumbCompiler.constructBIC(i, s);
        break;
      case 960:
        e = this.thumbCompiler.constructMVN(i, s);
        break;
    }
    e.writesPC = !1;
  } else if ((t & 64512) == 17408) {
    var s = (t & 120) >> 3, r = t & 7, a = t & 128, i = r | a >> 4;
    switch (t & 768) {
      case 0:
        e = this.thumbCompiler.constructADD4(i, s), e.writesPC = i == this.PC;
        break;
      case 256:
        e = this.thumbCompiler.constructCMP3(i, s), e.writesPC = !1;
        break;
      case 512:
        e = this.thumbCompiler.constructMOV3(i, s), e.writesPC = i == this.PC;
        break;
      case 768:
        e = this.thumbCompiler.constructBX(i, s), e.writesPC = !0, e.fixedJump = !1;
        break;
    }
  } else if ((t & 63488) == 6144) {
    var s = (t & 448) >> 6, r = (t & 56) >> 3, i = t & 7;
    switch (t & 1536) {
      case 0:
        e = this.thumbCompiler.constructADD3(i, r, s);
        break;
      case 512:
        e = this.thumbCompiler.constructSUB3(i, r, s);
        break;
      case 1024:
        var h = (t & 448) >> 6;
        h ? e = this.thumbCompiler.constructADD1(i, r, h) : e = this.thumbCompiler.constructMOV2(i, r, s);
        break;
      case 1536:
        var h = (t & 448) >> 6;
        e = this.thumbCompiler.constructSUB1(i, r, h);
        break;
    }
    e.writesPC = !1;
  } else if (t & 57344)
    if ((t & 57344) == 8192) {
      var h = t & 255, r = (t & 1792) >> 8;
      switch (t & 6144) {
        case 0:
          e = this.thumbCompiler.constructMOV1(r, h);
          break;
        case 2048:
          e = this.thumbCompiler.constructCMP1(r, h);
          break;
        case 4096:
          e = this.thumbCompiler.constructADD2(r, h);
          break;
        case 6144:
          e = this.thumbCompiler.constructSUB2(r, h);
          break;
      }
      e.writesPC = !1;
    } else if ((t & 63488) == 18432) {
      var i = (t & 1792) >> 8, h = (t & 255) << 2;
      e = this.thumbCompiler.constructLDR3(i, h), e.writesPC = !1;
    } else if ((t & 61440) == 20480) {
      var i = t & 7, r = (t & 56) >> 3, s = (t & 448) >> 6, n = t & 3584;
      switch (n) {
        case 0:
          e = this.thumbCompiler.constructSTR2(i, r, s);
          break;
        case 512:
          e = this.thumbCompiler.constructSTRH2(i, r, s);
          break;
        case 1024:
          e = this.thumbCompiler.constructSTRB2(i, r, s);
          break;
        case 1536:
          e = this.thumbCompiler.constructLDRSB(i, r, s);
          break;
        case 2048:
          e = this.thumbCompiler.constructLDR2(i, r, s);
          break;
        case 2560:
          e = this.thumbCompiler.constructLDRH2(i, r, s);
          break;
        case 3072:
          e = this.thumbCompiler.constructLDRB2(i, r, s);
          break;
        case 3584:
          e = this.thumbCompiler.constructLDRSH(i, r, s);
          break;
      }
      e.writesPC = !1;
    } else if ((t & 57344) == 24576) {
      var i = t & 7, r = (t & 56) >> 3, h = (t & 1984) >> 4, o = t & 4096;
      o && (h >>= 2);
      var u = t & 2048;
      u ? o ? e = this.thumbCompiler.constructLDRB1(i, r, h) : e = this.thumbCompiler.constructLDR1(i, r, h) : o ? e = this.thumbCompiler.constructSTRB1(i, r, h) : e = this.thumbCompiler.constructSTR1(i, r, h), e.writesPC = !1;
    } else if ((t & 62976) == 46080) {
      var c = !!(t & 256), p = t & 255;
      t & 2048 ? (e = this.thumbCompiler.constructPOP(p, c), e.writesPC = c, e.fixedJump = !1) : (e = this.thumbCompiler.constructPUSH(p, c), e.writesPC = !1);
    } else if (t & 32768)
      switch (t & 28672) {
        case 0:
          var i = t & 7, r = (t & 56) >> 3, h = (t & 1984) >> 5;
          t & 2048 ? e = this.thumbCompiler.constructLDRH1(i, r, h) : e = this.thumbCompiler.constructSTRH1(i, r, h), e.writesPC = !1;
          break;
        case 4096:
          var i = (t & 1792) >> 8, h = (t & 255) << 2, u = t & 2048;
          u ? e = this.thumbCompiler.constructLDR4(i, h) : e = this.thumbCompiler.constructSTR3(i, h), e.writesPC = !1;
          break;
        case 8192:
          var i = (t & 1792) >> 8, h = (t & 255) << 2;
          t & 2048 ? e = this.thumbCompiler.constructADD6(i, h) : e = this.thumbCompiler.constructADD5(i, h), e.writesPC = !1;
          break;
        case 12288:
          if (!(t & 3840)) {
            var o = t & 128, h = (t & 127) << 2;
            o && (h = -h), e = this.thumbCompiler.constructADD7(h), e.writesPC = !1;
          }
          break;
        case 16384:
          var r = (t & 1792) >> 8, p = t & 255;
          t & 2048 ? e = this.thumbCompiler.constructLDMIA(r, p) : e = this.thumbCompiler.constructSTMIA(r, p), e.writesPC = !1;
          break;
        case 20480:
          var f = (t & 3840) >> 8, h = t & 255;
          if (f == 15)
            e = this.thumbCompiler.constructSWI(h), e.writesPC = !1;
          else {
            t & 128 && (h |= 4294967040), h <<= 1;
            var l = this.conds[f];
            e = this.thumbCompiler.constructB1(h, l), e.writesPC = !0, e.fixedJump = !0;
          }
          break;
        case 24576:
        case 28672:
          var h = t & 2047, x = t & 6144;
          switch (x) {
            case 0:
              h & 1024 && (h |= 4294965248), h <<= 1, e = this.thumbCompiler.constructB2(h), e.writesPC = !0, e.fixedJump = !0;
              break;
            case 2048:
              break;
            case 4096:
              h & 1024 && (h |= 4294966272), h <<= 12, e = this.thumbCompiler.constructBL1(h), e.writesPC = !1;
              break;
            case 6144:
              e = this.thumbCompiler.constructBL2(h), e.writesPC = !0, e.fixedJump = !1;
              break;
          }
          break;
        default:
          this.WARN("Undefined instruction: 0x" + t.toString(16));
      }
    else
      throw "Bad opcode: 0x" + t.toString(16);
  else {
    var i = t & 7, s = (t & 56) >> 3, h = (t & 1984) >> 6;
    switch (t & 6144) {
      case 0:
        e = this.thumbCompiler.constructLSL1(i, s, h);
        break;
      case 2048:
        e = this.thumbCompiler.constructLSR1(i, s, h);
        break;
      case 4096:
        e = this.thumbCompiler.constructASR1(i, s, h);
        break;
    }
    e.writesPC = !1;
  }
  return e.execMode = this.MODE_THUMB, e.fixedJump = e.fixedJump || !1, e;
};
function tt(t) {
  w.call(this, new ArrayBuffer(t), 0), this.writePending = !1;
}
tt.prototype = Object.create(w.prototype);
tt.prototype.store8 = function(t, e) {
  this.view.setInt8(t, e), this.writePending = !0;
};
tt.prototype.store16 = function(t, e) {
  this.view.setInt16(t, e, !0), this.writePending = !0;
};
tt.prototype.store32 = function(t, e) {
  this.view.setInt32(t, e, !0), this.writePending = !0;
};
function B(t) {
  w.call(this, new ArrayBuffer(t), 0), this.COMMAND_WIPE = 16, this.COMMAND_ERASE_SECTOR = 48, this.COMMAND_ERASE = 128, this.COMMAND_ID = 144, this.COMMAND_WRITE = 160, this.COMMAND_SWITCH_BANK = 176, this.COMMAND_TERMINATE_ID = 240, this.ID_PANASONIC = 6962, this.ID_SANYO = 4962, this.bank0 = new DataView(this.buffer, 0, 65536), t > 65536 ? (this.id = this.ID_SANYO, this.bank1 = new DataView(this.buffer, 65536)) : (this.id = this.ID_PANASONIC, this.bank1 = null), this.bank = this.bank0, this.idMode = !1, this.writePending = !1, this.first = 0, this.second = 0, this.command = 0, this.pendingCommand = 0;
}
B.prototype = Object.create(w.prototype);
B.prototype.load8 = function(t) {
  return this.idMode && t < 2 ? this.id >> (t << 3) & 255 : t < 65536 ? this.bank.getInt8(t) : 0;
};
B.prototype.load16 = function(t) {
  return this.load8(t) & 255 | this.load8(t + 1) << 8;
};
B.prototype.load32 = function(t) {
  return this.load8(t) & 255 | this.load8(t + 1) << 8 | this.load8(t + 2) << 16 | this.load8(t + 3) << 24;
};
B.prototype.loadU8 = function(t) {
  return this.load8(t) & 255;
};
B.prototype.loadU16 = function(t) {
  return this.loadU8(t) & 255 | this.loadU8(t + 1) << 8;
};
B.prototype.store8 = function(t, e) {
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
B.prototype.store16 = function(t, e) {
  throw new Error("Unaligned save to flash!");
};
B.prototype.store32 = function(t, e) {
  throw new Error("Unaligned save to flash!");
};
B.prototype.replaceData = function(t) {
  var e = this.view === this.bank1;
  w.prototype.replaceData.call(this, t, 0), this.bank0 = new DataView(this.buffer, 0, 65536), t.byteLength > 65536 ? this.bank1 = new DataView(this.buffer, 65536) : this.bank1 = null, this.bank = e ? this.bank1 : this.bank0;
};
function U(t, e) {
  w.call(this, new ArrayBuffer(t), 0), this.writeAddress = 0, this.readBitsRemaining = 0, this.readAddress = 0, this.command = 0, this.commandBitsRemaining = 0, this.realSize = 0, this.addressBits = 0, this.writePending = !1, this.dma = e.core.irq.dma[3], this.COMMAND_NULL = 0, this.COMMAND_PENDING = 1, this.COMMAND_WRITE = 2, this.COMMAND_READ_PENDING = 3, this.COMMAND_READ = 4;
}
U.prototype = Object.create(w.prototype);
U.prototype.load8 = function(t) {
  throw new Error("Unsupported 8-bit access!");
};
U.prototype.load16 = function(t) {
  return this.loadU16(t);
};
U.prototype.loadU8 = function(t) {
  throw new Error("Unsupported 8-bit access!");
};
U.prototype.loadU16 = function(t) {
  if (this.command != this.COMMAND_READ || !this.dma.enable)
    return 1;
  if (--this.readBitsRemaining, this.readBitsRemaining < 64) {
    var e = 63 - this.readBitsRemaining, s = this.view.getUint8(this.readAddress + e >> 3, !1) >> 7 - (e & 7);
    return this.readBitsRemaining || (this.command = this.COMMAND_NULL), s & 1;
  }
  return 0;
};
U.prototype.load32 = function(t) {
  throw new Error("Unsupported 32-bit access!");
};
U.prototype.store8 = function(t, e) {
  throw new Error("Unsupported 8-bit access!");
};
U.prototype.store16 = function(t, e) {
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
        var i = this.view.getUint8(this.writeAddress >> 3);
        i &= ~(1 << 7 - (this.writeAddress & 7)), i |= (e & 1) << 7 - (this.writeAddress & 7), this.view.setUint8(this.writeAddress >> 3, i), ++this.writeAddress;
      }
      break;
    case this.COMMAND_READ_PENDING:
      --this.commandBitsRemaining > 0 ? (this.readAddress <<= 1, e & 1 && (this.readAddress |= 64)) : (this.readBitsRemaining = 68, this.command = this.COMMAND_READ);
      break;
  }
};
U.prototype.store32 = function(t, e) {
  throw new Error("Unsupported 32-bit access!");
};
U.prototype.replaceData = function(t) {
  w.prototype.replaceData.call(this, t, 0);
};
function ct(t, e, s) {
  typeof s > "u" && (s = !0), typeof e > "u" && (e = 8);
  var i = (t >>> 0).toString(16).toUpperCase();
  return e -= i.length, e < 0 ? i : (s ? "0x" : "") + new Array(e + 1).join("0") + i;
}
function ht(t, e) {
  this.core = t, this.rom = e, this.readWrite = 0, this.direction = 0, this.device = new J(this);
}
ht.prototype.store16 = function(t, e) {
  switch (t) {
    case 196:
      this.device.setPins(e & 15);
      break;
    case 198:
      this.direction = e & 15, this.device.setDirection(this.direction);
      break;
    case 200:
      this.readWrite = e & 1;
      break;
    default:
      throw new Error("BUG: Bad offset passed to GPIO: " + t.toString(16));
  }
  if (this.readWrite) {
    var s = this.rom.view.getUint16(t, !0);
    s &= ~this.direction, this.rom.view.setUint16(t, s | e & this.direction, !0);
  }
};
ht.prototype.outputPins = function(t) {
  if (this.readWrite) {
    var e = this.rom.view.getUint16(196, !0);
    e &= this.direction, this.rom.view.setUint16(196, e | t & ~this.direction & 15, !0);
  }
};
function J(t) {
  this.gpio = t, this.pins = 0, this.direction = 0, this.totalBytes = [
    0,
    // Force reset
    0,
    // Empty
    7,
    // Date/Time
    0,
    // Force IRQ
    1,
    // Control register
    0,
    // Empty
    3,
    // Time
    0
    // Empty
  ], this.bytesRemaining = 0, this.transferStep = 0, this.reading = 0, this.bitsRead = 0, this.bits = 0, this.command = -1, this.control = 64, this.time = [
    0,
    // Year
    0,
    // Month
    0,
    // Day
    0,
    // Day of week
    0,
    // Hour
    0,
    // Minute
    0
    // Second
  ];
}
J.prototype.setPins = function(t) {
  switch (this.transferStep) {
    case 0:
      (t & 5) == 1 && (this.transferStep = 1);
      break;
    case 1:
      t & 4 && (this.transferStep = 2);
      break;
    case 2:
      t & 1 ? t & 4 ? this.direction & 2 && !this.read ? (++this.bitsRead, this.bitsRead == 8 && this.processByte()) : (this.gpio.outputPins(5 | this.sioOutputPin() << 1), ++this.bitsRead, this.bitsRead == 8 && (--this.bytesRemaining, this.bytesRemaining <= 0 && (this.command = -1), this.bitsRead = 0)) : (this.bitsRead = 0, this.bytesRemaining = 0, this.command = -1, this.transferStep = 0) : (this.bits &= ~(1 << this.bitsRead), this.bits |= (t & 2) >> 1 << this.bitsRead);
      break;
  }
  this.pins = t & 7;
};
J.prototype.setDirection = function(t) {
  this.direction = t;
};
J.prototype.processByte = function() {
  switch (--this.bytesRemaining, this.command) {
    case -1:
      if ((this.bits & 15) == 6)
        switch (this.command = this.bits >> 4 & 7, this.reading = this.bits & 128, this.bytesRemaining = this.totalBytes[this.command], this.command) {
          case 0:
            this.control = 0;
            break;
          case 2:
          case 6:
            this.updateClock();
            break;
        }
      else
        this.gpio.core.WARN("Invalid RTC command byte: " + this.bits.toString(16));
      break;
    case 4:
      this.control = this.bits & 64;
      break;
  }
  this.bits = 0, this.bitsRead = 0, this.bytesRemaining || (this.command = -1);
};
J.prototype.sioOutputPin = function() {
  var t = 0;
  switch (this.command) {
    case 4:
      t = this.control;
      break;
    case 2:
    case 6:
      t = this.time[7 - this.bytesRemaining];
      break;
  }
  var e = t >> this.bitsRead & 1;
  return e;
};
J.prototype.updateClock = function() {
  var t = /* @__PURE__ */ new Date();
  this.time[0] = this.bcd(t.getFullYear()), this.time[1] = this.bcd(t.getMonth() + 1), this.time[2] = this.bcd(t.getDate()), this.time[3] = t.getDay() - 1, this.time[3] < 0 && (this.time[3] = 6), this.control & 64 ? this.time[4] = this.bcd(t.getHours()) : (this.time[4] = this.bcd(t.getHours() % 2), t.getHours() >= 12 && (this.time[4] |= 128)), this.time[5] = this.bcd(t.getMinutes()), this.time[6] = this.bcd(t.getSeconds());
};
J.prototype.bcd = function(t) {
  var e = t % 10;
  return t /= 10, e += t % 10 << 4, e;
};
function w(t, e) {
  this.buffer = t, this.view = new DataView(this.buffer, typeof e == "number" ? e : 0), this.mask = t.byteLength - 1, this.resetMask();
}
w.prototype.resetMask = function() {
  this.mask8 = this.mask & 4294967295, this.mask16 = this.mask & 4294967294, this.mask32 = this.mask & 4294967292;
};
w.prototype.load8 = function(t) {
  return this.view.getInt8(t & this.mask8);
};
w.prototype.load16 = function(t) {
  return this.view.getInt16(t & this.mask, !0);
};
w.prototype.loadU8 = function(t) {
  return this.view.getUint8(t & this.mask8);
};
w.prototype.loadU16 = function(t) {
  return this.view.getUint16(t & this.mask, !0);
};
w.prototype.load32 = function(t) {
  var e = (t & 3) << 3, s = this.view.getInt32(t & this.mask32, !0);
  return s >>> e | s << 32 - e;
};
w.prototype.store8 = function(t, e) {
  this.view.setInt8(t & this.mask8, e);
};
w.prototype.store16 = function(t, e) {
  this.view.setInt16(t & this.mask16, e, !0);
};
w.prototype.store32 = function(t, e) {
  this.view.setInt32(t & this.mask32, e, !0);
};
w.prototype.invalidatePage = function(t) {
};
w.prototype.replaceData = function(t, e) {
  this.buffer = t, this.view = new DataView(this.buffer, typeof e == "number" ? e : 0), this.icache && (this.icache = new Array(this.icache.length));
};
function st(t, e) {
  w.call(this, new ArrayBuffer(t)), this.ICACHE_PAGE_BITS = e, this.PAGE_MASK = (2 << this.ICACHE_PAGE_BITS) - 1, this.icache = new Array(t >> this.ICACHE_PAGE_BITS + 1);
}
st.prototype = Object.create(w.prototype);
st.prototype.invalidatePage = function(t) {
  var e = this.icache[(t & this.mask) >> this.ICACHE_PAGE_BITS];
  e && (e.invalid = !0);
};
function et(t, e) {
  w.call(this, t, e), this.ICACHE_PAGE_BITS = 10, this.PAGE_MASK = (2 << this.ICACHE_PAGE_BITS) - 1, this.icache = new Array(t.byteLength >> this.ICACHE_PAGE_BITS + 1), this.mask = 33554431, this.resetMask();
}
et.prototype = Object.create(w.prototype);
et.prototype.store8 = function(t, e) {
};
et.prototype.store16 = function(t, e) {
  t < 202 && t >= 196 && (this.gpio || (this.gpio = this.mmu.allocGPIO(this)), this.gpio.store16(t, e));
};
et.prototype.store32 = function(t, e) {
  t < 202 && t >= 196 && (this.gpio || (this.gpio = this.mmu.allocGPIO(this)), this.gpio.store32(t, e));
};
function V(t, e) {
  w.call(this, t, e), this.ICACHE_PAGE_BITS = 16, this.PAGE_MASK = (2 << this.ICACHE_PAGE_BITS) - 1, this.icache = new Array(1);
}
V.prototype = Object.create(w.prototype);
V.prototype.load8 = function(t) {
  return t >= this.buffer.byteLength ? -1 : this.view.getInt8(t);
};
V.prototype.load16 = function(t) {
  return t >= this.buffer.byteLength ? -1 : this.view.getInt16(t, !0);
};
V.prototype.loadU8 = function(t) {
  return t >= this.buffer.byteLength ? -1 : this.view.getUint8(t);
};
V.prototype.loadU16 = function(t) {
  return t >= this.buffer.byteLength ? -1 : this.view.getUint16(t, !0);
};
V.prototype.load32 = function(t) {
  return t >= this.buffer.byteLength ? -1 : this.view.getInt32(t, !0);
};
V.prototype.store8 = function(t, e) {
};
V.prototype.store16 = function(t, e) {
};
V.prototype.store32 = function(t, e) {
};
function K(t, e) {
  this.cpu = e, this.mmu = t;
}
K.prototype.load8 = function(t) {
  return this.mmu.load8(this.cpu.gprs[this.cpu.PC] - this.cpu.instructionWidth + (t & 3));
};
K.prototype.load16 = function(t) {
  return this.mmu.load16(this.cpu.gprs[this.cpu.PC] - this.cpu.instructionWidth + (t & 2));
};
K.prototype.loadU8 = function(t) {
  return this.mmu.loadU8(this.cpu.gprs[this.cpu.PC] - this.cpu.instructionWidth + (t & 3));
};
K.prototype.loadU16 = function(t) {
  return this.mmu.loadU16(this.cpu.gprs[this.cpu.PC] - this.cpu.instructionWidth + (t & 2));
};
K.prototype.load32 = function(t) {
  if (this.cpu.execMode == this.cpu.MODE_ARM)
    return this.mmu.load32(this.cpu.gprs[this.cpu.gprs.PC] - this.cpu.instructionWidth);
  var e = this.mmu.loadU16(this.cpu.gprs[this.cpu.PC] - this.cpu.instructionWidth);
  return e | e << 16;
};
K.prototype.store8 = function(t, e) {
};
K.prototype.store16 = function(t, e) {
};
K.prototype.store32 = function(t, e) {
};
K.prototype.invalidatePage = function(t) {
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
  this.badMemory = new K(this, this.cpu), this.memory = [
    this.bios,
    this.badMemory,
    // Unused
    new st(this.SIZE_WORKING_RAM, 9),
    new st(this.SIZE_WORKING_IRAM, 7),
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
    ram: this.memory[this.REGION_WORKING_RAM].buffer.slice(0),
    iram: this.memory[this.REGION_WORKING_IRAM].buffer.slice(0)
  };
};
b.prototype.defrost = function(t) {
  this.memory[this.REGION_WORKING_RAM].replaceData(t.ram), this.memory[this.REGION_WORKING_IRAM].replaceData(t.iram);
};
b.prototype.loadBios = function(t, e) {
  this.bios = new V(t), this.bios.real = !!e;
};
b.prototype.loadRom = function(t, e) {
  var s = {
    title: null,
    code: null,
    maker: null,
    memory: t,
    saveType: null
  }, i = new et(t);
  if (i.view.getUint8(178) != 150)
    return null;
  if (i.mmu = this, this.memory[this.REGION_CART0] = i, this.memory[this.REGION_CART1] = i, this.memory[this.REGION_CART2] = i, t.byteLength > 16777216) {
    var r = new et(t, 16777216);
    this.memory[this.REGION_CART0 + 1] = r, this.memory[this.REGION_CART1 + 1] = r, this.memory[this.REGION_CART2 + 1] = r;
  }
  if (e) {
    for (var a = "", h = 0; h < 12; ++h) {
      var n = i.loadU8(h + 160);
      if (!n)
        break;
      a += String.fromCharCode(n);
    }
    s.title = a;
    for (var o = "", h = 0; h < 4; ++h) {
      var n = i.loadU8(h + 172);
      if (!n)
        break;
      o += String.fromCharCode(n);
    }
    s.code = o;
    for (var u = "", h = 0; h < 2; ++h) {
      var n = i.loadU8(h + 176);
      if (!n)
        break;
      u += String.fromCharCode(n);
    }
    s.maker = u;
    for (var c = "", p, f = !1, h = 228; h < t.byteLength && !f; ++h)
      switch (p = String.fromCharCode(i.loadU8(h)), c += p, c) {
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
          f = !0;
          break;
        default:
          c = p;
          break;
      }
    if (f)
      switch (s.saveType = c, c) {
        case "FLASH_V":
        case "FLASH512_V":
          this.save = this.memory[this.REGION_CART_SRAM] = new B(this.SIZE_CART_FLASH512);
          break;
        case "FLASH1M_V":
          this.save = this.memory[this.REGION_CART_SRAM] = new B(this.SIZE_CART_FLASH1M);
          break;
        case "SRAM_V":
          this.save = this.memory[this.REGION_CART_SRAM] = new tt(this.SIZE_CART_SRAM);
          break;
        case "EEPROM_V":
          this.save = this.memory[this.REGION_CART2 + 1] = new U(this.SIZE_CART_EEPROM, this);
          break;
      }
    this.save || (this.save = this.memory[this.REGION_CART_SRAM] = new tt(this.SIZE_CART_SRAM));
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
  var s = t & 16777215, i = this.memory[t >>> this.BASE_OFFSET];
  i.store8(s, e), i.invalidatePage(s);
};
b.prototype.store16 = function(t, e) {
  var s = t & 16777214, i = this.memory[t >>> this.BASE_OFFSET];
  i.store16(s, e), i.invalidatePage(s);
};
b.prototype.store32 = function(t, e) {
  var s = t & 16777212, i = this.memory[t >>> this.BASE_OFFSET];
  i.store32(s, e), i.invalidatePage(s), i.invalidatePage(s + 2);
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
  var s = this.memory[t], i = s.icache[e];
  return (!i || i.invalid) && (i = {
    thumb: new Array(1 << s.ICACHE_PAGE_BITS),
    arm: new Array(1 << s.ICACHE_PAGE_BITS - 1),
    invalid: !1
  }, s.icache[e] = i), i;
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
    var s = e.width, i = this.DMA_OFFSET[e.srcControl] * s, r = this.DMA_OFFSET[e.dstControl] * s, a = e.nextCount, h = e.nextSource & this.OFFSET_MASK, n = e.nextDest & this.OFFSET_MASK, o = e.nextSource >>> this.BASE_OFFSET, u = e.nextDest >>> this.BASE_OFFSET, c = this.memory[o], p = this.memory[u], f = null, l = null, x = 4294967295, m = 4294967295, v;
    if (p.ICACHE_PAGE_BITS)
      for (var E = n + a * s >> p.ICACHE_PAGE_BITS, _ = n >> p.ICACHE_PAGE_BITS; _ <= E; ++_)
        p.invalidatePage(_ << p.ICACHE_PAGE_BITS);
    if ((u == this.REGION_WORKING_RAM || u == this.REGION_WORKING_IRAM) && (l = p.view, m = p.mask), (o == this.REGION_WORKING_RAM || o == this.REGION_WORKING_IRAM || o == this.REGION_CART0 || o == this.REGION_CART1) && (f = c.view, x = c.mask), c && p)
      if (f && l)
        if (s == 4)
          for (h &= 4294967292, n &= 4294967292; a--; )
            v = f.getInt32(h & x), l.setInt32(n & m, v), h += i, n += r;
        else
          for (; a--; )
            v = f.getUint16(h & x), l.setUint16(n & m, v), h += i, n += r;
      else if (f)
        if (s == 4)
          for (h &= 4294967292, n &= 4294967292; a--; )
            v = f.getInt32(h & x, !0), p.store32(n, v), h += i, n += r;
        else
          for (; a--; )
            v = f.getUint16(h & x, !0), p.store16(n, v), h += i, n += r;
      else if (s == 4)
        for (h &= 4294967292, n &= 4294967292; a--; )
          v = c.load32(h), p.store32(n, v), h += i, n += r;
      else
        for (; a--; )
          v = c.loadU16(h), p.store16(n, v), h += i, n += r;
    else
      this.core.WARN("Invalid DMA");
    if (e.doIrq && (e.nextIRQ = this.cpu.cycles + 2, e.nextIRQ += s == 4 ? this.waitstates32[o] + this.waitstates32[u] : this.waitstates[o] + this.waitstates[u], e.nextIRQ += (e.count - 1) * (s == 4 ? this.waitstatesSeq32[o] + this.waitstatesSeq32[u] : this.waitstatesSeq[o] + this.waitstatesSeq[u])), e.nextSource = h | o << this.BASE_OFFSET, e.nextDest = n | u << this.BASE_OFFSET, e.nextCount = a, e.repeat)
      e.nextCount = e.count, e.dstControl == this.DMA_INCREMENT_RELOAD && (e.nextDest = e.dest), this.scheduleDma(t, e);
    else {
      e.enable = !1;
      var y = this.memory[this.REGION_IO];
      y.registers[this.DMA_REGISTER[t]] &= 32736;
    }
  }
};
b.prototype.adjustTimings = function(t) {
  var e = t & 3, s = (t & 12) >> 2, i = (t & 16) >> 4, r = (t & 96) >> 5, a = (t & 128) >> 7, h = (t & 768) >> 8, n = (t & 1024) >> 10, o = t & 16384;
  this.waitstates[this.REGION_CART_SRAM] = this.ROM_WS[e], this.waitstatesSeq[this.REGION_CART_SRAM] = this.ROM_WS[e], this.waitstates32[this.REGION_CART_SRAM] = this.ROM_WS[e], this.waitstatesSeq32[this.REGION_CART_SRAM] = this.ROM_WS[e], this.waitstates[this.REGION_CART0] = this.waitstates[this.REGION_CART0 + 1] = this.ROM_WS[s], this.waitstates[this.REGION_CART1] = this.waitstates[this.REGION_CART1 + 1] = this.ROM_WS[r], this.waitstates[this.REGION_CART2] = this.waitstates[this.REGION_CART2 + 1] = this.ROM_WS[h], this.waitstatesSeq[this.REGION_CART0] = this.waitstatesSeq[this.REGION_CART0 + 1] = this.ROM_WS_SEQ[0][i], this.waitstatesSeq[this.REGION_CART1] = this.waitstatesSeq[this.REGION_CART1 + 1] = this.ROM_WS_SEQ[1][a], this.waitstatesSeq[this.REGION_CART2] = this.waitstatesSeq[this.REGION_CART2 + 1] = this.ROM_WS_SEQ[2][n], this.waitstates32[this.REGION_CART0] = this.waitstates32[this.REGION_CART0 + 1] = this.waitstates[this.REGION_CART0] + 1 + this.waitstatesSeq[this.REGION_CART0], this.waitstates32[this.REGION_CART1] = this.waitstates32[this.REGION_CART1 + 1] = this.waitstates[this.REGION_CART1] + 1 + this.waitstatesSeq[this.REGION_CART1], this.waitstates32[this.REGION_CART2] = this.waitstates32[this.REGION_CART2 + 1] = this.waitstates[this.REGION_CART2] + 1 + this.waitstatesSeq[this.REGION_CART2], this.waitstatesSeq32[this.REGION_CART0] = this.waitstatesSeq32[this.REGION_CART0 + 1] = 2 * this.waitstatesSeq[this.REGION_CART0] + 1, this.waitstatesSeq32[this.REGION_CART1] = this.waitstatesSeq32[this.REGION_CART1 + 1] = 2 * this.waitstatesSeq[this.REGION_CART1] + 1, this.waitstatesSeq32[this.REGION_CART2] = this.waitstatesSeq32[this.REGION_CART2 + 1] = 2 * this.waitstatesSeq[this.REGION_CART2] + 1, o ? (this.waitstatesPrefetch[this.REGION_CART0] = this.waitstatesPrefetch[this.REGION_CART0 + 1] = 0, this.waitstatesPrefetch[this.REGION_CART1] = this.waitstatesPrefetch[this.REGION_CART1 + 1] = 0, this.waitstatesPrefetch[this.REGION_CART2] = this.waitstatesPrefetch[this.REGION_CART2 + 1] = 0, this.waitstatesPrefetch32[this.REGION_CART0] = this.waitstatesPrefetch32[this.REGION_CART0 + 1] = 0, this.waitstatesPrefetch32[this.REGION_CART1] = this.waitstatesPrefetch32[this.REGION_CART1 + 1] = 0, this.waitstatesPrefetch32[this.REGION_CART2] = this.waitstatesPrefetch32[this.REGION_CART2 + 1] = 0) : (this.waitstatesPrefetch[this.REGION_CART0] = this.waitstatesPrefetch[this.REGION_CART0 + 1] = this.waitstatesSeq[this.REGION_CART0], this.waitstatesPrefetch[this.REGION_CART1] = this.waitstatesPrefetch[this.REGION_CART1 + 1] = this.waitstatesSeq[this.REGION_CART1], this.waitstatesPrefetch[this.REGION_CART2] = this.waitstatesPrefetch[this.REGION_CART2 + 1] = this.waitstatesSeq[this.REGION_CART2], this.waitstatesPrefetch32[this.REGION_CART0] = this.waitstatesPrefetch32[this.REGION_CART0 + 1] = this.waitstatesSeq32[this.REGION_CART0], this.waitstatesPrefetch32[this.REGION_CART1] = this.waitstatesPrefetch32[this.REGION_CART1 + 1] = this.waitstatesSeq32[this.REGION_CART1], this.waitstatesPrefetch32[this.REGION_CART2] = this.waitstatesPrefetch32[this.REGION_CART2 + 1] = this.waitstatesSeq32[this.REGION_CART2]);
};
b.prototype.saveNeedsFlush = function() {
  return this.save.writePending;
};
b.prototype.flushSave = function() {
  this.save.writePending = !1;
};
b.prototype.allocGPIO = function(t) {
  return new ht(this.core, t);
};
function I() {
  this.FREQUENCY = 16777216, this.cpu = null, this.enable = !1, this.IRQ_VBLANK = 0, this.IRQ_HBLANK = 1, this.IRQ_VCOUNTER = 2, this.IRQ_TIMER0 = 3, this.IRQ_TIMER1 = 4, this.IRQ_TIMER2 = 5, this.IRQ_TIMER3 = 6, this.IRQ_SIO = 7, this.IRQ_DMA0 = 8, this.IRQ_DMA1 = 9, this.IRQ_DMA2 = 10, this.IRQ_DMA3 = 11, this.IRQ_KEYPAD = 12, this.IRQ_GAMEPAK = 13, this.MASK_VBLANK = 1, this.MASK_HBLANK = 2, this.MASK_VCOUNTER = 4, this.MASK_TIMER0 = 8, this.MASK_TIMER1 = 16, this.MASK_TIMER2 = 32, this.MASK_TIMER3 = 64, this.MASK_SIO = 128, this.MASK_DMA0 = 256, this.MASK_DMA1 = 512, this.MASK_DMA2 = 1024, this.MASK_DMA3 = 2048, this.MASK_KEYPAD = 4096, this.MASK_GAMEPAK = 8192;
}
I.prototype.clear = function() {
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
I.prototype.freeze = function() {
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
I.prototype.defrost = function(t) {
  this.enable = t.enable, this.enabledIRQs = t.enabledIRQs, this.interruptFlags = t.interruptFlags, this.dma = t.dma, this.timers = t.timers, this.timersEnabled = 0, this.timers[0].enable && ++this.timersEnabled, this.timers[1].enable && ++this.timersEnabled, this.timers[2].enable && ++this.timersEnabled, this.timers[3].enable && ++this.timersEnabled, this.nextEvent = t.nextEvent, this.springIRQ = t.springIRQ;
};
I.prototype.updateTimers = function() {
  if (!(this.nextEvent > this.cpu.cycles)) {
    if (this.springIRQ && (this.cpu.raiseIRQ(), this.springIRQ = !1), this.video.updateTimers(this.cpu), this.audio.updateTimers(), this.timersEnabled) {
      var t = this.timers[0];
      t.enable && this.cpu.cycles >= t.nextEvent && (t.lastEvent = t.nextEvent, t.nextEvent += t.overflowInterval, this.io.registers[this.io.TM0CNT_LO >> 1] = t.reload, t.oldReload = t.reload, t.doIrq && this.raiseIRQ(this.IRQ_TIMER0), this.audio.enabled && (this.audio.enableChannelA && !this.audio.soundTimerA && this.audio.dmaA >= 0 && this.audio.sampleFifoA(), this.audio.enableChannelB && !this.audio.soundTimerB && this.audio.dmaB >= 0 && this.audio.sampleFifoB()), t = this.timers[1], t.countUp && ++this.io.registers[this.io.TM1CNT_LO >> 1] == 65536 && (t.nextEvent = this.cpu.cycles)), t = this.timers[1], t.enable && this.cpu.cycles >= t.nextEvent && (t.lastEvent = t.nextEvent, t.nextEvent += t.overflowInterval, (!t.countUp || this.io.registers[this.io.TM1CNT_LO >> 1] == 65536) && (this.io.registers[this.io.TM1CNT_LO >> 1] = t.reload), t.oldReload = t.reload, t.doIrq && this.raiseIRQ(this.IRQ_TIMER1), t.countUp && (t.nextEvent = 0), this.audio.enabled && (this.audio.enableChannelA && this.audio.soundTimerA && this.audio.dmaA >= 0 && this.audio.sampleFifoA(), this.audio.enableChannelB && this.audio.soundTimerB && this.audio.dmaB >= 0 && this.audio.sampleFifoB()), t = this.timers[2], t.countUp && ++this.io.registers[this.io.TM2CNT_LO >> 1] == 65536 && (t.nextEvent = this.cpu.cycles)), t = this.timers[2], t.enable && this.cpu.cycles >= t.nextEvent && (t.lastEvent = t.nextEvent, t.nextEvent += t.overflowInterval, (!t.countUp || this.io.registers[this.io.TM2CNT_LO >> 1] == 65536) && (this.io.registers[this.io.TM2CNT_LO >> 1] = t.reload), t.oldReload = t.reload, t.doIrq && this.raiseIRQ(this.IRQ_TIMER2), t.countUp && (t.nextEvent = 0), t = this.timers[3], t.countUp && ++this.io.registers[this.io.TM3CNT_LO >> 1] == 65536 && (t.nextEvent = this.cpu.cycles)), t = this.timers[3], t.enable && this.cpu.cycles >= t.nextEvent && (t.lastEvent = t.nextEvent, t.nextEvent += t.overflowInterval, (!t.countUp || this.io.registers[this.io.TM3CNT_LO >> 1] == 65536) && (this.io.registers[this.io.TM3CNT_LO >> 1] = t.reload), t.oldReload = t.reload, t.doIrq && this.raiseIRQ(this.IRQ_TIMER3), t.countUp && (t.nextEvent = 0));
    }
    var e = this.dma[0];
    e.enable && e.doIrq && e.nextIRQ && this.cpu.cycles >= e.nextIRQ && (e.nextIRQ = 0, this.raiseIRQ(this.IRQ_DMA0)), e = this.dma[1], e.enable && e.doIrq && e.nextIRQ && this.cpu.cycles >= e.nextIRQ && (e.nextIRQ = 0, this.raiseIRQ(this.IRQ_DMA1)), e = this.dma[2], e.enable && e.doIrq && e.nextIRQ && this.cpu.cycles >= e.nextIRQ && (e.nextIRQ = 0, this.raiseIRQ(this.IRQ_DMA2)), e = this.dma[3], e.enable && e.doIrq && e.nextIRQ && this.cpu.cycles >= e.nextIRQ && (e.nextIRQ = 0, this.raiseIRQ(this.IRQ_DMA3)), this.pollNextEvent();
  }
};
I.prototype.resetSP = function() {
  this.cpu.switchMode(this.cpu.MODE_SUPERVISOR), this.cpu.gprs[this.cpu.SP] = 50364384, this.cpu.switchMode(this.cpu.MODE_IRQ), this.cpu.gprs[this.cpu.SP] = 50364320, this.cpu.switchMode(this.cpu.MODE_SYSTEM), this.cpu.gprs[this.cpu.SP] = 50364160;
};
I.prototype.swi32 = function(t) {
  this.swi(t >> 16);
};
I.prototype.swi = function(t) {
  if (this.core.mmu.bios.real) {
    this.cpu.raiseTrap();
    return;
  }
  switch (t) {
    case 0:
      for (var e = this.core.mmu.memory[this.core.mmu.REGION_WORKING_IRAM], s = e.loadU8(32762), C = 32256; C < 32768; C += 4)
        e.store32(C, 0);
      this.resetSP(), s ? this.cpu.gprs[this.cpu.LR] = 33554432 : this.cpu.gprs[this.cpu.LR] = 134217728, this.cpu.switchExecMode(this.cpu.MODE_ARM), this.cpu.instruction.writesPC = !0, this.cpu.gprs[this.cpu.PC] = this.cpu.gprs[this.cpu.LR];
      break;
    case 1:
      var i = this.cpu.gprs[0];
      if (i & 1 && (this.core.mmu.memory[this.core.mmu.REGION_WORKING_RAM] = new st(this.core.mmu.SIZE_WORKING_RAM, 9)), i & 2)
        for (var C = 0; C < this.core.mmu.SIZE_WORKING_IRAM - 512; C += 4)
          this.core.mmu.memory[this.core.mmu.REGION_WORKING_IRAM].store32(C, 0);
      i & 28 && this.video.renderPath.clearSubsets(this.core.mmu, i), i & 224 && this.core.STUB("Unimplemented RegisterRamReset");
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
      var r = (this.cpu.gprs[0] | 0) / (this.cpu.gprs[1] | 0), a = (this.cpu.gprs[0] | 0) % (this.cpu.gprs[1] | 0);
      this.cpu.gprs[0] = r | 0, this.cpu.gprs[1] = a | 0, this.cpu.gprs[3] = Math.abs(r | 0);
      break;
    case 7:
      var r = (this.cpu.gprs[1] | 0) / (this.cpu.gprs[0] | 0), a = (this.cpu.gprs[1] | 0) % (this.cpu.gprs[0] | 0);
      this.cpu.gprs[0] = r | 0, this.cpu.gprs[1] = a | 0, this.cpu.gprs[3] = Math.abs(r | 0);
      break;
    case 8:
      var h = Math.sqrt(this.cpu.gprs[0]);
      this.cpu.gprs[0] = h | 0;
      break;
    case 10:
      var n = this.cpu.gprs[0] / 16384, o = this.cpu.gprs[1] / 16384;
      this.cpu.gprs[0] = Math.atan2(o, n) / (2 * Math.PI) * 65536;
      break;
    case 11:
      var p = this.cpu.gprs[0], f = this.cpu.gprs[1], l = this.cpu.gprs[2], x = l & 1048575, m = l & 16777216, u = l & 67108864 ? 4 : 2;
      if (m)
        if (u == 4) {
          p &= 4294967292, f &= 4294967292;
          for (var c = this.cpu.mmu.load32(p), C = 0; C < x; ++C)
            this.cpu.mmu.store32(f + (C << 2), c);
        } else {
          p &= 4294967294, f &= 4294967294;
          for (var c = this.cpu.mmu.load16(p), C = 0; C < x; ++C)
            this.cpu.mmu.store16(f + (C << 1), c);
        }
      else if (u == 4) {
        p &= 4294967292, f &= 4294967292;
        for (var C = 0; C < x; ++C) {
          var c = this.cpu.mmu.load32(p + (C << 2));
          this.cpu.mmu.store32(f + (C << 2), c);
        }
      } else {
        p &= 4294967294, f &= 4294967294;
        for (var C = 0; C < x; ++C) {
          var c = this.cpu.mmu.load16(p + (C << 1));
          this.cpu.mmu.store16(f + (C << 1), c);
        }
      }
      return;
    case 12:
      var p = this.cpu.gprs[0] & 4294967292, f = this.cpu.gprs[1] & 4294967292, l = this.cpu.gprs[2], x = l & 1048575;
      x = x + 7 >> 3 << 3;
      var m = l & 16777216;
      if (m)
        for (var c = this.cpu.mmu.load32(p), C = 0; C < x; ++C)
          this.cpu.mmu.store32(f + (C << 2), c);
      else
        for (var C = 0; C < x; ++C) {
          var c = this.cpu.mmu.load32(p + (C << 2));
          this.cpu.mmu.store32(f + (C << 2), c);
        }
      return;
    case 14:
      for (var C = this.cpu.gprs[2], v, E, _, y, N, D, H, R = this.cpu.gprs[0], T = this.cpu.gprs[1], M, W, X, j, q, G; C--; )
        v = this.core.mmu.load32(R) / 256, E = this.core.mmu.load32(R + 4) / 256, _ = this.core.mmu.load16(R + 8), y = this.core.mmu.load16(R + 10), N = this.core.mmu.load16(R + 12) / 256, D = this.core.mmu.load16(R + 14) / 256, H = (this.core.mmu.loadU16(R + 16) >> 8) / 128 * Math.PI, R += 20, M = j = Math.cos(H), W = X = Math.sin(H), M *= N, W *= -N, X *= D, j *= D, q = v - (M * _ + W * y), G = E - (X * _ + j * y), this.core.mmu.store16(T, M * 256 | 0), this.core.mmu.store16(T + 2, W * 256 | 0), this.core.mmu.store16(T + 4, X * 256 | 0), this.core.mmu.store16(T + 6, j * 256 | 0), this.core.mmu.store32(T + 8, q * 256 | 0), this.core.mmu.store32(T + 12, G * 256 | 0), T += 16;
      break;
    case 15:
      for (var C = this.cpu.gprs[2], N, D, H, R = this.cpu.gprs[0], T = this.cpu.gprs[1], Z = this.cpu.gprs[3], M, W, X, j; C--; )
        N = this.core.mmu.load16(R) / 256, D = this.core.mmu.load16(R + 2) / 256, H = (this.core.mmu.loadU16(R + 4) >> 8) / 128 * Math.PI, R += 6, M = j = Math.cos(H), W = X = Math.sin(H), M *= N, W *= -N, X *= D, j *= D, this.core.mmu.store16(T, M * 256 | 0), this.core.mmu.store16(T + Z, W * 256 | 0), this.core.mmu.store16(T + Z * 2, X * 256 | 0), this.core.mmu.store16(T + Z * 3, j * 256 | 0), T += Z * 4;
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
      var ot = this.cpu.mmu.load32(this.cpu.gprs[0] + 4);
      this.cpu.gprs[0] = ot / Math.pow(2, (180 - this.cpu.gprs[1] - this.cpu.gprs[2] / 256) / 12) >>> 0;
      break;
    default:
      throw "Unimplemented software interrupt: 0x" + t.toString(16);
  }
};
I.prototype.masterEnable = function(t) {
  this.enable = t, this.enable && this.enabledIRQs & this.interruptFlags && this.cpu.raiseIRQ();
};
I.prototype.setInterruptsEnabled = function(t) {
  this.enabledIRQs = t, this.enabledIRQs & this.MASK_SIO && this.core.STUB("Serial I/O interrupts not implemented"), this.enabledIRQs & this.MASK_KEYPAD && this.core.STUB("Keypad interrupts not implemented"), this.enable && this.enabledIRQs & this.interruptFlags && this.cpu.raiseIRQ();
};
I.prototype.pollNextEvent = function() {
  var t = this.video.nextEvent, e;
  if (this.audio.enabled && (e = this.audio.nextEvent, (!t || e < t) && (t = e)), this.timersEnabled) {
    var s = this.timers[0];
    e = s.nextEvent, s.enable && e && (!t || e < t) && (t = e), s = this.timers[1], e = s.nextEvent, s.enable && e && (!t || e < t) && (t = e), s = this.timers[2], e = s.nextEvent, s.enable && e && (!t || e < t) && (t = e), s = this.timers[3], e = s.nextEvent, s.enable && e && (!t || e < t) && (t = e);
  }
  var i = this.dma[0];
  e = i.nextIRQ, i.enable && i.doIrq && e && (!t || e < t) && (t = e), i = this.dma[1], e = i.nextIRQ, i.enable && i.doIrq && e && (!t || e < t) && (t = e), i = this.dma[2], e = i.nextIRQ, i.enable && i.doIrq && e && (!t || e < t) && (t = e), i = this.dma[3], e = i.nextIRQ, i.enable && i.doIrq && e && (!t || e < t) && (t = e), this.core.ASSERT(t >= this.cpu.cycles, "Next event is before present"), this.nextEvent = t;
};
I.prototype.waitForIRQ = function() {
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
I.prototype.testIRQ = function() {
  return this.enable && this.enabledIRQs & this.interruptFlags ? (this.springIRQ = !0, this.nextEvent = this.cpu.cycles, !0) : !1;
};
I.prototype.raiseIRQ = function(t) {
  this.interruptFlags |= 1 << t, this.io.registers[this.io.IF >> 1] = this.interruptFlags, this.enable && this.enabledIRQs & 1 << t && this.cpu.raiseIRQ();
};
I.prototype.dismissIRQs = function(t) {
  this.interruptFlags &= ~t, this.io.registers[this.io.IF >> 1] = this.interruptFlags;
};
I.prototype.dmaSetSourceAddress = function(t, e) {
  this.dma[t].source = e & 4294967294;
};
I.prototype.dmaSetDestAddress = function(t, e) {
  this.dma[t].dest = e & 4294967294;
};
I.prototype.dmaSetWordCount = function(t, e) {
  this.dma[t].count = e || (t == 3 ? 65536 : 16384);
};
I.prototype.dmaWriteControl = function(t, e) {
  var s = this.dma[t], i = s.enable;
  s.dstControl = (e & 96) >> 5, s.srcControl = (e & 384) >> 7, s.repeat = !!(e & 512), s.width = e & 1024 ? 4 : 2, s.drq = !!(e & 2048), s.timing = (e & 12288) >> 12, s.doIrq = !!(e & 16384), s.enable = !!(e & 32768), s.nextIRQ = 0, s.drq && this.core.WARN("DRQ not implemented"), !i && s.enable && (s.nextSource = s.source, s.nextDest = s.dest, s.nextCount = s.count, this.cpu.mmu.scheduleDma(t, s));
};
I.prototype.timerSetReload = function(t, e) {
  this.timers[t].reload = e & 65535;
};
I.prototype.timerWriteControl = function(t, e) {
  var s = this.timers[t], i = s.prescaleBits;
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
  var r = s.enable;
  s.enable = !!((e & 128) >> 7 << t), !r && s.enable ? (s.countUp ? s.nextEvent = 0 : (s.lastEvent = this.cpu.cycles, s.nextEvent = this.cpu.cycles + s.overflowInterval), this.io.registers[this.io.TM0CNT_LO + (t << 2) >> 1] = s.reload, s.oldReload = s.reload, ++this.timersEnabled) : r && !s.enable ? (s.countUp || (this.io.registers[this.io.TM0CNT_LO + (t << 2) >> 1] = s.oldReload + (this.cpu.cycles - s.lastEvent) >> i), --this.timersEnabled) : s.prescaleBits != i && !s.countUp && (s.nextEvent = s.lastEvent + s.overflowInterval), this.pollNextEvent();
};
I.prototype.timerRead = function(t) {
  var e = this.timers[t];
  return e.enable && !e.countUp ? e.oldReload + (this.cpu.cycles - e.lastEvent) >> e.prescaleBits : this.io.registers[this.io.TM0CNT_LO + (t << 2) >> 1];
};
I.prototype.halt = function() {
  if (!this.enable)
    throw "Requested HALT when interrupts were disabled!";
  if (!this.waitForIRQ())
    throw "Waiting on interrupt forever.";
};
I.prototype.lz77 = function(t, e, s) {
  for (var i = (this.cpu.mmu.load32(t) & 4294967040) >> 8, r, a = t + 4, h = e, n = 0, o, u, c, p = 0, f; i > 0; )
    if (n) {
      if (r & 128)
        for (o = this.cpu.mmu.loadU8(a) | this.cpu.mmu.loadU8(a + 1) << 8, a += 2, u = h - ((o & 15) << 8 | (o & 65280) >> 8) - 1, c = ((o & 240) >> 4) + 3; c-- && i; )
          f = this.cpu.mmu.loadU8(u++), s == 2 ? (p >>= 8, p |= f << 8, h & 1 && this.cpu.mmu.store16(h - 1, p)) : this.cpu.mmu.store8(h, f), --i, ++h;
      else
        f = this.cpu.mmu.loadU8(a++), s == 2 ? (p >>= 8, p |= f << 8, h & 1 && this.cpu.mmu.store16(h - 1, p)) : this.cpu.mmu.store8(h, f), --i, ++h;
      r <<= 1, --n;
    } else
      r = this.cpu.mmu.loadU8(a++), n = 8;
};
I.prototype.huffman = function(t, e) {
  t = t & 4294967292;
  var s = this.cpu.mmu.load32(t), i = s >> 8, r = s & 15;
  if (32 % r)
    throw "Unimplemented unaligned Huffman";
  var a = 4 - i & 3;
  i &= 4294967292;
  var h = [], n = (this.cpu.mmu.loadU8(t + 4) << 1) + 1, o, u = t + 5 + n, c = e & 4294967292, p;
  for (p = 0; p < n; ++p)
    h.push(this.cpu.mmu.loadU8(t + 5 + p));
  var f, l = 0, x, m, v = 0;
  for (f = h[0]; i > 0; ) {
    var E = this.cpu.mmu.load32(u);
    for (u += 4, x = 32; x > 0; --x, E <<= 1) {
      if (typeof f == "number") {
        var _ = (l - 1 | 1) + ((f & 63) << 1) + 2;
        f = {
          l: _,
          r: _ + 1,
          lTerm: f & 128,
          rTerm: f & 64
        }, h[l] = f;
      }
      if (E & 2147483648)
        if (f.rTerm)
          m = h[f.r];
        else {
          l = f.r, f = h[f.r];
          continue;
        }
      else if (f.lTerm)
        m = h[f.l];
      else {
        l = f.l, f = h[l];
        continue;
      }
      o |= (m & (1 << r) - 1) << v, v += r, l = 0, f = h[0], v == 32 && (v = 0, this.cpu.mmu.store32(c, o), c += 4, i -= 4, o = 0);
    }
  }
  a && this.cpu.mmu.store32(c, o);
};
I.prototype.rl = function(t, e, s) {
  t = t & 4294967292;
  for (var i = (this.cpu.mmu.load32(t) & 4294967040) >> 8, r = 4 - i & 3, a, h, n = t + 4, o = e, u = 0; i > 0; )
    if (a = this.cpu.mmu.loadU8(n++), a & 128)
      for (a &= 127, a += 3, h = this.cpu.mmu.loadU8(n++); a-- && i; )
        --i, s == 2 ? (u >>= 8, u |= h << 8, o & 1 && this.cpu.mmu.store16(o - 1, u)) : this.cpu.mmu.store8(o, h), ++o;
    else
      for (a++; a-- && i; )
        --i, h = this.cpu.mmu.loadU8(n++), s == 2 ? (u >>= 8, u |= h << 8, o & 1 && this.cpu.mmu.store16(o - 1, u)) : this.cpu.mmu.store8(o, h), ++o;
  for (; r--; )
    this.cpu.mmu.store8(o++, 0);
};
function k() {
  this.DISPCNT = 0, this.GREENSWP = 2, this.DISPSTAT = 4, this.VCOUNT = 6, this.BG0CNT = 8, this.BG1CNT = 10, this.BG2CNT = 12, this.BG3CNT = 14, this.BG0HOFS = 16, this.BG0VOFS = 18, this.BG1HOFS = 20, this.BG1VOFS = 22, this.BG2HOFS = 24, this.BG2VOFS = 26, this.BG3HOFS = 28, this.BG3VOFS = 30, this.BG2PA = 32, this.BG2PB = 34, this.BG2PC = 36, this.BG2PD = 38, this.BG2X_LO = 40, this.BG2X_HI = 42, this.BG2Y_LO = 44, this.BG2Y_HI = 46, this.BG3PA = 48, this.BG3PB = 50, this.BG3PC = 52, this.BG3PD = 54, this.BG3X_LO = 56, this.BG3X_HI = 58, this.BG3Y_LO = 60, this.BG3Y_HI = 62, this.WIN0H = 64, this.WIN1H = 66, this.WIN0V = 68, this.WIN1V = 70, this.WININ = 72, this.WINOUT = 74, this.MOSAIC = 76, this.BLDCNT = 80, this.BLDALPHA = 82, this.BLDY = 84, this.SOUND1CNT_LO = 96, this.SOUND1CNT_HI = 98, this.SOUND1CNT_X = 100, this.SOUND2CNT_LO = 104, this.SOUND2CNT_HI = 108, this.SOUND3CNT_LO = 112, this.SOUND3CNT_HI = 114, this.SOUND3CNT_X = 116, this.SOUND4CNT_LO = 120, this.SOUND4CNT_HI = 124, this.SOUNDCNT_LO = 128, this.SOUNDCNT_HI = 130, this.SOUNDCNT_X = 132, this.SOUNDBIAS = 136, this.WAVE_RAM0_LO = 144, this.WAVE_RAM0_HI = 146, this.WAVE_RAM1_LO = 148, this.WAVE_RAM1_HI = 150, this.WAVE_RAM2_LO = 152, this.WAVE_RAM2_HI = 154, this.WAVE_RAM3_LO = 156, this.WAVE_RAM3_HI = 158, this.FIFO_A_LO = 160, this.FIFO_A_HI = 162, this.FIFO_B_LO = 164, this.FIFO_B_HI = 166, this.DMA0SAD_LO = 176, this.DMA0SAD_HI = 178, this.DMA0DAD_LO = 180, this.DMA0DAD_HI = 182, this.DMA0CNT_LO = 184, this.DMA0CNT_HI = 186, this.DMA1SAD_LO = 188, this.DMA1SAD_HI = 190, this.DMA1DAD_LO = 192, this.DMA1DAD_HI = 194, this.DMA1CNT_LO = 196, this.DMA1CNT_HI = 198, this.DMA2SAD_LO = 200, this.DMA2SAD_HI = 202, this.DMA2DAD_LO = 204, this.DMA2DAD_HI = 206, this.DMA2CNT_LO = 208, this.DMA2CNT_HI = 210, this.DMA3SAD_LO = 212, this.DMA3SAD_HI = 214, this.DMA3DAD_LO = 216, this.DMA3DAD_HI = 218, this.DMA3CNT_LO = 220, this.DMA3CNT_HI = 222, this.TM0CNT_LO = 256, this.TM0CNT_HI = 258, this.TM1CNT_LO = 260, this.TM1CNT_HI = 262, this.TM2CNT_LO = 264, this.TM2CNT_HI = 266, this.TM3CNT_LO = 268, this.TM3CNT_HI = 270, this.SIODATA32_LO = 288, this.SIOMULTI0 = 288, this.SIODATA32_HI = 290, this.SIOMULTI1 = 290, this.SIOMULTI2 = 292, this.SIOMULTI3 = 294, this.SIOCNT = 296, this.SIOMLT_SEND = 298, this.SIODATA8 = 298, this.RCNT = 308, this.JOYCNT = 320, this.JOY_RECV = 336, this.JOY_TRANS = 340, this.JOYSTAT = 344, this.KEYINPUT = 304, this.KEYCNT = 306, this.IE = 512, this.IF = 514, this.WAITCNT = 516, this.IME = 520, this.POSTFLG = 768, this.HALTCNT = 769, this.DEFAULT_DISPCNT = 128, this.DEFAULT_SOUNDBIAS = 512, this.DEFAULT_BGPA = 1, this.DEFAULT_BGPD = 1, this.DEFAULT_RCNT = 32768;
}
k.prototype.clear = function() {
  this.registers = new Uint16Array(this.cpu.mmu.SIZE_IO), this.registers[this.DISPCNT >> 1] = this.DEFAULT_DISPCNT, this.registers[this.SOUNDBIAS >> 1] = this.DEFAULT_SOUNDBIAS, this.registers[this.BG2PA >> 1] = this.DEFAULT_BGPA, this.registers[this.BG2PD >> 1] = this.DEFAULT_BGPD, this.registers[this.BG3PA >> 1] = this.DEFAULT_BGPA, this.registers[this.BG3PD >> 1] = this.DEFAULT_BGPD, this.registers[this.RCNT >> 1] = this.DEFAULT_RCNT;
};
k.prototype.freeze = function() {
  return {
    registers: this.registers.buffer.slice(0)
  };
};
k.prototype.defrost = function(t) {
  this.registers = new Uint16Array(t.registers);
  for (var e = 0; e <= this.BLDY; e += 2)
    this.store16(e, this.registers[e >> 1]);
  this.cpu.mmu.adjustTimings(this.registers[this.WAITCNT >> 1]);
};
k.prototype.load8 = function(t) {
  throw "Unimplmeneted unaligned I/O access";
};
k.prototype.load16 = function(t) {
  return this.loadU16(t) << 16 >> 16;
};
k.prototype.load32 = function(t) {
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
k.prototype.loadU8 = function(t) {
  var e = t & 1, s = this.loadU16(t & 65534);
  return s >>> (e << 3) & 255;
};
k.prototype.loadU16 = function(t) {
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
k.prototype.store8 = function(t, e) {
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
k.prototype.store16 = function(t, e) {
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
k.prototype.store32 = function(t, e) {
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
k.prototype.invalidatePage = function(t) {
};
k.prototype.STUB_REG = function(t, e) {
  this.core.STUB("Unimplemented " + t + " register write: " + e.toString(16));
};
const pt = `// The AudioWorkletProcessor that plays the emulator's output. It runs on the
// audio rendering thread, so it can't import anything or touch the emulator.
//
// It's loaded one of two ways (see GameBoyAdvanceAudio.prototype.initWorklet):
// from its own URL, as dist/gba-audio-worklet.js, when the page passes
// \`audioWorkletUrl\`; or from a Blob URL of this file's source, which needs a
// CSP that allows blob: scripts.
class GameBoyAdvanceAudioProcessor extends AudioWorkletProcessor {
	constructor(options) {
		super();
		var opts = options.processorOptions;
		this.size = opts.bufferSize;
		this.mask = this.size - 1;
		this.left = new Float32Array(this.size);
		this.right = new Float32Array(this.size);
		this.writePointer = 0;
		this.readPointer = 0;
		this.resampleRatio = opts.resampleRatio;
		this.prebuffer = opts.prebuffer;
		this.maxBuffered = opts.maxBuffered;
		this.buffering = true;
		this.port.onmessage = (e) => this.push(e.data.left, e.data.right);
	}

	available() {
		return (this.writePointer - (this.readPointer | 0)) & this.mask;
	}

	push(left, right) {
		var w = this.writePointer;
		for (var i = 0; i < left.length; ++i) {
			this.left[w] = left[i];
			this.right[w] = right[i];
			w = (w + 1) & this.mask;
		}
		this.writePointer = w;
		// If the emulator has gotten ahead of playback, skip forward so latency doesn't grow
		if (this.available() > this.maxBuffered) {
			this.readPointer = (w - this.prebuffer) & this.mask;
		}
	}

	process(inputs, outputs) {
		var left = outputs[0][0];
		var right = outputs[0][1] || left;
		var i = 0;
		if (this.buffering && this.available() >= this.prebuffer) {
			this.buffering = false;
		}
		if (!this.buffering) {
			var o = this.readPointer;
			for (; i < left.length; ++i, o += this.resampleRatio) {
				if (o >= this.size) {
					o -= this.size;
				}
				if ((o | 0) == this.writePointer) {
					this.buffering = true;
					break;
				}
				left[i] = this.left[o | 0];
				right[i] = this.right[o | 0];
			}
			this.readPointer = o;
		}
		for (; i < left.length; ++i) {
			left[i] = 0;
			right[i] = 0;
		}
		return true;
	}
}
registerProcessor('gba-audio', GameBoyAdvanceAudioProcessor);
`;
function g(t) {
  t = t || {}, this.workletUrl = t.audioWorkletUrl || null;
  var e = globalThis.AudioContext || globalThis.webkitAudioContext;
  this.context = e ? new e() : null, this.output = null, this.port = null, this.connected = !1, this.paused = !1, this.enabled = !1, this.masterEnable = !0, this.masterVolume = 1, this.SOUND_MAX = 1024, this.FIFO_MAX = 512, this.PSG_MAX = 128, this.sampleRate = 32768, this.resampleRatio = 1, this.context && (this.resampleRatio = this.sampleRate / this.context.sampleRate, this.context.audioWorklet && globalThis.AudioWorkletNode ? this.initWorklet() : this.initScriptProcessor());
}
g.prototype.initWorklet = function() {
  var t = this;
  this.batchSize = 256, this.pendingCount = 0, this.pendingLeft = new Float32Array(this.batchSize), this.pendingRight = new Float32Array(this.batchSize);
  var e = null, s = this.workletUrl;
  s || (e = URL.createObjectURL(new Blob([pt], { type: "text/javascript" })), s = e), this.context.audioWorklet.addModule(s).then(function() {
    e && URL.revokeObjectURL(e), t.output = new AudioWorkletNode(t.context, "gba-audio", {
      numberOfInputs: 0,
      outputChannelCount: [2],
      processorOptions: {
        bufferSize: 16384,
        resampleRatio: t.resampleRatio,
        prebuffer: 2048,
        maxBuffered: 8192
      }
    }), t.port = t.output.port, t.updateOutput();
  }, function(i) {
    e && URL.revokeObjectURL(e), console.warn("AudioWorklet unavailable, falling back to ScriptProcessorNode", i), t.initScriptProcessor();
  });
};
g.prototype.initScriptProcessor = function() {
  var t = this;
  this.bufferSize = 4096, this.maxSamples = this.bufferSize << 2, this.buffers = [new Float32Array(this.maxSamples), new Float32Array(this.maxSamples)], this.sampleMask = this.maxSamples - 1, this.output = this.context.createScriptProcessor(this.bufferSize), this.output.onaudioprocess = function(e) {
    t.audioProcess(e);
  }, this.updateOutput();
};
g.prototype.updateOutput = function() {
  if (this.output) {
    var t = this.enabled && !this.paused;
    t && !this.connected ? this.output.connect(this.context.destination) : !t && this.connected && this.output.disconnect(this.context.destination), this.connected = t, t && this.context.state == "suspended" && this.context.resume();
  }
};
g.prototype.clear = function() {
  this.fifoA = [], this.fifoB = [], this.fifoASample = 0, this.fifoBSample = 0, this.enabled = !1, this.updateOutput(), this.enableChannel3 = !1, this.enableChannel4 = !1, this.enableChannelA = !1, this.enableChannelB = !1, this.enableRightChannelA = !1, this.enableLeftChannelA = !1, this.enableRightChannelB = !1, this.enableLeftChannelB = !1, this.playingChannel3 = !1, this.playingChannel4 = !1, this.volumeLeft = 0, this.volumeRight = 0, this.ratioChannelA = 1, this.ratioChannelB = 1, this.enabledLeft = 0, this.enabledRight = 0, this.dmaA = -1, this.dmaB = -1, this.soundTimerA = 0, this.soundTimerB = 0, this.soundRatio = 1, this.soundBias = 512, this.squareChannels = new Array();
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
  }, this.nextEvent = 0, this.nextSample = 0, this.outputPointer = 0, this.samplePointer = 0, this.backup = 0, this.totalSamples = 0, this.sampleInterval = this.cpuFrequency / this.sampleRate, this.writeSquareChannelFC(0, 0), this.writeSquareChannelFC(1, 0), this.writeChannel4FC(0);
};
var it = [
  "enabled",
  "fifoA",
  "fifoB",
  "fifoASample",
  "fifoBSample",
  "enableChannel3",
  "enableChannel4",
  "enableChannelA",
  "enableChannelB",
  "enableRightChannelA",
  "enableLeftChannelA",
  "enableRightChannelB",
  "enableLeftChannelB",
  "playingChannel3",
  "playingChannel4",
  "volumeLeft",
  "volumeRight",
  "ratioChannelA",
  "ratioChannelB",
  "enabledLeft",
  "enabledRight",
  "dmaA",
  "dmaB",
  "soundTimerA",
  "soundTimerB",
  "soundRatio",
  "soundBias",
  "squareChannels",
  "waveData",
  "channel3Dimension",
  "channel3Bank",
  "channel3Volume",
  "channel3Interval",
  "channel3Next",
  "channel3Length",
  "channel3Timed",
  "channel3End",
  "channel3Pointer",
  "channel3Sample",
  "channel3Write",
  "channel4",
  "nextEvent",
  "nextSample",
  "sampleInterval",
  "masterVolumeLeft",
  "masterVolumeRight"
];
g.prototype.freeze = function() {
  for (var t = {}, e = 0; e < it.length; ++e) {
    var s = it[e], i = this[s];
    i instanceof Uint8Array ? t[s] = i.slice() : i && typeof i == "object" ? t[s] = JSON.parse(JSON.stringify(i)) : t[s] = i;
  }
  return t;
};
g.prototype.defrost = function(t) {
  if (!("nextEvent" in t)) {
    this.nextSample = t.nextSample;
    return;
  }
  for (var e = 0; e < it.length; ++e) {
    var s = it[e];
    if (s in t) {
      var i = t[s];
      s === "waveData" ? this.waveData = new Uint8Array(i) : i && typeof i == "object" ? this[s] = JSON.parse(JSON.stringify(i)) : this[s] = i;
    }
  }
  this.updateOutput();
};
g.prototype.pause = function(t) {
  this.paused = t, this.updateOutput();
};
g.prototype.updateTimers = function() {
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
g.prototype.writeEnable = function(t) {
  this.enabled = !!t, this.nextEvent = this.cpu.cycles, this.nextSample = this.nextEvent, this.updateTimers(), this.core.irq.pollNextEvent(), this.updateOutput();
};
g.prototype.writeSoundControlLo = function(t) {
  this.masterVolumeLeft = t & 7, this.masterVolumeRight = t >> 4 & 7, this.enabledLeft = t >> 8 & 15, this.enabledRight = t >> 12 & 15, this.setSquareChannelEnabled(this.squareChannels[0], (this.enabledLeft | this.enabledRight) & 1), this.setSquareChannelEnabled(this.squareChannels[1], (this.enabledLeft | this.enabledRight) & 2), this.enableChannel3 = (this.enabledLeft | this.enabledRight) & 4, this.setChannel4Enabled((this.enabledLeft | this.enabledRight) & 8), this.updateTimers(), this.core.irq.pollNextEvent();
};
g.prototype.writeSoundControlHi = function(t) {
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
g.prototype.resetSquareChannel = function(t) {
  t.step && (t.nextStep = this.cpu.cycles + t.step), t.enabled && !t.playing && (t.raise = this.cpu.cycles, t.lower = t.raise + t.duty * t.interval, t.end = this.cpu.cycles + t.length, this.nextEvent = this.cpu.cycles), t.playing = t.enabled, this.updateTimers(), this.core.irq.pollNextEvent();
};
g.prototype.setSquareChannelEnabled = function(t, e) {
  !(t.enabled && t.playing) && e ? (t.enabled = !!e, this.updateTimers(), this.core.irq.pollNextEvent()) : t.enabled = !!e;
};
g.prototype.writeSquareChannelSweep = function(t, e) {
  var s = this.squareChannels[t];
  s.sweepSteps = e & 7, s.sweepIncrement = e & 8 ? -1 : 1, s.sweepInterval = (e >> 4 & 7) * this.cpuFrequency / 128, s.doSweep = !!s.sweepInterval, s.nextSweep = this.cpu.cycles + s.sweepInterval, this.resetSquareChannel(s);
};
g.prototype.writeSquareChannelDLE = function(t, e) {
  var s = this.squareChannels[t], i = e >> 6 & 3;
  switch (i) {
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
g.prototype.writeSquareChannelFC = function(t, e) {
  var s = this.squareChannels[t], i = e & 2047;
  s.frequency = i, s.interval = this.cpuFrequency * (2048 - i) / 131072, s.timed = !!(e & 16384), e & 32768 && (this.resetSquareChannel(s), s.volume = s.initialVolume);
};
g.prototype.updateSquareChannel = function(t, e) {
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
g.prototype.writeChannel3Lo = function(t) {
  this.channel3Dimension = t & 32, this.channel3Bank = t & 64;
  var e = t & 128;
  !this.channel3Write && e ? (this.channel3Write = e, this.resetChannel3()) : this.channel3Write = e;
};
g.prototype.writeChannel3Hi = function(t) {
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
g.prototype.writeChannel3X = function(t) {
  this.channel3Interval = this.cpuFrequency * (2048 - (t & 2047)) / 2097152, this.channel3Timed = !!(t & 16384), this.channel3Write && this.resetChannel3();
};
g.prototype.resetChannel3 = function() {
  this.channel3Next = this.cpu.cycles, this.nextEvent = this.channel3Next, this.channel3End = this.cpu.cycles + this.channel3Length, this.playingChannel3 = this.channel3Write, this.updateTimers(), this.core.irq.pollNextEvent();
};
g.prototype.writeWaveData = function(t, e, s) {
  this.channel3Bank || (t += 16), s == 2 && (this.waveData[t] = e & 255, e >>= 8, ++t), this.waveData[t] = e & 255;
};
g.prototype.setChannel4Enabled = function(t) {
  !this.enableChannel4 && t ? (this.channel4.next = this.cpu.cycles, this.channel4.end = this.cpu.cycles + this.channel4.length, this.enableChannel4 = !0, this.playingChannel4 = !0, this.nextEvent = this.cpu.cycles, this.updateEnvelope(this.channel4), this.updateTimers(), this.core.irq.pollNextEvent()) : this.enableChannel4 = t;
};
g.prototype.writeChannel4LE = function(t) {
  this.writeChannelLE(this.channel4, t), this.resetChannel4();
};
g.prototype.writeChannel4FC = function(t) {
  this.channel4.timed = !!(t & 16384);
  var e = t & 7;
  e || (e = 0.5);
  var s = t >> 4 & 15, i = this.cpuFrequency * (e * (2 << s)) / 524288;
  i != this.channel4.interval && (this.channel4.interval = i, this.resetChannel4());
  var r = t & 8 ? 7 : 15;
  r != this.channel4.width && (this.channel4.width = r, this.resetChannel4()), t & 32768 && this.resetChannel4();
};
g.prototype.resetChannel4 = function() {
  this.channel4.width == 15 ? this.channel4.lfsr = 16384 : this.channel4.lfsr = 64, this.channel4.volume = this.channel4.initialVolume, this.channel4.step && (this.channel4.nextStep = this.cpu.cycles + this.channel4.step), this.channel4.end = this.cpu.cycles + this.channel4.length, this.channel4.next = this.cpu.cycles, this.nextEvent = this.channel4.next, this.playingChannel4 = this.enableChannel4, this.updateTimers(), this.core.irq.pollNextEvent();
};
g.prototype.writeChannelLE = function(t, e) {
  t.length = this.cpuFrequency * ((64 - (e & 63)) / 256), e & 2048 ? t.increment = 1 / 16 : t.increment = -1 / 16, t.initialVolume = (e >> 12 & 15) / 16, t.step = this.cpuFrequency * ((e >> 8 & 7) / 64);
};
g.prototype.updateEnvelope = function(t, e) {
  t.step && (e >= t.nextStep && (t.volume += t.increment, t.volume > 1 ? t.volume = 1 : t.volume < 0 && (t.volume = 0), t.nextStep += t.step), this.nextEvent > t.nextStep && (this.nextEvent = t.nextStep));
};
g.prototype.appendToFifoA = function(t) {
  var e;
  this.fifoA.length > 28 && (this.fifoA = this.fifoA.slice(-28));
  for (var s = 0; s < 4; ++s)
    e = (t & 255) << 24, t >>= 8, this.fifoA.push(e / 2147483648);
};
g.prototype.appendToFifoB = function(t) {
  var e;
  this.fifoB.length > 28 && (this.fifoB = this.fifoB.slice(-28));
  for (var s = 0; s < 4; ++s)
    e = (t & 255) << 24, t >>= 8, this.fifoB.push(e / 2147483648);
};
g.prototype.sampleFifoA = function() {
  if (this.fifoA.length <= 16) {
    var t = this.core.irq.dma[this.dmaA];
    t.nextCount = 4, this.core.mmu.serviceDma(this.dmaA, t);
  }
  this.fifoASample = this.fifoA.shift();
};
g.prototype.sampleFifoB = function() {
  if (this.fifoB.length <= 16) {
    var t = this.core.irq.dma[this.dmaB];
    t.nextCount = 4, this.core.mmu.serviceDma(this.dmaB, t);
  }
  this.fifoBSample = this.fifoB.shift();
};
g.prototype.scheduleFIFODma = function(t, e) {
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
g.prototype.sample = function() {
  var t = 0, e = 0, s, i;
  i = this.squareChannels[0], i.playing && (s = i.sample * this.soundRatio * this.PSG_MAX, this.enabledLeft & 1 && (t += s), this.enabledRight & 1 && (e += s)), i = this.squareChannels[1], i.playing && (s = i.sample * this.soundRatio * this.PSG_MAX, this.enabledLeft & 2 && (t += s), this.enabledRight & 2 && (e += s)), this.playingChannel3 && (s = this.channel3Sample * this.soundRatio * this.channel3Volume * this.PSG_MAX, this.enabledLeft & 4 && (t += s), this.enabledRight & 4 && (e += s)), this.playingChannel4 && (s = this.channel4.sample * this.soundRatio * this.PSG_MAX, this.enabledLeft & 8 && (t += s), this.enabledRight & 8 && (e += s)), this.enableChannelA && (s = this.fifoASample * this.FIFO_MAX * this.ratioChannelA, this.enableLeftChannelA && (t += s), this.enableRightChannelA && (e += s)), this.enableChannelB && (s = this.fifoBSample * this.FIFO_MAX * this.ratioChannelB, this.enableLeftChannelB && (t += s), this.enableRightChannelB && (e += s));
  var r = this.samplePointer;
  t *= this.masterVolume / this.SOUND_MAX, t = Math.max(Math.min(t, 1), -1), e *= this.masterVolume / this.SOUND_MAX, e = Math.max(Math.min(e, 1), -1), this.port ? (this.pendingLeft[this.pendingCount] = t, this.pendingRight[this.pendingCount] = e, ++this.pendingCount == this.batchSize && this.flushSamples()) : this.buffers && (this.buffers[0][r] = t, this.buffers[1][r] = e, this.samplePointer = r + 1 & this.sampleMask);
};
g.prototype.flushSamples = function() {
  this.pendingCount = 0, this.masterEnable && (this.port.postMessage(
    { left: this.pendingLeft, right: this.pendingRight },
    [this.pendingLeft.buffer, this.pendingRight.buffer]
  ), this.pendingLeft = new Float32Array(this.batchSize), this.pendingRight = new Float32Array(this.batchSize));
};
g.prototype.audioProcess = function(t) {
  var e = t.outputBuffer.getChannelData(0), s = t.outputBuffer.getChannelData(1);
  if (this.masterEnable) {
    var i, r = this.outputPointer;
    for (i = 0; i < this.bufferSize; ++i, r += this.resampleRatio) {
      if (r >= this.maxSamples && (r -= this.maxSamples), (r | 0) == this.samplePointer) {
        ++this.backup;
        break;
      }
      e[i] = this.buffers[0][r | 0], s[i] = this.buffers[1][r | 0];
    }
    for (; i < this.bufferSize; ++i)
      e[i] = 0, s[i] = 0;
    this.outputPointer = r, ++this.totalSamples;
  } else
    for (i = 0; i < this.bufferSize; ++i)
      e[i] = 0, s[i] = 0;
};
function L(t) {
  this.buffer = new Uint16Array(t >> 1);
}
L.prototype.load8 = function(t) {
  return this.loadU8(t) << 24 >> 24;
};
L.prototype.load16 = function(t) {
  return this.loadU16(t) << 16 >> 16;
};
L.prototype.loadU8 = function(t) {
  var e = t >> 1;
  return t & 1 ? (this.buffer[e] & 65280) >>> 8 : this.buffer[e] & 255;
};
L.prototype.loadU16 = function(t) {
  return this.buffer[t >> 1];
};
L.prototype.load32 = function(t) {
  return this.buffer[t >> 1 & -2] | this.buffer[t >> 1 | 1] << 16;
};
L.prototype.store8 = function(t, e) {
  this.store16(t, e << 8 | e);
};
L.prototype.store16 = function(t, e) {
  this.buffer[t >> 1] = e;
};
L.prototype.store32 = function(t, e) {
  var s = t >> 1;
  this.store16(t, this.buffer[s] = e & 65535), this.store16(t + 2, this.buffer[s + 1] = e >>> 16);
};
L.prototype.insert = function(t, e) {
  this.buffer.set(e, t);
};
L.prototype.invalidatePage = function(t) {
};
function nt(t) {
  L.call(this, t), this.vram = this.buffer;
}
nt.prototype = Object.create(L.prototype);
function rt(t) {
  L.call(this, t), this.oam = this.buffer, this.objs = new Array(128);
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
rt.prototype = Object.create(L.prototype);
rt.prototype.overwrite = function(t) {
  for (var e = 0; e < this.buffer.byteLength >> 1; ++e)
    this.store16(e << 1, t[e]);
};
rt.prototype.store16 = function(t, e) {
  var s = (t & 1016) >> 3, i = this.objs[s], r = this.scalerot[s >> 2];
  switch (i.priority, i.disable, i.y, t & 6) {
    case 0:
      i.y = e & 255;
      var a = i.scalerot;
      i.scalerot = e & 256, i.scalerot ? (i.scalerotOam = this.scalerot[i.scalerotParam], i.doublesize = !!(e & 512), i.disable = 0, i.hflip = 0, i.vflip = 0) : (i.doublesize = !1, i.disable = e & 512, a && (i.hflip = i.scalerotParam & 8, i.vflip = i.scalerotParam & 16)), i.mode = (e & 3072) >> 6, i.mosaic = e & 4096, i.multipalette = e & 8192, i.shape = (e & 49152) >> 14, i.recalcSize();
      break;
    case 2:
      i.x = e & 511, i.scalerot ? (i.scalerotParam = (e & 15872) >> 9, i.scalerotOam = this.scalerot[i.scalerotParam], i.hflip = 0, i.vflip = 0, i.drawScanline = i.drawScanlineAffine) : (i.hflip = e & 4096, i.vflip = e & 8192, i.drawScanline = i.drawScanlineNormal), i.size = (e & 49152) >> 14, i.recalcSize();
      break;
    case 4:
      i.tileBase = e & 1023, i.priority = (e & 3072) >> 10, i.palette = (e & 61440) >> 8;
      break;
    case 6:
      switch (s & 3) {
        case 0:
          r.a = (e << 16) / 16777216;
          break;
        case 1:
          r.b = (e << 16) / 16777216;
          break;
        case 2:
          r.c = (e << 16) / 16777216;
          break;
        case 3:
          r.d = (e << 16) / 16777216;
          break;
      }
      break;
  }
  L.prototype.store16.call(this, t, e);
};
function O() {
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
O.prototype.overwrite = function(t) {
  for (var e = 0; e < 512; ++e)
    this.store16(e << 1, t[e]);
};
O.prototype.loadU8 = function(t) {
  return this.loadU16(t) >> 8 * (t & 1) & 255;
};
O.prototype.loadU16 = function(t) {
  return this.colors[(t & 512) >> 9][(t & 511) >> 1];
};
O.prototype.load16 = function(t) {
  return this.loadU16(t) << 16 >> 16;
};
O.prototype.load32 = function(t) {
  return this.loadU16(t) | this.loadU16(t + 2) << 16;
};
O.prototype.store16 = function(t, e) {
  var s = (t & 512) >> 9, i = (t & 511) >> 1;
  this.colors[s][i] = e, this.adjustedColors[s][i] = this.adjustColor(e);
};
O.prototype.store32 = function(t, e) {
  this.store16(t, e & 65535), this.store16(t + 2, e >> 16);
};
O.prototype.invalidatePage = function(t) {
};
O.prototype.convert16To32 = function(t, e) {
  var s = (t & 31) << 3, i = (t & 992) >> 2, r = (t & 31744) >> 7;
  e[0] = s, e[1] = i, e[2] = r;
};
O.prototype.mix = function(t, e, s, i) {
  var r = e & 31, a = (e & 992) >> 5, h = (e & 31744) >> 10, n = i & 31, o = (i & 992) >> 5, u = (i & 31744) >> 10, c = Math.min(t * r + s * n, 31), p = Math.min(t * a + s * o, 31), f = Math.min(t * h + s * u, 31);
  return c | p << 5 | f << 10;
};
O.prototype.makeDarkPalettes = function(t) {
  this.adjustColor != this.adjustColorDark && (this.adjustColor = this.adjustColorDark, this.resetPalettes()), this.resetPaletteLayers(t);
};
O.prototype.makeBrightPalettes = function(t) {
  this.adjustColor != this.adjustColorBright && (this.adjustColor = this.adjustColorBright, this.resetPalettes()), this.resetPaletteLayers(t);
};
O.prototype.makeNormalPalettes = function() {
  this.passthroughColors[0] = this.colors[0], this.passthroughColors[1] = this.colors[0], this.passthroughColors[2] = this.colors[0], this.passthroughColors[3] = this.colors[0], this.passthroughColors[4] = this.colors[1], this.passthroughColors[5] = this.colors[0];
};
O.prototype.makeSpecialPalette = function(t) {
  this.passthroughColors[t] = this.adjustedColors[t == 4 ? 1 : 0];
};
O.prototype.makeNormalPalette = function(t) {
  this.passthroughColors[t] = this.colors[t == 4 ? 1 : 0];
};
O.prototype.resetPaletteLayers = function(t) {
  t & 1 ? this.passthroughColors[0] = this.adjustedColors[0] : this.passthroughColors[0] = this.colors[0], t & 2 ? this.passthroughColors[1] = this.adjustedColors[0] : this.passthroughColors[1] = this.colors[0], t & 4 ? this.passthroughColors[2] = this.adjustedColors[0] : this.passthroughColors[2] = this.colors[0], t & 8 ? this.passthroughColors[3] = this.adjustedColors[0] : this.passthroughColors[3] = this.colors[0], t & 16 ? this.passthroughColors[4] = this.adjustedColors[1] : this.passthroughColors[4] = this.colors[1], t & 32 ? this.passthroughColors[5] = this.adjustedColors[0] : this.passthroughColors[5] = this.colors[0];
};
O.prototype.resetPalettes = function() {
  var t, e = this.adjustedColors[0], s = this.colors[0];
  for (t = 0; t < 256; ++t)
    e[t] = this.adjustColor(s[t]);
  for (e = this.adjustedColors[1], s = this.colors[1], t = 0; t < 256; ++t)
    e[t] = this.adjustColor(s[t]);
};
O.prototype.accessColor = function(t, e) {
  return this.passthroughColors[t][e];
};
O.prototype.adjustColorDark = function(t) {
  var e = t & 31, s = (t & 992) >> 5, i = (t & 31744) >> 10;
  return e = e - e * this.blendY, s = s - s * this.blendY, i = i - i * this.blendY, e | s << 5 | i << 10;
};
O.prototype.adjustColorBright = function(t) {
  var e = t & 31, s = (t & 992) >> 5, i = (t & 31744) >> 10;
  return e = e + (31 - e) * this.blendY, s = s + (31 - s) * this.blendY, i = i + (31 - i) * this.blendY, e | s << 5 | i << 10;
};
O.prototype.adjustColor = O.prototype.adjustColorBright;
O.prototype.setBlendY = function(t) {
  this.blendY != t && (this.blendY = t, this.resetPalettes());
};
function at(t, e) {
  this.TILE_OFFSET = 65536, this.oam = t, this.index = e, this.x = 0, this.y = 0, this.scalerot = 0, this.doublesize = !1, this.disable = 1, this.mode = 0, this.mosaic = !1, this.multipalette = !1, this.shape = 0, this.scalerotParam = 0, this.hflip = 0, this.vflip = 0, this.tileBase = 0, this.priority = 0, this.palette = 0, this.drawScanline = this.drawScanlineNormal, this.pushPixel = A.pushPixel, this.cachedWidth = 8, this.cachedHeight = 8;
}
at.prototype.drawScanlineNormal = function(t, e, s, i, r) {
  var a = this.oam.video, h, n, o, u = this.mode | a.target2[a.LAYER_OBJ] | this.priority << 1;
  this.mode == 16 && (u |= a.TARGET1_MASK), a.blendMode == 1 && a.alphaEnabled && (u |= a.target1[a.LAYER_OBJ]);
  var c = this.cachedWidth;
  this.x < a.HORIZONTAL_PIXELS ? (this.x < i ? (n = i - this.x, o = i) : (n = 0, o = this.x), r < this.cachedWidth + this.x && (c = r - this.x)) : (n = i + 512 - this.x, o = i, r < this.cachedWidth - n && (c = r));
  var p, f;
  this.vflip ? f = this.cachedHeight - e + s - 1 : f = e - s;
  var l = f & 7, x, m, v = this.multipalette ? 1 : 0;
  a.objCharacterMapping ? m = (f & 504) * this.cachedWidth >> 6 : m = (f & 504) << 2 - v, this.mosaic && (x = a.objMosaicX - 1 - (a.objMosaicX + o - 1) % a.objMosaicX, o += x, n += x), this.hflip ? p = this.cachedWidth - n - 1 : p = n;
  var E = a.accessTile(this.TILE_OFFSET + (h & 4) * v, this.tileBase + (m << v) + ((p & 504) >> 3 - v), l << v);
  for (h = n; h < c; ++h)
    x = this.mosaic ? o % a.objMosaicX : 0, this.hflip ? p = this.cachedWidth - (h - x) - 1 : p = h - x, v ? (!(h & 3) || this.mosaic && !x) && (E = a.accessTile(this.TILE_OFFSET + (p & 4), this.tileBase + (m << 1) + ((p & 504) >> 2), l << 1)) : (!(h & 7) || this.mosaic && !x) && (E = a.accessTile(this.TILE_OFFSET, this.tileBase + m + (p >> 3), l)), this.pushPixel(a.LAYER_OBJ, this, a, E, p & 7, o, t, u, !1), o++;
};
at.prototype.drawScanlineAffine = function(t, e, s, i, r) {
  var a = this.oam.video, h, n, o, u = this.mode | a.target2[a.LAYER_OBJ] | this.priority << 1;
  this.mode == 16 && (u |= a.TARGET1_MASK), a.blendMode == 1 && a.alphaEnabled && (u |= a.target1[a.LAYER_OBJ]);
  var c, p, f = e - s, l, x, m = this.multipalette ? 1 : 0, v = this.cachedWidth << this.doublesize, E = this.cachedHeight << this.doublesize, _ = v;
  for (_ > a.HORIZONTAL_PIXELS && (v = a.HORIZONTAL_PIXELS), this.x < a.HORIZONTAL_PIXELS ? (this.x < i ? (n = i - this.x, o = i) : (n = 0, o = this.x), r < _ + this.x && (_ = r - this.x)) : (n = i + 512 - this.x, o = i, r < _ - n && (_ = r)), h = n; h < _; ++h) {
    if (c = this.scalerotOam.a * (h - (v >> 1)) + this.scalerotOam.b * (f - (E >> 1)) + (this.cachedWidth >> 1), p = this.scalerotOam.c * (h - (v >> 1)) + this.scalerotOam.d * (f - (E >> 1)) + (this.cachedHeight >> 1), this.mosaic && (c -= h % a.objMosaicX * this.scalerotOam.a + e % a.objMosaicY * this.scalerotOam.b, p -= h % a.objMosaicX * this.scalerotOam.c + e % a.objMosaicY * this.scalerotOam.d), c < 0 || c >= this.cachedWidth || p < 0 || p >= this.cachedHeight) {
      o++;
      continue;
    }
    a.objCharacterMapping ? l = (p & 504) * this.cachedWidth >> 6 : l = (p & 504) << 2 - m, x = a.accessTile(this.TILE_OFFSET + (c & 4) * m, this.tileBase + (l << m) + ((c & 504) >> 3 - m), (p & 7) << m), this.pushPixel(a.LAYER_OBJ, this, a, x, c & 7, o, t, u, !1), o++;
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
function z(t, e) {
  this.video = t, this.bg = !1, this.index = t.LAYER_OBJ, this.priority = e, this.enabled = !1, this.objwin = 0;
}
z.prototype.drawScanline = function(t, e, s, i) {
  var r = this.video.vcount, a, h, n;
  if (!(s >= i)) {
    for (var o = this.video.oam.objs, u = 0; u < o.length; ++u)
      if (n = o[u], !n.disable && (n.mode & this.video.OBJWIN_MASK) == this.objwin && !(!(n.mode & this.video.OBJWIN_MASK) && this.priority != n.priority)) {
        n.y < this.video.VERTICAL_PIXELS ? a = n.y : a = n.y - 256;
        var c;
        n.scalerot ? c = n.cachedHeight << n.doublesize : c = n.cachedHeight, n.mosaic ? h = r - r % this.video.objMosaicY : h = r, a <= r && a + c > r && n.drawScanline(t, h, a, s, i);
      }
  }
};
z.prototype.objComparator = function(t, e) {
  return t.index - e.index;
};
function A() {
  this.LAYER_BG0 = 0, this.LAYER_BG1 = 1, this.LAYER_BG2 = 2, this.LAYER_BG3 = 3, this.LAYER_OBJ = 4, this.LAYER_BACKDROP = 5, this.HORIZONTAL_PIXELS = 240, this.VERTICAL_PIXELS = 160, this.LAYER_MASK = 6, this.BACKGROUND_MASK = 1, this.TARGET2_MASK = 8, this.TARGET1_MASK = 16, this.OBJWIN_MASK = 32, this.WRITTEN_MASK = 128, this.PRIORITY_MASK = this.LAYER_MASK | this.BACKGROUND_MASK, this.drawBackdrop = new function(t) {
    this.bg = !0, this.priority = -1, this.index = t.LAYER_BACKDROP, this.enabled = !0, this.drawScanline = function(e, s, i, r) {
      for (var a = i; a < r; ++a)
        e.stencil[a] & t.WRITTEN_MASK ? e.stencil[a] & t.TARGET1_MASK && (e.color[a] = t.palette.mix(t.blendB, t.palette.accessColor(this.index, 0), t.blendA, e.color[a]), e.stencil[a] = t.WRITTEN_MASK) : (e.color[a] = t.palette.accessColor(this.index, 0), e.stencil[a] = t.WRITTEN_MASK);
    };
  }(this);
}
A.prototype.clear = function(t) {
  this.palette = new O(), this.vram = new nt(t.SIZE_VRAM), this.oam = new rt(t.SIZE_OAM), this.oam.video = this, this.objLayers = [
    new z(this, 0),
    new z(this, 1),
    new z(this, 2),
    new z(this, 3)
  ], this.objwinLayer = new z(this, 4), this.objwinLayer.objwin = this.OBJWIN_MASK, this.backgroundMode = 0, this.displayFrameSelect = 0, this.hblankIntervalFree = 0, this.objCharacterMapping = 0, this.forcedBlank = 1, this.win0 = 0, this.win1 = 0, this.objwin = 0, this.vcount = -1, this.win0Left = 0, this.win0Right = 240, this.win1Left = 0, this.win1Right = 240, this.win0Top = 0, this.win0Bottom = 160, this.win1Top = 0, this.win1Bottom = 160, this.windows = new Array();
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
      pushPixel: A.pushPixel,
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
  ], this.objwinActive = !1, this.alphaEnabled = !1, this.scanline = {
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
A.prototype.clearSubsets = function(t, e) {
  e & 4 && this.palette.overwrite(new Uint16Array(t.SIZE_PALETTE >> 1)), e & 8 && this.vram.insert(0, new Uint16Array(t.SIZE_VRAM >> 1)), e & 16 && (this.oam.overwrite(new Uint16Array(t.SIZE_OAM >> 1)), this.oam.video = this);
};
A.prototype.freeze = function() {
  for (var t = new Array(512), e = 0; e < 256; ++e)
    t[e] = this.palette.colors[0][e], t[e + 256] = this.palette.colors[1][e];
  for (var s = new Array(this.vram.buffer.length), e = 0; e < this.vram.buffer.length; ++e)
    s[e] = this.vram.buffer[e];
  for (var i = new Array(this.oam.buffer.length), e = 0; e < this.oam.buffer.length; ++e)
    i[e] = this.oam.buffer[e];
  return {
    palette: t,
    vram: s,
    oam: i
  };
};
A.prototype.defrost = function(t) {
  t && t.palette && this.palette.overwrite(new Uint16Array(t.palette)), t && t.vram && this.vram.insert(0, new Uint16Array(t.vram)), t && t.oam && this.oam.overwrite(new Uint16Array(t.oam));
};
A.prototype.setBacking = function(t) {
  this.pixelData = t;
  for (var e = 0; e < this.HORIZONTAL_PIXELS * this.VERTICAL_PIXELS * 4; )
    this.pixelData.data[e++] = 255, this.pixelData.data[e++] = 255, this.pixelData.data[e++] = 255, this.pixelData.data[e++] = 255;
};
A.prototype.writeDisplayControl = function(t) {
  this.backgroundMode = t & 7, this.displayFrameSelect = t & 16, this.hblankIntervalFree = t & 32, this.objCharacterMapping = t & 64, this.forcedBlank = t & 128, this.bg[0].enabled = t & 256, this.bg[1].enabled = t & 512, this.bg[2].enabled = t & 1024, this.bg[3].enabled = t & 2048, this.objLayers[0].enabled = t & 4096, this.objLayers[1].enabled = t & 4096, this.objLayers[2].enabled = t & 4096, this.objLayers[3].enabled = t & 4096, this.win0 = t & 8192, this.win1 = t & 16384, this.objwin = t & 32768, this.objwinLayer.enabled = t & 4096 && t & 32768, this.bg[2].multipalette &= -2, this.bg[3].multipalette &= -2, this.backgroundMode > 0 && (this.bg[2].multipalette |= 1), this.backgroundMode == 2 && (this.bg[3].multipalette |= 1), this.resetLayers();
};
A.prototype.writeBackgroundControl = function(t, e) {
  var s = this.bg[t];
  s.priority = e & 3, s.charBase = (e & 12) << 12, s.mosaic = e & 64, s.multipalette &= -129, (t < 2 || this.backgroundMode == 0) && (s.multipalette |= e & 128), s.screenBase = (e & 7936) << 3, s.overflow = e & 8192, s.size = (e & 49152) >> 14, this.drawLayers.sort(this.layerComparator);
};
A.prototype.writeBackgroundHOffset = function(t, e) {
  this.bg[t].x = e & 511;
};
A.prototype.writeBackgroundVOffset = function(t, e) {
  this.bg[t].y = e & 511;
};
A.prototype.writeBackgroundRefX = function(t, e) {
  this.bg[t].refx = (e << 4) / 4096, this.bg[t].sx = this.bg[t].refx;
};
A.prototype.writeBackgroundRefY = function(t, e) {
  this.bg[t].refy = (e << 4) / 4096, this.bg[t].sy = this.bg[t].refy;
};
A.prototype.writeBackgroundParamA = function(t, e) {
  this.bg[t].dx = (e << 16) / 16777216;
};
A.prototype.writeBackgroundParamB = function(t, e) {
  this.bg[t].dmx = (e << 16) / 16777216;
};
A.prototype.writeBackgroundParamC = function(t, e) {
  this.bg[t].dy = (e << 16) / 16777216;
};
A.prototype.writeBackgroundParamD = function(t, e) {
  this.bg[t].dmy = (e << 16) / 16777216;
};
A.prototype.writeWin0H = function(t) {
  this.win0Left = (t & 65280) >> 8, this.win0Right = Math.min(this.HORIZONTAL_PIXELS, t & 255), this.win0Left > this.win0Right && (this.win0Right = this.HORIZONTAL_PIXELS);
};
A.prototype.writeWin1H = function(t) {
  this.win1Left = (t & 65280) >> 8, this.win1Right = Math.min(this.HORIZONTAL_PIXELS, t & 255), this.win1Left > this.win1Right && (this.win1Right = this.HORIZONTAL_PIXELS);
};
A.prototype.writeWin0V = function(t) {
  this.win0Top = (t & 65280) >> 8, this.win0Bottom = Math.min(this.VERTICAL_PIXELS, t & 255), this.win0Top > this.win0Bottom && (this.win0Bottom = this.VERTICAL_PIXELS);
};
A.prototype.writeWin1V = function(t) {
  this.win1Top = (t & 65280) >> 8, this.win1Bottom = Math.min(this.VERTICAL_PIXELS, t & 255), this.win1Top > this.win1Bottom && (this.win1Bottom = this.VERTICAL_PIXELS);
};
A.prototype.writeWindow = function(t, e) {
  var s = this.windows[t];
  s.enabled[0] = e & 1, s.enabled[1] = e & 2, s.enabled[2] = e & 4, s.enabled[3] = e & 8, s.enabled[4] = e & 16, s.special = e & 32;
};
A.prototype.writeWinIn = function(t) {
  this.writeWindow(0, t), this.writeWindow(1, t >> 8);
};
A.prototype.writeWinOut = function(t) {
  this.writeWindow(2, t), this.writeWindow(3, t >> 8);
};
A.prototype.writeBlendControl = function(t) {
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
A.prototype.setBlendEnabled = function(t, e, s) {
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
A.prototype.writeBlendAlpha = function(t) {
  this.blendA = (t & 31) / 16, this.blendA > 1 && (this.blendA = 1), this.blendB = ((t & 7936) >> 8) / 16, this.blendB > 1 && (this.blendB = 1);
};
A.prototype.writeBlendY = function(t) {
  this.blendY = t, this.palette.setBlendY(t >= 16 ? 1 : t / 16);
};
A.prototype.writeMosaic = function(t) {
  this.bgMosaicX = (t & 15) + 1, this.bgMosaicY = (t >> 4 & 15) + 1, this.objMosaicX = (t >> 8 & 15) + 1, this.objMosaicY = (t >> 12 & 15) + 1;
};
A.prototype.resetLayers = function() {
  this.backgroundMode > 1 && (this.bg[0].enabled = !1, this.bg[1].enabled = !1), this.bg[2].enabled && (this.bg[2].drawScanline = this.bgModes[this.backgroundMode]), this.backgroundMode == 0 || this.backgroundMode == 2 ? this.bg[3].enabled && (this.bg[3].drawScanline = this.bgModes[this.backgroundMode]) : this.bg[3].enabled = !1, this.drawLayers.sort(this.layerComparator);
};
A.prototype.layerComparator = function(t, e) {
  var s = e.priority - t.priority;
  return s || (t.bg && !e.bg ? -1 : !t.bg && e.bg ? 1 : e.index - t.index);
};
A.prototype.accessMapMode0 = function(t, e, s, i, r) {
  var a = t + (s >> 2 & 62) + i;
  e & 1 && (a += (s & 256) << 3);
  var h = this.vram.loadU16(a);
  r.tile = h & 1023, r.hflip = h & 1024, r.vflip = h & 2048, r.palette = (h & 61440) >> 8;
};
A.prototype.accessMapMode1 = function(t, e, s, i, r) {
  var a = t + (s >> 3) + i;
  r.tile = this.vram.loadU8(a);
};
A.prototype.accessTile = function(t, e, s) {
  var i = t + (e << 5);
  return i |= s << 2, this.vram.load32(i);
};
A.pushPixel = function(t, e, s, i, r, a, h, n, o) {
  var u;
  if (!o)
    if (this.multipalette ? u = i >> (r << 3) & 255 : u = i >> (r << 2) & 15, u)
      this.multipalette || (u |= e.palette);
    else return;
  var c = s.WRITTEN_MASK, p = h.stencil[a], f = s.blendMode;
  if (s.objwinActive)
    if (p & s.OBJWIN_MASK)
      if (s.windows[3].enabled[t])
        s.setBlendEnabled(t, s.windows[3].special && s.target1[t], f), s.windows[3].special && s.alphaEnabled && (n |= s.target1[t]), c |= s.OBJWIN_MASK;
      else
        return;
    else if (s.windows[2].enabled[t])
      s.setBlendEnabled(t, s.windows[2].special && s.target1[t], f), s.windows[2].special && s.alphaEnabled && (n |= s.target1[t]);
    else
      return;
  n & s.TARGET1_MASK && p & s.TARGET2_MASK && s.setBlendEnabled(t, !0, 1);
  var l = o ? i : s.palette.accessColor(t, u);
  n & s.TARGET1_MASK && s.setBlendEnabled(t, !!f, f);
  var x = (n & s.PRIORITY_MASK) < (p & s.PRIORITY_MASK);
  if ((n & s.PRIORITY_MASK) == (p & s.PRIORITY_MASK) && (x = n & s.BACKGROUND_MASK), !(p & s.WRITTEN_MASK))
    c |= n;
  else if (x)
    n & s.TARGET1_MASK && p & s.TARGET2_MASK && (l = s.palette.mix(s.blendA, l, s.blendB, h.color[a])), c |= n & ~s.TARGET1_MASK;
  else if ((n & s.PRIORITY_MASK) > (p & s.PRIORITY_MASK))
    if (c = p & ~(s.TARGET1_MASK | s.TARGET2_MASK), n & s.TARGET2_MASK && p & s.TARGET1_MASK)
      l = s.palette.mix(s.blendB, l, s.blendA, h.color[a]);
    else
      return;
  else
    return;
  if (n & s.OBJWIN_MASK) {
    h.stencil[a] |= s.OBJWIN_MASK;
    return;
  }
  h.color[a] = l, h.stencil[a] = c;
};
A.prototype.identity = function(t) {
  return t;
};
A.prototype.drawScanlineBlank = function(t) {
  for (var e = 0; e < this.HORIZONTAL_PIXELS; ++e)
    t.color[e] = 65535, t.stencil[e] = 0;
};
A.prototype.prepareScanline = function(t) {
  for (var e = 0; e < this.HORIZONTAL_PIXELS; ++e)
    t.stencil[e] = this.target2[this.LAYER_BACKDROP];
};
A.prototype.drawScanlineBGMode0 = function(t, e, s, i) {
  var r = this.video, a, h = r.vcount, n = s, o = e.x, u = e.y, c, p, f = h + u;
  this.mosaic && (f -= h % r.bgMosaicY);
  var l = f & 7, x, m = e.screenBase, v = e.charBase, E = e.size, _ = e.index, y = r.sharedMap, q = e.multipalette ? 1 : 0, G = r.target2[_] | e.priority << 1 | r.BACKGROUND_MASK;
  r.blendMode == 1 && r.alphaEnabled && (G |= r.target1[_]);
  var C = f << 3 & 1984;
  E == 2 ? C += f << 3 & 2048 : E == 3 && (C += f << 4 & 4096);
  var N;
  E & 1 ? N = 511 : N = 255, r.accessMapMode0(m, E, s + o & N, C, y);
  var D = r.accessTile(v, y.tile << q, (y.vflip ? 7 - l : l) << q);
  for (a = s; a < i; ++a) {
    if (c = a + o & N, x = this.mosaic ? n % r.bgMosaicX : 0, c -= x, p = c & 7, q) {
      if ((!p || this.mosaic && !x) && r.accessMapMode0(m, E, c, C, y), (!(p & 3) || this.mosaic && !x) && (D = r.accessTile(v + (!!(c & 4) == !y.hflip ? 4 : 0), y.tile << 1, (y.vflip ? 7 - l : l) << 1), !D && !(p & 3))) {
        a += 3, n += 4;
        continue;
      }
    } else if ((!p || this.mosaic && !x) && (r.accessMapMode0(m, E, c, C, y), D = r.accessTile(v, y.tile, y.vflip ? 7 - l : l), !D && !p)) {
      a += 7, n += 8;
      continue;
    }
    y.hflip && (p = 7 - p), e.pushPixel(_, y, r, D, p, n, t, G, !1), n++;
  }
};
A.prototype.drawScanlineBGMode2 = function(t, e, s, i) {
  var r = this.video, a, h = r.vcount, n = s, o, u, c = e.screenBase, p = e.charBase, f = e.size, l = 128 << f, x = e.index, m = r.sharedMap, v, E = r.target2[x] | e.priority << 1 | r.BACKGROUND_MASK;
  r.blendMode == 1 && r.alphaEnabled && (E |= r.target1[x]);
  var _;
  for (a = s; a < i; ++a) {
    if (o = e.dx * a + e.sx, u = e.dy * a + e.sy, this.mosaic && (o -= a % r.bgMosaicX * e.dx + h % r.bgMosaicY * e.dmx, u -= a % r.bgMosaicX * e.dy + h % r.bgMosaicY * e.dmy), e.overflow)
      o &= l - 1, o < 0 && (o += l), u &= l - 1, u < 0 && (u += l);
    else if (o < 0 || u < 0 || o >= l || u >= l) {
      n++;
      continue;
    }
    _ = (u << 1 & 2032) << f, r.accessMapMode1(c, f, o, _, m), v = this.vram.loadU8(p + (m.tile << 6) + ((u & 7) << 3) + (o & 7)), e.pushPixel(x, m, r, v, 0, n, t, E, !1), n++;
  }
};
A.prototype.drawScanlineBGMode3 = function(t, e, s, i) {
  var r = this.video, a, h = r.vcount, n = s, o, u, c = e.index, p = r.sharedMap, f, l = r.target2[c] | e.priority << 1 | r.BACKGROUND_MASK;
  for (r.blendMode == 1 && r.alphaEnabled && (l |= r.target1[c]), a = s; a < i; ++a) {
    if (o = e.dx * a + e.sx, u = e.dy * a + e.sy, this.mosaic && (o -= a % r.bgMosaicX * e.dx + h % r.bgMosaicY * e.dmx, u -= a % r.bgMosaicX * e.dy + h % r.bgMosaicY * e.dmy), o < 0 || u < 0 || o >= r.HORIZONTAL_PIXELS || u >= r.VERTICAL_PIXELS) {
      n++;
      continue;
    }
    f = this.vram.loadU16(u * r.HORIZONTAL_PIXELS + o << 1), e.pushPixel(c, p, r, f, 0, n, t, l, !0), n++;
  }
};
A.prototype.drawScanlineBGMode4 = function(t, e, s, i) {
  var r = this.video, a, h = r.vcount, n = s, o, u, c = 0;
  r.displayFrameSelect && (c += 40960), e.size;
  var p = e.index, f = r.sharedMap, l, x = r.target2[p] | e.priority << 1 | r.BACKGROUND_MASK;
  for (r.blendMode == 1 && r.alphaEnabled && (x |= r.target1[p]), a = s; a < i; ++a) {
    if (o = e.dx * a + e.sx, u = 0 | e.dy * a + e.sy, this.mosaic && (o -= a % r.bgMosaicX * e.dx + h % r.bgMosaicY * e.dmx, u -= a % r.bgMosaicX * e.dy + h % r.bgMosaicY * e.dmy), o < 0 || u < 0 || o >= r.HORIZONTAL_PIXELS || u >= r.VERTICAL_PIXELS) {
      n++;
      continue;
    }
    l = this.vram.loadU8(c + u * r.HORIZONTAL_PIXELS + o), e.pushPixel(p, f, r, l, 0, n, t, x, !1), n++;
  }
};
A.prototype.drawScanlineBGMode5 = function(t, e, s, i) {
  var r = this.video, a, h = r.vcount, n = s, o, u, c = 0;
  r.displayFrameSelect && (c += 40960);
  var p = e.index, f = r.sharedMap, l, x = r.target2[p] | e.priority << 1 | r.BACKGROUND_MASK;
  for (r.blendMode == 1 && r.alphaEnabled && (x |= r.target1[p]), a = s; a < i; ++a) {
    if (o = e.dx * a + e.sx, u = e.dy * a + e.sy, this.mosaic && (o -= a % r.bgMosaicX * e.dx + h % r.bgMosaicY * e.dmx, u -= a % r.bgMosaicX * e.dy + h % r.bgMosaicY * e.dmy), o < 0 || u < 0 || o >= 160 || u >= 128) {
      n++;
      continue;
    }
    l = this.vram.loadU16(c + (u * 160 + o) << 1), e.pushPixel(p, f, r, l, 0, n, t, x, !0), n++;
  }
};
A.prototype.drawScanline = function(t) {
  var e = this.scanline;
  if (this.forcedBlank) {
    this.drawScanlineBlank(e);
    return;
  }
  this.prepareScanline(e);
  var s, i, r, a, h;
  this.vcount = t;
  for (var n = 0; n < this.drawLayers.length; ++n)
    s = this.drawLayers[n], s.enabled && (this.objwinActive = !1, this.win0 || this.win1 || this.objwin ? (i = 0, r = this.HORIZONTAL_PIXELS, a = 0, h = this.HORIZONTAL_PIXELS, this.win0 && t >= this.win0Top && t < this.win0Bottom && (this.windows[0].enabled[s.index] && (this.setBlendEnabled(s.index, this.windows[0].special && this.target1[s.index], this.blendMode), s.drawScanline(e, s, this.win0Left, this.win0Right)), i = Math.max(i, this.win0Left), r = Math.min(r, this.win0Left), a = Math.max(a, this.win0Right), h = Math.min(h, this.win0Right)), this.win1 && t >= this.win1Top && t < this.win1Bottom && (this.windows[1].enabled[s.index] && (this.setBlendEnabled(s.index, this.windows[1].special && this.target1[s.index], this.blendMode), !this.windows[0].enabled[s.index] && (this.win1Left < i || this.win1Right < a) ? (s.drawScanline(e, s, this.win1Left, i), s.drawScanline(e, s, h, this.win1Right)) : s.drawScanline(e, s, this.win1Left, this.win1Right)), i = Math.max(i, this.win1Left), r = Math.min(r, this.win1Left), a = Math.max(a, this.win1Right), h = Math.min(h, this.win1Right)), (this.windows[2].enabled[s.index] || this.objwin && this.windows[3].enabled[s.index]) && (this.objwinActive = this.objwin, this.setBlendEnabled(s.index, this.windows[2].special && this.target1[s.index], this.blendMode), r > a ? s.drawScanline(e, s, 0, this.HORIZONTAL_PIXELS) : (r && s.drawScanline(e, s, 0, r), a < this.HORIZONTAL_PIXELS && s.drawScanline(e, s, a, this.HORIZONTAL_PIXELS), h < i && s.drawScanline(e, s, h, i))), this.setBlendEnabled(this.LAYER_BACKDROP, this.target1[this.LAYER_BACKDROP] && this.windows[2].special, this.blendMode)) : (this.setBlendEnabled(s.index, this.target1[s.index], this.blendMode), s.drawScanline(e, s, 0, this.HORIZONTAL_PIXELS)), s.bg && (s.sx += s.dmx, s.sy += s.dmy));
  this.finishScanline(e);
};
A.prototype.finishScanline = function(t) {
  for (var e, s = this.palette.accessColor(this.LAYER_BACKDROP, 0), i = this.vcount * this.HORIZONTAL_PIXELS * 4, r = this.target2[this.LAYER_BACKDROP], a = 0; a < this.HORIZONTAL_PIXELS; ++a)
    t.stencil[a] & this.WRITTEN_MASK ? (e = t.color[a], r && t.stencil[a] & this.TARGET1_MASK && (e = this.palette.mix(this.blendA, e, this.blendB, s)), this.palette.convert16To32(e, this.sharedColor)) : this.palette.convert16To32(s, this.sharedColor), this.pixelData.data[i++] = this.sharedColor[0], this.pixelData.data[i++] = this.sharedColor[1], this.pixelData.data[i++] = this.sharedColor[2], i++;
};
A.prototype.startDraw = function() {
};
A.prototype.finishDraw = function(t) {
  this.bg[2].sx = this.bg[2].refx, this.bg[2].sy = this.bg[2].refy, this.bg[3].sx = this.bg[3].refx, this.bg[3].sy = this.bg[3].refy, t.finishDraw(this.pixelData);
};
function Q() {
  this.renderPath = new A(), this.CYCLES_PER_PIXEL = 4, this.HORIZONTAL_PIXELS = 240, this.HBLANK_PIXELS = 68, this.HDRAW_LENGTH = 1006, this.HBLANK_LENGTH = 226, this.HORIZONTAL_LENGTH = 1232, this.VERTICAL_PIXELS = 160, this.VBLANK_PIXELS = 68, this.VERTICAL_TOTAL_PIXELS = 228, this.TOTAL_LENGTH = 280896, this.drawCallback = function() {
  }, this.vblankCallback = function() {
  };
}
Q.prototype.clear = function() {
  this.renderPath.clear(this.cpu.mmu), this.DISPSTAT_MASK = 65336, this.inHblank = !1, this.inVblank = !1, this.vcounter = 0, this.vblankIRQ = 0, this.hblankIRQ = 0, this.vcounterIRQ = 0, this.vcountSetting = 0, this.vcount = -1, this.lastHblank = 0, this.nextHblank = this.HDRAW_LENGTH, this.nextEvent = this.nextHblank, this.nextHblankIRQ = 0, this.nextVblankIRQ = 0, this.nextVcounterIRQ = 0;
};
Q.prototype.freeze = function() {
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
Q.prototype.defrost = function(t) {
  this.inHblank = t.inHblank, this.inVblank = t.inVblank, this.vcounter = t.vcounter, this.vblankIRQ = t.vblankIRQ, this.hblankIRQ = t.hblankIRQ, this.vcounterIRQ = t.vcounterIRQ, this.vcountSetting = t.vcountSetting, this.vcount = t.vcount, this.lastHblank = t.lastHblank, this.nextHblank = t.nextHblank, this.nextEvent = t.nextEvent, this.nextHblankIRQ = t.nextHblankIRQ, this.nextVblankIRQ = t.nextVblankIRQ, this.nextVcounterIRQ = t.nextVcounterIRQ, t.renderPath && this.renderPath.defrost(t.renderPath, this.core.decodeBase64);
};
Q.prototype.setBacking = function(t) {
  var e = t.createImageData(this.HORIZONTAL_PIXELS, this.VERTICAL_PIXELS);
  this.context = t;
  for (var s = 0; s < this.HORIZONTAL_PIXELS * this.VERTICAL_PIXELS * 4; )
    e.data[s++] = 255, e.data[s++] = 255, e.data[s++] = 255, e.data[s++] = 255;
  this.renderPath.setBacking(e);
};
Q.prototype.updateTimers = function(t) {
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
Q.prototype.writeDisplayStat = function(t) {
  this.vblankIRQ = t & 8, this.hblankIRQ = t & 16, this.vcounterIRQ = t & 32, this.vcountSetting = (t & 65280) >> 8, this.vcounterIRQ && (this.nextVcounterIRQ = this.nextHblank + this.HBLANK_LENGTH + (this.vcountSetting - this.vcount) * this.HORIZONTAL_LENGTH, this.nextVcounterIRQ < this.nextEvent && (this.nextVcounterIRQ += this.TOTAL_LENGTH));
};
Q.prototype.readDisplayStat = function() {
  return this.inVblank | this.inHblank << 1 | this.vcounter << 2;
};
Q.prototype.finishDraw = function(t) {
  this.context.putImageData(t, 0, 0), this.drawCallback();
};
function Y() {
  this.KEYCODE_LEFT = 37, this.KEYCODE_UP = 38, this.KEYCODE_RIGHT = 39, this.KEYCODE_DOWN = 40, this.KEYCODE_START = 13, this.KEYCODE_SELECT = 220, this.KEYCODE_A = 90, this.KEYCODE_B = 88, this.KEYCODE_L = 65, this.KEYCODE_R = 83, this.GAMEPAD_LEFT = 14, this.GAMEPAD_UP = 12, this.GAMEPAD_RIGHT = 15, this.GAMEPAD_DOWN = 13, this.GAMEPAD_START = 9, this.GAMEPAD_SELECT = 8, this.GAMEPAD_A = 1, this.GAMEPAD_B = 0, this.GAMEPAD_L = 4, this.GAMEPAD_R = 5, this.GAMEPAD_THRESHOLD = 0.2, this.A = 0, this.B = 1, this.SELECT = 2, this.START = 3, this.RIGHT = 4, this.LEFT = 5, this.UP = 6, this.DOWN = 7, this.R = 8, this.L = 9, this.currentDown = 1023, this.eatInput = !1, this.gamepads = [];
}
Y.prototype.keyboardHandler = function(t) {
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
Y.prototype.gamepadHandler = function(t) {
  var e = 0;
  t.buttons[this.GAMEPAD_LEFT] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.LEFT), t.buttons[this.GAMEPAD_UP] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.UP), t.buttons[this.GAMEPAD_RIGHT] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.RIGHT), t.buttons[this.GAMEPAD_DOWN] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.DOWN), t.buttons[this.GAMEPAD_START] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.START), t.buttons[this.GAMEPAD_SELECT] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.SELECT), t.buttons[this.GAMEPAD_A] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.A), t.buttons[this.GAMEPAD_B] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.B), t.buttons[this.GAMEPAD_L] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.L), t.buttons[this.GAMEPAD_R] > this.GAMEPAD_THRESHOLD && (e |= 1 << this.R), this.currentDown = ~e & 1023;
};
Y.prototype.gamepadConnectHandler = function(t) {
  this.gamepads.push(t);
};
Y.prototype.gamepadDisconnectHandler = function(t) {
  this.gamepads = self.gamepads.filter(function(e) {
    return e != t;
  });
};
Y.prototype.pollGamepads = function() {
  var t = [];
  navigator.webkitGetGamepads ? t = navigator.webkitGetGamepads() : navigator.getGamepads && (t = navigator.getGamepads()), t.length && (this.gamepads = []);
  for (var e = 0; e < t.length; ++e)
    t[e] && this.gamepads.push(t[e]);
  this.gamepads.length > 0 && this.gamepadHandler(this.gamepads[0]);
};
Y.prototype.press = function(t) {
  this.currentDown &= ~(1 << t);
};
Y.prototype.release = function(t) {
  this.currentDown |= 1 << t;
};
Y.prototype.registerHandlers = function() {
  typeof globalThis < "u" && globalThis.addEventListener && (globalThis.addEventListener("keydown", this.keyboardHandler.bind(this), !0), globalThis.addEventListener("keyup", this.keyboardHandler.bind(this), !0), globalThis.addEventListener("gamepadconnected", this.gamepadConnectHandler.bind(this), !0), globalThis.addEventListener("mozgamepadconnected", this.gamepadConnectHandler.bind(this), !0), globalThis.addEventListener("webkitgamepadconnected", this.gamepadConnectHandler.bind(this), !0), globalThis.addEventListener("gamepaddisconnected", this.gamepadDisconnectHandler.bind(this), !0), globalThis.addEventListener("mozgamepaddisconnected", this.gamepadDisconnectHandler.bind(this), !0), globalThis.addEventListener("webkitgamepaddisconnected", this.gamepadDisconnectHandler.bind(this), !0));
};
function $() {
  this.SIO_NORMAL_8 = 0, this.SIO_NORMAL_32 = 1, this.SIO_MULTI = 2, this.SIO_UART = 3, this.SIO_GPIO = 8, this.SIO_JOYBUS = 12, this.BAUD = [9600, 38400, 57600, 115200];
}
$.prototype.clear = function() {
  this.mode = this.SIO_GPIO, this.sd = !1, this.irq = !1, this.multiplayer = {
    baud: 0,
    si: 0,
    id: 0,
    error: 0,
    busy: 0,
    states: [65535, 65535, 65535, 65535]
  }, this.linkLayer = null;
};
$.prototype.setMode = function(t) {
  t & 8 ? t &= 12 : t &= 3, this.mode = t, this.core.INFO("Setting SIO mode to " + ct(t, 1));
};
$.prototype.writeRCNT = function(t) {
  this.mode == this.SIO_GPIO && this.core.STUB("General purpose serial not supported");
};
$.prototype.writeSIOCNT = function(t) {
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
$.prototype.readSIOCNT = function() {
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
$.prototype.read = function(t) {
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
function S(t) {
  t = t || {}, this.LOG_ERROR = 1, this.LOG_WARN = 2, this.LOG_STUB = 4, this.LOG_INFO = 8, this.LOG_DEBUG = 16, this.SYS_ID = "com.endrift.gbajs", this.logLevel = this.LOG_ERROR | this.LOG_WARN, this.rom = null, this.cpu = new P(), this.mmu = new b(), this.irq = new I(), this.io = new k(), this.audio = new g(t), this.video = new Q(), this.keypad = new Y(), this.sio = new $(), this.cpu.mmu = this.mmu, this.cpu.irq = this.irq, this.mmu.cpu = this.cpu, this.mmu.core = this, this.irq.cpu = this.cpu, this.irq.io = this.io, this.irq.audio = this.audio, this.irq.video = this.video, this.irq.core = this, this.io.cpu = this.cpu, this.io.audio = this.audio, this.io.video = this.video, this.io.keypad = this.keypad, this.io.sio = this.sio, this.io.core = this, this.audio.cpu = this.cpu, this.audio.core = this, this.video.cpu = this.cpu, this.video.core = this, this.keypad.core = this, this.sio.core = this, t.bindInput !== !1 && this.keypad.registerHandlers(), this.doStep = this.waitFrame, this.paused = !1, this.seenFrame = !1, this.seenSave = !1, this.lastVblank = 0, this.queue = null, this.reportFPS = null, this.throttle = t.throttle || 16, this.onSavedata = t.onSavedata || null;
  var e = this;
  this.queueFrame = function(s) {
    e.queue = setTimeout(s, e.throttle);
  }, this.video.vblankCallback = function() {
    e.seenFrame = !0;
  };
}
S.prototype.setCanvas = function(t) {
  var e = this;
  if (t.width != 240 || t.height != 160) {
    this.indirectCanvas = document.createElement("canvas"), this.indirectCanvas.setAttribute("height", "160"), this.indirectCanvas.setAttribute("width", "240"), this.targetCanvas = t, this.setCanvasDirect(this.indirectCanvas);
    var s = t.getContext("2d");
    this.video.drawCallback = function() {
      s.drawImage(e.indirectCanvas, 0, 0, t.width, t.height);
    };
  } else
    this.setCanvasDirect(t);
};
S.prototype.setCanvasDirect = function(t) {
  this.context = t.getContext("2d"), this.video.setBacking(this.context);
};
S.prototype.setBios = function(t, e) {
  this.mmu.loadBios(t, e);
};
S.prototype.setRom = function(t) {
  return this.reset(), this.rom = this.mmu.loadRom(t, !0), this.rom ? (this.retrieveSavedata(), !0) : !1;
};
S.prototype.hasRom = function() {
  return !!this.rom;
};
S.prototype.loadRomFromFile = function(t, e) {
  var s = new FileReader(), i = this;
  s.onload = function(r) {
    var a = i.setRom(r.target.result);
    e && e(a);
  }, s.readAsArrayBuffer(t);
};
S.prototype.loadRom = function(t, e) {
  if (t instanceof ArrayBuffer || t instanceof Uint8Array) {
    var s = this.setRom(t);
    e && e(s);
  } else if (t && typeof t.arrayBuffer == "function") {
    var i = this;
    t.arrayBuffer().then(function(r) {
      var a = i.setRom(r);
      e && e(a);
    });
  } else
    this.loadRomFromFile(t, e);
};
S.prototype.reset = function() {
  this.audio.pause(!0), this.mmu.clear(), this.io.clear(), this.audio.clear(), this.video.clear(), this.sio.clear(), this.mmu.mmap(this.mmu.REGION_IO, this.io), this.mmu.mmap(this.mmu.REGION_PALETTE_RAM, this.video.renderPath.palette), this.mmu.mmap(this.mmu.REGION_VRAM, this.video.renderPath.vram), this.mmu.mmap(this.mmu.REGION_OAM, this.video.renderPath.oam), this.cpu.resetCPU(0);
};
S.prototype.step = function() {
  for (; this.doStep(); )
    this.cpu.step();
};
S.prototype.waitFrame = function() {
  var t = this.seenFrame;
  return this.seenFrame = !1, !t;
};
S.prototype.pause = function() {
  this.paused = !0, this.audio.pause(!0), this.queue && (clearTimeout(this.queue), this.queue = null);
};
S.prototype.advanceFrame = function() {
  this.step(), this.seenSave ? this.mmu.saveNeedsFlush() ? this.mmu.flushSave() : (this.storeSavedata(), this.seenSave = !1) : this.mmu.saveNeedsFlush() && (this.seenSave = !0, this.mmu.flushSave());
};
S.prototype.runStable = function() {
  if (!this.interval) {
    var t = this, e = 0, s = 0, i, r = Date.now();
    this.paused = !1, this.audio.pause(!1), this.reportFPS ? i = function() {
      try {
        if (e += Date.now() - r, t.paused)
          return;
        t.queueFrame(i), r = Date.now(), t.advanceFrame(), ++s, s == 60 && (t.reportFPS(s * 1e3 / e), s = 0, e = 0);
      } catch (a) {
        throw t.ERROR(a), a.stack && t.logStackTrace(a.stack.split(`
`)), a;
      }
    } : i = function() {
      try {
        if (t.paused)
          return;
        t.queueFrame(i), t.advanceFrame();
      } catch (a) {
        throw t.ERROR(a), a.stack && t.logStackTrace(a.stack.split(`
`)), a;
      }
    }, this.queueFrame(i);
  }
};
S.prototype.setSavedata = function(t) {
  this.mmu.loadSavedata(t);
};
S.prototype.loadSavedataFromFile = function(t) {
  var e = new FileReader(), s = this;
  e.onload = function(i) {
    s.setSavedata(i.target.result);
  }, e.readAsArrayBuffer(t);
};
S.prototype.decodeSavedata = function(t) {
  this.setSavedata(this.decodeBase64(t));
};
S.prototype.decodeBase64 = function(t) {
  var e = t.length * 3 / 4;
  t[t.length - 2] == "=" ? e -= 2 : t[t.length - 1] == "=" && (e -= 1);
  for (var s = new ArrayBuffer(e), i = new Uint8Array(s), r = t.match(/..../g), a = 0; a + 2 < e; a += 3) {
    var h = atob(r.shift());
    i[a] = h.charCodeAt(0), i[a + 1] = h.charCodeAt(1), i[a + 2] = h.charCodeAt(2);
  }
  if (a < e) {
    var h = atob(r.shift());
    i[a++] = h.charCodeAt(0), h.length > 1 && (i[a++] = h.charCodeAt(1));
  }
  return s;
};
S.prototype.encodeBase64 = function(t) {
  for (var e = [], s, i = [], r, a = 0; a < t.byteLength; ++a)
    for (s = t.getUint8(a, !0), i.push(String.fromCharCode(s)); i.length >= 3; )
      r = i.splice(0, 3), e.push(btoa(r.join("")));
  return i.length && e.push(btoa(i.join(""))), e.join("");
};
S.prototype.downloadSavedata = function() {
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
S.prototype.storeSavedata = function() {
  var t = this.mmu.save;
  if (this.onSavedata) {
    this.onSavedata(this.mmu.cart.code, new Uint8Array(t.buffer.slice(0)));
    return;
  }
  try {
    var e = globalThis.localStorage;
    e[this.SYS_ID + "." + this.mmu.cart.code] = this.encodeBase64(t.view);
  } catch (s) {
    this.WARN("Could not store savedata! " + s);
  }
};
S.prototype.retrieveSavedata = function() {
  if (this.onSavedata)
    return !1;
  try {
    var t = globalThis.localStorage, e = t[this.SYS_ID + "." + this.mmu.cart.code];
    if (e)
      return this.decodeSavedata(e), !0;
  } catch (s) {
    this.WARN("Could not retrieve savedata! " + s);
  }
  return !1;
};
S.prototype.freeze = function() {
  var t = this.video.freeze();
  return {
    cpu: this.cpu.freeze(),
    mmu: this.mmu.freeze(),
    irq: this.irq.freeze(),
    io: this.io.freeze(),
    audio: this.audio.freeze(),
    video: t
  };
};
S.prototype.defrost = function(t) {
  this.cpu.defrost(t.cpu), this.mmu.defrost(t.mmu), this.audio.defrost(t.audio), this.video.defrost(t.video), this.irq.defrost(t.irq), this.io.defrost(t.io);
};
S.prototype.log = function(t, e) {
};
S.prototype.setLogger = function(t) {
  this.log = t;
};
S.prototype.logStackTrace = function(t) {
  var e = t.length - 32;
  this.ERROR("Stack trace follows:"), e > 0 && this.log(-1, "> (Too many frames)");
  for (var s = Math.max(e, 0); s < t.length; ++s)
    this.log(-1, "> " + t[s]);
};
S.prototype.ERROR = function(t) {
  this.logLevel & this.LOG_ERROR && this.log(this.LOG_ERROR, t);
};
S.prototype.WARN = function(t) {
  this.logLevel & this.LOG_WARN && this.log(this.LOG_WARN, t);
};
S.prototype.STUB = function(t) {
  this.logLevel & this.LOG_STUB && this.log(this.LOG_STUB, t);
};
S.prototype.INFO = function(t) {
  this.logLevel & this.LOG_INFO && this.log(this.LOG_INFO, t);
};
S.prototype.DEBUG = function(t) {
  this.logLevel & this.LOG_DEBUG && this.log(this.LOG_DEBUG, t);
};
S.prototype.ASSERT_UNREACHED = function(t) {
  throw new Error("Should be unreached: " + t);
};
S.prototype.ASSERT = function(t, e) {
  if (!t)
    throw new Error("Assertion failed: " + e);
};
S.prototype.A = 0;
S.prototype.B = 1;
S.prototype.SELECT = 2;
S.prototype.START = 3;
S.prototype.RIGHT = 4;
S.prototype.LEFT = 5;
S.prototype.UP = 6;
S.prototype.DOWN = 7;
S.prototype.R = 8;
S.prototype.L = 9;
S.prototype.press = function(t) {
  this.keypad.press(t);
};
S.prototype.release = function(t) {
  this.keypad.release(t);
};
S.prototype.setSpeed = function(t) {
  this.throttle = Math.max(1, Math.floor(16 / t));
};
export {
  S as GameBoyAdvance,
  S as default
};
//# sourceMappingURL=gbajs.js.map
