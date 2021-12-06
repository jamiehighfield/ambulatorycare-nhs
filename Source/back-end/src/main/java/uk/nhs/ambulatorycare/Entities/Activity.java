package uk.nhs.ambulatorycare.Entities;

import java.util.Date;


public class Activity {

    private long id;

    private long patientId;

    private String name;

    private  int lengthOfTime;

    private Date dateTime;

    private int stepCount;

    public Activity(long id, long patientId, String name, int lengthOfTime, Date dateTime, int stepCount) {
        this.id = id;
        this.patientId = patientId;
        this.name = name;
        this.lengthOfTime = lengthOfTime;
        this.dateTime = dateTime;
        this.stepCount = stepCount;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getPatientId() {
        return patientId;
    }

    public void setPatientId(long patientId) {
        this.patientId = patientId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getLengthOfTime() {
        return lengthOfTime;
    }

    public void setLengthOfTime(int lengthOfTime) {
        this.lengthOfTime = lengthOfTime;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public int getStepCount() {
        return stepCount;
    }

    public void setStepCount(int stepCount) {
        this.stepCount = stepCount;
    }

    @Override
    public String toString() {
        return "Activity{" +
                "id=" + id +
                ", patientId=" + patientId +
                ", name='" + name + '\'' +
                ", lengthOfTime=" + lengthOfTime +
                ", dateTime=" + dateTime +
                ", stepCount=" + stepCount +
                '}';
    }
}