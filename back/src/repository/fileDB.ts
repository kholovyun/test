import fs from 'node:fs/promises';
import uuid from 'react-uuid'
import { IPost } from '../interfaces/IPost';


class Repository {
  private foldername: string;

  constructor() {
    this.foldername = 'posts';
  }

  private async loadData(): Promise<IPost[]> {
    try {
      const data = await fs.readFile(`${this.foldername}/posts.json`, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private async saveData(posts: IPost[]): Promise<void> {
    await fs.writeFile(`${this.foldername}/posts.json`, JSON.stringify(posts));
  }

  public async init(): Promise<void> {
    try {
      await fs.mkdir(this.foldername);
    } catch (error) {
      console.log(`Папка '${this.foldername}' уже создан.`);
    }

    try {
      await fs.access(`${this.foldername}/posts.json`);
    } catch (error) {
      await fs.writeFile(`${this.foldername}/posts.json`, '[]');
    }
  }

  public async addPost(post: Omit<IPost, 'id'>): Promise<IPost> {
    const id = uuid();
    const dateTime = new Date().toISOString();
    const newPost: IPost = {
      id,
      //@ts-ignore
      dateTime,
      ...post,
    };

    const posts = await this.loadData();
    posts.push(newPost);
    await  this.saveData(posts);
    return newPost;
  }

  public async getAllPosts(): Promise<IPost[]> {
    return this.loadData();
  }
}

export const db = new Repository();