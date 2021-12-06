package uk.nhs.ambulatorycare.Controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uk.nhs.ambulatorycare.Entities.Activity;
import uk.nhs.ambulatorycare.Exceptions.EmptyResultSetException;
import uk.nhs.ambulatorycare.Services.ActivityService;


import java.util.ArrayList;
import java.util.List;

@Controller
public class ActivityController extends ControllerBase {

    @Autowired
    JdbcTemplate Database;
    @Autowired
    ActivityService activityService;

    // Add Activity
    @RequestMapping("/api/v1/add/activity")
    @ResponseBody
    public void AddActivity(@RequestParam String name, @RequestParam int duration) {
      activityService.addActivity(name, duration);

    }

    // Get Activities made by the user by id
    @RequestMapping("/api/v1/display/activities")
    @ResponseBody
    public ArrayList DisplayActivities(){
        return activityService.displayActivities();
    }

}
