package uk.nhs.ambulatorycare.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uk.nhs.ambulatorycare.Entities.FoodItem;
import uk.nhs.ambulatorycare.Services.FoodItemService;
import uk.nhs.ambulatorycare.Authentication.UserIdentity;

import java.util.List;

@Controller
public class FoodIntakeController {

    @Autowired
    private FoodItemService foodService;

    //get the users food intake
    @RequestMapping("api/v1/patient/{id}/food-intake")
    @ResponseBody
    public List<FoodItem> GetPatientFood(@PathVariable Integer id) {
        System.out.println("Patient: " + id);
        return foodService.getFoodByPatient((long) id);
    }

    //post food item to DB
    @RequestMapping(path="api/v1/patient/{id}/add-food", method=RequestMethod.POST)
    @ResponseBody
    public void AddPatientFood(@PathVariable Integer id, @RequestParam String title, @RequestParam(required = false) String description, @RequestParam String dateTime, @RequestParam String amount) {
        System.out.println("parameters = " + id + title + description + amount + dateTime);
        foodService.insertPatientFood(title, amount, description, dateTime, id);
    }
}
