#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float u_time;
uniform vec2 u_resolution;

float hex(vec2 p) {
	p = abs(p);
	return max(dot(p, vec2(.5, .86)), p.x);
}

void main() {

	vec2 p = (2. * gl_FragCoord.xy - u_resolution) / u_resolution.y*((sin(u_time) * 3.0)+3.0);
	vec3 col = vec3(0.);
	for(float i = 0.0; i < 70.0; i++)
	{
		col += .01 / abs(hex(p * (i * 0.2)) - 6.0);
	}
	
	gl_FragColor = vec4(col, 1.);


}