const PageHeader = ({ title, description, eyebrow = 'MIVRA', children }) => (
  <header className="page-heading page-heading--page">
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {description && <p className="text-muted mb-0">{description}</p>}
    </div>
    {children}
  </header>
);
export default PageHeader;
