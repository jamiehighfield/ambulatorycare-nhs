//package uk.nhs.ambulatorycare.Configuration;
//
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.boot.jdbc.DataSourceBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Primary;
//
//import javax.sql.DataSource;
//
//public class DatabaseConfiguration {
//
//    @Bean
//    @Primary
//    //@ConfigurationProperties(prefix = "spring.datasource")
//    public DataSource getDataSource() {
//        return DataSourceBuilder
//                .create()
//                .username("root")
//                .password("root")
//                .url("localhost:3306")
//                .build();
//    }
//}