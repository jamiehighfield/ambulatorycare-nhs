package uk.nhs.ambulatorycare.Entities;

import java.sql.Date;

public class Patient {

    private Patient() { }

    public Patient(long id, String firstName, String lastName, String emailAddress, String nhsNumber, String contactNumber, Date startDate, long healthCareProfessionalId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.nhsNumber = nhsNumber;
        this.contactNumber = contactNumber;
        this.startDate = startDate;
    }

    private long id;

    private String firstName;

    private String lastName;

    private String emailAddress;

    private String nhsNumber;

    private String contactNumber;

    private Date startDate;

    private long healthCareProfessionalId;

    public long getId() {
        return id;
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

    public String getNhsNumber() { return nhsNumber; }

    public String getContactNumber() { return contactNumber; }

    public Date getStartDate() { return startDate; }

    public long getHealthCareProfessionalId() {
        return healthCareProfessionalId;
    }
}