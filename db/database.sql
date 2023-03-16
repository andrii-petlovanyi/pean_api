create TABLE users (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(20) NOT NULL,
    password VARCHAR(36) NOT NULL
);

create TABLE projects (
   id SERIAL PRIMARY KEY,
   title TEXT NOT NULL,
   description TEXT NOT NULL,
   article TEXT NOT NULL,
   meta_title TEXT NOT NULL,
   meta_description TEXT NOT NULL,
   meta_keywords TEXT NOT NULL,
   createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
   images TEXT[]
);

create TABLE posts (
   id SERIAL PRIMARY KEY,
   title TEXT NOT NULL,
   description TEXT NOT NULL,
   article TEXT NOT NULL,
   meta_title TEXT NOT NULL,
   meta_description TEXT NOT NULL,
   meta_keywords TEXT NOT NULL,
   createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);