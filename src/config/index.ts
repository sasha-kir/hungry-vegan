interface Config {
    baseUrl: string;
    apiUrl: string;
}

const env = process.env.NODE_ENV || 'development';

const configs: { [key: string]: Config } = {
    development: {
        baseUrl: 'http://localhost:3000/hungry-vegan',
        apiUrl: 'http://localhost:5000',
    },
    production: {
        baseUrl: 'https://sasha-kir.com/hungry-vegan',
        apiUrl: 'https://sasha-kir.com:9000',
    },
};

export default configs[env];
