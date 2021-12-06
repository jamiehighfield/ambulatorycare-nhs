package uk.nhs.ambulatorycare.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.nhs.ambulatorycare.Entities.Activity;
import uk.nhs.ambulatorycare.Exceptions.EmptyResultSetException;
import uk.nhs.ambulatorycare.Repositories.ActivityRepository;
import uk.nhs.ambulatorycare.Repositories.Interfaces.IActivityRepository;

import java.util.ArrayList;


@Service
public class ActivityService extends ServiceBase {

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private IActivityRepository iActivityRepository;

    public void addActivity (String name, int duration) {
        // Get the user ID from the ServiceBase class, which gets it from the Authentication token.
        activityRepository.AddActivity(GetUser().getPatientId(), name, duration);
    }


    public ArrayList<Activity> displayActivities() {
        ArrayList<Activity> activities = new ArrayList<>();
        try {
            return activityRepository.DisplayActivities(GetUser().getPatientId(), activities);
        } catch (EmptyResultSetException e) {
            e.printStackTrace();
        }

        return activities;
    }
}



