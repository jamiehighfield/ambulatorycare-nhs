package uk.nhs.ambulatorycare.Scheduling;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.scheduling.annotation.Scheduled;
import uk.nhs.ambulatorycare.Exceptions.EmptyResultSetException;
import uk.nhs.ambulatorycare.Services.PushNotificationService;
import java.time.format.DateTimeFormatter;

//Source https://www.callicoder.com/spring-boot-task-scheduling-with-scheduled-annotation/
@Component
public class PushNotificationsSchedule {

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

    @Autowired
    private PushNotificationService pushNotificationService;

    //Schedule temperature push notifications to be sent every 6 hours.
    @Scheduled(fixedDelay = 21600000)
    public void SendTemperaturePushNotifications() throws EmptyResultSetException, JsonProcessingException {
        pushNotificationService.SendPushNotificationsForTemperature();
    }
}