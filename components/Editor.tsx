import "@/styles/Blog.css"

export default function Editor({ quillRef }: { quillRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div>
          <div ref={quillRef} />
    </div>
  )
}
