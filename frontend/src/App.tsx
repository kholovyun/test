import { useDispatch } from 'react-redux'
import './App.css'
import { AppDispatch, AppState } from './store/store'
import { useSelector } from 'react-redux'
import {useEffect, useState, ChangeEvent, FormEvent} from 'react'
import { createPost, getPosts } from './store/postsSlice'
import { IPost } from './interfaces/IPost'

function App() {
  const formatDateTime = (dateToCon: Date): string => {
    const date = new Date(dateToCon);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    return `${day}.${month}.${year} ${hours}.${minutes}.${seconds}`;
  } 
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
                {formatDateTime(post.dateTime)}
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
