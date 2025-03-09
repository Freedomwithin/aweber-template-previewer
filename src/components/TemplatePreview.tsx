import React from 'react';

interface TemplatePreviewProps {
  template: {
    subject: string;
    body: string;
  };
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template }) => {
  return (
    <div className="mb-6 p-4 border rounded bg-gray-50">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Preview</h3>
      <div className="mb-2">
        <strong>Subject:</strong> {template.subject}
      </div>
      <div>
        <strong>Body:</strong>
        <div dangerouslySetInnerHTML={{ __html: template.body }} />
      </div>
    </div>
  );
};

export default TemplatePreview;
