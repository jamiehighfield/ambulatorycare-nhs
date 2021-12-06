package uk.nhs.ambulatorycare.Services;

import org.springframework.security.core.context.SecurityContextHolder;
import uk.nhs.ambulatorycare.Authentication.UserIdentity;
import uk.nhs.ambulatorycare.Authentication.UserIdentityDetails;

public abstract class ServiceBase {

    //This method gets the current JWT token from the request and deserialises it into a UserIdentity object.
    public UserIdentity GetUser() {
        return ((UserIdentityDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserIdentity();
    }
}
