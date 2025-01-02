import React, { useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useProduct } from "../Context/ProductContext";

const ReviewForm = ({ onClose, id }) => {
  const { postReview } = useProduct();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [error, setError] = useState(null); // Track errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null); // Reset error state

    const reviewData = {
      comment,
      rating,
    };

    try {
      const res = await postReview(id, reviewData);
      if (res.success) {
        // Close modal on success
        onClose();
        // Optionally show success message here
      } else {
        setError("Failed to submit the review.");
      }
    } catch (err) {
      setError("An error occurred while submitting the review.");
      console.error("Error submitting review:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <h2>
        Post a Review
        <MdClose onClick={onClose} style={{ cursor: "pointer" }} />
      </h2>
      <Form onSubmit={handleSubmit}>
        <RatingContainer>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => setRating(star)}
              $isFilled={star <= rating}
            >
              <FaStar />
            </Star>
          ))}
        </RatingContainer>
        <CommentArea>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </CommentArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </SubmitButton>
      </Form>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #f9f9f9;

  h2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const RatingContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const Star = styled.div`
  font-size: 2rem;
  color: ${({ $isFilled }) => ($isFilled ? "gold" : "lightgray")};
  cursor: pointer;

  &:hover {
    color: gold;
  }
`;

const CommentArea = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    resize: none;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

export default ReviewForm;
