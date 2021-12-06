package uk.nhs.ambulatorycare.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.nhs.ambulatorycare.Entities.Temperature;
import uk.nhs.ambulatorycare.Exceptions.EmptyResultSetException;
import uk.nhs.ambulatorycare.Repositories.Interfaces.ITemperatureRepository;
import uk.nhs.ambulatorycare.Repositories.TemperatureRepository;

import java.util.ArrayList;

@Service
public class TemperatureService extends ServiceBase{

    @Autowired
    private TemperatureRepository temperatureRepository;

    @Autowired
    private ITemperatureRepository iTemperatureRepository;

    public void addTemperature(float temperature) {
        // receives user ID from the authentication token
        temperatureRepository.AddTemperature(GetUser().getPatientId(), temperature);
    }


    public ArrayList<Temperature> displayTemperatures() {
        ArrayList<Temperature> temperatures = new ArrayList<>();
        try {
            return temperatureRepository.DisplayTemperatures(GetUser().getPatientId(), temperatures);
        } catch (EmptyResultSetException e) {
            e.printStackTrace();
        }

        return temperatures;
    }
}
