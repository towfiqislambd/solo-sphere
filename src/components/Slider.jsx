import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Slider Images
import slide1 from '../assets/slide1.jpg'
import slide2 from '../assets/slide2.jpg'
import slide3 from '../assets/slide3.jpg'

const Slider = () => {
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={true}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                loop={true}
                autoplay={{
                    delay: 5000, disableOnInteraction: false,
                }}
                className='h-[550px] rounded-lg'
            >
                <SwiperSlide style={{
                    backgroundImage: `url(${slide1})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    backgroundBlendMode: 'overlay'
                }}>
                    <div className="h-full flex justify-center items-center flex-col gap-5 text-center px-10 sm:px-20">
                        <h3 className='text-white text-3xl'>Enhance Your Skills And Ability</h3>
                        <p className='text-white'> Online group study provides an opportunity for students to come together virtually and tackle academic challenges as a team. By collaborating with others, you can gain fresh perspectives, share knowledge, and enhance your understanding of the material. for students to come together virtually and tackle academic challenges as a team.</p>
                        <button className='bg-orange-500 font-semibold text-black px-4 py-2 rounded'>View More</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{
                    backgroundImage: `url(${slide2})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    backgroundBlendMode: 'overlay'
                }}>
                    <div className="h-full flex justify-center items-center flex-col gap-5 text-center px-10 sm:px-20">
                        <h3 className='text-white text-3xl'>Join Collaborative Learning</h3>
                        <p className='text-white'> Online group study provides an opportunity for students to come together virtually and tackle academic challenges as a team. By collaborating with others, you can gain fresh perspectives, share knowledge, and enhance your understanding of the material. for students to come together virtually and tackle academic challenges as a team.</p>
                        <button className='bg-orange-500 font-semibold text-black px-4 py-2 rounded'>View More</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{
                    backgroundImage: `url(${slide3})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    backgroundBlendMode: 'overlay'
                }}>
                    <div className="h-full flex justify-center items-center flex-col gap-5 text-center px-10 sm:px-20">
                        <h3 className='text-white text-3xl'>Explore Assignments</h3>
                        <p className='text-white'> Online group study provides an opportunity for students to come together virtually and tackle academic challenges as a team. By collaborating with others, you can gain fresh perspectives, share knowledge, and enhance your understanding of the material. for students to come together virtually and tackle academic challenges as a team.</p>
                        <button className='bg-orange-500 font-semibold text-black px-4 py-2 rounded'>View More</button>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Slider;