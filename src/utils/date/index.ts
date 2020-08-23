export const formatDate = (date: number): string => {
    const fullDate = date > Math.pow(10, 10) ? date : date * 1000;
    return new Date(fullDate).toLocaleDateString('ru-RU');
};

const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
];

export const timeSince = (date: number): string => {
    const seconds = Math.floor((Date.now() - date) / 1000);
    const interval = intervals.find((i) => i.seconds < seconds);

    if (!interval) {
        return 'less than a minute ago';
    }

    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
};
