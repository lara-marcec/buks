import { useRef, useEffect } from 'react';

import SegmentHeader from "../assets/title_header.svg?react";

export default function DynamicHeader({ title }: { title: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const textEl = svgRef.current.getElementById('page-title');
      if (textEl) textEl.textContent = title;
    }
  }, [title]);

  return <SegmentHeader ref={svgRef} className="segment-header" />;
}
