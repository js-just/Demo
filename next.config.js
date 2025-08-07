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
    presets: ['next/babel'],
    webpack: (config) => {
        config.module.rules.push({
            test: /\.css$/i,
            issuer: /\.[jt]sx?$/,
            use: ['style-loader', 'css-loader'],
        });
        config.optimization.minimizer.forEach((minimizer) => {
            if (minimizer.options && minimizer.options.terserOptions) {
                minimizer.options.terserOptions.compress = false;
                minimizer.options.terserOptions.mangle = false;
            }
        });
        return config;
    },
}