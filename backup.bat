@echo off
chcp 65001 > nul

echo ===================================================
echo Iniciando proceso de respaldo de MongoDB Atlas...
echo ===================================================

:: Obtener la fecha actual en formato YYYY-MM-DD limpio usando PowerShell
for /f "delims=" %%i in ('powershell -Command "Get-Date -Format 'yyyy-MM-dd'"') do set "fecha_actual=%%i"

:: Definir la ruta de destino con la fecha limpia
set "CARPETA_DESTINO=resguardos_tpi\%fecha_actual%"

echo Creando la carpeta de destino: %CARPETA_DESTINO%
if not exist "%CARPETA_DESTINO%" (
    mkdir "%CARPETA_DESTINO%"
)

:: Ejecutar mongodump con la ruta completa exacta de tu PC
echo Descargando datos desde MongoDB Atlas...
"C:\Users\santa\Downloads\mongodb-database-tools-windows-x86_64-100.20.1\mongodb-database-tools-windows-x86_64-100.20.1\bin\mongodump.exe" --uri="mongodb+srv://rociolaura1999_db_user:FreJtRLBTqzZq07H@cluster0.egsnl4m.mongodb.net/food_store?retryWrites=true&w=majority" --out="%CARPETA_DESTINO%"

echo ===================================================
echo ¡Respaldo completado con éxito!
echo Carpeta generada: %CARPETA_DESTINO%
echo ===================================================
pause