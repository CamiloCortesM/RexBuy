export const formatDate = (isoDate: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = new Date(isoDate).toLocaleDateString('es-ES', options);
  return formattedDate;
};
