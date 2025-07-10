import React from 'react';
import styles from './CaseStudyDetail.module.css';
import { PortableText } from '@portabletext/react';

// Helper for section rendering
const Section = ({ icon, title, children }) => (
  <section className={styles.section}>
    <h2 className={styles.sectionTitle}>{icon} {title}</h2>
    <div>{children}</div>
    <div className={styles.divider}></div>
  </section>
);

const OutcomesTable = ({ outcomes }) => (
  <table className={styles.outcomesTable}>
    <thead>
      <tr>
        <th>KPI</th>
        <th>Before</th>
        <th>After</th>
        <th>Change</th>
      </tr>
    </thead>
    <tbody>
      {outcomes.map((row, i) => (
        <tr key={i}>
          <td>{row.kpi}</td>
          <td>{row.before}</td>
          <td>{row.after}</td>
          <td>{row.change}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const formatFileSize = (bytes) => {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return mb.toFixed(2) + ' MB';
  const kb = bytes / 1024;
  if (kb >= 1) return kb.toFixed(1) + ' KB';
  return bytes + ' B';
};

const getFileIcon = (filename = '') => {
  const ext = filename.split('.').pop().toLowerCase();
  switch (ext) {
    case 'pdf': return { icon: '📄', label: 'PDF file' };
    case 'doc':
    case 'docx': return { icon: '📝', label: 'Word document' };
    case 'ppt':
    case 'pptx': return { icon: '📊', label: 'PowerPoint presentation' };
    case 'xls':
    case 'xlsx': return { icon: '📈', label: 'Excel spreadsheet' };
    case 'zip': return { icon: '🗜️', label: 'ZIP archive' };
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif': return { icon: '🖼️', label: 'Image file' };
    default: return { icon: '📎', label: 'File' };
  }
};

const Downloadables = ({ items }) => {
  console.log('Downloadables items:', items);
  const validItems = (items || []).filter(item => item.file?.asset?.url || item.url);
  if (!validItems.length) {
    return <div className={styles.downloadables}><em>No downloadables available.</em></div>;
  }
  return (
    <div className={styles.downloadables}>
      {validItems.map((item, i) => {
        const asset = item.file?.asset;
        const fileUrl = asset?.url || item.url;
        const filename = asset?.originalFilename || fileUrl?.split('/').pop() || 'Download';
        const size = asset?.size ? `(${formatFileSize(asset.size)})` : '';
        const label = item.label || filename;
        const { icon, label: iconLabel } = getFileIcon(filename);
        return (
          <div key={i} className={styles.downloadItem} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a
              href={fileUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#2563eb', fontWeight: 500 }}
              aria-label={`Download ${iconLabel}: ${filename} ${size}`}
              title={`Download ${iconLabel}: ${filename} ${size}`}
            >
              <span style={{ fontSize: '1.5em' }} aria-label={iconLabel}>{icon}</span>
              <span>{label}</span>
            </a>
            {size && <span style={{ color: '#888', fontSize: '0.98em', marginLeft: 4 }}>{size}</span>}
          </div>
        );
      })}
    </div>
  );
};

export default function CaseStudyDetail({ caseStudy, prevProject, nextProject, onImageClick }) {
  if (!caseStudy) return <div>Not found</div>;
  // DEBUG: Output the caseStudy object for troubleshooting
  console.log('CaseStudyDetail received:', caseStudy);
  const {
    title, summary, client, role, team, duration, platform,
    problem, goal, research, journeyMapping, uxApproach, tools,
    outcomes, keyWins, testimonials, lessonsLearned, whatIdImprove, downloadables, flows
  } = caseStudy;

  return (
    <article className={styles.container}>
      <div className="case-study-hero" style={{ marginBottom: '2rem' }}>
        <h1 className={styles.heroTitle}>{title}</h1>
        <div>
          {caseStudy.tags && caseStudy.tags.map((tag, i) => (
            <span key={i} className={styles.badge}>{tag}</span>
          ))}
          {caseStudy.company && <span className={styles.badge}>{caseStudy.company}</span>}
          {caseStudy.personaAccess && <span className={styles.badge}>{caseStudy.personaAccess}</span>}
        </div>
      </div>
      <div className={styles.metaGrid}>
        {summary && <div><span className={styles.metaLabel}>Summary:</span> <span className={styles.metaValue}>{summary}</span></div>}
        {client && <div><span className={styles.metaLabel}>Client:</span> <span className={styles.metaValue}>{client}</span></div>}
        {role && <div><span className={styles.metaLabel}>Role:</span> <span className={styles.metaValue}>{role}</span></div>}
        {team && <div><span className={styles.metaLabel}>Team:</span> <span className={styles.metaValue}>{team}</span></div>}
        {duration && <div><span className={styles.metaLabel}>Duration:</span> <span className={styles.metaValue}>{duration}</span></div>}
        {platform && <div><span className={styles.metaLabel}>Platform:</span> <span className={styles.metaValue}>{platform}</span></div>}
      </div>
      <div className={styles.divider}></div>
      {/* Flows Section */}
      {flows && flows.length > 0 && (
        <Section icon="🖼️" title={<span className={styles.sectionTitle}>Flows</span>}>
          {flows.map((flow, idx) => (
            <div key={flow.flowName || idx} className={styles.flowSection}>
              <h3 className={styles.flowTitle}>{flow.flowName}</h3>
              {flow.flowDescription && <div className={styles.flowDescription}><PortableText value={flow.flowDescription} /></div>}
              {flow.images && flow.images.length > 0 && (
                <div className={styles.flowGallery}>
                  {flow.images.map((img, i) => (
                    <div key={i} className={styles.flowImageWrapper}>
                      <img
                        src={img.asset?.url}
                        alt={img.caption || `Flow image ${i+1}`}
                        className={styles.flowImage}
                        onClick={() => onImageClick && onImageClick(img, flow.flowName, i)}
                        style={{ cursor: onImageClick ? 'pointer' : 'default' }}
                      />
                      {img.caption && <div className={styles.flowCaptionOverlay}>{img.caption}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Section>
      )}
      {problem && problem.length > 0 && (
        <Section icon="📍" title={<span className={styles.sectionTitle}>Problem</span>}>
          <PortableText value={problem} />
        </Section>
      )}
      {goal && goal.length > 0 && (
        <Section icon="🎯" title={<span className={styles.sectionTitle}>Goal</span>}>
          <PortableText value={goal} />
        </Section>
      )}
      {research && research.length > 0 && (
        <Section icon="🔍" title={<span className={styles.sectionTitle}>Research & Discovery</span>}>
          <PortableText value={research} />
        </Section>
      )}
      {journeyMapping && journeyMapping.length > 0 && (
        <Section icon="🗺️" title={<span className={styles.sectionTitle}>Journey Mapping Highlights</span>}>
          <PortableText value={journeyMapping} />
        </Section>
      )}
      {uxApproach && uxApproach.length > 0 && (
        <Section icon="🔨" title={<span className={styles.sectionTitle}>UX Approach</span>}>
          <PortableText value={uxApproach} />
        </Section>
      )}
      {tools && (
        <Section icon="🛠️" title={<span className={styles.sectionTitle}>Tools Used</span>}>
          <div>{tools}</div>
        </Section>
      )}
      {outcomes && outcomes.length > 0 && (
        <Section icon="📊" title={<span className={styles.sectionTitle}>Outcomes</span>}>
          <OutcomesTable outcomes={outcomes} />
        </Section>
      )}
      {keyWins && keyWins.length > 0 && (
        <Section icon="✨" title={<span className={styles.sectionTitle}>Key UX Wins</span>}>
          <PortableText value={keyWins} />
        </Section>
      )}
      {testimonials && testimonials.length > 0 && (
        <Section icon="💬" title={<span className={styles.sectionTitle}>Testimonials</span>}>
          <PortableText value={testimonials} />
        </Section>
      )}
      {lessonsLearned && lessonsLearned.length > 0 && (
        <Section icon="🧠" title={<span className={styles.sectionTitle}>Lessons Learned</span>}>
          <PortableText value={lessonsLearned} />
        </Section>
      )}
      {whatIdImprove && whatIdImprove.length > 0 && (
        <Section icon="🛠️" title={<span className={styles.sectionTitle}>What I'd Improve</span>}>
          <PortableText value={whatIdImprove} />
        </Section>
      )}
      {downloadables && downloadables.length > 0 && (
        <Section icon="" title={<span className={styles.sectionTitle}>Downloadables</span>}>
          <Downloadables items={downloadables} />
        </Section>
      )}
      <div className={styles.projectNav}>
        <a href="#" className={styles.navBtn}>← Previous</a>
        <a href="#" className={styles.navBtn}>Next →</a>
      </div>
    </article>
  );
}

// --- Modern CSS module scaffold (CaseStudyDetail.module.css) ---
/*
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
}
.title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.meta {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 1.5rem;
}
.section {
  margin-bottom: 2.5rem;
}
.sectionTitle {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5em;
}
.divider {
  border-bottom: 1.5px solid #eee;
  margin: 2rem 0 1.5rem 0;
}
.outcomesTable {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: #fafbfc;
  border-radius: 8px;
  overflow: hidden;
}
.outcomesTable th, .outcomesTable td {
  padding: 0.7em 1em;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}
.outcomesTable th {
  background: #f3f4f6;
  font-weight: 600;
}
.downloadables {
  display: flex;
  flex-direction: column;
  gap: 0.7em;
}
.downloadItem {
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-size: 1.1em;
}
.projectNav {
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem;
}
.navBtn {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.navBtn:hover {
  color: #1e40af;
}
*/ 