import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { offerPosts } from '../../content/offersPosts';
import { usePageSeo } from '../../hooks/usePageSeo';
import GetInTouchCtaLink from '../../components/offers/GetInTouchCtaLink';

export default function StoriesAndBanterPage() {
  const post = offerPosts['stories-and-banter'];

  usePageSeo({
    title: post.title,
    description: post.metaDescription,
    canonicalPath: `/offers/${post.slug}`,
    ogType: 'article',
    articleData: {
      headline: post.title,
      description: post.metaDescription,
      author: 'Dave',
    },
  });

  return (
    <div className="min-h-screen relative">
      {/* Background image */}
      <div className="fixed inset-0 z-0">
        <img
          src="/assets/generated/dirty-daves-hero-bg.dim_1920x1080.png"
          alt="Scotland landscape"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with back button */}
        <header className="bg-navy/90 backdrop-blur-sm border-b-4 border-teal shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white hover:text-teal transition-colors font-bold text-lg focus-visible:ring-4 focus-visible:ring-teal focus-visible:outline-none rounded-lg px-3 py-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </header>

        {/* Article content */}
        <article className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12">
            {/* Title */}
            <div className="mb-8 text-center">
              <div className="text-6xl mb-4">{post.emoji}</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy mb-4">
                {post.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">
                {post.shortDescription}
              </p>
            </div>

            {/* Sections */}
            <div className="prose prose-lg max-w-none">
              {post.sections.map((section, index) => (
                <section key={index} className="mb-10">
                  <h2 className="text-3xl font-black text-navy mb-4 border-b-4 border-teal pb-2">
                    {section.heading}
                  </h2>
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-800 leading-relaxed mb-4 text-lg">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 pt-8 border-t-2 border-gray-200 text-center">
              <h3 className="text-2xl font-black text-navy mb-4">
                Ready to Experience This?
              </h3>
              <GetInTouchCtaLink />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
