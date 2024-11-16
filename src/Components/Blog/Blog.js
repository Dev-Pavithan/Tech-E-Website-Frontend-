import React from 'react';
import LikeButton from './Button/button.js';
import './Blog.css';
import Explore from './assets/Explore.png';
import Experience from './assets/Experience.png';
import Model from './assets/3D.png';
import General from './assets/General.png';

function Blog() {
  const blogPosts = [
    {
      image: Explore,
      title: "Tech-E: The Next Level of Virtual Connection",
      date: "November 1, 2024",
      content: "Unlock a whole new experience with Tech-E. Engage with a virtual companion that listens, understands, and connects through interactive text, voice, and 3D features.",
    },
    {
      image: Experience,
      title: "Safe and Supportive Tech-E Experience",
      date: "October 25, 2024",
      content: "Learn more about our commitment to creating an emotionally intelligent AI that’s sensitive and user-friendly. We prioritize safety and ethical practices in every interaction.",
    },
    {
      image: Model,
      title: "Explore the 3D Model Interaction",
      date: "October 20, 2024",
      content: "Discover Tech-E’s 3D model feature. Simply type “PROPT” to bring up a responsive 3D avatar that adds a new level of engagement, making each conversation feel real and engaging.",
    },
    {
      image: General,
      title: "Voice Chat: A Natural Way to Connect",
      date: "October 10, 2024",
      content: "With the Voice Chat package, talk to Tech-E naturally. This voice-enabled experience makes every interaction easy and enjoyable, enhancing the connection you feel.",
    },
    {
      image: General,
      title: "Getting Started with Tech-E’s General Chat Package",
      date: "October 1, 2024",
      content: "Jump into the world of AI companionship with the General Chat package. Start engaging with Tech-E through text-based conversations that are smart, insightful, and fun.",
    },
  ];

  return (
    <div className="body">
      <div className="Blog container text-center">
        <h1 className="blog-header">Discover the Future of Interaction with Tech-E</h1>
        <p className="blog-description mx-auto">
          Tech-E is here to redefine your experience with AI by blending intelligent conversation with emotional awareness and an interactive 3D interface. As a user-friendly virtual companion, Tech-E is equipped to engage with you on a deeply personal level, offering an experience that’s not just smart but truly supportive. Explore the three unique packages designed to enhance your journey with Tech-E!
        </p>

        {/* Row for first 3 blog containers */}
        <div className="blog-row row justify-content-center">
          {blogPosts.slice(0, 3).map((post, index) => (
            <div className="col-md-4 col-lg-3 d-flex align-items-stretch" key={index}>
              <div className="blog-container">
                <h3 className="blog-post-title">{post.title}</h3>
                <img src={post.image} alt="cover" className="blog-image" />
                <p className="blog-date">{post.date}</p>
                <p className="blog-content">{post.content}</p>
                <div className="blog-footer d-flex justify-content-between align-items-center mt-auto">
                  <button className="btn-primary-ReadMore">Read More</button>
                  <div className="like-button-container">
                    <LikeButton />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row for remaining blog containers */}
        <div className="blog-row row justify-content-center">
          {blogPosts.slice(3).map((post, index) => (
            <div className="col-md-4 col-lg-3 d-flex align-items-stretch" key={index + 3}>
              <div className="blog-container">
                <h3 className="blog-post-title">{post.title}</h3>
                <img src={post.image} alt="cover" className="blog-image" />
                <p className="blog-date">{post.date}</p>
                <p className="blog-content">{post.content}</p>
                <div className="blog-footer d-flex justify-content-between align-items-center mt-auto">
                  <button className="btn-primary-ReadMore">Read More</button>
                  <div className="like-button-container">
                    <LikeButton />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
