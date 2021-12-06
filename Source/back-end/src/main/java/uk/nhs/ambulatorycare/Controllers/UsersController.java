package uk.nhs.ambulatorycare.Controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uk.nhs.ambulatorycare.Authentication.UserIdentity;
import uk.nhs.ambulatorycare.Entities.PatientIdentity;
import uk.nhs.ambulatorycare.Exceptions.EmptyResultSetException;
import uk.nhs.ambulatorycare.Services.AccountsService;
import uk.nhs.ambulatorycare.Services.PushNotificationService;

import java.io.UnsupportedEncodingException;

@Controller
public class UsersController extends ControllerBase {

    @Autowired
    private AccountsService accountsService;

    @Autowired
    private PushNotificationService pushNotificationService;

    //This gets the current user that is logged in (pertinent to the 'accounts' table in the database) and returns
    //it as a JSON string.
    @RequestMapping("/api/v1/authentication/user")
    @ResponseBody
    public UserIdentity GetUserIdentity() {
        return GetUser();
    }

    //This gets the current patient that is associated with the user that is currently logged in (pertinent to the
    //'patients' table in the database) and returns it as a JSON string.
    @RequestMapping("/api/v1/authentication/patient")
    @ResponseBody
    public PatientIdentity GetPatientIdentity() throws EmptyResultSetException {
        return accountsService.GetPatient();
    }

    //This endpoint registers a new user for a particular patient, using their first name, last name, date of birth
    //and NHS number as verification.
    @RequestMapping("/api/v1/account/register")
    @ResponseBody
    public UserIdentity RegisterAccount(
            @RequestParam("patient_first_name") String patientFirstName,
            @RequestParam("patient_last_name") String patientLastName,
            @RequestParam("patient_dob") String patientDateOfBirth,
            @RequestParam("patient_nhs_number") String patientNhsNumber,
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            @RequestParam("security_question_id") long securityQuestionId,
            @RequestParam("security_question_answer") String securityQuestionAnswer) throws EmptyResultSetException {

        //Check for server side details validation. This must be done at least on the server because
        //users could artificially create their requests.
        if (patientFirstName == null || patientFirstName.equals("")) {
            return null;
        }
        if (patientLastName == null || patientLastName.equals("")) {
            return null;
        }
        if (patientDateOfBirth == null || patientDateOfBirth.equals("")) {
            return null;
        }
        if (patientNhsNumber == null || patientNhsNumber.equals("")) {
            return null;
        }
        if (username == null || username.equals("")) {
            return null;
        }
        if (password == null || password.equals("")) {
            return null;
        }

        if (securityQuestionAnswer == null || securityQuestionAnswer.equals("")) {
            return null;
        }

        return accountsService.RegisterAccount(
                patientFirstName,
                patientLastName,
                patientDateOfBirth,
                patientNhsNumber,
                username,
                password,
                securityQuestionId,
                securityQuestionAnswer);
    }


    //This endpoint registers a new user for a particular patient, using their first name, last name, date of birth
    //and NHS number as verification.
    @RequestMapping("/api/v1/account/verify")
    @ResponseBody
    public PatientIdentity VerifyPatient(
            @RequestParam("patient_first_name") String firstName,
            @RequestParam("patient_last_name") String lastName) throws EmptyResultSetException {
        //Check for server side details validation. This must be done at least on the server because
        //users could artificially create their requests.
        if (firstName == null || firstName.equals("")) {
            return null;
        }
        if (lastName == null || lastName.equals("")) {
            return null;
        }

        return accountsService.VerifyPatient(
            firstName,
            lastName);
    }

    @RequestMapping("/api/v1/account/push-notifications-register")
    @ResponseBody
    public void RegisterForPushNotifications(
            @RequestParam("push_notification_token") String pushNotificationToken) throws EmptyResultSetException, UnsupportedEncodingException {
        if (pushNotificationToken == null || pushNotificationToken.equals("")) {
            return;
        }

        //Source for decoding https://www.leveluplunch.com/java/examples/decode-base64-string/

        String encodedPhrase = pushNotificationToken;

        byte[] decodedPhraseAsBytes = java.util.Base64.getDecoder().decode(encodedPhrase);

        String phraseDecodedToString = new String(decodedPhraseAsBytes, "utf-8");

        accountsService.RegisterForPushNotifications(phraseDecodedToString);
    }

    @RequestMapping("/send-push")
    @ResponseBody
    public void SendPushNotifications() throws EmptyResultSetException, JsonProcessingException {
        pushNotificationService.SendPushNotifications();
    }

    @RequestMapping("/send-push/temperature")
    @ResponseBody
    public void SendPushNotificationsTemperature() throws EmptyResultSetException, JsonProcessingException {
        pushNotificationService.SendPushNotificationsForTemperature();
    }
}