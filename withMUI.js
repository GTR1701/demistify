const withMUI = () => ({
    webpack(config) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false
        };

        return config;
    }
});

module.exports = withMUI;