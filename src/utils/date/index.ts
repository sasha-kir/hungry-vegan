export const formatDate = (date: number): string => {
    const fullDate = date > Math.pow(10, 10) ? date : date * 1000;
    return new Date(fullDate).toLocaleDateString('ru-RU');
};
