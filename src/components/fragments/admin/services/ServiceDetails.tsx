import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { servicesDetails } from "@/utils/dumyData"



export default function ServiceDetails({ params }: { params: { service: string } }) {
  const service = servicesDetails[params.service as keyof typeof servicesDetails]

  if (!service) {
    notFound()
  }

  const ServiceIcon = service.icon

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2">
              <ServiceIcon className="h-8 w-8" />
              {service.name}
            </CardTitle>
            <Badge 
              variant={service.status === "Operational" ? "default" : 
                       service.status === "Degraded Performance" ? "warning" : "destructive"}
            >
              {service.status}
            </Badge>
          </div>
          <CardDescription>{service.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(service.details).map(([key, value]) => (
              <div key={key} className="bg-muted p-4 rounded-lg">
                <dt className="font-medium text-muted-foreground mb-1">{key}</dt>
                <dd className="text-lg">{value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}

