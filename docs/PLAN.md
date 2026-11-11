## Possible Structure

### pages/routes/apps

login
register
clients lister
appointments lister
add appointment
calendar
reviews

### authentication

JWT Session - user_id * tenant_id * role, sliced data access

### DB

```
CREATE DATABASE IF NOT EXISTS forest;

CREATE TABLE IF NOT EXISTS tenants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPZ NOT NULL default now(),
  name VARCHAR (100) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id UUID UNIQUE DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants (id),
  created_at TIMESTAMPZ NOT NULL default now(),
  email VARCHAR (255) NOT NULL,
  first_name VARCHAR (100) NOT NULL,
  last_name VARCHAR (100) NOT NULL,
  pw_hash VARCHAR NOT NULL,
  last_login_at TIMESTAMPZ,
  phone VARCHAR (15),
  PRIMARY KEY (id, email, tenant_id)
);

CREATE TABLE IF NOT EXISTS locations (
  id UUID UNIQUE DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants (id),
  created_at TIMESTAMPZ NOT NULL DEFAULT now(),
  name VARCHAR (100) NOT NULL,
  lat DOUBLE PRECISION,
  lon DOUBLE PRECISION,
  addressFirstLine VARCHAR (100),
  addressSecondLine VARCHAR (100),
  addressCounty VARCHAR (100),
  addressPostCode VARCHAR (100),
  addressCountry VARCHAR (100),
  PRIMARY KEY (id, tenant_id)
);
CREATE TABLE IF NOT EXISTS rooms (
  id UUID UNIQUE DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants (id),
  location_id UUID REFERENCES locations (id),
  created_at TIMESTAMPZ NOT NULL DEFAULT now(),
  name VARCHAR (100) NOT NULL,
  PRIMARY KEY (id, location_id, tenant_id)
);
CREATE TABLE IF NOT EXISTS appointments (
  id UUID UNIQUE DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants (id),
  user_id UUID REFERENCES users (id),
  room_id UUID REFERENCES tenants (id),
  created_at TIMESTAMPZ NOT NULL DEFAULT now(),
  start_at TIMESTAMPZ NOT NULL,
  end_at TIMESTAMPZ NOT NULL,
  title VARCHAR (100) NOT NULL,
  notes VARCHAR NOT NULL,
  PRIMARY KEY (id, tenant_id, user_id, room_id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID UNIQUE DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants (id),
  user_id UUID REFERENCES users (id),
  created_at TIMESTAMPZ NOT NULL DEFAULT now(),
  ratingValue REAL NOT NULL,
  public_name VARCHAR (100) NOT NULL,
  description VARCHAR (2000) NOT NULL,
  PRIMARY KEY (id, tenant_id, user_id)
);

CREATE TABLE IF NOT EXISTS roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES tenants (id),
  created_at TIMESTAMPZ NOT NULL DEFAULT now(),
  name VARCHAR (100) NOT NULL,
  PRIMARY KEY (id, tenant_id)
);
CREATE TABLE IF NOT EXISTS users_roles (
  user_id UUID REFERENCES users (id),
  role_id UUID REFERENCES roles (id),
  tenant_id UUID REFERENCES tenants (id),
  PRIMARY KEY (user_id, role_id, tenant_id)
);

CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPZ NOT NULL DEFAULT now(),
  name VARCHAR (100) NOT NULL
);
CREATE TABLE IF NOT EXISTS applications_roles (
  application_id UUID REFERENCES applications (id),
  role_id UUID REFERENCES roles (id)
  tenant_id UUID REFERENCES tenants (id),
  PRIMARY KEY (application_id, role_id, tenant_id)
);

```
