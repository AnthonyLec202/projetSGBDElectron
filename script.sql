
DROP DATABASE IF EXISTS neuro_app;

CREATE DATABASE IF NOT EXISTS neuro_app 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

USE neuro_app;


CREATE TABLE patients (
    id_patient INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    date_naissance DATE NULL,
    sexe ENUM('M','F') NULL,
    tel VARCHAR(20) NULL,
    email VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_nom_prenom (nom, prenom)
) ENGINE=InnoDB;


CREATE TABLE seances (
    id_seance INT AUTO_INCREMENT PRIMARY KEY,
    id_patient INT NOT NULL,
    type_seance VARCHAR(100) NOT NULL,
    date_heure DATETIME NOT NULL,
    duree_seance INT NOT NULL,
    notes TEXT NULL,
    FOREIGN KEY (id_patient) REFERENCES patients(id_patient)
        ON DELETE CASCADE,
    INDEX idx_date_heure (date_heure),
    INDEX idx_patient_date (id_patient, date_heure)
) ENGINE=InnoDB;


CREATE TABLE rapports (
    id_rapport INT AUTO_INCREMENT PRIMARY KEY,
    id_patient INT NOT NULL,
    rapport_path TEXT NULL,
    FOREIGN KEY (id_patient) REFERENCES patients(id_patient)
        ON DELETE CASCADE
) ENGINE=InnoDB;


CREATE TABLE themes (
    id_theme INT AUTO_INCREMENT PRIMARY KEY,
    nom_theme VARCHAR(100) NOT NULL,
    UNIQUE KEY uk_nom_theme (nom_theme)
) ENGINE=InnoDB;


CREATE TABLE prises_en_charge (
    id_pec INT AUTO_INCREMENT PRIMARY KEY,
    id_theme INT,
    nom_pec VARCHAR(150) NOT NULL,
    protocole_path TEXT NULL,
    UNIQUE KEY uk_theme_nom_pec (id_theme, nom_pec),
    FOREIGN KEY (id_theme) REFERENCES themes(id_theme)
        ON DELETE SET null,
    INDEX idx_theme (id_theme)
) ENGINE=InnoDB;


CREATE TABLE fonctions_cognitives (
    id_fonction INT AUTO_INCREMENT PRIMARY KEY,
    nom_fonction VARCHAR(100) NOT NULL,
    UNIQUE KEY uk_nom_fonction (nom_fonction)
) ENGINE=InnoDB;


CREATE TABLE plages_age (
    id_plage INT AUTO_INCREMENT PRIMARY KEY,
    age_min INT NOT NULL,
    age_max INT NOT NULL,
    CONSTRAINT chk_age_min CHECK (age_min >= 0),
    CONSTRAINT chk_age_max CHECK (age_max >= age_min)
) ENGINE=InnoDB;


CREATE TABLE tests (
    id_test INT AUTO_INCREMENT PRIMARY KEY,
    nom_test VARCHAR(150) NOT NULL,
    test_path TEXT NULL,
    id_plage INT,
    FOREIGN KEY (id_plage) REFERENCES plages_age(id_plage)
        ON DELETE SET NULL,
    INDEX idx_plage (id_plage)
) ENGINE=InnoDB;


CREATE TABLE tests_fonctions (
    id_test_fonction INT AUTO_INCREMENT PRIMARY KEY,
    id_test INT NOT NULL,
    id_fonction INT NOT NULL,
    FOREIGN KEY (id_test) REFERENCES tests(id_test)
        ON DELETE CASCADE,
    FOREIGN KEY (id_fonction) REFERENCES fonctions_cognitives(id_fonction)
        ON DELETE CASCADE,
    UNIQUE KEY uk_test_fonction (id_test, id_fonction)
) ENGINE=InnoDB;


CREATE TABLE favoris (
    id_favori INT AUTO_INCREMENT PRIMARY KEY,
    nom_favori VARCHAR(100) NOT NULL,
    UNIQUE KEY uk_nom_favori (nom_favori)
) ENGINE=InnoDB;


