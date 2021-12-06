package uk.nhs.ambulatorycare.Repositories.Interfaces;
//import uk.nhs.ambulatorycare.Exceptions.EmptyResultSetException;
import  uk.nhs.ambulatorycare.Entities.FoodItem;
import java.util.List;

public interface IFoodIntakeRepository {
    List <FoodItem> GetFoodByPatient(Long id);

    void InsertPatientFoodItem(String title, String amount, String description, String dateTime, Integer patientID);
}
