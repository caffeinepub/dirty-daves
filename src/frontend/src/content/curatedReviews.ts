export interface CuratedReview {
  id: string;
  reviewer: string;
  rating: number;
  excerpt: string;
}

export const curatedReviews: CuratedReview[] = [
  {
    id: '1',
    reviewer: 'Sarah M.',
    rating: 5,
    excerpt: 'Dave is an absolute LEGEND! Best tour guide in Scotland, hands down. He took us to places we never would have found on our own and kept us laughing the entire time. Pure magic!',
  },
  {
    id: '2',
    reviewer: 'James T.',
    rating: 5,
    excerpt: 'Forget the big tour buses — THIS is how you see Scotland! Dave knows every hidden gem and has a story for everything. Worth every penny and then some. Absolutely brilliant!',
  },
  {
    id: '3',
    reviewer: 'Emily R.',
    rating: 5,
    excerpt: 'We had the most INCREDIBLE day with Dave! He tailored everything to what we wanted to see and made us feel like we were touring with an old friend. Can\'t recommend highly enough!',
  },
  {
    id: '4',
    reviewer: 'Michael K.',
    rating: 5,
    excerpt: 'Dave is hilarious, knowledgeable, and made our Scotland trip unforgettable! If you want the real deal and not some boring tourist trap nonsense, book with Dirty Daves. You won\'t regret it!',
  },
  {
    id: '5',
    reviewer: 'Lisa P.',
    rating: 5,
    excerpt: 'Best. Tour. Ever! Dave showed us Scotland like a local, not a tourist. The stories, the laughs, the hidden spots — everything was PERFECT. This is what travel should be!',
  },
  {
    id: '6',
    reviewer: 'Tom W.',
    rating: 5,
    excerpt: 'If you\'re looking for a cookie-cutter tour, look elsewhere. But if you want an authentic, hilarious, and genuinely amazing Scottish adventure, Dave is your man. Absolutely top-notch!',
  },
];
