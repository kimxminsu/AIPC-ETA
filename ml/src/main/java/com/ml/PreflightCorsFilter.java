 package com.ml;

 import java.io.IOException;
 import javax.servlet.Filter;
 import javax.servlet.FilterChain;
 import javax.servlet.ServletException;
 import javax.servlet.ServletRequest;
 import javax.servlet.ServletResponse;
 import javax.servlet.http.HttpServletRequest;
 import javax.servlet.http.HttpServletResponse;

 import org.springframework.core.Ordered;
 import org.springframework.core.annotation.Order;
 import org.springframework.stereotype.Component;

 @Component
 @Order(Ordered.HIGHEST_PRECEDENCE)
 public class PreflightCorsFilter implements Filter {

 	public PreflightCorsFilter() {
 		// TODO:
 	}

 	@Override
 	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
 			throws IOException, ServletException {

 		HttpServletRequest request = (HttpServletRequest) req;
 		HttpServletResponse response = (HttpServletResponse) res;

 		// -----------------------------------------------	By SteveLee CORS
 		// System.out.println("* PreflightCorsFilter.doFilter(); >>> " + request.getRequestURL().toString() + ", Method = " + request.getMethod());
 		response.setHeader("Access-Control-Allow-Origin", "http://localhost:1841");
 		response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
 		response.setHeader("Access-Control-Max-Age", "3600");
 		response.setHeader("Access-Control-Allow-Headers", "*");
 		response.setHeader("Access-Control-Allow-Credentials", "true");
 		// ----------------------------------------------- By SteveLee

 		if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
 			response.setStatus(HttpServletResponse.SC_OK);
 		} else {
 			chain.doFilter(req, res);
 		}
 	}
 }
