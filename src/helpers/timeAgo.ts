

// Utilidad para mostrar el tiempo transcurrido desde la última actualización
export const  timeAgo =(dateString: string | null)  =>{
  if (!dateString) return "";
  const now = new Date();
  const updated = new Date(dateString);
  const seconds = Math.floor((now.getTime() - updated.getTime()) / 1000);

  

  const intervals: [number, string][] = [
    [60, "segundo"],
    [60, "minuto"],
    [24, "hora"],
    [30, "día"],
    [12, "mes"],
    [Number.POSITIVE_INFINITY, "año"],
  ];

  let i = 0;
  let value = seconds;
  while (i < intervals.length - 1 && value >= intervals[i][0]) {
    value = Math.floor(value / intervals[i][0]);
    i++;
  }
  const label = intervals[i][1];
  return `hace ${value} ${label}${value !== 1 ? "s" : ""}`;
}
