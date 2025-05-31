import { useEffect, useState } from "react";

export default function MinuteCount({ textString }: { textString: string }) {
  const [wordCount, setWordCount] = useState<number>(0);
  const [estimatedTime, setEstimatedTime] = useState<number>(0); // in minutes

  useEffect(() => {
    const words = textString.trim().split(/\s+/).filter(word => word.length > 0);
    const count = words.length;
    setWordCount(count);

    const time = Math.ceil(count / 200); // average reading speed: 200 wpm
    setEstimatedTime(time);
  }, [textString]);

  return (
    <div style={{ 
      fontSize: "14px",
      display: "inline-block",
      fontFamily: "Armstrong",
      color:"#808186",
      fontWeight: 400
    }}> 
      <div > {estimatedTime} min read</div>
    </div>
  );
}
