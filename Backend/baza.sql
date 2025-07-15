
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
nacinplacanja varchar (10)
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
('Teziste Projekt','Ivanovac Duga ulica 53','78998058983','tel','email'),
('Tvins','Tenja Antuna Barca 14','92496504','0989343556','email'),
('Star Line',' Osijek Hrvatske Republike 19a','01008427662','tel','email'),
('Solarsky Solution','Tenja Tome Matica 10','78998058983','tel','email'),
('Fasader Boja','Osijek Vilajska ulica 9','06128727643','tel','email'),
('Martina Slanovic','Osijek Dragonjska 20','51319543363','tel','email'),
('Fasader Boja','Osijek Vilajska ulica 9','06128727643','tel','email');

insert into racuni (iznos, nacinplacanja)
values 
(1260,'trans'),
(2300,'trans'),
(3000, 'trans'),
(65000,'trans'),
(480,'trans'),
(1500,'trans'),
(400,'trans');


insert into radninalozi (datum, potrazitelj, stroj, racun,radnik)
values
('2025-02-28', 1, 1, 1, 1),
('2025-04-22', 1, 1, 1, 1),
('2025-05-30', 1, 1, 1, 1),
('2025-07-03', 1, 1, 1, 1),
('2025-06-02', 1, 1, 1, 1),
('2025-06-17', 1, 1, 1, 1),
('2025-05-28', 1, 1, 1, 1);
