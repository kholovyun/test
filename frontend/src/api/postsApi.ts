
import { IPost } from "../interfaces/IPost";
import { IResponse } from "../interfaces/IResponse";
import { instance } from "./instance";


class PostsApi {
    public getPosts = async (): Promise<IResponse<IPost[] | undefined>> => {
        try {
            const response = await instance.get('/posts')
            return response.data
        } catch (err: unknown) {
            console.log(err);
            const error = err as Error
            const response: IResponse<undefined> = {
                data: undefined,
                message: error.message
            }
            return response
        }
    }

    public addPost = async (post: IPost): Promise<IResponse<IPost | undefined>> => {
        try {
            const response = await instance.post('/posts', post)
            return response.data
        } catch (err: unknown) {
            console.log(err);
            const error = err as Error
            const response: IResponse<undefined> = {
                data: undefined,
                message: error.message
            }
            return response
        }
    }

    
}

export const postsApi = new PostsApi()