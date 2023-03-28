create TABLE users (
   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
   nickname VARCHAR(20) NOT NULL UNIQUE,
   password VARCHAR(72) NOT NULL,
   accessToken VARCHAR DEFAULT NULL
);

create TABLE projects (
   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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
   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
   title TEXT NOT NULL,
   description TEXT NOT NULL,
   article TEXT NOT NULL,
   meta_title TEXT NOT NULL,
   meta_description TEXT NOT NULL,
   meta_keywords TEXT NOT NULL,
   createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);

create TABLE meta {
   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
   page TEXT,
   meta_title TEXT,
   meta_description TEXT,
   meta_keywords TEXT,
   meta_image TEXT,
   meta_author TEXT
}