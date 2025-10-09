"use client";
import React from "react";
import { campaigns } from "../mock/campaigns";

const Promo = () => {

  return (
    <section className="max-w-[1300px]">
      <div className="flex flex-col -mx-2.5 md:flex-row space-y-5 md:space-y-0">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="w-full px-2.5 md:w-1/2 lg:w-1/3 overflow-hidden"
          >
            <a href={campaign.link} className="bg-[#f5f6fa] rounded-lg block">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-auto rounded-t-lg object-cover"
              />
              <div className="px-4.25 py-3.75 md:p-6">
                <h3 className="font-bold text-md lg:text-xl text-[#2c3a54] mb-1.25">{campaign.title}</h3>
                <p className="text-sm md:text-md text-[#2c3a54cc] leading-relaxed">
                  {campaign.description}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Promo;