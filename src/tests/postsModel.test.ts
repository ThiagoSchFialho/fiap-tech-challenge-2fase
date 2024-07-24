import { PostsModel } from '../models/posts.model';
const pool = require('../config/db.config');

jest.mock('../config/db.config');

describe('PostsModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('listPosts', async () => {
    const mockPosts = [
      { id: 1, title: 'Test Title 1', content: 'Test Content 1', createdDate: '01/01/2022 12:00', teacherName: 'Test Teacher' },
      { id: 2, title: 'Test Title 2', content: 'Test Content 2', createdDate: '02/01/2022 12:00', teacherName: 'Test Teacher' },
    ];

    const mockClient = {
      query: jest.fn().mockResolvedValue({ rows: mockPosts }),
      release: jest.fn(),
    };
    pool.connect.mockResolvedValue(mockClient);

    const postsModel = new PostsModel();
    const posts = await postsModel.listPosts();

    expect(posts).toEqual(mockPosts);
    expect(mockClient.query).toHaveBeenCalledWith(`
        SELECT 
          posts.id,
          posts.title,
          posts.content,
          TO_CHAR(posts.createdDate, 'DD/MM/YYYY HH24:MI') AS createdDate,
          teacher.name AS teacherName
        FROM 
            posts
        JOIN 
            teacher ON posts.teacherId = teacher.id;
        `);
    expect(mockClient.release).toHaveBeenCalled();
  });

  test('getPost', async () => {
    const mockPost = { id: 1, title: 'Test Title', content: 'Test Content', createdDate: '01/01/2022 12:00', teacherName: 'Test Teacher', teacherId: 1 };

    const mockClient = {
      query: jest.fn().mockResolvedValue({ rows: [mockPost] }),
      release: jest.fn(),
    };
    pool.connect.mockResolvedValue(mockClient);

    const postsModel = new PostsModel();
    const post = await postsModel.getPost(1);

    expect(post).toEqual(mockPost);
    expect(mockClient.query).toHaveBeenCalledWith(`
        SELECT 
          posts.id,
          posts.title,
          posts.content,
          TO_CHAR(posts.createdDate, 'DD/MM/YYYY HH24:MI') AS createdDate,
          teacher.name AS teacherName,
          teacher.id AS teacherId
        FROM 
            posts
        JOIN 
            teacher ON posts.teacherId = teacher.id
        WHERE
          posts.id = $1;`,
        [1]
        );
    expect(mockClient.release).toHaveBeenCalled();
  });

  test('createPost', async () => {
    const mockPost = { id: 1, title: 'Test Title', content: 'Test Content', teacherId: 1 };

    const mockClient = {
      query: jest.fn().mockResolvedValue({ rows: [mockPost] }),
      release: jest.fn(),
    };
    pool.connect.mockResolvedValue(mockClient);

    const postsModel = new PostsModel();
    const post = await postsModel.createPost('Test Title', 'Test Content', 1);

    expect(post).toEqual(mockPost);
    expect(mockClient.query).toHaveBeenCalledWith(`
        INSERT INTO posts (title, content, teacherId) VALUES
        ($1, $2, $3)`,
        ['Test Title', 'Test Content', 1]
      );
    expect(mockClient.release).toHaveBeenCalled();
  });

  test('editPost', async () => {
    const mockPost = { id: 1, title: 'Updated Title', content: 'Updated Content', teacherId: 1 };

    const mockClient = {
      query: jest.fn().mockResolvedValue({ rows: [mockPost] }),
      release: jest.fn(),
    };
    pool.connect.mockResolvedValue(mockClient);

    const postsModel = new PostsModel();
    const post = await postsModel.editPost(1, 'Updated Title', 'Updated Content', 1);

    expect(post).toEqual(mockPost);
    expect(mockClient.query).toHaveBeenCalledWith(`
        UPDATE posts 
        SET title = $1, content = $2, teacherId = $3 
        WHERE
        posts.id = $4
        RETURNING *;`,
        ['Updated Title', 'Updated Content', 1, 1]
      );
    expect(mockClient.release).toHaveBeenCalled();
  });

  test('deletePost', async () => {
    const mockPost = { id: 1, title: 'Test Title', content: 'Test Content', teacherId: 1 };

    const mockClient = {
      query: jest.fn().mockResolvedValue({ rows: [mockPost] }),
      release: jest.fn(),
    };
    pool.connect.mockResolvedValue(mockClient);

    const postsModel = new PostsModel();
    const post = await postsModel.deletePost(1);

    expect(post).toEqual(mockPost);
    expect(mockClient.query).toHaveBeenCalledWith(`
        DELETE
        FROM posts
        WHERE
        posts.id = $1
        RETURNING *;`,
        [1]
      );
    expect(mockClient.release).toHaveBeenCalled();
  });

  test('searchPosts', async () => {
    const mockPosts = [
      { id: 1, title: 'Test Title', content: 'Test Content', createdDate: '01/01/2024 12:00', teacherName: 'Test Teacher' },
      { id: 2, title: 'Another Test Title', content: 'Another Test Content', createdDate: '02/01/2024 13:00', teacherName: 'Test Teacher' },
    ];

    const mockClient = {
      query: jest.fn().mockResolvedValue({ rows: mockPosts }),
      release: jest.fn(),
    };
    pool.connect.mockResolvedValue(mockClient);

    const postsModel = new PostsModel();
    const posts = await postsModel.searchPosts('Test');

    expect(posts).toEqual(mockPosts);
    expect(mockClient.query).toHaveBeenCalledWith(`
        SELECT 
          posts.id,
          posts.title,
          posts.content,
          TO_CHAR(posts.createdDate, 'DD/MM/YYYY HH24:MI') AS createdDate,
          teacher.name AS teacherName
        FROM 
          posts
        JOIN 
          teacher ON posts.teacherId = teacher.id
        WHERE
          posts.title ILIKE $1
          OR
          posts.content ILIKE $1;
        `,[`%Test%`]);
    expect(mockClient.release).toHaveBeenCalled();
  });
});
