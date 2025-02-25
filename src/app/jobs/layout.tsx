export default function JobsLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="jobs-layout">
        {children}
      </div>
    );
  }