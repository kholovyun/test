import { IPost } from "../interfaces/IPost";

export interface IPostState {
    posts: IPost[] | []
    author: string
}