import Container from './Container';

export default function Section({ children, className = '', containerClassName = '' }) {
  return (
    <section className={`section ${className}`.trim()}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
