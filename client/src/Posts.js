import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Posts = (props) => {
    const [posts, setPosts] = useState([]);
    const [name, setName] = useState('')

    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:9000/api/users/${id}/posts`)
            .then(res => {
                setPosts(res.data)
                return axios.get(`http://localhost:9000/api/users/${id}`)
            })
            .then(res => setName(res.data.name))
            .catch(err => {
                console.log(err)
            })
    }, [])
    
    return (
        <div>
            <h1>{name}</h1>
            {posts.map(post => (
                <div key={post.id}>
                    <h4>"{post.text}"</h4>
                </div>
            ))}
        </div>
    )
}

export default Posts;