create database site_rpg; 
use site_rpg;
create table usuarios(
		id int primary Key AUTO_INCREMENT,
        nome varchar(100) NOT NULL,
        email varchar(150) NOT NULL,
        senha varchar(15) NOT NULL);

create table fichas(
	id int PRIMARY KEY auto_increment,
    id_usuario int, 
    nome varchar(50) NOT NULL,
    aparencia text,
    personalidade text,
    historia text,
    weapon_form text,
    forca int NOT NULL,
    destreza int NOT NULL,
    constituicao int NOT NULL,
    inteligencia int NOT NULL,
    sabedoria INT NOT NULL,
    carisma INT NOT NULL,
    atletismo INT NOT NULL,
    furtividade INT NOT NULL,
    vigor INT NOT NULL,
    medicina INT NOT NULL,
    sobrevivencia INT NOT NULL,
    perfomance INT NOT NULL,
    intimidacao INT NOT NULL,
    prestidigitacao INT NOT NULL,
    conhecimento INT NOT NULL,
    percepcao INT NOT NULL,
    persuasao INT NOT NULL,
    acrobacia INT NOT NULL,
    resistencia INT NOT NULL,
    investigacao INT NOT NULL,
    intuicao INT NOT NULL,
    enganacao INT NOT NULL,
    habilidade text,
    nivel_resonancia INT NOT NULL,
    sanidade INT NOT NULL,
    vida INT NOT NULL,
    tipo varchar (6),
    
    
    
	
    foreign key (id_usuario) references usuarios(id)
);
select * from fichas;