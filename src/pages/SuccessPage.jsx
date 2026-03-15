import Section from '../components/layout/Section';
import Card from '../components/ui/Card';

export default function SuccessPage() {
  return (
    <Section>
      <div className="section-heading">
        <p className="eyebrow">Success</p>
        <h1>حالة النجاح ستأتي بعد اكتمال مسار الطلب.</h1>
      </div>
      <Card className="placeholder-card">
        <p>هذه الصفحة الآن مجرد محطة مؤقتة داخل الهيكل العام.</p>
      </Card>
    </Section>
  );
}
