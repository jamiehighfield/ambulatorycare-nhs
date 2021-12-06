#!/bin/bash

echo "updating..."
yum update -y

echo "upgrading..."
yum upgrade -y

# --- Download and install WGET, needed to download MySQL and Gradle

echo "Downloading & installing WGET..."	
yum -y install wget

echo "Downloading & installing MySQL Server..."
wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm
rpm -ivh mysql-community-release-el7-5.noarch.rpm
yum -y install mysql-server

# remove the rpm file as this is no longer needed
rm mysql-community-release-el7-5.noarch.rpm

# --- Download and install the Java Development Kit (JDK)

echo "Downloading & installing JDK..."

# download and install the latest version of the JDK (no version is specified here - the latest version
# is automatically downloaded.
yum -y install java-devel

# --- Start MySQL Server

echo "Starting MySQL Server..."
systemctl start mysqld

# --- Download and install unzip

yum -y install unzip

# --- Download and install Gradle

echo "Downloading and deflating Gradle..."

wget https://services.gradle.org/distributions/gradle-5.2.1-bin.zip

mkdir gradle

unzip gradle-5.2.1-bin.zip -d gradle

# remove the zip file as this is no longer needed
rm gradle-5.2.1-bin.zip

# --- Download and install Git

echo "Downloading & installing Git..."
yum -y install git

# --- Installing Git distribution key

echo "Installing Git distribution key..."

# --- Add gitlab.cs.cf.ac.uk as a known host

chmod 775 ~/.ssh

touch ~/.ssh/known_hosts
ssh-keyscan gitlab.cs.cf.ac.uk >> ~/.ssh/known_hosts
chmod 644 ~/.ssh/known_hosts

# --- Install private key for database repository
touch gitlab_project_keypair.key
cat << `EOF` >> gitlab_project_keypair.key
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAsVp3ZKaXzL0Mb/AsH+E5PKBWmxatklJBArcSuM7EGr/4adN7
ribQjIqGgYJ87i6mAVOU9wk4hSGUUY78KegmiwvIk7dATZ/KMqz/gIBcsGw2+i0T
FTIXJnhHkBXe9Z/UeHjUS4I6CheWaAFpdG8DLkLNQEMpUCnDD9jVs7WlLz9YCR0I
cQqFSv0j2qIctJAM5UEtcMWTMn+ykNdiV2z994JduZXBvDKic9hTLa7kd/zn+XD9
vZUjokjuNU6ifPWBthdZyQWy7Z4BryaWY5m1kiv+gbYHRArqJpcfd3Tc4ATHg12t
HgwHTHfSwB/CncwDSm7U7NicMwg+FxMCtLC/3wIDAQABAoIBAErga+nVn98zrY2Q
88Ad4YFkHExr/an6CjJwQno96XN1uxZK0DvNbVz4myMQiVgx36pNtGW7wd4LOEha
usGinqsztWIQCxj6rm5ItbJ1/ywI9AkZgKYBON7oByag5ToEWbrnIJIkkAZ0wO52
MiSTPd+JGojYEhgjGZSWMlsmBHB2dOf767srFTEInEkuBCQHpihMOdgkHFZJ4UjH
yvFxhvTnzD42998tjv1BO7O1neNPlACewpiOwzc+SqLMb5Q1+i1+mwqpy6N57vPi
hawWCPMNWgVt6RVmIMVqBwiGf5FpjIC/p06fR0gDnYkoWD5jPOC+ANmv/6VDkOya
7I6YRJkCgYEA2e+ghwag8x2AGKYiTAKQU78f0S7nQ+wk6nDRIwAPyHDM2s7QlEda
sYZGBQcvgYiFJR9q//mZdS/itZwTzpVMBjrjvvcHxEdhjP5RIXKZA1DgR8SKqDY5
YEaRuZWnM5Vb6PQh3OZzSQ22V4rXY6GrPxDsx2ZQYeQhUiGeohRJJhsCgYEA0FRN
7FVpWtkn/CwRVNN0+ZwXvJtNBtXdLWmUNPxfkJBtF8HyiltSZvEkC/z62hrWhQRk
PePMWV9fPJz57dn5DEY5rbOb7gbl7yoK/Cz4GcSqWFAMmlbkA4JYFxzYn9PSqZjT
prWIWV2HmB+bF247N1dR3vidEekZB7IGlsZseY0CgYEA0x52dLdwLXNzhu1Rpi6J
oAczDFKSiFL3hADcKDrED1luqbzVg/8HlZfMtsw6MhKNYOPppKUoCsTjqyjSazpn
1lUwEOt/o52+m3Y2I9++6N5tFjkIVWGJ/YD/ZDfcLHVQ/v+Y2kSIg8l7zZxbgVG4
8bQ0nAm6bsovmT+mS765CecCgYEAmczTZlm8GOzevyXNecFOx4R8ZaqFmDlFO2SJ
nQCAkNp/H534sDoxQHxgL1WJ4IEVxEf0tVg6ofRt+/Kr9PQKEAy8QkeqI3UGRaXV
TEzqsSNm2yHl2/+wAAM3g4CxUHVyPfDsuFOmoMsS8rTKq+aeYwHdGG6Ujwd2ih7d
DGza4nUCgYB6tsiJgJOSqL4aOi5H/4EzUFOh1YhD/8fjF1Qj3KjkJkRv2c5QRVte
tyZPdL+BhEXYGGnEJbSeucii/D26DLBjNYhAQIunWDWyQBMmF7MUVXJZryns1azf
tvtZYFunmJUf+KxjBqBwG0szO8VXu73TYzk+Y2pESw4CyzobB6HZ+Q==
-----END RSA PRIVATE KEY-----
`EOF`

chmod 400 gitlab_project_keypair.key

# --- Cloning database repository

echo "Cloning database repository..."

ssh-agent bash -c 'ssh-add gitlab_project_keypair.key; git clone git@gitlab.cs.cf.ac.uk:c1628725/43_team_project.git'

# --- Install database

# echo "Installing database..."

chmod 777 43_team_project

cd 43_team_project

# mysql -u root -e "CREATE DATABASE behaviourdb;"
# mysql -u root behaviourdb < sql_creation_script.sql	

# the project was built using a MySQL Server where the password was 'comsc'; therefore,
# the following command replicates that on this server.
# mysqladmin -u root password comsc

# --- Code inspection for Java unused code, test and run 'gradle build' for project

export PATH=$PATH:/gradle/gradle-5.2.1/bin


echo "Running 'gradle build' for project...";

gradle clean build

cd build/libs

# --- Run the project

java -jar ambulatorycare-1.0.0.0.jar

# --- Complete

echo "Deployment completed."