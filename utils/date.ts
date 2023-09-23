export const formatDate = (isoDate: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = new Date(isoDate).toLocaleDateString('es-ES', options);
  return formattedDate;
};

export const formatDateShort = (isoDate: string): string => {
  const dateObj = new Date(isoDate);

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('default', { month: 'short' });
  const year = dateObj.getFullYear();

  return `${day} ${month}. ${year}`;
};
