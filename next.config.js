/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, options) {
        config.module.rules.push({
            test: /\.mp3$/,
            use: {
                loader: 'url-loader',
            },
        });
        config.module.rules.push({
            test: /\.(png|jpe?g|gif|glb|gltf)$/i,
            loader: 'file-loader',
            options: {
                publicPath: './',
                name: '[name].[ext]',
            }
        });
        return config;
    }
}

module.exports = nextConfig
