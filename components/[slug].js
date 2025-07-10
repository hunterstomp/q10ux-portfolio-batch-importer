import CaseStudyDetail from '@/components/CaseStudyDetail';
import { groq } from 'next-sanity';
import { getClient } from '@/lib/sanity.server';

const query = groq\`
  *[_type == "uxCaseStudy" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    client,
    role,
    platform,
    tags,
    personas,
    category,
    problem,
    solution,
    uxWins,
    media[]{
      asset->{url},
      altText
    },
    flows[]->{
      _id,
      title,
      order,
      images[]{
        asset->{url},
        alt
      }
    },
    journalEntry[]{
      date,
      tag,
      note
    }
  }
\`;

export async function getStaticPaths() {
  const client = getClient();
  const slugs = await client.fetch(groq\`*[_type == "uxCaseStudy" && defined(slug.current)][].slug.current\`);
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const client = getClient();
  const caseStudy = await client.fetch(query, { slug: params.slug });
  return {
    props: { caseStudy }
  };
}

export default function CaseStudyPage({ caseStudy }) {
  return <CaseStudyDetail caseStudy={caseStudy} />;
}