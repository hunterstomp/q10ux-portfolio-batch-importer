import React from 'react';
import styles from '../styles/Blog.module.css';

// Dummy blog posts data
const posts = [
  {
    id: 1,
    title: 'The Art of User-Centric Design',
    date: 'October 26, 2023',
    excerpt: "A deep dive into why empathy is the most crucial tool in a UX designer's toolkit...",
  },
  {
    id: 2,
    title: '5 Common Accessibility Myths, Debunked',
    date: 'October 15, 2023',
    excerpt: "Let's clear up some common misconceptions about web accessibility and why it matters...",
  },
  {
    id: 3,
    title: 'From Wireframe to Wow: A Guide to Prototyping',
    date: 'October 2, 2023',
    excerpt: "Prototyping is more than just a step in the process; it's a conversation with your users...",
  },
];

export default function Blog() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>The Blog</h1>
      <p className={styles.subtitle}>Thoughts, stories, and ideas on design, technology, and everything in between.</p>
      <div className={styles.postList}>
        {posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postDate}>{post.date}</p>
            <p className={styles.postExcerpt}>{post.excerpt}</p>
            <a href="#" className={styles.readMore}>Read More &rarr;</a>
          </div>
        ))}
      </div>
    </main>
  );
} 