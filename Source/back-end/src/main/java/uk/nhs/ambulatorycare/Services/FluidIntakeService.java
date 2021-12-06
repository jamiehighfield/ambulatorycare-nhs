package uk.nhs.ambulatorycare.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.nhs.ambulatorycare.Entities.FluidItem;
import uk.nhs.ambulatorycare.Repositories.Interfaces.IFluidIntakeRepository;
import java.util.List;

@Service
public class FluidIntakeService {

    @Autowired
    private IFluidIntakeRepository fluidIntakeRepository;

    public List<FluidItem> getFluidsByPatient(Long id) {
        List<FluidItem> fluids = fluidIntakeRepository.GetFluidsByPatient(id);
        return fluids;
    }

    public void insertPatientFluidItem(Integer id, String title, Integer amount, String dateTime) {
        fluidIntakeRepository.InsertPatientFluidItem(id, title, dateTime, amount);
    }
}
