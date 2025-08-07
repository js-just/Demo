module.exports = {
    images: {
        unoptimized: true
    },
    output: "export",
    i18n: {
        locales: ['en', 'ru'],
        defaultLocale: "en",
    },
    swcMinify: true,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.css$/i,
            issuer: /\.[jt]sx?$/,
            use: ['style-loader', 'css-loader'],
        });
        if (config.optimization) {
            config.optimization.minimize = false;
        }
        config.optimization.minimizer.forEach((minimizer) => {
            if (minimizer.options && minimizer.options.terserOptions) {
                minimizer.options.terserOptions.compress = true;
                minimizer.options.terserOptions.mangle = true;
            }
        });
        return config;
    },
}