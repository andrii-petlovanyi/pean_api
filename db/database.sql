create TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nickname VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(72) NOT NULL,
    accessToken VARCHAR DEFAULT NULL
);

create TABLE projects (
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   title TEXT NOT NULL,
   description TEXT NOT NULL,
   article TEXT NOT NULL,
   meta_title TEXT NOT NULL,
   meta_description TEXT NOT NULL,
   meta_keywords TEXT NOT NULL,
   createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);