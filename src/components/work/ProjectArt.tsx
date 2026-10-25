import Image from "next/image";
import type { Project } from "@/types/content";
import { BrowserFrame, InsightsMock, PostMock, ProfileMock, ReelPhoneMock } from "@/components/mocks/Mocks";
import { cn } from "@/lib/cn";

/** A project's visual: the real screenshot in a window frame, or an illustration. */
export function ProjectArt({ project, priority = false, className }: { project: Project; priority?: boolean; className?: string }) {
  const media = project.media;

  if (media?.kind === "image") {
    const host = project.links.find((l) => l.label.toLowerCase().includes("live"))?.href;
    return (
      <BrowserFrame url={host ? new URL(host).hostname : project.name.toLowerCase().replace(/\s+/g, "-")} className={className}>
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 90vw"
          className="h-auto w-full"
        />
      </BrowserFrame>
    );
  }

  const tint = project.tint;
  switch (project.art) {
    case "reel":
      return <ReelPhoneMock tint={tint} className={cn("mx-auto w-[46%] max-w-[260px]", className)} />;
    case "post":
      return <PostMock tint={tint} className={className} />;
    case "insights":
      return <InsightsMock tint={tint} className={className} />;
    default:
      return <ProfileMock tint={tint} className={className} />;
  }
}

/** Neutral dotted stage the artwork sits on. */
export function ArtStage({ children, className }: { project: Project; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative grid place-items-center overflow-hidden rounded-[22px] bg-surface-2 p-6 sm:p-8", className)}>
      <span aria-hidden className="absolute inset-0 opacity-60 [background-image:radial-gradient(var(--line)_1.2px,transparent_1.2px)] [background-size:16px_16px]" />
      <div className="relative w-full transition-transform duration-700 ease-[var(--ease-apple)] group-hover:scale-[1.03]">{children}</div>
    </div>
  );
}
