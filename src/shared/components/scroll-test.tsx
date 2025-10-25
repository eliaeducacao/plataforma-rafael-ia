import { ScrollAnimated } from './scroll-animated';

export function ScrollTest() {
  return (
    <div className="space-y-20 p-8">
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <h1 className="text-4xl">Scroll para baixo para ver as animações</h1>
      </div>

      <ScrollAnimated animationType="scroll-left">
        <div className="bg-blue-500 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold">Animação da Esquerda</h2>
          <p>Este elemento deve aparecer vindo da esquerda</p>
        </div>
      </ScrollAnimated>

      <ScrollAnimated animationType="scroll-right">
        <div className="bg-green-500 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold">Animação da Direita</h2>
          <p>Este elemento deve aparecer vindo da direita</p>
        </div>
      </ScrollAnimated>

      <ScrollAnimated animationType="scroll-txt">
        <div className="bg-purple-500 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold">Animação de Texto</h2>
          <p>Este texto deve aparecer letra por letra</p>
        </div>
      </ScrollAnimated>

      <ScrollAnimated animationType="scroll-escala">
        <div className="bg-red-500 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold">Animação de Escala</h2>
          <p>Este elemento deve aparecer com efeito de escala</p>
        </div>
      </ScrollAnimated>

      <ScrollAnimated animationType="perspectivax">
        <div className="bg-yellow-500 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold">Animação de Perspectiva</h2>
          <p>Este elemento deve aparecer com perspectiva 3D</p>
        </div>
      </ScrollAnimated>

      <ScrollAnimated animationType="scroll-left2" delay={200}>
        <div className="bg-indigo-500 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold">Animação Rápida da Esquerda</h2>
          <p>Esta é a versão rápida (0.3s)</p>
        </div>
      </ScrollAnimated>
    </div>
  );
}
