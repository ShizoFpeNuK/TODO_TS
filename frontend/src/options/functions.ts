export function byField(field: any) {
  return (a: any, b: any) => a[field] > b[field] ? 1 : -1;
}