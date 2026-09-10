#I have to create this tables

BEGIN TRANSACTION;

CREATE TABLE subjects(
    id SERIAL Primary Key,
    name varchar(255) NOT NULL UNIQUE
);


CREATE TABLE tutor_subject(
    tutor_id int,
    subject_id int,
    PRIMARY KEY (tutor_id, subject_id),
    FOREIGN KEY (tutor_id) REFERENCES users(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);


CREATE TABLE bookings(
    id SERIAL Primary Key,
    student_id int,
    tutor_id int,
    subject_id int,
    booking_date TIMESTAMP NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status varchar(50) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (tutor_id) REFERENCES users(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);