package uk.nhs.ambulatorycare.Repositories;

import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;

import uk.nhs.ambulatorycare.Entities.FoodItem;
import uk.nhs.ambulatorycare.Repositories.Interfaces.IFoodIntakeRepository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.sql.ResultSet;
import java.sql.SQLException;


@Repository
public class FoodIntakeRepository extends RepositoryBase implements IFoodIntakeRepository {
    String pattern = "dd-MM-yyyy";
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

    //String date = simpleDateFormat.format(new Date());
    //Gets all food intake items for the specified patient using JDBC template in RepositoryBase
    public List<FoodItem> GetFoodByPatient(Long id) {
        try {
            return Database.query("SELECT title, description, amount, date_time FROM food_intake WHERE FK_patient_id = ?",
                    new Object[]{id},
                    (rs, rowNum) -> new FoodItem(
                            simpleDateFormat.format(rs.getDate("date_time")),
                            rs.getString("title"),
                            rs.getString("description"),
                            rs.getString("amount")
                    ));
        } catch (EmptyResultDataAccessException e){
            return null;
        }
    }

    //Add a food item for patient into DB
    public void InsertPatientFoodItem(String title, String amount, String description, String dateTime, Integer patientID) {
        Database.update("INSERT INTO food_intake (FK_patient_id, date_time, title, description, amount) VALUES (?, ?, ?, ? ,?)", patientID, dateTime, title, description, amount);
    }
}
