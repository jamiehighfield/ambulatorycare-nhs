package uk.nhs.ambulatorycare.Repositories.Interfaces;

import uk.nhs.ambulatorycare.Entities.FluidItem;
import java.util.List;

public interface IFluidIntakeRepository {
    List <FluidItem> GetFluidsByPatient(Long id);

    void InsertPatientFluidItem(Integer patientID, String description, String dateTime, Integer amount);
}
