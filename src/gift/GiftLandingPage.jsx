import Section from '../components/layout/Section';
import Card from '../components/ui/Card';

export default function GiftLandingPage() {
  return (
    <Section>
      <div className="section-heading">
        <p className="eyebrow">Gift Landing</p>
        <h1>مدخل تجربة الهدية الرقمية.</h1>
      </div>
      <Card className="placeholder-card">
        <p>هنا سيبدأ مسار المستلم قبل unlock وreveal.</p>
      </Card>
    </Section>
  );
}
