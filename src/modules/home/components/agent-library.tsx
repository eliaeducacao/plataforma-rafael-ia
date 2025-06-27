import { Button } from '@/shared/components/ui/button';
import { DynamicIcon } from '@/shared/lib/icon-utils/index';
import { Agent } from "@/shared/types"

import { Skeleton } from '@/shared/components/ui/skeleton';

type AgentLibraryProps = {
  agents: Agent[] | undefined;
  isLoading: boolean
}

function AgentLibrary({ agents, isLoading }: AgentLibraryProps) {
  if (isLoading) return <AgentLibrarySkeleton />;

  return (
    <section id="agentes" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Biblioteca de Agentes Especializados
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada agente foi desenvolvido com expertise específica para atender diferentes áreas da
            prática jurídica com precisão e eficiência
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <Button className="w-full text-primary-foreground" variant="default">
                {agent.button}
              </Button>
            </div>
          ))}
        </div>

        {/* Library Stats */}
        <div className="mt-16 bg-secondary rounded-2xl p-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">9+</div>
              <div className="text-muted-foreground">Agentes Especializados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Disponibilidade</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Focado em Direito</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">GPT-4</div>
              <div className="text-muted-foreground">Tecnologia Avançada</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentLibrary;


function AgentLibrarySkeleton() {
  return (
    <section id="agentes" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-80 mx-auto mb-6" />
          <Skeleton className="h-6 w-96 mx-auto mb-2" />
          <Skeleton className="h-6 w-72 mx-auto" />
        </div>

        {/* Grid skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-card border-2 border-border rounded-xl p-6"
            >
              {/* Agent Header skeleton */}
              <div className="flex items-center mb-4">
                <Skeleton className="w-12 h-12 rounded-lg mr-4" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>

              {/* Description skeleton */}
              <div className="mb-4">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>

              {/* Features skeleton */}
              <div className="space-y-2 mb-6">
                {Array.from({ length: 6 }).map((_, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <Skeleton className="w-1.5 h-1.5 rounded-full mr-2" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                ))}
              </div>

              {/* Button skeleton */}
              <Skeleton className="w-full h-10 rounded" />
            </div>
          ))}
        </div>

        {/* Library Stats skeleton */}
        <div className="mt-16 bg-secondary rounded-2xl p-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}