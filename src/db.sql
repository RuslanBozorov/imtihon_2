create database imtihon_2

\c "imtihon_2"

create table Cars(
    id serial primary key,
    name varchar(255),
    model varchar(255),
    price int,
    color varchar(50),
    year int
);


create table Customers(
    id serial primary key,
    name varchar(20) not null,
    age int not null,
    phone int not null,
    email varchar(255) not null,
    location varchar(255) not null,
    city varchar(255) not null
);


create table Orders(
    id serial primary key,
    customerId int references Customers(id),
    carsId int references Cars(id),
    month_count int not null,
    start_date  date,
    end_date date,
    paymentDate date
    
);


create table Payments(
    id serial primary key,
    orderId int references Orders(id),
    createdAt date,
    amount int
);