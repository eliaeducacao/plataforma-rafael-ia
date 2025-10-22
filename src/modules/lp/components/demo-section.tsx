import { ScrollAnimated } from "@/shared/components/scroll-animated";

const DemoSection = () => {
  return (
    <section className="relative bg-background pt-40">
      <div className="w-full space-y-[50%]">
        {/* Primeira frase - Sticky */}
        <div className="h-[200vh] relative">
          <div className="sticky top-1/2 -translate-y-1/2 z-10 text-center max-w-5xl mx-auto px-4">
            <ScrollAnimated animationType="scroll-txt">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight whitespace-nowrap">
                Seu cliente envia o caso às <span className="text-purple-600 dark:text-purple-400">14h</span> ...
              </h2>
            </ScrollAnimated>
          </div>
        </div>

        {/* Pontinhos - Sticky */}
        <div className="h-[100vh] relative">
          <div className="sticky top-1/2 -translate-y-1/2 z-10 flex justify-center items-center space-x-4">
            <ScrollAnimated animationType="scroll-escala">
              <div className="flex justify-center items-center space-x-4">
                <div className="w-6 h-6 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-6 h-6 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-6 h-6 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </ScrollAnimated>
          </div>
        </div>

        {/* Segunda frase - Sticky */}
        <div className="h-[200vh] relative">
          <div className="sticky top-1/2 -translate-y-1/2 z-10 text-center max-w-5xl mx-auto px-4">
            <ScrollAnimated animationType="scroll-txt">
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