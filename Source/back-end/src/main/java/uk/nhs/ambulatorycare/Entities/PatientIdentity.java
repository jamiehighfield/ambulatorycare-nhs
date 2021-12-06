package uk.nhs.ambulatorycare.Entities;

import java.sql.Date;

public class PatientIdentity {

    private PatientIdentity() { }

    public PatientIdentity(String firstName, String lastName, String emailAddress, String nhsNumber, String contactNumber, Date startDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.nhsNumber = nhsNumber;
        this.contactNumber = contactNumber;
        this.startDate = startDate;
    }

    private String firstName;

    private String lastName;

    private String emailAddress;

    private String nhsNumber;

    private String contactNumber;

    private Date startDate;

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public String getNhsNumber() { return nhsNumber; }

    public String getContactNumber() { return contactNumber; }

    public Date getStartDate() { return startDate; }
}