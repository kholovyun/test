import { useDispatch } from 'react-redux'
import './App.css'
import { AppDispatch, AppState } from './store/store'
import { useSelector } from 'react-redux'
import {useEffect, useState, ChangeEvent, FormEvent} from 'react'
import { createPost, getPosts } from './store/postsSlice'
import { IPost } from './interfaces/IPost'

function App() {
const dispatch: AppDispatch = useDispatch()
const {posts, author} = useSelector((state: AppState) => {return state.posts})
useEffect(() => {
  dispatch(getPosts())
}, [dispatch])

const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
  setNewPost((prevState) => ({
    ...prevState,
    [event.target.name]: event.target.value,
  }));
};
const [newPost, setNewPost] = useState({
  author: author,
  message: '' 
})
const submiting = (e: FormEvent) =>{
  e.preventDefault()
  dispatch(createPost(newPost as IPost))
}
  return (
    <div>
      <div>
        <form onSubmit={submiting}>
          <input onChange={inputHandler} name='message'  type="text" />
          <button type='submit'>Send</button>
        </form>
        
      </div>
      <table>
        <thead>
          <th>author</th>
          <th>message</th>
          <th>date</th>
        </thead>
        <tbody>
        {posts? 
          posts.map((post) => {return (
            <tr key={Math.random()}>
              <td>
                {post.author}
              </td>
              <td>
                {post.message}
              </td>
              <td>
                {post.dateTime.toString()}
              </td>
            </tr>
          )})
          :
          <h1>No posts present</h1>
        }
        </tbody>
      </table>
        
    </div>
  )
}

export default App
