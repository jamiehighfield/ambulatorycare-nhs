package uk.nhs.ambulatorycare.Entities;

public class PushNotification {

    private PushNotification() { }

    public PushNotification(String to, String title, String body) {
        this.to = to;
        this.title = title;
        this.body = body;
    }

    private String to;

    private String title;

    private String body;

    public String getTo() {
        return to;
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }
}