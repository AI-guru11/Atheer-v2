import Section from '../components/layout/Section';
import Card from '../components/ui/Card';

export default function CheckoutPage() {
  return (
    <Section>
      <div className="section-heading">
        <p className="eyebrow">Checkout</p>
        <h1>سيتم بناء مسار التحويل لاحقًا بشكل مستقل ومنظم.</h1>
      </div>
      <Card className="placeholder-card">
        <p>لا تقفز إلى الدفع قبل تثبيت الواجهة والتدفق. هذه من أسرع طرق التخريب.</p>
      </Card>
    </Section>
  );
}
