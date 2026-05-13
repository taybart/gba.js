function f(t) {
  this.cpu = t, this.addressingMode23Immediate = [
    // 000x0
    function(s, e, i) {
      var r = t.gprs, a = function() {
        var h = r[s];
        return (!i || i()) && (r[s] -= e), h;
      };
      return a.writesPC = s == t.PC, a;
    },
    // 000xW
    null,
    null,
    null,
    // 00Ux0
    function(s, e, i) {
      var r = t.gprs, a = function() {
        var h = r[s];
        return (!i || i()) && (r[s] += e), h;
      };
      return a.writesPC = s == t.PC, a;
    },
    // 00UxW
    null,
    null,
    null,
    // 0P0x0
    function(s, e, i) {
      var r = t.gprs, a = function() {
        return r[s] - e;
      };
      return a.writesPC = !1, a;
    },
    // 0P0xW
    function(s, e, i) {
      var r = t.gprs, a = function() {
        var h = r[s] - e;
        return (!i || i()) && (r[s] = h), h;
      };
      return a.writesPC = s == t.PC, a;
    },
    null,
    null,
    // 0PUx0
    function(s, e, i) {
      var r = t.gprs, a = function() {
        return r[s] + e;
      };
      return a.writesPC = !1, a;
    },
    // 0PUxW
    function(s, e, i) {
      var r = t.gprs, a = function() {
        var h = r[s] + e;
        return (!i || i()) && (r[s] = h), h;
      };
      return a.writesPC = s == t.PC, a;
    },
    null,
    null
  ], this.addressingMode23Register = [
    // I00x0
    function(s, e, i) {
      var r = t.gprs, a = function() {
        var h = r[s];
        return (!i || i()) && (r[s] -= r[e]), h;
      };
      return a.writesPC = s == t.PC, a;
    },
    // I00xW
    null,
    null,
    null,
    // I0Ux0
    function(s, e, i) {
      var r = t.gprs, a = function() {
        var h = r[s];
        return (!i || i()) && (r[s] += r[e]), h;
      };
      return a.writesPC = s == t.PC, a;
    },
    // I0UxW
    null,
    null,
    null,
    // IP0x0
    function(s, e, i) {
      var r = t.gprs, a = function() {
        return r[s] - r[e];
      };
      return a.writesPC = !1, a;
    },
    // IP0xW
    function(s, e, i) {
      var r = t.gprs, a = function() {
        var h = r[s] - r[e];
        return (!i || i()) && (r[s] = h), h;
      };
      return a.writesPC = s == t.PC, a;
    },
    null,
    null,
    // IPUx0
    function(s, e, i) {
      var r = t.gprs, a = function() {
        var h = r[s] + r[e];
        return h;
      };
      return a.writesPC = !1, a;
    },
    // IPUxW
    function(s, e, i) {
      var r = t.gprs, a = function() {
        var h = r[s] + r[e];
        return (!i || i()) && (r[s] = h), h;
      };
      return a.writesPC = s == t.PC, a;
    },
    null,
    null
  ], this.addressingMode2RegisterShifted = [
    // I00x0
    function(s, e, i) {
      var r = t.gprs, a = function() {
        var h = r[s];
        return (!i || i()) && (e(), r[s] -= t.shifterOperand), h;
      };
      return a.writesPC = s == t.PC, a;
    },
    // I00xW
    null,
    null,
    null,
    // I0Ux0
    function(s, e, i) {
      var r = t.gprs, a = function() {
        var h = r[s];
        return (!i || i()) && (e(), r[s] += t.shifterOperand), h;
      };
      return a.writesPC = s == t.PC, a;
    },
    // I0UxW
    null,
    null,
    null,
    // IP0x0
    function(s, e, i) {
      var r = t.gprs, a = function() {
        return e(), r[s] - t.shifterOperand;
      };
      return a.writesPC = !1, a;
    },
    // IP0xW
    function(s, e, i) {
      var r = t.gprs, a = function() {
        e();
        var h = r[s] - t.shifterOperand;
        return (!i || i()) && (r[s] = h), h;
      };
      return a.writesPC = s == t.PC, a;
    },
    null,
    null,
    // IPUx0
    function(s, e, i) {
      var r = t.gprs, a = function() {
        return e(), r[s] + t.shifterOperand;
      };
      return a.writesPC = !1, a;
    },
    // IPUxW
    function(s, e, i) {
      var r = t.gprs, a = function() {
        e();
        var h = r[s] + t.shifterOperand;
        return (!i || i()) && (r[s] = h), h;
      };
      return a.writePC = s == t.PC, a;
    },
    null,
    null
  ];
}
f.prototype.constructAddressingMode1ASR = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    ++e.cycles;
    var r = i[t];
    t == e.PC && (r += 4), r &= 255;
    var a = i[s];
    s == e.PC && (a += 4), r == 0 ? (e.shifterOperand = a, e.shifterCarryOut = e.cpsrC) : r < 32 ? (e.shifterOperand = a >> r, e.shifterCarryOut = a & 1 << r - 1) : i[s] >> 31 ? (e.shifterOperand = 4294967295, e.shifterCarryOut = 2147483648) : (e.shifterOperand = 0, e.shifterCarryOut = 0);
  };
};
f.prototype.constructAddressingMode1Immediate = function(t) {
  var s = this.cpu;
  return function() {
    s.shifterOperand = t, s.shifterCarryOut = s.cpsrC;
  };
};
f.prototype.constructAddressingMode1ImmediateRotate = function(t, s) {
  var e = this.cpu;
  return function() {
    e.shifterOperand = t >>> s | t << 32 - s, e.shifterCarryOut = e.shifterOperand >> 31;
  };
};
f.prototype.constructAddressingMode1LSL = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    ++e.cycles;
    var r = i[t];
    t == e.PC && (r += 4), r &= 255;
    var a = i[s];
    s == e.PC && (a += 4), r == 0 ? (e.shifterOperand = a, e.shifterCarryOut = e.cpsrC) : r < 32 ? (e.shifterOperand = a << r, e.shifterCarryOut = a & 1 << 32 - r) : r == 32 ? (e.shifterOperand = 0, e.shifterCarryOut = a & 1) : (e.shifterOperand = 0, e.shifterCarryOut = 0);
  };
};
f.prototype.constructAddressingMode1LSR = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    ++e.cycles;
    var r = i[t];
    t == e.PC && (r += 4), r &= 255;
    var a = i[s];
    s == e.PC && (a += 4), r == 0 ? (e.shifterOperand = a, e.shifterCarryOut = e.cpsrC) : r < 32 ? (e.shifterOperand = a >>> r, e.shifterCarryOut = a & 1 << r - 1) : r == 32 ? (e.shifterOperand = 0, e.shifterCarryOut = a >> 31) : (e.shifterOperand = 0, e.shifterCarryOut = 0);
  };
};
f.prototype.constructAddressingMode1ROR = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    ++e.cycles;
    var r = i[t];
    t == e.PC && (r += 4), r &= 255;
    var a = i[s];
    s == e.PC && (a += 4);
    var h = r & 31;
    r == 0 ? (e.shifterOperand = a, e.shifterCarryOut = e.cpsrC) : h ? (e.shifterOperand = i[s] >>> h | i[s] << 32 - h, e.shifterCarryOut = a & 1 << h - 1) : (e.shifterOperand = a, e.shifterCarryOut = a >> 31);
  };
};
f.prototype.constructAddressingMode23Immediate = function(t, s, e) {
  var i = (t & 983040) >> 16;
  return this.addressingMode23Immediate[(t & 27262976) >> 21](i, s, e);
};
f.prototype.constructAddressingMode23Register = function(t, s, e) {
  var i = (t & 983040) >> 16;
  return this.addressingMode23Register[(t & 27262976) >> 21](i, s, e);
};
f.prototype.constructAddressingMode2RegisterShifted = function(t, s, e) {
  var i = (t & 983040) >> 16;
  return this.addressingMode2RegisterShifted[(t & 27262976) >> 21](i, s, e);
};
f.prototype.constructAddressingMode4 = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    var r = i[s] + t;
    return r;
  };
};
f.prototype.constructAddressingMode4Writeback = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function(h) {
    var n = a[e] + t;
    return h && i && r.mmu.store32(a[e] + t - 4, a[e]), a[e] += s, n;
  };
};
f.prototype.constructADC = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      e();
      var h = (r.shifterOperand >>> 0) + !!r.cpsrC;
      a[t] = (a[s] >>> 0) + h;
    }
  };
};
f.prototype.constructADCS = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      e();
      var h = (r.shifterOperand >>> 0) + !!r.cpsrC, n = (a[s] >>> 0) + h;
      t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = n >> 31, r.cpsrZ = !(n & 4294967295), r.cpsrC = n > 4294967295, r.cpsrV = a[s] >> 31 == h >> 31 && a[s] >> 31 != n >> 31 && h >> 31 != n >> 31), a[t] = n;
    }
  };
};
f.prototype.constructADD = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (e(), a[t] = (a[s] >>> 0) + (r.shifterOperand >>> 0));
  };
};
f.prototype.constructADDS = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      e();
      var h = (a[s] >>> 0) + (r.shifterOperand >>> 0);
      t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = h >> 31, r.cpsrZ = !(h & 4294967295), r.cpsrC = h > 4294967295, r.cpsrV = a[s] >> 31 == r.shifterOperand >> 31 && a[s] >> 31 != h >> 31 && r.shifterOperand >> 31 != h >> 31), a[t] = h;
    }
  };
};
f.prototype.constructAND = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (e(), a[t] = a[s] & r.shifterOperand);
  };
};
f.prototype.constructANDS = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (e(), a[t] = a[s] & r.shifterOperand, t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = a[t] >> 31, r.cpsrZ = !(a[t] & 4294967295), r.cpsrC = r.shifterCarryOut));
  };
};
f.prototype.constructB = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    if (s && !s()) {
      e.mmu.waitPrefetch32(i[e.PC]);
      return;
    }
    e.mmu.waitPrefetch32(i[e.PC]), i[e.PC] += t;
  };
};
f.prototype.constructBIC = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (e(), a[t] = a[s] & ~r.shifterOperand);
  };
};
f.prototype.constructBICS = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (e(), a[t] = a[s] & ~r.shifterOperand, t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = a[t] >> 31, r.cpsrZ = !(a[t] & 4294967295), r.cpsrC = r.shifterCarryOut));
  };
};
f.prototype.constructBL = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    if (s && !s()) {
      e.mmu.waitPrefetch32(i[e.PC]);
      return;
    }
    e.mmu.waitPrefetch32(i[e.PC]), i[e.LR] = i[e.PC] - 4, i[e.PC] += t;
  };
};
f.prototype.constructBX = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    if (s && !s()) {
      e.mmu.waitPrefetch32(i[e.PC]);
      return;
    }
    e.mmu.waitPrefetch32(i[e.PC]), e.switchExecMode(i[t] & 1), i[e.PC] = i[t] & 4294967294;
  };
};
f.prototype.constructCMN = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      e();
      var h = (a[s] >>> 0) + (r.shifterOperand >>> 0);
      r.cpsrN = h >> 31, r.cpsrZ = !(h & 4294967295), r.cpsrC = h > 4294967295, r.cpsrV = a[s] >> 31 == r.shifterOperand >> 31 && a[s] >> 31 != h >> 31 && r.shifterOperand >> 31 != h >> 31;
    }
  };
};
f.prototype.constructCMP = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      e();
      var h = a[s] - r.shifterOperand;
      r.cpsrN = h >> 31, r.cpsrZ = !(h & 4294967295), r.cpsrC = a[s] >>> 0 >= r.shifterOperand >>> 0, r.cpsrV = a[s] >> 31 != r.shifterOperand >> 31 && a[s] >> 31 != h >> 31;
    }
  };
};
f.prototype.constructEOR = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (e(), a[t] = a[s] ^ r.shifterOperand);
  };
};
f.prototype.constructEORS = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (e(), a[t] = a[s] ^ r.shifterOperand, t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = a[t] >> 31, r.cpsrZ = !(a[t] & 4294967295), r.cpsrC = r.shifterCarryOut));
  };
};
f.prototype.constructLDM = function(t, s, e) {
  var i = this.cpu, r = i.gprs, a = i.mmu;
  return function() {
    if (a.waitPrefetch32(r[i.PC]), !(e && !e())) {
      var h = s(!1), n = 0, o, u;
      for (o = t, u = 0; o; o >>= 1, ++u)
        o & 1 && (r[u] = a.load32(h & 4294967292), h += 4, ++n);
      a.waitMulti32(h, n), ++i.cycles;
    }
  };
};
f.prototype.constructLDMS = function(t, s, e) {
  var i = this.cpu, r = i.gprs, a = i.mmu;
  return function() {
    if (a.waitPrefetch32(r[i.PC]), !(e && !e())) {
      var h = s(!1), n = 0, o = i.mode;
      i.switchMode(i.MODE_SYSTEM);
      var u, c;
      for (u = t, c = 0; u; u >>= 1, ++c)
        u & 1 && (r[c] = a.load32(h & 4294967292), h += 4, ++n);
      i.switchMode(o), a.waitMulti32(h, n), ++i.cycles;
    }
  };
};
f.prototype.constructLDR = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    if (i.mmu.waitPrefetch32(r[i.PC]), !(e && !e())) {
      var a = s();
      r[t] = i.mmu.load32(a), i.mmu.wait32(a), ++i.cycles;
    }
  };
};
f.prototype.constructLDRB = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    if (i.mmu.waitPrefetch32(r[i.PC]), !(e && !e())) {
      var a = s();
      r[t] = i.mmu.loadU8(a), i.mmu.wait(a), ++i.cycles;
    }
  };
};
f.prototype.constructLDRH = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    if (i.mmu.waitPrefetch32(r[i.PC]), !(e && !e())) {
      var a = s();
      r[t] = i.mmu.loadU16(a), i.mmu.wait(a), ++i.cycles;
    }
  };
};
f.prototype.constructLDRSB = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    if (i.mmu.waitPrefetch32(r[i.PC]), !(e && !e())) {
      var a = s();
      r[t] = i.mmu.load8(a), i.mmu.wait(a), ++i.cycles;
    }
  };
};
f.prototype.constructLDRSH = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    if (i.mmu.waitPrefetch32(r[i.PC]), !(e && !e())) {
      var a = s();
      r[t] = i.mmu.load16(a), i.mmu.wait(a), ++i.cycles;
    }
  };
};
f.prototype.constructMLA = function(t, s, e, i, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r()))
      if (++a.cycles, a.mmu.waitMul(e), h[i] & 4294901760 && h[e] & 4294901760) {
        var n = (h[i] & 4294901760) * h[e] & 4294967295, o = (h[i] & 65535) * h[e] & 4294967295;
        h[t] = n + o + h[s] & 4294967295;
      } else
        h[t] = h[i] * h[e] + h[s];
  };
};
f.prototype.constructMLAS = function(t, s, e, i, r) {
  var a = this.cpu, h = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      if (++a.cycles, a.mmu.waitMul(e), h[i] & 4294901760 && h[e] & 4294901760) {
        var n = (h[i] & 4294901760) * h[e] & 4294967295, o = (h[i] & 65535) * h[e] & 4294967295;
        h[t] = n + o + h[s] & 4294967295;
      } else
        h[t] = h[i] * h[e] + h[s];
      a.cpsrN = h[t] >> 31, a.cpsrZ = !(h[t] & 4294967295);
    }
  };
};
f.prototype.constructMOV = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (e(), a[t] = r.shifterOperand);
  };
};
f.prototype.constructMOVS = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (e(), a[t] = r.shifterOperand, t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = a[t] >> 31, r.cpsrZ = !(a[t] & 4294967295), r.cpsrC = r.shifterCarryOut));
  };
};
f.prototype.constructMRS = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch32(r[i.PC]), !(e && !e()) && (s ? r[t] = i.spsr : r[t] = i.packCPSR());
  };
};
f.prototype.constructMSR = function(t, s, e, i, r) {
  var a = this.cpu, h = a.gprs, n = e & 65536, o = e & 524288;
  return function() {
    if (a.mmu.waitPrefetch32(h[a.PC]), !(r && !r())) {
      var u;
      e & 33554432 ? u = i : u = h[t];
      var c = (n ? 255 : 0) | //(x ? 0x0000FF00 : 0x00000000) | // Irrelevant on ARMv4T
      //(s ? 0x00FF0000 : 0x00000000) | // Irrelevant on ARMv4T
      (o ? 4278190080 : 0);
      s ? (c &= a.USER_MASK | a.PRIV_MASK | a.STATE_MASK, a.spsr = a.spsr & ~c | u & c) : (c & a.USER_MASK && (a.cpsrN = u >> 31, a.cpsrZ = u & 1073741824, a.cpsrC = u & 536870912, a.cpsrV = u & 268435456), a.mode != a.MODE_USER && c & a.PRIV_MASK && (a.switchMode(u & 15 | 16), a.cpsrI = u & 128, a.cpsrF = u & 64));
    }
  };
};
f.prototype.constructMUL = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()))
      if (r.mmu.waitMul(a[s]), a[e] & 4294901760 && a[s] & 4294901760) {
        var h = (a[e] & 4294901760) * a[s] | 0, n = (a[e] & 65535) * a[s] | 0;
        a[t] = h + n;
      } else
        a[t] = a[e] * a[s];
  };
};
f.prototype.constructMULS = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      if (r.mmu.waitMul(a[s]), a[e] & 4294901760 && a[s] & 4294901760) {
        var h = (a[e] & 4294901760) * a[s] | 0, n = (a[e] & 65535) * a[s] | 0;
        a[t] = h + n;
      } else
        a[t] = a[e] * a[s];
      r.cpsrN = a[t] >> 31, r.cpsrZ = !(a[t] & 4294967295);
    }
  };
};
f.prototype.constructMVN = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (e(), a[t] = ~r.shifterOperand);
  };
};
f.prototype.constructMVNS = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (e(), a[t] = ~r.shifterOperand, t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = a[t] >> 31, r.cpsrZ = !(a[t] & 4294967295), r.cpsrC = r.shifterCarryOut));
  };
};
f.prototype.constructORR = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (e(), a[t] = a[s] | r.shifterOperand);
  };
};
f.prototype.constructORRS = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (e(), a[t] = a[s] | r.shifterOperand, t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = a[t] >> 31, r.cpsrZ = !(a[t] & 4294967295), r.cpsrC = r.shifterCarryOut));
  };
};
f.prototype.constructRSB = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (e(), a[t] = r.shifterOperand - a[s]);
  };
};
f.prototype.constructRSBS = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      e();
      var h = r.shifterOperand - a[s];
      t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = h >> 31, r.cpsrZ = !(h & 4294967295), r.cpsrC = r.shifterOperand >>> 0 >= a[s] >>> 0, r.cpsrV = r.shifterOperand >> 31 != a[s] >> 31 && r.shifterOperand >> 31 != h >> 31), a[t] = h;
    }
  };
};
f.prototype.constructRSC = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      e();
      var h = (a[s] >>> 0) + !r.cpsrC;
      a[t] = (r.shifterOperand >>> 0) - h;
    }
  };
};
f.prototype.constructRSCS = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      e();
      var h = (a[s] >>> 0) + !r.cpsrC, n = (r.shifterOperand >>> 0) - h;
      t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = n >> 31, r.cpsrZ = !(n & 4294967295), r.cpsrC = r.shifterOperand >>> 0 >= n >>> 0, r.cpsrV = r.shifterOperand >> 31 != h >> 31 && r.shifterOperand >> 31 != n >> 31), a[t] = n;
    }
  };
};
f.prototype.constructSBC = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      e();
      var h = (r.shifterOperand >>> 0) + !r.cpsrC;
      a[t] = (a[s] >>> 0) - h;
    }
  };
};
f.prototype.constructSBCS = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      e();
      var h = (r.shifterOperand >>> 0) + !r.cpsrC, n = (a[s] >>> 0) - h;
      t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = n >> 31, r.cpsrZ = !(n & 4294967295), r.cpsrC = a[s] >>> 0 >= n >>> 0, r.cpsrV = a[s] >> 31 != h >> 31 && a[s] >> 31 != n >> 31), a[t] = n;
    }
  };
};
f.prototype.constructSMLAL = function(t, s, e, i, r) {
  var a = this.cpu, h = 1 / 4294967296, n = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(n[a.PC]), !(r && !r())) {
      a.cycles += 2, a.mmu.waitMul(e);
      var o = (n[i] & 4294901760) * n[e], u = (n[i] & 65535) * n[e], c = (n[s] >>> 0) + o + u;
      n[s] = c, n[t] += Math.floor(c * h);
    }
  };
};
f.prototype.constructSMLALS = function(t, s, e, i, r) {
  var a = this.cpu, h = 1 / 4294967296, n = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(n[a.PC]), !(r && !r())) {
      a.cycles += 2, a.mmu.waitMul(e);
      var o = (n[i] & 4294901760) * n[e], u = (n[i] & 65535) * n[e], c = (n[s] >>> 0) + o + u;
      n[s] = c, n[t] += Math.floor(c * h), a.cpsrN = n[t] >> 31, a.cpsrZ = !(n[t] & 4294967295 || n[s] & 4294967295);
    }
  };
};
f.prototype.constructSMULL = function(t, s, e, i, r) {
  var a = this.cpu, h = 1 / 4294967296, n = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(n[a.PC]), !(r && !r())) {
      ++a.cycles, a.mmu.waitMul(n[e]);
      var o = ((n[i] & 4294901760) >> 0) * (n[e] >> 0), u = ((n[i] & 65535) >> 0) * (n[e] >> 0);
      n[s] = (o & 4294967295) + (u & 4294967295) & 4294967295, n[t] = Math.floor(o * h + u * h);
    }
  };
};
f.prototype.constructSMULLS = function(t, s, e, i, r) {
  var a = this.cpu, h = 1 / 4294967296, n = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(n[a.PC]), !(r && !r())) {
      ++a.cycles, a.mmu.waitMul(n[e]);
      var o = ((n[i] & 4294901760) >> 0) * (n[e] >> 0), u = ((n[i] & 65535) >> 0) * (n[e] >> 0);
      n[s] = (o & 4294967295) + (u & 4294967295) & 4294967295, n[t] = Math.floor(o * h + u * h), a.cpsrN = n[t] >> 31, a.cpsrZ = !(n[t] & 4294967295 || n[s] & 4294967295);
    }
  };
};
f.prototype.constructSTM = function(t, s, e) {
  var i = this.cpu, r = i.gprs, a = i.mmu;
  return function() {
    if (e && !e()) {
      a.waitPrefetch32(r[i.PC]);
      return;
    }
    a.wait32(r[i.PC]);
    var h = s(!0), n = 0, o, u;
    for (o = t, u = 0; o; o >>= 1, ++u)
      o & 1 && (a.store32(h, r[u]), h += 4, ++n);
    a.waitMulti32(h, n);
  };
};
f.prototype.constructSTMS = function(t, s, e) {
  var i = this.cpu, r = i.gprs, a = i.mmu;
  return function() {
    if (e && !e()) {
      a.waitPrefetch32(r[i.PC]);
      return;
    }
    a.wait32(r[i.PC]);
    var h = i.mode, n = s(!0), o = 0, u, c;
    for (i.switchMode(i.MODE_SYSTEM), u = t, c = 0; u; u >>= 1, ++c)
      u & 1 && (a.store32(n, r[c]), n += 4, ++o);
    i.switchMode(h), a.waitMulti32(n, o);
  };
};
f.prototype.constructSTR = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    if (e && !e()) {
      i.mmu.waitPrefetch32(r[i.PC]);
      return;
    }
    var a = s();
    i.mmu.store32(a, r[t]), i.mmu.wait32(a), i.mmu.wait32(r[i.PC]);
  };
};
f.prototype.constructSTRB = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    if (e && !e()) {
      i.mmu.waitPrefetch32(r[i.PC]);
      return;
    }
    var a = s();
    i.mmu.store8(a, r[t]), i.mmu.wait(a), i.mmu.wait32(r[i.PC]);
  };
};
f.prototype.constructSTRH = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    if (e && !e()) {
      i.mmu.waitPrefetch32(r[i.PC]);
      return;
    }
    var a = s();
    i.mmu.store16(a, r[t]), i.mmu.wait(a), i.mmu.wait32(r[i.PC]);
  };
};
f.prototype.constructSUB = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    r.mmu.waitPrefetch32(a[r.PC]), !(i && !i()) && (e(), a[t] = a[s] - r.shifterOperand);
  };
};
f.prototype.constructSUBS = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      e();
      var h = a[s] - r.shifterOperand;
      t == r.PC && r.hasSPSR() ? r.unpackCPSR(r.spsr) : (r.cpsrN = h >> 31, r.cpsrZ = !(h & 4294967295), r.cpsrC = a[s] >>> 0 >= r.shifterOperand >>> 0, r.cpsrV = a[s] >> 31 != r.shifterOperand >> 31 && a[s] >> 31 != h >> 31), a[t] = h;
    }
  };
};
f.prototype.constructSWI = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    if (s && !s()) {
      e.mmu.waitPrefetch32(i[e.PC]);
      return;
    }
    e.irq.swi32(t), e.mmu.waitPrefetch32(i[e.PC]);
  };
};
f.prototype.constructSWP = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      r.mmu.wait32(a[s]), r.mmu.wait32(a[s]);
      var h = r.mmu.load32(a[s]);
      r.mmu.store32(a[s], a[e]), a[t] = h, ++r.cycles;
    }
  };
};
f.prototype.constructSWPB = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      r.mmu.wait(a[s]), r.mmu.wait(a[s]);
      var h = r.mmu.load8(a[s]);
      r.mmu.store8(a[s], a[e]), a[t] = h, ++r.cycles;
    }
  };
};
f.prototype.constructTEQ = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      e();
      var h = a[s] ^ r.shifterOperand;
      r.cpsrN = h >> 31, r.cpsrZ = !(h & 4294967295), r.cpsrC = r.shifterCarryOut;
    }
  };
};
f.prototype.constructTST = function(t, s, e, i) {
  var r = this.cpu, a = r.gprs;
  return function() {
    if (r.mmu.waitPrefetch32(a[r.PC]), !(i && !i())) {
      e();
      var h = a[s] & r.shifterOperand;
      r.cpsrN = h >> 31, r.cpsrZ = !(h & 4294967295), r.cpsrC = r.shifterCarryOut;
    }
  };
};
f.prototype.constructUMLAL = function(t, s, e, i, r) {
  var a = this.cpu, h = 1 / 4294967296, n = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(n[a.PC]), !(r && !r())) {
      a.cycles += 2, a.mmu.waitMul(e);
      var o = ((n[i] & 4294901760) >>> 0) * (n[e] >>> 0), u = (n[i] & 65535) * (n[e] >>> 0), c = (n[s] >>> 0) + o + u;
      n[s] = c, n[t] += c * h;
    }
  };
};
f.prototype.constructUMLALS = function(t, s, e, i, r) {
  var a = this.cpu, h = 1 / 4294967296, n = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(n[a.PC]), !(r && !r())) {
      a.cycles += 2, a.mmu.waitMul(e);
      var o = ((n[i] & 4294901760) >>> 0) * (n[e] >>> 0), u = (n[i] & 65535) * (n[e] >>> 0), c = (n[s] >>> 0) + o + u;
      n[s] = c, n[t] += c * h, a.cpsrN = n[t] >> 31, a.cpsrZ = !(n[t] & 4294967295 || n[s] & 4294967295);
    }
  };
};
f.prototype.constructUMULL = function(t, s, e, i, r) {
  var a = this.cpu, h = 1 / 4294967296, n = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(n[a.PC]), !(r && !r())) {
      ++a.cycles, a.mmu.waitMul(n[e]);
      var o = ((n[i] & 4294901760) >>> 0) * (n[e] >>> 0), u = ((n[i] & 65535) >>> 0) * (n[e] >>> 0);
      n[s] = (o & 4294967295) + (u & 4294967295) & 4294967295, n[t] = o * h + u * h >>> 0;
    }
  };
};
f.prototype.constructUMULLS = function(t, s, e, i, r) {
  var a = this.cpu, h = 1 / 4294967296, n = a.gprs;
  return function() {
    if (a.mmu.waitPrefetch32(n[a.PC]), !(r && !r())) {
      ++a.cycles, a.mmu.waitMul(n[e]);
      var o = ((n[i] & 4294901760) >>> 0) * (n[e] >>> 0), u = ((n[i] & 65535) >>> 0) * (n[e] >>> 0);
      n[s] = (o & 4294967295) + (u & 4294967295) & 4294967295, n[t] = o * h + u * h >>> 0, a.cpsrN = n[t] >> 31, a.cpsrZ = !(n[t] & 4294967295 || n[s] & 4294967295);
    }
  };
};
function F(t) {
  this.cpu = t;
}
F.prototype.constructADC = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]);
    var r = (i[s] >>> 0) + !!e.cpsrC, a = i[t], h = (a >>> 0) + r, n = a >> 31, o = h >> 31, u = r >> 31;
    e.cpsrN = o, e.cpsrZ = !(h & 4294967295), e.cpsrC = h > 4294967295, e.cpsrV = n == u && n != o && u != o, i[t] = h;
  };
};
F.prototype.constructADD1 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]);
    var a = (r[s] >>> 0) + e;
    i.cpsrN = a >> 31, i.cpsrZ = !(a & 4294967295), i.cpsrC = a > 4294967295, i.cpsrV = !(r[s] >> 31) && (r[s] >> 31 ^ a) >> 31 && a >> 31, r[t] = a;
  };
};
F.prototype.constructADD2 = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]);
    var r = (i[t] >>> 0) + s;
    e.cpsrN = r >> 31, e.cpsrZ = !(r & 4294967295), e.cpsrC = r > 4294967295, e.cpsrV = !(i[t] >> 31) && (i[t] ^ r) >> 31 && (s ^ r) >> 31, i[t] = r;
  };
};
F.prototype.constructADD3 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]);
    var a = (r[s] >>> 0) + (r[e] >>> 0);
    i.cpsrN = a >> 31, i.cpsrZ = !(a & 4294967295), i.cpsrC = a > 4294967295, i.cpsrV = !((r[s] ^ r[e]) >> 31) && (r[s] ^ a) >> 31 && (r[e] ^ a) >> 31, r[t] = a;
  };
};
F.prototype.constructADD4 = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]), i[t] += i[s];
  };
};
F.prototype.constructADD5 = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]), i[t] = (i[e.PC] & 4294967292) + s;
  };
};
F.prototype.constructADD6 = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]), i[t] = i[e.SP] + s;
  };
};
F.prototype.constructADD7 = function(t) {
  var s = this.cpu, e = s.gprs;
  return function() {
    s.mmu.waitPrefetch(e[s.PC]), e[s.SP] += t;
  };
};
F.prototype.constructAND = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]), i[t] = i[t] & i[s], e.cpsrN = i[t] >> 31, e.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructASR1 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]), e == 0 ? (i.cpsrC = r[s] >> 31, i.cpsrC ? r[t] = 4294967295 : r[t] = 0) : (i.cpsrC = r[s] & 1 << e - 1, r[t] = r[s] >> e), i.cpsrN = r[t] >> 31, i.cpsrZ = !(r[t] & 4294967295);
  };
};
F.prototype.constructASR2 = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]);
    var r = i[s] & 255;
    r && (r < 32 ? (e.cpsrC = i[t] & 1 << r - 1, i[t] >>= r) : (e.cpsrC = i[t] >> 31, e.cpsrC ? i[t] = 4294967295 : i[t] = 0)), e.cpsrN = i[t] >> 31, e.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructB1 = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]), s() && (i[e.PC] += t);
  };
};
F.prototype.constructB2 = function(t) {
  var s = this.cpu, e = s.gprs;
  return function() {
    s.mmu.waitPrefetch(e[s.PC]), e[s.PC] += t;
  };
};
F.prototype.constructBIC = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]), i[t] = i[t] & ~i[s], e.cpsrN = i[t] >> 31, e.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructBL1 = function(t) {
  var s = this.cpu, e = s.gprs;
  return function() {
    s.mmu.waitPrefetch(e[s.PC]), e[s.LR] = e[s.PC] + t;
  };
};
F.prototype.constructBL2 = function(t) {
  var s = this.cpu, e = s.gprs;
  return function() {
    s.mmu.waitPrefetch(e[s.PC]);
    var i = e[s.PC];
    e[s.PC] = e[s.LR] + (t << 1), e[s.LR] = i - 1;
  };
};
F.prototype.constructBX = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]), e.switchExecMode(i[s] & 1);
    var r = 0;
    s == 15 && (r = i[s] & 2), i[e.PC] = i[s] & 4294967294 - r;
  };
};
F.prototype.constructCMN = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]);
    var r = (i[t] >>> 0) + (i[s] >>> 0);
    e.cpsrN = r >> 31, e.cpsrZ = !(r & 4294967295), e.cpsrC = r > 4294967295, e.cpsrV = i[t] >> 31 == i[s] >> 31 && i[t] >> 31 != r >> 31 && i[s] >> 31 != r >> 31;
  };
};
F.prototype.constructCMP1 = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]);
    var r = i[t] - s;
    e.cpsrN = r >> 31, e.cpsrZ = !(r & 4294967295), e.cpsrC = i[t] >>> 0 >= s, e.cpsrV = i[t] >> 31 && (i[t] ^ r) >> 31;
  };
};
F.prototype.constructCMP2 = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]);
    var r = i[t], a = i[s], h = r - a, n = h >> 31, o = r >> 31;
    e.cpsrN = n, e.cpsrZ = !(h & 4294967295), e.cpsrC = r >>> 0 >= a >>> 0, e.cpsrV = o != a >> 31 && o != n;
  };
};
F.prototype.constructCMP3 = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]);
    var r = i[t] - i[s];
    e.cpsrN = r >> 31, e.cpsrZ = !(r & 4294967295), e.cpsrC = i[t] >>> 0 >= i[s] >>> 0, e.cpsrV = (i[t] ^ i[s]) >> 31 && (i[t] ^ r) >> 31;
  };
};
F.prototype.constructEOR = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]), i[t] = i[t] ^ i[s], e.cpsrN = i[t] >> 31, e.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructLDMIA = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]);
    var r = i[t], a = 0, h, n;
    for (h = 1, n = 0; n < 8; h <<= 1, ++n)
      s & h && (i[n] = e.mmu.load32(r), r += 4, ++a);
    e.mmu.waitMulti32(r, a), 1 << t & s || (i[t] = r);
  };
};
F.prototype.constructLDR1 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]);
    var a = r[s] + e;
    r[t] = i.mmu.load32(a), i.mmu.wait32(a), ++i.cycles;
  };
};
F.prototype.constructLDR2 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]), r[t] = i.mmu.load32(r[s] + r[e]), i.mmu.wait32(r[s] + r[e]), ++i.cycles;
  };
};
F.prototype.constructLDR3 = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]), i[t] = e.mmu.load32((i[e.PC] & 4294967292) + s), e.mmu.wait32(i[e.PC]), ++e.cycles;
  };
};
F.prototype.constructLDR4 = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]), i[t] = e.mmu.load32(i[e.SP] + s), e.mmu.wait32(i[e.SP] + s), ++e.cycles;
  };
};
F.prototype.constructLDRB1 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    var a = r[s] + e;
    i.mmu.waitPrefetch(r[i.PC]), r[t] = i.mmu.loadU8(a), i.mmu.wait(a), ++i.cycles;
  };
};
F.prototype.constructLDRB2 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]), r[t] = i.mmu.loadU8(r[s] + r[e]), i.mmu.wait(r[s] + r[e]), ++i.cycles;
  };
};
F.prototype.constructLDRH1 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    var a = r[s] + e;
    i.mmu.waitPrefetch(r[i.PC]), r[t] = i.mmu.loadU16(a), i.mmu.wait(a), ++i.cycles;
  };
};
F.prototype.constructLDRH2 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]), r[t] = i.mmu.loadU16(r[s] + r[e]), i.mmu.wait(r[s] + r[e]), ++i.cycles;
  };
};
F.prototype.constructLDRSB = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]), r[t] = i.mmu.load8(r[s] + r[e]), i.mmu.wait(r[s] + r[e]), ++i.cycles;
  };
};
F.prototype.constructLDRSH = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]), r[t] = i.mmu.load16(r[s] + r[e]), i.mmu.wait(r[s] + r[e]), ++i.cycles;
  };
};
F.prototype.constructLSL1 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]), e == 0 ? r[t] = r[s] : (i.cpsrC = r[s] & 1 << 32 - e, r[t] = r[s] << e), i.cpsrN = r[t] >> 31, i.cpsrZ = !(r[t] & 4294967295);
  };
};
F.prototype.constructLSL2 = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]);
    var r = i[s] & 255;
    r && (r < 32 ? (e.cpsrC = i[t] & 1 << 32 - r, i[t] <<= r) : (r > 32 ? e.cpsrC = 0 : e.cpsrC = i[t] & 1, i[t] = 0)), e.cpsrN = i[t] >> 31, e.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructLSR1 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]), e == 0 ? (i.cpsrC = r[s] >> 31, r[t] = 0) : (i.cpsrC = r[s] & 1 << e - 1, r[t] = r[s] >>> e), i.cpsrN = 0, i.cpsrZ = !(r[t] & 4294967295);
  };
};
F.prototype.constructLSR2 = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]);
    var r = i[s] & 255;
    r && (r < 32 ? (e.cpsrC = i[t] & 1 << r - 1, i[t] >>>= r) : (r > 32 ? e.cpsrC = 0 : e.cpsrC = i[t] >> 31, i[t] = 0)), e.cpsrN = i[t] >> 31, e.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructMOV1 = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]), i[t] = s, e.cpsrN = s >> 31, e.cpsrZ = !(s & 4294967295);
  };
};
F.prototype.constructMOV2 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]);
    var a = r[s];
    i.cpsrN = a >> 31, i.cpsrZ = !(a & 4294967295), i.cpsrC = 0, i.cpsrV = 0, r[t] = a;
  };
};
F.prototype.constructMOV3 = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]), i[t] = i[s];
  };
};
F.prototype.constructMUL = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    if (e.mmu.waitPrefetch(i[e.PC]), e.mmu.waitMul(i[s]), i[s] & 4294901760 && i[t] & 4294901760) {
      var r = (i[t] & 4294901760) * i[s] & 4294967295, a = (i[t] & 65535) * i[s] & 4294967295;
      i[t] = r + a & 4294967295;
    } else
      i[t] *= i[s];
    e.cpsrN = i[t] >> 31, e.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructMVN = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]), i[t] = ~i[s], e.cpsrN = i[t] >> 31, e.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructNEG = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]);
    var r = -i[s];
    e.cpsrN = r >> 31, e.cpsrZ = !(r & 4294967295), e.cpsrC = 0 >= r >>> 0, e.cpsrV = i[s] >> 31 && r >> 31, i[t] = r;
  };
};
F.prototype.constructORR = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]), i[t] = i[t] | i[s], e.cpsrN = i[t] >> 31, e.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructPOP = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]), ++e.cycles;
    var r = i[e.SP], a = 0, h, n;
    for (h = 1, n = 0; n < 8; h <<= 1, ++n)
      t & h && (e.mmu.waitSeq32(r), i[n] = e.mmu.load32(r), r += 4, ++a);
    s && (i[e.PC] = e.mmu.load32(r) & 4294967294, r += 4, ++a), e.mmu.waitMulti32(r, a), i[e.SP] = r;
  };
};
F.prototype.constructPUSH = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    var r = i[e.SP] - 4, a = 0;
    e.mmu.waitPrefetch(i[e.PC]), s && (e.mmu.store32(r, i[e.LR]), r -= 4, ++a);
    var h, n;
    for (h = 128, n = 7; h; h >>= 1, --n)
      if (t & h) {
        e.mmu.store32(r, i[n]), r -= 4, ++a;
        break;
      }
    for (h >>= 1, --n; h; h >>= 1, --n)
      t & h && (e.mmu.store32(r, i[n]), r -= 4, ++a);
    e.mmu.waitMulti32(r, a), i[e.SP] = r + 4;
  };
};
F.prototype.constructROR = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]);
    var r = i[s] & 255;
    if (r) {
      var a = r & 31;
      a > 0 ? (e.cpsrC = i[t] & 1 << a - 1, i[t] = i[t] >>> a | i[t] << 32 - a) : e.cpsrC = i[t] >> 31;
    }
    e.cpsrN = i[t] >> 31, e.cpsrZ = !(i[t] & 4294967295);
  };
};
F.prototype.constructSBC = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]);
    var r = (i[s] >>> 0) + !e.cpsrC, a = (i[t] >>> 0) - r;
    e.cpsrN = a >> 31, e.cpsrZ = !(a & 4294967295), e.cpsrC = i[t] >>> 0 >= a >>> 0, e.cpsrV = (i[t] ^ r) >> 31 && (i[t] ^ a) >> 31, i[t] = a;
  };
};
F.prototype.constructSTMIA = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.wait(i[e.PC]);
    var r = i[t], a = 0, h, n;
    for (h = 1, n = 0; n < 8; h <<= 1, ++n)
      if (s & h) {
        e.mmu.store32(r, i[n]), r += 4, ++a;
        break;
      }
    for (h <<= 1, ++n; n < 8; h <<= 1, ++n)
      s & h && (e.mmu.store32(r, i[n]), r += 4, ++a);
    e.mmu.waitMulti32(r, a), i[t] = r;
  };
};
F.prototype.constructSTR1 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    var a = r[s] + e;
    i.mmu.store32(a, r[t]), i.mmu.wait(r[i.PC]), i.mmu.wait32(a);
  };
};
F.prototype.constructSTR2 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.store32(r[s] + r[e], r[t]), i.mmu.wait(r[i.PC]), i.mmu.wait32(r[s] + r[e]);
  };
};
F.prototype.constructSTR3 = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.store32(i[e.SP] + s, i[t]), e.mmu.wait(i[e.PC]), e.mmu.wait32(i[e.SP] + s);
  };
};
F.prototype.constructSTRB1 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    var a = r[s] + e;
    i.mmu.store8(a, r[t]), i.mmu.wait(r[i.PC]), i.mmu.wait(a);
  };
};
F.prototype.constructSTRB2 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.store8(r[s] + r[e], r[t]), i.mmu.wait(r[i.PC]), i.mmu.wait(r[s] + r[e]);
  };
};
F.prototype.constructSTRH1 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    var a = r[s] + e;
    i.mmu.store16(a, r[t]), i.mmu.wait(r[i.PC]), i.mmu.wait(a);
  };
};
F.prototype.constructSTRH2 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.store16(r[s] + r[e], r[t]), i.mmu.wait(r[i.PC]), i.mmu.wait(r[s] + r[e]);
  };
};
F.prototype.constructSUB1 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]);
    var a = r[s] - e;
    i.cpsrN = a >> 31, i.cpsrZ = !(a & 4294967295), i.cpsrC = r[s] >>> 0 >= e, i.cpsrV = r[s] >> 31 && (r[s] ^ a) >> 31, r[t] = a;
  };
};
F.prototype.constructSUB2 = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]);
    var r = i[t] - s;
    e.cpsrN = r >> 31, e.cpsrZ = !(r & 4294967295), e.cpsrC = i[t] >>> 0 >= s, e.cpsrV = i[t] >> 31 && (i[t] ^ r) >> 31, i[t] = r;
  };
};
F.prototype.constructSUB3 = function(t, s, e) {
  var i = this.cpu, r = i.gprs;
  return function() {
    i.mmu.waitPrefetch(r[i.PC]);
    var a = r[s] - r[e];
    i.cpsrN = a >> 31, i.cpsrZ = !(a & 4294967295), i.cpsrC = r[s] >>> 0 >= r[e] >>> 0, i.cpsrV = r[s] >> 31 != r[e] >> 31 && r[s] >> 31 != a >> 31, r[t] = a;
  };
};
F.prototype.constructSWI = function(t) {
  var s = this.cpu, e = s.gprs;
  return function() {
    s.irq.swi(t), s.mmu.waitPrefetch(e[s.PC]);
  };
};
F.prototype.constructTST = function(t, s) {
  var e = this.cpu, i = e.gprs;
  return function() {
    e.mmu.waitPrefetch(i[e.PC]);
    var r = i[t] & i[s];
    e.cpsrN = r >> 31, e.cpsrZ = !(r & 4294967295);
  };
};
function P() {
  this.SP = 13, this.LR = 14, this.PC = 15, this.MODE_ARM = 0, this.MODE_THUMB = 1, this.MODE_USER = 16, this.MODE_FIQ = 17, this.MODE_IRQ = 18, this.MODE_SUPERVISOR = 19, this.MODE_ABORT = 23, this.MODE_UNDEFINED = 27, this.MODE_SYSTEM = 31, this.BANK_NONE = 0, this.BANK_FIQ = 1, this.BANK_IRQ = 2, this.BANK_SUPERVISOR = 3, this.BANK_ABORT = 4, this.BANK_UNDEFINED = 5, this.UNALLOC_MASK = 268435200, this.USER_MASK = 4026531840, this.PRIV_MASK = 207, this.STATE_MASK = 32, this.WORD_SIZE_ARM = 4, this.WORD_SIZE_THUMB = 2, this.BASE_RESET = 0, this.BASE_UNDEF = 4, this.BASE_SWI = 8, this.BASE_PABT = 12, this.BASE_DABT = 16, this.BASE_IRQ = 24, this.BASE_FIQ = 28, this.armCompiler = new f(this), this.thumbCompiler = new F(this), this.generateConds(), this.gprs = new Int32Array(16);
}
P.prototype.resetCPU = function(t) {
  for (var s = 0; s < this.PC; ++s)
    this.gprs[s] = 0;
  this.gprs[this.PC] = t + this.WORD_SIZE_ARM, this.loadInstruction = this.loadInstructionArm, this.execMode = this.MODE_ARM, this.instructionWidth = this.WORD_SIZE_ARM, this.mode = this.MODE_SYSTEM, this.cpsrI = !1, this.cpsrF = !1, this.cpsrV = !1, this.cpsrC = !1, this.cpsrZ = !1, this.cpsrN = !1, this.bankedRegisters = [
    new Int32Array(7),
    new Int32Array(7),
    new Int32Array(2),
    new Int32Array(2),
    new Int32Array(2),
    new Int32Array(2)
  ], this.spsr = 0, this.bankedSPSRs = new Int32Array(6), this.cycles = 0, this.shifterOperand = 0, this.shifterCarryOut = 0, this.page = null, this.pageId = 0, this.pageRegion = -1, this.instruction = null, this.irq.clear();
  var e = this.gprs, i = this.mmu;
  this.step = function() {
    var r = this.instruction || (this.instruction = this.loadInstruction(e[this.PC] - this.instructionWidth));
    if (e[this.PC] += this.instructionWidth, this.conditionPassed = !0, r(), !r.writesPC)
      this.instruction != null && ((r.next == null || r.next.page.invalid) && (r.next = this.loadInstruction(e[this.PC] - this.instructionWidth)), this.instruction = r.next);
    else if (this.conditionPassed) {
      var a = e[this.PC] &= 4294967294;
      this.execMode == this.MODE_ARM ? (i.wait32(a), i.waitPrefetch32(a)) : (i.wait(a), i.waitPrefetch(a)), e[this.PC] += this.instructionWidth, r.fixedJump ? this.instruction != null && ((r.next == null || r.next.page.invalid) && (r.next = this.loadInstruction(e[this.PC] - this.instructionWidth)), this.instruction = r.next) : this.instruction = null;
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
    cycles: this.cycles
  };
};
P.prototype.defrost = function(t) {
  this.instruction = null, this.page = null, this.pageId = 0, this.pageRegion = -1, this.gprs[0] = t.gprs[0], this.gprs[1] = t.gprs[1], this.gprs[2] = t.gprs[2], this.gprs[3] = t.gprs[3], this.gprs[4] = t.gprs[4], this.gprs[5] = t.gprs[5], this.gprs[6] = t.gprs[6], this.gprs[7] = t.gprs[7], this.gprs[8] = t.gprs[8], this.gprs[9] = t.gprs[9], this.gprs[10] = t.gprs[10], this.gprs[11] = t.gprs[11], this.gprs[12] = t.gprs[12], this.gprs[13] = t.gprs[13], this.gprs[14] = t.gprs[14], this.gprs[15] = t.gprs[15], this.mode = t.mode, this.cpsrI = t.cpsrI, this.cpsrF = t.cpsrF, this.cpsrV = t.cpsrV, this.cpsrC = t.cpsrC, this.cpsrZ = t.cpsrZ, this.cpsrN = t.cpsrN, this.bankedRegisters[0][0] = t.bankedRegisters[0][0], this.bankedRegisters[0][1] = t.bankedRegisters[0][1], this.bankedRegisters[0][2] = t.bankedRegisters[0][2], this.bankedRegisters[0][3] = t.bankedRegisters[0][3], this.bankedRegisters[0][4] = t.bankedRegisters[0][4], this.bankedRegisters[0][5] = t.bankedRegisters[0][5], this.bankedRegisters[0][6] = t.bankedRegisters[0][6], this.bankedRegisters[1][0] = t.bankedRegisters[1][0], this.bankedRegisters[1][1] = t.bankedRegisters[1][1], this.bankedRegisters[1][2] = t.bankedRegisters[1][2], this.bankedRegisters[1][3] = t.bankedRegisters[1][3], this.bankedRegisters[1][4] = t.bankedRegisters[1][4], this.bankedRegisters[1][5] = t.bankedRegisters[1][5], this.bankedRegisters[1][6] = t.bankedRegisters[1][6], this.bankedRegisters[2][0] = t.bankedRegisters[2][0], this.bankedRegisters[2][1] = t.bankedRegisters[2][1], this.bankedRegisters[3][0] = t.bankedRegisters[3][0], this.bankedRegisters[3][1] = t.bankedRegisters[3][1], this.bankedRegisters[4][0] = t.bankedRegisters[4][0], this.bankedRegisters[4][1] = t.bankedRegisters[4][1], this.bankedRegisters[5][0] = t.bankedRegisters[5][0], this.bankedRegisters[5][1] = t.bankedRegisters[5][1], this.spsr = t.spsr, this.bankedSPSRs[0] = t.bankedSPSRs[0], this.bankedSPSRs[1] = t.bankedSPSRs[1], this.bankedSPSRs[2] = t.bankedSPSRs[2], this.bankedSPSRs[3] = t.bankedSPSRs[3], this.bankedSPSRs[4] = t.bankedSPSRs[4], this.bankedSPSRs[5] = t.bankedSPSRs[5], this.cycles = t.cycles;
};
P.prototype.fetchPage = function(t) {
  var s = t >> this.mmu.BASE_OFFSET, e = this.mmu.addressToPage(s, t & this.mmu.OFFSET_MASK);
  if (s == this.pageRegion) {
    if (e == this.pageId && !this.page.invalid)
      return;
    this.pageId = e;
  } else
    this.pageMask = this.mmu.memory[s].PAGE_MASK, this.pageRegion = s, this.pageId = e;
  this.page = this.mmu.accessPage(s, e);
};
P.prototype.loadInstructionArm = function(t) {
  var s = null;
  this.fetchPage(t);
  var e = (t & this.pageMask) >> 2;
  if (s = this.page.arm[e], s)
    return s;
  var i = this.mmu.load32(t) >>> 0;
  return s = this.compileArm(i), s.next = null, s.page = this.page, s.address = t, s.opcode = i, this.page.arm[e] = s, s;
};
P.prototype.loadInstructionThumb = function(t) {
  var s = null;
  this.fetchPage(t);
  var e = (t & this.pageMask) >> 1;
  if (s = this.page.thumb[e], s)
    return s;
  var i = this.mmu.load16(t);
  return s = this.compileThumb(i), s.next = null, s.page = this.page, s.address = t, s.opcode = i, this.page.thumb[e] = s, s;
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
      var s = this.selectBank(t), e = this.selectBank(this.mode);
      if (s != e) {
        if (t == this.MODE_FIQ || this.mode == this.MODE_FIQ) {
          var i = (e == this.BANK_FIQ) + 0, r = (s == this.BANK_FIQ) + 0;
          this.bankedRegisters[i][2] = this.gprs[8], this.bankedRegisters[i][3] = this.gprs[9], this.bankedRegisters[i][4] = this.gprs[10], this.bankedRegisters[i][5] = this.gprs[11], this.bankedRegisters[i][6] = this.gprs[12], this.gprs[8] = this.bankedRegisters[r][2], this.gprs[9] = this.bankedRegisters[r][3], this.gprs[10] = this.bankedRegisters[r][4], this.gprs[11] = this.bankedRegisters[r][5], this.gprs[12] = this.bankedRegisters[r][6];
        }
        this.bankedRegisters[e][0] = this.gprs[this.SP], this.bankedRegisters[e][1] = this.gprs[this.LR], this.gprs[this.SP] = this.bankedRegisters[s][0], this.gprs[this.LR] = this.bankedRegisters[s][1], this.bankedSPSRs[e] = this.spsr, this.spsr = this.bankedSPSRs[s];
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
    var t = this.packCPSR(), s = this.instructionWidth;
    this.switchMode(this.MODE_IRQ), this.spsr = t, this.gprs[this.LR] = this.gprs[this.PC] - s + 4, this.gprs[this.PC] = this.BASE_IRQ + this.WORD_SIZE_ARM, this.instruction = null, this.switchExecMode(this.MODE_ARM), this.cpsrI = !0;
  }
};
P.prototype.raiseTrap = function() {
  var t = this.packCPSR(), s = this.instructionWidth;
  this.switchMode(this.MODE_SUPERVISOR), this.spsr = t, this.gprs[this.LR] = this.gprs[this.PC] - s, this.gprs[this.PC] = this.BASE_SWI + this.WORD_SIZE_ARM, this.instruction = null, this.switchExecMode(this.MODE_ARM), this.cpsrI = !0;
};
P.prototype.badOp = function(t) {
  var s = function() {
    throw "Illegal instruction: 0x" + t.toString(16);
  };
  return s.writesPC = !0, s.fixedJump = !1, s;
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
P.prototype.barrelShiftImmediate = function(t, s, e) {
  var i = this, r = this.gprs, a = this.badOp;
  switch (t) {
    case 0:
      s ? a = function() {
        i.shifterOperand = r[e] << s, i.shifterCarryOut = r[e] & 1 << 32 - s;
      } : a = function() {
        i.shifterOperand = r[e], i.shifterCarryOut = i.cpsrC;
      };
      break;
    case 32:
      s ? a = function() {
        i.shifterOperand = r[e] >>> s, i.shifterCarryOut = r[e] & 1 << s - 1;
      } : a = function() {
        i.shifterOperand = 0, i.shifterCarryOut = r[e] & 2147483648;
      };
      break;
    case 64:
      s ? a = function() {
        i.shifterOperand = r[e] >> s, i.shifterCarryOut = r[e] & 1 << s - 1;
      } : a = function() {
        i.shifterCarryOut = r[e] & 2147483648, i.shifterCarryOut ? i.shifterOperand = 4294967295 : i.shifterOperand = 0;
      };
      break;
    case 96:
      s ? a = function() {
        i.shifterOperand = r[e] >>> s | r[e] << 32 - s, i.shifterCarryOut = r[e] & 1 << s - 1;
      } : a = function() {
        i.shifterOperand = !!i.cpsrC << 31 | r[e] >>> 1, i.shifterCarryOut = r[e] & 1;
      };
      break;
  }
  return a;
};
P.prototype.compileArm = function(t) {
  var s = this.badOp(t), e = t & 234881024;
  this.gprs;
  var i = this.conds[(t & 4026531840) >>> 28];
  if ((t & 268435440) == 19922704) {
    var r = t & 15;
    s = this.armCompiler.constructBX(r, i), s.writesPC = !0, s.fixedJump = !1;
  } else if (!(t & 201326592) && (e == 33554432 || (t & 144) != 144)) {
    var a = t & 31457280, h = t & 1048576;
    if ((a & 25165824) == 16777216 && !h) {
      var n = t & 4194304;
      if ((t & 11595776) == 2158592) {
        var r = t & 15, o = t & 255, u = (t & 3840) >> 7;
        o = o >>> u | o << 32 - u, s = this.armCompiler.constructMSR(r, n, t, o, i), s.writesPC = !1;
      } else if ((t & 12517376) == 983040) {
        var c = (t & 61440) >> 12;
        s = this.armCompiler.constructMRS(c, n, i), s.writesPC = c == this.PC;
      }
    } else {
      var p = (t & 983040) >> 16, c = (t & 61440) >> 12, d = t & 96, r = t & 15, l = function() {
        throw "BUG: invalid barrel shifter";
      };
      if (t & 33554432) {
        var o = t & 255, x = (t & 3840) >> 7;
        x ? l = this.armCompiler.constructAddressingMode1ImmediateRotate(o, x) : l = this.armCompiler.constructAddressingMode1Immediate(o);
      } else if (t & 16) {
        var m = (t & 3840) >> 8;
        switch (d) {
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
        l = this.barrelShiftImmediate(d, o, r);
      }
      switch (a) {
        case 0:
          h ? s = this.armCompiler.constructANDS(c, p, l, i) : s = this.armCompiler.constructAND(c, p, l, i);
          break;
        case 2097152:
          h ? s = this.armCompiler.constructEORS(c, p, l, i) : s = this.armCompiler.constructEOR(c, p, l, i);
          break;
        case 4194304:
          h ? s = this.armCompiler.constructSUBS(c, p, l, i) : s = this.armCompiler.constructSUB(c, p, l, i);
          break;
        case 6291456:
          h ? s = this.armCompiler.constructRSBS(c, p, l, i) : s = this.armCompiler.constructRSB(c, p, l, i);
          break;
        case 8388608:
          h ? s = this.armCompiler.constructADDS(c, p, l, i) : s = this.armCompiler.constructADD(c, p, l, i);
          break;
        case 10485760:
          h ? s = this.armCompiler.constructADCS(c, p, l, i) : s = this.armCompiler.constructADC(c, p, l, i);
          break;
        case 12582912:
          h ? s = this.armCompiler.constructSBCS(c, p, l, i) : s = this.armCompiler.constructSBC(c, p, l, i);
          break;
        case 14680064:
          h ? s = this.armCompiler.constructRSCS(c, p, l, i) : s = this.armCompiler.constructRSC(c, p, l, i);
          break;
        case 16777216:
          s = this.armCompiler.constructTST(c, p, l, i);
          break;
        case 18874368:
          s = this.armCompiler.constructTEQ(c, p, l, i);
          break;
        case 20971520:
          s = this.armCompiler.constructCMP(c, p, l, i);
          break;
        case 23068672:
          s = this.armCompiler.constructCMN(c, p, l, i);
          break;
        case 25165824:
          h ? s = this.armCompiler.constructORRS(c, p, l, i) : s = this.armCompiler.constructORR(c, p, l, i);
          break;
        case 27262976:
          h ? s = this.armCompiler.constructMOVS(c, p, l, i) : s = this.armCompiler.constructMOV(c, p, l, i);
          break;
        case 29360128:
          h ? s = this.armCompiler.constructBICS(c, p, l, i) : s = this.armCompiler.constructBIC(c, p, l, i);
          break;
        case 31457280:
          h ? s = this.armCompiler.constructMVNS(c, p, l, i) : s = this.armCompiler.constructMVN(c, p, l, i);
          break;
      }
      s.writesPC = c == this.PC;
    }
  } else if ((t & 263196656) == 16777360) {
    var r = t & 15, c = t >> 12 & 15, p = t >> 16 & 15;
    t & 4194304 ? s = this.armCompiler.constructSWPB(c, p, r, i) : s = this.armCompiler.constructSWP(c, p, r, i), s.writesPC = c == this.PC;
  } else
    switch (e) {
      case 0:
        if ((t & 16777456) == 144) {
          var c = (t & 983040) >> 16, p = (t & 61440) >> 12, m = (t & 3840) >> 8, r = t & 15;
          switch (t & 15728640) {
            case 0:
              s = this.armCompiler.constructMUL(c, m, r, i);
              break;
            case 1048576:
              s = this.armCompiler.constructMULS(c, m, r, i);
              break;
            case 2097152:
              s = this.armCompiler.constructMLA(c, p, m, r, i);
              break;
            case 3145728:
              s = this.armCompiler.constructMLAS(c, p, m, r, i);
              break;
            case 8388608:
              s = this.armCompiler.constructUMULL(c, p, m, r, i);
              break;
            case 9437184:
              s = this.armCompiler.constructUMULLS(c, p, m, r, i);
              break;
            case 10485760:
              s = this.armCompiler.constructUMLAL(c, p, m, r, i);
              break;
            case 11534336:
              s = this.armCompiler.constructUMLALS(c, p, m, r, i);
              break;
            case 12582912:
              s = this.armCompiler.constructSMULL(c, p, m, r, i);
              break;
            case 13631488:
              s = this.armCompiler.constructSMULLS(c, p, m, r, i);
              break;
            case 14680064:
              s = this.armCompiler.constructSMLAL(c, p, m, r, i);
              break;
            case 15728640:
              s = this.armCompiler.constructSMLALS(c, p, m, r, i);
              break;
          }
          s.writesPC = c == this.PC;
        } else {
          var G = t & 1048576, c = (t & 61440) >> 12, v = (t & 3840) >> 4, E = r = t & 15, _ = t & 32, h = t & 64, C = t & 2097152, e = t & 4194304, R;
          if (e) {
            var o = E | v;
            R = this.armCompiler.constructAddressingMode23Immediate(t, o, i);
          } else
            R = this.armCompiler.constructAddressingMode23Register(t, r, i);
          R.writesPC = !!C && p == this.PC, (t & 144) == 144 && (G ? _ ? h ? s = this.armCompiler.constructLDRSH(c, R, i) : s = this.armCompiler.constructLDRH(c, R, i) : h && (s = this.armCompiler.constructLDRSB(c, R, i)) : !h && _ && (s = this.armCompiler.constructSTRH(c, R, i))), s.writesPC = c == this.PC || R.writesPC;
        }
        break;
      case 67108864:
      case 100663296:
        var c = (t & 61440) >> 12, G = t & 1048576, O = t & 4194304, e = t & 33554432, R = function() {
          throw "Unimplemented memory access: 0x" + t.toString(16);
        };
        if (~t & 16777216 && (t &= 4292870143), e) {
          var r = t & 15, d = t & 96, q = (t & 3968) >> 7;
          if (d || q) {
            var l = this.barrelShiftImmediate(d, q, r);
            R = this.armCompiler.constructAddressingMode2RegisterShifted(t, l, i);
          } else
            R = this.armCompiler.constructAddressingMode23Register(t, r, i);
        } else {
          var y = t & 4095;
          R = this.armCompiler.constructAddressingMode23Immediate(t, y, i);
        }
        G ? O ? s = this.armCompiler.constructLDRB(c, R, i) : s = this.armCompiler.constructLDR(c, R, i) : O ? s = this.armCompiler.constructSTRB(c, R, i) : s = this.armCompiler.constructSTR(c, R, i), s.writesPC = c == this.PC || R.writesPC;
        break;
      case 134217728:
        var G = t & 1048576, C = t & 2097152, D = t & 4194304, N = t & 8388608, H = t & 16777216, m = t & 65535, p = (t & 983040) >> 16, R, o = 0, y = 0, X = !1;
        if (N) {
          H && (o = 4);
          for (var M = 1, e = 0; e < 16; M <<= 1, ++e)
            m & M && (C && e == p && !y && (m &= ~M, o += 4, X = !0), y += 4);
        } else {
          H || (o = 4);
          for (var M = 1, e = 0; e < 16; M <<= 1, ++e)
            m & M && (C && e == p && !y && (m &= ~M, o += 4, X = !0), o -= 4, y -= 4);
        }
        C ? R = this.armCompiler.constructAddressingMode4Writeback(o, y, p, X) : R = this.armCompiler.constructAddressingMode4(o, p), G ? (D ? s = this.armCompiler.constructLDMS(m, R, i) : s = this.armCompiler.constructLDM(m, R, i), s.writesPC = !!(m & 32768)) : (D ? s = this.armCompiler.constructSTMS(m, R, i) : s = this.armCompiler.constructSTM(m, R, i), s.writesPC = !1);
        break;
      case 167772160:
        var o = t & 16777215;
        o & 8388608 && (o |= 4278190080), o <<= 2;
        var W = t & 16777216;
        W ? s = this.armCompiler.constructBL(o, i) : s = this.armCompiler.constructB(o, i), s.writesPC = !0, s.fixedJump = !0;
        break;
      case 201326592:
        break;
      case 234881024:
        if ((t & 251658240) == 251658240) {
          var o = t & 16777215;
          s = this.armCompiler.constructSWI(o, i), s.writesPC = !1;
        }
        break;
      default:
        throw "Bad opcode: 0x" + t.toString(16);
    }
  return s.execMode = this.MODE_ARM, s.fixedJump = s.fixedJump || !1, s;
};
P.prototype.compileThumb = function(t) {
  var s = this.badOp(t & 65535);
  if (this.gprs, (t & 64512) == 16384) {
    var e = (t & 56) >> 3, i = t & 7;
    switch (t & 960) {
      case 0:
        s = this.thumbCompiler.constructAND(i, e);
        break;
      case 64:
        s = this.thumbCompiler.constructEOR(i, e);
        break;
      case 128:
        s = this.thumbCompiler.constructLSL2(i, e);
        break;
      case 192:
        s = this.thumbCompiler.constructLSR2(i, e);
        break;
      case 256:
        s = this.thumbCompiler.constructASR2(i, e);
        break;
      case 320:
        s = this.thumbCompiler.constructADC(i, e);
        break;
      case 384:
        s = this.thumbCompiler.constructSBC(i, e);
        break;
      case 448:
        s = this.thumbCompiler.constructROR(i, e);
        break;
      case 512:
        s = this.thumbCompiler.constructTST(i, e);
        break;
      case 576:
        s = this.thumbCompiler.constructNEG(i, e);
        break;
      case 640:
        s = this.thumbCompiler.constructCMP2(i, e);
        break;
      case 704:
        s = this.thumbCompiler.constructCMN(i, e);
        break;
      case 768:
        s = this.thumbCompiler.constructORR(i, e);
        break;
      case 832:
        s = this.thumbCompiler.constructMUL(i, e);
        break;
      case 896:
        s = this.thumbCompiler.constructBIC(i, e);
        break;
      case 960:
        s = this.thumbCompiler.constructMVN(i, e);
        break;
    }
    s.writesPC = !1;
  } else if ((t & 64512) == 17408) {
    var e = (t & 120) >> 3, r = t & 7, a = t & 128, i = r | a >> 4;
    switch (t & 768) {
      case 0:
        s = this.thumbCompiler.constructADD4(i, e), s.writesPC = i == this.PC;
        break;
      case 256:
        s = this.thumbCompiler.constructCMP3(i, e), s.writesPC = !1;
        break;
      case 512:
        s = this.thumbCompiler.constructMOV3(i, e), s.writesPC = i == this.PC;
        break;
      case 768:
        s = this.thumbCompiler.constructBX(i, e), s.writesPC = !0, s.fixedJump = !1;
        break;
    }
  } else if ((t & 63488) == 6144) {
    var e = (t & 448) >> 6, r = (t & 56) >> 3, i = t & 7;
    switch (t & 1536) {
      case 0:
        s = this.thumbCompiler.constructADD3(i, r, e);
        break;
      case 512:
        s = this.thumbCompiler.constructSUB3(i, r, e);
        break;
      case 1024:
        var h = (t & 448) >> 6;
        h ? s = this.thumbCompiler.constructADD1(i, r, h) : s = this.thumbCompiler.constructMOV2(i, r, e);
        break;
      case 1536:
        var h = (t & 448) >> 6;
        s = this.thumbCompiler.constructSUB1(i, r, h);
        break;
    }
    s.writesPC = !1;
  } else if (t & 57344)
    if ((t & 57344) == 8192) {
      var h = t & 255, r = (t & 1792) >> 8;
      switch (t & 6144) {
        case 0:
          s = this.thumbCompiler.constructMOV1(r, h);
          break;
        case 2048:
          s = this.thumbCompiler.constructCMP1(r, h);
          break;
        case 4096:
          s = this.thumbCompiler.constructADD2(r, h);
          break;
        case 6144:
          s = this.thumbCompiler.constructSUB2(r, h);
          break;
      }
      s.writesPC = !1;
    } else if ((t & 63488) == 18432) {
      var i = (t & 1792) >> 8, h = (t & 255) << 2;
      s = this.thumbCompiler.constructLDR3(i, h), s.writesPC = !1;
    } else if ((t & 61440) == 20480) {
      var i = t & 7, r = (t & 56) >> 3, e = (t & 448) >> 6, n = t & 3584;
      switch (n) {
        case 0:
          s = this.thumbCompiler.constructSTR2(i, r, e);
          break;
        case 512:
          s = this.thumbCompiler.constructSTRH2(i, r, e);
          break;
        case 1024:
          s = this.thumbCompiler.constructSTRB2(i, r, e);
          break;
        case 1536:
          s = this.thumbCompiler.constructLDRSB(i, r, e);
          break;
        case 2048:
          s = this.thumbCompiler.constructLDR2(i, r, e);
          break;
        case 2560:
          s = this.thumbCompiler.constructLDRH2(i, r, e);
          break;
        case 3072:
          s = this.thumbCompiler.constructLDRB2(i, r, e);
          break;
        case 3584:
          s = this.thumbCompiler.constructLDRSH(i, r, e);
          break;
      }
      s.writesPC = !1;
    } else if ((t & 57344) == 24576) {
      var i = t & 7, r = (t & 56) >> 3, h = (t & 1984) >> 4, o = t & 4096;
      o && (h >>= 2);
      var u = t & 2048;
      u ? o ? s = this.thumbCompiler.constructLDRB1(i, r, h) : s = this.thumbCompiler.constructLDR1(i, r, h) : o ? s = this.thumbCompiler.constructSTRB1(i, r, h) : s = this.thumbCompiler.constructSTR1(i, r, h), s.writesPC = !1;
    } else if ((t & 62976) == 46080) {
      var c = !!(t & 256), p = t & 255;
      t & 2048 ? (s = this.thumbCompiler.constructPOP(p, c), s.writesPC = c, s.fixedJump = !1) : (s = this.thumbCompiler.constructPUSH(p, c), s.writesPC = !1);
    } else if (t & 32768)
      switch (t & 28672) {
        case 0:
          var i = t & 7, r = (t & 56) >> 3, h = (t & 1984) >> 5;
          t & 2048 ? s = this.thumbCompiler.constructLDRH1(i, r, h) : s = this.thumbCompiler.constructSTRH1(i, r, h), s.writesPC = !1;
          break;
        case 4096:
          var i = (t & 1792) >> 8, h = (t & 255) << 2, u = t & 2048;
          u ? s = this.thumbCompiler.constructLDR4(i, h) : s = this.thumbCompiler.constructSTR3(i, h), s.writesPC = !1;
          break;
        case 8192:
          var i = (t & 1792) >> 8, h = (t & 255) << 2;
          t & 2048 ? s = this.thumbCompiler.constructADD6(i, h) : s = this.thumbCompiler.constructADD5(i, h), s.writesPC = !1;
          break;
        case 12288:
          if (!(t & 3840)) {
            var o = t & 128, h = (t & 127) << 2;
            o && (h = -h), s = this.thumbCompiler.constructADD7(h), s.writesPC = !1;
          }
          break;
        case 16384:
          var r = (t & 1792) >> 8, p = t & 255;
          t & 2048 ? s = this.thumbCompiler.constructLDMIA(r, p) : s = this.thumbCompiler.constructSTMIA(r, p), s.writesPC = !1;
          break;
        case 20480:
          var d = (t & 3840) >> 8, h = t & 255;
          if (d == 15)
            s = this.thumbCompiler.constructSWI(h), s.writesPC = !1;
          else {
            t & 128 && (h |= 4294967040), h <<= 1;
            var l = this.conds[d];
            s = this.thumbCompiler.constructB1(h, l), s.writesPC = !0, s.fixedJump = !0;
          }
          break;
        case 24576:
        case 28672:
          var h = t & 2047, x = t & 6144;
          switch (x) {
            case 0:
              h & 1024 && (h |= 4294965248), h <<= 1, s = this.thumbCompiler.constructB2(h), s.writesPC = !0, s.fixedJump = !0;
              break;
            case 2048:
              break;
            case 4096:
              h & 1024 && (h |= 4294966272), h <<= 12, s = this.thumbCompiler.constructBL1(h), s.writesPC = !1;
              break;
            case 6144:
              s = this.thumbCompiler.constructBL2(h), s.writesPC = !0, s.fixedJump = !1;
              break;
          }
          break;
        default:
          this.WARN("Undefined instruction: 0x" + t.toString(16));
      }
    else
      throw "Bad opcode: 0x" + t.toString(16);
  else {
    var i = t & 7, e = (t & 56) >> 3, h = (t & 1984) >> 6;
    switch (t & 6144) {
      case 0:
        s = this.thumbCompiler.constructLSL1(i, e, h);
        break;
      case 2048:
        s = this.thumbCompiler.constructLSR1(i, e, h);
        break;
      case 4096:
        s = this.thumbCompiler.constructASR1(i, e, h);
        break;
    }
    s.writesPC = !1;
  }
  return s.execMode = this.MODE_THUMB, s.fixedJump = s.fixedJump || !1, s;
};
function tt(t) {
  w.call(this, new ArrayBuffer(t), 0), this.writePending = !1;
}
tt.prototype = Object.create(w.prototype);
tt.prototype.store8 = function(t, s) {
  this.view.setInt8(t, s), this.writePending = !0;
};
tt.prototype.store16 = function(t, s) {
  this.view.setInt16(t, s, !0), this.writePending = !0;
};
tt.prototype.store32 = function(t, s) {
  this.view.setInt32(t, s, !0), this.writePending = !0;
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
B.prototype.store8 = function(t, s) {
  switch (this.command) {
    case 0:
      if (t == 21845)
        if (this.second == 85) {
          switch (s) {
            case this.COMMAND_ERASE:
              this.pendingCommand = s;
              break;
            case this.COMMAND_ID:
              this.idMode = !0;
              break;
            case this.COMMAND_TERMINATE_ID:
              this.idMode = !1;
              break;
            default:
              this.command = s;
              break;
          }
          this.second = 0, this.first = 0;
        } else
          this.command = 0, this.first = s, this.idMode = !1;
      else t == 10922 && this.first == 170 && (this.first = 0, this.pendingCommand ? this.command = this.pendingCommand : this.second = s);
      break;
    case this.COMMAND_ERASE:
      switch (s) {
        case this.COMMAND_WIPE:
          if (t == 21845)
            for (var e = 0; e < this.view.byteLength; e += 4)
              this.view.setInt32(e, -1);
          break;
        case this.COMMAND_ERASE_SECTOR:
          if (!(t & 4095))
            for (var e = t; e < t + 4096; e += 4)
              this.bank.setInt32(e, -1);
          break;
      }
      this.pendingCommand = 0, this.command = 0;
      break;
    case this.COMMAND_WRITE:
      this.bank.setInt8(t, s), this.command = 0, this.writePending = !0;
      break;
    case this.COMMAND_SWITCH_BANK:
      this.bank1 && t == 0 && (s == 1 ? this.bank = this.bank1 : this.bank = this.bank0), this.command = 0;
      break;
  }
};
B.prototype.store16 = function(t, s) {
  throw new Error("Unaligned save to flash!");
};
B.prototype.store32 = function(t, s) {
  throw new Error("Unaligned save to flash!");
};
B.prototype.replaceData = function(t) {
  var s = this.view === this.bank1;
  w.prototype.replaceData.call(this, t, 0), this.bank0 = new DataView(this.buffer, 0, 65536), t.byteLength > 65536 ? this.bank1 = new DataView(this.buffer, 65536) : this.bank1 = null, this.bank = s ? this.bank1 : this.bank0;
};
function U(t, s) {
  w.call(this, new ArrayBuffer(t), 0), this.writeAddress = 0, this.readBitsRemaining = 0, this.readAddress = 0, this.command = 0, this.commandBitsRemaining = 0, this.realSize = 0, this.addressBits = 0, this.writePending = !1, this.dma = s.core.irq.dma[3], this.COMMAND_NULL = 0, this.COMMAND_PENDING = 1, this.COMMAND_WRITE = 2, this.COMMAND_READ_PENDING = 3, this.COMMAND_READ = 4;
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
    var s = 63 - this.readBitsRemaining, e = this.view.getUint8(this.readAddress + s >> 3, !1) >> 7 - (s & 7);
    return this.readBitsRemaining || (this.command = this.COMMAND_NULL), e & 1;
  }
  return 0;
};
U.prototype.load32 = function(t) {
  throw new Error("Unsupported 32-bit access!");
};
U.prototype.store8 = function(t, s) {
  throw new Error("Unsupported 8-bit access!");
};
U.prototype.store16 = function(t, s) {
  switch (this.command) {
    case this.COMMAND_NULL:
    default:
      this.command = s & 1;
      break;
    case this.COMMAND_PENDING:
      if (this.command <<= 1, this.command |= s & 1, this.command == this.COMMAND_WRITE) {
        if (!this.realSize) {
          var e = this.dma.count - 67;
          this.realSize = 8 << e, this.addressBits = e;
        }
        this.commandBitsRemaining = this.addressBits + 64 + 1, this.writeAddress = 0;
      } else {
        if (!this.realSize) {
          var e = this.dma.count - 3;
          this.realSize = 8 << e, this.addressBits = e;
        }
        this.commandBitsRemaining = this.addressBits + 1, this.readAddress = 0;
      }
      break;
    case this.COMMAND_WRITE:
      if (--this.commandBitsRemaining > 64)
        this.writeAddress <<= 1, this.writeAddress |= (s & 1) << 6;
      else if (this.commandBitsRemaining <= 0)
        this.command = this.COMMAND_NULL, this.writePending = !0;
      else {
        var i = this.view.getUint8(this.writeAddress >> 3);
        i &= ~(1 << 7 - (this.writeAddress & 7)), i |= (s & 1) << 7 - (this.writeAddress & 7), this.view.setUint8(this.writeAddress >> 3, i), ++this.writeAddress;
      }
      break;
    case this.COMMAND_READ_PENDING:
      --this.commandBitsRemaining > 0 ? (this.readAddress <<= 1, s & 1 && (this.readAddress |= 64)) : (this.readBitsRemaining = 68, this.command = this.COMMAND_READ);
      break;
  }
};
U.prototype.store32 = function(t, s) {
  throw new Error("Unsupported 32-bit access!");
};
U.prototype.replaceData = function(t) {
  w.prototype.replaceData.call(this, t, 0);
};
function ct(t, s, e) {
  typeof e > "u" && (e = !0), typeof s > "u" && (s = 8);
  var i = (t >>> 0).toString(16).toUpperCase();
  return s -= i.length, s < 0 ? i : (e ? "0x" : "") + new Array(s + 1).join("0") + i;
}
function ht(t, s) {
  this.core = t, this.rom = s, this.readWrite = 0, this.direction = 0, this.device = new J(this);
}
ht.prototype.store16 = function(t, s) {
  switch (t) {
    case 196:
      this.device.setPins(s & 15);
      break;
    case 198:
      this.direction = s & 15, this.device.setDirection(this.direction);
      break;
    case 200:
      this.readWrite = s & 1;
      break;
    default:
      throw new Error("BUG: Bad offset passed to GPIO: " + t.toString(16));
  }
  if (this.readWrite) {
    var e = this.rom.view.getUint16(t, !0);
    e &= ~this.direction, this.rom.view.setUint16(t, e | s & this.direction, !0);
  }
};
ht.prototype.outputPins = function(t) {
  if (this.readWrite) {
    var s = this.rom.view.getUint16(196, !0);
    s &= this.direction, this.rom.view.setUint16(196, s | t & ~this.direction & 15, !0);
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
  var s = t >> this.bitsRead & 1;
  return s;
};
J.prototype.updateClock = function() {
  var t = /* @__PURE__ */ new Date();
  this.time[0] = this.bcd(t.getFullYear()), this.time[1] = this.bcd(t.getMonth() + 1), this.time[2] = this.bcd(t.getDate()), this.time[3] = t.getDay() - 1, this.time[3] < 0 && (this.time[3] = 6), this.control & 64 ? this.time[4] = this.bcd(t.getHours()) : (this.time[4] = this.bcd(t.getHours() % 2), t.getHours() >= 12 && (this.time[4] |= 128)), this.time[5] = this.bcd(t.getMinutes()), this.time[6] = this.bcd(t.getSeconds());
};
J.prototype.bcd = function(t) {
  var s = t % 10;
  return t /= 10, s += t % 10 << 4, s;
};
function w(t, s) {
  this.buffer = t, this.view = new DataView(this.buffer, typeof s == "number" ? s : 0), this.mask = t.byteLength - 1, this.resetMask();
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
  var s = (t & 3) << 3, e = this.view.getInt32(t & this.mask32, !0);
  return e >>> s | e << 32 - s;
};
w.prototype.store8 = function(t, s) {
  this.view.setInt8(t & this.mask8, s);
};
w.prototype.store16 = function(t, s) {
  this.view.setInt16(t & this.mask16, s, !0);
};
w.prototype.store32 = function(t, s) {
  this.view.setInt32(t & this.mask32, s, !0);
};
w.prototype.invalidatePage = function(t) {
};
w.prototype.replaceData = function(t, s) {
  this.buffer = t, this.view = new DataView(this.buffer, typeof s == "number" ? s : 0), this.icache && (this.icache = new Array(this.icache.length));
};
function et(t, s) {
  w.call(this, new ArrayBuffer(t)), this.ICACHE_PAGE_BITS = s, this.PAGE_MASK = (2 << this.ICACHE_PAGE_BITS) - 1, this.icache = new Array(t >> this.ICACHE_PAGE_BITS + 1);
}
et.prototype = Object.create(w.prototype);
et.prototype.invalidatePage = function(t) {
  var s = this.icache[(t & this.mask) >> this.ICACHE_PAGE_BITS];
  s && (s.invalid = !0);
};
function st(t, s) {
  w.call(this, t, s), this.ICACHE_PAGE_BITS = 10, this.PAGE_MASK = (2 << this.ICACHE_PAGE_BITS) - 1, this.icache = new Array(t.byteLength >> this.ICACHE_PAGE_BITS + 1), this.mask = 33554431, this.resetMask();
}
st.prototype = Object.create(w.prototype);
st.prototype.store8 = function(t, s) {
};
st.prototype.store16 = function(t, s) {
  t < 202 && t >= 196 && (this.gpio || (this.gpio = this.mmu.allocGPIO(this)), this.gpio.store16(t, s));
};
st.prototype.store32 = function(t, s) {
  t < 202 && t >= 196 && (this.gpio || (this.gpio = this.mmu.allocGPIO(this)), this.gpio.store32(t, s));
};
function V(t, s) {
  w.call(this, t, s), this.ICACHE_PAGE_BITS = 16, this.PAGE_MASK = (2 << this.ICACHE_PAGE_BITS) - 1, this.icache = new Array(1);
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
V.prototype.store8 = function(t, s) {
};
V.prototype.store16 = function(t, s) {
};
V.prototype.store32 = function(t, s) {
};
function K(t, s) {
  this.cpu = s, this.mmu = t;
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
  var s = this.mmu.loadU16(this.cpu.gprs[this.cpu.PC] - this.cpu.instructionWidth);
  return s | s << 16;
};
K.prototype.store8 = function(t, s) {
};
K.prototype.store16 = function(t, s) {
};
K.prototype.store32 = function(t, s) {
};
K.prototype.invalidatePage = function(t) {
};
function g() {
  this.REGION_BIOS = 0, this.REGION_WORKING_RAM = 2, this.REGION_WORKING_IRAM = 3, this.REGION_IO = 4, this.REGION_PALETTE_RAM = 5, this.REGION_VRAM = 6, this.REGION_OAM = 7, this.REGION_CART0 = 8, this.REGION_CART1 = 10, this.REGION_CART2 = 12, this.REGION_CART_SRAM = 14, this.BASE_BIOS = 0, this.BASE_WORKING_RAM = 33554432, this.BASE_WORKING_IRAM = 50331648, this.BASE_IO = 67108864, this.BASE_PALETTE_RAM = 83886080, this.BASE_VRAM = 100663296, this.BASE_OAM = 117440512, this.BASE_CART0 = 134217728, this.BASE_CART1 = 167772160, this.BASE_CART2 = 201326592, this.BASE_CART_SRAM = 234881024, this.BASE_MASK = 251658240, this.BASE_OFFSET = 24, this.OFFSET_MASK = 16777215, this.SIZE_BIOS = 16384, this.SIZE_WORKING_RAM = 262144, this.SIZE_WORKING_IRAM = 32768, this.SIZE_IO = 1024, this.SIZE_PALETTE_RAM = 1024, this.SIZE_VRAM = 98304, this.SIZE_OAM = 1024, this.SIZE_CART0 = 33554432, this.SIZE_CART1 = 33554432, this.SIZE_CART2 = 33554432, this.SIZE_CART_SRAM = 32768, this.SIZE_CART_FLASH512 = 65536, this.SIZE_CART_FLASH1M = 131072, this.SIZE_CART_EEPROM = 8192, this.DMA_TIMING_NOW = 0, this.DMA_TIMING_VBLANK = 1, this.DMA_TIMING_HBLANK = 2, this.DMA_TIMING_CUSTOM = 3, this.DMA_INCREMENT = 0, this.DMA_DECREMENT = 1, this.DMA_FIXED = 2, this.DMA_INCREMENT_RELOAD = 3, this.DMA_OFFSET = [1, -1, 0, 1], this.WAITSTATES = [0, 0, 2, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4], this.WAITSTATES_32 = [0, 0, 5, 0, 0, 1, 0, 1, 7, 7, 9, 9, 13, 13, 8], this.WAITSTATES_SEQ = [0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 4, 4, 8, 8, 4], this.WAITSTATES_SEQ_32 = [0, 0, 5, 0, 0, 1, 0, 1, 5, 5, 9, 9, 17, 17, 8], this.NULLWAIT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (var t = 15; t < 256; ++t)
    this.WAITSTATES[t] = 0, this.WAITSTATES_32[t] = 0, this.WAITSTATES_SEQ[t] = 0, this.WAITSTATES_SEQ_32[t] = 0, this.NULLWAIT[t] = 0;
  this.ROM_WS = [4, 3, 2, 8], this.ROM_WS_SEQ = [
    [2, 1],
    [4, 1],
    [8, 1]
  ], this.ICACHE_PAGE_BITS = 8, this.PAGE_MASK = (2 << this.ICACHE_PAGE_BITS) - 1, this.bios = null;
}
g.prototype.mmap = function(t, s) {
  this.memory[t] = s;
};
g.prototype.clear = function() {
  this.badMemory = new K(this, this.cpu), this.memory = [
    this.bios,
    this.badMemory,
    // Unused
    new et(this.SIZE_WORKING_RAM, 9),
    new et(this.SIZE_WORKING_IRAM, 7),
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
g.prototype.freeze = function() {
  return {
    ram: this.memory[this.REGION_WORKING_RAM].buffer.slice(0),
    iram: this.memory[this.REGION_WORKING_IRAM].buffer.slice(0)
  };
};
g.prototype.defrost = function(t) {
  this.memory[this.REGION_WORKING_RAM].replaceData(t.ram), this.memory[this.REGION_WORKING_IRAM].replaceData(t.iram);
};
g.prototype.loadBios = function(t, s) {
  this.bios = new V(t), this.bios.real = !!s;
};
g.prototype.loadRom = function(t, s) {
  var e = {
    title: null,
    code: null,
    maker: null,
    memory: t,
    saveType: null
  }, i = new st(t);
  if (i.view.getUint8(178) != 150)
    return null;
  if (i.mmu = this, this.memory[this.REGION_CART0] = i, this.memory[this.REGION_CART1] = i, this.memory[this.REGION_CART2] = i, t.byteLength > 16777216) {
    var r = new st(t, 16777216);
    this.memory[this.REGION_CART0 + 1] = r, this.memory[this.REGION_CART1 + 1] = r, this.memory[this.REGION_CART2 + 1] = r;
  }
  if (s) {
    for (var a = "", h = 0; h < 12; ++h) {
      var n = i.loadU8(h + 160);
      if (!n)
        break;
      a += String.fromCharCode(n);
    }
    e.title = a;
    for (var o = "", h = 0; h < 4; ++h) {
      var n = i.loadU8(h + 172);
      if (!n)
        break;
      o += String.fromCharCode(n);
    }
    e.code = o;
    for (var u = "", h = 0; h < 2; ++h) {
      var n = i.loadU8(h + 176);
      if (!n)
        break;
      u += String.fromCharCode(n);
    }
    e.maker = u;
    for (var c = "", p, d = !1, h = 228; h < t.byteLength && !d; ++h)
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
          d = !0;
          break;
        default:
          c = p;
          break;
      }
    if (d)
      switch (e.saveType = c, c) {
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
  return this.cart = e, e;
};
g.prototype.loadSavedata = function(t) {
  this.save.replaceData(t);
};
g.prototype.load8 = function(t) {
  return this.memory[t >>> this.BASE_OFFSET].load8(t & 16777215);
};
g.prototype.load16 = function(t) {
  return this.memory[t >>> this.BASE_OFFSET].load16(t & 16777215);
};
g.prototype.load32 = function(t) {
  return this.memory[t >>> this.BASE_OFFSET].load32(t & 16777215);
};
g.prototype.loadU8 = function(t) {
  return this.memory[t >>> this.BASE_OFFSET].loadU8(t & 16777215);
};
g.prototype.loadU16 = function(t) {
  return this.memory[t >>> this.BASE_OFFSET].loadU16(t & 16777215);
};
g.prototype.store8 = function(t, s) {
  var e = t & 16777215, i = this.memory[t >>> this.BASE_OFFSET];
  i.store8(e, s), i.invalidatePage(e);
};
g.prototype.store16 = function(t, s) {
  var e = t & 16777214, i = this.memory[t >>> this.BASE_OFFSET];
  i.store16(e, s), i.invalidatePage(e);
};
g.prototype.store32 = function(t, s) {
  var e = t & 16777212, i = this.memory[t >>> this.BASE_OFFSET];
  i.store32(e, s), i.invalidatePage(e), i.invalidatePage(e + 2);
};
g.prototype.waitPrefetch = function(t) {
  this.cpu.cycles += 1 + this.waitstatesPrefetch[t >>> this.BASE_OFFSET];
};
g.prototype.waitPrefetch32 = function(t) {
  this.cpu.cycles += 1 + this.waitstatesPrefetch32[t >>> this.BASE_OFFSET];
};
g.prototype.wait = function(t) {
  this.cpu.cycles += 1 + this.waitstates[t >>> this.BASE_OFFSET];
};
g.prototype.wait32 = function(t) {
  this.cpu.cycles += 1 + this.waitstates32[t >>> this.BASE_OFFSET];
};
g.prototype.waitSeq = function(t) {
  this.cpu.cycles += 1 + this.waitstatesSeq[t >>> this.BASE_OFFSET];
};
g.prototype.waitSeq32 = function(t) {
  this.cpu.cycles += 1 + this.waitstatesSeq32[t >>> this.BASE_OFFSET];
};
g.prototype.waitMul = function(t) {
  t & !0 || !(t & 4294967040) ? this.cpu.cycles += 1 : t & !0 || !(t & 4294901760) ? this.cpu.cycles += 2 : t & !0 || !(t & 4278190080) ? this.cpu.cycles += 3 : this.cpu.cycles += 4;
};
g.prototype.waitMulti32 = function(t, s) {
  this.cpu.cycles += 1 + this.waitstates32[t >>> this.BASE_OFFSET], this.cpu.cycles += (1 + this.waitstatesSeq32[t >>> this.BASE_OFFSET]) * (s - 1);
};
g.prototype.addressToPage = function(t, s) {
  return s >> this.memory[t].ICACHE_PAGE_BITS;
};
g.prototype.accessPage = function(t, s) {
  var e = this.memory[t], i = e.icache[s];
  return (!i || i.invalid) && (i = {
    thumb: new Array(1 << e.ICACHE_PAGE_BITS),
    arm: new Array(1 << e.ICACHE_PAGE_BITS - 1),
    invalid: !1
  }, e.icache[s] = i), i;
};
g.prototype.scheduleDma = function(t, s) {
  switch (s.timing) {
    case this.DMA_TIMING_NOW:
      this.serviceDma(t, s);
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
          this.cpu.irq.audio.scheduleFIFODma(t, s);
          break;
        case 3:
          this.cpu.irq.video.scheduleVCaptureDma(dma, s);
          break;
      }
  }
};
g.prototype.runHblankDmas = function() {
  for (var t, s = 0; s < this.cpu.irq.dma.length; ++s)
    t = this.cpu.irq.dma[s], t.enable && t.timing == this.DMA_TIMING_HBLANK && this.serviceDma(s, t);
};
g.prototype.runVblankDmas = function() {
  for (var t, s = 0; s < this.cpu.irq.dma.length; ++s)
    t = this.cpu.irq.dma[s], t.enable && t.timing == this.DMA_TIMING_VBLANK && this.serviceDma(s, t);
};
g.prototype.serviceDma = function(t, s) {
  if (s.enable) {
    var e = s.width, i = this.DMA_OFFSET[s.srcControl] * e, r = this.DMA_OFFSET[s.dstControl] * e, a = s.nextCount, h = s.nextSource & this.OFFSET_MASK, n = s.nextDest & this.OFFSET_MASK, o = s.nextSource >>> this.BASE_OFFSET, u = s.nextDest >>> this.BASE_OFFSET, c = this.memory[o], p = this.memory[u], d = null, l = null, x = 4294967295, m = 4294967295, v;
    if (p.ICACHE_PAGE_BITS)
      for (var E = n + a * e >> p.ICACHE_PAGE_BITS, _ = n >> p.ICACHE_PAGE_BITS; _ <= E; ++_)
        p.invalidatePage(_ << p.ICACHE_PAGE_BITS);
    if ((u == this.REGION_WORKING_RAM || u == this.REGION_WORKING_IRAM) && (l = p.view, m = p.mask), (o == this.REGION_WORKING_RAM || o == this.REGION_WORKING_IRAM || o == this.REGION_CART0 || o == this.REGION_CART1) && (d = c.view, x = c.mask), c && p)
      if (d && l)
        if (e == 4)
          for (h &= 4294967292, n &= 4294967292; a--; )
            v = d.getInt32(h & x), l.setInt32(n & m, v), h += i, n += r;
        else
          for (; a--; )
            v = d.getUint16(h & x), l.setUint16(n & m, v), h += i, n += r;
      else if (d)
        if (e == 4)
          for (h &= 4294967292, n &= 4294967292; a--; )
            v = d.getInt32(h & x, !0), p.store32(n, v), h += i, n += r;
        else
          for (; a--; )
            v = d.getUint16(h & x, !0), p.store16(n, v), h += i, n += r;
      else if (e == 4)
        for (h &= 4294967292, n &= 4294967292; a--; )
          v = c.load32(h), p.store32(n, v), h += i, n += r;
      else
        for (; a--; )
          v = c.loadU16(h), p.store16(n, v), h += i, n += r;
    else
      this.core.WARN("Invalid DMA");
    if (s.doIrq && (s.nextIRQ = this.cpu.cycles + 2, s.nextIRQ += e == 4 ? this.waitstates32[o] + this.waitstates32[u] : this.waitstates[o] + this.waitstates[u], s.nextIRQ += (s.count - 1) * (e == 4 ? this.waitstatesSeq32[o] + this.waitstatesSeq32[u] : this.waitstatesSeq[o] + this.waitstatesSeq[u])), s.nextSource = h | o << this.BASE_OFFSET, s.nextDest = n | u << this.BASE_OFFSET, s.nextCount = a, s.repeat)
      s.nextCount = s.count, s.dstControl == this.DMA_INCREMENT_RELOAD && (s.nextDest = s.dest), this.scheduleDma(t, s);
    else {
      s.enable = !1;
      var O = this.memory[this.REGION_IO];
      O.registers[this.DMA_REGISTER[t]] &= 32736;
    }
  }
};
g.prototype.adjustTimings = function(t) {
  var s = t & 3, e = (t & 12) >> 2, i = (t & 16) >> 4, r = (t & 96) >> 5, a = (t & 128) >> 7, h = (t & 768) >> 8, n = (t & 1024) >> 10, o = t & 16384;
  this.waitstates[this.REGION_CART_SRAM] = this.ROM_WS[s], this.waitstatesSeq[this.REGION_CART_SRAM] = this.ROM_WS[s], this.waitstates32[this.REGION_CART_SRAM] = this.ROM_WS[s], this.waitstatesSeq32[this.REGION_CART_SRAM] = this.ROM_WS[s], this.waitstates[this.REGION_CART0] = this.waitstates[this.REGION_CART0 + 1] = this.ROM_WS[e], this.waitstates[this.REGION_CART1] = this.waitstates[this.REGION_CART1 + 1] = this.ROM_WS[r], this.waitstates[this.REGION_CART2] = this.waitstates[this.REGION_CART2 + 1] = this.ROM_WS[h], this.waitstatesSeq[this.REGION_CART0] = this.waitstatesSeq[this.REGION_CART0 + 1] = this.ROM_WS_SEQ[0][i], this.waitstatesSeq[this.REGION_CART1] = this.waitstatesSeq[this.REGION_CART1 + 1] = this.ROM_WS_SEQ[1][a], this.waitstatesSeq[this.REGION_CART2] = this.waitstatesSeq[this.REGION_CART2 + 1] = this.ROM_WS_SEQ[2][n], this.waitstates32[this.REGION_CART0] = this.waitstates32[this.REGION_CART0 + 1] = this.waitstates[this.REGION_CART0] + 1 + this.waitstatesSeq[this.REGION_CART0], this.waitstates32[this.REGION_CART1] = this.waitstates32[this.REGION_CART1 + 1] = this.waitstates[this.REGION_CART1] + 1 + this.waitstatesSeq[this.REGION_CART1], this.waitstates32[this.REGION_CART2] = this.waitstates32[this.REGION_CART2 + 1] = this.waitstates[this.REGION_CART2] + 1 + this.waitstatesSeq[this.REGION_CART2], this.waitstatesSeq32[this.REGION_CART0] = this.waitstatesSeq32[this.REGION_CART0 + 1] = 2 * this.waitstatesSeq[this.REGION_CART0] + 1, this.waitstatesSeq32[this.REGION_CART1] = this.waitstatesSeq32[this.REGION_CART1 + 1] = 2 * this.waitstatesSeq[this.REGION_CART1] + 1, this.waitstatesSeq32[this.REGION_CART2] = this.waitstatesSeq32[this.REGION_CART2 + 1] = 2 * this.waitstatesSeq[this.REGION_CART2] + 1, o ? (this.waitstatesPrefetch[this.REGION_CART0] = this.waitstatesPrefetch[this.REGION_CART0 + 1] = 0, this.waitstatesPrefetch[this.REGION_CART1] = this.waitstatesPrefetch[this.REGION_CART1 + 1] = 0, this.waitstatesPrefetch[this.REGION_CART2] = this.waitstatesPrefetch[this.REGION_CART2 + 1] = 0, this.waitstatesPrefetch32[this.REGION_CART0] = this.waitstatesPrefetch32[this.REGION_CART0 + 1] = 0, this.waitstatesPrefetch32[this.REGION_CART1] = this.waitstatesPrefetch32[this.REGION_CART1 + 1] = 0, this.waitstatesPrefetch32[this.REGION_CART2] = this.waitstatesPrefetch32[this.REGION_CART2 + 1] = 0) : (this.waitstatesPrefetch[this.REGION_CART0] = this.waitstatesPrefetch[this.REGION_CART0 + 1] = this.waitstatesSeq[this.REGION_CART0], this.waitstatesPrefetch[this.REGION_CART1] = this.waitstatesPrefetch[this.REGION_CART1 + 1] = this.waitstatesSeq[this.REGION_CART1], this.waitstatesPrefetch[this.REGION_CART2] = this.waitstatesPrefetch[this.REGION_CART2 + 1] = this.waitstatesSeq[this.REGION_CART2], this.waitstatesPrefetch32[this.REGION_CART0] = this.waitstatesPrefetch32[this.REGION_CART0 + 1] = this.waitstatesSeq32[this.REGION_CART0], this.waitstatesPrefetch32[this.REGION_CART1] = this.waitstatesPrefetch32[this.REGION_CART1 + 1] = this.waitstatesSeq32[this.REGION_CART1], this.waitstatesPrefetch32[this.REGION_CART2] = this.waitstatesPrefetch32[this.REGION_CART2 + 1] = this.waitstatesSeq32[this.REGION_CART2]);
};
g.prototype.saveNeedsFlush = function() {
  return this.save.writePending;
};
g.prototype.flushSave = function() {
  this.save.writePending = !1;
};
g.prototype.allocGPIO = function(t) {
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
    var s = this.dma[0];
    s.enable && s.doIrq && s.nextIRQ && this.cpu.cycles >= s.nextIRQ && (s.nextIRQ = 0, this.raiseIRQ(this.IRQ_DMA0)), s = this.dma[1], s.enable && s.doIrq && s.nextIRQ && this.cpu.cycles >= s.nextIRQ && (s.nextIRQ = 0, this.raiseIRQ(this.IRQ_DMA1)), s = this.dma[2], s.enable && s.doIrq && s.nextIRQ && this.cpu.cycles >= s.nextIRQ && (s.nextIRQ = 0, this.raiseIRQ(this.IRQ_DMA2)), s = this.dma[3], s.enable && s.doIrq && s.nextIRQ && this.cpu.cycles >= s.nextIRQ && (s.nextIRQ = 0, this.raiseIRQ(this.IRQ_DMA3)), this.pollNextEvent();
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
      for (var s = this.core.mmu.memory[this.core.mmu.REGION_WORKING_IRAM], e = s.loadU8(32762), C = 32256; C < 32768; C += 4)
        s.store32(C, 0);
      this.resetSP(), e ? this.cpu.gprs[this.cpu.LR] = 33554432 : this.cpu.gprs[this.cpu.LR] = 134217728, this.cpu.switchExecMode(this.cpu.MODE_ARM), this.cpu.instruction.writesPC = !0, this.cpu.gprs[this.cpu.PC] = this.cpu.gprs[this.cpu.LR];
      break;
    case 1:
      var i = this.cpu.gprs[0];
      if (i & 1 && (this.core.mmu.memory[this.core.mmu.REGION_WORKING_RAM] = new et(this.core.mmu.SIZE_WORKING_RAM, 9)), i & 2)
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
      var p = this.cpu.gprs[0], d = this.cpu.gprs[1], l = this.cpu.gprs[2], x = l & 1048575, m = l & 16777216, u = l & 67108864 ? 4 : 2;
      if (m)
        if (u == 4) {
          p &= 4294967292, d &= 4294967292;
          for (var c = this.cpu.mmu.load32(p), C = 0; C < x; ++C)
            this.cpu.mmu.store32(d + (C << 2), c);
        } else {
          p &= 4294967294, d &= 4294967294;
          for (var c = this.cpu.mmu.load16(p), C = 0; C < x; ++C)
            this.cpu.mmu.store16(d + (C << 1), c);
        }
      else if (u == 4) {
        p &= 4294967292, d &= 4294967292;
        for (var C = 0; C < x; ++C) {
          var c = this.cpu.mmu.load32(p + (C << 2));
          this.cpu.mmu.store32(d + (C << 2), c);
        }
      } else {
        p &= 4294967294, d &= 4294967294;
        for (var C = 0; C < x; ++C) {
          var c = this.cpu.mmu.load16(p + (C << 1));
          this.cpu.mmu.store16(d + (C << 1), c);
        }
      }
      return;
    case 12:
      var p = this.cpu.gprs[0] & 4294967292, d = this.cpu.gprs[1] & 4294967292, l = this.cpu.gprs[2], x = l & 1048575;
      x = x + 7 >> 3 << 3;
      var m = l & 16777216;
      if (m)
        for (var c = this.cpu.mmu.load32(p), C = 0; C < x; ++C)
          this.cpu.mmu.store32(d + (C << 2), c);
      else
        for (var C = 0; C < x; ++C) {
          var c = this.cpu.mmu.load32(p + (C << 2));
          this.cpu.mmu.store32(d + (C << 2), c);
        }
      return;
    case 14:
      for (var C = this.cpu.gprs[2], v, E, _, O, D, N, H, R = this.cpu.gprs[0], y = this.cpu.gprs[1], M, W, Z, j, q, G; C--; )
        v = this.core.mmu.load32(R) / 256, E = this.core.mmu.load32(R + 4) / 256, _ = this.core.mmu.load16(R + 8), O = this.core.mmu.load16(R + 10), D = this.core.mmu.load16(R + 12) / 256, N = this.core.mmu.load16(R + 14) / 256, H = (this.core.mmu.loadU16(R + 16) >> 8) / 128 * Math.PI, R += 20, M = j = Math.cos(H), W = Z = Math.sin(H), M *= D, W *= -D, Z *= N, j *= N, q = v - (M * _ + W * O), G = E - (Z * _ + j * O), this.core.mmu.store16(y, M * 256 | 0), this.core.mmu.store16(y + 2, W * 256 | 0), this.core.mmu.store16(y + 4, Z * 256 | 0), this.core.mmu.store16(y + 6, j * 256 | 0), this.core.mmu.store32(y + 8, q * 256 | 0), this.core.mmu.store32(y + 12, G * 256 | 0), y += 16;
      break;
    case 15:
      for (var C = this.cpu.gprs[2], D, N, H, R = this.cpu.gprs[0], y = this.cpu.gprs[1], X = this.cpu.gprs[3], M, W, Z, j; C--; )
        D = this.core.mmu.load16(R) / 256, N = this.core.mmu.load16(R + 2) / 256, H = (this.core.mmu.loadU16(R + 4) >> 8) / 128 * Math.PI, R += 6, M = j = Math.cos(H), W = Z = Math.sin(H), M *= D, W *= -D, Z *= N, j *= N, this.core.mmu.store16(y, M * 256 | 0), this.core.mmu.store16(y + X, W * 256 | 0), this.core.mmu.store16(y + X * 2, Z * 256 | 0), this.core.mmu.store16(y + X * 3, j * 256 | 0), y += X * 4;
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
  var t = this.video.nextEvent, s;
  if (this.audio.enabled && (s = this.audio.nextEvent, (!t || s < t) && (t = s)), this.timersEnabled) {
    var e = this.timers[0];
    s = e.nextEvent, e.enable && s && (!t || s < t) && (t = s), e = this.timers[1], s = e.nextEvent, e.enable && s && (!t || s < t) && (t = s), e = this.timers[2], s = e.nextEvent, e.enable && s && (!t || s < t) && (t = s), e = this.timers[3], s = e.nextEvent, e.enable && s && (!t || s < t) && (t = s);
  }
  var i = this.dma[0];
  s = i.nextIRQ, i.enable && i.doIrq && s && (!t || s < t) && (t = s), i = this.dma[1], s = i.nextIRQ, i.enable && i.doIrq && s && (!t || s < t) && (t = s), i = this.dma[2], s = i.nextIRQ, i.enable && i.doIrq && s && (!t || s < t) && (t = s), i = this.dma[3], s = i.nextIRQ, i.enable && i.doIrq && s && (!t || s < t) && (t = s), this.core.ASSERT(t >= this.cpu.cycles, "Next event is before present"), this.nextEvent = t;
};
I.prototype.waitForIRQ = function() {
  var t, s = this.testIRQ() || this.video.hblankIRQ || this.video.vblankIRQ || this.video.vcounterIRQ;
  if (this.timersEnabled && (t = this.timers[0], s = s || t.doIrq, t = this.timers[1], s = s || t.doIrq, t = this.timers[2], s = s || t.doIrq, t = this.timers[3], s = s || t.doIrq), !s)
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
I.prototype.dmaSetSourceAddress = function(t, s) {
  this.dma[t].source = s & 4294967294;
};
I.prototype.dmaSetDestAddress = function(t, s) {
  this.dma[t].dest = s & 4294967294;
};
I.prototype.dmaSetWordCount = function(t, s) {
  this.dma[t].count = s || (t == 3 ? 65536 : 16384);
};
I.prototype.dmaWriteControl = function(t, s) {
  var e = this.dma[t], i = e.enable;
  e.dstControl = (s & 96) >> 5, e.srcControl = (s & 384) >> 7, e.repeat = !!(s & 512), e.width = s & 1024 ? 4 : 2, e.drq = !!(s & 2048), e.timing = (s & 12288) >> 12, e.doIrq = !!(s & 16384), e.enable = !!(s & 32768), e.nextIRQ = 0, e.drq && this.core.WARN("DRQ not implemented"), !i && e.enable && (e.nextSource = e.source, e.nextDest = e.dest, e.nextCount = e.count, this.cpu.mmu.scheduleDma(t, e));
};
I.prototype.timerSetReload = function(t, s) {
  this.timers[t].reload = s & 65535;
};
I.prototype.timerWriteControl = function(t, s) {
  var e = this.timers[t], i = e.prescaleBits;
  switch (s & 3) {
    case 0:
      e.prescaleBits = 0;
      break;
    case 1:
      e.prescaleBits = 6;
      break;
    case 2:
      e.prescaleBits = 8;
      break;
    case 3:
      e.prescaleBits = 10;
      break;
  }
  e.countUp = !!(s & 4), e.doIrq = !!(s & 64), e.overflowInterval = 65536 - e.reload << e.prescaleBits;
  var r = e.enable;
  e.enable = !!((s & 128) >> 7 << t), !r && e.enable ? (e.countUp ? e.nextEvent = 0 : (e.lastEvent = this.cpu.cycles, e.nextEvent = this.cpu.cycles + e.overflowInterval), this.io.registers[this.io.TM0CNT_LO + (t << 2) >> 1] = e.reload, e.oldReload = e.reload, ++this.timersEnabled) : r && !e.enable ? (e.countUp || (this.io.registers[this.io.TM0CNT_LO + (t << 2) >> 1] = e.oldReload + (this.cpu.cycles - e.lastEvent) >> i), --this.timersEnabled) : e.prescaleBits != i && !e.countUp && (e.nextEvent = e.lastEvent + e.overflowInterval), this.pollNextEvent();
};
I.prototype.timerRead = function(t) {
  var s = this.timers[t];
  return s.enable && !s.countUp ? s.oldReload + (this.cpu.cycles - s.lastEvent) >> s.prescaleBits : this.io.registers[this.io.TM0CNT_LO + (t << 2) >> 1];
};
I.prototype.halt = function() {
  if (!this.enable)
    throw "Requested HALT when interrupts were disabled!";
  if (!this.waitForIRQ())
    throw "Waiting on interrupt forever.";
};
I.prototype.lz77 = function(t, s, e) {
  for (var i = (this.cpu.mmu.load32(t) & 4294967040) >> 8, r, a = t + 4, h = s, n = 0, o, u, c, p = 0, d; i > 0; )
    if (n) {
      if (r & 128)
        for (o = this.cpu.mmu.loadU8(a) | this.cpu.mmu.loadU8(a + 1) << 8, a += 2, u = h - ((o & 15) << 8 | (o & 65280) >> 8) - 1, c = ((o & 240) >> 4) + 3; c-- && i; )
          d = this.cpu.mmu.loadU8(u++), e == 2 ? (p >>= 8, p |= d << 8, h & 1 && this.cpu.mmu.store16(h - 1, p)) : this.cpu.mmu.store8(h, d), --i, ++h;
      else
        d = this.cpu.mmu.loadU8(a++), e == 2 ? (p >>= 8, p |= d << 8, h & 1 && this.cpu.mmu.store16(h - 1, p)) : this.cpu.mmu.store8(h, d), --i, ++h;
      r <<= 1, --n;
    } else
      r = this.cpu.mmu.loadU8(a++), n = 8;
};
I.prototype.huffman = function(t, s) {
  t = t & 4294967292;
  var e = this.cpu.mmu.load32(t), i = e >> 8, r = e & 15;
  if (32 % r)
    throw "Unimplemented unaligned Huffman";
  var a = 4 - i & 3;
  i &= 4294967292;
  var h = [], n = (this.cpu.mmu.loadU8(t + 4) << 1) + 1, o, u = t + 5 + n, c = s & 4294967292, p;
  for (p = 0; p < n; ++p)
    h.push(this.cpu.mmu.loadU8(t + 5 + p));
  var d, l = 0, x, m, v = 0;
  for (d = h[0]; i > 0; ) {
    var E = this.cpu.mmu.load32(u);
    for (u += 4, x = 32; x > 0; --x, E <<= 1) {
      if (typeof d == "number") {
        var _ = (l - 1 | 1) + ((d & 63) << 1) + 2;
        d = {
          l: _,
          r: _ + 1,
          lTerm: d & 128,
          rTerm: d & 64
        }, h[l] = d;
      }
      if (E & 2147483648)
        if (d.rTerm)
          m = h[d.r];
        else {
          l = d.r, d = h[d.r];
          continue;
        }
      else if (d.lTerm)
        m = h[d.l];
      else {
        l = d.l, d = h[l];
        continue;
      }
      o |= (m & (1 << r) - 1) << v, v += r, l = 0, d = h[0], v == 32 && (v = 0, this.cpu.mmu.store32(c, o), c += 4, i -= 4, o = 0);
    }
  }
  a && this.cpu.mmu.store32(c, o);
};
I.prototype.rl = function(t, s, e) {
  t = t & 4294967292;
  for (var i = (this.cpu.mmu.load32(t) & 4294967040) >> 8, r = 4 - i & 3, a, h, n = t + 4, o = s, u = 0; i > 0; )
    if (a = this.cpu.mmu.loadU8(n++), a & 128)
      for (a &= 127, a += 3, h = this.cpu.mmu.loadU8(n++); a-- && i; )
        --i, e == 2 ? (u >>= 8, u |= h << 8, o & 1 && this.cpu.mmu.store16(o - 1, u)) : this.cpu.mmu.store8(o, h), ++o;
    else
      for (a++; a-- && i; )
        --i, h = this.cpu.mmu.loadU8(n++), e == 2 ? (u >>= 8, u |= h << 8, o & 1 && this.cpu.mmu.store16(o - 1, u)) : this.cpu.mmu.store8(o, h), ++o;
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
  for (var s = 0; s <= this.BLDY; s += 2)
    this.store16(s, this.registers[s >> 1]);
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
  var s = t & 1, e = this.loadU16(t & 65534);
  return e >>> (s << 3) & 255;
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
k.prototype.store8 = function(t, s) {
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
      s &= 128, s ? this.core.STUB("Stop") : this.core.irq.halt();
      return;
    default:
      this.STUB_REG("8-bit I/O", t);
      break;
  }
  t & 1 ? (s <<= 8, s |= this.registers[t >> 1] & 255) : (s &= 255, s |= this.registers[t >> 1] & 65280), this.store16(t & 268435454, s);
};
k.prototype.store16 = function(t, s) {
  switch (t) {
    case this.DISPCNT:
      this.video.renderPath.writeDisplayControl(s);
      break;
    case this.DISPSTAT:
      s &= this.video.DISPSTAT_MASK, this.video.writeDisplayStat(s);
      break;
    case this.BG0CNT:
      this.video.renderPath.writeBackgroundControl(0, s);
      break;
    case this.BG1CNT:
      this.video.renderPath.writeBackgroundControl(1, s);
      break;
    case this.BG2CNT:
      this.video.renderPath.writeBackgroundControl(2, s);
      break;
    case this.BG3CNT:
      this.video.renderPath.writeBackgroundControl(3, s);
      break;
    case this.BG0HOFS:
      this.video.renderPath.writeBackgroundHOffset(0, s);
      break;
    case this.BG0VOFS:
      this.video.renderPath.writeBackgroundVOffset(0, s);
      break;
    case this.BG1HOFS:
      this.video.renderPath.writeBackgroundHOffset(1, s);
      break;
    case this.BG1VOFS:
      this.video.renderPath.writeBackgroundVOffset(1, s);
      break;
    case this.BG2HOFS:
      this.video.renderPath.writeBackgroundHOffset(2, s);
      break;
    case this.BG2VOFS:
      this.video.renderPath.writeBackgroundVOffset(2, s);
      break;
    case this.BG3HOFS:
      this.video.renderPath.writeBackgroundHOffset(3, s);
      break;
    case this.BG3VOFS:
      this.video.renderPath.writeBackgroundVOffset(3, s);
      break;
    case this.BG2X_LO:
      this.video.renderPath.writeBackgroundRefX(2, this.registers[t >> 1 | 1] << 16 | s);
      break;
    case this.BG2X_HI:
      this.video.renderPath.writeBackgroundRefX(2, this.registers[t >> 1 ^ 1] | s << 16);
      break;
    case this.BG2Y_LO:
      this.video.renderPath.writeBackgroundRefY(2, this.registers[t >> 1 | 1] << 16 | s);
      break;
    case this.BG2Y_HI:
      this.video.renderPath.writeBackgroundRefY(2, this.registers[t >> 1 ^ 1] | s << 16);
      break;
    case this.BG2PA:
      this.video.renderPath.writeBackgroundParamA(2, s);
      break;
    case this.BG2PB:
      this.video.renderPath.writeBackgroundParamB(2, s);
      break;
    case this.BG2PC:
      this.video.renderPath.writeBackgroundParamC(2, s);
      break;
    case this.BG2PD:
      this.video.renderPath.writeBackgroundParamD(2, s);
      break;
    case this.BG3X_LO:
      this.video.renderPath.writeBackgroundRefX(3, this.registers[t >> 1 | 1] << 16 | s);
      break;
    case this.BG3X_HI:
      this.video.renderPath.writeBackgroundRefX(3, this.registers[t >> 1 ^ 1] | s << 16);
      break;
    case this.BG3Y_LO:
      this.video.renderPath.writeBackgroundRefY(3, this.registers[t >> 1 | 1] << 16 | s);
      break;
    case this.BG3Y_HI:
      this.video.renderPath.writeBackgroundRefY(3, this.registers[t >> 1 ^ 1] | s << 16);
      break;
    case this.BG3PA:
      this.video.renderPath.writeBackgroundParamA(3, s);
      break;
    case this.BG3PB:
      this.video.renderPath.writeBackgroundParamB(3, s);
      break;
    case this.BG3PC:
      this.video.renderPath.writeBackgroundParamC(3, s);
      break;
    case this.BG3PD:
      this.video.renderPath.writeBackgroundParamD(3, s);
      break;
    case this.WIN0H:
      this.video.renderPath.writeWin0H(s);
      break;
    case this.WIN1H:
      this.video.renderPath.writeWin1H(s);
      break;
    case this.WIN0V:
      this.video.renderPath.writeWin0V(s);
      break;
    case this.WIN1V:
      this.video.renderPath.writeWin1V(s);
      break;
    case this.WININ:
      s &= 16191, this.video.renderPath.writeWinIn(s);
      break;
    case this.WINOUT:
      s &= 16191, this.video.renderPath.writeWinOut(s);
      break;
    case this.BLDCNT:
      s &= 32767, this.video.renderPath.writeBlendControl(s);
      break;
    case this.BLDALPHA:
      s &= 7967, this.video.renderPath.writeBlendAlpha(s);
      break;
    case this.BLDY:
      s &= 31, this.video.renderPath.writeBlendY(s);
      break;
    case this.MOSAIC:
      this.video.renderPath.writeMosaic(s);
      break;
    case this.SOUND1CNT_LO:
      s &= 127, this.audio.writeSquareChannelSweep(0, s);
      break;
    case this.SOUND1CNT_HI:
      this.audio.writeSquareChannelDLE(0, s);
      break;
    case this.SOUND1CNT_X:
      s &= 51199, this.audio.writeSquareChannelFC(0, s), s &= -32769;
      break;
    case this.SOUND2CNT_LO:
      this.audio.writeSquareChannelDLE(1, s);
      break;
    case this.SOUND2CNT_HI:
      s &= 51199, this.audio.writeSquareChannelFC(1, s), s &= -32769;
      break;
    case this.SOUND3CNT_LO:
      s &= 224, this.audio.writeChannel3Lo(s);
      break;
    case this.SOUND3CNT_HI:
      s &= 57599, this.audio.writeChannel3Hi(s);
      break;
    case this.SOUND3CNT_X:
      s &= 51199, this.audio.writeChannel3X(s), s &= -32769;
      break;
    case this.SOUND4CNT_LO:
      s &= 65343, this.audio.writeChannel4LE(s);
      break;
    case this.SOUND4CNT_HI:
      s &= 49407, this.audio.writeChannel4FC(s), s &= -32769;
      break;
    case this.SOUNDCNT_LO:
      s &= 65399, this.audio.writeSoundControlLo(s);
      break;
    case this.SOUNDCNT_HI:
      s &= 65295, this.audio.writeSoundControlHi(s);
      break;
    case this.SOUNDCNT_X:
      s &= 128, this.audio.writeEnable(s);
      break;
    case this.WAVE_RAM0_LO:
    case this.WAVE_RAM0_HI:
    case this.WAVE_RAM1_LO:
    case this.WAVE_RAM1_HI:
    case this.WAVE_RAM2_LO:
    case this.WAVE_RAM2_HI:
    case this.WAVE_RAM3_LO:
    case this.WAVE_RAM3_HI:
      this.audio.writeWaveData(t - this.WAVE_RAM0_LO, s, 2);
      break;
    case this.DMA0SAD_LO:
    case this.DMA0DAD_LO:
    case this.DMA1SAD_LO:
    case this.DMA1DAD_LO:
    case this.DMA2SAD_LO:
    case this.DMA2DAD_LO:
    case this.DMA3SAD_LO:
    case this.DMA3DAD_LO:
      this.store32(t, this.registers[(t >> 1) + 1] << 16 | s);
      return;
    case this.DMA0SAD_HI:
    case this.DMA0DAD_HI:
    case this.DMA1SAD_HI:
    case this.DMA1DAD_HI:
    case this.DMA2SAD_HI:
    case this.DMA2DAD_HI:
    case this.DMA3SAD_HI:
    case this.DMA3DAD_HI:
      this.store32(t - 2, this.registers[(t >> 1) - 1] | s << 16);
      return;
    case this.DMA0CNT_LO:
      this.cpu.irq.dmaSetWordCount(0, s);
      break;
    case this.DMA0CNT_HI:
      this.registers[t >> 1] = s & 65504, this.cpu.irq.dmaWriteControl(0, s);
      return;
    case this.DMA1CNT_LO:
      this.cpu.irq.dmaSetWordCount(1, s);
      break;
    case this.DMA1CNT_HI:
      this.registers[t >> 1] = s & 65504, this.cpu.irq.dmaWriteControl(1, s);
      return;
    case this.DMA2CNT_LO:
      this.cpu.irq.dmaSetWordCount(2, s);
      break;
    case this.DMA2CNT_HI:
      this.registers[t >> 1] = s & 65504, this.cpu.irq.dmaWriteControl(2, s);
      return;
    case this.DMA3CNT_LO:
      this.cpu.irq.dmaSetWordCount(3, s);
      break;
    case this.DMA3CNT_HI:
      this.registers[t >> 1] = s & 65504, this.cpu.irq.dmaWriteControl(3, s);
      return;
    case this.TM0CNT_LO:
      this.cpu.irq.timerSetReload(0, s);
      return;
    case this.TM1CNT_LO:
      this.cpu.irq.timerSetReload(1, s);
      return;
    case this.TM2CNT_LO:
      this.cpu.irq.timerSetReload(2, s);
      return;
    case this.TM3CNT_LO:
      this.cpu.irq.timerSetReload(3, s);
      return;
    case this.TM0CNT_HI:
      s &= 199, this.cpu.irq.timerWriteControl(0, s);
      break;
    case this.TM1CNT_HI:
      s &= 199, this.cpu.irq.timerWriteControl(1, s);
      break;
    case this.TM2CNT_HI:
      s &= 199, this.cpu.irq.timerWriteControl(2, s);
      break;
    case this.TM3CNT_HI:
      s &= 199, this.cpu.irq.timerWriteControl(3, s);
      break;
    case this.SIOMULTI0:
    case this.SIOMULTI1:
    case this.SIOMULTI2:
    case this.SIOMULTI3:
    case this.SIODATA8:
      this.STUB_REG("SIO", t);
      break;
    case this.RCNT:
      this.sio.setMode(s >> 12 & 12 | this.registers[this.SIOCNT >> 1] >> 12 & 3), this.sio.writeRCNT(s);
      break;
    case this.SIOCNT:
      this.sio.setMode(s >> 12 & 3 | this.registers[this.RCNT >> 1] >> 12 & 12), this.sio.writeSIOCNT(s);
      return;
    case this.JOYCNT:
    case this.JOYSTAT:
      this.STUB_REG("JOY", t);
      break;
    case this.IE:
      s &= 16383, this.cpu.irq.setInterruptsEnabled(s);
      break;
    case this.IF:
      this.cpu.irq.dismissIRQs(s);
      return;
    case this.WAITCNT:
      s &= 57343, this.cpu.mmu.adjustTimings(s);
      break;
    case this.IME:
      s &= 1, this.cpu.irq.masterEnable(s);
      break;
    default:
      this.STUB_REG("I/O", t);
  }
  this.registers[t >> 1] = s;
};
k.prototype.store32 = function(t, s) {
  switch (t) {
    case this.BG2X_LO:
      s &= 268435455, this.video.renderPath.writeBackgroundRefX(2, s);
      break;
    case this.BG2Y_LO:
      s &= 268435455, this.video.renderPath.writeBackgroundRefY(2, s);
      break;
    case this.BG3X_LO:
      s &= 268435455, this.video.renderPath.writeBackgroundRefX(3, s);
      break;
    case this.BG3Y_LO:
      s &= 268435455, this.video.renderPath.writeBackgroundRefY(3, s);
      break;
    case this.DMA0SAD_LO:
      this.cpu.irq.dmaSetSourceAddress(0, s);
      break;
    case this.DMA0DAD_LO:
      this.cpu.irq.dmaSetDestAddress(0, s);
      break;
    case this.DMA1SAD_LO:
      this.cpu.irq.dmaSetSourceAddress(1, s);
      break;
    case this.DMA1DAD_LO:
      this.cpu.irq.dmaSetDestAddress(1, s);
      break;
    case this.DMA2SAD_LO:
      this.cpu.irq.dmaSetSourceAddress(2, s);
      break;
    case this.DMA2DAD_LO:
      this.cpu.irq.dmaSetDestAddress(2, s);
      break;
    case this.DMA3SAD_LO:
      this.cpu.irq.dmaSetSourceAddress(3, s);
      break;
    case this.DMA3DAD_LO:
      this.cpu.irq.dmaSetDestAddress(3, s);
      break;
    case this.FIFO_A_LO:
      this.audio.appendToFifoA(s);
      return;
    case this.FIFO_B_LO:
      this.audio.appendToFifoB(s);
      return;
    case this.IME:
      this.store16(t, s & 65535);
      return;
    case this.JOY_RECV:
    case this.JOY_TRANS:
      this.STUB_REG("JOY", t);
      return;
    default:
      this.store16(t, s & 65535), this.store16(t | 2, s >>> 16);
      return;
  }
  this.registers[t >> 1] = s & 65535, this.registers[(t >> 1) + 1] = s >>> 16;
};
k.prototype.invalidatePage = function(t) {
};
k.prototype.STUB_REG = function(t, s) {
  this.core.STUB("Unimplemented " + t + " register write: " + s.toString(16));
};
function b() {
  if (globalThis.AudioContext = globalThis.AudioContext || globalThis.webkitAudioContext, globalThis.AudioContext) {
    var t = this;
    this.context = new AudioContext(), this.bufferSize = 0, this.bufferSize = 4096, this.maxSamples = this.bufferSize << 2, this.buffers = [new Float32Array(this.maxSamples), new Float32Array(this.maxSamples)], this.sampleMask = this.maxSamples - 1, this.context.createScriptProcessor ? this.jsAudio = this.context.createScriptProcessor(this.bufferSize) : this.jsAudio = this.context.createJavaScriptNode(this.bufferSize), this.jsAudio.onaudioprocess = function(s) {
      t.audioProcess(s);
    };
  } else
    this.context = null;
  this.masterEnable = !0, this.masterVolume = 1, this.SOUND_MAX = 1024, this.FIFO_MAX = 512, this.PSG_MAX = 128;
}
b.prototype.clear = function() {
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
b.prototype.freeze = function() {
  return {
    nextSample: this.nextSample
  };
};
b.prototype.defrost = function(t) {
  this.nextSample = t.nextSample;
};
b.prototype.pause = function(t) {
  if (this.context)
    if (t)
      try {
        this.jsAudio.disconnect(this.context.destination);
      } catch {
      }
    else this.enabled && this.jsAudio.connect(this.context.destination);
};
b.prototype.updateTimers = function() {
  var t = this.cpu.cycles;
  if (!(!this.enabled || t < this.nextEvent && t < this.nextSample)) {
    if (t >= this.nextEvent) {
      var s = this.squareChannels[0];
      if (this.nextEvent = 1 / 0, s.playing && this.updateSquareChannel(s, t), s = this.squareChannels[1], s.playing && this.updateSquareChannel(s, t), this.enableChannel3 && this.playingChannel3) {
        if (t >= this.channel3Next) {
          if (this.channel3Write) {
            var e = this.waveData[this.channel3Pointer >> 1];
            this.channel3Sample = ((e >> ((this.channel3Pointer & 1) << 2) & 15) - 8) / 8, this.channel3Pointer = this.channel3Pointer + 1, this.channel3Dimension && this.channel3Pointer >= 64 ? this.channel3Pointer -= 64 : !this.channel3Bank && this.channel3Pointer >= 32 ? this.channel3Pointer -= 32 : this.channel3Pointer >= 64 && (this.channel3Pointer -= 32);
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
            var e = this.channel4.lfsr & 1;
            this.channel4.lfsr |= (this.channel4.lfsr >> 1 & 1 ^ e) << this.channel4.width - 1, this.channel4.next += this.channel4.interval, this.channel4.sample = (e - 0.5) * 2 * this.channel4.volume;
          }
          this.updateEnvelope(this.channel4, t), this.nextEvent > this.channel4.next && (this.nextEvent = this.channel4.next), this.channel4.timed && this.nextEvent > this.channel4.end && (this.nextEvent = this.channel4.end);
        }
    }
    t >= this.nextSample && (this.sample(), this.nextSample += this.sampleInterval), this.nextEvent = Math.ceil(this.nextEvent), (this.nextEvent < t || this.nextSample < t) && this.updateTimers();
  }
};
b.prototype.writeEnable = function(t) {
  if (this.enabled = !!t, this.nextEvent = this.cpu.cycles, this.nextSample = this.nextEvent, this.updateTimers(), this.core.irq.pollNextEvent(), this.context)
    if (t)
      this.jsAudio.connect(this.context.destination);
    else
      try {
        this.jsAudio.disconnect(this.context.destination);
      } catch {
      }
};
b.prototype.writeSoundControlLo = function(t) {
  this.masterVolumeLeft = t & 7, this.masterVolumeRight = t >> 4 & 7, this.enabledLeft = t >> 8 & 15, this.enabledRight = t >> 12 & 15, this.setSquareChannelEnabled(this.squareChannels[0], (this.enabledLeft | this.enabledRight) & 1), this.setSquareChannelEnabled(this.squareChannels[1], (this.enabledLeft | this.enabledRight) & 2), this.enableChannel3 = (this.enabledLeft | this.enabledRight) & 4, this.setChannel4Enabled((this.enabledLeft | this.enabledRight) & 8), this.updateTimers(), this.core.irq.pollNextEvent();
};
b.prototype.writeSoundControlHi = function(t) {
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
b.prototype.resetSquareChannel = function(t) {
  t.step && (t.nextStep = this.cpu.cycles + t.step), t.enabled && !t.playing && (t.raise = this.cpu.cycles, t.lower = t.raise + t.duty * t.interval, t.end = this.cpu.cycles + t.length, this.nextEvent = this.cpu.cycles), t.playing = t.enabled, this.updateTimers(), this.core.irq.pollNextEvent();
};
b.prototype.setSquareChannelEnabled = function(t, s) {
  !(t.enabled && t.playing) && s ? (t.enabled = !!s, this.updateTimers(), this.core.irq.pollNextEvent()) : t.enabled = !!s;
};
b.prototype.writeSquareChannelSweep = function(t, s) {
  var e = this.squareChannels[t];
  e.sweepSteps = s & 7, e.sweepIncrement = s & 8 ? -1 : 1, e.sweepInterval = (s >> 4 & 7) * this.cpuFrequency / 128, e.doSweep = !!e.sweepInterval, e.nextSweep = this.cpu.cycles + e.sweepInterval, this.resetSquareChannel(e);
};
b.prototype.writeSquareChannelDLE = function(t, s) {
  var e = this.squareChannels[t], i = s >> 6 & 3;
  switch (i) {
    case 0:
      e.duty = 0.125;
      break;
    case 1:
      e.duty = 0.25;
      break;
    case 2:
      e.duty = 0.5;
      break;
    case 3:
      e.duty = 0.75;
      break;
  }
  this.writeChannelLE(e, s), this.resetSquareChannel(e);
};
b.prototype.writeSquareChannelFC = function(t, s) {
  var e = this.squareChannels[t], i = s & 2047;
  e.frequency = i, e.interval = this.cpuFrequency * (2048 - i) / 131072, e.timed = !!(s & 16384), s & 32768 && (this.resetSquareChannel(e), e.volume = e.initialVolume);
};
b.prototype.updateSquareChannel = function(t, s) {
  if (t.timed && s >= t.end) {
    t.playing = !1;
    return;
  }
  if (t.doSweep && s >= t.nextSweep) {
    if (t.frequency += t.sweepIncrement * (t.frequency >> t.sweepSteps), t.frequency < 0)
      t.frequency = 0;
    else if (t.frequency > 2047) {
      t.frequency = 2047, t.playing = !1;
      return;
    }
    t.interval = this.cpuFrequency * (2048 - t.frequency) / 131072, t.nextSweep += t.sweepInterval;
  }
  s >= t.raise ? (t.sample = t.volume, t.lower = t.raise + t.duty * t.interval, t.raise += t.interval) : s >= t.lower && (t.sample = -t.volume, t.lower += t.interval), this.updateEnvelope(t, s), this.nextEvent > t.raise && (this.nextEvent = t.raise), this.nextEvent > t.lower && (this.nextEvent = t.lower), t.timed && this.nextEvent > t.end && (this.nextEvent = t.end), t.doSweep && this.nextEvent > t.nextSweep && (this.nextEvent = t.nextSweep);
};
b.prototype.writeChannel3Lo = function(t) {
  this.channel3Dimension = t & 32, this.channel3Bank = t & 64;
  var s = t & 128;
  !this.channel3Write && s ? (this.channel3Write = s, this.resetChannel3()) : this.channel3Write = s;
};
b.prototype.writeChannel3Hi = function(t) {
  this.channel3Length = this.cpuFrequency * (256 - (t & 255)) / 256;
  var s = t >> 13 & 7;
  switch (s) {
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
b.prototype.writeChannel3X = function(t) {
  this.channel3Interval = this.cpuFrequency * (2048 - (t & 2047)) / 2097152, this.channel3Timed = !!(t & 16384), this.channel3Write && this.resetChannel3();
};
b.prototype.resetChannel3 = function() {
  this.channel3Next = this.cpu.cycles, this.nextEvent = this.channel3Next, this.channel3End = this.cpu.cycles + this.channel3Length, this.playingChannel3 = this.channel3Write, this.updateTimers(), this.core.irq.pollNextEvent();
};
b.prototype.writeWaveData = function(t, s, e) {
  this.channel3Bank || (t += 16), e == 2 && (this.waveData[t] = s & 255, s >>= 8, ++t), this.waveData[t] = s & 255;
};
b.prototype.setChannel4Enabled = function(t) {
  !this.enableChannel4 && t ? (this.channel4.next = this.cpu.cycles, this.channel4.end = this.cpu.cycles + this.channel4.length, this.enableChannel4 = !0, this.playingChannel4 = !0, this.nextEvent = this.cpu.cycles, this.updateEnvelope(this.channel4), this.updateTimers(), this.core.irq.pollNextEvent()) : this.enableChannel4 = t;
};
b.prototype.writeChannel4LE = function(t) {
  this.writeChannelLE(this.channel4, t), this.resetChannel4();
};
b.prototype.writeChannel4FC = function(t) {
  this.channel4.timed = !!(t & 16384);
  var s = t & 7;
  s || (s = 0.5);
  var e = t >> 4 & 15, i = this.cpuFrequency * (s * (2 << e)) / 524288;
  i != this.channel4.interval && (this.channel4.interval = i, this.resetChannel4());
  var r = t & 8 ? 7 : 15;
  r != this.channel4.width && (this.channel4.width = r, this.resetChannel4()), t & 32768 && this.resetChannel4();
};
b.prototype.resetChannel4 = function() {
  this.channel4.width == 15 ? this.channel4.lfsr = 16384 : this.channel4.lfsr = 64, this.channel4.volume = this.channel4.initialVolume, this.channel4.step && (this.channel4.nextStep = this.cpu.cycles + this.channel4.step), this.channel4.end = this.cpu.cycles + this.channel4.length, this.channel4.next = this.cpu.cycles, this.nextEvent = this.channel4.next, this.playingChannel4 = this.enableChannel4, this.updateTimers(), this.core.irq.pollNextEvent();
};
b.prototype.writeChannelLE = function(t, s) {
  t.length = this.cpuFrequency * ((64 - (s & 63)) / 256), s & 2048 ? t.increment = 1 / 16 : t.increment = -1 / 16, t.initialVolume = (s >> 12 & 15) / 16, t.step = this.cpuFrequency * ((s >> 8 & 7) / 64);
};
b.prototype.updateEnvelope = function(t, s) {
  t.step && (s >= t.nextStep && (t.volume += t.increment, t.volume > 1 ? t.volume = 1 : t.volume < 0 && (t.volume = 0), t.nextStep += t.step), this.nextEvent > t.nextStep && (this.nextEvent = t.nextStep));
};
b.prototype.appendToFifoA = function(t) {
  var s;
  this.fifoA.length > 28 && (this.fifoA = this.fifoA.slice(-28));
  for (var e = 0; e < 4; ++e)
    s = (t & 255) << 24, t >>= 8, this.fifoA.push(s / 2147483648);
};
b.prototype.appendToFifoB = function(t) {
  var s;
  this.fifoB.length > 28 && (this.fifoB = this.fifoB.slice(-28));
  for (var e = 0; e < 4; ++e)
    s = (t & 255) << 24, t >>= 8, this.fifoB.push(s / 2147483648);
};
b.prototype.sampleFifoA = function() {
  if (this.fifoA.length <= 16) {
    var t = this.core.irq.dma[this.dmaA];
    t.nextCount = 4, this.core.mmu.serviceDma(this.dmaA, t);
  }
  this.fifoASample = this.fifoA.shift();
};
b.prototype.sampleFifoB = function() {
  if (this.fifoB.length <= 16) {
    var t = this.core.irq.dma[this.dmaB];
    t.nextCount = 4, this.core.mmu.serviceDma(this.dmaB, t);
  }
  this.fifoBSample = this.fifoB.shift();
};
b.prototype.scheduleFIFODma = function(t, s) {
  switch (s.dest) {
    case this.cpu.mmu.BASE_IO | this.cpu.irq.io.FIFO_A_LO:
      s.dstControl = 2, this.dmaA = t;
      break;
    case this.cpu.mmu.BASE_IO | this.cpu.irq.io.FIFO_B_LO:
      s.dstControl = 2, this.dmaB = t;
      break;
    default:
      this.core.WARN("Tried to schedule FIFO DMA for non-FIFO destination");
      break;
  }
};
b.prototype.sample = function() {
  var t = 0, s = 0, e, i;
  i = this.squareChannels[0], i.playing && (e = i.sample * this.soundRatio * this.PSG_MAX, this.enabledLeft & 1 && (t += e), this.enabledRight & 1 && (s += e)), i = this.squareChannels[1], i.playing && (e = i.sample * this.soundRatio * this.PSG_MAX, this.enabledLeft & 2 && (t += e), this.enabledRight & 2 && (s += e)), this.playingChannel3 && (e = this.channel3Sample * this.soundRatio * this.channel3Volume * this.PSG_MAX, this.enabledLeft & 4 && (t += e), this.enabledRight & 4 && (s += e)), this.playingChannel4 && (e = this.channel4.sample * this.soundRatio * this.PSG_MAX, this.enabledLeft & 8 && (t += e), this.enabledRight & 8 && (s += e)), this.enableChannelA && (e = this.fifoASample * this.FIFO_MAX * this.ratioChannelA, this.enableLeftChannelA && (t += e), this.enableRightChannelA && (s += e)), this.enableChannelB && (e = this.fifoBSample * this.FIFO_MAX * this.ratioChannelB, this.enableLeftChannelB && (t += e), this.enableRightChannelB && (s += e));
  var r = this.samplePointer;
  t *= this.masterVolume / this.SOUND_MAX, t = Math.max(Math.min(t, 1), -1), s *= this.masterVolume / this.SOUND_MAX, s = Math.max(Math.min(s, 1), -1), this.buffers && (this.buffers[0][r] = t, this.buffers[1][r] = s), this.samplePointer = r + 1 & this.sampleMask;
};
b.prototype.audioProcess = function(t) {
  var s = t.outputBuffer.getChannelData(0), e = t.outputBuffer.getChannelData(1);
  if (this.masterEnable) {
    var i, r = this.outputPointer;
    for (i = 0; i < this.bufferSize; ++i, r += this.resampleRatio) {
      if (r >= this.maxSamples && (r -= this.maxSamples), (r | 0) == this.samplePointer) {
        ++this.backup;
        break;
      }
      s[i] = this.buffers[0][r | 0], e[i] = this.buffers[1][r | 0];
    }
    for (; i < this.bufferSize; ++i)
      s[i] = 0, e[i] = 0;
    this.outputPointer = r, ++this.totalSamples;
  } else
    for (i = 0; i < this.bufferSize; ++i)
      s[i] = 0, e[i] = 0;
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
  var s = t >> 1;
  return t & 1 ? (this.buffer[s] & 65280) >>> 8 : this.buffer[s] & 255;
};
L.prototype.loadU16 = function(t) {
  return this.buffer[t >> 1];
};
L.prototype.load32 = function(t) {
  return this.buffer[t >> 1 & -2] | this.buffer[t >> 1 | 1] << 16;
};
L.prototype.store8 = function(t, s) {
  this.store16(t, s << 8 | s);
};
L.prototype.store16 = function(t, s) {
  this.buffer[t >> 1] = s;
};
L.prototype.store32 = function(t, s) {
  var e = t >> 1;
  this.store16(t, this.buffer[e] = s & 65535), this.store16(t + 2, this.buffer[e + 1] = s >>> 16);
};
L.prototype.insert = function(t, s) {
  this.buffer.set(s, t);
};
L.prototype.invalidatePage = function(t) {
};
function nt(t) {
  L.call(this, t), this.vram = this.buffer;
}
nt.prototype = Object.create(L.prototype);
function it(t) {
  L.call(this, t), this.oam = this.buffer, this.objs = new Array(128);
  for (var s = 0; s < 128; ++s)
    this.objs[s] = new rt(this, s);
  this.scalerot = new Array(32);
  for (var s = 0; s < 32; ++s)
    this.scalerot[s] = {
      a: 1,
      b: 0,
      c: 0,
      d: 1
    };
}
it.prototype = Object.create(L.prototype);
it.prototype.overwrite = function(t) {
  for (var s = 0; s < this.buffer.byteLength >> 1; ++s)
    this.store16(s << 1, t[s]);
};
it.prototype.store16 = function(t, s) {
  var e = (t & 1016) >> 3, i = this.objs[e], r = this.scalerot[e >> 2];
  switch (i.priority, i.disable, i.y, t & 6) {
    case 0:
      i.y = s & 255;
      var a = i.scalerot;
      i.scalerot = s & 256, i.scalerot ? (i.scalerotOam = this.scalerot[i.scalerotParam], i.doublesize = !!(s & 512), i.disable = 0, i.hflip = 0, i.vflip = 0) : (i.doublesize = !1, i.disable = s & 512, a && (i.hflip = i.scalerotParam & 8, i.vflip = i.scalerotParam & 16)), i.mode = (s & 3072) >> 6, i.mosaic = s & 4096, i.multipalette = s & 8192, i.shape = (s & 49152) >> 14, i.recalcSize();
      break;
    case 2:
      i.x = s & 511, i.scalerot ? (i.scalerotParam = (s & 15872) >> 9, i.scalerotOam = this.scalerot[i.scalerotParam], i.hflip = 0, i.vflip = 0, i.drawScanline = i.drawScanlineAffine) : (i.hflip = s & 4096, i.vflip = s & 8192, i.drawScanline = i.drawScanlineNormal), i.size = (s & 49152) >> 14, i.recalcSize();
      break;
    case 4:
      i.tileBase = s & 1023, i.priority = (s & 3072) >> 10, i.palette = (s & 61440) >> 8;
      break;
    case 6:
      switch (e & 3) {
        case 0:
          r.a = (s << 16) / 16777216;
          break;
        case 1:
          r.b = (s << 16) / 16777216;
          break;
        case 2:
          r.c = (s << 16) / 16777216;
          break;
        case 3:
          r.d = (s << 16) / 16777216;
          break;
      }
      break;
  }
  L.prototype.store16.call(this, t, s);
};
function T() {
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
T.prototype.overwrite = function(t) {
  for (var s = 0; s < 512; ++s)
    this.store16(s << 1, t[s]);
};
T.prototype.loadU8 = function(t) {
  return this.loadU16(t) >> 8 * (t & 1) & 255;
};
T.prototype.loadU16 = function(t) {
  return this.colors[(t & 512) >> 9][(t & 511) >> 1];
};
T.prototype.load16 = function(t) {
  return this.loadU16(t) << 16 >> 16;
};
T.prototype.load32 = function(t) {
  return this.loadU16(t) | this.loadU16(t + 2) << 16;
};
T.prototype.store16 = function(t, s) {
  var e = (t & 512) >> 9, i = (t & 511) >> 1;
  this.colors[e][i] = s, this.adjustedColors[e][i] = this.adjustColor(s);
};
T.prototype.store32 = function(t, s) {
  this.store16(t, s & 65535), this.store16(t + 2, s >> 16);
};
T.prototype.invalidatePage = function(t) {
};
T.prototype.convert16To32 = function(t, s) {
  var e = (t & 31) << 3, i = (t & 992) >> 2, r = (t & 31744) >> 7;
  s[0] = e, s[1] = i, s[2] = r;
};
T.prototype.mix = function(t, s, e, i) {
  var r = s & 31, a = (s & 992) >> 5, h = (s & 31744) >> 10, n = i & 31, o = (i & 992) >> 5, u = (i & 31744) >> 10, c = Math.min(t * r + e * n, 31), p = Math.min(t * a + e * o, 31), d = Math.min(t * h + e * u, 31);
  return c | p << 5 | d << 10;
};
T.prototype.makeDarkPalettes = function(t) {
  this.adjustColor != this.adjustColorDark && (this.adjustColor = this.adjustColorDark, this.resetPalettes()), this.resetPaletteLayers(t);
};
T.prototype.makeBrightPalettes = function(t) {
  this.adjustColor != this.adjustColorBright && (this.adjustColor = this.adjustColorBright, this.resetPalettes()), this.resetPaletteLayers(t);
};
T.prototype.makeNormalPalettes = function() {
  this.passthroughColors[0] = this.colors[0], this.passthroughColors[1] = this.colors[0], this.passthroughColors[2] = this.colors[0], this.passthroughColors[3] = this.colors[0], this.passthroughColors[4] = this.colors[1], this.passthroughColors[5] = this.colors[0];
};
T.prototype.makeSpecialPalette = function(t) {
  this.passthroughColors[t] = this.adjustedColors[t == 4 ? 1 : 0];
};
T.prototype.makeNormalPalette = function(t) {
  this.passthroughColors[t] = this.colors[t == 4 ? 1 : 0];
};
T.prototype.resetPaletteLayers = function(t) {
  t & 1 ? this.passthroughColors[0] = this.adjustedColors[0] : this.passthroughColors[0] = this.colors[0], t & 2 ? this.passthroughColors[1] = this.adjustedColors[0] : this.passthroughColors[1] = this.colors[0], t & 4 ? this.passthroughColors[2] = this.adjustedColors[0] : this.passthroughColors[2] = this.colors[0], t & 8 ? this.passthroughColors[3] = this.adjustedColors[0] : this.passthroughColors[3] = this.colors[0], t & 16 ? this.passthroughColors[4] = this.adjustedColors[1] : this.passthroughColors[4] = this.colors[1], t & 32 ? this.passthroughColors[5] = this.adjustedColors[0] : this.passthroughColors[5] = this.colors[0];
};
T.prototype.resetPalettes = function() {
  var t, s = this.adjustedColors[0], e = this.colors[0];
  for (t = 0; t < 256; ++t)
    s[t] = this.adjustColor(e[t]);
  for (s = this.adjustedColors[1], e = this.colors[1], t = 0; t < 256; ++t)
    s[t] = this.adjustColor(e[t]);
};
T.prototype.accessColor = function(t, s) {
  return this.passthroughColors[t][s];
};
T.prototype.adjustColorDark = function(t) {
  var s = t & 31, e = (t & 992) >> 5, i = (t & 31744) >> 10;
  return s = s - s * this.blendY, e = e - e * this.blendY, i = i - i * this.blendY, s | e << 5 | i << 10;
};
T.prototype.adjustColorBright = function(t) {
  var s = t & 31, e = (t & 992) >> 5, i = (t & 31744) >> 10;
  return s = s + (31 - s) * this.blendY, e = e + (31 - e) * this.blendY, i = i + (31 - i) * this.blendY, s | e << 5 | i << 10;
};
T.prototype.adjustColor = T.prototype.adjustColorBright;
T.prototype.setBlendY = function(t) {
  this.blendY != t && (this.blendY = t, this.resetPalettes());
};
function rt(t, s) {
  this.TILE_OFFSET = 65536, this.oam = t, this.index = s, this.x = 0, this.y = 0, this.scalerot = 0, this.doublesize = !1, this.disable = 1, this.mode = 0, this.mosaic = !1, this.multipalette = !1, this.shape = 0, this.scalerotParam = 0, this.hflip = 0, this.vflip = 0, this.tileBase = 0, this.priority = 0, this.palette = 0, this.drawScanline = this.drawScanlineNormal, this.pushPixel = A.pushPixel, this.cachedWidth = 8, this.cachedHeight = 8;
}
rt.prototype.drawScanlineNormal = function(t, s, e, i, r) {
  var a = this.oam.video, h, n, o, u = this.mode | a.target2[a.LAYER_OBJ] | this.priority << 1;
  this.mode == 16 && (u |= a.TARGET1_MASK), a.blendMode == 1 && a.alphaEnabled && (u |= a.target1[a.LAYER_OBJ]);
  var c = this.cachedWidth;
  this.x < a.HORIZONTAL_PIXELS ? (this.x < i ? (n = i - this.x, o = i) : (n = 0, o = this.x), r < this.cachedWidth + this.x && (c = r - this.x)) : (n = i + 512 - this.x, o = i, r < this.cachedWidth - n && (c = r));
  var p, d;
  this.vflip ? d = this.cachedHeight - s + e - 1 : d = s - e;
  var l = d & 7, x, m, v = this.multipalette ? 1 : 0;
  a.objCharacterMapping ? m = (d & 504) * this.cachedWidth >> 6 : m = (d & 504) << 2 - v, this.mosaic && (x = a.objMosaicX - 1 - (a.objMosaicX + o - 1) % a.objMosaicX, o += x, n += x), this.hflip ? p = this.cachedWidth - n - 1 : p = n;
  var E = a.accessTile(this.TILE_OFFSET + (h & 4) * v, this.tileBase + (m << v) + ((p & 504) >> 3 - v), l << v);
  for (h = n; h < c; ++h)
    x = this.mosaic ? o % a.objMosaicX : 0, this.hflip ? p = this.cachedWidth - (h - x) - 1 : p = h - x, v ? (!(h & 3) || this.mosaic && !x) && (E = a.accessTile(this.TILE_OFFSET + (p & 4), this.tileBase + (m << 1) + ((p & 504) >> 2), l << 1)) : (!(h & 7) || this.mosaic && !x) && (E = a.accessTile(this.TILE_OFFSET, this.tileBase + m + (p >> 3), l)), this.pushPixel(a.LAYER_OBJ, this, a, E, p & 7, o, t, u, !1), o++;
};
rt.prototype.drawScanlineAffine = function(t, s, e, i, r) {
  var a = this.oam.video, h, n, o, u = this.mode | a.target2[a.LAYER_OBJ] | this.priority << 1;
  this.mode == 16 && (u |= a.TARGET1_MASK), a.blendMode == 1 && a.alphaEnabled && (u |= a.target1[a.LAYER_OBJ]);
  var c, p, d = s - e, l, x, m = this.multipalette ? 1 : 0, v = this.cachedWidth << this.doublesize, E = this.cachedHeight << this.doublesize, _ = v;
  for (_ > a.HORIZONTAL_PIXELS && (v = a.HORIZONTAL_PIXELS), this.x < a.HORIZONTAL_PIXELS ? (this.x < i ? (n = i - this.x, o = i) : (n = 0, o = this.x), r < _ + this.x && (_ = r - this.x)) : (n = i + 512 - this.x, o = i, r < _ - n && (_ = r)), h = n; h < _; ++h) {
    if (c = this.scalerotOam.a * (h - (v >> 1)) + this.scalerotOam.b * (d - (E >> 1)) + (this.cachedWidth >> 1), p = this.scalerotOam.c * (h - (v >> 1)) + this.scalerotOam.d * (d - (E >> 1)) + (this.cachedHeight >> 1), this.mosaic && (c -= h % a.objMosaicX * this.scalerotOam.a + s % a.objMosaicY * this.scalerotOam.b, p -= h % a.objMosaicX * this.scalerotOam.c + s % a.objMosaicY * this.scalerotOam.d), c < 0 || c >= this.cachedWidth || p < 0 || p >= this.cachedHeight) {
      o++;
      continue;
    }
    a.objCharacterMapping ? l = (p & 504) * this.cachedWidth >> 6 : l = (p & 504) << 2 - m, x = a.accessTile(this.TILE_OFFSET + (c & 4) * m, this.tileBase + (l << m) + ((c & 504) >> 3 - m), (p & 7) << m), this.pushPixel(a.LAYER_OBJ, this, a, x, c & 7, o, t, u, !1), o++;
  }
};
rt.prototype.recalcSize = function() {
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
function z(t, s) {
  this.video = t, this.bg = !1, this.index = t.LAYER_OBJ, this.priority = s, this.enabled = !1, this.objwin = 0;
}
z.prototype.drawScanline = function(t, s, e, i) {
  var r = this.video.vcount, a, h, n;
  if (!(e >= i)) {
    for (var o = this.video.oam.objs, u = 0; u < o.length; ++u)
      if (n = o[u], !n.disable && (n.mode & this.video.OBJWIN_MASK) == this.objwin && !(!(n.mode & this.video.OBJWIN_MASK) && this.priority != n.priority)) {
        n.y < this.video.VERTICAL_PIXELS ? a = n.y : a = n.y - 256;
        var c;
        n.scalerot ? c = n.cachedHeight << n.doublesize : c = n.cachedHeight, n.mosaic ? h = r - r % this.video.objMosaicY : h = r, a <= r && a + c > r && n.drawScanline(t, h, a, e, i);
      }
  }
};
z.prototype.objComparator = function(t, s) {
  return t.index - s.index;
};
function A() {
  this.LAYER_BG0 = 0, this.LAYER_BG1 = 1, this.LAYER_BG2 = 2, this.LAYER_BG3 = 3, this.LAYER_OBJ = 4, this.LAYER_BACKDROP = 5, this.HORIZONTAL_PIXELS = 240, this.VERTICAL_PIXELS = 160, this.LAYER_MASK = 6, this.BACKGROUND_MASK = 1, this.TARGET2_MASK = 8, this.TARGET1_MASK = 16, this.OBJWIN_MASK = 32, this.WRITTEN_MASK = 128, this.PRIORITY_MASK = this.LAYER_MASK | this.BACKGROUND_MASK, this.drawBackdrop = new function(t) {
    this.bg = !0, this.priority = -1, this.index = t.LAYER_BACKDROP, this.enabled = !0, this.drawScanline = function(s, e, i, r) {
      for (var a = i; a < r; ++a)
        s.stencil[a] & t.WRITTEN_MASK ? s.stencil[a] & t.TARGET1_MASK && (s.color[a] = t.palette.mix(t.blendB, t.palette.accessColor(this.index, 0), t.blendA, s.color[a]), s.stencil[a] = t.WRITTEN_MASK) : (s.color[a] = t.palette.accessColor(this.index, 0), s.stencil[a] = t.WRITTEN_MASK);
    };
  }(this);
}
A.prototype.clear = function(t) {
  this.palette = new T(), this.vram = new nt(t.SIZE_VRAM), this.oam = new it(t.SIZE_OAM), this.oam.video = this, this.objLayers = [
    new z(this, 0),
    new z(this, 1),
    new z(this, 2),
    new z(this, 3)
  ], this.objwinLayer = new z(this, 4), this.objwinLayer.objwin = this.OBJWIN_MASK, this.backgroundMode = 0, this.displayFrameSelect = 0, this.hblankIntervalFree = 0, this.objCharacterMapping = 0, this.forcedBlank = 1, this.win0 = 0, this.win1 = 0, this.objwin = 0, this.vcount = -1, this.win0Left = 0, this.win0Right = 240, this.win1Left = 0, this.win1Right = 240, this.win0Top = 0, this.win0Bottom = 160, this.win1Top = 0, this.win1Bottom = 160, this.windows = new Array();
  for (var s = 0; s < 4; ++s)
    this.windows.push({
      enabled: [!1, !1, !1, !1, !1, !0],
      special: 0
    });
  this.target1 = new Array(5), this.target2 = new Array(5), this.blendMode = 0, this.blendA = 0, this.blendB = 0, this.blendY = 0, this.bgMosaicX = 1, this.bgMosaicY = 1, this.objMosaicX = 1, this.objMosaicY = 1, this.lastHblank = 0, this.nextHblank = this.HDRAW_LENGTH, this.nextEvent = this.nextHblank, this.nextHblankIRQ = 0, this.nextVblankIRQ = 0, this.nextVcounterIRQ = 0, this.bg = new Array();
  for (var s = 0; s < 4; ++s)
    this.bg.push({
      bg: !0,
      index: s,
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
A.prototype.clearSubsets = function(t, s) {
  s & 4 && this.palette.overwrite(new Uint16Array(t.SIZE_PALETTE >> 1)), s & 8 && this.vram.insert(0, new Uint16Array(t.SIZE_VRAM >> 1)), s & 16 && (this.oam.overwrite(new Uint16Array(t.SIZE_OAM >> 1)), this.oam.video = this);
};
A.prototype.freeze = function() {
  for (var t = new Array(512), s = 0; s < 256; ++s)
    t[s] = this.palette.colors[0][s], t[s + 256] = this.palette.colors[1][s];
  for (var e = new Array(this.vram.buffer.length), s = 0; s < this.vram.buffer.length; ++s)
    e[s] = this.vram.buffer[s];
  for (var i = new Array(this.oam.buffer.length), s = 0; s < this.oam.buffer.length; ++s)
    i[s] = this.oam.buffer[s];
  return console.log("[freeze] palette", t.length, "vram", e.length, "oam", i.length), {
    palette: t,
    vram: e,
    oam: i
  };
};
A.prototype.defrost = function(t) {
  console.log("[defrost] frost keys", Object.keys(t || {})), t && t.palette && (console.log("[defrost] restoring palette", t.palette.length), this.palette.overwrite(new Uint16Array(t.palette))), t && t.vram && (console.log("[defrost] restoring vram", t.vram.length), this.vram.insert(0, new Uint16Array(t.vram))), t && t.oam && (console.log("[defrost] restoring oam", t.oam.length), this.oam.overwrite(new Uint16Array(t.oam)));
};
A.prototype.setBacking = function(t) {
  this.pixelData = t;
  for (var s = 0; s < this.HORIZONTAL_PIXELS * this.VERTICAL_PIXELS * 4; )
    this.pixelData.data[s++] = 255, this.pixelData.data[s++] = 255, this.pixelData.data[s++] = 255, this.pixelData.data[s++] = 255;
};
A.prototype.writeDisplayControl = function(t) {
  this.backgroundMode = t & 7, this.displayFrameSelect = t & 16, this.hblankIntervalFree = t & 32, this.objCharacterMapping = t & 64, this.forcedBlank = t & 128, this.bg[0].enabled = t & 256, this.bg[1].enabled = t & 512, this.bg[2].enabled = t & 1024, this.bg[3].enabled = t & 2048, this.objLayers[0].enabled = t & 4096, this.objLayers[1].enabled = t & 4096, this.objLayers[2].enabled = t & 4096, this.objLayers[3].enabled = t & 4096, this.win0 = t & 8192, this.win1 = t & 16384, this.objwin = t & 32768, this.objwinLayer.enabled = t & 4096 && t & 32768, this.bg[2].multipalette &= -2, this.bg[3].multipalette &= -2, this.backgroundMode > 0 && (this.bg[2].multipalette |= 1), this.backgroundMode == 2 && (this.bg[3].multipalette |= 1), this.resetLayers();
};
A.prototype.writeBackgroundControl = function(t, s) {
  var e = this.bg[t];
  e.priority = s & 3, e.charBase = (s & 12) << 12, e.mosaic = s & 64, e.multipalette &= -129, (t < 2 || this.backgroundMode == 0) && (e.multipalette |= s & 128), e.screenBase = (s & 7936) << 3, e.overflow = s & 8192, e.size = (s & 49152) >> 14, this.drawLayers.sort(this.layerComparator);
};
A.prototype.writeBackgroundHOffset = function(t, s) {
  this.bg[t].x = s & 511;
};
A.prototype.writeBackgroundVOffset = function(t, s) {
  this.bg[t].y = s & 511;
};
A.prototype.writeBackgroundRefX = function(t, s) {
  this.bg[t].refx = (s << 4) / 4096, this.bg[t].sx = this.bg[t].refx;
};
A.prototype.writeBackgroundRefY = function(t, s) {
  this.bg[t].refy = (s << 4) / 4096, this.bg[t].sy = this.bg[t].refy;
};
A.prototype.writeBackgroundParamA = function(t, s) {
  this.bg[t].dx = (s << 16) / 16777216;
};
A.prototype.writeBackgroundParamB = function(t, s) {
  this.bg[t].dmx = (s << 16) / 16777216;
};
A.prototype.writeBackgroundParamC = function(t, s) {
  this.bg[t].dy = (s << 16) / 16777216;
};
A.prototype.writeBackgroundParamD = function(t, s) {
  this.bg[t].dmy = (s << 16) / 16777216;
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
A.prototype.writeWindow = function(t, s) {
  var e = this.windows[t];
  e.enabled[0] = s & 1, e.enabled[1] = s & 2, e.enabled[2] = s & 4, e.enabled[3] = s & 8, e.enabled[4] = s & 16, e.special = s & 32;
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
A.prototype.setBlendEnabled = function(t, s, e) {
  if (this.alphaEnabled = s && e == 1, s)
    switch (e) {
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
A.prototype.layerComparator = function(t, s) {
  var e = s.priority - t.priority;
  return e || (t.bg && !s.bg ? -1 : !t.bg && s.bg ? 1 : s.index - t.index);
};
A.prototype.accessMapMode0 = function(t, s, e, i, r) {
  var a = t + (e >> 2 & 62) + i;
  s & 1 && (a += (e & 256) << 3);
  var h = this.vram.loadU16(a);
  r.tile = h & 1023, r.hflip = h & 1024, r.vflip = h & 2048, r.palette = (h & 61440) >> 8;
};
A.prototype.accessMapMode1 = function(t, s, e, i, r) {
  var a = t + (e >> 3) + i;
  r.tile = this.vram.loadU8(a);
};
A.prototype.accessTile = function(t, s, e) {
  var i = t + (s << 5);
  return i |= e << 2, this.vram.load32(i);
};
A.pushPixel = function(t, s, e, i, r, a, h, n, o) {
  var u;
  if (!o)
    if (this.multipalette ? u = i >> (r << 3) & 255 : u = i >> (r << 2) & 15, u)
      this.multipalette || (u |= s.palette);
    else return;
  var c = e.WRITTEN_MASK, p = h.stencil[a], d = e.blendMode;
  if (e.objwinActive)
    if (p & e.OBJWIN_MASK)
      if (e.windows[3].enabled[t])
        e.setBlendEnabled(t, e.windows[3].special && e.target1[t], d), e.windows[3].special && e.alphaEnabled && (n |= e.target1[t]), c |= e.OBJWIN_MASK;
      else
        return;
    else if (e.windows[2].enabled[t])
      e.setBlendEnabled(t, e.windows[2].special && e.target1[t], d), e.windows[2].special && e.alphaEnabled && (n |= e.target1[t]);
    else
      return;
  n & e.TARGET1_MASK && p & e.TARGET2_MASK && e.setBlendEnabled(t, !0, 1);
  var l = o ? i : e.palette.accessColor(t, u);
  n & e.TARGET1_MASK && e.setBlendEnabled(t, !!d, d);
  var x = (n & e.PRIORITY_MASK) < (p & e.PRIORITY_MASK);
  if ((n & e.PRIORITY_MASK) == (p & e.PRIORITY_MASK) && (x = n & e.BACKGROUND_MASK), !(p & e.WRITTEN_MASK))
    c |= n;
  else if (x)
    n & e.TARGET1_MASK && p & e.TARGET2_MASK && (l = e.palette.mix(e.blendA, l, e.blendB, h.color[a])), c |= n & ~e.TARGET1_MASK;
  else if ((n & e.PRIORITY_MASK) > (p & e.PRIORITY_MASK))
    if (c = p & ~(e.TARGET1_MASK | e.TARGET2_MASK), n & e.TARGET2_MASK && p & e.TARGET1_MASK)
      l = e.palette.mix(e.blendB, l, e.blendA, h.color[a]);
    else
      return;
  else
    return;
  if (n & e.OBJWIN_MASK) {
    h.stencil[a] |= e.OBJWIN_MASK;
    return;
  }
  h.color[a] = l, h.stencil[a] = c;
};
A.prototype.identity = function(t) {
  return t;
};
A.prototype.drawScanlineBlank = function(t) {
  for (var s = 0; s < this.HORIZONTAL_PIXELS; ++s)
    t.color[s] = 65535, t.stencil[s] = 0;
};
A.prototype.prepareScanline = function(t) {
  for (var s = 0; s < this.HORIZONTAL_PIXELS; ++s)
    t.stencil[s] = this.target2[this.LAYER_BACKDROP];
};
A.prototype.drawScanlineBGMode0 = function(t, s, e, i) {
  var r = this.video, a, h = r.vcount, n = e, o = s.x, u = s.y, c, p, d = h + u;
  this.mosaic && (d -= h % r.bgMosaicY);
  var l = d & 7, x, m = s.screenBase, v = s.charBase, E = s.size, _ = s.index, O = r.sharedMap, q = s.multipalette ? 1 : 0, G = r.target2[_] | s.priority << 1 | r.BACKGROUND_MASK;
  r.blendMode == 1 && r.alphaEnabled && (G |= r.target1[_]);
  var C = d << 3 & 1984;
  E == 2 ? C += d << 3 & 2048 : E == 3 && (C += d << 4 & 4096);
  var D;
  E & 1 ? D = 511 : D = 255, r.accessMapMode0(m, E, e + o & D, C, O);
  var N = r.accessTile(v, O.tile << q, (O.vflip ? 7 - l : l) << q);
  for (a = e; a < i; ++a) {
    if (c = a + o & D, x = this.mosaic ? n % r.bgMosaicX : 0, c -= x, p = c & 7, q) {
      if ((!p || this.mosaic && !x) && r.accessMapMode0(m, E, c, C, O), (!(p & 3) || this.mosaic && !x) && (N = r.accessTile(v + (!!(c & 4) == !O.hflip ? 4 : 0), O.tile << 1, (O.vflip ? 7 - l : l) << 1), !N && !(p & 3))) {
        a += 3, n += 4;
        continue;
      }
    } else if ((!p || this.mosaic && !x) && (r.accessMapMode0(m, E, c, C, O), N = r.accessTile(v, O.tile, O.vflip ? 7 - l : l), !N && !p)) {
      a += 7, n += 8;
      continue;
    }
    O.hflip && (p = 7 - p), s.pushPixel(_, O, r, N, p, n, t, G, !1), n++;
  }
};
A.prototype.drawScanlineBGMode2 = function(t, s, e, i) {
  var r = this.video, a, h = r.vcount, n = e, o, u, c = s.screenBase, p = s.charBase, d = s.size, l = 128 << d, x = s.index, m = r.sharedMap, v, E = r.target2[x] | s.priority << 1 | r.BACKGROUND_MASK;
  r.blendMode == 1 && r.alphaEnabled && (E |= r.target1[x]);
  var _;
  for (a = e; a < i; ++a) {
    if (o = s.dx * a + s.sx, u = s.dy * a + s.sy, this.mosaic && (o -= a % r.bgMosaicX * s.dx + h % r.bgMosaicY * s.dmx, u -= a % r.bgMosaicX * s.dy + h % r.bgMosaicY * s.dmy), s.overflow)
      o &= l - 1, o < 0 && (o += l), u &= l - 1, u < 0 && (u += l);
    else if (o < 0 || u < 0 || o >= l || u >= l) {
      n++;
      continue;
    }
    _ = (u << 1 & 2032) << d, r.accessMapMode1(c, d, o, _, m), v = this.vram.loadU8(p + (m.tile << 6) + ((u & 7) << 3) + (o & 7)), s.pushPixel(x, m, r, v, 0, n, t, E, !1), n++;
  }
};
A.prototype.drawScanlineBGMode3 = function(t, s, e, i) {
  var r = this.video, a, h = r.vcount, n = e, o, u, c = s.index, p = r.sharedMap, d, l = r.target2[c] | s.priority << 1 | r.BACKGROUND_MASK;
  for (r.blendMode == 1 && r.alphaEnabled && (l |= r.target1[c]), a = e; a < i; ++a) {
    if (o = s.dx * a + s.sx, u = s.dy * a + s.sy, this.mosaic && (o -= a % r.bgMosaicX * s.dx + h % r.bgMosaicY * s.dmx, u -= a % r.bgMosaicX * s.dy + h % r.bgMosaicY * s.dmy), o < 0 || u < 0 || o >= r.HORIZONTAL_PIXELS || u >= r.VERTICAL_PIXELS) {
      n++;
      continue;
    }
    d = this.vram.loadU16(u * r.HORIZONTAL_PIXELS + o << 1), s.pushPixel(c, p, r, d, 0, n, t, l, !0), n++;
  }
};
A.prototype.drawScanlineBGMode4 = function(t, s, e, i) {
  var r = this.video, a, h = r.vcount, n = e, o, u, c = 0;
  r.displayFrameSelect && (c += 40960), s.size;
  var p = s.index, d = r.sharedMap, l, x = r.target2[p] | s.priority << 1 | r.BACKGROUND_MASK;
  for (r.blendMode == 1 && r.alphaEnabled && (x |= r.target1[p]), a = e; a < i; ++a) {
    if (o = s.dx * a + s.sx, u = 0 | s.dy * a + s.sy, this.mosaic && (o -= a % r.bgMosaicX * s.dx + h % r.bgMosaicY * s.dmx, u -= a % r.bgMosaicX * s.dy + h % r.bgMosaicY * s.dmy), o < 0 || u < 0 || o >= r.HORIZONTAL_PIXELS || u >= r.VERTICAL_PIXELS) {
      n++;
      continue;
    }
    l = this.vram.loadU8(c + u * r.HORIZONTAL_PIXELS + o), s.pushPixel(p, d, r, l, 0, n, t, x, !1), n++;
  }
};
A.prototype.drawScanlineBGMode5 = function(t, s, e, i) {
  var r = this.video, a, h = r.vcount, n = e, o, u, c = 0;
  r.displayFrameSelect && (c += 40960);
  var p = s.index, d = r.sharedMap, l, x = r.target2[p] | s.priority << 1 | r.BACKGROUND_MASK;
  for (r.blendMode == 1 && r.alphaEnabled && (x |= r.target1[p]), a = e; a < i; ++a) {
    if (o = s.dx * a + s.sx, u = s.dy * a + s.sy, this.mosaic && (o -= a % r.bgMosaicX * s.dx + h % r.bgMosaicY * s.dmx, u -= a % r.bgMosaicX * s.dy + h % r.bgMosaicY * s.dmy), o < 0 || u < 0 || o >= 160 || u >= 128) {
      n++;
      continue;
    }
    l = this.vram.loadU16(c + (u * 160 + o) << 1), s.pushPixel(p, d, r, l, 0, n, t, x, !0), n++;
  }
};
A.prototype.drawScanline = function(t) {
  var s = this.scanline;
  if (this.forcedBlank) {
    this.drawScanlineBlank(s);
    return;
  }
  this.prepareScanline(s);
  var e, i, r, a, h;
  this.vcount = t;
  for (var n = 0; n < this.drawLayers.length; ++n)
    e = this.drawLayers[n], e.enabled && (this.objwinActive = !1, this.win0 || this.win1 || this.objwin ? (i = 0, r = this.HORIZONTAL_PIXELS, a = 0, h = this.HORIZONTAL_PIXELS, this.win0 && t >= this.win0Top && t < this.win0Bottom && (this.windows[0].enabled[e.index] && (this.setBlendEnabled(e.index, this.windows[0].special && this.target1[e.index], this.blendMode), e.drawScanline(s, e, this.win0Left, this.win0Right)), i = Math.max(i, this.win0Left), r = Math.min(r, this.win0Left), a = Math.max(a, this.win0Right), h = Math.min(h, this.win0Right)), this.win1 && t >= this.win1Top && t < this.win1Bottom && (this.windows[1].enabled[e.index] && (this.setBlendEnabled(e.index, this.windows[1].special && this.target1[e.index], this.blendMode), !this.windows[0].enabled[e.index] && (this.win1Left < i || this.win1Right < a) ? (e.drawScanline(s, e, this.win1Left, i), e.drawScanline(s, e, h, this.win1Right)) : e.drawScanline(s, e, this.win1Left, this.win1Right)), i = Math.max(i, this.win1Left), r = Math.min(r, this.win1Left), a = Math.max(a, this.win1Right), h = Math.min(h, this.win1Right)), (this.windows[2].enabled[e.index] || this.objwin && this.windows[3].enabled[e.index]) && (this.objwinActive = this.objwin, this.setBlendEnabled(e.index, this.windows[2].special && this.target1[e.index], this.blendMode), r > a ? e.drawScanline(s, e, 0, this.HORIZONTAL_PIXELS) : (r && e.drawScanline(s, e, 0, r), a < this.HORIZONTAL_PIXELS && e.drawScanline(s, e, a, this.HORIZONTAL_PIXELS), h < i && e.drawScanline(s, e, h, i))), this.setBlendEnabled(this.LAYER_BACKDROP, this.target1[this.LAYER_BACKDROP] && this.windows[2].special, this.blendMode)) : (this.setBlendEnabled(e.index, this.target1[e.index], this.blendMode), e.drawScanline(s, e, 0, this.HORIZONTAL_PIXELS)), e.bg && (e.sx += e.dmx, e.sy += e.dmy));
  this.finishScanline(s);
};
A.prototype.finishScanline = function(t) {
  for (var s, e = this.palette.accessColor(this.LAYER_BACKDROP, 0), i = this.vcount * this.HORIZONTAL_PIXELS * 4, r = this.target2[this.LAYER_BACKDROP], a = 0; a < this.HORIZONTAL_PIXELS; ++a)
    t.stencil[a] & this.WRITTEN_MASK ? (s = t.color[a], r && t.stencil[a] & this.TARGET1_MASK && (s = this.palette.mix(this.blendA, s, this.blendB, e)), this.palette.convert16To32(s, this.sharedColor)) : this.palette.convert16To32(e, this.sharedColor), this.pixelData.data[i++] = this.sharedColor[0], this.pixelData.data[i++] = this.sharedColor[1], this.pixelData.data[i++] = this.sharedColor[2], i++;
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
  var s = t.createImageData(this.HORIZONTAL_PIXELS, this.VERTICAL_PIXELS);
  this.context = t;
  for (var e = 0; e < this.HORIZONTAL_PIXELS * this.VERTICAL_PIXELS * 4; )
    s.data[e++] = 255, s.data[e++] = 255, s.data[e++] = 255, s.data[e++] = 255;
  this.renderPath.setBacking(s);
};
Q.prototype.updateTimers = function(t) {
  var s = t.cycles;
  if (this.nextEvent <= s)
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
  var s = 0;
  switch (t.keyCode) {
    case this.KEYCODE_START:
      s = this.START;
      break;
    case this.KEYCODE_SELECT:
      s = this.SELECT;
      break;
    case this.KEYCODE_A:
      s = this.A;
      break;
    case this.KEYCODE_B:
      s = this.B;
      break;
    case this.KEYCODE_L:
      s = this.L;
      break;
    case this.KEYCODE_R:
      s = this.R;
      break;
    case this.KEYCODE_UP:
      s = this.UP;
      break;
    case this.KEYCODE_RIGHT:
      s = this.RIGHT;
      break;
    case this.KEYCODE_DOWN:
      s = this.DOWN;
      break;
    case this.KEYCODE_LEFT:
      s = this.LEFT;
      break;
    default:
      return;
  }
  s = 1 << s, t.type == "keydown" ? this.currentDown &= ~s : this.currentDown |= s, this.eatInput && t.preventDefault();
};
Y.prototype.gamepadHandler = function(t) {
  var s = 0;
  t.buttons[this.GAMEPAD_LEFT] > this.GAMEPAD_THRESHOLD && (s |= 1 << this.LEFT), t.buttons[this.GAMEPAD_UP] > this.GAMEPAD_THRESHOLD && (s |= 1 << this.UP), t.buttons[this.GAMEPAD_RIGHT] > this.GAMEPAD_THRESHOLD && (s |= 1 << this.RIGHT), t.buttons[this.GAMEPAD_DOWN] > this.GAMEPAD_THRESHOLD && (s |= 1 << this.DOWN), t.buttons[this.GAMEPAD_START] > this.GAMEPAD_THRESHOLD && (s |= 1 << this.START), t.buttons[this.GAMEPAD_SELECT] > this.GAMEPAD_THRESHOLD && (s |= 1 << this.SELECT), t.buttons[this.GAMEPAD_A] > this.GAMEPAD_THRESHOLD && (s |= 1 << this.A), t.buttons[this.GAMEPAD_B] > this.GAMEPAD_THRESHOLD && (s |= 1 << this.B), t.buttons[this.GAMEPAD_L] > this.GAMEPAD_THRESHOLD && (s |= 1 << this.L), t.buttons[this.GAMEPAD_R] > this.GAMEPAD_THRESHOLD && (s |= 1 << this.R), this.currentDown = ~s & 1023;
};
Y.prototype.gamepadConnectHandler = function(t) {
  this.gamepads.push(t);
};
Y.prototype.gamepadDisconnectHandler = function(t) {
  this.gamepads = self.gamepads.filter(function(s) {
    return s != t;
  });
};
Y.prototype.pollGamepads = function() {
  var t = [];
  navigator.webkitGetGamepads ? t = navigator.webkitGetGamepads() : navigator.getGamepads && (t = navigator.getGamepads()), t.length && (this.gamepads = []);
  for (var s = 0; s < t.length; ++s)
    t[s] && this.gamepads.push(t[s]);
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
  t = t || {}, this.LOG_ERROR = 1, this.LOG_WARN = 2, this.LOG_STUB = 4, this.LOG_INFO = 8, this.LOG_DEBUG = 16, this.SYS_ID = "com.endrift.gbajs", this.logLevel = this.LOG_ERROR | this.LOG_WARN, this.rom = null, this.cpu = new P(), this.mmu = new g(), this.irq = new I(), this.io = new k(), this.audio = new b(), this.video = new Q(), this.keypad = new Y(), this.sio = new $(), this.cpu.mmu = this.mmu, this.cpu.irq = this.irq, this.mmu.cpu = this.cpu, this.mmu.core = this, this.irq.cpu = this.cpu, this.irq.io = this.io, this.irq.audio = this.audio, this.irq.video = this.video, this.irq.core = this, this.io.cpu = this.cpu, this.io.audio = this.audio, this.io.video = this.video, this.io.keypad = this.keypad, this.io.sio = this.sio, this.io.core = this, this.audio.cpu = this.cpu, this.audio.core = this, this.video.cpu = this.cpu, this.video.core = this, this.keypad.core = this, this.sio.core = this, t.bindInput !== !1 && this.keypad.registerHandlers(), this.doStep = this.waitFrame, this.paused = !1, this.seenFrame = !1, this.seenSave = !1, this.lastVblank = 0, this.queue = null, this.reportFPS = null, this.throttle = t.throttle || 16;
  var s = this;
  this.queueFrame = function(e) {
    s.queue = setTimeout(e, s.throttle);
  }, this.video.vblankCallback = function() {
    s.seenFrame = !0;
  };
}
S.prototype.setCanvas = function(t) {
  var s = this;
  if (t.width != 240 || t.height != 160) {
    this.indirectCanvas = document.createElement("canvas"), this.indirectCanvas.setAttribute("height", "160"), this.indirectCanvas.setAttribute("width", "240"), this.targetCanvas = t, this.setCanvasDirect(this.indirectCanvas);
    var e = t.getContext("2d");
    this.video.drawCallback = function() {
      e.drawImage(s.indirectCanvas, 0, 0, t.width, t.height);
    };
  } else
    this.setCanvasDirect(t);
};
S.prototype.setCanvasDirect = function(t) {
  this.context = t.getContext("2d"), this.video.setBacking(this.context);
};
S.prototype.setBios = function(t, s) {
  this.mmu.loadBios(t, s);
};
S.prototype.setRom = function(t) {
  return this.reset(), this.rom = this.mmu.loadRom(t, !0), this.rom ? (this.retrieveSavedata(), !0) : !1;
};
S.prototype.hasRom = function() {
  return !!this.rom;
};
S.prototype.loadRomFromFile = function(t, s) {
  var e = new FileReader(), i = this;
  e.onload = function(r) {
    var a = i.setRom(r.target.result);
    s && s(a);
  }, e.readAsArrayBuffer(t);
};
S.prototype.loadRom = function(t, s) {
  if (t instanceof ArrayBuffer || t instanceof Uint8Array) {
    var e = this.setRom(t);
    s && s(e);
  } else if (t && typeof t.arrayBuffer == "function") {
    var i = this;
    t.arrayBuffer().then(function(r) {
      var a = i.setRom(r);
      s && s(a);
    });
  } else
    this.loadRomFromFile(t, s);
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
    var t = this, s = 0, e = 0, i, r = Date.now();
    this.paused = !1, this.audio.pause(!1), this.reportFPS ? i = function() {
      try {
        if (s += Date.now() - r, t.paused)
          return;
        t.queueFrame(i), r = Date.now(), t.advanceFrame(), ++e, e == 60 && (t.reportFPS(e * 1e3 / s), e = 0, s = 0);
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
  var s = new FileReader(), e = this;
  s.onload = function(i) {
    e.setSavedata(i.target.result);
  }, s.readAsArrayBuffer(t);
};
S.prototype.decodeSavedata = function(t) {
  this.setSavedata(this.decodeBase64(t));
};
S.prototype.decodeBase64 = function(t) {
  var s = t.length * 3 / 4;
  t[t.length - 2] == "=" ? s -= 2 : t[t.length - 1] == "=" && (s -= 1);
  for (var e = new ArrayBuffer(s), i = new Uint8Array(e), r = t.match(/..../g), a = 0; a + 2 < s; a += 3) {
    var h = atob(r.shift());
    i[a] = h.charCodeAt(0), i[a + 1] = h.charCodeAt(1), i[a + 2] = h.charCodeAt(2);
  }
  if (a < s) {
    var h = atob(r.shift());
    i[a++] = h.charCodeAt(0), h.length > 1 && (i[a++] = h.charCodeAt(1));
  }
  return e;
};
S.prototype.encodeBase64 = function(t) {
  for (var s = [], e, i = [], r, a = 0; a < t.byteLength; ++a)
    for (e = t.getUint8(a, !0), i.push(String.fromCharCode(e)); i.length >= 3; )
      r = i.splice(0, 3), s.push(btoa(r.join("")));
  return i.length && s.push(btoa(i.join(""))), s.join("");
};
S.prototype.downloadSavedata = function() {
  var t = this.mmu.save;
  if (!t)
    return this.WARN("No save data available"), null;
  if (globalThis.URL) {
    var s = globalThis.URL.createObjectURL(new Blob([t.buffer], { type: "application/octet-stream" }));
    globalThis.open(s);
  } else {
    var e = this.encodeBase64(t.view);
    globalThis.open("data:application/octet-stream;base64," + e, this.rom.code + ".sav");
  }
};
S.prototype.storeSavedata = function() {
  var t = this.mmu.save;
  try {
    var s = globalThis.localStorage;
    s[this.SYS_ID + "." + this.mmu.cart.code] = this.encodeBase64(t.view);
  } catch (e) {
    this.WARN("Could not store savedata! " + e);
  }
};
S.prototype.retrieveSavedata = function() {
  try {
    var t = globalThis.localStorage, s = t[this.SYS_ID + "." + this.mmu.cart.code];
    if (s)
      return this.decodeSavedata(s), !0;
  } catch (e) {
    this.WARN("Could not retrieve savedata! " + e);
  }
  return !1;
};
S.prototype.freeze = function() {
  var t = this.video.freeze();
  return console.log("[gba.freeze] video.renderPath?", t.renderPath ? "yes" : "no"), {
    cpu: this.cpu.freeze(),
    mmu: this.mmu.freeze(),
    irq: this.irq.freeze(),
    io: this.io.freeze(),
    audio: this.audio.freeze(),
    video: t
  };
};
S.prototype.defrost = function(t) {
  console.log("[gba.defrost] video?", !!t.video, "renderPath?", t.video && !!t.video.renderPath), this.cpu.defrost(t.cpu), this.mmu.defrost(t.mmu), this.audio.defrost(t.audio), this.video.defrost(t.video), this.irq.defrost(t.irq), this.io.defrost(t.io), console.log("[gba.defrost] done");
};
S.prototype.log = function(t, s) {
};
S.prototype.setLogger = function(t) {
  this.log = t;
};
S.prototype.logStackTrace = function(t) {
  var s = t.length - 32;
  this.ERROR("Stack trace follows:"), s > 0 && this.log(-1, "> (Too many frames)");
  for (var e = Math.max(s, 0); e < t.length; ++e)
    this.log(-1, "> " + t[e]);
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
S.prototype.ASSERT = function(t, s) {
  if (!t)
    throw new Error("Assertion failed: " + s);
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
const pt = "BgAA6v7//+oFAADq/v//6v7//+oAAKDhDAAA6v7//+oC86DjAABd4wHToAMg0E0CAEAt6QIAXuUEAFDjCQAACwUAUOMHAAALAEC96A7wsOEPUC3pAQOg4wDgj+IE8BDlD1C96ATwXuIQQC3pBNBN4rAQzeEBQ6DjAkyE4rAA1OGyAM3hsBDd4QEAgOGwAMThAUOg4x8AoOMA8CnhAACg4wEDxOXTAKDjAPAp4bgAVOGwEN3hABAR4AAQIRC4EEQR8///CgFDoOMCTITisgDd4bAAxOEE0I3iEIC96A==";
function ut(t) {
  for (var s = atob(t), e = new ArrayBuffer(s.length), i = new Uint8Array(e), r = 0; r < s.length; r++)
    i[r] = s.charCodeAt(r);
  return e;
}
var lt = ut(pt);
function at(t) {
  S.call(this, t), this.setBios(lt);
}
at.prototype = Object.create(S.prototype);
at.prototype.constructor = at;
export {
  lt as BIOS,
  S as GameBoyAdvance,
  at as GameBoyAdvanceEmbedded,
  at as default
};
//# sourceMappingURL=gba.js.map
