package uk.nhs.ambulatorycare.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import uk.nhs.ambulatorycare.Authentication.ApplicationUser;
import uk.nhs.ambulatorycare.Authentication.UserIdentity;
import uk.nhs.ambulatorycare.Authentication.UserIdentityDetails;
import uk.nhs.ambulatorycare.Entities.AccountUser;
import uk.nhs.ambulatorycare.Exceptions.EmptyResultSetException;
import uk.nhs.ambulatorycare.Repositories.AccountsRepository;

@Service
public class AuthenticationService extends ServiceBase implements UserDetailsService {

    @Autowired
    private AccountsRepository authenticationRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AccountUser user = null;


        try {
            user = authenticationRepository.GetUserByUsername(username);
        } catch (EmptyResultSetException e) {
            e.printStackTrace();
        }

        if (user == null) {
            throw new UsernameNotFoundException(username);
        }

        ApplicationUser applicationUser = new ApplicationUser();

        applicationUser.setUsername(user.getUsername());
        applicationUser.setPassword(user.getPasswordHash());

        if (applicationUser == null) {
            throw new UsernameNotFoundException(username);
        }

        return new UserIdentityDetails(applicationUser.getUsername(), applicationUser.getPassword(), new UserIdentity(user.getId(), applicationUser.getUsername(), user.getFirstName(), user.getLastName(), user.getEmailAddress(), user.getPatientId()));
    }
}