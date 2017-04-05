CREATE TABLE persons (
	ps_id        serial NOT NULL,
	ps_firstname varchar(35),
	ps_lastname  varchar(35),
	ps_socnumber varchar(35),
	ps_telephone varchar(35),
	ps_birthdate date,
	ps_city      varchar(35),
	PRIMARY KEY(ps_id)
);
