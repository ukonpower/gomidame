uniform sampler2D colorTex;
varying vec2 vUv;

void main( void ) {

	vec4 col = texture2D( colorTex, vUv );

	gl_FragColor = col;

}