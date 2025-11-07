"use client";
import { HomeCards } from "@/src/components/home/c-cards";

export default function Home() {
  return (
    <>
    <div className="mb-4">
      <h1 className="text-2xl font-bold">Olá, <span className="text-primarydark">Ana Carolina</span></h1>
    </div>
      <HomeCards />
    </>
  );
}