package uk.nhs.ambulatorycare.Entities;

public class AccountUser {

    private AccountUser() { }

    public AccountUser(long id, long patientId, String username, String firstName, String lastName, String emailAddress, String passwordHash, long securityQuestionId, String answerHash, long accountType, boolean deleted) {
        this.id = id;
        this.patientId = patientId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.passwordHash = passwordHash;
        this.securityQuestionId = securityQuestionId;
        this.answerHash = answerHash;
        this.accountType = accountType;
        this.deleted = deleted;
    }

    private long id;

    private long patientId;

    private String username;

    private String firstName;

    private String lastName;

    private String emailAddress;

    private String passwordHash;

    private long securityQuestionId;

    private String answerHash;

    private long accountType;

    private boolean deleted;

    public long getId() {
        return id;
    }

    public long getPatientId(){
        return patientId;
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

    public String getPasswordHash() {
        return passwordHash;
    }

    public long getSecurityQuestionId() {
        return securityQuestionId;
    }

    public String getAnswerHash() {
        return answerHash;
    }

    public long getAccountType() {
        return accountType;
    }

    public boolean getDeleted() {
        return deleted;
    }
}