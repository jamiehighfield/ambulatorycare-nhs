package uk.nhs.ambulatorycare.Repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

public abstract class RepositoryBase {
    
    @Autowired
    public JdbcTemplate Database;
}