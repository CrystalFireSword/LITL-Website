import React from 'react';
import '../PostCard.css';

const PostCard = ({ post }) => {
    // Ensure 'tags' is defined and is an array before using 'join'
    const tags = Array.isArray(post?.tags) ? post.tags : [];  // Default to an empty array if undefined
    const type = post?.type || "default"; // Handle optional 'type' field
    
    // Handle case when post or tags data is not available
    if (!post) {
      return <div>Loading...</div>; // or handle this as needed
    }
  
    return (
      <div className="post-card">
        {/* Conditionally render the image if available */}
        { <img src={process.env.PUBLIC_URL + '/images/image3.png'} alt={post.title} className="post-image" />}
        
        {/* Render the title */}
        <h3>{post.title}</h3>
        
        {/* Render the description */}
        <p>{post.description}</p>
  
        {/* Conditionally render tags if available */}
        <div>
          Tags: {tags.length > 0 ? tags.join(', ') : "No tags available"}
        </div>
  
        {/* Render the type or a default value */}
        <div>Type: {type}</div>
      </div>
    );
  };
  



export default PostCard;
