import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface TemplateSelectorProps {
  templateType: string;
  onTemplateTypeChange: (event: SelectChangeEvent<string>) => void;
  templates: any[] | undefined;
  selectedTemplate: any;
  onTemplateChange: (event: SelectChangeEvent<any>) => void;
  isLoading: boolean;
  error: any;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templateType,
  onTemplateTypeChange,
  templates,
  selectedTemplate,
  onTemplateChange,
  isLoading,
  error
}) => {
  return (
    <div className="mb-6">
      <FormControl fullWidth className="mb-4">
        <InputLabel id="template-type-label">Template Type</InputLabel>
        <Select
          labelId="template-type-label"
          id="template-type"
          value={templateType}
          onChange={onTemplateTypeChange}
        >
          <MenuItem value="default">Default Template</MenuItem>
          <MenuItem value="promotion">Promotional Template</MenuItem>
          <MenuItem value="newsletter">Newsletter Template</MenuItem>
        </Select>
      </FormControl>
      {isLoading ? (
        <div className="text-gray-600">Loading templates...</div>
      ) : error ? (
        <div className="text-red-500">Error: {error.message}</div>
      ) : (
        <FormControl fullWidth>
          <InputLabel id="select-template-label">Select Template</InputLabel>
          <Select
            labelId="select-template-label"
            id="select-template"
            value={selectedTemplate || ''}
            onChange={onTemplateChange}
          >
            {templates?.map((template: any) => (
              <MenuItem key={template.id} value={template}>
                {template.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default TemplateSelector;
