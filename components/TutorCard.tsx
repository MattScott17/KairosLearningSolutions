import Image from "next/image";
import type { TeamMember } from "@/lib/content";
import { initials } from "@/lib/initials";
import { cn } from "@/lib/utils";

/** Headshot, or a brand monogram until the headshot exists. Fills its (sized) parent. */
export function TutorAvatar({
  member,
  sizes,
  className,
  textClassName = "text-4xl",
}: {
  member: TeamMember;
  sizes: string;
  className?: string;
  textClassName?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {member.image ? (
        <Image src={member.image} alt={member.name} fill sizes={sizes} className="object-cover" />
      ) : (
        <div
          aria-hidden
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-forest-200/70 via-sand to-forest-100"
        >
          <span className={cn("font-display font-semibold text-forest-700", textClassName)}>
            {initials(member.name)}
          </span>
          <span className="absolute -bottom-6 -right-4 h-20 w-14 rounded-t-full bg-gold-500/30" />
        </div>
      )}
    </div>
  );
}

/** Wyzant-style tutor card: arch-topped portrait, name, role tag and a short bio. */
export function TutorCard({
  member,
  fullBio = false,
  className,
  avatarClassName = "aspect-[4/5]",
}: {
  member: TeamMember;
  /** Show the whole bio instead of clamping it (used on /about). */
  fullBio?: boolean;
  className?: string;
  avatarClassName?: string;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-3xl border border-forest-100 bg-cream p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft",
        className
      )}
    >
      <TutorAvatar
        member={member}
        sizes="(max-width: 640px) 70vw, 280px"
        className={cn("arch w-full", avatarClassName)}
      />
      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <span className="self-start rounded-full bg-forest-50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-forest-700">
          {member.role}
        </span>
        <h3 className="mt-3 text-lg font-semibold">{member.name}</h3>
        {/* Clamped so cards stay even; the full bio lives on /about. */}
        {member.bio && (
          <p className={cn("mt-2 text-sm leading-relaxed text-ink/70", !fullBio && "line-clamp-4")}>
            {member.bio}
          </p>
        )}
      </div>
    </article>
  );
}
