import React from 'react';
import axios from 'axios';

const client = axios.create({
  baseURL: "http://localhost:5000/api" 
});

function Post() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    client.post("/users").then((response) => {
      setUser(response.data);
    });
  }, []);

  console.log(user)
}

export default Post;