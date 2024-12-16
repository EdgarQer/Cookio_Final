//import React from 'react';
import './SlideMenu.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import ItalianCuisine from "../assets/italian-food.png";
import FrenchCuisine from '../assets/french-food.png';
import { useNavigate } from 'react-router-dom';
const slides = [
    { image: ItalianCuisine, text: 'Italian cuisine', description: 'Experience the taste of Italy.' },
    { image: FrenchCuisine, text: 'French cuisine', description: 'Indulge in the flavors of France.' }
];

export default function SlideMenu() {
    const navigate = useNavigate();

    const handleViewDishes = () => {
        navigate('/categories');
    };
    return (
        <section className="slide-menu">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{
                    clickable: true,
                    renderBullet: (index, className) => (
                        `<div class="swiper-pagination-bullet ${className}"></div>`
                    ),
                }}
                loop={true}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="slide-menu__slide">
                            <img src={slide.image} alt={slide.text} className="slide-menu__image" />
                            <div className="slide-menu__overlay">
                                <h1>{slide.text}</h1>
                                <span className="slide-menu__description">{slide.description}</span>
                                <button className="slide-menu__button" onClick={handleViewDishes}>View dishes</button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
