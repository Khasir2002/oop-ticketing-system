import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Box,Typography } from "@mui/material";

interface Slide {
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: "Ella Secret Beach Party 2024",
    description: "Ella Secret Beach Party 2024",
    image: "https://www.ticketsministry.com/_next/image?url=https%3A%2F%2Fticketsministry.s3.ap-south-1.amazonaws.com%2Fpublic%2Fevents%2F202411271622-ella-secret-thumbnail.jpg&w=1920&q=75",
  },
  {
    title: "The Original BNS Show",
    description: "The Original BNS Show",
    image: "https://assets.mytickets.lk/images/events/The%20Original%20BNS%20Show/bnsc-1730714708796.jpg", 
  },
  {
    title: "INFINITE",
    description: "INFINITE",
    image: "https://www.ticketsministry.com/_next/image?url=https%3A%2F%2Fticketsministry.s3.ap-south-1.amazonaws.com%2Fpublic%2Fevents%2FR2AZCmtAtZm8EhVg1O4X19Ju8FbmCQZTUvFWIyIv.jpg&w=1920&q=75", 
  },
  {
    title: "TRILOKA",
    description: "TRILOKA",
    image: "https://www.ticketsministry.com/_next/image?url=https%3A%2F%2Fticketsministry.s3.ap-south-1.amazonaws.com%2Fpublic%2Fevents%2FCN3ERjddxzbKeN9YAuTth3pinKpPVdHO8iJLdNiL.jpg&w=1920&q=75"
  }
];

const SliderComponent: React.FC = () => {
    return (
        <Box sx={{ position: "relative", width: "100%", height: "400px" }}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            style={{ width: "100%", height: "100%" }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${slide.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "20%",
                      left: "5%",
                      color: "#fff",
                      zIndex: 2,
                      textShadow: "0 2px 5px rgba(0,0,0,0.5)",
                    }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                      {slide.title}
                    </Typography>
                    <Typography variant="body1" sx={{ marginY: 2 }}>
                      {slide.description}
                    </Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      );
    };

export default SliderComponent;
