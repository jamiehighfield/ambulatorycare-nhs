package uk.nhs.ambulatorycare.Scheduling;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import uk.nhs.ambulatorycare.Entities.Patient;
import uk.nhs.ambulatorycare.Exceptions.EmptyResultSetException;
import uk.nhs.ambulatorycare.Repositories.Interfaces.IAccountsRepository;
import uk.nhs.ambulatorycare.Services.PatientFilesService;

import java.util.List;

@Component
public class createPatientFile {
    @Autowired
    private IAccountsRepository accountInterface;
    @Autowired
    private PatientFilesService fileService;

    @Scheduled(fixedDelay = 86400000) //calls below method every 24 hours
    //@Scheduled(fixedDelay = 10000) //call every 10 seconds for testing purposes
    public void createPatientFiles() throws EmptyResultSetException {
        List<Patient> patients = accountInterface.GetPatients();
        for(int i = 0; i < patients.size(); i++){
            Long id = patients.get(i).getId();
            fileService.createPatientFile(id);
        }
    }

}
