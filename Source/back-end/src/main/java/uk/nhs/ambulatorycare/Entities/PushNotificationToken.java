package uk.nhs.ambulatorycare.Entities;

public class PushNotificationToken {

    private PushNotificationToken() { }

    public PushNotificationToken(long id, long accountId, String token) {
        this.id = id;
        this.accountId = accountId;
        this.token = token;
    }

    private long id;

    private long accountId;

    private String token;

    public long getId() {
        return id;
    }

    public long getAccountId() {
        return accountId;
    }

    public String getToken() {
        return token;
    }
}
