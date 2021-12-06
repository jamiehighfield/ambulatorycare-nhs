package uk.nhs.ambulatorycare.Repositories;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;
import uk.nhs.ambulatorycare.Entities.Activity;
import uk.nhs.ambulatorycare.Exceptions.EmptyResultSetException;
import uk.nhs.ambulatorycare.Repositories.Interfaces.IActivityRepository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.sql.ResultSet;
import java.util.List;

@Repository
public class ActivityRepository extends RepositoryBase  implements IActivityRepository {

    public void AddActivity(long id, String name, int duration) {
            // Insert new activity.
        Database.update("INSERT INTO activities ( `FK_patient_id`, `name`, `length_of_time`, `date_time`, `step_count`)" +
                "VALUES ("+id+", '"+name+"', "+duration+",  NOW(), null ); ");

        System.out.println("Activity Added...");
    }


    public ArrayList<Activity> DisplayActivities(long id, ArrayList<Activity> activities) throws EmptyResultSetException {
        // Get all the activities created by the user that is logged in, in order of most recent.
      activities = Database.query("SELECT * FROM activities WHERE FK_patient_id = "+id+" ORDER BY date_time DESC;", new ResultSetExtractor<ArrayList<Activity>>(){
            @Override
            public ArrayList<Activity> extractData(ResultSet rs) throws SQLException, DataAccessException {
                    // A new List to contain the result of the query.
                ArrayList<Activity> result = new ArrayList<Activity>();

                while (rs.next() == true) {
                        // take each record returned and turn it into a object of type Activity and Add it to the new List.
                    result.add(new Activity(rs.getLong("PK_id"), rs.getLong("FK_patient_id"), rs.getString("name"), rs.getInt("length_of_time"), rs.getDate("date_time"), rs.getInt("step_count")));

                }

                return result;
            }
        });

        if (activities == null) {
            throw new EmptyResultSetException();
        }

        System.out.println("Activities Displayed...");

        return activities;


    }

}