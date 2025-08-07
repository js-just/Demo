module.exports = {
    images: {
        unoptimized: true
    },
    output: "export",
    i18n: {
        locales: ['en', 'ru'],
        defaultLocale: "en",
    },
    swcMinify: false,
    terserOptions: {
        compress: false,
        mangle: false,
    },
    optimizeCss: false,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.css$/i,
            issuer: /\.[jt]sx?$/,
            use: ['style-loader', 'css-loader'],
        });
        return config;
    },
}