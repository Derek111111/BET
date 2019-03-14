DROP DATABASE bet;

CREATE DATABASE bet;
USE bet;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	user_name varchar(255) NOT NULL,
	email_id varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE category
(
	id integer NOT NULL AUTO_INCREMENT,
	category_name varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE bills
(
	id integer NOT NULL AUTO_INCREMENT,
	amount integer(100) NOT NULL,
    category varchar(255) NOT NULL,
	spentAt integer(100) NOT NULL,
	remarks varchar(255) NOT NULL,
	paymentMode varchar(100) NOT NULL,
    billDate timestamp,
    createdAt timestamp,
    Uid integer(10) not null,

	PRIMARY KEY (id)
);