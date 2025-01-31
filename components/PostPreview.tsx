import "@/styles/Blog.css"

export default function PostPreview({ html, previewRef }: { html: string, previewRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
          ref={previewRef}
          dangerouslySetInnerHTML={{ __html: html }}
          className="border border-gray-300 p-4 mb-4 flex flex-col gap-2 pt-2"
    />
  )
}
