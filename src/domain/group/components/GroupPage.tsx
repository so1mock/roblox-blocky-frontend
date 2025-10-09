import { GroupCard } from "./GroupCard";

function GroupPage() {
  return (
    <div>
      <h1 className="text-left">
        <span className="text-3xl font-bold">반</span>
        <GroupCard
          group={{
            id: "2",
            name: "반1",
            image: undefined,
          }}
        />
      </h1>
    </div>
  );
}

export default GroupPage;
