@echo off
cd /d "C:\sabarish\Projects\Career Compass\backend"
"C:\tools\maven\apache-maven-3.9.6\bin\mvn.cmd" spring-boot:run -Dspring-boot.run.profiles=h2
pause