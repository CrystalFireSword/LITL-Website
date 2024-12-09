import React, { useState } from "react";
import '../AddTestimonial.css'

const AddTestimonial = ({handleClose}) => {

  const [reviewData , setReviewData] = useState({
    name : '',
    date :'',
    review:'',
  });

  //function to handle submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const apiUrl = 'http://localhost:5000/api';

    try{
      const response = await fetch(`${apiUrl}/reviews`,{
        method : 'POST',
        headers : {
          'Authorization' : `Bearer ${token}`,
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(reviewData),
      });
      if(response.ok){
        alert("Review added successfully");
        handleClose();
      }else{
        throw new Error('Failed to add review');
      }
    }catch(error){
      console.error('Error adding review:',error);
      alert('Failed to add review')
    }
  };

    return(
        <div className="add-post-popup">
      <div className="form-container">
        <h2>Add New Review</h2>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="Name"
              value = {reviewData.name}
              onChange={(e) => setReviewData({...reviewData , name : e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="Date"
              value={reviewData.date}
              onChange={(e) => setReviewData({...reviewData , date : e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Review</label>
            <textarea name="review" id="" type = "text" 
            value = {reviewData.review} 
            onChange={(e) => setReviewData({...reviewData , review : e.target.value})}
            required></textarea>
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button" onClick={handleSubmit}>Add Review</button>
            <button type="button" className="cancel-button" onClick={handleClose}>Cancel</button>
          </div>
        </form>
    </div>
    </div>
    )
}

export default AddTestimonial;