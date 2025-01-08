"use client";
import React from "react";
import Month from "./components/month/month";
import Summary from "./components/summary/summary";
import Header from "./components/header/header";
import { YearProvider } from "./context/yearContext";

export default function Home() {

  return (
    <YearProvider>
      <main>
        <Header />
        <Summary />
        <div className="flex flex-wrap justify-around">
          {[...Array(12).keys()].map((index) => {
            return (
              <Month
                index={index}
                key={index}
              />
            );
          })}
        </div>
      </main>
    </YearProvider>
  );
}
