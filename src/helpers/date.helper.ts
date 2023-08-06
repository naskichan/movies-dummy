export function formatDate(date: Date): string {
  const offsetSeconds = new Date().getTime() - date.getTime();
  const offsetMinutes = Math.floor(offsetSeconds / 1000 / 60);
  const offsetHours = Math.floor(offsetMinutes / 60);
  const offsetDays = Math.floor(offsetHours / 24);
  const offsetMonths = Math.floor(offsetDays / 30);
    if (offsetMinutes < 60) return `${offsetMinutes} minutes ago`;
    if (offsetHours < 24)  return `${offsetHours} hours ago`;
    if (offsetDays < 30) return `${offsetDays} days ago`;
    if (offsetMonths < 12) return `${offsetMonths} months ago`;
      return `${Math.floor(offsetMonths / 12)} years ago`;
}