import React from 'react';
import axios from 'axios';

const client = axios.create({
  baseURL: "http://localhost:5000/api" 
});

function Post(route, params) {
  const [item, setItem] = React.useState(null);

  React.useEffect(() => {
    client.post(route, params).then((response) => {
      setItem(response.data);
    });
  }, []);

  console.log(item)
}

export default Post;