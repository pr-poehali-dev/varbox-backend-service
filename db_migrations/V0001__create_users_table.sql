CREATE TABLE t_p29785842_varbox_backend_servi.users (
    id          SERIAL PRIMARY KEY,
    email       VARCHAR(255) NOT NULL UNIQUE,
    username    VARCHAR(100) UNIQUE,
    full_name   VARCHAR(255),
    phone       VARCHAR(30),
    password_hash VARCHAR(255),
    avatar_url  TEXT,
    role        VARCHAR(30) NOT NULL DEFAULT 'user',
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMPTZ,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email    ON t_p29785842_varbox_backend_servi.users (email);
CREATE INDEX idx_users_username ON t_p29785842_varbox_backend_servi.users (username);
