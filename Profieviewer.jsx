import { useState, useEffect } from 'react';
import axios from 'axios';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react';

const ProfileViewer = ({data}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      console.log(data?.name)
      try {
        const response = await axios.get(`https://api.github.com/users/${data?.name}`);
        console.log(response)
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <Skeleton isLoaded>
    <span>Chakra ui is cool</span>
  </Skeleton>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <img src={user.avatar_url} alt="profileIcon" height="30px" width="30px" />
      <p>Username: {user.login}</p>
      <p>Location: {user.location}</p>
      <p>Followers: {user.followers}</p>
      <p>Repositories: {user.public_repos}</p>
    </div>
  );
};

export default ProfileViewer;