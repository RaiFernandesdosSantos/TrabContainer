create database if not exists trabalhomarco;

use trabalhomarco;

create table usuario(
    id int not null auto_increment,
    nome varchar(150) not null,
    email varchar(150) not null,
    senha varchar(150) not null,
    primary key (id)
);

insert into usuario (nome, email, senha) values ('admin', 'admin@admin.com', 'admin');