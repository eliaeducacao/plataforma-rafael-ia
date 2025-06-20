import { Button } from "@/shared/components/ui/button";

import { useAgentsModel } from "./agents.model";
import { DynamicIcon } from "@/shared/lib/icon-utils";

export function AgentsView(props: ReturnType<typeof useAgentsModel>) {
  const { agents, handleChangeAgent } = props;

  return (
    <div className="px-10 py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto">
        {agents?.map((agent, index) => (
          <div
            key={index}
            className="bg-card border-2 border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Agent Header */}
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors">
                <DynamicIcon name={agent.icon} className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">{agent.title}</h3>
                <p className="text-sm text-primary font-medium">{agent.subtitle}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-4 leading-relaxed">{agent.description}</p>

            {/* Features */}
            <div className="space-y-2 mb-6">
              {agent.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <Button className="w-full text-primary-foreground" variant="default" onClick={() => handleChangeAgent(agent._id)}>
              {agent.button}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}