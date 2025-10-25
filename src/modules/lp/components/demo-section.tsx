import { ScrollAnimated } from "@/shared/components/scroll-animated";

const DemoSection = () => {
  return (
    <section className="relative bg-background pt-40">
      <div className="w-full space-y-[50%]">
        {/* Primeira frase - Sticky */}
        <div className="h-[200vh] relative">
          <div className="sticky top-1/2 -translate-y-1/2 z-10 text-center max-w-5xl mx-auto px-4 sm:px-6">
            <ScrollAnimated animationType="scroll-txt">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                Seu cliente envia o caso às <span className="text-purple-600 dark:text-purple-400">14h</span> ...
              </h2>
            </ScrollAnimated>
          </div>
        </div>


        {/* Segunda frase - Sticky */}
        <div className="h-[200vh] relative">
          <div className="sticky top-1/2 -translate-y-1/2 z-10 text-center max-w-5xl mx-auto px-4 sm:px-6">
            <ScrollAnimated animationType="scroll-txt-smooth">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-8">
                Às{" "}
                <span className="text-purple-600 dark:text-purple-400">14h03</span>{" "}
                você responde com diagnóstico completo
              </h2>

              <div className="space-y-6">
                <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-medium">
                  (Seu concorrente ainda nem visualizou a mensagem)
                </p>
              </div>
            </ScrollAnimated>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;