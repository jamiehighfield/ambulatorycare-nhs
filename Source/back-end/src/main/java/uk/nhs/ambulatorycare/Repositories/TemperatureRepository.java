package uk.nhs.ambulatorycare.Repositories;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;
import uk.nhs.ambulatorycare.Entities.Temperature;
import uk.nhs.ambulatorycare.Exceptions.EmptyResultSetException;
import uk.nhs.ambulatorycare.Repositories.Interfaces.ITemperatureRepository;
import uk.nhs.ambulatorycare.Repositories.RepositoryBase;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class TemperatureRepository extends RepositoryBase implements ITemperatureRepository {

    // Add temperature sql insertion
    public void AddTemperature(long id, float temperature) {
        Database.update("INSERT INTO temperature ( `FK_patient_id`, `date_time`, `temperature`)" +
                "VALUES ( "+id+",  NOW(), "+temperature+" ); ");
    }


    public ArrayList<Temperature> DisplayTemperatures(long id, ArrayList<Temperature> temperatures) throws EmptyResultSetException {
        temperatures = Database.query("SELECT * FROM temperature WHERE FK_patient_id = "+id+" ORDER BY date_time DESC;", new ResultSetExtractor<ArrayList<Temperature>>(){
            @Override
            public ArrayList<Temperature> extractData(ResultSet rs) throws SQLException, DataAccessException {
                // Contains extracted query result
                ArrayList<Temperature> result = new ArrayList<Temperature>();

                while (rs.next() == true) {
                    // Each query result returned will be of object type Temperature that can be added to the new list
                    result.add(new Temperature(rs.getLong("PK_id"), rs.getLong("FK_patient_id"), rs.getDate("date_time"), rs.getFloat("temperature")));

                }

                return result;
            }
        });

        if (temperatures == null) {
            throw new EmptyResultSetException();
        }
        return temperatures;


    }

    public List<Temperature> GetCurrentTemperatures() throws EmptyResultSetException{
        List<Temperature> result = Database.query("SELECT * FROM current_temperatures", new ResultSetExtractor<List<Temperature>>() {
            @Override
            public List<Temperature> extractData(ResultSet rs) throws SQLException, DataAccessException {
                List<Temperature> innerResult = new ArrayList<Temperature>();

                while (rs.next() == true) {
                    innerResult.add(new Temperature(rs.getLong("PK_id"), rs.getLong("FK_patient_id"), rs.getDate("date_time"), rs.getFloat("temperature")));
                }

                return innerResult;
            }
        });

        if (result == null) {
            throw new EmptyResultSetException();
        }

        return result;
    }
}
