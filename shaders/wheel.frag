//http://glslsandbox.com/e#57224.0
#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float u_time;
uniform vec2 u_resolution;

void main( void ) {

	float t;
	t = u_time * 1.0;
    vec2 r = u_resolution,
    o = (gl_FragCoord.xy) * 0.5 - r/4.0;
    o = vec2(length(o) / r.y - .2, atan(o.y,o.x)) * 2.0;    
    vec4 s = 0.05*cos(1.5*vec4(0,1,2,3) + t + o.y + sin(o.y) * cos(t)),
    e = (s.yzwx), 
    f = max(o.x-s,e-o.x);

    gl_FragColor = dot(clamp(f * r.y,0.,1.), 100.*(s-e)) * (s-.1) + f;

}