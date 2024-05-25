import React from 'react';
import './Feedback.css';

function Feedback() {
  return (
    <div className='feedback_main'>
      <h2>주행 종료</h2>
      <div>
        <span>별점:</span>
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star}>★</span>
        ))}
      </div>
      <div>
        <textarea placeholder="한줄 후기" rows="4" cols="50"></textarea>
      </div>
      <button>제출</button>
    </div>
  );
}

export default Feedback;
