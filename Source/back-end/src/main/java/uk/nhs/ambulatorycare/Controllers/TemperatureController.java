package uk.nhs.ambulatorycare.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uk.nhs.ambulatorycare.Exceptions.EmptyResultSetException;
import uk.nhs.ambulatorycare.Services.TemperatureService;

import java.util.ArrayList;

@Controller
public class TemperatureController extends ControllerBase {

    @Autowired
    JdbcTemplate Database;
    @Autowired
    TemperatureService temperatureService;

    // Add temperature method
    @PostMapping("/api/v1/add/temperature")
    @ResponseBody
    public void AddTemperature(@RequestParam float temperature) {
        temperatureService.addTemperature(temperature);
    }

    // Display temperatures method
    @RequestMapping("/api/v1/display/temperatures")
    @ResponseBody
    public ArrayList DisplayTemperatures() {
        return temperatureService.displayTemperatures();
    }

    }
