-- Updated by Jamie 21/03/2019

DROP SCHEMA IF EXISTS `ambi_care_db` ;
CREATE SCHEMA `ambi_care_db`;
USE ambi_care_db;

create table health_care_professionals
(
  PK_id int auto_increment
    primary key,
  first_name varchar(64) not null,
  last_name varchar(64) not null,
  contact_number varchar(11) not null,
  constraint health_care_professionals_PK_id_uindex
    unique (PK_id)
)
;

create table patients
(
  PK_id int auto_increment
    primary key,
  first_name varchar(64) not null,
  last_name varchar(64) not null,
  nhs_number varchar(64) not null,
  email_address varchar(64) not null,
  contact_number varchar(11) null,
  start_date date null,
  FK_health_care_professional int not null,
  constraint patients_PK_id_uindex
    unique (PK_id),
  constraint patients_nhs_number_uindex
    unique (nhs_number),
  constraint patients_email_address_uindex
    unique (email_address),
  constraint patients_health_care_professionals_PK_id_fk
    foreign key (FK_health_care_professional) references health_care_professionals (PK_id)
)
;

create table notes
(
  PK_id int auto_increment
    primary key,
  FK_patient_id int not null,
  date date not null,
  description text not null,
  FK_created_by_account_id int not null,
  constraint notes_PK_id_uindex
    unique (PK_id),
  constraint notes_PK_id_uindex_2
    unique (PK_id),
  constraint notes_patients_PK_id_fk
    foreign key (FK_patient_id) references patients (PK_id)
)
;

create index notes_patients_PK_id_fk
  on notes (FK_patient_id)
;

create index patients_health_care_professionals_PK_id_fk
  on patients (FK_health_care_professional)
;

create table problems
(
  PK_id int auto_increment
    primary key,
  FK_patient_id int not null,
  date_time datetime not null,
  type varchar(64) not null,
  description text not null,
  constraint problems_PK_id_uindex
    unique (PK_id),
  constraint problems_patients_PK_id_fk
    foreign key (FK_patient_id) references patients (PK_id)
)
;

create index problems_patients_PK_id_fk
  on problems (FK_patient_id)
;

create table security_questions
(
  PK_id int auto_increment
    primary key,
  question varchar(128) not null,
  deleted tinyint(1) default '0' not null,
  constraint security_questions_PK_id_uindex
    unique (PK_id),
  constraint security_questions_question_uindex
    unique (question)
)
;

create table accounts
(
  PK_id int auto_increment
    primary key,
  FK_patient_id int not null,
  username varchar(64) not null,
  password_hash varchar(128) null,
  first_name varchar(64) not null,
  last_name varchar(64) not null,
  email_address varchar(64) not null,
  FK_security_question_id int not null,
  answer_hash varchar(128) not null,
  account_type int null,
  deleted tinyint(1) default '0' null,
  constraint accounts_PK_id_uindex
    unique (PK_id),
  constraint accounts_username_uindex
    unique (username),
  constraint accounts_patients_PK_id_fk
    foreign key (FK_patient_id) references patients (PK_id),
  constraint accounts_security_questions_PK_id_fk
    foreign key (FK_security_question_id) references security_questions (PK_id)
)
;

create index accounts_patients_PK_id_fk
  on accounts (FK_patient_id)
;

create index accounts_security_questions_PK_id_fk
  on accounts (FK_security_question_id)
;

create table activities
(
  PK_id int auto_increment
    primary key,
  FK_patient_id int not null,
  name varchar(64) not null,
  length_of_time int not null,
  date_time datetime not null,
  step_count int null,

  constraint activities_PK_id_uindex
    unique (PK_id),
  constraint activities_patients_PK_id_fk
    foreign key (FK_patient_id) references patients (PK_id)
)
;

create index activities_patients_PK_id_fk
  on activities (FK_patient_id)
;

create table food_intake
(
  PK_id int auto_increment
    primary key,
  FK_patient_id int not null,
  date_time datetime not null,
  title text,
  description text,
  amount text not null,
  constraint food_intake_PK_id_uindex
    unique (PK_id),
  constraint food_intake_patients_PK_id_fk
    foreign key (FK_patient_id) references patients (PK_id)
)
;



create index food_intake_patients_PK_id_fk
  on food_intake (FK_patient_id)
;

create table liquid_intake
(
  PK_id int auto_increment
    primary key,
  FK_patient_id int not null,
  date_time datetime not null,
  description text not null,
  amount int not null,
  constraint liquid_intake_patients_PK_id_fk
    foreign key (FK_patient_id) references patients (PK_id)
)
;

create index liquid_intake_patients_PK_id_fk
  on liquid_intake (FK_patient_id)
;

create table temperature
(
  PK_id int auto_increment
    primary key,
  FK_patient_id int not null,
  date_time datetime not null,
  temperature float not null,
  constraint temperature_PK_id_uindex
    unique (PK_id),
  constraint temperature_patients_PK_id_fk
    foreign key (FK_patient_id) references patients (PK_id)
)
;

create index temperature_patients_PK_id_fk
  on temperature (FK_patient_id)
;

create table mood_scale
(
  PK_id int auto_increment
    primary key,
  FK_patient_id int not null,
  date_time datetime not null,
  mood_rating int not null,
constraint mood_scale_PK_id_uindex
    unique (PK_id),
constraint mood_scale_PK_id_fk
    foreign key (FK_patient_id) references patients (PK_id)
)
;

create index mood_scale_patients_PK_id_fk
  on mood_scale (FK_patient_id)
;

alter table food_intake
	add title varchar(64) not null;

alter table food_intake modify amount Varchar(64) not null;

create table devices
(
	PK_id int auto_increment,
	FK_account_id int not null,
	push_token varchar(64) not null,
	constraint devices_pk
		primary key (PK_id),
	constraint devices_accounts_PK_id_fk
		foreign key (FK_account_id) references accounts (PK_id)
);

CREATE VIEW current_temperatures AS SELECT * FROM temperature WHERE DATE(temperature.date_time) = DATE(NOW());