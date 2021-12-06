package uk.nhs.ambulatorycare.Repositories.Interfaces;

import uk.nhs.ambulatorycare.Entities.AccountUser;
import uk.nhs.ambulatorycare.Entities.Patient;
import uk.nhs.ambulatorycare.Entities.PushNotificationToken;
import uk.nhs.ambulatorycare.Entities.SecurityQuestion;
import uk.nhs.ambulatorycare.Exceptions.EmptyResultSetException;

import java.util.List;

public interface IAccountsRepository {

    List<Patient> GetPatients() throws EmptyResultSetException;

    AccountUser GetUserByUsername(String username) throws EmptyResultSetException;

    Patient GetPatientById(long id) throws EmptyResultSetException;

    Patient GetPatientByNhsNumber(String nhsNumber) throws EmptyResultSetException;

    Patient GetPatientByDetails(String firstName, String lastName) throws EmptyResultSetException;

    SecurityQuestion GetSecurityQuestionById(long id) throws EmptyResultSetException;

    AccountUser CompletePatientRegistration(long patientId, String username, String firstName, String lastName, String emailAddress, String passwordHash, long securityQuestionId, String answerHash) throws EmptyResultSetException;

    void RegisterForPushNotifications(long accountId, String pushNotificationToken) throws EmptyResultSetException;

    List<PushNotificationToken> GetPushNotificationTokens() throws EmptyResultSetException;

    List<PushNotificationToken> GetPushNotificationTokensForPatient(long patientId) throws EmptyResultSetException;
}
