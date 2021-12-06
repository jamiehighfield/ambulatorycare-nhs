package uk.nhs.ambulatorycare;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import uk.nhs.ambulatorycare.Extensions.Console;

import javax.sql.DataSource;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@EnableScheduling
public class Program implements CommandLineRunner {

//    public Program(JdbcTemplate database) {
//        Database = database;
//    }

    public static void main(String[] args) {
        SpringApplication.run(Program.class, args);
    }

    @Autowired
    private JdbcTemplate Database;

    @Override
    public void run(String... args) throws Exception {
        Console.WriteLine("");
        Console.WriteLine("--------------------------------------------------------------------");

        writeTitle();

        Console.WriteLine("Initialising database...");

        resetDatabase();
        runMigrations();
    }

    public void writeTitle() {
        Console.WriteLine("");
        Console.WriteLine("NHS Ambulatory Care");
        Console.WriteLine("");
    }

    public void resetDatabase() {
        Console.WriteLine("Resetting database...");

//        Database.execute("DROP DATABASE ambulatorycare;");
//        Database.execute("CREATE DATABASE ambulatorycare;");
    }

    public void runMigrations() {
        Console.WriteLine("Running migrations...");
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}