CREATE TABLE tests_favoris (
    id_test_favori INT AUTO_INCREMENT PRIMARY KEY,
    id_favori INT NOT NULL,
    id_test INT NOT NULL,
    FOREIGN KEY (id_favori) REFERENCES favoris(id_favori)
        ON DELETE CASCADE,
    FOREIGN KEY (id_test) REFERENCES tests(id_test)
        ON DELETE CASCADE,
    UNIQUE KEY uk_favori_test (id_favori, id_test)
) ENGINE=InnoDB;


CREATE TABLE professionnels (
    id_professionnel INT AUTO_INCREMENT PRIMARY KEY,
    nom_pro VARCHAR(100) NOT NULL,
    prenom_pro VARCHAR(100) NULL,
    specialite VARCHAR(100) NOT NULL,
    email_pro VARCHAR(100) NULL,
    tel_pro VARCHAR(20) NULL,
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_nom_pro (nom_pro, prenom_pro),
    INDEX idx_specialite (specialite)
) ENGINE=InnoDB;


CREATE TABLE adresses (
    id_adresse INT AUTO_INCREMENT PRIMARY KEY,
    rue VARCHAR(255) NOT NULL,
    numero VARCHAR(10) NULL,
    code_postal VARCHAR(10) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_ville (ville),
    INDEX idx_code_postal (code_postal)
) ENGINE=InnoDB;


CREATE TABLE professionnels_adresses (
    id_pro_adresse INT AUTO_INCREMENT PRIMARY KEY,
    id_professionnel INT NOT NULL,
    id_adresse INT NOT NULL,
    FOREIGN KEY (id_professionnel) REFERENCES professionnels(id_professionnel)
        ON DELETE CASCADE,
    FOREIGN KEY (id_adresse) REFERENCES adresses(id_adresse)
        ON DELETE CASCADE,
    UNIQUE KEY uk_pro_adresse (id_professionnel, id_adresse)
) ENGINE=InnoDB;


INSERT INTO patients (nom, prenom, date_naissance, sexe, tel, email) VALUES
('Dubois', 'Marie', '1985-03-15', 'F', '0471234567', 'marie.dubois@email.be'),
('Martin', 'Jean', '1992-07-22', 'M', '0498765432', 'jean.martin@email.be'),
('Leroy', 'Sophie', '2010-05-18', 'F', '0476543210', 'sophie.leroy@email.be'),
('Bernard', 'Lucas', '2015-11-03', 'M', '0489123456', 'lucas.bernard@email.be'),
('Petit', 'Emma', '1978-02-28', 'F', '0471987654', 'emma.petit@email.be'),
('Garcia', 'Thomas', '2008-09-14', 'M', NULL, NULL);


INSERT INTO seances (id_patient, type_seance, date_heure, notes) VALUES
(1, 'Bilan initial', '2025-01-15 10:00:00', 'Première séance, évaluation générale'),
(2, 'Rééducation cognitive', '2025-01-20 14:30:00', 'Travail sur la mémoire de travail'),
(1, 'Rééducation', '2025-01-22 10:00:00', 'Travail sur l''attention'),
(1, 'Suivi', '2025-01-29 10:00:00', 'Progrès notables'),
(2, 'Suivi', '2025-01-27 14:30:00', 'Consolidation des acquis'),
(3, 'Bilan initial', '2025-01-16 09:00:00', 'Enfant de 14 ans, difficultés scolaires'),
(3, 'Rééducation', '2025-01-23 09:00:00', 'Exercices de mémoire'),
(4, 'Bilan initial', '2025-01-17 11:00:00', 'Enfant de 9 ans'),
(5, 'Bilan complet', '2025-01-18 15:00:00', 'Suspicion troubles attentionnels');


INSERT INTO rapports (id_patient, rapport_path) VALUES
(1, '/rapports/dubois_marie_bilan_2025.pdf'),
(2, '/rapports/martin_jean_reeducation_2025.pdf'),
(1, '/rapports/dubois_marie_suivi_2025.pdf'),
(3, '/rapports/leroy_sophie_bilan_2025.pdf'),
(4, '/rapports/bernard_lucas_bilan_2025.pdf'),
(5, '/rapports/petit_emma_bilan_2025.pdf');


