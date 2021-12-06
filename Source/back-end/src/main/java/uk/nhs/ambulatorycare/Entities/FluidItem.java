package uk.nhs.ambulatorycare.Entities;

import org.springframework.data.annotation.Id;

public class FluidItem {
    private FluidItem() { }
    @Id
    Long Id;
    Long PatientID;
    String DateTime;
    String Title;
    Integer Amount;

    public FluidItem(Long id, Long patientID, String dateTime, String title, Integer amount) {
        Id = id;
        PatientID = patientID;
        DateTime = dateTime;
        Title = title;
        Amount = amount;
    }

    //This constructor will be used when displaying the information on the front end because the front end does not need access t0 the ID and Patient ID
    public FluidItem(String dateTime, String title, Integer amount) {
        DateTime = dateTime;
        Title = title;
        Amount = amount;
    }

    public Long getId() {
        return Id;
    }

    public Long getPatientID() {
        return PatientID;
    }

    public String getDateTime() {
        return DateTime;
    }

    public String getTitle() {
        return Title;
    }

    public Integer getAmount() {
        return Amount;
    }
}
