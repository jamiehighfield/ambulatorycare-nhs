package uk.nhs.ambulatorycare.Authentication;

public class UserIdentity {

    private UserIdentity() { }

    public UserIdentity(long id, String username, String firstName, String lastName, String emailAddress, long patientId) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.patientId = patientId;
    }

    private long id;

    private String username;

    private String firstName;

    private String lastName;

    private String emailAddress;

    private long patientId;

    public long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public long getPatientId() {
        return patientId;
    }
}