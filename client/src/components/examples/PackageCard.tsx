import PackageCard from "../PackageCard";

export default function PackageCardExample() {
  return (
    <PackageCard
      title="Personal Coaching Session"
      description="One-on-one personalized coaching"
      price="₹5,000"
      features={[
        "60-minute private session",
        "Customized NLP techniques",
        "Action plan development",
        "Follow-up support",
      ]}
      onBookNow={() => console.log("Book Now clicked")}
    />
  );
}
