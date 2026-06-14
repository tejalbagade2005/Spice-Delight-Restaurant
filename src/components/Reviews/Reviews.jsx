import React from "react";
import Slider from "react-slick";
import "./Reviews.css";

const Reviews = () => {

const reviews = [

{
name:"Rahul",
text:"Amazing food and great service. I love the pizza!"
},

{
name:"Priya",
text:"Best restaurant in town. The burgers are delicious."
},

{
name:"Amit",
text:"Beautiful place and very tasty pasta."
},

{
name:"Sneha",
text:"Customer service is excellent and food quality is top."
}

];

const settings = {
dots:true,
infinite:true,
speed:500,
slidesToShow:1,
slidesToScroll:1,
autoplay:true,
autoplaySpeed:3000
};

return (
<section className="reviews">

<h2>Customer Reviews</h2>

<Slider {...settings}>

{reviews.map((review,index)=>(

<div key={index} className="review-card">

<p>"{review.text}"</p>

<h4>- {review.name}</h4>

</div>

))}

</Slider>

</section>
);
};

export default Reviews;