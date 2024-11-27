"use client";

import ServiceDetails from "@/components/fragments/admin/services/ServiceDetails";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

const ServicesDetailsPage = () => {
  const [service, setService] = useState("database");
  const services = [
    "database",
    "whatsapp",
    "fileserver",
    "fileprocessing",
    "mailsender",
    "norombo",
  ];

  const handleServiceChange = (event: string) => {
    setService(event);
  };
  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-1">
        <div className="w-full h-screen p-5 overflow-y-auto scroll-smooth">
          <div className="bg-white rounded-lg w-full h-fit p-5 flex justify-center items-center shadow">
            <Label className="w-[10%] font-bold" htmlFor="service">
              Select Service :
            </Label>
            <Select value={service} onValueChange={handleServiceChange}>
              <SelectTrigger id="service">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service.split("")[0].toLocaleUpperCase() +
                      service.substring(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ServiceDetails params={{ service }} />
        </div>
      </main>
    </div>
  );
};

export default ServicesDetailsPage;
