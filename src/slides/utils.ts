export const formatPageNumber = (page: number, total: number): string => {
  const pageText = page < 10 ? `0${page}` : page.toString();
  const totalText = total < 10 ? `0${total}` : total.toString();
  return `${pageText} / ${totalText}`;
};
