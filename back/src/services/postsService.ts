import { IPost } from "../interfaces/IPost"
import { IResponse } from "../interfaces/IResponse"
import { db } from "../repository/fileDB"

class PostsService {
    getPosts = async () => {     
        try {
            const data = await db.getAllPosts()
            console.log(data)
            const response = {
                data: data,
                message: 'Все посты возвращены'
            }
            return data
        } catch (error) {
            const response: IResponse<null> = {
                data: null,
                message: 'Error'
            }
            return response
        }
    }
    addPost = async (post: IPost) => {
        try {
            const data = await db.addPost(post)
            const response= {
                data,
                message: 'Новый пост создан'
            }
            console.log(response)
            return response
        } catch (error) {
            const response: IResponse<null> = {
                data: null,
                message: 'Error'
            }
            return response
        }
    }
}

export const postsService = new PostsService()