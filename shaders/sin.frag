//http://glslsandbox.com/e#57214.0
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

uniform vec2 u_resolution;

#define PI 90

void main( void ) {

	vec2 p = ( gl_FragCoord.xy / u_resolution.xy ) - 0.2;
	
	float sx = 0.3 * (p.x + 0.8) * sin( 3.0 * p.x - 5. * u_time);
	
	float dy = 4./ ( 30. * abs(p.y - sx));
	
    //uncomment for a line in the middle
	//dy += 1./ (60. * length(p - vec2(p.x, 0.)));
	
	gl_FragColor = vec4( (p.x + 0.3) * dy, 0.3 * dy, dy, 1.0 );

}