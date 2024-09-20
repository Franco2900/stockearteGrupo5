@echo off

title Inicializando Entorno Virtual Python

:: Nombre del entorno virtual
set VENV_DIR=venv

:: Verifica si el entorno virtual ya existe
if not exist %VENV_DIR% (
    echo Creando el entorno virtual...
    python -m venv %VENV_DIR%
) else (
    echo El entorno virtual ya existe.
)

:: Activa el entorno virtual
call %VENV_DIR%\Scripts\activate.bat

:: Verifica si existe el archivo requirements.txt para instalar dependencias
if exist requirements.txt (
    echo Instalando dependencias desde requirements.txt...
    pip install -r requirements.txt
) else (
    echo No se encontró el archivo requirements.txt.
)

:: Mensaje final
echo El entorno virtual esta activado y el archivo requirements.txt ha sido actualizado.

pause