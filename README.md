# TPI-BASES-DE-DATOS-II

Trabajo Práctico Integrador desarrollado en **TypeScript** y **Node.js**, implementando una arquitectura modular conectada a **MongoDB Atlas** para la gestión de una tienda de alimentos (*Food Store*).
---
## Grupo:
* **321**
---
## Alumnos:
* **Garay Rocio Laura**
* **Santarelli Gustavo Yoel**

---
## Tecnologías y Librerías Utilizadas
* **Lenguaje:** TypeScript (con soporte para módulos ES y ejecución mediante `ts-node`).
* **Base de Datos:** MongoDB / MongoDB Atlas.
* **Driver oficial:** `mongodb` (Node.js Driver).
* **Gestión de Entorno:** `dotenv` para el manejo seguro de credenciales.

---

##  Instrucciones para Ejecutar el Proyecto

### Requisitos Previos

Tener **Node.js** instalado en el sistema.

### Pasos para la instalación y ejecución

1. **Clonar o descomprimir el repositorio**: Ubícate en la carpeta raíz del proyecto:

   ```
   cd TPI-BASES-DE-DATOS-II
   ```

2. **Instalar las dependencias**:

   ```
   npm install
   
   ```

   *(Nota: También puedes usar `pnpm install` si prefieres usar pnpm)*.

3. **Configurar las variables de entorno**:
    Creá un archivo llamado `.env` en la raíz del proyecto con la siguiente estructura.

   ```
    MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/?retryWrites=true&w=majority
    DB_NAME=food_store
   
   ```

   *(Nota: También puedes usar `pnpm install` si prefieres usar pnpm)*.

4. **Ejecutar el proyecto**:
    Corre el script mediante `ts-node` en el archivo `index.ts`:
    ```
    npx ts-node src/index.ts
    ```