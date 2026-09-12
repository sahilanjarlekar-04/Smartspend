@echo off
set "MAVEN_BIN=%~dp0maven\apache-maven-3.9.6\bin\mvn.cmd"
if exist "%MAVEN_BIN%" (
    "%MAVEN_BIN%" %*
) else (
    echo Maven binary not found at %MAVEN_BIN%
)
