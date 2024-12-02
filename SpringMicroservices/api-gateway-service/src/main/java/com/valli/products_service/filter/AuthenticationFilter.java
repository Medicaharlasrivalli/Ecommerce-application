package com.valli.products_service.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;



@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config>{
	
	@Autowired
	private RouteValidator validator;
	
	@Autowired
	private JWTService jwtutil;
	
	public AuthenticationFilter() {
        super(Config.class);
    }

	@Override
	public GatewayFilter apply(Config config) {
		// TODO Auto-generated method stub
		return ((exchange,chain)->{
			if(validator.isSecured.test(exchange.getRequest())) {
				if(!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
					throw new RuntimeException("missing authorization error");
				}
				String authheader=exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
				if(authheader!=null && authheader.startsWith("Bearer ")) {
					authheader=authheader.substring(7);
				}
				try {
//					template.getForObject("http://USER-SERVICE/users/validate?token="+authheader, boolean.class);
					jwtutil.validateToken(authheader);
				}catch (Exception e) {
					System.out.println("invalid access");
					throw new RuntimeException("unauthorized access to application");
				}
			}
			return chain.filter(exchange);
		});
	}

	public static class Config {

    }
}
	
