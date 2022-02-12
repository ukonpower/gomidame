varying vec2 vUv;
uniform sampler2D backbuffer;
uniform vec2 resolution;

uniform sampler2D sceneTex;
uniform sampler2D contentTex;
uniform float contentVisibility;

void main(){

	vec2 uv = vUv;
	vec2 contentUV = uv;
	vec2 cUV = ( uv - 0.5 ) * 2.0;

	vec4 col = vec4(0.0);
	vec4 contentCol = texture2D( contentTex, uv );
	vec4 sceneCol = texture2D( sceneTex, uv );

	col = mix( sceneCol, contentCol, contentVisibility );

	gl_FragColor = vec4( col.xyz, 1.0 );

}