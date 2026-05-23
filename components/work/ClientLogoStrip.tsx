import LogoImg from "@/components/work/LogoImg";
import type { Client } from "@/content/stack";

export default function ClientLogoStrip({ clients }: { clients: Client[] }) {
  return (
    <div className="mt-2">
      <p className="font-mono text-xs uppercase tracking-widest text-stone">
        Accounts I worked with
      </p>
      <div className="mt-5 flex flex-nowrap items-center gap-x-6">
        {clients.map((c) => (
          // Equal flex slot per logo → all on one line, same footprint
          <div key={c.name} className="flex h-12 min-w-0 flex-1 items-center justify-center">
            <LogoImg
              name={c.name}
              src={c.logo}
              imgClassName={`max-h-full max-w-full object-contain opacity-80 mix-blend-multiply grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 ${c.className ?? ""}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
