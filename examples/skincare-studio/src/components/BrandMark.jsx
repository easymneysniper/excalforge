export default function BrandMark({ compact = false, inverse = false }) {
  return (
    <div className={`brand-mark${compact ? ' brand-mark--compact' : ''}${inverse ? ' brand-mark--inverse' : ''}`} aria-label="SKINCARE STUDIO">
      <span className="brand-mark__monogram" aria-hidden="true">
        <span>S</span><i /><span>S</span>
      </span>
      <span className="brand-mark__name">SKINCARE STUDIO</span>
    </div>
  )
}
