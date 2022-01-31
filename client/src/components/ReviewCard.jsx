import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Rating,
  Typography,
} from '@mui/material';

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
}

export default function ReviewCard(review) {
  const name = review.review.reviewerName;
  const rating = review.review.riderRating;
  const reviewText = review.review.text;
  const date = new Date(review.review.date);
  const fullName = name.split(' ');
  const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  const fromatedDate = `${mm}-${dd}-${yyyy}`;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={(
          <Avatar
            sx={{ bgcolor: stringToColor(name) }}
            aria-label="shanen profile letter"
          >
            {initials}
          </Avatar>
        )}
        title={name}
      />
      <CardContent>
        <Rating value={rating} precision={0.5} readOnly />
        <Typography variant="body2" color="text.secondary">{fromatedDate}</Typography>
        <Typography variant="body2" color="text.secondary">
          {reviewText}
        </Typography>
      </CardContent>
    </Card>
  );
}