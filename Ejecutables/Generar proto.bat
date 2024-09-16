@echo off
title Compilar proto

cd ../EntornoVirtualPython/Scripts
call activate.bat
cd ../../Protos
python -m grpc_tools.protoc -I./ --python_out=../Cliente --pyi_out=../Cliente --grpc_python_out=../Cliente ./serviciosStockearte.proto

pause