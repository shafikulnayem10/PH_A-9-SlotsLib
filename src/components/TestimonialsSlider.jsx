"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export function TestimonialsSlider({ reviewsData }) {
  return (
    <div className="relative px-12">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-14 !items-stretch"
      >
        {reviewsData.map((review) => (
          <SwiperSlide key={review.id} className="!h-auto flex">
            <div className="bg-slate-50/60 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-8 flex flex-col justify-between w-full min-h-[320px] transition-all duration-300 hover:shadow-xl hover:border-orange-500/20 group">
              <div className="text-orange-500 mb-4 flex justify-center shrink-0">
                <Quote className="w-10 h-10 transform rotate-180 fill-orange-500" />
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base font-medium leading-relaxed text-center flex-grow mb-6">
                "{review.comment}"
              </p>
              <div className="mt-auto text-center border-t border-slate-100 dark:border-slate-700 pt-4 shrink-0">
                <h4 className="text-orange-600 dark:text-orange-400 font-extrabold text-base group-hover:text-orange-500 transition-colors">
                  - {review.name}
                </h4>
                <span className="text-slate-400 dark:text-slate-500 font-semibold text-xs uppercase tracking-wider block mt-0.5">
                  {review.company}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-slate-800 hover:bg-orange-500 text-slate-700 dark:text-slate-300 hover:text-white p-3 rounded-xl transition-all shadow-md hover:shadow-orange-500/20 border border-slate-100 dark:border-slate-700 focus:outline-none">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-slate-800 hover:bg-orange-500 text-slate-700 dark:text-slate-300 hover:text-white p-3 rounded-xl transition-all shadow-md hover:shadow-orange-500/20 border border-slate-100 dark:border-slate-700 focus:outline-none">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}