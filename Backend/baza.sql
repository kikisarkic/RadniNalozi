
ALTER DATABASE db_abb4f9_wp8 SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_abb4f9_wp8 COLLATE Latin1_General_100_CI_AI_SC_UTF8;
GO
ALTER DATABASE db_abb4f9_wp8 SET MULTI_USER;
GO


--use master;
--go
--drop database if exists golddigger;
--go 
--create database golddigger collate Croatian_CI_AS;
--go
--use golddigger;


create table potrazitelji(
sifra int not null primary key identity (1,1),
naziv varchar (50)not null,
adresa varchar (50) not null,
OIB char (11)not null,
telefon varchar (20)not null,
email varchar (20)
);

create table radnici(
sifra int not null primary key identity(1,1),
ime varchar (20)not null,
prezime varchar (20)not null,
telefon varchar (20)
);

create table strojevi(
sifra int not null primary key identity (1,1),
model varchar (20),
tip varchar (20),
registracija datetime
);

create table racuni(
sifra int not null primary key identity(1,1),
iznos decimal (7,2),
nacinplacanja varchar (10),
racun int not null references racuni (sifra)
);

create table radninalozi(
sifra int not null primary key identity (1,1),
datum datetime,
potrazitelj int not null references potrazitelji (sifra),
radnik int not null references radnici (sifra),
stroj int not null references strojevi (sifra),
racun int not null references racuni (sifra)


);

INSERT INTO strojevi (model, tip, registracija)
VALUES
('bager', 'JCB', '2025-03-21'),
('bager', 'Kubota', '2025-04-21'),
('bager', 'Kubota', '2025-03-20'),
('kamion', 'Iveco', '2025-08-20'),
('kamion', 'Man', '2025-03-21'),
('kamion', 'Tam', '2025-03-21'),
('Traktor', 'IMT', '2025-03-21');


insert into radnici(ime,prezime,telefon)
values
('Bojan','Sojic', '0957630848'),
('Sasa','Sarkic', '0918800421'),
('Zlatko', 'Mandic', '0912233564'),
('Sasa','Koprivnjak', '0918856234');

insert into potrazitelji(naziv,adresa,OIB,telefon,email)
values
('Teziste Projekt','Ivanovac Duga ulica 53','78998058983','tel','email');
('Tvins','Tenja Antuna Barca 14','92496504','0989343556','email');
('Star Line',' Osijek Hrvatske Republike 19a','01008427662','tel','email');
('Solarsky Solution','Tenja Tome Matica 10','78998058983','tel','email');
('Fasader Boja','Osijek Vilajska ulica 9','06128727643','tel','email');
('Martina Slanovic','Osijek Dragonjska 20','51319543363','tel','email');
('Fasader Boja','Osijek Vilajska ulica 9','06128727643','tel','email');

insert into racuni (iznos, nacinplacanja,racun)
values 
(1260,00,'transakcijski',12);
(2300,00,'transakcijski',18);
(3000,00, 'transakcijski',13);
(65000,'transakcijski',15);
(480,00,'transakcijski',14);
(1500,00,'transakcijski',16);
(400,00,'transakcijski',17);

insert into radninalozi (datum, potrazitelj, stroj, racun)
values
('2025-02-28', 1, 1, 1, 1);
('2025-04-22', 1, 1, 1, 1);
('2025-05-30', 1, 1, 1, 1);
('2025-07-03', 1, 1, 1, 1);
('2025-06-02', 1, 1, 1, 1);
('2025-06-17', 1, 1, 1, 1);
('2025-05-28', 1, 1, 1, 1);
