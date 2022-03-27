uniform sampler2D tex;
varying vec2 vUv;

void main( void ) {

	vec4 col = texture2D( tex, vUv );

	col = vec4( 1.0 );

	gl_FragColor = col;

}