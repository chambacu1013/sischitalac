-- =======================================================================
-- SCRIPT DE BASE DE DATOS: QUESERÍA CHITALAC (VERSIÓN MEJORADA)
-- ENFOQUE: OFFLINE-FIRST, REPORTE FINANCIERO Y AUDITORÍA
-- =======================================================================
DROP SCHEMA IF EXISTS chitalac CASCADE;
CREATE SCHEMA IF NOT EXISTS chitalac;

-- 1. TIPOS DE DATOS ENUMERADOS (Mejora la seguridad y evita errores de tipeo)
CREATE TYPE chitalac.estado_quincena AS ENUM ('ABIERTA', 'LIQUIDADA');
CREATE TYPE chitalac.origen_auditoria AS ENUM ('APP_MOVIL', 'WEB');

-- 2. TABLA DE ROLES
CREATE TABLE chitalac.roles (
    rol_id SERIAL NOT NULL,
    rol_nombre VARCHAR(50) UNIQUE NOT NULL,
    PRIMARY KEY (rol_id)
);

INSERT INTO chitalac.roles (rol_nombre) VALUES ('ADMINISTRADOR'), ('OPERARIO'), ('ASESOR');

-- 3. TABLA DE USUARIOS (Con borrado lógico)
CREATE TABLE chitalac.usuarios (
    usu_id SERIAL NOT NULL,
    usu_nombre VARCHAR(100) NOT NULL,
    usu_apellido VARCHAR(100) NOT NULL,
    usu_cedula VARCHAR(20) UNIQUE NOT NULL,
    usu_username VARCHAR(50) UNIQUE NOT NULL,
    usu_password_hash VARCHAR(255) NOT NULL,
    rol_id INT NOT NULL,
    usu_estado BOOLEAN DEFAULT TRUE, -- Borrado lógico (Activo/Inactivo)
    PRIMARY KEY (usu_id),
    FOREIGN KEY (rol_id) REFERENCES chitalac.roles(rol_id) ON UPDATE CASCADE ON DELETE RESTRICT
);
INSERT INTO chitalac.usuarios (usu_nombre,usu_apellido,
usu_cedula,usu_username,usu_password_hash,rol_id) VALUES('Diana Patricia','Carvajal Moreno',
'1098665670','admin','3132750301',1);
-- 4. TABLA DE PROVEEDORES (Metadatos completos para la factura PDF)
CREATE TABLE chitalac.proveedores (
    prov_id SERIAL NOT NULL,
    prov_nom VARCHAR(100) NOT NULL,
    prov_ape VARCHAR(100) NOT NULL,
    prov_cedula VARCHAR(20) UNIQUE NOT NULL,
    prov_finca VARCHAR(100) NOT NULL,
    prov_vereda VARCHAR(100) NOT NULL, -- Agregado para el CU-08
    prov_tel VARCHAR(20) NOT NULL,     -- Cambiado a VARCHAR
    prov_estado BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (prov_id)
);

