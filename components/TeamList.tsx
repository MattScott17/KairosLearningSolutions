import Image from "next/image";
import type { TeamMember } from "@/lib/content";

/** One plain sentence per person: the first sentence of the bio, never cut off mid-line. */
const firstSentence = (text: string) => text.split(/(?<=[a-z]{3}\.)\s+/)[0];

/** A short, scannable team list. A headshot shows only where we have one. */
export function TeamList({ members, columns = 2 }: { members: TeamMember[]; columns?: 2 | 4 }) {
  return (
    <ul className={`grid gap-x-10 gap-y-6 sm:grid-cols-2 ${columns === 4 ? "lg:grid-cols-4" : ""}`}>
      {members.map((member) => (
        <li key={member.name} className="flex gap-4 border-t border-forest-200 pt-4">
          {member.image && (
            <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
              <Image src={member.image} alt={member.name} fill sizes="64px" className="object-cover" />
            </span>
          )}
          <div>
            <h3 className="text-lg font-semibold leading-snug">{member.name}</h3>
            <p className="text-sm text-forest-700">{member.role}</p>
            {member.bio && <p className="mt-1 text-base text-ink/85">{firstSentence(member.bio)}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
