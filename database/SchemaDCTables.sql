USE filetags

-- Drop a table called 'fileTypes' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[fileTypes]', 'U') IS NOT NULL
DROP TABLE [dbo].[fileTypes]
GO

-- Create a new table called '[fileTypes]' in schema '[dbo]'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[fileTypes]', 'U') IS NOT NULL
DROP TABLE [dbo].[fileTypes]
GO
-- Create the table in the specified schema
CREATE TABLE [dbo].[fileTypes]
(
    [Id] INT NOT NULL PRIMARY KEY, -- Primary Key column
    [extension] NVARCHAR(6) NOT NULL,
    [name] NVARCHAR(50) NOT NULL,
    [mime] NVARCHAR(256)
);
GO

-- Drop a table called 'files' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[files]', 'U') IS NOT NULL
DROP TABLE [dbo].[files]
GO

-- Create a new table called '[files]' in schema '[dbo]'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[files]', 'U') IS NOT NULL
DROP TABLE [dbo].[files]
GO
-- Create the table in the specified schema
CREATE TABLE [dbo].[files]
(
    [Id] INT NOT NULL PRIMARY KEY, -- Primary Key column
    [URI] NVARCHAR(512) NOT NULL,
    [FileTypeId] INT NOT NULL,
    [Created] DATETIME2
);
GO