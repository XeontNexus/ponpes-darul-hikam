"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, Users, Award } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export function Hero() {
  const images = [
    "/images/darul-hikam-event.jpg",
    "/placeholder.svg?height=500&width=600",
    "/placeholder.svg?height=500&width=600&text=Slide3",
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section id="beranda" className="relative bg-gradient-to-r from-green-50 to-green-100 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-green-800 leading-tight">
              Pondok Pesantren
              <span className="block text-green-600">DARUL HIKAM</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Lembaga pendidikan Islam terpadu yang menggabungkan pendidikan agama dan umum untuk membentuk generasi
              yang berakhlak mulia, cerdas, dan berwawasan global.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="bg-green-700 hover:bg-green-800">
                Daftar Sekarang
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-green-700 text-green-700 hover:bg-green-50 bg-transparent"
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>

          <div className="relative">
            {/* Image Carousel */}
            <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-xl">
              <Image
                src={images[currentSlide] || "/placeholder.svg"}
                alt={`Pondok Pesantren DARUL HIKAM - Slide ${currentSlide + 1}`}
                width={600}
                height={500}
                className="w-full h-full object-cover transition-opacity duration-1000"
                key={currentSlide}
              />

              {/* Slide indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? "bg-white" : "bg-white/50"
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 mt-12 lg:mt-16">
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="text-2xl font-bold text-green-800">500+</h3>
            <p className="text-gray-600">Santri Aktif</p>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="text-2xl font-bold text-green-800">25+</h3>
            <p className="text-gray-600">Program Pendidikan</p>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="text-2xl font-bold text-green-800">30+</h3>
            <p className="text-gray-600">Tahun Pengalaman</p>
          </div>
        </div>
      </div>
    </section>
  )
}
