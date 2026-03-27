import { type Article } from "@/types";
export type { Article };

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Sensex, Nifty hit all-time highs as bulls return to Dalal Street",
    content: "The Indian stock market witnessed a massive rally today as the Sensex and Nifty hit new record highs. Investors were buoyed by positive global cues and strong domestic earnings. Analysts expect the momentum to continue as the festive season approaches, with retail participation reaching unprecedented levels.",
    category: "markets",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    imageUrl: "https://images.unsplash.com/photo-1611974717483-5828ff797ae1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    title: "Global Tech Summit 2024: Focus on AI Ethics and Regulation",
    content: "The annual Global Tech Summit kicked off in Bengaluru today, with world leaders and tech CEOs gathering to discuss the future of artificial intelligence. The primary focus of this year's summit is the ethical implementation of AI and the need for a global regulatory framework to prevent misuse while fostering innovation.",
    category: "tech",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: '3',
    title: 'Tata Motors share price hits fresh 52-week high on EV expansion plans',
    content: 'Tata Motors shares surged 4% today as the company announced a massive expansion of its EV charging network across India. Analysts maintain a "Buy" rating on the stock citing strong margins in the JLR segment and domestic market leadership in electric vehicles. The company aims to have 10 new EV models by 2026.',
    category: 'markets',
    timestamp: '2024-03-24T14:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Nifty 50 Perspective: Why 22,000 is the new normal for Indian indices',
    content: 'The Nifty 50 has shown remarkable resilience in the face of global volatility. With strong corporate earnings and sustained domestic institutional inflows, the index is eyeing the 22,500 mark. Sectors like banking and auto are leading the charge, while IT remains a cautious "wait and watch".',
    category: 'markets',
    timestamp: '2024-03-23T09:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1611974717483-5828ff797ae1?q=80&w=2070&auto=format&fit=crop'
  }
];
