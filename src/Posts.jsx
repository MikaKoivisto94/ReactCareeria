import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

const Posts = () => {

//Komponentin tilan määritys
const [posts, setPosts] = useState([])
const [showPosts, setShowPosts] = useState(false)

useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json()) //Muutetaan json data javascriptiksi
    .then(oliot => setPosts(oliot))
}
,[]    
)

  return (
    <>
        <h2 onClick={() => setShowPosts(!showPosts)}>Posts from typicode</h2>

        {
            showPosts && posts && posts.map(p =>
            <div className='posts' key={p.id}>
            <h1>User ID: {p.userId}</h1>
            <h2>{p.title}</h2>
            <p>{p.body}</p>
            </div>
            )
        }
    </>
  );
}

export default Posts;
