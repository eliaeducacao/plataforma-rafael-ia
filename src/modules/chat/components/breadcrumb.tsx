import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb"
import { Skeleton } from "@/shared/components/ui/skeleton"

interface BreadcrumbProps {
  agentName: string
  onNavigateToAgents: () => void
  isLoading?: boolean
}

export default function ChatBreadcrumb({ agentName, onNavigateToAgents, isLoading = false }: BreadcrumbProps) {
  return (
    <div className="bg-background/95 ml-16 my-4 sm:ml-0 sm:my-0 sm:my-0backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="max-w-4xl mx-auto w-full">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                {isLoading ? (
                  <Skeleton className="h-4 w-24" />
                ) : (
                  <BreadcrumbLink
                    className="font-medium text-primary text-sm sm:text-base hover:cursor-pointer truncate"
                    onClick={onNavigateToAgents}
                  >
                    {agentName}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm sm:text-base">Chat</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  )
} 