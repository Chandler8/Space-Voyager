if (void 0 === moment && "function" == typeof require)
    var moment = require("moment");
!function(e) {
    var n = {
        nodiff: "",
        year: "year",
        years: "years",
        month: "month",
        months: "months",
        day: "day",
        days: "days",
        hour: "hour",
        hours: "hours",
        minute: "minute",
        minutes: "minutes",
        second: "second",
        seconds: "seconds",
        delimiter: " "
    };
    function t(e, t) {
        return e + " " + n[t + (1 === e ? "" : "s")]
    }
    function s(e, n, t, s, r, o, i) {
        return {
            years: e,
            months: n,
            days: t,
            hours: s,
            minutes: r,
            seconds: o,
            firstDateWasLater: i
        }
    }
    e.fn.preciseDiff = function(n, t) {
        return e.preciseDiff(this, n, t)
    }
    ,
    e.preciseDiff = function(r, o, i) {
        var u, a = e(r), m = e(o);
        if (a.add(m.utcOffset() - a.utcOffset(), "minutes"),
        a.isSame(m))
            return i ? s(0, 0, 0, 0, 0, 0, !1) : n.nodiff;
        if (a.isAfter(m)) {
            var f = a;
            a = m,
            m = f,
            u = !0
        } else
            u = !1;
        var d, h, c, y, p, v, D, M = m.year() - a.year(), Y = m.month() - a.month(), l = m.date() - a.date(), q = m.hour() - a.hour(), O = m.minute() - a.minute(), b = m.second() - a.second();
        if (b < 0 && (b = 60 + b,
        O--),
        O < 0 && (O = 60 + O,
        q--),
        q < 0 && (q = 24 + q,
        l--),
        l < 0) {
            var j = e(m.year() + "-" + (m.month() + 1), "YYYY-MM").subtract(1, "M").daysInMonth();
            l = j < a.date() ? j + l + (a.date() - j) : j + l,
            Y--
        }
        return Y < 0 && (Y = 12 + Y,
        M--),
        i ? s(M, Y, l, q, O, b, u) : (h = Y,
        c = l,
        y = q,
        p = O,
        v = b,
        D = [],
        (d = M) && D.push(t(d, "year")),
        h && D.push(t(h, "month")),
        c && D.push(t(c, "day")),
        y && D.push(t(y, "hour")),
        p && D.push(t(p, "minute")),
        v && D.push(t(v, "second")),
        D.join(n.delimiter))
    }
}(moment);
