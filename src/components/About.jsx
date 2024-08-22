import { Button } from "@mui/material";
import React from "react";
import owner from "/src/images/owner.jpg";
import about1 from "/src/images/about1.jpg";
import about3 from "/src/images/about3.jpg";
import about4 from "/src/images/about4.jpg";

function About() {
  return (
    <div>
      <div className="relative w-full h-full ">
        <img src={owner} className="object-cover w-full h-auto" alt="Owner" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl text-white">About</h1>
        </div>
      </div>
      <div className="flex items-center justify-center py-10">
        <div className="p-5 text-justify phone:w-5/6 tabletLandscape:w-1/2">
          <h4 className="text-2xl font-semibold mb-9">
            At Chrono, we curate a handpicked collection of accessories that
            cater to the discerning tastes of modern gentlemen.
          </h4>
          <h5 className="text-xl text-slate-700">
            Welcome to Chrono, your premier destination for exquisite men’s
            accessories that combine timeless elegance with contemporary style.
            We believe that the right accessories have the power to elevate your
            look, leaving a lasting impression.
          </h5>
        </div>
      </div>
      <div className="flex w-full phone:mb-4 tabletLandscape:mb-0 bg-zinc-100 phone:flex-col tabletLandscape:flex-row">
        <img
          src={about1}
          className="tabletLandscape:w-1/2 phone:my-3 tabletLandscape:my-0 phone:w-full phone:h-1/2"
          alt="Owner"
        />
        <div className="flex flex-col items-center justify-center space-y-8 phone:px-10 tabletLandscape:px-20">
          <h1 className="text-5xl text-start">Our Philosophy</h1>
          <p className="text-lg text-justify text-slate-700">
            At Chrono, we understand that accessories are not merely add-ons to
            an outfit; they are an expression of personal style and
            individuality. Our philosophy is rooted in the belief that every
            accessory tells a story, and we strive to offer a diverse range of
            products that enable you to create your own unique narrative.
          </p>
        </div>
      </div>
      <div className="flex w-full phone:mb-4 tabletLandscape:mb-0 bg-zinc-100 phone:flex-col tabletLandscape:flex-row">
        <div className="flex flex-col items-center justify-center space-y-8 phone:px-10 tabletLandscape:px-20">
          <h1 className="text-5xl text-start">Quality Craftsmanship</h1>
          <p className="text-lg text-justify text-slate-700">
            We take pride in sourcing accessories that embody the highest
            standards of craftsmanship and quality. Our products are
            meticulously crafted using premium materials, ensuring durability
            and longevity. From the finest leather bracelets to intricately
            designed cufflinks, every item in our collection undergoes a
            rigorous selection process to ensure it meets our stringent
            criteria.
          </p>
        </div>
        <img
          src={about3}
          className="tabletLandscape:w-1/2 phone:my-3 tabletLandscape:my-0 phone:w-full phone:h-1/2"
          alt="Owner"
        />
      </div>
      <div className="flex w-full phone:mb-4 bg-zinc-100 phone:flex-col tabletLandscape:flex-row">
        <img
          src={about4}
          className="tabletLandscape:w-1/2 phone:my-3 tabletLandscape:my-0 phone:w-full phone:h-1/2"
          alt="Owner"
        />
        <div className="flex flex-col items-center justify-center space-y-8 phone:px-10 tabletLandscape:px-20">
          <h1 className="text-5xl text-start">Unparalleled Variety</h1>
          <p className="text-lg text-justify text-slate-700">
            At Chrono, we believe that style knows no boundaries, which is why
            we offer a wide range of accessories to suit every taste and
            occasion. From classic and timeless pieces to contemporary designs
            that push the boundaries of fashion, our collection boasts an
            unparalleled variety. Whether you’re looking for a sleek and
            minimalist watch or a statement-making bracelet, we have something
            to suit your personal style.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col py-20 text-justify space-y-7 phone:w-5/6 tabletLandscape:w-1/2">
          <h1 className="text-5xl text-center">Join the Chrono Community</h1>
          <p className="text-lg">
            At Chrono, we are not just a store; we are a community of style
            enthusiasts who appreciate the art of accessorizing. We invite you
            to join our community, where you can stay updated on the latest
            trends, styling tips, and exclusive offers. Connect with us through
            our blog, social media platforms, and newsletter to be part of a
            dynamic community that shares a passion for men’s accessories.
            <br />
            <br />
            Thank you for choosing Chrono as your trusted source for men’s
            accessories. We are honored to be a part of your style journey and
            look forward to helping you discover the perfect accessories to
            express your unique personality and enhance your overall look.
          </p>
          <div className="flex items-center justify-center py-2 pb-5 my-8 mb-12">
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "#0F0F0F" }}
              size="large"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              JOIN US
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
