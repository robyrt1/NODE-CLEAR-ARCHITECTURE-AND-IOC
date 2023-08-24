

CREATE TABLE IF NOT EXISTS manager.perfil_usuarios_sys
(
    nr_sequencia integer NOT NULL,
    nm_perfil character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT perfil_usuarios_sys_pk PRIMARY KEY (nr_sequencia)
)

CREATE TABLE IF NOT EXISTS manager.ger_usuario
(
    nr_sequencia integer NOT NULL,
    nm_usuario character varying(32) COLLATE pg_catalog."default" NOT NULL,
    ds_usuario character varying(64) COLLATE pg_catalog."default" NOT NULL,
    ie_situacao character varying(1) COLLATE pg_catalog."default" NOT NULL DEFAULT 'A'::character varying,
    ds_senha character varying(100) COLLATE pg_catalog."default" NOT NULL DEFAULT '40bd001563085fc35165329ea1ff5c5ecbdbbeef'::character varying,
    dt_atualizacao date NOT NULL DEFAULT CURRENT_DATE,
    dt_registro date NOT NULL DEFAULT CURRENT_DATE,
    cd_perfil integer,
    CONSTRAINT func_usuario_pk PRIMARY KEY (nr_sequencia),
    CONSTRAINT ger_func_usuario_unik002 UNIQUE (nm_usuario),
    CONSTRAINT usuario_perfil_fk FOREIGN KEY (cd_perfil)
        REFERENCES manager.perfil_usuarios_sys (nr_sequencia) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
