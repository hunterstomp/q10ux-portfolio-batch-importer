// pages/case-studies/index.js
import Link from 'next/link'
import { useState } from 'react'
import Head from 'next/head'
import sanityClient from '../../lib/sanity';
// import Navigation from '../../components/Navigation' // TODO: Restore when component is available

const PROJECT_LIST_QUERY = `
*[_type == "project" && (!defined(nda) || nda != true)]{
  _id,
  title,
  slug,
  description,
  tags,
  coverImage
}
`;

export async function getServerSideProps() {
  const projects = await sanityClient.fetch(PROJECT_LIST_QUERY);
  const allTags = Array.from(new Set(projects.flatMap(p => p.tags ?? [])));
  return { props: { projects, allTags } };
}

export default function CaseStudiesIndex({ projects, allTags }) {
  const [selectedTag, setSelectedTag] = useState(null)
  const filtered = selectedTag
    ? projects.filter(p => p.tags && p.tags.includes(selectedTag) && p.slug?.current)
    : projects.filter(p => p.slug?.current)

  return (
    <>
      <Head>
        <title>UX Case Studies - Hunter Stomp</title>
        <meta name="description" content="Explore my UX case studies showcasing user experience design projects, research, and design solutions." />
        <meta property="og:title" content="UX Case Studies - Hunter Stomp" />
        <meta property="og:description" content="Explore my UX case studies showcasing user experience design projects, research, and design solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://portfolio.q10ux.com/case-studies/" />
      </Head>
      {/* <Navigation /> // TODO: Restore when component is available */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero" style={{ minHeight: '60vh' }}>
          <div className="hero-content">
            <h1>UX Case Studies</h1>
            <p>Explore my design process, research insights, and creative solutions</p>
          </div>
        </section>
        {/* Case Studies Section */}
        <section className="section">
          <div className="container">
            {/* Filter Tags */}
            <div className="text-center mb-4">
              <h3>Filter by Category</h3>
              <div style={{ marginTop: 'var(--spacing-lg)' }}>
                <button
                  className={`btn ${!selectedTag ? '' : 'btn-secondary'}`}
                  style={{ margin: '0 var(--spacing-sm)' }}
                  onClick={() => setSelectedTag(null)}
                >
                  All
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    className={`btn ${selectedTag === tag ? '' : 'btn-secondary'}`}
                    style={{ margin: '0 var(--spacing-sm)' }}
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            {/* Case Studies Grid */}
            <div className="case-studies-grid">
              {filtered.map(project => (
                <div key={project._id} className="case-study-card">
                  <div 
                    className="case-study-image"
                    style={{
                      backgroundImage: project.coverImage?.asset?.url 
                        ? `url(${project.coverImage.asset.url})`
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                  >
                    <div className="case-study-overlay">
                      <Link href={`/case-studies/${project.slug.current}`} className="btn">View Case Study</Link>
                    </div>
                  </div>
                  <div className="case-study-content">
                    <h3 className="case-study-title">{project.title}</h3>
                    <p className="case-study-summary">{project.description}</p>
                    <div className="case-study-tags">
                      {project.tags?.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center">
                <p>No case studies found for the selected category.</p>
                <Link href="/case-studies" className="btn btn-secondary">View All Case Studies</Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}