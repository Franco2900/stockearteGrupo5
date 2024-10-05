@echo off
title Cliente

echo Iniciando Cliente Python
cd ../EntornoVirtualPython/venv/Scripts
call activate.bat
cd ../../../Cliente
python cliente.py

pause