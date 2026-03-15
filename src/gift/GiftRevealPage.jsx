import Section from '../components/layout/Section';
import Card from '../components/ui/Card';

export default function GiftRevealPage() {
  return (
    <Section>
      <div className="section-heading">
        <p className="eyebrow">Gift Reveal</p>
        <h1>هنا سيتم عرض التجربة النهائية وكشف الهدية.</h1>
      </div>
      <Card className="placeholder-card">
        <p>المرحلة القادمة ستكون تصميم reveal محترم بدل صفحات جامدة.</p>
      </Card>
    </Section>
  );
}
