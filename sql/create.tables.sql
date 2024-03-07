
CREATE SEQUENCE manager.system_profiles_seq_id;

CREATE TABLE IF NOT EXISTS manager.system_profiles
(
    id SERIAL NOT NULL,
    profiledescription character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT systemuserprofiles_pk PRIMARY KEY (id)
);


CREATE SEQUENCE manager.users_seq_id;

CREATE TABLE IF NOT EXISTS manager.users
(
    id SERIAL NOT NULL ,
    user_name character varying(32) COLLATE pg_catalog."default" NOT NULL,
    surname character varying(64) COLLATE pg_catalog."default" NOT NULL,
    status character varying(1) COLLATE pg_catalog."default" NOT NULL DEFAULT 'A'::character varying,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL DEFAULT '40bd001563085fc35165329ea1ff5c5ecbdbbeef'::character varying,
    dt_createdat date NOT NULL DEFAULT CURRENT_DATE,
    dt_updatedat date NOT NULL DEFAULT CURRENT_DATE,
    profileid integer,
    CONSTRAINT func_usuario_pk PRIMARY KEY (id),
    CONSTRAINT usuario_perfil_fk FOREIGN KEY (profileid)
        REFERENCES manager.system_profiles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
