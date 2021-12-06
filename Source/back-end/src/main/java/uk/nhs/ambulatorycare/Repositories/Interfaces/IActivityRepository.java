package uk.nhs.ambulatorycare.Repositories.Interfaces;

import uk.nhs.ambulatorycare.Entities.Activity;
import uk.nhs.ambulatorycare.Exceptions.EmptyResultSetException;

import java.util.ArrayList;

public interface IActivityRepository {

     void AddActivity(long id, String name, int duration);

     ArrayList<Activity> DisplayActivities(long id, ArrayList<Activity> activities) throws EmptyResultSetException;

}