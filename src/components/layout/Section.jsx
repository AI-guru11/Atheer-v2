import Container from './Container';

export default function Section({ children, className = '', containerClassName = '', reveal = true }) {
  return (
    <section className={`section ${reveal ? 'reveal-block' : ''} ${className}`.trim()}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}