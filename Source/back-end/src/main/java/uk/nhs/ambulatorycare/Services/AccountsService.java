package uk.nhs.ambulatorycare.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import uk.nhs.ambulatorycare.Authentication.UserIdentity;
import uk.nhs.ambulatorycare.Entities.*;
import uk.nhs.ambulatorycare.Exceptions.EmptyResultSetException;
import uk.nhs.ambulatorycare.Repositories.Interfaces.IAccountsRepository;

@Service
public class AccountsService extends ServiceBase {

    @Autowired
    private IAccountsRepository accountsRepository;

    public PatientIdentity GetPatient() throws EmptyResultSetException {
        //Get the current patient from the database in the AuthenticationRepository using the currently logged in user's ID.
        Patient patient = accountsRepository.GetPatientById(GetUser().getPatientId());

        //This returns a type of Patient - this is converted to PatientIdentity and returned.
        return new PatientIdentity(patient.getFirstName(), patient.getLastName(), patient.getEmailAddress(), patient.getNhsNumber(), patient.getContactNumber(), patient.getStartDate());

        //  long patientId = GetUser().getPatientId();

    }

    public PatientIdentity GetPatientById(long patientId) throws EmptyResultSetException {
        //Get the current patient from the database in the AuthenticationRepository using the parsed patient ID.
        Patient patient = accountsRepository.GetPatientById(patientId);

        //This returns a type of Patient - this is converted to PatientIdentity and returned.
        return new PatientIdentity(patient.getFirstName(), patient.getLastName(), patient.getEmailAddress(), patient.getNhsNumber(), patient.getContactNumber(), patient.getStartDate());
    }

    public PatientIdentity GetPatientByNhsNumber(String nhsNumber) throws EmptyResultSetException {
        //Get the current patient from the database in the AuthenticationRepository using the parsed patient ID.
        Patient patient = accountsRepository.GetPatientByNhsNumber(nhsNumber);

        //This returns a type of Patient - this is converted to PatientIdentity and returned.
        return new PatientIdentity(patient.getFirstName(), patient.getLastName(), patient.getEmailAddress(), patient.getNhsNumber(), patient.getContactNumber(), patient.getStartDate());
    }

    public PatientIdentity VerifyPatient(String firstName, String lastName) throws EmptyResultSetException {
        //Get the current patient from the database in the AuthenticationRepository using the parsed patient ID.
        Patient patient = accountsRepository.GetPatientByDetails(firstName, lastName);

        if (patient == null) {
            return null;
        }

        //This returns a type of Patient - this is converted to PatientIdentity and returned.
        return new PatientIdentity(patient.getFirstName(), patient.getLastName(), patient.getEmailAddress(), patient.getNhsNumber(), patient.getContactNumber(), patient.getStartDate());

    }

    public UserIdentity RegisterAccount(
            String patientFirstName,
            String patientLastName,
            String patientDateOfBirth,
            String patientNhsNumber,
            String username,
            String password,
            long securityQuestionId,
            String securityQuestionAnswer) throws EmptyResultSetException {

        //Check to see if the patient exists according to the verification information provided.
        Patient patient = accountsRepository.GetPatientByNhsNumber(patientNhsNumber);

        if (patient == null) {
            return null;
        }

        //Check to see if the security question exists according to the security question ID provided.
        SecurityQuestion securityQuestion = accountsRepository.GetSecurityQuestionById(securityQuestionId);

        if (securityQuestion == null) {
            return null;
        }

        //Compare provided values against pre-set database values for security verification
        if (patient.getFirstName().equals(patientFirstName) == false ||
                patient.getLastName().equals(patientLastName) == false ||
                patient.getNhsNumber().equals(patientNhsNumber) == false) {
            return null;
        }

        //Create a new instance of the BCryptEncoder, used to securely encode user passwords and security
        //question answers.
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        AccountUser user = accountsRepository.CompletePatientRegistration(patient.getId(), username, patient.getFirstName(), patient.getLastName(), patient.getEmailAddress(), encoder.encode(password), securityQuestionId, encoder.encode(securityQuestionAnswer));

        return new UserIdentity(user.getId(), user.getUsername(), user.getFirstName(), user.getLastName(), user.getEmailAddress(), user.getPatientId());
    }


    public void RegisterForPushNotifications(String pushNotificationToken) throws EmptyResultSetException {
        if (pushNotificationToken == null || pushNotificationToken.equals("")) {
            return;
        }

        accountsRepository.RegisterForPushNotifications(GetUser().getId(), pushNotificationToken);
    }
}