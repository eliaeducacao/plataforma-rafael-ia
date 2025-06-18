"use client"

import { useState } from "react"
import {
  BarChart3,
  Briefcase,
  ClipboardList,
  DollarSign,
  Factory,
  Hammer,
  HardHat,
  LineChart,
  ShoppingCart,
  User,
  Users,
  Warehouse,
  ArrowLeft,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import type { Agent, Department } from "@/modules/chat/types"

interface DashboardViewProps {
  departments: Department[]
  onSelectAgent: (agent: Agent) => void
}

export function DashboardView({ departments, onSelectAgent }: DashboardViewProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)

  // Function to get the appropriate icon for each department
  const getDepartmentIcon = (departmentId: string) => {
    switch (departmentId) {
      case "dept-raportowanie":
        return <BarChart3 className="h-6 w-6" />
      case "dept-kontroling":
        return <LineChart className="h-6 w-6" />
      case "dept-administracja":
        return <Briefcase className="h-6 w-6" />
      case "dept-produkcja":
        return <Factory className="h-6 w-6" />
      case "dept-planowanie":
        return <ClipboardList className="h-6 w-6" />
      case "dept-infrastruktura":
        return <Hammer className="h-6 w-6" />
      case "dept-kadry":
        return <Users className="h-6 w-6" />
      case "dept-zakupy":
        return <ShoppingCart className="h-6 w-6" />
      case "dept-jakosc":
        return <ClipboardList className="h-6 w-6" />
      case "dept-sprzedaz":
        return <DollarSign className="h-6 w-6" />
      case "dept-ksiegowosc":
        return <DollarSign className="h-6 w-6" />
      case "dept-zarzad":
        return <Briefcase className="h-6 w-6" />
      case "dept-marketing":
        return <BarChart3 className="h-6 w-6" />
      case "dept-logistyka":
        return <Warehouse className="h-6 w-6" />
      case "dept-rozwoj":
        return <HardHat className="h-6 w-6" />
      default:
        return <Briefcase className="h-6 w-6" />
    }
  }

  if (selectedDepartment) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Button variant="outline" onClick={() => setSelectedDepartment(null)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para departamentos
          </Button>
          <h1 className="text-2xl font-bold">{selectedDepartment.name}</h1>
          <p className="text-muted-foreground">{selectedDepartment.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedDepartment.agents.map((agent) => (
            <Card key={agent.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {agent.name}
                </CardTitle>
                <CardDescription>{agent.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  {agent.conversations.length > 0
                    ? `${agent.conversations.length} ${agent.conversations.length === 1 ? "conversa disponível" : "conversas disponíveis "}`
                    : "Sem conversas ativas"}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => onSelectAgent(agent)}>
                  Selecionar agente
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Departamentos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <Card
            key={department.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedDepartment(department)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getDepartmentIcon(department.id)}
                {department.name}
              </CardTitle>
              <CardDescription>{department.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {department.agents.map((agent) => (
                  <Badge key={agent.id} variant="outline">
                    {agent.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Mostrar agentes ({department.agents.length})
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

