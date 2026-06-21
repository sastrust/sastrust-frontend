// File: src/components/sections/HeroSection.tsx
// Section: Hero carousel
"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";

export default function HeroSection({
  slides,
}: {
  slides: {
    variant?: string;
    eyebrow?: string;
    titleLines: string[];
    bodyLines: string[];
    imageUrl: string;
    imageAlt: string;
    logoUrl: string;
  }[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const dragDistance = useRef(0);

  const showControls = slides.length > 1;

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  useEffect(() => {
    if (!showControls) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 8000);

    return () => window.clearInterval(timer);
  }, [showControls, slides.length]);

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    dragStartX.current = event.clientX;
    dragDistance.current = 0;
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (dragStartX.current === null) {
      return;
    }

    dragDistance.current = event.clientX - dragStartX.current;
  };

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    if (dragStartX.current === null) {
      return;
    }

    const distance = event.clientX - dragStartX.current;
    dragStartX.current = null;

    if (Math.abs(distance) > 45) {
      if (distance < 0) {
        showNext();
      } else {
        showPrevious();
      }
    }
  };

  const handleSlideClick = (event: MouseEvent<HTMLElement>) => {
    if (!showControls || Math.abs(dragDistance.current) > 8) {
      dragDistance.current = 0;
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - bounds.left;

    if (clickX > bounds.width / 2) {
      showNext();
    } else {
      showPrevious();
    }
  };

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="hero-slider" aria-roledescription="carousel">
      <div
        className="hero-slider__track"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, index) => {
          const isDetails = slide.variant === "details";
          const isTechnology = slide.variant === "technology";
          const isPerfection = slide.variant === "perfection";

          return (
            <article
              className={`hero-slide ${
                isPerfection
                  ? "hero-slide--perfection"
                  : isTechnology
                    ? "hero-slide--technology"
                    : isDetails
                      ? "hero-slide--details"
                      : "hero-slide--fabric"
              }`}
              aria-hidden={index !== activeIndex}
              key={`hero-slide-${index}`}
              onClick={handleSlideClick}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              {isPerfection ? (
                <>
                  <div className="hero-slide__perfection-bg" aria-hidden="true" />
                  <div className="hero-slide__copy hero-slide__copy--perfection">
                    {slide.titleLines.length > 0 ? (
                      <h2 className="hero-slide__title hero-slide__title--perfection">
                        {slide.titleLines.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </h2>
                    ) : null}
                    <span className="hero-slide__rule hero-slide__rule--perfection" aria-hidden="true" />
                    <p className="hero-slide__body hero-slide__body--perfection">
                      {slide.bodyLines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </p>
                  </div>
                  <div className="hero-slide__art hero-slide__art--perfection" aria-hidden="true">
                    <Image
                      src={slide.imageUrl}
                      alt=""
                      fill
                      sizes="100vw"
                      className="hero-slide__fabric hero-slide__fabric--perfection"
                    />
                  </div>
                </>
              ) : isTechnology ? (
                <>
                  <div className="hero-slide__technology-bg" aria-hidden="true" />
                  <div className="hero-slide__art hero-slide__art--technology" aria-hidden="true">
                    <Image
                      src={slide.imageUrl}
                      alt=""
                      fill
                      sizes="100vw"
                      className="hero-slide__fabric hero-slide__fabric--technology"
                    />
                  </div>

                  <div className="hero-slide__copy hero-slide__copy--technology">
                    {slide.titleLines.length > 0 ? (
                      <h2 className="hero-slide__title hero-slide__title--technology">
                        {slide.titleLines.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </h2>
                    ) : null}
                    <span
                      className="hero-slide__rule hero-slide__rule--technology"
                      aria-hidden="true"
                    />
                    <p className="hero-slide__body hero-slide__body--technology">
                      {slide.bodyLines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </p>
                  </div>
                </>
              ) : isDetails ? (
                <>
                  <div className="hero-slide__details-bg" aria-hidden="true" />
                  <div className="hero-slide__art hero-slide__art--details" aria-hidden="true">
                    <Image
                      src={slide.imageUrl}
                      alt=""
                      fill
                      sizes="100vw"
                      className="hero-slide__fabric hero-slide__fabric--details"
                    />
                  </div>

                  <div className="hero-slide__copy hero-slide__copy--details">
                    {slide.eyebrow ? (
                      <p className="hero-slide__eyebrow">{slide.eyebrow}</p>
                    ) : null}
                    <span className="hero-slide__rule hero-slide__rule--details" aria-hidden="true" />
                    <p className="hero-slide__body hero-slide__body--details">
                      {slide.bodyLines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="hero-slide__art" aria-hidden="true">
                    <Image
                      src={slide.imageUrl}
                      alt=""
                      fill
                      priority={index === 0}
                      sizes="100vw"
                      className="hero-slide__fabric"
                    />
                  </div>

                  <div className="hero-slide__copy">
                    {slide.eyebrow ? (
                      <p className="hero-slide__eyebrow">{slide.eyebrow}</p>
                    ) : null}
                    {slide.titleLines.length > 0 ? (
                      <h1 className="hero-slide__title">
                        {slide.titleLines.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </h1>
                    ) : null}
                    {slide.titleLines.length > 0 ? (
                      <span className="hero-slide__rule" aria-hidden="true" />
                    ) : null}
                    <p className="hero-slide__body">
                      {slide.bodyLines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </p>
                  </div>

                  {slide.logoUrl ? (
                    <Image
                      src={slide.logoUrl}
                      alt="Sastrust — Behind the Seen"
                      width={272}
                      height={200}
                      className="hero-slide__badge"
                    />
                  ) : null}
                </>
              )}
            </article>
          );
        })}
      </div>

      {showControls ? (
        <div className="hero-slider__dots" aria-label={`${slides.length} slides`}>
          {slides.map((slide, index) => (
            <button
              type="button"
              aria-label={`${index + 1}. slide`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={(event) => {
                event.stopPropagation();
                setActiveIndex(index);
              }}
              key={`hero-slide-dot-${index}`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
