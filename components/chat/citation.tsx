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

  const hasSourceUrl = isValidUrl(citation.source_url);
  const hasSourceDescription = citation.source_description.trim() !== "";

  // Format image name: lowercase + no spaces
  const imageName = citation.source_description.toLowerCase().replace(/\s+/g, "");  
  const imagePath = `/${imageName}.png`; // Correct path for public folder images

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
              overflow: "visible", // Prevents clipping
              zIndex: 50, // Ensures it appears above other elements
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
                  setOpen(false);
                }}
              >
                <Image
                  src={imagePath}
                  alt={citation.source_description}
                  width={200}
                  height={150}
                  className="rounded-md shadow-sm"
                />
              </a>
            )}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
