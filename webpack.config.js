const path = require( 'path' );

module.exports = {
	watch: true,
	watchOptions: {
		aggregateTimeout: 100,
	},
    mode: 'development',
    entry: {
    },
    output: {
    },
    module: {
        rules: [{
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
				test: /\.(vs|fs|glsl)$/,
				exclude: /node_modules/,
				use: [
					'raw-loader',
					{
						loader: 'glslify-loader',
						options: {
							transform: [
								['glslify-hex'],
								['glslify-import']
							],
							basedir: './src/glsl-chunks'
						}
					}
				]
			}
        ]
    },
    resolve: {
        extensions: [".ts", ".js"],
		alias: {
            "@ore-three-ts": path.resolve(__dirname, 'src/common/ts/ore-three-ts/src'),
            "@gl": path.resolve(__dirname, './src/ts/gl/'),
        }
	},
	cache: {
		type: 'filesystem',
		buildDependencies: {
			config: [__filename]
		}
	},
	optimization: {
		innerGraph: true
	}
};