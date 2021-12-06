package uk.nhs.ambulatorycare.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.nhs.ambulatorycare.Repositories.Interfaces.IFoodIntakeRepository;
import uk.nhs.ambulatorycare.Repositories.Interfaces.IPatientFilesRepository;

import java.util.List;

@Service
public class PatientFilesService {
    @Autowired
    private IPatientFilesRepository filesRepository;

    public void createPatientFile(Long id) {
        filesRepository.createXMLPatientWeek(id);
    }
}
