#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

#define PI 3.14159265359
#define T (u_time / .99)

const float aoinParam1 = 0.7;

float snow(vec2 uv,float scale)
{
	float w=smoothstep(9.,0.,-uv.y*(scale/10.));
    if(w<.1)return 0.;
	uv+=(u_time*aoinParam1)/scale;uv.y+=u_time*0./scale;
    uv.x+=sin(uv.y+u_time*.05)/scale;
	uv*=scale;vec2 s=floor(uv),f=fract(uv),p;
    float k=3.,d;
	p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;d=length(p);k=min(d,k);
	k=smoothstep(0.,k,sin(f.x+f.y)*0.01);
    return k*w;
}

void main( void ) {

	vec2 position = (( gl_FragCoord.xy / u_resolution.xy ) - 0.5);
	position.x *= u_resolution.x / u_resolution.y;
	
	vec2 uv=(gl_FragCoord.xy*2.-u_resolution.xy)/min(u_resolution.x,u_resolution.y); 
	vec3 finalColor=vec3(0);
	float c=smoothstep(1.,0.01,clamp(uv.y*.3+.8,1.,.95));
	c+=snow(uv,7.);
	c+=snow(uv,6.);
	c+=snow(uv,5.);
	c+=snow(uv,3.5);
	finalColor=(vec3(c));	
	gl_FragColor = vec4(finalColor,1) / vec4(1.4, 1.4, 1.4, 1);

}