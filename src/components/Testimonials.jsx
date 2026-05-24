"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const reviewsData = [
  {
    id: 1,
    name: "Tajmun Nahar Tisha",
    company: "Doreen Group",
    comment: "I've been playing both football and cricket at SlotsLib arenas, and I'm impressed with the quality of the facilities. The staff is friendly, and the environment is perfect for sports lovers. A great place to enjoy and improve your game!",
  },
  {
    id: 2,
    name: "Taukir Ahmed",
    company: "Incredible Pvt. Ltd",
    comment: "I've played cricket at many places, but SlotsLib venues stand out. The indoor pitch is perfect, and the atmosphere is great for competitive and friendly matches alike. My go-to spot!",
  },
  {
    id: 3,
    name: "Syed Navid Anjum",
    company: "Midland Bank",
    comment: "The football experience at SlotsLib grounds is unparalleled. Great facilities, easy booking, and a fantastic indoor field. Perfect for weekend matches with friends!",
  },
  {
    id: 4,
    name: "Mahmudul Hasan",
    company: "Brain Station 23",
    comment: "Booking a turf was never this easy. The slots are accurate, and the automated confirmations saved us a lot of coordination time. Highly recommended for corporate tournaments!",
  },
]

export function Testimonials() {
  return (
    <section className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white py-20 px-4 md:px-8 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 dark:bg-orange-900/20 rounded-full border border-orange-100 dark:border-orange-800">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Reviews</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            WHAT OUR <span className="text-orange-500">CLIENTS</span> SAY
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

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
      </div>
    </section>
  )
}