# SISCHITALAC

**Sistema de Información para la Gestión del Acopio de Leche de Quesería Chitalac**

SISCHITALAC es una solución tecnológica multiplataforma desarrollada para digitalizar y optimizar el proceso de recepción, registro, seguimiento y liquidación del acopio de leche en la empresa Quesería Chitalac.

El sistema integra una aplicación móvil para el personal operativo, una plataforma web administrativa y una API REST que centraliza la información en una base de datos PostgreSQL.

Su principal característica es la arquitectura **Offline-First**, que permite al operario registrar las entregas de leche desde un dispositivo móvil incluso cuando no dispone de conexión a Internet. Los registros se almacenan localmente y posteriormente se sincronizan con el servidor central cuando se recupera la conectividad.

---

## Objetivo del sistema

Transformar el proceso tradicional de registro físico del acopio de leche en un proceso digital, centralizado y trazable, facilitando la administración de proveedores, la consolidación de entregas, las liquidaciones quincenales y la consulta de información estadística.

## Funcionalidades principales

### 1. Aplicación móvil — Operario

Aplicación desarrollada para dispositivos Android mediante React Native y Expo.

Sus funcionalidades principales son:

- **Autenticación:** acceso del operario mediante credenciales.
- **Catálogo de proveedores:** consulta de los proveedores almacenados localmente y actualización del catálogo desde el servidor.
- **Registro de acopio:** captura de los litros entregados por cada proveedor y resultado de la prueba de alcohol.
- **Edición de acopios:** modificación de los registros diarios previamente almacenados.
- **Almacenamiento local:** persistencia de la información mediante SQLite.
- **Sincronización:** envío de los registros pendientes hacia el backend cuando existe conexión a Internet y una sesión autenticada.

La aplicación permite continuar con el registro de entregas sin depender de una conexión permanente. Si ocurre un error durante la sincronización, los registros permanecen almacenados localmente para intentar nuevamente su envío.

### 2. Plataforma web — Administrador

Interfaz administrativa desarrollada con React y Vite.

Incluye los siguientes módulos:

**Gestión de usuarios y roles**
- Registro y administración de usuarios.
- Asignación de roles: Administrador, Asesor y Operario.
- Edición y administración de las cuentas registradas.

**Gestión de proveedores**
- Consulta del catálogo de proveedores.
- Registro de nuevos proveedores.
- Actualización y eliminación de registros.
- Consulta de información de identificación, finca, vereda y contacto.

**Liquidaciones quincenales**
- Consulta de periodos quincenales.
- Visualización de indicadores consolidados.
- Consulta del detalle de liquidación por proveedor.
- Registro y edición de entregas de leche.
- Actualización del precio por litro.
- Cálculo del valor de la leche entregada.
- Consolidación de pedidos, deducciones y saldos anteriores.
- Determinación del valor neto de la liquidación.

**Pedidos y deducciones**
- Registro de productos, suministros y anticipos solicitados por los proveedores.
- Administración de cantidades, unidades y valores unitarios.
- Cálculo de subtotales.
- Edición y eliminación de pedidos registrados.
- Integración de estos valores en la liquidación quincenal.

**Generación del documento equivalente a factura**
- Presentación del resumen de la liquidación.
- Confirmación del cierre del periodo.
- Generación del documento equivalente en formato PDF.
- Consulta e impresión posterior del documento generado.

Una vez cerrada una liquidación, su estado cambia a `LIQUIDADA` y se restringe la modificación de los registros asociados.

### 3. Plataforma web — Asesor

El perfil Asesor dispone de funcionalidades orientadas a la consulta, seguimiento y análisis de la información.

**Auditoría de acopios**
- Consulta del historial de operaciones.
- Filtros por fechas, usuario, proveedor y tipo de acción.
- Visualización de valores anteriores y posteriores a las modificaciones.
- Identificación del usuario responsable de cada operación.
- Exportación de resultados a Excel.

**Reportes financieros**
- Consulta de información por mes y año.
- Seguimiento de resultados mensuales y quincenales.
- Visualización de indicadores de litros acopiados, valor de la leche, deducciones y balance neto.
- Gráficos comparativos de saldos por proveedor.
- Identificación de saldos pendientes y situaciones críticas.
- Consulta del detalle de proveedores.
- Registro de cancelaciones de saldos pendientes.
- Exportación de información a Excel.

---

## Arquitectura tecnológica

SISCHITALAC utiliza una arquitectura multiplataforma compuesta por tres componentes principales:

| Componente | Tecnología | Responsabilidad |
|---|---|---|
| Aplicación móvil | React Native, Expo | Registro de acopios y operación offline-first. |
| Plataforma web | React, Vite | Administración, liquidaciones, auditoría y reportes. |
| Backend | Node.js, Express | API REST, autenticación, validaciones y procesamiento de solicitudes. |
| Base de datos central | PostgreSQL | Almacenamiento centralizado de la información. |
| Base de datos local | SQLite | Almacenamiento de proveedores y acopios en el dispositivo móvil. |

### Flujo de información

1. El operario consulta el catálogo de proveedores desde la aplicación móvil.
2. Registra las entregas de leche y la prueba de alcohol.
3. La aplicación almacena los datos en SQLite.
4. Cuando existe conectividad y una sesión válida, los registros pendientes se envían mediante la API REST.
5. El backend valida y almacena la información en PostgreSQL.
6. Los módulos web consultan la información centralizada.
7. El administrador gestiona las liquidaciones y genera los documentos equivalentes.
8. El asesor consulta la auditoría y los reportes disponibles.

