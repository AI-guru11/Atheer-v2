export const builderContent = {
  intro: {
    eyebrow: "Gift Builder",
    title: "ابنِ هديتك خطوة بخطوة",
    description:
      "ابدأ من الشخص والمناسبة والميزانية، ثم حدّد الاهتمامات وأسلوب التجربة ومستوى التحكم لنصل إلى اتجاه الهدية الأنسب.",
  },

  steps: [
    {
      id: "recipient",
      number: 1,
      title: "لمن الهدية؟",
      description:
        "اختر الشخص الأقرب للمناسبة حتى يبدأ أثير من سياق صحيح وواضح.",
      field: "recipient",
      options: [
        { value: "father", label: "الأب" },
        { value: "mother", label: "الأم" },
        { value: "friend", label: "صديق/صديقة" },
        { value: "partner", label: "شريك/شريكة" },
        { value: "child", label: "طفل/طفلة" },
        { value: "manager", label: "مدير/مديرة" },
      ],
    },
    {
      id: "occasion",
      number: 2,
      title: "ما المناسبة؟",
      description:
        "المناسبة تغيّر نوع الهدية، أسلوب التجربة، وطريقة التقديم بالكامل.",
      field: "occasion",
      options: [
        { value: "birthday", label: "عيد ميلاد" },
        { value: "thanks", label: "شكر وتقدير" },
        { value: "anniversary", label: "ذكرى" },
        { value: "special-surprise", label: "مفاجأة خاصة" },
        { value: "promotion", label: "ترقية" },
        { value: "corporate", label: "مناسبة عمل" },
      ],
    },
    {
      id: "budget",
      number: 3,
      title: "ما الميزانية المناسبة؟",
      description:
        "اختر النطاق الذي تريد البناء ضمنه حتى تكون التوصية واقعية وقابلة للتنفيذ.",
      field: "budget",
      options: [
        { value: "under-250", label: "حتى 250" },
        { value: "250-500", label: "250–500" },
        { value: "500-1000", label: "500–1000" },
        { value: "1000-plus", label: "1000+" },
      ],
    },
    {
      id: "interest",
      number: 4,
      title: "ما الاهتمام الأقرب؟",
      description:
        "اختر التوجّه الأقرب للشخص حتى يبني أثير نوع الهدية على ذوق واضح بدل التخمين.",
      field: "interest",
      options: [
        { value: "coffee", label: "قهوة" },
        { value: "books", label: "كتب" },
        { value: "perfume", label: "عطور" },
        { value: "electronics", label: "إلكترونيات" },
        { value: "sports", label: "رياضة" },
        { value: "self-care", label: "عناية" },
        { value: "gaming", label: "ألعاب" },
        { value: "open", label: "مفتوح على اقتراحات" },
      ],
    },
    {
      id: "revealStyle",
      number: 5,
      title: "كيف تريد أن تبدو التجربة؟",
      description:
        "أسلوب التجربة يحدد نبرة الصفحة وطريقة الكشف وشكل اللحظة التي سيراها المستلم.",
      field: "revealStyle",
      options: [
        { value: "simple", label: "بسيط وأنيق" },
        { value: "emotional", label: "عاطفي وشخصي" },
        { value: "playful", label: "ممتع وتفاعلي" },
        { value: "luxury", label: "فاخر ومرتب" },
        { value: "surprise", label: "مفاجئ جدًا" },
        { value: "professional", label: "مهني ورسمي" },
      ],
    },
    {
      id: "controlMode",
      number: 6,
      title: "كيف تريد إدارة الاختيار؟",
      description:
        "حدّد هل تريد أن تختار بنفسك، أو أن يقترح أثير ثم تراجع، أو تفوض أثير بالكامل.",
      field: "controlMode",
      options: [
        { value: "self", label: "أختار كل شيء بنفسي" },
        { value: "copilot", label: "أثير يقترح وأنا أراجع" },
        { value: "delegated", label: "أفوض أثير بالكامل" },
      ],
    },
    {
      id: "deliveryMode",
      number: 7,
      title: "كيف تريد إرسال الهدية؟",
      description: "اختر الطريقة التي ستصل بها الهدية إلى المستلم.",
      field: "deliveryMode",
      options: [
        {
          value: "directDelivery",
          label: "أعرف عنوان المستلم",
          description: "أكمل العنوان الآن لنبدأ تجهيز الهدية مباشرة",
        },
        {
          value: "recipientChoice",
          label: "أرسل له رابطًا ليختار",
          description: "نرسل له صفحة خاصة يختار منها الهدية ويدخل عنوانه بنفسه",
        },
      ],
    },
  ],

  labels: {
    previous: "السابق",
    next: "التالي",
    finish: "شاهد التوصية الأولية",
    reset: "إعادة الاختيار",
    completed: "اكتملت هذه المرحلة",
  },

  summary: {
    title: "ملخص اختياراتك",
    empty: "ابدأ بأول خطوة لترى ملخصك هنا.",
    fields: {
      recipient: "الشخص",
      occasion: "المناسبة",
      budget: "الميزانية",
      interest: "الاهتمام",
      revealStyle: "أسلوب التجربة",
      controlMode: "طريقة الاختيار",
      deliveryMode: "طريقة الإرسال",
    },
  },

  completion: {
    badge: "التوصية جاهزة",
    title: "هديتك المقترحة",
    description:
      "راجع التوصية وتواصل معنا لتنفيذ الهدية.",
    primaryCta: "احجز هديتك مع أثير",
    ctaByDelivery: {
      directDelivery: "أكمل بيانات التوصيل",
      recipientChoice: "أرسل رابط الهدية للمستلم",
    },
  },
}

export const builderValueLabels = {
  recipient: {
    father: "الأب",
    mother: "الأم",
    friend: "صديق/صديقة",
    partner: "شريك/شريكة",
    child: "طفل/طفلة",
    manager: "مدير/مديرة",
  },
  occasion: {
    birthday: "عيد ميلاد",
    thanks: "شكر وتقدير",
    anniversary: "ذكرى",
    "special-surprise": "مفاجأة خاصة",
    promotion: "ترقية",
    corporate: "مناسبة عمل",
  },
  budget: {
    "under-250": "حتى 250",
    "250-500": "250–500",
    "500-1000": "500–1000",
    "1000-plus": "1000+",
  },
  interest: {
    coffee: "قهوة",
    books: "كتب",
    perfume: "عطور",
    electronics: "إلكترونيات",
    sports: "رياضة",
    "self-care": "عناية",
    gaming: "ألعاب",
    open: "مفتوح على اقتراحات",
  },
  revealStyle: {
    simple: "بسيط وأنيق",
    emotional: "عاطفي وشخصي",
    playful: "ممتع وتفاعلي",
    luxury: "فاخر ومرتب",
    surprise: "مفاجئ جدًا",
    professional: "مهني ورسمي",
  },
  controlMode: {
    self: "أختار كل شيء بنفسي",
    copilot: "أثير يقترح وأنا أراجع",
    delegated: "أفوض أثير بالكامل",
  },
  deliveryMode: {
    directDelivery: "إرسال مباشر",
    recipientChoice: "رابط للمستلم",
  },
}