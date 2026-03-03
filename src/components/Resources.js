import React from 'react';

function Resources() {
  const jobCategories = [
    {
      category: 'Programming & Tech',
      jobs: [
        'Website Development',
        'Mobile App Development',
        'WordPress Development',
        'E-commerce Development',
        'API Development',
        'Bug Fixing',
        'Database Design',
        'Chrome Extension Development'
      ]
    },
    {
      category: 'Digital Marketing',
      jobs: [
        'SEO Services',
        'Social Media Marketing',
        'Content Marketing',
        'Email Marketing',
        'Google Ads Management',
        'Facebook Ads',
        'Instagram Marketing',
        'Brand Strategy'
      ]
    },
    {
      category: 'Graphic Design',
      jobs: [
        'Logo Design',
        'Brand Identity',
        'Business Card Design',
        'Poster Design',
        'Flyer Design',
        'Social Media Graphics',
        'Packaging Design',
        'Illustration'
      ]
    },
    {
      category: 'Writing & Translation',
      jobs: [
        'Content Writing',
        'Copywriting',
        'Technical Writing',
        'Blog Writing',
        'Translation Services',
        'Proofreading',
        'Resume Writing',
        'Creative Writing'
      ]
    },
    {
      category: 'Video & Animation',
      jobs: [
        'Video Editing',
        'Explainer Videos',
        'Animation',
        '3D Modeling',
        'Motion Graphics',
        'Whiteboard Animation',
        'Video Production',
        'Intro & Outro Videos'
      ]
    },
    {
      category: 'Music & Audio',
      jobs: [
        'Voice Over',
        'Audio Editing',
        'Music Production',
        'Podcast Editing',
        'Sound Design',
        'Mixing & Mastering',
        'Jingles & Intros',
        'Audio Ads'
      ]
    },
    {
      category: 'Home Services',
      jobs: [
        'Plumbing',
        'Electrical Work',
        'Carpentry',
        'Painting',
        'AC Repair',
        'Appliance Repair',
        'Home Cleaning',
        'Gardening & Landscaping'
      ]
    },
    {
      category: 'Business Services',
      jobs: [
        'Virtual Assistant',
        'Data Entry',
        'Market Research',
        'Business Plans',
        'Financial Planning',
        'Legal Consulting',
        'HR Consulting',
        'Project Management'
      ]
    }
  ];

  return (
    <div className="main-container" data-testid="resources-page">
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <h1 style={{fontSize: '36px', marginBottom: '20px'}}>Service Categories</h1>
        <p style={{color: '#64748b', fontSize: '18px', marginBottom: '40px'}}>
          Explore the wide variety of jobs and services available on OmniGigs. Whether you're looking to hire or offer your skills, we've got you covered!
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {jobCategories.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'white',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <h3 style={{
                marginBottom: '20px',
                color: '#7c3aed',
                fontSize: '20px',
                borderBottom: '2px solid #ede9fe',
                paddingBottom: '10px'
              }}>
                {item.category}
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {item.jobs.map((job, jobIdx) => (
                  <li
                    key={jobIdx}
                    style={{
                      padding: '8px 0',
                      color: '#64748b',
                      borderBottom: jobIdx < item.jobs.length - 1 ? '1px solid #f1f5f9' : 'none',
                      fontSize: '15px'
                    }}
                  >
                    ✓ {job}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '40px',
          borderRadius: '12px',
          textAlign: 'center',
          marginTop: '60px',
          color: 'white'
        }}>
          <h2 style={{marginBottom: '12px'}}>Don't See Your Service?</h2>
          <p style={{marginBottom: '20px', opacity: 0.9}}>
            OmniGigs supports a wide range of services. If you don't see what you're looking for, you can still post your requirement!
          </p>
          <button
            onClick={() => window.location.href = '/post-gig'}
            style={{
              padding: '14px 32px',
              background: 'white',
              color: '#7c3aed',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'transform 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)' }
          >
            Post Your Service
          </button>
        </div>
      </div>
    </div>
  );
}

export default Resources;