export default function Stats({ image }) {
  return (
    <div className="stats grid gap-5 text-sm">
      <div className="views">
        <h3 className="text-gray">Views</h3>
        <span>{image.views.toLocaleString("en-US")}</span>
      </div>
      <div className="downloads">
        <h3 className="text-gray">Downloads</h3>
        <span>{image.downloads.toLocaleString("en-US")}</span>
      </div>
    </div>
  );
}
