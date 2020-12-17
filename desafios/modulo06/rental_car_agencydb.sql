CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "phone" int,
  "address" text,
  "birth_date" timestamp,
  "comments" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "agencies" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "address_id" int UNIQUE NOT NULL,
  "manager" text,
  "cars_capacity" int,
  "employees" int,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "addresses" (
  "id" SERIAL PRIMARY KEY,
  "street" text NOT NULL,
  "neighborhood" text,
  "city" text,
  "state" text,
  "country" text
);

CREATE TABLE "cars" (
  "id" SERIAL PRIMARY KEY,
  "model_id" int NOT NULL,
  "color" text,
  "plate" text,
  "mileage" int,
  "transmission" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "models" (
  "id" SERIAL PRIMARY KEY,
  "brand" text,
  "model" text,
  "model_year" int,
  "motor_power" text,
  "wheel_rim" text
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "customer_id" int NOT NULL,
  "agency_id" int NOT NULL,
  "car_id" int NOT NULL,
  "start_date" timestamp,
  "return_date" timestamp,
  "value" int
);

CREATE TABLE "car_order" (
  "id" SERIAL PRIMARY KEY,
  "car_id" int NOT NULL,
  "order_id" int NOT NULL
);

ALTER TABLE "agencies" ADD FOREIGN KEY ("address_id") REFERENCES "addresses" ("id");

ALTER TABLE "cars" ADD FOREIGN KEY ("model_id") REFERENCES "models" ("id");

ALTER TABLE "car_order" ADD FOREIGN KEY ("car_id") REFERENCES "cars" ("id");

ALTER TABLE "car_order" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("agency_id") REFERENCES "agencies" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");
