package uk.nhs.ambulatorycare.Repositories;

import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;
import uk.nhs.ambulatorycare.Entities.FluidItem;
import uk.nhs.ambulatorycare.Repositories.Interfaces.IFluidIntakeRepository;

import java.text.SimpleDateFormat;
import java.util.List;

@Repository
public class FluidIntakeRepository extends RepositoryBase implements IFluidIntakeRepository{

    String pattern = "dd-MM-yyyy";
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
    //returns all liquid intake for patient
    public List<FluidItem> GetFluidsByPatient(Long id) {
        try {
            return Database.query("SELECT title, date_time, amount FROM liquid_intake WHERE FK_patient_id = ?",
                    new Object[]{id},
                    (rs, rowNum) -> new FluidItem(
                            simpleDateFormat.format(rs.getDate("date_time")),
                            rs.getString("title"),
                            new Integer(rs.getInt("amount"))
                    ));
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    //insert liquid item for patient
    public void InsertPatientFluidItem(Integer patientID, String title, String dateTime, Integer amount) {
        Database.update("INSERT INTO liquid_intake (FK_patient_id, date_time, title, amount) VALUES (?, ?, ? ,?)", patientID, dateTime, title, amount);
    }
}
