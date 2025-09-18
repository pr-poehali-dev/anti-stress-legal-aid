import { useState } from 'react';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import BlogPost from '@/components/blog/BlogPost';
import BlogPostList from '@/components/blog/BlogPostList';
import BlogCTA from '@/components/blog/BlogCTA';
import { blogPosts, BlogPost as BlogPostType } from '@/data/blogData';

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  const handleContactClick = () => {
    window.open('https://t.me/your_telegram', '_blank');
  };

  const categories = ['Все', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  if (selectedPost) {
    return (
      <BlogPost 
        post={selectedPost}
        onBack={() => setSelectedPost(null)}
        onContactClick={handleContactClick}
      />
    );
  }

  return (
    <>
      <Header onContactClick={handleContactClick} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-professional-50/30">
        <BlogPostList 
          posts={blogPosts}
          selectedCategory={selectedCategory}
          categories={categories}
          onCategoryChange={setSelectedCategory}
          onPostSelect={setSelectedPost}
        />
        <BlogCTA onContactClick={handleContactClick} />
      </div>
      <Footer onContactClick={handleContactClick} />
    </>
  );
}