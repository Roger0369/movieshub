USE LoginApp;
GO

-- Tabla de películas
CREATE TABLE Movies (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Slug NVARCHAR(100) NOT NULL UNIQUE, 
    Name NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    Director NVARCHAR(100),
    Cast NVARCHAR(300),
    ReleaseDate DATE,
    Image NVARCHAR(255)
);
GO

-- Tabla de sugerencias relacionadas a cada película
CREATE TABLE MovieSuggestions (
    Id INT PRIMARY KEY IDENTITY(1,1),
    MovieId INT NOT NULL,
    SuggestedSlug NVARCHAR(100) NOT NULL,
    FOREIGN KEY (MovieId) REFERENCES Movies(Id)
);
GO

-- Tabla de películas favoritas por usuario
CREATE TABLE UserFavorites (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    MovieId INT NOT NULL,
    CreatedAt DATETIME2 DEFAULT SYSDATETIME(),
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (MovieId) REFERENCES Movies(Id),
    CONSTRAINT UQ_User_Movie_Favorite UNIQUE (UserId, MovieId)
);
GO

-- Tabla de películas ocultas por usuario
CREATE TABLE UserHidden (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    MovieId INT NOT NULL,
    CreatedAt DATETIME2 DEFAULT SYSDATETIME(),
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (MovieId) REFERENCES Movies(Id),
    CONSTRAINT UQ_User_Movie_Hidden UNIQUE (UserId, MovieId)
);
GO
