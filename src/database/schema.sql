CREATE TABLE ingressos (
    id SERIAL PRIMARY KEY,
    evento VARCHAR(255),
    local VARCHAR(255),
    data_evento DATE,
    categoria VARCHAR (50),
    preco DECIMAL( 10,2),
    quantidade_disponivel INTEGER
);

INSERT INTO ingressos (evento, local, data_evento, categoria, preco, quantidade_disponivel) VALUES 
('Thelema', 'Gate', '2025-06-02', 'Pista', '100', '2200'),
('Thelema', 'Gate', '2025-06-02', 'Pista VIP', '200', '1000'),
('Thelema', 'Gate', '2025-06-02', 'Camarote', '300', '500'),
('Thelema', 'Gate', '2025-06-02', 'Arquibancada', '80', '800');