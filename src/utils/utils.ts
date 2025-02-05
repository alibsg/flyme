export function formatMinutes(minutes: number): string {
  const hours  = Math.floor(minutes/ 60);
  const mins = minutes % 60;
  return `${hours > 0 ? `${hours} hr`: ''}${mins>0? ` ${mins} min`: ''}`
}