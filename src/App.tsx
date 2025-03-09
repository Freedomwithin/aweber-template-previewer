import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EmailTemplatePreviewer from './components/EmailTemplatePreviewer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">AWeber Template Previewer</h1>
        <EmailTemplatePreviewer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