INSERT INTO themes (nom_theme) VALUES
('Mémoire'),
('Attention'),
('Fonctions exécutives'),
('Langage'),
('Raisonnement'),
('Visuospatial');


INSERT INTO prises_en_charge (id_theme, nom_pec, protocole_path) VALUES
(1, 'Exercices de rappel immédiat', '/protocoles/rappel_immediat.pdf'),
(2, 'Attention soutenue', '/protocoles/attention_soutenue.pdf'),
(1, 'Mémoire épisodique', '/protocoles/memoire_episodique.pdf'),
(1, 'Stratégies mnémotechniques', '/protocoles/strategies_memo.pdf'),
(2, 'Attention divisée', '/protocoles/attention_divisee.pdf'),
(2, 'Barrage de signes', '/protocoles/barrage.pdf'),
(3, 'Flexibilité mentale', '/protocoles/flexibilite.pdf'),
(3, 'Planification', '/protocoles/planification.pdf'),
(4, 'Fluence verbale', '/protocoles/fluence.pdf'),
(NULL, 'Exercices généraux', '/protocoles/general.pdf');


INSERT INTO fonctions_cognitives (nom_fonction) VALUES
('Mémoire de travail'),
('Attention sélective'),
('Fonctions exécutives'),
('Mémoire épisodique'),
('Attention soutenue'),
('Langage expressif'),
('Raisonnement logique'),
('Compétences visuospatiales');


INSERT INTO plages_age (age_min, age_max) VALUES
(6, 12),
(18, 65),
(3, 5),
(13, 17),
(66, 120);


INSERT INTO tests (nom_test, test_path, id_plage) VALUES
('WISC-V Empan de chiffres', '/tests/wisc_empan.pdf', 1),
('MoCA', '/tests/moca.pdf', 2),
('WISC-V Cubes', '/tests/wisc_cubes.pdf', 1),
('NEPSY-II Mémoire narrative', '/tests/nepsy_memoire.pdf', 1),
('TEA-Ch', '/tests/teach.pdf', 1),
('BRIEF', '/tests/brief.pdf', 4),
('CVLT', '/tests/cvlt.pdf', 4),
('Trail Making Test', '/tests/tmt.pdf', 2),
('Stroop', '/tests/stroop.pdf', 2),
('WAIS-IV Mémoire de travail', '/tests/wais_mt.pdf', 2),
('MMSE', '/tests/mmse.pdf', 5),
('Test de l''horloge', '/tests/horloge.pdf', 5),
('Questionnaire anamnèse', '/tests/anamnese.pdf', NULL);


INSERT INTO tests_fonctions (id_test, id_fonction) VALUES
-- Test 1: WISC-V Empan de chiffres
(1, 1),  -- Mémoire de travail
(1, 3),  -- Fonctions exécutives
-- Test 2: MoCA
(2, 1),  -- Mémoire de travail
(2, 2),  -- Attention sélective
(2, 3),  -- Fonctions exécutives
(2, 4),  -- Mémoire épisodique
-- Test 3: WISC-V Cubes
(3, 8),  -- Compétences visuospatiales
(3, 3),  -- Fonctions exécutives
-- Test 4: NEPSY-II Mémoire narrative
(4, 4),  -- Mémoire épisodique
(4, 6),  -- Langage expressif
-- Test 5: TEA-Ch
(5, 2),  -- Attention sélective
(5, 5),  -- Attention soutenue
-- Test 6: BRIEF
(6, 3),  -- Fonctions exécutives
-- Test 7: CVLT
(7, 4),  -- Mémoire épisodique
(7, 1),  -- Mémoire de travail
-- Test 8: Trail Making Test
(8, 3),  -- Fonctions exécutives
(8, 5),  -- Attention soutenue
-- Test 9: Stroop
(9, 2),  -- Attention sélective
(9, 3),  -- Fonctions exécutives
-- Test 10: WAIS-IV Mémoire de travail
(10, 1), -- Mémoire de travail
-- Test 11: MMSE
(11, 4), -- Mémoire épisodique
(11, 6), -- Langage expressif
-- Test 12: Test de l'horloge
(12, 8), -- Compétences visuospatiales
(12, 3); -- Fonctions exécutives


