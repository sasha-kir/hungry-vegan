interface Config {
    baseUrl: string | undefined;
    apiUrl: string | undefined;
}

const config: Config = {
    baseUrl: 'http://localhost:3000/hungry-vegan',
    apiUrl: 'http://localhost:5000',
};

export default config;
