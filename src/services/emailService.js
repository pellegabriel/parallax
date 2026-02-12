const API_URL = 'https://thecave-backend-git-main-tmontesinos01s-projects.vercel.app/api/send-mail';

export const sendEmail = async ({ email, subject, message }) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      subject,
      message,
    }),
  });

  if (response.status === 201) {
    return { success: true };
  }

  if (response.status === 400) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Error de validación');
  }

  if (response.status === 500) {
    throw new Error('Error interno del servidor al procesar el email');
  }

  throw new Error('Error desconocido al enviar el email');
};
