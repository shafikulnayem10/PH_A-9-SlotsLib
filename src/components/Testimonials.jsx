import dynamic from "next/dynamic"
import { Quote } from "lucide-react"


const TestimonialsSlider = dynamic(
  () => import("./TestimonialsSlider").then((m) => m.TestimonialsSlider),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-[320px] text-slate-400 dark:text-slate-500 font-medium">
        Loading reviews...
      </div>
    ),
  }
)

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

      
        <TestimonialsSlider reviewsData={reviewsData} />

      </div>
    </section>
  )
}