import { BlogEditor } from "../_components/BlogEditor";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="font-display text-4xl text-vdb-wine-deep">New post</h1>
      <p className="mt-2 text-sm text-vdb-muted">Draft a journal entry. Auto-saved on publish.</p>
      <div className="mt-8">
        <BlogEditor />
      </div>
    </div>
  );
}
