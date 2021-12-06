package uk.nhs.ambulatorycare.Repositories.Interfaces;

import uk.nhs.ambulatorycare.Entities.Temperature;
import uk.nhs.ambulatorycare.Exceptions.EmptyResultSetException;

import java.util.ArrayList;
import java.util.List;

public interface ITemperatureRepository {

    void AddTemperature(long id, float temperature);

    ArrayList<Temperature> DisplayTemperatures(long id, ArrayList<Temperature> temperatures) throws EmptyResultSetException;

    List<Temperature> GetCurrentTemperatures() throws EmptyResultSetException;
}