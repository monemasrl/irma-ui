export const parseUnixTimestamp = (
  timestamp: number,
  justTime = false,
  justDate = false
): string => {
  const date = new Date(timestamp * 1000);

  if (justTime) {
    return date.toLocaleTimeString('it-IT');
  } else if (justDate) {
    return date.toLocaleDateString('it-IT');
  } else {
    return date.toLocaleString('it-IT');
  }
};
