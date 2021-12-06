package uk.nhs.ambulatorycare.Entities;

import uk.nhs.ambulatorycare.Authentication.UserIdentityDetails;

public class AuthenticationToken {

    public AuthenticationToken(String jwtToken, UserIdentityDetails user) {
        this.jwtToken = jwtToken;
        this.user = user;
    }

    private String jwtToken;

    private UserIdentityDetails user;

    public String getJwtToken() {
        return jwtToken;
    }

    public UserIdentityDetails getUser() {
        return user;
    }
}
