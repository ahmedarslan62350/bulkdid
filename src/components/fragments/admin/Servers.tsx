import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { services } from "@/utils/dumyData";
import Link from "next/link";

export default function Servers() {
  return (
    <>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Server Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {services.map((service, index) => (
            <Link
              key={index}
              href={"/admin/service-details"}
              className="w-full h-full"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <service.icon className="h-6 w-6" />
                      {service.name}
                    </CardTitle>
                    <Badge
                      variant={
                        service.status === "Operational"
                          ? "default"
                          : service.status === "Degraded Performance"
                          ? "warning"
                          : "destructive"
                      }
                    >
                      {service.status}
                    </Badge>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(service.details).map(([key, value]) => (
                      <div key={key}>
                        <dt className="font-medium">{key}:</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
