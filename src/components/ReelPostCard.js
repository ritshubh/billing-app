import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Import modules if needed
import "../css/ReelPostCard.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ReelPostCard = ({ item }) => {
	const [heartClick, setHeartCllick] = useState(false);

	const onClickOfLike = () => {
		setHeartCllick(!heartClick);
	};
	return (
		<div className="reel-post-card pt-2">
			<div className="card-profile-pic px-3 py-2">
				<img src={item.profileImg} alt="product images" />
				<p className="pl-2 bold mb-1">
					<b>{item.userName}</b>
				</p>
			</div>
			<Swiper
				modules={[Navigation, Pagination]}
				spaceBetween={1} // Space between slides
				slidesPerView={1} // Number of slides visible at once
				navigation={false} // Enable navigation arrows
				pagination={{ clickable: true }} // Enable clickable pagination dots
				className="product-images-slider"
				onDoubleClick={onClickOfLike}
			>
				{item?.postImageArray.map((item, index) => (
					// index === 4 ? (
					// 	<SwiperSlide key={index} className="p-0">
					// 		<video
					// 			className="video-comp"
					// 			poster={props.imageArray}
					// 			controls
					// 		>
					// 			<source src={item} type="video/mp4" />
					// 		</video>
					// 	</SwiperSlide>
					// ) :
					<SwiperSlide key={index}>
						<img src={item.url} alt="product images" />
					</SwiperSlide>
				))}
			</Swiper>
			<div className="reel-post-card-details-section px-2">
				<div className="like-btn pt-2 px-1">
					<div onClick={onClickOfLike}>
						{heartClick ? (
							<i className="fas fa-heart heart-icon post-liked"></i>
						) : (
							<i className="fa fa-heart-o heart-icon"></i>
						)}
					</div>
					{/* <i
						onClick={onClickOfLike}
						className={`fas fa-heart heart-icon ${heartClick}`}
					></i> */}
					<p className="px-2 mb-1">{item.likes} Likes</p>
				</div>
				{/* <div className="post-caption px-1">
			</div> */}
				<div className="post-caption px-1 text-left">
					<p>
						<b>{item.userName}: </b>
						{item.caption}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ReelPostCard;
