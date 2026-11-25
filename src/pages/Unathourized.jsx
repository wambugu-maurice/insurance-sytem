import { Link } from "lucide-react"

function Unathourized() {
  return (
    <section className="flex justify-center items-center">
      <h2>This page either doesn't exist or you don't have permission to view it</h2>
      <Link to='/login'>Login to view content</Link>
    </section>
  )
}

export default Unathourized