import Section from '../components/layout/Section';
import Card from '../components/ui/Card';

export default function GiftUnlockPage() {
  return (
    <Section>
      <div className="section-heading">
        <p className="eyebrow">Gift Unlock</p>
        <h1>هنا سيأتي منطق فتح التجربة.</h1>
      </div>
      <Card className="placeholder-card">
        <p>النسخة الحالية فقط تجهز المسار. لا يوجد منطق فعلي بعد، وهذا طبيعي.</p>
      </Card>
    </Section>
  );
}
