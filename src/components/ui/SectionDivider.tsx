export default function SectionDivider() {
  return (
    <div className="relative h-px w-full">
      <div className="absolute inset-0 bg-mint/8" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[1px] bg-gradient-to-r from-transparent via-mint/30 to-transparent blur-[1px]" />
    </div>
  )
}
