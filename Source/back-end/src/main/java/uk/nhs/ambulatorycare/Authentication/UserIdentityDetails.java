package uk.nhs.ambulatorycare.Authentication;

import org.springframework.security.core.userdetails.User;

import static java.util.Collections.emptyList;

public class UserIdentityDetails extends User {

    private UserIdentityDetails() {
        super("", "", emptyList());
    }

    public UserIdentityDetails(String username, String password, UserIdentity userIdentity) {
        super(username, password, emptyList());

        this.userIdentity = userIdentity;
    }

    private UserIdentity userIdentity;

    public UserIdentity getUserIdentity() {
        return userIdentity;
    }
}