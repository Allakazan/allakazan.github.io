#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

#define PI 90

void main( void ) {

	vec2 p = ( gl_FragCoord.xy / u_resolution.xy );
	
	float sx = 0.2 * (p.x + 1.8) * sin( 2.0 * p.x - 4. * u_time) + .5;
	
	float dy = 2./ ( 50. * abs(p.y - sx));
	
	//dy += 1./ (60. * length(p - vec2(p.x, 0.)));
	
	gl_FragColor = vec4( (p.x + 1.0) * dy, 0.8 * dy, dy, 1.0 );

}
