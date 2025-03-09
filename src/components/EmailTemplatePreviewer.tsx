import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button, Snackbar, Alert } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import TemplateSelector from './TemplateSelector';
import TemplatePreview from './TemplatePreview';
import CustomerList from './CustomerList';
import { generateFakeCustomers } from '../utils/fakeData';
import { Customer } from '../types';

function EmailTemplatePreviewer() {
  const [templateType, setTemplateType] = useState('default');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const { data: templates, isLoading, error } = useQuery({
    queryKey: ['emailTemplates'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3001/templates');
      return response.data;
    },
  });

  const handleTemplateTypeChange = (event: SelectChangeEvent<string>) => {
    setTemplateType(event.target.value);
  };

  const handleTemplateChange = (event: SelectChangeEvent<any>) => {
    setSelectedTemplate(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/submissions', {
        templateType,
        selectedTemplate,
      });
      setNotification({ open: true, message: 'Template submitted successfully!', severity: 'success' });
    } catch (error) {
      setNotification({ open: true, message: 'Error submitting template.', severity: 'error' });
    }
  };

  const handleCloseNotification = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  const generatedFakeCustomers: Customer[] = generateFakeCustomers(1000);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Email Template Previewer</h2>
      <TemplateSelector
        templateType={templateType}
        onTemplateTypeChange={handleTemplateTypeChange}
        templates={templates}
        selectedTemplate={selectedTemplate}
        onTemplateChange={handleTemplateChange}
        isLoading={isLoading}
        error={error}
      />
      {selectedTemplate && <TemplatePreview template={selectedTemplate} />}
      <form onSubmit={handleSubmit} className="mb-6">
        <Button type="submit" variant="contained" color="primary" className="w-full">
          Submit Template
        </Button>
      </form>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">List of 1000 Fake Customers</h2>
      <CustomerList customers={generatedFakeCustomers} />
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EmailTemplatePreviewer;
