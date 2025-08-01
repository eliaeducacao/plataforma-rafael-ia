export function ConfirmEmailView() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          E-mail enviado com sucesso!
        </h2>

        <p className="text-gray-600 mb-8">
          Enviamos um e-mail com as instruções para recuperar sua senha.
          Por favor, verifique sua caixa de entrada.
        </p>

        <p className="text-sm text-gray-500">
          Não recebeu o e-mail? Verifique sua pasta de spam ou tente novamente em alguns minutos.
        </p>
      </div>
    </div>
  );
}