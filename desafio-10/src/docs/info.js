export const info = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API e-commerce',
      version: '1.0.0',
      description: 'Tecnologías utilizadas: Node, Express, MongoDB',
    },
    servers: [{ url: 'http://localhost:8080' }],
  },
  apis: ['./src/docs/*.yml'],
};
