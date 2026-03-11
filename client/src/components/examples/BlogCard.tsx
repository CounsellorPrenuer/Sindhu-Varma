import BlogCard from "../BlogCard";
import blogImage from "@assets/stock_images/mindfulness_meditati_b399ce8c.jpg";

export default function BlogCardExample() {
  return (
    <BlogCard
      image={blogImage}
      title="5 NLP Techniques to Overcome Anxiety"
      excerpt="Discover powerful NLP techniques that can help you manage anxiety and build lasting inner peace."
    />
  );
}
