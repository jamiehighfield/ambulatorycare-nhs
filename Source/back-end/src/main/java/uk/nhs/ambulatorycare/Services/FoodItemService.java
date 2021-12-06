package uk.nhs.ambulatorycare.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.nhs.ambulatorycare.Entities.FoodItem;
import uk.nhs.ambulatorycare.Repositories.Interfaces.IFoodIntakeRepository;
import java.util.List;

@Service
public class FoodItemService {

    @Autowired
    private IFoodIntakeRepository foodIntakeRepository;

    public List<FoodItem> getFoodByPatient(Long id) {
        List<FoodItem> food = foodIntakeRepository.GetFoodByPatient(id);
        return food;
    }

    public void insertPatientFood(String title, String amount, String description, String dateTime, Integer patientID) {
        foodIntakeRepository.InsertPatientFoodItem(title, amount, description, dateTime, patientID);
    }

}
