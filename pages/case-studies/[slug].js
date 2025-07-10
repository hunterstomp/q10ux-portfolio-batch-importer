// pages/case-studies/[slug].js
import React from 'react';
import sanityClient from '../../lib/sanity';
import CaseStudyDetail from '../../components/CaseStudyDetail';
import CaseStudyOverview from '../../components/CaseStudyOverview';
import CaseStudyGallery from '../../components/CaseStudyGallery';
import CaseStudyNav from '../../components/CaseStudyNav';

const caseStudyQuery = `*[_type == "project" && slug.current == $slug && (!defined(nda) || nda != true)][0]{
  _id,
  title,
  slug,
  description,
  coverImage{
    asset->{url, originalFilename, metadata}
  },
  password,
  images[]->{_id, title, thumbnail, project->{title, slug}},
}`;

const CaseStudyPage = ({ caseStudy }) => {
  if (!caseStudy) return <div>Case study not found.</div>;
  return (
    <CaseStudyDetail caseStudy={caseStudy}>
      <h1>{caseStudy.title}</h1>
      <CaseStudyOverview overview={caseStudy.description} />
      <CaseStudyGallery images={caseStudy.images || []} />
      <CaseStudyNav />
    </CaseStudyDetail>
  );
};

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const caseStudy = await sanityClient.fetch(caseStudyQuery, { slug });
  return {
    props: {
      caseStudy: caseStudy || null,
    },
  };
}

export default CaseStudyPage;