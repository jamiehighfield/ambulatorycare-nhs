-- Health_care_professional
INSERT INTO health_care_professionals (`first_name`, `last_name`, `contact_number` )
VALUES ('Heather', 'Smith', '07535650197');

-- Patient
INSERT INTO patients (`first_name`, `last_name`, `nhs_number`, `email_address`, `contact_number`, `start_date`, `FK_health_care_professional`)
VALUES ('Jamie', 'Highfield', 'asd', 'jamie@dev.co.uk', '07123456487', '2019-03-12', 1);


-- activitiy
INSERT INTO activities ( `FK_patient_id`, `name`, `length_of_time`, `date_time`, `step_count`)  
VALUES ( 1, 'walk', 20,  NOW(), null ); 

-- food intake
INSERT INTO food_intake (`FK_patient_id`, `date_time`, `title`, `description`, `amount`)
	VALUES (1, '2019-01-02 10:23:00', 'Porridge', 'Porridge with fruit and honey', '1 Bowl');
INSERT INTO food_intake (`FK_patient_id`, `date_time`, `title`, `description`, `amount`)
	VALUES (1, '2019-01-02 12:33:00', 'Apple', 'Apple', '1');
INSERT INTO food_intake (`FK_patient_id`, `date_time`, `title`, `description`, `amount`)
	VALUES (1, '2019-01-02 15:33:00', 'Crisps', 'Small bag of ready salted crisps', '40g');
    
-- temperature
INSERT INTO temperature ( `FK_patient_id`, `date_time`, `temperature`)  
	VALUES ( 1, NOW(), 36.3);
INSERT INTO temperature ( `FK_patient_id`, `date_time`, `temperature`)  
	VALUES ( 1, NOW(), 37.5);
INSERT INTO temperature ( `FK_patient_id`, `date_time`, `temperature`)  
	VALUES ( 1, NOW(), 38.2);

INSERT INTO `security_questions` (`question`, `deleted`) VALUES ('Dev Question 2', DEFAULT);

