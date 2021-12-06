package uk.nhs.ambulatorycare.Entities;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public class FoodItem {
    private FoodItem() { }
    @Id
    Long Id;
    Long PatientID;
    String DateTime;
    String Title;
    String Description; //description is optional
    String Amount;

    //need two constructors due to description being optional
    public FoodItem(Long Id, Long PatientID, String DateTime, String Title, String Amount){
        this.Id = Id;
        this.PatientID = PatientID;
        this.DateTime = DateTime;
        this.Title = Title;
        this.Amount = Amount;
    }

    //This constructor is used to pass info to the front end, however for security reasons I don't think we should pass info to the front end that relates to ID's directly corresponding with the DB - especially if we don't need to
    public FoodItem(String dateTime, String title, String description, String amount) {
        DateTime = dateTime;
        Title = title;
        Description = description;
        Amount = amount;
    }

    public FoodItem(Long id, Long patientID, String dateTime, String title, String description, String amount) {
        Id = id;
        PatientID = patientID;
        DateTime = dateTime;
        Title = title;
        Description = description;

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

    public String getDescription() {
        return Description;
    }

    public String getAmount() {
        return Amount;
    }
}
