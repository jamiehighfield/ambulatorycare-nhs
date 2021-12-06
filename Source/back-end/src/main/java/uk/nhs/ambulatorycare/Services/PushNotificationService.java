package uk.nhs.ambulatorycare.Services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.nhs.ambulatorycare.Entities.Patient;
import uk.nhs.ambulatorycare.Entities.PushNotification;
import uk.nhs.ambulatorycare.Entities.PushNotificationToken;
import uk.nhs.ambulatorycare.Entities.Temperature;
import uk.nhs.ambulatorycare.Exceptions.EmptyResultSetException;
import uk.nhs.ambulatorycare.Repositories.Interfaces.IAccountsRepository;
import uk.nhs.ambulatorycare.Repositories.Interfaces.ITemperatureRepository;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
public class PushNotificationService extends ServiceBase {

    @Autowired
    private IAccountsRepository accountsRepository;

    @Autowired
    private ITemperatureRepository temperatureRepository;

    public void SendPushNotifications() throws EmptyResultSetException, JsonProcessingException {
        List<PushNotificationToken> pushNotificationTokens = accountsRepository.GetPushNotificationTokens();

        List<PushNotification> pushNotifications = new ArrayList<PushNotification>();

        for (PushNotificationToken token : pushNotificationTokens) {
            pushNotifications.add(new PushNotification(token.getToken(), "Test", "Test2"));
        }

        ObjectMapper mapper = new ObjectMapper();

        String pushNotificationsJson = mapper.writeValueAsString(pushNotifications);

        SendPushNotificationsToExpo(pushNotificationsJson);
    }

    //This service method is responsible for sending push notifications to users devices where patient's temperature readings
    //for the current period (today) is over a certain amount.
    public void SendPushNotificationsForTemperature() throws EmptyResultSetException, JsonProcessingException {
        //Working push notifications list.
        List<PushNotification> pushNotifications = new ArrayList<PushNotification>();

        //Get all temperatures in the current period (today).
        List<Temperature> currentTemperatures = temperatureRepository.GetCurrentTemperatures();

        for (Temperature temperature : currentTemperatures) {
            if (temperature.getTemperature() < 36 || temperature.getTemperature() > 38) {
                //This patient has either a low or a high temperature.

                //Get all the push notification tokens for this patient.

                List<PushNotificationToken> pushNotificationTokens = accountsRepository.GetPushNotificationTokensForPatient(temperature.getPatientId());

                //Get all the unique push notification tokens.

                List<PushNotificationToken> uniquePushNotificationTokens = new ArrayList<PushNotificationToken>();

                for (PushNotificationToken pushNotificationToken : pushNotificationTokens) {

                    boolean contains = false;

                    for (PushNotificationToken existingPushNotificationToken : uniquePushNotificationTokens) {
                        contains = existingPushNotificationToken.getToken().equals(pushNotificationToken.getToken());
                    }

                    if (contains == false) {
                        uniquePushNotificationTokens.add(new PushNotificationToken(pushNotificationToken.getId(), pushNotificationToken.getAccountId(), pushNotificationToken.getToken()));
                    }
                }

                if (temperature.getTemperature() < 36) {
                    for (PushNotificationToken uniquePushNotificationToken : uniquePushNotificationTokens) {
                        pushNotifications.add(new PushNotification(uniquePushNotificationToken.getToken(), "Temperature Warning", "Warning! Your temperature is very low today. Please contact the ward immediately."));
                    }
                } else {
                    for (PushNotificationToken uniquePushNotificationToken : uniquePushNotificationTokens) {
                        pushNotifications.add(new PushNotification(uniquePushNotificationToken.getToken(), "Temperature Warning", "Warning! Your temperature is very high today. Please contact the ward immediately."));
                    }
                }
            }
        }

        //Checks if a patient has entered a temperature at all.
        List<Patient> patients = accountsRepository.GetPatients();

        for (Patient patient : patients) {
            boolean contains = false;

            for (Temperature temperature : currentTemperatures) {
                contains =  (temperature.getPatientId() == patient.getId());
            }

            if (contains == false) {
                //Get all the push notification tokens for this patient.

                List<PushNotificationToken> pushNotificationTokens = accountsRepository.GetPushNotificationTokensForPatient(patient.getId());

                //Get all the unique push notification tokens.

                List<PushNotificationToken> uniquePushNotificationTokens = new ArrayList<PushNotificationToken>();

                for (PushNotificationToken pushNotificationToken : pushNotificationTokens) {

                    contains = false;

                    for (PushNotificationToken existingPushNotificationToken : uniquePushNotificationTokens) {
                        contains = existingPushNotificationToken.getToken().equals(pushNotificationToken.getToken());
                    }

                    if (contains == false) {
                        uniquePushNotificationTokens.add(new PushNotificationToken(pushNotificationToken.getId(), pushNotificationToken.getAccountId(), pushNotificationToken.getToken()));
                    }
                }

                for (PushNotificationToken uniquePushNotificationToken : uniquePushNotificationTokens) {
                    pushNotifications.add(new PushNotification(uniquePushNotificationToken.getToken(), "Temperature Warning", "Warning! You have not entered a temperature reading today - it is important that you do this regularly."));
                }
            }
        }

        ObjectMapper mapper = new ObjectMapper();

        String pushNotificationsJson = mapper.writeValueAsString(pushNotifications);

        SendPushNotificationsToExpo(pushNotificationsJson);
    }

    //Source http://guruparang.blogspot.com/2016/01/example-on-working-with-json-and.html
    private String SendPushNotificationsToExpo(String notifications) {
        HttpURLConnection connection = null;
        try {

            URL u = new URL("https://exp.host/--/api/v2/push/send");
            connection = (HttpURLConnection) u.openConnection();
            connection.setRequestMethod("POST");

            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Host", "exp.host");
            connection.setRequestProperty("Accept", "application/json");
            connection.setRequestProperty("Accept-Encoding", "gzip, deflate");
            connection.setRequestProperty("Content-Type", "application/json");

            connection.setAllowUserInteraction(false);

            connection.setRequestProperty("Content-length", notifications.getBytes().length + "");
            connection.setDoInput(true);
            connection.setDoOutput(true);
            connection.setUseCaches(false);

            OutputStream outputStream = connection.getOutputStream();
            outputStream.write(notifications.getBytes("UTF-8"));
            outputStream.close();

            connection.connect();

            int status = connection.getResponseCode();

            switch (status) {
                case 200:
                case 201:
                    BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                    StringBuilder sb = new StringBuilder();
                    String line;
                    while ((line = bufferedReader.readLine()) != null) {
                        sb.append(line + "\n");
                    }
                    bufferedReader.close();

                    return sb.toString();
            }
        } catch (Exception exception) {
        } finally {
            if (connection != null) {
                try {
                    connection.disconnect();
                } catch (Exception exception) {
                }
            }
        }
        return null;
    }
}