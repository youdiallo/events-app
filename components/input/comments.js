import { useState, useEffect } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [ commentList, setCommentList ] = useState([]);

  useEffect(() => {
    if(showComments) {
      fetch('/api/comments/' + eventId)
      .then(resp => resp.json())
      .then(data => {
        setCommentList(data.comments);
      });
    }
  },[showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API
    fetch(`/api/comments/${eventId}`, {
      method:'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify(commentData), 
    })
    .then((response) => response.json())
    .then((jsonData) => console.log(jsonData));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items = {commentList}/>}
    </section>
  );
}

export default Comments;
