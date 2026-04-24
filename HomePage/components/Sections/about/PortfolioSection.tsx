import CardLayout from "@/components/CardLayout";

export default function PortfolioSection({ id }: { id?: string }) {
  return (
    <section
      id={id || "portfolio"}
      className="p-6"
    >
      <h3 className="text-xl font-semibold">PROJECTS UNDERTAKEN</h3>

      <div className="grid grid-cols-1  gap-6 mt-6">
        <CardLayout />
      </div>
    </section>
  );
}
