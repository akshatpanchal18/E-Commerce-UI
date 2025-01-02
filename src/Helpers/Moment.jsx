import React from 'react';
import { formatDistanceToNow } from 'date-fns';

function FormatDate({dateString}) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
  
    return `${day} ${month}, ${year}`;
  }

function Moment({ date }) {
  const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true });
  return (
    <div>
      <span>{formattedDate}</span>
    </div>
  );
}

export {Moment,FormatDate};
