"use client";

import { useState } from "react";
import { Citation } from "@/types";
import * as Tooltip from "@radix-ui/react-tooltip";
import Image from "next/image";
import { EMPTY_CITATION_MESSAGE } from "@/configuration/ui";

export function CitationCircle({
  number,
  citation
}: {
  number: number;
  citation: Citation;
}) {
  const [open, setOpen] = useState(false);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const hasSourceUrl = citation.source_url && isValidUrl(citation.source_url);
  const hasSourceDescription = citation.source_description?.trim() !== "";

  // Sanitize image name: lowercase + no spaces + remove special characters
  const safeImageName = citation.source_description
    ? citation.source_description.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "")
    : "default";
  const imagePath = `/${safeImageName}.png`;

  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <button className="bg-gray-50 rounded-full px-2 py-0.5 hover:cursor-pointer hover:scale-105 transition-all">
            {number}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            align="center"
            className="bg-white p-3 rounded-md shadow-lg border border-gray-300 max-w-xs"
            style={{
              pointerEvents: "auto",
              overflow: "visible",
              zIndex: 50,
            }}
          >
            <div className="text-sm text-gray-800 text-center font-semibold mb-2">
              {hasSourceDescription ? citation.source_description : EMPTY_CITATION_MESSAGE}
            </div>
            {hasSourceUrl && (
              <a
                href={citation.source_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  setTimeout(() => setOpen(false), 100); // Prevent state issues
                }}
              >
                {safeImageName && (
                  <Image
                    src={imagePath}
                    alt={citation.source_description || "Source"}
                    width={200}
                    height={150}
                    className="rounded-md shadow-sm"
                    onError={(e) => (e.currentTarget.src = "/fallback.png")} // Handle missing images
                  />
                )}
              </a>
            )}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
