package uk.nhs.ambulatorycare.Repositories;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;
import uk.nhs.ambulatorycare.Entities.AccountUser;
import uk.nhs.ambulatorycare.Entities.Patient;
import uk.nhs.ambulatorycare.Entities.PushNotificationToken;
import uk.nhs.ambulatorycare.Entities.SecurityQuestion;
import uk.nhs.ambulatorycare.Exceptions.EmptyResultSetException;
import uk.nhs.ambulatorycare.Repositories.Interfaces.IAccountsRepository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class AccountsRepository extends RepositoryBase implements IAccountsRepository {

    //Gets all patients.
    public List<Patient> GetPatients() throws EmptyResultSetException {
        List<Patient> result = Database.query("SELECT * FROM patients;", new ResultSetExtractor<List<Patient>>() {
            @Override
            public List<Patient> extractData(ResultSet rs) throws SQLException, DataAccessException {
                List<Patient> innerResult = new ArrayList<Patient>();

                while (rs.next() == true) {
                    innerResult.add(new Patient(rs.getLong("PK_id"), rs.getString("first_name"), rs.getString("last_name"), rs.getString("email_address"), rs.getString("nhs_number"), rs.getString("contact_number"), rs.getDate("start_date"), rs.getLong("FK_health_care_professional")));
                }

                return innerResult;
            }
        });

        if (result == null) {
            throw new EmptyResultSetException();
        }

        return result;
    }

    //Get an AccountUser object from the database using the JDBC template in RepositoryBase.
    public AccountUser GetUserByUsername(String username) throws EmptyResultSetException {
        AccountUser result = Database.query("SELECT * FROM accounts WHERE LOWER(username) = LOWER('" + username + "');", new ResultSetExtractor<AccountUser>() {
            @Override
            public AccountUser extractData(ResultSet rs) throws SQLException, DataAccessException {
                if (rs.next() == true) {
                    return new AccountUser(rs.getLong("PK_id"), rs.getLong("FK_patient_id"), rs.getString("username"), rs.getString("first_name"), rs.getString("last_name"), rs.getString("email_address"), rs.getString("password_hash"), rs.getLong("FK_security_question_id"), rs.getString("answer_hash"), rs.getLong("account_type"), rs.getBoolean("deleted"));
                }

                return null;
            }
        });

        if (result == null) {
            throw new EmptyResultSetException();
        }

        return result;
    }

    public Patient GetPatientById(long id) throws EmptyResultSetException {
        Patient result = Database.query("SELECT * FROM patients WHERE PK_id = " + id + ";", new ResultSetExtractor<Patient>() {
            @Override
            public Patient extractData(ResultSet rs) throws SQLException, DataAccessException {
                if (rs.next() == true) {
                    return new Patient(rs.getLong("PK_id"), rs.getString("first_name"), rs.getString("last_name"), rs.getString("email_address"), rs.getString("nhs_number"), rs.getString("contact_number"), rs.getDate("start_date"), rs.getLong("FK_health_care_professional"));
                }

                return null;
            }
        });

        if (result == null) {
            throw new EmptyResultSetException();
        }

        return result;
    }

    public Patient GetPatientByNhsNumber(String nhsNumber) throws EmptyResultSetException {
        Patient result = Database.query("SELECT * FROM patients WHERE nhs_number = '" + nhsNumber + "';", new ResultSetExtractor<Patient>() {
            @Override
            public Patient extractData(ResultSet rs) throws SQLException, DataAccessException {
                if (rs.next() == true) {
                    return new Patient(rs.getLong("PK_id"), rs.getString("first_name"), rs.getString("last_name"), rs.getString("email_address"), rs.getString("nhs_number"), rs.getString("contact_number"), rs.getDate("start_date"), rs.getLong("FK_health_care_professional"));
                }

                return null;
            }
        });

        if (result == null) {
            throw new EmptyResultSetException();
        }

        return result;
    }

    public Patient GetPatientByDetails(String firstName, String lastName) throws EmptyResultSetException {
        Patient result = Database.query("SELECT * FROM patients WHERE first_name = '" + firstName + "' AND last_name='" + lastName + "';", new ResultSetExtractor<Patient>() {
            @Override
            public Patient extractData(ResultSet rs) throws SQLException, DataAccessException {
                if (rs.next() == true) {
                    return new Patient(rs.getLong("PK_id"), rs.getString("first_name"), rs.getString("last_name"), rs.getString("email_address"), rs.getString("nhs_number"), rs.getString("contact_number"), rs.getDate("start_date"), rs.getLong("FK_health_care_professional"));
                }

                return null;
            }
        });

        if (result == null) {
            throw new EmptyResultSetException();
        }

        return result;
    }

    public SecurityQuestion GetSecurityQuestionById(long id) throws EmptyResultSetException {
        SecurityQuestion result = Database.query("SELECT * FROM security_questions WHERE PK_id = " + id + " AND deleted = FALSE;", new ResultSetExtractor<SecurityQuestion>() {
            @Override
            public SecurityQuestion extractData(ResultSet rs) throws SQLException, DataAccessException {
                if (rs.next() == true) {
                    return new SecurityQuestion(rs.getLong("PK_id"), rs.getString("question"));
                }

                return null;
            }
        });

        if (result == null) {
            throw new EmptyResultSetException();
        }

        return result;
    }

    public AccountUser CompletePatientRegistration(long patientId, String username, String firstName, String lastName, String emailAddress, String passwordHash, long securityQuestionId, String answerHash) throws EmptyResultSetException {
        Database.execute("INSERT INTO accounts (FK_patient_id, username, first_name, last_name, email_address, password_hash, FK_security_question_id, answer_hash, account_type, deleted) VALUES (1, '" + username + "', '" + firstName + "', '" + lastName + "', '" + emailAddress + "', '" + passwordHash + "', " + securityQuestionId + ", '" + answerHash + "', 1, 0);");

        AccountUser result = Database.query("SELECT * FROM accounts WHERE PK_id=LAST_INSERT_ID();", new ResultSetExtractor<AccountUser>() {
            @Override
            public AccountUser extractData(ResultSet rs) throws SQLException, DataAccessException {
                if (rs.next() == true) {
                    return new AccountUser(rs.getLong("PK_id"), rs.getLong("FK_patient_id"), rs.getString("username"), rs.getString("first_name"), rs.getString("last_name"), rs.getString("email_address"), rs.getString("password_hash"), rs.getLong("FK_security_question_id"), rs.getString("answer_hash"), rs.getLong("account_type"), rs.getBoolean("deleted"));
                }

                return null;
            }
        });

        if (result == null) {
            throw new EmptyResultSetException();
        }

        return result;
    }

    public void RegisterForPushNotifications(long accountId, String pushNotificationToken) throws EmptyResultSetException {
        Database.execute("INSERT INTO devices (FK_account_id, push_token) VALUES (" + accountId + ", '" + pushNotificationToken + "');");
    }

    public List<PushNotificationToken> GetPushNotificationTokens() throws EmptyResultSetException {
        List<PushNotificationToken> result = Database.query("SELECT * FROM devices", new ResultSetExtractor<List<PushNotificationToken>>() {
            @Override
            public List<PushNotificationToken> extractData(ResultSet rs) throws SQLException, DataAccessException {
                List<PushNotificationToken> innerResult = new ArrayList<PushNotificationToken>();

                while (rs.next() == true) {
                    innerResult.add(new PushNotificationToken(rs.getLong("PK_id"), rs.getLong("FK_account_id"), rs.getString("push_token")));
                }

                return innerResult;
            }
        });

        if (result == null) {
            throw new EmptyResultSetException();
        }

        return result;
    }

    public List<PushNotificationToken> GetPushNotificationTokensForPatient(long patientId) throws EmptyResultSetException {
        List<PushNotificationToken> result = Database.query("SELECT devices.PK_id, FK_account_id, push_token FROM devices LEFT JOIN accounts ON accounts.FK_patient_id = " + patientId + " WHERE FK_account_id = accounts.PK_ID;", new ResultSetExtractor<List<PushNotificationToken>>() {
            @Override
            public List<PushNotificationToken> extractData(ResultSet rs) throws SQLException, DataAccessException {
                List<PushNotificationToken> innerResult = new ArrayList<PushNotificationToken>();

                while (rs.next() == true) {
                    innerResult.add(new PushNotificationToken(rs.getLong("PK_id"), rs.getLong("FK_account_id"), rs.getString("push_token")));
                }

                return innerResult;
            }
        });

        if (result == null) {
            throw new EmptyResultSetException();
        }

        return result;
    }
}