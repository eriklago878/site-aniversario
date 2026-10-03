const DAY_MS = 86_400_000;

// Soma `n` meses a uma data, sem "vazar" para o mês seguinte.
function addMonthsClamped(date, n) {
  const d = new Date(date);
  const day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + n);
  const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, lastDay));
  return d;
}

export function getElapsed(start, now = new Date()) {
  const zero = { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  if (!(start instanceof Date) || isNaN(start) || now < start) return zero;

  // 1) meses completos
  let totalMonths =
    (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (addMonthsClamped(start, totalMonths) > now) totalMonths--;
  const anchor = addMonthsClamped(start, totalMonths);

  // 2) dias completos depois do último mês completo
  const addDays = (n) => {
    const d = new Date(anchor);
    d.setDate(d.getDate() + n);
    return d;
  };
  let days = Math.floor((now - anchor) / DAY_MS);
  while (days > 0 && addDays(days) > now) days--;
  while (addDays(days + 1) <= now) days++;

  // 3) resto do dia -> horas / minutos / segundos
  const rest = Math.floor((now - addDays(days)) / 1000);

  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
    days,
    hours: Math.floor(rest / 3600),
    minutes: Math.floor((rest % 3600) / 60),
    seconds: rest % 60,
  };
}