/*------------------------------------
--------------------------------------
		USER MANAGEMENT  
 -------------------------------------
 -----------------------------------*/
 
 -- using the mysql database
 USE mysql;
 
 -- viewing the user table to see which users are on the system
 SELECT * FROM user;
 
 -- check current user
 SELECT user();
 
 -- creating user who can connect through localhost
 CREATE USER 'ambicareAdmin'@'localhost' IDENTIFIED BY 'AmbicareAdminPass';
 FLUSH PRIVILEGES;
 
 -- showing grants for user
 SHOW GRANTS FOR 'ambicareAdmin'@'localhost';
 
 -- granting privileges to user so that they can use the db
 GRANT CREATE, INDEX, ALTER, DROP, SELECT, INSERT, UPDATE, REFERENCES ON ambi_care_db.* TO 'ambicareAdmin'@'localhost';
 FLUSH PRIVILEGES;
 
 SHOW GRANTS FOR 'ambicareAdmin'@'localhost';