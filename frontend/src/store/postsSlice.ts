import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "./createAppAsyncThunk"
import { postsApi } from "../api/postsApi"
import { IPostState } from "./postsState"
import { IPost } from "../interfaces/IPost"

const namespace = 'posts'

export const createPost = createAppAsyncThunk(
    `${namespace}/createPost`,
    async (post: IPost) => {
        return await postsApi.addPost(post)
    }
)
export const getPosts = createAppAsyncThunk(
    `${namespace}/getPosts`,
    async () => {
        return await postsApi.getPosts()
    }
)


const initialState: IPostState = {
    posts: [],
    author: "Author"

}

export const postsSlice = createSlice({
    name: namespace,
    initialState: initialState,
    reducers: {
        goToInitialState(state) {
            state.posts = [] as IPost[]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.fulfilled, (state, action) => {
                let temp = [...state.posts]
                temp = [...temp, action.payload.data as IPost]
                state.posts = temp
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                //@ts-ignore
                state.posts = action.payload
            })
    }
})

export const { goToInitialState } = postsSlice.actions
