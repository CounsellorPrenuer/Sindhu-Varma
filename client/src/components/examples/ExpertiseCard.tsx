import ExpertiseCard from "../ExpertiseCard";
import { Heart } from "lucide-react";

export default function ExpertiseCardExample() {
  return (
    <ExpertiseCard
      icon={Heart}
      title="Anxiety and Depression"
      description="Professional support to help you overcome anxiety and depression, building resilience and inner peace."
    />
  );
}
