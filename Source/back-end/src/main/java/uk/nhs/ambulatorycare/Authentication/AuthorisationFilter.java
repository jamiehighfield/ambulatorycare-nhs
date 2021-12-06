package uk.nhs.ambulatorycare.Authentication;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

//Source https://auth0.com/blog/implementing-jwt-authentication-on-spring-boot/
//Some of this taken from there.
public class AuthorisationFilter extends BasicAuthenticationFilter {

    public AuthorisationFilter(AuthenticationManager authManager) {
        super(authManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(SecurityConstants.HEADER_STRING);

        if (header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX)) {
            chain.doFilter(req, res);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) throws IOException {
        String token = request.getHeader(SecurityConstants.HEADER_STRING);
        if (token != null) {

            String user = JWT.require(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes()))
                    .build()
                    .verify(token.replace(SecurityConstants.TOKEN_PREFIX, ""))
                    .getSubject();

            ObjectMapper objectMapper = new ObjectMapper();

            Map<String, Object> parsed = objectMapper.readValue(user, new TypeReference<Map<String, Object>>() {});

            UserIdentityDetails userIdentity = new UserIdentityDetails((String)parsed.get("username"),
                    "",
                    new UserIdentity((Integer)((Map<String, Object>)parsed.get("userIdentity")).get("id"),
                            (String)((Map<String, Object>)parsed.get("userIdentity")).get("username"),
                            (String)((Map<String, Object>)parsed.get("userIdentity")).get("firstName"),
                            (String)((Map<String, Object>)parsed.get("userIdentity")).get("lastName"),
                            (String)((Map<String, Object>)parsed.get("userIdentity")).get("emailAddress"),
                            (Integer)((Map<String, Object>)parsed.get("userIdentity")).get("patientId")));

            if (user != null) {
                return new UsernamePasswordAuthenticationToken(userIdentity, null, new ArrayList<>());
            }
            return null;
        }
        return null;
    }
}