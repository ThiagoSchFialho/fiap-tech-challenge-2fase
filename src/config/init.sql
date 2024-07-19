CREATE TABLE IF NOT EXISTS teacher (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );

INSERT INTO teacher (name) VALUES
      ('Alice'),
      ('Bob')
      ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content VARCHAR(5000) NOT NULL,
        createdDate TIMESTAMPTZ DEFAULT current_timestamp,
        teacherId INT,
        FOREIGN KEY (teacherId) REFERENCES teacher(id)
      );

INSERT INTO posts (teacherId, title, content) VALUES
      ((SELECT id FROM teacher WHERE name = 'Alice'), 'First Post', 'Content of the first post'),
      ((SELECT id FROM teacher WHERE name = 'Bob'), 'Second Post', 'Content of the second post')
      ON CONFLICT DO NOTHING;