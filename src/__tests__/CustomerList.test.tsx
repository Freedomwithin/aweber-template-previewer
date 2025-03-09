import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TemplateSelector from '../components/TemplateSelector';

describe('TemplateSelector Component', () => {
  const mockOnTemplateTypeChange = jest.fn();
  const mockOnTemplateChange = jest.fn();

  const mockTemplates = [
    { id: 1, name: 'Template 1' },
    { id: 2, name: 'Template 2' },
  ];

  it('renders the template type dropdown', () => {
    render(
      <TemplateSelector
        templateType="default"
        onTemplateTypeChange={mockOnTemplateTypeChange}
        templates={mockTemplates}
        selectedTemplate={null}
        onTemplateChange={mockOnTemplateChange}
        isLoading={false}
        error={null}
      />
    );

    expect(screen.getByLabelText(/template type/i)).toBeInTheDocument();
  });

  it('calls onTemplateTypeChange when template type is changed', () => {
    render(
      <TemplateSelector
        templateType="default"
        onTemplateTypeChange={mockOnTemplateTypeChange}
        templates={mockTemplates}
        selectedTemplate={null}
        onTemplateChange={mockOnTemplateChange}
        isLoading={false}
        error={null}
      />
    );

    fireEvent.change(screen.getByLabelText(/template type/i), {
      target: { value: 'promotion' },
    });

    expect(mockOnTemplateTypeChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('displays loading text when loading', () => {
    render(
      <TemplateSelector
        templateType="default"
        onTemplateTypeChange={mockOnTemplateTypeChange}
        templates={[]}
        selectedTemplate={null}
        onTemplateChange={mockOnTemplateChange}
        isLoading={true}
        error={null}
      />
    );

    expect(screen.getByText(/loading templates/i)).toBeInTheDocument();
  });
});
