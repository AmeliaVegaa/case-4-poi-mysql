CREATE TABLE test (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    school_id VARCHAR(50) NOT NULL,
    headmaster_name VARCHAR(255) NOT NULL,
    number_of_teachers INT NOT NULL,
    number_of_students INT NOT NULL,
    description TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
