import Image from "next/image";
import type { TeamMember } from "@/lib/content";
import { initials } from "@/lib/initials";
import { cn } from "@/lib/utils";

/** Headshot, or the person's initials until the headshot exists. Fills its (sized) parent. */
export function TutorAvatar({
  member,
  sizes,
  className,
  textClassName = "text-2xl",
}: {
  member: TeamMember;
  sizes: string;
  className?: string;
  textClassName?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-forest-50", className)}>
      {member.image ? (
        <Image src={member.image} alt={member.name} fill sizes={sizes} className="object-cover" />
      ) : (
        <span
          aria-hidden
          className={cn(
            "flex h-full w-full items-center justify-center font-display font-semibold text-forest-700",
            textClassName
          )}
        >
          {initials(member.name)}
        </span>
      )}
    </div>
  );
}

/**
 * A tutor: headshot (when we have one), name, role and bio.
 * Without a headshot it's a plain text card rather than a placeholder graphic.
 */
export function TutorCard({
  member,
  fullBio = false,
  className,
}: {
  member: TeamMember;
  /** Show the whole bio instead of clamping it (used on /about). */
  fullBio?: boolean;
  className?: string;
}) {
  return (
    <article className={cn("flex h-full flex-col rounded-lg border border-forest-100 bg-white", className)}>
      {member.image && (
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-lg">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 70vw, 280px"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold">{member.name}</h3>
        <p className="text-sm text-forest-700">{member.role}</p>
        {member.bio && (
          <p className={cn("mt-3 text-sm leading-relaxed text-ink/75", !fullBio && "line-clamp-5")}>
            {member.bio}
          </p>
        )}
      </div>
    </article>
  );
}

/** A swipeable row of tutor cards on phones that becomes a 4-up grid on desktop. */
export function TutorRow({ members }: { members: TeamMember[] }) {
  return (
    <div className="-mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:scroll-pl-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
      {members.map((member) => (
        <div key={member.name} className="w-[72%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
          <TutorCard member={member} />
        </div>
      ))}
    </div>
  );
}
