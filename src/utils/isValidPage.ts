export const isValidPage = (value: string | null): number => {
  const parsed = parseInt(value ?? "", 10);
  return !isNaN(parsed) && parsed > 0 ? parsed : 1;
};
