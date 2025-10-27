const DemoSection = () => {
  return (
    <section className="relative bg-background py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Primeira frase */}
          <h2
            className="font-bold text-foreground leading-tight text-center"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 3rem)',
              lineHeight: '1.1'
            }}
          >
            Seu cliente envia o caso às <span className="text-purple-600 dark:text-purple-400">14h</span> ...
          </h2>

          {/* Segunda frase */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Às{" "}
              <span className="text-purple-600 dark:text-purple-400">14h03</span>{" "}
              você responde com diagnóstico completo
            </h2>

            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-medium">
              (enquanto seu concorrente ainda nem visualizou a mensagem)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;