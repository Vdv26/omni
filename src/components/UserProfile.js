import React, { useState, useEffect } from 'react';
import RatingCanvas from './RatingCanvas';

// User Profile Component - demonstrates useState, useEffect, and while loop
function UserProfile() {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    memberSince: '2024',
    completedOrders: 15,
    rating: 4.8,
    bio: 'Passionate freelancer with expertise in multiple domains.',
    skills: ['React', 'JavaScript', 'Web Development']
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(userData.bio);

  // Component lifecycle - useEffect
  useEffect(() => {
    // Load user data from localStorage
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  const handleSaveBio = () => {
    const newUserData = { ...userData, bio: editedBio };
    setUserData(newUserData);
    localStorage.setItem('userData', JSON.stringify(newUserData));
    setIsEditing(false);
  };

  // Using while loop to demonstrate traditional JavaScript loop (syllabus requirement)
  const renderStars = (rating) => {
    const stars = [];
    let count = 0;
    while (count < 5) {
      if (count < Math.floor(rating)) {
        stars.push(<span key={count}>⭐</span>);
      } else {
        stars.push(<span key={count} style={{opacity: 0.3}}>⭐</span>);
      }
      count++;
    }
    return stars;
  };

  return (
    <div className="main-container" data-testid="user-profile">
      <div style={{maxWidth: '900px', margin: '0 auto'}}>
        <h2>My Profile</h2>
        
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          marginTop: '30px'
        }}>
          {/* Profile Header */}
          <div style={{display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '40px'}}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              color: 'white',
              fontWeight: 'bold',
              boxShadow: '0 8px 24px rgba(124, 58, 237, 0.3)'
            }}>
              {userData.name.charAt(0)}
            </div>
            
            <div>
              <h3 style={{margin: '0 0 8px 0', fontSize: '28px'}}>{userData.name}</h3>
              <p style={{color: '#64748b', margin: '0 0 8px 0'}}>{userData.email}</p>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                {renderStars(userData.rating)}
                <span style={{marginLeft: '8px', fontWeight: 'bold'}}>{userData.rating}</span>
              </div>
            </div>
          </div>
          
          {/* Statistics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            <div style={{
              padding: '20px',
              background: '#ede9fe',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '32px', fontWeight: 'bold', color: '#7c3aed'}}>
                {userData.completedOrders}
              </div>
              <div style={{color: '#64748b', marginTop: '8px'}}>Completed Orders</div>
            </div>
            
            <div style={{
              padding: '20px',
              background: '#dbeafe',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '32px', fontWeight: 'bold', color: '#3b82f6'}}>
                {userData.memberSince}
              </div>
              <div style={{color: '#64748b', marginTop: '8px'}}>Member Since</div>
            </div>
            
            <div style={{
              padding: '20px',
              background: '#d1fae5',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '32px', fontWeight: 'bold', color: '#10b981'}}>
                {userData.rating}/5
              </div>
              <div style={{color: '#64748b', marginTop: '8px'}}>Average Rating</div>
            </div>
          </div>
          
          {/* Bio Section */}
          <div style={{marginBottom: '30px'}}>
            <h4 style={{marginBottom: '16px'}}>About Me</h4>
            {isEditing ? (
              <div>
                <textarea
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    minHeight: '100px',
                    fontSize: '15px',
                    fontFamily: 'inherit'
                  }}
                  data-testid="bio-textarea"
                />
                <div style={{marginTop: '12px', display: 'flex', gap: '12px'}}>
                  <button
                    onClick={handleSaveBio}
                    style={{
                      padding: '10px 24px',
                      background: '#7c3aed',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                    data-testid="save-bio-button"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditedBio(userData.bio);
                    }}
                    style={{
                      padding: '10px 24px',
                      background: 'white',
                      color: '#64748b',
                      border: '2px solid #e2e8f0',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                    data-testid="cancel-bio-button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p style={{color: '#475569', lineHeight: '1.8'}}>{userData.bio}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    marginTop: '12px',
                    padding: '10px 24px',
                    background: 'white',
                    color: '#7c3aed',
                    border: '2px solid #7c3aed',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                  data-testid="edit-bio-button"
                >
                  Edit Bio
                </button>
              </div>
            )}
          </div>
          
          {/* Skills */}
          <div>
            <h4 style={{marginBottom: '16px'}}>Skills</h4>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px'}}>
              {userData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '8px 16px',
                    background: '#ede9fe',
                    color: '#7c3aed',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Rating Visualization using Canvas */}
          <div style={{marginTop: '40px'}}>
            <h4 style={{marginBottom: '16px'}}>Rating Breakdown</h4>
            <RatingCanvas rating={userData.rating} showDetails />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;