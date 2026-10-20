const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
export const monthYear = (d: Date) => `${MON[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
export const monthYearNum = (d: Date) => `${d.getUTCMonth() + 1}/${d.getUTCFullYear()}`;
export const longDate = (d: Date) => `${MON[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