-- 5. TABLA DE LIQUIDACIÓN QUINCENAL (Motor Contable Central)
CREATE TABLE chitalac.liquidaciones (
    quin_id SERIAL NOT NULL,
    prov_id INT NOT NULL,
    quin_fecha_inicio DATE NOT NULL,
    quin_fecha_fin DATE NOT NULL,
    precio_unitario_litro DECIMAL(10,2) NOT NULL DEFAULT 2500.00,
    total_litros DECIMAL(10,2) DEFAULT 0.00,
    precio_total_leche DECIMAL(12,2) DEFAULT 0.00,
    total_descuento_pedidos DECIMAL(12,2) DEFAULT 0.00,
    saldo_pendiente_antiguo DECIMAL(12,2) DEFAULT 0.00,
    saldo_neto_final DECIMAL(12,2) DEFAULT 0.00,
    estado_contable chitalac.estado_quincena DEFAULT 'ABIERTA',
    PRIMARY KEY (quin_id),
    FOREIGN KEY (prov_id) REFERENCES chitalac.proveedores(prov_id) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- 6. TABLA DE LECHE / ACOPIO (Adaptada para Offline-First SQLite Sync)
CREATE TABLE chitalac.leche (
    lec_id SERIAL NOT NULL,
    offline_id VARCHAR(100) UNIQUE, -- CRÍTICO: ID generado en el celular para evitar duplicados al sincronizar
    quin_id INT NOT NULL,
    lec_fecha DATE NOT NULL,
    lec_dia INT NOT NULL CHECK (lec_dia >= 1 AND lec_dia <= 31),
    lec_litros DECIMAL(10,2) NOT NULL CHECK (lec_litros > 0),
    lec_prueba_alcohol BOOLEAN NOT NULL DEFAULT TRUE, -- Visto bueno de calidad
    fecha_sincronizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (lec_id),
    FOREIGN KEY (quin_id) REFERENCES chitalac.liquidaciones(quin_id) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- 7. TABLA DE PEDIDOS / DEDUCCIONES (Corregidos los tipos de datos financieros)
CREATE TABLE chitalac.pedidos (
    ped_id SERIAL NOT NULL,
    quin_id INT NOT NULL,
    ped_fecha DATE NOT NULL,
    ped_dia INT NOT NULL,
    ped_descripcion VARCHAR(255) NOT NULL, -- Ej: "Sal", "Botas", "Efectivo"
    ped_unidad VARCHAR(50),                -- Ej: "Bulto", "Kg"
    ped_cantidad DECIMAL(10,2) NOT NULL,
    ped_valor_unitario DECIMAL(12,2) NOT NULL,
    ped_subtotal DECIMAL(12,2) NOT NULL,   -- Cambiado de VARCHAR a DECIMAL
    PRIMARY KEY (ped_id),
    FOREIGN KEY (quin_id) REFERENCES chitalac.liquidaciones(quin_id) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- 8. TABLA DE CARTERA PENDIENTE (Reemplaza a tu antigua tabla 'pendientes')
-- Se usa cuando el proveedor quedó debiendo plata en la quincena (Saldos en Contra)
CREATE TABLE chitalac.cartera_saldos (
    car_id SERIAL NOT NULL,
    prov_id INT NOT NULL,
    quin_origen_id INT NOT NULL,
    car_monto DECIMAL(12,2) NOT NULL,
    car_estado VARCHAR(20) DEFAULT 'PENDIENTE',
    car_fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    car_fecha_pago TIMESTAMP,
    PRIMARY KEY (car_id),
    FOREIGN KEY (prov_id)
        REFERENCES chitalac.proveedores(prov_id)
        ON UPDATE CASCADE,
    FOREIGN KEY (quin_origen_id)
        REFERENCES chitalac.liquidaciones(quin_id)
        ON UPDATE CASCADE
);
-- =====================================================
-- TIPO DE ACCIÓN DE AUDITORÍA
-- =====================================================

CREATE TYPE chitalac.accion_auditoria AS ENUM (
    'CREAR',
    'ACTUALIZAR',
    'ELIMINAR'
);
-- 9. TABLA DE AUDITORÍA (La "Caja Negra" del sistema para el Asesor Contable)

CREATE TABLE chitalac.log_auditoria (
    aud_id SERIAL NOT NULL,
    aud_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    usu_id INT,
    lec_id INT,
    prov_id INT,
    aud_origen chitalac.origen_auditoria NOT NULL,
    aud_accion chitalac.accion_auditoria NOT NULL,
    litros_anteriores DECIMAL(10,2),
    litros_nuevos DECIMAL(10,2),
    aud_detalle TEXT,
    PRIMARY KEY (aud_id),
    FOREIGN KEY (usu_id)
        REFERENCES chitalac.usuarios(usu_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    FOREIGN KEY (lec_id)
        REFERENCES chitalac.leche(lec_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    FOREIGN KEY (prov_id)
        REFERENCES chitalac.proveedores(prov_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);
-- =====================================================
-- ÍNDICES
-- =====================================================

CREATE INDEX idx_auditoria_fecha
ON chitalac.log_auditoria(aud_timestamp);

CREATE INDEX idx_auditoria_usuario
ON chitalac.log_auditoria(usu_id);

CREATE INDEX idx_auditoria_proveedor
ON chitalac.log_auditoria(prov_id);

CREATE INDEX idx_auditoria_accion
ON chitalac.log_auditoria(aud_accion);

