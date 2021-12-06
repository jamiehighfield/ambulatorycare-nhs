package uk.nhs.ambulatorycare.Entities;

import java.util.Date;

public class Temperature {

    private long id;

    private long patientId;

    private Date dateTime;

    private float temperature;

    public Temperature(long id, long patientId, Date dateTime, float temperature) {
        this.id = id;
        this.patientId = patientId;
        this.dateTime = dateTime;
        this.temperature = temperature;
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

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public float getTemperature() { return temperature; }

    public void setTemperature(float temperature) { this.temperature = temperature; }

    @Override
    public String toString() {
        return "Activity{" +
                "id=" + id +
                ", patientId=" + patientId +
                ", dateTime=" + dateTime +
                ", temperature='" + temperature + '\'' +
                '}';
    }
}
