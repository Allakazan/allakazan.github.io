#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

vec3 COLOR1 = vec3(0.0, 0.0, 0.30);
vec3 COLOR2 = vec3(0.50, .0, 0.0);

float BLOCK_WIDTH = 0.01; 

void main( void ) {

	
	vec2 position = ( gl_FragCoord.xy / u_resolution.xy );
	vec3 final_color = vec3(1.0);
	
	// For creating the BG pattern
	float c1 = mod(position.x, 3.0 * BLOCK_WIDTH);
	c1 = step(BLOCK_WIDTH, c1);
	float c2 = mod(position.y, 2.0 * BLOCK_WIDTH);
	c2 = step(BLOCK_WIDTH, c2);
	
	final_color = vec3(0.);//mix( position.x * COLOR1,  position.y * COLOR2, c1 * c2);
	
	
	 // creating the wave
	position = -1.0 + 2.0 * position;
	float lineWidth = 0.0;
	vec2 sPos = position ;
	for( float i = 0.0; i < 13.; i++) {
		sPos.y += (0.07 * sin(position.x + i/5.0+ u_time*2.));
		
		lineWidth  =  abs(1.0 / (1000.0 * sPos.y));
		final_color = final_color + vec3(lineWidth * 2.9, lineWidth*0., lineWidth * 1.); 
		
	}
	
	gl_FragColor = vec4(final_color, 1.0);
}