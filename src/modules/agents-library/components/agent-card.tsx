import { Button } from "@/shared/components/ui/button";
import { DynamicIcon } from "@/shared/lib/icon-utils";
import { Agent } from "@/shared/types";
import { Skeleton } from "@/shared/components/ui/skeleton";

interface AgentCardProps {
  agent: Agent;
  index: number;
  onSelectAgent: (agentId: string) => void;
}

export function AgentCard({ agent, index, onSelectAgent }: AgentCardProps) {
  return (
    <div
      className="flex flex-col justify-between bg-card border-2 border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex flex-col space-y-4 pb-8">
        {/* Agent Header */}
        <div className="flex items-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors">
            <DynamicIcon name={agent.icon} className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">{agent.title}</h3>
            <p className="text-sm text-primary font-medium">{agent.subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">{agent.description}</p>

        {/* Topics */}
        <div className="space-y-2">
          {agent.topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="flex items-center text-sm">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
              <span className="text-muted-foreground">{topic}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <Button
        className="w-full text-primary-foreground"
        variant="default"
        onClick={() => onSelectAgent(agent._id)}
      >
        {agent.button}
      </Button>
    </div>
  );
}

export function AgentCardSkeleton({ index }: { index: number }) {
  return (
    <div
      className="flex flex-col justify-between bg-card border-2 border-border rounded-xl p-6 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex flex-col space-y-4 pb-8">
        {/* Agent Header Skeleton */}
        <div className="flex items-center">
          <Skeleton className="w-12 h-12 rounded-lg mr-4" />
          <div className="flex-1">
            <Skeleton className="h-5 w-32 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Topics Skeleton */}
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, topicIndex) => (
            <div key={topicIndex} className="flex items-center">
              <Skeleton className="w-1.5 h-1.5 rounded-full mr-2" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
      </div>

      {/* Button Skeleton */}
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
} 