### Sincronización Offline-First

El mecanismo de sincronización utiliza estados locales para identificar los registros que están pendientes de envío y aquellos que ya fueron almacenados correctamente en el servidor.

La aplicación utiliza un token de autenticación con vigencia de ocho horas para realizar las operaciones protegidas de comunicación con el backend. Cuando el token vence, el operario debe autenticarse nuevamente.

---

## Estructura del repositorio

El proyecto está organizado como un monorepositorio que contiene los tres componentes principales de SISCHITALAC:

```text
SISCHITALAC/
│
├── chitalac-backend/
│   ├── assets/
│   ├── config/
│   ├── controllers/
│   ├── dto/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── package.json
│   └── server.js
│
├── chitalac-frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── chitalac-mobile/
│   ├── assets/
│   ├── src/
│   ├── App.js
│   ├── app.json
│   ├── eas.json
│   └── package.json
│
├── chitalacDB.sql
├── .gitignore
└── README.md
```

**Descripción de los directorios:**

- `chitalac-backend`: servicios, rutas, controladores, modelos y configuración del servidor.
- `chitalac-frontend`: interfaz web administrativa y módulos de consulta.
- `chitalac-mobile`: aplicación Android utilizada por el operario.
- `chitalacDB.sql`: script SQL de referencia para la estructura de la base de datos.

---

## Instalación y configuración

### Requisitos previos

Para trabajar con el proyecto se requiere:

- Node.js y npm.
- PostgreSQL.
- Git.
- Android Studio o un dispositivo Android para las pruebas móviles.
- Expo y EAS para los procesos de desarrollo y compilación de la aplicación móvil.

### Clonar el repositorio

```bash
git clone https://github.com/chambacu1013/sischitalac.git
```

Ingresar al directorio:

```bash
cd sischitalac
```

### Instalación de dependencias

Cada componente dispone de su propio `package.json`, por lo que las dependencias deben instalarse de manera independiente.

**Backend:**

```bash
cd chitalac-backend
npm install
```

**Frontend:**

```bash
cd chitalac-frontend
npm install
```

**Aplicación móvil:**

```bash
cd chitalac-mobile
npm install
```

Para conocer los comandos disponibles de ejecución y compilación de cada componente, consultar los scripts definidos en su respectivo `package.json`.

### Configuración de variables de entorno

El backend requiere la configuración de sus variables de entorno para establecer la conexión con PostgreSQL y los parámetros necesarios para la ejecución de los servicios.

Crear un archivo `.env` dentro de `chitalac-backend` con los valores correspondientes a la configuración del entorno de ejecución.

**Importante:** el archivo `.env` contiene información sensible y no debe publicarse en GitHub.

La aplicación móvil también requiere configurar la dirección de la API para comunicarse con el backend desplegado.

---

## Roles del sistema

| Rol | Responsabilidades |
|---|---|
| Administrador | Gestión de usuarios, proveedores, precios, pedidos, liquidaciones y generación de documentos. |
| Asesor | Consulta de auditorías, reportes, indicadores y seguimiento de saldos. |
| Operario | Registro diario de acopios desde la aplicación móvil y sincronización de información. |

---

## Tecnologías y herramientas

- **JavaScript:** lenguaje principal de desarrollo.
- **React:** construcción de interfaces web.
- **Vite:** herramienta de desarrollo y compilación del frontend.
- **React Native:** desarrollo de la aplicación móvil.
- **Expo:** herramientas para desarrollo y compilación Android.
- **Node.js:** entorno de ejecución del backend.
- **Express:** construcción de la API REST.
- **PostgreSQL:** base de datos central.
- **SQLite:** almacenamiento local móvil.
- **Git y GitHub:** control de versiones y administración del código fuente.
- **Render:** alojamiento del backend.

---

## Alcance del proyecto

SISCHITALAC está orientado específicamente a la gestión del proceso de acopio de leche de Quesería Chitalac.

Su alcance comprende:

- Registro de recepción de leche.
- Gestión de proveedores.
- Almacenamiento local y sincronización.
- Liquidaciones quincenales.
- Gestión de pedidos y deducciones.
- Generación de documentos equivalentes a factura.
- Consulta de auditorías.
- Reportes y análisis estadístico.
- Seguimiento de saldos pendientes.

No pretende ser un sistema general de gestión empresarial, sino una solución especializada para digitalizar y mejorar el proceso de acopio de leche.

---

## Estado del proyecto

SISCHITALAC cuenta con una aplicación móvil Android, una plataforma web administrativa y un backend integrado con PostgreSQL.

El desarrollo contempla pruebas funcionales, integración entre componentes y validación de los procesos principales de registro, sincronización, liquidación y consulta de información.

---

## Autor

**Michael Yesid Medina Villamizar**

Proyecto desarrollado en el marco del programa de formación del Servicio Nacional de Aprendizaje (SENA), en el área de programación de aplicaciones para dispositivos móviles.

**Empresa beneficiaria:** Quesería Chitalac.

**Repositorio:** https://github.com/chambacu1013/sischitalac

---

## Consideraciones de seguridad

- No publicar archivos `.env`.
- No subir contraseñas, tokens ni credenciales de acceso.
- No publicar claves privadas ni archivos de firma Android.
- Mantener protegida la información personal de los proveedores.
- Configurar las credenciales y conexiones de acuerdo con cada entorno de ejecución.
