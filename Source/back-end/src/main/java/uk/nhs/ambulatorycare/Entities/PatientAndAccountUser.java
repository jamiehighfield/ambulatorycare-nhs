package uk.nhs.ambulatorycare.Entities;

public class PatientAndAccountUser {

    private PatientAndAccountUser() { }

    public PatientAndAccountUser(Patient patient, AccountUser user) {
        this.patient = patient;
        this.user = user;
    }

    private Patient patient;

    private AccountUser user;

    public Patient getPatient() {
        return patient;
    }

    public AccountUser getUser() {
        return user;
    }
}