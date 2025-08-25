export const apiConfig = {
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://api.yourhomesecured.com' 
    : 'http://localhost:3001',
  
  endpoints: {
    quiz: {
      submit: '/api/quiz/submit',
      results: '/api/quiz/results'
    },
    leads: {
      create: '/api/leads/create',
      update: '/api/leads/update'
    },
    providers: {
      search: '/api/providers/search',
      details: '/api/providers/details'
    },
    contact: {
      submit: '/api/contact/submit'
    }
  },
  
  timeout: 10000,
  retries: 3,
  
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};