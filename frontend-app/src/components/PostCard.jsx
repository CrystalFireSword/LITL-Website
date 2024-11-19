import React from 'react';
import '../PostCard.css';
import '../App.css';

const PostCard = ({ post , admin }) => {
  const link = post?.link || ""; // Link to the Instagram post
  const postId = link.split('/p/')[1]?.split('/')[0]; // Extract the post ID (ignoring extra parameters)

  return (
    <div className="post-card">
      {/* Render Instagram Embed using iframe */}
      {postId && (
        <div className="instagram-embed">
          <iframe
            src={`https://www.instagram.com/p/${postId}/embed`}
            width="400"
            height="480"

            allowtransparency="true"
            allow="encrypted-media"
            title="Instagram post"
            style={{ border: 'none', display: 'block' }} // To hide profile and extra UI
          ></iframe>
        </div>
      )}

      {/* Render the title */}
      <h3>{post?.title}</h3>

      {/* Render the description */}
      <p>{post?.description}</p>

      {admin && <button className='postcardbut'>
        Update
        </button>}
    </div>
  );
};

export default PostCard;