INSERT INTO favoris (nom_favori) VALUES
('Tests mémoire enfants'),
('Bilans adultes'),
('Tests attention enfants'),
('Batterie complète adolescents'),
('Évaluation fonctions exécutives'),
('Tests seniors');

INSERT INTO tests_favoris (id_favori, id_test) VALUES
-- Favori 1: Tests mémoire enfants
(1, 1),  -- WISC-V Empan
(1, 4),  -- NEPSY-II
-- Favori 2: Bilans adultes
(2, 2),  -- MoCA
(2, 8),  -- Trail Making Test
-- Favori 3: Tests attention enfants
(3, 5),  -- TEA-Ch
(3, 1),  -- WISC-V Empan
-- Favori 4: Batterie complète adolescents
(4, 6),  -- BRIEF
(4, 7),  -- CVLT
-- Favori 5: Évaluation fonctions exécutives
(5, 6),  -- BRIEF
(5, 8),  -- Trail Making Test
(5, 9),  -- Stroop
-- Favori 6: Tests seniors
(6, 11), -- MMSE
(6, 12), -- Test de l'horloge
(6, 2);  -- MoCA


INSERT INTO professionnels (nom_pro, prenom_pro, specialite, email_pro, tel_pro, notes) VALUES
('Durand', 'Sophie', 'Psychologue', 'sophie.durand@psy.be', '0475123456', 'Spécialisée en thérapie cognitivo-comportementale'),
('Lambert', 'Marc', 'Orthophoniste', 'marc.lambert@ortho.be', '0487654321', 'Travaille avec enfants et adolescents'),
('Moreau', 'Claire', 'Neuropsychologue', 'claire.moreau@neuro.be', '0476234567', 'Spécialisée troubles neurodéveloppementaux'),
('Simon', NULL, 'Centre de rééducation', 'contact@centre-simon.be', '0489876543', 'Centre pluridisciplinaire'),
('Leclerc', 'Pierre', 'Ergothérapeute', 'pierre.leclerc@ergo.be', '0471345678', 'Travaille en libéral'),
('Roux', 'Julie', 'Psychomotricienne', 'julie.roux@psy.be', NULL, 'Consultations à domicile possible'),
('Fontaine', 'Marc', 'Psychiatre', 'marc.fontaine@psy.be', '0498234567', 'Spécialisé troubles attentionnels');


INSERT INTO adresses (rue, numero, code_postal, ville) VALUES
('Avenue Louise', '245', '1050', 'Bruxelles'),
('Rue de la Station', '12', '7060', 'Soignies'),
('Boulevard de Waterloo', '38', '1000', 'Bruxelles'),
('Rue Neuve', '125', '1000', 'Bruxelles'),
('Avenue des Arts', '8B', '1210', 'Bruxelles'),
('Chaussée de Charleroi', '234', '6060', 'Gilly'),
('Place Communale', '1', '7000', 'Mons'),
('Rue du Commerce', '45', '4000', 'Liège');


INSERT INTO professionnels_adresses (id_professionnel, id_adresse) VALUES
-- Sophie Durand (id=1)
(1, 1),  -- Avenue Louise
(1, 3),  -- Boulevard de Waterloo
-- Marc Lambert (id=2)
(2, 2),  -- Rue de la Station
-- Claire Moreau (id=3)
(3, 3),  -- Boulevard de Waterloo
(3, 4),  -- Rue Neuve
(3, 6),  -- Chaussée de Charleroi
-- Centre Simon (id=4)
(4, 5),  -- Avenue des Arts
-- Pierre Leclerc (id=5)
(5, 6),  -- Chaussée de Charleroi
(5, 8),  -- Rue du Commerce
-- Julie Roux (id=6)
(6, 1),  -- Avenue Louise
(6, 6),  -- Chaussée de Charleroi
(6, 8),  -- Rue du Commerce
-- Marc Fontaine (id=7)
(7, 4);  -- Rue Neuve