import Section from '../components/layout/Section';
import Card from '../components/ui/Card';

export default function CorporatePage() {
  return (
    <Section>
      <div className="section-heading">
        <p className="eyebrow">Corporate Gifting</p>
        <h1>هذه الصفحة مخصصة لمسار الشركات والطلبات الجماعية.</h1>
      </div>
      <Card className="placeholder-card">
        <p>
          الهدف هنا هو فتح باب B2B فعلي: هدايا موظفين، عملاء، مناسبات، وطلبات bulk بشكل
          محترم وليس صفحة نصوص عابرة.
        </p>
      </Card>
    </Section>
  );
}
