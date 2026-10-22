const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
export const monthYear = (d: Date) => `${MON[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
export const monthYearNum = (d: Date) => `${d.getUTCMonth() + 1}/${d.getUTCFullYear()}`;
export const longDate = (d: Date) => `${MON[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
export const yymm = (d: Date) => `${String(d.getUTCFullYear()).slice(2)}/${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
// New 뱃지: 프로젝트 마지막 달(endDate, 없으면 date) 기준 2달이 지나면 사라진다.
export const NEW_MONTHS = 2;
export const newUntil = (d: Date) => new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + NEW_MONTHS, d.getUTCDate()));
export const isNew = (d: Date, now = new Date()) => now < newUntil(d);
