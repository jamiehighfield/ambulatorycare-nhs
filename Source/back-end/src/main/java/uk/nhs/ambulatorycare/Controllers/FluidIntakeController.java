package uk.nhs.ambulatorycare.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uk.nhs.ambulatorycare.Entities.FluidItem;
import uk.nhs.ambulatorycare.Services.FluidIntakeService;

import java.util.List;

@Controller
public class FluidIntakeController {
    @Autowired
    private FluidIntakeService fluidService;

    //Get patient fluid intake
    @RequestMapping("api/v1/patient/{id}/fluid-intake")
    @ResponseBody
    public List<FluidItem> GetPatientFluids(@PathVariable Integer id) {
        return fluidService.getFluidsByPatient((long) id);
    }

    //post fluid item to DB
    @RequestMapping(path="ap/v1/patient/{id}/add-fluids",
    method=RequestMethod.POST)
    @ResponseBody
    public void addPatientFluids(@PathVariable Integer id, @RequestParam String dateTime, @RequestParam String title, @RequestParam Integer amount) {
        System.out.println("Parameters = " + id + title + dateTime + amount);
        fluidService.insertPatientFluidItem(id, title, amount, dateTime);
    }
}
