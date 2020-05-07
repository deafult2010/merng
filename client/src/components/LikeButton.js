import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Icon, Label, Popup } from 'semantic-ui-react';

import { MenuContext } from '../context/menu';

export default function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);
  const { setActiveItem } = useContext(MenuContext);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onError(err) {
      console.log(err);
    },
  });

  const likeButton = user ? (
    liked ? (
      <Button color='teal'>
        <Icon name='heart' />
      </Button>
    ) : (
      <Button color='teal' basic>
        <Icon name='heart' />
      </Button>
    )
  ) : (
    <Button
      as={Link}
      to='/login'
      color='teal'
      basic
      onClick={(e) => setActiveItem('login')}
    >
      <Icon name='heart' />
    </Button>
  );

  return (
    <Popup
      content={liked ? 'Unlike' : 'Like'}
      inverted
      trigger={
        <Button as='div' labelPosition='right' onClick={likePost}>
          {likeButton}
          <Label basic color='teal' pointing='left'>
            {likeCount}
          </Label>
        </Button>
      }
    />
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
