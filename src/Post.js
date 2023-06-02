import React from 'react';
import axios from 'axios';

const client = axios.create({
  baseURL: "localhost:5000/api" 
});

function Post() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    client.post("/users/2").then((response) => {
      setPost(response.data);
    });
  }, []);
}

export default Get;