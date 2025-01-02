import React, { useState } from 'react';
import styled from 'styled-components';
import Rating from '../Helpers/Rating';
import {Moment} from '../Helpers/Moment';
import PostReview from './PostReview'

function Reviews({ review ,id}) {
  const [showReviweForm,setShowReviweForm]=useState(false)
 const handleReview =()=>{
setShowReviweForm(true)
 }
 const handleClose = ()=>{
  setShowReviweForm(false)
 }

  return (
    <ReviewContainer>
        {
          showReviweForm ? (
            <PostReview onClose={handleClose} id={id}/>
          ):(
            <>
            <StyledH2>Reviews</StyledH2>
        <Button onClick={handleReview}>Add Review</Button>
      {review.length === 0 ? (
        <p style={{textAlign:"center",fontSize:"2rem"}}>No reviews</p>
      ) : (
        <>
          {review.map((view) => (
            <Review key={view._id}>
                <div className='data'><Rating rating={view.rating} /><Moment date={view.createdAt}/></div>
              <div className='rating'>
              <strong>{view.user.name}</strong>
              <small>{view.user.email}</small>
              
              <p>{view.comment}</p>
              </div>
            </Review>
          ))}
        </>
      )}
      </>
          )
        }
    </ReviewContainer>
  );
}
const Button = styled.button`
padding: 0.5rem;
    border: none;
    border-radius: 5px;
    background: #254336;
    color: white;
    position: relative;
    bottom: 32%;
    left: 47%;
    font-weight:bold;
    @media(max-width:768px){
    left:38%;
    }
`
const ReviewContainer = styled.div`
  margin-top: 20px;
`;
const StyledH2 = styled.h2`
  font-size: 24px; /* Adjust font size as needed */
  color: #333; /* Set your desired color */
  margin-bottom: 15px; /* Space below the heading */
  text-align: center; /* Center the heading */
  // display:flex;
`;
const Review = styled.div`
//   border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #f9f9f9;
  padding:0.5rem;
  max-width:300px;
  margin:1rem auto;
  text-overflow:elips;
  display:flex;
  flex-direction:column;
  gap:1rem;
  p{
  font-size:1.5rem;
  }
  .rating,{
  display:flex;
  flex-direction:column;
  }
  .data{
  display:flex;
  justify-content:space-between;
  align-items:center;
  }
`;


export default Reviews;
