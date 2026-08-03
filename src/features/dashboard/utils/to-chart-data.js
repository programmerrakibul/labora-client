export const toChartData = (map) =>
  map ? Object.entries(map).map(([name, value]) => ({ name, value })) : [];
