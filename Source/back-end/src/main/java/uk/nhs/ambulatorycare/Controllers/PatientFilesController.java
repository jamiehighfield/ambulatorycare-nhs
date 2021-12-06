package uk.nhs.ambulatorycare.Controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uk.nhs.ambulatorycare.Services.PatientFilesService;

@Controller
public class PatientFilesController{
    @Autowired
    private PatientFilesService fileService;

    //create patient xml and pdf file
    @RequestMapping("api/v1/patient/{id}/createPatientFile")
    @ResponseBody
    public void CreatePatientFile(@PathVariable Integer id){
        fileService.createPatientFile((long)id);
    }
}
